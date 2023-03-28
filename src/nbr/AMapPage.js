import { Page } from "./Page.js";

export class AMapPage extends Page {
    static IB_INITIAL = 0x4400;
    static IB_INTERVAL = 496 * 8 * 64;

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        super(dv);

        if (this.ptype !== 0x84) {
            throw Error("Page is not an AMapPage");
        }
    }

    getMap() {
        return this.getDataView(0, 496);
    }
}
