import { icon } from './icons.js';

export function renderHeader({ investigationName = 'Untitled Investigation', persistenceStatus = '' }) {
  const isDark = document.documentElement.classList.contains('dark');

  return `
    <header id="top-header" class="h-14 flex-none border-b border-[var(--border)] bg-[var(--surface)] px-4 flex items-center justify-between sticky top-0 z-30 select-none shadow-xs">
      <!-- Left: Logo & Editable Investigation Name -->
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <div class="flex items-center gap-2 cursor-pointer" id="header-logo-btn" title="Reptile Birds | Home & Guides">
          <div class="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center font-bold text-sm border border-[var(--border)]">
            ${icon('shield', 18)}
          </div>
          <div class="hidden sm:block">
            <span class="font-bold tracking-tight text-xs uppercase text-[var(--text-3)] font-mono block leading-none">RESEARCH WORKSPACE</span>
            <span class="font-semibold text-sm text-[var(--text)] leading-none">Reptile Birds</span>
          </div>
        </div>

        <div class="h-4 w-px bg-[var(--border)] hidden sm:block"></div>

        <!-- Inline Editable Investigation Name -->
        <div class="relative flex items-center min-w-0 max-w-md group" id="investigation-name-container">
          <button id="investigation-name-display" class="flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] text-left min-w-0 text-sm font-medium text-[var(--text)] transition-colors" title="Click to edit investigation title">
            <span class="truncate" id="investigation-name-text">${escapeHtml(investigationName)}</span>
            <span class="text-[var(--text-4)] opacity-0 group-hover:opacity-100 transition-opacity flex-none">${icon('edit', 12)}</span>
          </button>
          
          <input
            type="text"
            id="investigation-name-input"
            class="hidden w-full px-2 py-0.5 text-sm font-medium bg-[var(--surface-2)] text-[var(--text)] border border-[var(--primary)] rounded-[var(--radius-sm)] focus:outline-none"
            value="${escapeHtml(investigationName)}"
            placeholder="Investigation name..."
          />
        </div>

        <!-- Subtle Persistence Status -->
        <span id="persistence-indicator" class="text-xs text-[var(--text-4)] hidden md:inline-flex items-center gap-1 transition-opacity duration-300">
          ${persistenceStatus ? `<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ${escapeHtml(persistenceStatus)}` : ''}
        </span>
      </div>

      <!-- Right: Search trigger, Theme, Help, More Actions -->
      <div class="flex items-center gap-2 flex-none">
        <!-- Global Search Trigger -->
        <button
          id="global-search-btn"
          class="flex items-center gap-2 px-2.5 py-1.5 text-xs text-[var(--text-3)] bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] hover:text-[var(--text)] transition-colors cursor-pointer"
          title="Global Search & Command Palette (Ctrl+K or Cmd+K)"
        >
          ${icon('search', 14)}
          <span class="hidden md:inline">Search everything</span>
          <kbd class="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-[var(--surface-3)] border border-[var(--border)] rounded text-[var(--text-3)]">
            Ctrl K
          </kbd>
        </button>

        <!-- Theme Toggle -->
        <button
          id="theme-toggle-btn"
          class="p-2 text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] rounded-[var(--radius-md)] transition-colors cursor-pointer"
          title="Toggle Light/Dark Theme"
          aria-label="Toggle Theme"
        >
          ${isDark ? icon('sun', 16) : icon('moon', 16)}
        </button>

        <!-- Help Modal Button -->
        <button
          id="help-btn"
          class="p-2 text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] rounded-[var(--radius-md)] transition-colors cursor-pointer"
          title="Methodology, Shortcuts & Help"
          aria-label="Help"
        >
          ${icon('help', 16)}
        </button>

        <!-- Public Site & Documentation Link -->
        <button
          id="header-public-site-btn"
          class="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] rounded-[var(--radius-sm)] border border-[var(--border)] transition-colors cursor-pointer"
          title="Return to Public Site & Research Guides"
        >
          ${icon('globe', 13, 'text-[var(--primary)]')}
          <span>Guides & Site</span>
        </button>

        <!-- Context Actions Menu Button (⋮) -->
        <div class="relative">
          <button
            id="header-menu-btn"
            class="p-2 text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] rounded-[var(--radius-md)] transition-colors cursor-pointer"
            title="Investigation Actions"
            aria-label="More Actions"
          >
            ${icon('moreVertical', 16)}
          </button>

          <!-- Dropdown Menu -->
          <div
            id="header-dropdown-menu"
            class="hidden absolute right-0 mt-1 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-lg py-1 z-50 text-xs text-[var(--text)]"
          >
            <button id="menu-export-archive" class="w-full text-left px-3 py-2 hover:bg-[var(--surface-3)] flex items-center gap-2">
              ${icon('download', 14, 'text-[var(--primary)]')}
              <span>Export Investigation Archive (JSON)</span>
            </button>
            <button id="menu-export-standalone-dossier" class="w-full text-left px-3 py-2 hover:bg-[var(--surface-3)] flex items-center gap-2">
              ${icon('fileCheck', 14, 'text-amber-500')}
              <span>Export Standalone Dossier (HTML)</span>
            </button>
            <button id="menu-forensic-lab" class="w-full text-left px-3 py-2 hover:bg-[var(--surface-3)] flex items-center gap-2">
              ${icon('cpu', 14, 'text-[var(--primary)]')}
              <span>Forensic Analysis Lab</span>
            </button>
            <button id="menu-restore-archive" class="w-full text-left px-3 py-2 hover:bg-[var(--surface-3)] flex items-center gap-2">
              ${icon('upload', 14, 'text-[var(--text-3)]')}
              <span>Restore Investigation Archive</span>
            </button>
            <input type="file" id="restore-file-input" class="hidden" accept=".json" />
            <div class="my-1 border-t border-[var(--border)]"></div>
            <button id="menu-load-sample" class="w-full text-left px-3 py-2 hover:bg-[var(--surface-3)] flex items-center gap-2">
              ${icon('database', 14, 'text-emerald-600 dark:text-emerald-400')}
              <span>Load Sample Investigation</span>
            </button>
            <button id="menu-storage-info" class="w-full text-left px-3 py-2 hover:bg-[var(--surface-3)] flex items-center gap-2">
              ${icon('info', 14, 'text-[var(--text-3)]')}
              <span>Storage & Hash Integrity</span>
            </button>
            <button id="menu-public-site" class="w-full text-left px-3 py-2 hover:bg-[var(--surface-3)] flex items-center gap-2">
              ${icon('globe', 14, 'text-[var(--primary)]')}
              <span>Public Site & Guides</span>
            </button>
            <div class="my-1 border-t border-[var(--border)]"></div>
            <button id="menu-clear-all" class="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950 text-red-600 dark:text-red-400 flex items-center gap-2 cursor-pointer">
              ${icon('trash', 14)}
              <span>Clear Research</span>
            </button>
          </div>
        </div>
      </div>
    </header>
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
