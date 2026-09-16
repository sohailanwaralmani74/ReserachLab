import { computeStringSHA256 } from './crypto.js';

export async function createSampleInvestigation() {
  const hash1 = await computeStringSHA256('contract-tender-2024-v2-meridian');
  const hash2 = await computeStringSHA256('procurement-awards-ledger-q3');
  const hash3 = await computeStringSHA256('wiretap-transcript-session-04');
  const hash4 = await computeStringSHA256('customs-declaration-manifest-508');
  const hash5 = await computeStringSHA256('corporate-registry-shell-filing');

  const investigation = {
    id: 'inv-apex-meridian',
    name: 'Project Meridian: Offshore Procurement Audit',
    leadInvestigator: 'Chief Research Analyst',
    description: 'Cross-border evidence verification investigating undisclosed tender awards and shell entity wire transfers between 2023 and 2025.',
    createdAt: '2024-01-15T09:00:00.000Z',
    lastModified: new Date().toISOString(),
  };

  const folders = [
    { id: 'f-sources', name: 'Primary Tender Records', createdAt: '2024-01-15T09:05:00.000Z' },
    { id: 'f-financial', name: 'Financial Ledgers', createdAt: '2024-01-15T09:10:00.000Z' },
    { id: 'f-interviews', name: 'Depositions & Transcripts', createdAt: '2024-01-15T09:15:00.000Z' },
  ];

  const sources = [
    {
      id: 'S01',
      name: 'contract-procurement-2024.pdf',
      originalName: 'contract-procurement-2024.pdf',
      type: 'pdf',
      mimeType: 'application/pdf',
      size: 428900,
      sha256: hash1,
      importedAt: '2024-01-15T09:30:00.000Z',
      pageCount: 3,
      sheetCount: 0,
      folderId: 'f-sources',
      indexingState: 'indexed',
      rawText: `--- Page 1 ---
PUBLIC MARITIME PROCUREMENT CONTRACT #PMC-2024-887
BETWEEN: Department of Maritime Infrastructure (The Authority)
AND: Apex Logistics Corp / Meridian Horizon Joint Venture (The Contractor)
Dated this 14th day of February, 2024.
SECTION 1: SCOPE OF SERVICES
The Contractor agrees to execute deepwater berth maintenance and dredged spoil containment at Zone 4.
Total Contract Consideration: $24,800,000 USD payable across 4 scheduled milestone tranches.

--- Page 2 ---
SECTION 4: AWARD CRITERIA & DIRECTORS DISCLOSURE
Company A was awarded the primary maintenance tender under expedited sole-source determination.
All beneficial owners holding greater than 5% equity interest must be lodged with the Integrity Registry.
Sole director listed: John Smith (appointed December 18, 2023).
Previous parent company affiliation: Meridian Horizon Holdings Ltd (Tortola, BVI).

--- Page 3 ---
SECTION 9: TERMINATION CLAUSES & PAYMENTS PRIOR TO TERMINATION
Paragraph 9.4: Any early termination triggered under Article 12 shall mandate an audit of all payments made prior to termination.
Authorized signature: Elena Rostova, Procurement Director.
Seal affixed February 14, 2024.`,
      textPages: [
        {
          pageNumber: 1,
          text: 'PUBLIC MARITIME PROCUREMENT CONTRACT #PMC-2024-887\nBETWEEN: Department of Maritime Infrastructure (The Authority)\nAND: Apex Logistics Corp / Meridian Horizon Joint Venture (The Contractor)\nDated this 14th day of February, 2024.\nSECTION 1: SCOPE OF SERVICES\nThe Contractor agrees to execute deepwater berth maintenance and dredged spoil containment at Zone 4.\nTotal Contract Consideration: $24,800,000 USD payable across 4 scheduled milestone tranches.',
        },
        {
          pageNumber: 2,
          text: 'SECTION 4: AWARD CRITERIA & DIRECTORS DISCLOSURE\nCompany A was awarded the primary maintenance tender under expedited sole-source determination.\nAll beneficial owners holding greater than 5% equity interest must be lodged with the Integrity Registry.\nSole director listed: John Smith (appointed December 18, 2023).\nPrevious parent company affiliation: Meridian Horizon Holdings Ltd (Tortola, BVI).',
        },
        {
          pageNumber: 3,
          text: 'SECTION 9: TERMINATION CLAUSES & PAYMENTS PRIOR TO TERMINATION\nParagraph 9.4: Any early termination triggered under Article 12 shall mandate an audit of all payments made prior to termination.\nAuthorized signature: Elena Rostova, Procurement Director.\nSeal affixed February 14, 2024.',
        },
      ],
      metadata: {
        'Contract ID': 'PMC-2024-887',
        'Authority': 'Dept of Maritime Infrastructure',
        'File Size': '418.8 KB',
      },
      sourceDetails: 'Primary public contract document obtained via FOIA request #FOIA-2024-0982.',
    },
    {
      id: 'S02',
      name: 'procurement-awards-ledger.xlsx',
      originalName: 'procurement-awards-ledger.xlsx',
      type: 'xlsx',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: 198400,
      sha256: hash2,
      importedAt: '2024-01-16T11:20:00.000Z',
      pageCount: 2,
      sheetCount: 2,
      folderId: 'f-financial',
      indexingState: 'indexed',
      sheets: [
        {
          sheetName: 'Awards',
          headers: ['Row', 'AwardID', 'EntityName', 'TenderCode', 'AmountUSD', 'Date', 'Status'],
          rows: [
            [185, 'AWD-9912', 'Pacific Dredging Ltd', 'TR-044', '14,200,000', '2024-01-10', 'Completed'],
            [186, 'AWD-9913', 'Harbor Dynamics SA', 'TR-088', '8,400,000', '2024-01-22', 'Rejected'],
            [187, 'AWD-9914', 'Apex Logistics Corp', 'PMC-2024-887', '24,800,000', '2024-02-14', 'Disbursed Tranche 1'],
            [188, 'AWD-9915', 'Meridian Maritime', 'PMC-2024-887', '18,500,000', '2024-03-01', 'Under Review'],
          ],
        },
        {
          sheetName: 'BeneficialOwners',
          headers: ['EntityID', 'Nominee', 'UltimateBeneficiary', 'Jurisdiction', 'Percentage'],
          rows: [
            ['ENT-01', 'Vanguard Nominees Ltd', 'John Smith', 'British Virgin Islands', '68%'],
            ['ENT-02', 'Crestview Trustees', 'Elena Rostova', 'Cyprus', '32%'],
          ],
        },
      ],
      rawText: `=== Sheet: Awards ===
Headers: Row | AwardID | EntityName | TenderCode | AmountUSD | Date | Status
Row 1: 185 | AWD-9912 | Pacific Dredging Ltd | TR-044 | 14,200,000 | 2024-01-10 | Completed
Row 2: 186 | AWD-9913 | Harbor Dynamics SA | TR-088 | 8,400,000 | 2024-01-22 | Rejected
Row 3: 187 | AWD-9914 | Apex Logistics Corp | PMC-2024-887 | 24,800,000 | 2024-02-14 | Disbursed Tranche 1
Row 4: 188 | AWD-9915 | Meridian Maritime | PMC-2024-887 | 18,500,000 | 2024-03-01 | Under Review

=== Sheet: BeneficialOwners ===
Headers: EntityID | Nominee | UltimateBeneficiary | Jurisdiction | Percentage
Row 1: ENT-01 | Vanguard Nominees Ltd | John Smith | British Virgin Islands | 68%
Row 2: ENT-02 | Crestview Trustees | Elena Rostova | Cyprus | 32%`,
      metadata: {
        'Sheets': 'Awards, BeneficialOwners',
        'Record Count': '6 rows',
        'File Size': '193.7 KB',
      },
      sourceDetails: 'Internal spreadsheet leaked from ministry financial oversight committee.',
    },
    {
      id: 'S03',
      name: 'deposition-transcript-04.txt',
      originalName: 'deposition-transcript-04.txt',
      type: 'transcript',
      mimeType: 'text/plain',
      size: 64200,
      sha256: hash3,
      importedAt: '2024-01-17T14:45:00.000Z',
      pageCount: 1,
      sheetCount: 0,
      folderId: 'f-interviews',
      indexingState: 'indexed',
      textPages: [
        {
          pageNumber: 1,
          text: `[00:14:22] INVESTIGATOR: Mr. Smith, did you meet with Elena Rostova prior to the submission of Tender PMC-2024-887?
[00:14:38] JOHN SMITH: We attended standard pre-bidding conferences, nothing outside regulatory protocol.
[01:42:17] INVESTIGATOR: Bank records show an offshore transfer of $1.4M to Crestview Trustees on January 29, 2024.
[01:42:35] JOHN SMITH: That was for an unrelated commercial charter agreement in Limassol. Apex Logistics Corp won the tender based solely on competitive technical metrics.
[01:44:02] INVESTIGATOR: Did Meridian Horizon hold beneficial equity prior to the award date?
[01:44:19] JOHN SMITH: Meridian held an advisory equity option expiring in 2025.`,
        },
      ],
      rawText: `[00:14:22] INVESTIGATOR: Mr. Smith, did you meet with Elena Rostova prior to the submission of Tender PMC-2024-887?
[00:14:38] JOHN SMITH: We attended standard pre-bidding conferences, nothing outside regulatory protocol.
[01:42:17] INVESTIGATOR: Bank records show an offshore transfer of $1.4M to Crestview Trustees on January 29, 2024.
[01:42:35] JOHN SMITH: That was for an unrelated commercial charter agreement in Limassol. Apex Logistics Corp won the tender based solely on competitive technical metrics.
[01:44:02] INVESTIGATOR: Did Meridian Horizon hold beneficial equity prior to the award date?
[01:44:19] JOHN SMITH: Meridian held an advisory equity option expiring in 2025.`,
      metadata: {
        'Interviewee': 'John Smith (Managing Director)',
        'Timestamp Range': '00:14:22 - 01:44:19',
      },
      sourceDetails: 'Sworn parliamentary committee testimony verbatim audio transcription.',
    },
    {
      id: 'S04',
      name: 'customs-cargo-manifest.csv',
      originalName: 'customs-cargo-manifest.csv',
      type: 'csv',
      mimeType: 'text/csv',
      size: 42100,
      sha256: hash4,
      importedAt: '2024-01-18T16:00:00.000Z',
      pageCount: 1,
      sheetCount: 1,
      folderId: 'f-financial',
      indexingState: 'indexed',
      sheets: [
        {
          sheetName: 'Manifest',
          headers: ['ContainerID', 'PortOfEntry', 'Vessel', 'Consignee', 'DeclarationUSD', 'ClearedDate'],
          rows: [
            ['CNTR-8812', 'Port Apex Terminal', 'MV Meridian Star', 'Apex Logistics Corp', '4,200,000', '2024-03-12'],
            ['CNTR-8813', 'Port Apex Terminal', 'MV Meridian Star', 'Apex Logistics Corp', '3,900,000', '2024-03-12'],
          ],
        },
      ],
      rawText: `=== Sheet: Manifest ===
Headers: ContainerID | PortOfEntry | Vessel | Consignee | DeclarationUSD | ClearedDate
Row 1: CNTR-8812 | Port Apex Terminal | MV Meridian Star | Apex Logistics Corp | 4,200,000 | 2024-03-12
Row 2: CNTR-8813 | Port Apex Terminal | MV Meridian Star | Apex Logistics Corp | 3,900,000 | 2024-03-12`,
      metadata: {
        'Port': 'Port Apex Terminal',
        'Declaration Total': '$8,100,000 USD',
      },
      sourceDetails: 'Maritime port customs clearance electronic filing record.',
    },
    {
      id: 'S05',
      name: 'bvi-registry-filing.txt',
      originalName: 'bvi-registry-filing.txt',
      type: 'txt',
      mimeType: 'text/plain',
      size: 15400,
      sha256: hash5,
      importedAt: '2024-01-19T10:15:00.000Z',
      pageCount: 1,
      sheetCount: 0,
      folderId: 'f-sources',
      indexingState: 'indexed',
      textPages: [
        {
          pageNumber: 1,
          text: `BRITISH VIRGIN ISLANDS FINANCIAL SERVICES COMMISSION
CORPORATE REGISTRY EXTRACT #BVI-CORP-988127
Entity Name: Meridian Horizon Holdings Ltd
Incorporation Date: 2023-04-12
Registered Agent: Vanguard Nominees Ltd, Road Town, Tortola
Authorized Capital: $50,000 USD divided into 50,000 ordinary shares.
Declared Shareholder of Record: Crestview Trustees Ltd as fiduciary for Elena Rostova.
Status: Active and in good standing.`,
        },
      ],
      rawText: `BRITISH VIRGIN ISLANDS FINANCIAL SERVICES COMMISSION
CORPORATE REGISTRY EXTRACT #BVI-CORP-988127
Entity Name: Meridian Horizon Holdings Ltd
Incorporation Date: 2023-04-12
Registered Agent: Vanguard Nominees Ltd, Road Town, Tortola
Authorized Capital: $50,000 USD divided into 50,000 ordinary shares.
Declared Shareholder of Record: Crestview Trustees Ltd as fiduciary for Elena Rostova.
Status: Active and in good standing.`,
      metadata: {
        'Jurisdiction': 'British Virgin Islands',
        'Registry ID': 'BVI-CORP-988127',
      },
      sourceDetails: 'Official company registrar certified certificate of incumbency.',
    },
  ];

  const claims = [
    {
      id: 'C17',
      statement: 'Company A (Apex Logistics / Meridian) won the government maritime procurement contract in 2024 under sole-source award.',
      status: 'Supported',
      createdAt: '2024-01-16T12:00:00.000Z',
      updatedAt: '2024-01-16T12:00:00.000Z',
      notes: 'Corroborated across primary signed tender contract and ministry ledger row 187.',
      relatedEntityIds: ['E-01', 'E-02', 'E-04'],
    },
    {
      id: 'C18',
      statement: 'Offshore fiduciary Crestview Trustees received wire transfer prior to tender award while holding beneficial interest.',
      status: 'Conflicting',
      createdAt: '2024-01-17T15:30:00.000Z',
      updatedAt: '2024-01-17T15:30:00.000Z',
      notes: 'Interviewee claims charter agreement, while BVI registry demonstrates undeclared equity fiduciaries.',
      relatedEntityIds: ['E-01', 'E-03', 'E-05'],
    },
    {
      id: 'C19',
      statement: 'Total disbursements prior to contract termination exceeded the authorized first milestone cap by $6.3M.',
      status: 'Needs verification',
      createdAt: '2024-01-18T10:00:00.000Z',
      updatedAt: '2024-01-18T10:00:00.000Z',
      notes: 'Requires reconciliation between customs declaration values and invoice schedules.',
      relatedEntityIds: ['E-02', 'E-04'],
    },
    {
      id: 'C20',
      statement: 'All tender equipment was delivered and cleared port customs by March 2024.',
      status: 'Unsupported',
      createdAt: '2024-01-19T11:00:00.000Z',
      updatedAt: '2024-01-19T11:00:00.000Z',
      notes: 'No delivery acceptance certification filed with Maritime Works.',
      relatedEntityIds: ['E-02'],
    },
  ];

  const evidence = [
    {
      id: 'E18',
      sourceId: 'S01',
      sourceName: 'contract-procurement-2024.pdf',
      sourceType: 'pdf',
      location: 'Page 2',
      page: 2,
      section: 'Section 4',
      excerpt: 'Company A was awarded the primary maintenance tender under expedited sole-source determination.',
      createdAt: '2024-01-16T10:15:00.000Z',
      relationship: 'Supporting',
      linkedClaimId: 'C17',
      linkedEntityIds: ['E-01', 'E-02', 'E-04'],
      notes: 'Contract signed by Elena Rostova on February 14, 2024.',
      verifiedIntegrity: true,
    },
    {
      id: 'E19',
      sourceId: 'S02',
      sourceName: 'procurement-awards-ledger.xlsx',
      sourceType: 'xlsx',
      location: 'Sheet: Awards, Row: 187',
      sheet: 'Awards',
      row: 187,
      excerpt: 'Apex Logistics Corp | PMC-2024-887 | 24,800,000 | 2024-02-14 | Disbursed Tranche 1',
      createdAt: '2024-01-16T11:45:00.000Z',
      relationship: 'Supporting',
      linkedClaimId: 'C17',
      linkedEntityIds: ['E-02', 'E-04'],
      notes: 'Matches contract consideration figures.',
      verifiedIntegrity: true,
    },
    {
      id: 'E20',
      sourceId: 'S03',
      sourceName: 'deposition-transcript-04.txt',
      sourceType: 'transcript',
      location: 'Timestamp: 01:42:17',
      timestampOffset: '01:42:17',
      excerpt: 'Bank records show an offshore transfer of $1.4M to Crestview Trustees on January 29, 2024.',
      createdAt: '2024-01-17T15:00:00.000Z',
      relationship: 'Supporting',
      linkedClaimId: 'C18',
      linkedEntityIds: ['E-01', 'E-05'],
      notes: 'Transferred 16 days prior to formal award date.',
      verifiedIntegrity: true,
    },
    {
      id: 'E21',
      sourceId: 'S03',
      sourceName: 'deposition-transcript-04.txt',
      sourceType: 'transcript',
      location: 'Timestamp: 01:42:35',
      timestampOffset: '01:42:35',
      excerpt: 'That was for an unrelated commercial charter agreement in Limassol.',
      createdAt: '2024-01-17T15:10:00.000Z',
      relationship: 'Contradicting',
      linkedClaimId: 'C18',
      linkedEntityIds: ['E-01'],
      notes: 'Smith argues payment was unconnected commercial consideration.',
      verifiedIntegrity: true,
    },
    {
      id: 'E22',
      sourceId: 'S05',
      sourceName: 'bvi-registry-filing.txt',
      sourceType: 'txt',
      location: 'Section: Declared Shareholder',
      excerpt: 'Declared Shareholder of Record: Crestview Trustees Ltd as fiduciary for Elena Rostova.',
      createdAt: '2024-01-19T10:30:00.000Z',
      relationship: 'Supporting',
      linkedClaimId: 'C18',
      linkedEntityIds: ['E-03', 'E-05'],
      notes: 'Establishes direct beneficial alignment with procurement director.',
      verifiedIntegrity: true,
    },
    {
      id: 'E23',
      sourceId: 'S01',
      sourceName: 'contract-procurement-2024.pdf',
      sourceType: 'pdf',
      location: 'Page 3',
      page: 3,
      section: 'Section 9.4',
      excerpt: 'Any early termination triggered under Article 12 shall mandate an audit of all payments made prior to termination.',
      createdAt: '2024-01-19T14:00:00.000Z',
      relationship: 'Reference',
      linkedClaimId: 'C19',
      linkedEntityIds: ['E-04'],
      notes: 'Contractual basis for forensic recovery audit.',
      verifiedIntegrity: true,
    },
  ];

  const entities = [
    {
      id: 'E-01',
      name: 'John Smith',
      type: 'Person',
      description: 'Managing Director of Apex Logistics Corp and beneficial proxy for Meridian Horizon Holdings.',
      aliases: ['J. Smith', 'Director Smith'],
      createdAt: '2024-01-15T10:00:00.000Z',
    },
    {
      id: 'E-02',
      name: 'Apex Logistics Corp',
      type: 'Company',
      description: 'Commercial logistics contractor registered in Delaware; tender joint venture partner.',
      metadata: { 'Jurisdiction': 'Delaware', 'Tender Lead': 'Yes' },
      createdAt: '2024-01-15T10:05:00.000Z',
    },
    {
      id: 'E-03',
      name: 'Elena Rostova',
      type: 'Person',
      description: 'Director of Maritime Infrastructure; signatory to Tender Contract #PMC-2024-887.',
      aliases: ['Director Rostova'],
      createdAt: '2024-01-15T10:10:00.000Z',
    },
    {
      id: 'E-04',
      name: 'Contract #PMC-2024-887',
      type: 'Contract',
      description: '$24.8M Public Maritime berth maintenance tender agreement.',
      metadata: { 'Amount': '$24,800,000 USD', 'Signed': '2024-02-14' },
      createdAt: '2024-01-15T10:15:00.000Z',
    },
    {
      id: 'E-05',
      name: 'Crestview Trustees Ltd',
      type: 'Organization',
      description: 'Cyprus-based fiduciary holding company identified in wire transfers.',
      metadata: { 'Jurisdiction': 'Cyprus' },
      createdAt: '2024-01-17T15:40:00.000Z',
    },
    {
      id: 'E-06',
      name: 'Meridian Horizon Holdings Ltd',
      type: 'Company',
      description: 'BVI offshore corporation formed April 2023 with undisclosed tender equity options.',
      createdAt: '2024-01-19T10:20:00.000Z',
    },
  ];

  const relationships = [
    {
      id: 'R01',
      sourceId: 'E-01',
      sourceName: 'John Smith',
      sourceType: 'entity',
      targetId: 'E-02',
      targetName: 'Apex Logistics Corp',
      targetType: 'entity',
      relationshipType: 'works for',
      evidenceIds: ['E18'],
      notes: 'Appointed sole director December 18, 2023.',
      date: '2023-12-18',
      createdAt: '2024-01-16T10:20:00.000Z',
    },
    {
      id: 'R02',
      sourceId: 'E-02',
      sourceName: 'Apex Logistics Corp',
      sourceType: 'entity',
      targetId: 'E-04',
      targetName: 'Contract #PMC-2024-887',
      targetType: 'entity',
      relationshipType: 'won',
      evidenceIds: ['E18', 'E19'],
      notes: 'Sole-source award confirmed in ledger row 187.',
      date: '2024-02-14',
      createdAt: '2024-01-16T12:05:00.000Z',
    },
    {
      id: 'R03',
      sourceId: 'E-03',
      sourceName: 'Elena Rostova',
      sourceType: 'entity',
      targetId: 'E-05',
      targetName: 'Crestview Trustees Ltd',
      targetType: 'entity',
      relationshipType: 'beneficiary of',
      evidenceIds: ['E22'],
      notes: 'Named beneficial shareholder in BVI registry filings.',
      date: '2023-04-12',
      createdAt: '2024-01-19T10:35:00.000Z',
    },
    {
      id: 'R04',
      sourceId: 'E-01',
      sourceName: 'John Smith',
      sourceType: 'entity',
      targetId: 'E-05',
      targetName: 'Crestview Trustees Ltd',
      targetType: 'entity',
      relationshipType: 'transferred funds to',
      evidenceIds: ['E20'],
      notes: '$1.4M wire transfer prior to tender award.',
      date: '2024-01-29',
      createdAt: '2024-01-17T15:05:00.000Z',
    },
  ];

  const timeline = [
    {
      id: 'T01',
      date: '2023-04-12',
      datePrecision: 'exact',
      title: 'Meridian Horizon Holdings Incorporated',
      description: 'Offshore shell registered in Tortola, BVI with Crestview Trustees as fiduciary.',
      entityIds: ['E-05', 'E-06'],
      sourceIds: ['S05'],
      evidenceIds: ['E22'],
      notes: 'BVI certified extract.',
      createdAt: '2024-01-19T11:00:00.000Z',
    },
    {
      id: 'T02',
      date: '2023-12-18',
      datePrecision: 'exact',
      title: 'John Smith Appointed Director of Apex Logistics',
      description: 'Corporate filings update managing leadership prior to tender release.',
      entityIds: ['E-01', 'E-02'],
      sourceIds: ['S01'],
      evidenceIds: ['E18'],
      createdAt: '2024-01-16T10:25:00.000Z',
    },
    {
      id: 'T03',
      date: '2024-01-29',
      datePrecision: 'exact',
      title: 'Offshore Wire Transfer of $1.4M to Crestview',
      description: 'Pre-award bank disbursement acknowledged in parliamentary deposition.',
      entityIds: ['E-01', 'E-05'],
      sourceIds: ['S03'],
      evidenceIds: ['E20', 'E21'],
      createdAt: '2024-01-17T15:15:00.000Z',
    },
    {
      id: 'T04',
      date: '2024-02-14',
      datePrecision: 'exact',
      title: 'Tender PMC-2024-887 Awarded to Apex Logistics',
      description: 'Contract issued and signed by Elena Rostova under sole-source authorization.',
      entityIds: ['E-02', 'E-03', 'E-04'],
      sourceIds: ['S01', 'S02'],
      evidenceIds: ['E18', 'E19'],
      createdAt: '2024-01-16T12:10:00.000Z',
    },
    {
      id: 'T05',
      date: '2024-03-12',
      datePrecision: 'approximate',
      title: 'Cargo Manifest Cleared at Port Apex',
      description: 'Customs declaration recorded for MV Meridian Star cargo equipment.',
      entityIds: ['E-02'],
      sourceIds: ['S04'],
      evidenceIds: [],
      notes: 'Customs declaration requires corroboration with bill of lading.',
      createdAt: '2024-01-18T16:15:00.000Z',
    },
    {
      id: 'T06',
      date: '2025-01',
      datePrecision: 'month',
      title: 'Contract Review & Termination Audit Triggered',
      description: 'Ministry oversight panel halts Tranche 2 disbursements pending forensic probe.',
      entityIds: ['E-04'],
      sourceIds: ['S01'],
      evidenceIds: ['E23'],
      createdAt: '2024-01-19T14:15:00.000Z',
    },
  ];

  const notes = [
    {
      id: 'N01',
      title: 'Sole-Source Authorization Justification',
      content: 'Review the legal basis cited under Article 4. Did the procurement division demonstrate emergency conditions justifying non-competitive sole-source selection?',
      attachedToType: 'claim',
      attachedToId: 'C17',
      attachedToName: 'Claim #C17',
      createdAt: '2024-01-16T14:00:00.000Z',
      updatedAt: '2024-01-16T14:00:00.000Z',
    },
    {
      id: 'N02',
      title: 'Follow-up with Cyprus Registry',
      content: 'Send letters rogatory or request via corporate registry for Crestview Trustees fiduciary deeds relating to beneficial trusts established in 2023.',
      attachedToType: 'entity',
      attachedToId: 'E-05',
      attachedToName: 'Crestview Trustees Ltd',
      createdAt: '2024-01-17T16:00:00.000Z',
      updatedAt: '2024-01-17T16:00:00.000Z',
    },
    {
      id: 'N03',
      title: 'Investigation Integrity Note',
      content: 'All source documents have had SHA-256 hashes generated on initial file ingestion. Note that SHA-256 verifies digital provenance and tamper-resistance, not factual truth of contents.',
      attachedToType: 'standalone',
      createdAt: '2024-01-15T09:40:00.000Z',
      updatedAt: '2024-01-15T09:40:00.000Z',
    },
  ];

  return {
    investigation,
    folders,
    sources,
    claims,
    evidence,
    entities,
    relationships,
    timeline,
    notes,
  };
}
