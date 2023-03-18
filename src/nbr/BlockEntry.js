import { BREF } from "./BREF.js";

export class BlockEntry {
    #dv;

    get BREF () { return new BREF(this.#dv); }
    get cb () { return this.#dv.getUint16(16, true); }
    get cRef () { return this.#dv.getUint16(18, true); }
    get dwPadding () { return this.#dv.getUint32(20, true); }

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        this.#dv = dv;
    }
}