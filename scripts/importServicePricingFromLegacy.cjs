/* scripts/importServicePricingFromLegacy.cjs
 *
 * Migrates legacy pricing rows from Firestore collection: modelServices
 * into a new Firestore collection: servicePricing
 *
 * IMPORTANT:
 * - This script DOES NOT modify or delete anything in `modelServices`.
 * - It only READS from:
 *     - modelServices
 *     - devices
 *     - services
 * - It only WRITES to:
 *     - servicePricing
 *
 * Matching logic:
 * - modelServices.modelId === devices.slug
 * - devices.categoryKey determines the category-specific service mapping
 *
 * New doc ID:
 *   ${modelId}__${mappedServiceId}
 *
 * Price migration logic:
 * - number              -> price: number
 * - "89"                -> price: 89
 * - "no 89" / "ot 89"   -> price: 89, isStartingFrom: true
 * - empty / null        -> omit price and isStartingFrom
 * - "pēc pieprasījuma"  -> omit price and isStartingFrom
 * - anything else       -> skipped and logged as invalid price
 *
 * Usage:
 *   node scripts/importServicePricingFromLegacy.cjs
 *
 * Optional env:
 *   IMPORT_MODE=overwrite   (default)
 *   IMPORT_MODE=skip        (skip if target doc already exists)
 *
 * Required env in .env.local:
 *   FIREBASE_PROJECT_ID=
 *   FIREBASE_CLIENT_EMAIL=
 *   FIREBASE_PRIVATE_KEY=
 */

require('dotenv').config({ path: '.env.local' });

const admin = require('firebase-admin');

const IMPORT_MODE = process.env.IMPORT_MODE || 'overwrite'; // 'overwrite' | 'skip'

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

const SERVICE_ID_MAP = {
  'telefonu-remonts': {
    'display-original': 'phone-display-original',
    'display-incell': 'phone-display-incell',
    'display-oled': 'phone-display-oled',
    'charge-port': 'phone-charge-port',
    'back-cover': 'phone-back-cover',
    battery: 'phone-battery',
    'camera-glass': 'phone-camera-glass',
    camera: 'phone-camera',
    'water-damage-clean': 'phone-water-damage-clean',
  },
  'plansetdatoru-remonts': {
    display: 'tablet-display',
    touchscreen: 'tablet-touchscreen',
    'charge-port': 'tablet-charge-port',
    battery: 'tablet-battery',
  },
  'datoru-remonts': {
    'laptop-battery': 'computer-battery',
    'laptop-display': 'computer-display',
    'laptop-liquid-damage': 'computer-liquid-damage',
    'laptop-maintenance': 'computer-maintenance',
    'laptop-keyboard': 'computer-keyboard',
    'laptop-touchpad': 'computer-touchpad',
  },
};

function mapLegacyServiceId(categoryKey, legacyServiceId) {
  const categoryMap = SERVICE_ID_MAP[categoryKey];
  if (!categoryMap) return null;
  return categoryMap[legacyServiceId] || null;
}

function parsePrice(raw) {
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    return {
      ok: true,
      price: raw,
      isStartingFrom: false,
      empty: false,
    };
  }

  if (raw == null) {
    return {
      ok: true,
      price: null,
      isStartingFrom: false,
      empty: true,
    };
  }

  if (typeof raw !== 'string') {
    return { ok: false, reason: `unsupported type: ${typeof raw}` };
  }

  const value = raw.trim().toLowerCase();

  if (!value || value === 'pēc pieprasījuma') {
    return {
      ok: true,
      price: null,
      isStartingFrom: false,
      empty: true,
    };
  }

  if (/^\d+(?:[.,]\d+)?$/.test(value)) {
    return {
      ok: true,
      price: Number(value.replace(',', '.')),
      isStartingFrom: false,
      empty: false,
    };
  }

  const startingFromMatch = value.match(/^(no|ot)\s+(\d+(?:[.,]\d+)?)$/i);
  if (startingFromMatch) {
    return {
      ok: true,
      price: Number(startingFromMatch[2].replace(',', '.')),
      isStartingFrom: true,
      empty: false,
    };
  }

  return { ok: false, reason: 'unrecognized price format' };
}

async function shouldSkip(docRef) {
  if (IMPORT_MODE !== 'skip') return false;
  const snap = await docRef.get();
  return snap.exists;
}

async function loadDevicesBySlug(db) {
  const snap = await db.collection('devices').get();
  const map = new Map();

  snap.forEach((doc) => {
    const data = doc.data() || {};
    if (data.slug) {
      map.set(data.slug, { id: doc.id, ...data });
    }
  });

  return map;
}

async function loadServiceIds(db) {
  const snap = await db.collection('services').get();
  const ids = new Set();
  snap.forEach((doc) => ids.add(doc.id));
  return ids;
}

function buildTargetDoc({
  legacyDocId,
  legacyData,
  mappedServiceId,
  categoryId,
  parsedPrice,
}) {
  const modelId = legacyData.modelId;
  const targetDocId = `${modelId}__${mappedServiceId}`;

  const data = {
    type: 'servicePricing',
    modelId,
    serviceId: mappedServiceId,
    categoryId,
    currency: legacyData.currency || 'EUR',
    isActive: typeof legacyData.isActive === 'boolean' ? legacyData.isActive : true,
    legacyServiceId: legacyData.serviceId || null,
    legacyDocId,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  if (parsedPrice.price !== null) {
    data.price = parsedPrice.price;
    data.isStartingFrom = parsedPrice.isStartingFrom;
  }

  return {
    docId: targetDocId,
    data,
  };
}

async function run() {
  console.log('=== Migrate legacy modelServices -> servicePricing ===');
  console.log('Mode:', IMPORT_MODE);
  console.log('This script will NOT modify modelServices.');

  initFirebaseAdmin();
  const db = admin.firestore();

  const [devicesBySlug, validServiceIds, legacySnap] = await Promise.all([
    loadDevicesBySlug(db),
    loadServiceIds(db),
    db.collection('modelServices').get(),
  ]);

  console.log('Loaded devices:', devicesBySlug.size);
  console.log('Loaded services:', validServiceIds.size);
  console.log('Legacy pricing rows:', legacySnap.size);

  const toWrite = [];
  const missingDeviceEntries = [];
  const invalidPriceEntries = [];

  let skippedMissingModelId = 0;
  let skippedMissingDevice = 0;
  let skippedMissingCategory = 0;
  let skippedUnmappedService = 0;
  let skippedMissingTargetService = 0;
  let skippedInvalidPrice = 0;

  legacySnap.forEach((doc) => {
    const legacyData = doc.data() || {};
    const legacyDocId = doc.id;
    const modelId = legacyData.modelId;
    const legacyServiceId = legacyData.serviceId;

    if (!modelId) {
      console.warn(`[skip:missing-modelId] ${legacyDocId}`);
      skippedMissingModelId += 1;
      return;
    }

    const device = devicesBySlug.get(modelId);
    if (!device) {
      const entry = {
        legacyDocId,
        modelId,
        legacyServiceId: legacyServiceId || null,
        rawPrice: Object.prototype.hasOwnProperty.call(legacyData, 'price')
          ? legacyData.price
          : null,
      };

      missingDeviceEntries.push(entry);
      console.warn(
        `[skip:missing-device] ${legacyDocId} -> modelId=${JSON.stringify(
          modelId
        )}, serviceId=${JSON.stringify(legacyServiceId)}`
      );
      skippedMissingDevice += 1;
      return;
    }

    const categoryId = device.categoryKey;
    if (!categoryId) {
      console.warn(`[skip:missing-category] ${legacyDocId} -> modelId=${modelId}`);
      skippedMissingCategory += 1;
      return;
    }

    const mappedServiceId = mapLegacyServiceId(categoryId, legacyServiceId);
    if (!mappedServiceId) {
      console.warn(
        `[skip:unmapped-service] ${legacyDocId} -> category=${categoryId}, legacyServiceId=${legacyServiceId}`
      );
      skippedUnmappedService += 1;
      return;
    }

    if (!validServiceIds.has(mappedServiceId)) {
      console.warn(
        `[skip:missing-target-service] ${legacyDocId} -> mappedServiceId=${mappedServiceId}`
      );
      skippedMissingTargetService += 1;
      return;
    }

    const parsedPrice = parsePrice(legacyData.price);
    if (!parsedPrice.ok) {
      const entry = {
        legacyDocId,
        modelId,
        categoryId,
        legacyServiceId: legacyServiceId || null,
        mappedServiceId,
        rawPrice: Object.prototype.hasOwnProperty.call(legacyData, 'price')
          ? legacyData.price
          : null,
        reason: parsedPrice.reason,
      };

      invalidPriceEntries.push(entry);
      console.warn(
        `[skip:invalid-price] ${legacyDocId} -> modelId=${JSON.stringify(
          modelId
        )}, serviceId=${JSON.stringify(
          legacyServiceId
        )}, rawPrice=${JSON.stringify(legacyData.price)}, reason=${parsedPrice.reason}`
      );
      skippedInvalidPrice += 1;
      return;
    }

    const target = buildTargetDoc({
      legacyDocId,
      legacyData,
      mappedServiceId,
      categoryId,
      parsedPrice,
    });

    toWrite.push(target);
  });

  console.log('Prepared rows to write:', toWrite.length);
  console.log('Missing device entries:', missingDeviceEntries.length);
  console.log('Invalid price entries:', invalidPriceEntries.length);

  const BATCH_LIMIT = 200;
  let written = 0;
  let skippedExisting = 0;

  for (let i = 0; i < toWrite.length; i += BATCH_LIMIT) {
    const chunk = toWrite.slice(i, i + BATCH_LIMIT);
    const batch = db.batch();

    if (IMPORT_MODE === 'skip') {
      for (const item of chunk) {
        const ref = db.collection('servicePricing').doc(item.docId);
        if (await shouldSkip(ref)) {
          skippedExisting += 1;
          continue;
        }
        batch.set(ref, item.data, { merge: true });
        written += 1;
      }
    } else {
      for (const item of chunk) {
        const ref = db.collection('servicePricing').doc(item.docId);
        batch.set(ref, item.data, { merge: true });
      }
      written += chunk.length;
    }

    await batch.commit();
    console.log(`Committed chunk ${i / BATCH_LIMIT + 1} (${chunk.length} items)`);
  }

  console.log('=== Done ===');
  console.log('Written:', written);
  console.log('Skipped existing:', skippedExisting);
  console.log('Skipped missing modelId:', skippedMissingModelId);
  console.log('Skipped missing device:', skippedMissingDevice);
  console.log('Skipped missing category:', skippedMissingCategory);
  console.log('Skipped unmapped service:', skippedUnmappedService);
  console.log('Skipped missing target service:', skippedMissingTargetService);
  console.log('Skipped invalid price:', skippedInvalidPrice);

  if (missingDeviceEntries.length) {
    console.log('\n=== Missing device entries ===');
    missingDeviceEntries.forEach((entry) => {
      console.log(JSON.stringify(entry));
    });
  }

  if (invalidPriceEntries.length) {
    console.log('\n=== Invalid price entries ===');
    invalidPriceEntries.forEach((entry) => {
      console.log(JSON.stringify(entry));
    });
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});