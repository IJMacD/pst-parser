import { PropertyContext } from "../ltp/PropertyContext.js";
import { propertiesToObject } from "../util.js";
import * as Tags from "../ltp/Tags.js";

export class Folder {
    #file;
    #nid;
    #pc;
    #hTC;
    #cTC;
    #aTC;

    get nid () { return this.#nid; }
    get displayName () { return /** @type {string} */(this.#pc.getValueByKey(Tags.PID_TAG_DISPLAY_NAME)); }
    get contentCount () { return /** @type {number} */(this.#pc.getValueByKey(Tags.PID_TAG_CONTENT_COUNT)); }
    get unreadCount () { return /** @type {number} */(this.#pc.getValueByKey(Tags.PID_TAG_CONTENT_UNREAD_COUNT)); }
    get hasSubfolders () { return /** @type {boolean} */(this.#pc.getValueByKey(Tags.PID_TAG_SUBFOLDERS)); }

    /**
     * @param {import("..").PSTFile} file
     * @param {number} nid
     * @param {PropertyContext} pc
     * @param {import("../ltp/TableContext").TableContext} hTC
     * @param {import("../ltp/TableContext").TableContext} cTC
     * @param {import("../ltp/TableContext").TableContext} aTC
     */
    constructor (file, nid, pc, hTC, cTC, aTC) {
        this.#file = file;
        this.#nid = nid;
        this.#pc = pc;
        this.#hTC = hTC;
        this.#cTC = cTC;
        this.#aTC = aTC;
    }

    getSubFolderEntries () {
        return Array.from({length: this.#hTC.recordCount}).map((_,i) => {
            const props = this.#hTC.getAllRowProperties(i);

            const entry = propertiesToObject(props);

            entry.nid = /** @type {number} */(this.#hTC.getCellValueByColumnTag(i, Tags.PID_TAG_LTP_ROW_ID));

            return entry;
        });
    }

    getContents (start = 0, end = this.contentCount) {
        const keys = this.#cTC.rowIndexKeys;

        const out = [];

        if (keys.length > 0) {
            for (let i = start; i < end && i < this.contentCount; i++) {
                const props = this.#cTC.getAllRowProperties(i);
                const msg = propertiesToObject(props);
                msg.nid = this.#cTC.getCellValueByColumnTag(i, Tags.PID_TAG_LTP_ROW_ID);
                out.push(msg);
            }
        }

        return out;
    }

    /**
     * @param {number} nid
     */
    getSubFolder (nid) {
        return this.#file.getFolder(nid);
    }

    /**
     * @param {number} nid
     */
    getMessage (nid) {
        return this.#file.getMessage(nid);
    }

    getAllProperties () {
        return propertiesToObject(this.#pc.getAllProperties());
    }
}
