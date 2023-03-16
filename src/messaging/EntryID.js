
export class EntryID {
    #dv;

    get rgbFlags () { return this.#dv.getUint32(0, true); }
    get uid () { return this.#dv.buffer.slice(4, 4 + 16); }
    get nid () { return this.#dv.getUint32(20, true); }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor (buffer) {
        this.#dv = new DataView(buffer);
    }
}