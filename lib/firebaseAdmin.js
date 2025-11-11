import admin from 'firebase-admin';

// Ensure we initialize the Admin SDK only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,     // ilab-v2
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // from service account JSON
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const db = admin.firestore();
