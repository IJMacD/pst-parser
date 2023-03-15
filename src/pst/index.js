import { PropertyContext, TableContext } from "./ltp.js";
import { Folder, Message, MessageStore } from "./messaging.js";
import { BTPage, Page, BlockEntry, NodeEntry, BREF, DataBlock, XBlock, InternalBlock, XXBlock, SubnodeLeafBlock, SubnodeIntermediateBlock } from "./nbr.js";
import { CryptPermute } from "./permute.js";
import { h } from "./util.js";

export class File {
    #buffer;
    #header;

    static NID_MESSAGE_STORE    = 0x21n;
    static NID_ROOT_FOLDER      = 0x122n;

    get #rootNBTPage () {
        const rootNBTPage = this.#getPage(this.#header.root.BREFNBT.ib);
        if (!(rootNBTPage instanceof BTPage)) {
            throw Error("Root NBT Page was not correct page type");
        }
        return rootNBTPage;
    }

    get #rootBBTPage () {
        const rootBBTPage = this.#getPage(this.#header.root.BREFBBT.ib);
        if (!(rootBBTPage instanceof BTPage)) {
            throw Error("Root BBT Page was not correct page type");
        }
        return rootBBTPage;
    }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        this.#buffer = buffer;
        this.#header = new Header(buffer);
    }

    /**
     * @param {number|bigint} ib
     */
    #getPage (ib) {
        const offset = typeof ib === "bigint" ? parseInt(ib.toString()) : ib;
        return Page.getPage(this.#buffer, offset);
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

            if (BREF.isInternalBID(bid)) {
                const b = new InternalBlock(this.#buffer, offset, entry.cb);

                if (b.bType === 0x01 && b.cLevel === 1) {
                    return new XBlock(this.#buffer, offset, entry.cb);
                }
                else if (b.bType === 0x01 && b.cLevel === 2) {
                    return new XXBlock(this.#buffer, offset, entry.cb);
                }
                else if (b.bType === 0x02 && b.cLevel === 0) {
                    return new SubnodeLeafBlock(this.#buffer, offset, entry.cb);
                }
                else if (b.bType === 0x02 && b.cLevel > 0) {
                    return new SubnodeIntermediateBlock(this.#buffer, offset, entry.cb);
                }
            }
            else {
                return new DataBlock(this.#buffer, offset, entry.cb);
            }
        }
    }

    /**
     * @param {bigint} bid
     */
    #getBlockData (bid) {
        const block = this.#getBlock(bid);

        if (!block) {
            throw Error("Cannot find bid: 0x" + h(bid));
        }

        if (block instanceof DataBlock) {
            const data = cloneArrayBuffer(block.data);
            if (this.#header.bCryptMethod === 1) {
                CryptPermute(data, data.byteLength, false);
            }
            return data;
        }

        if (block instanceof XBlock) {
            const out = new Uint8Array(block.cEnt * 8192);

            let offset = 0;
            for (let i = 0; i < block.cEnt; i++) {
                const dataBid = block.getBID(i);
                const data = new Uint8Array(this.#getBlockData(dataBid));
                out.set(data, offset);
                offset += 8192;
            }

            return out.buffer;
        }

        if (block instanceof SubnodeIntermediateBlock) {
            throw Error("Unimplemented: SubnodeIntermediateBlock");
        }

        if (block instanceof SubnodeLeafBlock) {
            console.warn("Only getting first internal-NID in SLBlock");

            const entry = block.getEntry(0);

            return this.#getBlockData(entry.bidData);
        }

        throw Error("Unimplemented: Get data for block type 0x" + h(block.bType));
    }

    /**
     * @param {number | bigint} nid
     */
    #getNodeData (nid) {
        const entry = this.#rootNBTPage.findEntry(nid);

        if (!(entry instanceof NodeEntry)) {
            throw Error("Expected NBT Entry");
        }

        return this.#getBlockData(entry.bidData);
    }

    /**
     * @param {number | bigint} nid
     */
    #getNodeSubData (nid) {
        const entry = this.#rootNBTPage.findEntry(nid);

        if (!(entry instanceof NodeEntry)) {
            throw Error("Expected NBT Entry");
        }

        if (entry.bidSub === 0n) {
            return null;
        }

        return this.#getBlockData(entry.bidSub);
    }

    /**
     * @param {bigint} bid
     */
    #getPropertyContext (bid) {
        const data = this.#getBlockData(bid);
        if (data) {
            return new PropertyContext(data);
        }
    }

    getMessageStore () {
        const data = this.#getNodeData(File.NID_MESSAGE_STORE);
        if (data) {
            return new MessageStore(new PropertyContext(data));
        }
    }

    getRootFolder () {
        return this.getFolder(File.NID_ROOT_FOLDER);
    }

    /**
     * @param {number | bigint} nid
     */
    getFolder (nid) {
        const pcData = this.#getNodeData(nid);

        const hierarchyNid = NodeEntry.makeNID(nid, NodeEntry.NID_TYPE_HIERARCHY_TABLE);
        const contentsNid = NodeEntry.makeNID(nid, NodeEntry.NID_TYPE_CONTENTS_TABLE);
        const assocContentsNid = NodeEntry.makeNID(nid, NodeEntry.NID_TYPE_ASSOC_CONTENTS_TABLE);

        // console.log(`Folder NID (PC): ${nid.toString(16)} hierarchy: ${hierarchyNid.toString(16)} contents: ${contentsNid.toString(16)} assocContents: ${assocContentsNid.toString(16)}`);

        const hierarchyData = this.#getNodeData(hierarchyNid);
        const hierarchySubData = this.#getNodeSubData(hierarchyNid);

        const contentsData = this.#getNodeData(contentsNid);
        const contentsSubData = this.#getNodeSubData(contentsNid);

        const assocContentsData = this.#getNodeData(assocContentsNid);
        const assocContentsSubData = this.#getNodeSubData(assocContentsNid);

        if (pcData && hierarchyData && contentsData && assocContentsData) {

            const hTC = new TableContext(hierarchyData, hierarchySubData);
            const cTC = new TableContext(contentsData, contentsSubData);
            const aTC = new TableContext(assocContentsData, assocContentsSubData);

            return new Folder(
                new PropertyContext(pcData),
                hTC,
                cTC,
                aTC
            );
        }
    }

    /**
     * @param {number|bigint} nid
     */
    getMessage (nid) {
        if (NodeEntry.getNIDType(nid) === NodeEntry.NID_TYPE_NORMAL_MESSAGE) {
            const node = this.#getNode(nid);

            const pc = this.#getPropertyContext(node.bidData);
            if (pc) {
                return new Message(node, pc)
            }
        }
    }
}

class Header {
    #dv;

    get dwMagic () {
        return String.fromCodePoint(
            this.#dv.getUint8(0),
            this.#dv.getUint8(1),
            this.#dv.getUint8(2),
            this.#dv.getUint8(3)
        );
    }
    get dwCRCPartial () { return this.#dv.getUint32(4, true); }
    get wMagicClient () { return this.#dv.getUint16(8, true); }
    get wVer () { return this.#dv.getUint16(10, true); }
    get wVerClient () { return this.#dv.getUint16(12, true); }
    get bPlatformCreate () { return this.#dv.getUint8(14); }
    get bPlatformAccess () { return this.#dv.getUint8(15); }
    get dwReserved1 () { return this.#dv.getUint32(16, true); }
    get dwReserved2 () { return this.#dv.getUint32(20, true); }
    get bidUnused () { return this.#dv.getBigUint64(24, true); }
    get bidNextP () { return this.#dv.getBigUint64(32, true); }
    get dwUnique () { return this.#dv.getUint32(40, true); }
    get rgnid () {
        const out = [];
        for (let i = 0; i < 32; i++) {
            out[i] = this.#dv.getUint32(44 + i * 4, true);
        }
        return out;
    }
    get qwUnused () { return this.#dv.getBigUint64(172, true); }
    get root () { return new Root(this.#dv.buffer, 180); }
    get dwAlign () { return this.#dv.getUint32(252, true); }
    get rgbFM () { return this.#dv.buffer.slice(256, 256 + 128); }
    get rgbFP () { return this.#dv.buffer.slice(384, 384 + 128); }
    get bSentinel () { return this.#dv.getUint8(512); }
    get bCryptMethod () { return this.#dv.getUint8(513); }
    get rgbReserved () { return this.#dv.getUint16(514, true); }
    get bidNextB () { return this.#dv.getBigUint64(516, true); }
    get dwCRCFull () { return this.#dv.getUint32(524, true); }
    get rgbReserved2 () { return this.#dv.getUint32(528, true) >> 8; }
    get bReserved () { return this.#dv.getUint8(531); }
    get rgbReserved3 () { return this.#dv.buffer.slice(532, 532 + 32); }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        this.#dv = new DataView(buffer);
    }
}

class Root {
    #dv;

    get dwReserved () { return this.#dv.getUint32(0, true); }
    get ibFileEof () { return this.#dv.getBigUint64(4, true); }
    get ibAMapLast () { return this.#dv.getBigUint64(12, true); }
    get cbAMapFree () { return this.#dv.getBigUint64(20, true); }
    get cbPMapFree () { return this.#dv.getBigUint64(28, true); }
    get BREFNBT () { return new BREF(this.#dv.buffer, this.#dv.byteOffset + 36); }
    get BREFBBT () { return new BREF(this.#dv.buffer, this.#dv.byteOffset + 52); }
    get fAMapValid () { return this.#dv.getUint8(68); }
    get bReserved () { return this.#dv.getUint8(69); }
    get wReserved () { return this.#dv.getUint16(70, true); }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset, 72);
    }
}


/**
 * @param {ArrayBuffer} src
 */
function cloneArrayBuffer(src) {
    const dst = new ArrayBuffer(src.byteLength);
    new Uint8Array(dst).set(new Uint8Array(src));
    return dst;
}
