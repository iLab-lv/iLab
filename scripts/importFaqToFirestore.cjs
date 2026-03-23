/* scripts/importFaqToFirestore.cjs
 *
 * Imports FAQ content from: app/(site)/sections/faq/faq.i18n.js
 * Writes to Firestore collection: faqGroups
 *
 * Doc IDs:
 *  - basic_lv
 *  - basic_ru
 *  - category_<scopeKey>_<locale>
 *  - service_<scopeKey>_<locale>
 *
 * Fields:
 *  - scopeType: "basic" | "category" | "service"
 *  - scopeKey: string | null
 *  - locale: "lv" | "ru"
 *  - title: string
 *  - isPublished: true
 *  - order: number
 *  - items: [{ q, aHtml, order }]
 *  - updatedAt: serverTimestamp
 *  - createdAt: serverTimestamp
 *
 * Usage:
 *   node scripts/importFaqToFirestore.cjs
 *
 * Optional env:
 *   IMPORT_MODE=overwrite  (default)
 *   IMPORT_MODE=skip       (skip if doc exists)
 */

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const admin = require('firebase-admin');

const IMPORT_MODE = process.env.IMPORT_MODE || 'overwrite'; // 'overwrite' | 'skip'
const FAQ_FILE = path.join(
  process.cwd(),
  'app',
  '(site)',
  'sections',
  'faq',
  'faq.i18n.js'
);

const COLLECTION = 'faqGroups';
const LOCALES = ['lv', 'ru'];

const CATEGORY_KEYS = [
  'iphone-remonts',
  'telefonu-remonts',
  'plansetdatoru-remonts',
  'datoru-remonts',
  'dyson-remonts',
];

const SERVICE_KEYS = [
  'ekrana-maina',
  'baterijas-maina',
  'uzlades-ligzdas-maina',
  'kameras-remonts',
  'skalruni-mikrofona-remonts',
  'udens-bojajumu-remonts',
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
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  });
}

function loadFaqModule(filepath) {
  if (!fs.existsSync(filepath)) {
    throw new Error(`FAQ file not found at: ${filepath}`);
  }

  const src = fs.readFileSync(filepath, 'utf8');

  // Strip local import of faq.helpers.js
  // Convert exported functions to normal functions
  // Expose them on globalThis for retrieval from vm context
  const transformed = src
    .replace(
      /import\s+\{\s*faqItem\s*,\s*makeFaq\s*\}\s+from\s+['"].\/faq\.helpers(?:\.js)?['"]\s*;?/gm,
      ''
    )
    .replace(/export\s+function\s+getBasicFaq\s*\(/g, 'function getBasicFaq(')
    .replace(/export\s+function\s+getCategoryFaq\s*\(/g, 'function getCategoryFaq(')
    .replace(/export\s+function\s+getServiceFaq\s*\(/g, 'function getServiceFaq(')
    .concat(`
      globalThis.__faqExports = {
        getBasicFaq,
        getCategoryFaq,
        getServiceFaq
      };
    `);

  const context = vm.createContext({
    console,
    faqItem: (q, a) => ({ q, a }),
    makeFaq: (title, items) => ({ title, items }),
  });

  const script = new vm.Script(transformed, { filename: 'faq.i18n.js' });
  script.runInContext(context);

  const exports = context.__faqExports;
  if (
    !exports ||
    typeof exports.getBasicFaq !== 'function' ||
    typeof exports.getCategoryFaq !== 'function' ||
    typeof exports.getServiceFaq !== 'function'
  ) {
    throw new Error(`Failed to load FAQ functions from ${filepath}`);
  }

  return exports;
}

function normalizeTitle(title, fallback = '') {
  return typeof title === 'string' && title.trim() ? title.trim() : fallback;
}

function normalizeQuestion(q) {
  return typeof q === 'string' ? q.trim() : '';
}

function normalizeAnswerHtml(a) {
  return typeof a === 'string' && a.trim() ? a.trim() : '';
}

function normalizeItems(items = []) {
  return items
    .map((item, index) => ({
      q: normalizeQuestion(item.q),
      aHtml: normalizeAnswerHtml(item.a),
      order: (index + 1) * 10,
    }))
    .filter((item) => item.q && item.aHtml);
}

function buildDocId(scopeType, locale, scopeKey) {
  if (scopeType === 'basic') return `basic_${locale}`;
  return `${scopeType}_${scopeKey}_${locale}`;
}

function buildBasicDoc(getBasicFaq, locale) {
  const group = getBasicFaq(locale);

  return {
    docId: buildDocId('basic', locale),
    data: {
      scopeType: 'basic',
      scopeKey: null,
      locale,
      title: normalizeTitle(group.title),
      isPublished: true,
      order: 10,
      items: normalizeItems(group.items),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    },
  };
}

function buildCategoryDoc(getCategoryFaq, scopeKey, locale) {
  const group = getCategoryFaq(scopeKey, locale);

  return {
    docId: buildDocId('category', locale, scopeKey),
    data: {
      scopeType: 'category',
      scopeKey,
      locale,
      title: normalizeTitle(group.title),
      isPublished: true,
      order: 10,
      items: normalizeItems(group.items),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    },
  };
}

function buildServiceDoc(getServiceFaq, scopeKey, locale) {
  const group = getServiceFaq(scopeKey, locale);

  return {
    docId: buildDocId('service', locale, scopeKey),
    data: {
      scopeType: 'service',
      scopeKey,
      locale,
      title: normalizeTitle(group.title),
      isPublished: true,
      order: 10,
      items: normalizeItems(group.items),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    },
  };
}

async function shouldSkip(docRef) {
  if (IMPORT_MODE !== 'skip') return false;
  const snap = await docRef.get();
  return snap.exists;
}

async function run() {
  console.log('=== Import FAQ to Firestore ===');
  console.log('File:', FAQ_FILE);
  console.log('Mode:', IMPORT_MODE);

  initFirebaseAdmin();
  const db = admin.firestore();

  const { getBasicFaq, getCategoryFaq, getServiceFaq } = loadFaqModule(FAQ_FILE);

  const docs = [];

  for (const locale of LOCALES) {
    docs.push(buildBasicDoc(getBasicFaq, locale));

    for (const key of CATEGORY_KEYS) {
      docs.push(buildCategoryDoc(getCategoryFaq, key, locale));
    }

    for (const key of SERVICE_KEYS) {
      docs.push(buildServiceDoc(getServiceFaq, key, locale));
    }
  }

  console.log(`Docs to write: ${docs.length}`);

  const BATCH_LIMIT = 450;
  let written = 0;
  let skipped = 0;

  for (let i = 0; i < docs.length; i += BATCH_LIMIT) {
    const chunk = docs.slice(i, i + BATCH_LIMIT);
    const batch = db.batch();

    if (IMPORT_MODE === 'skip') {
      for (const d of chunk) {
        const ref = db.collection(COLLECTION).doc(d.docId);
        if (await shouldSkip(ref)) {
          skipped += 1;
          continue;
        }
        batch.set(ref, d.data, { merge: true });
        written += 1;
      }
    } else {
      for (const d of chunk) {
        const ref = db.collection(COLLECTION).doc(d.docId);
        batch.set(ref, d.data, { merge: true });
      }
      written += chunk.length;
    }

    await batch.commit();
    console.log(`Committed chunk ${i / BATCH_LIMIT + 1} (${chunk.length} items)`);
  }

  console.log('=== Done ===');
  console.log('Written:', written);
  console.log('Skipped:', skipped);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});