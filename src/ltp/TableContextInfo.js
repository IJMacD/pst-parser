import { TableContextColDesc } from "./TableContextColDesc.js";

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
            TCI_bm: this.#dv.getUint16(8, true),
        }
    }
    get hidRowIndex () { return this.#dv.getUint32(10, true); }
    get hnidRows () { return this.#dv.getUint32(14, true); }
    get hidIndex () { return this.#dv.getUint32(18, true); }

    get colDescriptions () { return this.#tcoldesc; }

    get rowWidth () { return this.rgib.TCI_bm; }

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        this.#dv = dv;

        this.#tcoldesc = Array.from({length: this.cCols }).map((_,i) => {
            const start = 22 + i * 8;
            const { buffer, byteOffset } = dv;
            const tccddv = new DataView(buffer, byteOffset + start, 8)
            return new TableContextColDesc(tccddv);
        });
    }
}