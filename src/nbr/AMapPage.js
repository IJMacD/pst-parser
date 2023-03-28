import { Page } from "./Page.js";

export class AMapPage extends Page {
    static IB_INITIAL = 0x4400;
    static IB_INTERVAL = 496 * 8 * 64;

    getMap() {
        return this.getDataView(0, 496);
    }
}
