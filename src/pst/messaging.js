import { PropertyContext, TableContext } from "./ltp.js";

export class MessageStore {
    #pc;

    get recordKey () { return this.#pc.getValueByKey(PropertyContext.PID_TAG_RECORD_KEY); }

    get displayName () { return this.#pc.getValueByKey(PropertyContext.PID_TAG_DISPLAY_NAME); }

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
     * @param {PropertyContext} pc
     */
    constructor (pc) {
        this.#pc = pc;
    }
}

export class EntryID {
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
    #node;
    #pc;

    get nid () { return this.#node.nid; }
    // get nidParent () { return this.#node.nidParent; }

    get subject () { return this.#pc.getValueByKey(PropertyContext.PID_TAG_SUBJECT); }
    get body () { return this.#pc.getValueByKey(PropertyContext.PID_TAG_BODY); }
    get bodyHTML () {
        const bytes = this.#pc.getValueByKey(PropertyContext.PID_TAG_BODY_HTML);
        // TODO: Should be UTF-8 decoder etc.
        return bytes instanceof ArrayBuffer ? String.fromCharCode(...new Uint8Array(bytes)) : void 0;
    }

    /**
     * @param {import("./nbr.js").NodeEntry} node
     * @param {PropertyContext} pc
     */
    constructor (node, pc) {
        this.#node = node;
        this.#pc = pc;
    }

    getAllProperties () {
        return this.#pc.getAllProperties();
    }
}

export class Folder {
    #pc;
    #hTC;
    #cTC;
    #aTC;

    get displayName () { return /** @type {string} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_DISPLAY_NAME)); }
    get contentCount () { return /** @type {number} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_CONTENT_COUNT)); }
    get unreadCount () { return /** @type {number} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_CONTENT_UNREAD_COUNT)); }
    get hasSubfolders () { return /** @type {boolean} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_SUBFOLDERS)); }

    /**
     * @param {PropertyContext} pc
     * @param {TableContext} hTC
     * @param {TableContext} cTC
     * @param {TableContext} aTC
     */
    constructor (pc, hTC, cTC, aTC) {
        this.#pc = pc;
        this.#hTC = hTC;
        this.#cTC = cTC;
        this.#aTC = aTC;
    }

    getSubFolders () {
        return Array.from({length: this.#hTC.recordCount}).map((_,i) => {
            const nid = /** @type {number} */(this.#hTC.getCellValueByColumnTag(i, PropertyContext.PID_TAG_LTP_ROW_ID));
            const displayName = this.#hTC.getCellValueByColumnTag(i, PropertyContext.PID_TAG_DISPLAY_NAME);
            const contentCount = this.#hTC.getCellValueByColumnTag(i, PropertyContext.PID_TAG_CONTENT_COUNT);
            const hasSubfolders = this.#hTC.getCellValueByColumnTag(i, PropertyContext.PID_TAG_SUBFOLDERS);

            return { nid, displayName, contentCount, hasSubfolders };
        });
    }

    getMessages () {
        const keys = this.#cTC.rowIndexKeys;

        const out = [];

        if (keys.length > 0) {
            for (let i = 0; i < this.contentCount && i < 10; i++) {
                const msg = {};
                const props = this.#cTC.getAllRowProperties(i);
                for (const prop of props) {
                    msg[prop.tagName||prop.tagHex] = prop.value;
                }
                msg.nid = this.#cTC.getCellValueByColumnTag(i, PropertyContext.PID_TAG_LTP_ROW_ID);
                out.push(msg);
            }
        }

        return out;
    }

    getAllProperties () {
        return this.#pc.getAllProperties();
    }
}