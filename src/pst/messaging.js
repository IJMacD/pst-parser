import { PropertyContext } from "./ltp";

export class MessageStore {
    #pc;

    get displayName () { return this.#pc.getPCValueByKey(PropertyContext.PID_TAG_DISPLAY_NAME); }

    /**
     * @param {PropertyContext} pc
     */
    constructor (pc) {
        this.#pc = pc;
    }
}

export class Message {
    #node;
    #pc;

    get nid () { return this.#node.nid; }
    // get nidParent () { return this.#node.nidParent; }

    get subject () { return this.#pc.getPCValueByKey(PropertyContext.PID_TAG_SUBJECT); }
    get body () { return this.#pc.getPCValueByKey(PropertyContext.PID_TAG_BODY); }
    get bodyHTML () {
        const bytes = this.#pc.getPCValueByKey(PropertyContext.PID_TAG_BODY_HTML);
        // TODO: Should be UTF-8 decoder etc.
        return bytes instanceof ArrayBuffer ? String.fromCharCode(...new Uint8Array(bytes)) : void 0;
    }

    /**
     * @param {import("./nbr").Node} node
     * @param {PropertyContext} pc
     */
    constructor (node, pc) {
        this.#node = node;
        this.#pc = pc;
    }
}
export class Folder {
    #pc;

    get displayName () { return this.#pc.getPCValueByKey(PropertyContext.PID_TAG_DISPLAY_NAME); }

    /**
     * @param {PropertyContext} pc
     */
    constructor (pc) {
        this.#pc = pc;
    }
}