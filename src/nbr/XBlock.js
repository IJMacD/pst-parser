import { InternalBlock } from "./InternalBlock.js";

export class XBlock extends InternalBlock {
    #dv;

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} dataSize
     */
    constructor (buffer, dataSize) {
        super(buffer, dataSize);

        this.#dv = new DataView(buffer);
    }

    /**
     * @param {number} n
     */
    getBID (n) {
        return this.#dv.getBigUint64(8 + 8 * n, true);
    }
}