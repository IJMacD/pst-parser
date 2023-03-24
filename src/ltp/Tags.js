// 0x0001 – 0x0bff Message envelope properties
export const PID_TAG_NAMEID_BUCKET_COUNT                        = 0x0001;
export const PID_TAG_NAMEID_STREAM_GUID                         = 0x0002;
export const PID_TAG_NAMEID_STREAM_ENTRY                        = 0x0003;
export const PID_TAG_NAMEID_STRING_STREAM                       = 0x0004;
export const PID_TAG_NAMEID_BUCKET_BASE                         = 0x1000;

export const PID_TAG_ACKNOWLEDGEMENT_MODE                       = 0x0001; // Acknowledgment mode
export const PID_TAG_ALTERNATE_RECIPIENT_ALLOWED                = 0x0002; // Alternate recipient allowed
export const PID_TAG_AUTHORIZING_USERS                          = 0x0003; // Authorized users
export const PID_TAG_AUTO_FORWARD_COMMENT                       = 0x0004; // Auto forward comment
export const PID_TAG_AUTO_FORWARDED                             = 0x0005; // Auto forwarded
export const PID_TAG_CONTENT_CONFIDENTIALITY_ALGORITHM_ID       = 0x0006; // Content confidentiality algorithm identifier
export const PID_TAG_CONTENT_CORRELATOR                         = 0x0007; // Original content correlator
export const PID_TAG_CONTENT_IDENTIFIER                         = 0x0008; // Content identifier
export const PID_TAG_CONTENT_LENGTH                             = 0x0009; // Content length
export const PID_TAG_CONTENT_RETURN_REQUESTED                   = 0x000A; // Content return requested
export const PID_TAG_CONVERSATION_KEY                           = 0x000B; // Conversation key
export const PID_TAG_CONVERSION_EITS                            = 0x000C; // Conversion encoded information types
export const PID_TAG_CONVERSION_WITH_LOSS_PROHIBITED            = 0x000D; // Text conversions that loose information is prohibited
export const PID_TAG_CONVERTED_EITS                             = 0x000E; // Encoded information types (EITS) conversation identifier
export const PID_TAG_DEFERRED_DELIVERY_TIME                     = 0x000F; // Sender requested delivery date and time
export const PID_TAG_DELIVER_TIME                               = 0x0010; // Message delivery time
export const PID_TAG_DISCARD_REASON                             = 0x0011; // Message discard reason
export const PID_TAG_DISCLOSURE_OF_RECIPIENTS                   = 0x0012; // Disclosure of recipient allowed
export const PID_TAG_DISTRIBUTION_LIST_EXPANSION_HISTORY        = 0x0013; // Distribution list expansion history
export const PID_TAG_DISTRIBUTION_LIST_EXPANSION_PROHIBITED     = 0x0014; // Expansion of distribution list is prohibited
export const PID_TAG_EXPIRY_TIME                                = 0x0015; // Message expiry time
export const PID_TAG_IMPLICIT_CONVERSION_PROHIBITED             = 0x0016; // Implicit message text conversions prohibited
export const PID_TAG_IMPORTANCE                                 = 0x0017; // Importance
export const PID_TAG_IPM_ID                                     = 0x0018; // Interpersonal message X400 identifier
export const PID_TAG_LATEST_DELIVERY_TIME                       = 0x0019; // Latest message delivery time
export const PID_TAG_MESSAGE_CLASS                              = 0x001A; // Message class
export const PID_TAG_MESSAGE_DELIVERY_ID                        = 0x001B; // Message delivery identifier
export const PID_TAG_MESSAGE_SECURITY_LABEL                     = 0x001E; // Message security label
export const PID_TAG_OBSOLETED_MESSAGE_IDS                      = 0x001F; // Obsolete message identifiers
export const PID_TAG_ORIGINALLY_INTENDED_RECIPIENT_NAME         = 0x0020; // Originally intended recipient name
export const PID_TAG_ORIGINAL_EITS                              = 0x0021; // Message text original encoded information types (EITS)
export const PID_TAG_ORIGINATOR_CERTIFICATE                     = 0x0022; // Originator certificate
export const PID_TAG_ORIGINATOR_DELIVERY_REPORT_REQUESTED       = 0x0023; // Originator delivery report requested
export const PID_TAG_ORIGINATOR_RETURN_ADDRESS                  = 0x0024; // Originator return address
export const PID_TAG_PARENT_KEY                                 = 0x0025; // Parent key
export const PID_TAG_PRIORITY                                   = 0x0026; // Priority
export const PID_TAG_ORIGIN_CHECK                               = 0x0027; // Origin verification value
export const PID_TAG_PROOF_OF_SUBMISSION_REQUESTED              = 0x0028; // ASN.1 proof of submission requested
export const PID_TAG_READ_RECEIPT_REQUESTED                     = 0x0029; // Read receipt requested
export const PID_TAG_RECEIPT_TIME                               = 0x002A; // Receipt time
export const PID_TAG_RECIPIENT_REASSIGNMENT_PROHIBITED          = 0x002B; // Recipient reassignment prohibited
export const PID_TAG_REDIRECTION_HISTORY                        = 0x002C;
export const PID_TAG_RELATED_IPMS                               = 0x002D;
export const PID_TAG_ORIGINAL_SENSITIVITY                       = 0x002E; // Original sensitivity
export const PID_TAG_LANGUAGES                                  = 0x002F;
export const PID_TAG_REPLY_TIME                                 = 0x0030; // Reply deadline
export const PID_TAG_REPORT_TAG                                 = 0x0031; // Report tag
export const PID_TAG_REPORT_TIME                                = 0x0032;
export const PID_TAG_RETURNED_IPM                               = 0x0033;
export const PID_TAG_SECURITY                                   = 0x0034; // Security
export const PID_TAG_INCOMPLETE_COPY                            = 0x0035;
export const PID_TAG_SENSITIVITY                                = 0x0036; // Sensitivity
export const PID_TAG_SUBJECT                                    = 0x0037; // Subject
export const PID_TAG_SUBJECT_MESSAGE_ID                         = 0x0038; // Subject message identifier
export const PID_TAG_CLIENT_SUBMIT_TIME                         = 0x0039; // Client submit time
export const PID_TAG_REPORT_NAME                                = 0x003A;
export const PID_TAG_SENT_REPRESENTING_SEARCH_KEY               = 0x003B; // Sent representing search key
export const PID_TAG_X400_CONTENT_TYPE                          = 0x003C;
export const PID_TAG_SUBJECT_PREFIX                             = 0x003D; // Subject prefix
export const PID_TAG_NON_RECEIPT_REASON                         = 0x003E;
export const PID_TAG_RECEIVED_BY_ENTRY_ID                       = 0x003F; // Received by entry identifier
export const PID_TAG_RECEIVED_BY_NAME                           = 0x0040; // Received by name
export const PID_TAG_SENT_REPRESENTING_ENTRY_ID                 = 0x0041; // Sent representing entry identifier
export const PID_TAG_SENT_REPRESENTING_NAME                     = 0x0042; // Sent representing name
export const PID_TAG_RCVD_REPRESENTING_ENTRYID                  = 0x0043; // Received representing entry identifier
export const PID_TAG_RCVD_REPRESENTING_NAME                     = 0x0044; // Received representing name
export const PID_TAG_REPORT_ENTRYID                             = 0x0045; // Report entry identifier
export const PID_TAG_READ_RECEIPT_ENTRYID                       = 0x0046; // Read receipt entry identifier
export const PID_TAG_MESSAGE_SUBMISSION_ID                      = 0x0047;
export const PID_TAG_PROVIDER_SUBMIT_TIME                       = 0x0048;
export const PID_TAG_ORIGINAL_SUBJECT                           = 0x0049; // Original subject
export const PID_TAG_DISC_VAL                                   = 0x004A;
export const PID_TAG_ORIG_MESSAGE_CLASS                         = 0x004B;
export const PID_TAG_ORIGINAL_AUTHOR_ENTRY_ID                   = 0x004C; // Original author entry identifier
export const PID_TAG_ORIGINAL_AUTHOR_NAME                       = 0x004D; // Original author name
export const PID_TAG_ORIGINAL_SUBMIT_TIME                       = 0x004E; // Original submit time
export const PID_TAG_REPLY_RECIPIENT_ENTRIES                    = 0x004F; // Reply recipient entries
export const PID_TAG_REPLY_RECIPIENT_NAMES                      = 0x0050; // Reply recipient names
export const PID_TAG_RECEIVED_BY_SEARCH_KEY                     = 0x0051; // Received by search key
export const PID_TAG_RCVD_REPRESENTING_SEARCH_KEY               = 0x0052; // Received representing search key
export const PID_TAG_READ_RECEIPT_SEARCH_KEY                    = 0x0053;
export const PID_TAG_REPORT_SEARCH_KEY                          = 0x0054;
export const PID_TAG_ORIGINAL_DELIVERY_TIME                     = 0x0055;
export const PID_TAG_ORIGINAL_AUTHOR_SEARCH_KEY                 = 0x0056;
export const PID_TAG_MESSAGE_TO_ME                              = 0x0057; // My address in To field
export const PID_TAG_MESSAGE_CC_ME                              = 0x0058; // My address in CC field
export const PID_TAG_MESSAGE_RECIPIENT_ME                       = 0x0059; // Message addressed to me
export const PID_TAG_ORIGINAL_SENDER_NAME                       = 0x005A; // Original sender name
export const PID_TAG_ORIGINAL_SENDER_ENTRY_ID                   = 0x005B; // Original sender entry identifier
export const PID_TAG_ORIGINAL_SENDER_SEARCH_KEY                 = 0x005C; // Original sender search key
export const PID_TAG_ORIGINAL_SENT_REPRESENTING_NAME            = 0x005D; // Original sent representing name
export const PID_TAG_ORIGINAL_SENT_REPRESENTING_ENTRY_ID        = 0x005E; // Original sent representing entry identifier
export const PID_TAG_ORIGINAL_SENT_REPRESENTING_SEARCH_KEY      = 0x005F; // Original sent representing search key
export const PID_TAG_START_DATE                                 = 0x0060; // Appointment start date and time
export const PID_TAG_END_DATE                                   = 0x0061; // Appointment end date and time
export const PID_TAG_OWNER_APPOINTMENT_ID                       = 0x0062; // Appointment owner identifier
export const PID_TAG_RESPONSE_REQUESTED                         = 0x0063; // Response requested
export const PID_TAG_SENT_REPRESENTING_ADDRESS_TYPE             = 0x0064; // Sent representing address type
export const PID_TAG_SENT_REPRESENTING_EMAIL_ADDRESS            = 0x0065; // Sent representing e-mail address
export const PID_TAG_ORIGINAL_SENDER_ADDRESS_TYPE               = 0x0066; // Original sender address type
export const PID_TAG_ORIGINAL_SENDER_EMAIL_ADDRESS              = 0x0067; // Original sender e-mail address
export const PID_TAG_ORIGINAL_SENT_REPRESENTING_ADDRESS_TYPE    = 0x0068; // Original sent representing address type
export const PID_TAG_ORIGINAL_SENT_REPRESENTING_EMAIL_ADDRESS   = 0x0069; // Original sent representing e-mail address
export const PID_TAG_CONVERSATION_TOPIC                         = 0x0070; // Conversation topic
export const PID_TAG_CONVERSATION_INDEX                         = 0x0071; // Conversation index
export const PID_TAG_ORIGINAL_DISPLAY_BCC                       = 0x0072; // Original display BCC
export const PID_TAG_ORIGINAL_DISPLAY_CC                        = 0x0073; // Original display CC
export const PID_TAG_ORIGINAL_DISPLAY_TO                        = 0x0074; // Original display To
export const PID_TAG_RECEIVED_BY_ADDRESS_TYPE                   = 0x0075; // Received by address type
export const PID_TAG_RECEIVED_BY_EMAIL_ADDRESS                  = 0x0076; // Received by e-mail address
export const PID_TAG_RECEIVED_REPRESENTING_ADDRESS_TYPE         = 0x0077; // Received representing address type
export const PID_TAG_RECEIVED_REPRESENTING_EMAIL_ADDRESS        = 0x0078; // Received representing e-mail address
export const PID_TAG_ORIGINAL_AUTHOR_ADDRESS_TYPE               = 0x0079; // Original author address type
export const PID_TAG_ORIGINAL_AUTHOR_EMAIL_ADDRESS              = 0x007A; // Original author e-mail address
export const PID_TAG_ORIGINALLY_INTENDED_RECIP_ADDRTYPE         = 0x007B; // Originally intended recipient address type
export const PID_TAG_ORIGINALLY_INTENDED_RECIP_EMAIL_ADDRESS    = 0x007C; // Originally intended recipient e-mail address
export const PID_TAG_TRANSPORT_MESSAGE_HEADERS                  = 0x007D; // Transport message headers
export const PID_TAG_DELEGATION                                 = 0x007E; // Delegation
export const PID_TAG_TNEF_CORRELATION_KEY                       = 0x007F; // TNEF correlation key

// 0x0c00 – 0x0dff Recipient properties
export const PID_TAG_CONTENT_INTEGRITY_CHECK                    = 0x0C00;
export const PID_TAG_EXPLICIT_CONVERSION                        = 0x0C01;
export const PID_TAG_IPM_RETURN_REQUESTED                       = 0x0C02; // Return report requested
export const PID_TAG_MESSAGE_TOKEN                              = 0x0C03; // Message ASN.1 security token
export const PID_TAG_NDR_REASON_CODE                            = 0x0C04;
export const PID_TAG_NDR_DIAG_CODE                              = 0x0C05;
export const PID_TAG_NON_RECEIPT_NOTIFICATION_REQUESTED         = 0x0C06; // Non receipt notification requested
export const PID_TAG_DELIVERY_POINT                             = 0x0C07;
export const PID_TAG_ORIGINATOR_NON_DELIVERY_REPORT_REQUESTED   = 0x0C08; // Originator non delivery report requested
export const PID_TAG_ORIGINATOR_REQUESTED_ALTERNATE_RECIPIENT   = 0x0C09;
export const PID_TAG_PHYSICAL_DELIVERY_BUREAU_FAX_DELIVERY      = 0x0C0A;
export const PID_TAG_PHYSICAL_DELIVERY_MODE                     = 0x0C0B;
export const PID_TAG_PHYSICAL_DELIVERY_REPORT_REQUEST           = 0x0C0C;
export const PID_TAG_PHYSICAL_FORWARDING_ADDRESS                = 0x0C0D;
export const PID_TAG_PHYSICAL_FORWARDING_ADDRESS_REQUESTED      = 0x0C0E;
export const PID_TAG_PHYSICAL_FORWARDING_PROHIBITED             = 0x0C0F;
export const PID_TAG_PHYSICAL_RENDITION_ATTRIBUTES              = 0x0C10;
export const PID_TAG_PROOF_OF_DELIVERY                          = 0x0C11;
export const PID_TAG_PROOF_OF_DELIVERY_REQUESTED                = 0x0C12;
export const PID_TAG_RECIPIENT_CERTIFICATE                      = 0x0C13; // Recipient certificate
export const PID_TAG_RECIPIENT_NUMBER_FOR_ADVICE                = 0x0C14;
export const PID_TAG_RECIPIENT_TYPE                             = 0x0C15; // Recipient type
export const PID_TAG_REGISTERED_MAIL_TYPE                       = 0x0C16;
export const PID_TAG_REPLY_REQUESTED                            = 0x0C17;
export const PID_TAG_REQUESTED_DELIVERY_METHOD                  = 0x0C18;
export const PID_TAG_SENDER_ENTRY_ID                            = 0x0C19; // Sender entry identifier
export const PID_TAG_SENDER_NAME                                = 0x0C1A; // Sender entry name
export const PID_TAG_SUPPLEMENTARY_INFO                         = 0x0C1B;
export const PID_TAG_TYPE_OF_MTS_USER                           = 0x0C1C;
export const PID_TAG_SENDER_SEARCH_KEY                          = 0x0C1D; // Sender search key
export const PID_TAG_SENDER_ADDRESS_TYPE                        = 0x0C1E; // Sender address type
export const PID_TAG_SENDER_EMAIL_ADDRESS                       = 0x0C1F; // Sender e-mail address
export const PID_TAG_NDR_STATUS_CODE                            = 0x0C20; // None delivery status code

// 0x0e00 – 0x0fff Non-transmittable message properties
export const PID_TAG_CURRENT_VERSION                            = 0x0E00; // Message store verion
export const PID_TAG_DELETE_AFTER_SUBMIT                        = 0x0E01; // Delete after submit
export const PID_TAG_DISPLAY_BCC                                = 0x0E02; // Display BCC
export const PID_TAG_DISPLAY_CC                                 = 0x0E03; // Display CC
export const PID_TAG_DISPLAY_TO                                 = 0x0E04; // Display To
export const PID_TAG_PARENT_DISPLAY                             = 0x0E05; // Parent display name
export const PID_TAG_MESSAGE_DELIVERY_TIME                      = 0x0E06; // Message delivery time
export const PID_TAG_MESSAGE_FLAGS                              = 0x0E07; // Message flags
export const PID_TAG_MESSAGE_SIZE                               = 0x0E08; // Message size (32-bit)
export const PID_TAG_MESSAGE_SIZE_EXTENDED                      = 0x0E08; // Message size (64-bit)
export const PID_TAG_PARENT_ENTRY_ID                            = 0x0E09; // Parent folder entry identifier
export const PID_TAG_SENT_MAIL_ENTRY_ID                         = 0x0E0A; // Sent mail folder entry identifier
export const PID_TAG_CORRELATE                                  = 0x0E0C; // Correlation requested
export const PID_TAG_CORRELATE_MTSID                            = 0x0E0D; // Correlation  message transfer system identifier
export const PID_TAG_DISCRETE_VALUES                            = 0x0E0E; // Report applies to specific members only
export const PID_TAG_RESPONSIBILITY                             = 0x0E0F; // Transport provider has responsibility
export const PID_TAG_SPOOLER_STATUS                             = 0x0E10; // Spooler status
export const PID_TAG_TRANSPORT_STATUS                           = 0x0E11;
export const PID_TAG_MESSAGE_RECIPIENTS                         = 0x0E12;
export const PID_TAG_MESSAGE_ATTACHMENTS                        = 0x0E13;
export const PID_TAG_SUBMIT_FLAGS                               = 0x0E14; // Message submit flags
export const PID_TAG_RECIPIENT_STATUS                           = 0x0E15;
export const PID_TAG_TRANSPORT_KEY                              = 0x0E16;
export const PID_TAG_MESSAGE_STATUS                             = 0x0E17; // Message status flags
export const PID_TAG_MESSAGE_DOWNLOAD_TIME                      = 0x0E18;
export const PID_TAG_CREATION_VERSION                           = 0x0E19;
export const PID_TAG_MODIFY_VERSION                             = 0x0E1A;
export const PID_TAG_HASATTACH                                  = 0x0E1B;
export const PID_TAG_BODY_CRC                                   = 0x0E1C; // Plain text message body checksum
export const PID_TAG_NORMALIZED_SUBJECT                         = 0x0E1D; // Normalized subject
export const PID_TAG_RTF_IN_SYNC                                = 0x0E1F; // Compressed RTF message body in sync with plain text
export const PID_TAG_ATTACH_SIZE                                = 0x0E20; // Attachment size
export const PID_TAG_ATTACH_NUMBER                              = 0x0E21; // Attachment number
export const PID_TAG_PREPROCESS                                 = 0x0E22; // Needs preprocessing
export const PID_TAG_INTERNET_ARTICLE_NUMBER                    = 0x0E23; // Internet article number
export const PID_TAG_NEWSGROUP_NAME                             = 0x0E24;
export const PID_TAG_ORIGINATING_MTA_CERTIFICATE                = 0x0E25;
export const PID_TAG_PROOF_OF_SUBMISSION                        = 0x0E26;
export const PID_TAG_SECURITY_DESCRIPTOR                        = 0x0E27; // Permissions (NT security descriptor)
export const PID_TAG_PRIMARY_SEND_ACCT                          = 0x0E28; // Primary send account identifier
export const PID_TAG_NEXT_SEND_ACCT                             = 0x0E29; // Secondary send account identifier
export const PID_TAG_IMAP_ID                                    = 0x0E2F;
export const PID_TAG_REPL_ITEMID                                = 0x0E30; // Replication item identifier
export const PID_TAG_REPL_CHANGENUM                             = 0x0E33; // Replication change number
export const PID_TAG_REPL_VERSION_HISTORY                       = 0x0E34; // Replication version history
export const PID_TAG_REPL_FLAGS                                 = 0x0E38; // Replication flags
export const PID_TAG_REPL_COPIEDFROM_VERSIONHISTORY             = 0x0E3C; // Replication version information
export const PID_TAG_REPL_COPIEDFROM_ITEMID                     = 0x0E3D; // Replication item identifier information
export const PID_TAG_CREATOR_SID                                = 0x0E58; // Creator (NT security identifier)
export const PID_TAG_LAST_MODIFIER_SID                          = 0x0E59; // Last modifier (NT security identifier)
export const PID_TAG_MIME_HANDLER_CLASSID                       = 0x0E5E; // MIME handle class identifier
export const PID_TAG_MIME_HANDLER_CLASSIDS                      = 0x0E5E; // MIME handle class identifiers
export const PID_TAG_URL_COMP_NAME_POSTFIX                      = 0x0E61; // URL computer name postfix
export const PID_TAG_URL_COMP_NAME_SET                          = 0x0E62; // URL computer name set
export const PID_TAG_SUBFOLDER_CT                               = 0x0E63;
export const PID_TAG_DELETED_SUBFOLDER_CT                       = 0x0E64;
export const PID_TAG_DELETE_TIME                                = 0x0E66;
export const PID_TAG_AGE_LIMIT                                  = 0x0E67;
export const PID_TAG_READ                                       = 0x0E69;
export const PID_TAG_TRUST_SENDER                               = 0x0E79; // Trust sender
export const PID_TAG_ATTACH_VIRUS_SCAN_INFO                     = 0x0E96;
export const PID_TAG_ASSOCIATED_SHARING_PROVIDER                = 0x0EA0; // Associated sharing provider identifier
export const PID_TAG_PROVIDER_ITEM_ID                           = 0x0EA3; // Provider identifier
export const PID_TAG_PROVIDER_PARENT_ITEM_ID                    = 0x0EA4; // Parent provider identifier
export const PID_TAG_ACCESS                                     = 0x0FF4; // Client access flags
export const PID_TAG_ROW_TYPE                                   = 0x0FF5; // Row type
export const PID_TAG_INSTANCE_KEY                               = 0x0FF6; // Instance key
export const PID_TAG_ACCESS_LEVEL                               = 0x0FF7; // Client access level flags
export const PID_TAG_MAPPING_SIGNATURE                          = 0x0FF8; // Mapping signature
export const PID_TAG_RECORD_KEY                                 = 0x0FF9; // Record key
export const PID_TAG_STORE_RECORD_KEY                           = 0x0FFA; // Message store record key
export const PID_TAG_STORE_ENTRY_ID                             = 0x0FFB; // Message store entry identifier
export const PID_TAG_MINI_ICON                                  = 0x0FFC; // Mini icon bitmap
export const PID_TAG_ICON                                       = 0x0FFD; // Icon bitmap
export const PID_TAG_OBJECT_TYPE                                = 0x0FFE; // Object type
export const PID_TAG_ENTRY_ID                                   = 0x0FFF; // Entry identifier

// 0x1000 – 0x2fff Message content properties
export const PID_TAG_BODY                                       = 0x1000; // Plain text message body
export const PID_TAG_REPORT_TEXT                                = 0x1001; // Report text
export const PID_TAG_ORIGINATOR_AND_DISTRIBUTION_LIST_EXPANSION_HISTORY = 0x1002; // Originator and distribution list expansion history
export const PID_TAG_REPORTING_DL_NAME                          = 0x1003;
export const PID_TAG_REPORTING_MTA_CERTIFICATE                  = 0x1004;
export const PID_TAG_RTF_SYNC_BODY_CRC                          = 0x1006;
export const PID_TAG_RTF_SYNC_BODY_COUNT                        = 0x1007;
export const PID_TAG_RTF_SYNC_BODY_TAG                          = 0x1008;
export const PID_TAG_RTF_COMPRESSED                             = 0x1009; // Compressed RTF message body
export const PID_TAG_RTF_SYNC_PREFIX_COUNT                      = 0x1010;
export const PID_TAG_RTF_SYNC_TRAILING_COUNT                    = 0x1011;
export const PID_TAG_ORIGINALLY_INTENDED_RECIP_ENTRYID          = 0x1012;
export const PID_TAG_BODY_HTML                                  = 0x1013; // HTML message body
export const PID_TAG_HTML                                       = 0x1013; // HTML message body
export const PID_TAG_BODY_CONTENT_LOCATION                      = 0x1014; // Message body content location
export const PID_TAG_BODY_CONTENT_ID                            = 0x1015;
export const PID_TAG_NATIVE_BODY                                = 0x1016;
export const PID_TAG_INTERNET_APPROVED                          = 0x1030;
export const PID_TAG_INTERNET_CONTROL                           = 0x1031;
export const PID_TAG_INTERNET_DISTRIBUTION                      = 0x1032;
export const PID_TAG_INTERNET_FOLLOWUP_TO                       = 0x1033;
export const PID_TAG_INTERNET_LINES                             = 0x1034;
export const PID_TAG_INTERNET_MESSAGE_ID                        = 0x1035; // Message identifier
export const PID_TAG_INTERNET_NEWSGROUPS                        = 0x1036;
export const PID_TAG_INTERNET_ORGANIZATION                      = 0x1037;
export const PID_TAG_INTERNET_NNTP_PATH                         = 0x1038;
export const PID_TAG_INTERNET_REFERENCES                        = 0x1039;
export const PID_TAG_SUPERSEDES                                 = 0x103A;
export const PID_TAG_POST_FOLDER_ENTRIES                        = 0x103B;
export const PID_TAG_POST_FOLDER_NAMES                          = 0x103C;
export const PID_TAG_POST_REPLY_FOLDER_ENTRIES                  = 0x103D;
export const PID_TAG_POST_REPLY_FOLDER_NAMES                    = 0x103E;
export const PID_TAG_POST_REPLY_DENIED                          = 0x103F;
export const PID_TAG_NNTP_XREF                                  = 0x1040;
export const PID_TAG_INTERNET_PRECEDENCE                        = 0x1041;
export const PID_TAG_IN_REPLY_TO_ID                             = 0x1042;
export const PID_TAG_LIST_HELP                                  = 0x1043;
export const PID_TAG_LIST_SUBSCRIBE                             = 0x1044;
export const PID_TAG_LIST_UNSUBSCRIBE                           = 0x1045;
export const PID_TAG_INTERNET_RETURN_PATH                       = 0x1046; // Internet return path
export const PID_TAG_ICON_INDEX                                 = 0x1080; // Icon index
export const PID_TAG_ACTION_FLAG                                = 0x1081;
export const PID_TAG_ACTION_DATE                                = 0x1082;
export const PID_TAG_FLAG_STATUS                                = 0x1090; // Flag status
export const PID_TAG_FLAG_COMPLETE                              = 0x1091;
export const PID_TAG_FLAG_ICON                                  = 0x1095; // Flag icon index
export const PID_TAG_BLOCK_STATUS                               = 0x1096; // Block status
export const PID_TAG_ITEM_TEMPORARY_FLAGS                       = 0x1097; // Temporary item flags
export const PID_TAG_CONFLICT_ITEMS                             = 0x1098; // Conflict items
export const PID_TAG_SMTP_TEMP_TBL_DATA                         = 0x10C0;
export const PID_TAG_SMTP_TEMP_TBL_DATA_2                       = 0x10C1;
export const PID_TAG_SMTP_TEMP_TBL_DATA_3                       = 0x10C2;
export const PID_TAG_CAL_START_TIME                             = 0x10C3;
export const PID_TAG_CAL_END_TIME                               = 0x10C4;
export const PID_TAG_CAL_RECURRING_ID                           = 0x10C5;
export const PID_TAG_DAV_SUBMIT_DATA                            = 0x10C6;
export const PID_TAG_CDO_EXPANSION_INDEX                        = 0x10C7;
export const PID_TAG_IFS_INTERNAL_DATA                          = 0x10C8;
export const PID_TAG_CAL_REMINDER_NEXT_TIME                     = 0x10CA;
export const PID_TAG_OWA_URL                                    = 0x10F1;
export const PID_TAG_DISABLE_FULL_FIDELITY                      = 0x10F2; // Disable full fidelity
export const PID_TAG_URL_COMPONENT_NAME                         = 0x10F3; // URL computer name
export const PID_TAG_ATTRIBUTE_HIDDEN                           = 0x10F4; // Attribute hidden
export const PID_TAG_ATTRIBUTE_SYSTEM                           = 0x10F5; // Attribute system
export const PID_TAG_ATTRIBUTE_READ_ONLY                        = 0x10F6; // Attribute read only
export const PID_TAG_P1_CONTENT                                 = 0x1100;
export const PID_TAG_P1_CONTENT_TYPE                            = 0x1101;

// 0x3000 - 0x33ff Common object properties that appear on multiple objects
export const PID_TAG_ROWID                                      = 0x3000; // Recipient row identifier
export const PID_TAG_DISPLAY_NAME                               = 0x3001; // Message store display name
export const PID_TAG_ADDRESS_TYPE                               = 0x3002; // E-mail address type
export const PID_TAG_EMAIL_ADDRESS                              = 0x3003; // E-mail address
export const PID_TAG_COMMENT                                    = 0x3004; // Comment
export const PID_TAG_DEPTH                                      = 0x3005; // Hierarchy table depth
export const PID_TAG_PROVIDER_DISPLAY_NAME                      = 0x3006; // Service provider display name
export const PID_TAG_CREATION_TIME                              = 0x3007; // Creation time
export const PID_TAG_LAST_MODIFICATION_TIME                     = 0x3008; // Last modification time
export const PID_TAG_RESOURCE_FLAGS                             = 0x3009; // Resource flags
export const PID_TAG_PROVIDER_DISPLAY                           = 0x300A; // Service provider DLL filename
export const PID_TAG_SEARCH_KEY                                 = 0x300B; // Search key
export const PID_TAG_PROVIDER_UID                               = 0x300C; // Service provider identifier
export const PID_TAG_PROVIDER_ORDINAL                           = 0x300D; // Service provider table index
export const PID_TAG_CONVERSATION_ID                            = 0x3013;
export const PID_TAG_CONVERSATION_INDEX_TRACKING                = 0x3016;
export const PID_TAG_POLICY_TAG                                 = 0x3019;
export const PID_TAG_START_DATE_ETC                             = 0x301B;
export const PID_TAG_RETENTION_DATE                             = 0x301C;
export const PID_TAG_RETENTION_FLAGS                            = 0x301D;

export const PID_TAG_FORM_VERSION                               = 0x3301;
export const PID_TAG_FORM_CLSID                                 = 0x3302;
export const PID_TAG_FORM_CONTACT_NAME                          = 0x3303;
export const PID_TAG_FORM_CATEGORY                              = 0x3304;
export const PID_TAG_FORM_CATEGORY_SUB                          = 0x3305;
export const PID_TAG_FORM_HOST_MAP                              = 0x3306;
export const PID_TAG_FORM_HIDDEN                                = 0x3307;
export const PID_TAG_FORM_DESIGNER_NAME                         = 0x3308;
export const PID_TAG_FORM_DESIGNER_GUID                         = 0x3309;
export const PID_TAG_FORM_MESSAGE_BEHAVIOR                      = 0x330A;

// 0x3400 - 0x35ff Message store properties
export const PID_TAG_DEFAULT_STORE                              = 0x3400;
export const PID_TAG_STORE_SUPPORT_MASK                         = 0x340D; // Message store characteristics mask
export const PID_TAG_STORE_STATE                                = 0x340E;
export const PID_TAG_IPM_SUBTREE_SEARCH_KEY                     = 0x3410;
export const PID_TAG_IPM_OUTBOX_SEARCH_KEY                      = 0x3411;
export const PID_TAG_IPM_WASTEBASKET_SEARCH_KEY                 = 0x3412;
export const PID_TAG_IPM_SENTMAIL_SEARCH_KEY                    = 0x3413;
export const PID_TAG_STORE_PROVIDER                             = 0x3414; // Message store provider
export const PID_TAG_RECEIVE_FOLDER_SETTINGS                    = 0x3415;
export const PID_TAG_SEARCH_OWNER_ID                            = 0x3419; // Search owner identifier
export const PID_TAG_VALID_FOLDER_MASK                          = 0x35DF; // Valid folder mask

export const PID_TAG_IPM_SUBTREE_ENTRY_ID                       = 0x35E0; // IPM sub tree root folder entry identifier
export const PID_TAG_IPM_OUTBOX_ENTRY_ID                        = 0x35E2; // Outbox folder entry identifier
export const PID_TAG_IPM_WASTEBASKET_ENTRY_ID                   = 0x35E3; // Wastebasket folder entry identifier
export const PID_TAG_IPM_SENT_MAIL_ENTRY_ID                     = 0x35E4; // Sent mail folder entry identifier
export const PID_TAG_VIEWS_ENTRY_ID                             = 0x35E5; // Views folder entry identifier
export const PID_TAG_COMMON_VIEWS_ENTRY_ID                      = 0x35E6; // Common views folder entry identifier
export const PID_TAG_FINDER_ENTRY_ID                            = 0x35E7; // Finder folder entry identifier

export const PID_TAG_ROOT_MAILBOX                               = 0x35E0;
export const PID_TAG_DELETED_ITEMS                              = 0x35E3;
export const PID_TAG_SEARCH_FOLDER                              = 0x35E7;
export const PID_TAG_COMMUNICATOR_HISTORY_FOLDER_ENTRY_ID       = 0x35E9;
export const PID_TAG_SYNC_ROOT_ENTRY_ID                         = 0x35EA;

// 0x3600 - 0x36ff Folder and address book container properties
export const PID_TAG_CONTAINER_FLAGS                            = 0x3600; // Address book container capabilities flags
export const PID_TAG_FOLDER_TYPE                                = 0x3601; // Folder type
export const PID_TAG_CONTENT_COUNT                              = 0x3602; // Number of content items
export const PID_TAG_CONTENT_UNREAD_COUNT                       = 0x3603; // Number of unread content items
export const PID_TAG_CREATE_TEMPLATES                           = 0x3604; // Dialog box template entry identifiers
export const PID_TAG_DETAILS_TABLE                              = 0x3605; // Display table object
export const PID_TAG_SEARCH                                     = 0x3607; // Advanced search object
export const PID_TAG_SELECTABLE                                 = 0x3609; // Table entry selectable
export const PID_TAG_SUBFOLDERS                                 = 0x360A; // Has sub folders
export const PID_TAG_STATUS                                     = 0x360B; // Folder status flags
export const PID_TAG_ANR                                        = 0x360C; // Address book property restriction
export const PID_TAG_CONTENTS_SORT_ORDER                        = 0x360D; // Content item sort order
export const PID_TAG_CONTAINER_HIERARCHY                        = 0x360E; // Hierarchy table
export const PID_TAG_CONTAINER_CONTENTS                         = 0x360F; // Contents table
export const PID_TAG_FOLDER_ASSOCIATED_CONTENTS                 = 0x3610; // Associated contents table
export const PID_TAG_DEF_CREATE_DL                              = 0x3611; // Distribution list template identifier
export const PID_TAG_DEF_CREATE_MAILUSER                        = 0x3612; // Messaging user template identifier
export const PID_TAG_CONTAINER_CLASS                            = 0x3613; // Container class
export const PID_TAG_CONTAINER_MODIFY_VERSION                   = 0x3614; // Current modification version
export const PID_TAG_AB_PROVIDER_ID                             = 0x3615; // Address book provider
export const PID_TAG_DEFAULT_VIEW_ENTRY_ID                      = 0x3616; // Default view entry identifier
export const PID_TAG_ASSOCIATED_CONTENT_COUNT                   = 0x3617; // Number of associated content items
export const PID_TAG_PACKED_NAME_PROPS                          = 0x361C;
export const PID_TAG_IPM_APPOINTMENT_ENTRY_ID                   = 0x36D0; // Calendar folder entry identifier
export const PID_TAG_IPM_CONTACT_ENTRY_ID                       = 0x36D1; // Contact folder entry identifier
export const PID_TAG_IPM_JOURNAL_ENTRY_ID                       = 0x36D2; // Journal folder entry identifier
export const PID_TAG_IPM_NOTE_ENTRY_ID                          = 0x36D3; // Notes folder entry identifier
export const PID_TAG_IPM_TASK_ENTRY_ID                          = 0x36D4; // Tasks folder entry identifier
export const PID_TAG_REMINDERS_ONLINE_ENTRY_ID                  = 0x36D5; // Online reminders folder entry identifier
export const PID_TAG_REMINDERS_OFFLINE_ENTRYID                  = 0x36D6; // Offline reminders folder entry identifier
export const PID_TAG_IPM_DRAFTS_ENTRY_ID                        = 0x36D7; // Drafts entry identifier
export const PID_TAG_ADDITIONAL_REN_ENTRY_IDS                   = 0x36D8; // Additional REN folder entry identifiers
export const PID_TAG_ADDITIONAL_REN_ENTRY_IDS_EX                = 0x36D9; // Additional REN folder entry identifiers
export const PID_TAG_EXTENDED_FOLDER_FLAGS                      = 0x36DA; // Extended folder flags
export const PID_TAG_FOLDER_WEB_VIEW_INFO                       = 0x36DF; // Folder web view information
export const PID_TAG_FOLDER_XVIEWINFO_E                         = 0x36E0;
export const PID_TAG_FOLDER_VIEWS_ONLY                          = 0x36E1;
export const PID_TAG_ORDINAL_MOST                               = 0x36E2; // Task ordinal maximum
export const PID_TAG_FREE_BUSY_ENTRY_IDS                        = 0x36E4; // Free busy entry identifiers
export const PID_TAG_DEF_MSG_CLASS                              = 0x36E5;
export const PID_TAG_DEF_FORM_NAME                              = 0x36E6;
export const PID_TAG_GENERATE_EXCHANGE_VIEWS                    = 0x36E9;
export const PID_TAG_FOLDER_VIEWLIST                            = 0x36EB; // Folder view list
export const PID_TAG_AGING_PERIOD                               = 0x36EC; // Aging period
export const PID_TAG_AGING_GRANULARITY                          = 0x36EE; // Aging period granularity

export const PID_TAG_ATTACHMENT_X400_PARAMETERS                 = 0x3700; // Attachment transmission parameters
export const PID_TAG_ATTACH_DATA_OBJECT                         = 0x3701; // Attachment object
export const PID_TAG_ATTACH_DATA_BINARY                         = 0x3701; // Attachment binary data
export const PID_TAG_ATTACH_ENCODING                            = 0x3702; // Attachment encoding
export const PID_TAG_ATTACH_EXTENSION                           = 0x3703; // Attachment extension
export const PID_TAG_ATTACH_FILENAME                            = 0x3704; // Attachment (short) filename
export const PID_TAG_ATTACH_METHOD                              = 0x3705; // Attachment method
export const PID_TAG_ATTACH_LONG_FILENAME                       = 0x3707; // Attachment long filename
export const PID_TAG_ATTACH_PATHNAME                            = 0x3708; // Attachment (short) pathname
export const PID_TAG_ATTACH_RENDERING                           = 0x3709; // Attachment rendering information
export const PID_TAG_ATTACH_TAG                                 = 0x370A; // Attachment application tag
export const PID_TAG_RENDERING_POSITION                         = 0x370B; // Attachment rendering offset
export const PID_TAG_ATTACH_TRANSPORT_NAME                      = 0x370C; // Attachment TNEF transport name
export const PID_TAG_ATTACH_LONG_PATHNAME                       = 0x370D; // Attachment long pathname
export const PID_TAG_ATTACH_MIME_TAG                            = 0x370E; // Attachment MIME type
export const PID_TAG_ATTACH_ADDITIONAL_INFORMATION              = 0x370F; // Attachment encoding information
export const PID_TAG_ATTACH_MIME_SEQUENCE                       = 0x3710; // Attachment MIME sequence number
export const PID_TAG_ATTACH_CONTENT_BASE                        = 0x3711; // Attachment MIME content base header URI
export const PID_TAG_ATTACH_CONTENT_ID                          = 0x3712; // Attachment MIME content identifier header
export const PID_TAG_ATTACH_CONTENT_LOCATION                    = 0x3713; // Attachment MIME content location header
export const PID_TAG_ATTACH_FLAGS                               = 0x3714; // Attachment flags
export const PID_TAG_ATTACH_CONTENT_DISPOSITION                 = 0x3716;
export const PID_TAG_ATTACH_PAYLOAD_PROVIDER_GUID_STRING        = 0x3719; // Attachment MIME X-Payload-Provider-Guid header
export const PID_TAG_ATTACH_PAYLOAD_CLASS                       = 0x371A; // Attachment MIME X-Payload-Class header
export const PID_TAG_TEXT_ATTACHMENT_CHARSET                    = 0x371B; // Attachment character set
export const PID_TAG_SYNCEVENT_SUPPRESS_GUID                    = 0x3880;

// 0x3900 – 0x39ff Address book properties

// Icon Display Type
// Values:
// 0x0100 0000  Folder
// 0x0200 0000  Folder Link
// 0x0400 0000  Folder Special
export const PID_TAG_DISPLAY_TYPE                               = 0x3900; // Icon display type
export const PID_TAG_TEMPLATEID                                 = 0x3902; // Service provider template entry identifier
export const PID_TAG_PRIMARY_CAPABILITY                         = 0x3904; // Primary capability
export const PID_TAG_DISPLAY_TYPE_EX                            = 0x3905; // Extended icon display type
export const PID_TAG_SMTP_ADDRESS                               = 0x39FE; // SMTP address
export const PID_TAG_BIT_DISPLAY_NAME                           = 0x39FF; // Messaging username

export const PID_TAG_ACCOUNT                                    = 0x3A00; // Recipient account name
export const PID_TAG_ALTERNATE_RECIPIENT                        = 0x3A01; // Alternate recipient entry identifiers
export const PID_TAG_CALLBACK_TELEPHONE_NUMBER                  = 0x3A02; // Callback telephone number
export const PID_TAG_CONVERSION_PROHIBITED                      = 0x3A03; // Conversation prohibited
export const PID_TAG_DISCLOSE_RECIPIENTS                        = 0x3A04; // Disclose recipient
export const PID_TAG_GENERATION                                 = 0x3A05; // Generational abbreviation
export const PID_TAG_GIVEN_NAME                                 = 0x3A06; // Given name
export const PID_TAG_GOVERNMENT_ID_NUMBER                       = 0x3A07; // Government identifier
export const PID_TAG_BUSINESS_TELEPHONE_NUMBER                  = 0x3A08; // Business (office) phone number
export const PID_TAG_HOME_TELEPHONE_NUMBER                      = 0x3A09; // Home phone number
export const PID_TAG_INITIALS                                   = 0x3A0A; // Initials
export const PID_TAG_KEYWORD                                    = 0x3A0B; // Recipient identification keyword
export const PID_TAG_LANGUAGE                                   = 0x3A0C; // Language
export const PID_TAG_LOCATION                                   = 0x3A0D; // Location
export const PID_TAG_MAIL_PERMISSION                            = 0x3A0E; // Permitted to send/receive messaged
export const PID_TAG_MESSAGE_HANDLING_SYSTEM_COMMON_NAME        = 0x3A0F; // Message handling system (MHS) common name
export const PID_TAG_ORGANIZATIONAL_ID_NUMBER                   = 0x3A10; // Organizational identification number
export const PID_TAG_SURNAME                                    = 0x3A11; // Surname
export const PID_TAG_ORIGINAL_ENTRY_ID                          = 0x3A12; // Original entry identifier
export const PID_TAG_ORIGINAL_DISPLAY_NAME                      = 0x3A13; // Original display name
export const PID_TAG_ORIGINAL_SEARCH_KEY                        = 0x3A14; // Original search key
export const PID_TAG_POSTAL_ADDRESS                             = 0x3A15; // Postal address
export const PID_TAG_COMPANY_NAME                               = 0x3A16; // Company name
export const PID_TAG_TITLE                                      = 0x3A17; // Job title
export const PID_TAG_DEPARTMENT_NAME                            = 0x3A18; // Department name
export const PID_TAG_OFFICE_LOCATION                            = 0x3A19; // Office location
export const PID_TAG_PRIMARY_TELEPHONE_NUMBER                   = 0x3A1A; // Primary phone number
export const PID_TAG_SECONDARY_BUSINESS_TELEPHONE_NUMBER        = 0x3A1B; // Secondary business (office) phone number
export const PID_TAG_MOBILE_TELEPHONE_NUMBER                    = 0x3A1C; // Mobile phone number
export const PID_TAG_RADIO_TELEPHONE_NUMBER                     = 0x3A1D; // Radio phone number
export const PID_TAG_CAR_TELEPHONE_NUMBER                       = 0x3A1E; // Car phone number
export const PID_TAG_OTHER_TELEPHONE_NUMBER                     = 0x3A1F; // Alternate telephone number
export const PID_TAG_TRANSMITTABLE_DISPLAY_NAME                 = 0x3A20; // Transmittable display name
export const PID_TAG_PAGER_TELEPHONE_NUMBER                     = 0x3A21; // Pager phone number
export const PID_TAG_USER_CERTIFICATE                           = 0x3A22; // User certificate
export const PID_TAG_PRIMARY_FAX_NUMBER                         = 0x3A23; // Primary fax number
export const PID_TAG_BUSINESS_FAX_NUMBER                        = 0x3A24; // Business (office) fax number
export const PID_TAG_HOME_FAX_NUMBER                            = 0x3A25; // Home fax number
export const PID_TAG_COUNTRY                                    = 0x3A26; // Country
export const PID_TAG_LOCALITY                                   = 0x3A27; // Locality (town or city)
export const PID_TAG_STATE_OR_PROVINCE                          = 0x3A28; // State or province
export const PID_TAG_STREET_ADDRESS                             = 0x3A29; // Street
export const PID_TAG_POSTAL_CODE                                = 0x3A2A; // Postal code
export const PID_TAG_POST_OFFICE_BOX                            = 0x3A2B; // Post office box
export const PID_TAG_TELEX_NUMBER                               = 0x3A2C; // Telex number
export const PID_TAG_ISDN_NUMBER                                = 0x3A2D; // ISDN number
export const PID_TAG_ASSISTANT_TELEPHONE_NUMBER                 = 0x3A2E; // Assistant phone number
export const PID_TAG_SECONDARY_HOME_TELEPHONE_NUMBER            = 0x3A2F; // Secondary home phone number
export const PID_TAG_ASSISTANT                                  = 0x3A30; // Assistant name
export const PID_TAG_SEND_RICH_INFO                             = 0x3A40; // Can receive rich text (RTF, OLE)
export const PID_TAG_WEDDING_ANNIVERSARY                        = 0x3A41; // Wedding anniversary
export const PID_TAG_BIRTHDAY                                   = 0x3A42; // Brithday
export const PID_TAG_HOBBIES                                    = 0x3A43; // Hobbies
export const PID_TAG_MIDDLE_NAME                                = 0x3A44; // Middle name(s)
export const PID_TAG_DISPLAY_NAME_PREFIX                        = 0x3A45; // Display name prefix
export const PID_TAG_PROFESSION                                 = 0x3A46; // Profession
export const PID_TAG_PREFERRED_BY_NAME                          = 0x3A47; // Preferred name
export const PID_TAG_SPOUSE_NAME                                = 0x3A48; // Name spouse
export const PID_TAG_COMPUTER_NETWORK_NAME                      = 0x3A49; // Computer network name
export const PID_TAG_CUSTOMER_ID                                = 0x3A4A; // Customer identifier
export const PID_TAG_TTY_TDD_PHONE_NUMBER                       = 0x3A4B; // Text telephone (TTY) or telecommunication device for the deaf (TDD) phone number
export const PID_TAG_FTP_SITE                                   = 0x3A4C; // FTP site
export const PID_TAG_GENDER                                     = 0x3A4D; // Gender
export const PID_TAG_MANAGER_NAME                               = 0x3A4E; // Name manager
export const PID_TAG_NICKNAME                                   = 0x3A4F; // Nickname
export const PID_TAG_PERSONAL_HOME_PAGE                         = 0x3A50; // Personal home page
export const PID_TAG_BUSINESS_HOME_PAGE                         = 0x3A51; // Business home page
export const PID_TAG_CONTACT_VERSION                            = 0x3A52; // Contact version
export const PID_TAG_CONTACT_ENTRYIDS                           = 0x3A53; // Contact entry identifiers
export const PID_TAG_CONTACT_ADDRESS_TYPES                      = 0x3A54; // Contact address types
export const PID_TAG_CONTACT_DEFAULT_ADDRESS_INDEX              = 0x3A55; // Contact default address index
export const PID_TAG_CONTACT_EMAIL_ADDRESSES                    = 0x3A56; // Contact email addresses
export const PID_TAG_COMPANY_MAIN_TELEPHONE_NUMBER              = 0x3A57; // Company main phone number
export const PID_TAG_CHILDRENS_NAMES                            = 0x3A58; // Name(s) of children
export const PID_TAG_HOME_ADDRESS_CITY                          = 0x3A59; // City of home address
export const PID_TAG_HOME_ADDRESS_COUNTRY                       = 0x3A5A; // Country of home address
export const PID_TAG_HOME_ADDRESS_POSTAL_CODE                   = 0x3A5B; // Postal code of home address
export const PID_TAG_HOME_ADDRESS_STATE_OR_PROVINCE             = 0x3A5C; // State or province of home address
export const PID_TAG_HOME_ADDRESS_STREET                        = 0x3A5D; // Street of home address
export const PID_TAG_HOME_ADDRESS_POST_OFFICE_BOX               = 0x3A5E; // Post office box of home address
export const PID_TAG_OTHER_ADDRESS_CITY                         = 0x3A5F; // City of other address
export const PID_TAG_OTHER_ADDRESS_COUNTRY                      = 0x3A60; // Country of other address
export const PID_TAG_OTHER_ADDRESS_POSTAL_CODE                  = 0x3A61; // Postal code of other address
export const PID_TAG_OTHER_ADDRESS_STATE_OR_PROVINCE            = 0x3A62; // State or province of other address
export const PID_TAG_OTHER_ADDRESS_STREET                       = 0x3A63; // Street of other address
export const PID_TAG_OTHER_ADDRESS_POST_OFFICE_BOX              = 0x3A64; // Post office box of other address
export const PID_TAG_USER_X_CERTIFICATE                         = 0x3A70; // User X.509 certificate
export const PID_TAG_SEND_INTERNET_ENCODING                     = 0x3A71; // Message encoding preference flags
export const PID_TAG_STORE_PROVIDERS                            = 0x3D00;
export const PID_TAG_AB_PROVIDERS                               = 0x3D01;
export const PID_TAG_TRANSPORT_PROVIDERS                        = 0x3D02;
export const PID_TAG_DEFAULT_PROFILE                            = 0x3D04;
export const PID_TAG_AB_SEARCH_PATH                             = 0x3D05;
export const PID_TAG_AB_DEFAULT_DIR                             = 0x3D06;
export const PID_TAG_AB_DEFAULT_PAB                             = 0x3D07;
export const PID_TAG_FILTERING_HOOKS                            = 0x3D08;
export const PID_TAG_SERVICE_NAME                               = 0x3D09;
export const PID_TAG_SERVICE_DLL_NAME                           = 0x3D0A;
export const PID_TAG_SERVICE_ENTRY_NAME                         = 0x3D0B;
export const PID_TAG_SERVICE_UID                                = 0x3D0C;
export const PID_TAG_SERVICE_EXTRA_UIDS                         = 0x3D0D;
export const PID_TAG_SERVICES                                   = 0x3D0E;
export const PID_TAG_SERVICE_SUPPORT_FILES                      = 0x3D0F;
export const PID_TAG_SERVICE_DELETE_FILES                       = 0x3D10;
export const PID_TAG_AB_SEARCH_PATH_UPDATE                      = 0x3D11;
export const PID_TAG_PROFILE_NAME                               = 0x3D12;
export const PID_TAG_SERVICE_INSTALL_ID                         = 0x3D13;
export const PID_TAG_ADMIN_NTSD                                         = 0x3D21; // Administrator permissions (NT security descriptor)
export const PID_TAG_IDENTITY_DISPLAY                           = 0x3E00;
export const PID_TAG_IDENTITY_ENTRYID                           = 0x3E01;
export const PID_TAG_RESOURCE_METHODS                           = 0x3E02;
export const PID_TAG_RESOURCE_TYPE                              = 0x3E03;
export const PID_TAG_STATUS_CODE                                = 0x3E04;
export const PID_TAG_IDENTITY_SEARCH_KEY                        = 0x3E05;
export const PID_TAG_OWN_STORE_ENTRYID                          = 0x3E06;
export const PID_TAG_RESOURCE_PATH                              = 0x3E07;
export const PID_TAG_STATUS_STRING                              = 0x3E08;
export const PID_TAG_X400_DEFERRED_DELIVERY_CANCEL              = 0x3E09;
export const PID_TAG_HEADER_FOLDER_ENTRYID                      = 0x3E0A;
export const PID_TAG_REMOTE_PROGRESS                            = 0x3E0B;
export const PID_TAG_REMOTE_PROGRESS_TEXT                       = 0x3E0C;
export const PID_TAG_REMOTE_VALIDATE_OK                         = 0x3E0D;
export const PID_TAG_CONTROL_FLAGS                              = 0x3F00; // Dialog box control behavior flags
export const PID_TAG_CONTROL_STRUCTURE                          = 0x3F01; // Dialog box control structure
export const PID_TAG_CONTROL_TYPE                               = 0x3F02; // Dialog box control type
export const PID_TAG_DELTAX                                     = 0x3F03; // Dialog box control width
export const PID_TAG_DELTAY                                     = 0x3F04; // Dialog box control height
export const PID_TAG_XPOS                                       = 0x3F05; // Dialog box control left x coordinate
export const PID_TAG_YPOS                                       = 0x3F06; // Dialog box control upper y coordinate
export const PID_TAG_CONTROL_ID                                 = 0x3F07; // Dialog box control identifier
export const PID_TAG_INITIAL_DETAILS_PANE                       = 0x3F08; // Initial property page
export const PID_TAG_DID                                        = 0x3F80;
export const PID_TAG_SEQID                                      = 0x3F81;
export const PID_TAG_DRAFTID                                    = 0x3F82;
export const PID_TAG_CHECK_IN_TIME                              = 0x3F83;
export const PID_TAG_CHECK_IN_COMMENT                           = 0x3F84;
export const PID_TAG_VERSION_OP_CODE                            = 0x3F85;
export const PID_TAG_VERSION_OP_DATA                            = 0x3F86;
export const PID_TAG_VERSION_SEQUENCE_NUMBER                    = 0x3F87;
export const PID_TAG_ATTACH_ID                                  = 0x3F88;
export const PID_TAG_PKM_DOC_STATUS                             = 0x3F8D;
export const PID_TAG_MV_PKM_OPERATION_REQ                       = 0x3F8E;
export const PID_TAG_PKM_DOC_INTERNAL_STATE                     = 0x3F8F;
export const PID_TAG_VERSIONING_FLAGS                           = 0x3F90;
export const PID_TAG_PKM_LAST_UNAPPROVED_VID                    = 0x3F91;
export const PID_TAG_MV_PKM_VERSION_LABELS                      = 0x3F92;
export const PID_TAG_MV_PKM_VERSION_STATUS                      = 0x3F93;
export const PID_TAG_PKM_INTERNAL_DATA                          = 0x3F94;
export const PID_TAG_LAST_CONFLICT                              = 0x3FC9;
export const PID_TAG_CONFLICT_MSG_KEY                           = 0x3FCA;
export const PID_TAG_REPL_HEADER                                = 0x3FD0;
export const PID_TAG_REPL_STATUS                                = 0x3FD1;
export const PID_TAG_REPL_CHANGES                               = 0x3FD2;
export const PID_TAG_REPL_RGM                                   = 0x3FD3;
export const PID_TAG_RMI                                        = 0x3FD4;
export const PID_TAG_INTERNAL_POST_REPLY                        = 0x3FD5;
export const PID_TAG_NTSD_MODIFICATION_TIME                     = 0x3FD6;
export const PID_TAG_PREVIEW_UNREAD                             = 0x3FD8;
export const PID_TAG_PREVIEW                                    = 0x3FD9;
export const PID_TAG_ABSTRACT                                   = 0x3FDA;
export const PID_TAG_DL_REPORT_FLAGS                            = 0x3FDB;
export const PID_TAG_BILATERAL_INFO                             = 0x3FDC;
export const PID_TAG_MSG_BODY_ID                                = 0x3FDD;
export const PID_TAG_INTERNET_CODEPAGE                          = 0x3FDE; // Message body codepage
export const PID_TAG_AUTO_RESPONSE_SUPPRESS                     = 0x3FDF; // Suppress auto response
export const PID_TAG_ACL_TABLE                                  = 0x3FE0; // Access control list table object
export const PID_TAG_ACL_DATA                                   = 0x3FE0; // Access control list data
export const PID_TAG_RULES_TABLE                                = 0x3FE1; // Folder rules table object
export const PID_TAG_RULES_DATA                                 = 0x3FE1; // Folder rules table data
export const PID_TAG_FOLDER_DESIGN_FLAGS                        = 0x3FE2;
export const PID_TAG_DELEGATED_BY_RULE                          = 0x3FE3;
export const PID_TAG_DESIGN_IN_PROGRESS                         = 0x3FE4;
export const PID_TAG_SECURE_ORIGINATION                         = 0x3FE5;
export const PID_TAG_PUBLISH_IN_ADDRESS_BOOK                    = 0x3FE6;
export const PID_TAG_RESOLVE_METHOD                             = 0x3FE7; // Conflict resolution method
export const PID_TAG_ADDRESS_BOOK_DISPLAY_NAME                  = 0x3FE8;
export const PID_TAG_EFORMS_LOCALE_ID                           = 0x3FE9;
export const PID_TAG_HAS_DAMS                                   = 0x3FEA;
export const PID_TAG_DEFERRED_SEND_NUMBER                       = 0x3FEB;
export const PID_TAG_DEFERRED_SEND_UNITS                        = 0x3FEC;
export const PID_TAG_EXPIRY_NUMBER                              = 0x3FED;
export const PID_TAG_EXPIRY_UNITS                               = 0x3FEE;
export const PID_TAG_DEFERRED_SEND_TIME                         = 0x3FEF;
export const PID_TAG_CONFLICT_ENTRY_ID                          = 0x3FF0; // Conflict entry identifier
export const PID_TAG_MESSAGE_LOCALE_ID                          = 0x3FF1; // Message locale identifier
export const PID_TAG_RULE_TRIGGER_HISTORY                       = 0x3FF2;
export const PID_TAG_MOVE_TO_STORE_ENTRYID                      = 0x3FF3;
export const PID_TAG_MOVE_TO_FOLDER_ENTRYID                     = 0x3FF4;
export const PID_TAG_STORAGE_QUOTA_LIMIT                        = 0x3FF5;
export const PID_TAG_EXCESS_STORAGE_USED                        = 0x3FF6;
export const PID_TAG_SVR_GENERATING_QUOTA_MSG                   = 0x3FF7;
export const PID_TAG_CREATOR_NAME                               = 0x3FF8; // Creator name
export const PID_TAG_CREATOR_ENTRYID                            = 0x3FF9; // Creator entry identifier
export const PID_TAG_LAST_MODIFIER_NAME                         = 0x3FFA; // Last modifier name
export const PID_TAG_LAST_MODIFIER_ENTRYID                      = 0x3FFB; // Last modifier entry identifier
export const PID_TAG_REPLY_RECIPIENT_SMTP_PROXIES               = 0x3FFC;
export const PID_TAG_MESSAGE_CODEPAGE                           = 0x3FFD; // Message codepage
export const PID_TAG_EXTENDED_ACL_DATA                          = 0x3FFE;
export const PID_TAG_FROM_I_HAVE                                = 0x3FFF;

// 0x4000 – 0x57ff Message envelope properties
export const PID_TAG_NEW_ATTACH                                 = 0x4000;
export const PID_TAG_START_EMBED                                = 0x4001;
export const PID_TAG_END_EMBED                                  = 0x4002;
export const PID_TAG_START_RECIP                                = 0x4003;
export const PID_TAG_END_RECIP                                  = 0x4004;
export const PID_TAG_END_CC_RECIP                               = 0x4005;
export const PID_TAG_END_BCC_RECIP                              = 0x4006;
export const PID_TAG_END_P1_RECIP                               = 0x4007;
export const PID_TAG_START_TOP_FLD                              = 0x4009;
export const PID_TAG_START_SUB_FLD                              = 0x400A;
export const PID_TAG_END_FOLDER                                 = 0x400B;
export const PID_TAG_START_MESSAGE                              = 0x400C;
export const PID_TAG_END_MESSAGE                                = 0x400D;
export const PID_TAG_END_ATTACH                                 = 0x400E;
export const PID_TAG_EC_WARNING                                 = 0x400F;
export const PID_TAG_START_FAI_MSG                              = 0x4010;
export const PID_TAG_NEW_FX_FOLDER                              = 0x4011;
export const PID_TAG_INCR_SYNC_CHG                              = 0x4012;
export const PID_TAG_INCR_SYNC_DEL                              = 0x4013;
export const PID_TAG_INCR_SYNC_END                              = 0x4014;
export const PID_TAG_INCR_SYNC_MSG                              = 0x4015;
export const PID_TAG_FX_DEL_PROP                                = 0x4016;
export const PID_TAG_IDSET_GIVEN                                = 0x4017;
export const PID_TAG_SENDER_FLAGS                               = 0x4019; // Sender flags
export const PID_TAG_SENT_REPRESENTING_FLAGS                    = 0x401A; // Sent representing flags
export const PID_TAG_RCVD_BY_FLAGS                              = 0x401B; // Received by flags
export const PID_TAG_RCVD_REPRESENTING_FLAGS                    = 0x401C; // Received representing flags
export const PID_TAG_ORIGINAL_SENDER_FLAGS                      = 0x401D; // Original sender flags
export const PID_TAG_ORIGINAL_SENT_REPRESENTING_FLAGS           = 0x401E; // Original sent representing flags
export const PID_TAG_REPORT_FLAGS                               = 0x401F;
export const PID_TAG_READ_RECEIPT_FLAGS                         = 0x4020;
export const PID_TAG_SOFT_DELETES                               = 0x4021;
export const PID_TAG_CREATOR_ADDRESS_TYPE                       = 0x4022;
export const PID_TAG_CREATOR_EMAIL_ADDRESS                      = 0x4023;
export const PID_TAG_MESSAGE_SUBMISSION_ID_FROM_CLIENT          = 0x402C;
export const PID_TAG_SENDER_SIMPLE_DISP_NAME                    = 0x4030;
export const PID_TAG_SENT_REPRESENTING_SIMPLE_DISP_NAME         = 0x4031;
export const PID_TAG_RECEIVED_REPRESENTING_SIMPLE_DISP_NAME     = 0x4035;
export const PID_TAG_CREATOR_SIMPLE_DISP_NAME                   = 0x4038;
export const PID_TAG_LAST_MODIFIER_SIMPLE_DISP_NAME             = 0x4039;
export const PID_TAG_ORG_ADDR_TYPE                              = 0x403D; // Original address type
export const PID_TAG_ORG_EMAIL_ADDR                             = 0x403E; // Original e-mail address
export const PID_TAG_CREATOR_FLAGS                              = 0x4059;
export const PID_TAG_MODIFIER_FLAGS                             = 0x405A;
export const PID_TAG_ORIGINATOR_FLAGS                           = 0x405B;
export const PID_TAG_REPORT_DESTINATION_FLAGS                   = 0x405C;
export const PID_TAG_ORIGINAL_AUTHOR_FLAGS                      = 0x405D; // Original author flags
export const PID_TAG_ORIGINATOR_SEARCH_KEY                      = 0x4061;
export const PID_TAG_REPORT_DESTINATION_SEARCH_KEY              = 0x4064;
export const PID_TAG_ER_FLAG                                    = 0x4065;
export const PID_TAG_INTERNET_SUBJECT                           = 0x4068;
export const PID_TAG_INTERNET_SENT_REPRESENTING_NAME            = 0x4069;
export const PID_TAG_CONTENT_FILTER_SCL                         = 0x4076;
export const PID_TAG_HIER_REV                                   = 0x4082;
export const PID_TAG_CONTENT_FILTER_PHISHING_CONFIDENCE_LEVEL   = 0x4084;

// 0x5800 – 0x5fff Recipient properties
export const PID_TAG_INET_MAIL_OVERRIDE_FORMAT                  = 0x5902;
export const PID_TAG_MESSAGE_EDITOR_FORMAT                      = 0x5909; // Message editor format
export const PID_TAG_SENDER_SMTP_ADDRESS                        = 0x5D01;
export const PID_TAG_SENT_REPRESENTING_SMTP_ADDRESS             = 0x5D02;
export const PID_TAG_RECEIVED_BY_SMTP_ADDRESS                   = 0x5D07;
export const PID_TAG_RECEIVED_REPRESENTING_SMTP_ADDRESS         = 0x5D08;
export const PID_TAG_CREATOR_SMTP_ADDRESS                       = 0x5D0A;
export const PID_TAG_LAST_MODIFIER_SMTP_ADDRESS                 = 0x5D0B;
export const PID_TAG_RECIPIENT_DISPLAY_NAME                     = 0x5FF6;
export const PID_TAG_RECIPIENT_ENTRYID                          = 0x5FF7;
export const PID_TAG_RECIPIENT_TRACKSTATUS_ME                   = 0x5FFB;
export const PID_TAG_RECIPIENTS_FLAGS                           = 0x5FFD;
export const PID_TAG_RECIPIENT_TRACKSTATUS                      = 0x5FFF;

// 0x6000 - 0x65ff Non-transmittable message properties
export const PID_TAG_DOTSTUFF_STATE                             = 0x6001;
export const PID_TAG_RULE_SERVER_RULE_ID                        = 0x65A0;
export const PID_TAG_REPLY_TEMPLATE_ID                          = 0x65C2;
export const PID_TAG_SECURE_SUBMIT_FLAGS                        = 0x65C6; // Secure submit flags
export const PID_TAG_SOURCE_KEY                                 = 0x65E0; // Source key
export const PID_TAG_PARENT_SOURCE_KEY                          = 0x65E1; // Parent source key
export const PID_TAG_CHANGE_KEY                                 = 0x65E2; // Change key
export const PID_TAG_PREDECESSOR_CHANGE_LIST                    = 0x65E3; // Predecessor change list
export const PID_TAG_SYNCHRONIZE_FLAGS                          = 0x65E4;
export const PID_TAG_AUTO_ADD_NEW_SUBS                          = 0x65E5;
export const PID_TAG_NEW_SUBS_GET_AUTO_ADD                      = 0x65E6;
export const PID_TAG_MESSAGE_SITE_NAME                          = 0x65E7;
export const PID_TAG_MESSAGE_PROCESSED                          = 0x65E8;
export const PID_TAG_RULE_MSG_STATE                             = 0x65E9;
export const PID_TAG_RULE_MSG_USER_FLAGS                        = 0x65EA;
export const PID_TAG_RULE_MSG_PROVIDER                          = 0x65EB;
export const PID_TAG_RULE_MSG_NAME                              = 0x65EC;
export const PID_TAG_RULE_MSG_LEVEL                             = 0x65ED;
export const PID_TAG_RULE_MSG_PROVIDER_DATA                     = 0x65EE;
export const PID_TAG_RULE_MSG_ACTIONS                           = 0x65EF;
export const PID_TAG_RULE_MSG_CONDITION                         = 0x65F0;
export const PID_TAG_RULE_MSG_CONDITION_LCID                    = 0x65F1;
export const PID_TAG_RULE_MSG_VERSION                           = 0x65F2;
export const PID_TAG_RULE_MSG_SEQUENCE                          = 0x65F3;
export const PID_TAG_PREVENT_MSG_CREATE                         = 0x65F4;
export const PID_TAG_IMAP_INTERNAL_DATE                         = 0x65F5;

// 0x6600 – 0x67ff Non-transmittable properties
export const PID_TAG_PROFILE_VERSION                            = 0x6600;
export const PID_TAG_PROFILE_CONFIG_FLAGS                       = 0x6601;
export const PID_TAG_PROFILE_HOME_SERVER                        = 0x6602;
export const PID_TAG_PROFILE_USER                               = 0x6603;
export const PID_TAG_PROFILE_CONNECT_FLAGS                      = 0x6604; // Profile connection flags
export const PID_TAG_PROFILE_TRANSPORT_FLAGS                    = 0x6605;
export const PID_TAG_PROFILE_UI_STATE                           = 0x6606;
export const PID_TAG_PROFILE_UNRESOLVED_NAME                    = 0x6607;
export const PID_TAG_PROFILE_UNRESOLVED_SERVER                  = 0x6608;
export const PID_TAG_PROFILE_OPEN_FLAGS                         = 0x6609;
export const PID_TAG_PROFILE_BINDING_ORDER                      = 0x6609;
export const PID_TAG_PROFILE_TYPE                               = 0x660A;
export const PID_TAG_PROFILE_MAILBOX                            = 0x660B;
export const PID_TAG_PROFILE_SERVER                             = 0x660C;
export const PID_TAG_PROFILE_MAX_RESTRICT                       = 0x660D;
export const PID_TAG_PROFILE_AB_FILES_PATH                      = 0x660E;
export const PID_TAG_PROFILE_FAVFLD_DISPLAY_NAME                = 0x660F;
export const PID_TAG_INTERNET_MESSAGE_FORMAT                    = 0x6610;
export const PID_TAG_PROFILE_OFFLINE_STORE_PATH                 = 0x6610;
export const PID_TAG_CONTACT_ADDRESS_BOOK_STORE_SUPPORT_MASK    = 0x6611; // Contact address book store support flags
export const PID_TAG_PROFILE_OFFLINE_INFO                       = 0x6611;
export const PID_TAG_INTERNET_WRAPPING_LENGTH                   = 0x6612;
export const PID_TAG_PROFILE_HOME_SERVER_DN                     = 0x6612;
export const PID_TAG_PROFILE_HOME_SERVER_ADDRS                  = 0x6613;
export const PID_TAG_PROFILE_SERVER_DN                          = 0x6614;
export const PID_TAG_PROFILE_FAVFLD_COMMENT                     = 0x6615;
export const PID_TAG_PROFILE_ALLPUB_DISPLAY_NAME                = 0x6616;
export const PID_TAG_PROFILE_ALLPUB_COMMENT                     = 0x6617;
export const PID_TAG_DISABLE_WINSOCK                            = 0x6618;
export const PID_TAG_IN_TRANSIT                                 = 0x6618;
export const PID_TAG_PROFILE_AUTH_PACKAGE                       = 0x6619;
export const PID_TAG_PST_BODY_PREFIX                            = 0x6619;
export const PID_TAG_USER_ENTRYID                               = 0x6619;
export const PID_TAG_USER_NAME                                  = 0x661A;
export const PID_TAG_MAILBOX_OWNER_ENTRYID                      = 0x661B;
export const PID_TAG_MAILBOX_OWNER_NAME                         = 0x661C;
export const PID_TAG_PST_BEST_BODY_PROPTAG                      = 0x661D;
export const PID_TAG_OOF_STATE                                  = 0x661D;
export const PID_TAG_SCHEDULE_FOLDER_ENTRYID                    = 0x661E;
export const PID_TAG_IPM_DAF_ENTRYID                            = 0x661F;
export const PID_TAG_NON_IPM_SUBTREE_ENTRY_ID                   = 0x6620; // Non-IPM subtree entry identifier
export const PID_TAG_CONTACT_ADDRESS_BOOK_FOLDER_ENTRY_IDS      = 0x6620; // Contact address book entry identifiers
export const PID_TAG_EFORMS_REGISTRY_ENTRYID                    = 0x6621;
export const PID_TAG_CONTACT_ADDRESS_BOOK_STORE_SUPPORT_MASKS   = 0x6621; // Contact address book store support flags
export const PID_TAG_SPLUS_FREE_BUSY_ENTRYID                    = 0x6622;
export const PID_TAG_ROH_FLAGS                                  = 0x6623; // RPC over HTTP flags
export const PID_TAG_HIERARCHY_SERVER                           = 0x6623;
export const PID_TAG_OFFLINE_ADDRBOOK_ENTRYID                   = 0x6623;
export const PID_TAG_EFORMS_FOR_LOCALE_ENTRYID                  = 0x6624;
export const PID_TAG_FREE_BUSY_FOR_LOCAL_SITE_ENTRYID           = 0x6625;
export const PID_TAG_ADDRBOOK_FOR_LOCAL_SITE_ENTRYID            = 0x6626;
export const PID_TAG_ROH_PROXY_AUTH_SCHEME                      = 0x6627; // RPC over HTTP proxy authentication scheme
export const PID_TAG_OFFLINE_MESSAGE_ENTRYID                    = 0x6627;
export const PID_TAG_GW_MTSIN_ENTRYID                           = 0x6628;
export const PID_TAG_GW_MTSOUT_ENTRYID                          = 0x6629;
export const PID_TAG_TRANSFER_ENABLED                           = 0x662A;
export const PID_TAG_TEST_LINE_SPEED                            = 0x662B;
export const PID_TAG_HIERARCHY_SYNCHRONIZER                     = 0x662C;
export const PID_TAG_CONTENTS_SYNCHRONIZER                      = 0x662D;
export const PID_TAG_COLLECTOR                                  = 0x662E;
export const PID_TAG_FAST_TRANSFER                              = 0x662F;
export const PID_TAG_IPM_FAVORITES_ENTRYID                      = 0x6630;
export const PID_TAG_IPM_PUBLIC_FOLDERS_ENTRYID                 = 0x6631;
export const PID_TAG_STORE_OFFLINE                              = 0x6632;
export const PID_TAG_PST_LRNORESTRICTIONS                       = 0x6633;
export const PID_TAG_CHANGE_ADVISOR                             = 0x6634;
export const PID_TAG_PST_HIDDEN_COUNT                           = 0x6635; // Number of hidden items
export const PID_TAG_FAVORITES_DEFAULT_NAME                     = 0x6635;
export const PID_TAG_PST_HIDDEN_UNREAD                          = 0x6636; // Number of unread hidden items
export const PID_TAG_SYS_CONFIG_FOLDER_ENTRYID                  = 0x6636;
export const PID_TAG_CHANGE_NOTIFICATION_GUID                   = 0x6637;
export const PID_TAG_FOLDER_CHILD_COUNT                         = 0x6638; // Number of sub folders
export const PID_TAG_RIGHTS                                     = 0x6639;
export const PID_TAG_HAS_RULES                                  = 0x663A; // Has email rules
export const PID_TAG_ADDRESS_BOOK_ENTRY_ID                      = 0x663B; // Address book entry identifier
export const PID_TAG_PUBLIC_FOLDER_ENTRYID                      = 0x663C;
export const PID_TAG_OFFLINE_FLAGS                              = 0x663D;
export const PID_TAG_HIERARCHY_CHANGE_NUMBER                    = 0x663E; // Hierarchy change number
export const PID_TAG_HAS_MODERATOR_RULES                        = 0x663F;
export const PID_TAG_DELETED_MSG_COUNT                          = 0x6640;
export const PID_TAG_DELETED_FOLDER_COUNT                       = 0x6641;
export const PID_TAG_OLDEST_DELETED_ON                          = 0x6642;
export const PID_TAG_DELETED_ASSOC_MSG_COUNT                    = 0x6643;
export const PID_TAG_REPLICA_SERVER                             = 0x6644;
export const PID_TAG_CLIENT_ACTIONS                             = 0x6645;
export const PID_TAG_DAM_ORIGINAL_ENTRYID                       = 0x6646;
export const PID_TAG_DAM_BACK_PATCHED                           = 0x6647;
export const PID_TAG_RULE_ERROR                                 = 0x6648;
export const PID_TAG_RULE_ACTION_TYPE                           = 0x6649;
export const PID_TAG_HAS_NAMED_PROPERTIES                       = 0x664A;
export const PID_TAG_REPLICA_VERSION                            = 0x664B;
export const PID_TAG_RULE_ACTION_NUMBER                         = 0x6650;
export const PID_TAG_RULE_FOLDER_ENTRYID                        = 0x6651;
export const PID_TAG_ACTIVE_USER_ENTRYID                        = 0x6652;
export const PID_TAG_0X400_ENVELOPE_TYPE                        = 0x6653;
export const PID_TAG_MSG_FOLD_TIME                              = 0x6654;
export const PID_TAG_ICS_CHANGE_KEY                             = 0x6655;
export const PID_TAG_GW_ADMIN_OPERATIONS                        = 0x6658;
export const PID_TAG_INTERNET_CONTENT                           = 0x6659;
export const PID_TAG_HAS_ATTACH_FROM_IMAIL                      = 0x665A;
export const PID_TAG_ORIGINATOR_NAME                            = 0x665B;
export const PID_TAG_ORIGINATOR_ADDR                            = 0x665C;
export const PID_TAG_ORIGINATOR_ADDRTYPE                        = 0x665D;
export const PID_TAG_ORIGINATOR_ENTRYID                         = 0x665E;
export const PID_TAG_ARRIVAL_TIME                               = 0x665F;
export const PID_TAG_TRACE_INFO                                 = 0x6660;
export const PID_TAG_SUBJECT_TRACE_INFO                         = 0x6661;
export const PID_TAG_RECIPIENT_NUMBER                           = 0x6662;
export const PID_TAG_MTS_SUBJECT_ID                             = 0x6663;
export const PID_TAG_REPORT_DESTINATION_NAME                    = 0x6664;
export const PID_TAG_REPORT_DESTINATION_ENTRYID                 = 0x6665;
export const PID_TAG_CONTENT_SEARCH_KEY                         = 0x6666;
export const PID_TAG_FOREIGN_ID                                 = 0x6667;
export const PID_TAG_FOREIGN_REPORT_ID                          = 0x6668;
export const PID_TAG_FOREIGN_SUBJECT_ID                         = 0x6669;
export const PID_TAG_INTERNAL_TRACE_INFO                        = 0x666A;
export const PID_TAG_IN_CONFLICT                                = 0x666C;
export const PID_TAG_LONGTERM_ENTRYID_FROM_TABLE                = 0x6670;
export const PID_TAG_MEMBER_ID                                  = 0x6671;
export const PID_TAG_MEMBER_NAME                                = 0x6672;
export const PID_TAG_MEMBER_RIGHTS                              = 0x6673;
export const PID_TAG_RULE_ID                                    = 0x6674;
export const PID_TAG_RULE_IDS                                   = 0x6675;
export const PID_TAG_RULE_SEQUENCE                              = 0x6676;
export const PID_TAG_RULE_STATE                                 = 0x6677;
export const PID_TAG_RULE_USER_FLAGS                            = 0x6678;
export const PID_TAG_RULE_CONDITION                             = 0x6679;
export const PID_TAG_PROFILE_MOAB                               = 0x667B;
export const PID_TAG_PROFILE_MOAB_GUID                          = 0x667C;
export const PID_TAG_PROFILE_MOAB_SEQ                           = 0x667D;
export const PID_TAG_IMPLIED_RESTRICTIONS                       = 0x667F;
export const PID_TAG_RULE_ACTIONS                               = 0x6680;
export const PID_TAG_RULE_PROVIDER                              = 0x6681;
export const PID_TAG_RULE_NAME                                  = 0x6682;
export const PID_TAG_RULE_LEVEL                                 = 0x6683;
export const PID_TAG_RULE_PROVIDER_DATA                         = 0x6684;
export const PID_TAG_LAST_FULL_BACKUP                           = 0x6685;
export const PID_TAG_PROFILE_ADDR_INFO                          = 0x6687;
export const PID_TAG_PROFILE_OPTIONS_DATA                       = 0x6689;
export const PID_TAG_EVENTS_ROOT_FOLDER_ENTRYID                 = 0x668A;
export const PID_TAG_INBOUND_NEWSFEED_DN                        = 0x668D;
export const PID_TAG_OUTBOUND_NEWSFEED_DN                       = 0x668E;
export const PID_TAG_DELETED_ON                                 = 0x668F; // Soft-deletion time
export const PID_TAG_REPLICATION_STYLE                          = 0x6690;
export const PID_TAG_REPLICATION_SCHEDULE                       = 0x6691;
export const PID_TAG_REPLICATION_MESSAGE_PRIORITY               = 0x6692;
export const PID_TAG_OVERALL_MSG_AGE_LIMIT                      = 0x6693;
export const PID_TAG_REPLICATION_ALWAYS_INTERVAL                = 0x6694;
export const PID_TAG_REPLICATION_MSG_SIZE                       = 0x6695;
export const PID_TAG_IS_NEWSGROUP_ANCHOR                        = 0x6696;
export const PID_TAG_IS_NEWSGROUP                               = 0x6697;
export const PID_TAG_REPLICA_LIST                               = 0x6698;
export const PID_TAG_OVERALL_AGE_LIMIT                          = 0x6699;
export const PID_TAG_INTERNET_CHARSET                           = 0x669A;
export const PID_TAG_DELETED_MESSAGE_SIZE_EXTENDED              = 0x669B;
export const PID_TAG_DELETED_NORMAL_MESSAGE_SIZE_EXTENDED       = 0x669C;
export const PID_TAG_DELETED_ASSOC_MESSAGE_SIZE_EXTENDED        = 0x669D;
export const PID_TAG_SECURE_IN_SITE                             = 0x669E;
export const PID_TAG_NT_USER_NAME                               = 0x66A0;
export const PID_TAG_LOCALE_ID                                  = 0x66A1;
export const PID_TAG_LAST_LOGON_TIME                            = 0x66A2;
export const PID_TAG_LAST_LOGOFF_TIME                           = 0x66A3;
export const PID_TAG_STORAGE_LIMIT_INFORMATION                  = 0x66A4;
export const PID_TAG_NEWSGROUP_COMPONENT                        = 0x66A5;
export const PID_TAG_NEWSFEED_INFO                              = 0x66A6;
export const PID_TAG_INTERNET_NEWSGROUP_NAME                    = 0x66A7;
export const PID_TAG_FOLDER_FLAGS                               = 0x66A8;
export const PID_TAG_LAST_ACCESS_TIME                           = 0x66A9;
export const PID_TAG_RESTRICTION_COUNT                          = 0x66AA;
export const PID_TAG_CATEG_COUNT                                = 0x66AB;
export const PID_TAG_CACHED_COLUMN_COUNT                        = 0x66AC;
export const PID_TAG_NORMAL_MSG_W_ATTACH_COUNT                  = 0x66AD;
export const PID_TAG_ASSOC_MSG_W_ATTACH_COUNT                   = 0x66AE;
export const PID_TAG_RECIPIENT_ON_NORMAL_MSG_COUNT              = 0x66AF;
export const PID_TAG_RECIPIENT_ON_ASSOC_MSG_COUNT               = 0x66B0;
export const PID_TAG_ATTACH_ON_NORMAL_MSG_COUNT                 = 0x66B1;
export const PID_TAG_ATTACH_ON_ASSOC_MSG_COUNT                  = 0x66B2;
export const PID_TAG_NORMAL_MESSAGE_SIZE                        = 0x66B3;
export const PID_TAG_NORMAL_MESSAGE_SIZE_EXTENDED               = 0x66B3;
export const PID_TAG_ASSOC_MESSAGE_SIZE                         = 0x66B4;
export const PID_TAG_ASSOC_MESSAGE_SIZE_EXTENDED                = 0x66B4;
export const PID_TAG_FOLDER_PATHNAME                            = 0x66B5;
export const PID_TAG_OWNER_COUNT                                = 0x66B6;
export const PID_TAG_CONTACT_COUNT                              = 0x66B7;
export const PID_TAG_CODE_PAGE_ID                               = 0x66C3;
export const PID_TAG_RETENTION_AGE_LIMIT                        = 0x66C4;
export const PID_TAG_DISABLE_PERUSER_READ                       = 0x66C5; // Disable per-user read/unread processing
export const PID_TAG_INTERNET_PARSE_STATE                       = 0x66C6;
export const PID_TAG_INTERNET_MESSAGE_INFO                      = 0x66C7;
export const PID_TAG_LATEST_PST_ENSURE                          = 0x66FA;
export const PID_TAG_PST_PATH                                   = 0x6700;
export const PID_TAG_PST_REMEMBER_PW                            = 0x6701;
export const PID_TAG_OST_ENCRYPTION                             = 0x6702;
export const PID_TAG_PST_PW_SZ_OLD                              = 0x6703;
export const PID_TAG_PST_PW_SZ_NEW                              = 0x6704;
export const PID_TAG_SORT_LOCALE_ID                             = 0x6705;
export const PID_TAG_PST_IMPSUBTREE_DESCENDANT                  = 0x6705;
export const PID_TAG_URL_NAME                                   = 0x6707; // Object URL
export const PID_TAG_LOCAL_COMMIT_TIME                          = 0x6709; // Local commit time
export const PID_TAG_LOCAL_COMMIT_TIME_MAX                      = 0x670A;
export const PID_TAG_DELETED_COUNT_TOTAL                        = 0x670B; // Total deleted item count
export const PID_TAG_AUTO_RESET                                 = 0x670C;
export const PID_TAG_URL_COMP_NAME_HASH                         = 0x6710;
export const PID_TAG_MSG_FOLDER_TEMPLATE_RES_2                  = 0x6711;
export const PID_TAG_RANK                                       = 0x6712;
export const PID_TAG_MSG_FOLDER_TEMPLATE_RES_4                  = 0x6713;
export const PID_TAG_MSG_FOLDER_TEMPLATE_RES_5                  = 0x6714;
export const PID_TAG_MSG_FOLDER_TEMPLATE_RES_6                  = 0x6715;
export const PID_TAG_MSG_FOLDER_TEMPLATE_RES_7                  = 0x6716;
export const PID_TAG_MSG_FOLDER_TEMPLATE_RES_8                  = 0x6717;
export const PID_TAG_MSG_FOLDER_TEMPLATE_RES_9                  = 0x6718;
export const PID_TAG_MSG_FOLDER_TEMPLATE_RES_10                 = 0x6719;
export const PID_TAG_MSG_FOLDER_TEMPLATE_RES_11                 = 0x671A;
export const PID_TAG_MSG_FOLDER_TEMPLATE_RES_12                 = 0x671B;
export const PID_TAG_PF_PLATINUM_HOME_MDB                       = 0x671E;
export const PID_TAG_PF_PROXY_REQUIRED                          = 0x671F;
export const PID_TAG_INTERNET_FREE_DOC_INFO                     = 0x6720;
export const PID_TAG_PF_OVER_HARD_QUOTA_LIMIT                   = 0x6721;
export const PID_TAG_PF_MSG_SIZE_LIMIT                          = 0x6722;
export const PID_TAG_CONNECTION_MODULUS                         = 0x6743;
export const PID_TAG_CONNECTION_MODULUS_EXTENDED                = 0x6743;
export const PID_TAG_DELIVER_TO_DN                              = 0x6744;
export const PID_TAG_MIME_SIZE                                  = 0x6746;
export const PID_TAG_FILE_SIZE_EXTENDED                         = 0x6747;
export const PID_TAG_FOLDER_ID                                  = 0x6748; // Folder identifier
export const PID_TAG_PARENT_FOLDER_ID                           = 0x6749; // Parent folder identifier
export const PID_TAG_MID                                        = 0x674A; // Message identifier
export const PID_TAG_CATEG_ID                                   = 0x674B; // Exchange category identifier
export const PID_TAG_PARENT_CATEG_ID                            = 0x674C; // Exchange parent category identifier
export const PID_TAG_INST_ID                                    = 0x674D;
export const PID_TAG_INSTANCE_NUM                               = 0x674E;
export const PID_TAG_ADDRBOOK_MID                               = 0x674F;
export const PID_TAG_ICS_NOTIF                                  = 0x6750;
export const PID_TAG_ARTICLE_NUM_NEXT                           = 0x6751;
export const PID_TAG_IMAP_LAST_ARTICLE_ID                       = 0x6752;
export const PID_TAG_NOT_822_RENDERABLE                         = 0x6753;
export const PID_TAG_LTID                                       = 0x6758;
export const PID_TAG_CN_EXPORT                                  = 0x6759;
export const PID_TAG_PCL_EXPORT                                 = 0x675A;
export const PID_TAG_CN_MV_EXPORT                               = 0x675B;
export const PID_TAG_PST_CONFIGURATION_FLAGS                    = 0x6770; // Personal storage table configuration flags
export const PID_TAG_PST_SUBTREE_CONTAINER                      = 0x6772;
export const PID_TAG_PF_QUOTA_STYLE                             = 0x6779;
export const PID_TAG_PF_STORAGE_QUOTA                           = 0x677B;
export const PID_TAG_SEARCH_FLAGS                               = 0x6783;
export const PID_TAG_USER_SID                                   = 0x6783;
export const PID_TAG_CNSET_SEEN                                 = 0x6796; // Seen synchronization change number set
export const PID_TAG_CHANGE_NUMBER                              = 0x67A4; // Synchronization change number
export const PID_TAG_ASSOCIATED                                 = 0x67AA;
export const PID_TAG_CNSET_SEEN_FAI                             = 0x67DA; // Seen folder associated information synchronization change number set
export const PID_TAG_PROFILE_SECURE_MAILBOX                     = 0x67F0;
export const PID_TAG_LTP_PARENT_NID                             = 0x67F1; // Parent node identifier
export const PID_TAG_LTP_ROW_ID                                 = 0x67F2; // Row identifier
export const PID_TAG_LTP_ROW_VER                                = 0x67F3; // Row version
export const PRQ_ID_SECURE4                                     = 0x67F4;
export const PID_TAG_PST_PASSWORD                               = 0x67FF; // Password checksum

export const PID_TAG_OFFLINE_ADDRESS_BOOK_NAME                  = 0x6800; // Offline address book name
export const PID_TAG_MAILBEAT_REQUEST_SENT                      = 0x6801;
export const PID_TAG_USENET_SITE_NAME                           = 0x6802;
export const PID_TAG_SEND_OUTLOOK_RECALL_REPORT                 = 0x6803; // Send recall report
export const PID_TAG_MAILBEAT_REQUEST_RECEIVED                  = 0x6803;
export const PID_TAG_MAILBEAT_REQUEST_PROCESSED                 = 0x6804;
export const PID_TAG_SHUTOFFQUOTA                               = 0x6805;
export const PID_TAG_OFFLINE_ADDRESS_BOOK_TRUNCATED_PROPERTIES  = 0x6805; // Offline address book truncated properties
export const PID_TAG_MAILBEAT_REPLY_SENT                        = 0x6806;
export const PID_TAG_MAILBEAT_REPLY_SUBMIT                      = 0x6807;
export const PID_TAG_OFFLINE_ADDRESS_BOOK_FILE_TYPE             = 0x6808; // Offline Address Book file type
export const PID_TAG_MAILBEAT_REPLY_RECEIVED                    = 0x6808;
export const PID_TAG_MAILBEAT_REPLY_PROCESSED                   = 0x6809;
export const PID_TAG_MAPI_FORM_COMPOSE_COMMAND                  = 0x682F; // View class
export const PID_TAG_VIEW_CLSID                                 = 0x6833; // View class identifier
export const PID_TAG_VIEW_STYLE                                 = 0x6834; // View style
export const PID_TAG_VIEW_MAJORVERSION                          = 0x683A; // View major version
export const PID_TAG_SCHDINFO_RESOURCE_TYPE                     = 0x6841;
export const PID_TAG_SEARCH_FOLDER_ID                           = 0x6842; // Search folder identifier
export const PID_TAG_DELEGATES_DISPLAY_NAMES                    = 0x6844;
export const PID_TAG_DELEGATES_ENTRYID                          = 0x6845;
export const PID_TAG_DELEGATES_ENTRYIDS                         = 0x6845;
export const PID_TAG_FREEBUSY_START_RANGE                       = 0x6847;
export const PID_TAG_SEARCH_FOLDER_EFP_FLAGS                    = 0x6848; // Extended search folder flags
export const PID_TAG_FREEBUSY_EMAIL_ADDRESS                     = 0x6849;
export const PID_TAG_FREEBUSY_ALL_MONTHS                        = 0x684F;
export const PID_TAG_FREEBUSY_ALL_EVENTS                        = 0x6850;
export const PID_TAG_FREEBUSY_TENTATIVE_MONTHS                  = 0x6851;
export const PID_TAG_FREEBUSY_TENTATIVE_EVENTS                  = 0x6852;
export const PID_TAG_FREEBUSY_BUSY_MONTHS                       = 0x6853;
export const PID_TAG_FREEBUSY_BUSY_EVENTS                       = 0x6854;
export const PID_TAG_FREEBUSY_OOF_MONTHS                        = 0x6855;
export const PID_TAG_FREEBUSY_OOF_EVENTS                        = 0x6856;
export const PID_TAG_FREEBUSY_LAST_MODIFIED                     = 0x6868;
export const PID_TAG_FREEBUSY_NUM_MONTHS                        = 0x6869;
export const PID_TAG_DELEGATES_SEE_PRIVATE                      = 0x686B;
export const PID_TAG_PERSONAL_FREEBUSY                          = 0x686C;
export const PID_TAG_PROCESS_MEETING_REQUESTS                   = 0x686D;
export const PID_TAG_DECLINE_RECURRING_MEETING_REQUESTS         = 0x686E;
export const PID_TAG_DECLINE_CONFLICTING_MEETING_REQUESTS       = 0x686F;

export const PID_TAG_VD_BINARY                                  = 0x7001;
export const PID_TAG_VD_STRINGS                                 = 0x7002;
export const PID_TAG_VD_FLAGS                                   = 0x7003;
export const PID_TAG_VD_LINK_TO                                 = 0x7004;
export const PID_TAG_VD_VIEW_FOLDER                             = 0x7005;
export const PID_TAG_VD_NAME                                    = 0x7006;
export const PID_TAG_VD_VERSION                                 = 0x7007;

// 0x7c00 – 0x7fff Non-transmittable properties for custom message classes
export const PID_TAG_FAV_DISPLAY_NAME                           = 0x7C00;
export const PID_TAG_FAV_PUBLIC_SOURCE_KEY                      = 0x7C02;
export const PID_TAG_OST_OSTID                                  = 0x7C04; // Offline storage table identifier
export const PID_TAG_STORE_SLOWLINK                             = 0x7C0A;
export const PID_TAG_OST_SECURITY_FLD_SVTVER                    = 0x7C0B;
export const PID_TAG_OST_LOCAL_COMMIT_TIME_MAX                  = 0x7C0E;
export const PID_TAG_OST_DELETED_COUNT_TOTAL                    = 0x7C0F;
export const PID_TAG_FAV_AUTOSUBFOLDERS                         = 0x7D01;
export const PID_TAG_PROCESSED                                  = 0x7D01;
export const PID_TAG_FAV_PARENT_SOURCE_KEY                      = 0x7D02;
export const PID_TAG_FAV_LEVEL_MASK                             = 0x7D03;
export const PID_TAG_FAV_INHERIT_AUTO                           = 0x7D07;
export const PID_TAG_FAV_DEL_SUBS                               = 0x7D08;
export const PID_TAG_ATTACHMENT_LINKID                          = 0x7FFA; // Attachment link identifier
export const PID_TAG_EXCEPTION_STARTTIME                        = 0x7FFB; // Exception start time
export const PID_TAG_EXCEPTION_ENDTIME                          = 0x7FFC; // Exception end time
export const PID_TAG_ATTACHMENT_FLAGS                           = 0x7FFD; // Attachment flags
export const PID_TAG_ATTACHMENT_HIDDEN                          = 0x7FFE; // Hidden attachment

// 0x8000 – 0xfffe Named properties


export const TagNames = {
    [PID_TAG_NAMEID_BUCKET_COUNT]: "nameidBucketCount",
    [PID_TAG_NAMEID_STREAM_GUID]: "nameidStreamGuid",
    [PID_TAG_NAMEID_STREAM_ENTRY]: "nameidStreamEntry",
    [PID_TAG_NAMEID_STRING_STREAM]: "nameidStringStream",

    [PID_TAG_ACKNOWLEDGEMENT_MODE]: "acknowledgementMode",
    [PID_TAG_ALTERNATE_RECIPIENT_ALLOWED]: "alternateRecipientAllowed",
    [PID_TAG_AUTHORIZING_USERS]: "authorizingUsers",
    [PID_TAG_AUTO_FORWARD_COMMENT]: "autoForwardComment",
    [PID_TAG_AUTO_FORWARDED]: "autoForwarded",
    [PID_TAG_CONTENT_CONFIDENTIALITY_ALGORITHM_ID]: "contentConfidentialityAlgorithmId",
    [PID_TAG_CONTENT_CORRELATOR]: "contentCorrelator",
    [PID_TAG_CONTENT_IDENTIFIER]: "contentIdentifier",
    [PID_TAG_CONTENT_LENGTH]: "contentLength",
    [PID_TAG_CONTENT_RETURN_REQUESTED]: "contentReturnRequested",
    [PID_TAG_CONVERSATION_KEY]: "conversationKey",
    [PID_TAG_CONVERSION_EITS]: "conversionEits",
    [PID_TAG_CONVERSION_WITH_LOSS_PROHIBITED]: "conversionWithLossProhibited",
    [PID_TAG_CONVERTED_EITS]: "convertedEits",
    [PID_TAG_DEFERRED_DELIVERY_TIME]: "deferredDeliveryTime",
    [PID_TAG_DELIVER_TIME]: "deliverTime",
    [PID_TAG_DISCARD_REASON]: "discardReason",
    [PID_TAG_DISCLOSURE_OF_RECIPIENTS]: "disclosureOfRecipients",
    [PID_TAG_DISTRIBUTION_LIST_EXPANSION_HISTORY]: "distributionListExpansionHistory",
    [PID_TAG_DISTRIBUTION_LIST_EXPANSION_PROHIBITED]: "distributionListExpansionProhibited",
    [PID_TAG_EXPIRY_TIME]: "expiryTime",
    [PID_TAG_IMPLICIT_CONVERSION_PROHIBITED]: "implicitConversionProhibited",
    [PID_TAG_IMPORTANCE]: "importance",
    [PID_TAG_IPM_ID]: "ipmId",
    [PID_TAG_LATEST_DELIVERY_TIME]: "latestDeliveryTime",
    [PID_TAG_MESSAGE_CLASS]: "messageClass",
    [PID_TAG_MESSAGE_DELIVERY_ID]: "messageDeliveryId",
    [PID_TAG_MESSAGE_SECURITY_LABEL]: "messageSecurityLabel",
    [PID_TAG_OBSOLETED_MESSAGE_IDS]: "obsoletedMessageIds",
    [PID_TAG_ORIGINALLY_INTENDED_RECIPIENT_NAME]: "originallyIntendedRecipientName",
    [PID_TAG_ORIGINAL_EITS]: "originalEits",
    [PID_TAG_ORIGINATOR_CERTIFICATE]: "originatorCertificate",
    [PID_TAG_ORIGINATOR_DELIVERY_REPORT_REQUESTED]: "originatorDeliveryReportRequested",
    [PID_TAG_ORIGINATOR_RETURN_ADDRESS]: "originatorReturnAddress",
    [PID_TAG_PARENT_KEY]: "parentKey",
    [PID_TAG_PRIORITY]: "priority",
    [PID_TAG_ORIGIN_CHECK]: "originCheck",
    [PID_TAG_PROOF_OF_SUBMISSION_REQUESTED]: "proofOfSubmissionRequested",
    [PID_TAG_READ_RECEIPT_REQUESTED]: "readReceiptRequested",
    [PID_TAG_RECEIPT_TIME]: "receiptTime",
    [PID_TAG_RECIPIENT_REASSIGNMENT_PROHIBITED]: "recipientReassignmentProhibited",
    [PID_TAG_REDIRECTION_HISTORY]: "redirectionHistory",
    [PID_TAG_RELATED_IPMS]: "relatedIpms",
    [PID_TAG_ORIGINAL_SENSITIVITY]: "originalSensitivity",
    [PID_TAG_LANGUAGES]: "languages",
    [PID_TAG_REPLY_TIME]: "replyTime",
    [PID_TAG_REPORT_TAG]: "reportTag",
    [PID_TAG_REPORT_TIME]: "reportTime",
    [PID_TAG_RETURNED_IPM]: "returnedIpm",
    [PID_TAG_SECURITY]: "security",
    [PID_TAG_INCOMPLETE_COPY]: "incompleteCopy",
    [PID_TAG_SENSITIVITY]: "sensitivity",
    [PID_TAG_SUBJECT]: "subject",
    [PID_TAG_SUBJECT_MESSAGE_ID]: "subjectMessageId",
    [PID_TAG_CLIENT_SUBMIT_TIME]: "clientSubmitTime",
    [PID_TAG_REPORT_NAME]: "reportName",
    [PID_TAG_SENT_REPRESENTING_SEARCH_KEY]: "sentRepresentingSearchKey",
    [PID_TAG_X400_CONTENT_TYPE]: "x400ContentType",
    [PID_TAG_SUBJECT_PREFIX]: "subjectPrefix",
    [PID_TAG_NON_RECEIPT_REASON]: "nonReceiptReason",
    [PID_TAG_RECEIVED_BY_ENTRY_ID]: "receivedByEntryId",
    [PID_TAG_RECEIVED_BY_NAME]: "receivedByName",
    [PID_TAG_SENT_REPRESENTING_ENTRY_ID]: "sentRepresentingEntryId",
    [PID_TAG_SENT_REPRESENTING_NAME]: "sentRepresentingName",
    [PID_TAG_RCVD_REPRESENTING_ENTRYID]: "rcvdRepresentingEntryid",
    [PID_TAG_RCVD_REPRESENTING_NAME]: "rcvdRepresentingName",
    [PID_TAG_REPORT_ENTRYID]: "reportEntryid",
    [PID_TAG_READ_RECEIPT_ENTRYID]: "readReceiptEntryid",
    [PID_TAG_MESSAGE_SUBMISSION_ID]: "messageSubmissionId",
    [PID_TAG_PROVIDER_SUBMIT_TIME]: "providerSubmitTime",
    [PID_TAG_ORIGINAL_SUBJECT]: "originalSubject",
    [PID_TAG_DISC_VAL]: "discVal",
    [PID_TAG_ORIG_MESSAGE_CLASS]: "origMessageClass",
    [PID_TAG_ORIGINAL_AUTHOR_ENTRY_ID]: "originalAuthorEntryId",
    [PID_TAG_ORIGINAL_AUTHOR_NAME]: "originalAuthorName",
    [PID_TAG_ORIGINAL_SUBMIT_TIME]: "originalSubmitTime",
    [PID_TAG_REPLY_RECIPIENT_ENTRIES]: "replyRecipientEntries",
    [PID_TAG_REPLY_RECIPIENT_NAMES]: "replyRecipientNames",
    [PID_TAG_RECEIVED_BY_SEARCH_KEY]: "receivedBySearchKey",
    [PID_TAG_RCVD_REPRESENTING_SEARCH_KEY]: "rcvdRepresentingSearchKey",
    [PID_TAG_READ_RECEIPT_SEARCH_KEY]: "readReceiptSearchKey",
    [PID_TAG_REPORT_SEARCH_KEY]: "reportSearchKey",
    [PID_TAG_ORIGINAL_DELIVERY_TIME]: "originalDeliveryTime",
    [PID_TAG_ORIGINAL_AUTHOR_SEARCH_KEY]: "originalAuthorSearchKey",
    [PID_TAG_MESSAGE_TO_ME]: "messageToMe",
    [PID_TAG_MESSAGE_CC_ME]: "messageCcMe",
    [PID_TAG_MESSAGE_RECIPIENT_ME]: "messageRecipientMe",
    [PID_TAG_ORIGINAL_SENDER_NAME]: "originalSenderName",
    [PID_TAG_ORIGINAL_SENDER_ENTRY_ID]: "originalSenderEntryId",
    [PID_TAG_ORIGINAL_SENDER_SEARCH_KEY]: "originalSenderSearchKey",
    [PID_TAG_ORIGINAL_SENT_REPRESENTING_NAME]: "originalSentRepresentingName",
    [PID_TAG_ORIGINAL_SENT_REPRESENTING_ENTRY_ID]: "originalSentRepresentingEntryId",
    [PID_TAG_ORIGINAL_SENT_REPRESENTING_SEARCH_KEY]: "originalSentRepresentingSearchKey",
    [PID_TAG_START_DATE]: "startDate",
    [PID_TAG_END_DATE]: "endDate",
    [PID_TAG_OWNER_APPOINTMENT_ID]: "ownerAppointmentId",
    [PID_TAG_RESPONSE_REQUESTED]: "responseRequested",
    [PID_TAG_SENT_REPRESENTING_ADDRESS_TYPE]: "sentRepresentingAddressType",
    [PID_TAG_SENT_REPRESENTING_EMAIL_ADDRESS]: "sentRepresentingEmailAddress",
    [PID_TAG_ORIGINAL_SENDER_ADDRESS_TYPE]: "originalSenderAddressType",
    [PID_TAG_ORIGINAL_SENDER_EMAIL_ADDRESS]: "originalSenderEmailAddress",
    [PID_TAG_ORIGINAL_SENT_REPRESENTING_ADDRESS_TYPE]: "originalSentRepresentingAddressType",
    [PID_TAG_ORIGINAL_SENT_REPRESENTING_EMAIL_ADDRESS]: "originalSentRepresentingEmailAddress",
    [PID_TAG_CONVERSATION_TOPIC]: "conversationTopic",
    [PID_TAG_CONVERSATION_INDEX]: "conversationIndex",
    [PID_TAG_ORIGINAL_DISPLAY_BCC]: "originalDisplayBcc",
    [PID_TAG_ORIGINAL_DISPLAY_CC]: "originalDisplayCc",
    [PID_TAG_ORIGINAL_DISPLAY_TO]: "originalDisplayTo",
    [PID_TAG_RECEIVED_BY_ADDRESS_TYPE]: "receivedByAddressType",
    [PID_TAG_RECEIVED_BY_EMAIL_ADDRESS]: "receivedByEmailAddress",
    [PID_TAG_RECEIVED_REPRESENTING_ADDRESS_TYPE]: "receivedRepresentingAddressType",
    [PID_TAG_RECEIVED_REPRESENTING_EMAIL_ADDRESS]: "receivedRepresentingEmailAddress",
    [PID_TAG_ORIGINAL_AUTHOR_ADDRESS_TYPE]: "originalAuthorAddressType",
    [PID_TAG_ORIGINAL_AUTHOR_EMAIL_ADDRESS]: "originalAuthorEmailAddress",
    [PID_TAG_ORIGINALLY_INTENDED_RECIP_ADDRTYPE]: "originallyIntendedRecipAddrtype",
    [PID_TAG_ORIGINALLY_INTENDED_RECIP_EMAIL_ADDRESS]: "originallyIntendedRecipEmailAddress",
    [PID_TAG_TRANSPORT_MESSAGE_HEADERS]: "transportMessageHeaders",
    [PID_TAG_DELEGATION]: "delegation",
    [PID_TAG_TNEF_CORRELATION_KEY]: "tnefCorrelationKey",

    [PID_TAG_CONTENT_INTEGRITY_CHECK]: "contentIntegrityCheck",
    [PID_TAG_EXPLICIT_CONVERSION]: "explicitConversion",
    [PID_TAG_IPM_RETURN_REQUESTED]: "ipmReturnRequested",
    [PID_TAG_MESSAGE_TOKEN]: "messageToken",
    [PID_TAG_NDR_REASON_CODE]: "ndrReasonCode",
    [PID_TAG_NDR_DIAG_CODE]: "ndrDiagCode",
    [PID_TAG_NON_RECEIPT_NOTIFICATION_REQUESTED]: "nonReceiptNotificationRequested",
    [PID_TAG_DELIVERY_POINT]: "deliveryPoint",
    [PID_TAG_ORIGINATOR_NON_DELIVERY_REPORT_REQUESTED]: "originatorNonDeliveryReportRequested",
    [PID_TAG_ORIGINATOR_REQUESTED_ALTERNATE_RECIPIENT]: "originatorRequestedAlternateRecipient",
    [PID_TAG_PHYSICAL_DELIVERY_BUREAU_FAX_DELIVERY]: "physicalDeliveryBureauFaxDelivery",
    [PID_TAG_PHYSICAL_DELIVERY_MODE]: "physicalDeliveryMode",
    [PID_TAG_PHYSICAL_DELIVERY_REPORT_REQUEST]: "physicalDeliveryReportRequest",
    [PID_TAG_PHYSICAL_FORWARDING_ADDRESS]: "physicalForwardingAddress",
    [PID_TAG_PHYSICAL_FORWARDING_ADDRESS_REQUESTED]: "physicalForwardingAddressRequested",
    [PID_TAG_PHYSICAL_FORWARDING_PROHIBITED]: "physicalForwardingProhibited",
    [PID_TAG_PHYSICAL_RENDITION_ATTRIBUTES]: "physicalRenditionAttributes",
    [PID_TAG_PROOF_OF_DELIVERY]: "proofOfDelivery",
    [PID_TAG_PROOF_OF_DELIVERY_REQUESTED]: "proofOfDeliveryRequested",
    [PID_TAG_RECIPIENT_CERTIFICATE]: "recipientCertificate",
    [PID_TAG_RECIPIENT_NUMBER_FOR_ADVICE]: "recipientNumberForAdvice",
    [PID_TAG_RECIPIENT_TYPE]: "recipientType",
    [PID_TAG_REGISTERED_MAIL_TYPE]: "registeredMailType",
    [PID_TAG_REPLY_REQUESTED]: "replyRequested",
    [PID_TAG_REQUESTED_DELIVERY_METHOD]: "requestedDeliveryMethod",
    [PID_TAG_SENDER_ENTRY_ID]: "senderEntryId",
    [PID_TAG_SENDER_NAME]: "senderName",
    [PID_TAG_SUPPLEMENTARY_INFO]: "supplementaryInfo",
    [PID_TAG_TYPE_OF_MTS_USER]: "typeOfMtsUser",
    [PID_TAG_SENDER_SEARCH_KEY]: "senderSearchKey",
    [PID_TAG_SENDER_ADDRESS_TYPE]: "senderAddressType",
    [PID_TAG_SENDER_EMAIL_ADDRESS]: "senderEmailAddress",
    [PID_TAG_NDR_STATUS_CODE]: "ndrStatusCode",

    [PID_TAG_CURRENT_VERSION]: "currentVersion",
    [PID_TAG_DELETE_AFTER_SUBMIT]: "deleteAfterSubmit",
    [PID_TAG_DISPLAY_BCC]: "displayBcc",
    [PID_TAG_DISPLAY_CC]: "displayCc",
    [PID_TAG_DISPLAY_TO]: "displayTo",
    [PID_TAG_PARENT_DISPLAY]: "parentDisplay",
    [PID_TAG_MESSAGE_DELIVERY_TIME]: "messageDeliveryTime",
    [PID_TAG_MESSAGE_FLAGS]: "messageFlags",
    [PID_TAG_MESSAGE_SIZE]: "messageSize",
    [PID_TAG_MESSAGE_SIZE_EXTENDED]: "messageSizeExtended",
    [PID_TAG_PARENT_ENTRY_ID]: "parentEntryId",
    [PID_TAG_SENT_MAIL_ENTRY_ID]: "sentMailEntryId",
    [PID_TAG_CORRELATE]: "correlate",
    [PID_TAG_CORRELATE_MTSID]: "correlateMtsid",
    [PID_TAG_DISCRETE_VALUES]: "discreteValues",
    [PID_TAG_RESPONSIBILITY]: "responsibility",
    [PID_TAG_SPOOLER_STATUS]: "spoolerStatus",
    [PID_TAG_TRANSPORT_STATUS]: "transportStatus",
    [PID_TAG_MESSAGE_RECIPIENTS]: "messageRecipients",
    [PID_TAG_MESSAGE_ATTACHMENTS]: "messageAttachments",
    [PID_TAG_SUBMIT_FLAGS]: "submitFlags",
    [PID_TAG_RECIPIENT_STATUS]: "recipientStatus",
    [PID_TAG_TRANSPORT_KEY]: "transportKey",
    [PID_TAG_MESSAGE_STATUS]: "messageStatus",
    [PID_TAG_MESSAGE_DOWNLOAD_TIME]: "messageDownloadTime",
    [PID_TAG_CREATION_VERSION]: "creationVersion",
    [PID_TAG_MODIFY_VERSION]: "modifyVersion",
    [PID_TAG_HASATTACH]: "hasattach",
    [PID_TAG_BODY_CRC]: "bodyCrc",
    [PID_TAG_NORMALIZED_SUBJECT]: "normalizedSubject",
    [PID_TAG_RTF_IN_SYNC]: "rtfInSync",
    [PID_TAG_ATTACH_SIZE]: "attachSize",
    [PID_TAG_ATTACH_NUMBER]: "attachNumber",
    [PID_TAG_PREPROCESS]: "preprocess",
    [PID_TAG_INTERNET_ARTICLE_NUMBER]: "internetArticleNumber",
    [PID_TAG_NEWSGROUP_NAME]: "newsgroupName",
    [PID_TAG_ORIGINATING_MTA_CERTIFICATE]: "originatingMtaCertificate",
    [PID_TAG_PROOF_OF_SUBMISSION]: "proofOfSubmission",
    [PID_TAG_SECURITY_DESCRIPTOR]: "securityDescriptor",
    [PID_TAG_PRIMARY_SEND_ACCT]: "primarySendAcct",
    [PID_TAG_NEXT_SEND_ACCT]: "nextSendAcct",
    [PID_TAG_IMAP_ID]: "imapID",
    [PID_TAG_REPL_ITEMID]: "replItemid",
    [PID_TAG_REPL_CHANGENUM]: "replChangenum",
    [PID_TAG_REPL_VERSION_HISTORY]: "replVersionHistory",
    [PID_TAG_REPL_FLAGS]: "replFlags",
    [PID_TAG_REPL_COPIEDFROM_VERSIONHISTORY]: "replCopiedfromVersionhistory",
    [PID_TAG_REPL_COPIEDFROM_ITEMID]: "replCopiedfromItemid",
    [PID_TAG_CREATOR_SID]: "creatorSid",
    [PID_TAG_LAST_MODIFIER_SID]: "lastModifierSid",
    [PID_TAG_MIME_HANDLER_CLASSID]: "mimeHandlerClassid",
    [PID_TAG_MIME_HANDLER_CLASSIDS]: "mimeHandlerClassids",
    [PID_TAG_URL_COMP_NAME_POSTFIX]: "urlCompNamePostfix",
    [PID_TAG_URL_COMP_NAME_SET]: "urlCompNameSet",
    [PID_TAG_SUBFOLDER_CT]: "subfolderCt",
    [PID_TAG_DELETED_SUBFOLDER_CT]: "deletedSubfolderCt",
    [PID_TAG_DELETE_TIME]: "deleteTime",
    [PID_TAG_AGE_LIMIT]: "ageLimit",
    [PID_TAG_READ]: "read",
    [PID_TAG_TRUST_SENDER]: "trustSender",
    [PID_TAG_ATTACH_VIRUS_SCAN_INFO]: "attachVirusScanInfo",
    [PID_TAG_ASSOCIATED_SHARING_PROVIDER]: "associatedSharingProvider",
    [PID_TAG_PROVIDER_ITEM_ID]: "providerItemId",
    [PID_TAG_PROVIDER_PARENT_ITEM_ID]: "providerParentItemId",
    [PID_TAG_ACCESS]: "access",
    [PID_TAG_ROW_TYPE]: "rowType",
    [PID_TAG_INSTANCE_KEY]: "instanceKey",
    [PID_TAG_ACCESS_LEVEL]: "accessLevel",
    [PID_TAG_MAPPING_SIGNATURE]: "mappingSignature",
    [PID_TAG_RECORD_KEY]: "recordKey",
    [PID_TAG_STORE_RECORD_KEY]: "storeRecordKey",
    [PID_TAG_STORE_ENTRY_ID]: "storeEntryId",
    [PID_TAG_MINI_ICON]: "miniIcon",
    [PID_TAG_ICON]: "icon",
    [PID_TAG_OBJECT_TYPE]: "objectType",
    [PID_TAG_ENTRY_ID]: "entryId",

    [PID_TAG_BODY]: "body",
    [PID_TAG_REPORT_TEXT]: "reportText",
    [PID_TAG_ORIGINATOR_AND_DISTRIBUTION_LIST_EXPANSION_HISTORY]: "originatorAndDistributionListExpansionHistory",
    [PID_TAG_REPORTING_DL_NAME]: "reportingDlName",
    [PID_TAG_REPORTING_MTA_CERTIFICATE]: "reportingMtaCertificate",
    [PID_TAG_RTF_SYNC_BODY_CRC]: "rtfSyncBodyCrc",
    [PID_TAG_RTF_SYNC_BODY_COUNT]: "rtfSyncBodyCount",
    [PID_TAG_RTF_SYNC_BODY_TAG]: "rtfSyncBodyTag",
    [PID_TAG_RTF_COMPRESSED]: "rtfCompressed",
    [PID_TAG_RTF_SYNC_PREFIX_COUNT]: "rtfSyncPrefixCount",
    [PID_TAG_RTF_SYNC_TRAILING_COUNT]: "rtfSyncTrailingCount",
    [PID_TAG_ORIGINALLY_INTENDED_RECIP_ENTRYID]: "originallyIntendedRecipEntryid",
    [PID_TAG_BODY_HTML]: "bodyHtml",
    [PID_TAG_BODY_CONTENT_ID]: "bodyContentID",
    [PID_TAG_NATIVE_BODY]: "nativeBody",
    [PID_TAG_HTML]: "html",
    [PID_TAG_BODY_CONTENT_LOCATION]: "bodyContentLocation",
    [PID_TAG_INTERNET_APPROVED]: "internetApproved",
    [PID_TAG_INTERNET_CONTROL]: "internetControl",
    [PID_TAG_INTERNET_DISTRIBUTION]: "internetDistribution",
    [PID_TAG_INTERNET_FOLLOWUP_TO]: "internetFollowupTo",
    [PID_TAG_INTERNET_LINES]: "internetLines",
    [PID_TAG_INTERNET_MESSAGE_ID]: "internetMessageId",
    [PID_TAG_INTERNET_NEWSGROUPS]: "internetNewsgroups",
    [PID_TAG_INTERNET_ORGANIZATION]: "internetOrganization",
    [PID_TAG_INTERNET_NNTP_PATH]: "internetNntpPath",
    [PID_TAG_INTERNET_REFERENCES]: "internetReferences",
    [PID_TAG_SUPERSEDES]: "supersedes",
    [PID_TAG_POST_FOLDER_ENTRIES]: "postFolderEntries",
    [PID_TAG_POST_FOLDER_NAMES]: "postFolderNames",
    [PID_TAG_POST_REPLY_FOLDER_ENTRIES]: "postReplyFolderEntries",
    [PID_TAG_POST_REPLY_FOLDER_NAMES]: "postReplyFolderNames",
    [PID_TAG_POST_REPLY_DENIED]: "postReplyDenied",
    [PID_TAG_NNTP_XREF]: "nntpXref",
    [PID_TAG_INTERNET_PRECEDENCE]: "internetPrecedence",
    [PID_TAG_IN_REPLY_TO_ID]: "inReplyToId",
    [PID_TAG_LIST_HELP]: "listHelp",
    [PID_TAG_LIST_SUBSCRIBE]: "listSubscribe",
    [PID_TAG_LIST_UNSUBSCRIBE]: "listUnsubscribe",
    [PID_TAG_INTERNET_RETURN_PATH]: "internetReturnPath",
    [PID_TAG_ICON_INDEX]: "iconIndex",
    [PID_TAG_ACTION_FLAG]: "actionFlag",
    [PID_TAG_ACTION_DATE]: "actionDate",
    [PID_TAG_FLAG_STATUS]: "flagStatus",
    [PID_TAG_FLAG_COMPLETE]: "flagComplete",
    [PID_TAG_FLAG_ICON]: "flagIcon",
    [PID_TAG_BLOCK_STATUS]: "blockStatus",
    [PID_TAG_ITEM_TEMPORARY_FLAGS]: "itemTemporaryFlags",
    [PID_TAG_CONFLICT_ITEMS]: "conflictItems",
    [PID_TAG_SMTP_TEMP_TBL_DATA]: "smtpTempTblData",
    [PID_TAG_SMTP_TEMP_TBL_DATA_2]: "smtpTempTblData2",
    [PID_TAG_SMTP_TEMP_TBL_DATA_3]: "smtpTempTblData3",
    [PID_TAG_CAL_START_TIME]: "calStartTime",
    [PID_TAG_CAL_END_TIME]: "calEndTime",
    [PID_TAG_CAL_RECURRING_ID]: "calRecurringId",
    [PID_TAG_DAV_SUBMIT_DATA]: "davSubmitData",
    [PID_TAG_CDO_EXPANSION_INDEX]: "cdoExpansionIndex",
    [PID_TAG_IFS_INTERNAL_DATA]: "ifsInternalData",
    [PID_TAG_CAL_REMINDER_NEXT_TIME]: "calReminderNextTime",
    [PID_TAG_OWA_URL]: "owaUrl",
    [PID_TAG_DISABLE_FULL_FIDELITY]: "disableFullFidelity",
    [PID_TAG_URL_COMPONENT_NAME]: "urlComponentName",
    [PID_TAG_ATTRIBUTE_HIDDEN]: "attributeHidden",
    [PID_TAG_ATTRIBUTE_SYSTEM]: "attributeSystem",
    [PID_TAG_ATTRIBUTE_READ_ONLY]: "attributeReadOnly",
    [PID_TAG_P1_CONTENT]: "p1Content",
    [PID_TAG_P1_CONTENT_TYPE]: "p1ContentType",

    [PID_TAG_ROWID]: "rowid",
    [PID_TAG_DISPLAY_NAME]: "displayName",
    [PID_TAG_ADDRESS_TYPE]: "addressType",
    [PID_TAG_EMAIL_ADDRESS]: "emailAddress",
    [PID_TAG_COMMENT]: "comment",
    [PID_TAG_DEPTH]: "depth",
    [PID_TAG_PROVIDER_DISPLAY_NAME]: "providerDisplayName",
    [PID_TAG_CREATION_TIME]: "creationTime",
    [PID_TAG_LAST_MODIFICATION_TIME]: "lastModificationTime",
    [PID_TAG_RESOURCE_FLAGS]: "resourceFlags",
    [PID_TAG_PROVIDER_DISPLAY]: "providerDisplay",
    [PID_TAG_SEARCH_KEY]: "searchKey",
    [PID_TAG_PROVIDER_UID]: "providerUid",
    [PID_TAG_PROVIDER_ORDINAL]: "providerOrdinal",
    [PID_TAG_CONVERSATION_ID]: "conversationID",
    [PID_TAG_CONVERSATION_INDEX_TRACKING]: "conversationIndexTracking",
    [PID_TAG_POLICY_TAG]: "PolicyTag",
    [PID_TAG_START_DATE_ETC]: "startDateEtc",
    [PID_TAG_RETENTION_DATE]: "retentionDate",
    [PID_TAG_RETENTION_FLAGS]: "retentionFlags",

    [PID_TAG_FORM_VERSION]: "formVersion",
    [PID_TAG_FORM_CLSID]: "formClsid",
    [PID_TAG_FORM_CONTACT_NAME]: "formContactName",
    [PID_TAG_FORM_CATEGORY]: "formCategory",
    [PID_TAG_FORM_CATEGORY_SUB]: "formCategorySub",
    [PID_TAG_FORM_HOST_MAP]: "formHostMap",
    [PID_TAG_FORM_HIDDEN]: "formHidden",
    [PID_TAG_FORM_DESIGNER_NAME]: "formDesignerName",
    [PID_TAG_FORM_DESIGNER_GUID]: "formDesignerGuid",
    [PID_TAG_FORM_MESSAGE_BEHAVIOR]: "formMessageBehavior",

    [PID_TAG_DEFAULT_STORE]: "defaultStore",
    [PID_TAG_STORE_SUPPORT_MASK]: "storeSupportMask",
    [PID_TAG_STORE_STATE]: "storeState",
    [PID_TAG_IPM_SUBTREE_SEARCH_KEY]: "ipmSubtreeSearchKey",
    [PID_TAG_IPM_OUTBOX_SEARCH_KEY]: "ipmOutboxSearchKey",
    [PID_TAG_IPM_WASTEBASKET_SEARCH_KEY]: "ipmWastebasketSearchKey",
    [PID_TAG_IPM_SENTMAIL_SEARCH_KEY]: "ipmSentmailSearchKey",
    [PID_TAG_STORE_PROVIDER]: "storeProvider",
    [PID_TAG_RECEIVE_FOLDER_SETTINGS]: "receiveFolderSettings",
    [PID_TAG_SEARCH_OWNER_ID]: "searchOwnerId",
    [PID_TAG_VALID_FOLDER_MASK]: "validFolderMask",
    [PID_TAG_IPM_SUBTREE_ENTRY_ID]: "ipmSubtreeEntryId",
    [PID_TAG_IPM_OUTBOX_ENTRY_ID]: "ipmOutboxEntryId",
    [PID_TAG_IPM_WASTEBASKET_ENTRY_ID]: "ipmWastebasketEntryId",
    [PID_TAG_IPM_SENT_MAIL_ENTRY_ID]: "ipmSentMailEntryId",
    [PID_TAG_VIEWS_ENTRY_ID]: "viewsEntryId",
    [PID_TAG_COMMON_VIEWS_ENTRY_ID]: "commonViewsEntryId",
    [PID_TAG_FINDER_ENTRY_ID]: "finderEntryId",

    [PID_TAG_ROOT_MAILBOX]: "rootMailbox",
    [PID_TAG_DELETED_ITEMS]: "deletedItems",
    [PID_TAG_SEARCH_FOLDER]: "searchFolder",
    [PID_TAG_COMMUNICATOR_HISTORY_FOLDER_ENTRY_ID]: "communicatorHistoryFolderEntryID",
    [PID_TAG_SYNC_ROOT_ENTRY_ID]: "syncRootEntryID",

    [PID_TAG_CONTAINER_FLAGS]: "containerFlags",
    [PID_TAG_FOLDER_TYPE]: "folderType",
    [PID_TAG_CONTENT_COUNT]: "contentCount",
    [PID_TAG_CONTENT_UNREAD_COUNT]: "contentUnreadCount",
    [PID_TAG_CREATE_TEMPLATES]: "createTemplates",
    [PID_TAG_DETAILS_TABLE]: "detailsTable",
    [PID_TAG_SEARCH]: "search",
    [PID_TAG_SELECTABLE]: "selectable",
    [PID_TAG_SUBFOLDERS]: "subfolders",
    [PID_TAG_STATUS]: "status",
    [PID_TAG_ANR]: "anr",
    [PID_TAG_CONTENTS_SORT_ORDER]: "contentsSortOrder",
    [PID_TAG_CONTAINER_HIERARCHY]: "containerHierarchy",
    [PID_TAG_CONTAINER_CONTENTS]: "containerContents",
    [PID_TAG_FOLDER_ASSOCIATED_CONTENTS]: "folderAssociatedContents",
    [PID_TAG_DEF_CREATE_DL]: "defCreateDl",
    [PID_TAG_DEF_CREATE_MAILUSER]: "defCreateMailuser",
    [PID_TAG_CONTAINER_CLASS]: "containerClass",
    [PID_TAG_CONTAINER_MODIFY_VERSION]: "containerModifyVersion",
    [PID_TAG_AB_PROVIDER_ID]: "abProviderId",
    [PID_TAG_DEFAULT_VIEW_ENTRY_ID]: "defaultViewEntryId",
    [PID_TAG_ASSOCIATED_CONTENT_COUNT]: "associatedContentCount",
    [PID_TAG_PACKED_NAME_PROPS]: "packedNameProps",
    [PID_TAG_IPM_APPOINTMENT_ENTRY_ID]: "ipmAppointmentEntryId",
    [PID_TAG_IPM_CONTACT_ENTRY_ID]: "ipmContactEntryId",
    [PID_TAG_IPM_JOURNAL_ENTRY_ID]: "ipmJournalEntryId",
    [PID_TAG_IPM_NOTE_ENTRY_ID]: "ipmNoteEntryId",
    [PID_TAG_IPM_TASK_ENTRY_ID]: "ipmTaskEntryId",
    [PID_TAG_REMINDERS_ONLINE_ENTRY_ID]: "remindersOnlineEntryId",
    [PID_TAG_REMINDERS_OFFLINE_ENTRYID]: "remindersOfflineEntryid",
    [PID_TAG_IPM_DRAFTS_ENTRY_ID]: "ipmDraftsEntryId",
    [PID_TAG_ADDITIONAL_REN_ENTRY_IDS]: "additionalRenEntryIds",
    [PID_TAG_ADDITIONAL_REN_ENTRY_IDS_EX]: "additionalRenEntryIdsEx",
    [PID_TAG_EXTENDED_FOLDER_FLAGS]: "extendedFolderFlags",
    [PID_TAG_FOLDER_WEB_VIEW_INFO]: "folderWebViewInfo",
    [PID_TAG_FOLDER_XVIEWINFO_E]: "folderXviewinfoE",
    [PID_TAG_FOLDER_VIEWS_ONLY]: "folderViewsOnly",
    [PID_TAG_ORDINAL_MOST]: "ordinalMost",
    [PID_TAG_FREE_BUSY_ENTRY_IDS]: "freeBusyEntryIds",
    [PID_TAG_DEF_MSG_CLASS]: "defMsgClass",
    [PID_TAG_DEF_FORM_NAME]: "defFormName",
    [PID_TAG_GENERATE_EXCHANGE_VIEWS]: "generateExchangeViews",
    [PID_TAG_FOLDER_VIEWLIST]: "folderViewlist",
    [PID_TAG_AGING_PERIOD]: "agingPeriod",
    [PID_TAG_AGING_GRANULARITY]: "agingGranularity",

    [PID_TAG_ATTACHMENT_X400_PARAMETERS]: "attachmentX400Parameters",
    [PID_TAG_ATTACH_DATA_OBJECT]: "attachDataObject",
    [PID_TAG_ATTACH_DATA_BINARY]: "attachDataBinary",
    [PID_TAG_ATTACH_ENCODING]: "attachEncoding",
    [PID_TAG_ATTACH_EXTENSION]: "attachExtension",
    [PID_TAG_ATTACH_FILENAME]: "attachFilename",
    [PID_TAG_ATTACH_METHOD]: "attachMethod",
    [PID_TAG_ATTACH_LONG_FILENAME]: "attachLongFilename",
    [PID_TAG_ATTACH_PATHNAME]: "attachPathname",
    [PID_TAG_ATTACH_RENDERING]: "attachRendering",
    [PID_TAG_ATTACH_TAG]: "attachTag",
    [PID_TAG_RENDERING_POSITION]: "renderingPosition",
    [PID_TAG_ATTACH_TRANSPORT_NAME]: "attachTransportName",
    [PID_TAG_ATTACH_LONG_PATHNAME]: "attachLongPathname",
    [PID_TAG_ATTACH_MIME_TAG]: "attachMimeTag",
    [PID_TAG_ATTACH_ADDITIONAL_INFORMATION]: "attachAdditionalInformation",
    [PID_TAG_ATTACH_MIME_SEQUENCE]: "attachMimeSequence",
    [PID_TAG_ATTACH_CONTENT_BASE]: "attachContentBase",
    [PID_TAG_ATTACH_CONTENT_ID]: "attachContentId",
    [PID_TAG_ATTACH_CONTENT_LOCATION]: "attachContentLocation",
    [PID_TAG_ATTACH_FLAGS]: "attachFlags",
    [PID_TAG_ATTACH_CONTENT_DISPOSITION]: "attachContentDisposition",
    [PID_TAG_ATTACH_PAYLOAD_PROVIDER_GUID_STRING]: "attachPayloadProviderGuidString",
    [PID_TAG_ATTACH_PAYLOAD_CLASS]: "attachPayloadClass",
    [PID_TAG_TEXT_ATTACHMENT_CHARSET]: "textAttachmentCharset",
    [PID_TAG_SYNCEVENT_SUPPRESS_GUID]: "synceventSuppressGuid",
    [PID_TAG_DISPLAY_TYPE]: "displayType",
    [PID_TAG_TEMPLATEID]: "templateid",
    [PID_TAG_PRIMARY_CAPABILITY]: "primaryCapability",
    [PID_TAG_DISPLAY_TYPE_EX]: "displayTypeEx",
    [PID_TAG_SMTP_ADDRESS]: "smtpAddress",
    [PID_TAG_BIT_DISPLAY_NAME]: "bitDisplayName",

    [PID_TAG_ACCOUNT]: "account",
    [PID_TAG_ALTERNATE_RECIPIENT]: "alternateRecipient",
    [PID_TAG_CALLBACK_TELEPHONE_NUMBER]: "callbackTelephoneNumber",
    [PID_TAG_CONVERSION_PROHIBITED]: "conversionProhibited",
    [PID_TAG_DISCLOSE_RECIPIENTS]: "discloseRecipients",
    [PID_TAG_GENERATION]: "generation",
    [PID_TAG_GIVEN_NAME]: "givenName",
    [PID_TAG_GOVERNMENT_ID_NUMBER]: "governmentIdNumber",
    [PID_TAG_BUSINESS_TELEPHONE_NUMBER]: "businessTelephoneNumber",
    [PID_TAG_HOME_TELEPHONE_NUMBER]: "homeTelephoneNumber",
    [PID_TAG_INITIALS]: "initials",
    [PID_TAG_KEYWORD]: "keyword",
    [PID_TAG_LANGUAGE]: "language",
    [PID_TAG_LOCATION]: "location",
    [PID_TAG_MAIL_PERMISSION]: "mailPermission",
    [PID_TAG_MESSAGE_HANDLING_SYSTEM_COMMON_NAME]: "messageHandlingSystemCommonName",
    [PID_TAG_ORGANIZATIONAL_ID_NUMBER]: "organizationalIdNumber",
    [PID_TAG_SURNAME]: "surname",
    [PID_TAG_ORIGINAL_ENTRY_ID]: "originalEntryId",
    [PID_TAG_ORIGINAL_DISPLAY_NAME]: "originalDisplayName",
    [PID_TAG_ORIGINAL_SEARCH_KEY]: "originalSearchKey",
    [PID_TAG_POSTAL_ADDRESS]: "postalAddress",
    [PID_TAG_COMPANY_NAME]: "companyName",
    [PID_TAG_TITLE]: "title",
    [PID_TAG_DEPARTMENT_NAME]: "departmentName",
    [PID_TAG_OFFICE_LOCATION]: "officeLocation",
    [PID_TAG_PRIMARY_TELEPHONE_NUMBER]: "primaryTelephoneNumber",
    [PID_TAG_SECONDARY_BUSINESS_TELEPHONE_NUMBER]: "secondaryBusinessTelephoneNumber",
    [PID_TAG_MOBILE_TELEPHONE_NUMBER]: "mobileTelephoneNumber",
    [PID_TAG_RADIO_TELEPHONE_NUMBER]: "radioTelephoneNumber",
    [PID_TAG_CAR_TELEPHONE_NUMBER]: "carTelephoneNumber",
    [PID_TAG_OTHER_TELEPHONE_NUMBER]: "otherTelephoneNumber",
    [PID_TAG_TRANSMITTABLE_DISPLAY_NAME]: "transmittableDisplayName",
    [PID_TAG_PAGER_TELEPHONE_NUMBER]: "pagerTelephoneNumber",
    [PID_TAG_USER_CERTIFICATE]: "userCertificate",
    [PID_TAG_PRIMARY_FAX_NUMBER]: "primaryFaxNumber",
    [PID_TAG_BUSINESS_FAX_NUMBER]: "businessFaxNumber",
    [PID_TAG_HOME_FAX_NUMBER]: "homeFaxNumber",
    [PID_TAG_COUNTRY]: "country",
    [PID_TAG_LOCALITY]: "locality",
    [PID_TAG_STATE_OR_PROVINCE]: "stateOrProvince",
    [PID_TAG_STREET_ADDRESS]: "streetAddress",
    [PID_TAG_POSTAL_CODE]: "postalCode",
    [PID_TAG_POST_OFFICE_BOX]: "postOfficeBox",
    [PID_TAG_TELEX_NUMBER]: "telexNumber",
    [PID_TAG_ISDN_NUMBER]: "isdnNumber",
    [PID_TAG_ASSISTANT_TELEPHONE_NUMBER]: "assistantTelephoneNumber",
    [PID_TAG_SECONDARY_HOME_TELEPHONE_NUMBER]: "secondaryHomeTelephoneNumber",
    [PID_TAG_ASSISTANT]: "assistant",
    [PID_TAG_SEND_RICH_INFO]: "sendRichInfo",
    [PID_TAG_WEDDING_ANNIVERSARY]: "weddingAnniversary",
    [PID_TAG_BIRTHDAY]: "birthday",
    [PID_TAG_HOBBIES]: "hobbies",
    [PID_TAG_MIDDLE_NAME]: "middleName",
    [PID_TAG_DISPLAY_NAME_PREFIX]: "displayNamePrefix",
    [PID_TAG_PROFESSION]: "profession",
    [PID_TAG_PREFERRED_BY_NAME]: "preferredByName",
    [PID_TAG_SPOUSE_NAME]: "spouseName",
    [PID_TAG_COMPUTER_NETWORK_NAME]: "computerNetworkName",
    [PID_TAG_CUSTOMER_ID]: "customerId",
    [PID_TAG_TTY_TDD_PHONE_NUMBER]: "ttyTddPhoneNumber",
    [PID_TAG_FTP_SITE]: "ftpSite",
    [PID_TAG_GENDER]: "gender",
    [PID_TAG_MANAGER_NAME]: "managerName",
    [PID_TAG_NICKNAME]: "nickname",
    [PID_TAG_PERSONAL_HOME_PAGE]: "personalHomePage",
    [PID_TAG_BUSINESS_HOME_PAGE]: "businessHomePage",
    [PID_TAG_CONTACT_VERSION]: "contactVersion",
    [PID_TAG_CONTACT_ENTRYIDS]: "contactEntryids",
    [PID_TAG_CONTACT_ADDRESS_TYPES]: "contactAddressTypes",
    [PID_TAG_CONTACT_DEFAULT_ADDRESS_INDEX]: "contactDefaultAddressIndex",
    [PID_TAG_CONTACT_EMAIL_ADDRESSES]: "contactEmailAddresses",
    [PID_TAG_COMPANY_MAIN_TELEPHONE_NUMBER]: "companyMainTelephoneNumber",
    [PID_TAG_CHILDRENS_NAMES]: "childrensNames",
    [PID_TAG_HOME_ADDRESS_CITY]: "homeAddressCity",
    [PID_TAG_HOME_ADDRESS_COUNTRY]: "homeAddressCountry",
    [PID_TAG_HOME_ADDRESS_POSTAL_CODE]: "homeAddressPostalCode",
    [PID_TAG_HOME_ADDRESS_STATE_OR_PROVINCE]: "homeAddressStateOrProvince",
    [PID_TAG_HOME_ADDRESS_STREET]: "homeAddressStreet",
    [PID_TAG_HOME_ADDRESS_POST_OFFICE_BOX]: "homeAddressPostOfficeBox",
    [PID_TAG_OTHER_ADDRESS_CITY]: "otherAddressCity",
    [PID_TAG_OTHER_ADDRESS_COUNTRY]: "otherAddressCountry",
    [PID_TAG_OTHER_ADDRESS_POSTAL_CODE]: "otherAddressPostalCode",
    [PID_TAG_OTHER_ADDRESS_STATE_OR_PROVINCE]: "otherAddressStateOrProvince",
    [PID_TAG_OTHER_ADDRESS_STREET]: "otherAddressStreet",
    [PID_TAG_OTHER_ADDRESS_POST_OFFICE_BOX]: "otherAddressPostOfficeBox",
    [PID_TAG_USER_X_CERTIFICATE]: "userXCertificate",
    [PID_TAG_SEND_INTERNET_ENCODING]: "sendInternetEncoding",
    [PID_TAG_STORE_PROVIDERS]: "storeProviders",
    [PID_TAG_AB_PROVIDERS]: "abProviders",
    [PID_TAG_TRANSPORT_PROVIDERS]: "transportProviders",
    [PID_TAG_DEFAULT_PROFILE]: "defaultProfile",
    [PID_TAG_AB_SEARCH_PATH]: "abSearchPath",
    [PID_TAG_AB_DEFAULT_DIR]: "abDefaultDir",
    [PID_TAG_AB_DEFAULT_PAB]: "abDefaultPab",
    [PID_TAG_FILTERING_HOOKS]: "filteringHooks",
    [PID_TAG_SERVICE_NAME]: "serviceName",
    [PID_TAG_SERVICE_DLL_NAME]: "serviceDllName",
    [PID_TAG_SERVICE_ENTRY_NAME]: "serviceEntryName",
    [PID_TAG_SERVICE_UID]: "serviceUid",
    [PID_TAG_SERVICE_EXTRA_UIDS]: "serviceExtraUids",
    [PID_TAG_SERVICES]: "services",
    [PID_TAG_SERVICE_SUPPORT_FILES]: "serviceSupportFiles",
    [PID_TAG_SERVICE_DELETE_FILES]: "serviceDeleteFiles",
    [PID_TAG_AB_SEARCH_PATH_UPDATE]: "abSearchPathUpdate",
    [PID_TAG_PROFILE_NAME]: "profileName",
    [PID_TAG_SERVICE_INSTALL_ID]: "serviceInstallId",
    [PID_TAG_ADMIN_NTSD]: "admin NTSD",
    [PID_TAG_IDENTITY_DISPLAY]: "identityDisplay",
    [PID_TAG_IDENTITY_ENTRYID]: "identityEntryid",
    [PID_TAG_RESOURCE_METHODS]: "resourceMethods",
    [PID_TAG_RESOURCE_TYPE]: "resourceType",
    [PID_TAG_STATUS_CODE]: "statusCode",
    [PID_TAG_IDENTITY_SEARCH_KEY]: "identitySearchKey",
    [PID_TAG_OWN_STORE_ENTRYID]: "ownStoreEntryid",
    [PID_TAG_RESOURCE_PATH]: "resourcePath",
    [PID_TAG_STATUS_STRING]: "statusString",
    [PID_TAG_X400_DEFERRED_DELIVERY_CANCEL]: "x400DeferredDeliveryCancel",
    [PID_TAG_HEADER_FOLDER_ENTRYID]: "headerFolderEntryid",
    [PID_TAG_REMOTE_PROGRESS]: "remoteProgress",
    [PID_TAG_REMOTE_PROGRESS_TEXT]: "remoteProgressText",
    [PID_TAG_REMOTE_VALIDATE_OK]: "remoteValidateOk",
    [PID_TAG_CONTROL_FLAGS]: "controlFlags",
    [PID_TAG_CONTROL_STRUCTURE]: "controlStructure",
    [PID_TAG_CONTROL_TYPE]: "controlType",
    [PID_TAG_DELTAX]: "deltax",
    [PID_TAG_DELTAY]: "deltay",
    [PID_TAG_XPOS]: "xpos",
    [PID_TAG_YPOS]: "ypos",
    [PID_TAG_CONTROL_ID]: "controlId",
    [PID_TAG_INITIAL_DETAILS_PANE]: "initialDetailsPane",
    [PID_TAG_DID]: "did",
    [PID_TAG_SEQID]: "seqid",
    [PID_TAG_DRAFTID]: "draftid",
    [PID_TAG_CHECK_IN_TIME]: "checkInTime",
    [PID_TAG_CHECK_IN_COMMENT]: "checkInComment",
    [PID_TAG_VERSION_OP_CODE]: "versionOpCode",
    [PID_TAG_VERSION_OP_DATA]: "versionOpData",
    [PID_TAG_VERSION_SEQUENCE_NUMBER]: "versionSequenceNumber",
    [PID_TAG_ATTACH_ID]: "attachId",
    [PID_TAG_PKM_DOC_STATUS]: "pkmDocStatus",
    [PID_TAG_MV_PKM_OPERATION_REQ]: "mvPkmOperationReq",
    [PID_TAG_PKM_DOC_INTERNAL_STATE]: "pkmDocInternalState",
    [PID_TAG_VERSIONING_FLAGS]: "versioningFlags",
    [PID_TAG_PKM_LAST_UNAPPROVED_VID]: "pkmLastUnapprovedVid",
    [PID_TAG_MV_PKM_VERSION_LABELS]: "mvPkmVersionLabels",
    [PID_TAG_MV_PKM_VERSION_STATUS]: "mvPkmVersionStatus",
    [PID_TAG_PKM_INTERNAL_DATA]: "pkmInternalData",
    [PID_TAG_LAST_CONFLICT]: "lastConflict",
    [PID_TAG_CONFLICT_MSG_KEY]: "conflictMsgKey",
    [PID_TAG_REPL_HEADER]: "replHeader",
    [PID_TAG_REPL_STATUS]: "replStatus",
    [PID_TAG_REPL_CHANGES]: "replChanges",
    [PID_TAG_REPL_RGM]: "replRgm",
    [PID_TAG_RMI]: "rmi",
    [PID_TAG_INTERNAL_POST_REPLY]: "internalPostReply",
    [PID_TAG_NTSD_MODIFICATION_TIME]: "ntsdModificationTime",
    [PID_TAG_PREVIEW_UNREAD]: "previewUnread",
    [PID_TAG_PREVIEW]: "preview",
    [PID_TAG_ABSTRACT]: "abstract",
    [PID_TAG_DL_REPORT_FLAGS]: "dlReportFlags",
    [PID_TAG_BILATERAL_INFO]: "bilateralInfo",
    [PID_TAG_MSG_BODY_ID]: "msgBodyId",
    [PID_TAG_INTERNET_CODEPAGE]: "internetCodepage",
    [PID_TAG_AUTO_RESPONSE_SUPPRESS]: "autoResponseSuppress",
    [PID_TAG_ACL_TABLE]: "aclTable",
    [PID_TAG_ACL_DATA]: "aclData",
    [PID_TAG_RULES_TABLE]: "rulesTable",
    [PID_TAG_RULES_DATA]: "rulesData",
    [PID_TAG_FOLDER_DESIGN_FLAGS]: "folderDesignFlags",
    [PID_TAG_DELEGATED_BY_RULE]: "delegatedByRule",
    [PID_TAG_DESIGN_IN_PROGRESS]: "designInProgress",
    [PID_TAG_SECURE_ORIGINATION]: "secureOrigination",
    [PID_TAG_PUBLISH_IN_ADDRESS_BOOK]: "publishInAddressBook",
    [PID_TAG_RESOLVE_METHOD]: "resolveMethod",
    [PID_TAG_ADDRESS_BOOK_DISPLAY_NAME]: "addressBookDisplayName",
    [PID_TAG_EFORMS_LOCALE_ID]: "eformsLocaleId",
    [PID_TAG_HAS_DAMS]: "hasDams",
    [PID_TAG_DEFERRED_SEND_NUMBER]: "deferredSendNumber",
    [PID_TAG_DEFERRED_SEND_UNITS]: "deferredSendUnits",
    [PID_TAG_EXPIRY_NUMBER]: "expiryNumber",
    [PID_TAG_EXPIRY_UNITS]: "expiryUnits",
    [PID_TAG_DEFERRED_SEND_TIME]: "deferredSendTime",
    [PID_TAG_CONFLICT_ENTRY_ID]: "conflictEntryId",
    [PID_TAG_MESSAGE_LOCALE_ID]: "messageLocaleId",
    [PID_TAG_RULE_TRIGGER_HISTORY]: "ruleTriggerHistory",
    [PID_TAG_MOVE_TO_STORE_ENTRYID]: "moveToStoreEntryid",
    [PID_TAG_MOVE_TO_FOLDER_ENTRYID]: "moveToFolderEntryid",
    [PID_TAG_STORAGE_QUOTA_LIMIT]: "storageQuotaLimit",
    [PID_TAG_EXCESS_STORAGE_USED]: "excessStorageUsed",
    [PID_TAG_SVR_GENERATING_QUOTA_MSG]: "svrGeneratingQuotaMsg",
    [PID_TAG_CREATOR_NAME]: "creatorName",
    [PID_TAG_CREATOR_ENTRYID]: "creatorEntryid",
    [PID_TAG_LAST_MODIFIER_NAME]: "lastModifierName",
    [PID_TAG_LAST_MODIFIER_ENTRYID]: "lastModifierEntryid",
    [PID_TAG_REPLY_RECIPIENT_SMTP_PROXIES]: "replyRecipientSmtpProxies",
    [PID_TAG_MESSAGE_CODEPAGE]: "messageCodepage",
    [PID_TAG_EXTENDED_ACL_DATA]: "extendedAclData",
    [PID_TAG_FROM_I_HAVE]: "fromIHave",

    [PID_TAG_NEW_ATTACH]: "newAttach",
    [PID_TAG_START_EMBED]: "startEmbed",
    [PID_TAG_END_EMBED]: "endEmbed",
    [PID_TAG_START_RECIP]: "startRecip",
    [PID_TAG_END_RECIP]: "endRecip",
    [PID_TAG_END_CC_RECIP]: "endCcRecip",
    [PID_TAG_END_BCC_RECIP]: "endBccRecip",
    [PID_TAG_END_P1_RECIP]: "endP1Recip",
    [PID_TAG_START_TOP_FLD]: "startTopFld",
    [PID_TAG_START_SUB_FLD]: "startSubFld",
    [PID_TAG_END_FOLDER]: "endFolder",
    [PID_TAG_START_MESSAGE]: "startMessage",
    [PID_TAG_END_MESSAGE]: "endMessage",
    [PID_TAG_END_ATTACH]: "endAttach",
    [PID_TAG_EC_WARNING]: "ecWarning",
    [PID_TAG_START_FAI_MSG]: "startFaiMsg",
    [PID_TAG_NEW_FX_FOLDER]: "newFxFolder",
    [PID_TAG_INCR_SYNC_CHG]: "incrSyncChg",
    [PID_TAG_INCR_SYNC_DEL]: "incrSyncDel",
    [PID_TAG_INCR_SYNC_END]: "incrSyncEnd",
    [PID_TAG_INCR_SYNC_MSG]: "incrSyncMsg",
    [PID_TAG_FX_DEL_PROP]: "fxDelProp",
    [PID_TAG_IDSET_GIVEN]: "idsetGiven",
    [PID_TAG_SENDER_FLAGS]: "senderFlags",
    [PID_TAG_SENT_REPRESENTING_FLAGS]: "sentRepresentingFlags",
    [PID_TAG_RCVD_BY_FLAGS]: "rcvdByFlags",
    [PID_TAG_RCVD_REPRESENTING_FLAGS]: "rcvdRepresentingFlags",
    [PID_TAG_ORIGINAL_SENDER_FLAGS]: "originalSenderFlags",
    [PID_TAG_ORIGINAL_SENT_REPRESENTING_FLAGS]: "originalSentRepresentingFlags",
    [PID_TAG_REPORT_FLAGS]: "reportFlags",
    [PID_TAG_READ_RECEIPT_FLAGS]: "readReceiptFlags",
    [PID_TAG_SOFT_DELETES]: "softDeletes",
    [PID_TAG_CREATOR_ADDRESS_TYPE]: "creatorAddressType",
    [PID_TAG_CREATOR_EMAIL_ADDRESS]: "creatorEmailAddress",
    [PID_TAG_MESSAGE_SUBMISSION_ID_FROM_CLIENT]: "messageSubmissionIdFromClient",
    [PID_TAG_SENDER_SIMPLE_DISP_NAME]: "senderSimpleDispName",
    [PID_TAG_SENT_REPRESENTING_SIMPLE_DISP_NAME]: "sentRepresentingSimpleDispName",
    [PID_TAG_RECEIVED_REPRESENTING_SIMPLE_DISP_NAME]: "receivedRepresentingSimpleDispName",
    [PID_TAG_CREATOR_SIMPLE_DISP_NAME]: "creatorSimpleDispName",
    [PID_TAG_LAST_MODIFIER_SIMPLE_DISP_NAME]: "lastModifierSimpleDispName",
    [PID_TAG_ORG_ADDR_TYPE]: "orgAddrType",
    [PID_TAG_ORG_EMAIL_ADDR]: "orgEmailAddr",
    [PID_TAG_CREATOR_FLAGS]: "creatorFlags",
    [PID_TAG_MODIFIER_FLAGS]: "modifierFlags",
    [PID_TAG_ORIGINATOR_FLAGS]: "originatorFlags",
    [PID_TAG_REPORT_DESTINATION_FLAGS]: "reportDestinationFlags",
    [PID_TAG_ORIGINAL_AUTHOR_FLAGS]: "originalAuthorFlags",
    [PID_TAG_ORIGINATOR_SEARCH_KEY]: "originatorSearchKey",
    [PID_TAG_REPORT_DESTINATION_SEARCH_KEY]: "reportDestinationSearchKey",
    [PID_TAG_ER_FLAG]: "erFlag",
    [PID_TAG_INTERNET_SUBJECT]: "internetSubject",
    [PID_TAG_INTERNET_SENT_REPRESENTING_NAME]: "internetSentRepresentingName",
    [PID_TAG_CONTENT_FILTER_SCL]: "contentFilterScl",

    [PID_TAG_HIER_REV]: "hierRev",
    [PID_TAG_CONTENT_FILTER_PHISHING_CONFIDENCE_LEVEL]: "contentFilterPhishingConfidenceLevel",

    [PID_TAG_INET_MAIL_OVERRIDE_FORMAT]: "inetMailOverrideFormat",
    [PID_TAG_MESSAGE_EDITOR_FORMAT]: "messageEditorFormat",

    [PID_TAG_SENDER_SMTP_ADDRESS]: "senderSMTPAddress",
    [PID_TAG_SENT_REPRESENTING_SMTP_ADDRESS]: "sentRepresentingSMTPAddress",
    [PID_TAG_RECEIVED_BY_SMTP_ADDRESS]: "receivedBySMTPAddress",
    [PID_TAG_RECEIVED_REPRESENTING_SMTP_ADDRESS]: "receivedRepresentingSMTPAddress",
    [PID_TAG_CREATOR_SMTP_ADDRESS]: "creatorSMTPAddress",
    [PID_TAG_LAST_MODIFIER_SMTP_ADDRESS]: "lastModifierSMTPAddress",

    [PID_TAG_RECIPIENT_DISPLAY_NAME]: "recipientDisplayName",
    [PID_TAG_RECIPIENT_ENTRYID]: "recipientEntryid",
    [PID_TAG_RECIPIENT_TRACKSTATUS_ME]: "recipientTrackstatusMe",
    [PID_TAG_RECIPIENTS_FLAGS]: "recipientsFlags",
    [PID_TAG_RECIPIENT_TRACKSTATUS]: "recipientTrackstatus",


    [PID_TAG_DOTSTUFF_STATE]: "dotstuffState",
    [PID_TAG_RULE_SERVER_RULE_ID]: "ruleServerRuleId",
    [PID_TAG_REPLY_TEMPLATE_ID]: "replyTemplateId",
    [PID_TAG_SECURE_SUBMIT_FLAGS]: "secureSubmitFlags",
    [PID_TAG_SOURCE_KEY]: "sourceKey",
    [PID_TAG_PARENT_SOURCE_KEY]: "parentSourceKey",
    [PID_TAG_CHANGE_KEY]: "changeKey",
    [PID_TAG_PREDECESSOR_CHANGE_LIST]: "predecessorChangeList",
    [PID_TAG_SYNCHRONIZE_FLAGS]: "synchronizeFlags",
    [PID_TAG_AUTO_ADD_NEW_SUBS]: "autoAddNewSubs",
    [PID_TAG_NEW_SUBS_GET_AUTO_ADD]: "newSubsGetAutoAdd",
    [PID_TAG_MESSAGE_SITE_NAME]: "messageSiteName",
    [PID_TAG_MESSAGE_PROCESSED]: "messageProcessed",
    [PID_TAG_RULE_MSG_STATE]: "ruleMsgState",
    [PID_TAG_RULE_MSG_USER_FLAGS]: "ruleMsgUserFlags",
    [PID_TAG_RULE_MSG_PROVIDER]: "ruleMsgProvider",
    [PID_TAG_RULE_MSG_NAME]: "ruleMsgName",
    [PID_TAG_RULE_MSG_LEVEL]: "ruleMsgLevel",
    [PID_TAG_RULE_MSG_PROVIDER_DATA]: "ruleMsgProviderData",
    [PID_TAG_RULE_MSG_ACTIONS]: "ruleMsgActions",
    [PID_TAG_RULE_MSG_CONDITION]: "ruleMsgCondition",
    [PID_TAG_RULE_MSG_CONDITION_LCID]: "ruleMsgConditionLcid",
    [PID_TAG_RULE_MSG_VERSION]: "ruleMsgVersion",
    [PID_TAG_RULE_MSG_SEQUENCE]: "ruleMsgSequence",
    [PID_TAG_PREVENT_MSG_CREATE]: "preventMsgCreate",
    [PID_TAG_IMAP_INTERNAL_DATE]: "imapInternalDate",

    [PID_TAG_PROFILE_VERSION]: "profileVersion",
    [PID_TAG_PROFILE_CONFIG_FLAGS]: "profileConfigFlags",
    [PID_TAG_PROFILE_HOME_SERVER]: "profileHomeServer",
    [PID_TAG_PROFILE_USER]: "profileUser",
    [PID_TAG_PROFILE_CONNECT_FLAGS]: "profileConnectFlags",
    [PID_TAG_PROFILE_TRANSPORT_FLAGS]: "profileTransportFlags",
    [PID_TAG_PROFILE_UI_STATE]: "profileUiState",
    [PID_TAG_PROFILE_UNRESOLVED_NAME]: "profileUnresolvedName",
    [PID_TAG_PROFILE_UNRESOLVED_SERVER]: "profileUnresolvedServer",
    [PID_TAG_PROFILE_OPEN_FLAGS]: "profileOpenFlags",
    [PID_TAG_PROFILE_BINDING_ORDER]: "profileBindingOrder",
    [PID_TAG_PROFILE_TYPE]: "profileType",
    [PID_TAG_PROFILE_MAILBOX]: "profileMailbox",
    [PID_TAG_PROFILE_SERVER]: "profileServer",
    [PID_TAG_PROFILE_MAX_RESTRICT]: "profileMaxRestrict",
    [PID_TAG_PROFILE_AB_FILES_PATH]: "profileAbFilesPath",
    [PID_TAG_PROFILE_FAVFLD_DISPLAY_NAME]: "profileFavfldDisplayName",
    [PID_TAG_INTERNET_MESSAGE_FORMAT]: "internetMessageFormat",
    [PID_TAG_PROFILE_OFFLINE_STORE_PATH]: "profileOfflineStorePath",
    [PID_TAG_CONTACT_ADDRESS_BOOK_STORE_SUPPORT_MASK]: "contactAddressBookStoreSupportMask",
    [PID_TAG_PROFILE_OFFLINE_INFO]: "profileOfflineInfo",
    [PID_TAG_INTERNET_WRAPPING_LENGTH]: "internetWrappingLength",
    [PID_TAG_PROFILE_HOME_SERVER_DN]: "profileHomeServerDn",
    [PID_TAG_PROFILE_HOME_SERVER_ADDRS]: "profileHomeServerAddrs",
    [PID_TAG_PROFILE_SERVER_DN]: "profileServerDn",
    [PID_TAG_PROFILE_FAVFLD_COMMENT]: "profileFavfldComment",
    [PID_TAG_PROFILE_ALLPUB_DISPLAY_NAME]: "profileAllpubDisplayName",
    [PID_TAG_PROFILE_ALLPUB_COMMENT]: "profileAllpubComment",
    [PID_TAG_DISABLE_WINSOCK]: "disableWinsock",
    [PID_TAG_IN_TRANSIT]: "inTransit",
    [PID_TAG_PROFILE_AUTH_PACKAGE]: "profileAuthPackage",
    [PID_TAG_PST_BODY_PREFIX]: "pstBodyPrefix",
    [PID_TAG_USER_ENTRYID]: "userEntryid",
    [PID_TAG_USER_NAME]: "userName",
    [PID_TAG_MAILBOX_OWNER_ENTRYID]: "mailboxOwnerEntryid",
    [PID_TAG_MAILBOX_OWNER_NAME]: "mailboxOwnerName",
    [PID_TAG_PST_BEST_BODY_PROPTAG]: "pstBestBodyProptag",
    [PID_TAG_OOF_STATE]: "oofState",
    [PID_TAG_SCHEDULE_FOLDER_ENTRYID]: "scheduleFolderEntryid",
    [PID_TAG_IPM_DAF_ENTRYID]: "ipmDafEntryid",
    [PID_TAG_NON_IPM_SUBTREE_ENTRY_ID]: "nonIpmSubtreeEntryId",
    [PID_TAG_CONTACT_ADDRESS_BOOK_FOLDER_ENTRY_IDS]: "contactAddressBookFolderEntryIds",
    [PID_TAG_EFORMS_REGISTRY_ENTRYID]: "eformsRegistryEntryid",
    [PID_TAG_CONTACT_ADDRESS_BOOK_STORE_SUPPORT_MASKS]: "contactAddressBookStoreSupportMasks",
    [PID_TAG_SPLUS_FREE_BUSY_ENTRYID]: "splusFreeBusyEntryid",
    [PID_TAG_ROH_FLAGS]: "rohFlags",
    [PID_TAG_HIERARCHY_SERVER]: "hierarchyServer",
    [PID_TAG_OFFLINE_ADDRBOOK_ENTRYID]: "offlineAddrbookEntryid",
    [PID_TAG_EFORMS_FOR_LOCALE_ENTRYID]: "eformsForLocaleEntryid",
    [PID_TAG_FREE_BUSY_FOR_LOCAL_SITE_ENTRYID]: "freeBusyForLocalSiteEntryid",
    [PID_TAG_ADDRBOOK_FOR_LOCAL_SITE_ENTRYID]: "addrbookForLocalSiteEntryid",
    [PID_TAG_ROH_PROXY_AUTH_SCHEME]: "rohProxyAuthScheme",
    [PID_TAG_OFFLINE_MESSAGE_ENTRYID]: "offlineMessageEntryid",
    [PID_TAG_GW_MTSIN_ENTRYID]: "gwMtsinEntryid",
    [PID_TAG_GW_MTSOUT_ENTRYID]: "gwMtsoutEntryid",
    [PID_TAG_TRANSFER_ENABLED]: "transferEnabled",
    [PID_TAG_TEST_LINE_SPEED]: "testLineSpeed",
    [PID_TAG_HIERARCHY_SYNCHRONIZER]: "hierarchySynchronizer",
    [PID_TAG_CONTENTS_SYNCHRONIZER]: "contentsSynchronizer",
    [PID_TAG_COLLECTOR]: "collector",
    [PID_TAG_FAST_TRANSFER]: "fastTransfer",
    [PID_TAG_IPM_FAVORITES_ENTRYID]: "ipmFavoritesEntryid",
    [PID_TAG_IPM_PUBLIC_FOLDERS_ENTRYID]: "ipmPublicFoldersEntryid",
    [PID_TAG_STORE_OFFLINE]: "storeOffline",
    [PID_TAG_PST_LRNORESTRICTIONS]: "pstLrnorestrictions",
    [PID_TAG_CHANGE_ADVISOR]: "changeAdvisor",
    [PID_TAG_PST_HIDDEN_COUNT]: "pstHiddenCount",
    [PID_TAG_FAVORITES_DEFAULT_NAME]: "favoritesDefaultName",
    [PID_TAG_PST_HIDDEN_UNREAD]: "pstHiddenUnread",
    [PID_TAG_SYS_CONFIG_FOLDER_ENTRYID]: "sysConfigFolderEntryid",
    [PID_TAG_CHANGE_NOTIFICATION_GUID]: "changeNotificationGuid",
    [PID_TAG_FOLDER_CHILD_COUNT]: "folderChildCount",
    [PID_TAG_RIGHTS]: "rights",
    [PID_TAG_HAS_RULES]: "hasRules",
    [PID_TAG_ADDRESS_BOOK_ENTRY_ID]: "addressBookEntryId",
    [PID_TAG_PUBLIC_FOLDER_ENTRYID]: "publicFolderEntryid",
    [PID_TAG_OFFLINE_FLAGS]: "offlineFlags",
    [PID_TAG_HIERARCHY_CHANGE_NUMBER]: "hierarchyChangeNumber",
    [PID_TAG_HAS_MODERATOR_RULES]: "hasModeratorRules",
    [PID_TAG_DELETED_MSG_COUNT]: "deletedMsgCount",
    [PID_TAG_DELETED_FOLDER_COUNT]: "deletedFolderCount",
    [PID_TAG_OLDEST_DELETED_ON]: "oldestDeletedOn",
    [PID_TAG_DELETED_ASSOC_MSG_COUNT]: "deletedAssocMsgCount",
    [PID_TAG_REPLICA_SERVER]: "replicaServer",
    [PID_TAG_CLIENT_ACTIONS]: "clientActions",
    [PID_TAG_DAM_ORIGINAL_ENTRYID]: "damOriginalEntryid",
    [PID_TAG_DAM_BACK_PATCHED]: "damBackPatched",
    [PID_TAG_RULE_ERROR]: "ruleError",
    [PID_TAG_RULE_ACTION_TYPE]: "ruleActionType",
    [PID_TAG_HAS_NAMED_PROPERTIES]: "hasNamedProperties",
    [PID_TAG_REPLICA_VERSION]: "replicaVersion",
    [PID_TAG_RULE_ACTION_NUMBER]: "ruleActionNumber",
    [PID_TAG_RULE_FOLDER_ENTRYID]: "ruleFolderEntryid",
    [PID_TAG_ACTIVE_USER_ENTRYID]: "activeUserEntryid",
    [PID_TAG_0X400_ENVELOPE_TYPE]: "0x400EnvelopeType",
    [PID_TAG_MSG_FOLD_TIME]: "msgFoldTime",
    [PID_TAG_ICS_CHANGE_KEY]: "icsChangeKey",
    [PID_TAG_GW_ADMIN_OPERATIONS]: "gwAdminOperations",
    [PID_TAG_INTERNET_CONTENT]: "internetContent",
    [PID_TAG_HAS_ATTACH_FROM_IMAIL]: "hasAttachFromImail",
    [PID_TAG_ORIGINATOR_NAME]: "originatorName",
    [PID_TAG_ORIGINATOR_ADDR]: "originatorAddr",
    [PID_TAG_ORIGINATOR_ADDRTYPE]: "originatorAddrtype",
    [PID_TAG_ORIGINATOR_ENTRYID]: "originatorEntryid",
    [PID_TAG_ARRIVAL_TIME]: "arrivalTime",
    [PID_TAG_TRACE_INFO]: "traceInfo",
    [PID_TAG_SUBJECT_TRACE_INFO]: "subjectTraceInfo",
    [PID_TAG_RECIPIENT_NUMBER]: "recipientNumber",
    [PID_TAG_MTS_SUBJECT_ID]: "mtsSubjectId",
    [PID_TAG_REPORT_DESTINATION_NAME]: "reportDestinationName",
    [PID_TAG_REPORT_DESTINATION_ENTRYID]: "reportDestinationEntryid",
    [PID_TAG_CONTENT_SEARCH_KEY]: "contentSearchKey",
    [PID_TAG_FOREIGN_ID]: "foreignId",
    [PID_TAG_FOREIGN_REPORT_ID]: "foreignReportId",
    [PID_TAG_FOREIGN_SUBJECT_ID]: "foreignSubjectId",
    [PID_TAG_INTERNAL_TRACE_INFO]: "internalTraceInfo",
    [PID_TAG_IN_CONFLICT]: "inConflict",
    [PID_TAG_LONGTERM_ENTRYID_FROM_TABLE]: "longtermEntryidFromTable",
    [PID_TAG_MEMBER_ID]: "memberId",
    [PID_TAG_MEMBER_NAME]: "memberName",
    [PID_TAG_MEMBER_RIGHTS]: "memberRights",
    [PID_TAG_RULE_ID]: "ruleId",
    [PID_TAG_RULE_IDS]: "ruleIds",
    [PID_TAG_RULE_SEQUENCE]: "ruleSequence",
    [PID_TAG_RULE_STATE]: "ruleState",
    [PID_TAG_RULE_USER_FLAGS]: "ruleUserFlags",
    [PID_TAG_RULE_CONDITION]: "ruleCondition",
    [PID_TAG_PROFILE_MOAB]: "profileMoab",
    [PID_TAG_PROFILE_MOAB_GUID]: "profileMoabGuid",
    [PID_TAG_PROFILE_MOAB_SEQ]: "profileMoabSeq",
    [PID_TAG_IMPLIED_RESTRICTIONS]: "impliedRestrictions",
    [PID_TAG_RULE_ACTIONS]: "ruleActions",
    [PID_TAG_RULE_PROVIDER]: "ruleProvider",
    [PID_TAG_RULE_NAME]: "ruleName",
    [PID_TAG_RULE_LEVEL]: "ruleLevel",
    [PID_TAG_RULE_PROVIDER_DATA]: "ruleProviderData",
    [PID_TAG_LAST_FULL_BACKUP]: "lastFullBackup",
    [PID_TAG_PROFILE_ADDR_INFO]: "profileAddrInfo",
    [PID_TAG_PROFILE_OPTIONS_DATA]: "profileOptionsData",
    [PID_TAG_EVENTS_ROOT_FOLDER_ENTRYID]: "eventsRootFolderEntryid",
    [PID_TAG_INBOUND_NEWSFEED_DN]: "inboundNewsfeedDn",
    [PID_TAG_OUTBOUND_NEWSFEED_DN]: "outboundNewsfeedDn",
    [PID_TAG_DELETED_ON]: "deletedOn",
    [PID_TAG_REPLICATION_STYLE]: "replicationStyle",
    [PID_TAG_REPLICATION_SCHEDULE]: "replicationSchedule",
    [PID_TAG_REPLICATION_MESSAGE_PRIORITY]: "replicationMessagePriority",
    [PID_TAG_OVERALL_MSG_AGE_LIMIT]: "overallMsgAgeLimit",
    [PID_TAG_REPLICATION_ALWAYS_INTERVAL]: "replicationAlwaysInterval",
    [PID_TAG_REPLICATION_MSG_SIZE]: "replicationMsgSize",
    [PID_TAG_IS_NEWSGROUP_ANCHOR]: "isNewsgroupAnchor",
    [PID_TAG_IS_NEWSGROUP]: "isNewsgroup",
    [PID_TAG_REPLICA_LIST]: "replicaList",
    [PID_TAG_OVERALL_AGE_LIMIT]: "overallAgeLimit",
    [PID_TAG_INTERNET_CHARSET]: "internetCharset",
    [PID_TAG_DELETED_MESSAGE_SIZE_EXTENDED]: "deletedMessageSizeExtended",
    [PID_TAG_DELETED_NORMAL_MESSAGE_SIZE_EXTENDED]: "deletedNormalMessageSizeExtended",
    [PID_TAG_DELETED_ASSOC_MESSAGE_SIZE_EXTENDED]: "deletedAssocMessageSizeExtended",
    [PID_TAG_SECURE_IN_SITE]: "secureInSite",
    [PID_TAG_NT_USER_NAME]: "ntUserName",
    [PID_TAG_LOCALE_ID]: "localeId",
    [PID_TAG_LAST_LOGON_TIME]: "lastLogonTime",
    [PID_TAG_LAST_LOGOFF_TIME]: "lastLogoffTime",
    [PID_TAG_STORAGE_LIMIT_INFORMATION]: "storageLimitInformation",
    [PID_TAG_NEWSGROUP_COMPONENT]: "newsgroupComponent",
    [PID_TAG_NEWSFEED_INFO]: "newsfeedInfo",
    [PID_TAG_INTERNET_NEWSGROUP_NAME]: "internetNewsgroupName",
    [PID_TAG_FOLDER_FLAGS]: "folderFlags",
    [PID_TAG_LAST_ACCESS_TIME]: "lastAccessTime",
    [PID_TAG_RESTRICTION_COUNT]: "restrictionCount",
    [PID_TAG_CATEG_COUNT]: "categCount",
    [PID_TAG_CACHED_COLUMN_COUNT]: "cachedColumnCount",
    [PID_TAG_NORMAL_MSG_W_ATTACH_COUNT]: "normalMsgWAttachCount",
    [PID_TAG_ASSOC_MSG_W_ATTACH_COUNT]: "assocMsgWAttachCount",
    [PID_TAG_RECIPIENT_ON_NORMAL_MSG_COUNT]: "recipientOnNormalMsgCount",
    [PID_TAG_RECIPIENT_ON_ASSOC_MSG_COUNT]: "recipientOnAssocMsgCount",
    [PID_TAG_ATTACH_ON_NORMAL_MSG_COUNT]: "attachOnNormalMsgCount",
    [PID_TAG_ATTACH_ON_ASSOC_MSG_COUNT]: "attachOnAssocMsgCount",
    [PID_TAG_NORMAL_MESSAGE_SIZE]: "normalMessageSize",
    [PID_TAG_NORMAL_MESSAGE_SIZE_EXTENDED]: "normalMessageSizeExtended",
    [PID_TAG_ASSOC_MESSAGE_SIZE]: "assocMessageSize",
    [PID_TAG_ASSOC_MESSAGE_SIZE_EXTENDED]: "assocMessageSizeExtended",
    [PID_TAG_FOLDER_PATHNAME]: "folderPathname",
    [PID_TAG_OWNER_COUNT]: "ownerCount",
    [PID_TAG_CONTACT_COUNT]: "contactCount",
    [PID_TAG_CODE_PAGE_ID]: "codePageId",
    [PID_TAG_RETENTION_AGE_LIMIT]: "retentionAgeLimit",
    [PID_TAG_DISABLE_PERUSER_READ]: "disablePeruserRead",
    [PID_TAG_INTERNET_PARSE_STATE]: "internetParseState",
    [PID_TAG_INTERNET_MESSAGE_INFO]: "internetMessageInfo",
    [PID_TAG_LATEST_PST_ENSURE]: "latestPstEnsure",
    [PID_TAG_PST_PATH]: "pstPath",
    [PID_TAG_PST_REMEMBER_PW]: "pstRememberPw",
    [PID_TAG_OST_ENCRYPTION]: "ostEncryption",
    [PID_TAG_PST_PW_SZ_OLD]: "pstPwSzOld",
    [PID_TAG_PST_PW_SZ_NEW]: "pstPwSzNew",
    [PID_TAG_SORT_LOCALE_ID]: "sortLocaleId",
    [PID_TAG_PST_IMPSUBTREE_DESCENDANT]: "pstImpsubtreeDescendant",
    [PID_TAG_URL_NAME]: "urlName",
    [PID_TAG_LOCAL_COMMIT_TIME]: "localCommitTime",
    [PID_TAG_LOCAL_COMMIT_TIME_MAX]: "localCommitTimeMax",
    [PID_TAG_DELETED_COUNT_TOTAL]: "deletedCountTotal",
    [PID_TAG_AUTO_RESET]: "autoReset",
    [PID_TAG_URL_COMP_NAME_HASH]: "urlCompNameHash",
    [PID_TAG_MSG_FOLDER_TEMPLATE_RES_2]: "msgFolderTemplateRes2",
    [PID_TAG_RANK]: "rank",
    [PID_TAG_MSG_FOLDER_TEMPLATE_RES_4]: "msgFolderTemplateRes4",
    [PID_TAG_MSG_FOLDER_TEMPLATE_RES_5]: "msgFolderTemplateRes5",
    [PID_TAG_MSG_FOLDER_TEMPLATE_RES_6]: "msgFolderTemplateRes6",
    [PID_TAG_MSG_FOLDER_TEMPLATE_RES_7]: "msgFolderTemplateRes7",
    [PID_TAG_MSG_FOLDER_TEMPLATE_RES_8]: "msgFolderTemplateRes8",
    [PID_TAG_MSG_FOLDER_TEMPLATE_RES_9]: "msgFolderTemplateRes9",
    [PID_TAG_MSG_FOLDER_TEMPLATE_RES_10]: "msgFolderTemplateRes10",
    [PID_TAG_MSG_FOLDER_TEMPLATE_RES_11]: "msgFolderTemplateRes11",
    [PID_TAG_MSG_FOLDER_TEMPLATE_RES_12]: "msgFolderTemplateRes12",
    [PID_TAG_PF_PLATINUM_HOME_MDB]: "pfPlatinumHomeMdb",
    [PID_TAG_PF_PROXY_REQUIRED]: "pfProxyRequired",
    [PID_TAG_INTERNET_FREE_DOC_INFO]: "internetFreeDocInfo",
    [PID_TAG_PF_OVER_HARD_QUOTA_LIMIT]: "pfOverHardQuotaLimit",
    [PID_TAG_PF_MSG_SIZE_LIMIT]: "pfMsgSizeLimit",
    [PID_TAG_CONNECTION_MODULUS]: "connectionModulus",
    [PID_TAG_CONNECTION_MODULUS_EXTENDED]: "connectionModulusExtended",
    [PID_TAG_DELIVER_TO_DN]: "deliverToDn",
    [PID_TAG_MIME_SIZE]: "mimeSize",
    [PID_TAG_FILE_SIZE_EXTENDED]: "fileSizeExtended",
    [PID_TAG_FOLDER_ID]: "folderId",
    [PID_TAG_PARENT_FOLDER_ID]: "parentFolderId",
    [PID_TAG_MID]: "mid",
    [PID_TAG_CATEG_ID]: "categId",
    [PID_TAG_PARENT_CATEG_ID]: "parentCategId",
    [PID_TAG_INST_ID]: "instId",
    [PID_TAG_INSTANCE_NUM]: "instanceNum",
    [PID_TAG_ADDRBOOK_MID]: "addrbookMid",
    [PID_TAG_ICS_NOTIF]: "icsNotif",
    [PID_TAG_ARTICLE_NUM_NEXT]: "articleNumNext",
    [PID_TAG_IMAP_LAST_ARTICLE_ID]: "imapLastArticleId",
    [PID_TAG_NOT_822_RENDERABLE]: "not822Renderable",
    [PID_TAG_LTID]: "ltid",
    [PID_TAG_CN_EXPORT]: "cnExport",
    [PID_TAG_PCL_EXPORT]: "pclExport",
    [PID_TAG_CN_MV_EXPORT]: "cnMvExport",
    [PID_TAG_PST_CONFIGURATION_FLAGS]: "pstConfigurationFlags",
    [PID_TAG_PST_SUBTREE_CONTAINER]: "pstSubtreeContainer",
    [PID_TAG_PF_QUOTA_STYLE]: "pfQuotaStyle",
    [PID_TAG_PF_STORAGE_QUOTA]: "pfStorageQuota",
    [PID_TAG_SEARCH_FLAGS]: "searchFlags",
    [PID_TAG_USER_SID]: "userSid",
    [PID_TAG_CNSET_SEEN]: "cnsetSeen",
    [PID_TAG_CHANGE_NUMBER]: "changeNumber",
    [PID_TAG_ASSOCIATED]: "associated",
    [PID_TAG_CNSET_SEEN_FAI]: "cnsetSeenFAI",
    [PID_TAG_PROFILE_SECURE_MAILBOX]: "profileSecureMailbox",
    [PID_TAG_LTP_PARENT_NID]: "ltpParentNid",
    [PID_TAG_LTP_ROW_ID]: "ltpRowId",
    [PID_TAG_LTP_ROW_VER]: "ltpRowVer",
    [PRQ_ID_SECURE4]: "idSecure4",
    [PID_TAG_PST_PASSWORD]: "pstPassword",
    [PID_TAG_OFFLINE_ADDRESS_BOOK_NAME]: "offlineAddressBookName",
    [PID_TAG_MAILBEAT_REQUEST_SENT]: "mailbeatRequestSent",
    [PID_TAG_USENET_SITE_NAME]: "usenetSiteName",
    [PID_TAG_SEND_OUTLOOK_RECALL_REPORT]: "sendOutlookRecallReport",
    [PID_TAG_MAILBEAT_REQUEST_RECEIVED]: "mailbeatRequestReceived",
    [PID_TAG_MAILBEAT_REQUEST_PROCESSED]: "mailbeatRequestProcessed",
    [PID_TAG_SHUTOFFQUOTA]: "shutoffquota",
    [PID_TAG_OFFLINE_ADDRESS_BOOK_TRUNCATED_PROPERTIES]: "offlineAddressBookTruncatedProperties",
    [PID_TAG_MAILBEAT_REPLY_SENT]: "mailbeatReplySent",
    [PID_TAG_MAILBEAT_REPLY_SUBMIT]: "mailbeatReplySubmit",
    [PID_TAG_OFFLINE_ADDRESS_BOOK_FILE_TYPE]: "offlineAddressBookFileType",
    [PID_TAG_MAILBEAT_REPLY_RECEIVED]: "mailbeatReplyReceived",
    [PID_TAG_MAILBEAT_REPLY_PROCESSED]: "mailbeatReplyProcessed",
    [PID_TAG_MAPI_FORM_COMPOSE_COMMAND]: "mapiFormComposeCommand",
    [PID_TAG_VIEW_CLSID]: "viewClsid",
    [PID_TAG_VIEW_STYLE]: "viewStyle",
    [PID_TAG_VIEW_MAJORVERSION]: "viewMajorversion",
    [PID_TAG_SCHDINFO_RESOURCE_TYPE]: "schdinfoResourceType",
    [PID_TAG_SEARCH_FOLDER_ID]: "searchFolderId",
    [PID_TAG_DELEGATES_DISPLAY_NAMES]: "delegatesDisplayNames",
    [PID_TAG_DELEGATES_ENTRYID]: "delegatesEntryid",
    [PID_TAG_DELEGATES_ENTRYIDS]: "delegatesEntryids",
    [PID_TAG_FREEBUSY_START_RANGE]: "freebusyStartRange",
    [PID_TAG_SEARCH_FOLDER_EFP_FLAGS]: "searchFolderEfpFlags",
    [PID_TAG_FREEBUSY_EMAIL_ADDRESS]: "freebusyEmailAddress",
    [PID_TAG_FREEBUSY_ALL_MONTHS]: "freebusyAllMonths",
    [PID_TAG_FREEBUSY_ALL_EVENTS]: "freebusyAllEvents",
    [PID_TAG_FREEBUSY_TENTATIVE_MONTHS]: "freebusyTentativeMonths",
    [PID_TAG_FREEBUSY_TENTATIVE_EVENTS]: "freebusyTentativeEvents",
    [PID_TAG_FREEBUSY_BUSY_MONTHS]: "freebusyBusyMonths",
    [PID_TAG_FREEBUSY_BUSY_EVENTS]: "freebusyBusyEvents",
    [PID_TAG_FREEBUSY_OOF_MONTHS]: "freebusyOofMonths",
    [PID_TAG_FREEBUSY_OOF_EVENTS]: "freebusyOofEvents",
    [PID_TAG_FREEBUSY_LAST_MODIFIED]: "freebusyLastModified",
    [PID_TAG_FREEBUSY_NUM_MONTHS]: "freebusyNumMonths",
    [PID_TAG_DELEGATES_SEE_PRIVATE]: "delegatesSeePrivate",
    [PID_TAG_PERSONAL_FREEBUSY]: "personalFreebusy",
    [PID_TAG_PROCESS_MEETING_REQUESTS]: "processMeetingRequests",
    [PID_TAG_DECLINE_RECURRING_MEETING_REQUESTS]: "declineRecurringMeetingRequests",
    [PID_TAG_DECLINE_CONFLICTING_MEETING_REQUESTS]: "declineConflictingMeetingRequests",
    [PID_TAG_VD_BINARY]: "vdBinary",
    [PID_TAG_VD_STRINGS]: "vdStrings",
    [PID_TAG_VD_FLAGS]: "vdFlags",
    [PID_TAG_VD_LINK_TO]: "vdLinkTo",
    [PID_TAG_VD_VIEW_FOLDER]: "vdViewFolder",
    [PID_TAG_VD_NAME]: "vdName",
    [PID_TAG_VD_VERSION]: "vdVersion",

    [PID_TAG_FAV_DISPLAY_NAME]: "favDisplayName",
    [PID_TAG_FAV_PUBLIC_SOURCE_KEY]: "favPublicSourceKey",
    [PID_TAG_OST_OSTID]: "ostOstid",
    [PID_TAG_STORE_SLOWLINK]: "storeSlowlink",
    [PID_TAG_OST_SECURITY_FLD_SVTVER]: "ostSecurityFldSvrver",
    [PID_TAG_OST_LOCAL_COMMIT_TIME_MAX]: "ostLocalCommitTimeMax",
    [PID_TAG_OST_DELETED_COUNT_TOTAL]: "ostDeletedCountTotal",
    [PID_TAG_FAV_AUTOSUBFOLDERS]: "favAutosubfolders",
    [PID_TAG_PROCESSED]: "processed",
    [PID_TAG_FAV_PARENT_SOURCE_KEY]: "favParentSourceKey",
    [PID_TAG_FAV_LEVEL_MASK]: "favLevelMask",
    [PID_TAG_FAV_INHERIT_AUTO]: "favInheritAuto",
    [PID_TAG_FAV_DEL_SUBS]: "favDelSubs",

    [PID_TAG_ATTACHMENT_LINKID]: "attachmentLinkid",
    [PID_TAG_EXCEPTION_STARTTIME]: "exceptionStarttime",
    [PID_TAG_EXCEPTION_ENDTIME]: "exceptionEndtime",
    [PID_TAG_ATTACHMENT_FLAGS]: "attachmentFlags",
    [PID_TAG_ATTACHMENT_HIDDEN]: "attachmentHidden",
};
