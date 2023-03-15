export class BREF {
    #dv;

    get bid () { return this.#dv.getBigUint64(0, true); }
    get ib () { return this.#dv.getBigUint64(8, true); }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} offset
     */
    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }

    /**
     * @param {number | bigint} bid
     */
    static isInternalBID(bid) {
        return Boolean(typeof bid === "bigint" ? (bid & 0x2n) : (bid & 0x02));
    }
}

export class Page {
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
        const p = new Page(buffer, offset);

        if (p.ptype === 0x80) return new BTPage(buffer, offset);
        if (p.ptype === 0x81) return new BTPage(buffer, offset);
        if (p.ptype === 0x82) return new FMapPage(buffer, offset);
        if (p.ptype === 0x83) return new PMapPage(buffer, offset);
        if (p.ptype === 0x84) return new AMapPage(buffer, offset);
        if (p.ptype === 0x85) return new FPMapPage(buffer, offset);
        if (p.ptype === 0x86) return new DListPage(buffer, offset);

        return p;
    }
}

export class BTPage extends Page {
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
                return new BlockEntry(this.#dv.buffer, this.#dv.byteOffset + begin);
            }
            if (this.ptype === 0x81) {
                return new NodeEntry(this.#dv.buffer, this.#dv.byteOffset + begin);
            }
            throw Error("Invalid BT Page");
        }

        return new BTEntry(this.#dv.buffer, this.#dv.byteOffset + begin);
    }

    get keys () {
        const out = [];
        for (let i = 0; i < this.cEnt; i++) {
            const entry = this.getEntry(i);

            if (entry instanceof BlockEntry) {
                out.push(entry.BREF.bid);
            }
            else if (entry instanceof NodeEntry) {
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
     * @return {(BlockEntry|NodeEntry)?}
     */
    findEntry (key) {
        const keys = this.keys;

        // If we're level 0 then either *we* have the key or it doesn't exist.

        if (this.cLevel === 0) {
            const k = typeof key === "bigint" ? key : BigInt(key);
            const index = keys.indexOf(k);

            if (index >= 0) {
                return /** @type {BlockEntry|NodeEntry} */(this.getEntry(index));
            }

            // Not in leaf
            return null;
        }

        // If we're above level 0 then find which of our child pages should
        // be the next step.

        for (let i = 0; i < this.cEnt; i++) {
            if (keys[i] > key) {
                // Before the first entry
                if (i === 0) return null;

                const entry = this.getEntry(i - 1);
                if (!(entry instanceof BTEntry)) {
                    throw Error("Expected BT Entry");
                }

                const page = Page.getPage(this.#dv.buffer, entry.BREF.ib);
                if (!(page instanceof BTPage)) {
                    throw Error("Expected BT Page");
                }

                return page.findEntry(key);
            }
        }

        // It must be in the our page (or doesn't exist).

        const entry = this.getEntry(this.cEnt - 1);
        if (!(entry instanceof BTEntry)) {
            throw Error("Expected BT Entry");
        }

        const page = Page.getPage(this.#dv.buffer, entry.BREF.ib);
        if (!(page instanceof BTPage)) {
            throw Error("Expected BT Page");
        }

        return page.findEntry(key);
    }

    /**
     *
     * @returns {bigint[]}
     */
    getAllKeys () {
        if (this.cLevel === 0) {
            return this.keys;
        }

        const out = [];

        for (let i = 0; i < this.cEnt; i++) {
            const entry = this.getEntry(i);

            if (!(entry instanceof BTEntry)) {
                throw Error("Expected BTEntry. Got: " + (
                    entry instanceof NodeEntry ? "Node" : (
                        entry instanceof BTEntry ? ("BTEntry. bid: " + entry.BREF.bid) : "Other"
                    )
                ));
            }

            const page = Page.getPage(this.#dv.buffer, entry.BREF.ib);
            if (!(page instanceof BTPage)) {
                throw Error("Expected BT Page");
            }

            out.push(...page.getAllKeys());
        }

        return out;
    }
}

export class AMapPage extends Page {

}

export class PMapPage extends Page {

}

export class DListPage extends Page {

}

export class FMapPage extends Page {

}

export class FPMapPage extends Page {

}

export class BTEntry {
    #dv;

    get btkey () { return this.#dv.getBigUint64(0, true); }
    get BREF () { return new BREF(this.#dv.buffer, this.#dv.byteOffset + 8); }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} offset
     */
    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }
}


export class BlockEntry {
    #dv;

    get BREF () { return new BREF(this.#dv.buffer, this.#dv.byteOffset); }
    get cb () { return this.#dv.getUint16(16, true); }
    get cRef () { return this.#dv.getUint16(18, true); }
    get dwPadding () { return this.#dv.getUint32(20, true); }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} offset
     */
    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }
}

export class NodeEntry {
    #dv;

    static NID_TYPE_HID                     = 0x00;
    static NID_TYPE_INTERNAL                = 0x01;
    static NID_TYPE_NORMAL_FOLDER           = 0x02;
    static NID_TYPE_SEARCH_FOLDER           = 0x03;
    static NID_TYPE_NORMAL_MESSAGE          = 0x04;
    static NID_TYPE_ATTACHMENT              = 0x05;
    static NID_TYPE_SEARCH_UPDATE_QUEUE     = 0x06;
    static NID_TYPE_SEARCH_CRITERIA_OBJECT  = 0x07;
    static NID_TYPE_ASSOC_MESSAGE           = 0x08;
    static NID_TYPE_CONTENTS_TABLE_INDEX    = 0x0A;
    static NID_TYPE_RECIEVE_FOLDER_TABLE    = 0x0B;
    static NID_TYPE_OUTGOING_QUEUE_TABLE    = 0x0C;
    static NID_TYPE_HIERARCHY_TABLE         = 0x0D;
    static NID_TYPE_CONTENTS_TABLE          = 0x0E;
    static NID_TYPE_ASSOC_CONTENTS_TABLE    = 0x0F;
    static NID_TYPE_SEARCH_CONTENTS_TABLE   = 0x10;
    static NID_TYPE_ATTACHEMENT_TABLE       = 0x11;
    static NID_TYPE_RECIPIENT_TABLE         = 0x12;
    static NID_TYPE_SEARCH_TABLE_INDEX      = 0x13;
    static NID_TYPE_LTP                     = 0x1F;

    get nid () { return this.#dv.getBigUint64(0, true); }
    get bidData () { return this.#dv.getBigUint64(8, true); }
    get bidSub () { return this.#dv.getBigUint64(16, true); }
    get nidParent () { return this.#dv.getUint32(24, true); }
    get dwPadding () { return this.#dv.getUint32(28, true); }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} offset
     */
    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }

    /**
     * @param {number|bigint} nid
     */
    static getNIDType (nid) {
        return typeof nid === "number" ? (nid & 0x1F) : parseInt((nid & 0x1Fn).toString());
    }

    /**
     * @param {number | bigint} nid
     */
    static isNIDInternal (nid) {
        return this.getNIDType(nid) === this.NID_TYPE_INTERNAL;
    }

    /**
     * Make a new NID based on an old NID and a new nidType
     * @param {number|bigint} nid
     * @param {number} nidType
     */
    static makeNID (nid, nidType) {
        // 0001 1111 = 0x1F
        // 1110 0000 = 0xE0
        const typeMask = 0x1F;
        const nidMask = ~typeMask;

        const typeMaskBigInt = 0x1Fn;
        const nidMaskBigInt = ~typeMaskBigInt;

        if (typeof nid === "bigint") {
            return (nid & nidMaskBigInt) | BigInt(nidType & typeMask);
        }

        return (nid & nidMask) | (nidType & typeMask);
    }
}

export class DataBlock {
    #dv;
    #dataSize;

    get blockSize () {
        return Math.ceil((this.#dataSize + 16)/64)*64;
    }

    get data () {
        return this.#dv.buffer.slice(this.#dv.byteOffset, this.#dv.byteOffset + this.#dataSize);
    }

    // BLOCKTRAILER
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

export class InternalBlock {
    #dv;
    #dataSize;

    get blockSize () {
        return Math.ceil((this.#dataSize + 16)/64)*64;
    }

    get bType () { return this.#dv.getUint8(0); }
    get cLevel () { return this.#dv.getUint8(1); }
    get cEnt () { return this.#dv.getUint16(2, true); }
    get lcbTotal () { return this.#dv.getUint32(4, true); }

    // BLOCKTRAILER
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

export class XBlock extends InternalBlock {
    #dv;

    /**
     * @param {ArrayBufferLike} buffer
     * @param {number} offset
     * @param {number} dataSize
     */
    constructor (buffer, offset, dataSize) {
        super(buffer, offset, dataSize);

        this.#dv = new DataView(buffer, offset);
    }

    /**
     * @param {number} n
     */
    getBID (n) {
        return this.#dv.getBigUint64(8 + 8 * n, true);
    }
}

export class XXBlock extends InternalBlock {
    #dv;

    /**
     * @param {ArrayBufferLike} buffer
     * @param {number} offset
     * @param {number} dataSize
     */
    constructor (buffer, offset, dataSize) {
        super(buffer, offset, dataSize);

        this.#dv = new DataView(buffer, offset);
    }

    /**
     * @param {number} n
     */
    getBID (n) {
        return this.#dv.getBigUint64(8 + 8 * n, true);
    }
}

export class SubnodeLeafBlock extends InternalBlock {
    #dv;

    constructor (buffer, offset, dataSize) {
        super(buffer, offset, dataSize);

        this.#dv = new DataView(buffer, offset);
    }

    getEntry (n) {
        const begin = this.#dv.byteOffset + 8 + n * 24;
        return new SubnodeLeafEntry(this.#dv.buffer.slice(begin, begin + 24));
    }
}

export class SubnodeIntermediateBlock extends InternalBlock {}

export class SubnodeLeafEntry {
    #dv;

    get nid () { return this.#dv.getBigUint64(0, true); }
    get bidData () { return this.#dv.getBigUint64(8, true); }
    get bidSub () { return this.#dv.getBigUint64(16, true); }

    constructor (buffer) {
        this.#dv = new DataView(buffer);
    }
}