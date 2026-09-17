import { icon } from './icons.js';
import {
  extractEntitiesAndPatterns,
  generateStandaloneDossierHtml,
  verifyFileHash,
  redactText,
  generateCitation,
  detectTextOverlap
} from '../services/forensicTools.js';

/**
 * Forensic Lab View & Investigation Utilities Hub
 * 6 pure JavaScript investigative tools
 */

export function renderForensicLabView(state, activeSubTab = 'extractor', labState = {}) {
  const subTabs = [
    { id: 'extractor', label: 'Entity & Financial Extractor', icon: 'sparkles', badge: 'Auto-Detect' },
    { id: 'dossier', label: 'Standalone HTML Dossier', icon: 'printer', badge: 'Portable' },
    { id: 'hasher', label: 'File Hash & Tamper Verifier', icon: 'hash', badge: 'SHA-256' },
    { id: 'redactor', label: 'Whistleblower Redaction', icon: 'scissors', badge: 'Privacy' },
    { id: 'citations', label: 'Legal & Academic Citations', icon: 'bookOpen', badge: 'Bluebook' },
    { id: 'overlap', label: 'Cross-Doc Overlap Detector', icon: 'compare', badge: 'N-Gram' },
  ];

  return `
    <div class="h-full flex flex-col bg-[var(--bg)] overflow-hidden">
      <!-- Top Lab Header & Sub-Navigation -->
      <div class="border-b border-[var(--border)] bg-[var(--surface)] px-6 py-4 flex-none shadow-xs">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="p-1.5 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--border)]">
                ${icon('cpu', 18)}
              </span>
              <h1 class="text-base font-bold text-[var(--text)] font-mono">Pure JS Forensic Analysis Lab</h1>
              <span class="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                100% Client-Side
              </span>
            </div>
            <p class="text-xs text-[var(--text-3)] mt-1">
              Deterministic, zero-cloud investigative utilities operating directly on your in-memory research files and evidence citations.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[11px] font-mono text-[var(--text-4)] bg-[var(--surface-2)] px-2.5 py-1 rounded-[var(--radius-sm)] border border-[var(--border)]">
              Case Sources: <strong>${state.sources.length}</strong> · Citations: <strong>${state.evidence.length}</strong>
            </span>
          </div>
        </div>

        <!-- Sub-tabs bar -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 select-none">
          ${subTabs.map(t => {
            const isActive = activeSubTab === t.id;
            return `
              <button
                class="lab-subtab-btn flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-all whitespace-nowrap cursor-pointer border ${isActive
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs font-semibold'
                  : 'bg-[var(--surface-2)] text-[var(--text-3)] hover:text-[var(--text)] border-[var(--border)] hover:bg-[var(--surface-3)]'}"
                data-subtab="${t.id}"
              >
                ${icon(t.icon, 14)}
                <span>${t.label}</span>
                <span class="text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-[var(--surface)] text-[var(--text-4)] border border-[var(--border)]'}">
                  ${t.badge}
                </span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Lab Main Body -->
      <div class="flex-1 overflow-y-auto p-6" id="forensic-lab-body">
        ${renderSubTabContent(activeSubTab, state, labState)}
      </div>
    </div>
  `;
}

function renderSubTabContent(activeSubTab, state, labState) {
  switch (activeSubTab) {
    case 'extractor':
      return renderExtractorTab(state, labState);
    case 'dossier':
      return renderDossierTab(state, labState);
    case 'hasher':
      return renderHasherTab(state, labState);
    case 'redactor':
      return renderRedactorTab(state, labState);
    case 'citations':
      return renderCitationsTab(state, labState);
    case 'overlap':
      return renderOverlapTab(state, labState);
    default:
      return renderExtractorTab(state, labState);
  }
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

// ----------------------------------------------------------------------------
// TAB 1: ENTITY & FINANCIAL PATTERN EXTRACTOR
// ----------------------------------------------------------------------------
function renderExtractorTab(state, labState = {}) {
  const extracted = labState.extractedData || null;

  return `
    <div class="max-w-5xl mx-auto space-y-6">
      <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-5 shadow-xs space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
          <div>
            <h2 class="text-sm font-bold text-[var(--text)] font-mono flex items-center gap-2">
              ${icon('sparkles', 16, 'text-[var(--primary)]')}
              <span>Automated Entity & Financial Pattern Extractor</span>
            </h2>
            <p class="text-xs text-[var(--text-3)] mt-0.5">
              Pure regex heuristics scan document text to auto-identify monetary transactions, offshore jurisdictions, shell companies, and communications coordinates.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <select id="extractor-source-select" class="text-xs bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] px-2.5 py-1.5 text-[var(--text)] font-medium">
              <option value="">-- Choose from Case Documents --</option>
              ${state.sources.map(s => `<option value="${s.id}">${s.name} (${s.type.toUpperCase()})</option>`).join('')}
            </select>
            <button
              id="extractor-run-btn"
              class="px-3.5 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold rounded-[var(--radius-sm)] shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              ${icon('sparkles', 13)}
              <span>Run Extraction</span>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-[var(--text)] mb-1">
            Source Text to Analyze (or paste raw text from external filings, emails, or transcripts):
          </label>
          <textarea
            id="extractor-text-input"
            rows="5"
            class="w-full text-xs font-mono bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] p-3 text-[var(--text)] focus:outline-none focus:border-[var(--primary)] leading-relaxed resize-y"
            placeholder="Select a document above, or paste contract excerpts, banking wire instructions, court transcripts, or corporate filings here to auto-extract entities..."
          >${labState.extractorText || (state.sources[0]?.content?.pages?.[0]?.text || '')}</textarea>
        </div>
      </div>

      ${extracted ? `
        <!-- Extraction Results -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[var(--text)] font-mono">EXTRACTION FINDINGS</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--primary-soft)] text-[var(--primary)] font-bold">
                ${extracted.totalCount} Detected
              </span>
            </div>

            ${extracted.totalCount > 0 ? `
              <button
                id="extractor-import-entities-btn"
                class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-[var(--radius-sm)] shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                ${icon('plus', 13)}
                <span>Import Detected Entities into Case Network</span>
              </button>
            ` : ''}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- 1. Monetary Sums -->
            <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 shadow-xs">
              <div class="flex items-center justify-between pb-2 border-b border-[var(--border)] mb-3">
                <span class="text-xs font-bold text-emerald-600 flex items-center gap-1.5 font-mono">
                  ${icon('database', 14)}
                  <span>Monetary Sums</span>
                </span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 font-semibold">
                  ${extracted.financialAmounts.length}
                </span>
              </div>
              <div class="space-y-1.5 max-h-48 overflow-y-auto">
                ${extracted.financialAmounts.length > 0 ? extracted.financialAmounts.map(f => `
                  <div class="flex items-center justify-between p-2 rounded bg-[var(--surface-2)] text-xs font-mono border border-[var(--border)]">
                    <span class="font-bold text-emerald-600">${f.value}</span>
                    <span class="text-[10px] text-[var(--text-4)]">${f.type}</span>
                  </div>
                `).join('') : '<p class="text-xs text-[var(--text-4)] py-2 text-center">No currency patterns detected.</p>'}
              </div>
            </div>

            <!-- 2. Offshore Jurisdictions -->
            <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 shadow-xs">
              <div class="flex items-center justify-between pb-2 border-b border-[var(--border)] mb-3">
                <span class="text-xs font-bold text-amber-600 flex items-center gap-1.5 font-mono">
                  ${icon('target', 14)}
                  <span>Offshore / Secrecy</span>
                </span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 font-semibold">
                  ${extracted.offshoreJurisdictions.length}
                </span>
              </div>
              <div class="space-y-1.5 max-h-48 overflow-y-auto">
                ${extracted.offshoreJurisdictions.length > 0 ? extracted.offshoreJurisdictions.map(j => `
                  <div class="flex items-center justify-between p-2 rounded bg-[var(--surface-2)] text-xs border border-[var(--border)]">
                    <span class="font-semibold text-amber-600">${j.value}</span>
                    <span class="text-[10px] font-mono text-[var(--text-4)]">Tax Haven</span>
                  </div>
                `).join('') : '<p class="text-xs text-[var(--text-4)] py-2 text-center">No offshore jurisdictions detected.</p>'}
              </div>
            </div>

            <!-- 3. Corporate Entities -->
            <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 shadow-xs">
              <div class="flex items-center justify-between pb-2 border-b border-[var(--border)] mb-3">
                <span class="text-xs font-bold text-[var(--primary)] flex items-center gap-1.5 font-mono">
                  ${icon('building', 14)}
                  <span>Corporate Entities</span>
                </span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--primary-soft)] text-[var(--primary)] font-semibold">
                  ${extracted.corporateEntities.length}
                </span>
              </div>
              <div class="space-y-1.5 max-h-48 overflow-y-auto">
                ${extracted.corporateEntities.length > 0 ? extracted.corporateEntities.map(c => `
                  <div class="flex items-center justify-between p-2 rounded bg-[var(--surface-2)] text-xs border border-[var(--border)]">
                    <span class="font-semibold text-[var(--text)] truncate pr-2">${c.value}</span>
                    <span class="text-[10px] font-mono text-[var(--text-4)] flex-none">Company</span>
                  </div>
                `).join('') : '<p class="text-xs text-[var(--text-4)] py-2 text-center">No corporate entities detected.</p>'}
              </div>
            </div>

            <!-- 4. Banking & Wire Identifiers -->
            <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 shadow-xs">
              <div class="flex items-center justify-between pb-2 border-b border-[var(--border)] mb-3">
                <span class="text-xs font-bold text-cyan-600 flex items-center gap-1.5 font-mono">
                  ${icon('hash', 14)}
                  <span>Banking & Wire Identifiers</span>
                </span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-600 font-semibold">
                  ${extracted.bankingIdentifiers.length}
                </span>
              </div>
              <div class="space-y-1.5 max-h-48 overflow-y-auto">
                ${extracted.bankingIdentifiers.length > 0 ? extracted.bankingIdentifiers.map(b => `
                  <div class="flex items-center justify-between p-2 rounded bg-[var(--surface-2)] text-xs font-mono border border-[var(--border)]">
                    <span class="font-bold text-cyan-600 truncate pr-2">${b.value}</span>
                    <span class="text-[10px] text-[var(--text-4)] flex-none">${b.type}</span>
                  </div>
                `).join('') : '<p class="text-xs text-[var(--text-4)] py-2 text-center">No banking coordinates detected.</p>'}
              </div>
            </div>

            <!-- 5. Communications -->
            <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 shadow-xs">
              <div class="flex items-center justify-between pb-2 border-b border-[var(--border)] mb-3">
                <span class="text-xs font-bold text-indigo-600 flex items-center gap-1.5 font-mono">
                  ${icon('share2', 14)}
                  <span>Communications</span>
                </span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 font-semibold">
                  ${extracted.communications.length}
                </span>
              </div>
              <div class="space-y-1.5 max-h-48 overflow-y-auto">
                ${extracted.communications.length > 0 ? extracted.communications.map(cm => `
                  <div class="flex items-center justify-between p-2 rounded bg-[var(--surface-2)] text-xs border border-[var(--border)]">
                    <span class="font-mono text-[var(--text)] truncate pr-2">${cm.value}</span>
                    <span class="text-[10px] font-mono text-[var(--text-4)] flex-none">${cm.type}</span>
                  </div>
                `).join('') : '<p class="text-xs text-[var(--text-4)] py-2 text-center">No email or phone patterns detected.</p>'}
              </div>
            </div>

            <!-- 6. Key Dates -->
            <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 shadow-xs">
              <div class="flex items-center justify-between pb-2 border-b border-[var(--border)] mb-3">
                <span class="text-xs font-bold text-violet-600 flex items-center gap-1.5 font-mono">
                  ${icon('clock', 14)}
                  <span>Document Dates</span>
                </span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-violet-500/10 text-violet-600 font-semibold">
                  ${extracted.dates.length}
                </span>
              </div>
              <div class="space-y-1.5 max-h-48 overflow-y-auto">
                ${extracted.dates.length > 0 ? extracted.dates.map(d => `
                  <div class="flex items-center justify-between p-2 rounded bg-[var(--surface-2)] text-xs font-mono border border-[var(--border)]">
                    <span class="font-semibold text-[var(--text)]">${d.value}</span>
                    <span class="text-[10px] text-[var(--text-4)]">${d.type}</span>
                  </div>
                `).join('') : '<p class="text-xs text-[var(--text-4)] py-2 text-center">No dates detected.</p>'}
              </div>
            </div>
          </div>
        </div>
      ` : `
        <div class="bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-card)] p-8 text-center space-y-2">
          <div class="text-[var(--text-4)] flex justify-center">${icon('sparkles', 28)}</div>
          <div class="text-xs font-semibold text-[var(--text)]">Ready to Analyze</div>
          <p class="text-xs text-[var(--text-3)] max-w-md mx-auto">
            Click "Run Extraction" to parse all monetary amounts, offshore territories, legal corporate entities, and wire codes using client-side regex heuristics.
          </p>
        </div>
      `}
    </div>
  `;
}

// ----------------------------------------------------------------------------
// TAB 2: STANDALONE HTML EVIDENCE DOSSIER EXPORT
// ----------------------------------------------------------------------------
function renderDossierTab(state) {
  const verifiedClaims = state.claims.filter(c => c.status === 'supported' || c.status === 'verified').length;

  return `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-6">
        <div class="flex items-start justify-between border-b border-[var(--border)] pb-4">
          <div class="space-y-1">
            <span class="px-2 py-0.5 text-[10px] font-mono rounded bg-[var(--primary-soft)] text-[var(--primary)] font-bold">
              OFFLINE PORTABLE VAULT
            </span>
            <h2 class="text-base font-bold text-[var(--text)] font-mono">Standalone Self-Contained HTML Evidence Dossier</h2>
            <p class="text-xs text-[var(--text-3)] max-w-xl leading-relaxed">
              Generates a single self-contained <code class="font-mono text-[var(--primary)]">.html</code> file with embedded styles, responsive layout, search filters, and cryptographic hash manifests. Can be opened by attorneys, journalists, or regulatory agencies on any computer offline.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button
              id="dossier-preview-btn"
              class="px-3 py-1.5 bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[var(--text)] text-xs font-medium rounded-[var(--radius-sm)] border border-[var(--border)] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              ${icon('eye', 13)}
              <span>Preview HTML</span>
            </button>
            <button
              id="dossier-download-btn"
              class="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold rounded-[var(--radius-sm)] shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              ${icon('download', 14)}
              <span>Download Standalone Dossier (.html)</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="bg-[var(--surface-2)] p-3 rounded-[var(--radius-sm)] border border-[var(--border)] text-center">
            <div class="text-xl font-bold text-[var(--text)] font-mono">${state.sources.length}</div>
            <div class="text-[11px] text-[var(--text-3)]">Primary Sources</div>
          </div>
          <div class="bg-[var(--surface-2)] p-3 rounded-[var(--radius-sm)] border border-[var(--border)] text-center">
            <div class="text-xl font-bold text-[var(--text)] font-mono">${state.evidence.length}</div>
            <div class="text-[11px] text-[var(--text-3)]">Evidence Citations</div>
          </div>
          <div class="bg-[var(--surface-2)] p-3 rounded-[var(--radius-sm)] border border-[var(--border)] text-center">
            <div class="text-xl font-bold text-emerald-600 font-mono">${verifiedClaims}</div>
            <div class="text-[11px] text-[var(--text-3)]">Verified Claims</div>
          </div>
          <div class="bg-[var(--surface-2)] p-3 rounded-[var(--radius-sm)] border border-[var(--border)] text-center">
            <div class="text-xl font-bold text-[var(--primary)] font-mono">${state.entities.length}</div>
            <div class="text-[11px] text-[var(--text-3)]">Mapped Entities</div>
          </div>
        </div>

        <div class="bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] p-4 space-y-3">
          <div class="text-xs font-bold text-[var(--text)] font-mono flex items-center gap-1.5">
            ${icon('shieldCheck', 14, 'text-emerald-600')}
            <span>What makes this export forensically sound?</span>
          </div>
          <ul class="text-xs text-[var(--text-3)] space-y-1.5 list-disc list-inside leading-relaxed">
            <li><strong>Zero Remote Dependencies:</strong> No CDNs, no external fonts, and no cloud trackers. The file works completely detached from the internet.</li>
            <li><strong>Cryptographic SHA-256 Ledger:</strong> Every source file's 64-character hash is listed alongside page and paragraph citations.</li>
            <li><strong>Built-In Client Search:</strong> Includes an embedded JavaScript filter allowing recipients to instantly search findings and quotes offline.</li>
            <li><strong>Print-Ready Stylesheet:</strong> Optimized with standard pagination breaks and clean black-and-white printing rules for physical legal exhibits.</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// TAB 3: FILE HASH RE-VERIFICATION & TAMPER DETECTOR
// ----------------------------------------------------------------------------
function renderHasherTab(state, labState = {}) {
  const result = labState.hasherResult || null;

  return `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-5">
        <div class="border-b border-[var(--border)] pb-3">
          <span class="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-600 font-bold">
            CRYPTOGRAPHIC PROVENANCE
          </span>
          <h2 class="text-base font-bold text-[var(--text)] font-mono mt-1">Live File Hash & Tamper Verifier</h2>
          <p class="text-xs text-[var(--text-3)] mt-0.5">
            Drop any file from your computer to calculate its SHA-256 byte fingerprint in-memory via the native Web Crypto API and verify it against registered case documents.
          </p>
        </div>

        <!-- Drag & drop verification target -->
        <div
          id="hasher-dropzone"
          class="border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] bg-[var(--surface-2)] rounded-[var(--radius-card)] p-8 text-center space-y-3 cursor-pointer transition-colors"
        >
          <div class="text-[var(--text-4)] flex justify-center">${icon('hash', 32)}</div>
          <div>
            <div class="text-xs font-semibold text-[var(--text)]">Drag & drop any file to verify cryptographic integrity</div>
            <p class="text-[11px] text-[var(--text-4)] mt-1">or click to choose a file from your hard drive</p>
          </div>
          <input type="file" id="hasher-file-input" class="hidden" />
          <button
            type="button"
            id="hasher-browse-btn"
            class="px-3.5 py-1.5 bg-[var(--surface)] hover:bg-[var(--surface-3)] text-xs font-medium text-[var(--text)] border border-[var(--border)] rounded-[var(--radius-sm)] shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            ${icon('upload', 13)}
            <span>Select File from Disk</span>
          </button>
        </div>

        ${result ? `
          <!-- Hash result verdict card -->
          <div class="p-4 rounded-[var(--radius-card)] border ${
            result.status === 'MATCH'
              ? 'bg-emerald-500/5 border-emerald-500/30'
              : result.status === 'TAMPER'
              ? 'bg-red-500/5 border-red-500/40'
              : 'bg-blue-500/5 border-blue-500/30'
          } space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="p-1 rounded-full ${
                  result.status === 'MATCH'
                    ? 'bg-emerald-500 text-white'
                    : result.status === 'TAMPER'
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-500 text-white'
                }">
                  ${icon(result.status === 'MATCH' ? 'check' : result.status === 'TAMPER' ? 'alertTriangle' : 'info', 14)}
                </span>
                <span class="text-xs font-bold font-mono ${
                  result.status === 'MATCH' ? 'text-emerald-700' : result.status === 'TAMPER' ? 'text-red-700' : 'text-blue-700'
                }">
                  ${result.status === 'MATCH' ? 'CRYPTOGRAPHIC INTEGRITY CONFIRMED (100% BYTE MATCH)' : result.status === 'TAMPER' ? 'TAMPER ALERT: FILE MODIFICATION DETECTED' : 'UNREGISTERED SOURCE (SHA-256 GENERATED)'}
                </span>
              </div>
              <span class="text-[10px] font-mono text-[var(--text-4)]">Computed in ${result.durationMs}ms</span>
            </div>

            <p class="text-xs text-[var(--text)] leading-relaxed font-medium">
              ${result.message}
            </p>

            <div class="bg-[var(--surface)] p-3 rounded border border-[var(--border)] space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-[var(--text-3)]">Tested File:</span>
                <strong class="font-mono text-[var(--text)]">${result.fileName}</strong>
              </div>
              <div class="text-xs space-y-1">
                <span class="text-[var(--text-3)]">Calculated SHA-256:</span>
                <div class="p-2 rounded bg-[var(--surface-2)] font-mono text-[11px] text-[var(--primary)] break-all select-all flex items-center justify-between gap-2 border border-[var(--border)]">
                  <span>${result.calculatedHash}</span>
                  <button
                    class="p-1 hover:text-[var(--text)] text-[var(--text-4)] cursor-pointer"
                    title="Copy SHA-256"
                    onclick="navigator.clipboard.writeText('${result.calculatedHash}')"
                  >
                    ${icon('copy', 13)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Registered custody ledger preview -->
        <div>
          <h3 class="text-xs font-bold text-[var(--text)] font-mono mb-2 flex items-center justify-between">
            <span>Case Custody Ledger (${state.sources.length} Documents)</span>
          </h3>
          <div class="space-y-1.5 max-h-48 overflow-y-auto">
            ${state.sources.map(s => `
              <div class="flex items-center justify-between p-2 rounded bg-[var(--surface-2)] text-xs border border-[var(--border)]">
                <div class="flex items-center gap-2 truncate pr-3">
                  <span class="text-[var(--text-4)]">${icon('fileText', 13)}</span>
                  <span class="font-medium text-[var(--text)] truncate">${s.name}</span>
                </div>
                <span class="font-mono text-[10px] text-[var(--text-3)] flex-none">
                  ${s.sha256 ? s.sha256.slice(0, 16) + '...' : 'No hash'}
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// TAB 4: WHISTLEBLOWER PII REDACTION & ANONYMIZER
// ----------------------------------------------------------------------------
function renderRedactorTab(state, labState = {}) {
  const originalText = labState.redactorOriginalText || (state.evidence[0]?.verbatimQuote || state.evidence[0]?.excerpt || 'Contact whistleblower at apex.insider@meridian-jv.org or call +1 (555) 019-2834 regarding the $24,800,000 transfer.');
  const mode = labState.redactorMode || 'solid';
  const redactEmails = labState.redactEmails !== false;
  const redactPhones = labState.redactPhones !== false;
  const redactAmounts = labState.redactAmounts === true;

  const entityNames = state.entities.map(e => e.name);
  const redacted = redactText(originalText, {
    mode,
    redactEmails,
    redactPhones,
    redactAmounts,
    caseEntities: entityNames
  });

  return `
    <div class="max-w-5xl mx-auto space-y-6">
      <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-5">
        <div class="border-b border-[var(--border)] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span class="px-2 py-0.5 text-[10px] font-mono rounded bg-red-500/10 text-red-600 font-bold">
              WHISTLEBLOWER PROTECTION
            </span>
            <h2 class="text-base font-bold text-[var(--text)] font-mono mt-1">PII Redaction & Sanitization Engine</h2>
            <p class="text-xs text-[var(--text-3)] mt-0.5">
              Safely scrub confidential whistleblower emails, phone numbers, witness identities, and case entities before sharing or publishing.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <select id="redactor-source-quote-select" class="text-xs bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] px-2.5 py-1.5 text-[var(--text)]">
              <option value="">-- Pick from Evidence Citations --</option>
              ${state.evidence.map((e, idx) => `<option value="${idx}">Evidence #${idx + 1}: ${(e.verbatimQuote || e.excerpt || '').slice(0, 40)}...</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Controls Toolbar -->
        <div class="flex flex-wrap items-center gap-4 p-3 bg-[var(--surface-2)] rounded-[var(--radius-sm)] border border-[var(--border)] text-xs">
          <div class="flex items-center gap-2">
            <span class="font-bold text-[var(--text)]">Redaction Style:</span>
            <label class="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="redactor-style" value="solid" ${mode === 'solid' ? 'checked' : ''} class="text-[var(--primary)]" />
              <span>Solid Block (████)</span>
            </label>
            <label class="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="redactor-style" value="tag" ${mode === 'tag' ? 'checked' : ''} class="text-[var(--primary)]" />
              <span>Semantic Tag ([REDACTED])</span>
            </label>
          </div>

          <div class="h-4 w-px bg-[var(--border)]"></div>

          <div class="flex items-center gap-3">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="redactor-emails" ${redactEmails ? 'checked' : ''} />
              <span>Emails</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="redactor-phones" ${redactPhones ? 'checked' : ''} />
              <span>Phones</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="redactor-amounts" ${redactAmounts ? 'checked' : ''} />
              <span>Amounts ($)</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="redactor-entities" checked />
              <span>Case Entities (${entityNames.length})</span>
            </label>
          </div>
        </div>

        <!-- Side-by-side comparison -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-[var(--text)] font-mono">Original Unsanitized Text:</label>
            </div>
            <textarea
              id="redactor-input"
              rows="7"
              class="w-full text-xs font-mono bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] p-3 text-[var(--text)] focus:outline-none focus:border-[var(--primary)] leading-relaxed resize-y"
              placeholder="Paste unredacted source text here..."
            >${originalText}</textarea>
          </div>

          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-emerald-600 font-mono">Sanitized Output:</label>
              <button
                id="redactor-copy-btn"
                class="text-xs text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                ${icon('copy', 12)}
                <span>Copy Sanitized Text</span>
              </button>
            </div>
            <div
              id="redactor-output"
              class="w-full h-44 overflow-y-auto text-xs font-mono bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] p-3 text-[var(--text)] leading-relaxed select-all"
            >${redacted}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// TAB 5: MULTI-FORMAT CITATIONS
// ----------------------------------------------------------------------------
function renderCitationsTab(state, labState = {}) {
  const selectedIdx = labState.citationEvidenceIdx || 0;
  const currentEvidence = state.evidence[selectedIdx] || state.evidence[0] || null;
  const format = labState.citationFormat || 'bluebook';

  const source = currentEvidence ? state.sources.find(s => s.id === currentEvidence.sourceId) || {} : {};
  const singleCite = currentEvidence ? generateCitation(currentEvidence, source, format) : 'No evidence captured yet.';

  return `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-5">
        <div class="border-b border-[var(--border)] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span class="px-2 py-0.5 text-[10px] font-mono rounded bg-blue-500/10 text-blue-600 font-bold">
              STANDARDIZED SCHOLARLY CITATION
            </span>
            <h2 class="text-base font-bold text-[var(--text)] font-mono mt-1">Multi-Format Legal & Academic Citation Generator</h2>
            <p class="text-xs text-[var(--text-3)] mt-0.5">
              Automatically format evidence items with exact page numbers, paragraph coordinates, and SHA-256 hashes into formal citation standards.
            </p>
          </div>

          <div>
            <select id="citation-evidence-select" class="text-xs bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] px-2.5 py-1.5 text-[var(--text)] font-medium">
              ${state.evidence.map((e, idx) => `
                <option value="${idx}" ${idx === selectedIdx ? 'selected' : ''}>
                  #${idx + 1}: ${(e.verbatimQuote || e.excerpt || '').slice(0, 35)}... (${escapeHtml(e.location || (e.pageNumber ? `p. ${e.pageNumber}` : (e.page ? `p. ${e.page}` : 'Record')))})
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Format Selector Buttons -->
        <div class="flex items-center gap-2 border-b border-[var(--border)] pb-3 overflow-x-auto">
          ${[
            { id: 'bluebook', label: 'Legal Bluebook' },
            { id: 'chicago', label: 'Chicago / Turabian' },
            { id: 'apa', label: 'APA 7th' },
            { id: 'oscola', label: 'OSCOLA (UK/Intl)' },
            { id: 'bibtex', label: 'BibTeX (.bib)' }
          ].map(f => `
            <button
              class="citation-format-btn px-3 py-1 rounded-[var(--radius-sm)] text-xs font-mono font-medium transition-all cursor-pointer ${format === f.id
                ? 'bg-[var(--primary)] text-white font-bold shadow-xs'
                : 'bg-[var(--surface-2)] text-[var(--text-3)] hover:text-[var(--text)] border border-[var(--border)]'}"
              data-format="${f.id}"
            >
              ${f.label}
            </button>
          `).join('')}
        </div>

        <!-- Citation Box -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-[var(--text)] font-mono uppercase">${format} Citation:</span>
            <button
              id="citation-copy-single-btn"
              class="text-xs text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              ${icon('copy', 13)}
              <span>Copy Formatted Citation</span>
            </button>
          </div>

          <pre class="p-4 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--border)] text-xs font-mono text-[var(--text)] whitespace-pre-wrap break-all leading-relaxed select-all" id="citation-output">${singleCite}</pre>
        </div>

        <!-- Batch Exporter -->
        <div class="pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <div class="text-xs text-[var(--text-3)]">
            Total Case Citations Available: <strong>${state.evidence.length}</strong>
          </div>
          <button
            id="citation-copy-all-btn"
            class="px-3 py-1.5 bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-xs text-[var(--text)] font-medium border border-[var(--border)] rounded-[var(--radius-sm)] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            ${icon('bookOpen', 13)}
            <span>Copy Full Case Bibliography (${format.toUpperCase()})</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// TAB 6: CROSS-DOCUMENT OVERLAP & DUPLICATE DETECTOR
// ----------------------------------------------------------------------------
function renderOverlapTab(state, labState = {}) {
  const overlapResult = labState.overlapResult || null;

  return `
    <div class="max-w-5xl mx-auto space-y-6">
      <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-5">
        <div class="border-b border-[var(--border)] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span class="px-2 py-0.5 text-[10px] font-mono rounded bg-amber-500/10 text-amber-600 font-bold">
              PLAGIARISM & COORDINATED DRAFTS
            </span>
            <h2 class="text-base font-bold text-[var(--text)] font-mono mt-1">Cross-Document Text Overlap & Duplicate Detector</h2>
            <p class="text-xs text-[var(--text-3)] mt-0.5">
              Uses sliding-window n-gram tokenization and Jaccard similarity to detect duplicated paragraphs, shared boilerplate, or undisclosed coordination between independent filings.
            </p>
          </div>

          <button
            id="overlap-run-btn"
            class="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold rounded-[var(--radius-sm)] shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            ${icon('compare', 14)}
            <span>Analyze Text Overlap</span>
          </button>
        </div>

        <!-- Document Pickers -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-[var(--text)] font-mono">Document A:</label>
              <select id="overlap-doc-a-select" class="text-xs bg-[var(--surface-2)] border border-[var(--border)] rounded px-2 py-1 text-[var(--text)]">
                ${state.sources.map((s, i) => `<option value="${s.id}" ${i === 0 ? 'selected' : ''}>${s.name}</option>`).join('')}
              </select>
            </div>
            <textarea
              id="overlap-text-a"
              rows="6"
              class="w-full text-xs font-mono bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] p-3 text-[var(--text)] focus:outline-none focus:border-[var(--primary)] leading-relaxed resize-y"
            >${state.sources[0]?.content?.pages?.[0]?.text || 'Contract scope: The Contractor agrees to execute deepwater berth maintenance and dredged spoil containment at Zone 4 for consideration of $24,800,000 USD.'}</textarea>
          </div>

          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-[var(--text)] font-mono">Document B:</label>
              <select id="overlap-doc-b-select" class="text-xs bg-[var(--surface-2)] border border-[var(--border)] rounded px-2 py-1 text-[var(--text)]">
                ${state.sources.map((s, i) => `<option value="${s.id}" ${i === 1 ? 'selected' : ''}>${s.name}</option>`).join('')}
              </select>
            </div>
            <textarea
              id="overlap-text-b"
              rows="6"
              class="w-full text-xs font-mono bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] p-3 text-[var(--text)] focus:outline-none focus:border-[var(--primary)] leading-relaxed resize-y"
            >${state.sources[1]?.content?.pages?.[0]?.text || state.sources[0]?.content?.pages?.[0]?.text || 'The Contractor agrees to execute deepwater berth maintenance and dredged spoil containment at Zone 4, with payments issued across 4 scheduled milestone tranches.'}</textarea>
          </div>
        </div>

        ${overlapResult ? `
          <!-- Overlap Analysis Results -->
          <div class="space-y-4 pt-2 border-t border-[var(--border)]">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-xs font-bold text-[var(--text)] font-mono">SIMILARITY SCORE:</span>
                <span class="text-base font-bold font-mono ${overlapResult.similarityPercentage > 20 ? 'text-amber-600' : 'text-emerald-600'}">
                  ${overlapResult.similarityPercentage}% Overlap
                </span>
                <span class="text-xs text-[var(--text-4)] font-mono">
                  (${overlapResult.sharedShingleCount} matching 5-word shingles)
                </span>
              </div>
            </div>

            <!-- Matching excerpts -->
            <div>
              <div class="text-xs font-bold text-[var(--text)] font-mono mb-2">Identified Shared Text Blocks:</div>
              ${overlapResult.matchingExcerpts.length > 0 ? `
                <div class="space-y-2">
                  ${overlapResult.matchingExcerpts.map(ex => `
                    <div class="p-3 rounded bg-[var(--surface-2)] border-l-4 border-amber-500 text-xs font-serif text-[var(--text)] italic">
                      "${ex}"
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="p-4 rounded bg-[var(--surface-2)] text-xs text-[var(--text-3)] text-center">
                  No identical sentence blocks detected between these two texts.
                </div>
              `}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}
