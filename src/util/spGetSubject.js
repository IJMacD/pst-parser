/**
 * @param {string} rawSubject
 */
export function spGetSubject (rawSubject) {
    if (!rawSubject) return "";
    if (rawSubject[0] === '\x01') {
        const prefixLength = rawSubject.charCodeAt(1);
        const start = 2 + prefixLength - 1;
        return rawSubject.substring(start);
    }
    return rawSubject;
}