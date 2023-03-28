import { Page } from "./Page.js";

export class PMapPage extends Page {
    static IB_INITIAL = 0x4600;
    static IB_INTERVAL = 496 * 8 * 512;

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        super(dv);

        if (this.ptype !== 0x83) {
            throw Error("Page is not a PMap");
        }
    }

    getMap() {
        return this.getDataView(0, 496);
    }
}
