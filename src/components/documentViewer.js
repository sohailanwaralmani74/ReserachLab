import { icon } from './icons.js';

export function renderDocumentViewer({
  source,
  currentPage = 1,
  currentSheetIndex = 0,
  zoomLevel = 100,
  searchDocQuery = '',
}) {
  if (!source) {
    return `
      <div class="h-full flex items-center justify-center p-8 text-center text-[var(--text-4)]">
        <div class="max-w-sm space-y-3">
          <div class="w-12 h-12 rounded-full bg-[var(--surface-3)] text-[var(--text-3)] flex items-center justify-center mx-auto">
            ${icon('file', 24)}
          </div>
          <h3 class="font-medium text-[var(--text)]">No document selected</h3>
          <p class="text-xs">Select a research file from the explorer on the left or add new files to begin reading.</p>
        </div>
      </div>
    `;
  }

  const isSpreadsheet = source.type === 'xlsx' || source.type === 'csv';
  const isImage = source.type === 'image';
  const totalPages = source.textPages ? source.textPages.length : (source.pageCount || 1);
  const activeSheet = isSpreadsheet && source.sheets && source.sheets[currentSheetIndex] ? source.sheets[currentSheetIndex] : null;

  return `
    <div id="document-viewer-container" class="w-full flex flex-col bg-[var(--surface)] relative" data-source-id="${source.id}">
      <!-- Document Sticky Toolbar -->
      <div id="doc-toolbar" class="h-11 flex-none border-b border-[var(--border)] px-4 bg-[var(--surface-2)] sticky top-[100px] z-10 flex items-center justify-between text-xs gap-3 shadow-xs select-none">
        <!-- Left: Document Title & Metadata trigger -->
        <div class="flex items-center gap-2 min-w-0 flex-1">
          <span class="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[var(--surface-3)] text-[var(--primary)] font-semibold flex-none">
            ${source.id}
          </span>
          <span class="font-semibold text-[var(--text)] truncate text-xs" title="${escapeHtml(source.name)}">
            ${escapeHtml(source.name)}
          </span>
          <button
            id="doc-source-meta-btn"
            class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded transition-colors flex-none"
            title="Inspect Provenance & SHA-256 Hash"
          >
            ${icon('info', 13)}
          </button>
        </div>

        <!-- Middle: Navigation & Sheet Tabs -->
        <div class="flex items-center gap-1.5 flex-none">
          ${isSpreadsheet && source.sheets && source.sheets.length > 0 ? `
            <div class="flex items-center gap-1 bg-[var(--surface)] p-0.5 rounded-[var(--radius-sm)] border border-[var(--border)] max-w-xs overflow-x-auto">
              ${source.sheets.map((sh, idx) => `
                <button
                  class="sheet-tab-btn px-2 py-0.5 text-[11px] font-medium rounded-[var(--radius-sm)] transition-colors ${idx === currentSheetIndex ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-3)]'}"
                  data-sheet-index="${idx}"
                >
                  ${escapeHtml(sh.sheetName)}
                </button>
              `).join('')}
            </div>
          ` : `
            <button
              id="doc-prev-page-btn"
              class="p-1 rounded hover:bg-[var(--surface-3)] text-[var(--text-2)] disabled:opacity-40 disabled:cursor-not-allowed"
              ${currentPage <= 1 ? 'disabled' : ''}
              title="Previous Page"
            >
              ${icon('chevronRight', 14, 'rotate-180')}
            </button>
            <span class="font-mono text-xs text-[var(--text-3)] px-1">
              Page <strong class="text-[var(--text)]">${currentPage}</strong> of ${totalPages}
            </span>
            <button
              id="doc-next-page-btn"
              class="p-1 rounded hover:bg-[var(--surface-3)] text-[var(--text-2)] disabled:opacity-40 disabled:cursor-not-allowed"
              ${currentPage >= totalPages ? 'disabled' : ''}
              title="Next Page"
            >
              ${icon('chevronRight', 14)}
            </button>
          `}
        </div>

        <!-- Right: Zoom & Search Within Document -->
        <div class="flex items-center gap-2 flex-none">
          <div class="relative hidden sm:block w-36">
            <input
              type="text"
              id="doc-search-input"
              class="w-full pl-6 pr-2 py-0.5 text-[11px] bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] placeholder-[var(--text-4)] focus:outline-none focus:border-[var(--primary)]"
              placeholder="Search in doc..."
              value="${escapeHtml(searchDocQuery)}"
            />
            <span class="absolute inset-y-0 left-0 pl-1.5 flex items-center pointer-events-none text-[var(--text-4)]">
              ${icon('search', 11)}
            </span>
          </div>

          <div class="flex items-center gap-0.5 border-l border-[var(--border)] pl-2">
            <button id="doc-zoom-out-btn" class="p-1 text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] rounded" title="Zoom Out">
              ${icon('zoomOut', 13)}
            </button>
            <span class="text-[11px] font-mono text-[var(--text-4)] w-10 text-center">${zoomLevel}%</span>
            <button id="doc-zoom-in-btn" class="p-1 text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] rounded" title="Zoom In">
              ${icon('zoomIn', 13)}
            </button>
          </div>

          <button
            id="doc-capture-evidence-btn"
            class="hidden md:flex items-center gap-1 px-2.5 py-1 bg-[var(--primary-soft)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white font-medium rounded-[var(--radius-sm)] transition-colors"
            title="Create Evidence citation from selection"
          >
            ${icon('plus', 12)}
            <span>Add as Evidence</span>
          </button>
        </div>
      </div>

      <!-- Document Content Reading Area -->
      <div id="doc-content-area" class="p-6 bg-[var(--bg)] flex justify-center relative min-h-[calc(100vh-160px)]">
        ${isSpreadsheet && activeSheet ? renderSpreadsheetContent(activeSheet, searchDocQuery, currentSheetIndex) : ''}
        ${!isSpreadsheet && !isImage ? renderDocumentTextContent(source, currentPage, searchDocQuery, zoomLevel) : ''}
        ${isImage ? renderImageContent(source, zoomLevel) : ''}
      </div>

      <!-- Floating Selection Toolbar Popup -->
      <div
        id="floating-evidence-popover"
        class="hidden absolute z-50 bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-md)] shadow-lg py-1 px-2 flex items-center gap-2 transform -translate-x-1/2 transition-opacity"
      >
        <button
          id="popover-add-evidence-btn"
          class="flex items-center gap-1.5 px-2 py-1 bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] text-xs font-semibold rounded-[var(--radius-sm)] shadow-xs transition-colors cursor-pointer"
        >
          ${icon('shieldCheck', 13)}
          <span>Add as Evidence</span>
        </button>
        <button
          id="popover-close-btn"
          class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded"
        >
          ${icon('x', 11)}
        </button>
      </div>
    </div>
  `;
}

function renderDocumentTextContent(source, pageNumber, searchQuery, zoom) {
  let pageText = '';
  if (source.textPages && source.textPages.length >= pageNumber) {
    pageText = source.textPages[pageNumber - 1].text;
  } else {
    pageText = source.rawText || 'No readable text content available for this source.';
  }

  let formattedText = escapeHtml(pageText);

  if (searchQuery && searchQuery.trim().length > 1) {
    const regex = new RegExp(`(${escapeRegex(searchQuery.trim())})`, 'gi');
    formattedText = formattedText.replace(regex, '<mark class="bg-amber-200 text-amber-900 rounded-xs px-0.5">$1</mark>');
  }

  return `
    <div
      id="doc-page-canvas"
      class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-xs p-10 max-w-3xl w-full min-h-[600px] leading-relaxed select-text transition-transform origin-top"
      style="transform: scale(${zoom / 100});"
    >
      <div class="border-b border-[var(--border)] pb-3 mb-6 flex items-center justify-between text-xs text-[var(--text-4)] font-mono">
        <span>${escapeHtml(source.name)}</span>
        <span>Page ${pageNumber} of ${source.textPages ? source.textPages.length : 1}</span>
      </div>

      <div id="selectable-doc-text" class="whitespace-pre-wrap font-sans text-sm text-[var(--text)] leading-7 select-text">
        ${formattedText}
      </div>
    </div>
  `;
}

function renderSpreadsheetContent(sheet, searchQuery, sheetIdx) {
  return `
    <div class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-xs overflow-hidden max-w-5xl w-full h-fit select-text">
      <div class="px-4 py-2.5 bg-[var(--surface-2)] border-b border-[var(--border)] flex items-center justify-between text-xs">
        <span class="font-semibold text-[var(--text)] flex items-center gap-1.5">
          ${icon('table', 14, 'text-emerald-500')}
          <span>Sheet: ${escapeHtml(sheet.sheetName)}</span>
        </span>
        <span class="text-[var(--text-4)] font-mono">${sheet.rows ? sheet.rows.length : 0} rows</span>
      </div>

      <div class="overflow-x-auto max-h-[600px]">
        <table class="w-full text-left text-xs border-collapse font-sans">
          <thead class="bg-[var(--surface-3)] sticky top-0 border-b border-[var(--border)] z-10">
            <tr>
              <th class="py-2 px-3 font-mono text-[10px] text-[var(--text-4)] border-r border-[var(--border)] w-12 text-center">#</th>
              ${sheet.headers.map((h) => `
                <th class="py-2 px-3 font-semibold text-[var(--text-2)] border-r border-[var(--border)] last:border-r-0 whitespace-nowrap">
                  ${escapeHtml(h)}
                </th>
              `).join('')}
              <th class="py-2 px-3 font-mono text-[10px] text-[var(--text-4)] w-20 text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border)]">
            ${sheet.rows.map((row, rowIdx) => {
              const rowText = row.join(' | ');
              const matchesSearch = searchQuery && rowText.toLowerCase().includes(searchQuery.toLowerCase());
              return `
                <tr class="hover:bg-[var(--surface-2)] ${matchesSearch ? 'bg-amber-50 dark:bg-amber-950/30' : ''} group/row">
                  <td class="py-2 px-3 font-mono text-[10px] text-[var(--text-4)] text-center border-r border-[var(--border)] bg-[var(--surface-2)]">
                    ${rowIdx + 1}
                  </td>
                  ${row.map((cell) => `
                    <td class="py-2 px-3 text-[var(--text)] border-r border-[var(--border)] last:border-r-0 whitespace-nowrap select-text">
                      ${escapeHtml(String(cell))}
                    </td>
                  `).join('')}
                  <td class="py-1 px-2 text-center">
                    <button
                      class="row-capture-evidence-btn opacity-0 group-hover/row:opacity-100 px-2 py-0.5 text-[10px] bg-[var(--primary-soft)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded transition-all"
                      data-sheet-name="${escapeHtml(sheet.sheetName)}"
                      data-row-num="${rowIdx + 1}"
                      data-row-content="${escapeHtml(rowText)}"
                      title="Save row as evidence"
                    >
                      + Evidence
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderImageContent(source, zoom) {
  return `
    <div class="flex flex-col items-center justify-center p-4">
      <div
        class="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-2 shadow-xs transition-transform"
        style="transform: scale(${zoom / 100});"
      >
        <img
          src="${source.previewUrl || '#'}"
          alt="${escapeHtml(source.name)}"
          class="max-w-3xl max-h-[600px] object-contain rounded"
        />
      </div>
    </div>
  `;
}

function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
