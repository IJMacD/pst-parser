import { NodeEntry } from "../nbr/NodeEntry.js";
import { HeapNodePageMap } from "./HeapNodePageMap.js";
import { h } from "../util/util.js";

export class HeapNode {

    static TYPE_TABLE_CONTEXT = 0x7C;
    static TYPE_BTREE_ON_HEAP = 0xB5;
    static TYPE_PROPERTY_CONTEXT = 0xBC;

    #dv;
    #blockOffsets;

    get ibHnpm () { return this.#dv.getUint16(0, true); }
    get bSig () { return this.#dv.getUint8(2); }
    get bClientSig () { return this.#dv.getUint8(3); }
    get hidUserRoot () { return this.#dv.getUint32(4, true); }
    get rgbFillLevel () { return this.#dv.getUint32(8, true); }

    /**
     * @param {{ data: DataView, blockOffsets: number[] }} data
     */
    constructor (data) {
        this.#dv = data.data;
        this.#blockOffsets = data.blockOffsets;
    }

    /**
     * @param {number} blockIndex
     */
    #getPageMap (blockIndex) {
        const blockOffset = this.#blockOffsets[blockIndex];

        const { buffer, byteOffset, byteLength } = this.#dv;

        try {
            const ibHnpm = this.#dv.getUint16(blockOffset, true);

            const length = byteLength - (blockOffset + ibHnpm);

            const dv = new DataView(buffer, byteOffset + blockOffset + ibHnpm, length);

            return new HeapNodePageMap(dv);
        } catch (e) {
            if (e instanceof RangeError) {
                console.error(`HeapNode: Trying to get pageMap for block index ${blockIndex}. It should be at offset 0x${h(byteOffset + blockOffset)} but the buffer is only 0x${h(byteLength)} long.`);
            }
            throw e;
        }
    }

    /**
     * @param {number} itemIndex
     * @param {number} blockIndex
     * @returns {DataView}
     */
    #getItem (itemIndex, blockIndex) {
        // Get page map for the requested block
        const pageMap = this.#getPageMap(blockIndex);

        const n = itemIndex;
        if (n < 0 || n > pageMap.cAlloc) {
            throw RangeError("Invalid Heap Item - Index: " + itemIndex + " (Block: " + blockIndex + ")");
        }

        const blockOffset = this.#blockOffsets[blockIndex];

        const begin = blockOffset + pageMap.rgibAlloc[n];
        const end = blockOffset + pageMap.rgibAlloc[n + 1];
        const length = end - begin;

        const { buffer, byteOffset } = this.#dv;

        return new DataView(buffer, byteOffset + begin, length);
    }

    /**
     * @param {number} hid
     * @return {DataView}
     */
    getItemByHID (hid) {
        const { hidIndex, hidBlockIndex } = HeapNode.parseHid(hid);

        if (hidIndex === 0) return new DataView(new ArrayBuffer(0));

        return this.#getItem(hidIndex - 1, hidBlockIndex);
    }

    /**
     * @param {number} blockIndex
     */
    getAllocationCount (blockIndex) {
        return this.#getPageMap(blockIndex).cAlloc;
    }

    /**
     * @param {number} hid
     */
    static parseHid (hid) {
        const hidType = (hid & 0x1f);

        if (hidType !== NodeEntry.NID_TYPE_HID) {
            throw Error("hid was not a HID (maybe a NID) Type: 0x" + h(hidType));
        }

        const hidIndex = ((hid >>> 5) & 0x7ff);
        const hidBlockIndex = (hid >>> 16);
        return { hidType, hidIndex, hidBlockIndex };
    }
}