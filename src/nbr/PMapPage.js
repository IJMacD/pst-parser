import { Page } from "./Page.js";

export class PMapPage extends Page {
    static IB_INITIAL = 0x4600;
    static IB_INTERVAL = 496 * 8 * 512;

    getMap() {
        return this.getDataView(0, 496);
    }
}
