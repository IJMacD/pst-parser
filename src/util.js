
/**
 * @param {number|bigint} n
 */
export function h (n) {
    const s = n.toString(16).toUpperCase();
    return s.padStart(s.length + (s.length % 2), "0");
}

export function propertiesToObject (properties) {
    const out = {};
    for (const prop of properties) {
        out[prop.tagName||prop.tagHex] = prop.value;
    }
    return out;
}