import { Node } from './nbr';

export class HeapNode {
    #dv;

    get ibHnpm () { return this.#dv.getUint16(0, true); }
    get bSig () { return this.#dv.getUint8(2); }
    get bClientSig () { return this.#dv.getUint8(3); }
    get hidUserRoot () { return this.#dv.getUint32(4, true); }
    get rgbFillLevel () { return this.#dv.getUint32(8, true); }

    get pageMap () {
        return new HeapNodePageMap(this.#dv.buffer, this.ibHnpm);
    }

    static TYPE_TABLE_CONTEXT = 0x7C;
    static TYPE_Block_ON_HEAP = 0xB5;
    static TYPE_PROPERTY_CONTEXT = 0xBC;

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        this.#dv = new DataView(buffer);
    }

    /**
     * @param {number} n
     */
    getItem (n) {
        if (n < 0 || n > this.pageMap.cAlloc) {
            throw RangeError("Invalid Heap Item");
        }

        const begin = this.pageMap.rgibAlloc[n];
        const end = this.pageMap.rgibAlloc[n + 1];

        return this.#dv.buffer.slice(begin, end);
    }

    /**
     * @param {number} hid
     */
    getItemByHID (hid) {
        const hidType = (hid & 0x1f);
        const hidIndex = ((hid >> 5) & 0x7ff);
        const hidBlockIndex = (hid >> 16);
        return this.getItem(hidIndex - 1);
    }
}

export class HeapNodePageMap {
    #dv;

    get cAlloc () { return this.#dv.getUint16(0, true); }
    get cFree () { return this.#dv.getUint16(2, true); }
    get rgibAlloc () {
        return new Uint16Array(this.#dv.buffer, this.#dv.byteOffset + 4, this.cAlloc + 1);
    }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} offset
     */
    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }

}

export class BlockOnHeap extends HeapNode {
    #dv;

    get bType () { return this.#dv.getUint8(0); }
    get cbKey () { return this.#dv.getUint8(1); }
    get cbEnt () { return this.#dv.getUint8(2); }
    get bIdxLevels () { return this.#dv.getUint8(3); }
    get hidRoot () { return this.#dv.getUint32(4, true); }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        super(buffer);

        this.#dv = new DataView(this.getItemByHID(this.hidUserRoot));
    }

    get keys () {
        const out = [];
        for (let i = 0; i < this.pageMap.cAlloc; i++) {
            const record = this.getRecord(i);

            out.push(record.key);
        }
        return out;
    }

    getRecord (n) {
        if (this.bIdxLevels > 0) {
            throw Error("NotImplemented");

        }

        const dv = new DataView(this.getItemByHID(this.hidRoot));
        const recordSize = this.cbKey + this.cbEnt;
        const begin = n * recordSize;

        if (this.cbKey === 2) {
            const key = dv.getUint16(begin, true);
            const data = dv.buffer.slice(begin + this.cbKey, begin + recordSize);

            return { key, data };
        }

        if (this.cbKey === 4) {
            const key = dv.getUint32(begin, true);
            const data = dv.buffer.slice(begin + this.cbKey, begin + recordSize);

            return { key, data };
        }

        if (this.cbKey === 8) {
            const key = dv.getBigUint64(begin, true);
            const data = dv.buffer.slice(begin + this.cbKey, begin + recordSize);

            return { key, data };
        }

        if (this.cbKey === 16) {
            const key = dv.buffer.slice(begin, begin + 16);
            const data = dv.buffer.slice(begin + this.cbKey, begin + recordSize);

            return { key, data };
        }

        throw Error("Unexpected key size");
    }
}

export class PropertyContext extends BlockOnHeap {
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

    static PID_TAG_SUBJECT              = 0x0037;
    static PID_TAG_NORMALIZED_SUBJECT   = 0x0E1D;
    static PID_TAG_RECORD_KEY           = 0x0FF9;
    static PID_TAG_BODY                 = 0x1000;
    static PID_TAG_BODY_HTML            = 0x1013;
    static PID_TAG_DISPLAY_NAME         = 0x3001;
    static PID_TAG_ROOT_MAILBOX         = 0x35E0;
    static PID_TAG_DELETED_ITEMS        = 0x35E3;
    static PID_TAG_SEARCH_FOLDER        = 0x35E7;
    static PID_TAG_CONTENT_COUNT        = 0x3602;
    static PID_TAG_CONTENT_UNREAD_COUNT = 0x3603;
    static PID_TAG_SUBFOLDERS           = 0x360A;

    /**
     * @param {number} n
     */
    getPCRecord (n) {
        const { key: wPropId, data } = this.getRecord(n);

        if (typeof wPropId !== "number") {
            throw Error("Invalid key length");
        }

        const dv = new DataView(data);

        return {
            wPropId,
            wPropType: dv.getUint16(0, true),
            dwValueHnid: dv.getUint32(2, true),
        };
    }

    /**
     * @param {number} key
     */
    getPCRecordByKey (key) {
        for (let i = 0; i < this.pageMap.cAlloc; i++) {
            const record = this.getPCRecord(i);
            if (record.wPropId === key) {
                return record;
            }
        }
    }

    /**
     * @param {number} key
     */
    getPCValueByKey (key) {
        const record = this.getPCRecordByKey(key);

        if (record?.wPropType === PropertyContext.PTYPE_STRING) {
            if (record.dwValueHnid === 0) return "";
            if (Node.getNIDType(record.dwValueHnid) === Node.NID_TYPE_HID) {
                const data = this.getItemByHID(record.dwValueHnid);
                return String.fromCharCode(...new Uint16Array(data));
            }
        }

        if (record?.wPropType === PropertyContext.PTYPE_BINARY) {
            if (Node.getNIDType(record.dwValueHnid) === Node.NID_TYPE_HID) {
                return this.getItemByHID(record.dwValueHnid);
            }
        }

        if (record?.wPropType === PropertyContext.PTYPE_INTEGER32) {
            return record.dwValueHnid;
        }

        if (record?.wPropType === PropertyContext.PTYPE_BOOLEAN) {
            return record.dwValueHnid > 0;
        }
    }

    getAllPCRecords () {
        const out = [];
        for (let i = 0; i < this.pageMap.cAlloc; i++) {
            out.push(this.getPCRecord(i));
        }
        return out;
    }
}

export class EntryID {
    #dv;

    get rgbFlags () { return this.#dv.getUint32(0, true); }
    get uid () { return this.#dv.buffer.slice(4, 4 + 16); }
    get nid () { return this.#dv.getUint32(20, true); }

    constructor (buffer) {
        this.#dv = new DataView(buffer);
    }
}

export class DataBlock {
    #dv;
    #dataSize;

    get blockSize () {
        return Math.ceil((this.#dataSize + 16)/64)*64;
    }

    get data () {
        return this.#dv.buffer.slice(this.#dv.byteOffset, this.#dv.byteOffset + this.#dataSize);
    }

    get cb () { return this.#dv.getUint16(this.blockSize - 16, true); }
    get wSig () { return this.#dv.getUint16(this.blockSize - 14, true); }
    get dwCRC () { return this.#dv.getUint32(this.blockSize - 12, true); }
    get bid () { return this.#dv.getBigUint64(this.blockSize - 8, true); }

    /**
     * @param {ArrayBufferLike} buffer
     * @param {number} offset
     * @param {number} dataSize
     */
    constructor (buffer, offset, dataSize) {
        this.#dv = new DataView(buffer, offset);
        this.#dataSize = dataSize;
    }
}

