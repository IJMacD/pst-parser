export class BREF {
    #dv;

    get bid () { return this.#dv.getBigUint64(0, true); }
    get ib () { return this.#dv.getBigUint64(8, true); }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} offset
     */
    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }

    /**
     * @param {number | bigint} bid
     */
    static isInternalBID(bid) {
        return Boolean(typeof bid === "bigint" ? (bid & 0x2n) : (bid & 0x02));
    }
}
