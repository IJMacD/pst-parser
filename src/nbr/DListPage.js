import { DListEntry } from "./DListEntry.js";
import { Page } from "./Page.js";


export class DListPage extends Page {
    static IB_DLIST = 0x4200;

    #dv;

    get bFlags() { return this.#dv.getUint8(0); }
    get cEntDList() { return this.#dv.getUint8(1); }
    get wPadding() { return this.#dv.getUint16(2, true); }
    get ulCurrentPage() { return this.#dv.getUint32(4, true); }

    /**
     * @param {DataView} dv
     */
    constructor(dv) {
        super(dv);

        this.#dv = dv;

        if (this.ptype !== 0x86) {
            throw Error("Page is not a DListPage");
        }
    }

    /**
     * @param {number} n
     */
    getEntry(n) {
        return new DListEntry(this.getDataView(8 + n * 4, 4));
    }
}
