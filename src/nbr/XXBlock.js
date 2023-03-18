import { InternalBlock } from "./InternalBlock.js";

export class XXBlock extends InternalBlock {
    #dv;

    /**
     * @param {DataView} buffer
     * @param {number} dataSize
     */
    constructor (buffer, dataSize) {
        super(buffer, dataSize);

        this.#dv = dv;
    }

    /**
     * @param {number} n
     */
    getBID (n) {
        return this.#dv.getBigUint64(8 + 8 * n, true);
    }
}