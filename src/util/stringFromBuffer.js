/**
 * UTF-16 strings from a buffer
 * @param {ArrayBuffer} buffer
 * @param {number} byteOffset
 * @param {number} byteLength
 */

export function stringFromBuffer(buffer, byteOffset, byteLength) {
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
