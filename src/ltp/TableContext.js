import { NodeEntry } from "../nbr/NodeEntry.js";
import { HeapNode } from "./HeapNode.js";
import { BTreeOnHeap } from "./BTreeOnHeap.js";
import { PropertyContext } from "./PropertyContext.js";
import { TableContextInfo } from "./TableContextInfo.js";
import { h, stringFromBuffer } from "../util.js";

export class TableContext extends HeapNode {
    #subDataAccessor;
    #info;
    #rowIndex;

    get recordCount () { return this.#rowIndex.keys.length; }

    get rowIndexKeys () { return this.#rowIndex.keys; }

    get columnDescriptions () { return this.#info.colDescriptions; }

    /**
     * @param {DataView} data
     * @param {(nid: number) => Promise<DataView>} subDataAccessor
     */
    constructor (data, subDataAccessor) {
        super(data);

        if (this.bClientSig !== HeapNode.TYPE_TABLE_CONTEXT) {
            throw Error("HeapNode is not a TableContext. bClientSig: " + this.bClientSig.toString(16));
        }

        this.#subDataAccessor = subDataAccessor;

        this.#info = new TableContextInfo(this.getItemByHID(this.hidUserRoot));

        this.#rowIndex = new BTreeOnHeap(data, this.#info.hidRowIndex);
    }

    /**
     * @param {number} N
     * @returns {Promise<DataView>}
     */
    async getRowData (N) {
        if (N > this.recordCount - 1) {
            throw Error("Trying to get row index " + N + " (count: " + this.recordCount + ")");
        }

        const SIZE_OF_BLOCK = 8192;
        const SIZE_OF_BLOCKTRAILER = 16;
        const rowsPerBlock = Math.floor((SIZE_OF_BLOCK - SIZE_OF_BLOCKTRAILER) / this.#info.rgib.TCI_bm);

        const blockIndex = Math.floor(N / rowsPerBlock);
        const rowIndex = N % rowsPerBlock;

        const nidType = NodeEntry.getNIDType(this.#info.hnidRows);

        if (nidType === NodeEntry.NID_TYPE_LTP && this.#info.hnidRows > 0x3F) {
            throw Error(`Failure to get data from SubNode (Not first entry). Internal NID: 0x${h(this.#info.hnidRows)}`)
        }

        const rowMatrix =
            (nidType === NodeEntry.NID_TYPE_HID) ?
                this.getItemByHID(this.#info.hnidRows) :
                await this.#subDataAccessor(this.#info.hnidRows);

        if (!rowMatrix) {
            throw Error("Unable to locate RowMatrix");
        }

        if (rowMatrix.byteLength === 0) {
            throw Error("Empty RowMatrix");
        }

        const rowWidth = this.#info.rowWidth;
        const start = SIZE_OF_BLOCK * blockIndex + rowIndex * rowWidth;

        if (start > rowMatrix.byteLength || rowWidth === 0) {
            throw Error("About to create a null buffer slice");
        }

        const { buffer, byteOffset } = rowMatrix;
        return new DataView(buffer, byteOffset + start, rowWidth);
    }

    /**
     * @param {number} rowIndex
     * @param {number} iBit iBit in ColumnDescription
     */
    async doesCellExist (rowIndex, iBit) {
        const cebStart = this.#info.rgib.TCI_1b;
        const cebEnd = this.#info.rgib.TCI_bm;

        const { buffer, byteOffset } = await this.getRowData(rowIndex);
        const rgCEB = new Uint8Array(buffer, byteOffset + cebStart, cebEnd - cebStart);

        return !!(rgCEB[Math.floor(iBit / 8)] & (1 << (7 - (iBit % 8))));
    }

    /**
     * @param {number} rowIndex
     * @param {import("./TableContextColDesc").TableContextColDesc} columnDesc
     */
    async #getCellDataByColDesc (rowIndex, columnDesc) {
        const dv = await this.getRowData(rowIndex);

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
    async getCellValueByColumnTag (rowIndex, columnTag) {
        const columnDesc = this.#info.colDescriptions.find(desc => desc.dataTag === columnTag);

        if (!columnDesc)
            return;

        const cellData = await this.#getCellDataByColDesc(rowIndex, columnDesc);

        try {

            if (columnDesc.dataType === PropertyContext.PTYPE_STRING) {
                if (cellData === 0) return "";

                const nidType = NodeEntry.getNIDType(cellData);
                if (nidType === NodeEntry.NID_TYPE_HID) {
                    const hid = typeof cellData === "bigint" ? parseInt(cellData.toString()) : cellData;
                    const { buffer, byteOffset, byteLength } = this.getItemByHID(hid);
                    return stringFromBuffer(buffer, byteOffset, byteLength);
                }
                else {
                    throw Error("Unimplemented: Getting string data from nidType: 0x" + h(nidType));
                }
            }

            if (columnDesc.dataType === PropertyContext.PTYPE_BINARY) {
                const nidType = NodeEntry.getNIDType(cellData);
                if (nidType === NodeEntry.NID_TYPE_HID) {
                    const hid = typeof cellData === "bigint" ? parseInt(cellData.toString()) : cellData;
                    return this.getItemByHID(hid);
                }
                else {
                    throw Error("Unimplemented: Getting binary data from nidType: 0x" + h(nidType));
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

            console.debug(`Unable to get data of type 0x${h(columnDesc.dataType)}`);
        } catch (e) {
            console.log(e);
            console.error(`Unable to get data for rowIndex: ${rowIndex} tag: 0x${h(columnTag)} cellData: 0x${h(cellData)} dataType: 0x${h(columnDesc.dataType)}`);
        }
    }

    /**
     * @param {number} rowIndex
     */
    getAllRowProperties (rowIndex) {
        const cols = this.columnDescriptions;
        return Promise.all(
            cols.map(col => this.getCellValueByColumnTag(rowIndex, col.dataTag).then(value =>
                ({ tag: col.dataTag, tagHex: "0x"+col.dataTag.toString(16).padStart(4, "0"), tagName: PropertyContext.getTagName(col.dataTag), value })
            ))
        );
    }
}