/* scripts/importDevicesToFirestore.cjs
 *
 * Imports devices from: app/data/devices.js
 * Writes to Firestore collection: devices
 *
 * Doc ID: device slug
 *
 * Transforms:
 * - category   -> categoryKey
 * - brandSlug  -> brandKey
 * - seriesSlug -> seriesKey
 * - removes popular
 * - removes legacy display-only fields: brand, series, seriesSlug
 *
 * Keeps:
 * - slug
 * - name
 * - year
 * - image
 * - order
 * - metaTitle
 * - metaDescription
 * - bodyHtml
 *
 * Usage:
 *   node scripts/importDevicesToFirestore.cjs
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
const DEVICES_FILE = path.join(process.cwd(), 'app', 'data', 'devices.js');

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

function loadDevicesArray(filepath) {
  if (!fs.existsSync(filepath)) {
    throw new Error(`devices file not found at: ${filepath}`);
  }

  const src = fs.readFileSync(filepath, 'utf8');

  // Convert ESM-ish file into runnable script that defines `devices`
  // - replace "const devices =" or "export const devices =" with "const devices ="
  // - remove "export default devices;"
  const transformed = src
    .replace(/export\s+const\s+devices\s*=\s*/m, 'const devices = ')
    .replace(/const\s+devices\s*=\s*/m, 'const devices = ')
    .replace(/export\s+default\s+devices\s*;?/gm, '')
    .concat('\n;globalThis.__devices = devices;\n');

  const context = vm.createContext({ console });
  const script = new vm.Script(transformed, { filename: 'devices.js' });
  script.runInContext(context);

  const devices = context.__devices;
  if (!Array.isArray(devices)) {
    throw new Error(`Failed to load devices array from ${filepath}`);
  }

  return devices;
}

function normalizeSeriesKey(device) {
  const categoryKey = device.category;
  const brandKey = device.brandSlug;
  const raw = String(device.seriesSlug || '').trim().toLowerCase();

  if (!raw) return null;

  // Apple iPhone special mappings
  if (categoryKey === 'telefonu-remonts' && brandKey === 'apple') {
    if (/^iphone-\d+-serija$/.test(raw)) {
      return raw.replace(/-serija$/, '');
    }

    if (raw === 'iphone-x-serija') return 'iphone-x';
    if (raw === 'iphone-se-serija') return 'iphone-se';
    if (raw === 'vecakie-iphone-modeli') return 'iphone-legacy';
  }

  // Generic Latvian "...-serija" => drop suffix
  if (raw.endsWith('-serija')) {
    return raw.replace(/-serija$/, '');
  }

  return raw;
}

function transformDevice(device) {
  if (!device.slug) {
    throw new Error(`Device missing slug: ${JSON.stringify(device, null, 2)}`);
  }
  if (!device.category) {
    throw new Error(`Device ${device.slug} missing category`);
  }
  if (!device.brandSlug) {
    throw new Error(`Device ${device.slug} missing brandSlug`);
  }

  const transformed = {
    slug: device.slug,
    type: 'device',

    categoryKey: device.category,
    brandKey: device.brandSlug,
    seriesKey: normalizeSeriesKey(device),

    name: device.name || '',
    year: Number.isFinite(device.year) ? device.year : null,
    image: device.image || '',
    order: Number.isFinite(device.order) ? device.order : 9999,

    // Editable page/content fields
    h1: `${device.name} remonts`,
    metaTitle: device.metaTitle || '',
    metaDescription: device.metaDescription || '',
    bodyHtml: device.bodyHtml || '',

    // Optional migration/debug helpers
    legacy: {
      importedFrom: 'app/data/devices.js',
      originalCategory: device.category || null,
      originalBrandSlug: device.brandSlug || null,
      originalSeriesSlug: device.seriesSlug || null,
      originalSeriesLabel: device.series || null,
    },
  };

  return transformed;
}

function validateDevices(devices) {
  const slugs = new Set();

  for (const device of devices) {
    if (!device.slug) {
      throw new Error(`Found device without slug`);
    }
    if (slugs.has(device.slug)) {
      throw new Error(`Duplicate device slug: ${device.slug}`);
    }
    slugs.add(device.slug);

    if (!device.category) {
      throw new Error(`Device ${device.slug} missing category`);
    }
    if (!device.brandSlug) {
      throw new Error(`Device ${device.slug} missing brandSlug`);
    }
    if (!device.name) {
      throw new Error(`Device ${device.slug} missing name`);
    }
  }
}

async function run() {
  console.log('=== Import devices to Firestore ===');
  console.log('File:', DEVICES_FILE);
  console.log('Mode:', IMPORT_MODE);

  initFirebaseAdmin();
  const db = admin.firestore();

  const devices = loadDevicesArray(DEVICES_FILE);
  validateDevices(devices);

  const docs = devices.map((device) => ({
    docId: device.slug,
    data: transformDevice(device),
  }));

  console.log(`Devices loaded: ${devices.length}`);
  console.log(`Docs to write: ${docs.length}`);

  async function shouldSkip(docRef) {
    if (IMPORT_MODE !== 'skip') return false;
    const snap = await docRef.get();
    return snap.exists;
  }

  const BATCH_LIMIT = 450;
  let written = 0;
  let skipped = 0;

  for (let i = 0; i < docs.length; i += BATCH_LIMIT) {
    const chunk = docs.slice(i, i + BATCH_LIMIT);
    const batch = db.batch();

    if (IMPORT_MODE === 'skip') {
      for (const d of chunk) {
        const ref = db.collection('devices').doc(d.docId);

        if (await shouldSkip(ref)) {
          skipped += 1;
          continue;
        }

        batch.set(
          ref,
          {
            ...d.data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
        written += 1;
      }
    } else {
      for (const d of chunk) {
        const ref = db.collection('devices').doc(d.docId);

        batch.set(
          ref,
          {
            ...d.data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      }
      written += chunk.length;
    }

    await batch.commit();
    console.log(`Committed chunk ${i / BATCH_LIMIT + 1} (${chunk.length} items)`);
  }

  console.log('=== Done ===');
  console.log('Written:', written);
  console.log('Skipped:', skipped);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});