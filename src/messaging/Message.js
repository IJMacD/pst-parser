import { PropertyContext } from "../ltp/PropertyContext.js";
import { Utf8ArrayToStr } from "../utf8.js";
import { propertiesToObject } from "../util/propertiesToObject.js";
import { arrayBufferFromDataView } from "../util/arrayBufferFromDataView.js";
import * as Tags from "../ltp/Tags.js";
import { spGetSubject } from "../util/spGetSubject.js";
import { MF_HAS_ATTACH } from "./MessageFlags.js";
import { TableContext } from "../ltp/TableContext.js";

export class Message {
    #pstContext;
    #nid;
    #pc;
    /** @type {TableContext?} */
    #recipients;
    /** @type {TableContext?} */
    #attachments;

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

    get hasAttachments () {
        const flags = /** @type {number|undefined} */(this.#pc.getValueByKey(Tags.PID_TAG_MESSAGE_FLAGS));
        if (typeof flags === "undefined") return;
        return Boolean(flags & MF_HAS_ATTACH);
    }

    /**
     * @param {import("../file/PSTFile").PSTContext} pstContext
     * @param {number} nid
     * @param {PropertyContext} pc
     * @param {import('../ltp/TableContext').TableContext?} recipients
     * @param {import('../ltp/TableContext').TableContext?} attachments
     */
    constructor (pstContext, nid, pc, recipients, attachments) {
        this.#pstContext = pstContext;
        this.#nid = nid;
        this.#pc = pc;
        this.#recipients = recipients;
        this.#attachments = attachments;
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

        return recipients;
    }

    getAttachmentEntries () {
        const attachments = [];

        if (this.#attachments) {
            for (let i = 0; i < this.#attachments.recordCount; i++) {
                attachments.push(propertiesToObject(this.#attachments.getAllRowProperties(i)));
            }
        }

        return attachments;
    }

    /**
     * @param {number} index
     */
    getAttachment (index) {
        if (index < 0) return null;

        if (this.#attachments) {
            const attachmentPCNid = this.#attachments.getCellValueByColumnTag(index, Tags.PID_TAG_LTP_ROW_ID);

            if (typeof attachmentPCNid === "number") {
                const pc = this.#pstContext.getSubPropertyContext(attachmentPCNid);

                if (!pc) {
                    throw Error("Unable to find Attachment PropertyContext");
                }

                return propertiesToObject(pc.getAllProperties());
            }
        }

    }
}
