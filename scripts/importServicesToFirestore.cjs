/* scripts/importServicesToFirestore.cjs
 *
 * Imports repair services catalog into Firestore collection: services
 *
 * Doc ID: service id
 *
 * Usage:
 *   node scripts/importServicesToFirestore.cjs
 *
 * Optional env:
 *   IMPORT_MODE=overwrite   (default)
 *   IMPORT_MODE=skip        (skip if doc exists)
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

/**
 * SERVICE DATA PRINCIPLES
 *
 * - Each service belongs to exactly one category.
 * - Even similar services are duplicated per category on purpose.
 * - This keeps routing, SEO, ordering, naming and future content independent.
 * - Pricing rows should reference these service ids.
 *
 * Suggested query pattern:
 *   services.where('categoryId', '==', selectedCategory).orderBy('order')
 */

const SERVICE_DOCS = [
  // =========================
  // PHONES
  // =========================
  {
    id: 'phone-display-original',
    type: 'service',
    isActive: true,
    order: 10,
    categoryId: 'telefonu-remonts',
    family: 'Ekrāns',
    labels: {
      lv: 'Displeja maiņa oriģināls',
      ru: 'Замена дисплея оригинал',
    },
    slug: 'displeja-maina-originals',
    defaultTimeText: {
      lv: '60–120 min',
      ru: '60–120 мин',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'phone-display-incell',
    type: 'service',
    isActive: true,
    order: 11,
    categoryId: 'telefonu-remonts',
    family: 'Ekrāns',
    labels: {
      lv: 'Displeja maiņa Incell/LCD',
      ru: 'Замена дисплея Incell/LCD',
    },
    slug: 'displeja-maina-incell-lcd',
    defaultTimeText: {
      lv: '60–120 min',
      ru: '60–120 мин',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'phone-display-oled',
    type: 'service',
    isActive: true,
    order: 12,
    categoryId: 'telefonu-remonts',
    family: 'Ekrāns',
    labels: {
      lv: 'Displeja maiņa OLED',
      ru: 'Замена дисплея OLED',
    },
    slug: 'displeja-maina-oled',
    defaultTimeText: {
      lv: '60–120 min',
      ru: '60–120 мин',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'phone-battery',
    type: 'service',
    isActive: true,
    order: 20,
    categoryId: 'telefonu-remonts',
    family: 'Barošana un uzlāde',
    labels: {
      lv: 'Baterijas maiņa',
      ru: 'Замена батареи',
    },
    slug: 'baterijas-maina',
    defaultTimeText: {
      lv: '30–120 min',
      ru: '30–120 мин',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'phone-charge-port',
    type: 'service',
    isActive: true,
    order: 30,
    categoryId: 'telefonu-remonts',
    family: 'Barošana un uzlāde',
    labels: {
      lv: 'Lādēšanas konektora maiņa',
      ru: 'Замена разъёма зарядки',
    },
    slug: 'ladesanas-konektora-maina',
    defaultTimeText: {
      lv: '60–180 min',
      ru: '60–180 мин',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'phone-back-cover',
    type: 'service',
    isActive: true,
    order: 40,
    categoryId: 'telefonu-remonts',
    family: 'Korpuss',
    labels: {
      lv: 'Aizmugures vāciņa maiņa',
      ru: 'Замена задней крышки',
    },
    slug: 'aizmugures-vacina-maina',
    defaultTimeText: {
      lv: '1–5 st',
      ru: '1–5 ч',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'phone-camera',
    type: 'service',
    isActive: true,
    order: 50,
    categoryId: 'telefonu-remonts',
    family: 'Kamera',
    labels: {
      lv: 'Kameras maiņa',
      ru: 'Замена камеры',
    },
    slug: 'kameras-maina',
    defaultTimeText: {
      lv: '30–60 min',
      ru: '30–60 мин',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'phone-camera-glass',
    type: 'service',
    isActive: true,
    order: 51,
    categoryId: 'telefonu-remonts',
    family: 'Kamera',
    labels: {
      lv: 'Kameras stikla maiņa',
      ru: 'Замена стекла камеры',
    },
    slug: 'kameras-stikla-maina',
    defaultTimeText: {
      lv: '30–60 min',
      ru: '30–60 мин',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'phone-water-damage-clean',
    type: 'service',
    isActive: true,
    order: 60,
    categoryId: 'telefonu-remonts',
    family: 'Diagnostika',
    labels: {
      lv: 'Tīrīšana no ūdens',
      ru: 'Чистка после воды',
    },
    slug: 'tirisana-no-udens',
    defaultTimeText: {
      lv: 'no 3 st',
      ru: 'от 3 ч',
    },
    defaultWarrantyDays: 0,
  },

  // =========================
  // TABLETS
  // =========================
  {
    id: 'tablet-display',
    type: 'service',
    isActive: true,
    order: 10,
    categoryId: 'plansetdatoru-remonts',
    family: 'Ekrāns',
    labels: {
      lv: 'Displeja maiņa',
      ru: 'Замена дисплея',
    },
    slug: 'displeja-maina',
    defaultTimeText: {
      lv: '60–120 min',
      ru: '60–120 мин',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'tablet-touchscreen',
    type: 'service',
    isActive: true,
    order: 14,
    categoryId: 'plansetdatoru-remonts',
    family: 'Ekrāns',
    labels: {
      lv: 'Skārienekrāna maiņa',
      ru: 'Замена сенсорного стекла',
    },
    slug: 'skarienekrana-maina',
    defaultTimeText: {
      lv: '60–120 min',
      ru: '60–120 мин',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'tablet-battery',
    type: 'service',
    isActive: true,
    order: 20,
    categoryId: 'plansetdatoru-remonts',
    family: 'Barošana un uzlāde',
    labels: {
      lv: 'Baterijas maiņa',
      ru: 'Замена батареи',
    },
    slug: 'baterijas-maina',
    defaultTimeText: {
      lv: '30–120 min',
      ru: '30–120 мин',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'tablet-charge-port',
    type: 'service',
    isActive: true,
    order: 30,
    categoryId: 'plansetdatoru-remonts',
    family: 'Barošana un uzlāde',
    labels: {
      lv: 'Lādēšanas konektora maiņa',
      ru: 'Замена разъёма зарядки',
    },
    slug: 'ladesanas-konektora-maina',
    defaultTimeText: {
      lv: '60–180 min',
      ru: '60–180 мин',
    },
    defaultWarrantyDays: 90,
  },

  // =========================
  // COMPUTERS / LAPTOPS
  // =========================
  {
    id: 'computer-battery',
    type: 'service',
    isActive: true,
    order: 70,
    categoryId: 'datoru-remonts',
    family: 'Barošana un uzlāde',
    labels: {
      lv: 'Akumulatora nomaiņa',
      ru: 'Замена аккумулятора',
    },
    slug: 'akumulatora-nomaina',
    defaultTimeText: {
      lv: '1–3 st',
      ru: '1–3 ч',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'computer-display',
    type: 'service',
    isActive: true,
    order: 71,
    categoryId: 'datoru-remonts',
    family: 'Ekrāns',
    labels: {
      lv: 'Displeja nomaiņa',
      ru: 'Замена дисплея',
    },
    slug: 'displeja-nomaina',
    defaultTimeText: {
      lv: 'pēc pieprasījuma',
      ru: 'по запросу',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'computer-liquid-damage',
    type: 'service',
    isActive: true,
    order: 72,
    categoryId: 'datoru-remonts',
    family: 'Diagnostika',
    labels: {
      lv: 'Atjaunošana pēc šķidruma bojājumiem',
      ru: 'Восстановление после залития',
    },
    slug: 'atjaunosana-pec-skidruma-bojajumiem',
    defaultTimeText: {
      lv: 'no 1 dienas',
      ru: 'от 1 дня',
    },
    defaultWarrantyDays: 0,
  },
  {
    id: 'computer-maintenance',
    type: 'service',
    isActive: true,
    order: 73,
    categoryId: 'datoru-remonts',
    family: 'Apkope',
    labels: {
      lv: 'Profilakse un tehniskā apkalpošana',
      ru: 'Профилактика и техническое обслуживание',
    },
    slug: 'profilakse-un-tehniska-apkalposana',
    defaultTimeText: {
      lv: '1–2 st',
      ru: '1–2 ч',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'computer-keyboard',
    type: 'service',
    isActive: true,
    order: 74,
    categoryId: 'datoru-remonts',
    family: 'Korpuss un ievade',
    labels: {
      lv: 'Tastatūras nomaiņa',
      ru: 'Замена клавиатуры',
    },
    slug: 'tastaturas-nomaina',
    defaultTimeText: {
      lv: 'pēc pieprasījuma',
      ru: 'по запросу',
    },
    defaultWarrantyDays: 90,
  },
  {
    id: 'computer-touchpad',
    type: 'service',
    isActive: true,
    order: 75,
    categoryId: 'datoru-remonts',
    family: 'Korpuss un ievade',
    labels: {
      lv: 'Touchpad nomaiņa',
      ru: 'Замена touchpad',
    },
    slug: 'touchpad-nomaina',
    defaultTimeText: {
      lv: 'pēc pieprasījuma',
      ru: 'по запросу',
    },
    defaultWarrantyDays: 90,
  },
];

function validateServices(docs) {
  const ids = new Set();
  const categorySlugPairs = new Set();

  for (const doc of docs) {
    if (!doc.id) {
      throw new Error(`Service missing id: ${JSON.stringify(doc, null, 2)}`);
    }

    if (ids.has(doc.id)) {
      throw new Error(`Duplicate service id: ${doc.id}`);
    }
    ids.add(doc.id);

    if (!doc.categoryId) {
      throw new Error(`Service ${doc.id} missing categoryId`);
    }

    if (!doc.slug) {
      throw new Error(`Service ${doc.id} missing slug`);
    }

    const pairKey = `${doc.categoryId}__${doc.slug}`;
    if (categorySlugPairs.has(pairKey)) {
      throw new Error(
        `Duplicate service slug within category: ${doc.slug} in ${doc.categoryId}`
      );
    }
    categorySlugPairs.add(pairKey);

    if (typeof doc.order !== 'number') {
      throw new Error(`Service ${doc.id} missing numeric order`);
    }

    if (typeof doc.defaultWarrantyDays !== 'number') {
      throw new Error(`Service ${doc.id} missing numeric defaultWarrantyDays`);
    }

    if (!doc.labels || !doc.labels.lv || !doc.labels.ru) {
      throw new Error(`Service ${doc.id} must have labels.lv and labels.ru`);
    }

    if (
      !doc.defaultTimeText ||
      !doc.defaultTimeText.lv ||
      !doc.defaultTimeText.ru
    ) {
      throw new Error(`Service ${doc.id} must have defaultTimeText.lv and defaultTimeText.ru`);
    }
  }
}

async function run() {
  console.log('=== Import services to Firestore ===');
  console.log('Mode:', IMPORT_MODE);

  validateServices(SERVICE_DOCS);
  initFirebaseAdmin();

  const db = admin.firestore();

  const docs = SERVICE_DOCS.map((doc) => ({
    docId: doc.id,
    data: doc,
  }));

  console.log(`Docs to write: ${docs.length}`);

  async function shouldSkip(docRef) {
    if (IMPORT_MODE !== 'skip') return false;
    const snap = await docRef.get();
    return snap.exists;
  }

  const BATCH_LIMIT = 200;
  let written = 0;
  let skipped = 0;

  for (let i = 0; i < docs.length; i += BATCH_LIMIT) {
    const chunk = docs.slice(i, i + BATCH_LIMIT);
    const batch = db.batch();

    if (IMPORT_MODE === 'skip') {
      for (const d of chunk) {
        const ref = db.collection('services').doc(d.docId);
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
        const ref = db.collection('services').doc(d.docId);
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