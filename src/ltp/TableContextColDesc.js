
export class TableContextColDesc {
    #dv;

    get tag () { return this.#dv.getUint32(0, true); }

    // Overlap: Not explicit in spec
    get dataTag () { return this.#dv.getUint16(2, true); }
    // Overlap: Not explicit in spec
    get dataType () { return this.#dv.getUint16(0, true); }

    /** Data offset */
    get ibData () { return this.#dv.getUint16(4, true); }

    /** Data size */
    get cbData () { return this.#dv.getUint8(6); }

    get iBit () { return this.#dv.getUint8(7); }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        this.#dv = new DataView(buffer);
    }
}