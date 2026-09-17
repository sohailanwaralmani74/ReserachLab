/**
 * Pure JavaScript Forensic & Evidence Analysis Utilities
 * Zero external libraries, zero remote server calls.
 * Runs 100% in-browser using native Web APIs (Web Crypto, Regex, Blobs).
 */

// ============================================================================
// 1. AUTOMATED ENTITY & FINANCIAL PATTERN EXTRACTOR
// ============================================================================

const OFFSHORE_JURISDICTIONS = [
  'British Virgin Islands', 'BVI', 'Cayman Islands', 'Cayman', 'Panama', 'Delaware',
  'Cyprus', 'Isle of Man', 'Jersey', 'Guernsey', 'Seychelles', 'Marshall Islands',
  'Bahamas', 'Luxembourg', 'Belize', 'Bermuda', 'Switzerland', 'Liechtenstein',
  'Hong Kong', 'Singapore', 'Dubai', 'UAE', 'Vanuatu', 'Malta', 'Nevis', 'Curacao'
];

const CORPORATE_SUFFIXES = [
  'LLC', 'L.L.C.', 'Ltd', 'Ltd.', 'Limited', 'Corp', 'Corp.', 'Corporation',
  'Inc', 'Inc.', 'Incorporated', 'S.A.', 'S.A', 'B.V.', 'GmbH', 'G.m.b.H.',
  'AG', 'A.G.', 'LLP', 'L.L.P.', 'LP', 'L.P.', 'Holdings', 'Holding',
  'Foundation', 'Trust', 'Nominee', 'Asset Management', 'Enterprises', 'Ventures'
];

export function extractEntitiesAndPatterns(text = '') {
  if (!text || typeof text !== 'string') {
    return {
      financialAmounts: [],
      offshoreJurisdictions: [],
      corporateEntities: [],
      bankingIdentifiers: [],
      communications: [],
      dates: [],
      totalCount: 0
    };
  }

  const results = {
    financialAmounts: [],
    offshoreJurisdictions: [],
    corporateEntities: [],
    bankingIdentifiers: [],
    communications: [],
    dates: [],
    totalCount: 0
  };

  const seen = new Set();
  function addUnique(category, value, metadata = {}) {
    const key = `${category}:${value.toLowerCase().trim()}`;
    if (!seen.has(key)) {
      seen.add(key);
      results[category].push({ value: value.trim(), ...metadata });
      results.totalCount++;
    }
  }

  // A. Financial & Monetary Amounts
  // E.g. $24,800,000, $24,800,000 USD, €1.4M, £500k, $120.50, 14,000,000 USD
  const currencyRegex = /[\$\€\£\¥]\s*[\d,]+(?:\.\d{1,2})?(?:\s*(?:million|billion|trillion|k|m|b|USD|EUR|GBP))?|\b(?:USD|EUR|GBP|CHF)\s*[\d,]+(?:\.\d{1,2})?(?:\s*(?:million|billion|trillion|k|m|b))?|\b\d{1,3}(?:,\d{3})+(?:\.\d{1,2})?\s*(?:USD|EUR|GBP|dollars|euros|pounds)\b/gi;
  let match;
  while ((match = currencyRegex.exec(text)) !== null) {
    addUnique('financialAmounts', match[0], { type: 'Currency / Sum' });
  }

  // B. Offshore Jurisdictions (longest first to avoid subset duplication)
  const sortedJurisdictions = [...OFFSHORE_JURISDICTIONS].sort((a, b) => b.length - a.length);
  const matchedJurisdictions = [];
  for (const jurisdiction of sortedJurisdictions) {
    const jurRegex = new RegExp(`\\b${jurisdiction}\\b`, 'gi');
    if (jurRegex.test(text)) {
      // Don't add if already contained in a longer matched jurisdiction
      const isSub = matchedJurisdictions.some(m => m.toLowerCase().includes(jurisdiction.toLowerCase()));
      if (!isSub) {
        matchedJurisdictions.push(jurisdiction);
        addUnique('offshoreJurisdictions', jurisdiction, { type: 'Offshore / Secrecy Jurisdiction' });
      }
    }
  }

  // C. Corporate & Shell Structures
  // Looks for capitalized phrases followed by company designations (e.g. Apex Logistics Corp, Meridian Horizon Joint Venture)
  const corporateRegex = /\b([A-Z][a-zA-Z0-9&'.]+(?:\s+[A-Z][a-zA-Z0-9&'.]+){0,4}\s+(?:LLC|L\.L\.C\.|Ltd|Ltd\.|Limited|Corp|Corp\.|Corporation|Inc|Inc\.|Incorporated|S\.A\.|B\.V\.|GmbH|AG|LLP|LP|Holdings|Holding|Ventures|Enterprises|Group|Joint Venture|Consulting|Logistics))\b/g;
  while ((match = corporateRegex.exec(text)) !== null) {
    addUnique('corporateEntities', match[1], { type: 'Corporate Entity' });
  }

  // D. Banking & Transaction Identifiers
  // IBAN: 2 letters, 2 digits, up to 30 alphanumerics
  const ibanRegex = /\b[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}\b/g;
  while ((match = ibanRegex.exec(text)) !== null) {
    addUnique('bankingIdentifiers', match[0], { type: 'IBAN Code' });
  }

  // SWIFT / BIC codes: 6 letters, 2 alphanumeric, optional 3 alphanumeric
  const swiftRegex = /\b[A-Z]{6}[A-Z2-9][A-NP-Z0-9](?:[A-Z0-9]{3})?\b/g;
  while ((match = swiftRegex.exec(text)) !== null) {
    if (!['PUBLIC', 'REPORT', 'NOTICE', 'CONTRACT', 'DATED', 'SECTION'].includes(match[0])) {
      addUnique('bankingIdentifiers', match[0], { type: 'SWIFT/BIC Code' });
    }
  }

  // Account / Routing references (e.g. Account # 4820-9912, Wire: TR-9942)
  const acctRegex = /\b(?:Account|Acct|Routing|Wire|Escrow)\s*(?:#|No\.?|Ref:?)?\s*([A-Za-z0-9\-_]{5,20})\b/gi;
  while ((match = acctRegex.exec(text)) !== null) {
    addUnique('bankingIdentifiers', match[0], { type: 'Account / Wire Ref' });
  }

  // E. Communications (Email, Phone, IPv4)
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
  while ((match = emailRegex.exec(text)) !== null) {
    addUnique('communications', match[0], { type: 'Email Address' });
  }

  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
  while ((match = phoneRegex.exec(text)) !== null) {
    if (match[0].length >= 10) {
      addUnique('communications', match[0], { type: 'Phone Number' });
    }
  }

  const ipRegex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g;
  while ((match = ipRegex.exec(text)) !== null) {
    if (!match[0].startsWith('127.') && match[0] !== '0.0.0.0') {
      addUnique('communications', match[0], { type: 'IP Address' });
    }
  }

  // F. Explicit Dates
  const dateRegex = /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?,\s+\d{4}\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2}\/\d{1,2}\/\d{4}\b/gi;
  while ((match = dateRegex.exec(text)) !== null) {
    addUnique('dates', match[0], { type: 'Document Date' });
  }

  return results;
}

// ============================================================================
// 2. STANDALONE SELF-CONTAINED HTML EVIDENCE DOSSIER EXPORTER
// ============================================================================

export function generateStandaloneDossierHtml(caseData) {
  const caseName = caseData.caseName || 'Investigative Evidence Dossier';
  const timestamp = new Date().toISOString();
  const humanDate = new Date().toLocaleString();
  const sources = caseData.sources || [];
  const evidence = caseData.evidence || [];
  const claims = caseData.claims || [];
  const entities = caseData.entities || [];
  const timeline = caseData.timeline || [];

  const verifiedCount = claims.filter(c => c.status === 'supported' || c.status === 'verified').length;
  const conflictedCount = claims.filter(c => c.status === 'conflicted').length;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(caseName)} - Verified Evidence Dossier</title>
  <style>
    :root {
      --bg: #ffffff;
      --surface: #f8fafc;
      --surface-2: #f1f5f9;
      --border: #e2e8f0;
      --text: #0f172a;
      --text-muted: #64748b;
      --primary: #1d4ed8;
      --emerald: #059669;
      --red: #dc2626;
      --amber: #d97706;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #090d16;
        --surface: #111827;
        --surface-2: #1f2937;
        --border: #374151;
        --text: #f9fafb;
        --text-muted: #9ca3af;
        --primary: #3b82f6;
      }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      margin: 0;
      padding: 24px;
    }
    .container { max-width: 960px; margin: 0 auto; }
    header { border-bottom: 2px solid var(--border); padding-bottom: 20px; margin-bottom: 30px; }
    h1 { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 26px; margin: 0 0 8px 0; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; font-family: monospace; }
    .badge-emerald { background: #d1fae5; color: #065f46; }
    .badge-red { background: #fee2e2; color: #991b1b; }
    .badge-blue { background: #dbeafe; color: #1e40af; }
    .meta-strip { display: flex; flex-wrap: wrap; gap: 16px; font-size: 12px; color: var(--text-muted); margin-top: 10px; font-family: monospace; }
    .search-box { width: 100%; padding: 10px 14px; font-size: 13px; border: 1px solid var(--border); border-radius: 6px; background: var(--surface); color: var(--text); margin-bottom: 24px; box-sizing: border-box; }
    .section-title { font-size: 18px; font-family: monospace; font-weight: bold; border-bottom: 1px solid var(--border); padding-bottom: 8px; margin: 32px 0 16px 0; }
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 16px; }
    .quote-box { background: var(--surface-2); border-left: 3px solid var(--primary); padding: 10px 14px; margin: 10px 0; font-family: serif; font-size: 14px; }
    .hash { font-family: monospace; font-size: 11px; color: var(--text-muted); word-break: break-all; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 12px; }
    th, td { border: 1px solid var(--border); padding: 8px 12px; text-align: left; }
    th { background: var(--surface-2); font-family: monospace; }
    @media print {
      body { padding: 0; background: #fff !important; color: #000 !important; }
      .search-box, .no-print { display: none !important; }
      .card { page-break-inside: avoid; border: 1px solid #ccc; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <span class="badge badge-blue">OFFLINE VERIFIED EVIDENCE DOSSIER</span>
          <span class="badge badge-emerald">DETERMINISTIC SHA-256 AUDIT</span>
          <h1>${escapeHtml(caseName)}</h1>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: var(--text-muted);">${escapeHtml(caseData.caseDescription || 'Cryptographic evidence binder generated by Reptile Birds')}</p>
        </div>
        <div class="no-print">
          <button onclick="window.print()" style="padding: 8px 16px; font-size: 12px; font-weight: 600; cursor: pointer; border-radius: 6px; background: var(--primary); color: #fff; border: none;">
            Print / Save to PDF
          </button>
        </div>
      </div>
      <div class="meta-strip">
        <span>Generated: ${escapeHtml(humanDate)}</span>
        <span>•</span>
        <span>Total Sources: ${sources.length}</span>
        <span>•</span>
        <span>Evidence Citations: ${evidence.length}</span>
        <span>•</span>
        <span>Verified Findings: ${verifiedCount}</span>
        ${conflictedCount > 0 ? `<span>•</span><span style="color: var(--red); font-weight: bold;">Conflicts: ${conflictedCount}</span>` : ''}
      </div>
    </header>

    <input type="text" id="filterInput" class="search-box no-print" placeholder="Search claims, evidence citations, entities, or file hashes...">

    <!-- 1. CLAIMS & FINDINGS MATRIX -->
    <div class="section-title">1. INVESTIGATIVE CLAIMS & FINDINGS MATRIX (${claims.length})</div>
    <div id="claimsContainer">
      ${claims.map((c, i) => {
        const supEv = evidence.filter(e => (c.supportingEvidenceIds || []).includes(e.id) || (e.linkedClaimId === c.id && (e.relationship === 'Supporting' || !e.relationship)));
        const refEv = evidence.filter(e => (c.opposingEvidenceIds || []).includes(e.id) || (e.linkedClaimId === c.id && (e.relationship === 'Contradicting' || e.relationship === 'Refuting')));
        const statusBadge = (c.status || '').toLowerCase() === 'supported' || (c.status || '').toLowerCase() === 'verified'
          ? '<span class="badge badge-emerald">VERIFIED SUPPORTED</span>'
          : (c.status || '').toLowerCase() === 'conflicted' || (c.status || '').toLowerCase() === 'contradicted'
          ? '<span class="badge badge-red">CONTRADICTED / CONFLICTED</span>'
          : '<span class="badge badge-blue">UNDER REVIEW</span>';

        return `
          <div class="card searchable-item">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-family: monospace; font-size: 11px; font-weight: bold; color: var(--text-muted);">FINDING #${i + 1}</span>
              ${statusBadge}
            </div>
            <div style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">${escapeHtml(c.statement)}</div>
            ${c.notes ? `<p style="font-size: 12px; color: var(--text-muted); margin: 0 0 10px 0;">${escapeHtml(c.notes)}</p>` : ''}

            ${supEv.length > 0 ? `
              <div style="margin-top: 10px;">
                <div style="font-size: 11px; font-weight: bold; font-family: monospace; color: var(--emerald);">SUPPORTING EVIDENCE (${supEv.length}):</div>
                ${supEv.map(e => `
                  <div class="quote-box">
                    <div>"${escapeHtml(e.verbatimQuote || e.excerpt || '')}"</div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px; font-family: monospace;">
                      Source: ${escapeHtml(e.sourceName || 'Primary Doc')} • ${escapeHtml(String(e.location || (e.pageNumber ? `Page ${e.pageNumber}` : (e.page ? `Page ${e.page}` : 'Record'))))}${e.sheetCoordinate ? ` • [${escapeHtml(e.sheetCoordinate)}]` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${refEv.length > 0 ? `
              <div style="margin-top: 10px;">
                <div style="font-size: 11px; font-weight: bold; font-family: monospace; color: var(--red);">CONTRADICTING / REFUTING EVIDENCE (${refEv.length}):</div>
                ${refEv.map(e => `
                  <div class="quote-box" style="border-left-color: var(--red);">
                    <div>"${escapeHtml(e.verbatimQuote || e.excerpt || '')}"</div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px; font-family: monospace;">
                      Source: ${escapeHtml(e.sourceName || 'Primary Doc')} • ${escapeHtml(String(e.location || (e.pageNumber ? `Page ${e.pageNumber}` : (e.page ? `Page ${e.page}` : 'Record'))))}${e.sheetCoordinate ? ` • [${escapeHtml(e.sheetCoordinate)}]` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}
    </div>

    <!-- 2. PRIMARY SOURCE CUSTODY & SHA-256 HASH MANIFEST -->
    <div class="section-title">2. PRIMARY SOURCE CUSTODY & SHA-256 MANIFEST (${sources.length})</div>
    <table>
      <thead>
        <tr>
          <th style="width: 50px;">#</th>
          <th>Document / File Name</th>
          <th>Format</th>
          <th>Size</th>
          <th>Cryptographic SHA-256 Hash</th>
        </tr>
      </thead>
      <tbody>
        ${sources.map((s, idx) => `
          <tr class="searchable-item">
            <td style="font-family: monospace;">${idx + 1}</td>
            <td><strong>${escapeHtml(s.name)}</strong></td>
            <td style="font-family: monospace; text-transform: uppercase;">${escapeHtml(s.type || 'file')}</td>
            <td style="font-family: monospace;">${escapeHtml(formatBytes(s.size || 0))}</td>
            <td class="hash">${escapeHtml(s.sha256 || 'SHA-256 Pending')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- 3. ENTITIES & RELATIONSHIP NETWORK -->
    ${entities.length > 0 ? `
      <div class="section-title">3. IDENTIFIED ENTITIES & CORPORATE STRUCTURES (${entities.length})</div>
      <table>
        <thead>
          <tr>
            <th>Entity Name</th>
            <th>Type</th>
            <th>Jurisdiction / Role</th>
            <th>Details / Citations</th>
          </tr>
        </thead>
        <tbody>
          ${entities.map(e => `
            <tr class="searchable-item">
              <td><strong>${escapeHtml(e.name)}</strong></td>
              <td style="font-family: monospace;"><span class="badge badge-blue">${escapeHtml(e.type || 'Entity')}</span></td>
              <td>${escapeHtml(e.jurisdiction || e.role || '—')}</td>
              <td style="font-size: 11px; color: var(--text-muted);">${escapeHtml(e.notes || '—')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : ''}

    <footer style="margin-top: 48px; border-top: 1px solid var(--border); padding-top: 20px; font-size: 11px; color: var(--text-muted); font-family: monospace; display: flex; justify-content: space-between;">
      <div>Reptile Birds • Deterministic Evidence Engine • Client-Side Sandbox</div>
      <div>Digest ISO: ${escapeHtml(timestamp)}</div>
    </footer>
  </div>

  <script>
    // Offline client-side instant filtering
    const filterInput = document.getElementById('filterInput');
    if (filterInput) {
      filterInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const items = document.querySelectorAll('.searchable-item');
        items.forEach(item => {
          if (!query || item.textContent.toLowerCase().includes(query)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  </script>
</body>
</html>`;
}

// ============================================================================
// 3. FILE HASH RE-VERIFICATION & TAMPER DETECTOR
// ============================================================================

export async function verifyFileHash(file, existingSources = []) {
  if (!file) {
    throw new Error('No file provided for verification');
  }

  const startTime = performance.now();
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const calculatedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  const durationMs = Math.round(performance.now() - startTime);

  // Check against existing sources
  const matchedSourceByHash = existingSources.find(s => s.sha256 && s.sha256.toLowerCase() === calculatedHash.toLowerCase());
  const matchedSourceByName = existingSources.find(s => s.name && s.name.toLowerCase() === file.name.toLowerCase());

  let status = 'UNREGISTERED'; // 'MATCH' | 'TAMPER' | 'UNREGISTERED'
  let matchedSource = null;
  let message = '';

  if (matchedSourceByHash) {
    status = 'MATCH';
    matchedSource = matchedSourceByHash;
    message = `Cryptographic byte match confirmed: Identical to registered source "${matchedSourceByHash.name}". Zero tampering detected.`;
  } else if (matchedSourceByName && matchedSourceByName.sha256 && matchedSourceByName.sha256.toLowerCase() !== calculatedHash.toLowerCase()) {
    status = 'TAMPER';
    matchedSource = matchedSourceByName;
    message = `CRITICAL ALERT: File name matches registered source "${matchedSourceByName.name}", but the SHA-256 byte fingerprint differs! This file has been altered, modified, or re-saved since original ingestion.`;
  } else {
    status = 'UNREGISTERED';
    message = `File is valid. SHA-256 computed successfully. No prior record found in current case custody ledger.`;
  }

  return {
    fileName: file.name,
    fileSize: file.size,
    calculatedHash,
    durationMs,
    status,
    matchedSource,
    message
  };
}

// ============================================================================
// 4. WHISTLEBLOWER PII REDACTION & ANONYMIZER
// ============================================================================

export function redactText(text = '', options = {}) {
  if (!text || typeof text !== 'string') return '';

  const {
    mode = 'solid', // 'solid' (████) or 'tag' ([REDACTED])
    redactEmails = true,
    redactPhones = true,
    redactAmounts = false,
    customTerms = [], // array of { find: 'John Smith', alias: '[SOURCE-ALPHA]' }
    caseEntities = [] // array of string entity names from the case
  } = options;

  let result = text;

  // 1. Custom Term Replacements
  if (Array.isArray(customTerms)) {
    for (const term of customTerms) {
      if (!term.find || !term.find.trim()) continue;
      const safeFind = escapeRegExp(term.find.trim());
      const regex = new RegExp(safeFind, 'gi');
      const replacement = mode === 'solid'
        ? '█'.repeat(term.find.trim().length)
        : (term.alias || '[REDACTED]');
      result = result.replace(regex, replacement);
    }
  }

  // 2. Case Entities Auto-Mask
  if (Array.isArray(caseEntities) && caseEntities.length > 0) {
    for (const entityName of caseEntities) {
      if (!entityName || entityName.length < 3) continue;
      const safeEntity = escapeRegExp(entityName.trim());
      const regex = new RegExp(`\\b${safeEntity}\\b`, 'gi');
      const replacement = mode === 'solid'
        ? '█'.repeat(entityName.length)
        : `[REDACTED-ENTITY]`;
      result = result.replace(regex, replacement);
    }
  }

  // 3. Emails
  if (redactEmails) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
    result = result.replace(emailRegex, (match) => {
      return mode === 'solid' ? '█'.repeat(match.length) : '[REDACTED-EMAIL]';
    });
  }

  // 4. Phones
  if (redactPhones) {
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
    result = result.replace(phoneRegex, (match) => {
      return mode === 'solid' ? '█'.repeat(match.length) : '[REDACTED-PHONE]';
    });
  }

  // 5. Monetary amounts
  if (redactAmounts) {
    const amountRegex = /(?:[\$\€\£\¥]|USD|EUR|GBP)\s*[\d,]+(?:\.\d{1,2})?(?:\s*(?:million|billion|trillion|k|m|b))?/gi;
    result = result.replace(amountRegex, (match) => {
      return mode === 'solid' ? '█'.repeat(match.length) : '[REDACTED-SUM]';
    });
  }

  return result;
}

// ============================================================================
// 5. MULTI-FORMAT CITATION GENERATOR
// ============================================================================

export function generateCitation(evidence, source = {}, format = 'bluebook') {
  if (!evidence) return '';

  const docTitle = source.name || evidence.sourceName || 'Primary Document';
  const quote = evidence.verbatimQuote || evidence.excerpt || '';
  const page = evidence.pageNumber || evidence.page || (evidence.location ? evidence.location.replace(/^Page\s*/i, '') : 1);
  const paragraph = evidence.paragraph || '';
  const coordinate = evidence.sheetCoordinate ? `, cell ${evidence.sheetCoordinate}` : '';
  const hash = source.sha256 || evidence.sourceSha256 || '';
  const shortHash = hash ? hash.slice(0, 12) + '...' : '';
  const date = evidence.dateCaptured || evidence.createdAt?.slice(0, 10) || new Date().toISOString().slice(0, 10);

  switch (format) {
    case 'bluebook': {
      // Bluebook legal citation format with cryptographic custody note
      const paraStr = paragraph ? ` ¶ ${paragraph}` : '';
      const hashStr = shortHash ? ` (cryptographic SHA-256 fingerprint: ${shortHash})` : '';
      return `${docTitle}, at ${page}${paraStr}${coordinate}${hashStr}.`;
    }

    case 'chicago': {
      // Chicago Notes & Bibliography Footnote format
      const paraStr = paragraph ? `, par. ${paragraph}` : '';
      const hashNote = hash ? ` [SHA-256: ${hash}]` : '';
      return `"${quote}," in ${docTitle}, p. ${page}${paraStr}${coordinate}.${hashNote}`;
    }

    case 'apa': {
      // APA 7th Edition style
      const author = source.author || 'Investigative Record';
      const year = new Date().getFullYear();
      return `${author}. (${year}). ${docTitle} (p. ${page}${coordinate}). Evidence Archive: sha256:${shortHash}`;
    }

    case 'oscola': {
      // Oxford Standard for the Citation of Legal Authorities
      return `'${quote ? (quote.slice(0, 50) + (quote.length > 50 ? '...' : '')) : 'Evidence'}' (${docTitle}, ${date}) at ${page}${coordinate}.`;
    }

    case 'bibtex': {
      // BibTeX entry for LaTeX/Overleaf/Zotero
      const citeKey = docTitle.replace(/[^a-zA-Z0-9]/g, '').slice(0, 15) + '_' + page;
      return `@misc{${citeKey},
  title = {${docTitle}},
  note = {Page ${page}${coordinate}. SHA-256: ${hash || 'N/A'}},
  howpublished = {Reptile Birds Evidence Archive},
  year = {${new Date().getFullYear()}}
}`;
    }

    default:
      return `${docTitle}, Page ${page}${coordinate} (SHA-256: ${shortHash})`;
  }
}

// ============================================================================
// 6. CROSS-DOCUMENT TEXT OVERLAP & DUPLICATE DETECTOR
// ============================================================================

export function detectTextOverlap(textA = '', textB = '', options = {}) {
  const shingleSize = options.shingleSize || 5; // 5-word shingles
  const minMatchLength = options.minMatchLength || 40; // minimum characters for a matching block

  if (!textA || !textB || typeof textA !== 'string' || typeof textB !== 'string') {
    return {
      similarityPercentage: 0,
      sharedShingleCount: 0,
      totalShinglesA: 0,
      totalShinglesB: 0,
      matchingExcerpts: []
    };
  }

  const wordsA = tokenizeWords(textA);
  const wordsB = tokenizeWords(textB);

  if (wordsA.length < shingleSize || wordsB.length < shingleSize) {
    return {
      similarityPercentage: 0,
      sharedShingleCount: 0,
      totalShinglesA: wordsA.length,
      totalShinglesB: wordsB.length,
      matchingExcerpts: []
    };
  }

  // Create shingle maps
  const shinglesA = new Map();
  for (let i = 0; i <= wordsA.length - shingleSize; i++) {
    const shingle = wordsA.slice(i, i + shingleSize).join(' ');
    if (!shinglesA.has(shingle)) {
      shinglesA.set(shingle, i);
    }
  }

  const shinglesB = new Map();
  for (let i = 0; i <= wordsB.length - shingleSize; i++) {
    const shingle = wordsB.slice(i, i + shingleSize).join(' ');
    if (!shinglesB.has(shingle)) {
      shinglesB.set(shingle, i);
    }
  }

  // Calculate Jaccard similarity
  let intersectionCount = 0;
  const sharedShingles = [];

  for (const [shingle, idxA] of shinglesA.entries()) {
    if (shinglesB.has(shingle)) {
      intersectionCount++;
      sharedShingles.push({
        shingle,
        posA: idxA,
        posB: shinglesB.get(shingle)
      });
    }
  }

  const unionCount = (shinglesA.size + shinglesB.size) - intersectionCount;
  const similarityPercentage = unionCount > 0
    ? Math.round((intersectionCount / unionCount) * 1000) / 10
    : 0;

  // Extract matching continuous sentences / blocks
  const sentencesA = textA.split(/(?<=[.?!])\s+/).filter(s => s.trim().length > minMatchLength);
  const matchingExcerpts = [];

  for (const sentence of sentencesA) {
    const cleanSent = sentence.trim().toLowerCase().replace(/[^\w\s]/g, '');
    if (cleanSent.length > 20 && textB.toLowerCase().replace(/[^\w\s]/g, '').includes(cleanSent)) {
      matchingExcerpts.push(sentence.trim());
      if (matchingExcerpts.length >= 8) break; // Limit for UI readability
    }
  }

  return {
    similarityPercentage,
    sharedShingleCount: intersectionCount,
    totalShinglesA: shinglesA.size,
    totalShinglesB: shinglesB.size,
    matchingExcerpts
  };
}

// ============================================================================
// HELPER UTILITIES
// ============================================================================

function tokenizeWords(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
