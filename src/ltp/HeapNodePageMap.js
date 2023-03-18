
export class HeapNodePageMap {
    #dv;

    get cAlloc () { return this.#dv.getUint16(0, true); }
    get cFree () { return this.#dv.getUint16(2, true); }
    get rgibAlloc () {
        return new Uint16Array(this.#dv.buffer, this.#dv.byteOffset + 4, this.cAlloc + 1);
    }

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        this.#dv = dv;
    }
}