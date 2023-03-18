import { PropertyContext } from "../ltp/PropertyContext.js";
import { EntryID } from "./EntryID.js";

export class MessageStore {
    #file;
    #pc;

    get recordKey () { return this.#pc.getValueByKey(PropertyContext.PID_TAG_RECORD_KEY); }

    get displayName () { return /** @type {Promise<string>} */ (this.#pc.getValueByKey(PropertyContext.PID_TAG_DISPLAY_NAME)); }

    get #rootFolderNID () {
        return this.#pc.getValueByKey(PropertyContext.PID_TAG_ROOT_MAILBOX).then(data => {
            if (data instanceof DataView) {
                const entryID = new EntryID(data);
                return entryID.nid;
            }
        });
    }

    get #deletedFolderNID () {
        return this.#pc.getValueByKey(PropertyContext.PID_TAG_DELETED_ITEMS).then(data => {
            if (data instanceof DataView) {
                const entryID = new EntryID(data);
                return entryID.nid;
            }
        });
    }

    get #searchFolderNID () {
        return this.#pc.getValueByKey(PropertyContext.PID_TAG_SEARCH_FOLDER).then(data => {
            if (data instanceof DataView) {
                const entryID = new EntryID(data);
                return entryID.nid;
            }
        });
    }

    get hasPassword () {
        return this.#pc.getValueByKey(PropertyContext.PID_TAG_PST_PASSWORD).then(value => typeof value !== "undefined");
    }

    /**
     * @param {import("..").PSTFile} file
     * @param {PropertyContext} pc
     */
    constructor (file, pc) {
        this.#file = file;
        this.#pc = pc;
    }

    async getRootFolder () {
        const nid = await this.#rootFolderNID;
        if (nid)
            return this.#file.getFolder(nid);
        return null;
    }

    async getDeletedFolder () {
        const nid = await this.#deletedFolderNID;
        if (nid)
            return this.#file.getFolder(nid);
        return null;
    }

    async getSearchFolder () {
        const nid = await this.#searchFolderNID;
        if (nid)
            return this.#file.getFolder(nid);
        return null;
    }

    getAllProperties () {
        return this.#pc.getAllProperties();
    }
}