/* scripts/importPricingToFirestore.cjs
 *
 * Imports pricing from: app/data/devicePricing.js
 * Writes to Firestore collection: modelServices
 *
 * Doc ID: `${modelId}__${serviceId}`
 * Fields:
 *  - modelId
 *  - serviceId
 *  - price  (number | string | "" | null)  // kept exactly as in file
 *  - currency: "EUR"
 *  - updatedAt: serverTimestamp
 *
 * Usage:
 *   node scripts/importPricingToFirestore.cjs
 *
 * Optional env:
 *   IMPORT_MODE=overwrite  (default)
 *   IMPORT_MODE=skip       (skip if doc exists)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const admin = require('firebase-admin');

const IMPORT_MODE = process.env.IMPORT_MODE || 'overwrite'; // 'overwrite' | 'skip'
const PRICING_FILE = path.join(process.cwd(), 'app', 'data', 'devicePricing.js');

function assertEnv(name) {
  if (!process.env[name]) {
    throw new Error(`Missing env var: ${name}`);
  }
}

function initFirebaseAdmin() {
  if (admin.apps.length) return;

  // Uses the same env vars as your lib/firebaseAdmin.js
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

function loadDevicePricingObject(filepath) {
  if (!fs.existsSync(filepath)) {
    throw new Error(`devicePricing file not found at: ${filepath}`);
  }

  const src = fs.readFileSync(filepath, 'utf8');

  // Convert ESM-ish file into runnable script that defines `devicePricing`
  // - replace "export const devicePricing =" with "const devicePricing ="
  // - remove "export default devicePricing;"
  const transformed = src
    .replace(/export\s+const\s+devicePricing\s*=\s*/m, 'const devicePricing = ')
    .replace(/export\s+default\s+devicePricing\s*;?/gm, '')
    .concat('\n;globalThis.__devicePricing = devicePricing;\n');

  const context = vm.createContext({ console });
  const script = new vm.Script(transformed, { filename: 'devicePricing.js' });
  script.runInContext(context);

  const pricing = context.__devicePricing;
  if (!pricing || typeof pricing !== 'object') {
    throw new Error(`Failed to load devicePricing from ${filepath}`);
  }
  return pricing;
}

async function run() {
  console.log('=== Import pricing to Firestore ===');
  console.log('File:', PRICING_FILE);
  console.log('Mode:', IMPORT_MODE);

  initFirebaseAdmin();
  const db = admin.firestore();

  const devicePricing = loadDevicePricingObject(PRICING_FILE);

  // Flatten into docs
  const docs = [];
  for (const [modelId, modelObj] of Object.entries(devicePricing)) {
    const items = Array.isArray(modelObj?.items) ? modelObj.items : [];
    for (const it of items) {
      const serviceId = it?.id;
      if (!serviceId) continue;

      const docId = `${modelId}__${serviceId}`;
      docs.push({
        docId,
        modelId,
        serviceId,
        price: Object.prototype.hasOwnProperty.call(it, 'price') ? it.price : '',
      });
    }
  }

  console.log(`Models: ${Object.keys(devicePricing).length}`);
  console.log(`Docs to write: ${docs.length}`);

  // If skipping, we need to check existence (extra reads)
  async function shouldSkip(docRef) {
    if (IMPORT_MODE !== 'skip') return false;
    const snap = await docRef.get();
    return snap.exists;
  }

  // Batch write (500 limit)
  const BATCH_LIMIT = 450; // safer headroom
  let written = 0;
  let skipped = 0;

  for (let i = 0; i < docs.length; i += BATCH_LIMIT) {
    const chunk = docs.slice(i, i + BATCH_LIMIT);
    const batch = db.batch();

    // For skip mode, do existence checks sequentially per chunk (still ok)
    if (IMPORT_MODE === 'skip') {
      for (const d of chunk) {
        const ref = db.collection('modelServices').doc(d.docId);
        if (await shouldSkip(ref)) {
          skipped += 1;
          continue;
        }
        batch.set(
          ref,
          {
            modelId: d.modelId,
            serviceId: d.serviceId,
            price: d.price, // keep as-is (number/string/""/null)
            currency: 'EUR',
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
        written += 1;
      }
    } else {
      // overwrite/merge mode (default)
      for (const d of chunk) {
        const ref = db.collection('modelServices').doc(d.docId);
        batch.set(
          ref,
          {
            modelId: d.modelId,
            serviceId: d.serviceId,
            price: d.price, // keep as-is (number/string/""/null)
            currency: 'EUR',
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
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
