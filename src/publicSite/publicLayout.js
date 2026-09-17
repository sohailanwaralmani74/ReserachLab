import { icon } from '../components/icons.js';
import { SEO_CATALOG } from './seoData.js';

export function applyPageSeo(slug) {
  const seo = SEO_CATALOG[slug] || SEO_CATALOG['/'];
  
  // Document title
  document.title = seo.title;

  // Helper to set or create meta tag
  const setMeta = (attrName, attrVal, content) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('name', 'description', seo.description);
  setMeta('property', 'og:title', seo.ogTitle);
  setMeta('property', 'og:description', seo.ogDescription);
  setMeta('property', 'og:url', seo.canonical);
  setMeta('name', 'twitter:title', seo.twitterTitle);
  setMeta('name', 'twitter:description', seo.twitterDescription);

  // Canonical link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', seo.canonical);

  // Structured data (JSON-LD)
  let scriptLd = document.getElementById('json-ld-schema');
  if (!scriptLd) {
    scriptLd = document.createElement('script');
    scriptLd.id = 'json-ld-schema';
    scriptLd.type = 'application/ld+json';
    document.head.appendChild(scriptLd);
  }
  scriptLd.textContent = JSON.stringify(seo.structuredData || {});
}

export function renderPublicNav(activeSlug = '/') {
  const isDark = document.documentElement.classList.contains('dark');

  const links = [
    { slug: '/how-it-works/', label: 'How It Works' },
    { slug: '/features/', label: 'Features' },
    { slug: '/use-cases/', label: 'Use Cases' },
    { slug: '/evidence-provenance/', label: 'Provenance' },
    { slug: '/research-guide/', label: 'Research Guide' },
    { slug: '/security/', label: 'Security' },
    { slug: '/faq/', label: 'FAQ' },
    { slug: '/about/', label: 'About' },
  ];

  return `
    <header class="w-full border-b border-[var(--border)] bg-[var(--surface)] sticky top-0 z-40 select-none shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <!-- Logo -->
        <a href="/" data-route="/" class="nav-link flex items-center gap-2.5 text-[var(--text)] group hover:opacity-90 transition-opacity">
          <div class="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center font-bold text-sm border border-[var(--border)] group-hover:scale-105 transition-transform">
            ${icon('shield', 20)}
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-base tracking-tight leading-none text-[var(--text)] font-mono">Reptile Birds</span>
            <span class="text-[10px] text-[var(--text-3)] uppercase tracking-wider font-mono">Evidence Workspace</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium text-[var(--text-2)]">
          ${links.map((link) => {
            const isActive = activeSlug === link.slug;
            return `
              <a
                href="${link.slug}"
                data-route="${link.slug}"
                class="nav-link px-2.5 py-1.5 rounded-[var(--radius-sm)] transition-colors ${
                  isActive
                    ? 'text-[var(--primary)] font-semibold bg-[var(--primary-soft)]'
                    : 'hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                }"
              >
                ${link.label}
              </a>
            `;
          }).join('')}
        </nav>

        <!-- Right Side: Theme toggle + Primary CTA -->
        <div class="flex items-center gap-2 sm:gap-3">
          <button
            id="public-theme-toggle"
            class="p-2 text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] rounded-[var(--radius-md)] transition-colors cursor-pointer"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            ${isDark ? icon('sun', 16) : icon('moon', 16)}
          </button>

          <!-- Launch Workspace Action -->
          <button
            id="launch-workspace-btn"
            class="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold rounded-[var(--radius-sm)] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            ${icon('folder', 14)}
            <span>Start an investigation</span>
          </button>

          <!-- Mobile Menu Trigger -->
          <button
            id="mobile-nav-toggle"
            class="p-2 lg:hidden text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] rounded-[var(--radius-md)] cursor-pointer"
            aria-label="Open mobile menu"
          >
            ${icon('moreVertical', 18)}
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Navigation -->
      <div id="mobile-nav-menu" class="hidden lg:hidden border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 space-y-1 text-xs">
        ${links.map((link) => {
          const isActive = activeSlug === link.slug;
          return `
            <a
              href="${link.slug}"
              data-route="${link.slug}"
              class="nav-link block px-3 py-2 rounded-[var(--radius-sm)] ${
                isActive
                  ? 'text-[var(--primary)] font-semibold bg-[var(--primary-soft)]'
                  : 'text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
              }"
            >
              ${link.label}
            </a>
          `;
        }).join('')}
        <div class="pt-2 border-t border-[var(--border)]">
          <button
            id="mobile-launch-workspace-btn"
            class="w-full py-2.5 bg-[var(--primary)] text-white text-xs font-semibold rounded-[var(--radius-sm)] flex items-center justify-center gap-2"
          >
            ${icon('folder', 14)}
            <span>Launch Workspace</span>
          </button>
        </div>
      </div>
    </header>
  `;
}

export function renderPublicFooter() {
  return `
    <footer class="w-full border-t border-[var(--border)] bg-[var(--surface-2)] text-xs text-[var(--text-3)] py-14 px-4 sm:px-6 select-none">
      <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        
        <!-- Brand Description -->
        <div class="col-span-2 space-y-3">
          <div class="flex items-center gap-2.5 text-sm font-bold text-[var(--text)] font-mono">
            <div class="w-6 h-6 rounded-[var(--radius-sm)] bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center text-xs">
              ${icon('shield', 14)}
            </div>
            <span>Reptile Birds</span>
          </div>
          <p class="text-xs text-[var(--text-3)] max-w-sm leading-relaxed">
            A deterministic, browser-based evidence-management and research workspace. Built for researchers who cannot afford to lose the thread of their work.
          </p>
          <div class="text-[11px] text-[var(--text-4)] space-y-1 font-mono">
            <div>Local-first browser architecture</div>
            <div>Zero server indexing • Web Crypto SHA-256</div>
          </div>
        </div>

        <!-- Product -->
        <div class="space-y-2.5">
          <div class="font-semibold text-[var(--text)] uppercase tracking-wider text-[11px] font-mono">Product</div>
          <ul class="space-y-1.5">
            <li><a href="/features/" data-route="/features/" class="nav-link hover:text-[var(--text)]">Features</a></li>
            <li><a href="/how-it-works/" data-route="/how-it-works/" class="nav-link hover:text-[var(--text)]">How It Works</a></li>
            <li><a href="/use-cases/" data-route="/use-cases/" class="nav-link hover:text-[var(--text)]">Use Cases</a></li>
            <li><a href="/faq/" data-route="/faq/" class="nav-link hover:text-[var(--text)]">FAQ</a></li>
          </ul>
        </div>

        <!-- Integrity & Methodology -->
        <div class="space-y-2.5">
          <div class="font-semibold text-[var(--text)] uppercase tracking-wider text-[11px] font-mono">Integrity</div>
          <ul class="space-y-1.5">
            <li><a href="/evidence-provenance/" data-route="/evidence-provenance/" class="nav-link hover:text-[var(--text)]">Evidence & Provenance</a></li>
            <li><a href="/research-guide/" data-route="/research-guide/" class="nav-link hover:text-[var(--text)]">Research Guide</a></li>
            <li><a href="/security/" data-route="/security/" class="nav-link hover:text-[var(--text)]">Security Architecture</a></li>
            <li><a href="/data-storage/" data-route="/data-storage/" class="nav-link hover:text-[var(--text)]">Data Storage & Backup</a></li>
          </ul>
        </div>

        <!-- Governance & Legal -->
        <div class="space-y-2.5">
          <div class="font-semibold text-[var(--text)] uppercase tracking-wider text-[11px] font-mono">Governance</div>
          <ul class="space-y-1.5">
            <li><a href="/about/" data-route="/about/" class="nav-link hover:text-[var(--text)]">About Us</a></li>
            <li><a href="/contact/" data-route="/contact/" class="nav-link hover:text-[var(--text)]">Contact</a></li>
            <li><a href="/privacy/" data-route="/privacy/" class="nav-link hover:text-[var(--text)]">Privacy Policy</a></li>
            <li><a href="/terms/" data-route="/terms/" class="nav-link hover:text-[var(--text)]">Terms of Use</a></li>
            <li><a href="/cookies/" data-route="/cookies/" class="nav-link hover:text-[var(--text)]">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <!-- Legal & Disclaimer Bar -->
      <div class="max-w-7xl mx-auto pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--text-4)] gap-4">
        <div>
          © 2026 Reptile Birds. All rights reserved. Deterministic Research Tools.
        </div>
        <div class="flex items-center gap-3">
          <span>Local Browser IndexedDB</span>
          <span>•</span>
          <span>No Cloud File Uploads</span>
          <span>•</span>
          <a href="#" id="footer-clear-storage-shortcut" class="text-red-500 hover:underline">Reset Local Storage</a>
        </div>
      </div>
    </footer>
  `;
}

export function renderPublicPageWrapper(slug, contentHtml) {
  return `
    <div class="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
      ${renderPublicNav(slug)}
      <main id="public-main" class="flex-1 w-full">
        ${contentHtml}
      </main>
      ${renderPublicFooter()}
    </div>
  `;
}
