
export class Page {
    #dv;

    get ptype () { return this.#dv.getUint8(496); }
    get ptypeRepeat () { return this.#dv.getUint8(497); }
    get wSig () { return this.#dv.getUint16(498, true); }
    get dwCRC () { return this.#dv.getUint32(500, true); }
    get bid () { return this.#dv.getBigUint64(504, true); }

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        this.#dv = dv;
    }

    /**
     * @param {number} byteOffset
     * @param {number} [byteLength]
     */
    getDataView (byteOffset, byteLength) {
        return new DataView(this.#dv.buffer, this.#dv.byteOffset + byteOffset, byteLength);
    }
}


