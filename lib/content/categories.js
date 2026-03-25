// lib/content/categories.js
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

function normalizeSeries(series = {}) {
  return {
    key: series.key || null,
    slug: series.slug || series.key || null,
    labels: series.labels || null,
    label: series.label || series.name || '',
    name: series.name || series.label || '',
    order: Number.isFinite(Number(series.order)) ? Number(series.order) : 9999,
  };
}

function normalizeBrand(brand = {}) {
  return {
    key: brand.key || brand.slug || null,
    slug: brand.slug || brand.key || null,
    labels: brand.labels || null,
    name:
      brand.name ||
      brand.label ||
      brand.labels?.lv ||
      brand.labels?.ru ||
      '',
    image: brand.image || '',
    logo: brand.logo || '',
    order: Number.isFinite(Number(brand.order)) ? Number(brand.order) : 9999,
    page: brand.page || null,
    route: brand.route || null,
    series: Array.isArray(brand.series)
      ? brand.series.map(normalizeSeries)
      : [],
  };
}

function normalizeCategory(category = {}, docId = null) {
  return {
    slug: category.slug || docId || null,
    key: category.key || category.slug || docId || null,
    type: category.type || 'category',
    order: Number.isFinite(Number(category.order)) ? Number(category.order) : 9999,
    labels: category.labels || null,
    name:
      category.name ||
      category.label ||
      category.labels?.lv ||
      category.labels?.ru ||
      '',
    image: category.image || '',
    h1: category.h1 || null,
    lead: category.lead || null,
    bodyHtml: category.bodyHtml || null,
    metaTitle: category.metaTitle || null,
    metaDescription: category.metaDescription || null,
    brands: Array.isArray(category.brands)
      ? category.brands.map(normalizeBrand)
      : [],
  };
}

export async function getCategories() {
  const db = getDb();
  const snap = await db.collection('categories').get();

  return snap.docs
    .map((doc) => normalizeCategory(doc.data(), doc.id))
    .sort((a, b) => a.order - b.order);
}

export async function getCategoryBySlug(slug) {
  if (!slug) return null;

  const db = getDb();
  const doc = await db.collection('categories').doc(slug).get();

  if (!doc.exists) return null;

  return normalizeCategory(doc.data(), doc.id);
}

export async function getBrandsByCategory(categorySlug) {
  const category = await getCategoryBySlug(categorySlug);
  return category?.brands || [];
}

export async function getBrandByCategory(categorySlug, brandKey) {
  if (!categorySlug || !brandKey) return null;

  const brands = await getBrandsByCategory(categorySlug);

  return (
    brands.find(
      (brand) => brand.key === brandKey || brand.slug === brandKey
    ) || null
  );
}

export async function getSeriesMetaByCategoryBrand(
  categorySlug,
  brandKey,
  locale = 'lv'
) {
  const brand = await getBrandByCategory(categorySlug, brandKey);

  if (!brand?.series?.length) return {};

  return Object.fromEntries(
    brand.series.map((series) => [
      series.key,
      {
        title:
          (series.labels && (series.labels[locale] || series.labels.lv)) ||
          series.label ||
          series.name ||
          series.key,
        order: Number.isFinite(Number(series.order)) ? Number(series.order) : 9999,
      },
    ])
  );
}