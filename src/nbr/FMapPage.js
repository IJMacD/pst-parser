import { Page } from "./Page.js";

// Bytes covered by one AMap page
const aMapCoverage = 496 * 8 * 64;
// For every byte in the FMap how many bytes of AMap are covered?
const fMapCoveragePerByte = 8 * aMapCoverage;

export class FMapPage extends Page {
    static IB_INITIAL = 256 + 128 * fMapCoveragePerByte;
    static IB_INTERVAL = 496 * fMapCoveragePerByte;

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        super(dv);

        if (this.ptype !== 0x82) {
            throw Error("Page is not an FMap");
        }
    }

    getMap() {
        return this.getDataView(0, 496);
    }
}
