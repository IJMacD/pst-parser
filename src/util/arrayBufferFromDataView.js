/**
 * Produce an ArrayBuffer exactly matching the view defined by the DataView
 * @param {DataView} dataView
 */

export function arrayBufferFromDataView(dataView) {
    if (dataView.byteOffset === 0
        && dataView.byteLength === dataView.buffer.byteLength) {
        // We don't need to slice anything. Just return the
        return dataView.buffer;
    }

    return dataView.buffer.slice(dataView.byteOffset, dataView.byteOffset + dataView.byteLength);
}
