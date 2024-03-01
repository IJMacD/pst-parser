import { PropertyContext } from "../ltp/PropertyContext.js";
import { TableContext } from "../ltp/TableContext.js";
import { NamedPropertyMap } from "../messaging/NamedPropertyMap.js";
import { BlockEntry } from "../nbr/BlockEntry.js";
import { BREF } from "../nbr/BREF.js";
import { DataBlock } from "../nbr/DataBlock.js";
import { InternalBlock } from "../nbr/InternalBlock.js";
import { NodeEntry } from "../nbr/NodeEntry.js";
import { getNIDType, NID_NAME_TO_ID_MAP } from "../nbr/NodeTypes.js";
import { DListPage } from "../nbr/DListPage.js";
import { AMapPage } from "../nbr/AMapPage.js";
import { BTPage } from "../nbr/BTPage.js";
import { PMapPage } from "../nbr/PMapPage.js";
import { FMapPage } from "../nbr/FMapPage.js";
import { FPMapPage } from "../nbr/FPMapPage.js";
import { CryptPermute } from "../nbr/permute.js";
import { SubnodeIntermediateBlock } from "../nbr/SubnodeIntermediateBlock.js";
import { SubnodeLeafBlock } from "../nbr/SubnodeLeafBlock.js";
import { XBlock } from "../nbr/XBlock.js";
import { XXBlock } from "../nbr/XXBlock.js";
import { h } from "../util/util.js";
import { copyBuffer } from "../util/copyBuffer.js";
import { Header } from "./Header.js";
import { BTPage2013 } from "../nbr/BTPage2013.js";

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

    static #PST_CLIENT_MAGIC = 0x4D5F;
    static #OST_CLIENT_MAGIC = 0x4F53;

    static #VER_OST_2013 = 36;

    get cryptMethod() { return this.#header.bCryptMethod; }

    get nextBID() { return this.#header.bidNextB; }

    get nextPage() { return this.#header.bidNextP; }

    get modificationCount() { return this.#header.dwUnique; }

    get fileSize() { return this.#header.root.ibFileEof; }

    get freeSpace() { return this.#header.root.cbAMapFree; }

    get freePageSpace() { return this.#header.root.cbPMapFree; }

    get aMapValid() { return Boolean(this.#header.root.fAMapValid); }

    get aMapPageCount() {
        const fileSize = parseInt(this.#header.root.ibFileEof.toString());
        return (fileSize - AMapPage.IB_INITIAL) / AMapPage.IB_INTERVAL;
    }

    get pMapPageCount() {
        const fileSize = parseInt(this.#header.root.ibFileEof.toString());
        return Math.ceil((fileSize - PMapPage.IB_INITIAL) / PMapPage.IB_INTERVAL);
    }

    get fMapPageCount() {
        const fileSize = parseInt(this.#header.root.ibFileEof.toString());
        return Math.abs(Math.ceil((fileSize - FMapPage.IB_INITIAL) / FMapPage.IB_INTERVAL));
    }

    get fpMapPageCount() {
        const fileSize = parseInt(this.#header.root.ibFileEof.toString());
        return Math.abs(Math.ceil((fileSize - FPMapPage.IB_INITIAL) / FPMapPage.IB_INTERVAL));
    }

    /**
     * @param {ArrayBufferLike} buffer
     */
    constructor(buffer) {
        this.#buffer = buffer;
        this.#header = new Header(new DataView(buffer));

        if (this.#header.wVer === 14 || this.#header.wVer === 15) {
            throw Error("ANSI PST files are not supported.");
        }

        if (this.#header.dwMagic !== PSTInternal.#PST_MAGIC) {
            throw Error("Does not look like a PST file");
        }

        if (this.#header.wMagicClient !== PSTInternal.#OST_CLIENT_MAGIC &&
            this.#header.wMagicClient !== PSTInternal.#PST_CLIENT_MAGIC) {
            throw Error("Does not look like a PST file. Not supported.");
        }

        const isOST2013 = this.#header.wVer === 36;

        if (isOST2013) {
            // Uses 4096 byte pages and different root folder ids?
            // Not implemented yet
            throw Error("OST 2013 version files are not supported yet.");
        }

        this.#rootNBTPage = isOST2013 ?
            new BTPage2013(this.getDataView(this.#header.root.BREFNBT.ib, 4096)) :
            new BTPage(this.getPageDataView(this.#header.root.BREFNBT.ib));

        this.#rootBBTPage = isOST2013 ?
            new BTPage2013(this.getDataView(this.#header.root.BREFBBT.ib, 4096)) :
            new BTPage(this.getPageDataView(this.#header.root.BREFBBT.ib));
    }

    /**
     * @param {number | bigint} ib
     * @param {number} size
     */
    getDataView(ib, size) {
        const offset = typeof ib === "bigint" ? parseInt(ib.toString()) : ib;
        return new DataView(this.#buffer, offset, size);
    }

    /**
     * @param {number|bigint} ib
     */
    getPageDataView(ib) {
        return this.#header.wVer === PSTInternal.#VER_OST_2013 ?
            this.getDataView(ib, 4096) :
            this.getDataView(ib, 512);
    }

    /**
     * @param {number} n
     */
    getAMapPage(n) {
        const ib = AMapPage.IB_INITIAL + AMapPage.IB_INTERVAL * n;

        return new AMapPage(this.getPageDataView(ib));
    }

    getAMap() {
        const buffer = new ArrayBuffer(this.aMapPageCount * 496);

        for (let i = 0; i < this.aMapPageCount; i++) {
            const aMapPage = this.getAMapPage(i);

            const dv = aMapPage.getMap();

            copyBuffer(new DataView(buffer, i * 496, 496), dv);
        }

        return new DataView(buffer);
    }

    /**
     * @param {number} n
     */
    getPMapPage(n) {
        const ib = PMapPage.IB_INITIAL + PMapPage.IB_INTERVAL * n;

        return new PMapPage(this.getPageDataView(ib));
    }

    /**
     * @returns {DataView}
     */
    getPMap() {
        const pMapCount = this.pMapPageCount;

        const buffer = new ArrayBuffer(pMapCount * 496);

        for (let i = 0; i < pMapCount; i++) {
            const pMapPage = this.getPMapPage(i);

            const dv = pMapPage.getMap();

            copyBuffer(new DataView(buffer, i * 496, 496), dv);
        }

        return new DataView(buffer);
    }

    getDListPage() {
        return new DListPage(this.getPageDataView(DListPage.IB_DLIST));
    }

    /**
     * @param {number} n
     */
    getFMapPage(n) {
        const ib = FMapPage.IB_INITIAL + FMapPage.IB_INTERVAL * n;

        return new FPMapPage(this.getPageDataView(ib));
    }

    /**
     * @returns {DataView}
     */
    getFMap() {
        const fileSize = parseInt(this.#header.root.ibFileEof.toString());

        if (fileSize < FMapPage.IB_INITIAL) return this.#header.rgbFM;

        const fMapCount = this.fMapPageCount;

        const buffer = new ArrayBuffer(128 + fMapCount * 496);

        copyBuffer(new DataView(buffer, 0, 128), this.#header.rgbFM);

        for (let i = 0; i < fMapCount; i++) {
            const fMapPage = this.getFMapPage(i);

            const dv = fMapPage.getMap();

            copyBuffer(new DataView(buffer, 128 + i * 496, 496), dv);
        }

        return new DataView(buffer);
    }

    /**
     * @param {number} n
     */
    getFPMapPage(n) {
        const ib = FPMapPage.IB_INITIAL + FPMapPage.IB_INTERVAL * n;

        return new FPMapPage(this.getPageDataView(ib));
    }

    /**
     * @returns {DataView}
     */
    getFPMap() {
        const fileSize = parseInt(this.#header.root.ibFileEof.toString());

        if (fileSize < FPMapPage.IB_INITIAL) return this.#header.rgbFP;

        const fMapCount = this.fMapPageCount;

        const buffer = new ArrayBuffer(128 + fMapCount * 496);

        copyBuffer(new DataView(buffer, 0, 128), this.#header.rgbFP);

        for (let i = 0; i < fMapCount; i++) {
            const fMapPage = this.getFPMapPage(i);

            const dv = fMapPage.getMap();

            copyBuffer(new DataView(buffer, 128 + i * 496, 496), dv);
        }

        return new DataView(buffer);
    }

    /**
     * @param {number|bigint} nid
     */
    getNode(nid) {
        const entry = this.#rootNBTPage.findEntry(nid);
        if (!(entry instanceof NodeEntry)) {
            throw Error("Expected NBT Entry");
        }
        return entry;
    }

    getAllNodeKeys() {
        return this.#rootNBTPage.getAllKeys();
    }

    /**
     * @param {number} nidType
     */
    getAllNodeKeysOfType(nidType) {
        const nodeKeys = this.#rootNBTPage.getAllKeys();
        return nodeKeys.filter(nid => getNIDType(nid) === nidType);
    }

    /**
     *
     */
    getAllNodes() {
        return this.getAllNodeKeys().map(nid => this.getNode(nid));
    }

    /**
     * @param {number} nidType
     */
    getAllNodesOfType(nidType) {
        return this.getAllNodeKeysOfType(nidType).map(nid => this.getNode(nid));
    }

    /**
     * @param {bigint} bid
     */
    getBlock(bid) {
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
    getBlockData(bid, target) {
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

            return { data: block.data, blockOffsets: [0] };
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

        throw Error("Unimplemented: Get data for block type 0x" + h(block['bType']));
    }

    /**
     * @param {number | bigint} nid
     */
    getNodeData(nid) {
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
    getPSTContext(nid) {
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
    #getSubNodeAccessor(bidSub) {
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
    getNamedProperty(tag) {
        if (!this.#namedPropertyMap) {
            const nid = NID_NAME_TO_ID_MAP;
            const data = this.getNodeData(nid);
            const pstContext = this.getPSTContext(nid);

            this.#namedPropertyMap = new NamedPropertyMap(data, pstContext);
        }

        return this.#namedPropertyMap.getTagName(tag);
    }

    /**
     * @param {number} nid
     */
    getPropertyContext(nid) {
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
    getTableContext(nid) {
        const data = this.getNodeData(nid);
        const pstContext = this.getPSTContext(nid);

        return new TableContext(data, pstContext);
    }
}
