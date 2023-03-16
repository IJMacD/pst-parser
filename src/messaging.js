import { PSTFile } from "./index.js";
import { PropertyContext, TableContext } from "./ltp.js";
import { Utf8ArrayToStr } from "./utf8.js";

export class MessageStore {
    #file;
    #pc;

    get recordKey () { return this.#pc.getValueByKey(PropertyContext.PID_TAG_RECORD_KEY); }

    get displayName () { return /** @type {string} */ (this.#pc.getValueByKey(PropertyContext.PID_TAG_DISPLAY_NAME)); }

    get rootFolderNID () {
        const data = this.#pc.getValueByKey(PropertyContext.PID_TAG_ROOT_MAILBOX);
        if (data instanceof ArrayBuffer) {
            const entryID = new EntryID(data);
            return entryID.nid;
        }
    }

    get deletedFolderNID () {
        const data = this.#pc.getValueByKey(PropertyContext.PID_TAG_DELETED_ITEMS);
        if (data instanceof ArrayBuffer) {
            const entryID = new EntryID(data);
            return entryID.nid;
        }
    }

    get searchFolderNID () {
        const data = this.#pc.getValueByKey(PropertyContext.PID_TAG_SEARCH_FOLDER);
        if (data instanceof ArrayBuffer) {
            const entryID = new EntryID(data);
            return entryID.nid;
        }
    }

    get hasPassword () {
        return typeof this.#pc.getValueByKey(PropertyContext.PID_TAG_PST_PASSWORD) !== "undefined";
    }

    /**
     * @param {PSTFile} file
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

class EntryID {
    #dv;

    get rgbFlags () { return this.#dv.getUint32(0, true); }
    get uid () { return this.#dv.buffer.slice(4, 4 + 16); }
    get nid () { return this.#dv.getUint32(20, true); }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        this.#dv = new DataView(buffer);
    }
}

export class Message {
    #nid;
    #pc;
    #file;

    get nid () { return this.#nid; }
    // get nidParent () { return this.#node.nidParent; }

    get subject () { return /** @type {string} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_SUBJECT)); }
    get body () { return /** @type {string} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_BODY)); }
    get bodyHTML () {
        const bytes = this.#pc.getValueByKey(PropertyContext.PID_TAG_BODY_HTML);
        // TODO: Should be UTF-8 decoder etc.
        return bytes instanceof ArrayBuffer ? Utf8ArrayToStr(bytes) : void 0;
    }

    /**
     * @param {PSTFile} file
     * @param {number} nid
     * @param {PropertyContext} pc
     */
    constructor (file, nid, pc) {
        this.#file = file;
        this.#nid = nid;
        this.#pc = pc;
    }

    getAllProperties () {
        return propertiesToObject(this.#pc.getAllProperties());
    }
}

export class Folder {
    #file;
    #nid;
    #pc;
    #hTC;
    #cTC;
    #aTC;

    get nid () { return this.#nid; }
    get displayName () { return /** @type {string} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_DISPLAY_NAME)); }
    get contentCount () { return /** @type {number} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_CONTENT_COUNT)); }
    get unreadCount () { return /** @type {number} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_CONTENT_UNREAD_COUNT)); }
    get hasSubfolders () { return /** @type {boolean} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_SUBFOLDERS)); }

    /**
     * @param {PSTFile} file
     * @param {number} nid
     * @param {PropertyContext} pc
     * @param {TableContext} hTC
     * @param {TableContext} cTC
     * @param {TableContext} aTC
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

            entry.nid = /** @type {number} */(this.#hTC.getCellValueByColumnTag(i, PropertyContext.PID_TAG_LTP_ROW_ID));

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
                msg.nid = this.#cTC.getCellValueByColumnTag(i, PropertyContext.PID_TAG_LTP_ROW_ID);
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

function propertiesToObject (properties) {
    const out = {};
    for (const prop of properties) {
        out[prop.tagName||prop.tagHex] = prop.value;
    }
    return out;
}