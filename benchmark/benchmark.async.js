import fs from "fs";
import { Blob } from "node:buffer";
import bench from "nanobench";
import * as PST from "../src/index.js";

const blob = new Blob([fs.readFileSync(process.argv[2])]);

bench("List folders 100 times", async b => {
    const pst = await PST.PSTFile.create(blob);

    const messageStore = await pst.getMessageStore();
    if (!messageStore) {
        throw Error("Can't find MessageStore");
    }

    b.start();

    for (let i = 0; i < 100; i++) {
        printFolder(await messageStore.getRootFolder());
    }

    b.end();
});

bench("List subfolder entries 100 times", async b => {
    const pst = await PST.PSTFile.create(blob);

    const messageStore = await pst.getMessageStore();
    if (!messageStore) {
        throw Error("Can't find MessageStore");
    }

    const folder = await messageStore.getRootFolder();

    if (!folder) {
        throw Error("Can't find root folder");
    }

    b.start();

    for (let i = 0; i < 100; i++) {
        await folder.getSubFolderEntries();
    }

    b.end();
});

bench("List message properties 100 times", async b => {
    const pst = await PST.PSTFile.create(blob);

    const messageStore = await pst.getMessageStore();
    if (!messageStore) {
        throw Error("Can't find MessageStore");
    }

    const NID_TYPE_NORMAL_MESSAGE          = 0x04;
    const messageNids = await pst.getAllNodeKeysOfType(NID_TYPE_NORMAL_MESSAGE);

    const firstMessage = await pst.getMessage(parseInt(messageNids[0].toString()));

    if (!firstMessage) {
        throw Error("Can't find first message");
    }

    b.start();

    for (let i = 0; i < 100; i++) {
        await firstMessage.getAllProperties();
    }

    b.end();
});


/**
 * @param {PST.Folder} folder
 * @param {number} [depth]
 */
async function printFolder (folder, depth = 0) {
    if (folder) {
        const output = " ".repeat(depth) + await folder.displayName + " (" + await folder.contentCount + ")";

        const subfolders = await folder.getSubFolderEntries();
        for (const sf of subfolders) {
            const subFolder = await folder.getSubFolder(sf.nid);
            await printFolder(subFolder, depth + 1);
        }
    }
}
