export class DListEntry {
    #dv;

    get dwPageNum () { return this.#dv.getUint32(0, true) & 0x000F_FFFF; }
    get dwFreeSlots () { return this.#dv.getUint16(2, true) >> 4; }

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        this.#dv = dv;
    }
}