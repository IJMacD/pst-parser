import { BTEntry } from "./BTEntry.js";
import { BlockEntry } from "./BlockEntry.js";
import { NodeEntry } from "./NodeEntry.js";
import { Page } from "./Page.js";


export class BTPage extends Page {
    #dv;

    /**
     * @param {DataView} dv Must be a DataView pointing to a buffer containing
     * the entire file for `getPage()`, `findEntry()`, and `getAllKeys()`
     * methods to work.
     */
    constructor(dv) {
        super(dv);

        this.#dv = dv;

        if (this.ptype !== 0x80 && this.ptype !== 0x81) {
            throw Error("Page is not a BTreePage");
        }
    }

    get cEnt() { return this.#dv.getUint8(488); }
    get cEntMax() { return this.#dv.getUint8(489); }
    get cbEnt() { return this.#dv.getUint8(490); }
    get cLevel() { return this.#dv.getUint8(491); }
    get dwPadding() { return this.#dv.getUint32(492, true); }

    /**
     * @param {number|bigint} ib Absolute byte offset relative to start of file
     */
    getPage (ib) {
        const byteOffset = typeof ib === "number" ? ib : parseInt(ib.toString());
        return new BTPage(this.getDataView(byteOffset - this.#dv.byteOffset, 512));
    }

    /**
     * @param {number} n
     */
    getEntry(n) {
        const begin = n * this.cbEnt;

        if (this.cLevel === 0) {
            if (this.ptype === 0x80) {
                return new BlockEntry(this.getDataView(begin, this.cbEnt));
            }
            if (this.ptype === 0x81) {
                return new NodeEntry(this.getDataView(begin, this.cbEnt));
            }
            throw Error("Invalid BT Page");
        }

        return new BTEntry(this.getDataView(begin, this.cbEnt));
    }

    get keys() {
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
    findEntry(key) {
        const keys = this.keys;

        // If we're level 0 then either *we* have the key or it doesn't exist.
        if (this.cLevel === 0) {
            const k = typeof key === "bigint" ? key : BigInt(key);
            const index = keys.indexOf(k);

            if (index >= 0) {
                return /** @type {BlockEntry|NodeEntry} */ (this.getEntry(index));
            }

            // Not in leaf
            return null;
        }

        // If we're above level 0 then find which of our child pages should
        // be the next step.
        for (let i = 0; i < this.cEnt; i++) {
            if (keys[i] > key) {
                // Before the first entry
                if (i === 0)
                    return null;

                const entry = this.getEntry(i - 1);
                if (!(entry instanceof BTEntry)) {
                    throw Error("Expected BT Entry");
                }

                const page = this.getPage(entry.BREF.ib);
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

        const page = this.getPage(entry.BREF.ib);
        if (!(page instanceof BTPage)) {
            throw Error("Expected BT Page");
        }

        return page.findEntry(key);
    }

    /**
     *
     * @returns {bigint[]}
     */
    getAllKeys() {
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

            const page = this.getPage(entry.BREF.ib);
            if (!(page instanceof BTPage)) {
                throw Error("Expected BT Page");
            }

            out.push(...page.getAllKeys());
        }

        return out;
    }
}
