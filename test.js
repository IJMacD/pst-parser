import * as PST from "./src/index.js";
import fs from "fs";
import util from "util";
import { NodeEntry } from "./src/nbr/NodeEntry.js";
import * as NodeTypes from "./src/nbr/NodeTypes.js";
import * as Tags from "./src/ltp/Tags.js";
import { formatGuid } from "./src/util/formatGuid.js";
import { h } from "./src/util/util.js";
import { SubnodeLeafBlock } from "./src/nbr/SubnodeLeafBlock.js";
import { PSTInternal } from "./src/file/PSTInternal.js";
import { SubnodeLeafEntry } from "./src/nbr/SubnodeLeafEntry.js";
import { XBlock } from "./src/nbr/XBlock.js";
import { DataBlock } from "./src/nbr/DataBlock.js";
import { formatSizeBigInt, formatSize } from "./src/util/formatSize.js";

/** @type {string} */
let action;
/** @type {string} */
let filename;
/** @type {string[]} */
let args = [];

if (process.argv.length >= 4) {
    filename = process.argv.at(-1)||"";
    action = process.argv[2];
    args = process.argv.slice(3, -1);
}
else if (process.argv.length == 3) {
    filename = process.argv[2];
    action = "info";
}
else {
    console.log(
`Usage: node test.js [<action> [<args...>]] <filename.pst>

    <action> and <args...> can be:
    info
    folders
    nids
    nids message
    nids folder
    nids internal
    node-block-tree
    message <nid>
    folder <nid>
    folder-contents <nid>
    pc <nid>
    nameid
    amap
    pmap
    dlist
    fmap
    fpmap
    alloc <size>
    alloc-page

    if <action> is unspecified it defaults to "info"
`);
    process.exit();
}

if (!filename) {
    console.log("Filename not provided");
    process.exit();
}

try {
    const byteBuffer = fs.readFileSync(filename);

    const pst = new PST.PSTFile(byteBuffer.buffer);
    const pstInternal = new PSTInternal(byteBuffer.buffer);

    if (action === "info") {
        printInfo(pst, pstInternal);
    }
    else if (action === "folders") {
        const messageStore = pst.getMessageStore();
        if (!messageStore) {
            console.log("Cannot find MessageStore");
            process.exit();
        }
        if (messageStore.rootFolderNID) {
            printFolderTree(pst, messageStore.rootFolderNID);
        }
    }
    else if (action === "nids") {
        if (args.length) {
            const [typeName] = args;
            const type = {
                "message":  NodeTypes.NID_TYPE_NORMAL_MESSAGE,
                "folder":   NodeTypes.NID_TYPE_NORMAL_FOLDER,
                "internal": NodeTypes.NID_TYPE_INTERNAL,
            }[typeName];
            if (!type) {
                console.log(`Type '${typeName}' not found`);
                process.exit();
            }
            printNids(pstInternal, type);
        }
        else
            printNids(pstInternal);
    }
    else if (action === "node-block-tree") {
        printNodeEntries(pstInternal);
    }
    else if (action === "message") {
        if (args.length === 0) {
            console.log("Message nid not provided");
            process.exit();
        }

        printMessage(pst, Number.parseInt(args[0]));
    }
    else if (action === "folder") {
        if (args.length === 0) {
            console.log("Folder nid not provided");
            process.exit();
        }

        printFolder(pst, Number.parseInt(args[0]));
    }
    else if (action === "folder-contents") {
        if (args.length === 0) {
            console.log("Folder nid not provided");
            process.exit();
        }

        printFolderContents(pst, Number.parseInt(args[0]));
    }
    else if (action === "pc") {
        if (args.length === 0) {
            console.log("PropertyContext nid not provided");
            process.exit();
        }

        printPropertyContext(pstInternal, Number.parseInt(args[0]));
    }
    else if (action === "nameid") {
        printNameid(pstInternal);
    }
    else if (action === "amap") {
        printAMap(pstInternal);
    }
    else if (action === "pmap") {
        printPMap(pstInternal);
    }
    else if (action === "dlist") {
        printDList(pstInternal);
    }
    else if (action === "fmap") {
        printFMap(pstInternal);
    }
    else if (action === "fpmap") {
        printFPMap(pstInternal);
    }
    else if (action === "alloc") {
        printAllocate(pstInternal, Number.parseInt(args[0]));
    }
    else if (action === "alloc-page") {
        printAllocatePage(pstInternal);
    }
    else {
        console.log(`Unknown action '${action}'`);
    }
}
catch (e) {
    console.error(e.message);
}

/**
 * @param {PST.PSTFile} pst
 * @param {PSTInternal} pstInternal
 */
function printInfo (pst, pstInternal) {

    const CRYPT_METHOD = {
        0x00:   "None",
        0x01:   "Permute",
        0x02:   "Cyclic",
        0x10:   "Windows Information Protection",
    };

    const messageStore = pst.getMessageStore();
    if (messageStore) {
        const table = {
            "Message Store display name": messageStore.displayName,
            "Has password": messageStore.hasPassword,
            "Crypt Method": CRYPT_METHOD[pstInternal.cryptMethod],
            "Header Modification Count": pstInternal.modificationCount,
            "Header File Size": formatSizeBigInt(pstInternal.fileSize),
            "Free Space": formatSizeBigInt(pstInternal.freeSpace),
            "Free Page Space": formatSizeBigInt(pstInternal.freePageSpace),
            "AMap Page Count": pstInternal.aMapPageCount,
            "PMap Page Count": pstInternal.pMapPageCount,
            "FMap Page Count": pstInternal.fMapPageCount,
            "FPMap Page Count": pstInternal.fpMapPageCount,
            "DList Entries": pstInternal.getDListPage().cEntDList,
            "Next BID": pstInternal.nextBID,
            "Next Page": pstInternal.nextPage,
            "Rebuild Required": !pstInternal.aMapValid,

            "Node count": pstInternal.getAllNodeKeys().length,

            "NID_TYPE_HID"                     : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_HID).length,
            "NID_TYPE_INTERNAL"                : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_INTERNAL).length,
            "NID_TYPE_NORMAL_FOLDER"           : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_NORMAL_FOLDER).length,
            "NID_TYPE_SEARCH_FOLDER"           : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_SEARCH_FOLDER).length,
            "NID_TYPE_NORMAL_MESSAGE"          : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_NORMAL_MESSAGE).length,
            "NID_TYPE_ATTACHMENT"              : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_ATTACHMENT).length,
            "NID_TYPE_SEARCH_UPDATE_QUEUE"     : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_SEARCH_UPDATE_QUEUE).length,
            "NID_TYPE_SEARCH_CRITERIA_OBJECT"  : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_SEARCH_CRITERIA_OBJECT).length,
            "NID_TYPE_ASSOC_MESSAGE"           : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_ASSOC_MESSAGE).length,
            "NID_TYPE_CONTENTS_TABLE_INDEX"    : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_CONTENTS_TABLE_INDEX).length,
            "NID_TYPE_RECIEVE_FOLDER_TABLE"    : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_RECIEVE_FOLDER_TABLE).length,
            "NID_TYPE_OUTGOING_QUEUE_TABLE"    : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_OUTGOING_QUEUE_TABLE).length,
            "NID_TYPE_HIERARCHY_TABLE"         : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_HIERARCHY_TABLE).length,
            "NID_TYPE_CONTENTS_TABLE"          : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_CONTENTS_TABLE).length,
            "NID_TYPE_ASSOC_CONTENTS_TABLE"    : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_ASSOC_CONTENTS_TABLE).length,
            "NID_TYPE_SEARCH_CONTENTS_TABLE"   : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_SEARCH_CONTENTS_TABLE).length,
            "NID_TYPE_ATTACHEMENT_TABLE"       : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_ATTACHEMENT_TABLE).length,
            "NID_TYPE_RECIPIENT_TABLE"         : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_RECIPIENT_TABLE).length,
            "NID_TYPE_SEARCH_TABLE_INDEX"      : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_SEARCH_TABLE_INDEX).length,
            "NID_TYPE_LTP"                     : pstInternal.getAllNodeKeysOfType(NodeTypes.NID_TYPE_LTP).length,
        }

        console.table(table);
    }
}

/**
 * @param {PSTInternal} pstInternal
 * @param {number} [type]
 */
function printNids (pstInternal, type) {
    if (typeof type === "number") {
        console.dir(pstInternal.getAllNodeKeysOfType(type), {maxArrayLength:null});
    }
    else {
        console.dir(pstInternal.getAllNodeKeys(), {maxArrayLength:null});
    }
}

/**
 * @param {PST.PSTFile} pst
 * @param {number} nid
 * @param {number} [depth]
 */
function printFolderTree (pst, nid, depth = 0) {
    const folder = pst.getFolder(nid);
    if (folder) {
        console.log(" ".repeat(depth) + folder.displayName + " (" + folder.contentCount + ")");
        // console.log(folder.getAllProperties());

        const subfolders = folder.getSubFolderEntries();
        for (const sf of subfolders) {
            printFolderTree(pst, sf.nid, depth + 1);
        }
    }
}

/**
 * @param {PST.PSTFile} pst
 * @param {number} nid
 */
function printFolderContents (pst, nid) {
    const folder = pst.getFolder(nid);
    if (folder) {
        const entries = folder.getContents();
        console.log(entries);
    }
}

/**
 * @param {PST.PSTFile} pst
 * @param {number} nid
 */
function printMessage (pst, nid) {
    const message = pst.getMessage(nid);

    console.log(message?.getAllProperties());
}

/**
 * @param {PST.PSTFile} pst
 * @param {number} nid
 */
function printFolder (pst, nid) {
    const folder = pst.getFolder(nid);

    if (folder) {
        console.log("Display name: " + folder.displayName);
        console.log("Content Count: " + folder.contentCount);
        console.log("Content Unread Count: " + folder.unreadCount);
        console.log("Has Subfolders: " + (folder.hasSubfolders ? "yes" : "no"));
        console.log("Subfolder Count: " + folder.getSubFolderEntries().length);
        console.log("Subfolder Names: " + folder.getSubFolderEntries().map(sf => sf.displayName).join(", "));
    }
}

/**
 * @param {PSTInternal} pstInternal
 * @param {number} nid
 */
function printPropertyContext (pstInternal, nid) {
    const pc = pstInternal.getPropertyContext(nid);

    console.log(pc?.getAllProperties());
}

/**
 * @param {PSTInternal} pst
 */
function printNameid (pst) {
    const pc = pst.getPropertyContext(NodeTypes.NID_NAME_TO_ID_MAP);
    if (!pc) {
        console.log("Can't find Nameid");
        process.exit();
    }

    console.log("Bucket Count: " + pc.getValueByKey(Tags.PID_TAG_NAMEID_BUCKET_COUNT));

    const guids = /** @type {DataView} */(pc.getValueByKey(Tags.PID_TAG_NAMEID_STREAM_GUID));
    // const guidCount = guids.byteLength / 16;
    // console.log("GUIDs:");
    // for (let i = 0; i < guidCount; i++) {
    //     const dv = new DataView(guids.buffer, guids.byteOffset + i * 16, 16);
    //     console.log(formatGuid(dv));
    // }

    const strings = /** @type {DataView} */(pc.getValueByKey(Tags.PID_TAG_NAMEID_STRING_STREAM));

    const entries = /** @type {DataView} */(pc.getValueByKey(Tags.PID_TAG_NAMEID_STREAM_ENTRY));
    // const buffer = Buffer.from(entries.buffer, entries.byteOffset, entries.byteLength);
    // console.log(buffer.toString('base64'));
    // return;
    const entryCount = entries.byteLength / 8;
    console.log(`Entries (${entryCount}):`);
    for (let i = 0; i < entryCount; i++) {
        const dv = new DataView(entries.buffer, entries.byteOffset + i * 8, 8);
        const propertyID = dv.getUint32(0, true);
        const N = dv.getUint8(4) & 0x01;
        const guid = dv.getUint16(4, true) >> 1;
        const propIndex = dv.getUint16(6, true);

        const PS_MAPI = '{00020328-0000-0000-C000-000000000046}';
        const PS_PUBLIC_STRINGS = '{00020329-0000-0000-C000-000000000046}';

        let guidString;
        try {
            guidString = guid === 0 ? '{NONE}' : (guid === 1 ? PS_MAPI : (guid === 2 ? PS_PUBLIC_STRINGS : formatGuid(new DataView(guids.buffer, guids.byteOffset + (guid-3) * 16, 16))));
        }
        catch (e) {
            guidString = `{ERROR: 0x${h(guid)}}`;
        }

        if (N) {
            const stringByteLength = strings.getUint32(propertyID, true);
            const start = strings.byteOffset + 4 + propertyID;
            const buffer = strings.buffer.slice(start, start + stringByteLength);
            const name = String.fromCharCode(...new Uint16Array(buffer));
            console.log(`Tag=${h(0x8000+propIndex)} N=${N?"1":"0"} GUID=${guidString} Name=${name}`);
        }
        else {
            console.log(`Tag=${h(0x8000+propIndex)} N=${N?"1":"0"} GUID=${guidString} Number=0x${h(propertyID)}`);
        }
    }
}

/**
 * @param {PSTInternal} pstInternal
 */
function printNodeEntries (pstInternal) {
    const out = getNodeEntries(pstInternal, pstInternal.getAllNodes());

    // console.log(util.inspect(out, {depth:null}));
    console.log(JSON.stringify(out, null, 4));
}

/**
 * @param {PSTInternal} pstInternal
 * @param {NodeEntry[]|SubnodeLeafEntry[]} entries
 */
function getNodeEntries(pstInternal, entries) {
    const out = [];

    for (const entry of entries) {
        const { nid, bidData, bidSub } = entry;

        const data = pstInternal.getBlock(bidData);
        const sub = pstInternal.getBlock(bidSub);

        const node = {
            nid: `0x${h(nid)}`,
            bidData: `0x${h(bidData)}`,
            bidSub: `0x${h(bidSub)}`,
        };

        if (data instanceof DataBlock) {
            node.data = "DataBlock"
        }
        else if (data instanceof XBlock) {
            node.data = { count: data.cEnt };
        }

        if (sub instanceof SubnodeLeafBlock) {
            node.sub = getNodeEntries(pstInternal, sub.getAllEntries());
        }

        out.push(node);
    }

    return out;
}

/**
 * @param {PSTInternal} pstInternal
 */
function printAMap (pstInternal) {
    const aMap = pstInternal.getAMap();
    const out = [];
    let freeCount = 0;
    for (let i = 0; i < aMap.byteLength; i++) {
        const allocCount = bitCount(aMap.getUint8(i));
        freeCount += 8 - allocCount;
        // out.push(aMap.getUint8(i) ? "◼" : "◻");
        // out.push(" ▁▂▃▄▅▆▇█"[bitCount(aMap.getUint8(i))]);
        out.push(" ░░░▒▒▓▓█"[allocCount]);
    }
    console.log(out.join(""));
    console.log(`Free Space: ${formatSize(freeCount * 64)}`);
}

/**
 * @param {PSTInternal} pstInternal
 */
function printPMap (pstInternal) {
    const pMap = pstInternal.getPMap();
    const out = [];
    let freeCount = 0;
    for (let i = 0; i < pMap.byteLength; i++) {
        const val = pMap.getUint8(i);
        freeCount += zeroCount(val);
        out.push(val === 0xFF ? "◼" : "◻");
    }
    console.log(out.join(""));
    console.log(`Free Space: ${formatSize(freeCount * 512)}`);
}

/**
 * @param {number} byte
 */
function bitCount (byte) {
    let count = 0;
    for (let i = 0; i < 8; i++) {
        count += (byte & 0x01);
        byte >>= 1;
    }
    return count;
}

function zeroCount (byte) {
    return 8 - bitCount(byte);
}

/**
 * @param {PSTInternal} pstInternal
 */
function printDList (pstInternal) {
    const dList = pstInternal.getDListPage();

    if (dList.cEntDList === 0) {
        console.log("DList empty");
        return;
    }

    const out = [];
    for (let i = 0; i < dList.cEntDList; i++) {
        const { dwPageNum, dwFreeSlots } = dList.getEntry(i);
        out.push({ dwPageNum, dwFreeSlots });
    }
    console.table(out);
}

/**
 * @param {PSTInternal} pstInternal
 */
function printFMap (pstInternal) {
    const fMap = pstInternal.getFMap();
    const out = [];
    for (let i = 0; i < fMap.byteLength; i++) {
        out.push(fMap.getUint8(i));
    }
    console.log(util.inspect(out, {maxArrayLength:null}));
}


/**
 * @param {PSTInternal} pstInternal
 */
function printFPMap (pstInternal) {
    const fpMap = pstInternal.getFPMap();
    const out = [];
    for (let i = 0; i < fpMap.byteLength; i++) {
        out.push(fpMap.getUint8(i));
    }
    console.log(util.inspect(out, {maxArrayLength:null}));
}

/**
 * @param {PSTInternal} pstInternal
 * @param {number} size
 */
function printAllocate (pstInternal, size) {
    console.log(`Free Space: ${formatSizeBigInt(pstInternal.freeSpace)}`);
    const ib = pstInternal.allocateBlock(size);
    if (ib) {
        console.log(ib);
        console.log(`Free Space: ${formatSizeBigInt(pstInternal.freeSpace)}`);
        console.log("Current Contents: ");
        console.log(pstInternal.getDataView(ib, size).buffer.slice(ib, ib + size));
    }
    else {
        console.log("Failed to allocate");
    }
}


/**
 * @param {PSTInternal} pstInternal
 */
function printAllocatePage (pstInternal) {
    console.log(`Free Space: ${formatSizeBigInt(pstInternal.freeSpace)}`);
    const page = pstInternal.allocatePage();
    if (page) {
        console.log(page);
        console.log(`Free Space: ${formatSizeBigInt(pstInternal.freeSpace)}`);
        console.log("New Page BID: " + page.bid);
    }
    else {
        console.log("Failed to allocate");
    }
}
