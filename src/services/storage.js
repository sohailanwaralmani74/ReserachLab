/**
 * Local-First IndexedDB Storage Service
 * Handles persistence for:
 * - investigation metadata
 * - sources (files, textPages, sheets, SHA-256)
 * - folders
 * - evidence
 * - claims
 * - entities
 * - relationships
 * - timeline
 * - notes
 */

const DB_NAME = 'investigation_os_v1';
const DB_VERSION = 1;

let dbInstance = null;

export async function getDB() {
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const stores = [
        'investigation',
        'sources',
        'folders',
        'evidence',
        'claims',
        'entities',
        'relationships',
        'timeline',
        'notes',
      ];

      stores.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      });
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function getAll(storeName) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function put(storeName, item) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.put(item);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function remove(storeName, id) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function clear(storeName) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export const Storage = {
  // Investigation Meta
  async getInvestigation() {
    const all = await getAll('investigation');
    return all[0] || null;
  },
  async saveInvestigation(meta) {
    return put('investigation', meta);
  },

  // Sources
  async getSources() {
    return getAll('sources');
  },
  async saveSource(source) {
    return put('sources', source);
  },
  async deleteSource(id) {
    return remove('sources', id);
  },

  // Folders
  async getFolders() {
    return getAll('folders');
  },
  async saveFolder(folder) {
    return put('folders', folder);
  },
  async deleteFolder(id) {
    return remove('folders', id);
  },

  // Evidence
  async getEvidence() {
    return getAll('evidence');
  },
  async saveEvidence(evidence) {
    return put('evidence', evidence);
  },
  async deleteEvidence(id) {
    return remove('evidence', id);
  },

  // Claims
  async getClaims() {
    return getAll('claims');
  },
  async saveClaim(claim) {
    return put('claims', claim);
  },
  async deleteClaim(id) {
    return remove('claims', id);
  },

  // Entities
  async getEntities() {
    return getAll('entities');
  },
  async saveEntity(entity) {
    return put('entities', entity);
  },
  async deleteEntity(id) {
    return remove('entities', id);
  },

  // Relationships
  async getRelationships() {
    return getAll('relationships');
  },
  async saveRelationship(rel) {
    return put('relationships', rel);
  },
  async deleteRelationship(id) {
    return remove('relationships', id);
  },

  // Timeline
  async getTimeline() {
    return getAll('timeline');
  },
  async saveTimelineEvent(event) {
    return put('timeline', event);
  },
  async deleteTimelineEvent(id) {
    return remove('timeline', id);
  },

  // Notes
  async getNotes() {
    return getAll('notes');
  },
  async saveNote(note) {
    return put('notes', note);
  },
  async deleteNote(id) {
    return remove('notes', id);
  },

  // Storage Quota
  async getStorageInfo() {
    if (navigator.storage && navigator.storage.estimate) {
      try {
        const est = await navigator.storage.estimate();
        const usage = est.usage || 0;
        const quota = est.quota || 1;
        return {
          usageBytes: usage,
          quotaBytes: quota,
          usageMB: (usage / (1024 * 1024)).toFixed(1),
          quotaMB: (quota / (1024 * 1024)).toFixed(0),
          percent: Math.min(100, Math.round((usage / quota) * 100)),
        };
      } catch (e) {
        console.warn('Could not read storage estimate:', e);
      }
    }
    return { usageBytes: 0, quotaBytes: 1, usageMB: '0.0', quotaMB: '0', percent: 0 };
  },

  // Full Archive Export (Section 23: Complete Investigation Backup)
  async exportArchive() {
    const meta = (await this.getInvestigation()) || {
      id: 'inv-' + Date.now(),
      name: 'Investigation Archive',
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    const [sources, folders, evidence, claims, entities, relationships, timeline, notes] =
      await Promise.all([
        this.getSources(),
        this.getFolders(),
        this.getEvidence(),
        this.getClaims(),
        this.getEntities(),
        this.getRelationships(),
        this.getTimeline(),
        this.getNotes(),
      ]);

    const sha256Manifest = {};
    sources.forEach((s) => {
      sha256Manifest[s.id] = s.sha256;
    });

    return {
      schemaVersion: '1.0',
      exportedAt: new Date().toISOString(),
      manifest: {
        totalSources: sources.length,
        totalEvidence: evidence.length,
        totalClaims: claims.length,
        totalEntities: entities.length,
        totalEvents: timeline.length,
        sha256Manifest,
      },
      investigation: meta,
      folders,
      sources,
      evidence,
      claims,
      entities,
      relationships,
      timeline,
      notes,
    };
  },

  // Restore Complete Archive
  async restoreArchive(backup) {
    await this.clearAll();

    if (backup.investigation) {
      await this.saveInvestigation(backup.investigation);
    }
    if (Array.isArray(backup.folders)) {
      for (const f of backup.folders) await this.saveFolder(f);
    }
    if (Array.isArray(backup.sources)) {
      for (const s of backup.sources) await this.saveSource(s);
    }
    if (Array.isArray(backup.evidence)) {
      for (const e of backup.evidence) await this.saveEvidence(e);
    }
    if (Array.isArray(backup.claims)) {
      for (const c of backup.claims) await this.saveClaim(c);
    }
    if (Array.isArray(backup.entities)) {
      for (const en of backup.entities) await this.saveEntity(en);
    }
    if (Array.isArray(backup.relationships)) {
      for (const r of backup.relationships) await this.saveRelationship(r);
    }
    if (Array.isArray(backup.timeline)) {
      for (const t of backup.timeline) await this.saveTimelineEvent(t);
    }
    if (Array.isArray(backup.notes)) {
      for (const n of backup.notes) await this.saveNote(n);
    }
  },

  async clearAll() {
    const stores = [
      'investigation',
      'sources',
      'folders',
      'evidence',
      'claims',
      'entities',
      'relationships',
      'timeline',
      'notes',
    ];
    for (const s of stores) {
      await clear(s);
    }
  },
};
