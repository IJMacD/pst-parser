export class DataBlock {
    #dv;
    #dataSize;

    get blockSize () {
        return Math.ceil((this.#dataSize + 16)/64)*64;
    }

    get data () {
        return this.#dv.buffer.slice(this.#dv.byteOffset, this.#dv.byteOffset + this.#dataSize);
    }

    // BLOCKTRAILER
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