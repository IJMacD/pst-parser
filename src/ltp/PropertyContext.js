import { NodeEntry } from "../nbr/NodeEntry.js";
import { BTreeOnHeap } from "./BTreeOnHeap.js";
import { HeapNode } from "./HeapNode.js";
import { arrayBufferFromDataView, h, stringFromBuffer } from "../util.js";
import { TagNames } from "./Tags.js";

export class PropertyContext extends BTreeOnHeap {
    #subNodeAccessor;

    static PTYPE_UNSPECIFIED    = 0x0000;
    static PTYPE_NULL           = 0x0001;
    static PTYPE_INTEGER16      = 0x0002;
    static PTYPE_INTEGER32      = 0x0003;
    static PTYPE_FLOATING32     = 0x0004;
    static PTYPE_FLOATING64     = 0x0005;
    static PTYPE_CURRENCY       = 0x0006;
    static PTYPE_FLOATING_TIME  = 0x0007;
    static PTYPE_ERROR_CODE     = 0x000A;
    static PTYPE_BOOLEAN        = 0x000B;
    static PTYPE_INTEGER64      = 0x0014;
    static PTYPE_STRING         = 0x001F;
    static PTYPE_STRING8        = 0x001E;
    static PTYPE_TIME           = 0x0040;
    static PTYPE_GUID           = 0x0048;
    static PTYPE_SERVER_ID      = 0x00FB;
    static PTYPE_RESTRICTION    = 0x00FD;
    static PTYPE_RULE_ACTION    = 0x00FE;
    static PTYPE_BINARY         = 0x0102;

    static PTYPE_MULTIPLE_INTEGER32 = 0x1003;
    static PTYPE_MULTIPLE_STRING    = 0x101F;

    /**
     * @param {DataView} buffer
     * @param {(nid: number) => DataView} subNodeAccessor
     *
     */
    constructor (buffer, subNodeAccessor) {
        super(buffer);

        this.#subNodeAccessor = subNodeAccessor;

        if (this.bClientSig !== HeapNode.TYPE_PROPERTY_CONTEXT) {
            throw Error("HeapNode is not a PropertyContext. bClientSig: " + this.bClientSig.toString(16));
        }

        if (this.cbKey !== 2) {
            throw Error("Key size is not correct for PropertyContext. Got " + this.cbKey);
        }
    }

    /**
     * @param {number} key
     */
    #getPCRecordByKey (key) {
        const record = this.findRecord(key);

        if (!record) return;

        const { key: wPropId, data } = record;

        if (typeof wPropId !== "number") {
            throw Error("Invalid key length");
        }

        return {
            wPropId,
            wPropType: data.getUint16(0, true),
            dwValueHnid: data.getUint32(2, true),
        };
    }

    /**
     * @param {number} key
     */
    getValueByKey (key) {
        const record = this.#getPCRecordByKey(key);

        if (!record) return;

        if (record.wPropType === PropertyContext.PTYPE_STRING) {
            if (record.dwValueHnid === 0) return "";

            const nidType = NodeEntry.getNIDType(record.dwValueHnid);

            const data = (nidType === NodeEntry.NID_TYPE_HID) ?
                this.getItemByHID(record.dwValueHnid) :
                this.#subNodeAccessor(record.dwValueHnid);

            const { buffer, byteOffset, byteLength } = data;

            return stringFromBuffer(buffer, byteOffset, byteLength);
        }

        if (record.wPropType === PropertyContext.PTYPE_BINARY) {
            const nidType = NodeEntry.getNIDType(record.dwValueHnid);

            return (nidType === NodeEntry.NID_TYPE_HID) ?
                this.getItemByHID(record.dwValueHnid) :
                this.#subNodeAccessor(record.dwValueHnid);
        }

        if (record.wPropType === PropertyContext.PTYPE_INTEGER16) {
            return record.dwValueHnid;
        }

        if (record.wPropType === PropertyContext.PTYPE_INTEGER32) {
            return record.dwValueHnid;
        }

        if (record.wPropType === PropertyContext.PTYPE_INTEGER64) {
            return this.getItemByHID(record.dwValueHnid).getBigUint64(0, true);
        }

        if (record.wPropType === PropertyContext.PTYPE_BOOLEAN) {
            return record.dwValueHnid > 0;
        }

        if (record.wPropType === PropertyContext.PTYPE_TIME) {
            const value = this.getItemByHID(record.dwValueHnid).getBigUint64(0, true);
            const UNIX_TIME_START = 0x019DB1DED53E8000n; //January 1, 1970 (start of Unix epoch) in "ticks"
            const TICKS_PER_MILLISECOND = 10000n; // a tick is 100ns
            const timestamp = (value - UNIX_TIME_START) / TICKS_PER_MILLISECOND;
            return new Date(parseInt(timestamp.toString()));
        }

        if (record.wPropType === PropertyContext.PTYPE_GUID) {
            const nidType = NodeEntry.getNIDType(record.dwValueHnid);

            const dv = (nidType === NodeEntry.NID_TYPE_HID) ?
                this.getItemByHID(record.dwValueHnid) :
                this.#subNodeAccessor(record.dwValueHnid);

            const d1 = dv.getUint32(0, true).toString(16).padStart(8, "0");
            const d2 = dv.getUint16(4, true).toString(16).padStart(4, "0");
            const d3 = dv.getUint16(6, true).toString(16).padStart(4, "0");
            const d4 = dv.getUint16(8, false).toString(16).padStart(4, "0");
            const d5a = dv.getUint32(10, false).toString(16).padStart(8, "0");
            const d5b = dv.getUint16(14, false).toString(16).padStart(4, "0");

            return `{${d1}-${d2}-${d3}-${d4}-${d5a}${d5b}}`;
        }

        if (record.wPropType === PropertyContext.PTYPE_MULTIPLE_STRING) {
            if (record.dwValueHnid === 0) return [];

            const nidType = NodeEntry.getNIDType(record.dwValueHnid);

            const dv = (nidType === NodeEntry.NID_TYPE_HID) ?
                this.getItemByHID(record.dwValueHnid) :
                this.#subNodeAccessor(record.dwValueHnid);

            const { buffer, byteOffset, byteLength } = dv;

            const count = dv.getUint32(0, true);
            const out = [];
            for (let i = 0; i < count; i++) {
                const start = dv.getUint32((i + 1) * 4, true);
                const end = Math.min(dv.getUint32((i + 2) * 4, true), byteLength);
                const length = end - start;
                out.push(stringFromBuffer(buffer, byteOffset + start, length));
            }
            return out;
        }

        if (record.wPropType === PropertyContext.PTYPE_MULTIPLE_INTEGER32) {
            if (record.dwValueHnid === 0) return [];

            const nidType = NodeEntry.getNIDType(record.dwValueHnid);

            const data = (nidType === NodeEntry.NID_TYPE_HID) ?
                this.getItemByHID(record.dwValueHnid) :
                this.#subNodeAccessor(record.dwValueHnid);

            const { buffer, byteOffset, byteLength } = data;

            if (byteOffset % 4) {
                // Uint32Array *must* start on a multiple of 4
                const intBuffer = arrayBufferFromDataView(data);
                return [...new Uint32Array(intBuffer)];
            }

            return [...new Uint32Array(buffer, byteOffset, byteLength/4)];
        }

        console.debug(`Unable to get data of type 0x${h(record.wPropType)}`);
    }

    getAllProperties () {
        const keys = /** @type {number[]} */(this.keys);
        return keys.map(key => ({ tag: key, tagHex: "0x"+key.toString(16).padStart(4, "0"), tagName: PropertyContext.getTagName(key), value: this.getValueByKey(key) }));
    }

    /**
     * @param {number} tag
     */
    static getTagName (tag) {
        if (tag < 0x8000 && !TagNames[tag]) {
            unknownTags.add(tag);
            console.log([...unknownTags.values()].map(t => "0x"+h(t).padStart(4,"0")).sort().join(" "));
        }
        return TagNames[tag];
    }
}

const unknownTags = new Set();
