import { PropertyContext } from "../ltp/PropertyContext.js";
import { EntryID } from "./EntryID.js";
import * as Tags from "../ltp/Tags.js";

export class MessageStore {
    #file;
    #pc;

    get recordKey () { return this.#pc.getValueByKey(Tags.PID_TAG_RECORD_KEY); }

    get displayName () { return /** @type {string} */ (this.#pc.getValueByKey(Tags.PID_TAG_DISPLAY_NAME)); }

    get rootFolderNID () {
        const data = this.#pc.getValueByKey(Tags.PID_TAG_ROOT_MAILBOX);
        if (data instanceof DataView) {
            const entryID = new EntryID(data);
            return entryID.nid;
        }
    }

    get deletedFolderNID () {
        const data = this.#pc.getValueByKey(Tags.PID_TAG_DELETED_ITEMS);
        if (data instanceof DataView) {
            const entryID = new EntryID(data);
            return entryID.nid;
        }
    }

    get searchFolderNID () {
        const data = this.#pc.getValueByKey(Tags.PID_TAG_SEARCH_FOLDER);
        if (data instanceof DataView) {
            const entryID = new EntryID(data);
            return entryID.nid;
        }
    }

    get hasPassword () {
        return typeof this.#pc.getValueByKey(Tags.PID_TAG_PST_PASSWORD) !== "undefined";
    }

    /**
     * @param {import("..").PSTFile} file
     * @param {PropertyContext} pc
     */
    constructor (file, pc) {
        this.#file = file;
        this.#pc = pc;
    }

    /**
     * @param {number} [nid]
     */
    getFolder (nid) {
        if (nid)
            return this.#file.getFolder(nid);
        return null;
    }

    getRootFolder () {
        return this.getFolder(this.rootFolderNID);
    }

    getDeletedFolder () {
        return this.getFolder(this.deletedFolderNID);
    }

    getSearchFolder () {
        return this.getFolder(this.searchFolderNID);
    }

    getAllProperties () {
        return this.#pc.getAllProperties();
    }
}