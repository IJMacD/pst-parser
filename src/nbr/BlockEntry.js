import { BREF } from "./BREF.js";

export class BlockEntry {
    #dv;

    get BREF () { return new BREF(this.#dv.buffer, this.#dv.byteOffset); }
    get cb () { return this.#dv.getUint16(16, true); }
    get cRef () { return this.#dv.getUint16(18, true); }
    get dwPadding () { return this.#dv.getUint32(20, true); }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} offset
     */
    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }
}