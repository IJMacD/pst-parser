
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
     * @param {DataView} dv
     */
    constructor (dv) {
        this.#dv = dv;
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