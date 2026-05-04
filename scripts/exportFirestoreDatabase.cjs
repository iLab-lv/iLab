/* scripts/exportFirestoreDatabase.cjs
 *
 * Exports full Firestore database:
 * - all root collections
 * - all documents
 * - all nested subcollections recursively
 *
 * Usage:
 *   node scripts/exportFirestoreDatabase.cjs
 *
 * Optional env:
 *   EXPORT_PATH=tmp/firestore.full.export.json
 *   EXPORT_PRETTY=1
 */

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const EXPORT_PATH =
  process.env.EXPORT_PATH || 'tmp/firestore.full.export.json';

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

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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

function isGeoPointLike(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.latitude === 'number' &&
    typeof value.longitude === 'number'
  );
}

function isDocumentReferenceLike(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.path === 'string' &&
    value.firestore
  );
}

function serializeFirestoreValue(value) {
  if (value === null || value === undefined) return value;

  if (isTimestampLike(value)) {
    return {
      __type: 'timestamp',
      value: value.toDate().toISOString(),
    };
  }

  if (isGeoPointLike(value)) {
    return {
      __type: 'geopoint',
      latitude: value.latitude,
      longitude: value.longitude,
    };
  }

  if (isDocumentReferenceLike(value)) {
    return {
      __type: 'reference',
      path: value.path,
    };
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

async function exportDocument(docRef) {
  const snap = await docRef.get();
  const data = snap.exists ? snap.data() || {} : {};

  const subcollections = await docRef.listCollections();
  const exportedSubcollections = {};

  for (const subcollectionRef of subcollections) {
    exportedSubcollections[subcollectionRef.id] =
      await exportCollection(subcollectionRef);
  }

  return {
    id: docRef.id,
    path: docRef.path,
    exists: snap.exists,
    data: serializeFirestoreValue(data),
    subcollections: exportedSubcollections,
  };
}

async function exportCollection(collectionRef) {
  const snap = await collectionRef.get();

  const docs = [];

  for (const doc of snap.docs) {
    docs.push(await exportDocument(doc.ref));
  }

  docs.sort((a, b) =>
    String(a.id).localeCompare(String(b.id), undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  );

  return {
    id: collectionRef.id,
    path: collectionRef.path,
    count: docs.length,
    docs,
  };
}

async function run() {
  console.log('=== Export full Firestore database ===');

  initFirebaseAdmin();

  const db = admin.firestore();
  const rootCollections = await db.listCollections();

  const collections = {};

  for (const collectionRef of rootCollections) {
    console.log(`Exporting collection: ${collectionRef.id}`);
    collections[collectionRef.id] = await exportCollection(collectionRef);
  }

  const payload = {
    exportedAt: new Date().toISOString(),
    projectId: process.env.FIREBASE_PROJECT_ID,
    type: 'full-firestore-export',
    rootCollectionCount: rootCollections.length,
    collections,
  };

  const outputPath = path.resolve(EXPORT_PATH);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  fs.writeFileSync(
    outputPath,
    JSON.stringify(payload, null, EXPORT_PRETTY ? 2 : 0),
    'utf8'
  );

  console.log(`Saved to: ${outputPath}`);
  console.log('=== Done ===');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});