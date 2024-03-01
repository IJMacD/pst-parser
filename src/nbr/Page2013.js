
export class Page2013 {
    #dv;

    get ptype() { return this.#dv.getUint8(4072); }
    get ptypeRepeat() { return this.#dv.getUint8(4073); }
    get wSig() { return this.#dv.getUint16(4074, true); }
    get dwCRC() { return this.#dv.getUint32(4076, true); }

    get bid() { return this.#dv.getBigUint64(4080, true); }
    set bid(value) { this.#dv.setBigUint64(4080, value, true); }

    /**
     * @param {DataView} dv
     */
    constructor(dv) {
        this.#dv = dv;
    }

    /**
     * @param {number} byteOffset
     * @param {number} [byteLength]
     */
    getDataView(byteOffset, byteLength) {
        return new DataView(this.#dv.buffer, this.#dv.byteOffset + byteOffset, byteLength);
    }
}


