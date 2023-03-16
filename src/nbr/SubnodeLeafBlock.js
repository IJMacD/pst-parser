import { InternalBlock } from "./InternalBlock.js";
import { SubnodeLeafEntry } from "./SubnodeLeafEntry.js";

export class SubnodeLeafBlock extends InternalBlock {
    #dv;

    constructor (buffer, offset, dataSize) {
        super(buffer, offset, dataSize);

        this.#dv = new DataView(buffer, offset);
    }

    getEntry (n) {
        const begin = this.#dv.byteOffset + 8 + n * 24;
        return new SubnodeLeafEntry(this.#dv.buffer.slice(begin, begin + 24));
    }
}