export class BREF {
    #dv;

    get bid () { return this.#dv.getBigUint64(0, true); }
    get ib () { return this.#dv.getBigUint64(8, true); }

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        this.#dv = dv;
    }

    /**
     * @param {number | bigint} bid
     */
    static isInternalBID(bid) {
        return Boolean(typeof bid === "bigint" ? (bid & 0x02n) : (bid & 0x02));
    }
}
