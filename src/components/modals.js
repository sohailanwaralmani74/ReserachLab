import { icon } from './icons.js';

export function renderEvidenceModal({
  excerpt = '',
  sourceId = '',
  sourceName = '',
  location = '',
  page = 1,
  sheet = '',
  row = '',
  claims = [],
}) {
  return `
    <div id="modal-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
      <div class="bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-card)] shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="p-4 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-emerald-500">${icon('shieldCheck', 16)}</span>
            <h3 class="font-bold text-sm text-[var(--text)]">Capture Evidence Citation</h3>
          </div>
          <button id="modal-close-btn" class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded">
            ${icon('x', 14)}
          </button>
        </div>

        <form id="evidence-form" class="p-4 space-y-4 text-xs">
          <input type="hidden" name="sourceId" value="${escapeHtml(sourceId)}" />
          <input type="hidden" name="sourceName" value="${escapeHtml(sourceName)}" />
          <input type="hidden" name="page" value="${page}" />
          <input type="hidden" name="sheet" value="${escapeHtml(sheet)}" />
          <input type="hidden" name="row" value="${escapeHtml(String(row))}" />

          <!-- Excerpt -->
          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Selected Excerpt (Verbatim)</label>
            <textarea
              name="excerpt"
              rows="3"
              required
              class="w-full p-2.5 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] font-sans leading-relaxed focus:outline-none focus:border-[var(--primary)] resize-none"
            >${escapeHtml(excerpt)}</textarea>
          </div>

          <!-- Location & Source -->
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="font-semibold text-[var(--text)] block">Source File</label>
              <input
                type="text"
                readonly
                value="${escapeHtml(sourceName || sourceId)}"
                class="w-full p-2 bg-[var(--surface-3)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text-2)] font-mono text-[11px]"
              />
            </div>
            <div class="space-y-1">
              <label class="font-semibold text-[var(--text)] block">Location</label>
              <input
                type="text"
                name="location"
                value="${escapeHtml(location || (page ? `Page ${page}` : ''))}"
                required
                class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] font-mono text-[11px]"
              />
            </div>
          </div>

          <!-- Relationship & Linked Claim -->
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="font-semibold text-[var(--text)] block">Relationship to Claim</label>
              <select name="relationship" class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]">
                <option value="Supporting">Supporting (Corroborates claim)</option>
                <option value="Contradicting">Contradicting (Conflicts with claim)</option>
                <option value="Reference">Reference (Contextual record)</option>
              </select>
            </div>

            <div class="space-y-1">
              <label class="font-semibold text-[var(--text)] block">Link to Claim</label>
              <select name="linkedClaimId" class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]">
                <option value="">-- No claim linked --</option>
                ${claims.map((c) => `<option value="${c.id}">${c.id}: ${escapeHtml(c.statement.slice(0, 35))}...</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Notes -->
          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Investigator Annotation / Note</label>
            <input
              type="text"
              name="notes"
              placeholder="e.g. Signature verified by maritime registry extract"
              class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]"
            />
          </div>

          <div class="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[11px] text-[var(--text-3)] italic">
            "This evidence is linked to the claim." (Evidence citation does not assert final truth).
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-[var(--border)] flex items-center justify-end gap-2">
            <button type="button" id="modal-cancel-btn" class="px-3 py-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] text-[var(--text-3)] font-medium">
              Cancel
            </button>
            <button type="submit" class="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold rounded-[var(--radius-sm)] shadow-xs transition-colors cursor-pointer">
              Record Evidence
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function renderClaimModal() {
  return `
    <div id="modal-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
      <div class="bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-card)] shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="p-4 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
          <h3 class="font-bold text-sm text-[var(--text)]">Create Investigation Claim</h3>
          <button id="modal-close-btn" class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded">
            ${icon('x', 14)}
          </button>
        </div>

        <form id="claim-form" class="p-4 space-y-4 text-xs">
          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Claim Statement</label>
            <textarea
              name="statement"
              rows="3"
              required
              placeholder="e.g. Entity X received undisclosed wire payments prior to tender award..."
              class="w-full p-2.5 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] leading-relaxed focus:outline-none focus:border-[var(--primary)] resize-none"
            ></textarea>
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Initial Investigative Status</label>
            <select name="status" class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]">
              <option value="Needs verification">Needs verification (Hypothesis pending evidence)</option>
              <option value="Supported">Supported (Substantiated by primary citations)</option>
              <option value="Partially supported">Partially supported</option>
              <option value="Conflicting">Conflicting (Opposing evidence documented)</option>
              <option value="Unsupported">Unsupported (No primary evidence found)</option>
              <option value="Unverified">Unverified</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Notes & Research Context</label>
            <input
              type="text"
              name="notes"
              placeholder="e.g. Requires corporate registrar confirmation in Cyprus"
              class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]"
            />
          </div>

          <div class="pt-3 border-t border-[var(--border)] flex items-center justify-end gap-2">
            <button type="button" id="modal-cancel-btn" class="px-3 py-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] text-[var(--text-3)] font-medium">
              Cancel
            </button>
            <button type="submit" class="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold rounded-[var(--radius-sm)] shadow-xs transition-colors cursor-pointer">
              Create Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function renderEntityModal() {
  return `
    <div id="modal-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
      <div class="bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-card)] shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="p-4 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
          <h3 class="font-bold text-sm text-[var(--text)]">Register Entity</h3>
          <button id="modal-close-btn" class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded">
            ${icon('x', 14)}
          </button>
        </div>

        <form id="entity-form" class="p-4 space-y-4 text-xs">
          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Entity Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. John Smith or Apex Logistics Corp"
              class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]"
            />
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Entity Type</label>
            <select name="type" class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]">
              <option value="Person">Person</option>
              <option value="Company">Company / Corporation</option>
              <option value="Organization">Organization / Foundation</option>
              <option value="Government body">Government body / Authority</option>
              <option value="Contract">Contract / Tender</option>
              <option value="Account">Bank Account / Financial Instrument</option>
              <option value="Location">Location / Jurisdiction</option>
              <option value="Asset">Vessel / Aircraft / Real Estate</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Description</label>
            <textarea
              name="description"
              rows="2"
              placeholder="Role in investigation, background, identifiers..."
              class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] resize-none"
            ></textarea>
          </div>

          <div class="pt-3 border-t border-[var(--border)] flex items-center justify-end gap-2">
            <button type="button" id="modal-cancel-btn" class="px-3 py-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] text-[var(--text-3)] font-medium">
              Cancel
            </button>
            <button type="submit" class="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold rounded-[var(--radius-sm)] shadow-xs transition-colors cursor-pointer">
              Register Entity
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function renderRelationshipModal({ entities = [], evidence = [] }) {
  return `
    <div id="modal-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
      <div class="bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-card)] shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="p-4 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
          <h3 class="font-bold text-sm text-[var(--text)]">Add Relationship</h3>
          <button id="modal-close-btn" class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded">
            ${icon('x', 14)}
          </button>
        </div>

        <form id="relationship-form" class="p-4 space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="font-semibold text-[var(--text)] block">From Entity</label>
              <select name="sourceId" required class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]">
                ${entities.map((e) => `<option value="${e.id}">${escapeHtml(e.name)} (${e.type})</option>`).join('')}
              </select>
            </div>

            <div class="space-y-1">
              <label class="font-semibold text-[var(--text)] block">To Entity</label>
              <select name="targetId" required class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]">
                ${entities.map((e) => `<option value="${e.id}">${escapeHtml(e.name)} (${e.type})</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Relationship Type</label>
            <input
              type="text"
              name="relationshipType"
              required
              placeholder="e.g. works for, transferred funds to, beneficial owner of, signed"
              class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]"
            />
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Linked Evidence Citation</label>
            <select name="evidenceId" class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]">
              <option value="">-- No citation --</option>
              ${evidence.map((ev) => `<option value="${ev.id}">#${ev.id} (${escapeHtml(ev.sourceName)}, ${escapeHtml(ev.location)})</option>`).join('')}
            </select>
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Date (Optional)</label>
            <input
              type="text"
              name="date"
              placeholder="YYYY-MM-DD"
              class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] font-mono text-[11px]"
            />
          </div>

          <div class="pt-3 border-t border-[var(--border)] flex items-center justify-end gap-2">
            <button type="button" id="modal-cancel-btn" class="px-3 py-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] text-[var(--text-3)] font-medium">
              Cancel
            </button>
            <button type="submit" class="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold rounded-[var(--radius-sm)] shadow-xs transition-colors cursor-pointer">
              Connect Entities
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function renderTimelineModal({ evidence = [] }) {
  return `
    <div id="modal-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
      <div class="bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-card)] shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="p-4 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
          <h3 class="font-bold text-sm text-[var(--text)]">Add Timeline Event</h3>
          <button id="modal-close-btn" class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded">
            ${icon('x', 14)}
          </button>
        </div>

        <form id="timeline-form" class="p-4 space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="font-semibold text-[var(--text)] block">Date</label>
              <input
                type="text"
                name="date"
                required
                placeholder="2024-02-14 or 2024-02"
                class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] font-mono text-[11px]"
              />
            </div>

            <div class="space-y-1">
              <label class="font-semibold text-[var(--text)] block">Precision</label>
              <select name="datePrecision" class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]">
                <option value="exact">Exact date (YYYY-MM-DD)</option>
                <option value="month">Month precision (YYYY-MM)</option>
                <option value="year">Year precision (YYYY)</option>
                <option value="approximate">Approximate / Circa</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Event Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Contract PMC-2024-887 Awarded"
              class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]"
            />
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Description</label>
            <textarea
              name="description"
              rows="2"
              placeholder="Contextual details from primary record..."
              class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] resize-none"
            ></textarea>
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Linked Evidence Citation</label>
            <select name="evidenceId" class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]">
              <option value="">-- No citation --</option>
              ${evidence.map((ev) => `<option value="${ev.id}">#${ev.id} (${escapeHtml(ev.sourceName)}, ${escapeHtml(ev.location)})</option>`).join('')}
            </select>
          </div>

          <div class="pt-3 border-t border-[var(--border)] flex items-center justify-end gap-2">
            <button type="button" id="modal-cancel-btn" class="px-3 py-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] text-[var(--text-3)] font-medium">
              Cancel
            </button>
            <button type="submit" class="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold rounded-[var(--radius-sm)] shadow-xs transition-colors cursor-pointer">
              Add to Timeline
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function renderNoteModal({ claims = [] }) {
  return `
    <div id="modal-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
      <div class="bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-card)] shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="p-4 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
          <h3 class="font-bold text-sm text-[var(--text)]">Create Investigation Note</h3>
          <button id="modal-close-btn" class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded">
            ${icon('x', 14)}
          </button>
        </div>

        <form id="note-form" class="p-4 space-y-4 text-xs">
          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Note Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Legal Basis for Sole-Source Procurement"
              class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]"
            />
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Content</label>
            <textarea
              name="content"
              rows="4"
              required
              placeholder="Observations, questions, leads to follow up..."
              class="w-full p-2.5 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] resize-none leading-relaxed"
            ></textarea>
          </div>

          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Attach to Claim (Optional)</label>
            <select name="attachedClaimId" class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]">
              <option value="">-- Standalone Note --</option>
              ${claims.map((c) => `<option value="${c.id}">${c.id}: ${escapeHtml(c.statement.slice(0, 35))}...</option>`).join('')}
            </select>
          </div>

          <div class="pt-3 border-t border-[var(--border)] flex items-center justify-end gap-2">
            <button type="button" id="modal-cancel-btn" class="px-3 py-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] text-[var(--text-3)] font-medium">
              Cancel
            </button>
            <button type="submit" class="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold rounded-[var(--radius-sm)] shadow-xs transition-colors cursor-pointer">
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function renderFolderModal() {
  return `
    <div id="modal-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
      <div class="bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-card)] shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="p-4 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
          <h3 class="font-bold text-sm text-[var(--text)]">New Research Folder</h3>
          <button id="modal-close-btn" class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded">
            ${icon('x', 14)}
          </button>
        </div>

        <form id="folder-form" class="p-4 space-y-4 text-xs">
          <div class="space-y-1">
            <label class="font-semibold text-[var(--text)] block">Folder Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Bank Statements, FOIA Disclosures"
              class="w-full p-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)]"
              autofocus
            />
          </div>

          <div class="pt-3 border-t border-[var(--border)] flex items-center justify-end gap-2">
            <button type="button" id="modal-cancel-btn" class="px-3 py-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-3)] text-[var(--text-3)] font-medium">
              Cancel
            </button>
            <button type="submit" class="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold rounded-[var(--radius-sm)] shadow-xs transition-colors cursor-pointer">
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function renderStorageModal({ storageInfo, sources = [] }) {
  return `
    <div id="modal-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
      <div class="bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-card)] shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="p-4 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-[var(--primary)]">${icon('database', 16)}</span>
            <h3 class="font-bold text-sm text-[var(--text)]">Storage & Cryptographic Integrity</h3>
          </div>
          <button id="modal-close-btn" class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded">
            ${icon('x', 14)}
          </button>
        </div>

        <div class="p-4 space-y-4 text-xs">
          <!-- Storage Bar -->
          <div class="p-3 bg-[var(--surface-2)] rounded-[var(--radius-card)] border border-[var(--border)] space-y-2">
            <div class="flex items-center justify-between font-mono text-[11px]">
              <span class="text-[var(--text-3)]">Browser IndexedDB Storage</span>
              <span class="font-bold text-[var(--text)]">${storageInfo.usageMB} MB used / ${storageInfo.quotaMB} MB available</span>
            </div>
            <div class="w-full bg-[var(--surface-3)] h-2 rounded-full overflow-hidden">
              <div class="bg-[var(--primary)] h-full" style="width: ${Math.max(1, storageInfo.percent)}%;"></div>
            </div>
          </div>

          <!-- SHA-256 Rule Notice -->
          <div class="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-[var(--radius-sm)] space-y-1 text-amber-900 dark:text-amber-200">
            <div class="font-semibold flex items-center gap-1.5">
              ${icon('shieldCheck', 14)}
              <span>Forensic Integrity Principle</span>
            </div>
            <p class="text-[11px] leading-relaxed">
              SHA-256 proves digital file integrity and uncorrupted chain-of-custody, not semantic truth of contents.
            </p>
          </div>

          <!-- Sources Hashes -->
          <div class="space-y-1.5">
            <span class="font-mono text-[10px] uppercase text-[var(--text-4)] font-semibold">Active Document Hashes (${sources.length})</span>
            <div class="max-h-48 overflow-y-auto border border-[var(--border)] rounded-[var(--radius-sm)] divide-y divide-[var(--border)] font-mono text-[10px]">
              ${sources.map((s) => `
                <div class="p-2 flex items-center justify-between gap-2 hover:bg-[var(--surface-2)]">
                  <span class="font-bold text-[var(--primary)] flex-none">${s.id}</span>
                  <span class="truncate text-[var(--text)]">${escapeHtml(s.name)}</span>
                  <span class="text-[var(--text-4)] flex-none">${s.sha256 ? s.sha256.slice(0, 16) + '...' : 'pending'}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="pt-2 border-t border-[var(--border)] flex justify-end">
            <button type="button" id="modal-close-ok-btn" class="px-4 py-1.5 bg-[var(--primary)] text-white font-semibold rounded-[var(--radius-sm)]">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderHelpModal() {
  return `
    <div id="modal-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
      <div class="bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-card)] shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="p-4 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-[var(--primary)]">${icon('help', 16)}</span>
            <h3 class="font-bold text-sm text-[var(--text)]">Investigation OS Methodology & Shortcuts</h3>
          </div>
          <button id="modal-close-btn" class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded">
            ${icon('x', 14)}
          </button>
        </div>

        <div class="p-5 space-y-4 text-xs leading-relaxed max-h-[75vh] overflow-y-auto">
          <!-- Investigation Workflow -->
          <div class="space-y-1.5">
            <h4 class="font-bold text-[var(--text)] uppercase font-mono text-[11px] text-[var(--primary)]">Investigation Lifecycle</h4>
            <div class="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[11px] text-[var(--text-2)] font-mono space-y-1">
              <div>Find → Capture → Read → Save → Search → Connect → Compare → Verify → Form Finding → Export</div>
              <div class="text-[10px] text-[var(--text-4)] italic">Nonlinear: you may enter, revisit, or export at any stage.</div>
            </div>
          </div>

          <!-- Shortcuts -->
          <div class="space-y-2">
            <h4 class="font-bold text-[var(--text)] uppercase font-mono text-[11px]">Keyboard Shortcuts</h4>
            <div class="border border-[var(--border)] rounded-[var(--radius-sm)] divide-y divide-[var(--border)] text-xs">
              <div class="p-2 flex items-center justify-between">
                <span class="text-[var(--text)]">Global Search & Command Palette</span>
                <kbd class="px-1.5 py-0.5 bg-[var(--surface-3)] border border-[var(--border)] rounded font-mono text-[10px]">Ctrl + K / Cmd + K</kbd>
              </div>
              <div class="p-2 flex items-center justify-between">
                <span class="text-[var(--text)]">Dismiss / Close active modal</span>
                <kbd class="px-1.5 py-0.5 bg-[var(--surface-3)] border border-[var(--border)] rounded font-mono text-[10px]">Escape</kbd>
              </div>
              <div class="p-2 flex items-center justify-between">
                <span class="text-[var(--text)]">Add text selection as Evidence</span>
                <span class="text-[var(--text-4)]">Select text in reader → click floating badge</span>
              </div>
            </div>
          </div>

          <!-- Integrity Mandate -->
          <div class="space-y-1.5">
            <h4 class="font-bold text-[var(--text)] uppercase font-mono text-[11px]">Forensic Principles</h4>
            <p class="text-xs text-[var(--text-3)]">
              This system does NOT declare semantic truth using generative models. Verification operates deterministically via exact quote matching, duplicate SHA-256 detection, timeline consistency, and conflicting citation cross-references.
            </p>
          </div>

          <div class="pt-3 border-t border-[var(--border)] flex justify-end">
            <button type="button" id="modal-close-ok-btn" class="px-4 py-1.5 bg-[var(--primary)] text-white font-semibold rounded-[var(--radius-sm)] cursor-pointer">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderClearResearchModal({ investigationName = 'Untitled Investigation' } = {}) {
  return `
    <div id="modal-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div class="bg-[var(--surface)] border border-red-500/30 rounded-[var(--radius-card)] shadow-2xl max-w-md w-full overflow-hidden">
        <div class="p-4 border-b border-[var(--border)] bg-red-50 dark:bg-red-950/40 flex items-center justify-between">
          <div class="flex items-center gap-2 text-red-600 dark:text-red-400">
            ${icon('trash', 18)}
            <h3 class="font-bold text-sm">Clear Research Workspace</h3>
          </div>
          <button id="modal-close-btn" class="p-1 text-[var(--text-4)] hover:text-[var(--text)] rounded cursor-pointer" title="Cancel">
            ${icon('x', 14)}
          </button>
        </div>

        <div class="p-5 space-y-4 text-xs">
          <div class="space-y-2">
            <p class="font-semibold text-sm text-[var(--text)]">
              Are you sure you want to clear this research case?
            </p>
            <p class="text-[var(--text-3)] leading-relaxed">
              Confirming will permanently remove all case research data for <strong class="text-[var(--text)]">"${escapeHtml(investigationName)}"</strong> from:
            </p>
            <div class="p-3 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] space-y-1.5">
              <div class="flex items-center gap-2 text-[var(--text)] font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span>Local Storage (localStorage preferences & UI cache)</span>
              </div>
              <div class="flex items-center gap-2 text-[var(--text)] font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span>Session Storage (sessionStorage active states)</span>
              </div>
              <div class="flex items-center gap-2 text-[var(--text)] font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span>IndexedDB Storage (documents, hashes, evidence, claims, entities, timeline, notes)</span>
              </div>
            </div>
            <p class="text-[11px] text-[var(--text-4)] italic">
              This action is immediate and cannot be recovered unless you previously saved an Investigation Archive (.json).
            </p>
          </div>

          <div class="pt-3 border-t border-[var(--border)] flex items-center justify-end gap-2">
            <button
              type="button"
              id="cancel-clear-btn"
              class="px-3.5 py-1.5 bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[var(--text-2)] font-medium rounded-[var(--radius-sm)] transition-colors cursor-pointer border border-[var(--border)]"
            >
              Cancel
            </button>
            <button
              type="button"
              id="confirm-clear-btn"
              class="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-[var(--radius-sm)] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              ${icon('trash', 13)}
              <span>Yes, Clear Research</span>
            </button>
          </div>
        </div>
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
