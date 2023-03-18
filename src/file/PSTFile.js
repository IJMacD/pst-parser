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

import { h, propertiesToObject } from "../util.js";

export class PSTFile {
    #blob;
    #header;

    /**Do not use directly. Use `getRootNBTPage()` instead */
    #rootNBTPage;
    /** Do not use directly. Use `getRootBBTPage()` instead */
    #rootBBTPage;

    static NID_MESSAGE_STORE    = 0x0021;
    static NID_ROOT_FOLDER      = 0x0122;

    static #PST_MAGIC = "!BDN";

    /**
     *
     * @param {Blob} blob
     * @param {ArrayBuffer} headerBuffer Must be at least the first 564 bytes of the file
     */
    constructor (blob, headerBuffer) {
        this.#blob = blob;

        this.#header = new Header(headerBuffer);

        if (this.#header.dwMagic !== PSTFile.#PST_MAGIC) {
            throw Error("Does not look like a PST file");
        }
    }

    /**
     *
     * @returns {Promise<BTPage>}
     */
    async #getRootNBTPage () {
        if (!this.#rootNBTPage) {
            const rootNBTPage = await this.getPage(this.#header.root.BREFNBT.ib);
            if (!(rootNBTPage instanceof BTPage)) {
                throw Error("Root NBT Page was not correct page type");
            }
            this.#rootNBTPage = rootNBTPage;
        }
        return this.#rootNBTPage;
    }

    /**
     *
     * @returns {Promise<BTPage>}
     */
    async #getRootBBTPage () {
        if (!this.#rootBBTPage) {
            const rootBBTPage = await this.getPage(this.#header.root.BREFBBT.ib);
            if (!(rootBBTPage instanceof BTPage)) {
                throw Error("Root BBT Page was not correct page type");
            }
            this.#rootBBTPage = rootBBTPage;
        }
        return this.#rootBBTPage;
    }

    /**
     * @param {number|bigint} ib
     */
    async getPage (ib) {
        const offset = typeof ib === "bigint" ? parseInt(ib.toString()) : ib;
        const blob = this.#blob.slice(offset, offset + 512);
        const buffer = await blob.arrayBuffer();
        return Page.getPage(buffer, this);
    }

    /**
     * @param {number|bigint} nid
     */
    async #getNode (nid) {
        const entry = (await this.#getRootNBTPage()).findEntry(nid);
        if (!(entry instanceof NodeEntry)) {
            throw Error("Expected NBT Entry");
        }
        return entry;
    }

    async getAllNodeKeys () {
        return (await this.#getRootNBTPage()).getAllKeys();
    }

    /**
     * @param {number} nidType
     */
    async getAllNodeKeysOfType (nidType) {
        const nodeKeys = await this.getAllNodeKeys();
        return nodeKeys.filter(nid => NodeEntry.getNIDType(nid) === nidType);
    }

    /**
     * @param {number} nidType
     */
    async getAllNodesOfType (nidType) {
        const nodeKeys = await this.getAllNodeKeysOfType(nidType);
        return nodeKeys.map(nid => this.#getNode(nid));
    }

    /**
     * @param {bigint} bid
     */
    async #getBlock (bid) {
        const entry = await (await this.#getRootBBTPage()).findEntry(bid);

        if (entry instanceof BlockEntry) {
            const offset = parseInt(entry.BREF.ib.toString());
            const blockSize = Math.ceil((entry.cb + 16)/64)*64;
            const buffer = await this.#blob.slice(offset, offset + blockSize).arrayBuffer();

            if (BREF.isInternalBID(bid)) {
                const b = new InternalBlock(buffer, entry.cb);

                if (b.bType === 0x01 && b.cLevel === 1) {
                    return new XBlock(buffer, entry.cb);
                }
                else if (b.bType === 0x01 && b.cLevel === 2) {
                    return new XXBlock(buffer, entry.cb);
                }
                else if (b.bType === 0x02 && b.cLevel === 0) {
                    return new SubnodeLeafBlock(buffer, entry.cb);
                }
                else if (b.bType === 0x02 && b.cLevel > 0) {
                    return new SubnodeIntermediateBlock(buffer, entry.cb);
                }
            }
            else {
                return new DataBlock(buffer, entry.cb);
            }
        }
    }

    /**
     * @param {bigint} bid
     * @param {DataView} [target]
     * @returns {Promise<DataView>}
     */
    async #getBlockData (bid, target) {
        const block = await this.#getBlock(bid);

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
                await this.#getBlockData(dataBid, new DataView(out, i * 8192, 8192));
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
    async #getNodeData (nid) {
        const entry = await (await this.#getRootNBTPage()).findEntry(nid);

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
     * @returns {(nid: number) => Promise<DataView>}
     */
    #getNodeSubDataAccessor (nid) {
        return async (/** @type {number} */ internalNid) => {
            const entry = await (await this.#getRootNBTPage()).findEntry(nid);

            if (!(entry instanceof NodeEntry)) {
                throw Error("Expected NBT Entry");
            }

            if (entry.bidSub === 0n) {
                return Promise.resolve(new DataView(new ArrayBuffer(0)));
            }

            const block = await this.#getBlock(entry.bidSub);

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
    async #getPropertyContext (nid) {
        const data = await this.#getNodeData(nid);
        const subDataAccessor = this.#getNodeSubDataAccessor(nid);

        if (data) {
            return new PropertyContext(data, subDataAccessor);
        }
    }

    /**
     * @param {number | bigint} nid
     */
    async #getTableContext (nid) {
        const data = await this.#getNodeData(nid);
        const subDataAccessor = this.#getNodeSubDataAccessor(nid);

        return new TableContext(data, subDataAccessor);
    }

    async getMessageStore () {
        const pc = await this.#getPropertyContext(PSTFile.NID_MESSAGE_STORE);
        if (pc) {
            return new MessageStore(this, await pc.getAllProperties());
        }
        return null;
    }

    getRootFolder () {
        return this.getFolder(PSTFile.NID_ROOT_FOLDER);
    }

    /**
     * @param {number} nid
     */
    async getFolder (nid) {
        const hierarchyNid = NodeEntry.makeNID(nid, NodeEntry.NID_TYPE_HIERARCHY_TABLE);
        const contentsNid = NodeEntry.makeNID(nid, NodeEntry.NID_TYPE_CONTENTS_TABLE);
        const assocContentsNid = NodeEntry.makeNID(nid, NodeEntry.NID_TYPE_ASSOC_CONTENTS_TABLE);

        const pc = await this.#getPropertyContext(nid);

        if (!pc) {
            return null;
        }

        const hTc = await this.#getTableContext(hierarchyNid);

        const cTc = await this.#getTableContext(contentsNid);

        const aTc = await this.#getTableContext(assocContentsNid);

        const subFolderEntries = await Promise.all(Array.from({length: hTc.recordCount}).map(async (_,i) => {
            const props = await hTc.getAllRowProperties(i);

            const entry = propertiesToObject(props);

            entry.nid = /** @type {number} */(await hTc.getCellValueByColumnTag(i, PropertyContext.PID_TAG_LTP_ROW_ID));

            return entry;
        }));

        return new Folder(
            this,
            nid,
            await pc.getAllProperties(),
            subFolderEntries,
            cTc,
            null
        );
    }

    /**
     * @param {number} nid
     */
    async getMessage (nid) {
        if (NodeEntry.getNIDType(nid) === NodeEntry.NID_TYPE_NORMAL_MESSAGE) {
            const pc = await this.#getPropertyContext(nid);
            if (pc) {
                return new Message(nid, await pc.getAllProperties());
            }
        }
        return null;
    }

    /**
     * @param {Blob} blob
     */
    static async create (blob) {
        const headerBuffer = await blob.slice(0, 564).arrayBuffer();
        return new PSTFile(blob, headerBuffer);
    }
}
