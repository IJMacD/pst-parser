import { NamedTagNames } from "../ltp/NamedTagNames.js";
import { PropertyContext } from "../ltp/PropertyContext.js";
import * as Tags from "../ltp/Tags.js";
import { formatGuid } from "../util/formatGuid.js";
import { h } from "../util/util.js";

export class NamedPropertyMap extends PropertyContext {
    /** @type {{ [tag: number ]: string }} */
    #nameCache;
    /** @type {{ [tag: number ]: string }} */
    #guidCache;

    get bucketCount () { return /** @type {number} */ (this.getValueByKey(Tags.PID_TAG_NAMEID_BUCKET_COUNT)); }

    /**
     * @param {{ data: DataView; blockOffsets: number[]; }} data
     * @param {(nid: number) => DataView} subDataAccessor
     * @param {(tag: number) => string?} namedPropertyAccessor
     */
    constructor (data, subDataAccessor, namedPropertyAccessor) {
        super(data, subDataAccessor, namedPropertyAccessor);
    }

    getTagName (tag) {
        if (!this.#nameCache) {
            this.#populateCache();
        }
        return this.#nameCache[tag]
    }

    getTagGuid (tag) {
        if (!this.#guidCache) {
            this.#populateCache();
        }
        return this.#guidCache[tag]
    }

    #populateCache () {
        const PS_MAPI = '{00020328-0000-0000-C000-000000000046}';
        const PS_PUBLIC_STRINGS = '{00020329-0000-0000-C000-000000000046}';

        const guids = /** @type {DataView} */(this.getValueByKey(Tags.PID_TAG_NAMEID_STREAM_GUID));

        const strings = /** @type {DataView} */(this.getValueByKey(Tags.PID_TAG_NAMEID_STRING_STREAM));

        const entries = /** @type {DataView} */(this.getValueByKey(Tags.PID_TAG_NAMEID_STREAM_ENTRY));

        const entryCount = entries.byteLength / 8;

        this.#nameCache = {};
        this.#guidCache = {};

        for (let i = 0; i < entryCount; i++) {
            const dv = new DataView(entries.buffer, entries.byteOffset + i * 8, 8);
            const propertyID = dv.getUint32(0, true);
            const N = dv.getUint8(4) & 0x01;
            const guid = dv.getUint16(4, true) >> 1;
            const propIndex = dv.getUint16(6, true);

            const tag = 0x8000 + propIndex;

            let guidString;
            try {
                guidString = guid === 0 ? '{NONE}' : (guid === 1 ? PS_MAPI : (guid === 2 ? PS_PUBLIC_STRINGS : formatGuid(new DataView(guids.buffer, guids.byteOffset + (guid-3) * 16, 16))));
            }
            catch (e) {
                guidString = `{ERROR: 0x${h(guid)}}`;
            }

            this.#guidCache[tag] = guidString;

            if (N) {
                const stringByteLength = strings.getUint32(propertyID, true);
                const start = strings.byteOffset + 4 + propertyID;
                const buffer = strings.buffer.slice(start, start + stringByteLength);
                const name = String.fromCharCode(...new Uint16Array(buffer));

                this.#nameCache[tag] = name;
            }
            else {
                const propertySet = NamedTagNames[guidString];
                if (propertySet && propertySet[propertyID]) {
                    this.#nameCache[tag] = propertySet[propertyID];
                }
                else if (NamedTagNames.common[propertyID]) {
                    this.#nameCache[tag] = NamedTagNames.common[propertyID];
                }
                else {
                    this.#nameCache[tag] = `${guidString}:0x${h(propertyID)}`;
                }
            }
        }
    }
}