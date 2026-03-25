// lib/content/devices.js
import 'server-only';
import admin from 'firebase-admin';

function assertEnv(name) {
  if (!process.env[name]) {
    throw new Error(`Missing env var: ${name}`);
  }
}

function initFirebaseAdmin() {
  if (admin.apps.length) return admin.app();

  assertEnv('FIREBASE_PROJECT_ID');
  assertEnv('FIREBASE_CLIENT_EMAIL');
  assertEnv('FIREBASE_PRIVATE_KEY');

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

function getDb() {
  initFirebaseAdmin();
  return admin.firestore();
}

function normalizeDevice(device = {}, docId = null) {
  return {
    slug: device.slug || docId || null,
    type: device.type || 'device',

    categoryKey: device.categoryKey || null,
    brandKey: device.brandKey || null,
    seriesKey: device.seriesKey || null,

    name: device.name || '',
    year: Number.isFinite(Number(device.year)) ? Number(device.year) : null,
    image: device.image || '',
    order: Number.isFinite(Number(device.order)) ? Number(device.order) : 9999,

    h1: device.h1 || '',
    metaTitle: device.metaTitle || '',
    metaDescription: device.metaDescription || '',
    bodyHtml: device.bodyHtml || '',
  };
}

function sortDevices(list) {
  return list.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return String(a.name).localeCompare(String(b.name), undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });
}

export async function getDevices() {
  const db = getDb();
  const snap = await db.collection('devices').get();

  return sortDevices(
    snap.docs.map((doc) => normalizeDevice(doc.data(), doc.id))
  );
}

export async function getDeviceBySlug(slug) {
  if (!slug) return null;

  const db = getDb();
  const doc = await db.collection('devices').doc(slug).get();

  if (!doc.exists) return null;

  return normalizeDevice(doc.data(), doc.id);
}

export async function getDevicesByCategory(categoryKey) {
  if (!categoryKey) return [];

  const db = getDb();
  const snap = await db
    .collection('devices')
    .where('categoryKey', '==', categoryKey)
    .get();

  return sortDevices(
    snap.docs.map((doc) => normalizeDevice(doc.data(), doc.id))
  );
}

export async function getDevicesByCategoryAndBrand(categoryKey, brandKey) {
  if (!categoryKey || !brandKey) return [];

  const db = getDb();
  const snap = await db
    .collection('devices')
    .where('categoryKey', '==', categoryKey)
    .where('brandKey', '==', brandKey)
    .get();

  return sortDevices(
    snap.docs.map((doc) => normalizeDevice(doc.data(), doc.id))
  );
}