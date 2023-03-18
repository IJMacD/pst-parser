
export class InternalBlock {
    #dv;
    #dataSize;

    get blockSize () {
        return Math.ceil((this.#dataSize + 16)/64)*64;
    }

    get bType () { return this.#dv.getUint8(0); }
    get cLevel () { return this.#dv.getUint8(1); }
    get cEnt () { return this.#dv.getUint16(2, true); }
    get lcbTotal () { return this.#dv.getUint32(4, true); }

    // BLOCKTRAILER
    get cb () { return this.#dv.getUint16(this.blockSize - 16, true); }
    get wSig () { return this.#dv.getUint16(this.blockSize - 14, true); }
    get dwCRC () { return this.#dv.getUint32(this.blockSize - 12, true); }
    get bid () { return this.#dv.getBigUint64(this.blockSize - 8, true); }

    /**
     * @param {DataView} dv
     * @param {number} dataSize
     */
    constructor (dv, dataSize) {
        this.#dv = dv;
        this.#dataSize = dataSize;
    }
}