import './index.css';
import { Storage } from './services/storage.js';
import { parseFile } from './services/fileParser.js';
import { runVerification } from './services/verificationEngine.js';
import { createSampleInvestigation } from './services/sampleData.js';

import { renderHeader } from './components/header.js';
import { renderFilesExplorer } from './components/filesExplorer.js';
import { renderAdsColumn } from './components/ads.js';
import { renderDocumentViewer } from './components/documentViewer.js';
import {
  renderWorkspaceModeBar,
  renderEmptyState,
  renderEvidenceView,
  renderClaimsView,
  renderConnectionsView,
  renderTimelineView,
  renderVerificationView,
  renderNotesView,
  renderCompareView,
  renderReportView,
} from './components/workspaceViews.js';
import { renderForensicLabView } from './components/forensicLabView.js';
import {
  extractEntitiesAndPatterns,
  generateStandaloneDossierHtml,
  verifyFileHash,
  redactText,
  generateCitation,
  detectTextOverlap,
} from './services/forensicTools.js';
import {
  renderEvidenceModal,
  renderClaimModal,
  renderEntityModal,
  renderRelationshipModal,
  renderTimelineModal,
  renderNoteModal,
  renderFolderModal,
  renderStorageModal,
  renderHelpModal,
  renderClearResearchModal,
} from './components/modals.js';
import { renderGlobalSearchModal } from './components/globalSearch.js';
import { NetworkGraph } from './components/networkGraph.js';

import { applyPageSeo, renderPublicPageWrapper } from './publicSite/publicLayout.js';
import {
  renderHomePage,
  renderAboutPage,
  renderHowItWorksPage,
  renderFeaturesPage,
  renderUseCasesPage,
  renderPrivacyPage,
  renderTermsPage,
  renderCookiesPage,
  renderContactPage,
  renderFaqPage,
  renderSecurityPage,
  renderDataStoragePage,
  renderEvidenceProvenancePage,
  renderResearchGuidePage,
} from './publicSite/publicPages.js';

function getInitialRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash) {
    return hash.startsWith('/') ? hash : '/' + hash;
  }
  return '/';
}

function navigateRoute(route) {
  state.currentRoute = route;
  window.location.hash = '#' + route;
  renderApp();
  window.scrollTo(0, 0);
}

function renderPublicRouteContent(route) {
  const clean = (route || '/').toLowerCase().replace(/\/$/, '');
  switch (clean) {
    case '/about':
      return renderAboutPage();
    case '/how-it-works':
      return renderHowItWorksPage();
    case '/features':
      return renderFeaturesPage();
    case '/use-cases':
    case '/use-cases/investigative-journalism':
    case '/use-cases/osint':
    case '/use-cases/academic-research':
    case '/use-cases/due-diligence':
    case '/use-cases/fact-checking':
    case '/use-cases/documentary-research':
    case '/use-cases/legal-research':
      return renderUseCasesPage();
    case '/privacy':
      return renderPrivacyPage();
    case '/terms':
      return renderTermsPage();
    case '/cookies':
      return renderCookiesPage();
    case '/contact':
      return renderContactPage();
    case '/faq':
      return renderFaqPage();
    case '/security':
      return renderSecurityPage();
    case '/data-storage':
      return renderDataStoragePage();
    case '/evidence-provenance':
      return renderEvidenceProvenancePage();
    case '/research-guide':
      return renderResearchGuidePage();
    case '':
    case '/':
    default:
      return renderHomePage();
  }
}

// Global App State
const state = {
  currentRoute: getInitialRoute(),
  investigation: null,
  sources: [],
  folders: [],
  evidence: [],
  claims: [],
  entities: [],
  relationships: [],
  timeline: [],
  notes: [],

  // UI state
  activeMode: 'document', // document | evidence | claims | connections | timeline | verification | notes | compare | report
  isExplorerCollapsed: false,
  selectedSourceId: null,
  currentPage: 1,
  currentSheetIndex: 0,
  zoomLevel: 100,
  searchDocQuery: '',
  explorerSearchQuery: '',
  selectedFolderId: null,
  activeEvidenceFilter: 'all',
  activeGraphFilter: 'all',

  // Compare state
  compareSourceA: null,
  compareSourceB: null,
  compareTextA: '',
  compareTextB: '',

  // Active modals
  activeModal: null, // 'evidence' | 'claim' | 'entity' | 'relationship' | 'timeline' | 'note' | 'folder' | 'storage' | 'help' | 'search'
  modalProps: {},
  persistenceStatus: '',

  // Global search
  searchQuery: '',
  searchResults: [],
  searchFilter: 'all',

  // Verification
  verificationReport: null,
  networkGraph: null,

  // Pure JS Forensic Analysis Lab State
  activeLabTab: 'extractor',
  labState: {
    extractedData: null,
    extractorText: '',
    hasherResult: null,
    redactorOriginalText: '',
    redactorMode: 'solid',
    redactEmails: true,
    redactPhones: true,
    redactAmounts: false,
    citationEvidenceIdx: 0,
    citationFormat: 'bluebook',
    overlapResult: null,
  },
};

// Initialize Application
async function initApp() {
  // 1. Theme setup
  const savedTheme = localStorage.getItem('inv_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }

  // 2. Hashchange listener for browser history & navigation
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace(/^#/, '');
    const route = hash ? (hash.startsWith('/') ? hash : '/' + hash) : '/';
    if (route !== state.currentRoute) {
      state.currentRoute = route;
      renderApp();
      window.scrollTo(0, 0);
    }
  });

  // 3. Load data from IndexedDB
  await loadData();

  // 4. Render shell
  renderApp();

  // 5. Global keyboard listeners (Ctrl+K, Esc)
  initGlobalKeyboard();
}

async function loadData() {
  try {
    state.investigation = await Storage.getInvestigation();
    if (!state.investigation) {
      state.investigation = {
        id: 'inv-' + Date.now(),
        name: 'Untitled Investigation',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      };
      await Storage.saveInvestigation(state.investigation);
    }

    state.sources = await Storage.getSources();
    state.folders = await Storage.getFolders();
    state.evidence = await Storage.getEvidence();
    state.claims = await Storage.getClaims();
    state.entities = await Storage.getEntities();
    state.relationships = await Storage.getRelationships();
    state.timeline = await Storage.getTimeline();
    state.notes = await Storage.getNotes();

    // Default selected source
    if (state.sources.length > 0 && !state.selectedSourceId) {
      state.selectedSourceId = state.sources[0].id;
    }

    // Run deterministic verification
    state.verificationReport = runVerification(
      state.sources,
      state.evidence,
      state.claims,
      state.timeline
    );
  } catch (err) {
    console.error('Error loading investigation state:', err);
  }
}

function renderApp() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const isWorkspace = state.currentRoute === '/workspace';

  if (isWorkspace) {
    const currentSource = state.sources.find((s) => s.id === state.selectedSourceId) || state.sources[0];
    const hasFiles = state.sources.length > 0;

    appEl.innerHTML = `
      <div class="min-h-screen w-full flex flex-col bg-[var(--bg)] text-[var(--text)]">
        <!-- TOP HEADER (Section 3) -->
        ${renderHeader({
          investigationName: state.investigation ? state.investigation.name : 'Untitled Investigation',
          persistenceStatus: state.persistenceStatus,
        })}

        <!-- MAIN PAGE SHELL (Section 2) -->
        <!-- Desktop: 75% Application, 25% Ads. Mobile: 100% Application, Ads below. Entire screen scrollable -->
        <div class="flex-1 flex flex-col lg:flex-row w-full">
          
          <!-- 75% APPLICATION CONTAINER -->
          <main class="w-full lg:w-[75%] flex flex-col md:flex-row min-w-0 bg-[var(--surface)] border-b lg:border-b-0 lg:border-r border-[var(--border)]">
            
            <!-- FILES EXPLORER -->
            ${!state.isExplorerCollapsed ? renderFilesExplorer({
              sources: state.sources,
              folders: state.folders,
              selectedSourceId: state.selectedSourceId,
              searchQuery: state.explorerSearchQuery,
              selectedFolderId: state.selectedFolderId,
            }) : ''}

            <!-- MAIN WORKSPACE -->
            <div id="main-workspace-area" class="flex-1 flex flex-col min-w-0 bg-[var(--surface)]">
              ${hasFiles ? `
                <!-- Mode Switcher Bar -->
                ${renderWorkspaceModeBar(state.activeMode, {
                  sources: state.sources.length,
                  evidence: state.evidence.length,
                  claims: state.claims.length,
                  entities: state.entities.length,
                  timeline: state.timeline.length,
                  notes: state.notes.length,
                  conflicts: state.verificationReport ? state.verificationReport.conflictsDetected : 0,
                }, state.isExplorerCollapsed)}

                <!-- Mode Active Views -->
                <div id="workspace-content" class="flex-1 min-w-0">
                  ${renderActiveWorkspaceView(currentSource)}
                </div>
              ` : `
                <!-- Starting Empty State (Section 6) -->
                ${renderEmptyState()}
              `}
            </div>
          </main>

          <!-- 25% ADVERTISEMENT AREA (Section 2: Decoupled page shell) -->
          <div class="w-full lg:w-[25%] flex-none bg-[var(--surface-2)] lg:bg-[var(--surface)]">
            ${renderAdsColumn()}
          </div>
        </div>

        <!-- MODALS CONTAINER -->
        <div id="modals-container">
          ${renderActiveModal()}
        </div>
      </div>
    `;

    // Bind DOM events
    attachEventListeners();

    // If in connections mode, mount SVG graph
    if (state.activeMode === 'connections' && hasFiles) {
      mountNetworkGraph();
    }
  } else {
    // Render Public Marketing & SEO Page
    const pageHtml = renderPublicRouteContent(state.currentRoute);
    appEl.innerHTML = `
      ${renderPublicPageWrapper(state.currentRoute, pageHtml)}
      <!-- MODALS CONTAINER -->
      <div id="modals-container">
        ${renderActiveModal()}
      </div>
    `;

    applyPageSeo(state.currentRoute);
    attachPublicEventListeners();
  }
}

function renderActiveWorkspaceView(currentSource) {
  switch (state.activeMode) {
    case 'document':
      return renderDocumentViewer({
        source: currentSource,
        currentPage: state.currentPage,
        currentSheetIndex: state.currentSheetIndex,
        zoomLevel: state.zoomLevel,
        searchDocQuery: state.searchDocQuery,
      });

    case 'evidence':
      return renderEvidenceView({
        evidence: state.evidence,
        sources: state.sources,
        claims: state.claims,
        filterRel: state.activeEvidenceFilter,
      });

    case 'claims':
      return renderClaimsView({
        claims: state.claims,
        evidence: state.evidence,
        entities: state.entities,
      });

    case 'connections':
      return renderConnectionsView({
        entities: state.entities,
        relationships: state.relationships,
        claims: state.claims,
        sources: state.sources,
        filterType: state.activeGraphFilter,
      });

    case 'timeline':
      return renderTimelineView({
        timeline: state.timeline,
        evidence: state.evidence,
      });

    case 'verification':
      return renderVerificationView({
        verificationReport: state.verificationReport,
      });

    case 'notes':
      return renderNotesView({
        notes: state.notes,
      });

    case 'compare':
      return renderCompareView({
        sources: state.sources,
        selectedSourceIdA: state.compareSourceA || (state.sources[0] ? state.sources[0].id : null),
        selectedSourceIdB: state.compareSourceB || (state.sources[1] ? state.sources[1].id : null),
        textA: state.compareTextA,
        textB: state.compareTextB,
      });

    case 'report':
      return renderReportView({
        investigation: state.investigation,
        sources: state.sources,
        evidence: state.evidence,
        claims: state.claims,
        timeline: state.timeline,
        entities: state.entities,
        relationships: state.relationships,
      });

    case 'tools':
      return renderForensicLabView(state, state.activeLabTab, state.labState);

    default:
      return renderDocumentViewer({
        source: currentSource,
        currentPage: state.currentPage,
        currentSheetIndex: state.currentSheetIndex,
        zoomLevel: state.zoomLevel,
        searchDocQuery: state.searchDocQuery,
      });
  }
}

function renderActiveModal() {
  switch (state.activeModal) {
    case 'evidence':
      return renderEvidenceModal({ ...state.modalProps, claims: state.claims });
    case 'claim':
      return renderClaimModal();
    case 'entity':
      return renderEntityModal();
    case 'relationship':
      return renderRelationshipModal({ entities: state.entities, evidence: state.evidence });
    case 'timeline':
      return renderTimelineModal({ evidence: state.evidence });
    case 'note':
      return renderNoteModal({ claims: state.claims });
    case 'folder':
      return renderFolderModal();
    case 'storage':
      return renderStorageModal({
        storageInfo: state.modalProps.storageInfo || { usageMB: '0.0', quotaMB: '100', percent: 0 },
        sources: state.sources,
      });
    case 'help':
      return renderHelpModal();
    case 'clearResearch':
      return renderClearResearchModal(state.modalProps);
    case 'search':
      return renderGlobalSearchModal({
        query: state.searchQuery,
        results: state.searchResults,
        activeFilter: state.searchFilter,
      });
    default:
      return '';
  }
}

function attachPublicEventListeners() {
  // 1. Navigation links
  document.querySelectorAll('.nav-link, [data-route]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const route = el.getAttribute('data-route') || el.getAttribute('href');
      if (route) {
        navigateRoute(route);
      }
    });
  });

  // 2. Launch workspace triggers
  document.querySelectorAll('.start-investigation-trigger, #launch-workspace-btn, #mobile-launch-workspace-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      navigateRoute('/workspace');
    });
  });

  // 3. Public header theme toggle
  const publicThemeBtn = document.getElementById('public-theme-toggle');
  if (publicThemeBtn) {
    publicThemeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('inv_theme', isDark ? 'dark' : 'light');
      renderApp();
    });
  }

  // 4. Mobile navigation toggle
  const mobileNavBtn = document.getElementById('mobile-nav-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  if (mobileNavBtn && mobileNavMenu) {
    mobileNavBtn.addEventListener('click', () => {
      mobileNavMenu.classList.toggle('hidden');
    });
  }

  // 5. Footer clear storage shortcut
  const footerClearBtn = document.getElementById('footer-clear-storage-shortcut');
  if (footerClearBtn) {
    footerClearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      state.activeModal = 'clearResearch';
      state.modalProps = {
        investigationName: state.investigation ? state.investigation.name : 'Untitled Investigation',
      };
      renderApp();
    });
  }

  // 6. Active modal handlers if opened from public pages
  attachModalEvents();
}

function attachEventListeners() {
  // Workspace to Public Site Navigation
  const headerLogoBtn = document.getElementById('header-logo-btn');
  if (headerLogoBtn) {
    headerLogoBtn.addEventListener('click', () => {
      navigateRoute('/');
    });
  }

  const headerPublicSiteBtn = document.getElementById('header-public-site-btn');
  if (headerPublicSiteBtn) {
    headerPublicSiteBtn.addEventListener('click', () => {
      navigateRoute('/');
    });
  }

  // 1. Investigation Name Inline Editing (Section 3)
  const nameDisplayBtn = document.getElementById('investigation-name-display');
  const nameInput = document.getElementById('investigation-name-input');
  if (nameDisplayBtn && nameInput) {
    nameDisplayBtn.addEventListener('click', () => {
      nameDisplayBtn.classList.add('hidden');
      nameInput.classList.remove('hidden');
      nameInput.focus();
      nameInput.select();
    });

    const saveName = async () => {
      const newName = nameInput.value.trim() || 'Untitled Investigation';
      nameInput.classList.add('hidden');
      nameDisplayBtn.classList.remove('hidden');
      if (state.investigation.name !== newName) {
        state.investigation.name = newName;
        state.investigation.lastModified = new Date().toISOString();
        triggerPersistenceStatus('Saving...');
        await Storage.saveInvestigation(state.investigation);
        triggerPersistenceStatus('Saved locally');
        renderApp();
      }
    };

    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveName();
      } else if (e.key === 'Escape') {
        nameInput.value = state.investigation.name;
        nameInput.classList.add('hidden');
        nameDisplayBtn.classList.remove('hidden');
      }
    });

    nameInput.addEventListener('blur', saveName);
  }

  // 2. Header Actions
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('inv_theme', isDark ? 'dark' : 'light');
      renderApp();
    });
  }

  const helpBtn = document.getElementById('help-btn');
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      state.activeModal = 'help';
      renderApp();
    });
  }

  const searchBtn = document.getElementById('global-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      openSearchModal();
    });
  }

  const menuBtn = document.getElementById('header-menu-btn');
  const dropdownMenu = document.getElementById('header-dropdown-menu');
  if (menuBtn && dropdownMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      dropdownMenu.classList.add('hidden');
    });
  }

  const exportArchiveBtn = document.getElementById('menu-export-archive');
  if (exportArchiveBtn) {
    exportArchiveBtn.addEventListener('click', async () => {
      const archive = await Storage.exportArchive();
      const jsonStr = JSON.stringify(archive, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `investigation-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  const restoreArchiveBtn = document.getElementById('menu-restore-archive');
  const restoreFileInput = document.getElementById('restore-file-input');
  if (restoreArchiveBtn && restoreFileInput) {
    restoreArchiveBtn.addEventListener('click', () => {
      restoreFileInput.click();
    });
    restoreFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const backup = JSON.parse(text);
        Storage.validateArchive(backup);
        const sourceCount = Array.isArray(backup.sources) ? backup.sources.length : 0;
        const claimCount = Array.isArray(backup.claims) ? backup.claims.length : 0;
        const evidenceCount = Array.isArray(backup.evidence) ? backup.evidence.length : 0;
        const confirmed = window.confirm(
          'Restore this investigation archive?\\n\\n' +
          sourceCount + ' sources · ' + evidenceCount + ' evidence items · ' + claimCount + ' claims\\n\\n' +
          'Current local research will be replaced. Export a backup first if you need it.'
        );
        if (!confirmed) return;
        triggerPersistenceStatus('Restoring archive...');
        await Storage.restoreArchive(backup);
        await loadData();
        triggerPersistenceStatus('Restored locally');
        renderApp();
      } catch (err) {
        alert('Archive could not be restored: ' + err.message);
      } finally {
        restoreFileInput.value = '';
      }
    });
  }

  const loadSampleBtn = document.getElementById('menu-load-sample');
  const emptyLoadSampleBtn = document.getElementById('empty-load-sample-btn');
  const handleLoadSample = async () => {
    triggerPersistenceStatus('Loading sample...');
    const sample = await createSampleInvestigation();
    await Storage.restoreArchive(sample);
    await loadData();
    state.activeMode = 'document';
    triggerPersistenceStatus('Saved locally');
    renderApp();
  };
  if (loadSampleBtn) loadSampleBtn.addEventListener('click', handleLoadSample);
  if (emptyLoadSampleBtn) emptyLoadSampleBtn.addEventListener('click', handleLoadSample);

  const storageInfoBtn = document.getElementById('menu-storage-info');
  if (storageInfoBtn) {
    storageInfoBtn.addEventListener('click', async () => {
      const info = await Storage.getStorageInfo();
      state.activeModal = 'storage';
      state.modalProps = { storageInfo: info };
      renderApp();
    });
  }

  const menuPublicSiteBtn = document.getElementById('menu-public-site');
  if (menuPublicSiteBtn) {
    menuPublicSiteBtn.addEventListener('click', () => {
      const menu = document.getElementById('header-dropdown-menu');
      if (menu) menu.classList.add('hidden');
      navigateRoute('/');
    });
  }

  const clearAllBtn = document.getElementById('menu-clear-all');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      const menu = document.getElementById('header-dropdown-menu');
      if (menu) menu.classList.add('hidden');

      state.activeModal = 'clearResearch';
      state.modalProps = {
        investigationName: state.investigation ? state.investigation.name : 'Untitled Investigation',
      };
      renderApp();
    });
  }

  // 3. Files Explorer Actions
  const explorerAddFileBtn = document.getElementById('explorer-add-file-btn');
  const emptyAddFilesBtn = document.getElementById('empty-add-files-btn');
  const fileInput = document.getElementById('explorer-file-input');

  const openPicker = () => {
    if (fileInput) fileInput.click();
  };
  if (explorerAddFileBtn) explorerAddFileBtn.addEventListener('click', openPicker);
  if (emptyAddFilesBtn) emptyAddFilesBtn.addEventListener('click', openPicker);

  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;
      await handleFilesIngest(files);
    });
  }

  // Drag and Drop (Section 5)
  const dropzoneArea = document.getElementById('dropzone-area');
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length > 0) {
      await handleFilesIngest(files);
    }
  };

  if (dropzoneArea) {
    dropzoneArea.addEventListener('dragover', handleDragOver);
    dropzoneArea.addEventListener('drop', handleDrop);
  }
  window.addEventListener('dragover', handleDragOver);
  window.addEventListener('drop', handleDrop);

  // Filter Explorer
  const explorerSearch = document.getElementById('explorer-search-input');
  if (explorerSearch) {
    explorerSearch.addEventListener('input', (e) => {
      state.explorerSearchQuery = e.target.value;
      renderApp();
    });
  }

  // Folder filtering & creation
  document.querySelectorAll('.folder-item').forEach((item) => {
    item.addEventListener('click', () => {
      state.selectedFolderId = item.dataset.folderId || null;
      renderApp();
    });
  });

  const clearFolderBtn = document.getElementById('clear-folder-filter-btn');
  if (clearFolderBtn) {
    clearFolderBtn.addEventListener('click', () => {
      state.selectedFolderId = null;
      renderApp();
    });
  }

  const addFolderBtn = document.getElementById('explorer-add-folder-btn');
  if (addFolderBtn) {
    addFolderBtn.addEventListener('click', () => {
      state.activeModal = 'folder';
      renderApp();
    });
  }

  // Collapse / Expand Explorer
  const collapseExplorerBtn = document.getElementById('collapse-explorer-btn');
  if (collapseExplorerBtn) {
    collapseExplorerBtn.addEventListener('click', () => {
      state.isExplorerCollapsed = true;
      renderApp();
    });
  }

  const expandExplorerBtn = document.getElementById('expand-explorer-btn');
  if (expandExplorerBtn) {
    expandExplorerBtn.addEventListener('click', () => {
      state.isExplorerCollapsed = false;
      renderApp();
    });
  }

  document.querySelectorAll('.delete-folder-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const folderId = btn.dataset.folderId;
      await Storage.deleteFolder(folderId);
      state.folders = state.folders.filter((f) => f.id !== folderId);
      if (state.selectedFolderId === folderId) state.selectedFolderId = null;
      renderApp();
    });
  });

  // Source selection & deletion
  document.querySelectorAll('.source-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.source-remove-btn')) return;
      const sourceId = item.dataset.sourceId;
      state.selectedSourceId = sourceId;
      state.currentPage = 1;
      state.currentSheetIndex = 0;
      state.activeMode = 'document';
      renderApp();
    });
  });

  document.querySelectorAll('.source-remove-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const sourceId = btn.dataset.sourceId;
      if (confirm('Remove this source file and associated text index?')) {
        await Storage.deleteSource(sourceId);
        state.sources = state.sources.filter((s) => s.id !== sourceId);
        if (state.selectedSourceId === sourceId) {
          state.selectedSourceId = state.sources[0] ? state.sources[0].id : null;
        }
        state.verificationReport = runVerification(state.sources, state.evidence, state.claims, state.timeline);
        renderApp();
      }
    });
  });

  // 4. Workspace Mode Switching
  document.querySelectorAll('.workspace-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeMode = btn.dataset.mode;
      renderApp();
    });
  });

  // 5. Document Viewer Interactions
  const prevPageBtn = document.getElementById('doc-prev-page-btn');
  const nextPageBtn = document.getElementById('doc-next-page-btn');
  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => {
      if (state.currentPage > 1) {
        state.currentPage--;
        renderApp();
      }
    });
  }
  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
      state.currentPage++;
      renderApp();
    });
  }

  const zoomInBtn = document.getElementById('doc-zoom-in-btn');
  const zoomOutBtn = document.getElementById('doc-zoom-out-btn');
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      state.zoomLevel = Math.min(200, state.zoomLevel + 15);
      renderApp();
    });
  }
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      state.zoomLevel = Math.max(50, state.zoomLevel - 15);
      renderApp();
    });
  }

  const docSearchInput = document.getElementById('doc-search-input');
  if (docSearchInput) {
    docSearchInput.addEventListener('input', (e) => {
      state.searchDocQuery = e.target.value;
      renderApp();
    });
  }

  document.querySelectorAll('.sheet-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.currentSheetIndex = parseInt(btn.dataset.sheetIndex, 10) || 0;
      renderApp();
    });
  });

  const docSourceMetaBtn = document.getElementById('doc-source-meta-btn');
  if (docSourceMetaBtn) {
    docSourceMetaBtn.addEventListener('click', async () => {
      const info = await Storage.getStorageInfo();
      state.activeModal = 'storage';
      state.modalProps = { storageInfo: info };
      renderApp();
    });
  }

  // Row capture in spreadsheets
  document.querySelectorAll('.row-capture-evidence-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sheetName = btn.dataset.sheetName;
      const rowNum = btn.dataset.rowNum;
      const rowContent = btn.dataset.rowContent;
      const src = state.sources.find((s) => s.id === state.selectedSourceId);

      state.activeModal = 'evidence';
      state.modalProps = {
        sourceId: src ? src.id : '',
        sourceName: src ? src.name : '',
        location: `Sheet: ${sheetName}, Row: ${rowNum}`,
        sheet: sheetName,
        row: rowNum,
        excerpt: rowContent,
      };
      renderApp();
    });
  });

  // Text selection in document reading canvas -> floating popover (Section 8)
  const selectableText = document.getElementById('selectable-doc-text');
  const popover = document.getElementById('floating-evidence-popover');
  const popoverBtn = document.getElementById('popover-add-evidence-btn');
  const popoverClose = document.getElementById('popover-close-btn');

  if (selectableText && popover) {
    selectableText.addEventListener('mouseup', () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      if (text.length > 2) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const container = document.getElementById('document-viewer-container') || document.body;
        const containerRect = container.getBoundingClientRect();

        popover.style.top = `${rect.top - containerRect.top - 44}px`;
        popover.style.left = `${Math.max(80, rect.left - containerRect.left + rect.width / 2)}px`;
        popover.classList.remove('hidden');

        if (popoverBtn) {
          popoverBtn.onclick = () => {
            const src = state.sources.find((s) => s.id === state.selectedSourceId);
            state.activeModal = 'evidence';
            state.modalProps = {
              sourceId: src ? src.id : '',
              sourceName: src ? src.name : '',
              location: `Page ${state.currentPage}`,
              page: state.currentPage,
              excerpt: text,
            };
            popover.classList.add('hidden');
            renderApp();
          };
        }
      } else {
        popover.classList.add('hidden');
      }
    });

    if (popoverClose) {
      popoverClose.addEventListener('click', () => popover.classList.add('hidden'));
    }
  }

  const docCaptureEvidenceBtn = document.getElementById('doc-capture-evidence-btn');
  if (docCaptureEvidenceBtn) {
    docCaptureEvidenceBtn.addEventListener('click', () => {
      const src = state.sources.find((s) => s.id === state.selectedSourceId);
      state.activeModal = 'evidence';
      state.modalProps = {
        sourceId: src ? src.id : '',
        sourceName: src ? src.name : '',
        location: `Page ${state.currentPage}`,
        page: state.currentPage,
        excerpt: '',
      };
      renderApp();
    });
  }

  // 6. Evidence View Actions
  document.querySelectorAll('.ev-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeEvidenceFilter = btn.dataset.rel;
      renderApp();
    });
  });

  const btnAddEvidenceManual = document.getElementById('btn-add-evidence-manual');
  if (btnAddEvidenceManual) {
    btnAddEvidenceManual.addEventListener('click', () => {
      const src = state.sources.find((s) => s.id === state.selectedSourceId) || state.sources[0];
      state.activeModal = 'evidence';
      state.modalProps = {
        sourceId: src ? src.id : '',
        sourceName: src ? src.name : '',
        location: 'Document citation',
        page: 1,
        excerpt: '',
      };
      renderApp();
    });
  }

  document.querySelectorAll('.jump-to-source-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const srcId = btn.dataset.sourceId;
      const page = parseInt(btn.dataset.page, 10) || 1;
      state.selectedSourceId = srcId;
      state.currentPage = page;
      state.activeMode = 'document';
      renderApp();
    });
  });

  document.querySelectorAll('.delete-evidence-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const evId = btn.dataset.evidenceId;
      if (confirm(`Delete evidence citation #${evId}?`)) {
        await Storage.deleteEvidence(evId);
        state.evidence = state.evidence.filter((e) => e.id !== evId);
        state.verificationReport = runVerification(state.sources, state.evidence, state.claims, state.timeline);
        renderApp();
      }
    });
  });

  // 7. Claims View Actions
  const btnAddClaim = document.getElementById('btn-add-claim');
  if (btnAddClaim) {
    btnAddClaim.addEventListener('click', () => {
      state.activeModal = 'claim';
      renderApp();
    });
  }

  document.querySelectorAll('.delete-claim-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const claimId = btn.dataset.claimId;
      if (confirm(`Delete claim #${claimId}?`)) {
        await Storage.deleteClaim(claimId);
        state.claims = state.claims.filter((c) => c.id !== claimId);
        state.verificationReport = runVerification(state.sources, state.evidence, state.claims, state.timeline);
        renderApp();
      }
    });
  });

  document.querySelectorAll('.link-evidence-to-claim-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const claimId = btn.dataset.claimId;
      const src = state.sources.find((s) => s.id === state.selectedSourceId) || state.sources[0];
      state.activeModal = 'evidence';
      state.modalProps = {
        sourceId: src ? src.id : '',
        sourceName: src ? src.name : '',
        location: 'Primary Citation',
        linkedClaimId: claimId,
        excerpt: '',
      };
      renderApp();
    });
  });

  // 8. Connections & Entities Actions
  const btnAddEntity = document.getElementById('btn-add-entity');
  if (btnAddEntity) {
    btnAddEntity.addEventListener('click', () => {
      state.activeModal = 'entity';
      renderApp();
    });
  }

  const btnAddRelationship = document.getElementById('btn-add-relationship');
  if (btnAddRelationship) {
    btnAddRelationship.addEventListener('click', () => {
      state.activeModal = 'relationship';
      renderApp();
    });
  }

  document.querySelectorAll('.graph-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeGraphFilter = btn.dataset.type;
      renderApp();
    });
  });

  // 9. Timeline Actions
  const btnAddEvent = document.getElementById('btn-add-event');
  if (btnAddEvent) {
    btnAddEvent.addEventListener('click', () => {
      state.activeModal = 'timeline';
      renderApp();
    });
  }

  document.querySelectorAll('.delete-event-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const eventId = btn.dataset.eventId;
      if (confirm('Delete timeline event?')) {
        await Storage.deleteTimelineEvent(eventId);
        state.timeline = state.timeline.filter((t) => t.id !== eventId);
        state.verificationReport = runVerification(state.sources, state.evidence, state.claims, state.timeline);
        renderApp();
      }
    });
  });

  // 10. Notes Actions
  const btnAddNote = document.getElementById('btn-add-note');
  if (btnAddNote) {
    btnAddNote.addEventListener('click', () => {
      state.activeModal = 'note';
      renderApp();
    });
  }

  document.querySelectorAll('.delete-note-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const noteId = btn.dataset.noteId;
      await Storage.deleteNote(noteId);
      state.notes = state.notes.filter((n) => n.id !== noteId);
      renderApp();
    });
  });

  // 11. Verification Check Action
  const btnRunVerification = document.getElementById('btn-run-verification');
  if (btnRunVerification) {
    btnRunVerification.addEventListener('click', () => {
      state.verificationReport = runVerification(state.sources, state.evidence, state.claims, state.timeline);
      renderApp();
    });
  }

  // 12. Compare View
  const compareSelectA = document.getElementById('compare-select-a');
  const compareSelectB = document.getElementById('compare-select-b');
  const compareTextAEl = document.getElementById('compare-text-a');
  const compareTextBEl = document.getElementById('compare-text-b');

  if (compareSelectA) {
    compareSelectA.addEventListener('change', (e) => {
      state.compareSourceA = e.target.value;
      const s = state.sources.find((src) => src.id === e.target.value);
      state.compareTextA = s ? s.rawText : '';
      renderApp();
    });
  }
  if (compareSelectB) {
    compareSelectB.addEventListener('change', (e) => {
      state.compareSourceB = e.target.value;
      const s = state.sources.find((src) => src.id === e.target.value);
      state.compareTextB = s ? s.rawText : '';
      renderApp();
    });
  }
  if (compareTextAEl) {
    compareTextAEl.addEventListener('input', (e) => {
      state.compareTextA = e.target.value;
    });
  }
  if (compareTextBEl) {
    compareTextBEl.addEventListener('input', (e) => {
      state.compareTextB = e.target.value;
    });
  }

  // 13. Dossier Print Action
  const btnPrintDossier = document.getElementById('btn-print-dossier');
  if (btnPrintDossier) {
    btnPrintDossier.addEventListener('click', () => {
      window.print();
    });
  }

  // 14. Forensic Lab & Pure JS Investigation Utilities
  const triggerDossierDownload = () => {
    const caseData = {
      caseName: state.investigation?.name || 'Evidence Dossier',
      caseDescription: state.investigation?.description || '',
      sources: state.sources,
      evidence: state.evidence,
      claims: state.claims,
      entities: state.entities,
      timeline: state.timeline,
    };
    const htmlContent = generateStandaloneDossierHtml(caseData);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = (state.investigation?.name || 'evidence-dossier').toLowerCase().replace(/[^a-z0-9]/g, '-');
    a.download = `${safeName}-standalone-dossier.html`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    triggerPersistenceStatus('Exported offline HTML dossier');
  };

  const menuForensicLab = document.getElementById('menu-forensic-lab');
  if (menuForensicLab) {
    menuForensicLab.addEventListener('click', () => {
      const menu = document.getElementById('header-dropdown-menu');
      if (menu) menu.classList.add('hidden');
      state.currentRoute = '/workspace';
      state.activeMode = 'tools';
      renderApp();
    });
  }

  const menuExportDossier = document.getElementById('menu-export-standalone-dossier');
  if (menuExportDossier) {
    menuExportDossier.addEventListener('click', () => {
      const menu = document.getElementById('header-dropdown-menu');
      if (menu) menu.classList.add('hidden');
      triggerDossierDownload();
    });
  }

  // Sub-tab navigation
  document.querySelectorAll('.lab-subtab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeLabTab = btn.dataset.subtab;
      renderApp();
    });
  });

  // Cross-view shortcuts
  const btnAutoExtract = document.getElementById('btn-auto-extract-entities');
  if (btnAutoExtract) {
    btnAutoExtract.addEventListener('click', () => {
      state.activeMode = 'tools';
      state.activeLabTab = 'extractor';
      renderApp();
    });
  }

  const btnEvToCitations = document.getElementById('btn-evidence-to-citations');
  if (btnEvToCitations) {
    btnEvToCitations.addEventListener('click', () => {
      state.activeMode = 'tools';
      state.activeLabTab = 'citations';
      renderApp();
    });
  }

  const btnEvToRedact = document.getElementById('btn-evidence-to-redact');
  if (btnEvToRedact) {
    btnEvToRedact.addEventListener('click', () => {
      state.activeMode = 'tools';
      state.activeLabTab = 'redactor';
      renderApp();
    });
  }

  // Tool 1: Extractor
  const extSourceSelect = document.getElementById('extractor-source-select');
  const extTextInput = document.getElementById('extractor-text-input');
  const extRunBtn = document.getElementById('extractor-run-btn');
  const extImportBtn = document.getElementById('extractor-import-entities-btn');

  if (extSourceSelect) {
    extSourceSelect.addEventListener('change', (e) => {
      const srcId = e.target.value;
      const src = state.sources.find((s) => s.id === srcId);
      if (src && extTextInput) {
        let text = src.rawText || '';
        if (!text && src.content?.pages) {
          text = src.content.pages.map((p) => p.text).join('\n\n');
        }
        extTextInput.value = text;
        state.labState.extractorText = text;
      }
    });
  }

  if (extTextInput) {
    extTextInput.addEventListener('input', (e) => {
      state.labState.extractorText = e.target.value;
    });
  }

  if (extRunBtn) {
    extRunBtn.addEventListener('click', () => {
      const text = extTextInput ? extTextInput.value : state.labState.extractorText;
      state.labState.extractorText = text;
      state.labState.extractedData = extractEntitiesAndPatterns(text);
      renderApp();
    });
  }

  if (extImportBtn && state.labState.extractedData) {
    extImportBtn.addEventListener('click', async () => {
      const data = state.labState.extractedData;
      let addedCount = 0;
      const existingNames = new Set(state.entities.map((e) => e.name.toLowerCase()));

      for (const corp of data.corporateEntities || []) {
        if (!existingNames.has(corp.value.toLowerCase())) {
          existingNames.add(corp.value.toLowerCase());
          const newEntity = {
            id: 'ent-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
            name: corp.value,
            type: 'Company',
            role: 'Identified via Pattern Extractor',
            notes: 'Auto-extracted from document text.',
            tags: ['extracted', 'corporate'],
          };
          state.entities.push(newEntity);
          await Storage.saveEntity(newEntity);
          addedCount++;
        }
      }

      for (const jur of data.offshoreJurisdictions || []) {
        if (!existingNames.has(jur.value.toLowerCase())) {
          existingNames.add(jur.value.toLowerCase());
          const newEntity = {
            id: 'ent-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
            name: jur.value,
            type: 'Organization',
            role: 'Secrecy Jurisdiction / Tax Haven',
            notes: 'Jurisdiction extracted from case documents.',
            tags: ['extracted', 'offshore'],
          };
          state.entities.push(newEntity);
          await Storage.saveEntity(newEntity);
          addedCount++;
        }
      }

      for (const bank of data.bankingIdentifiers || []) {
        if (!existingNames.has(bank.value.toLowerCase())) {
          existingNames.add(bank.value.toLowerCase());
          const newEntity = {
            id: 'ent-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
            name: bank.value,
            type: 'Organization',
            role: bank.type || 'Bank Coordinate',
            notes: 'Banking identifier extracted from case documents.',
            tags: ['extracted', 'banking'],
          };
          state.entities.push(newEntity);
          await Storage.saveEntity(newEntity);
          addedCount++;
        }
      }

      triggerPersistenceStatus(`Imported ${addedCount} entities`);
      renderApp();
    });
  }

  // Tool 2: Standalone Dossier Export & Preview
  const dossierDownloadBtn = document.getElementById('dossier-download-btn');
  if (dossierDownloadBtn) {
    dossierDownloadBtn.addEventListener('click', triggerDossierDownload);
  }
  const btnExportStandaloneHtml = document.getElementById('btn-export-standalone-html');
  if (btnExportStandaloneHtml) {
    btnExportStandaloneHtml.addEventListener('click', triggerDossierDownload);
  }

  const dossierPreviewBtn = document.getElementById('dossier-preview-btn');
  if (dossierPreviewBtn) {
    dossierPreviewBtn.addEventListener('click', () => {
      const caseData = {
        caseName: state.investigation?.name || 'Evidence Dossier',
        caseDescription: state.investigation?.description || '',
        sources: state.sources,
        evidence: state.evidence,
        claims: state.claims,
        entities: state.entities,
        timeline: state.timeline,
      };
      const htmlContent = generateStandaloneDossierHtml(caseData);
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }

  // Tool 3: File Hash Verifier
  const hasherDropzone = document.getElementById('hasher-dropzone');
  const hasherFileInput = document.getElementById('hasher-file-input');
  const hasherBrowseBtn = document.getElementById('hasher-browse-btn');

  const processVerifyFile = async (file) => {
    if (!file) return;
    try {
      const res = await verifyFileHash(file, state.sources);
      state.labState.hasherResult = res;
      renderApp();
    } catch (err) {
      alert('Error verifying file: ' + err.message);
    }
  };

  if (hasherBrowseBtn && hasherFileInput) {
    hasherBrowseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hasherFileInput.click();
    });
  }
  if (hasherDropzone && hasherFileInput) {
    hasherDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      hasherDropzone.classList.add('border-[var(--primary)]');
    });
    hasherDropzone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      hasherDropzone.classList.remove('border-[var(--primary)]');
    });
    hasherDropzone.addEventListener('drop', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      hasherDropzone.classList.remove('border-[var(--primary)]');
      const files = Array.from(e.dataTransfer.files || []);
      if (files.length > 0) {
        await processVerifyFile(files[0]);
      }
    });
  }
  if (hasherFileInput) {
    hasherFileInput.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (file) await processVerifyFile(file);
    });
  }

  // Tool 4: Whistleblower Redaction
  const redactorQuoteSelect = document.getElementById('redactor-source-quote-select');
  const redactorInput = document.getElementById('redactor-input');
  const redactorOutput = document.getElementById('redactor-output');
  const redactorCopyBtn = document.getElementById('redactor-copy-btn');
  const redactorStyleRadios = document.querySelectorAll('input[name="redactor-style"]');
  const redactorEmailsCb = document.getElementById('redactor-emails');
  const redactorPhonesCb = document.getElementById('redactor-phones');
  const redactorAmountsCb = document.getElementById('redactor-amounts');

  const updateRedactorLive = () => {
    const text = redactorInput ? redactorInput.value : state.labState.redactorOriginalText;
    state.labState.redactorOriginalText = text;
    const styleRadio = document.querySelector('input[name="redactor-style"]:checked');
    const mode = styleRadio ? styleRadio.value : (state.labState.redactorMode || 'solid');
    state.labState.redactorMode = mode;

    const emails = redactorEmailsCb ? redactorEmailsCb.checked : true;
    const phones = redactorPhonesCb ? redactorPhonesCb.checked : true;
    const amounts = redactorAmountsCb ? redactorAmountsCb.checked : false;

    state.labState.redactEmails = emails;
    state.labState.redactPhones = phones;
    state.labState.redactAmounts = amounts;

    const sanitized = redactText(text, {
      mode,
      redactEmails: emails,
      redactPhones: phones,
      redactAmounts: amounts,
      caseEntities: state.entities.map((e) => e.name),
    });

    if (redactorOutput) {
      redactorOutput.textContent = sanitized;
    }
  };

  if (redactorQuoteSelect) {
    redactorQuoteSelect.addEventListener('change', (e) => {
      const idx = parseInt(e.target.value, 10);
      if (!isNaN(idx) && state.evidence[idx]) {
        const quote = state.evidence[idx].verbatimQuote || state.evidence[idx].excerpt || '';
        if (redactorInput) redactorInput.value = quote;
        state.labState.redactorOriginalText = quote;
        updateRedactorLive();
      }
    });
  }

  if (redactorInput) redactorInput.addEventListener('input', updateRedactorLive);
  redactorStyleRadios.forEach((r) => r.addEventListener('change', updateRedactorLive));
  if (redactorEmailsCb) redactorEmailsCb.addEventListener('change', updateRedactorLive);
  if (redactorPhonesCb) redactorPhonesCb.addEventListener('change', updateRedactorLive);
  if (redactorAmountsCb) redactorAmountsCb.addEventListener('change', updateRedactorLive);

  if (redactorCopyBtn && redactorOutput) {
    redactorCopyBtn.addEventListener('click', async () => {
      const text = redactorOutput.textContent || '';
      await navigator.clipboard.writeText(text);
      triggerPersistenceStatus('Redacted text copied');
      const orig = redactorCopyBtn.innerHTML;
      redactorCopyBtn.innerHTML = '✓ Copied!';
      setTimeout(() => {
        redactorCopyBtn.innerHTML = orig;
      }, 1800);
    });
  }

  // Tool 5: Multi-Format Citations
  const citeEvidenceSelect = document.getElementById('citation-evidence-select');
  const citationFormatBtns = document.querySelectorAll('.citation-format-btn');
  const citeCopySingleBtn = document.getElementById('citation-copy-single-btn');
  const citeCopyAllBtn = document.getElementById('citation-copy-all-btn');

  if (citeEvidenceSelect) {
    citeEvidenceSelect.addEventListener('change', (e) => {
      state.labState.citationEvidenceIdx = parseInt(e.target.value, 10) || 0;
      renderApp();
    });
  }

  citationFormatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.labState.citationFormat = btn.dataset.format;
      renderApp();
    });
  });

  if (citeCopySingleBtn) {
    citeCopySingleBtn.addEventListener('click', async () => {
      const citeText = document.getElementById('citation-output')?.textContent || '';
      await navigator.clipboard.writeText(citeText);
      triggerPersistenceStatus('Citation copied');
      const orig = citeCopySingleBtn.innerHTML;
      citeCopySingleBtn.innerHTML = '✓ Copied!';
      setTimeout(() => {
        citeCopySingleBtn.innerHTML = orig;
      }, 1800);
    });
  }

  if (citeCopyAllBtn) {
    citeCopyAllBtn.addEventListener('click', async () => {
      const format = state.labState.citationFormat || 'bluebook';
      const allCites = state.evidence
        .map((ev, i) => {
          const src = state.sources.find((s) => s.id === ev.sourceId) || {};
          const citation = generateCitation(ev, src, format);
          return format === 'bibtex' ? citation : `[${i + 1}] ${citation}`;
        })
        .join(format === 'bibtex' ? '\n\n' : '\n');

      await navigator.clipboard.writeText(allCites);
      triggerPersistenceStatus(`Copied all ${state.evidence.length} citations (${format.toUpperCase()})`);
      const orig = citeCopyAllBtn.innerHTML;
      citeCopyAllBtn.innerHTML = '✓ Full Bibliography Copied!';
      setTimeout(() => {
        citeCopyAllBtn.innerHTML = orig;
      }, 1800);
    });
  }

  // Tool 6: Cross-Document Overlap
  const overlapDocASelect = document.getElementById('overlap-doc-a-select');
  const overlapDocBSelect = document.getElementById('overlap-doc-b-select');
  const overlapTextA = document.getElementById('overlap-text-a');
  const overlapTextB = document.getElementById('overlap-text-b');
  const overlapRunBtn = document.getElementById('overlap-run-btn');

  const getSourceText = (srcId) => {
    const s = state.sources.find((src) => src.id === srcId);
    if (!s) return '';
    if (s.rawText) return s.rawText;
    if (s.content?.pages) return s.content.pages.map((p) => p.text).join('\n\n');
    return '';
  };

  if (overlapDocASelect && overlapTextA) {
    overlapDocASelect.addEventListener('change', (e) => {
      const text = getSourceText(e.target.value);
      if (text) overlapTextA.value = text;
    });
  }

  if (overlapDocBSelect && overlapTextB) {
    overlapDocBSelect.addEventListener('change', (e) => {
      const text = getSourceText(e.target.value);
      if (text) overlapTextB.value = text;
    });
  }

  if (overlapRunBtn && overlapTextA && overlapTextB) {
    overlapRunBtn.addEventListener('click', () => {
      const textA = overlapTextA.value;
      const textB = overlapTextB.value;
      const result = detectTextOverlap(textA, textB);
      state.labState.overlapResult = result;
      renderApp();
    });
  }

  // 14. Modals Submission & Dismiss
  attachModalEvents();
}

function attachModalEvents() {
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('modal-cancel-btn');
  const closeOkBtn = document.getElementById('modal-close-ok-btn');

  const closeModal = () => {
    state.activeModal = null;
    state.modalProps = {};
    renderApp();
  };

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (closeOkBtn) closeOkBtn.addEventListener('click', closeModal);

  // Clear Research Confirmation Handlers
  const cancelClearBtn = document.getElementById('cancel-clear-btn');
  if (cancelClearBtn) cancelClearBtn.addEventListener('click', closeModal);

  const confirmClearBtn = document.getElementById('confirm-clear-btn');
  if (confirmClearBtn) {
    confirmClearBtn.addEventListener('click', async () => {
      try {
        // 1. Remove everything from Local Storage
        try {
          localStorage.clear();
        } catch (e) {
          console.warn('localStorage clear exception:', e);
        }

        // 2. Remove everything from Session Storage
        try {
          sessionStorage.clear();
        } catch (e) {
          console.warn('sessionStorage clear exception:', e);
        }

        // 3. Remove this specific case storage in IndexedDB (all stores)
        await Storage.clearAll();

        // 4. Reset in-memory application state
        state.investigation = {
          id: 'inv-' + Date.now(),
          name: 'New Investigation',
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        };
        await Storage.saveInvestigation(state.investigation);
        state.sources = [];
        state.folders = [];
        state.evidence = [];
        state.claims = [];
        state.entities = [];
        state.relationships = [];
        state.timeline = [];
        state.notes = [];
        state.selectedSourceId = null;
        state.selectedFolderId = 'all';
        state.currentPage = 1;
        state.currentSheetIndex = 0;
        state.activeMode = 'document';
        state.activeModal = null;
        state.modalProps = {};
        state.verificationReport = null;
        state.compareSourceA = null;
        state.compareSourceB = null;
        state.compareTextA = '';
        state.compareTextB = '';
        state.searchQuery = '';
        state.searchResults = [];

        triggerPersistenceStatus('All research storage cleared');
        renderApp();
      } catch (err) {
        console.error('Error clearing research storage:', err);
        alert('Could not completely clear storage: ' + (err.message || err));
      }
    });
  }

  // Evidence Form Submit
  const evidenceForm = document.getElementById('evidence-form');
  if (evidenceForm) {
    evidenceForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(evidenceForm);
      const evId = `E${String(state.evidence.length + 1).padStart(2, '0')}`;

      const newEvidence = {
        id: evId,
        sourceId: formData.get('sourceId'),
        sourceName: formData.get('sourceName'),
        location: formData.get('location'),
        page: parseInt(formData.get('page'), 10) || 1,
        sheet: formData.get('sheet') || null,
        row: formData.get('row') || null,
        excerpt: formData.get('excerpt'),
        relationship: formData.get('relationship'),
        linkedClaimId: formData.get('linkedClaimId') || null,
        notes: formData.get('notes'),
        createdAt: new Date().toISOString(),
        verifiedIntegrity: true,
      };

      await Storage.saveEvidence(newEvidence);
      state.evidence.push(newEvidence);
      state.verificationReport = runVerification(state.sources, state.evidence, state.claims, state.timeline);
      triggerPersistenceStatus('Saved locally');
      closeModal();
    });
  }

  // Claim Form Submit
  const claimForm = document.getElementById('claim-form');
  if (claimForm) {
    claimForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(claimForm);
      const claimId = `C${String(state.claims.length + 1).padStart(2, '0')}`;

      const newClaim = {
        id: claimId,
        statement: formData.get('statement'),
        status: formData.get('status'),
        notes: formData.get('notes'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await Storage.saveClaim(newClaim);
      state.claims.push(newClaim);
      state.verificationReport = runVerification(state.sources, state.evidence, state.claims, state.timeline);
      triggerPersistenceStatus('Saved locally');
      closeModal();
    });
  }

  // Entity Form Submit
  const entityForm = document.getElementById('entity-form');
  if (entityForm) {
    entityForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(entityForm);
      const entityId = `E-${String(state.entities.length + 1).padStart(2, '0')}`;

      const newEntity = {
        id: entityId,
        name: formData.get('name'),
        type: formData.get('type'),
        description: formData.get('description'),
        createdAt: new Date().toISOString(),
      };

      await Storage.saveEntity(newEntity);
      state.entities.push(newEntity);
      triggerPersistenceStatus('Saved locally');
      closeModal();
    });
  }

  // Relationship Form Submit
  const relForm = document.getElementById('relationship-form');
  if (relForm) {
    relForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(relForm);
      const relId = `R${String(state.relationships.length + 1).padStart(2, '0')}`;

      const srcEntity = state.entities.find((en) => en.id === formData.get('sourceId'));
      const targetEntity = state.entities.find((en) => en.id === formData.get('targetId'));
      const evidenceId = formData.get('evidenceId');

      const newRel = {
        id: relId,
        sourceId: formData.get('sourceId'),
        sourceName: srcEntity ? srcEntity.name : '',
        targetId: formData.get('targetId'),
        targetName: targetEntity ? targetEntity.name : '',
        relationshipType: formData.get('relationshipType'),
        evidenceIds: evidenceId ? [evidenceId] : [],
        date: formData.get('date'),
        createdAt: new Date().toISOString(),
      };

      await Storage.saveRelationship(newRel);
      state.relationships.push(newRel);
      triggerPersistenceStatus('Saved locally');
      closeModal();
    });
  }

  // Timeline Form Submit
  const timelineForm = document.getElementById('timeline-form');
  if (timelineForm) {
    timelineForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(timelineForm);
      const eventId = `T${String(state.timeline.length + 1).padStart(2, '0')}`;
      const evidenceId = formData.get('evidenceId');

      const newEvent = {
        id: eventId,
        date: formData.get('date'),
        datePrecision: formData.get('datePrecision'),
        title: formData.get('title'),
        description: formData.get('description'),
        evidenceIds: evidenceId ? [evidenceId] : [],
        createdAt: new Date().toISOString(),
      };

      await Storage.saveTimelineEvent(newEvent);
      state.timeline.push(newEvent);
      state.verificationReport = runVerification(state.sources, state.evidence, state.claims, state.timeline);
      triggerPersistenceStatus('Saved locally');
      closeModal();
    });
  }

  // Note Form Submit
  const noteForm = document.getElementById('note-form');
  if (noteForm) {
    noteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(noteForm);
      const noteId = `N${String(state.notes.length + 1).padStart(2, '0')}`;
      const attachedClaimId = formData.get('attachedClaimId');
      const attachedClaim = state.claims.find((c) => c.id === attachedClaimId);

      const newNote = {
        id: noteId,
        title: formData.get('title'),
        content: formData.get('content'),
        attachedToType: attachedClaimId ? 'claim' : 'standalone',
        attachedToId: attachedClaimId || null,
        attachedToName: attachedClaim ? `Claim #${attachedClaim.id}` : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await Storage.saveNote(newNote);
      state.notes.push(newNote);
      triggerPersistenceStatus('Saved locally');
      closeModal();
    });
  }

  // Folder Form Submit
  const folderForm = document.getElementById('folder-form');
  if (folderForm) {
    folderForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(folderForm);
      const folderId = `f-${Date.now()}`;

      const newFolder = {
        id: folderId,
        name: formData.get('name'),
        createdAt: new Date().toISOString(),
      };

      await Storage.saveFolder(newFolder);
      state.folders.push(newFolder);
      triggerPersistenceStatus('Saved locally');
      closeModal();
    });
  }

  // Global Search Modal Events
  const searchInput = document.getElementById('global-search-modal-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      executeSearch(e.target.value);
    });

    document.querySelectorAll('.search-filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        state.searchFilter = chip.dataset.filter;
        executeSearch(state.searchQuery);
      });
    });

    document.querySelectorAll('.cmd-item').forEach((item) => {
      item.addEventListener('click', () => {
        const action = item.dataset.action;
        closeModal();
        if (action === 'new-claim') state.activeModal = 'claim';
        if (action === 'new-evidence') state.activeModal = 'evidence';
        if (action === 'new-entity') state.activeModal = 'entity';
        if (action === 'new-event') state.activeModal = 'timeline';
        if (action === 'view-connections') state.activeMode = 'connections';
        if (action === 'view-compare') state.activeMode = 'compare';
        if (action === 'view-report') state.activeMode = 'report';
        renderApp();
      });
    });

    document.querySelectorAll('.search-result-row').forEach((row) => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.quick-save-evidence-btn')) return;
        const type = row.dataset.resultType;
        const sourceId = row.dataset.sourceId;
        const page = parseInt(row.dataset.page, 10) || 1;
        closeModal();

        if (type === 'source_text' || type === 'evidence') {
          state.selectedSourceId = sourceId;
          state.currentPage = page;
          state.activeMode = 'document';
        } else if (type === 'claim') {
          state.activeMode = 'claims';
        } else if (type === 'entity') {
          state.activeMode = 'connections';
        }
        renderApp();
      });
    });

    document.querySelectorAll('.quick-save-evidence-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
        state.activeModal = 'evidence';
        state.modalProps = {
          sourceId: btn.dataset.sourceId,
          sourceName: btn.dataset.sourceName,
          location: btn.dataset.location,
          page: parseInt(btn.dataset.page, 10) || 1,
          excerpt: btn.dataset.excerpt,
        };
        renderApp();
      });
    });
  }
}

// Ingest Files Handler (Section 4 & 5)
async function handleFilesIngest(files) {
  const allowed = new Set(['pdf','xlsx','csv','docx','txt','transcript','web']);
  const rejected = [];
  triggerPersistenceStatus('Importing files...');
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : '';
    if (!allowed.has(ext)) {
      rejected.push(file.name);
      continue;
    }
    const seq = state.sources.length + 1;
    const parsed = await parseFile(file, seq, state.selectedFolderId);
    await Storage.saveSource(parsed);
    state.sources.push(parsed);
    state.selectedSourceId = parsed.id;
  }
  state.currentPage = 1;
  state.currentSheetIndex = 0;
  state.verificationReport = runVerification(state.sources, state.evidence, state.claims, state.timeline);
  triggerPersistenceStatus(rejected.length ? `Saved locally · skipped ${rejected.length} unsupported file${rejected.length === 1 ? '' : 's'}` : 'Saved locally');
  renderApp();
}

// SVG Network Graph Mount
function mountNetworkGraph() {
  const svg = document.getElementById('network-graph-svg');
  if (!svg) return;

  const drawer = document.getElementById('graph-details-drawer');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerType = document.getElementById('drawer-type-badge');
  const drawerDesc = document.getElementById('drawer-desc');
  const drawerLinks = document.getElementById('drawer-links');
  const closeDrawerBtn = document.getElementById('close-graph-drawer-btn');

  if (closeDrawerBtn) {
    closeDrawerBtn.onclick = () => drawer.classList.add('hidden');
  }

  state.networkGraph = new NetworkGraph(svg, {
    onNodeClick: (node) => {
      if (!drawer) return;
      drawerTitle.textContent = node.name;
      drawerType.textContent = node.type;
      drawerDesc.textContent = node.data.description || 'No additional description recorded.';

      const connected = state.relationships.filter(
        (r) => r.sourceId === node.id || r.targetId === node.id
      );

      drawerLinks.innerHTML = `
        <span class="text-[10px] font-mono text-[var(--text-4)] uppercase font-semibold">Connections (${connected.length})</span>
        <div class="space-y-1 mt-1">
          ${connected.map((r) => {
            const isSource = r.sourceId === node.id;
            const otherName = isSource ? r.targetName : r.sourceName;
            return `
              <div class="p-1.5 bg-[var(--surface-2)] rounded border border-[var(--border)] text-[11px]">
                <span class="font-mono text-[var(--primary)] font-medium">${isSource ? '→ ' + r.relationshipType : '← ' + r.relationshipType}</span>
                <span class="font-semibold text-[var(--text)]"> ${otherName}</span>
                ${r.evidenceIds && r.evidenceIds.length > 0 ? `
                  <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">Evidence citation: #${r.evidenceIds.join(', #')}</div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `;
      drawer.classList.remove('hidden');
    },
    onLinkClick: (link) => {
      if (!drawer) return;
      drawerTitle.textContent = `${link.source.name} ↔ ${link.target.name}`;
      drawerType.textContent = link.relationshipType;
      drawerDesc.textContent = `Documented connection: ${link.relationshipType}. ${link.data.notes || ''}`;
      drawerLinks.innerHTML = `
        <span class="text-[10px] font-mono text-[var(--text-4)] uppercase font-semibold">Evidence Citations</span>
        <div class="space-y-1 mt-1">
          ${link.evidenceIds.length > 0 ? link.evidenceIds.map((eid) => {
            const ev = state.evidence.find((e) => e.id === eid);
            return `
              <div class="p-1.5 bg-[var(--surface-2)] rounded border border-[var(--border)] text-[11px]">
                <span class="font-bold text-[var(--primary)]">#${eid}</span>
                <p class="italic text-[var(--text-2)] mt-0.5">"${ev ? ev.excerpt : 'Citation record'}"</p>
              </div>
            `;
          }).join('') : `
            <div class="text-[10px] text-[var(--text-4)] italic">No primary evidence citation attached.</div>
          `}
        </div>
      `;
      drawer.classList.remove('hidden');
    },
  });

  state.networkGraph.setData(state.entities, state.relationships, state.activeGraphFilter);

  const zoomIn = document.getElementById('graph-zoom-in');
  const zoomOut = document.getElementById('graph-zoom-out');
  const resetBtn = document.getElementById('graph-reset');

  if (zoomIn) zoomIn.onclick = () => state.networkGraph.zoom(1.2);
  if (zoomOut) zoomOut.onclick = () => state.networkGraph.zoom(0.8);
  if (resetBtn) resetBtn.onclick = () => state.networkGraph.reset();
}

// Global Search (Ctrl/Cmd+K)
function openSearchModal() {
  state.activeModal = 'search';
  state.searchQuery = '';
  state.searchResults = [];
  state.searchFilter = 'all';
  renderApp();
  setTimeout(() => {
    const input = document.getElementById('global-search-modal-input');
    if (input) input.focus();
  }, 50);
}

function executeSearch(query) {
  state.searchQuery = query;
  if (!query || query.trim().length === 0) {
    state.searchResults = [];
    const container = document.getElementById('search-modal-results');
    if (container) {
      container.innerHTML = `
        <div class="p-2">
          <div class="text-[10px] font-mono uppercase text-[var(--text-4)] px-2 py-1 tracking-wider">Quick Commands</div>
          <div class="space-y-0.5">
            <button class="cmd-item w-full text-left px-2.5 py-2 rounded hover:bg-[var(--surface-3)] flex items-center justify-between text-xs text-[var(--text)]" data-action="new-claim">Create new Claim</button>
            <button class="cmd-item w-full text-left px-2.5 py-2 rounded hover:bg-[var(--surface-3)] flex items-center justify-between text-xs text-[var(--text)]" data-action="new-evidence">Add Evidence citation</button>
            <button class="cmd-item w-full text-left px-2.5 py-2 rounded hover:bg-[var(--surface-3)] flex items-center justify-between text-xs text-[var(--text)]" data-action="view-report">Generate Evidence Dossier</button>
          </div>
        </div>
      `;
      attachModalEvents();
    }
    return;
  }

  const q = query.toLowerCase().trim();
  const results = [];

  // Search Sources Text
  if (state.searchFilter === 'all' || state.searchFilter === 'sources') {
    state.sources.forEach((src) => {
      if (src.textPages && src.textPages.length > 0) {
        src.textPages.forEach((pg) => {
          const idx = pg.text.toLowerCase().indexOf(q);
          if (idx !== -1) {
            const start = Math.max(0, idx - 40);
            const end = Math.min(pg.text.length, idx + q.length + 60);
            const snippet = pg.text.slice(start, end);
            results.push({
              type: 'source_text',
              title: src.name,
              sourceId: src.id,
              sourceName: src.name,
              sourceType: src.type,
              page: pg.pageNumber,
              location: `${src.name} · Page ${pg.pageNumber}`,
              plainText: snippet,
              snippetHighlight: highlightMatch(snippet, q),
              badge: 'Document Page',
            });
          }
        });
      }
    });
  }

  // Search Evidence
  if (state.searchFilter === 'all' || state.searchFilter === 'evidence') {
    state.evidence.forEach((ev) => {
      if (ev.excerpt.toLowerCase().includes(q) || (ev.notes && ev.notes.toLowerCase().includes(q))) {
        results.push({
          type: 'evidence',
          title: `Evidence #${ev.id} (${ev.relationship})`,
          evidenceId: ev.id,
          sourceId: ev.sourceId,
          sourceName: ev.sourceName,
          page: ev.page || 1,
          location: `${ev.sourceName} · ${ev.location}`,
          plainText: ev.excerpt,
          snippetHighlight: highlightMatch(ev.excerpt, q),
          badge: 'Evidence Citation',
        });
      }
    });
  }

  // Search Claims
  if (state.searchFilter === 'all' || state.searchFilter === 'claims') {
    state.claims.forEach((c) => {
      if (c.statement.toLowerCase().includes(q) || (c.notes && c.notes.toLowerCase().includes(q))) {
        results.push({
          type: 'claim',
          title: `Claim #${c.id} [${c.status}]`,
          claimId: c.id,
          location: `Claim Statement`,
          plainText: c.statement,
          snippetHighlight: highlightMatch(c.statement, q),
          badge: 'Claim',
        });
      }
    });
  }

  // Search Entities
  if (state.searchFilter === 'all' || state.searchFilter === 'entities') {
    state.entities.forEach((en) => {
      if (en.name.toLowerCase().includes(q) || (en.description && en.description.toLowerCase().includes(q))) {
        results.push({
          type: 'entity',
          title: `${en.name} (${en.type})`,
          location: `Registered Entity`,
          plainText: en.description || en.name,
          snippetHighlight: highlightMatch(en.description || en.name, q),
          badge: en.type,
        });
      }
    });
  }

  state.searchResults = results.slice(0, 30);
  const container = document.getElementById('search-modal-results');
  if (container) {
    if (state.searchResults.length === 0) {
      container.innerHTML = `<div class="p-8 text-center text-xs text-[var(--text-4)]">No matching records found for "${escapeHtml(query)}"</div>`;
    } else {
      container.innerHTML = state.searchResults.map((item) => `
        <div
          class="search-result-row group p-2.5 rounded hover:bg-[var(--surface-3)] transition-colors cursor-pointer border border-transparent hover:border-[var(--border)]"
          data-result-type="${item.type}"
          data-source-id="${item.sourceId || ''}"
          data-page="${item.page || ''}"
          data-claim-id="${item.claimId || ''}"
          data-evidence-id="${item.evidenceId || ''}"
        >
          <div class="flex items-start justify-between gap-2">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-xs text-[var(--text)]">${escapeHtml(item.title)}</span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--surface-3)] text-[var(--text-3)]">${item.badge}</span>
              </div>
              <p class="text-xs text-[var(--text-2)] mt-0.5 line-clamp-2 leading-relaxed">${item.snippetHighlight}</p>
              <div class="text-[10px] text-[var(--text-4)] font-mono mt-1">${escapeHtml(item.location || '')}</div>
            </div>
            ${item.type === 'source_text' ? `
              <button
                class="quick-save-evidence-btn opacity-0 group-hover:opacity-100 flex-none px-2 py-1 text-[11px] bg-[var(--primary-soft)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white font-medium rounded transition-all"
                data-source-id="${item.sourceId}"
                data-source-name="${escapeHtml(item.sourceName)}"
                data-location="${escapeHtml(item.location)}"
                data-page="${item.page || 1}"
                data-excerpt="${escapeHtml(item.plainText)}"
              >
                + Evidence
              </button>
            ` : ''}
          </div>
        </div>
      `).join('');
      attachModalEvents();
    }
  }
}

function highlightMatch(text, query) {
  const esc = escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return esc.replace(regex, '<mark class="bg-amber-200 text-amber-900 rounded-xs px-0.5">$1</mark>');
}

function initGlobalKeyboard() {
  window.addEventListener('keydown', (e) => {
    // Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (state.activeModal === 'search') {
        state.activeModal = null;
        renderApp();
      } else {
        openSearchModal();
      }
    }

    // Escape
    if (e.key === 'Escape' && state.activeModal) {
      state.activeModal = null;
      renderApp();
    }
  });
}

function triggerPersistenceStatus(text) {
  state.persistenceStatus = text;
  const ind = document.getElementById('persistence-indicator');
  if (ind) {
    ind.innerHTML = text ? `<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ${escapeHtml(text)}` : '';
    ind.classList.remove('hidden');
  }
  setTimeout(() => {
    if (state.persistenceStatus === text) {
      state.persistenceStatus = '';
      if (ind) ind.classList.add('hidden');
    }
  }, 2500);
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

// Start application
initApp();
