
/**
 * @param {number|bigint} n
 */
export function h (n) {
    const s = n.toString(16);
    return s.padStart(s.length + (s.length % 2), "0");
}