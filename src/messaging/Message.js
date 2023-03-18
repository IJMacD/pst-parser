import { PropertyContext } from "../ltp/PropertyContext.js";
import { Utf8ArrayToStr } from "../utf8.js";
import { arrayBufferFromDataView, propertiesToObject } from "../util.js";

export class Message {
    #nid;
    #data;

    get nid () { return this.#nid; }
    // get nidParent () { return this.#node.nidParent; }

    get subject () { return /** @type {string} */(this.getProperty(PropertyContext.PID_TAG_SUBJECT)); }
    get body () { return /** @type {string} */(this.getProperty(PropertyContext.PID_TAG_BODY)); }
    get bodyHTML () {
        const value = this.getProperty(PropertyContext.PID_TAG_BODY_HTML);
        if (value instanceof ArrayBuffer) {
            return Utf8ArrayToStr(value);
        }
    }

    /**
     * @param {number} nid
     * @param {import("../util.js").PropertyData[]} data
     */
    constructor (nid, data) {
        this.#nid = nid;
        this.#data = data;
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
