const tags = [
	[ 0x3a00, 0x001e, "PidTagAccount",						"Recipient account name" ],
	[ 0x3a01, 0x0102, "PidTagAlternateRecipient",					"Alternate recipient entry identifiers" ],
	[ 0x3a02, 0x001e, "PidTagCallbackTelephoneNumber",				"Callback telephone number" ],
	[ 0x3a03, 0x000b, "PidTagConversionProhibited",					"Conversation prohibited" ],
	[ 0x3a04, 0x000b, "PR_DISCLOSE_RECIPIENTS",					"Disclose recipient" ],
	[ 0x3a05, 0x001e, "PidTagGeneration",						"Generational abbreviation" ],
	[ 0x3a06, 0x001e, "PidTagGivenName",						"Given name" ],
	[ 0x3a07, 0x001e, "PidTagGovernmentIdNumber",					"Government identifier" ],
	[ 0x3a08, 0x001e, "PidTagBusinessTelephoneNumber",				"Business (office) phone number" ],
	[ 0x3a09, 0x001e, "PidTagHomeTelephoneNumber",					"Home phone number" ],
	[ 0x3a0a, 0x001e, "PidTagInitials",						"Initials" ],
	[ 0x3a0b, 0x001e, "PidTagKeyword",						"Recipient identification keyword" ],
	[ 0x3a0c, 0x001e, "PidTagLanguage",						"Language" ],
    [ 0x3d21, 0x0102, "ptagAdminNTSD",						"Administrator permissions (NT security descriptor)" ],

];

for (const [ tag, type, name, description ] of tags) {
    const constName = camelToUpperSnake(name);
    console.log(`export const ${constName}${" ".repeat(Math.max(0,50-constName.length))} = 0x${tag.toString(16).toUpperCase().padStart(4,"0")}; // ${description}`);
}

for (const [ tag, type, name, description ] of tags) {
    const constName = camelToUpperSnake(name);
    const displayName = upperSnakeToCamel(constName);
    console.log(` [${constName}]: "${displayName}",`);
}

/**
 * @param {string} text
 */
function camelToUpperSnake (text) {
    if (/^PR_/.test(text)) {
        return "PID_TAG_" + text.substring(3);
    }

    const re = /[A-Z]+[a-z]*/g;
    const parts = [];
    let match = re.exec(text);
    while (match) {
        parts.push(match[0]);
        match = re.exec(text);
    }
    return parts.map(t => t.toUpperCase()).join("_");
}

function upperSnakeToCamel (text) {
    return text.split("_").slice(2).map(t => `${t[0]}${t.substring(1).toLowerCase()}`).join("");
}