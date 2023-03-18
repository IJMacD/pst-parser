import { PropertyContext } from "../ltp/PropertyContext.js";
import { propertiesToObject } from "../util.js";

export class Folder {
    #file;
    #nid;
    #pc;
    #hTC;
    #cTC;
    #aTC;

    get nid () { return this.#nid; }
    get displayName () { return /** @type {Promise<string>} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_DISPLAY_NAME)); }
    get contentCount () { return /** @type {Promise<number>} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_CONTENT_COUNT)); }
    get unreadCount () { return /** @type {Promise<number>} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_CONTENT_UNREAD_COUNT)); }
    get hasSubfolders () { return /** @type {Promise<boolean>} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_SUBFOLDERS)); }

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
        return Promise.all(Array.from({length: this.#hTC.recordCount}).map(async (_,i) => {
            const props = await this.#hTC.getAllRowProperties(i);

            const entry = propertiesToObject(props);

            entry.nid = /** @type {number} */(await this.#hTC.getCellValueByColumnTag(i, PropertyContext.PID_TAG_LTP_ROW_ID));

            return entry;
        }));
    }

    async getContents (start = 0, end = this.contentCount) {
        const keys = this.#cTC.rowIndexKeys;

        const out = [];

        if (keys.length > 0) {
            for (let i = start; i < await end && i < await this.contentCount; i++) {
                const props = await this.#cTC.getAllRowProperties(i);
                const msg = propertiesToObject(props);
                msg.nid = await this.#cTC.getCellValueByColumnTag(i, PropertyContext.PID_TAG_LTP_ROW_ID);
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

    async getAllProperties () {
        return propertiesToObject(await this.#pc.getAllProperties());
    }
}
