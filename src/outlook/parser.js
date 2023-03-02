import { CryptPermute } from "./permute";

export class PSTFile {
    #buffer;
    header;

    static NID_MESSAGE_STORE    = 0x21n;
    static NID_ROOT_FOLDER      = 0x122n;

    get rootNBTPage () {
        const rootNBTPage = this.getPage(this.header.root.BREFNBT.ib);
        if (!(rootNBTPage instanceof PSTBTPage)) {
            throw Error("Root NBT Page was not correct page type");
        }
        return rootNBTPage;
    }

    get rootBBTPage () {
        const rootBBTPage = this.getPage(this.header.root.BREFBBT.ib);
        if (!(rootBBTPage instanceof PSTBTPage)) {
            throw Error("Root BBT Page was not correct page type");
        }
        return rootBBTPage;
    }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        this.#buffer = buffer;
        this.header = new PSTHeader(buffer);
    }

    /**
     * @param {bigint} ib
     */
    getPage (ib) {
        const offset = typeof ib === "bigint" ? parseInt(ib.toString()) : ib;
        return PSTPage.getPage(this.#buffer, offset);
    }

    /**
     * @param {number} nid
     */
    getNode (nid) {
        const entry = this.rootNBTPage.findEntry(nid);
        if (!(entry instanceof PSTNBTEntry)) {
            throw Error("Expected NBT Entry");
        }
        return entry;
    }

    /**
     * @param {bigint} bid
     */
    getDataBlock (bid) {
        const entry = this.rootBBTPage.findEntry(bid);
        if (entry instanceof PSTBBTEntry) {
            const offset = parseInt(entry.BREF.ib.toString())
            return new PSTDataBlock(this.#buffer, offset, entry.cb);
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

    getMessageStore () {
        const entry = this.rootNBTPage.findEntry(PSTFile.NID_MESSAGE_STORE);
        if (!(entry instanceof PSTNBTEntry)) {
            throw Error("Expected NBT Entry");
        }
        const data = this.getData(entry.bidData, entry.bidSub);
        if (data) {
            return new PSTPropertyContext(data);
        }
    }

    getRootFolder () {
        const entry = this.rootNBTPage.findEntry(PSTFile.NID_ROOT_FOLDER);
        if (!(entry instanceof PSTNBTEntry)) {
            throw Error("Expected NBT Entry");
        }
        const data = this.getData(entry.bidData, entry.bidSub);
        if (data) {
            return new PSTPropertyContext(data);
        }
    }

    /**
     * @param {bigint} bid
     */
    getPropertyContext (bid) {
        const data = this.getData(bid);
        if (data) {
            return new PSTPropertyContext(data);
        }
    }
}

export class PSTHeader {
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
    get root () { return new PSTRoot(this.#dv.buffer, 180); }
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

export class PSTRoot {
    #dv;

    get dwReserved () { return this.#dv.getUint32(0, true); }
    get ibFileEof () { return this.#dv.getBigUint64(4, true); }
    get ibAMapLast () { return this.#dv.getBigUint64(12, true); }
    get cbAMapFree () { return this.#dv.getBigUint64(20, true); }
    get cbPMapFree () { return this.#dv.getBigUint64(28, true); }
    get BREFNBT () { return new PSTBREF(this.#dv.buffer, this.#dv.byteOffset + 36); }
    get BREFBBT () { return new PSTBREF(this.#dv.buffer, this.#dv.byteOffset + 52); }
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

export class PSTBREF {
    #dv;

    get bid () { return this.#dv.getBigUint64(0, true); }
    get ib () { return this.#dv.getBigUint64(8, true); }

    // getPage () {
    //     const offset = parseInt(this.ib.toString());
    //     return PSTPage.getPage(this.#dv.buffer, offset);
    // }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} offset
     */
    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }
}

export class PSTPage {
    #dv;

    get ptype () { return this.#dv.getUint8(496); }
    get ptypeRepeat () { return this.#dv.getUint8(497); }
    get wSig () { return this.#dv.getUint16(498, true); }
    get dwCRC () { return this.#dv.getUint32(500, true); }
    get bid () { return this.#dv.getBigUint64(504, true); }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number|bigint} offset
     */
    constructor (buffer, offset) {
        const o = typeof offset === "bigint" ? parseInt(offset.toString()) : offset;
        this.#dv = new DataView(buffer, o);
    }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number|bigint} offset
     */
    static getPage (buffer, offset) {
        const p = new PSTPage(buffer, offset);

        if (p.ptype === 0x80) return new PSTBTPage(buffer, offset);
        if (p.ptype === 0x81) return new PSTBTPage(buffer, offset);
        if (p.ptype === 0x82) return new PSTFMapPage(buffer, offset);
        if (p.ptype === 0x83) return new PSTPMapPage(buffer, offset);
        if (p.ptype === 0x84) return new PSTAMapPage(buffer, offset);
        if (p.ptype === 0x85) return new PSTFPMapPage(buffer, offset);
        if (p.ptype === 0x86) return new PSTDListPage(buffer, offset);

        return p;
    }
}

export class PSTBTPage extends PSTPage {
    #dv;

    /**
     * @param {ArrayBufferLike} buffer
     * @param {number|bigint} offset
     */
    constructor (buffer, offset) {
        super(buffer, offset);

        const o = typeof offset === "bigint" ? parseInt(offset.toString()) : offset;
        this.#dv = new DataView(buffer, o);
    }

    get cEnt () { return this.#dv.getUint8(488); }
    get cEntMax () { return this.#dv.getUint8(489); }
    get cbEnt () { return this.#dv.getUint8(490); }
    get cLevel () { return this.#dv.getUint8(491); }
    get dwPadding () { return this.#dv.getUint32(492, true); }

    /**
     * @param {number} n
     */
    getEntry (n) {
        const begin = n * this.cbEnt;

        if (this.cLevel === 0) {
            if (this.ptype === 0x80) {
                return new PSTBBTEntry(this.#dv.buffer, this.#dv.byteOffset + begin);
            }
            if (this.ptype === 0x81) {
                return new PSTNBTEntry(this.#dv.buffer, this.#dv.byteOffset + begin);
            }
            throw Error("Invalid BT Page");
        }

        return new PSTBTEntry(this.#dv.buffer, this.#dv.byteOffset + begin);
    }

    get keys () {
        const out = [];
        for (let i = 0; i < this.cEnt; i++) {
            const entry = this.getEntry(i);

            if (entry instanceof PSTBBTEntry) {
                out.push(entry.BREF.bid);
            }
            else if (entry instanceof PSTNBTEntry) {
                out.push(entry.nid);
            }
            else {
                out.push(entry.btkey);
            }
        }
        return out;
    }

    /**
     * @param {number | bigint} key
     */
    findEntry (key) {
        const keys = this.keys;

        if (this.cLevel === 0) {
            const k = typeof key === "bigint" ? key : BigInt(key);
            const index = keys.indexOf(k);

            if (index >= 0)
                return this.getEntry(index);

            // Not in leaf
            return null;
        }

        for (let i = 0; i < this.cEnt; i++) {
            if (keys[i] > key) {

                // Before the first entry
                if (i === 0) return null;

                const entry = this.getEntry(i - 1);
                if (!(entry instanceof PSTBTEntry)) {
                    throw Error("Expected BT Entry");
                }
                const page = PSTPage.getPage(this.#dv.buffer, entry.BREF.ib);
                if (!(page instanceof PSTBTPage)) {
                    throw Error("Expected BT Page");
                }
                return page.findEntry(key);
            }
        }

        // Check the last page
        const entry = this.getEntry(this.cEnt - 1);
        if (!(entry instanceof PSTBTEntry)) {
            throw Error("Expected BT Entry");
        }
        const page = PSTPage.getPage(this.#dv.buffer, entry.BREF.ib);
        if (!(page instanceof PSTBTPage)) {
            throw Error("Expected BT Page");
        }
        return page.findEntry(key);
    }

    getAllKeys () {
        if (this.cLevel === 0) {
            return this.keys;
        }

        const out = [];

        for (let i = 0; i < this.cEnt; i++) {
            const entry = this.getEntry(i);
            if (!(entry instanceof PSTBTEntry)) {
                throw Error("Expected BT Entry");
            }
            const page = PSTPage.getPage(this.#dv.buffer, entry.BREF.ib);
            if (!(page instanceof PSTBTPage)) {
                throw Error("Expected BT Page");
            }
            out.push(...page.getAllKeys());
        }

        return out;
    }
}

export class PSTAMapPage extends PSTPage {

}

export class PSTPMapPage extends PSTPage {

}

export class PSTDListPage extends PSTPage {

}

export class PSTFMapPage extends PSTPage {

}

export class PSTFPMapPage extends PSTPage {

}

export class PSTBTEntry {
    #dv;

    get btkey () { return this.#dv.getBigUint64(0, true); }
    get BREF () { return new PSTBREF(this.#dv.buffer, this.#dv.byteOffset + 8); }

    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }
}


export class PSTBBTEntry {
    #dv;

    get BREF () { return new PSTBREF(this.#dv.buffer, this.#dv.byteOffset); }
    get cb () { return this.#dv.getUint16(16, true); }
    get cRef () { return this.#dv.getUint16(18, true); }
    get dwPadding () { return this.#dv.getUint32(20, true); }

    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }
}


export class PSTNBTEntry {
    #dv;

    static NID_TYPE_HID             = 0x00;
    static NID_TYPE_INTERNAL        = 0x01;
    static NID_TYPE_NORMAL_FOLDER   = 0x02;
    static NID_TYPE_SEARCH_FOLDER   = 0x03;
    static NID_TYPE_NORMAL_MESSAGE  = 0x04;

    get nid () { return this.#dv.getBigUint64(0, true); }
    get bidData () { return this.#dv.getBigUint64(8, true); }
    get bidSub () { return this.#dv.getBigUint64(16, true); }
    get nidParent () { return this.#dv.getUint32(24, true); }
    get dwPadding () { return this.#dv.getUint32(28, true); }

    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }

    /**
     * @param {number|bigint} nid
     */
    static getNIDType (nid) {
        return typeof nid === "number" ? (nid & 0x1F) : parseInt((nid & 0x1Fn).toString());
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

export class PSTDataBlock {
    #dv;
    #dataSize;

    get blockSize () {
        return Math.ceil((this.#dataSize + 16)/64)*64;
    }

    get data () {
        return this.#dv.buffer.slice(this.#dv.byteOffset, this.#dv.byteOffset + this.#dataSize);
    }

    get cb () { return this.#dv.getUint16(this.blockSize - 16, true); }
    get wSig () { return this.#dv.getUint16(this.blockSize - 14, true); }
    get dwCRC () { return this.#dv.getUint32(this.blockSize - 12, true); }
    get bid () { return this.#dv.getBigUint64(this.blockSize - 8, true); }

    /**
     * @param {ArrayBufferLike} buffer
     * @param {number} offset
     * @param {number} dataSize
     */
    constructor (buffer, offset, dataSize) {
        this.#dv = new DataView(buffer, offset);
        this.#dataSize = dataSize;
    }
}

export class PSTHeapNode {
    #dv;

    get ibHnpm () { return this.#dv.getUint16(0, true); }
    get bSig () { return this.#dv.getUint8(2); }
    get bClientSig () { return this.#dv.getUint8(3); }
    get hidUserRoot () { return this.#dv.getUint32(4, true); }
    get rgbFillLevel () { return this.#dv.getUint32(8, true); }

    get pageMap () {
        return new PSTHeapNodePageMap(this.#dv.buffer, this.ibHnpm);
    }

    static TYPE_TABLE_CONTEXT = 0x7C;
    static TYPE_BTREE_ON_HEAP = 0xB5;
    static TYPE_PROPERTY_CONTEXT = 0xBC;

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        this.#dv = new DataView(buffer);
    }

    /**
     * @param {number} n
     */
    getItem (n) {
        if (n < 0 || n > this.pageMap.cAlloc) {
            throw RangeError("Invalid Heap Item");
        }

        const begin = this.pageMap.rgibAlloc[n];
        const end = this.pageMap.rgibAlloc[n + 1];

        return this.#dv.buffer.slice(begin, end);
    }

    /**
     * @param {number} hid
     */
    getItemByHID (hid) {
        const hidType = (hid & 0x1f);
        const hidIndex = ((hid >> 5) & 0x7ff);
        const hidBlockIndex = (hid >> 16);
        return this.getItem(hidIndex - 1);
    }
}

export class PSTHeapNodePageMap {
    #dv;

    get cAlloc () { return this.#dv.getUint16(0, true); }
    get cFree () { return this.#dv.getUint16(2, true); }
    get rgibAlloc () {
        return new Uint16Array(this.#dv.buffer, this.#dv.byteOffset + 4, this.cAlloc + 1);
    }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} offset
     */
    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }

}

export class PSTBTreeOnHeap extends PSTHeapNode {
    #dv;

    get bType () { return this.#dv.getUint8(0); }
    get cbKey () { return this.#dv.getUint8(1); }
    get cbEnt () { return this.#dv.getUint8(2); }
    get bIdxLevels () { return this.#dv.getUint8(3); }
    get hidRoot () { return this.#dv.getUint32(4, true); }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        super(buffer);

        this.#dv = new DataView(this.getItemByHID(this.hidUserRoot));
    }

    get keys () {
        const out = [];
        for (let i = 0; i < this.pageMap.cAlloc; i++) {
            const record = this.getRecord(i);

            out.push(record.key);
        }
        return out;
    }

    getRecord (n) {
        if (this.bIdxLevels > 0) {
            throw Error("NotImplemented");

        }

        const dv = new DataView(this.getItemByHID(this.hidRoot));
        const recordSize = this.cbKey + this.cbEnt;
        const begin = n * recordSize;

        if (this.cbKey === 2) {
            const key = dv.getUint16(begin, true);
            const data = dv.buffer.slice(begin + this.cbKey, begin + recordSize);

            return { key, data };
        }

        if (this.cbKey === 4) {
            const key = dv.getUint32(begin, true);
            const data = dv.buffer.slice(begin + this.cbKey, begin + recordSize);

            return { key, data };
        }

        if (this.cbKey === 8) {
            const key = dv.getBigUint64(begin, true);
            const data = dv.buffer.slice(begin + this.cbKey, begin + recordSize);

            return { key, data };
        }

        if (this.cbKey === 16) {
            const key = dv.buffer.slice(begin, begin + 16);
            const data = dv.buffer.slice(begin + this.cbKey, begin + recordSize);

            return { key, data };
        }

        throw Error("Unexpected key size");
    }
}

export class PSTPropertyContext extends PSTBTreeOnHeap {
    static PTYPE_UNSPECIFIED    = 0x0000;
    static PTYPE_NULL           = 0x0001;
    static PTYPE_INTEGER16      = 0x0002;
    static PTYPE_INTEGER32      = 0x0003;
    static PTYPE_FLOATING32     = 0x0004;
    static PTYPE_FLOATING64     = 0x0005;
    static PTYPE_CURRENCY       = 0x0006;
    static PTYPE_FLOATING_TIME  = 0x0007;
    static PTYPE_ERROR_CODE     = 0x000A;
    static PTYPE_BOOLEAN        = 0x000B;
    static PTYPE_INTEGER64      = 0x0014;
    static PTYPE_STRING         = 0x001F;
    static PTYPE_STRING8        = 0x001E;
    static PTYPE_TIME           = 0x0040;
    static PTYPE_GUID           = 0x0048;
    static PTYPE_SERVER_ID      = 0x00FB;
    static PTYPE_RESTRICTION    = 0x00FD;
    static PTYPE_RULE_ACTION    = 0x00FE;
    static PTYPE_BINARY         = 0x0102;

    static PID_TAG_SUBJECT              = 0x0037;
    static PID_TAG_NORMALIZED_SUBJECT   = 0x0E1D;
    static PID_TAG_RECORD_KEY           = 0x0FF9;
    static PID_TAG_BODY                 = 0x1000;
    static PID_TAG_BODY_HTML            = 0x1013;
    static PID_TAG_DISPLAY_NAME         = 0x3001;
    static PID_TAG_ROOT_MAILBOX         = 0x35E0;
    static PID_TAG_DELETED_ITEMS        = 0x35E3;
    static PID_TAG_SEARCH_FOLDER        = 0x35E7;
    static PID_TAG_CONTENT_COUNT        = 0x3602;
    static PID_TAG_CONTENT_UNREAD_COUNT = 0x3603;
    static PID_TAG_SUBFOLDERS           = 0x360A;

    /**
     * @param {number} n
     */
    getPCRecord (n) {
        const { key: wPropId, data } = this.getRecord(n);

        if (typeof wPropId !== "number") {
            throw Error("Invalid key length");
        }

        const dv = new DataView(data);

        return {
            wPropId,
            wPropType: dv.getUint16(0, true),
            dwValueHnid: dv.getUint32(2, true),
        };
    }

    /**
     * @param {number} key
     */
    getPCRecordByKey (key) {
        for (let i = 0; i < this.pageMap.cAlloc; i++) {
            const record = this.getPCRecord(i);
            if (record.wPropId === key) {
                return record;
            }
        }
    }

    /**
     * @param {number} key
     */
    getPCValueByKey (key) {
        const record = this.getPCRecordByKey(key);

        if (record?.wPropType === PSTPropertyContext.PTYPE_STRING) {
            if (record.dwValueHnid === 0) return "";
            if (PSTNBTEntry.getNIDType(record.dwValueHnid) === PSTNBTEntry.NID_TYPE_HID) {
                const data = this.getItemByHID(record.dwValueHnid);
                return String.fromCharCode(...new Uint16Array(data));
            }
        }

        if (record?.wPropType === PSTPropertyContext.PTYPE_BINARY) {
            if (PSTNBTEntry.getNIDType(record.dwValueHnid) === PSTNBTEntry.NID_TYPE_HID) {
                return this.getItemByHID(record.dwValueHnid);
            }
        }

        if (record?.wPropType === PSTPropertyContext.PTYPE_INTEGER32) {
            return record.dwValueHnid;
        }

        if (record?.wPropType === PSTPropertyContext.PTYPE_BOOLEAN) {
            return record.dwValueHnid > 0;
        }
    }

    getAllPCRecords () {
        const out = [];
        for (let i = 0; i < this.pageMap.cAlloc; i++) {
            out.push(this.getPCRecord(i));
        }
        return out;
    }
}

export class PSTEntryID {
    #dv;

    get rgbFlags () { return this.#dv.getUint32(0, true); }
    get uid () { return this.#dv.buffer.slice(4, 4 + 16); }
    get nid () { return this.#dv.getUint32(20, true); }

    constructor (buffer) {
        this.#dv = new DataView(buffer);
    }
}
