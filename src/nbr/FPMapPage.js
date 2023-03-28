import { Page } from "./Page.js";

// Coverage of each PageMap
const pMapCoverage = 496 * 8 * 512;
// For every byte of FPMap how many PageMap bytes are covered
const fpMapCoveragePerByte = 8 * pMapCoverage;

export class FPMapPage extends Page {
    static IB_INITIAL = 384 + 128 * fpMapCoveragePerByte;
    static IB_INTERVAL = 496 * fpMapCoveragePerByte;

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        super(dv);

        if (this.ptype !== 0x85) {
            throw Error("Page is not an FPMap");
        }
    }

    getMap() {
        return this.getDataView(0, 496);
    }
}
