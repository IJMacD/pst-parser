/**
 * Strings from a buffer
 * @param {ArrayBuffer} buffer
 * @param {number} byteOffset
 * @param {number} byteLength
 * @param {"ascii"|"windows-1252"|"iso-8859-1"|"utf-16le"} mode
 */
export function stringFromBuffer(buffer, byteOffset, byteLength, mode = "utf-16le") {
    let charCodes;

    // ASCII just clamps the bytes and maps Unicode code points 0x00 - 0x7F
    if (mode === "ascii") {
        charCodes = new Uint8ClampedArray(new Int8Array(buffer, byteOffset, byteLength));
    }
    // ISO-8859-1 (a.k.a. Latin-1) is identical to Unicode code points 0x00 - 0xFF
    else if (mode === "iso-8859-1") {
        charCodes = new Uint8Array(buffer, byteOffset, byteLength);
    }
    // Windows-1252 is identical to ISO-8859-1 but maps some additional characters
    // into code points 0x80 - 0x9F
    else if (mode === "windows-1252") {
        const special = "€ ‚ƒ„…†‡ˆ‰Š‹Œ Ž  ‘’“”•–—˜™š›œ žŸ"
        charCodes = new Uint8Array(buffer, byteOffset, byteLength).map(b => {
            if (b < 0x80 || b > 0x9f) return b;
            return special.charCodeAt(b-0x80);
        });
    }
    // UTF-16 values are the direct charCodes we need
    else if (mode === "utf-16le") {
        // Uint16Array *must* start on a multiple of 2 so check if we need to
        // copy the buffer
        charCodes = (byteOffset % 2) ?
            new Uint16Array(buffer.slice(byteOffset, byteOffset + byteLength)) :
            new Uint16Array(buffer, byteOffset, byteLength / 2);
    }
    else {
        throw TypeError(`Unable to convert buffer to string using mode '${mode}'`);
    }

    // Can exceed call stack size if array is large enough and spread directly
    // e.g.
    //      String.fromCharCode(...array);

    const CHUNK_SIZE = 0x2000;

    const out = [];
    for (let i = 0; i < charCodes.length; i += CHUNK_SIZE) {
        out.push(String.fromCharCode(...charCodes.slice(i, i + CHUNK_SIZE)));
    }

    return out.join("");
}
