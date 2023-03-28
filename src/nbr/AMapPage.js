import { Page } from "./Page.js";

export class AMapPage extends Page {
    static IB_INITIAL = 0x4400;
    static IB_INTERVAL = 496 * 8 * 64;

    #ib;

    /**
     * @param {DataView} dv
     * @param {number} ib Byte offset relative to start of file. Needed to
     * return accurate ib values from `allocate()`.
     */
    constructor (dv, ib) {
        super(dv);

        this.#ib = ib;

        if (this.ptype !== 0x84) {
            throw Error("Page is not an AMapPage");
        }
    }

    getMap() {
        return this.getDataView(0, 496);
    }

    /**
     * Lazy allocator - all allocations are 512 byte aligned and multiples of
     * 512 bytes in size
     * @param {number} size
     * @param {number} alignment
     */
    allocate (size, alignment) {
        const aMap = this.getMap();
        const slotCount = size / 64;
        const mapByteCount = Math.ceil(slotCount / 8);

        for (let i = 0; i < aMap.byteLength; i++) {
            let found = true;

            for (let j = 0; j < mapByteCount; j++) {
                if (i + j >= aMap.byteLength) {
                    found = false;
                    break;
                }

                if (aMap.getUint8(i + j) !== 0) {
                    i += j;
                    found = false;
                    break;
                }
            }

            if (found) {
                // Write update to AMap
                for (let j = 0; j < mapByteCount; j++) {
                    aMap.setUint8(i + j, 0xFF);
                }

                return this.#ib + 512 + i * 64;
            }
        }

        return NaN;
    }
}
