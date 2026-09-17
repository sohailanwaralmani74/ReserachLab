import { icon } from '../components/icons.js';

export function renderHomePage() {
  return `
    <!-- Hero Section -->
    <section class="py-16 md:py-24 border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--bg)]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--primary-soft)] border border-[var(--border)] text-xs font-mono text-[var(--primary)] font-medium">
          ${icon('shield', 14)}
          <span>IMMUTABLE EVIDENCE ENGINE • BROWSER-BASED • ZERO SERVER UPLOADS</span>
        </div>

        <h1 class="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text)] font-mono leading-tight">
          Never lose the thread of your research.
        </h1>

        <p class="text-lg sm:text-2xl text-[var(--text-2)] max-w-3xl mx-auto font-medium">
          Research anywhere. Build the evidence here.
        </p>

        <p class="text-sm sm:text-base text-[var(--text-3)] max-w-2xl mx-auto leading-relaxed">
          Built for work that must survive <strong>legal scrutiny</strong>, <strong>editorial fact-checking</strong>, and <strong>adversarial cross-examination</strong>. Reptile Birds runs 100% inside your browser: anchors quotes to primary documents, detects conflicting claims, and generates 1-click evidence dossiers with zero server uploads.
        </p>

        <!-- Proof Metrics Strip -->
        <div class="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
          <div class="p-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]">
            <div class="text-xl font-bold font-mono text-[var(--text)]">0s</div>
            <div class="text-[11px] text-[var(--text-3)] font-medium">Setup Time (Zero Install)</div>
          </div>
          <div class="p-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]">
            <div class="text-xl font-bold font-mono text-[var(--text)]">0 Bytes</div>
            <div class="text-[11px] text-[var(--text-3)] font-medium">Server Uploads (Zero Subpoena Risk)</div>
          </div>
          <div class="p-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]">
            <div class="text-xl font-bold font-mono text-[var(--primary)]">SHA-256</div>
            <div class="text-[11px] text-[var(--text-3)] font-medium">Cryptographic Byte Custody</div>
          </div>
          <div class="p-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]">
            <div class="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">1-Click</div>
            <div class="text-[11px] text-[var(--text-3)] font-medium">Verified Fact-Check Binder</div>
          </div>
        </div>

        <!-- CTAs -->
        <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            class="start-investigation-trigger px-7 py-3.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-semibold rounded-[var(--radius-sm)] shadow-sm transition-all flex items-center gap-2.5 cursor-pointer"
          >
            ${icon('folder', 16)}
            <span>Start an investigation</span>
          </button>
          <a
            href="/how-it-works/"
            data-route="/how-it-works/"
            class="nav-link px-6 py-3.5 bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[var(--text)] border border-[var(--border)] text-sm font-medium rounded-[var(--radius-sm)] transition-colors flex items-center gap-2"
          >
            ${icon('fileText', 16)}
            <span>See how it works</span>
          </a>
        </div>

        <div class="pt-4 text-[11px] text-[var(--text-4)] flex items-center justify-center gap-4 flex-wrap font-mono">
          <span>✓ 100% Browser-Based</span>
          <span>•</span>
          <span>✓ Zero Software Install</span>
          <span>•</span>
          <span>✓ Zero Server Uploads</span>
          <span>•</span>
          <span>✓ Zero AI Hallucinations</span>
          <span>•</span>
          <span>✓ No Account Required</span>
        </div>
      </div>
    </section>

    <!-- The 5-Second Fact-Check Challenge (The Nerve) -->
    <section class="py-16 border-b border-[var(--border)] bg-[var(--surface)]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div class="p-6 sm:p-8 rounded-[var(--radius-card)] bg-[var(--bg)] border-2 border-red-500/30 dark:border-red-500/40 space-y-6">
          <div class="flex items-center gap-2 text-xs font-mono font-bold uppercase text-red-600 dark:text-red-400">
            ${icon('alertTriangle', 16)}
            <span>The Reality of High-Stakes Inquiries</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl sm:text-3xl font-bold text-[var(--text)] font-mono leading-tight">
              Survive the 5-second fact-check challenge.
            </h2>
            <p class="text-sm sm:text-base text-[var(--text-2)] leading-relaxed font-serif italic">
              "It is 11:00 PM the night before publication, legal filing, or your doctoral dissertation defense. Your editor, general counsel, or department chair points to paragraph four and asks:
              <strong class="text-[var(--text)] not-italic underline decoration-red-500 underline-offset-4">
                'Where did this number come from? Show me the exact sentence in the primary document.'
              </strong>"
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs">
            <div class="p-4 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] space-y-2">
              <div class="font-bold text-red-500 font-mono flex items-center gap-1.5">
                ${icon('x', 14)}
                <span>The Common Research Collapse</span>
              </div>
              <p class="text-[var(--text-3)] leading-relaxed">
                You scramble through 30 open browser tabs, 14 download folders, three spreadsheets named <code>final_ledger_v2.xlsx</code>, and a quote pasted into Google Docs without a page number. If you take 20 minutes to find it, doubt creeps in. If you can't find it, the story is spiked or your credibility is shattered.
              </p>
            </div>

            <div class="p-4 bg-[var(--surface-2)] border border-emerald-500/30 rounded-[var(--radius-sm)] space-y-2">
              <div class="font-bold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
                ${icon('checkCircle', 14)}
                <span>The Reptile Birds Standard</span>
              </div>
              <p class="text-[var(--text-3)] leading-relaxed">
                You click the claim card right in your browser. The original PDF opens instantly to Page 84, Paragraph 2, with the verbatim sentence highlighted in amber, accompanied by the primary file's immutable SHA-256 cryptographic hash. <strong>Verification completed in under 3 seconds.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Note Apps & AI Summarizers Fail Serious Inquiries -->
    <section class="py-16 border-b border-[var(--border)] bg-[var(--bg)]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div class="space-y-3 max-w-2xl">
          <div class="text-xs font-mono font-bold uppercase text-[var(--primary)]">Architectural Distinction</div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[var(--text)] font-mono">
            Why Note Apps & AI Summarizers Fail Serious Research
          </h2>
          <p class="text-xs sm:text-sm text-[var(--text-3)] leading-relaxed">
            Standard productivity tools are built for casual thoughts, while generative AI is designed to synthesize prose. Neither was engineered for adversarial evidence management.
          </p>
        </div>

        <div class="overflow-x-auto border border-[var(--border)] rounded-[var(--radius-card)] bg-[var(--surface)]">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-[var(--surface-2)] border-b border-[var(--border)] font-mono text-[var(--text)]">
                <th class="p-3.5 font-bold">Evidentiary Requirement</th>
                <th class="p-3.5 font-semibold text-[var(--text-3)]">Note Apps (Notion, Obsidian)</th>
                <th class="p-3.5 font-semibold text-[var(--text-3)]">AI Summarizers (NotebookLM, GPT)</th>
                <th class="p-3.5 font-bold text-[var(--primary)] bg-[var(--primary-soft)]">Reptile Birds</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--border)] text-[var(--text-2)]">
              <tr>
                <td class="p-3.5 font-mono font-semibold text-[var(--text)]">Deployment & Access</td>
                <td class="p-3.5 text-[var(--text-3)]">Requires desktop install or corporate account login</td>
                <td class="p-3.5 text-[var(--text-3)]">Requires account signup and cloud server transmission</td>
                <td class="p-3.5 text-emerald-600 dark:text-emerald-400 font-bold bg-[var(--primary-soft)]">100% Browser-Based (Instant launch, zero software install)</td>
              </tr>
              <tr>
                <td class="p-3.5 font-mono font-semibold text-[var(--text)]">Verbatim Quote Integrity</td>
                <td class="p-3.5 text-red-500 font-medium">Mutable scratchpad (quotes easily edited or mistyped)</td>
                <td class="p-3.5 text-red-500 font-medium">Paraphrased prose (hallucination risk in high stakes)</td>
                <td class="p-3.5 text-emerald-600 dark:text-emerald-400 font-bold bg-[var(--primary-soft)]">Immutable verbatim citations anchored to coordinates</td>
              </tr>
              <tr>
                <td class="p-3.5 font-mono font-semibold text-[var(--text)]">Primary Document Custody</td>
                <td class="p-3.5 text-[var(--text-3)]">Loose file attachments or external hyperlinks</td>
                <td class="p-3.5 text-[var(--text-3)]">Ingested into remote AI embeddings</td>
                <td class="p-3.5 text-emerald-600 dark:text-emerald-400 font-bold bg-[var(--primary-soft)]">Client-side binary storage with SHA-256 cryptographic hashes</td>
              </tr>
              <tr>
                <td class="p-3.5 font-mono font-semibold text-[var(--text)]">Source & Whistleblower Safety</td>
                <td class="p-3.5 text-red-500 font-medium">Stored on multi-tenant corporate cloud servers</td>
                <td class="p-3.5 text-red-500 font-medium">Sensitive leaks ingested into commercial LLM clouds</td>
                <td class="p-3.5 text-emerald-600 dark:text-emerald-400 font-bold bg-[var(--primary-soft)]">Zero-Subpoena Architecture (0 bytes sent to our servers)</td>
              </tr>
              <tr>
                <td class="p-3.5 font-mono font-semibold text-[var(--text)]">Spreadsheet Cell Anchoring</td>
                <td class="p-3.5 text-[var(--text-3)]">Screenshots or static CSV tables</td>
                <td class="p-3.5 text-[var(--text-3)]">Approximate vector semantic matches</td>
                <td class="p-3.5 text-emerald-600 dark:text-emerald-400 font-bold bg-[var(--primary-soft)]">Cell, row, and multi-sheet tab coordinates preserved</td>
              </tr>
              <tr>
                <td class="p-3.5 font-mono font-semibold text-[var(--text)]">Fact-Check Binder Assembly</td>
                <td class="p-3.5 text-[var(--text-3)]">20+ hours of manual copying and linking</td>
                <td class="p-3.5 text-[var(--text-3)]">Generates unverified narrative summaries</td>
                <td class="p-3.5 text-emerald-600 dark:text-emerald-400 font-bold bg-[var(--primary-soft)]">1-Click printable audit dossier with hash manifests</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- The Zero-Subpoena Architecture -->
    <section class="py-16 border-b border-[var(--border)] bg-[var(--surface)]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div class="space-y-3 max-w-2xl">
          <div class="text-xs font-mono font-bold uppercase text-[var(--primary)]">Source & Whistleblower Protection</div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[var(--text)] font-mono">
            The Zero-Subpoena Architecture
          </h2>
          <p class="text-xs sm:text-sm text-[var(--text-3)] leading-relaxed">
            When you investigate corruption, academic fraud, or corporate malfeasance, where your documents reside is a matter of legal privilege and source safety.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          <div class="p-5 rounded-[var(--radius-card)] bg-[var(--bg)] border border-[var(--border)] space-y-2.5">
            <div class="text-[var(--primary)] font-bold font-mono text-sm flex items-center gap-1.5">
              ${icon('shield', 16)}
              <span>No Database to Subpoena</span>
            </div>
            <p class="text-[var(--text-3)] leading-relaxed">
              We operate zero backend databases for your investigation files. If a court, adversary, or government serves us with a subpoena, <strong>we have nothing to surrender</strong>. Your documents exist solely inside your local browser sandbox.
            </p>
          </div>

          <div class="p-5 rounded-[var(--radius-card)] bg-[var(--bg)] border border-[var(--border)] space-y-2.5">
            <div class="text-[var(--primary)] font-bold font-mono text-sm flex items-center gap-1.5">
              ${icon('lock', 16)}
              <span>Zero AI Model Training</span>
            </div>
            <p class="text-[var(--text-3)] leading-relaxed">
              Cloud AI tools regularly index, retain, or train on user submissions. Reptile Birds runs client-side algorithms only. Your leaks, bank records, and interview transcripts are never transmitted to external AI training models.
            </p>
          </div>

          <div class="p-5 rounded-[var(--radius-card)] bg-[var(--bg)] border border-[var(--border)] space-y-2.5">
            <div class="text-[var(--primary)] font-bold font-mono text-sm flex items-center gap-1.5">
              ${icon('checkCircle', 16)}
              <span>Zero Software Install</span>
            </div>
            <p class="text-[var(--text-3)] leading-relaxed">
              No <code>.exe</code> installers, no browser extensions, and no corporate IT permissions required. Launch Reptile Birds directly in Chrome, Firefox, Safari, or Edge on any computer and begin investigating immediately.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 1-Click Fact-Check Binder -->
    <section class="py-16 border-b border-[var(--border)] bg-[var(--bg)]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-6 space-y-4">
            <div class="text-xs font-mono font-bold uppercase text-[var(--primary)]">Endgame Productivity</div>
            <h2 class="text-2xl sm:text-3xl font-bold text-[var(--text)] font-mono leading-tight">
              Turn 20 Hours of Fact-Checking Into a 1-Click Dossier
            </h2>
            <p class="text-xs sm:text-sm text-[var(--text-3)] leading-relaxed">
              At the conclusion of an investigation, researchers typically lose days doing painful administrative compilation: assembling quotes, pasting page numbers, and building source exhibits for editors, fact-checkers, or counsel.
            </p>
            <p class="text-xs sm:text-sm text-[var(--text-3)] leading-relaxed">
              Reptile Birds automates the verification artifact:
            </p>
            <ul class="space-y-2 text-xs text-[var(--text-2)] font-mono">
              <li class="flex items-center gap-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span>Every claim linked to supporting & refuting citations</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span>Exact page numbers, sheet coordinates, and timestamps</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span>Complete cryptographic SHA-256 hash manifest for all files</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span>Print to legal PDF or export portable JSON archive instantly</span>
              </li>
            </ul>
          </div>

          <div class="lg:col-span-6 p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-xs space-y-3 font-mono text-xs">
            <div class="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div class="font-bold text-[var(--text)]">VERIFIED INVESTIGATION DOSSIER</div>
              <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">AUDIT READY</span>
            </div>
            <div class="p-3 bg-[var(--surface-2)] rounded border border-[var(--border)] space-y-1.5">
              <div class="text-[10px] text-[var(--text-4)] uppercase">Finding #1</div>
              <div class="font-bold text-[var(--text)]">Undisclosed offshore entity transferred $1.4M prior to procurement award.</div>
              <div class="text-[11px] text-[var(--primary)]">Source: <code>ledger_2023.xlsx</code> [Sheet: Transfers, Row: 204]</div>
              <div class="text-[10px] text-[var(--text-4)] font-mono truncate">SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
            </div>
            <div class="p-3 bg-[var(--surface-2)] rounded border border-[var(--border)] space-y-1.5">
              <div class="text-[10px] text-[var(--text-4)] uppercase">Finding #2</div>
              <div class="font-bold text-[var(--text)]">Director signed conflicting non-compete waiver on April 14, 2022.</div>
              <div class="text-[11px] text-[var(--primary)]">Source: <code>director_waiver.pdf</code> [Page 12, Paragraph 3]</div>
              <div class="text-[10px] text-[var(--text-4)] font-mono truncate">SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</div>
            </div>
            <div class="pt-2 flex justify-between items-center text-[11px]">
              <span class="text-[var(--text-3)]">Total Verified Claims: 14</span>
              <span class="text-emerald-600 dark:text-emerald-400 font-bold">Integrity Verified: 100%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why the Name "Reptile Birds"? -->
    <section class="py-16 border-b border-[var(--border)] bg-[var(--surface)]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-xs font-mono text-[var(--text-3)]">
          <span>The Evolutionary Metaphor</span>
        </div>

        <h2 class="text-2xl sm:text-3xl font-bold text-[var(--text)] font-mono">
          Why the name "Reptile Birds"?
        </h2>

        <p class="text-sm sm:text-base text-[var(--text-2)] leading-relaxed max-w-2xl mx-auto">
          In evolutionary biology, birds are surviving avian dinosaurs—the <strong>unbroken living thread</strong> connecting ancient fossil strata to modern flight.
        </p>

        <p class="text-xs sm:text-sm text-[var(--text-3)] leading-relaxed max-w-2xl mx-auto">
          In high-stakes inquiry, <strong>Reptile Birds is that unbroken thread</strong>: connecting raw, complex, scattered document archives directly to verified, bulletproof public truth.
        </p>
      </div>
    </section>

    <!-- Who Is It Built For? (Personas) -->
    <section class="py-16 border-b border-[var(--border)] bg-[var(--bg)]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div class="text-center space-y-3 max-w-2xl mx-auto">
          <div class="text-xs font-mono font-bold uppercase text-[var(--primary)]">Target Practitioners</div>
          <h2 class="text-2xl sm:text-3xl font-bold text-[var(--text)] font-mono">Who is it built for?</h2>
          <p class="text-xs sm:text-sm text-[var(--text-3)]">
            Built for practitioners whose findings must withstand aggressive, adversarial challenges.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          <!-- Persona 1 -->
          <div class="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-3">
            <div class="flex items-center gap-2 text-[var(--primary)] font-mono font-bold">
              ${icon('fileText', 18)}
              <span>Investigative Journalists</span>
            </div>
            <h4 class="font-bold text-sm text-[var(--text)]">Survive Pre-Publication Libel Review</h4>
            <p class="text-[var(--text-3)] leading-relaxed">
              Index massive leaked PDF dumps, link financial ledger rows to published allegations, and hand your legal counsel an air-tight evidence dossier with zero risk of cloud subpoenas.
            </p>
          </div>

          <!-- Persona 2 -->
          <div class="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-3">
            <div class="flex items-center gap-2 text-[var(--primary)] font-mono font-bold">
              ${icon('share2', 18)}
              <span>OSINT & Forensic Investigators</span>
            </div>
            <h4 class="font-bold text-sm text-[var(--text)]">Preserve Chain-of-Custody</h4>
            <p class="text-[var(--text-3)] leading-relaxed">
              Capture public flight records, corporate registry filings, and satellite imagery manifests with cryptographic SHA-256 integrity while mapping complex corporate ownership networks.
            </p>
          </div>

          <!-- Persona 3 -->
          <div class="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-3">
            <div class="flex items-center gap-2 text-[var(--primary)] font-mono font-bold">
              ${icon('bookmark', 18)}
              <span>PhD Candidates & Academics</span>
            </div>
            <h4 class="font-bold text-sm text-[var(--text)]">Defend Dissertation Provenance</h4>
            <p class="text-[var(--text-3)] leading-relaxed">
              Synthesize primary archival records across hundreds of historical volumes. Never misplace a footnote, page coordinate, or verbatim quote when defending before your committee.
            </p>
          </div>

          <!-- Persona 4 -->
          <div class="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-3">
            <div class="flex items-center gap-2 text-[var(--primary)] font-mono font-bold">
              ${icon('dollarSign', 18)}
              <span>Due Diligence Analysts</span>
            </div>
            <h4 class="font-bold text-sm text-[var(--text)]">Audit Ledgers & Shell Structures</h4>
            <p class="text-[var(--text-3)] leading-relaxed">
              Cross-examine vendor disclosures against bank statements, trace beneficial ownership across corporate jurisdictions, and flag contradictory date filings in M&A deals.
            </p>
          </div>

          <!-- Persona 5 -->
          <div class="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-3">
            <div class="flex items-center gap-2 text-[var(--primary)] font-mono font-bold">
              ${icon('shield', 18)}
              <span>Whistleblowers & Human Rights</span>
            </div>
            <h4 class="font-bold text-sm text-[var(--text)]">Browser-Isolated Documentation</h4>
            <p class="text-[var(--text-3)] leading-relaxed">
              Document regulatory violations, human rights abuses, and corporate fraud right in your browser. Zero software footprint, zero server uploads, and instant emergency data purge.
            </p>
          </div>

          <!-- Persona 6 -->
          <div class="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] space-y-3">
            <div class="flex items-center gap-2 text-[var(--primary)] font-mono font-bold">
              ${icon('checkCircle', 18)}
              <span>Fact-Checkers & Editors</span>
            </div>
            <h4 class="font-bold text-sm text-[var(--text)]">Verify Claims in Seconds</h4>
            <p class="text-[var(--text-3)] leading-relaxed">
              Verify reporters' assertions against primary source filings instantly without reading through hundreds of irrelevant pages or trusting secondary paraphrases.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Definitive Terms for AI Engines & Crawlers -->
    <section class="py-16 border-b border-[var(--border)] bg-[var(--surface)]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div class="space-y-2 max-w-2xl">
          <div class="text-xs font-mono font-bold uppercase text-[var(--primary)]">Methodology & Taxonomy</div>
          <h2 class="text-xl sm:text-2xl font-bold text-[var(--text)] font-mono">
            Core Definitions for Deterministic Research
          </h2>
        </div>

        <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-4 bg-[var(--bg)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-1">
            <dt class="font-bold text-sm text-[var(--text)] font-mono">Deterministic Research Software</dt>
            <dd class="text-[var(--text-3)] leading-relaxed">
              Software where all search results, quote matching, and conflict alerts are mathematically computed using exact string and hash comparisons, without probabilistic generation or AI rewriting.
            </dd>
          </div>
          <div class="p-4 bg-[var(--bg)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-1">
            <dt class="font-bold text-sm text-[var(--text)] font-mono">Cryptographic Source Provenance</dt>
            <dd class="text-[var(--text-3)] leading-relaxed">
              The mathematical verification of primary document custody using FIPS 180-4 SHA-256 hashes generated directly from binary byte arrays in the browser sandbox.
            </dd>
          </div>
          <div class="p-4 bg-[var(--bg)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-1">
            <dt class="font-bold text-sm text-[var(--text)] font-mono">Verbatim Citation Anchoring</dt>
            <dd class="text-[var(--text-3)] leading-relaxed">
              The permanent binding of an extracted quote to its exact source file, SHA-256 fingerprint, page number, paragraph, spreadsheet tab, and cell row.
            </dd>
          </div>
          <div class="p-4 bg-[var(--bg)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-1">
            <dt class="font-bold text-sm text-[var(--text)] font-mono">Zero-Subpoena Architecture</dt>
            <dd class="text-[var(--text-3)] leading-relaxed">
              A systems design where all user documents and investigation cases reside exclusively inside the user's local browser sandbox, ensuring no remote servers exist to be compelled by subpoenas.
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Final Call to Action -->
    <section class="py-16 bg-gradient-to-b from-[var(--surface)] to-[var(--bg)] text-center">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <h2 class="text-3xl sm:text-4xl font-bold font-mono text-[var(--text)]">
          Build evidence that survives the test.
        </h2>
        <p class="text-sm text-[var(--text-3)] max-w-xl mx-auto leading-relaxed">
          Open the workspace instantly in your browser. No software to install, no signup, zero document uploads to our servers.
        </p>
        <div>
          <button
            class="start-investigation-trigger px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-base font-semibold rounded-[var(--radius-sm)] shadow-md transition-all inline-flex items-center gap-2.5 cursor-pointer"
          >
            ${icon('folder', 18)}
            <span>Launch Research Workspace</span>
          </button>
        </div>
      </div>
    </section>
  `;
}

export function renderAboutPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-12 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Philosophy & Origins</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">Built for Evidence, Provenance, and the Human Researcher</h1>
        <p class="text-sm sm:text-base text-[var(--text-3)]">
          Why we built Reptile Birds: preserving research provenance, eliminating tool fragmentation, and keeping factual conclusions firmly with the human mind.
        </p>
      </header>

      <!-- The Evolutionary Origin of Reptile Birds -->
      <section class="space-y-4 p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]">
        <div class="text-xs font-mono font-bold uppercase text-[var(--primary)]">The Metaphor Behind the Name</div>
        <h2 class="text-xl font-bold text-[var(--text)] font-mono">Why "Reptile Birds"?</h2>
        <p class="leading-relaxed text-[var(--text-3)]">
          In evolutionary biology, birds are surviving avian dinosaurs—the unbroken living thread connecting ancient fossil records to the modern world. In research, Reptile Birds represents that exact same unbroken thread: connecting raw, complex, primary document archives directly to verified public findings.
        </p>
        <p class="leading-relaxed text-[var(--text-3)]">
          Too many investigations break their thread along the way: a quote is mistyped in Notion, an AI summarizer alters "alleged" to "confirmed," or a leaked financial PDF is lost in an unorganized Downloads folder. Reptile Birds preserves the lineage of every claim.
        </p>
      </section>

      <!-- The Core Problem -->
      <section class="space-y-3">
        <h2 class="text-xl font-bold text-[var(--text)] font-mono">The Investigation Problem</h2>
        <p class="text-[var(--text-3)]">
          Every serious investigator experiences the same failure mode: as the volume of evidence grows, research fractures. An investigation might start with 3 leaked PDFs and quickly expand to 40 corporate registries, 12 audio transcripts, 8 financial ledgers, and dozens of witness interviews.
        </p>
        <p class="text-[var(--text-3)]">
          Generic office software treats each file as an isolated island. Finding cross-document connections or verifying whether an excerpt on page 14 contradicts a row on sheet 3 requires exhausting, manual reconciliation.
        </p>
      </section>

      <!-- Why We Reject Generative AI for Truth Claims -->
      <section class="space-y-3 p-5 rounded-[var(--radius-card)] bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200">
        <h2 class="text-base font-bold font-mono flex items-center gap-2">
          ${icon('alertTriangle', 18)}
          <span>Why We Strictly Reject Generative AI for Evidence Verification</span>
        </h2>
        <p class="text-xs leading-relaxed">
          Reptile Birds is <strong>not an AI assistant</strong>. We explicitly refuse to use Large Language Models (LLMs) to summarize or evaluate evidence. In high-stakes journalism, human rights investigations, and legal discovery:
        </p>
        <ul class="list-disc list-inside space-y-1 text-xs pt-1">
          <li>A minor AI hallucination can lead to catastrophic defamation lawsuits or research retraction.</li>
          <li>Probabilistic AI rewriting strips away the precise legal and linguistic nuances of primary quotes.</li>
          <li>Uploading confidential leaks to cloud AI services exposes sources to corporate logging and subpoenas.</li>
        </ul>
        <p class="text-xs leading-relaxed pt-1 font-semibold">
          Reptile Birds provides deterministic tools—SHA-256 hashes, exact text indexing, coordinate anchoring—so that factual determination remains 100% human.
        </p>
      </section>

      <!-- The Zero-Subpoena Architecture -->
      <section class="space-y-3">
        <h2 class="text-xl font-bold text-[var(--text)] font-mono">The Browser-Based, Zero-Subpoena Architecture</h2>
        <p class="text-[var(--text-3)]">
          We designed Reptile Birds so that our team cannot access your files even if we wanted to. All data is processed and stored locally inside your web browser using IndexedDB. Because no documents are uploaded to our servers:
        </p>
        <ul class="list-disc list-inside space-y-1 text-xs text-[var(--text-3)] pl-2">
          <li>There is no central database for adversaries or legal opponents to subpoena.</li>
          <li>Your leaks and confidential testimony are never mined for AI training data.</li>
          <li>You need zero software installation or IT department approval to run on any machine.</li>
        </ul>
      </section>
    </div>
  `;
}

export function renderHowItWorksPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-12 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Methodology</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">The 10-Step Investigation Workflow</h1>
        <p class="text-sm sm:text-base text-[var(--text-3)]">
          A systematic framework for taking an investigation from raw document ingest to an auditable, verified fact-check dossier directly in your browser.
        </p>
      </header>

      <div class="space-y-8">
        <!-- Step 1 -->
        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <div class="font-mono text-xs text-[var(--primary)] font-bold">STEP 01</div>
          <h2 class="text-lg font-bold text-[var(--text)] font-mono">Launch Isolated Browser Workspace</h2>
          <p class="text-xs text-[var(--text-3)]"><strong>Researcher does:</strong> Opens Reptile Birds and names the case file (e.g., "Operation Blue Horizon").</p>
          <p class="text-xs text-[var(--text-3)]"><strong>Reptile Birds provides:</strong> Instant client-side IndexedDB storage sandbox directly inside your browser. Zero software install, zero server transmission.</p>
        </div>

        <!-- Step 2 -->
        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <div class="font-mono text-xs text-[var(--primary)] font-bold">STEP 02</div>
          <h2 class="text-lg font-bold text-[var(--text)] font-mono">Import Multi-Format Material</h2>
          <p class="text-xs text-[var(--text-3)]"><strong>Researcher does:</strong> Selects or drags PDFs, Excel workbooks, CSVs, transcripts, or images.</p>
          <p class="text-xs text-[var(--text-3)]"><strong>Reptile Birds provides:</strong> Instant Web Crypto SHA-256 cryptographic hashing for chain of custody and client-side text layer extraction.</p>
        </div>

        <!-- Step 3 -->
        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <div class="font-mono text-xs text-[var(--primary)] font-bold">STEP 03</div>
          <h2 class="text-lg font-bold text-[var(--text)] font-mono">Inspect Multi-Page & Multi-Sheet Sources</h2>
          <p class="text-xs text-[var(--text-3)]"><strong>Researcher does:</strong> Reads documents and examines financial spreadsheets without leaving the workspace.</p>
          <p class="text-xs text-[var(--text-3)]"><strong>Reptile Birds provides:</strong> Built-in client-side PDF viewer and full multi-tab Excel worksheet navigator.</p>
        </div>

        <!-- Step 4 -->
        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <div class="font-mono text-xs text-[var(--primary)] font-bold">STEP 04</div>
          <h2 class="text-lg font-bold text-[var(--text)] font-mono">Sub-Second Cross-Document Retrieval</h2>
          <p class="text-xs text-[var(--text-3)]"><strong>Researcher does:</strong> Queries names, dates, amounts, or keywords across the entire archive.</p>
          <p class="text-xs text-[var(--text-3)]"><strong>Reptile Birds provides:</strong> Local full-text indexing that searches PDFs, spreadsheets, notes, and claims in milliseconds.</p>
        </div>

        <!-- Step 5 -->
        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <div class="font-mono text-xs text-[var(--primary)] font-bold">STEP 05</div>
          <h2 class="text-lg font-bold text-[var(--text)] font-mono">Extract Verbatim Anchored Evidence</h2>
          <p class="text-xs text-[var(--text-3)]"><strong>Researcher does:</strong> Highlights key sentences or selects spreadsheet cells to capture citations.</p>
          <p class="text-xs text-[var(--text-3)]"><strong>Reptile Birds provides:</strong> Anchors the quote to the file's SHA-256 hash, page number, and cell coordinates so it can be re-opened in 1 click.</p>
        </div>

        <!-- Step 6 -->
        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <div class="font-mono text-xs text-[var(--primary)] font-bold">STEP 06</div>
          <h2 class="text-lg font-bold text-[var(--text)] font-mono">Connect Entities & Networks</h2>
          <p class="text-xs text-[var(--text-3)]"><strong>Researcher does:</strong> Adds people, organizations, bank accounts, and vessels.</p>
          <p class="text-xs text-[var(--text-3)]"><strong>Reptile Birds provides:</strong> Renders an interactive network graph showing relationships, shell structures, and co-occurrences.</p>
        </div>

        <!-- Step 7 -->
        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <div class="font-mono text-xs text-[var(--primary)] font-bold">STEP 07</div>
          <h2 class="text-lg font-bold text-[var(--text)] font-mono">Side-by-Side Comparison</h2>
          <p class="text-xs text-[var(--text-3)]"><strong>Researcher does:</strong> Compares conflicting witness testimony, contract revisions, or leaked drafts.</p>
          <p class="text-xs text-[var(--text-3)]"><strong>Reptile Birds provides:</strong> Side-by-side text diffing to pinpoint modifications, omissions, and discrepancies.</p>
        </div>

        <!-- Step 8 -->
        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <div class="font-mono text-xs text-[var(--primary)] font-bold">STEP 08</div>
          <h2 class="text-lg font-bold text-[var(--text)] font-mono">Formulate & Cross-Check Claims</h2>
          <p class="text-xs text-[var(--text-3)]"><strong>Researcher does:</strong> Formulates core investigative hypotheses.</p>
          <p class="text-xs text-[var(--text-3)]"><strong>Reptile Birds provides:</strong> Links both supporting and refuting evidence cards to test if the findings withstand scrutiny.</p>
        </div>

        <!-- Step 9 -->
        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <div class="font-mono text-xs text-[var(--primary)] font-bold">STEP 09</div>
          <h2 class="text-lg font-bold text-[var(--text)] font-mono">Run Deterministic Verification Checks</h2>
          <p class="text-xs text-[var(--text-3)]"><strong>Researcher does:</strong> Audits the investigation for evidentiary inconsistencies.</p>
          <p class="text-xs text-[var(--text-3)]"><strong>Reptile Birds provides:</strong> Automated checks for duplicate SHA-256 files, corrupted quote strings, and claims containing conflicting citations.</p>
        </div>

        <!-- Step 10 -->
        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <div class="font-mono text-xs text-[var(--primary)] font-bold">STEP 10</div>
          <h2 class="text-lg font-bold text-[var(--text)] font-mono">Generate 1-Click Fact-Check Dossier</h2>
          <p class="text-xs text-[var(--text-3)]"><strong>Researcher does:</strong> Prepares the fact-check package for editors, lawyers, or dissertation committees.</p>
          <p class="text-xs text-[var(--text-3)]"><strong>Reptile Birds provides:</strong> Instantly generates a print-ready evidence dossier with cryptographic hash manifests and full JSON archive backup.</p>
        </div>
      </div>
    </div>
  `;
}

export function renderFeaturesPage() {
  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-12 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Capabilities Catalog</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">Tools Built for Evidence-Based Investigation</h1>
        <p class="text-sm sm:text-base text-[var(--text-3)]">
          A breakdown of deterministic research, client-side parsing, and verification capabilities.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Feature 1 -->
        <div class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)]">${icon('fileText', 20)}</div>
          <h2 class="font-bold text-base text-[var(--text)] font-mono">Multi-Format Document Ingest</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Ingest PDFs, Excel workbooks (.xlsx, .xls), CSVs, plain text transcripts, and image exhibits. Ingestion automatically extracts raw text layers client-side using PDF.js and SheetJS.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)]">${icon('shield', 20)}</div>
          <h2 class="font-bold text-base text-[var(--text)] font-mono">Web Crypto SHA-256 Hashing</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Every file receives an immutable 64-character SHA-256 fingerprint generated directly from its binary ArrayBuffer. This guarantees chain-of-custody tracking.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)]">${icon('search', 20)}</div>
          <h2 class="font-bold text-base text-[var(--text)] font-mono">Cross-Document Search</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Global search index across all documents, evidence cards, claims, and notes simultaneously. Features match count badges and 1-click source jump navigation.
          </p>
        </div>

        <!-- Feature 4 -->
        <div class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)]">${icon('bookmark', 20)}</div>
          <h2 class="font-bold text-base text-[var(--text)] font-mono">Verbatim Evidence Pinpointing</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Highlight text in any document or select rows in any spreadsheet to trigger the floating evidence popover. Capture exact text alongside page, sheet, and row metadata.
          </p>
        </div>

        <!-- Feature 5 -->
        <div class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)]">${icon('checkCircle', 20)}</div>
          <h2 class="font-bold text-base text-[var(--text)] font-mono">Claims Matrix</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Formulate investigative hypotheses and tag evidence as supporting or contradicting. Claims automatically compute verification states based on linked records.
          </p>
        </div>

        <!-- Feature 6 -->
        <div class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)]">${icon('share2', 20)}</div>
          <h2 class="font-bold text-base text-[var(--text)] font-mono">Entity & Network Graph</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Interactive SVG force simulation showing relationships between people, companies, organizations, and bank accounts, complete with entity filters and detail slide-overs.
          </p>
        </div>

        <!-- Feature 7 -->
        <div class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)]">${icon('clock', 20)}</div>
          <h2 class="font-bold text-base text-[var(--text)] font-mono">Chronological Timeline</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Sequence events by date with support for exact dates, months, years, or approximate ranges. Every timeline item anchors directly back to primary source citations.
          </p>
        </div>

        <!-- Feature 8 -->
        <div class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)]">${icon('compare', 20)}</div>
          <h2 class="font-bold text-base text-[var(--text)] font-mono">Side-by-Side Comparison</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Inspect two versions of a document or two conflicting witness accounts side-by-side to detect text modifications, omissions, and discrepancies.
          </p>
        </div>
      </div>
    </div>
  `;
}

export function renderUseCasesPage(subcase = 'all') {
  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-12 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Domain Scenarios</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">Tailored for Serious Research Scenarios</h1>
        <p class="text-sm sm:text-base text-[var(--text-3)]">
          How professionals across disciplines use Reptile Birds to maintain evidence traceability.
        </p>
      </header>

      <div class="space-y-10">
        <!-- 1. Journalism -->
        <section id="investigative-journalism" class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)] font-mono font-bold text-xs uppercase">Scenario 01</div>
          <h2 class="text-xl font-bold text-[var(--text)] font-mono">Investigative Journalism</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Investigative reporters frequently receive hundreds of leaked documents, procurement audits, and meeting minutes. Reptile Birds enables newsrooms to index leaks locally in their browser without risking cloud uploads. Quotes are captured with verbatim page anchoring, making pre-publication editorial fact-checking rapid and auditable.
          </p>
        </section>

        <!-- 2. OSINT -->
        <section id="osint" class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)] font-mono font-bold text-xs uppercase">Scenario 02</div>
          <h2 class="text-xl font-bold text-[var(--text)] font-mono">Open Source Intelligence (OSINT)</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            OSINT researchers piece together public flight records, maritime registers, social media captures, and corporate filings. Reptile Birds maps entities (individuals, shell companies, vessels) in a visual relationship network while recording the cryptographic SHA-256 fingerprint of every public artifact.
          </p>
        </section>

        <!-- 3. Academic -->
        <section id="academic-research" class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)] font-mono font-bold text-xs uppercase">Scenario 03</div>
          <h2 class="text-xl font-bold text-[var(--text)] font-mono">PhD Candidates & Academic Scholars</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Scholars analyzing primary historical sources or conducting extensive literature reviews can maintain precise citation records across hundreds of archival papers. Every research note remains attached to the exact source page and excerpt, ensuring an airtight dissertation defense.
          </p>
        </section>

        <!-- 4. Due Diligence -->
        <section id="due-diligence" class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)] font-mono font-bold text-xs uppercase">Scenario 04</div>
          <h2 class="text-xl font-bold text-[var(--text)] font-mono">Corporate Due Diligence & Forensic Accounting</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Analysts evaluating corporate transactions can inspect multi-sheet balance ledgers, cross-check vendor contracts against disbursements, and flag conflicting ownership statements between filings without uploading proprietary financials to cloud vendors.
          </p>
        </section>

        <!-- 5. Fact-Checking -->
        <section id="fact-checking" class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)] font-mono font-bold text-xs uppercase">Scenario 05</div>
          <h2 class="text-xl font-bold text-[var(--text)] font-mono">Fact-Checking & Verification</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Fact-checkers can test public political claims against primary statistical releases, government reports, and legislative transcripts, logging both corroborating and contradicting evidence.
          </p>
        </section>

        <!-- 6. Documentary -->
        <section id="documentary-research" class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)] font-mono font-bold text-xs uppercase">Scenario 06</div>
          <h2 class="text-xl font-bold text-[var(--text)] font-mono">Documentary & Narrative Research</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Documentarians managing hours of interview transcripts and historical photograph manifests can build chronological timelines, ensuring narrative sequencing matches verified dates.
          </p>
        </section>

        <!-- 7. Legal Research -->
        <section id="legal-research" class="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3">
          <div class="text-[var(--primary)] font-mono font-bold text-xs uppercase">Scenario 07</div>
          <h2 class="text-xl font-bold text-[var(--text)] font-mono">Legal Research & Case Preparation</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Legal researchers can organize discovery exhibits, cross-reference witness depositions, and compare contract amendments. <em>Notice: Reptile Birds is an evidence-management tool and does not provide legal advice or replace courtroom-certified e-discovery software.</em>
          </p>
        </section>
      </div>
    </div>
  `;
}

export function renderPrivacyPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Client-Side Architecture</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">Zero-Cloud Architecture & Privacy Policy</h1>
        <p class="text-xs text-[var(--text-4)] font-mono">
          Effective Date: September 2026 • Reptile Birds Privacy Commitments
        </p>
      </header>

      <section class="space-y-3">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">1. Architectural Distinction: Local Research vs. Website Data</h2>
        <div class="p-4 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <p class="font-semibold text-[var(--text)]">Research Workspace Data (Your Files):</p>
          <p class="text-xs text-[var(--text-3)]">
            All files loaded into the Reptile Birds research workspace (PDFs, spreadsheets, transcripts, notes, and evidence citations) are processed and stored locally inside your browser using IndexedDB. <strong>They are never uploaded, transferred, or transmitted to our servers or any third-party cloud.</strong>
          </p>
        </div>
        <div class="p-4 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <p class="font-semibold text-[var(--text)]">Public Website Data (Browsing our Marketing Pages):</p>
          <p class="text-xs text-[var(--text-3)]">
            When you visit our public marketing website (such as this documentation or the home page), standard HTTP server logs (IP address, user-agent, request timestamps) are processed for infrastructure security and delivery.
          </p>
        </div>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">2. Zero Subpoena Risk</h2>
        <p class="text-xs text-[var(--text-3)]">
          Because we maintain no remote server database of user research files, notes, or case names, we have no user evidence records to disclose in response to civil discovery demands, regulatory inquiries, or court subpoenas.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">3. Local Browser Storage & Complete Deletion</h2>
        <p class="text-xs text-[var(--text-3)]">
          Reptile Birds uses browser <code>localStorage</code>, <code>sessionStorage</code>, and <code>IndexedDB</code>. You can permanently delete all local investigation records at any time using the <strong>Clear Research</strong> button in the application, which purges all 3 storage tiers immediately.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">4. Advertising and Monetization</h2>
        <p class="text-xs text-[var(--text-3)]">
          The public website and application may display advertisements in designated areas (e.g. the 25% desktop sponsored column). Third-party advertising partners may use cookies to serve relevant ads. These third-party technologies cannot access your local IndexedDB workspace files.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">5. Privacy Inquiries</h2>
        <p class="text-xs text-[var(--text-3)]">
          Direct all privacy and security inquiries to our official contact address: <a href="mailto:sharpedge74@gmail.com" class="text-[var(--primary)] underline font-mono">sharpedge74@gmail.com</a>.
        </p>
      </section>
    </div>
  `;
}

export function renderTermsPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Legal & Terms</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">Terms of Use</h1>
        <p class="text-xs text-[var(--text-4)] font-mono">
          Last Updated: September 2026
        </p>
      </header>

      <section class="space-y-3">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">1. Nature of the Software</h2>
        <p class="text-xs text-[var(--text-3)]">
          Reptile Birds is a browser-based research and evidence-management workspace. It provides tools for organizing, searching, cross-referencing, and indexing user-supplied materials. It does not provide legal, investigative, financial, or forensic certification.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">2. User Responsibility for Data Backups</h2>
        <p class="text-xs text-[var(--text-3)]">
          Because Reptile Birds operates locally inside your browser's IndexedDB, you are solely responsible for creating regular backups of your research by exporting JSON investigation archives. Clearing browser cache or site data will delete your local files.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">3. No Automated Truth Determination</h2>
        <p class="text-xs text-[var(--text-3)]">
          The software performs deterministic mathematical checks (e.g. SHA-256 hashes and quote matching), but does not verify whether the statements made in user documents are truthful. Factual conclusions remain entirely the responsibility of the human user.
        </p>
      </section>
    </div>
  `;
}

export function renderCookiesPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Browser Storage & Cookies</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">Cookie & Local Storage Policy</h1>
        <p class="text-xs text-[var(--text-4)] font-mono">
          Transparency on client-side persistence and third-party advertising.
        </p>
      </header>

      <section class="space-y-3">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">Technologies We Use</h2>
        <div class="space-y-3 text-xs">
          <div class="p-4 bg-[var(--surface)] border border-[var(--border)] rounded">
            <h3 class="font-bold text-[var(--text)]">1. Local Storage & IndexedDB (Essential)</h3>
            <p class="text-[var(--text-3)]">Stores your active case files, documents, evidence excerpts, and theme preferences directly inside your browser so you have zero latency and complete privacy.</p>
          </div>
          <div class="p-4 bg-[var(--surface)] border border-[var(--border)] rounded">
            <h3 class="font-bold text-[var(--text)]">2. Session Storage (Essential)</h3>
            <p class="text-[var(--text-3)]">Maintains ephemeral UI states such as open tabs and search filters during your browsing session.</p>
          </div>
          <div class="p-4 bg-[var(--surface)] border border-[var(--border)] rounded">
            <h3 class="font-bold text-[var(--text)]">3. Advertising Cookies (Third-Party)</h3>
            <p class="text-[var(--text-3)]">Third-party ad networks may set cookies on public marketing pages to measure ad impressions and prevent fraud.</p>
          </div>
        </div>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">How to Control Cookies</h2>
        <p class="text-xs text-[var(--text-3)]">
          You can block or delete cookies in your browser settings (Chrome, Firefox, Safari, Edge). Note that clearing "Site Data" will delete your local IndexedDB investigation files unless previously backed up to a JSON archive.
        </p>
      </section>
    </div>
  `;
}

export function renderContactPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Get in Touch</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">Contact Our Team</h1>
        <p class="text-sm sm:text-base text-[var(--text-3)]">
          Direct communication channel for technical support, feedback, bug reports, and research partnerships.
        </p>
      </header>

      <!-- Central Official Contact Box -->
      <div class="p-6 sm:p-8 bg-[var(--surface)] border-2 border-[var(--primary)] rounded-[var(--radius-card)] space-y-4 text-center sm:text-left">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="text-xs font-mono uppercase tracking-wider text-[var(--primary)] font-semibold">Official Contact Channel</div>
            <h2 class="text-xl sm:text-2xl font-bold font-mono text-[var(--text)]">sharpedge74@gmail.com</h2>
            <p class="text-xs text-[var(--text-3)]">All technical inquiries, bug reports, security questions, and partnerships are handled through this single inbox.</p>
          </div>
          <a
            href="mailto:sharpedge74@gmail.com"
            class="px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold rounded-[var(--radius-sm)] transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer shadow-sm"
          >
            ${icon('fileText', 14)}
            <span>Send Email</span>
          </a>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <h3 class="font-bold text-sm text-[var(--text)] font-mono">General & Research Inquiries</h3>
          <p class="text-xs text-[var(--text-3)]">Questions regarding Reptile Birds, methodology, and institutional use.</p>
          <div class="text-xs font-mono text-[var(--primary)] font-semibold">Email: sharpedge74@gmail.com</div>
        </div>

        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <h3 class="font-bold text-sm text-[var(--text)] font-mono">Technical Support & Bugs</h3>
          <p class="text-xs text-[var(--text-3)]">Report issues with document parsing, Excel sheets, or browser storage.</p>
          <div class="text-xs font-mono text-[var(--primary)] font-semibold">Email: sharpedge74@gmail.com</div>
        </div>

        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <h3 class="font-bold text-sm text-[var(--text)] font-mono">Privacy & Security</h3>
          <p class="text-xs text-[var(--text-3)]">Inquiries regarding client-side browser sandboxing and data policies.</p>
          <div class="text-xs font-mono text-[var(--primary)] font-semibold">Email: sharpedge74@gmail.com</div>
        </div>

        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <h3 class="font-bold text-sm text-[var(--text)] font-mono">Legal & Compliance</h3>
          <p class="text-xs text-[var(--text-3)]">Terms of service, licensing, and verification protocols.</p>
          <div class="text-xs font-mono text-[var(--primary)] font-semibold">Email: sharpedge74@gmail.com</div>
        </div>
      </div>
    </div>
  `;
}

export function renderFaqPage() {
  const faqs = [
    {
      q: 'What is Reptile Birds?',
      a: 'Reptile Birds is a browser-based, zero-install research and evidence-management workspace built for investigative journalists, OSINT researchers, due diligence analysts, and PhD scholars. It anchors verbatim citations to primary documents with SHA-256 cryptographic hashes and generates 1-click legal fact-check dossiers directly inside your browser.'
    },
    {
      q: 'Do I need to install any software or create an account?',
      a: 'No. Reptile Birds runs 100% inside your web browser (Chrome, Firefox, Safari, Edge). There are no desktop installers to download, no browser extensions required, and no account signup forms. You can launch your investigation immediately.'
    },
    {
      q: 'How does Reptile Birds differ from Notion or Obsidian for serious research?',
      a: 'Notion and Obsidian are mutable scratchpads where quotes can be accidentally edited or paraphrased, lacking cryptographic custody, cell-level spreadsheet anchoring, and deterministic verification. Reptile Birds treats source materials as immutable primary evidence, linking every claim directly to exact page numbers, spreadsheet coordinates, and SHA-256 document hashes.'
    },
    {
      q: 'Why does Reptile Birds refuse to use Generative AI for evidence verification?',
      a: 'Generative AI and Large Language Models (LLMs) summarize, rewrite, and hallucinate facts. In investigative journalism, legal discovery, and academic research, a minor AI paraphrase that shifts "suspected" to "confirmed" constitutes libel or research misconduct. Reptile Birds uses deterministic verification, preserving exact verbatim citations and leaving factual conclusions strictly with the human researcher.'
    },
    {
      q: 'What is the 5-Second Fact-Check Challenge?',
      a: 'The standard that an investigator must be able to produce the exact highlighted primary page and cryptographic source for any claim in their findings within five seconds when challenged by an editor, legal counsel, or dissertation committee.'
    },
    {
      q: 'Why is the tool named Reptile Birds?',
      a: 'In evolutionary biology, birds are avian dinosaurs—the unbroken living lineage that connects ancient fossil records directly to the modern sky. Reptile Birds serves that same function in research: preserving the unbroken, auditable thread connecting raw primary archives to verified public findings.'
    },
    {
      q: 'How does Reptile Birds protect whistleblowers and confidential sources from subpoenas?',
      a: 'Reptile Birds operates on a client-side, browser-based architecture. All research files, notes, and IndexedDB stores reside entirely inside your local browser. Because zero document bytes are transmitted to or stored on Reptile Birds servers, there is no centralized database or cloud repository for third parties, adversaries, or government authorities to subpoena.'
    },
    {
      q: 'Can I import multi-page PDFs and multi-sheet Excel files?',
      a: 'Yes. Multi-page PDFs render client-side using PDF.js with jump-to-page navigation. Excel (.xlsx, .xls) and CSV files render with full sheet-tab switching and row-level evidence highlighting.'
    },
    {
      q: 'Can evidence be linked directly to claims?',
      a: 'Yes. The Claims Matrix lets you formulate investigative findings and connect citations as either supporting or refuting evidence cards.'
    },
    {
      q: 'How do I back up my investigation?',
      a: 'Use the Export Investigation Archive button to download a complete, portable .json file containing all documents, hashes, citations, and claims. You can store this archive on a secure drive and re-import it on any device.'
    },
    {
      q: 'What happens if I click Clear Research?',
      a: 'Clear Research displays a confirmation prompt. If confirmed, it immediately and irreversibly deletes all data from localStorage, sessionStorage, and IndexedDB for that investigation.'
    },
    {
      q: 'How can I contact the team?',
      a: 'You can email us directly at sharpedge74@gmail.com for technical support, security inquiries, or general feedback.'
    }
  ];

  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Help Center & Q&A</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">Frequently Asked Questions</h1>
        <p class="text-sm sm:text-base text-[var(--text-3)]">
          Direct answers to key questions about browser execution, zero-subpoena architecture, AI non-involvement, and evidence verification.
        </p>
      </header>

      <div class="space-y-4">
        ${faqs.map((f, i) => `
          <div class="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
            <h3 class="font-bold text-sm text-[var(--text)] font-mono flex items-start gap-2">
              <span class="text-[var(--primary)] font-bold">${i + 1}.</span>
              <span>${f.q}</span>
            </h3>
            <p class="text-xs text-[var(--text-3)] pl-5 leading-relaxed">${f.a}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderSecurityPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Integrity & Cryptography</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">Technical Protections and Cryptographic Integrity</h1>
        <p class="text-sm sm:text-base text-[var(--text-3)]">
          How Reptile Birds implements Web Crypto SHA-256 and browser sandboxing.
        </p>
      </header>

      <section class="space-y-3">
        <h2 class="text-xl font-bold text-[var(--text)] font-mono">The Critical Difference: Integrity vs. Truth</h2>
        <div class="p-5 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-2">
          <p class="font-semibold text-[var(--text)]">Cryptographic Integrity:</p>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            When you import a document into Reptile Birds, the Web Crypto API computes a <strong>SHA-256 hash</strong> (FIPS 180-4 standard). This 64-character fingerprint mathematically proves whether the file has been altered since ingestion. If a single comma in a 500-page PDF is modified, the hash changes completely.
          </p>
          <p class="font-semibold text-[var(--text)] pt-2">Semantic Truth:</p>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            A hash cannot prove that the document's author told the truth. A forged invoice has a valid SHA-256 hash. Integrity proves chain-of-custody; the researcher must determine truth.
          </p>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-[var(--text)] font-mono">Browser-Based Security Model</h2>
        <p class="text-xs text-[var(--text-3)] leading-relaxed">
          Reptile Birds executes strictly within your browser's sandboxed environment obeying the Same-Origin Policy. It does not install native background services, daemon processes, or system hooks on your operating system.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-[var(--text)] font-mono">Zero-Subpoena Architecture</h2>
        <p class="text-xs text-[var(--text-3)] leading-relaxed">
          Because Reptile Birds uses client-side IndexedDB with zero cloud document storage, no user research material is uploaded to our infrastructure. An adversary or court seeking discovery has no central vendor repository to compel, eliminating third-party cloud data compromise as an attack vector.
        </p>
      </section>
    </div>
  `;
}

export function renderDataStoragePage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Architecture & Storage</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">Managing Local Storage and Research Backups</h1>
        <p class="text-sm sm:text-base text-[var(--text-3)]">
          Understanding IndexedDB persistence, browser quotas, and data eviction risks.
        </p>
      </header>

      <section class="p-5 bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 rounded-[var(--radius-card)] space-y-2 text-red-900 dark:text-red-200 text-xs">
        <div class="font-bold flex items-center gap-2">
          ${icon('alertTriangle', 16)}
          <span>Critical Warning: Local Storage Is Not a Permanent Backup</span>
        </div>
        <p class="leading-relaxed">
          Browser vendors (Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge) treat IndexedDB as client-managed storage. If your device drive is low on space, or if you clear "Cookies and other site data", your investigation will be deleted. <strong>Always export a JSON archive periodically.</strong>
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">How IndexedDB Works in Reptile Birds</h2>
        <p class="text-xs text-[var(--text-3)] leading-relaxed">
          Reptile Birds organizes case data into distinct object stores: <code>sources</code> (file buffers & extracted text), <code>evidence</code>, <code>claims</code>, <code>entities</code>, <code>relationships</code>, <code>timeline</code>, and <code>notes</code>. Storage limits depend on your available disk space (typically tens of gigabytes).
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">The Investigation Archive Protocol</h2>
        <p class="text-xs text-[var(--text-3)] leading-relaxed">
          At the conclusion of each active research session, click <strong>Export Investigation Archive</strong> from the header menu. This bundles all case records into a portable, self-contained <code>.json</code> archive that can be stored on encrypted USB drives and restored onto any computer anytime.
        </p>
      </section>
    </div>
  `;
}

export function renderEvidenceProvenancePage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Methodology</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">The Anatomy of Research Provenance</h1>
        <p class="text-sm sm:text-base text-[var(--text-3)]">
          How to build an unbroken chain from raw document file to final published finding.
        </p>
      </header>

      <section class="p-6 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3 font-mono text-xs">
        <div class="text-[var(--primary)] font-bold uppercase">The Provenance Chain</div>
        <div class="text-[var(--text)] font-semibold flex flex-wrap items-center gap-2 text-xs">
          <span>File (SHA-256)</span>
          <span>→</span>
          <span>Source Record</span>
          <span>→</span>
          <span>Verbatim Evidence</span>
          <span>→</span>
          <span>Claim</span>
          <span>→</span>
          <span>Finding</span>
          <span>→</span>
          <span>Dossier Report</span>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-lg font-bold text-[var(--text)] font-mono">Realistic Provenance Example</h2>
        <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] space-y-3 text-xs">
          <div>
            <span class="text-[var(--text-4)] uppercase font-mono text-[10px]">Investigative Claim</span>
            <p class="font-bold text-[var(--text)] text-sm">"Entity Alpha received 4 undisclosed payments prior to contract cancellation in Q2 2024."</p>
          </div>
          <div class="space-y-2 pt-2 border-t border-[var(--border)]">
            <div class="font-semibold text-[var(--text-2)]">Linked Evidence Citations:</div>
            <div class="p-2.5 bg-[var(--surface-2)] rounded border border-[var(--border)]">
              <span class="font-mono text-[var(--primary)] font-semibold">Evidence #1:</span>
              <span class="text-[var(--text-3)] ml-2"><code>q2_bank_ledger.xlsx</code> — Tab: Transfers, Row: 142 ($250,000 disbursement).</span>
            </div>
            <div class="p-2.5 bg-[var(--surface-2)] rounded border border-[var(--border)]">
              <span class="font-mono text-[var(--primary)] font-semibold">Evidence #2:</span>
              <span class="text-[var(--text-3)] ml-2"><code>contract_amendment.pdf</code> — Page 18, Paragraph 3 (cancellation dated June 30).</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function renderResearchGuidePage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
      <header class="space-y-4 border-b border-[var(--border)] pb-8">
        <div class="text-[11px] font-mono uppercase tracking-wider text-[var(--primary)]">Evergreen Educational Guide</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono">The Guide to Evidence-Based Research Organization</h1>
        <p class="text-sm sm:text-base text-[var(--text-3)]">
          Practical strategies for organizing source material, surviving legal review, and maintaining evidentiary context.
        </p>
      </header>

      <div class="space-y-8">
        <section class="space-y-3">
          <h2 class="text-xl font-bold text-[var(--text)] font-mono">1. Preserving Context Around Excerpts</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Never copy a single sentence into a notes document without recording the surrounding paragraph, page number, and document publication date. Isolated quotes are vulnerable to misinterpretation and legal challenges.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-bold text-[var(--text)] font-mono">2. Reconciling Conflicting Records</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            When two credible sources disagree (e.g. one corporate registry states an appointment in 2021 while meeting minutes record 2022), do not simply discard the outlier. Log both records, tag one as supporting and the other as contradicting, and document the discrepancy explicitly.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-bold text-[var(--text)] font-mono">3. Pre-Publication Fact-Checking Protocol</h2>
          <p class="text-xs text-[var(--text-3)] leading-relaxed">
            Before publishing an investigative report, test every factual sentence in your manuscript against your evidence index. If an assertion cannot be traced directly back to an ingested source file and page, it must be flagged for corroboration.
          </p>
        </section>
      </div>
    </div>
  `;
}
