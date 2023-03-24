import { arrayBufferFromDataView } from "./arrayBufferFromDataView.js";

/**
 * @typedef {{tag: number;tagHex: string;tagName: string;value: string | number | bigint | boolean | string[] | DataView | number[] | Date | undefined;}} PropertyData
 */
/**
 * @param {PropertyData[]} properties
 */

export function propertiesToObject(properties) {
    const out = {};
    for (const prop of properties) {
        const value = prop.value instanceof DataView ?
            arrayBufferFromDataView(prop.value) :
            prop.value;
        out[prop.tagName || prop.tagHex] = value;
    }
    return out;
}
