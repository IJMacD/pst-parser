
const PROVIDER_UID = [0x81,0x2B,0x1F,0xA4,0xBE,0xA3,0x10,0x19,0x9D,0x6E,0x00,0xDD,0x01,0x0F,0x54,0x02];

/**
 * [MS-OXCDATA] § 2.2.5.1
 */
export class OneOffEntryID {
    #dv;

    get rgbFlags () { return this.#dv.getUint32(0, true); }
    get providerUid () { return this.#dv.buffer.slice(this.#dv.byteOffset + 4, this.#dv.byteOffset + 4 + 16); }
    get version () { return this.#dv.getUint16(20, true); }
    get flags () { return this.#dv.getUint16(22, true); }

    get displayName () {
        const uint16Array = new Uint16Array(this.#dv.buffer, this.#dv.byteOffset + 24);
        const end = uint16Array.indexOf(0);
        return String.fromCharCode(...uint16Array.slice(0, end));
    }

    get addressType () {
        const uint16Array = new Uint16Array(this.#dv.buffer, this.#dv.byteOffset + 24);
        const start = uint16Array.indexOf(0);
        const end = uint16Array.indexOf(0, start + 1);
        return String.fromCharCode(...uint16Array.slice(start, end));
    }

    get emailAddress () {
        const uint16Array = new Uint16Array(this.#dv.buffer, this.#dv.byteOffset + 24);
        const prevStart = uint16Array.indexOf(0);
        const prevEnd = uint16Array.indexOf(0, prevStart + 1);
        return String.fromCharCode(...uint16Array.slice(prevEnd + 1));
    }

    /**
     * @param {DataView} dv
     */
    constructor (dv) {
        this.#dv = dv;

        const uidUint8 = new Uint8Array(this.providerUid);
        if (PROVIDER_UID.some((b, i) => b !== uidUint8[i])) {
            throw Error("ProviderUID doesn't match");
        }
    }
}