import { PID_TAG_SUBJECT } from "../ltp/Tags.js";
import { arrayBufferFromDataView } from "./arrayBufferFromDataView.js";
import { spGetSubject } from "./spGetSubject.js";

/**
 * @typedef {{tag: number;tagHex: string;tagName: string;value: string | number | bigint | boolean | string[] | DataView | number[] | Date | undefined;}} PropertyData
 */
/**
 * @param {PropertyData[]} properties
 */

export function propertiesToObject(properties) {
    const out = {};
    for (const prop of properties) {

        let value = prop.value instanceof DataView ?
            arrayBufferFromDataView(prop.value) :
            prop.value;

        if (prop.tag === PID_TAG_SUBJECT) {
            value = spGetSubject(/** @type {string} */(value));
        }

        out[prop.tagName || prop.tagHex] = value;
    }
    return out;
}
