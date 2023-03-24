import { PropertyContext } from "../ltp/PropertyContext.js";
import { Utf8ArrayToStr } from "../utf8.js";
import { propertiesToObject } from "../util/propertiesToObject.js";
import { arrayBufferFromDataView } from "../util/arrayBufferFromDataView.js";
import * as Tags from "../ltp/Tags.js";
import { spGetSubject } from "../util/spGetSubject.js";

export class Message {
    #nid;
    #pc;
    #file;
    #recipients;

    get nid () { return this.#nid; }
    // get nidParent () { return this.#node.nidParent; }

    get subject () {
        return spGetSubject(/** @type {string|undefined} */(this.#pc.getValueByKey(Tags.PID_TAG_SUBJECT))||"");
    }
    get body () { return /** @type {string|undefined} */(this.#pc.getValueByKey(Tags.PID_TAG_BODY)); }
    get bodyHTML () {
        const dv = this.#pc.getValueByKey(Tags.PID_TAG_BODY_HTML);
        if (dv instanceof DataView) {
            const buffer = arrayBufferFromDataView(dv);
            return Utf8ArrayToStr(buffer);
        }
    }

    /**
     * @param {import("..").PSTFile} file
     * @param {number} nid
     * @param {PropertyContext} pc
     * @param {import('../ltp/TableContext').TableContext?} recipients
     */
    constructor (file, nid, pc, recipients) {
        this.#file = file;
        this.#nid = nid;
        this.#pc = pc;
        this.#recipients = recipients;

        // console.log(`Recipient Count: ${this.#recipients.recordCount}`);
        // console.log(`Column Count: ${this.#recipients.columnDescriptions.length}`);
        // console.log(this.#recipients.getAllRowProperties(0));
    }

    getAllProperties () {
        return propertiesToObject(this.#pc.getAllProperties());
    }

    getAllRecipients () {
        const recipients = [];

        if (this.#recipients) {
            for (let i = 0; i < this.#recipients.recordCount; i++) {
                recipients.push(propertiesToObject(this.#recipients.getAllRowProperties(i)));
            }
        }

        return recipients
    }
}
