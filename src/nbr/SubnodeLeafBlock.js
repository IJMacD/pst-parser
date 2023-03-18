import { InternalBlock } from "./InternalBlock.js";
import { SubnodeLeafEntry } from "./SubnodeLeafEntry.js";

export class SubnodeLeafBlock extends InternalBlock {
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
    getEntry (n) {
        const begin = this.#dv.byteOffset + 8 + n * 24;
        const dv = new DataView(this.#dv.buffer, begin, 24);
        return new SubnodeLeafEntry(dv);
    }
}