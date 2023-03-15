import { NodeEntry } from './nbr.js';

export class HeapNode {

    static TYPE_TABLE_CONTEXT = 0x7C;
    static TYPE_BTREE_ON_HEAP = 0xB5;
    static TYPE_PROPERTY_CONTEXT = 0xBC;

    #dv;

    get ibHnpm () { return this.#dv.getUint16(0, true); }
    get bSig () { return this.#dv.getUint8(2); }
    get bClientSig () { return this.#dv.getUint8(3); }
    get hidUserRoot () { return this.#dv.getUint32(4, true); }
    get rgbFillLevel () { return this.#dv.getUint32(8, true); }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        this.#dv = new DataView(buffer);
    }

    /**
     * @param {number} blockIndex
     */
    #getPageMap (blockIndex) {
        const blockOffset = 8192 * blockIndex;
        const ibHnpm = this.#dv.getUint16(blockOffset, true);
        return new HeapNodePageMap(this.#dv.buffer, blockOffset + ibHnpm);
    }

    /**
     * @param {number} itemIndex
     * @param {number} blockIndex
     */
    #getItem (itemIndex, blockIndex) {
        // Get page map for the requested block
        const pageMap = this.#getPageMap(blockIndex);

        const n = itemIndex;
        if (n < 0 || n > pageMap.cAlloc) {
            throw RangeError("Invalid Heap Item - Index: " + itemIndex + " (Block: " + blockIndex + ")");
        }

        const blockOffset = 8192 * blockIndex;

        const begin = blockOffset + pageMap.rgibAlloc[n];
        const end = blockOffset + pageMap.rgibAlloc[n + 1];

        return this.#dv.buffer.slice(begin, end);
    }

    /**
     * @param {number} hid
     */
    getItemByHID (hid) {
        const { hidIndex, hidBlockIndex } = parseHid(hid);

        if (hidIndex === 0) return new ArrayBuffer(0);

        return this.#getItem(hidIndex - 1, hidBlockIndex);
    }

    /**
     * @param {number} blockIndex
     */
    getAllocationCount (blockIndex) {
        return this.#getPageMap(blockIndex).cAlloc;
    }
}

export class HeapNodePageMap {
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

export class BTreeOnHeap extends HeapNode {
    #dv;

    get bType () { return this.#dv.getUint8(0); }
    get cbKey () { return this.#dv.getUint8(1); }
    get cbEnt () { return this.#dv.getUint8(2); }
    get bIdxLevels () { return this.#dv.getUint8(3); }
    get hidRoot () { return this.#dv.getUint32(4, true); }

    get keys () { return this.#getKeys(this.hidRoot, this.bIdxLevels); }

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} [hid]
     */
    constructor (buffer, hid) {
        super(buffer);

        if (typeof hid === "undefined") {
            hid = this.hidUserRoot;
        }

        this.#dv = new DataView(this.getItemByHID(hid));
    }

    /**
     * @param {number} hid
     * @param {number} level
     * @returns {(number|bigint)[]}
     */
    #getKeys (hid, level) {
        if (hid === 0) return [];

        const count = this.#getLevelRecordCount(hid, level);

        if (level === 0) {
            const out = [];

            for (let i = 0; i < count; i++) {
                const record = this.#getRecord(hid, level, i);

                out.push(/** @type {(number|bigint)} */(record.key));
            }

            return out;
        }

        const out = [];

        for (let i = 0; i < count; i++) {
            const record = this.#getRecord(hid, level, i);
            const nextHid = new DataView(record.data).getUint32(0, true);

            out.push(...this.#getKeys(nextHid, level - 1));
        }

        return out;
    }

    /**
     * @param {number} hid
     * @param {number} level
     * @param {number} n
     */
    #getRecord (hid, level, n) {
        const dv = new DataView(this.getItemByHID(hid));
        const dataSize = level === 0 ? this.cbEnt : 4;
        const recordSize = this.cbKey + dataSize;
        const recordCount = dv.byteLength / recordSize;

        if (n >= recordCount) {
            throw Error("Invalid BTreeOnHeapRecord index: " + n);
        }

        const begin = n * recordSize;

        if (this.cbKey === 2) {
            const key = dv.getUint16(begin, true);
            const data = dv.buffer.slice(begin + this.cbKey, begin + recordSize);

            return  { key, data };
        }

        if (this.cbKey === 4) {
            const key = dv.getUint32(begin, true);
            const data = dv.buffer.slice(begin + this.cbKey, begin + recordSize);

            return  { key, data };
        }

        if (this.cbKey === 8) {
            const key = dv.getBigUint64(begin, true);
            const data = dv.buffer.slice(begin + this.cbKey, begin + recordSize);

            return  { key, data };
        }

        if (this.cbKey === 16) {
            const key = dv.buffer.slice(begin, begin + 16);
            const data = dv.buffer.slice(begin + this.cbKey, begin + recordSize);

            return  { key, data };
        }

        throw Error("Unexpected key size");
    }

    /**
     * @param {number} hid
     * @param {number} level
     */
    #getLevelRecordCount (hid, level) {
        if (hid === 0) return 0;

        const dv = new DataView(this.getItemByHID(hid));
        const dataSize = level === 0 ? this.cbEnt : 4;
        const recordSize = this.cbKey + dataSize;
        return dv.byteLength / recordSize;
    }

    /**
     * @param {number | bigint} key
     */
    findRecord (key) {
        let hid = this.hidRoot;
        let level = this.bIdxLevels;

        while (level > 0) {
            const count = this.#getLevelRecordCount(hid, level);

            for (let i = 1; i < count; i++) {
                const record = this.#getRecord(hid, level, i);

                if (record.key > key) {
                    const prevRecord = this.#getRecord(hid, level, i - 1);
                    hid = new DataView(prevRecord.data).getUint32(0, true);

                    break; // break for
                }
            }
            level--;
        }

        for (let i = 0; i < this.#getLevelRecordCount(hid, level); i++) {
            const record = this.#getRecord(hid, level, i);

            if (record.key === key) {
                return record
            }
        }

        // Not found
    }
}

export class PropertyContext extends BTreeOnHeap {
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

    // 0x0001 – 0x0bff Message envelope properties
    static PID_TAG_IMPORTANCE                           = 0x0017;
    static PID_TAG_MESSAGE_CLASS                        = 0x001A;
    static PID_TAG_ORIGINATOR_DELIVERY_REPORT_REQUESTED = 0x0023;
    static PID_TAG_PRIORITY                             = 0x0026;
    static PID_TAG_READ_RECEIPT_REQUESTED               = 0x0029;
    static PID_TAG_SENSITIVITY                          = 0x0036;
    static PID_TAG_SUBJECT                              = 0x0037;
    static PID_TAG_CLIENT_SUBMIT_TIME                   = 0x0039;
    static PID_TAG_SENT_REPRESENTING_SEARCH_KEY         = 0x003B;
    static PID_TAG_RECEIVED_BY_ENTRY_ID                 = 0x003F;
    static PID_TAG_RECEIVED_BY_NAME                     = 0x0040;
    static PID_TAG_SENT_REPRESENTING_ENTRY_ID           = 0x0041;
    static PID_TAG_SENT_REPRESENTING_NAME               = 0x0042;
    static PID_TAG_RECEIVED_REPRESENTING_ENTRY_ID       = 0x0043;
    static PID_TAG_RECEIVED_REPRESENTING_NAME           = 0x0044;
    static PID_TAG_RECEIVED_BY_SEARCH_KEY               = 0x0051;
    static PID_TAG_RECEIVED_REPRESENTING_SEARCH_KEY     = 0x0052;
    static PID_TAG_MESSAGE_TO_ME                        = 0x0057;
    static PID_TAG_MESSAGE_CC_ME                        = 0x0058;
    static PID_TAG_SENT_REPRESENTING_ADDRESS_TYPE       = 0x0064;
    static PID_TAG_SENT_REPRESENTING_EMAIL_ADDRESS      = 0x0065;
    static PID_TAG_CONVERSATION_TOPIC                   = 0x0070;
    static PID_TAG_CONVERSATION_INDEX                   = 0x0071;
    static PID_TAG_RECEIVED_BY_ADDRESS_TYPE             = 0x0075;
    static PID_TAG_RECEIVED_BY_EMAIL_ADDRESS            = 0x0076;
    static PID_TAG_RECEIVED_REPRESENTING_ADDRESS_TYPE   = 0x0077;
    static PID_TAG_RECEIVED_REPRESENTING_EMAIL_ADDRESS  = 0x0078;
    static PID_TAG_TRANSPORT_MESSAGE_HEADERS            = 0x007D;

    // 0x0c00 – 0x0dff Recipient properties
    static PID_TAG_NON_RECIPIENT_NOTIFICATION_REQUESTED = 0x0C06;
    static PID_TAG_SENDER_ENTRY_ID                      = 0x0C19;
    static PID_TAG_SENDER_NAME                          = 0x0C1A;
    static PID_TAG_SENDER_SEARCH_KEY                    = 0x0C1D;
    static PID_TAG_SENDER_ADDRESS_TYPE                  = 0x0C1E;
    static PID_TAG_SENDER_EMAIL_ADDRESS                 = 0x0C1F;

    // 0x0e00 – 0x0fff Non-transmittable message properties
    static PID_TAG_CURRENT_VERSION                  = 0x0E00;
    static PID_TAG_DELETE_AFTER_TRANSMIT            = 0x0E01;
    static PID_TAG_DISPLAY_BCC                      = 0x0E02;
    static PID_TAG_DISPLAY_CC                       = 0x0E03;
    static PID_TAG_DISPLAY_TO                       = 0x0E04;
    static PID_TAG_PARENT_DISPLAY                   = 0x0E05;
    static PID_TAG_MESSAGE_DELIVERY_TIME            = 0x0E06;
    static PID_TAG_MESSAGE_FLAGS                    = 0x0E07;
    static PID_TAG_MESSAGE_SIZE                     = 0x0E08;
    static PID_TAG_MESSAGE_STATUS                   = 0x0E17;
    static PID_TAG_NORMALIZED_SUBJECT               = 0x0E1D;
    static PID_TAG_INTERNET_ARTICLE_NUMBER          = 0x0E23;
    static PID_TAG_IMAP_ID                          = 0x0E2F;
    static PID_TAG_REPLICATION_ITEM_ID              = 0x0E30;
    static PID_TAG_REPLICATION_CHANGE_NUM           = 0x0E33;
    static PID_TAG_REPLICATION_VERSION_HISTORY      = 0x0E34;
    static PID_TAG_REPLICATION_FLAGS                = 0x0E38;
    static PID_TAG_REPL_COPIED_FROM_VERSION_HISTORY = 0x0E3C;
    static PID_TAG_REPL_COPIED_FROM_ITEM_ID         = 0x0E3D;
    static PID_TAG_CREATOR_SID                      = 0x0E58;
    static PID_TAG_LAST_MODIFIER_SID                = 0x0E59;

    static PID_TAG_RECORD_KEY                       = 0x0FF9;

    // 0x1000 – 0x2fff Message content properties
    static PID_TAG_BODY                             = 0x1000;
    static PID_TAG_BODY_HTML                        = 0x1013;
    static PID_TAG_NATIVE_BODY                      = 0x1016;
    static PID_TAG_INTERNET_MESSAGE_ID              = 0x1035;
    static PID_TAG_ITEM_TEMPORARY_FLAGS             = 0x1097;
    static PID_TAG_ATTR_HIDDEN                      = 0x10F4;
    static PID_TAG_ATTR_SYSTEM                      = 0x10F5;
    static PID_TAG_ATTR_READONLY                    = 0x10F6;

    // 0x3000 - 0x33ff Common object properties that appear on multiple objects
    static PID_TAG_DISPLAY_NAME                     = 0x3001;
    static PID_TAG_COMMENT                          = 0x3004;
    static PID_TAG_CREATION_TIME                    = 0x3007;
    static PID_TAG_LAST_MODIFICATION_TIME           = 0x3008;
    static PID_TAG_SEARCH_KEY                       = 0x300B;
    static PID_TAG_CONVERSATION_ID                  = 0x3013;
    static PID_TAG_CONVERSATION_INDEX_TRACKING      = 0x3016;

    // 0x3400 - 0x35ff Message store properties
    static PID_TAG_ROOT_MAILBOX                         = 0x35E0;
    static PID_TAG_DELETED_ITEMS                        = 0x35E3;
    static PID_TAG_SEARCH_FOLDER                        = 0x35E7;
    static PID_TAG_COMMUNICATOR_HISTORY_FOLDER_ENTRY_ID = 0x35E9;
    static PID_TAG_SYNC_ROOT_ENTRY_ID                   = 0x35EA;

    // 0x3600 - 0x36ff Folder and address book container properties
    static PID_TAG_CONTENT_COUNT                = 0x3602;
    static PID_TAG_CONTENT_UNREAD_COUNT         = 0x3603;
    static PID_TAG_SUBFOLDERS                   = 0x360A;
    static PID_TAG_CONTAINER_CLASS              = 0x3613;
    static PID_TAG_ASSOC_CONTENT_COUNT          = 0x3617;
    static PID_TAG_IPM_DRAFTS_ENTRY_ID          = 0x36D7;
    static PID_TAG_ADDITIONAL_REN_ENTRY_IDS     = 0x36D8;
    static PID_TAG_ADDITIONAL_REN_ENTRY_IDS_EX  = 0x36D9;
    static PID_TAG_FOLDER_VIEW_LIST             = 0x36EB;

    // 0x3900 – 0x39ff Address book properties
    static PID_TAG_DISPLAY_TYPE                 = 0x3900;
    // Icon Display Type
    // Values:
    // 0x0100 0000  Folder
    // 0x0200 0000  Folder Link
    // 0x0400 0000  Folder Special
    static PID_TAG_SMTP_ADDRESS                 = 0x39FE;

    // 0x3e00 – 0x3fff Status object properties
    static PID_TAG_NTSD_MODIFICATION_TIME       = 0x3FD6;
    static PID_TAG_INTERNET_CODEPAGE            = 0x3FDE;
    static PID_TAG_DESIGN_IN_PROGRESS           = 0x3FE4;
    static PID_TAG_SECURE_ORIGIN                = 0x3FE5;
    static PID_TAG_FROM_I_HAVE                  = 0x3FF1;
    static PID_TAG_LAST_MODIFIER_NAME           = 0x3FFA;
    static PID_TAG_LAST_MODIFIER_ENTRY_ID       = 0x3FFB;
    static PID_TAG_MESSAGE_CODEPAGE             = 0x3FFD;
    static PID_TAG_MESSAGE_LOCALE               = 0x3FFF;

    // 0x4000 – 0x57ff Message envelope properties
    static PID_TAG_SENDER_FLAGS                             = 0x4019;
    static PID_TAG_CREATOR_ADDRESS_TYPE                     = 0x4022;
    static PID_TAG_CREATOR_EMAIL_ADDRESS                    = 0x4023;
    static PID_TAG_SENDER_SIMPLE_DISP_NAME                  = 0x4030;
    static PID_TAG_SENT_REPRESENTING_SIMPLE_DISP_NAME       = 0x4031;
    static PID_TAG_RECEIVED_REPRESENTING_SIMPLE_DISP_NAME   = 0x4035;
    static PID_TAG_CREATOR_SIMPLE_DISP_NAME                 = 0x4038;
    static PID_TAG_LAST_MODIFIER_SIMPLE_DISP_NAME           = 0x4039;
    static PID_TAG_CREATOR_FLAGS                            = 0x4059;
    static PID_TAG_MODIFIER_FLAGS                           = 0x405A;
    static PID_TAG_HIER_REV                                 = 0x4082;


    // 0x5800 – 0x5fff Recipient properties
    static PID_TAG_MESSAGE_EDITOR_FORMAT                    = 0x5909;
    static PID_TAG_SENT_REPRESENTING_SMTP_ADDRESS           = 0x5D02;
    static PID_TAG_RECEIVED_BY_SMTP_ADDRESS                 = 0x5D07;
    static PID_TAG_RECEIVED_REPRESENTING_SMTP_ADDRESS       = 0x5D08;

    // 0x6000 - 0x65ff Non-transmittable message properties
    static PID_TAG_CHANGE_KEY                   = 0x65E2;
    static PID_TAG_PREDECESSOR_CHANGE_LIST      = 0x65E3;

    // 0x6600 – 0x67ff Non-transmittable properties
    static PID_TAG_SECURE_SUBMIT_FLAGS      = 0x65c6;
    static PID_TAG_PST_BODY_PREFIX          = 0x6619;
    static PID_TAG_PST_HIDDEN_COUNT         = 0x6635;
    static PID_TAG_PST_HIDDEN_UNREAD        = 0x6636;
    static PID_TAG_LTP_ROW_ID               = 0x67F2;
    static PID_TAG_LTP_ROW_VER              = 0x67F3;
    static PID_TAG_PST_PASSWORD             = 0x67FF;

    // 0x7c00 – 0x7fff Non-transmittable properties for custom message classes
    static PID_TAG_LOCAL_COMMIT_TIME_MAX    = 0x7C0E;
    static PID_TAG_DELETED_COUNT_TOTAL      = 0x7C0F;

    // 0x8000 – 0xfffe Named properties
    static PID_TAG_NAMED_1                  = 0x8000;
    static PID_TAG_NAMED_2                  = 0x8001;
    static PID_TAG_NAMED_3                  = 0x8002;
    static PID_TAG_NAMED_4                  = 0x8003;

    constructor (buffer) {
        super(buffer);

        if (this.bClientSig !== HeapNode.TYPE_PROPERTY_CONTEXT) {
            throw Error("HeapNode is not a PropertyContext. bClientSig: " + this.bClientSig.toString(16));
        }

        if (this.cbKey !== 2) {
            throw Error("Key size is not correct for PropertyContext. Got " + this.cbKey);
        }
    }

    /**
     * @param {number} key
     */
    #getPCRecordByKey (key) {
        const record = this.findRecord(key);

        if (!record) return;

        const { key: wPropId, data } = record;

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
    getValueByKey (key) {
        const record = this.#getPCRecordByKey(key);

        if (!record) return;

        if (record.wPropType === PropertyContext.PTYPE_STRING) {
            if (record.dwValueHnid === 0) return "";
            if (NodeEntry.getNIDType(record.dwValueHnid) === NodeEntry.NID_TYPE_HID) {
                const data = this.getItemByHID(record.dwValueHnid);
                return String.fromCharCode(...new Uint16Array(data));
            }
        }

        if (record.wPropType === PropertyContext.PTYPE_BINARY) {
            if (NodeEntry.getNIDType(record.dwValueHnid) === NodeEntry.NID_TYPE_HID) {
                return this.getItemByHID(record.dwValueHnid);
            }
        }

        if (record.wPropType === PropertyContext.PTYPE_INTEGER32) {
            return record.dwValueHnid;
        }

        if (record.wPropType === PropertyContext.PTYPE_INTEGER64) {
            return new DataView(this.getItemByHID(record.dwValueHnid)).getBigUint64(0, true);
        }

        if (record.wPropType === PropertyContext.PTYPE_BOOLEAN) {
            return record.dwValueHnid > 0;
        }

        if (record.wPropType === PropertyContext.PTYPE_TIME) {
            const value = new DataView(this.getItemByHID(record.dwValueHnid)).getBigUint64(0, true);
            const UNIX_TIME_START = 0x019DB1DED53E8000n; //January 1, 1970 (start of Unix epoch) in "ticks"
            const TICKS_PER_MILLISECOND = 10000n; // a tick is 100ns
            const timestamp = (value - UNIX_TIME_START) / TICKS_PER_MILLISECOND;
            return new Date(parseInt(timestamp.toString()));
        }

    }

    getAllProperties () {
        const keys = /** @type {number[]} */(this.keys);
        return keys.map(key => ({ tag: key, tagHex: "0x"+key.toString(16).padStart(4, "0"), tagName: PropertyContext.getTagName(key), value: this.getValueByKey(key) }));
    }

    /**
     * @param {number} tag
     */
    static getTagName (tag) {
        return tagDebug[tag];
    }
}

export class TableContext extends HeapNode {
    #subData;
    #info;
    #rowIndex;

    get recordCount () { return this.#rowIndex.keys.length; }

    get rowIndexKeys () { return this.#rowIndex.keys; }

    get columnDescriptions () { return this.#info.colDescriptions; }

    /**
     * @param {ArrayBuffer} data
     * @param {ArrayBuffer?} [subData]
     */
    constructor (data, subData) {
        super(data);

        if (this.bClientSig !== HeapNode.TYPE_TABLE_CONTEXT) {
            throw Error("HeapNode is not a TableContext. bClientSig: " + this.bClientSig.toString(16));
        }

        this.#subData = subData;

        this.#info = new TableContextInfo(this.getItemByHID(this.hidUserRoot));

        this.#rowIndex = new BTreeOnHeap(data, this.#info.hidRowIndex);
    }

    /**
     * @param {number} rowIndex
     */
    getRowData (rowIndex) {
        if (rowIndex > this.recordCount - 1) {
            throw Error("Trying to get row index " + rowIndex + " (count: " + this.recordCount + ")");
        }

        const nidType = NodeEntry.getNIDType(this.#info.hnidRows);

        const rowMatrix =
            (nidType === NodeEntry.NID_TYPE_HID) ?
                this.getItemByHID(this.#info.hnidRows) : this.#subData;

        if (!rowMatrix) {
            throw Error("Unable to locate RowMatrix");
        }

        if (rowMatrix.byteLength === 0) {
            throw Error("Empty RowMatrix");
        }

        const rowWidth = this.#info.rowWidth;
        const start = rowIndex * rowWidth;

        if (start > rowMatrix.byteLength || rowWidth === 0) {
            throw Error("About to create a null buffer slice");
        }

        return rowMatrix.slice(start, start + rowWidth);
    }

    /**
     * @param {number} rowIndex
     * @param {number} iBit iBit in ColumnDescription
     */
    doesCellExist (rowIndex, iBit) {
        const cebStart = this.#info.rgib.TCI_1b;
        const cebEnd = this.#info.rgib.TCI_cb;

        const rgCEB = new Uint8Array(this.getRowData(rowIndex).slice(cebStart, cebEnd));

        return !!(rgCEB[Math.floor(iBit / 8)] & (1 << (7 - (iBit % 8))));
    }

    /**
     * @param {number} rowIndex
     * @param {TableContextColDesc} columnDesc
     */
    #getCellDataByColDesc (rowIndex, columnDesc) {
        const dv = new DataView(this.getRowData(rowIndex));

        if (dv.byteLength === 0) {
            throw Error("Got an empty buffer");
        }

        if (columnDesc.cbData === 1) {
            return dv.getUint8(columnDesc.ibData);
        }

        if (columnDesc.cbData === 2) {
            return dv.getUint16(columnDesc.ibData, true);
        }

        if (columnDesc.cbData === 4) {
            return dv.getUint32(columnDesc.ibData, true);
        }

        if (columnDesc.cbData === 8) {
            return dv.getBigUint64(columnDesc.ibData, true);
        }

        throw Error("Unimplemented");
    }

    /**
     * @param {number} rowIndex
     * @param {number} columnIndex
     */
    getCellData (rowIndex, columnIndex) {
        const columnDesc = this.#info.colDescriptions[columnIndex];

        if (columnDesc)
            return this.#getCellDataByColDesc(rowIndex, columnDesc);
    }

    /**
     * @param {number} rowIndex
     * @param {number} columnTag
     */
    getCellDataByColumnTag (rowIndex, columnTag) {
        const columnDesc = this.#info.colDescriptions.find(desc => desc.dataTag === columnTag);

        if (columnDesc)
            return this.#getCellDataByColDesc(rowIndex, columnDesc);
    }

    /**
     * @param {number} rowIndex
     * @param {number} columnTag
     */
    getCellValueByColumnTag (rowIndex, columnTag) {
        const columnDesc = this.#info.colDescriptions.find(desc => desc.dataTag === columnTag);

        if (!columnDesc)
            return;

        const cellData = this.#getCellDataByColDesc(rowIndex, columnDesc);

        if (columnDesc.dataType === PropertyContext.PTYPE_STRING) {
            if (cellData === 0) return "";
            if (NodeEntry.getNIDType(cellData) === NodeEntry.NID_TYPE_HID) {
                const hid = typeof cellData === "bigint" ? parseInt(cellData.toString()) : cellData;
                const data = this.getItemByHID(hid);
                return String.fromCharCode(...new Uint16Array(data));
            }
        }

        if (columnDesc.dataType === PropertyContext.PTYPE_BINARY) {
            if (NodeEntry.getNIDType(cellData) === NodeEntry.NID_TYPE_HID) {
                const hid = typeof cellData === "bigint" ? parseInt(cellData.toString()) : cellData;
                return this.getItemByHID(hid);
            }
        }

        if (columnDesc.dataType === PropertyContext.PTYPE_INTEGER16) {
            return cellData;
        }

        if (columnDesc.dataType === PropertyContext.PTYPE_INTEGER32) {
            return cellData;
        }

        if (columnDesc.dataType === PropertyContext.PTYPE_INTEGER64) {
            return cellData;
        }

        if (columnDesc.dataType === PropertyContext.PTYPE_BOOLEAN) {
            return cellData > 0;
        }

        if (columnDesc.dataType === PropertyContext.PTYPE_TIME) {
            if (typeof cellData !== "bigint") {
                throw Error("Expected bigint for time");
            }
            const UNIX_TIME_START = 0x019DB1DED53E8000n; //January 1, 1970 (start of Unix epoch) in "ticks"
            const TICKS_PER_MILLISECOND = 10000n; // a tick is 100ns
            const timestamp = (cellData - UNIX_TIME_START) / TICKS_PER_MILLISECOND;
            return new Date(parseInt(timestamp.toString()));
        }

    }

    /**
     * @param {number} rowIndex
     */
    getAllRowProperties (rowIndex) {
        const cols = this.columnDescriptions;
        return cols.map(col => ({ tag: col.dataTag, tagHex: "0x"+col.dataTag.toString(16).padStart(4, "0"), tagName: PropertyContext.getTagName(col.dataTag), value: this.getCellValueByColumnTag(rowIndex, col.dataTag) }));
    }
}

export class TableContextInfo {
    #dv;
    #tcoldesc;

    get bType () { return this.#dv.getUint8(0); }
    get cCols () { return this.#dv.getUint8(1); }
    get rgib () {
        return {
            TCI_4b: this.#dv.getUint16(2, true),
            TCI_2b: this.#dv.getUint16(4, true),
            TCI_1b: this.#dv.getUint16(6, true),
            TCI_cb: this.#dv.getUint16(8, true),
        }
    }
    get hidRowIndex () { return this.#dv.getUint32(10, true); }
    get hnidRows () { return this.#dv.getUint32(14, true); }
    get hidIndex () { return this.#dv.getUint32(18, true); }

    get colDescriptions () { return this.#tcoldesc; }

    get rowWidth () { return this.rgib.TCI_cb; }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        this.#dv = new DataView(buffer);

        this.#tcoldesc = Array.from({length: this.cCols }).map((_,i) => {
            const start = 22 + i * 8;
            const b = buffer.slice(start, start + 8);
            return new TableContextColDesc(b);
        });
    }
}

export class TableContextColDesc {
    #dv;

    get tag () { return this.#dv.getUint32(0, true); }

    // Overlap: Not explicit in spec
    get dataTag () { return this.#dv.getUint16(2, true); }
    // Overlap: Not explicit in spec
    get dataType () { return this.#dv.getUint16(0, true); }

    /** Data offset */
    get ibData () { return this.#dv.getUint16(4, true); }

    /** Data size */
    get cbData () { return this.#dv.getUint8(6); }

    get iBit () { return this.#dv.getUint8(7); }

    constructor (buffer) {
        this.#dv = new DataView(buffer);
    }
}

function parseHid(hid) {
    const hidType = (hid & 0x1f);

    if (hidType !== NodeEntry.NID_TYPE_HID) {
        throw Error("hid was not a HID (maybe a NID) Type: 0x" + hidType.toString(16).padStart(2, "0"));
    }

    const hidIndex = ((hid >> 5) & 0x7ff);
    const hidBlockIndex = (hid >> 16);
    return { hidType, hidIndex, hidBlockIndex };
}

const tagDebug = {

    [PropertyContext.PID_TAG_IMPORTANCE]:                           "importance",
    [PropertyContext.PID_TAG_MESSAGE_CLASS]:                        "messageClass",
    [PropertyContext.PID_TAG_ORIGINATOR_DELIVERY_REPORT_REQUESTED]: "originatorDeliveryReportRequested",
    [PropertyContext.PID_TAG_PRIORITY]:                             "priority",
    [PropertyContext.PID_TAG_READ_RECEIPT_REQUESTED]:               "readReceiptRequested",
    [PropertyContext.PID_TAG_SENSITIVITY]:                          "sensitivity",
    [PropertyContext.PID_TAG_SUBJECT]:                              "subject",
    [PropertyContext.PID_TAG_CLIENT_SUBMIT_TIME]:                   "clientSubmitTime",
    [PropertyContext.PID_TAG_SENT_REPRESENTING_SEARCH_KEY]:         "sentRepresentingSearchKey",
    [PropertyContext.PID_TAG_RECEIVED_BY_ENTRY_ID]:                 "receivedByEntryID",
    [PropertyContext.PID_TAG_RECEIVED_BY_NAME]:                     "receivedByName",
    [PropertyContext.PID_TAG_SENT_REPRESENTING_ENTRY_ID]:           "sentRepresentingEntryID",
    [PropertyContext.PID_TAG_SENT_REPRESENTING_NAME]:               "sentRepresentingName",
    [PropertyContext.PID_TAG_RECEIVED_REPRESENTING_ENTRY_ID]:       "receivedRepresentingEntryID",
    [PropertyContext.PID_TAG_RECEIVED_REPRESENTING_NAME]:           "receivedRepresentingName",
    [PropertyContext.PID_TAG_RECEIVED_BY_SEARCH_KEY]:               "receivedBySearchKey",
    [PropertyContext.PID_TAG_RECEIVED_REPRESENTING_SEARCH_KEY]:     "receivedRepresentingSearchKey",
    [PropertyContext.PID_TAG_MESSAGE_TO_ME]:                        "messageToMe",
    [PropertyContext.PID_TAG_MESSAGE_CC_ME]:                        "messageCcMe",
    [PropertyContext.PID_TAG_SENT_REPRESENTING_ADDRESS_TYPE]:       "sentRepresentingAddressType",
    [PropertyContext.PID_TAG_SENT_REPRESENTING_EMAIL_ADDRESS]:      "sentRepresentingEmailAddress",
    [PropertyContext.PID_TAG_CONVERSATION_TOPIC]:                   "conversationTopic",
    [PropertyContext.PID_TAG_CONVERSATION_INDEX]:                   "conversationIndex",
    [PropertyContext.PID_TAG_RECEIVED_BY_ADDRESS_TYPE]:             "receivedByAddressType",
    [PropertyContext.PID_TAG_RECEIVED_BY_EMAIL_ADDRESS]:            "receivedByEmailAddress",
    [PropertyContext.PID_TAG_RECEIVED_REPRESENTING_ADDRESS_TYPE]:   "receivedRepresentingAddressType",
    [PropertyContext.PID_TAG_RECEIVED_REPRESENTING_EMAIL_ADDRESS]:  "receivedRepresentingEmailAddress",
    [PropertyContext.PID_TAG_TRANSPORT_MESSAGE_HEADERS]:            "transportMessageHeaders",

    [PropertyContext.PID_TAG_NON_RECIPIENT_NOTIFICATION_REQUESTED]: "nonRecipientNotificationRequested",
    [PropertyContext.PID_TAG_SENDER_ENTRY_ID]:                      "senderEntryID",
    [PropertyContext.PID_TAG_SENDER_NAME]:                          "senderName",
    [PropertyContext.PID_TAG_SENDER_SEARCH_KEY]:                    "senderSearchKey",
    [PropertyContext.PID_TAG_SENDER_ADDRESS_TYPE]:                  "senderAddressType",
    [PropertyContext.PID_TAG_SENDER_EMAIL_ADDRESS]:                 "senderEmailAddress",

    [PropertyContext.PID_TAG_CURRENT_VERSION]:                  "currentVersion",
    [PropertyContext.PID_TAG_DELETE_AFTER_TRANSMIT]:            "deleteAfterTransmit",
    [PropertyContext.PID_TAG_DISPLAY_BCC]:                      "displayBcc",
    [PropertyContext.PID_TAG_DISPLAY_CC]:                       "displayCc",
    [PropertyContext.PID_TAG_DISPLAY_TO]:                       "displayTo",
    [PropertyContext.PID_TAG_PARENT_DISPLAY]:                   "parentDisplay",
    [PropertyContext.PID_TAG_MESSAGE_DELIVERY_TIME]:            "messageDeliveryTime",
    [PropertyContext.PID_TAG_MESSAGE_FLAGS]:                    "messageFlags",
    [PropertyContext.PID_TAG_MESSAGE_SIZE]:                     "messageSize",
    [PropertyContext.PID_TAG_MESSAGE_STATUS]:                   "messageStatus",
    [PropertyContext.PID_TAG_NORMALIZED_SUBJECT]:               "normalisedSubject",
    [PropertyContext.PID_TAG_INTERNET_ARTICLE_NUMBER]:          "internetArticleNumber",
    [PropertyContext.PID_TAG_IMAP_ID]:                          "imapID",
    [PropertyContext.PID_TAG_REPLICATION_ITEM_ID]:              "replicationItemID",
    [PropertyContext.PID_TAG_REPLICATION_CHANGE_NUM]:           "replicationChangeNum",
    [PropertyContext.PID_TAG_REPLICATION_VERSION_HISTORY]:      "replicationVersionHistory",
    [PropertyContext.PID_TAG_REPLICATION_FLAGS]:                "replicationFlags",
    [PropertyContext.PID_TAG_REPL_COPIED_FROM_VERSION_HISTORY]: "replCopiedFromVersionHistory",
    [PropertyContext.PID_TAG_REPL_COPIED_FROM_ITEM_ID]:         "replCopiedFromItemID",
    [PropertyContext.PID_TAG_CREATOR_SID]:                      "creatorSID",
    [PropertyContext.PID_TAG_LAST_MODIFIER_SID]:                "lastModifierSID",

    [PropertyContext.PID_TAG_RECORD_KEY]:                       "recordKey",

    [PropertyContext.PID_TAG_BODY]:                             "body",
    [PropertyContext.PID_TAG_BODY_HTML]:                        "bodyHTML",
    [PropertyContext.PID_TAG_NATIVE_BODY]:                      "nativeBody",
    [PropertyContext.PID_TAG_INTERNET_MESSAGE_ID]:              "internetMessageID",
    [PropertyContext.PID_TAG_ITEM_TEMPORARY_FLAGS]:             "itemTemporaryFlags",
    [PropertyContext.PID_TAG_ATTR_HIDDEN]:                      "attrHidden",
    [PropertyContext.PID_TAG_ATTR_SYSTEM]:                      "attrSystem",
    [PropertyContext.PID_TAG_ATTR_READONLY]:                    "attrReadonly",

    [PropertyContext.PID_TAG_DISPLAY_NAME]:                     "displayName",
    [PropertyContext.PID_TAG_COMMENT]:                          "comment",
    [PropertyContext.PID_TAG_CREATION_TIME]:                    "creationTime",
    [PropertyContext.PID_TAG_LAST_MODIFICATION_TIME]:           "lastModificationTime",
    [PropertyContext.PID_TAG_SEARCH_KEY]:                       "searchKey",
    [PropertyContext.PID_TAG_CONVERSATION_ID]:                  "conversationID",
    [PropertyContext.PID_TAG_CONVERSATION_INDEX_TRACKING]:      "conversationIndexTracking",

    [PropertyContext.PID_TAG_ROOT_MAILBOX]:                         "rootMailbox",
    [PropertyContext.PID_TAG_DELETED_ITEMS]:                        "deletedItems",
    [PropertyContext.PID_TAG_SEARCH_FOLDER]:                        "searchFolder",
    [PropertyContext.PID_TAG_COMMUNICATOR_HISTORY_FOLDER_ENTRY_ID]: "communicatorHistoryFolderEntryID",
    [PropertyContext.PID_TAG_SYNC_ROOT_ENTRY_ID]:                   "syncRootEntryID",

    [PropertyContext.PID_TAG_CONTENT_COUNT]:                "contentCount",
    [PropertyContext.PID_TAG_CONTENT_UNREAD_COUNT]:         "unreadCount",
    [PropertyContext.PID_TAG_SUBFOLDERS]:                   "subfolders",
    [PropertyContext.PID_TAG_CONTAINER_CLASS]:              "containerClass",
    [PropertyContext.PID_TAG_ASSOC_CONTENT_COUNT]:          "assocContentCount",
    [PropertyContext.PID_TAG_IPM_DRAFTS_ENTRY_ID]:          "ipmDraftsEntryID",
    [PropertyContext.PID_TAG_ADDITIONAL_REN_ENTRY_IDS]:     "additionalRenEntryIDs",
    [PropertyContext.PID_TAG_ADDITIONAL_REN_ENTRY_IDS_EX]:  "additionalRenEntryIDsEx",
    [PropertyContext.PID_TAG_FOLDER_VIEW_LIST]:             "folderViewList",

    [PropertyContext.PID_TAG_DISPLAY_TYPE]:                 "displayType",
    [PropertyContext.PID_TAG_SMTP_ADDRESS]:                 "smtpAddress",

    [PropertyContext.PID_TAG_NTSD_MODIFICATION_TIME]:       "ntsdModificationTime",
    [PropertyContext.PID_TAG_INTERNET_CODEPAGE]:            "internetCodepage",
    [PropertyContext.PID_TAG_DESIGN_IN_PROGRESS]:           "designInProgress",
    [PropertyContext.PID_TAG_SECURE_ORIGIN]:                "secureOrigin",
    [PropertyContext.PID_TAG_FROM_I_HAVE]:                  "fromIHave",
    [PropertyContext.PID_TAG_LAST_MODIFIER_NAME]:           "lastModifierName",
    [PropertyContext.PID_TAG_LAST_MODIFIER_ENTRY_ID]:       "lastModifierEntryID",
    [PropertyContext.PID_TAG_MESSAGE_CODEPAGE]:             "messageCodepage",
    [PropertyContext.PID_TAG_MESSAGE_LOCALE]:               "messageLocale",

    [PropertyContext.PID_TAG_SENDER_FLAGS]:                             "senderFlags",
    [PropertyContext.PID_TAG_CREATOR_ADDRESS_TYPE]:                     "creatorAddressType",
    [PropertyContext.PID_TAG_CREATOR_EMAIL_ADDRESS]:                    "creatorEmailAddress",
    [PropertyContext.PID_TAG_SENDER_SIMPLE_DISP_NAME]:                  "senderSimpleDispName",
    [PropertyContext.PID_TAG_SENT_REPRESENTING_SIMPLE_DISP_NAME]:       "sentRepresentingSimpleDispName",
    [PropertyContext.PID_TAG_RECEIVED_REPRESENTING_SIMPLE_DISP_NAME]:   "receivedRepresentingSimpleDispName",
    [PropertyContext.PID_TAG_CREATOR_SIMPLE_DISP_NAME]:                 "creatorSimpleDispName",
    [PropertyContext.PID_TAG_LAST_MODIFIER_SIMPLE_DISP_NAME]:           "lastModifierSimpleDispName",
    [PropertyContext.PID_TAG_CREATOR_FLAGS]:                            "creatorFlags",
    [PropertyContext.PID_TAG_MODIFIER_FLAGS]:                           "modifierFlags",
    [PropertyContext.PID_TAG_HIER_REV]:                                 "hierRev",

    [PropertyContext.PID_TAG_MESSAGE_EDITOR_FORMAT]:                "messageEditorFormat",
    [PropertyContext.PID_TAG_SENT_REPRESENTING_SMTP_ADDRESS]:       "sentRepresentingSMTPAddress",
    [PropertyContext.PID_TAG_RECEIVED_BY_SMTP_ADDRESS]:             "receivedBySMTPAddress",
    [PropertyContext.PID_TAG_RECEIVED_REPRESENTING_SMTP_ADDRESS]:   "receivedRepresentingSMTPAddress",

    [PropertyContext.PID_TAG_CHANGE_KEY]:                   "changeKey",
    [PropertyContext.PID_TAG_PREDECESSOR_CHANGE_LIST]:      "predecessorChangeList",

    [PropertyContext.PID_TAG_SECURE_SUBMIT_FLAGS]:      "secureSubmitFlags",
    [PropertyContext.PID_TAG_PST_BODY_PREFIX]:          "pstBodyPrefix",
    [PropertyContext.PID_TAG_PST_HIDDEN_COUNT]:         "pstHiddenCound",
    [PropertyContext.PID_TAG_PST_HIDDEN_UNREAD]:        "pstHiddenUnread",
    [PropertyContext.PID_TAG_LTP_ROW_ID]:               "ltpRowID",
    [PropertyContext.PID_TAG_LTP_ROW_VER]:              "ltpRowVer",
    [PropertyContext.PID_TAG_PST_PASSWORD]:             "pstPassword",

    [PropertyContext.PID_TAG_LOCAL_COMMIT_TIME_MAX]:    "localCommitTimeMax",
    [PropertyContext.PID_TAG_DELETED_COUNT_TOTAL]:      "deletedCountTotal",

    [PropertyContext.PID_TAG_NAMED_1]:                  "named1",
    [PropertyContext.PID_TAG_NAMED_2]:                  "named2",
    [PropertyContext.PID_TAG_NAMED_3]:                  "named3",
    [PropertyContext.PID_TAG_NAMED_4]:              "   named4",
}