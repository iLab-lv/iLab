// lib/firebaseClient.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

  // optional (but good to have)
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

function assertFirebaseClientConfig(cfg) {
  const required = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missing = required.filter((k) => !cfg[k]);
  if (missing.length) {
    throw new Error(
      `Missing NEXT_PUBLIC Firebase env vars: ${missing.join(', ')}`
    );
  }
}

assertFirebaseClientConfig(firebaseConfig);

export const firebaseApp =
  getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
