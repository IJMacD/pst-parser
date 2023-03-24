// Area name            Property set name and   GUID value
// Common               PS_PUBLIC_STRINGS           {00020329-0000-0000-C000-000000000046}
// Common               PSETID_Common               {00062008-0000-0000-C000-000000000046}
// Contact              PSETID_Address              {00062004-0000-0000-C000-000000000046}
// Email                PS_INTERNET_HEADERS         {00020386-0000-0000-C000-000000000046}
// Calendar             PSETID_Appointment          {00062002-0000-0000-C000-000000000046}
// Calendar             PSETID_Meeting          	{6ED8DA90-450B-101B-98DA-00AA003F1305}
// Journal              PSETID_Log              	{0006200A-0000-0000-C000-000000000046}
// Messaging            PSETID_Messaging        	{41F28F13-83F4-4114-A584-EEDB5A6B0BFF}
// Sticky note          PSETID_Note                 {0006200E-0000-0000-C000-000000000046}
// RSS feed             PSETID_PostRss              {00062041-0000-0000-C000-000000000046}
// Task                 PSETID_Task     		    {00062003-0000-0000-C000-000000000046}
// Unified messaging    PSETID_UnifiedMessaging     {4442858E-A9E3-4E80-B900-317A210CC15B}
// Common               PS_MAPI                     {00020328-0000-0000-C000-000000000046}
// Sync                 PSETID_AirSync              {71035549-0739-4DCB-9163-00F0580DBBDF}
// Sharing              PSETID_Sharing			    {00062040-0000-0000-C000-000000000046}
// Extracted entities   PSETID_XmlExtractedEntities {23239608-685D-4732-9C55-4C95CB4E8E33}
// Attachment           PSETID_Attachment           {96357F7F-59E1-47D0-99A7-46515C183B54}

#define pidMeetingType 0x0026
#define pidFileUnder 0x8005
#define pidYomiFirstName 0x802C
#define pidYomiLastName 0x802D
#define pidYomiCompanyName 0x802E
#define pidWorkAddressStreet 0x8045
#define pidWorkAddressCity 0x8046
#define pidWorkAddressState 0x8047
#define pidWorkAddressPostalCode 0x8048
#define pidWorkAddressCountry 0x8049
#define pidWorkAddressPostOfficeBox 0x804A
#define pidInstMsg 0x8062
#define pidEmailDisplayName 0x8080
#define pidEmailAddrType 0x8082
#define pidEmailEmailAddress 0x8083
#define pidEmailOriginalDisplayName 0x8084
#define pidEmail1OriginalEntryID0x8085
#define pidEmail2DisplayName 0x8090
#define pidEmail2AddrType 0x8092
#define pidEmail2EmailAddress 0x8093
#define pidEmail2OriginalDisplayName 0x8094
#define pidEmail2OriginalEntryID0x8095
#define pidEmail3DisplayName 0x80A0
#define pidEmail3AddrType 0x80A2
#define pidEmail3EmailAddress 0x80A3
#define pidEmail3OriginalDisplayName 0x80A4
#define pidEmail3OriginalEntryID 0x80A5
#define pidTaskStatus 0x8101
#define pidTaskStartDate 0x8104
#define pidTaskDueDate 0x8105
#define pidTaskActualEffort 0x8110
#define pidTaskEstimatedEffort 0x8111
#define pidTaskFRecur 0x8126
#define pidBusyStatus0x8205
#define pidLocation 0x8208
#define pidApptStartWhole 0x820D
#define pidApptEndWhole 0x820E
#define pidApptDuration 0x8213
#define pidRecurring 0x8223
#define pidTimeZoneStruct 0x8233
#define pidAllAttendeesString 0x8238
#define pidToAttendeesString 0x823B
#define pidCCAttendeesString 0x823C
#define pidConfCheck 0x8240
#define pidApptCounterProposal 0x8257
#define pidApptTZDefStartDisplay 0x825E
#define pidApptTZDefEndDisplay 0x825F
#define pidApptTZDefRecur 0x8260
#define pidReminderTime 0x8502
#define pidReminderSet 0x8503
#define pidFormStorage 0x850F
#define pidPageDirStream 0x8513
#define pidSmartNoAttach 0x8514
#define pidCommonStart 0x8516
#define pidCommonEnd 0x8517
#define pidFormPropStream 0x851B
#define pidRequest 0x8530
#define pidCompanies 0x8539
#define pidContacts 0x853A
#define pidPropDefStream 0x8540
#define pidScriptStream 0x8541
#define pidCustomFlag 0x8542
#define pidReminderNextTime 0x8560
#define pidHeaderItem 0x8578
#define pidUseTNEF 0x8582
#define pidToDoTitle 0x85A4
#define pidLogType 0x8700
#define pidLogStart 0x8706
#define pidLogDuration 0x8707
#define pidLogEnd 0x8708

// In PSETID_Address
#define pidWorkAddressStreet 0x8045
#define pidWorkAddressCity 0x8046
#define pidWorkAddressState 0x8047
#define pidWorkAddressPostalCode 0x8048
#define pidWorkAddressCountry 0x8049
#define pidInstMsg 0x8062
#define pidEmailDisplayName 0x8080
#define pidEmailOriginalDisplayName 0x8084

// In PSETID_Appointment
#define pidLocation 0x8208
#define pidApptStartWhole 0x820D
#define pidApptEndWhole 0x820E
#define pidApptDuration 0x8213
#define pidRecurring 0x8223
#define pidAllAttendeesString 0x8238
#define pidToAttendeesString 0x823B
#define pidCCAttendeesString 0x823C

// In PSETID_Common
#define pidReminderSet 0x8503
#define pidSmartNoAttach 0x8514
#define pidCommonStart 0x8516
#define pidCommonEnd 0x8517
#define pidRequest 0x8530
#define pidCompanies 0x8539
#define pidReminderNextTime 0x8560

// In PSETID_Log (also known as Journal)
#define pidLogType 0x8700
#define pidLogStart 0x8706
#define pidLogDuration 0x8707
#define pidLogEnd 0x8708

// In PSETID_Task
#define pidTaskStartDate 0x8104
#define pidTaskDueDate 0x8105
#define pidTaskActualEffort 0x8110
#define pidTaskEstimatedEffort 0x8111
#define pidTaskFRecur 0x8126