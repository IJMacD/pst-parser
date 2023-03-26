import { PropertyContext } from "../ltp/PropertyContext.js";
import { TableContext } from "../ltp/TableContext.js";
import { NamedPropertyMap } from "../messaging/NamedPropertyMap.js";
import { BlockEntry } from "../nbr/BlockEntry.js";
import { BREF } from "../nbr/BREF.js";
import { DataBlock } from "../nbr/DataBlock.js";
import { InternalBlock } from "../nbr/InternalBlock.js";
import { NodeEntry } from "../nbr/NodeEntry.js";
import { BTPage, Page } from "../nbr/Page.js";
import { CryptPermute } from "../nbr/permute.js";
import { SubnodeIntermediateBlock } from "../nbr/SubnodeIntermediateBlock.js";
import { SubnodeLeafBlock } from "../nbr/SubnodeLeafBlock.js";
import { XBlock } from "../nbr/XBlock.js";
import { XXBlock } from "../nbr/XXBlock.js";
import { h } from "../util/util.js";
import { Header } from "./Header.js";


/**
 * @typedef PSTContext
 * @property {(internalNid: number) => DataView}            getSubData
 * @property {(internalNid: number) => PropertyContext?}    getSubPropertyContext
 * @property {(internalNid: number) => TableContext?}       getSubTableContext
 * @property {(tag: number) => string?}                     getNamedProperty
 */

export class PSTInternal {
    #buffer;
    #header;

    #rootNBTPage;
    #rootBBTPage;

    /** @type {NamedPropertyMap} */
    #namedPropertyMap;

    static #PST_MAGIC = "!BDN";

    /**
     * @param {ArrayBufferLike} buffer
     */
    constructor (buffer) {
        this.#buffer = buffer;
        this.#header = new Header(new DataView(buffer));

        if (this.#header.dwMagic !== PSTInternal.#PST_MAGIC) {
            throw Error("Does not look like a PST file");
        }

        const rootNBTPage = this.getPage(this.#header.root.BREFNBT.ib);
        if (!(rootNBTPage instanceof BTPage)) {
            throw Error("Root NBT Page was not correct page type");
        }
        this.#rootNBTPage = rootNBTPage;

        const rootBBTPage = this.getPage(this.#header.root.BREFBBT.ib);
        if (!(rootBBTPage instanceof BTPage)) {
            throw Error("Root BBT Page was not correct page type");
        }
        this.#rootBBTPage = rootBBTPage;
    }

    /**
     * @param {number|bigint} ib
     */
    getPage (ib) {
        const offset = typeof ib === "bigint" ? parseInt(ib.toString()) : ib;
        const dv = new DataView(this.#buffer, offset);
        return Page.getPage(dv);
    }

    /**
     * @param {number|bigint} nid
     */
    getNode (nid) {
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
     *
     */
    getAllNodes () {
        return this.getAllNodeKeys().map(nid => this.getNode(nid));
    }

    /**
     * @param {number} nidType
     */
    getAllNodesOfType (nidType) {
        return this.getAllNodeKeysOfType(nidType).map(nid => this.getNode(nid));
    }

    /**
     * @param {bigint} bid
     */
    getBlock (bid) {
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

        return null;
    }

    /**
     * @param {bigint} bid
     * @param {DataView} [target]
     * @returns {{data: DataView, blockOffsets: number[] }}
     */
    getBlockData (bid, target) {
        const block = this.getBlock(bid);

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

                    return { data: target, blockOffsets: [0] };
                }

                // Caller just wants a fresh ArrayBuffer
                const out = new DataView(new ArrayBuffer(data.byteLength));
                CryptPermute(data, data.byteLength, false, out);
                return { data: out, blockOffsets: [0] };
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

            return {data: block.data, blockOffsets: [0] };
        }

        if (block instanceof XBlock) {
            const out = new ArrayBuffer(block.cEnt * 8192);

            let offset = 0;
            const blockOffsets = [];

            for (let i = 0; i < block.cEnt; i++) {
                const dataBid = block.getBID(i);
                const dataBlock = this.getBlock(dataBid);
                if (dataBlock instanceof DataBlock) {
                    const dataSize = dataBlock.dataSize;
                    this.getBlockData(dataBid, new DataView(out, offset, dataSize));
                    blockOffsets.push(offset);
                    offset += dataSize;
                }
                else {
                    throw Error("Unexpected Block type as child of XBlock");
                }
            }

            return { data: new DataView(out), blockOffsets };
        }

        if (block instanceof XXBlock) {
            throw Error("Unimplemented: XXBlock");
        }

        if (block instanceof SubnodeIntermediateBlock) {
            throw Error("Unimplemented: SubnodeIntermediateBlock");
        }

        if (block instanceof SubnodeLeafBlock) {
            throw Error("You must use pstContext.getSubData() to get SubNode data");
        }

        throw Error("Unimplemented: Get data for block type 0x" + h(block.bType));
    }

    /**
     * @param {number | bigint} nid
     */
    getNodeData (nid) {
        const entry = this.#rootNBTPage.findEntry(nid);

        if (!entry) {
            throw Error(`Node with NID: 0x${h(nid)} not found`);
        }

        if (!(entry instanceof NodeEntry)) {
            throw Error("Expected NBT Entry");
        }

        return this.getBlockData(entry.bidData);
    }

    /**
     * @param {number | bigint} nid
     * @returns {PSTContext}
     */
    getPSTContext (nid) {
        const entry = this.#rootNBTPage.findEntry(nid);

        const subNodeAccessor = this.#getSubNodeAccessor(
            entry instanceof NodeEntry ? entry.bidSub : 0n
        );

        return {
            ...subNodeAccessor,
            getNamedProperty: this.getNamedProperty.bind(this),
        };
    }

    /**
     * @param {bigint} bidSub
     */
    #getSubNodeAccessor (bidSub) {
        const getSubEntry = (/** @type {number} */internalNid) => {
            if (bidSub === 0n) {
                return null;
            }

            const block = this.getBlock(bidSub);

            if (!block) {
                throw Error("Unable to find block with bid " + bidSub);
            }

            if (!(block instanceof SubnodeLeafBlock)) {
                throw Error("Expected SubnodeLeafBlock");
            }

            for (let i = 0; i < block.cEnt; i++) {
                const e = block.getEntry(i);
                const nid = parseInt((e.nid & 0xFFFFFFFFn).toString());
                if (nid === internalNid) {
                    return e;
                }
            }

            // Not found
            // DEBUGGING:

            // console.debug(`Looking for Internal NID: 0x${h(internalNid)}`);
            // console.debug(`SubNodeLeafBlock 0x${h(bidSub)} has ${block.cEnt} children`);
            // for (let i = 0; i < block.cEnt; i++) {
            //     const e = block.getEntry(i);
            //     const nid = parseInt((e.nid & 0xFFFFFFFFn).toString());
            //     console.debug(`Child ${i}: Internal NID 0x${h(nid)} NID Type 0x${h(NodeEntry.getNIDType(nid))}`);
            //     const data = this.#getBlockData(e.bidData).data;
            //     // const bufferData = stringFromBuffer(data.buffer, data.byteOffset, 16, "ascii");
            //     // console.debug(bufferData);
            //     console.debug({ arrayBuffer: arrayBufferFromDataView(data) });
            // }

            // throw Error(`SubnodeLeafBlock does not contain internal nid 0x${h(internalNid)}`);
            return null;
        };

        const getSubData = (/** @type {number} internalNid */internalNid) => {
            const subEntry = getSubEntry(internalNid);

            if (subEntry) {
                return this.getBlockData(subEntry.bidData).data;
            }

            return new DataView(new ArrayBuffer(0));
        };

        const getSubPropertyContext = (/** @type {number} */ internalNid) => {
            const subEntry = getSubEntry(internalNid);

            if (!subEntry) {
                return null;
            }

            const subData = getSubData(internalNid);

            const pstContext = {
                getNamedProperty: this.getNamedProperty.bind(this),
                ...this.#getSubNodeAccessor(subEntry?.bidSub || 0n),
            };

            return new PropertyContext({ data: subData, blockOffsets: [0] }, pstContext);
        }

        const getSubTableContext = (/** @type {number} */ internalNid) => {
            const subEntry = getSubEntry(internalNid);

            if (!subEntry) {
                return null;
            }

            const subData = getSubData(internalNid);

            const pstContext = {
                getNamedProperty: this.getNamedProperty.bind(this),
                ...this.#getSubNodeAccessor(subEntry?.bidSub || 0n),
            };

            return new TableContext({ data: subData, blockOffsets: [0] }, pstContext);
        }

        return {
            getSubData,
            getSubPropertyContext,
            getSubTableContext,
        }
    }

    /**
     * @param {number} tag
     * */
    getNamedProperty (tag) {
        if (!this.#namedPropertyMap) {
            const nid = NodeEntry.NID_NAME_TO_ID_MAP;
            const data = this.getNodeData(nid);
            const pstContext = this.getPSTContext(nid);

            this.#namedPropertyMap = new NamedPropertyMap(data, pstContext);
        }

        return this.#namedPropertyMap.getTagName(tag);
    }

    /**
     * @param {number} nid
     */
    getPropertyContext (nid) {
        const data = this.getNodeData(nid);
        const pstContext = this.getPSTContext(nid);

        if (data) {
            return new PropertyContext(data, pstContext);
        }

        return null;
    }

    /**
     * @param {number | bigint} nid
     */
    getTableContext (nid) {
        const data = this.getNodeData(nid);
        const pstContext = this.getPSTContext(nid);

        return new TableContext(data, pstContext);
    }
}