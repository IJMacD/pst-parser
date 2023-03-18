import { BREF } from "./BREF.js";

export class BTEntry {
    #dv;

    get btkey () { return this.#dv.getBigUint64(0, true); }
    get BREF () {
        const dv = new DataView(this.#dv.buffer, this.#dv.byteOffset + 8);
        return new BREF(dv);
    }

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        this.#dv = dv;
    }
}