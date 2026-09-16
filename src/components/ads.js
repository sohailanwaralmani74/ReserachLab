/**
 * Page Shell Advertisement System (25% Desktop Column / Mobile Bottom)
 * Strictly decoupled from workspace logic as mandated in Section 2.
 */

import { icon } from './icons.js';

export function renderAdsColumn() {
  return `
    <aside id="ads-column" class="w-full flex flex-col bg-[var(--surface)] p-4 space-y-4 text-[13px] lg:sticky lg:top-[56px] lg:self-start lg:max-h-[calc(100vh-56px)] lg:overflow-y-auto" aria-label="Sponsored Technology Partners">
      <div class="flex items-center justify-between pb-2 border-b border-[var(--border)]">
        <span class="text-[10px] font-semibold tracking-wider uppercase text-[var(--text-4)] flex items-center gap-1">
          ${icon('shieldCheck', 12)} Sponsored Partners
        </span>
        <span class="text-[10px] text-[var(--text-4)] bg-[var(--surface-3)] px-1.5 py-0.5 rounded-[var(--radius-sm)]">Ad</span>
      </div>

      <!-- Sponsor Card 1: Archival Security -->
      <article class="p-3.5 rounded-[var(--radius-card)] bg-[var(--surface-2)] border border-[var(--border)] space-y-2 hover:border-[var(--border-strong)] transition-colors">
        <div class="flex items-start justify-between">
          <div class="font-semibold text-[var(--text)] text-xs">VeraCrypt & Air-Gap Vault</div>
          <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Hardware</span>
        </div>
        <p class="text-xs text-[var(--text-3)] leading-relaxed">
          Physical write-blockers and tamper-evident cryptographic storage drives certified for forensic evidence chain-of-custody.
        </p>
        <div class="pt-1 flex items-center justify-between text-[11px]">
          <span class="text-[var(--text-4)] font-mono">FIPS 140-3 L3</span>
          <a href="#sponsor-airgap" class="text-[var(--primary)] hover:underline flex items-center gap-1 font-medium">
            Learn more ${icon('externalLink', 10)}
          </a>
        </div>
      </article>

      <!-- Sponsor Card 2: OSINT Intelligence Registry -->
      <article class="p-3.5 rounded-[var(--radius-card)] bg-[var(--surface-2)] border border-[var(--border)] space-y-2 hover:border-[var(--border-strong)] transition-colors">
        <div class="flex items-start justify-between">
          <div class="font-semibold text-[var(--text)] text-xs">OpenSanctions Enterprise</div>
          <span class="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Database</span>
        </div>
        <p class="text-xs text-[var(--text-3)] leading-relaxed">
          Daily synchronized registry covering politically exposed persons (PEPs), sanctions lists, and beneficial corporate ownership.
        </p>
        <div class="pt-1 flex items-center justify-between text-[11px]">
          <span class="text-[var(--text-4)] font-mono">2.8M entities</span>
          <a href="#sponsor-opensanctions" class="text-[var(--primary)] hover:underline flex items-center gap-1 font-medium">
            Browse ${icon('externalLink', 10)}
          </a>
        </div>
      </article>

      <!-- Sponsor Card 3: Satellite Imagery Archive -->
      <article class="p-3.5 rounded-[var(--radius-card)] bg-[var(--surface-2)] border border-[var(--border)] space-y-2 hover:border-[var(--border-strong)] transition-colors">
        <div class="flex items-start justify-between">
          <div class="font-semibold text-[var(--text)] text-xs">AeroSat Historic Imagery</div>
          <span class="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Geospatial</span>
        </div>
        <p class="text-xs text-[var(--text-3)] leading-relaxed">
          Sub-meter multispectral satellite passes from 2014–2026. Verify infrastructure changes and maritime movements.
        </p>
        <div class="pt-1 flex items-center justify-between text-[11px]">
          <span class="text-[var(--text-4)] font-mono">30cm GSD</span>
          <a href="#sponsor-aerosat" class="text-[var(--primary)] hover:underline flex items-center gap-1 font-medium">
            Verify imagery ${icon('externalLink', 10)}
          </a>
        </div>
      </article>

      <!-- Sponsor Card 4: Legal Whistleblower Hotline -->
      <article class="p-3.5 rounded-[var(--radius-card)] bg-[var(--surface-2)] border border-[var(--border)] space-y-2 hover:border-[var(--border-strong)] transition-colors">
        <div class="flex items-start justify-between">
          <div class="font-semibold text-[var(--text)] text-xs">SecureDrop Ingest Node</div>
          <span class="text-[10px] text-purple-600 dark:text-purple-400 font-medium">Privacy</span>
        </div>
        <p class="text-xs text-[var(--text-3)] leading-relaxed">
          On-premise zero-knowledge leak ingestion for investigative journalism newsrooms and corporate compliance ombudsmen.
        </p>
        <div class="pt-1 flex items-center justify-between text-[11px]">
          <span class="text-[var(--text-4)] font-mono">Tor v3 Onion</span>
          <a href="#sponsor-securedrop" class="text-[var(--primary)] hover:underline flex items-center gap-1 font-medium">
            Documentation ${icon('externalLink', 10)}
          </a>
        </div>
      </article>

      <div class="mt-auto pt-3 border-t border-[var(--border)] text-[11px] text-[var(--text-4)] flex items-center justify-between">
        <span>Sponsorship inquiries</span>
        <a href="#ad-policy" class="hover:underline text-[var(--text-3)]">Ad policy</a>
      </div>
    </aside>
  `;
}
