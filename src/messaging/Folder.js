import { PropertyContext } from "../ltp/PropertyContext.js";
import { TableContext } from "../ltp/TableContext.js";
import { arrayBufferFromDataView, propertiesToObject } from "../util.js";

export class Folder {
    #file;
    #nid;
    #data;
    #subFolderEntries;
    #cTC;
    #aTC;

    get nid () { return this.#nid; }
    get displayName () { return /** @type {string} */(this.getProperty(PropertyContext.PID_TAG_DISPLAY_NAME)); }
    get contentCount () { return /** @type {number} */(this.getProperty(PropertyContext.PID_TAG_CONTENT_COUNT)); }
    get unreadCount () { return /** @type {number} */(this.getProperty(PropertyContext.PID_TAG_CONTENT_UNREAD_COUNT)); }
    get hasSubfolders () { return /** @type {boolean} */(this.getProperty(PropertyContext.PID_TAG_SUBFOLDERS)); }

    /**
     * @param {import("../file/PSTFile").PSTFile} file
     * @param {number} nid
     * @param {import("../util.js").PropertyData[]} data
     * @param {object[]} subFolderEntries
     * @param {TableContext} cTC
     * @param {object[]?} aTC
     */
    constructor (file, nid, data, subFolderEntries, cTC, aTC) {
        this.#file = file;
        this.#nid = nid;
        this.#data = data;
        this.#subFolderEntries = subFolderEntries;
        this.#cTC = cTC;
        this.#aTC = aTC;
    }

    getSubFolderEntries () {
        return this.#subFolderEntries;
    }

    async getContents (start = 0, end = this.contentCount) {
        const keys = this.#cTC.rowIndexKeys;

        const out = [];

        if (keys.length > 0) {
            for (let i = start; i < end && i < this.contentCount; i++) {
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


    /**
     * @param {number} key
     */
    getProperty (key) {
        const data = this.#data.find(pd => pd.tag === key);
        if (!data) return;
        const { value } = data;
        if (value instanceof DataView) {
            return arrayBufferFromDataView(value);
        }
        return value;
    }

    getAllProperties () {
        return propertiesToObject(this.#data);
    }
}
