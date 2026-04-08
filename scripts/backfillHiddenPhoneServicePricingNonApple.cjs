/* scripts/backfillHiddenPhoneServicePricingNonApple.cjs
 *
 * One-time migration for Firestore collection: servicePricing
 *
 * Goal:
 * - for NON-APPLE phone models only
 * - ensure these servicePricing rows exist:
 *     - phone-display-incell
 *     - phone-display-oled
 *     - phone-camera
 * - create missing rows as explicitly hidden
 *
 * Created rows will have:
 *   price: null
 *   isHidden: true
 *   isStartingFrom: false
 *   currency: 'EUR'
 *   isActive: true
 *   type: 'servicePricing'
 *
 * IMPORTANT:
 * - touches ONLY devices where:
 *     categoryKey === 'telefonu-remonts'
 *     brandKey !== 'apple'
 * - does NOT modify iPhone rows
 * - does NOT overwrite existing servicePricing docs
 * - does NOT delete anything
 *
 * Usage:
 *   node scripts/backfillHiddenPhoneServicePricingNonApple.cjs
 *
 * Optional env:
 *   IMPORT_MODE=overwrite   (default)
 *   IMPORT_MODE=skip        (same behavior here; existing docs are skipped)
 *
 * Required env in .env.local:
 *   FIREBASE_PROJECT_ID=
 *   FIREBASE_CLIENT_EMAIL=
 *   FIREBASE_PRIVATE_KEY=
 */

require('dotenv').config({ path: '.env.local' });

const admin = require('firebase-admin');

const IMPORT_MODE = process.env.IMPORT_MODE || 'overwrite'; // kept for consistency

const PHONE_CATEGORY_KEY = 'telefonu-remonts';
const APPLE_BRAND_KEY = 'apple';
const DEFAULT_CURRENCY = 'EUR';

const REQUIRED_HIDDEN_SERVICE_IDS = [
  'phone-display-incell',
  'phone-display-oled',
  'phone-camera',
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

function norm(value) {
  return String(value ?? '').trim().toLowerCase();
}

async function run() {
  console.log('=== Backfill hidden phone servicePricing rows for non-Apple models ===');
  console.log('Mode:', IMPORT_MODE);

  initFirebaseAdmin();
  const db = admin.firestore();

  console.log('Loading devices from Firestore...');
  const devicesSnap = await db.collection('devices').get();

  if (devicesSnap.empty) {
    console.log('No device docs found. Nothing to do.');
    return;
  }

  const eligibleModels = [];

  for (const docSnap of devicesSnap.docs) {
    const data = docSnap.data() || {};
    const categoryKey = norm(data.categoryKey);
    const brandKey = norm(data.brandKey);
    const slug = String(data.slug || docSnap.id).trim();

    if (!slug) continue;
    if (categoryKey !== PHONE_CATEGORY_KEY) continue;
    if (brandKey === APPLE_BRAND_KEY) continue;

    eligibleModels.push({
      modelId: slug,
      categoryId: data.categoryKey || PHONE_CATEGORY_KEY,
      brandKey: data.brandKey || '',
      name: data.name || slug,
    });
  }

  console.log(`Eligible non-Apple phone models: ${eligibleModels.length}`);

  if (!eligibleModels.length) {
    console.log('No eligible models found. Nothing to do.');
    return;
  }

  console.log('Loading existing servicePricing docs...');
  const pricingSnap = await db.collection('servicePricing').get();

  const existingDocIds = new Set(pricingSnap.docs.map((d) => d.id));

  console.log(`Existing servicePricing docs: ${existingDocIds.size}`);

  const docsToCreate = [];

  for (const model of eligibleModels) {
    for (const serviceId of REQUIRED_HIDDEN_SERVICE_IDS) {
      const docId = `${model.modelId}__${serviceId}`;

      if (existingDocIds.has(docId)) {
        continue;
      }

      docsToCreate.push({
        docId,
        data: {
          modelId: model.modelId,
          serviceId,
          categoryId: model.categoryId || PHONE_CATEGORY_KEY,
          price: null,
          isHidden: true,
          isStartingFrom: false,
          currency: DEFAULT_CURRENCY,
          isActive: true,
          type: 'servicePricing',
        },
      });
    }
  }

  console.log(`Missing hidden rows to create: ${docsToCreate.length}`);

  if (!docsToCreate.length) {
    console.log('Nothing to create.');
    return;
  }

  const BATCH_LIMIT = 200;
  let written = 0;

  for (let i = 0; i < docsToCreate.length; i += BATCH_LIMIT) {
    const chunk = docsToCreate.slice(i, i + BATCH_LIMIT);
    const batch = db.batch();

    for (const item of chunk) {
      const ref = db.collection('servicePricing').doc(item.docId);

      batch.set(
        ref,
        {
          ...item.data,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    await batch.commit();
    written += chunk.length;
    console.log(`Committed chunk ${i / BATCH_LIMIT + 1} (${chunk.length} items)`);
  }

  console.log('=== Done ===');
  console.log('Created:', written);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});