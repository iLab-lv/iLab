/* scripts/exportCategoriesFromFirestore.cjs
 *
 * Exports Firestore collection: categories
 * into a local JSON file.
 *
 * Usage:
 *   node scripts/exportCategoriesFromFirestore.cjs
 *
 * Optional env:
 *   EXPORT_PATH=tmp/categories.export.json
 *   EXPORT_PRETTY=1               (default: 1)
 *
 * Required env in .env.local:
 *   FIREBASE_PROJECT_ID=
 *   FIREBASE_CLIENT_EMAIL=
 *   FIREBASE_PRIVATE_KEY=
 */

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const EXPORT_PATH =
  process.env.EXPORT_PATH || 'tmp/categories.export.json';
const EXPORT_PRETTY = process.env.EXPORT_PRETTY !== '0';

function assertEnv(name) {
  if (!process.env[name]) {
    throw new Error(`Missing env var: ${name}`);
  }
}

function initFirebaseAdmin() {
  if (admin.apps.length) return;

  assertEnv('FIREBASE_PROJECT_ID');
  assertEnv('FIREBASE_CLIENT_EMAIL');
  assertEnv('FIREBASE_PRIVATE_KEY');

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

function isTimestampLike(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.toDate === 'function'
  );
}

function serializeFirestoreValue(value) {
  if (value === null || value === undefined) return value;

  if (isTimestampLike(value)) {
    const date = value.toDate();
    return date instanceof Date ? date.toISOString() : null;
  }

  if (Array.isArray(value)) {
    return value.map(serializeFirestoreValue);
  }

  if (typeof value === 'object') {
    const out = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      out[key] = serializeFirestoreValue(nestedValue);
    }
    return out;
  }

  return value;
}

function sortCategories(a, b) {
  const ao = typeof a.order === 'number' ? a.order : 999;
  const bo = typeof b.order === 'number' ? b.order : 999;

  if (ao !== bo) return ao - bo;

  return String(a.label || a.slug || a.id || '').localeCompare(
    String(b.label || b.slug || b.id || ''),
    undefined,
    { numeric: true, sensitivity: 'base' }
  );
}

async function run() {
  console.log('=== Export categories from Firestore ===');

  initFirebaseAdmin();

  const db = admin.firestore();
  const snap = await db.collection('categories').get();

  const items = snap.docs
    .map((doc) => {
      const raw = doc.data() || {};
      return {
        id: doc.id,
        ...serializeFirestoreValue(raw),
      };
    })
    .sort(sortCategories);

  const payload = {
    exportedAt: new Date().toISOString(),
    projectId: process.env.FIREBASE_PROJECT_ID,
    collection: 'categories',
    count: items.length,
    items,
  };

  const outputPath = path.resolve(EXPORT_PATH);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  fs.writeFileSync(
    outputPath,
    JSON.stringify(payload, null, EXPORT_PRETTY ? 2 : 0),
    'utf8'
  );

  console.log(`Exported ${items.length} categories`);
  console.log(`Saved to: ${outputPath}`);
  console.log('=== Done ===');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});