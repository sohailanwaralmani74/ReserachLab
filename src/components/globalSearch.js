import { icon, getFileIcon } from './icons.js';

export function renderGlobalSearchModal({ query = '', results = [], activeFilter = 'all' }) {
  return `
    <div id="search-modal-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-start justify-center pt-16 px-4 select-none">
      <div id="search-modal-box" class="bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-card)] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
        
        <!-- Search Input Header -->
        <div class="p-3 border-b border-[var(--border)] flex items-center gap-3 bg-[var(--surface-2)]">
          <span class="text-[var(--text-3)] pl-1">${icon('search', 18)}</span>
          <input
            type="text"
            id="global-search-modal-input"
            class="w-full bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-4)] focus:outline-none"
            placeholder="Search documents, excerpts, claims, entities, dates, or type a command..."
            value="${escapeHtml(query)}"
            autofocus
          />
          <kbd id="close-search-modal-kbd" class="text-[10px] font-mono px-1.5 py-0.5 bg-[var(--surface-3)] border border-[var(--border)] rounded text-[var(--text-3)] cursor-pointer">
            ESC
          </kbd>
        </div>

        <!-- Filter Chips -->
        <div class="px-3 py-2 border-b border-[var(--border)] bg-[var(--surface)] flex items-center gap-1.5 text-xs overflow-x-auto">
          <button class="search-filter-chip px-2 py-0.5 rounded-[var(--radius-sm)] transition-colors ${activeFilter === 'all' ? 'bg-[var(--primary)] text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-filter="all">
            All
          </button>
          <button class="search-filter-chip px-2 py-0.5 rounded-[var(--radius-sm)] transition-colors ${activeFilter === 'sources' ? 'bg-[var(--primary)] text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-filter="sources">
            Document Text
          </button>
          <button class="search-filter-chip px-2 py-0.5 rounded-[var(--radius-sm)] transition-colors ${activeFilter === 'evidence' ? 'bg-[var(--primary)] text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-filter="evidence">
            Evidence
          </button>
          <button class="search-filter-chip px-2 py-0.5 rounded-[var(--radius-sm)] transition-colors ${activeFilter === 'claims' ? 'bg-[var(--primary)] text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-filter="claims">
            Claims
          </button>
          <button class="search-filter-chip px-2 py-0.5 rounded-[var(--radius-sm)] transition-colors ${activeFilter === 'entities' ? 'bg-[var(--primary)] text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-filter="entities">
            Entities
          </button>
        </div>

        <!-- Results / Commands List -->
        <div id="search-modal-results" class="flex-1 overflow-y-auto p-2 space-y-1">
          ${query.trim().length === 0 ? renderDefaultCommands() : renderResultsList(results, query)}
        </div>

        <!-- Search Footer -->
        <div class="px-3 py-2 border-t border-[var(--border)] bg-[var(--surface-2)] text-[11px] text-[var(--text-4)] flex items-center justify-between font-mono">
          <div class="flex items-center gap-3">
            <span><strong class="text-[var(--text-3)]">↑↓</strong> Navigate</span>
            <span><strong class="text-[var(--text-3)]">↵</strong> Select</span>
          </div>
          <span>Local index search (zero server calls)</span>
        </div>
      </div>
    </div>
  `;
}

function renderDefaultCommands() {
  return `
    <div class="p-2">
      <div class="text-[10px] font-mono uppercase text-[var(--text-4)] px-2 py-1 tracking-wider">Quick Commands</div>
      <div class="space-y-0.5">
        <button class="cmd-item w-full text-left px-2.5 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] flex items-center justify-between text-xs text-[var(--text)] transition-colors" data-action="new-claim">
          <div class="flex items-center gap-2">
            <span class="text-[var(--primary)]">${icon('shield', 14)}</span>
            <span>Create new Claim</span>
          </div>
          <span class="text-[10px] font-mono text-[var(--text-4)]">C</span>
        </button>

        <button class="cmd-item w-full text-left px-2.5 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] flex items-center justify-between text-xs text-[var(--text)] transition-colors" data-action="new-evidence">
          <div class="flex items-center gap-2">
            <span class="text-emerald-500">${icon('shieldCheck', 14)}</span>
            <span>Add Evidence citation</span>
          </div>
          <span class="text-[10px] font-mono text-[var(--text-4)]">E</span>
        </button>

        <button class="cmd-item w-full text-left px-2.5 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] flex items-center justify-between text-xs text-[var(--text)] transition-colors" data-action="new-entity">
          <div class="flex items-center gap-2">
            <span class="text-blue-500">${icon('user', 14)}</span>
            <span>Register Entity (Person / Company / Org)</span>
          </div>
        </button>

        <button class="cmd-item w-full text-left px-2.5 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] flex items-center justify-between text-xs text-[var(--text)] transition-colors" data-action="new-event">
          <div class="flex items-center gap-2">
            <span class="text-amber-500">${icon('clock', 14)}</span>
            <span>Add Timeline Event</span>
          </div>
        </button>

        <button class="cmd-item w-full text-left px-2.5 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] flex items-center justify-between text-xs text-[var(--text)] transition-colors" data-action="view-connections">
          <div class="flex items-center gap-2">
            <span class="text-purple-500">${icon('share2', 14)}</span>
            <span>Open Connections Graph</span>
          </div>
        </button>

        <button class="cmd-item w-full text-left px-2.5 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] flex items-center justify-between text-xs text-[var(--text)] transition-colors" data-action="view-compare">
          <div class="flex items-center gap-2">
            <span class="text-cyan-500">${icon('compare', 14)}</span>
            <span>Compare Documents Side-by-Side</span>
          </div>
        </button>

        <button class="cmd-item w-full text-left px-2.5 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] flex items-center justify-between text-xs text-[var(--text)] transition-colors" data-action="view-report">
          <div class="flex items-center gap-2">
            <span class="text-[var(--primary)]">${icon('printer', 14)}</span>
            <span>Generate Evidence Dossier Report</span>
          </div>
        </button>
      </div>
    </div>
  `;
}

function renderResultsList(results, query) {
  if (results.length === 0) {
    return `
      <div class="p-8 text-center text-xs text-[var(--text-4)]">
        No matching records found for "${escapeHtml(query)}"
      </div>
    `;
  }

  return results.map((item) => {
    let iconEl = icon('fileText', 14, 'text-slate-400');
    let badgeClass = 'bg-[var(--surface-3)] text-[var(--text-3)]';

    if (item.type === 'source_text') {
      iconEl = getFileIcon(item.sourceType, 14);
      badgeClass = 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400';
    } else if (item.type === 'evidence') {
      iconEl = icon('shieldCheck', 14, 'text-emerald-500');
      badgeClass = 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400';
    } else if (item.type === 'claim') {
      iconEl = icon('shield', 14, 'text-[var(--primary)]');
      badgeClass = 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300';
    } else if (item.type === 'entity') {
      iconEl = icon('user', 14, 'text-purple-500');
      badgeClass = 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400';
    }

    return `
      <div
        class="search-result-row group p-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] transition-colors cursor-pointer border border-transparent hover:border-[var(--border)]"
        data-result-type="${item.type}"
        data-source-id="${item.sourceId || ''}"
        data-page="${item.page || ''}"
        data-claim-id="${item.claimId || ''}"
        data-evidence-id="${item.evidenceId || ''}"
      >
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-start gap-2.5 min-w-0">
            <span class="flex-none pt-0.5">${iconEl}</span>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-xs text-[var(--text)] truncate">${escapeHtml(item.title)}</span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded ${badgeClass}">${item.badge}</span>
              </div>
              <p class="text-xs text-[var(--text-2)] mt-0.5 line-clamp-2 leading-relaxed font-sans">
                ${item.snippetHighlight}
              </p>
              <div class="text-[10px] text-[var(--text-4)] font-mono mt-1 flex items-center gap-1.5">
                <span>${escapeHtml(item.location || '')}</span>
              </div>
            </div>
          </div>

          ${item.type === 'source_text' ? `
            <button
              class="quick-save-evidence-btn opacity-0 group-hover:opacity-100 flex-none px-2 py-1 text-[11px] bg-[var(--primary-soft)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white font-medium rounded transition-all shadow-xs"
              data-source-id="${item.sourceId}"
              data-source-name="${escapeHtml(item.sourceName)}"
              data-location="${escapeHtml(item.location)}"
              data-page="${item.page || 1}"
              data-excerpt="${escapeHtml(item.plainText)}"
              title="Save directly as evidence"
            >
              + Save as Evidence
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
