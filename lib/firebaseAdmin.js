// lib/firebaseAdmin.js
import admin from 'firebase-admin';

let app;

// Avoid initializing twice in dev / serverless
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Vercel stores multiline envs; also support escaped \n from local .env
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase admin credentials env vars');
  }

  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
} else {
  app = admin.app();
}

// Named export: Firestore instance
export const db = admin.firestore(app);

// (optional) default export if you want it elsewhere
export default db;
