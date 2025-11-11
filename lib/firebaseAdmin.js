// /lib/firebaseAdmin.js
import admin from 'firebase-admin';

let initialized = false;

export function getDb() {
  if (!initialized) {
    const projectId   = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey  = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      // Don't crash at import/build time; throw only when actually used.
      throw new Error(
        'Missing Firebase Admin env vars. Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY are set.'
      );
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
      });
    }
    initialized = true;
  }
  return admin.firestore();
}
