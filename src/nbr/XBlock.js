import { InternalBlock } from "./InternalBlock.js";

export class XBlock extends InternalBlock {
    #dv;

    /**
     * @param {DataView} dv
     * @param {number} dataSize
     */
    constructor (dv, dataSize) {
        super(dv, dataSize);

        this.#dv = dv;
    }

    /**
     * @param {number} n
     */
    getBID (n) {
        return this.#dv.getBigUint64(8 + 8 * n, true);
    }
}