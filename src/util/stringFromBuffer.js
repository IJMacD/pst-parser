/**
 * UTF-16 strings from a buffer
 * @param {ArrayBuffer} buffer
 * @param {number} byteOffset
 * @param {number} byteLength
 * @param {"utf-16le"|"ascii"|"windows-1252"} mode
 */

export function stringFromBuffer(buffer, byteOffset, byteLength, mode = "utf-16le") {
    if (mode === "ascii") {
        return String.fromCharCode(...new Uint8ClampedArray(new Int8Array(buffer, byteOffset, byteLength)));
    }

    if (mode === "windows-1252") {
        const special = "€ ‚ƒ„…†‡ˆ‰Š‹Œ Ž  ‘’“”•–—˜™š›œ žŸ"
        return String.fromCharCode(...new Uint8Array(buffer, byteOffset, byteLength).map(b => {
            if (b < 0x80 || b > 0x9f) return b;
            return special.charCodeAt(b-0x80);
        }));
    }

    if (mode === "utf-16le") {
        const array = (byteOffset % 2) ?
            // Uint16Array *must* start on a multiple of 2
            // We have no choice but to copy the buffer
            new Uint16Array(buffer.slice(byteOffset, byteOffset + byteLength)) :
            new Uint16Array(buffer, byteOffset, byteLength / 2);


        // Can exceed call stack size if array is large enough and passed directly
        // return String.fromCharCode(...array);
        const CHUNK_SIZE = 0x2000;

        const out = [];
        for (let i = 0; i < array.length; i += CHUNK_SIZE) {
            out.push(String.fromCharCode(...array.slice(i, i + CHUNK_SIZE)));
        }

        return out.join("");
    }

    throw TypeError(`Unable to convert buffer to string using mode '${mode}'`);
}
