// 0x0001 – 0x0bff Message envelope properties
export const PID_TAG_NAMEID_BUCKET_COUNT                        = 0x0001;
export const PID_TAG_NAMEID_STREAM_GUID                         = 0x0002;
export const PID_TAG_NAMEID_STREAM_ENTRY                        = 0x0003;
export const PID_TAG_NAMEID_STRING_STREAM                       = 0x0004;
export const PID_TAG_IMPORTANCE                                 = 0x0017;
export const PID_TAG_MESSAGE_CLASS                              = 0x001A;
export const PID_TAG_ORIGINATOR_DELIVERY_REPORT_REQUESTED       = 0x0023;
export const PID_TAG_PRIORITY                                   = 0x0026;
export const PID_TAG_READ_RECEIPT_REQUESTED                     = 0x0029;
export const PID_TAG_SENSITIVITY                                = 0x0036;
export const PID_TAG_SUBJECT                                    = 0x0037;
export const PID_TAG_CLIENT_SUBMIT_TIME                         = 0x0039;
export const PID_TAG_SENT_REPRESENTING_SEARCH_KEY               = 0x003B;
export const PID_TAG_RECEIVED_BY_ENTRY_ID                       = 0x003F;
export const PID_TAG_RECEIVED_BY_NAME                           = 0x0040;
export const PID_TAG_SENT_REPRESENTING_ENTRY_ID                 = 0x0041;
export const PID_TAG_SENT_REPRESENTING_NAME                     = 0x0042;
export const PID_TAG_RECEIVED_REPRESENTING_ENTRY_ID             = 0x0043;
export const PID_TAG_RECEIVED_REPRESENTING_NAME                 = 0x0044;
export const PID_TAG_REPLY_RECIPIENT_ENTRIES                    = 0x004F;
export const PID_TAG_REPLY_RECIPIENT_NAMES                      = 0x0050;
export const PID_TAG_RECEIVED_BY_SEARCH_KEY                     = 0x0051;
export const PID_TAG_RECEIVED_REPRESENTING_SEARCH_KEY           = 0x0052;
export const PID_TAG_MESSAGE_TO_ME                              = 0x0057;
export const PID_TAG_MESSAGE_CC_ME                              = 0x0058;
export const PID_TAG_MESSAGE_RECIP_ME                           = 0x0059;
export const PID_TAG_START_DATE                                 = 0x0060;
export const PID_TAG_END_DATE                                   = 0x0061;
export const PID_TAG_OWNER_APPT_ID                              = 0x0062;
export const PID_TAG_RESPONSE_REQUESTED                         = 0x0063;
export const PID_TAG_SENT_REPRESENTING_ADDRESS_TYPE             = 0x0064;
export const PID_TAG_SENT_REPRESENTING_EMAIL_ADDRESS            = 0x0065;
export const PID_TAG_CONVERSATION_TOPIC                         = 0x0070;
export const PID_TAG_CONVERSATION_INDEX                         = 0x0071;
export const PID_TAG_RECEIVED_BY_ADDRESS_TYPE                   = 0x0075;
export const PID_TAG_RECEIVED_BY_EMAIL_ADDRESS                  = 0x0076;
export const PID_TAG_RECEIVED_REPRESENTING_ADDRESS_TYPE         = 0x0077;
export const PID_TAG_RECEIVED_REPRESENTING_EMAIL_ADDRESS        = 0x0078;
export const PID_TAG_TRANSPORT_MESSAGE_HEADERS                  = 0x007D;

// 0x0c00 – 0x0dff Recipient properties
export const PID_TAG_NON_RECIPIENT_NOTIFICATION_REQUESTED       = 0x0C06;
export const PID_TAG_RECIPIENT_TYPE                             = 0x0C15;
export const PID_TAG_REPLY_REQUESTED                            = 0x0C17;
export const PID_TAG_SENDER_ENTRY_ID                            = 0x0C19;
export const PID_TAG_SENDER_NAME                                = 0x0C1A;
export const PID_TAG_SENDER_SEARCH_KEY                          = 0x0C1D;
export const PID_TAG_SENDER_ADDRESS_TYPE                        = 0x0C1E;
export const PID_TAG_SENDER_EMAIL_ADDRESS                       = 0x0C1F;

// 0x0e00 – 0x0fff Non-transmittable message properties
export const PID_TAG_CURRENT_VERSION                            = 0x0E00;
export const PID_TAG_DELETE_AFTER_TRANSMIT                      = 0x0E01;
export const PID_TAG_DISPLAY_BCC                                = 0x0E02;
export const PID_TAG_DISPLAY_CC                                 = 0x0E03;
export const PID_TAG_DISPLAY_TO                                 = 0x0E04;
export const PID_TAG_PARENT_DISPLAY                             = 0x0E05;
export const PID_TAG_MESSAGE_DELIVERY_TIME                      = 0x0E06;
export const PID_TAG_MESSAGE_FLAGS                              = 0x0E07;
export const PID_TAG_MESSAGE_SIZE                               = 0x0E08;
export const PID_TAG_MESSAGE_STATUS                             = 0x0E17;
export const PID_TAG_NORMALIZED_SUBJECT                         = 0x0E1D;
export const PID_TAG_INTERNET_ARTICLE_NUMBER                    = 0x0E23;
export const PID_TAG_IMAP_ID                                    = 0x0E2F;
export const PID_TAG_REPLICATION_ITEM_ID                        = 0x0E30;
export const PID_TAG_REPLICATION_CHANGE_NUM                     = 0x0E33;
export const PID_TAG_REPLICATION_VERSION_HISTORY                = 0x0E34;
export const PID_TAG_REPLICATION_FLAGS                          = 0x0E38;
export const PID_TAG_REPL_COPIED_FROM_VERSION_HISTORY           = 0x0E3C;
export const PID_TAG_REPL_COPIED_FROM_ITEM_ID                   = 0x0E3D;
export const PID_TAG_CREATOR_SID                                = 0x0E58;
export const PID_TAG_LAST_MODIFIER_SID                          = 0x0E59;
export const PID_TAG_READ                                       = 0x0E69;

export const PID_TAG_RECORD_KEY                                 = 0x0FF9;

// 0x1000 – 0x2fff Message content properties
export const PID_TAG_BODY                                       = 0x1000;
export const PID_TAG_RTF_COMPRESSED                             = 0x1009;
export const PID_TAG_BODY_HTML                                  = 0x1013;
export const PID_TAG_BODY_CONTENT_ID                            = 0x1015;
export const PID_TAG_NATIVE_BODY                                = 0x1016;
export const PID_TAG_INTERNET_MESSAGE_ID                        = 0x1035;
export const PID_TAG_INTERNET_REFERENCES                        = 0x1039;
export const PID_TAG_IN_REPLY_TO_ID                             = 0x1042;
export const PID_TAG_LIST_UNSUBSCRIBE                           = 0x1045;
export const PID_TAG_ICON_INDEX                                 = 0x1080;
export const PID_TAG_ITEM_TEMPORARY_FLAGS                       = 0x1097;
export const PID_TAG_ATTR_HIDDEN                                = 0x10F4;
export const PID_TAG_ATTR_SYSTEM                                = 0x10F5;
export const PID_TAG_ATTR_READONLY                              = 0x10F6;

// 0x3000 - 0x33ff Common object properties that appear on multiple objects
export const PID_TAG_DISPLAY_NAME                               = 0x3001;
export const PID_TAG_COMMENT                                    = 0x3004;
export const PID_TAG_CREATION_TIME                              = 0x3007;
export const PID_TAG_LAST_MODIFICATION_TIME                     = 0x3008;
export const PID_TAG_SEARCH_KEY                                 = 0x300B;
export const PID_TAG_CONVERSATION_ID                            = 0x3013;
export const PID_TAG_CONVERSATION_INDEX_TRACKING                = 0x3016;
export const PID_TAG_POLICY_TAG                                 = 0x3019;
export const PID_TAG_START_DATE_ETC                             = 0x301B;
export const PID_TAG_RETENTION_DATE                             = 0x301C;
export const PID_TAG_RETENTION_FLAGS                            = 0x301D;

// 0x3400 - 0x35ff Message store properties
export const PID_TAG_ROOT_MAILBOX                               = 0x35E0;
export const PID_TAG_DELETED_ITEMS                              = 0x35E3;
export const PID_TAG_SEARCH_FOLDER                              = 0x35E7;
export const PID_TAG_COMMUNICATOR_HISTORY_FOLDER_ENTRY_ID       = 0x35E9;
export const PID_TAG_SYNC_ROOT_ENTRY_ID                         = 0x35EA;

// 0x3600 - 0x36ff Folder and address book container properties
export const PID_TAG_CONTENT_COUNT                              = 0x3602;
export const PID_TAG_CONTENT_UNREAD_COUNT                       = 0x3603;
export const PID_TAG_SUBFOLDERS                                 = 0x360A;
export const PID_TAG_CONTAINER_CLASS                            = 0x3613;
export const PID_TAG_ASSOC_CONTENT_COUNT                        = 0x3617;
export const PID_TAG_IPM_DRAFTS_ENTRY_ID                        = 0x36D7;
export const PID_TAG_ADDITIONAL_REN_ENTRY_IDS                   = 0x36D8;
export const PID_TAG_ADDITIONAL_REN_ENTRY_IDS_EX                = 0x36D9;
export const PID_TAG_FOLDER_VIEW_LIST                           = 0x36EB;

// 0x3900 – 0x39ff Address book properties

// Icon Display Type
// Values:
// 0x0100 0000  Folder
// 0x0200 0000  Folder Link
// 0x0400 0000  Folder Special
export const PID_TAG_DISPLAY_TYPE                               = 0x3900;
export const PID_TAG_SMTP_ADDRESS                               = 0x39FE;

export const PID_TAG_ACCOUNT                                    = 0x3A00;
export const PID_TAG_GENERATION                                 = 0x3A05;
export const PID_TAG_GIVEN_NAME                                 = 0x3A06;
export const PID_TAG_GOVERNMENT_ID_NUMBER                       = 0x3A07;
export const PID_TAG_BUSINESS_TELEPHONE_NUMBER                  = 0x3A08;
export const PID_TAG_HOME_TELEPHONE_NUMBER                      = 0x3A09;
export const PID_TAG_SURNAME                                    = 0x3A11;
export const PID_TAG_COMPANY_NAME                               = 0x3A16;
export const PID_TAG_TITLE                                      = 0x3A17;
export const PID_TAG_DEPARTMENT_NAME                            = 0x3A18;
export const PID_TAG_OFFICE_LOCATION                            = 0x3A19;
export const PID_TAG_MOBILE_TELEPHONE_NUMBER                    = 0x3A1C;
export const PID_TAG_CAR_TELEPHONE_NUMBER                       = 0x3A1E;
export const PID_TAG_OTHER_TELEPHONE_NUMBER                     = 0x3A1F;
export const PID_TAG_PAGER_TELEPHONE_NUMBER                     = 0x3A21;
export const PID_TAG_ASSISTANT                                  = 0x3A30;
export const PID_TAG_SEND_RICH_INFO                             = 0x3A40;
export const PID_TAG_BIRTHDAY                                   = 0x3A42;
export const PID_TAG_MIDDLE_NAME                                = 0x3A44;
export const PID_TAG_DISPLAY_NAME_PREFIX                        = 0x3A45;
export const PID_TAG_PROFESSION                                 = 0x3A46;
export const PID_TAG_SPOUSE_NAME                                = 0x3A48;
export const PID_TAG_MANAGER_NAME                               = 0x3A4E;
export const PID_TAG_NICKNAME                                   = 0x3A4F;
export const PID_TAG_PERSONAL_HOME_PAGE                         = 0x3A50;
export const PID_TAG_BUSINESS_HOME_PAGE                         = 0x3A51;
export const PID_TAG_HOME_ADDRESS_CITY                          = 0x3A59;
export const PID_TAG_HOME_ADDRESS_COUNTRY                       = 0x3A5A;
export const PID_TAG_HOME_ADDRESS_STATE_OR_PROVINCE             = 0x3A5C;

// 0x3e00 – 0x3fff Status object properties
export const PID_TAG_NTSD_MODIFICATION_TIME                     = 0x3FD6;
export const PID_TAG_INTERNET_CODEPAGE                          = 0x3FDE;
export const PID_TAG_DESIGN_IN_PROGRESS                         = 0x3FE4;
export const PID_TAG_SECURE_ORIGIN                              = 0x3FE5;
export const PID_TAG_FROM_I_HAVE                                = 0x3FF1;
export const PID_TAG_LAST_MODIFIER_NAME                         = 0x3FFA;
export const PID_TAG_LAST_MODIFIER_ENTRY_ID                     = 0x3FFB;
export const PID_TAG_MESSAGE_CODEPAGE                           = 0x3FFD;
export const PID_TAG_MESSAGE_LOCALE                             = 0x3FFF;

// 0x4000 – 0x57ff Message envelope properties
export const PID_TAG_SENDER_FLAGS                               = 0x4019;
export const PID_TAG_CREATOR_ADDRESS_TYPE                       = 0x4022;
export const PID_TAG_CREATOR_EMAIL_ADDRESS                      = 0x4023;
export const PID_TAG_SENDER_SIMPLE_DISP_NAME                    = 0x4030;
export const PID_TAG_SENT_REPRESENTING_SIMPLE_DISP_NAME         = 0x4031;
export const PID_TAG_RECEIVED_REPRESENTING_SIMPLE_DISP_NAME     = 0x4035;
export const PID_TAG_CREATOR_SIMPLE_DISP_NAME                   = 0x4038;
export const PID_TAG_LAST_MODIFIER_SIMPLE_DISP_NAME             = 0x4039;
export const PID_TAG_CREATOR_FLAGS                              = 0x4059;
export const PID_TAG_MODIFIER_FLAGS                             = 0x405A;
export const PID_TAG_HIER_REV                                   = 0x4082;
export const PID_TAG_CONTENT_FILTER_PHISHING_CONFIDENCE_LEVEL   = 0x4084;


// 0x5800 – 0x5fff Recipient properties
export const PID_TAG_MESSAGE_EDITOR_FORMAT                      = 0x5909;
export const PID_TAG_SENDER_SMTP_ADDRESS                        = 0x5D01;
export const PID_TAG_SENT_REPRESENTING_SMTP_ADDRESS             = 0x5D02;
export const PID_TAG_RECEIVED_BY_SMTP_ADDRESS                   = 0x5D07;
export const PID_TAG_RECEIVED_REPRESENTING_SMTP_ADDRESS         = 0x5D08;
export const PID_TAG_CREATOR_SMTP_ADDRESS                       = 0x5D0A;
export const PID_TAG_LAST_MODIFIER_SMTP_ADDRESS                 = 0x5D0B;

// 0x6000 - 0x65ff Non-transmittable message properties
export const PID_TAG_SECURE_SUBMIT_FLAGS                        = 0x65C6;
export const PID_TAG_CHANGE_KEY                                 = 0x65E2;
export const PID_TAG_PREDECESSOR_CHANGE_LIST                    = 0x65E3;

// 0x6600 – 0x67ff Non-transmittable properties
export const PID_TAG_PST_BODY_PREFIX                            = 0x6619;
export const PID_TAG_PST_BEST_BODY_PROPTAG                      = 0x661D;
export const PID_TAG_PST_HIDDEN_COUNT                           = 0x6635;
export const PID_TAG_PST_HIDDEN_UNREAD                          = 0x6636;
export const PID_TAG_LAST_OP_TIME                               = 0x6690;

export const PID_TAG_PST_IMP_SUB_TREE_DESCENDANT                = 0x6705;
export const PID_TAG_PST_SUB_TREE_CONTAINER                     = 0x6772;
export const PID_TAG_LTP_PARENT_NID                             = 0x67F1;
export const PID_TAG_LTP_ROW_ID                                 = 0x67F2;
export const PID_TAG_LTP_ROW_VER                                = 0x67F3;
export const PID_TAG_PST_PASSWORD                               = 0x67FF;

// 0x7c00 – 0x7fff Non-transmittable properties for custom message classes
export const PID_TAG_OST_SECURITY_FLD_SVTVER                    = 0x7C0B;
export const PID_TAG_LOCAL_COMMIT_TIME_MAX                      = 0x7C0E;
export const PID_TAG_DELETED_COUNT_TOTAL                        = 0x7C0F;

// 0x8000 – 0xfffe Named properties


export const TagNames = {
    [PID_TAG_IMPORTANCE]: "importance",
    [PID_TAG_MESSAGE_CLASS]: "messageClass",
    [PID_TAG_ORIGINATOR_DELIVERY_REPORT_REQUESTED]: "originatorDeliveryReportRequested",
    [PID_TAG_PRIORITY]: "priority",
    [PID_TAG_READ_RECEIPT_REQUESTED]: "readReceiptRequested",
    [PID_TAG_SENSITIVITY]: "sensitivity",
    [PID_TAG_SUBJECT]: "subject",
    [PID_TAG_CLIENT_SUBMIT_TIME]: "clientSubmitTime",
    [PID_TAG_SENT_REPRESENTING_SEARCH_KEY]: "sentRepresentingSearchKey",
    [PID_TAG_RECEIVED_BY_ENTRY_ID]: "receivedByEntryID",
    [PID_TAG_RECEIVED_BY_NAME]: "receivedByName",
    [PID_TAG_SENT_REPRESENTING_ENTRY_ID]: "sentRepresentingEntryID",
    [PID_TAG_SENT_REPRESENTING_NAME]: "sentRepresentingName",
    [PID_TAG_RECEIVED_REPRESENTING_ENTRY_ID]: "receivedRepresentingEntryID",
    [PID_TAG_RECEIVED_REPRESENTING_NAME]: "receivedRepresentingName",
    [PID_TAG_REPLY_RECIPIENT_ENTRIES]: "replyRecipientEntries",
    [PID_TAG_REPLY_RECIPIENT_NAMES]: "replyRecipientNames",
    [PID_TAG_RECEIVED_BY_SEARCH_KEY]: "receivedBySearchKey",
    [PID_TAG_RECEIVED_REPRESENTING_SEARCH_KEY]: "receivedRepresentingSearchKey",
    [PID_TAG_MESSAGE_TO_ME]: "messageToMe",
    [PID_TAG_MESSAGE_CC_ME]: "messageCcMe",
    [PID_TAG_MESSAGE_RECIP_ME]: "messageRecipMe",
    [PID_TAG_START_DATE]: "startDate",
    [PID_TAG_END_DATE]: "endDate",
    [PID_TAG_OWNER_APPT_ID]: "ownerApptID",
    [PID_TAG_RESPONSE_REQUESTED]: "responseRequested",
    [PID_TAG_SENT_REPRESENTING_ADDRESS_TYPE]: "sentRepresentingAddressType",
    [PID_TAG_SENT_REPRESENTING_EMAIL_ADDRESS]: "sentRepresentingEmailAddress",
    [PID_TAG_CONVERSATION_TOPIC]: "conversationTopic",
    [PID_TAG_CONVERSATION_INDEX]: "conversationIndex",
    [PID_TAG_RECEIVED_BY_ADDRESS_TYPE]: "receivedByAddressType",
    [PID_TAG_RECEIVED_BY_EMAIL_ADDRESS]: "receivedByEmailAddress",
    [PID_TAG_RECEIVED_REPRESENTING_ADDRESS_TYPE]: "receivedRepresentingAddressType",
    [PID_TAG_RECEIVED_REPRESENTING_EMAIL_ADDRESS]: "receivedRepresentingEmailAddress",
    [PID_TAG_TRANSPORT_MESSAGE_HEADERS]: "transportMessageHeaders",

    [PID_TAG_NON_RECIPIENT_NOTIFICATION_REQUESTED]: "nonRecipientNotificationRequested",
    [PID_TAG_RECIPIENT_TYPE]: "recipientType",
    [PID_TAG_REPLY_REQUESTED]: "replyRequested",
    [PID_TAG_RECIPIENT_TYPE]: "recipientType",
    [PID_TAG_REPLY_REQUESTED]: "replyRequested",
    [PID_TAG_SENDER_ENTRY_ID]: "senderEntryID",
    [PID_TAG_SENDER_NAME]: "senderName",
    [PID_TAG_SENDER_SEARCH_KEY]: "senderSearchKey",
    [PID_TAG_SENDER_ADDRESS_TYPE]: "senderAddressType",
    [PID_TAG_SENDER_EMAIL_ADDRESS]: "senderEmailAddress",

    [PID_TAG_CURRENT_VERSION]: "currentVersion",
    [PID_TAG_DELETE_AFTER_TRANSMIT]: "deleteAfterTransmit",
    [PID_TAG_DISPLAY_BCC]: "displayBcc",
    [PID_TAG_DISPLAY_CC]: "displayCc",
    [PID_TAG_DISPLAY_TO]: "displayTo",
    [PID_TAG_PARENT_DISPLAY]: "parentDisplay",
    [PID_TAG_MESSAGE_DELIVERY_TIME]: "messageDeliveryTime",
    [PID_TAG_MESSAGE_FLAGS]: "messageFlags",
    [PID_TAG_MESSAGE_SIZE]: "messageSize",
    [PID_TAG_MESSAGE_STATUS]: "messageStatus",
    [PID_TAG_NORMALIZED_SUBJECT]: "normalisedSubject",
    [PID_TAG_INTERNET_ARTICLE_NUMBER]: "internetArticleNumber",
    [PID_TAG_IMAP_ID]: "imapID",
    [PID_TAG_REPLICATION_ITEM_ID]: "replicationItemID",
    [PID_TAG_REPLICATION_CHANGE_NUM]: "replicationChangeNum",
    [PID_TAG_REPLICATION_VERSION_HISTORY]: "replicationVersionHistory",
    [PID_TAG_REPLICATION_FLAGS]: "replicationFlags",
    [PID_TAG_REPL_COPIED_FROM_VERSION_HISTORY]: "replCopiedFromVersionHistory",
    [PID_TAG_REPL_COPIED_FROM_ITEM_ID]: "replCopiedFromItemID",
    [PID_TAG_CREATOR_SID]: "creatorSID",
    [PID_TAG_LAST_MODIFIER_SID]: "lastModifierSID",
    [PID_TAG_READ]: "read",

    [PID_TAG_RECORD_KEY]: "recordKey",

    [PID_TAG_BODY]: "body",
    [PID_TAG_RTF_COMPRESSED]: "rtfCompressed",
    [PID_TAG_BODY_HTML]: "bodyHTML",
    [PID_TAG_BODY_CONTENT_ID]: "bodyContentID",
    [PID_TAG_NATIVE_BODY]: "nativeBody",
    [PID_TAG_INTERNET_MESSAGE_ID]: "internetMessageID",
    [PID_TAG_INTERNET_REFERENCES]: "internetReferences",
    [PID_TAG_IN_REPLY_TO_ID]: "inReplyToID",
    [PID_TAG_LIST_UNSUBSCRIBE]: "listUnsubscribe",
    [PID_TAG_ICON_INDEX]: "iconIndex",
    [PID_TAG_ITEM_TEMPORARY_FLAGS]: "itemTemporaryFlags",
    [PID_TAG_ATTR_HIDDEN]: "attrHidden",
    [PID_TAG_ATTR_SYSTEM]: "attrSystem",
    [PID_TAG_ATTR_READONLY]: "attrReadonly",

    [PID_TAG_DISPLAY_NAME]: "displayName",
    [PID_TAG_COMMENT]: "comment",
    [PID_TAG_CREATION_TIME]: "creationTime",
    [PID_TAG_LAST_MODIFICATION_TIME]: "lastModificationTime",
    [PID_TAG_SEARCH_KEY]: "searchKey",
    [PID_TAG_CONVERSATION_ID]: "conversationID",
    [PID_TAG_CONVERSATION_INDEX_TRACKING]: "conversationIndexTracking",
    [PID_TAG_POLICY_TAG]: "PolicyTag",
    [PID_TAG_START_DATE_ETC]: "startDateEtc",
    [PID_TAG_RETENTION_DATE]: "retentionDate",
    [PID_TAG_RETENTION_FLAGS]: "retentionFlags",

    [PID_TAG_ROOT_MAILBOX]: "rootMailbox",
    [PID_TAG_DELETED_ITEMS]: "deletedItems",
    [PID_TAG_SEARCH_FOLDER]: "searchFolder",
    [PID_TAG_COMMUNICATOR_HISTORY_FOLDER_ENTRY_ID]: "communicatorHistoryFolderEntryID",
    [PID_TAG_SYNC_ROOT_ENTRY_ID]: "syncRootEntryID",

    [PID_TAG_CONTENT_COUNT]: "contentCount",
    [PID_TAG_CONTENT_UNREAD_COUNT]: "unreadCount",
    [PID_TAG_SUBFOLDERS]: "subfolders",
    [PID_TAG_CONTAINER_CLASS]: "containerClass",
    [PID_TAG_ASSOC_CONTENT_COUNT]: "assocContentCount",
    [PID_TAG_IPM_DRAFTS_ENTRY_ID]: "ipmDraftsEntryID",
    [PID_TAG_ADDITIONAL_REN_ENTRY_IDS]: "additionalRenEntryIDs",
    [PID_TAG_ADDITIONAL_REN_ENTRY_IDS_EX]: "additionalRenEntryIDsEx",
    [PID_TAG_FOLDER_VIEW_LIST]: "folderViewList",

    [PID_TAG_DISPLAY_TYPE]: "displayType",
    [PID_TAG_SMTP_ADDRESS]: "smtpAddress",

    [PID_TAG_ACCOUNT]: "account",
    [PID_TAG_GENERATION]: "generation",
    [PID_TAG_GIVEN_NAME]: "givenName",
    [PID_TAG_GOVERNMENT_ID_NUMBER]: "governmentIDNumber",
    [PID_TAG_BUSINESS_TELEPHONE_NUMBER]: "businessTelephoneNumber",
    [PID_TAG_HOME_TELEPHONE_NUMBER]: "homeTelephoneNumber",
    [PID_TAG_SURNAME]: "surname",
    [PID_TAG_COMPANY_NAME]: "companyName",
    [PID_TAG_TITLE]: "title",
    [PID_TAG_DEPARTMENT_NAME]: "departmentName",
    [PID_TAG_OFFICE_LOCATION]: "officeLocation",
    [PID_TAG_MOBILE_TELEPHONE_NUMBER]: "mobileTelephoneNumber",
    [PID_TAG_CAR_TELEPHONE_NUMBER]: "carTelephoneNumber",
    [PID_TAG_OTHER_TELEPHONE_NUMBER]: "otherTelephoneNumber",
    [PID_TAG_PAGER_TELEPHONE_NUMBER]: "pagerTelephoneNumber",
    [PID_TAG_ASSISTANT]: "assistant",
    [PID_TAG_SEND_RICH_INFO]: "sendRichInfo",
    [PID_TAG_BIRTHDAY]: "birthday",
    [PID_TAG_MIDDLE_NAME]: "middleName",
    [PID_TAG_DISPLAY_NAME_PREFIX]: "displayNamePrefix",
    [PID_TAG_PROFESSION]: "profession",
    [PID_TAG_SPOUSE_NAME]: "spouseName",
    [PID_TAG_MANAGER_NAME]: "managerName",
    [PID_TAG_NICKNAME]: "nickname",
    [PID_TAG_PERSONAL_HOME_PAGE]: "personalHomePage",
    [PID_TAG_BUSINESS_HOME_PAGE]: "businessHomePage",
    [PID_TAG_HOME_ADDRESS_CITY]: "homeAddressCity",
    [PID_TAG_HOME_ADDRESS_COUNTRY]: "homeAddressCountry",
    [PID_TAG_HOME_ADDRESS_STATE_OR_PROVINCE]: "homeAddressStateOrPRovince",

    [PID_TAG_NTSD_MODIFICATION_TIME]: "ntsdModificationTime",
    [PID_TAG_INTERNET_CODEPAGE]: "internetCodepage",
    [PID_TAG_DESIGN_IN_PROGRESS]: "designInProgress",
    [PID_TAG_SECURE_ORIGIN]: "secureOrigin",
    [PID_TAG_FROM_I_HAVE]: "fromIHave",
    [PID_TAG_LAST_MODIFIER_NAME]: "lastModifierName",
    [PID_TAG_LAST_MODIFIER_ENTRY_ID]: "lastModifierEntryID",
    [PID_TAG_MESSAGE_CODEPAGE]: "messageCodepage",
    [PID_TAG_MESSAGE_LOCALE]: "messageLocale",

    [PID_TAG_SENDER_FLAGS]: "senderFlags",
    [PID_TAG_CREATOR_ADDRESS_TYPE]: "creatorAddressType",
    [PID_TAG_CREATOR_EMAIL_ADDRESS]: "creatorEmailAddress",
    [PID_TAG_SENDER_SIMPLE_DISP_NAME]: "senderSimpleDispName",
    [PID_TAG_SENT_REPRESENTING_SIMPLE_DISP_NAME]: "sentRepresentingSimpleDispName",
    [PID_TAG_RECEIVED_REPRESENTING_SIMPLE_DISP_NAME]: "receivedRepresentingSimpleDispName",
    [PID_TAG_CREATOR_SIMPLE_DISP_NAME]: "creatorSimpleDispName",
    [PID_TAG_LAST_MODIFIER_SIMPLE_DISP_NAME]: "lastModifierSimpleDispName",
    [PID_TAG_CREATOR_FLAGS]: "creatorFlags",
    [PID_TAG_MODIFIER_FLAGS]: "modifierFlags",
    [PID_TAG_HIER_REV]: "hierRev",
    [PID_TAG_CONTENT_FILTER_PHISHING_CONFIDENCE_LEVEL]: "contentFilterPhishingConfidenceLevel",

    [PID_TAG_MESSAGE_EDITOR_FORMAT]: "messageEditorFormat",
    [PID_TAG_SENDER_SMTP_ADDRESS]: "senderSMTPAddress",
    [PID_TAG_SENT_REPRESENTING_SMTP_ADDRESS]: "sentRepresentingSMTPAddress",
    [PID_TAG_RECEIVED_BY_SMTP_ADDRESS]: "receivedBySMTPAddress",
    [PID_TAG_RECEIVED_REPRESENTING_SMTP_ADDRESS]: "receivedRepresentingSMTPAddress",
    [PID_TAG_CREATOR_SMTP_ADDRESS]: "creatorSMTPAddress",
    [PID_TAG_LAST_MODIFIER_SMTP_ADDRESS]: "lastModifierSMTPAddress",

    [PID_TAG_SECURE_SUBMIT_FLAGS]: "secureSubmitFlags",
    [PID_TAG_CHANGE_KEY]: "changeKey",
    [PID_TAG_PREDECESSOR_CHANGE_LIST]: "predecessorChangeList",

    [PID_TAG_PST_BODY_PREFIX]: "pstBodyPrefix",
    [PID_TAG_PST_BEST_BODY_PROPTAG]: "pstBestBodyPropTag",
    [PID_TAG_PST_HIDDEN_COUNT]: "pstHiddenCound",
    [PID_TAG_PST_HIDDEN_UNREAD]: "pstHiddenUnread",
    [PID_TAG_PST_IMP_SUB_TREE_DESCENDANT]: "pstImpSubTreeDescendant",
    [PID_TAG_PST_SUB_TREE_CONTAINER]: "pstSubTreeContainer",
    [PID_TAG_LTP_PARENT_NID]: "ltpParentNID",
    [PID_TAG_LTP_ROW_ID]: "ltpRowID",
    [PID_TAG_LTP_ROW_VER]: "ltpRowVer",
    [PID_TAG_PST_PASSWORD]: "pstPassword",

    [PID_TAG_OST_SECURITY_FLD_SVTVER]: "ostSecurityFldSvrver",
    [PID_TAG_LOCAL_COMMIT_TIME_MAX]: "localCommitTimeMax",
    [PID_TAG_DELETED_COUNT_TOTAL]: "deletedCountTotal",
};
