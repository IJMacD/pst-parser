import { Root } from "./Root.js";

export class Header {
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
    get root () {
        const dv = new DataView(this.#dv.buffer, this.#dv.byteOffset + 180);
        return new Root(dv);
    }
    get dwAlign () { return this.#dv.getUint32(252, true); }
    get rgbFM () {
        const offset = this.#dv.byteOffset;
        return this.#dv.buffer.slice(offset + 256, offset + 256 + 128);
    }
    get rgbFP () {
        const offset = this.#dv.byteOffset;
        return this.#dv.buffer.slice(offset + 384, offset + 384 + 128);
    }
    get bSentinel () { return this.#dv.getUint8(512); }
    get bCryptMethod () { return this.#dv.getUint8(513); }
    get rgbReserved () { return this.#dv.getUint16(514, true); }
    get bidNextB () { return this.#dv.getBigUint64(516, true); }
    get dwCRCFull () { return this.#dv.getUint32(524, true); }
    get rgbReserved2 () { return this.#dv.getUint32(528, true) >> 8; }
    get bReserved () { return this.#dv.getUint8(531); }
    get rgbReserved3 () {
        const offset = this.#dv.byteOffset;
        return this.#dv.buffer.slice(offset + 532, offset + 532 + 32);
    }

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        this.#dv = dv;
    }
}