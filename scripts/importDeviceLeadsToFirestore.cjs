/*
 * Updates only devices/{id}.lead from the generated review file.
 * Existing device fields are never replaced.
 *
 * Dry run:
 *   node scripts/importDeviceLeadsToFirestore.cjs
 *
 * Apply:
 *   node scripts/importDeviceLeadsToFirestore.cjs --apply
 *
 * Optional env:
 *   DEVICE_LEADS_PATH=tmp/devices.leads.json
 */

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const APPLY = process.argv.includes('--apply');
const INPUT_PATH = process.env.DEVICE_LEADS_PATH || 'tmp/devices.leads.json';
const BATCH_LIMIT = 400;

function assertEnv(name) {
  if (!process.env[name]) throw new Error(`Missing env var: ${name}`);
}

function initFirebaseAdmin() {
  if (admin.apps.length) return;

  assertEnv('FIREBASE_PROJECT_ID');
  assertEnv('FIREBASE_CLIENT_EMAIL');
  assertEnv('FIREBASE_PRIVATE_KEY');

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

function readAndValidate() {
  const inputPath = path.resolve(INPUT_PATH);
  if (!fs.existsSync(inputPath)) throw new Error(`File not found: ${inputPath}`);

  const payload = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  if (payload.collection !== 'devices' || !Array.isArray(payload.items)) {
    throw new Error(`${inputPath} must contain a devices items array`);
  }
  if (payload.count !== payload.items.length) throw new Error('Lead file count does not match items length');

  const ids = new Set();
  for (const item of payload.items) {
    if (!item.id || ids.has(item.id)) throw new Error(`Missing or duplicate id: ${item.id}`);
    ids.add(item.id);
    for (const locale of ['lv', 'ru']) {
      if (!item.lead || typeof item.lead[locale] !== 'string' || !item.lead[locale].trim()) {
        throw new Error(`Missing ${item.id}.lead.${locale}`);
      }
    }
  }

  return payload.items;
}

async function run() {
  const items = readAndValidate();
  initFirebaseAdmin();
  const db = admin.firestore();

  console.log(`Mode: ${APPLY ? 'apply' : 'dry run'}`);
  console.log(`Lead records: ${items.length}`);

  const refs = items.map((item) => db.collection('devices').doc(item.id));
  const snapshots = await db.getAll(...refs);
  const missing = snapshots.filter((snap) => !snap.exists).map((snap) => snap.id);
  if (missing.length) throw new Error(`Firestore devices missing: ${missing.join(', ')}`);

  const changed = items.filter((item, index) => {
    const existing = snapshots[index].data().lead;
    return JSON.stringify(existing) !== JSON.stringify(item.lead);
  });

  console.log(`Changed leads: ${changed.length}`);
  console.log(`Unchanged leads: ${items.length - changed.length}`);

  if (!APPLY) {
    console.log('No writes performed. Re-run with --apply to import the leads.');
    return;
  }

  for (let offset = 0; offset < changed.length; offset += BATCH_LIMIT) {
    const chunk = changed.slice(offset, offset + BATCH_LIMIT);
    const batch = db.batch();

    for (const item of chunk) {
      batch.update(db.collection('devices').doc(item.id), { lead: item.lead });
    }

    await batch.commit();
    console.log(`Committed batch ${offset / BATCH_LIMIT + 1}: ${chunk.length} lead updates`);
  }

  console.log(`Imported ${changed.length} device leads. Only the lead field was updated.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

