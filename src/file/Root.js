import { BREF } from "../nbr/BREF.js";

export class Root {
    #dv;

    get dwReserved () { return this.#dv.getUint32(0, true); }
    get ibFileEof () { return this.#dv.getBigUint64(4, true); }
    get ibAMapLast () { return this.#dv.getBigUint64(12, true); }
    get cbAMapFree () { return this.#dv.getBigUint64(20, true); }
    get cbPMapFree () { return this.#dv.getBigUint64(28, true); }
    get BREFNBT () { return new BREF(this.#dv.buffer, this.#dv.byteOffset + 36); }
    get BREFBBT () { return new BREF(this.#dv.buffer, this.#dv.byteOffset + 52); }
    get fAMapValid () { return this.#dv.getUint8(68); }
    get bReserved () { return this.#dv.getUint8(69); }
    get wReserved () { return this.#dv.getUint16(70, true); }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset, 72);
    }
}
