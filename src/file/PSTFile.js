
import * as NodeTypes from "../nbr/NodeTypes.js";
import { MessageStore } from "../messaging/MessageStore.js";
import { Folder } from "../messaging/Folder.js";
import { Message } from "../messaging/Message.js";
import { PSTInternal } from "./PSTInternal.js";


export class PSTFile {
    #internal;

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        this.#internal = new PSTInternal(buffer);
    }

    getMessageStore () {
        const pc = this.#internal.getPropertyContext(NodeTypes.NID_MESSAGE_STORE);
        if (pc) {
            return new MessageStore(this, pc);
        }
        return null;
    }

    getRootFolder () {
        return this.getFolder(NodeTypes.NID_ROOT_FOLDER);
    }

    /**
     * @param {number} nid
     */
    getFolder (nid) {
        const hierarchyNid = NodeTypes.makeNID(nid, NodeTypes.NID_TYPE_HIERARCHY_TABLE);
        const contentsNid = NodeTypes.makeNID(nid, NodeTypes.NID_TYPE_CONTENTS_TABLE);
        const assocContentsNid = NodeTypes.makeNID(nid, NodeTypes.NID_TYPE_ASSOC_CONTENTS_TABLE);

        const pc = this.#internal.getPropertyContext(nid);

        const hTc = this.#internal.getTableContext(hierarchyNid);

        const cTc = this.#internal.getTableContext(contentsNid);

        const aTc = this.#internal.getTableContext(assocContentsNid);


        if (pc && hTc && cTc && aTc) {
            return new Folder(this, nid, pc, hTc, cTc, aTc);
        }

        return null;
    }

    /**
     * @param {number} nid
     */
    getMessage (nid) {
        if (NodeTypes.getNIDType(nid) === NodeTypes.NID_TYPE_NORMAL_MESSAGE) {
            const pc = this.#internal.getPropertyContext(nid);

            const pstContext = this.#internal.getPSTContext(nid);

            let recipientTable = pstContext.getSubTableContext(NodeTypes.NID_RECIPIENT_TABLE);;
            let attachmentTable = pstContext.getSubTableContext(NodeTypes.NID_ATTACHMENT_TABLE);

            if (pc) {
                return new Message(pstContext, nid, pc, recipientTable, attachmentTable);
            }
        }
    }
}
