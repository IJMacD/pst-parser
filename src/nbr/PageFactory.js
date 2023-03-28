import { AMapPage } from "./AMapPage.js";
import { BTPage } from "./BTPage.js";
import { DListPage } from "./DListPage.js";
import { FMapPage } from "./FMapPage.js";
import { FPMapPage } from "./FPMapPage.js";
import { Page } from "./Page.js";
import { PMapPage } from "./PMapPage.js";

/**
 * @param {DataView} dv
 */
export function getPage (dv) {
    const p = new Page(dv);

    if (p.ptype === 0x80) return new BTPage(dv);
    if (p.ptype === 0x81) return new BTPage(dv);
    if (p.ptype === 0x82) return new FMapPage(dv);
    if (p.ptype === 0x83) return new PMapPage(dv);
    if (p.ptype === 0x84) return new AMapPage(dv);
    if (p.ptype === 0x85) return new FPMapPage(dv);
    if (p.ptype === 0x86) return new DListPage(dv);

    return p;
}