import { isDeepStrictEqual } from 'node:util';
import { validateFaqIdentity } from './faqIdentity.js';

const expectedIds = new Set(['lv', 'ru'].flatMap(locale => [
  `category_fotoaparatu-remonts_${locale}`, `service_iphone-plates-remonts_${locale}`, `page_cenas_${locale}`,
]));

export function validateMigrationManifest(manifest) {
  if (manifest.collection !== 'faqGroups' || manifest.documents?.length !== 6) throw new Error('Expected exactly six FAQ documents');
  const seen = new Set();
  for (const doc of manifest.documents) {
    validateFaqIdentity({ id: doc.id, ...doc.data });
    if (!expectedIds.has(doc.id) || seen.has(doc.id)) throw new Error('Unexpected or duplicate migration ID');
    seen.add(doc.id);
    const count = doc.data.scopeType === 'category' ? 6 : doc.data.scopeType === 'service' ? 4 : 3;
    if (doc.data.items?.length !== count || doc.data.isPublished !== true) throw new Error('Invalid FAQ content');
    if (doc.data.items.some((item, i) => !item.q || !item.aHtml || item.order !== (i + 1) * 10)) throw new Error('Invalid question/order');
  }
}

export function planFaqMigration(manifest, existing = new Map()) {
  validateMigrationManifest(manifest);
  return manifest.documents.map(doc => {
    const current = existing.get(doc.id);
    if (!current) return { id: doc.id, action: 'create', before: null, after: doc.data };
    const managed = Object.fromEntries(Object.keys(doc.data).map(key => [key, current[key]]));
    if (!isDeepStrictEqual(managed, doc.data)) throw new Error(`Conflicting FAQ record: ${doc.id}; no writes allowed`);
    return { id: doc.id, action: 'unchanged', before: current, after: current };
  });
}

// All reads/validation precede atomic create preconditions; no overwrite operation exists.
export async function applyFaqMigration(db, manifest, timestamp) {
  validateMigrationManifest(manifest);
  return db.runTransaction(async transaction => {
    const refs = manifest.documents.map(doc => db.collection('faqGroups').doc(doc.id));
    const snapshots = await Promise.all(refs.map(ref => transaction.get(ref)));
    const existing = new Map(snapshots.filter(snap => snap.exists).map(snap => [snap.id, snap.data()]));
    const plan = planFaqMigration(manifest, existing);
    plan.forEach((entry, i) => {
      if (entry.action === 'create') transaction.create(refs[i], { ...entry.after, createdAt: timestamp, updatedAt: timestamp });
    });
    return plan;
  });
}
