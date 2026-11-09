import fs from 'node:fs';
import { createRequire } from 'node:module';
import { planFaqMigration, applyFaqMigration } from '../lib/faq/faqMigration.mjs';

const require = createRequire(import.meta.url);
const manifest = JSON.parse(fs.readFileSync(new URL('../lib/faq/faqMigration.manifest.json', import.meta.url)));
const mode = process.argv[2] || '--manifest';
if (!['--manifest', '--check-production', '--apply-emulator'].includes(mode)) throw new Error('Unsupported mode');
if (mode === '--manifest') {
  console.log(JSON.stringify(planFaqMigration(manifest), null, 2));
} else {
  const admin = require('firebase-admin');
  let app;
  if (mode === '--apply-emulator') {
    if (!/^(127\.0\.0\.1|localhost):\d+$/.test(process.env.FIRESTORE_EMULATOR_HOST || '')) throw new Error('A local Firestore emulator is required; production writes are disabled');
    app = admin.initializeApp({ projectId: 'demo-ilab-faq' });
  } else {
    if (process.env.FIRESTORE_EMULATOR_HOST) throw new Error('Unset emulator host for a production read-only check');
    require('dotenv').config({ path: '.env.local', quiet: true });
    app = admin.initializeApp({ credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }) });
  }
  try {
    const db = app.firestore();
    if (mode === '--apply-emulator') {
      console.log(JSON.stringify(await applyFaqMigration(db, manifest, admin.firestore.FieldValue.serverTimestamp()), null, 2));
    } else {
      const snapshots = await db.getAll(...manifest.documents.map(doc => db.collection('faqGroups').doc(doc.id)));
      console.log(JSON.stringify(planFaqMigration(manifest, new Map(snapshots.filter(doc => doc.exists).map(doc => [doc.id, doc.data()]))), null, 2));
    }
  } finally {
    await app.delete();
  }
}
