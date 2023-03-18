import fs from "fs";
import bench from "nanobench";
import * as PST from "../src/index.js";

const byteBuffer = fs.readFileSync(process.argv[2]);

bench("List folders 100 times", b => {
    const pst = new PST.PSTFile(byteBuffer.buffer);

    const messageStore = pst.getMessageStore();
    if (!messageStore) {
        throw Error("Can't find MessageStore");
    }

    if (!messageStore.rootFolderNID) {
        throw Error("Can't find root folder");
    }

    b.start();

    for (let i = 0; i < 100; i++) {
        printFolder(pst, messageStore.rootFolderNID);
    }

    b.end();
});

bench("List subfolder entries 100 times", b => {
    const pst = new PST.PSTFile(byteBuffer.buffer);

    const messageStore = pst.getMessageStore();
    if (!messageStore) {
        throw Error("Can't find MessageStore");
    }

    if (!messageStore.rootFolderNID) {
        throw Error("Can't find root folder");
    }

    const folder = pst.getFolder(messageStore.rootFolderNID);

    if (!folder) {
        throw Error("Can't find root folder");
    }

    b.start();

    for (let i = 0; i < 100; i++) {
        folder.getSubFolderEntries();
    }

    b.end();
});

bench("List message properties 100 times", b => {
    const pst = new PST.PSTFile(byteBuffer.buffer);

    const messageStore = pst.getMessageStore();
    if (!messageStore) {
        throw Error("Can't find MessageStore");
    }

    if (!messageStore.rootFolderNID) {
        throw Error("Can't find root folder");
    }

    const NID_TYPE_NORMAL_MESSAGE          = 0x04;
    const messageNids = pst.getAllNodeKeysOfType(NID_TYPE_NORMAL_MESSAGE);

    const firstMessage = pst.getMessage(parseInt(messageNids[0].toString()));

    if (!firstMessage) {
        throw Error("Can't find first message");
    }

    b.start();

    for (let i = 0; i < 100; i++) {
        firstMessage.getAllProperties();
    }

    b.end();
});


/**
 * @param {PST.PSTFile} pst
 * @param {number} nid
 * @param {number} [depth]
 */
function printFolder (pst, nid, depth = 0) {
    const folder = pst.getFolder(nid);
    if (folder) {
        const output = " ".repeat(depth) + folder.displayName + " (" + folder.contentCount + ")";

        const subfolders = folder.getSubFolderEntries();
        for (const sf of subfolders) {
            printFolder(pst, sf.nid, depth + 1);
        }
    }
}
