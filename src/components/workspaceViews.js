import { icon, getFileIcon } from './icons.js';

export function renderWorkspaceModeBar(activeMode = 'document', counts = {}, isExplorerCollapsed = false) {
  const modes = [
    { id: 'document', label: 'Document', icon: 'fileText', count: counts.sources || 0 },
    { id: 'evidence', label: 'Evidence', icon: 'shieldCheck', count: counts.evidence || 0 },
    { id: 'claims', label: 'Claims', icon: 'shield', count: counts.claims || 0 },
    { id: 'connections', label: 'Connections', icon: 'share2', count: counts.entities || 0 },
    { id: 'timeline', label: 'Timeline', icon: 'clock', count: counts.timeline || 0 },
    { id: 'verification', label: 'Verification', icon: 'checkCircle', alert: counts.conflicts > 0 },
    { id: 'notes', label: 'Notes', icon: 'bookOpen', count: counts.notes || 0 },
    { id: 'compare', label: 'Compare', icon: 'compare' },
    { id: 'report', label: 'Report', icon: 'printer' },
  ];

  return `
    <nav id="workspace-mode-bar" class="h-11 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 flex items-center justify-between text-xs select-none flex-none overflow-x-auto gap-2 sticky top-[56px] z-20 shadow-xs">
      <div class="flex items-center gap-1">
        ${isExplorerCollapsed ? `
          <button
            id="expand-explorer-btn"
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] text-xs text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--surface-3)] font-medium border border-[var(--border)] mr-1 cursor-pointer transition-colors shadow-xs"
            title="Expand Files Sidebar"
          >
            ${icon('layers', 13)}
            <span class="font-medium">Files</span>
          </button>
        ` : ''}
        ${modes.map((m) => {
          const isActive = activeMode === m.id;
          return `
            <button
              class="workspace-tab-btn flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] transition-all font-medium ${isActive ? 'bg-[var(--surface)] text-[var(--primary)] font-semibold shadow-xs border border-[var(--border)]' : 'text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-3)]'}"
              data-mode="${m.id}"
            >
              <span>${icon(m.icon, 13)}</span>
              <span>${m.label}</span>
              ${m.count !== undefined && m.count > 0 ? `
                <span class="text-[10px] font-mono px-1 py-0.2 rounded-full ${isActive ? 'bg-[var(--primary-soft)] text-[var(--primary)]' : 'bg-[var(--surface-3)] text-[var(--text-4)]'}">
                  ${m.count}
                </span>
              ` : ''}
              ${m.alert ? `
                <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse" title="Conflicts or integrity alerts detected"></span>
              ` : ''}
            </button>
          `;
        }).join('')}
      </div>

      <div class="hidden lg:flex items-center text-[11px] text-[var(--text-4)] font-mono gap-3">
        <span>Offline Active</span>
        <span>·</span>
        <span>Zero Cloud Sync</span>
      </div>
    </nav>
  `;
}

// 1. Starting Empty State (Section 6)
export function renderEmptyState() {
  return `
    <div class="h-full flex items-center justify-center p-8 bg-[var(--bg)] select-none">
      <div class="max-w-md w-full text-center space-y-6 bg-[var(--surface)] p-8 rounded-[var(--radius-card)] border border-[var(--border)] shadow-xs">
        <div class="w-14 h-14 rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center mx-auto border border-[var(--border)]">
          ${icon('shield', 28)}
        </div>

        <div class="space-y-2">
          <h2 class="text-lg font-bold text-[var(--text)]">Start your investigation</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Upload your research material to begin. PDFs, Documents, Spreadsheets, Transcripts, Images, Notes.
          </p>
        </div>

        <div class="p-6 border-2 border-dashed border-[var(--border)] rounded-[var(--radius-card)] bg-[var(--surface-2)] space-y-3 hover:border-[var(--primary)] transition-colors cursor-pointer" id="dropzone-area">
          <div class="text-[var(--text-4)] mx-auto flex justify-center">
            ${icon('upload', 24)}
          </div>
          <div class="space-y-1">
            <button
              id="empty-add-files-btn"
              class="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold rounded-[var(--radius-md)] shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              ${icon('plus', 14)}
              <span>Add research files</span>
            </button>
            <p class="text-[11px] text-[var(--text-4)]">or drag & drop files anywhere in this window</p>
          </div>
        </div>

        <div class="pt-2 border-t border-[var(--border)] flex items-center justify-center gap-3">
          <button
            id="empty-load-sample-btn"
            class="text-xs text-[var(--primary)] hover:underline flex items-center gap-1.5 font-medium cursor-pointer"
          >
            ${icon('database', 13)}
            <span>Load Sample Investigation ("Project Meridian")</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// 2. Evidence Index View (Section 9 & 10)
export function renderEvidenceView({ evidence = [], sources = [], claims = [], filterRel = 'all' }) {
  const filtered = filterRel === 'all' ? evidence : evidence.filter((e) => e.relationship === filterRel);

  return `
    <div class="w-full flex flex-col bg-[var(--surface)]">
      <!-- Toolbar -->
      <div class="p-3 border-b border-[var(--border)] bg-[var(--surface-2)] sticky top-[100px] z-10 flex items-center justify-between text-xs gap-2 select-none flex-none shadow-xs">
        <div class="flex items-center gap-2">
          <span class="font-bold text-xs uppercase tracking-wider text-[var(--text-3)] font-mono flex items-center gap-1.5">
            ${icon('shieldCheck', 14)} Evidence Index (${filtered.length})
          </span>
          <div class="h-4 w-px bg-[var(--border)]"></div>
          <!-- Filter by Relationship -->
          <div class="flex items-center gap-1">
            <button class="ev-filter-btn px-2 py-0.5 rounded transition-colors ${filterRel === 'all' ? 'bg-[var(--primary)] text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-rel="all">All</button>
            <button class="ev-filter-btn px-2 py-0.5 rounded transition-colors ${filterRel === 'Supporting' ? 'bg-emerald-600 text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-rel="Supporting">Supporting</button>
            <button class="ev-filter-btn px-2 py-0.5 rounded transition-colors ${filterRel === 'Contradicting' ? 'bg-red-600 text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-rel="Contradicting">Contradicting</button>
            <button class="ev-filter-btn px-2 py-0.5 rounded transition-colors ${filterRel === 'Reference' ? 'bg-blue-600 text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-rel="Reference">Reference</button>
          </div>
        </div>

        <button
          id="btn-add-evidence-manual"
          class="flex items-center gap-1 px-2.5 py-1 bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded-[var(--radius-sm)] font-medium text-xs shadow-xs transition-colors cursor-pointer"
        >
          ${icon('plus', 13)}
          <span>Add Evidence</span>
        </button>
      </div>

      <!-- Evidence Table -->
      <div class="p-4 bg-[var(--bg)] min-h-[calc(100vh-160px)]">
        ${filtered.length === 0 ? `
          <div class="p-8 text-center text-xs text-[var(--text-4)] bg-[var(--surface)] rounded-[var(--radius-card)] border border-[var(--border)]">
            No evidence citations matching filter. Highlight text in any source document to capture evidence.
          </div>
        ` : `
          <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-xs overflow-hidden">
            <table class="w-full text-left text-xs border-collapse font-sans">
              <thead class="bg-[var(--surface-2)] border-b border-[var(--border)] font-mono text-[11px] text-[var(--text-3)]">
                <tr>
                  <th class="py-2 px-3 w-16">ID</th>
                  <th class="py-2 px-3 w-32">Relationship</th>
                  <th class="py-2 px-3">Excerpt</th>
                  <th class="py-2 px-3 w-44">Source & Location</th>
                  <th class="py-2 px-3 w-36">Linked Claim</th>
                  <th class="py-2 px-3 w-28 text-center">Integrity</th>
                  <th class="py-2 px-3 w-20 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--border)]">
                ${filtered.map((ev) => {
                  let relBadge = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
                  if (ev.relationship === 'Supporting') relBadge = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
                  if (ev.relationship === 'Contradicting') relBadge = 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400 border border-red-200 dark:border-red-800';
                  if (ev.relationship === 'Reference') relBadge = 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border border-blue-200 dark:border-blue-800';

                  const claim = claims.find((c) => c.id === ev.linkedClaimId);

                  return `
                    <tr class="hover:bg-[var(--surface-2)] transition-colors group">
                      <td class="py-3 px-3 font-mono font-semibold text-[var(--primary)] align-top">
                        ${ev.id}
                      </td>
                      <td class="py-3 px-3 align-top">
                        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-medium font-mono ${relBadge}">
                          ${ev.relationship || 'Reference'}
                        </span>
                      </td>
                      <td class="py-3 px-3 text-[var(--text)] leading-relaxed align-top">
                        <div class="italic text-[13px] border-l-2 border-[var(--border-strong)] pl-2">
                          "${escapeHtml(ev.excerpt)}"
                        </div>
                        ${ev.notes ? `
                          <div class="mt-1 text-[11px] text-[var(--text-3)] font-sans">
                            <strong>Note:</strong> ${escapeHtml(ev.notes)}
                          </div>
                        ` : ''}
                      </td>
                      <td class="py-3 px-3 text-[var(--text-2)] align-top">
                        <div class="font-medium text-xs truncate max-w-[170px]" title="${escapeHtml(ev.sourceName)}">
                          ${escapeHtml(ev.sourceName)}
                        </div>
                        <div class="text-[10px] text-[var(--text-4)] font-mono mt-0.5">
                          ${escapeHtml(ev.location)}
                        </div>
                      </td>
                      <td class="py-3 px-3 align-top">
                        ${claim ? `
                          <span class="text-xs text-[var(--text)] font-medium block truncate max-w-[140px]" title="${escapeHtml(claim.statement)}">
                            ${claim.id}: ${escapeHtml(claim.statement)}
                          </span>
                        ` : `
                          <span class="text-[11px] text-[var(--text-4)] italic">Not linked</span>
                        `}
                      </td>
                      <td class="py-3 px-3 align-top text-center">
                        <span class="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                          ${icon('checkCircle', 11)} Verified
                        </span>
                      </td>
                      <td class="py-3 px-3 align-top text-center">
                        <div class="flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            class="jump-to-source-btn p-1 hover:text-[var(--primary)] rounded hover:bg-[var(--surface-3)]"
                            data-source-id="${ev.sourceId}"
                            data-page="${ev.page || 1}"
                            title="Open in document viewer"
                          >
                            ${icon('eye', 13)}
                          </button>
                          <button
                            class="delete-evidence-btn p-1 hover:text-red-500 rounded hover:bg-[var(--surface-3)]"
                            data-evidence-id="${ev.id}"
                            title="Delete evidence"
                          >
                            ${icon('trash', 13)}
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `;
}

// 3. Claims View (Section 10 & 11)
export function renderClaimsView({ claims = [], evidence = [], entities = [] }) {
  return `
    <div class="w-full flex flex-col bg-[var(--surface)]">
      <!-- Toolbar -->
      <div class="p-3 border-b border-[var(--border)] bg-[var(--surface-2)] sticky top-[100px] z-10 flex items-center justify-between text-xs gap-2 select-none flex-none shadow-xs">
        <div class="flex items-center gap-2">
          <span class="font-bold text-xs uppercase tracking-wider text-[var(--text-3)] font-mono flex items-center gap-1.5">
            ${icon('shield', 14)} Investigation Claims (${claims.length})
          </span>
        </div>

        <button
          id="btn-add-claim"
          class="flex items-center gap-1 px-2.5 py-1 bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded-[var(--radius-sm)] font-medium text-xs shadow-xs transition-colors cursor-pointer"
        >
          ${icon('plus', 13)}
          <span>Add Claim</span>
        </button>
      </div>

      <!-- Claims Cards Grid -->
      <div class="p-4 bg-[var(--bg)] space-y-3 min-h-[calc(100vh-160px)]">
        ${claims.length === 0 ? `
          <div class="p-8 text-center text-xs text-[var(--text-4)] bg-[var(--surface)] rounded-[var(--radius-card)] border border-[var(--border)]">
            No claims defined yet. Define investigative hypotheses and link supporting or contradicting evidence.
          </div>
        ` : claims.map((c) => {
          const linkedEv = evidence.filter((e) => e.linkedClaimId === c.id);
          const supporting = linkedEv.filter((e) => e.relationship === 'Supporting');
          const contradicting = linkedEv.filter((e) => e.relationship === 'Contradicting');
          const reference = linkedEv.filter((e) => e.relationship === 'Reference');

          let statusBadge = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
          if (c.status === 'Supported') statusBadge = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
          if (c.status === 'Partially supported') statusBadge = 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
          if (c.status === 'Needs verification') statusBadge = 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
          if (c.status === 'Conflicting') statusBadge = 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400 border border-red-200 dark:border-red-800';
          if (c.status === 'Unsupported') statusBadge = 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400';

          return `
            <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 shadow-xs space-y-3">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-start gap-2.5 min-w-0">
                  <span class="font-mono text-xs px-2 py-0.5 rounded bg-[var(--surface-3)] font-semibold text-[var(--primary)] flex-none">
                    ${c.id}
                  </span>
                  <div>
                    <h3 class="font-semibold text-sm text-[var(--text)] leading-snug">
                      ${escapeHtml(c.statement)}
                    </h3>
                    ${c.notes ? `<p class="text-xs text-[var(--text-3)] mt-1">${escapeHtml(c.notes)}</p>` : ''}
                  </div>
                </div>

                <div class="flex items-center gap-2 flex-none">
                  <span class="px-2 py-0.5 text-xs font-mono rounded font-medium ${statusBadge}">
                    ${c.status}
                  </span>
                  <button class="delete-claim-btn p-1 hover:text-red-500 rounded transition-colors" data-claim-id="${c.id}" title="Delete claim">
                    ${icon('trash', 13)}
                  </button>
                </div>
              </div>

              <!-- Evidence Citations Summary -->
              <div class="pt-2 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div class="flex items-center gap-2 font-mono text-[11px]">
                  <span class="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                    ${icon('check', 12)} ${supporting.length} Supporting
                  </span>
                  <span>·</span>
                  <span class="text-red-600 dark:text-red-400 flex items-center gap-1 font-semibold">
                    ${icon('alertTriangle', 12)} ${contradicting.length} Contradicting
                  </span>
                  <span>·</span>
                  <span class="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    ${reference.length} Reference
                  </span>
                </div>

                <button
                  class="link-evidence-to-claim-btn text-[11px] text-[var(--primary)] hover:underline flex items-center gap-1 font-medium"
                  data-claim-id="${c.id}"
                >
                  ${icon('link', 11)} Link Evidence
                </button>
              </div>

              <!-- Linked Evidence Snippets -->
              ${linkedEv.length > 0 ? `
                <div class="space-y-1.5 pt-1">
                  ${linkedEv.map((ev) => `
                    <div class="text-xs bg-[var(--surface-2)] p-2 rounded-[var(--radius-sm)] border border-[var(--border)] flex items-start justify-between gap-2">
                      <div class="min-w-0">
                        <span class="font-mono text-[10px] font-semibold text-[var(--primary)]">${ev.id}</span>
                        <span class="text-[var(--text-4)] text-[10px] font-mono">(${escapeHtml(ev.sourceName)} · ${escapeHtml(ev.location)})</span>
                        <p class="italic text-[var(--text-2)] mt-0.5 line-clamp-1">"${escapeHtml(ev.excerpt)}"</p>
                      </div>
                      <span class="text-[10px] font-mono flex-none px-1.5 py-0.5 rounded ${ev.relationship === 'Supporting' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950' : ev.relationship === 'Contradicting' ? 'text-red-600 bg-red-50 dark:bg-red-950' : 'text-blue-600 bg-blue-50 dark:bg-blue-950'}">
                        ${ev.relationship}
                      </span>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="text-[11px] text-[var(--text-4)] italic">
                  No evidence citations linked yet.
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// 4. Interactive Connections Graph View (Section 12)
export function renderConnectionsView({ entities = [], relationships = [], claims = [], sources = [], filterType = 'all' }) {
  return `
    <div class="w-full flex flex-col bg-[var(--surface)] relative">
      <!-- Graph Toolbar -->
      <div class="p-3 border-b border-[var(--border)] bg-[var(--surface-2)] sticky top-[100px] z-10 flex items-center justify-between text-xs gap-2 select-none flex-none shadow-xs">
        <div class="flex items-center gap-2">
          <span class="font-bold text-xs uppercase tracking-wider text-[var(--text-3)] font-mono flex items-center gap-1.5">
            ${icon('share2', 14)} Entity & Relationship Network
          </span>
          <div class="h-4 w-px bg-[var(--border)]"></div>
          <!-- Filter Nodes -->
          <div class="flex items-center gap-1">
            <button class="graph-filter-btn px-2 py-0.5 rounded transition-colors ${filterType === 'all' ? 'bg-[var(--primary)] text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-type="all">All (${entities.length})</button>
            <button class="graph-filter-btn px-2 py-0.5 rounded transition-colors ${filterType === 'Person' ? 'bg-blue-600 text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-type="Person">Persons</button>
            <button class="graph-filter-btn px-2 py-0.5 rounded transition-colors ${filterType === 'Company' ? 'bg-emerald-600 text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-type="Company">Companies</button>
            <button class="graph-filter-btn px-2 py-0.5 rounded transition-colors ${filterType === 'Organization' ? 'bg-amber-600 text-white font-medium' : 'text-[var(--text-3)] hover:bg-[var(--surface-3)]'}" data-type="Organization">Organizations</button>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            id="btn-add-entity"
            class="flex items-center gap-1 px-2.5 py-1 bg-[var(--surface-3)] hover:bg-[var(--border-strong)] rounded-[var(--radius-sm)] font-medium text-xs transition-colors cursor-pointer text-[var(--text)]"
          >
            ${icon('plus', 12)}
            <span>Add Entity</span>
          </button>
          <button
            id="btn-add-relationship"
            class="flex items-center gap-1 px-2.5 py-1 bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded-[var(--radius-sm)] font-medium text-xs shadow-xs transition-colors cursor-pointer"
          >
            ${icon('link', 12)}
            <span>Add Relationship</span>
          </button>
        </div>
      </div>

      <!-- Graph Stage (SVG Canvas) -->
      <div id="graph-stage-container" class="w-full min-h-[580px] h-[680px] bg-[var(--bg)] relative overflow-hidden flex items-center justify-center select-none border-b border-[var(--border)]">
        <svg id="network-graph-svg" class="w-full h-full cursor-grab active:cursor-grabbing"></svg>

        <!-- Node / Link Details Slide-over Drawer -->
        <div id="graph-details-drawer" class="hidden absolute top-4 right-4 w-72 bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-card)] shadow-xl p-4 text-xs space-y-3 z-20 animate-in slide-in-from-right-4 duration-150">
          <div class="flex items-start justify-between">
            <div>
              <span id="drawer-type-badge" class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--primary-soft)] text-[var(--primary)] font-semibold uppercase"></span>
              <h4 id="drawer-title" class="font-bold text-sm text-[var(--text)] mt-1"></h4>
            </div>
            <button id="close-graph-drawer-btn" class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded">
              ${icon('x', 14)}
            </button>
          </div>
          <p id="drawer-desc" class="text-xs text-[var(--text-3)] leading-relaxed"></p>
          <div id="drawer-links" class="pt-2 border-t border-[var(--border)] space-y-1.5"></div>
        </div>

        <!-- Graph Floating Controls -->
        <div class="absolute bottom-4 left-4 flex items-center gap-1 bg-[var(--surface)] p-1 rounded-[var(--radius-md)] border border-[var(--border)] shadow-xs text-xs z-10">
          <button id="graph-zoom-in" class="p-1.5 text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] rounded" title="Zoom in">${icon('zoomIn', 14)}</button>
          <button id="graph-zoom-out" class="p-1.5 text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] rounded" title="Zoom out">${icon('zoomOut', 14)}</button>
          <button id="graph-reset" class="p-1.5 text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] rounded" title="Reset View">${icon('refresh', 14)}</button>
        </div>
      </div>
    </div>
  `;
}

// 5. Chronological Timeline View (Section 13)
export function renderTimelineView({ timeline = [], evidence = [] }) {
  const sorted = [...timeline].sort((a, b) => (a.date > b.date ? 1 : -1));

  return `
    <div class="w-full flex flex-col bg-[var(--surface)]">
      <!-- Toolbar -->
      <div class="p-3 border-b border-[var(--border)] bg-[var(--surface-2)] sticky top-[100px] z-10 flex items-center justify-between text-xs gap-2 select-none flex-none shadow-xs">
        <div class="flex items-center gap-2">
          <span class="font-bold text-xs uppercase tracking-wider text-[var(--text-3)] font-mono flex items-center gap-1.5">
            ${icon('clock', 14)} Chronological Timeline (${sorted.length} events)
          </span>
        </div>

        <button
          id="btn-add-event"
          class="flex items-center gap-1 px-2.5 py-1 bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded-[var(--radius-sm)] font-medium text-xs shadow-xs transition-colors cursor-pointer"
        >
          ${icon('plus', 13)}
          <span>Add Timeline Event</span>
        </button>
      </div>

      <!-- Timeline Scroll Area -->
      <div class="p-6 bg-[var(--bg)] flex justify-center min-h-[calc(100vh-160px)]">
        <div class="max-w-2xl w-full relative">
          <!-- Timeline Central Line -->
          <div class="absolute top-2 bottom-2 left-6 w-0.5 bg-[var(--border-strong)]"></div>

          ${sorted.length === 0 ? `
            <div class="p-8 text-center text-xs text-[var(--text-4)] bg-[var(--surface)] rounded-[var(--radius-card)] border border-[var(--border)]">
              No timeline events recorded yet. Build chronological evidence sequences to reveal correlations and inconsistencies.
            </div>
          ` : `
            <div class="space-y-6">
              ${sorted.map((ev) => {
                const linkedEvItems = evidence.filter((e) => (ev.evidenceIds || []).includes(e.id));
                let precBadge = 'bg-[var(--surface-3)] text-[var(--text-3)]';
                if (ev.datePrecision === 'exact') precBadge = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400';
                if (ev.datePrecision === 'approximate') precBadge = 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400';

                return `
                  <div class="relative pl-14 group">
                    <!-- Node Bullet -->
                    <div class="absolute left-4 top-1.5 w-4.5 h-4.5 rounded-full bg-[var(--surface)] border-2 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] z-10 shadow-xs">
                      <div class="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
                    </div>

                    <!-- Event Card -->
                    <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 shadow-xs space-y-2 hover:border-[var(--border-strong)] transition-colors">
                      <div class="flex items-start justify-between gap-2">
                        <div>
                          <div class="flex items-center gap-2">
                            <span class="font-mono text-xs font-bold text-[var(--text)]">${escapeHtml(ev.date)}</span>
                            <span class="text-[10px] font-mono px-1.5 py-0.2 rounded uppercase ${precBadge}">${ev.datePrecision || 'exact'}</span>
                          </div>
                          <h4 class="font-semibold text-sm text-[var(--text)] mt-1">${escapeHtml(ev.title)}</h4>
                        </div>

                        <button class="delete-event-btn p-1 text-[var(--text-4)] hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity" data-event-id="${ev.id}" title="Delete event">
                          ${icon('trash', 13)}
                        </button>
                      </div>

                      <p class="text-xs text-[var(--text-3)] leading-relaxed">${escapeHtml(ev.description)}</p>

                      <!-- Linked Evidence Citations -->
                      <div class="pt-2 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
                        <span class="text-[10px] font-mono text-[var(--text-4)] uppercase">Evidence:</span>
                        ${linkedEvItems.length > 0 ? linkedEvItems.map((e) => `
                          <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--primary)] font-semibold cursor-pointer hover:bg-[var(--surface-3)]" title="${escapeHtml(e.excerpt)}">
                            #${e.id} (${escapeHtml(e.location)})
                          </span>
                        `).join('') : `
                          <span class="text-[10px] text-amber-600 dark:text-amber-400 italic">No primary evidence linked</span>
                        `}
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

// 6. Verification Engine Dashboard View (Section 16 & 19)
export function renderVerificationView({ verificationReport }) {
  const rep = verificationReport || {
    totalChecks: 0,
    matchesFound: 0,
    conflictsDetected: 0,
    evidenceMissingCount: 0,
    duplicatesDetected: 0,
    coverageRate: 0,
    supportedCount: 0,
    needStrongerCount: 0,
    unsupportedCount: 0,
    conflictingClaimsCount: 0,
    issues: [],
  };

  return `
    <div class="w-full flex flex-col bg-[var(--surface)]">
      <!-- Toolbar -->
      <div class="p-3 border-b border-[var(--border)] bg-[var(--surface-2)] sticky top-[100px] z-10 flex items-center justify-between text-xs gap-2 select-none flex-none shadow-xs">
        <div class="flex items-center gap-2">
          <span class="font-bold text-xs uppercase tracking-wider text-[var(--text-3)] font-mono flex items-center gap-1.5">
            ${icon('checkCircle', 14)} Deterministic Verification Engine
          </span>
        </div>

        <button
          id="btn-run-verification"
          class="flex items-center gap-1 px-2.5 py-1 bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded-[var(--radius-sm)] font-medium text-xs shadow-xs transition-colors cursor-pointer"
        >
          ${icon('refresh', 13)}
          <span>Run Verification Check</span>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 bg-[var(--bg)] space-y-6 max-w-4xl mx-auto w-full min-h-[calc(100vh-160px)]">
        <!-- Overview Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-[var(--surface)] p-3.5 rounded-[var(--radius-card)] border border-[var(--border)] space-y-1">
            <span class="text-[10px] font-mono uppercase text-[var(--text-4)]">Evidence Coverage</span>
            <div class="text-xl font-bold text-[var(--text)] font-mono">${rep.coverageRate}%</div>
            <div class="w-full bg-[var(--surface-3)] h-1.5 rounded-full overflow-hidden">
              <div class="bg-emerald-500 h-full" style="width: ${rep.coverageRate}%;"></div>
            </div>
          </div>

          <div class="bg-[var(--surface)] p-3.5 rounded-[var(--radius-card)] border border-[var(--border)] space-y-1">
            <span class="text-[10px] font-mono uppercase text-[var(--text-4)]">Quote Matches Found</span>
            <div class="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">${rep.matchesFound}</div>
            <span class="text-[10px] text-[var(--text-4)]">Verbatim source matching</span>
          </div>

          <div class="bg-[var(--surface)] p-3.5 rounded-[var(--radius-card)] border border-[var(--border)] space-y-1">
            <span class="text-[10px] font-mono uppercase text-[var(--text-4)]">Conflicts Detected</span>
            <div class="text-xl font-bold ${rep.conflictsDetected > 0 ? 'text-red-600 dark:text-red-400' : 'text-[var(--text)]'} font-mono">${rep.conflictsDetected}</div>
            <span class="text-[10px] text-[var(--text-4)]">Contradictory evidence</span>
          </div>

          <div class="bg-[var(--surface)] p-3.5 rounded-[var(--radius-card)] border border-[var(--border)] space-y-1">
            <span class="text-[10px] font-mono uppercase text-[var(--text-4)]">Missing Citations</span>
            <div class="text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">${rep.evidenceMissingCount + rep.unsupportedCount}</div>
            <span class="text-[10px] text-[var(--text-4)]">Claims/events uncited</span>
          </div>
        </div>

        <!-- Claims Coverage Breakdown Box -->
        <div class="bg-[var(--surface)] p-4 rounded-[var(--radius-card)] border border-[var(--border)] space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider font-mono text-[var(--text-3)]">Claims Evidence Coverage Breakdown</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div class="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <span class="text-emerald-700 dark:text-emerald-400 font-semibold block">Supported</span>
              <span class="text-base font-bold font-mono text-emerald-800 dark:text-emerald-300">${rep.supportedCount} claims</span>
            </div>
            <div class="p-2.5 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <span class="text-amber-700 dark:text-amber-400 font-semibold block">Need stronger evidence</span>
              <span class="text-base font-bold font-mono text-amber-800 dark:text-amber-300">${rep.needStrongerCount} claims</span>
            </div>
            <div class="p-2.5 rounded bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
              <span class="text-red-700 dark:text-red-400 font-semibold block">Conflicting</span>
              <span class="text-base font-bold font-mono text-red-800 dark:text-red-300">${rep.conflictingClaimsCount} claims</span>
            </div>
            <div class="p-2.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <span class="text-zinc-700 dark:text-zinc-300 font-semibold block">Unsupported</span>
              <span class="text-base font-bold font-mono text-zinc-800 dark:text-zinc-200">${rep.unsupportedCount} claims</span>
            </div>
          </div>
        </div>

        <!-- Issues List -->
        <div class="bg-[var(--surface)] rounded-[var(--radius-card)] border border-[var(--border)] overflow-hidden">
          <div class="px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
            <h3 class="text-xs font-bold uppercase tracking-wider font-mono text-[var(--text-3)]">
              Verification Findings (${rep.issues.length})
            </h3>
            <span class="text-[11px] text-[var(--text-4)] font-mono">SHA-256 + Verbatim Exact Match</span>
          </div>

          ${rep.issues.length === 0 ? `
            <div class="p-8 text-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              ${icon('checkCircle', 20, 'mx-auto mb-2')}
              All primary citations verified. Zero quote mismatches or conflicting claims detected.
            </div>
          ` : `
            <div class="divide-y divide-[var(--border)]">
              ${rep.issues.map((iss) => {
                let badgeClass = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
                if (iss.severity === 'danger') badgeClass = 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400 border border-red-200 dark:border-red-800';
                if (iss.severity === 'warning') badgeClass = 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
                if (iss.severity === 'notice') badgeClass = 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border border-blue-200 dark:border-blue-800';

                return `
                  <div class="p-3.5 space-y-1.5 hover:bg-[var(--surface-2)] transition-colors">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${badgeClass}">${iss.label}</span>
                        <h4 class="font-semibold text-xs text-[var(--text)]">${escapeHtml(iss.title)}</h4>
                      </div>
                      <span class="text-[10px] text-[var(--text-4)] font-mono">${new Date(iss.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p class="text-xs text-[var(--text-3)] leading-relaxed pl-1">${escapeHtml(iss.description)}</p>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

// 7. Notes View (Section 17)
export function renderNotesView({ notes = [] }) {
  return `
    <div class="w-full flex flex-col bg-[var(--surface)]">
      <div class="p-3 border-b border-[var(--border)] bg-[var(--surface-2)] sticky top-[100px] z-10 flex items-center justify-between text-xs gap-2 select-none flex-none shadow-xs">
        <span class="font-bold text-xs uppercase tracking-wider text-[var(--text-3)] font-mono flex items-center gap-1.5">
          ${icon('bookOpen', 14)} Investigation Notebook (${notes.length})
        </span>

        <button
          id="btn-add-note"
          class="flex items-center gap-1 px-2.5 py-1 bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded-[var(--radius-sm)] font-medium text-xs shadow-xs transition-colors cursor-pointer"
        >
          ${icon('plus', 13)}
          <span>New Note</span>
        </button>
      </div>

      <div class="p-4 bg-[var(--bg)] min-h-[calc(100vh-160px)]">
        ${notes.length === 0 ? `
          <div class="p-8 text-center text-xs text-[var(--text-4)] bg-[var(--surface)] rounded-[var(--radius-card)] border border-[var(--border)]">
            No research notes recorded yet. Attach notes to claims, entities, or save standalone reflections.
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            ${notes.map((n) => `
              <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 shadow-xs space-y-2 group hover:border-[var(--border-strong)] transition-colors">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-3)] text-[var(--text-4)] uppercase">
                      ${n.attachedToName ? `Attached to: ${escapeHtml(n.attachedToName)}` : 'Standalone Note'}
                    </span>
                    <h4 class="font-semibold text-sm text-[var(--text)] mt-1.5">${escapeHtml(n.title)}</h4>
                  </div>
                  <button class="delete-note-btn p-1 text-[var(--text-4)] hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity" data-note-id="${n.id}">
                    ${icon('trash', 13)}
                  </button>
                </div>
                <p class="text-xs text-[var(--text-2)] leading-relaxed whitespace-pre-wrap">${escapeHtml(n.content)}</p>
                <div class="pt-2 border-t border-[var(--border)] text-[10px] text-[var(--text-4)] font-mono">
                  Updated: ${new Date(n.updatedAt || n.createdAt).toLocaleString()}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

// 8. Document / Excerpt Side-by-Side Compare View (Section 14)
export function renderCompareView({ sources = [], selectedSourceIdA = null, selectedSourceIdB = null, textA = '', textB = '' }) {
  const srcA = sources.find((s) => s.id === selectedSourceIdA);
  const srcB = sources.find((s) => s.id === selectedSourceIdB);

  const valA = textA || (srcA ? srcA.rawText : '');
  const valB = textB || (srcB ? srcB.rawText : '');

  return `
    <div class="w-full flex flex-col bg-[var(--surface)]">
      <!-- Toolbar -->
      <div class="p-3 border-b border-[var(--border)] bg-[var(--surface-2)] sticky top-[100px] z-10 flex items-center justify-between text-xs gap-2 select-none flex-none shadow-xs">
        <span class="font-bold text-xs uppercase tracking-wider text-[var(--text-3)] font-mono flex items-center gap-1.5">
          ${icon('compare', 14)} Document & Text Comparison Tool
        </span>
        <span class="text-[11px] text-[var(--text-4)] font-mono">Detect discrepancies, additions & alterations</span>
      </div>

      <!-- Source Selectors Header -->
      <div class="p-3 border-b border-[var(--border)] bg-[var(--surface)] grid grid-cols-2 gap-4">
        <div class="space-y-1">
          <label class="text-[11px] font-mono text-[var(--text-4)] uppercase">Source A (Baseline)</label>
          <select id="compare-select-a" class="w-full text-xs p-1.5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]">
            <option value="">-- Choose baseline source --</option>
            ${sources.map((s) => `<option value="${s.id}" ${s.id === selectedSourceIdA ? 'selected' : ''}>${escapeHtml(s.name)} (${s.id})</option>`).join('')}
          </select>
        </div>

        <div class="space-y-1">
          <label class="text-[11px] font-mono text-[var(--text-4)] uppercase">Source B (Comparison)</label>
          <select id="compare-select-b" class="w-full text-xs p-1.5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]">
            <option value="">-- Choose comparison source --</option>
            ${sources.map((s) => `<option value="${s.id}" ${s.id === selectedSourceIdB ? 'selected' : ''}>${escapeHtml(s.name)} (${s.id})</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Side-by-Side Reading & Diff Panels -->
      <div class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] bg-[var(--bg)] min-h-[calc(100vh-220px)]">
        <div class="flex flex-col p-4">
          <div class="text-xs font-mono font-semibold text-[var(--text-3)] mb-2 flex items-center justify-between">
            <span>${srcA ? escapeHtml(srcA.name) : 'Baseline Text'}</span>
            <span class="text-[10px] text-[var(--text-4)]">${valA.length} chars</span>
          </div>
          <textarea
            id="compare-text-a"
            class="w-full min-h-[400px] md:min-h-[500px] p-3 text-xs font-mono bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] text-[var(--text)] leading-relaxed focus:outline-none resize-y"
            placeholder="Type or paste baseline text..."
          >${escapeHtml(valA)}</textarea>
        </div>

        <div class="flex flex-col p-4">
          <div class="text-xs font-mono font-semibold text-[var(--text-3)] mb-2 flex items-center justify-between">
            <span>${srcB ? escapeHtml(srcB.name) : 'Comparison Text'}</span>
            <span class="text-[10px] text-[var(--text-4)]">${valB.length} chars</span>
          </div>
          <textarea
            id="compare-text-b"
            class="w-full min-h-[400px] md:min-h-[500px] p-3 text-xs font-mono bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] text-[var(--text)] leading-relaxed focus:outline-none resize-y"
            placeholder="Type or paste text to compare against baseline..."
          >${escapeHtml(valB)}</textarea>
        </div>
      </div>
    </div>
  `;
}

// 9. Printable Investigation Evidence Report / Dossier View (Section 21)
export function renderReportView({ investigation, sources = [], evidence = [], claims = [], timeline = [], entities = [], relationships = [] }) {
  const invName = investigation ? investigation.name : 'Investigation Dossier';
  const invDesc = investigation ? investigation.description : '';
  const nowStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return `
    <div class="w-full flex flex-col bg-[var(--surface)]">
      <!-- Toolbar -->
      <div class="p-3 border-b border-[var(--border)] bg-[var(--surface-2)] sticky top-[100px] z-10 flex items-center justify-between text-xs gap-2 select-none flex-none print:hidden shadow-xs">
        <span class="font-bold text-xs uppercase tracking-wider text-[var(--text-3)] font-mono flex items-center gap-1.5">
          ${icon('printer', 14)} Investigation Evidence Dossier
        </span>

        <div class="flex items-center gap-2">
          <button
            id="btn-print-dossier"
            class="flex items-center gap-1 px-3 py-1.5 bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded-[var(--radius-sm)] font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            ${icon('printer', 13)}
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      <!-- Dossier Document Container -->
      <div class="p-6 md:p-10 bg-[var(--bg)] flex justify-center print:p-0 print:bg-white min-h-[calc(100vh-160px)]">
        <article class="max-w-3xl w-full bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-10 shadow-xs space-y-8 print:border-none print:shadow-none print:p-0 print:text-black">
          
          <!-- Report Header -->
          <div class="border-b-2 border-[var(--border-strong)] pb-6 space-y-2">
            <div class="flex items-center justify-between text-xs font-mono text-[var(--text-4)]">
              <span>CONFIDENTIAL INVESTIGATIVE DOSSIER</span>
              <span>${nowStr}</span>
            </div>
            <h1 class="text-2xl font-bold text-[var(--text)] tracking-tight">${escapeHtml(invName)}</h1>
            <p class="text-xs text-[var(--text-2)] leading-relaxed">${escapeHtml(invDesc || 'Evidence compilation and provenance audit.')}</p>
          </div>

          <!-- Executive Coverage Metrics -->
          <div class="space-y-2">
            <h3 class="text-xs font-bold uppercase tracking-wider font-mono text-[var(--text-3)]">1. Evidence Coverage Summary</h3>
            <div class="grid grid-cols-4 gap-2 text-xs font-mono">
              <div class="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--border)]">
                <span class="text-[var(--text-4)] block text-[10px]">TOTAL SOURCES</span>
                <span class="text-base font-bold text-[var(--text)]">${sources.length}</span>
              </div>
              <div class="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--border)]">
                <span class="text-[var(--text-4)] block text-[10px]">EVIDENCE CITATIONS</span>
                <span class="text-base font-bold text-[var(--text)]">${evidence.length}</span>
              </div>
              <div class="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--border)]">
                <span class="text-[var(--text-4)] block text-[10px]">PRIMARY CLAIMS</span>
                <span class="text-base font-bold text-[var(--text)]">${claims.length}</span>
              </div>
              <div class="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--border)]">
                <span class="text-[var(--text-4)] block text-[10px]">ENTITIES MAPPED</span>
                <span class="text-base font-bold text-[var(--text)]">${entities.length}</span>
              </div>
            </div>
          </div>

          <!-- Key Claims Analysis -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider font-mono text-[var(--text-3)]">2. Key Claims Breakdown</h3>
            <div class="space-y-3">
              ${claims.map((c) => {
                const linked = evidence.filter((e) => e.linkedClaimId === c.id);
                return `
                  <div class="p-3 bg-[var(--surface-2)] rounded-[var(--radius-sm)] border border-[var(--border)] space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="font-mono text-xs font-bold text-[var(--primary)]">${c.id}</span>
                      <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-3)] font-semibold">${c.status}</span>
                    </div>
                    <p class="text-xs font-medium text-[var(--text)]">${escapeHtml(c.statement)}</p>
                    <div class="text-[11px] text-[var(--text-3)] space-y-1">
                      ${linked.map((e) => `
                        <div class="flex items-start gap-1">
                          <span class="font-mono text-[10px] text-[var(--text-4)]">↳ [${e.id} - ${e.relationship}]</span>
                          <span class="italic">"${escapeHtml(e.excerpt)}" (${escapeHtml(e.sourceName)}, ${escapeHtml(e.location)})</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Chronological Timeline -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider font-mono text-[var(--text-3)]">3. Chronological Evidence Sequence</h3>
            <div class="space-y-2 border-l-2 border-[var(--border)] pl-4">
              ${[...timeline].sort((a, b) => (a.date > b.date ? 1 : -1)).map((t) => `
                <div class="text-xs space-y-0.5">
                  <div class="font-mono text-[11px] font-bold text-[var(--text-3)]">${escapeHtml(t.date)} (${t.datePrecision || 'exact'})</div>
                  <div class="font-semibold text-[var(--text)]">${escapeHtml(t.title)}</div>
                  <p class="text-[var(--text-3)]">${escapeHtml(t.description)}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Provenance & SHA-256 Manifest Table -->
          <div class="space-y-3 pt-4 border-t border-[var(--border)]">
            <h3 class="text-xs font-bold uppercase tracking-wider font-mono text-[var(--text-3)]">4. Provenance & Cryptographic SHA-256 Manifest</h3>
            <p class="text-[11px] text-[var(--text-4)] italic">Important: SHA-256 verifies digital file integrity and uncorrupted chain-of-custody, not semantic truth of contents.</p>
            <div class="border border-[var(--border)] rounded-[var(--radius-sm)] overflow-hidden">
              <table class="w-full text-left text-xs border-collapse font-mono text-[10px]">
                <thead class="bg-[var(--surface-2)] border-b border-[var(--border)] text-[var(--text-3)]">
                  <tr>
                    <th class="py-1.5 px-2.5">ID</th>
                    <th class="py-1.5 px-2.5">Source Filename</th>
                    <th class="py-1.5 px-2.5">Size</th>
                    <th class="py-1.5 px-2.5">Import Date</th>
                    <th class="py-1.5 px-2.5">SHA-256 Hash</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--border)]">
                  ${sources.map((s) => `
                    <tr>
                      <td class="py-1.5 px-2.5 font-bold text-[var(--primary)]">${s.id}</td>
                      <td class="py-1.5 px-2.5 font-medium truncate max-w-[140px]">${escapeHtml(s.name)}</td>
                      <td class="py-1.5 px-2.5 text-[var(--text-4)]">${(s.size / 1024).toFixed(0)} KB</td>
                      <td class="py-1.5 px-2.5 text-[var(--text-4)]">${new Date(s.importedAt).toLocaleDateString()}</td>
                      <td class="py-1.5 px-2.5 text-[var(--text-3)] font-mono text-[9px] truncate max-w-[180px]">${s.sha256}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

        </article>
      </div>
    </div>
  `;
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
