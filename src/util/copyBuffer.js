/**
 * @param {DataView} dest
 * @param {DataView} source
 */
export function copyBuffer(dest, source) {
    const destBuffer = new Uint8Array(dest.buffer, dest.byteOffset, dest.byteLength);
    const srcBuffer = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    destBuffer.set(srcBuffer);
}
