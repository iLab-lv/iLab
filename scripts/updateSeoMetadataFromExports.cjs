// scripts/updateSeoMetadataFromExports.cjs

/* scripts/updateSeoMetadataFromExports.cjs
 *
 * Updates existing Firestore records from reviewed SEO export files.
 *
 * Auth pattern matches your existing import script:
 * - reads .env.local from project root
 * - uses FIREBASE_PROJECT_ID
 * - uses FIREBASE_CLIENT_EMAIL
 * - uses FIREBASE_PRIVATE_KEY
 *
 * Expected JSON location by default:
 * - scripts/categories.export.meta-final-reviewed-v8.json
 * - scripts/devices.export.meta-final-reviewed-v10.json
 *
 * Dry run:
 *   node scripts/updateSeoMetadataFromExports.cjs
 *
 * Test first 5 records:
 *   UPDATE_LIMIT=5 node scripts/updateSeoMetadataFromExports.cjs
 *
 * Apply:
 *   UPDATE_MODE=apply node scripts/updateSeoMetadataFromExports.cjs
 *
 * Only categories:
 *   UPDATE_MODE=apply UPDATE_ONLY=categories node scripts/updateSeoMetadataFromExports.cjs
 *
 * Only devices:
 *   UPDATE_MODE=apply UPDATE_ONLY=devices node scripts/updateSeoMetadataFromExports.cjs
 */

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const UPDATE_MODE = process.env.UPDATE_MODE || 'dry'; // dry | apply
const UPDATE_ONLY = process.env.UPDATE_ONLY || ''; // categories | devices | empty
const UPDATE_LIMIT = process.env.UPDATE_LIMIT ? Number(process.env.UPDATE_LIMIT) : null;

const CATEGORIES_COLLECTION = 'categories';
const DEVICES_COLLECTION = 'devices';

const CATEGORIES_EXPORT_PATH =
  process.env.CATEGORIES_EXPORT_PATH ||
  path.join(__dirname, 'categories.export.meta-final-reviewed-v8.json');

const DEVICES_EXPORT_PATH =
  process.env.DEVICES_EXPORT_PATH ||
  path.join(__dirname, 'devices.export.meta-final-reviewed-v10.json');

const BATCH_LIMIT = 400;

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

function readJson(filePath) {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
}

function assertExportShape(exportData, expectedCollection, filePath) {
  if (!exportData || !Array.isArray(exportData.items)) {
    throw new Error(`${filePath} must contain an items array`);
  }

  if (exportData.collection && exportData.collection !== expectedCollection) {
    throw new Error(
      `${filePath} has collection="${exportData.collection}", expected "${expectedCollection}"`
    );
  }
}

function assertLocalizedText(obj, pathLabel) {
  for (const lang of ['lv', 'ru']) {
    if (!obj || typeof obj[lang] !== 'string' || !obj[lang].trim()) {
      throw new Error(`Missing localized text: ${pathLabel}.${lang}`);
    }
  }
}

function validateCategoryDoc(doc) {
  if (!doc.id) throw new Error('Category item missing id');
  if (!doc.slug) throw new Error(`Category ${doc.id} missing slug`);

  assertLocalizedText(doc.h1, `${doc.id}.h1`);
  assertLocalizedText(doc.metaTitle, `${doc.id}.metaTitle`);
  assertLocalizedText(doc.metaDescription, `${doc.id}.metaDescription`);

  if (doc.bodyHtml) {
    assertLocalizedText(doc.bodyHtml, `${doc.id}.bodyHtml`);
  }

  const brandKeys = new Set();

  for (const brand of doc.brands || []) {
    if (!brand.key) {
      throw new Error(`Category ${doc.id} has brand without key`);
    }

    if (brandKeys.has(brand.key)) {
      throw new Error(`Category ${doc.id} has duplicate brand key: ${brand.key}`);
    }

    brandKeys.add(brand.key);

    if (brand.page) {
      assertLocalizedText(brand.page.h1, `${doc.id}.brands.${brand.key}.page.h1`);
      assertLocalizedText(brand.page.metaTitle, `${doc.id}.brands.${brand.key}.page.metaTitle`);
      assertLocalizedText(
        brand.page.metaDescription,
        `${doc.id}.brands.${brand.key}.page.metaDescription`
      );

      if (brand.page.bodyHtml) {
        assertLocalizedText(brand.page.bodyHtml, `${doc.id}.brands.${brand.key}.page.bodyHtml`);
      }
    }
  }
}

function validateDeviceDoc(doc) {
  if (!doc.id) throw new Error('Device item missing id');

  assertLocalizedText(doc.h1, `${doc.id}.h1`);
  assertLocalizedText(doc.metaTitle, `${doc.id}.metaTitle`);
  assertLocalizedText(doc.metaDescription, `${doc.id}.metaDescription`);

  if (doc.bodyHtml) {
    assertLocalizedText(doc.bodyHtml, `${doc.id}.bodyHtml`);
  }
}

function pickCategoryUpdate(doc) {
  const update = {
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
    h1: doc.h1,
  };

  if (Object.prototype.hasOwnProperty.call(doc, 'bodyHtml')) {
    update.bodyHtml = doc.bodyHtml;
  }

  /*
   * Brand page metadata/content is nested inside brands[].
   * Firestore cannot update one array item by brand.key.
   * So we replace the reviewed brands array as a whole.
   *
   * This does NOT replace the whole category document.
   */
  if (Array.isArray(doc.brands)) {
    update.brands = doc.brands;
  }

  return update;
}

function pickDeviceUpdate(doc) {
  const update = {
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
    h1: doc.h1,
  };

  if (Object.prototype.hasOwnProperty.call(doc, 'bodyHtml')) {
    update.bodyHtml = doc.bodyHtml;
  }

  return update;
}

function jsonEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function getChangedFields(existingData, updateData) {
  const changed = [];

  for (const key of Object.keys(updateData)) {
    if (!jsonEqual(existingData ? existingData[key] : undefined, updateData[key])) {
      changed.push(key);
    }
  }

  return changed;
}

async function updateDocs({ db, collectionName, docs, validateDoc, pickUpdate }) {
  const limitedDocs = UPDATE_LIMIT ? docs.slice(0, UPDATE_LIMIT) : docs;

  let checked = 0;
  let changed = 0;
  let written = 0;
  let unchanged = 0;
  let skippedMissing = 0;

  let batch = db.batch();
  let batchWrites = 0;
  let batchIndex = 1;

  async function commitBatchIfNeeded(force = false) {
    if (!batchWrites) return;
    if (!force && batchWrites < BATCH_LIMIT) return;

    if (UPDATE_MODE === 'apply') {
      await batch.commit();
      console.log(`Committed ${collectionName} batch ${batchIndex} (${batchWrites} writes)`);
    }

    batch = db.batch();
    batchWrites = 0;
    batchIndex += 1;
  }

  for (const doc of limitedDocs) {
    validateDoc(doc);
    checked += 1;

    const docId = doc.id;
    const ref = db.collection(collectionName).doc(docId);
    const snap = await ref.get();

    if (!snap.exists) {
      skippedMissing += 1;
      console.warn(`[missing] ${collectionName}/${docId}`);
      continue;
    }

    const existingData = snap.data();
    const updateData = pickUpdate(doc);
    const changedFields = getChangedFields(existingData, updateData);

    if (!changedFields.length) {
      unchanged += 1;
      console.log(`[same] ${collectionName}/${docId}`);
      continue;
    }

    changed += 1;

    console.log(
      `[${UPDATE_MODE}] ${collectionName}/${docId}: ${changedFields.join(', ')}`
    );

    if (UPDATE_MODE === 'apply') {
      batch.set(
        ref,
        {
          ...updateData,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      written += 1;
      batchWrites += 1;

      await commitBatchIfNeeded(false);
    }
  }

  await commitBatchIfNeeded(true);

  return {
    checked,
    changed,
    written,
    unchanged,
    skippedMissing,
  };
}

async function run() {
  console.log('=== Update SEO metadata/content from reviewed exports ===');
  console.log('Mode:', UPDATE_MODE);
  console.log('Only:', UPDATE_ONLY || 'all');
  console.log('Limit:', UPDATE_LIMIT || 'none');
  console.log('Categories file:', CATEGORIES_EXPORT_PATH);
  console.log('Devices file:', DEVICES_EXPORT_PATH);
  console.log('');

  if (!['dry', 'apply'].includes(UPDATE_MODE)) {
    throw new Error(`Unsupported UPDATE_MODE: ${UPDATE_MODE}. Use "dry" or "apply".`);
  }

  if (UPDATE_ONLY && !['categories', 'devices'].includes(UPDATE_ONLY)) {
    throw new Error(`Unsupported UPDATE_ONLY: ${UPDATE_ONLY}. Use "categories" or "devices".`);
  }

  if (UPDATE_LIMIT !== null && (!Number.isInteger(UPDATE_LIMIT) || UPDATE_LIMIT <= 0)) {
    throw new Error('UPDATE_LIMIT must be a positive integer');
  }

  initFirebaseAdmin();

  const db = admin.firestore();

  let categorySummary = null;
  let deviceSummary = null;

  if (UPDATE_ONLY !== 'devices') {
    const categoriesExport = readJson(CATEGORIES_EXPORT_PATH);
    assertExportShape(categoriesExport, CATEGORIES_COLLECTION, CATEGORIES_EXPORT_PATH);

    console.log(`Categories in file: ${categoriesExport.items.length}`);
    console.log('');

    categorySummary = await updateDocs({
      db,
      collectionName: CATEGORIES_COLLECTION,
      docs: categoriesExport.items,
      validateDoc: validateCategoryDoc,
      pickUpdate: pickCategoryUpdate,
    });
  }

  if (UPDATE_ONLY !== 'categories') {
    const devicesExport = readJson(DEVICES_EXPORT_PATH);
    assertExportShape(devicesExport, DEVICES_COLLECTION, DEVICES_EXPORT_PATH);

    console.log('');
    console.log(`Devices in file: ${devicesExport.items.length}`);
    console.log('');

    deviceSummary = await updateDocs({
      db,
      collectionName: DEVICES_COLLECTION,
      docs: devicesExport.items,
      validateDoc: validateDeviceDoc,
      pickUpdate: pickDeviceUpdate,
    });
  }

  console.log('');
  console.log('=== Summary ===');

  if (categorySummary) {
    console.log('Categories:', categorySummary);
  }

  if (deviceSummary) {
    console.log('Devices:', deviceSummary);
  }

  if (UPDATE_MODE === 'dry') {
    console.log('');
    console.log('Dry run complete. To write changes, run:');
    console.log('UPDATE_MODE=apply node scripts/updateSeoMetadataFromExports.cjs');
  }

  console.log('=== Done ===');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});