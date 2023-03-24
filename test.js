import * as PST from "./src/index.js";
import fs from "fs";
import { NodeEntry } from "./src/nbr/NodeEntry.js";
import * as Tags from "./src/ltp/Tags.js";
import { formatGuid } from "./src/util/formatGuid.js";
import { h } from "./src/util/util.js";

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
    message <nid>
    folder <nid>
    folder_contents <nid>
    pc <nid>
    nameid

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

    if (action === "info") {
        printInfo(pst);
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
                "message": NodeEntry.NID_TYPE_NORMAL_MESSAGE,
                "folder": NodeEntry.NID_TYPE_NORMAL_FOLDER,
                "internal": NodeEntry.NID_TYPE_INTERNAL,
            }[typeName];
            if (!type) {
                console.log(`Type '${typeName}' not found`);
                process.exit();
            }
            printNids(pst, type);
        }
        else
            printNids(pst);
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
    else if (action === "folder_contents") {
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

        printPropertyContext(pst, Number.parseInt(args[0]));
    }
    else if (action === "nameid") {
        printNameid(pst);
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
 */
function printInfo (pst) {

    const messageStore = pst.getMessageStore();
    if (messageStore) {
        const table = {
            "Message Store display name": messageStore.displayName,
            "Has password": messageStore.hasPassword ? "yes" : "no",
            "Node count": pst.getAllNodeKeys().length,

            "NID_TYPE_HID"                     : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_HID).length,
            "NID_TYPE_INTERNAL"                : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_INTERNAL).length,
            "NID_TYPE_NORMAL_FOLDER"           : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_NORMAL_FOLDER).length,
            "NID_TYPE_SEARCH_FOLDER"           : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_SEARCH_FOLDER).length,
            "NID_TYPE_NORMAL_MESSAGE"          : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_NORMAL_MESSAGE).length,
            "NID_TYPE_ATTACHMENT"              : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_ATTACHMENT).length,
            "NID_TYPE_SEARCH_UPDATE_QUEUE"     : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_SEARCH_UPDATE_QUEUE).length,
            "NID_TYPE_SEARCH_CRITERIA_OBJECT"  : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_SEARCH_CRITERIA_OBJECT).length,
            "NID_TYPE_ASSOC_MESSAGE"           : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_ASSOC_MESSAGE).length,
            "NID_TYPE_CONTENTS_TABLE_INDEX"    : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_CONTENTS_TABLE_INDEX).length,
            "NID_TYPE_RECIEVE_FOLDER_TABLE"    : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_RECIEVE_FOLDER_TABLE).length,
            "NID_TYPE_OUTGOING_QUEUE_TABLE"    : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_OUTGOING_QUEUE_TABLE).length,
            "NID_TYPE_HIERARCHY_TABLE"         : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_HIERARCHY_TABLE).length,
            "NID_TYPE_CONTENTS_TABLE"          : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_CONTENTS_TABLE).length,
            "NID_TYPE_ASSOC_CONTENTS_TABLE"    : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_ASSOC_CONTENTS_TABLE).length,
            "NID_TYPE_SEARCH_CONTENTS_TABLE"   : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_SEARCH_CONTENTS_TABLE).length,
            "NID_TYPE_ATTACHEMENT_TABLE"       : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_ATTACHEMENT_TABLE).length,
            "NID_TYPE_RECIPIENT_TABLE"         : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_RECIPIENT_TABLE).length,
            "NID_TYPE_SEARCH_TABLE_INDEX"      : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_SEARCH_TABLE_INDEX).length,
            "NID_TYPE_LTP"                     : pst.getAllNodeKeysOfType(NodeEntry.NID_TYPE_LTP).length,
        }

        console.table(table);
    }
}

/**
 * @param {PST.PSTFile} pst
 * @param {number} [type]
 */
function printNids (pst, type) {
    if (typeof type === "number") {
        console.dir(pst.getAllNodeKeysOfType(type), {maxArrayLength:null});
    }
    else {
        console.dir(pst.getAllNodeKeys(), {maxArrayLength:null});
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
 * @param {PST.PSTFile} pst
 * @param {number} nid
 */
function printPropertyContext (pst, nid) {
    const pc = pst.getPropertyContext(nid);

    console.log(pc?.getAllProperties());
}

/**
 * @param {PST.PSTFile} pst
 */
function printNameid (pst) {
    const pc = pst.getPropertyContext(NodeEntry.NID_NAME_TO_ID_MAP);
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
