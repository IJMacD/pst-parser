
export class BREF {
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
                return new Block(this.#dv.buffer, this.#dv.byteOffset + begin);
            }
            if (this.ptype === 0x81) {
                return new Node(this.#dv.buffer, this.#dv.byteOffset + begin);
            }
            throw Error("Invalid BT Page");
        }

        return new BTEntry(this.#dv.buffer, this.#dv.byteOffset + begin);
    }

    get keys () {
        const out = [];
        for (let i = 0; i < this.cEnt; i++) {
            const entry = this.getEntry(i);

            if (entry instanceof Block) {
                out.push(entry.BREF.bid);
            }
            else if (entry instanceof Node) {
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

        // Check the last page
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
            if (!(entry instanceof Block)) {
                throw Error("Expected BT Entry");
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

    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }
}


export class Block {
    #dv;

    get BREF () { return new BREF(this.#dv.buffer, this.#dv.byteOffset); }
    get cb () { return this.#dv.getUint16(16, true); }
    get cRef () { return this.#dv.getUint16(18, true); }
    get dwPadding () { return this.#dv.getUint32(20, true); }

    constructor (buffer, offset) {
        this.#dv = new DataView(buffer, offset);
    }
}


export class Node {
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