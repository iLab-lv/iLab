/* scripts/importSiteSettingsToFirestore.cjs
 *
 * Imports site-wide settings from: app/data/site.config.js
 * Writes to Firestore document: settings/site
 *
 * Fields:
 *  - company
 *  - socials
 *  - hours
 *  - pinPositions
 *  - locations
 *  - updatedAt: serverTimestamp
 *  - createdAt: serverTimestamp
 *
 * Usage:
 *   node scripts/importSiteSettingsToFirestore.cjs
 *
 * Optional env:
 *   IMPORT_MODE=overwrite  (default)
 *   IMPORT_MODE=skip       (skip if doc exists)
 */

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const admin = require('firebase-admin');

const IMPORT_MODE = process.env.IMPORT_MODE || 'overwrite'; // 'overwrite' | 'skip'

const SITE_CONFIG_FILE = path.join(
  process.cwd(),
  'app',
  'data',
  'site.config.js'
);

const COLLECTION = 'settings';
const DOC_ID = 'site';

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

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

function loadSiteConfig(filepath) {
  if (!fs.existsSync(filepath)) {
    throw new Error(`Site config file not found at: ${filepath}`);
  }

  const src = fs.readFileSync(filepath, 'utf8');

  const transformed = src
    .replace(/export\s+const\s+COMPANY\s*=/g, 'const COMPANY =')
    .replace(/export\s+const\s+SOCIALS\s*=/g, 'const SOCIALS =')
    .replace(/export\s+const\s+HOURS\s*=/g, 'const HOURS =')
    .replace(/export\s+const\s+PIN_POSITIONS\s*=/g, 'const PIN_POSITIONS =')
    .replace(/export\s+const\s+LOCATIONS\s*=/g, 'const LOCATIONS =')
    .concat(`
      globalThis.__siteConfigExports = {
        COMPANY,
        SOCIALS,
        HOURS,
        PIN_POSITIONS,
        LOCATIONS
      };
    `);

  const context = vm.createContext({ console });
  const script = new vm.Script(transformed, { filename: 'site.config.js' });

  script.runInContext(context);

  const exports = context.__siteConfigExports;

  if (
    !exports ||
    !exports.COMPANY ||
    !exports.SOCIALS ||
    !exports.HOURS ||
    !exports.PIN_POSITIONS ||
    !exports.LOCATIONS
  ) {
    throw new Error(`Failed to load site config exports from ${filepath}`);
  }

  return exports;
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeCompany(company = {}) {
  return {
    name: normalizeString(company.name),
    url: normalizeString(company.url),
    email: normalizeString(company.email),
    phoneMain: normalizeString(company.phoneMain),
    logo: normalizeString(company.logo),
  };
}

function normalizeSocials(socials = {}) {
  return {
    facebook: normalizeString(socials.facebook),
    instagram: normalizeString(socials.instagram),
    tiktok: normalizeString(socials.tiktok),
  };
}

function normalizeHours(hours = []) {
  if (!Array.isArray(hours)) return [];

  return hours
    .map((h) => ({
      day: normalizeString(h.day),
      opens: normalizeString(h.opens),
      closes: normalizeString(h.closes),
    }))
    .filter((h) => h.day && h.opens && h.closes);
}

function normalizePinPositions(pinPositions = {}) {
  const normalized = {};

  for (const [id, pos] of Object.entries(pinPositions)) {
    normalized[id] = {
      xPct: Number(pos?.xPct) || 0,
      yPct: Number(pos?.yPct) || 0,
    };
  }

  return normalized;
}

function normalizeLocations(locations = []) {
  if (!Array.isArray(locations)) return [];

  return locations
    .map((loc) => {
      const item = {
        id: normalizeString(loc.id),
        label: normalizeString(loc.label),
        address: normalizeString(loc.address),
        tel: normalizeString(loc.tel),
        telLink: normalizeString(loc.telLink),
        email: normalizeString(loc.email),
        wa: normalizeString(loc.wa),
        placeId: normalizeString(loc.placeId),
        maps: normalizeString(loc.maps),
        destination: normalizeString(loc.destination),
        hours: normalizeHours(loc.hours),
      };

      if (loc.hoursOverride) {
        item.hoursOverride = {
          date: normalizeString(loc.hoursOverride.date),
          opens: normalizeString(loc.hoursOverride.opens),
          closes: normalizeString(loc.hoursOverride.closes),
        };
      }

      if (loc.specialNotice) {
        item.specialNotice = normalizeString(loc.specialNotice);
      }

      return item;
    })
    .filter((loc) => loc.id);
}

function buildSiteSettingsDoc(config) {
  return {
    company: normalizeCompany(config.COMPANY),
    socials: normalizeSocials(config.SOCIALS),
    hours: normalizeHours(config.HOURS),
    pinPositions: normalizePinPositions(config.PIN_POSITIONS),
    locations: normalizeLocations(config.LOCATIONS),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

async function run() {
  console.log('=== Import Site Settings to Firestore ===');
  console.log('File:', SITE_CONFIG_FILE);
  console.log('Mode:', IMPORT_MODE);
  console.log('Target:', `${COLLECTION}/${DOC_ID}`);

  initFirebaseAdmin();

  const db = admin.firestore();
  const config = loadSiteConfig(SITE_CONFIG_FILE);
  const data = buildSiteSettingsDoc(config);
  const ref = db.collection(COLLECTION).doc(DOC_ID);

  if (IMPORT_MODE === 'skip') {
    const snap = await ref.get();

    if (snap.exists) {
      console.log('Document already exists. Skipped.');
      return;
    }
  }

  await ref.set(data, { merge: true });

  console.log('=== Done ===');
  console.log('Written:', `${COLLECTION}/${DOC_ID}`);
  console.log('Locations:', data.locations.length);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});