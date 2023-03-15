import * as PST from "./index.js";
import fs from "fs";

if (process.argv.length < 3) {
    console.log("Usage: node test.js <filename.pst>");
    process.exit();
}

const byteBuffer = fs.readFileSync(process.argv[2]);

try {
    const pst = new PST.File(byteBuffer.buffer);

    // console.log("Root Folder NID: " + PSTFile.NID_ROOT_FOLDER);

    // const rootFolder = pst.getRootFolder();
    // if (rootFolder) {
    //     // console.log(rootFolder.keys);
    //     console.log("Root folder display name: " + rootFolder.displayName);
    //     console.log("Content Count: " + rootFolder.contentCount);
    //     console.log("Content Unread Count: " + rootFolder.unreadCount);
    //     console.log("Subfolders: " + (rootFolder.hasSubfolders ? "yes" : "no"));

    //     printFolder(pst, PST.File.NID_ROOT_FOLDER);
    // }

    const messageStore = pst.getMessageStore();
    if (messageStore) {
        // console.log("Record Key: ", messageStore.recordKey);
        console.log("Message Store display name: " + messageStore.displayName);
        console.log("Has password: " + (messageStore.hasPassword ? "yes" : "no"));
        // console.log("Root Folder nid: " + messageStore.rootFolderNID?.toString(16));

        if (messageStore.rootFolderNID) {
            printFolder(pst, messageStore.rootFolderNID);
        }
    }
}
catch (e) {
    console.error(e);
}

/**
 * @param {PST.File} pst
 * @param {number|bigint} nid
 * @param {number} [depth]
 */
function printFolder (pst, nid, depth = 0) {
    const folder = pst.getFolder(nid);
    if (folder) {
        console.log(" ".repeat(depth) + folder.displayName + " (" + folder.contentCount + ")");
        // console.log(folder.getAllProperties());

        const subfolders = folder.getSubFolders();
        for (const sf of subfolders) {
            printFolder(pst, sf.nid, depth + 1);
        }

        if (folder.displayName === "Sent Items") {
            const msgs = folder.getMessages().slice(0,1);
            console.log(" ".repeat(depth) + "+ Messages: ", msgs);

            if (msgs.length > 0) {
                const msg = msgs[0];
                const message = pst.getMessage(msg.nid);

                console.log(message?.getAllProperties());
            }
        }
    }
}