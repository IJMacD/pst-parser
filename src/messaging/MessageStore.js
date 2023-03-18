import { PropertyContext } from "../ltp/PropertyContext.js";
import { EntryID } from "./EntryID.js";

export class MessageStore {
    #file;
    #pc;

    get recordKey () { return this.#pc.getValueByKey(PropertyContext.PID_TAG_RECORD_KEY); }

    get displayName () { return /** @type {string} */ (this.#pc.getValueByKey(PropertyContext.PID_TAG_DISPLAY_NAME)); }

    get rootFolderNID () {
        const data = this.#pc.getValueByKey(PropertyContext.PID_TAG_ROOT_MAILBOX);
        if (data instanceof DataView) {
            const entryID = new EntryID(data);
            return entryID.nid;
        }
    }

    get deletedFolderNID () {
        const data = this.#pc.getValueByKey(PropertyContext.PID_TAG_DELETED_ITEMS);
        if (data instanceof DataView) {
            const entryID = new EntryID(data);
            return entryID.nid;
        }
    }

    get searchFolderNID () {
        const data = this.#pc.getValueByKey(PropertyContext.PID_TAG_SEARCH_FOLDER);
        if (data instanceof DataView) {
            const entryID = new EntryID(data);
            return entryID.nid;
        }
    }

    get hasPassword () {
        return typeof this.#pc.getValueByKey(PropertyContext.PID_TAG_PST_PASSWORD) !== "undefined";
    }

    /**
     * @param {import("..").PSTFile} file
     * @param {PropertyContext} pc
     */
    constructor (file, pc) {
        this.#file = file;
        this.#pc = pc;
    }

    getRootFolder () {
        if (this.rootFolderNID)
            return this.#file.getFolder(this.rootFolderNID);
        return null;
    }

    getDeletedFolder () {
        if (this.deletedFolderNID)
            return this.#file.getFolder(this.deletedFolderNID);
        return null;
    }

    getSearchFolder () {
        if (this.searchFolderNID)
            return this.#file.getFolder(this.searchFolderNID);
        return null;
    }

    getAllProperties () {
        return this.#pc.getAllProperties();
    }
}