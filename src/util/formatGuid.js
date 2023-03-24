export function formatGuid(dv) {
    const d1 = dv.getUint32(0, true).toString(16).padStart(8, "0");
    const d2 = dv.getUint16(4, true).toString(16).padStart(4, "0");
    const d3 = dv.getUint16(6, true).toString(16).padStart(4, "0");
    const d4 = dv.getUint16(8, false).toString(16).padStart(4, "0");
    const d5a = dv.getUint32(10, false).toString(16).padStart(8, "0");
    const d5b = dv.getUint16(14, false).toString(16).padStart(4, "0");

    return `{${d1}-${d2}-${d3}-${d4}-${d5a}${d5b}}`;
}
