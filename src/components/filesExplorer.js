import { icon, getFileIcon } from './icons.js';

export function renderFilesExplorer({
  sources = [],
  folders = [],
  selectedSourceId = null,
  searchQuery = '',
  selectedFolderId = null,
}) {
  const filteredSources = sources.filter((s) => {
    const matchesSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = !selectedFolderId || s.folderId === selectedFolderId;
    return matchesSearch && matchesFolder;
  });

  return `
    <aside id="files-explorer" class="w-full md:w-64 md:min-w-[220px] md:max-w-[280px] flex-none flex flex-col bg-[var(--surface-2)] border-b md:border-b-0 md:border-r border-[var(--border)] md:sticky md:top-[56px] md:self-start md:max-h-[calc(100vh-56px)] md:overflow-y-auto relative group/explorer">
      <!-- Explorer Header -->
      <div class="p-3 border-b border-[var(--border)] space-y-2 flex-none">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-3)] font-mono flex items-center gap-1.5">
            ${icon('layers', 14)} Files
          </span>
          <div class="flex items-center gap-1">
            <button
              id="explorer-add-folder-btn"
              class="p-1 text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] rounded-[var(--radius-sm)] transition-colors cursor-pointer"
              title="Create Folder"
            >
              ${icon('folderPlus', 14)}
            </button>
            <button
              id="collapse-explorer-btn"
              class="p-1 text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] rounded-[var(--radius-sm)] transition-colors cursor-pointer"
              title="Collapse Files Sidebar"
            >
              ${icon('chevronRight', 14, 'rotate-180')}
            </button>
          </div>
        </div>

        <!-- Add Files Primary Action -->
        <button
          id="explorer-add-file-btn"
          class="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold rounded-[var(--radius-md)] transition-colors shadow-xs cursor-pointer"
        >
          ${icon('plus', 14)}
          <span>Add research files</span>
        </button>
        <input type="file" id="explorer-file-input" class="hidden" multiple />

        <!-- Search Files Input -->
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[var(--text-4)]">
            ${icon('search', 12)}
          </span>
          <input
            type="text"
            id="explorer-search-input"
            class="w-full pl-8 pr-2.5 py-1 text-xs bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] placeholder-[var(--text-4)] focus:outline-none focus:border-[var(--primary)]"
            placeholder="Filter files..."
            value="${escapeHtml(searchQuery)}"
          />
        </div>
      </div>

      <!-- Sources & Folders List Area -->
      <div class="flex-1 overflow-y-auto p-2 space-y-4">
        <!-- Folders Section -->
        <div>
          <div class="flex items-center justify-between px-1.5 py-1 text-[11px] font-semibold text-[var(--text-4)] uppercase tracking-wider font-mono">
            <span>Folders</span>
            ${selectedFolderId ? `
              <button id="clear-folder-filter-btn" class="text-[10px] text-[var(--primary)] hover:underline lowercase font-sans">
                Show all
              </button>
            ` : ''}
          </div>
          
          <div class="space-y-0.5">
            <div
              class="folder-item flex items-center justify-between px-2 py-1.5 rounded-[var(--radius-sm)] cursor-pointer text-xs ${!selectedFolderId ? 'bg-[var(--surface-3)] font-semibold text-[var(--text)]' : 'text-[var(--text-2)] hover:bg-[var(--surface-3)]'}"
              data-folder-id=""
            >
              <div class="flex items-center gap-1.5 truncate">
                ${icon('folder', 13, !selectedFolderId ? 'text-[var(--primary)]' : 'text-[var(--text-4)]')}
                <span class="truncate">All Sources</span>
              </div>
              <span class="text-[10px] text-[var(--text-4)] font-mono tabular-nums">${sources.length}</span>
            </div>

            ${folders.map((folder) => {
              const count = sources.filter((s) => s.folderId === folder.id).length;
              const isSelected = selectedFolderId === folder.id;
              return `
                <div
                  class="folder-item group/folder flex items-center justify-between px-2 py-1.5 rounded-[var(--radius-sm)] cursor-pointer text-xs ${isSelected ? 'bg-[var(--surface-3)] font-semibold text-[var(--text)]' : 'text-[var(--text-2)] hover:bg-[var(--surface-3)]'}"
                  data-folder-id="${folder.id}"
                >
                  <div class="flex items-center gap-1.5 truncate">
                    ${icon('folder', 13, isSelected ? 'text-[var(--primary)]' : 'text-[var(--text-4)]')}
                    <span class="truncate">${escapeHtml(folder.name)}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-[10px] text-[var(--text-4)] font-mono tabular-nums">${count}</span>
                    <button class="delete-folder-btn opacity-0 group-hover/folder:opacity-100 hover:text-red-500 p-0.5" data-folder-id="${folder.id}" title="Delete folder">
                      ${icon('x', 11)}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Sources Section -->
        <div>
          <div class="px-1.5 py-1 text-[11px] font-semibold text-[var(--text-4)] uppercase tracking-wider font-mono flex items-center justify-between">
            <span>Sources (${filteredSources.length})</span>
          </div>

          ${filteredSources.length === 0 ? `
            <div class="px-2 py-4 text-center text-xs text-[var(--text-4)]">
              ${sources.length === 0 ? 'No files added yet' : 'No matching files'}
            </div>
          ` : `
            <div class="space-y-1">
              ${filteredSources.map((source) => {
                const isSelected = selectedSourceId === source.id;
                let detailsLabel = '';
                if (source.pageCount) detailsLabel = `${source.pageCount} ${source.type === 'xlsx' ? 'sheets' : 'pgs'}`;
                else if (source.size) detailsLabel = `${(source.size / 1024).toFixed(0)} KB`;

                return `
                  <div
                    class="source-item group/item px-2 py-1.5 rounded-[var(--radius-sm)] cursor-pointer transition-colors border ${isSelected ? 'bg-[var(--surface)] border-[var(--primary)] shadow-xs' : 'border-transparent hover:bg-[var(--surface-3)] text-[var(--text-2)]'}"
                    data-source-id="${source.id}"
                    title="${escapeHtml(source.name)} · ${source.sha256 ? 'SHA-256: ' + source.sha256.slice(0, 16) + '...' : ''}"
                  >
                    <div class="flex items-start justify-between gap-1.5">
                      <div class="flex items-center gap-2 min-w-0">
                        <span class="flex-none pt-0.5">${getFileIcon(source.type, 14)}</span>
                        <div class="min-w-0 leading-tight">
                          <div class="truncate text-xs font-medium text-[var(--text)]">${escapeHtml(source.name)}</div>
                          <div class="text-[10px] text-[var(--text-4)] font-mono flex items-center gap-1.5 mt-0.5">
                            <span>${source.id}</span>
                            ${detailsLabel ? `<span>·</span><span>${detailsLabel}</span>` : ''}
                            <span>·</span>
                            <span class="text-emerald-600 dark:text-emerald-400">Indexed</span>
                          </div>
                        </div>
                      </div>

                      <button
                        class="source-remove-btn opacity-0 group-hover/item:opacity-100 p-1 hover:text-red-500 rounded transition-opacity"
                        data-source-id="${source.id}"
                        title="Remove source"
                      >
                        ${icon('trash', 12)}
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>

      <!-- Explorer Footer -->
      <div class="p-2.5 border-t border-[var(--border)] bg-[var(--surface)] text-[11px] text-[var(--text-4)] flex items-center justify-between flex-none font-mono">
        <span>${sources.length} ${sources.length === 1 ? 'file' : 'files'}</span>
        <button id="explorer-drag-hint" class="hover:text-[var(--text)] cursor-pointer text-[10px]" title="Drop files anywhere in the workspace to import">
          Drop to import
        </button>
      </div>

      <!-- Resize Drag Handle -->
      <div id="explorer-resize-handle" class="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-[var(--primary)] transition-colors opacity-0 group-hover/explorer:opacity-100" title="Drag to resize explorer width"></div>
    </aside>
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
