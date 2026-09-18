/**
 * Deterministic Verification Engine
 * Checks:
 * - Duplicate source detection via SHA-256
 * - Verbatim quote matching against source extracted text
 * - Missing evidence for claims and events
 * - Conflicting evidence (claims with both Supporting and Contradicting links)
 * - Claims status consistency
 * - Timeline event evidence links
 */

export function runVerification(sources = [], evidenceList = [], claims = [], timeline = []) {
  const issues = [];
  let matchesFound = 0;
  let conflictsDetected = 0;
  let evidenceMissingCount = 0;
  let duplicatesDetected = 0;
  let totalChecks = 0;

  const sourceMap = new Map();
  sources.forEach((s) => sourceMap.set(s.id, s));

  // 1. Duplicate sources check via SHA-256
  const hashGroups = new Map();
  sources.forEach((s) => {
    if (!s.sha256) return;
    const group = hashGroups.get(s.sha256) || [];
    group.push(s);
    hashGroups.set(s.sha256, group);
  });

  hashGroups.forEach((group, hash) => {
    totalChecks++;
    if (group.length > 1) {
      duplicatesDetected++;
      issues.push({
        id: `dup-${hash.slice(0, 8)}`,
        type: 'duplicate_detected',
        label: 'Duplicate detected',
        title: `Identical SHA-256 Hash across ${group.length} sources`,
        description: `Sources ${group.map((s) => s.name).join(', ')} share identical file hash (${hash.slice(0, 16)}...). Potential redundant upload.`,
        severity: 'warning',
        timestamp: new Date().toISOString(),
        items: group.map((s) => s.name),
      });
    }
  });

  // 2. Verbatim excerpt matching for each evidence item
  evidenceList.forEach((ev) => {
    totalChecks++;
    const src = sourceMap.get(ev.sourceId);
    if (!src) {
      evidenceMissingCount++;
      issues.push({
        id: `src-missing-${ev.id}`,
        type: 'source_unavailable',
        label: 'Source unavailable',
        title: `Missing Source Reference (${ev.sourceId})`,
        description: `Evidence #${ev.id} references source ID ${ev.sourceId}, which was not found in storage.`,
        evidenceId: ev.id,
        severity: 'danger',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (!src.rawText) {
      issues.push({
        id: `unindexed-${ev.id}`,
        type: 'needs_verification',
        label: 'Needs verification',
        title: `Unindexed source text in ${src.name}`,
        description: `Source ${src.name} does not have searchable text extracted for automated quote verification.`,
        evidenceId: ev.id,
        sourceId: src.id,
        severity: 'notice',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const normalize = (value) => String(value || '').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();
    const normExcerpt = normalize(ev.excerpt);
    const normText = normalize(src.rawText);

    if (normExcerpt.length > 0 && normText.includes(normExcerpt)) {
      matchesFound++;
    } else if (normExcerpt.length > 0) {
      issues.push({
        id: `quote-diff-${ev.id}`,
        type: 'difference_found',
        label: 'Difference found',
        title: `Quote mismatch in Evidence #${ev.id}`,
        description: `Selected excerpt for #${ev.id} was not found verbatim in ${src.name} (${ev.location}). Verify transcription accuracy or source version.`,
        evidenceId: ev.id,
        sourceId: src.id,
        sourceName: src.name,
        location: ev.location,
        severity: 'warning',
        timestamp: new Date().toISOString(),
      });
    }
  });

  // 3. Claims validation & conflict detection
  let supportedCount = 0;
  let needStrongerCount = 0;
  let unsupportedCount = 0;
  let conflictingClaimsCount = 0;

  claims.forEach((claim) => {
    totalChecks++;
    const linked = evidenceList.filter((e) => e.linkedClaimId === claim.id);
    const supporting = linked.filter((e) => e.relationship === 'Supporting');
    const contradicting = linked.filter((e) => e.relationship === 'Contradicting');

    if (supporting.length > 0 && contradicting.length > 0) {
      conflictsDetected++;
      conflictingClaimsCount++;
      issues.push({
        id: `conflict-claim-${claim.id}`,
        type: 'conflict_detected',
        label: 'Conflict detected',
        title: `Contradictory evidence in Claim #${claim.id}`,
        description: `Claim #${claim.id} has ${supporting.length} supporting and ${contradicting.length} contradicting evidence items linked.`,
        claimId: claim.id,
        severity: 'danger',
        timestamp: new Date().toISOString(),
      });
    } else if (supporting.length > 0) {
      supportedCount++;
    } else if (linked.length === 0) {
      unsupportedCount++;
      issues.push({
        id: `unsupported-claim-${claim.id}`,
        type: 'evidence_missing',
        label: 'Evidence missing',
        title: `Unsupported Claim #${claim.id}`,
        description: `Claim #${claim.id} ("${claim.statement.slice(0, 50)}...") has no linked evidence citations.`,
        claimId: claim.id,
        severity: 'warning',
        timestamp: new Date().toISOString(),
      });
    } else {
      needStrongerCount++;
      issues.push({
        id: `weak-claim-${claim.id}`,
        type: 'needs_verification',
        label: 'Needs verification',
        title: `Claim #${claim.id} lacks supporting evidence`,
        description: `Claim #${claim.id} only has reference or unverified links. Additional corroboration may be needed.`,
        claimId: claim.id,
        severity: 'notice',
        timestamp: new Date().toISOString(),
      });
    }
  });

  // 4. Timeline checks
  timeline.forEach((event) => {
    totalChecks++;
    if (!event.evidenceIds || event.evidenceIds.length === 0) {
      issues.push({
        id: `event-unverified-${event.id}`,
        type: 'needs_verification',
        label: 'Needs verification',
        title: `Uncited Timeline Event "${event.title}"`,
        description: `Event on ${event.date} does not cite any evidence record.`,
        severity: 'notice',
        timestamp: new Date().toISOString(),
      });
    }
  });

  const coverageRate = claims.length > 0 ? Math.round((supportedCount / claims.length) * 100) : 0;

  return {
    totalChecks,
    matchesFound,
    conflictsDetected,
    evidenceMissingCount,
    duplicatesDetected,
    supportedCount,
    needStrongerCount,
    unsupportedCount,
    conflictingClaimsCount,
    coverageRate,
    issues,
  };
}
