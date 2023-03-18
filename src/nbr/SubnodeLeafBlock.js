import { InternalBlock } from "./InternalBlock.js";
import { SubnodeLeafEntry } from "./SubnodeLeafEntry.js";

export class SubnodeLeafBlock extends InternalBlock {
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
    getEntry (n) {
        const begin = 8 + n * 24;
        const dv = new DataView(this.#dv.buffer, begin, 24);
        return new SubnodeLeafEntry(dv);
    }
}