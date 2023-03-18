import { PropertyContext } from "../ltp/PropertyContext.js";
import { Utf8ArrayToStr } from "../utf8.js";
import { arrayBufferFromDataView, propertiesToObject } from "../util.js";

export class Message {
    #nid;
    #pc;
    #file;

    get nid () { return this.#nid; }
    // get nidParent () { return this.#node.nidParent; }

    get subject () { return /** @type {string} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_SUBJECT)); }
    get body () { return /** @type {string} */(this.#pc.getValueByKey(PropertyContext.PID_TAG_BODY)); }
    get bodyHTML () {
        const dv = this.#pc.getValueByKey(PropertyContext.PID_TAG_BODY_HTML);
        if (dv instanceof DataView) {
            const buffer = arrayBufferFromDataView(dv);
            return Utf8ArrayToStr(buffer);
        }
    }

    /**
     * @param {import("..").PSTFile} file
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
