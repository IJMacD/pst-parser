import { PropertyContext } from "../ltp/PropertyContext.js";
import { arrayBufferFromDataView, propertiesToObject } from "../util.js";
import { EntryID } from "./EntryID.js";

export class MessageStore {
    #file;
    #data;

    get recordKey () { return this.getProperty(PropertyContext.PID_TAG_RECORD_KEY); }

    get displayName () { return /** @type {string} */ (this.getProperty(PropertyContext.PID_TAG_DISPLAY_NAME)); }

    get #rootFolderNID () {
        const data = this.getProperty(PropertyContext.PID_TAG_ROOT_MAILBOX);
        if (data instanceof ArrayBuffer) {
            const entryID = new EntryID(new DataView(data));
            return entryID.nid;
        }
    }

    get #deletedFolderNID () {
        const data =  this.getProperty(PropertyContext.PID_TAG_DELETED_ITEMS);
        if (data instanceof ArrayBuffer) {
            const entryID = new EntryID(new DataView(data));
            return entryID.nid;
        }
    }

    get #searchFolderNID () {
        const data = this.getProperty(PropertyContext.PID_TAG_SEARCH_FOLDER);
        if (data instanceof ArrayBuffer) {
            const entryID = new EntryID(new DataView(data));
            return entryID.nid;
        }
    }

    get hasPassword () {
        return typeof this.getProperty(PropertyContext.PID_TAG_PST_PASSWORD) !== "undefined";
    }

    /**
     * @param {import("..").PSTFile} file
     * @param {import("../util.js").PropertyData[]} data
     */
    constructor (file, data) {
        this.#file = file;
        this.#data = data;
    }

    getRootFolder () {
        if (this.#rootFolderNID)
            return this.#file.getFolder(this.#rootFolderNID);
        return null;
    }

    getDeletedFolder () {
        if (this.#deletedFolderNID)
            return this.#file.getFolder(this.#deletedFolderNID);
        return null;
    }

    getSearchFolder () {
        if (this.#searchFolderNID)
            return this.#file.getFolder(this.#searchFolderNID);
        return null;
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