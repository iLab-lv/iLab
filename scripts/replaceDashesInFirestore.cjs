require('dotenv').config({ path: '.env.local' });

const admin = require('firebase-admin');

const DRY_RUN = process.env.DRY_RUN !== '0';
const DASH_RE = /[—–]/g;

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

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

function fixValue(value) {
  if (typeof value === 'string') {
    return value.replace(DASH_RE, '-');
  }

  if (Array.isArray(value)) {
    return value.map(fixValue);
  }

  if (
    value &&
    typeof value === 'object' &&
    typeof value.toDate !== 'function' &&
    !(value instanceof admin.firestore.GeoPoint) &&
    !(value instanceof admin.firestore.DocumentReference)
  ) {
    const out = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      out[key] = fixValue(nestedValue);
    }
    return out;
  }

  return value;
}

function hasChanges(before, after) {
  return JSON.stringify(before) !== JSON.stringify(after);
}

async function processDocument(docRef) {
  const snap = await docRef.get();
  if (!snap.exists) return { checked: 1, updated: 0 };

  const before = snap.data() || {};
  const after = fixValue(before);

  let updated = 0;

  if (hasChanges(before, after)) {
    console.log(`${DRY_RUN ? '[DRY RUN]' : '[UPDATE]'} ${docRef.path}`);

    if (!DRY_RUN) {
      await docRef.set(after, { merge: false });
    }

    updated = 1;
  }

  const subcollections = await docRef.listCollections();

  let checked = 1;

  for (const subcollection of subcollections) {
    const result = await processCollection(subcollection);
    checked += result.checked;
    updated += result.updated;
  }

  return { checked, updated };
}

async function processCollection(collectionRef) {
  const snap = await collectionRef.get();

  let checked = 0;
  let updated = 0;

  for (const doc of snap.docs) {
    const result = await processDocument(doc.ref);
    checked += result.checked;
    updated += result.updated;
  }

  return { checked, updated };
}

async function run() {
  console.log('=== Replace Firestore dashes ===');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'WRITE'}`);

  initFirebaseAdmin();

  const db = admin.firestore();
  const collections = await db.listCollections();

  let checked = 0;
  let updated = 0;

  for (const collection of collections) {
    console.log(`Checking collection: ${collection.id}`);

    const result = await processCollection(collection);
    checked += result.checked;
    updated += result.updated;
  }

  console.log('=== Done ===');
  console.log(`Checked docs: ${checked}`);
  console.log(`${DRY_RUN ? 'Would update' : 'Updated'} docs: ${updated}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});