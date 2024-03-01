
export const NID_TYPE_HID                     = 0x00;
export const NID_TYPE_INTERNAL                = 0x01;
export const NID_TYPE_NORMAL_FOLDER           = 0x02;
export const NID_TYPE_SEARCH_FOLDER           = 0x03;
export const NID_TYPE_NORMAL_MESSAGE          = 0x04;
export const NID_TYPE_ATTACHMENT              = 0x05;
export const NID_TYPE_SEARCH_UPDATE_QUEUE     = 0x06;
export const NID_TYPE_SEARCH_CRITERIA_OBJECT  = 0x07;
export const NID_TYPE_ASSOC_MESSAGE           = 0x08;
export const NID_TYPE_CONTENTS_TABLE_INDEX    = 0x0A;
export const NID_TYPE_RECEIVE_FOLDER_TABLE    = 0x0B;
export const NID_TYPE_OUTGOING_QUEUE_TABLE    = 0x0C;
export const NID_TYPE_HIERARCHY_TABLE         = 0x0D;
export const NID_TYPE_CONTENTS_TABLE          = 0x0E;
export const NID_TYPE_ASSOC_CONTENTS_TABLE    = 0x0F;
export const NID_TYPE_SEARCH_CONTENTS_TABLE   = 0x10;
export const NID_TYPE_ATTACHMENT_TABLE        = 0x11;
export const NID_TYPE_RECIPIENT_TABLE         = 0x12;
export const NID_TYPE_SEARCH_TABLE_INDEX      = 0x13;
export const NID_TYPE_LTP                     = 0x1F;

export const NID_MESSAGE_STORE                = 0x21; // Message store node (section 2.4.3).
export const NID_NAME_TO_ID_MAP               = 0x61; // Named Properties Map (section 2.4.7).
export const NID_NORMAL_FOLDER_TEMPLATE       = 0xA1; // Special template node for an empty Folder object.
export const NID_SEARCH_FOLDER_TEMPLATE       = 0xC1; // Special template node for an empty search Folder object.
export const NID_ROOT_FOLDER                  = 0x122; // Root Mailbox Folder object of PST.
export const NID_SEARCH_MANAGEMENT_QUEUE      = 0x1E1; // Queue of Pending Search-related updates.
export const NID_SEARCH_ACTIVITY_LIST         = 0x201; // Folder object NIDs with active Search activity.
export const NID_RESERVED1                    = 0x241; // Reserved.
export const NID_SEARCH_DOMAIN_OBJECT         = 0x261; // Global list of all Folder objects that are referenced by any Folder object's Search Criteria.
export const NID_SEARCH_GATHERER_QUEUE        = 0x281; // Search Gatherer Queue (section 2.4.8.5.1).
export const NID_SEARCH_GATHERER_DESCRIPTOR   = 0x2A1; // Search Gatherer Descriptor (section 2.4.8.5.2).
export const NID_RESERVED2                    = 0x2E1; // Reserved.
export const NID_RESERVED3                    = 0x301; // Reserved.
export const NID_SEARCH_GATHERER_FOLDER_QUEUE = 0x321; // Search Gatherer Folder Queue (section 2.4.8.5.3).

export const NID_ATTACHMENT_TABLE             = 0x671;
export const NID_RECIPIENT_TABLE              = 0x692;

/**
 * @param {number|bigint} nid
 */
export function getNIDType (nid) {
    return typeof nid === "number" ? (nid & 0x1F) : parseInt((nid & 0x1Fn).toString());
}

/**
 * @param {number | bigint} nid
 */
export function isNIDInternal (nid) {
    return this.getNIDType(nid) === this.NID_TYPE_INTERNAL;
}

/**
 * Make a new NID based on an old NID and a new nidType
 * @param {number|bigint} nid
 * @param {number} nidType
 */
export function makeNID (nid, nidType) {
    // 0001 1111 = 0x1F
    // 1110 0000 = 0xE0
    const typeMask = 0x1F;
    const nidMask = ~typeMask;

    const typeMaskBigInt = 0x1Fn;
    const nidMaskBigInt = ~typeMaskBigInt;

    if (typeof nid === "bigint") {
        return (nid & nidMaskBigInt) | BigInt(nidType & typeMask);
    }

    return (nid & nidMask) | (nidType & typeMask);
}