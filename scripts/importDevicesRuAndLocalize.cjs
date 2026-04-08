/* scripts/importDevicesRuAndLocalize.cjs
 *
 * Normalizes Firestore devices content fields to localized shape
 * and imports RU content from a JSON file.
 *
 * Target Firestore fields:
 *   h1
 *   metaTitle
 *   metaDescription
 *   bodyHtml
 *
 * Result shape:
 *   field: { lv: string, ru: string }
 *
 * Usage:
 *   node scripts/importDevicesRuAndLocalize.cjs
 *
 * Optional env:
 *   IMPORT_FILE=scripts/devices.ru.generated.json
 *   IMPORT_MODE=overwrite   (default)
 *   IMPORT_MODE=fill-ru     (only fills empty ru values)
 *   DRY_RUN=0               (default: 0)
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

const IMPORT_FILE =
  process.env.IMPORT_FILE || 'scripts/devices.ru.generated.json';

const IMPORT_MODE = process.env.IMPORT_MODE || 'overwrite'; // 'overwrite' | 'fill-ru'
const DRY_RUN = process.env.DRY_RUN === '1';

const LOCALIZED_FIELDS = [
  'h1',
  'metaTitle',
  'metaDescription',
  'bodyHtml',
];

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

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function readString(value) {
  return typeof value === 'string' ? value : '';
}

function normalizeLocalizedField(existingValue, ruValue) {
  let lv = '';
  let existingRu = '';

  if (typeof existingValue === 'string') {
    lv = existingValue;
  } else if (isPlainObject(existingValue)) {
    lv = readString(existingValue.lv);
    existingRu = readString(existingValue.ru);

    if (!lv) {
      const fallback = readString(existingValue.default);
      if (fallback) lv = fallback;
    }
  }

  const incomingRu = readString(ruValue);

  let finalRu = incomingRu;
  if (IMPORT_MODE === 'fill-ru' && existingRu) {
    finalRu = existingRu;
  }

  return {
    lv,
    ru: finalRu,
  };
}

function validateImportItem(item, index) {
  if (!item || typeof item !== 'object') {
    throw new Error(`Import item at index ${index} is invalid`);
  }

  if (!item.slug || typeof item.slug !== 'string') {
    throw new Error(`Import item at index ${index} is missing slug`);
  }
}

function loadImportFile(filePath) {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) {
    throw new Error(`Import file not found: ${abs}`);
  }

  const raw = fs.readFileSync(abs, 'utf8');
  const parsed = JSON.parse(raw);

  let items = [];
  if (Array.isArray(parsed)) {
    items = parsed;
  } else if (Array.isArray(parsed.items)) {
    items = parsed.items;
  } else {
    throw new Error(
      'Import file must be an array or an object with an items array'
    );
  }

  items.forEach(validateImportItem);

  const bySlug = new Map();
  for (const item of items) {
    if (bySlug.has(item.slug)) {
      throw new Error(`Duplicate slug in import file: ${item.slug}`);
    }
    bySlug.set(item.slug, item);
  }

  return { abs, items, bySlug };
}

async function run() {
  console.log('=== Import RU device content + localize Firestore shape ===');
  console.log('Mode:', IMPORT_MODE);
  console.log('Dry run:', DRY_RUN ? 'yes' : 'no');

  const { abs, items, bySlug } = loadImportFile(IMPORT_FILE);
  console.log('Import file:', abs);
  console.log('Import rows:', items.length);

  initFirebaseAdmin();

  const db = admin.firestore();
  const snap = await db.collection('devices').get();

  console.log('Firestore device docs:', snap.size);

  const BATCH_LIMIT = 200;
  let processed = 0;
  let written = 0;
  let missingInImport = 0;
  let missingInFirestore = 0;
  let unchanged = 0;

  const firestoreSlugs = new Set(snap.docs.map((doc) => doc.id));

  for (const slug of bySlug.keys()) {
    if (!firestoreSlugs.has(slug)) {
      missingInFirestore += 1;
      console.warn(`WARN: import slug not found in Firestore: ${slug}`);
    }
  }

  const updates = [];

  for (const doc of snap.docs) {
    processed += 1;

    const slug = doc.id;
    const data = doc.data() || {};
    const ruItem = bySlug.get(slug);

    if (!ruItem) {
      missingInImport += 1;
      console.warn(`WARN: Firestore device missing in import file: ${slug}`);
      continue;
    }

    const nextFields = {};
    let changed = false;

    for (const field of LOCALIZED_FIELDS) {
      const ruKey = `${field}_ru`;
      const currentValue = data[field];
      const nextValue = normalizeLocalizedField(currentValue, ruItem[ruKey]);

      const prevComparable = JSON.stringify(currentValue ?? null);
      const nextComparable = JSON.stringify(nextValue);

      if (prevComparable !== nextComparable) {
        changed = true;
      }

      nextFields[field] = nextValue;
    }

    if (!changed) {
      unchanged += 1;
      continue;
    }

    updates.push({
      slug,
      data: {
        ...nextFields,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    });
  }

  if (DRY_RUN) {
    console.log('--- Dry run summary ---');
    console.log('Processed:', processed);
    console.log('Would write:', updates.length);
    console.log('Unchanged:', unchanged);
    console.log('Missing in import:', missingInImport);
    console.log('Missing in Firestore:', missingInFirestore);
    console.log('=== Done ===');
    return;
  }

  for (let i = 0; i < updates.length; i += BATCH_LIMIT) {
    const chunk = updates.slice(i, i + BATCH_LIMIT);
    const batch = db.batch();

    for (const row of chunk) {
      const ref = db.collection('devices').doc(row.slug);
      batch.set(ref, row.data, { merge: true });
    }

    await batch.commit();
    written += chunk.length;
    console.log(`Committed chunk ${i / BATCH_LIMIT + 1} (${chunk.length} items)`);
  }

  console.log('=== Done ===');
  console.log('Processed:', processed);
  console.log('Written:', written);
  console.log('Unchanged:', unchanged);
  console.log('Missing in import:', missingInImport);
  console.log('Missing in Firestore:', missingInFirestore);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});