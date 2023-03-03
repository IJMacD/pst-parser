import { DataBlock, PropertyContext } from "./ltp";
import { Folder, Message, MessageStore } from "./messaging";
import { BTPage, Page, Block, Node, BREF } from "./nbr";
import { CryptPermute } from "./permute";

export { Node, PropertyContext };

export class File {
    #buffer;
    header;

    static NID_MESSAGE_STORE    = 0x21n;
    static NID_ROOT_FOLDER      = 0x122n;

    get #rootNBTPage () {
        const rootNBTPage = this.getPage(this.header.root.BREFNBT.ib);
        if (!(rootNBTPage instanceof BTPage)) {
            throw Error("Root NBT Page was not correct page type");
        }
        return rootNBTPage;
    }

    get #rootBBTPage () {
        const rootBBTPage = this.getPage(this.header.root.BREFBBT.ib);
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
        this.header = new Header(buffer);
    }

    /**
     * @param {bigint} ib
     */
    getPage (ib) {
        const offset = typeof ib === "bigint" ? parseInt(ib.toString()) : ib;
        return Page.getPage(this.#buffer, offset);
    }

    /**
     * @param {number|bigint} nid
     */
    getNode (nid) {
        const entry = this.#rootNBTPage.findEntry(nid);
        if (!(entry instanceof Node)) {
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
        return nodeKeys.filter(nid => Node.getNIDType(nid) === nidType);
    }

    /**
     * @param {number} nidType
     */
    getNodesOfType (nidType) {
        return this.getAllNodeKeysOfType(nidType).map(nid => this.getNode(nid));
    }

    /**
     * @param {bigint} bid
     */
    getDataBlock (bid) {
        const entry = this.#rootBBTPage.findEntry(bid);
        if (entry instanceof Block) {
            const offset = parseInt(entry.BREF.ib.toString())
            return new DataBlock(this.#buffer, offset, entry.cb);
        }
    }

    /**
     * @param {bigint} bid
     * @param {bigint} [bidSub]
     */
    getData (bid, bidSub) {
        const block = this.getDataBlock(bid);
        if (block) {
            const data = cloneArrayBuffer(block.data);
            if (this.header.bCryptMethod === 1) {
                CryptPermute(data, data.byteLength, false);
            }
            return data;
        }
    }

    /**
     * @param {bigint} bid
     */
    getPropertyContext (bid) {
        const data = this.getData(bid);
        if (data) {
            return new PropertyContext(data);
        }
    }

    getMessageStore () {
        const entry = this.#rootNBTPage.findEntry(File.NID_MESSAGE_STORE);
        if (!(entry instanceof Node)) {
            throw Error("Expected NBT Entry");
        }
        const data = this.getData(entry.bidData, entry.bidSub);
        if (data) {
            return new MessageStore(new PropertyContext(data));
        }
    }

    getRootFolder () {
        const entry = this.#rootNBTPage.findEntry(File.NID_ROOT_FOLDER);
        if (!(entry instanceof Node)) {
            throw Error("Expected NBT Entry");
        }
        const data = this.getData(entry.bidData, entry.bidSub);
        if (data) {
            return new Folder(new PropertyContext(data));
        }
    }

    /**
     * @param {number|bigint} nid
     */
    getMessage (nid) {
        if (Node.getNIDType(nid) === Node.NID_TYPE_NORMAL_MESSAGE) {
            const node = this.getNode(nid);

            const pc = this.getPropertyContext(node.bidData);
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
