# PST-Parser

This is a parser for Outlook PST files written from scratch in pure JavaScript.

## Usage

### CLI

Mess around with `test.js` to get a basic sanity check of the lib/PST file.

    > git clone https://github.com/IJMacD/pst-parser.git
    > cd pst-parser
    > node ./test.js ../path/to/file.pst

### Module

    > yarn add pst-parser

Use as a module in whatever JS module system you like (assuming it's somewhat modern).

The `PSTFile` constructor takes an `ArrayBuffer`.

```js
import * as PST from "pst-parser";

if (file instanceof File) {
    const buffer = await file.arrayBuffer();

    const pst = new PST.PSTFile(buffer);

    const messageStore = pst.getMessageStore();
    console.log(messageStore.getAllProperties());

    const rootFolder = messageStore.getRootFolder();
    console.log(rootFolder.getAllProperties());

    if (rootFolder.hasSubfolders) {
        // Get listing of subfolders
        const entries = rootFolder.getSubFolderEntries();

        // Get folder object for the first subfolder
        const subFolder = rootFolder.getSubFolder(entries[0].nid);

        console.log(subFolder.displayName);

        // Get first 5 message entries
        const messageEntries = subFolder.getContents(0, 5);

        // Get actual message object
        const message = subFolder.getMessage(messageEntries[0].nid);

        console.log(message.getAllProperties());
    }
}
```


## FAQ

### What can it do?

It can read some (most?) parts of a PST file.

### Can it write to a PST file?

No read only.

### Will this break?

Yes, I promise it will at some point. There's lots in the spec that's not
implemented yet, merely because I haven't run into it with the limited set of test
PST files I have to hand. You might not be so lucky.

There are also tons of edge cases and particular behaviours that only come into
play in very specific situations. (e.g. The subject field has specific processing
distinct from every other type of value stored in the pst file) Most of these
are not implemented.

### Will this destroy my data?

Fortunately it shouldn't. The library is read only, so unless something goes
catastrophically wrong your data should be safe.

### Can you give me a brief, very high level view of the layout, contents, structure and organisation of a PST file?

Sure, here you go.

![PST File Layout](ref/pst%20layout.svg)