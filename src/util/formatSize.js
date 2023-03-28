/**
 * @param {number} bytes
 */
export function formatSize(bytes) {
    if (bytes === 0)
        return "0 bytes";
    const size = Math.floor(Math.log2(bytes) / 10);
    return (bytes / Math.pow(2, size * 10)).toFixed(2) + " " + ["bytes", "kB", "MB", "GB"][size];
}

/**
 * @param {bigint} bytes
 */
export function formatSizeBigInt(bytes) {
    return formatSize(parseInt(bytes.toString(), 10));
}
