import { InternalBlock } from "./InternalBlock.js";

export class XBlock extends InternalBlock {
    #dv;

    /**
     * @param {ArrayBufferLike} buffer
     * @param {number} offset
     * @param {number} dataSize
     */
    constructor (buffer, offset, dataSize) {
        super(buffer, offset, dataSize);

        this.#dv = new DataView(buffer, offset);
    }

    /**
     * @param {number} n
     */
    getBID (n) {
        return this.#dv.getBigUint64(8 + 8 * n, true);
    }
}