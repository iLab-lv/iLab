/* scripts/setHiddenPhoneServicePricingNonApple.cjs
 *
 * One-time migration for Firestore collection: servicePricing
 *
 * Goal:
 * - add explicit isHidden field for NON-APPLE phone models only
 * - mark these services as hidden:
 *     - phone-display-incell
 *     - phone-display-oled
 *     - phone-camera
 * - set isHidden=false for all other servicePricing rows of the same models
 *
 * IMPORTANT:
 * - touches ONLY devices where:
 *     categoryKey === 'telefonu-remonts'
 *     brandKey !== 'apple'
 * - does NOT modify iPhone rows
 * - does NOT modify price values
 * - does NOT delete anything
 *
 * Usage:
 *   node scripts/setHiddenPhoneServicePricingNonApple.cjs
 *
 * Optional env:
 *   IMPORT_MODE=overwrite   (default)
 *   IMPORT_MODE=skip        (skip rows that already have isHidden set)
 *
 * Required env in .env.local:
 *   FIREBASE_PROJECT_ID=
 *   FIREBASE_CLIENT_EMAIL=
 *   FIREBASE_PRIVATE_KEY=
 */

require('dotenv').config({ path: '.env.local' });

const admin = require('firebase-admin');

const IMPORT_MODE = process.env.IMPORT_MODE || 'overwrite'; // 'overwrite' | 'skip'

const PHONE_CATEGORY_KEY = 'telefonu-remonts';
const APPLE_BRAND_KEY = 'apple';

const HIDDEN_SERVICE_IDS = new Set([
  'phone-display-incell',
  'phone-display-oled',
  'phone-camera',
]);

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

function norm(value) {
  return String(value ?? '').trim().toLowerCase();
}

function validateDeviceDoc(data, docId) {
  if (!data || typeof data !== 'object') {
    throw new Error(`Invalid device doc: ${docId}`);
  }
}

async function run() {
  console.log('=== Set hidden phone servicePricing for non-Apple models ===');
  console.log('Mode:', IMPORT_MODE);

  initFirebaseAdmin();
  const db = admin.firestore();

  console.log('Loading devices from Firestore...');

  const devicesSnap = await db.collection('devices').get();

  if (devicesSnap.empty) {
    console.log('No device docs found. Nothing to update.');
    return;
  }

  const eligibleModelIds = new Set();

  for (const doc of devicesSnap.docs) {
    const data = doc.data() || {};
    validateDeviceDoc(data, doc.id);

    const categoryKey = norm(data.categoryKey);
    const brandKey = norm(data.brandKey);
    const slug = String(data.slug || doc.id).trim();

    if (!slug) continue;

    if (categoryKey !== PHONE_CATEGORY_KEY) continue;
    if (brandKey === APPLE_BRAND_KEY) continue;

    eligibleModelIds.add(slug);
  }

  console.log(`Eligible non-Apple phone models: ${eligibleModelIds.size}`);

  if (eligibleModelIds.size === 0) {
    console.log('No eligible models found. Nothing to update.');
    return;
  }

  console.log('Loading servicePricing rows...');
  const pricingSnap = await db.collection('servicePricing').get();

  if (pricingSnap.empty) {
    console.log('No servicePricing docs found. Nothing to update.');
    return;
  }

  const docsToWrite = [];

  for (const docSnap of pricingSnap.docs) {
    const data = docSnap.data() || {};
    const modelId = String(data.modelId || '').trim();
    const serviceId = String(data.serviceId || '').trim();

    if (!modelId || !serviceId) continue;
    if (!eligibleModelIds.has(modelId)) continue;

    const nextIsHidden = HIDDEN_SERVICE_IDS.has(serviceId);

    if (IMPORT_MODE === 'skip' && typeof data.isHidden === 'boolean') {
      continue;
    }

    if (IMPORT_MODE !== 'skip' && data.isHidden === nextIsHidden) {
      continue;
    }

    docsToWrite.push({
      ref: docSnap.ref,
      modelId,
      serviceId,
      nextIsHidden,
    });
  }

  console.log(`Rows to update: ${docsToWrite.length}`);

  if (docsToWrite.length === 0) {
    console.log('Nothing to update.');
    return;
  }

  const BATCH_LIMIT = 200;
  let written = 0;
  let hiddenTrue = 0;
  let hiddenFalse = 0;

  for (let i = 0; i < docsToWrite.length; i += BATCH_LIMIT) {
    const chunk = docsToWrite.slice(i, i + BATCH_LIMIT);
    const batch = db.batch();

    for (const row of chunk) {
      batch.set(
        row.ref,
        {
          isHidden: row.nextIsHidden,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      if (row.nextIsHidden) hiddenTrue += 1;
      else hiddenFalse += 1;
    }

    await batch.commit();
    written += chunk.length;
    console.log(`Committed chunk ${i / BATCH_LIMIT + 1} (${chunk.length} items)`);
  }

  console.log('=== Done ===');
  console.log('Written:', written);
  console.log('Set isHidden=true:', hiddenTrue);
  console.log('Set isHidden=false:', hiddenFalse);
}
run().catch((err) => {
  console.error(err);
  process.exit(1);
});