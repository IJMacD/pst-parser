import { HeapNode } from "./HeapNode.js";

export class BTreeOnHeap extends HeapNode {
    #dv;

    get bType () { return this.#dv.getUint8(0); }
    get cbKey () { return this.#dv.getUint8(1); }
    get cbEnt () { return this.#dv.getUint8(2); }
    get bIdxLevels () { return this.#dv.getUint8(3); }
    get hidRoot () { return this.#dv.getUint32(4, true); }

    get keys () { return this.#getKeys(this.hidRoot, this.bIdxLevels); }

    /**
     * @param {DataView} dv
     * @param {number} [hid]
     */
    constructor (dv, hid) {
        super(dv);

        if (typeof hid === "undefined") {
            hid = this.hidUserRoot;
        }

        this.#dv = this.getItemByHID(hid);
    }

    /**
     * @param {number} hid
     * @param {number} level
     * @returns {(number|bigint)[]}
     */
    #getKeys (hid, level) {
        if (hid === 0) return [];

        const count = this.#getLevelRecordCount(hid, level);

        if (level === 0) {
            const out = [];

            for (let i = 0; i < count; i++) {
                const record = this.#getRecord(hid, level, i);

                out.push(/** @type {(number|bigint)} */(record.key));
            }

            return out;
        }

        const out = [];

        for (let i = 0; i < count; i++) {
            const record = this.#getRecord(hid, level, i);
            const nextHid = record.data.getUint32(0, true);

            out.push(...this.#getKeys(nextHid, level - 1));
        }

        return out;
    }

    /**
     * @param {number} hid
     * @param {number} level
     * @param {number} n
     */
    #getRecord (hid, level, n) {
        const dv = this.getItemByHID(hid);
        const offset = dv.byteOffset;
        const dataSize = level === 0 ? this.cbEnt : 4;
        const recordSize = this.cbKey + dataSize;
        const recordCount = dv.byteLength / recordSize;

        if (n >= recordCount) {
            throw Error("Invalid BTreeOnHeapRecord index: " + n);
        }

        const begin = n * recordSize;
        const bufferBegin = offset + begin;

        const data = new DataView(dv.buffer, bufferBegin + this.cbKey, dataSize);

        if (this.cbKey === 2) {
            const key = dv.getUint16(begin, true);

            return  { key, data };
        }

        if (this.cbKey === 4) {
            const key = dv.getUint32(begin, true);

            return  { key, data };
        }

        if (this.cbKey === 8) {
            const key = dv.getBigUint64(begin, true);

            return  { key, data };
        }

        if (this.cbKey === 16) {
            const key = dv.buffer.slice(bufferBegin, bufferBegin + 16);

            return  { key, data };
        }

        throw Error("Unexpected key size");
    }

    /**
     * @param {number} hid
     * @param {number} level
     */
    #getLevelRecordCount (hid, level) {
        if (hid === 0) return 0;

        const dv = this.getItemByHID(hid);
        const dataSize = level === 0 ? this.cbEnt : 4;
        const recordSize = this.cbKey + dataSize;
        return dv.byteLength / recordSize;
    }

    /**
     * @param {number | bigint} key
     */
    findRecord (key) {
        let hid = this.hidRoot;
        let level = this.bIdxLevels;

        while (level > 0) {
            const count = this.#getLevelRecordCount(hid, level);

            for (let i = 1; i < count; i++) {
                const record = this.#getRecord(hid, level, i);

                if (record.key > key) {
                    const prevRecord = this.#getRecord(hid, level, i - 1);
                    hid = prevRecord.data.getUint32(0, true);

                    break; // break for
                }
            }
            level--;
        }

        for (let i = 0; i < this.#getLevelRecordCount(hid, level); i++) {
            const record = this.#getRecord(hid, level, i);

            if (record.key === key) {
                return record
            }
        }

        // Not found
        return null;
    }
}