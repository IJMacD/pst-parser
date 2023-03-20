import { Header } from "./Header.js";

import { Page } from "../nbr/Page.js";
import { BTPage } from "../nbr/Page.js";
import { BREF } from "../nbr/BREF.js";
import { NodeEntry } from "../nbr/NodeEntry.js";
import { BlockEntry } from "../nbr/BlockEntry.js";
import { DataBlock } from "../nbr/DataBlock.js";
import { InternalBlock } from "../nbr/InternalBlock.js";
import { XBlock } from "../nbr/XBlock.js";
import { XXBlock } from "../nbr/XXBlock.js";
import { SubnodeIntermediateBlock } from "../nbr/SubnodeIntermediateBlock.js";
import { SubnodeLeafBlock } from "../nbr/SubnodeLeafBlock.js";
import { CryptPermute } from "../nbr/permute.js";

import { PropertyContext } from "../ltp/PropertyContext.js";
import { TableContext } from "../ltp/TableContext.js";

import { MessageStore } from "../messaging/MessageStore.js";
import { Folder } from "../messaging/Folder.js";
import { Message } from "../messaging/Message.js";

import { h } from "../util.js";

export class PSTFile {
    #buffer;
    #header;

    #rootNBTPage;
    #rootBBTPage;

    static NID_MESSAGE_STORE    = 0x0021;
    static NID_ROOT_FOLDER      = 0x0122;

    static #PST_MAGIC = "!BDN";

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        this.#buffer = buffer;
        this.#header = new Header(new DataView(buffer));

        if (this.#header.dwMagic !== PSTFile.#PST_MAGIC) {
            throw Error("Does not look like a PST file");
        }

        const rootNBTPage = this.#getPage(this.#header.root.BREFNBT.ib);
        if (!(rootNBTPage instanceof BTPage)) {
            throw Error("Root NBT Page was not correct page type");
        }
        this.#rootNBTPage = rootNBTPage;

        const rootBBTPage = this.#getPage(this.#header.root.BREFBBT.ib);
        if (!(rootBBTPage instanceof BTPage)) {
            throw Error("Root BBT Page was not correct page type");
        }
        this.#rootBBTPage = rootBBTPage;
    }

    /**
     * @param {number|bigint} ib
     */
    #getPage (ib) {
        const offset = typeof ib === "bigint" ? parseInt(ib.toString()) : ib;
        const dv = new DataView(this.#buffer, offset);
        return Page.getPage(dv);
    }

    /**
     * @param {number|bigint} nid
     */
    #getNode (nid) {
        const entry = this.#rootNBTPage.findEntry(nid);
        if (!(entry instanceof NodeEntry)) {
            throw Error("Expected NBT Entry");
        }
        return entry;
    }

    getAllNodeKeys () {
        return this.#rootNBTPage.getAllKeys();
    }

    /**
     * @param {number} nidType
     */
    getAllNodeKeysOfType (nidType) {
        const nodeKeys = this.#rootNBTPage.getAllKeys();
        return nodeKeys.filter(nid => NodeEntry.getNIDType(nid) === nidType);
    }

    /**
     * @param {number} nidType
     */
    getAllNodesOfType (nidType) {
        return this.getAllNodeKeysOfType(nidType).map(nid => this.#getNode(nid));
    }

    /**
     * @param {bigint} bid
     */
    #getBlock (bid) {
        const entry = this.#rootBBTPage.findEntry(bid);

        if (entry instanceof BlockEntry) {
            const offset = parseInt(entry.BREF.ib.toString());
            const dv = new DataView(this.#buffer, offset);

            if (BREF.isInternalBID(bid)) {
                const b = new InternalBlock(dv, entry.cb);

                if (b.bType === 0x01 && b.cLevel === 1) {
                    return new XBlock(dv, entry.cb);
                }
                else if (b.bType === 0x01 && b.cLevel === 2) {
                    return new XXBlock(dv, entry.cb);
                }
                else if (b.bType === 0x02 && b.cLevel === 0) {
                    return new SubnodeLeafBlock(dv, entry.cb);
                }
                else if (b.bType === 0x02 && b.cLevel > 0) {
                    return new SubnodeIntermediateBlock(dv, entry.cb);
                }
            }
            else {
                return new DataBlock(dv, entry.cb);
            }
        }
    }

    /**
     * @param {bigint} bid
     * @param {DataView} [target]
     * @returns {DataView}
     */
    #getBlockData (bid, target) {
        const block = this.#getBlock(bid);

        if (!block) {
            throw Error("Cannot find bid: 0x" + h(bid));
        }

        if (block instanceof DataBlock) {

            if (this.#header.bCryptMethod === 1) {
                const data = block.data;

                if (target instanceof DataView) {
                    // If we were given a dataView then we don't need to create
                    // a new DataView. We can permute directly into the
                    // dataView our caller wants.

                    CryptPermute(data, data.byteLength, false, target);

                    return target;
                }

                // Caller just wants a fresh ArrayBuffer
                const out = new DataView(new ArrayBuffer(data.byteLength));
                CryptPermute(data, data.byteLength, false, out);
                return out;
            }

            // No permutation required

            if (target instanceof DataView) {
                // If we were given a dataView we need to copy from the block
                // into the dataView our caller wants.
                const { buffer, byteOffset, byteLength } = block.data;
                const source = new Uint8Array(buffer, byteOffset, byteLength);
                const dest = new Uint8Array(target.buffer, target.byteOffset, target.byteLength);
                dest.set(source);
            }

            return block.data;
        }

        if (block instanceof XBlock) {
            const out = new ArrayBuffer(block.cEnt * 8192);

            for (let i = 0; i < block.cEnt; i++) {
                const dataBid = block.getBID(i);
                this.#getBlockData(dataBid, new DataView(out, i * 8192, 8192));
            }

            return new DataView(out);
        }

        if (block instanceof SubnodeIntermediateBlock) {
            throw Error("Unimplemented: SubnodeIntermediateBlock");
        }

        if (block instanceof SubnodeLeafBlock) {
            throw Error("You must use getNodeSubDataAccessor() to get Subnode data");
        }

        throw Error("Unimplemented: Get data for block type 0x" + h(block.bType));
    }

    /**
     * @param {number | bigint} nid
     */
    #getNodeData (nid) {
        const entry = this.#rootNBTPage.findEntry(nid);

        if (!entry) {
            throw Error(`Node with NID: 0x${h(nid)} not found`);
        }

        if (!(entry instanceof NodeEntry)) {
            throw Error("Expected NBT Entry");
        }

        return this.#getBlockData(entry.bidData);
    }

    /**
     * @param {number | bigint} nid
     * @returns {(nid: number) => DataView}
     */
    #getNodeSubDataAccessor (nid) {
        const entry = this.#rootNBTPage.findEntry(nid);

        if (!(entry instanceof NodeEntry)) {
            throw Error("Expected NBT Entry");
        }

        return (/** @type {number} */ internalNid) => {

            if (entry.bidSub === 0n) {
                return new DataView(new ArrayBuffer(0));
            }

            const block = this.#getBlock(entry.bidSub);

            if (!block) {
                throw Error("Unable to find block with bid " + entry.bidSub);
            }

            if (!(block instanceof SubnodeLeafBlock)) {
                throw Error("Expected SubnodeLeafBlock");
            }

            for (let i = 0; i < block.cEnt; i++) {
                const e = block.getEntry(i);
                const nid = parseInt((e.nid & 0xFFFFFFFFn).toString());
                if (nid === internalNid) {
                    return this.#getBlockData(e.bidData);
                }
            }

            throw Error(`SubnodeLeafBlock does not contain internal nid ${internalNid}`);
        }
    }

    /**
     * @param {number} nid
     */
    #getPropertyContext (nid) {
        const data = this.#getNodeData(nid);
        const subDataAccessor = this.#getNodeSubDataAccessor(nid);

        if (data) {
            return new PropertyContext(data, subDataAccessor);
        }
    }

    #getTableContext (nid) {
        const data = this.#getNodeData(nid);
        const subDataAccessor = this.#getNodeSubDataAccessor(nid);

        return new TableContext(data, subDataAccessor);
    }

    getMessageStore () {
        const pc = this.#getPropertyContext(PSTFile.NID_MESSAGE_STORE);
        if (pc) {
            return new MessageStore(this, pc);
        }
        return null;
    }

    getRootFolder () {
        return this.getFolder(PSTFile.NID_ROOT_FOLDER);
    }

    /**
     * @param {number} nid
     */
    getFolder (nid) {
        const hierarchyNid = NodeEntry.makeNID(nid, NodeEntry.NID_TYPE_HIERARCHY_TABLE);
        const contentsNid = NodeEntry.makeNID(nid, NodeEntry.NID_TYPE_CONTENTS_TABLE);
        const assocContentsNid = NodeEntry.makeNID(nid, NodeEntry.NID_TYPE_ASSOC_CONTENTS_TABLE);

        const pc = this.#getPropertyContext(nid);

        const hTc = this.#getTableContext(hierarchyNid);

        const cTc = this.#getTableContext(contentsNid);

        const aTc = this.#getTableContext(assocContentsNid);


        if (pc && hTc && cTc && aTc) {
            return new Folder(this, nid, pc, hTc, cTc, aTc);
        }

        return null;
    }

    /**
     * @param {number} nid
     */
    getMessage (nid) {
        if (NodeEntry.getNIDType(nid) === NodeEntry.NID_TYPE_NORMAL_MESSAGE) {
            const pc = this.#getPropertyContext(nid);
            if (pc) {
                return new Message(this, nid, pc)
            }
        }
    }
}
