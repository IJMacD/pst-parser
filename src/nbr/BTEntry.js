import { BREF } from "./BREF.js";

export class BTEntry {
    #dv;

    get btkey () { return this.#dv.getBigUint64(0, true); }
    get BREF () { return new BREF(this.#dv.buffer, this.#dv.byteOffset + 8); }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} offset
     */
    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }
}