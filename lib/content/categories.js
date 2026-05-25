// lib/content/categories.js
import 'server-only';

import { db } from '@/lib/firebaseAdmin';

function norm(value) {
  return String(value || '').trim().toLowerCase();
}

function lastPathSegment(path = '') {
  return (
    String(path || '')
      .trim()
      .split('/')
      .filter(Boolean)
      .pop()
      ?.toLowerCase() || ''
  );
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
    order: Number.isFinite(Number(category.order))
      ? Number(category.order)
      : 9999,
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
    sections: category.sections || null,
    brands: Array.isArray(category.brands)
      ? category.brands.map(normalizeBrand)
      : [],
  };
}

export async function getCategories() {
  const snap = await db.collection('categories').get();

  return snap.docs
    .map((doc) => normalizeCategory(doc.data(), doc.id))
    .sort((a, b) => a.order - b.order);
}

export async function getCategoryBySlug(slug) {
  if (!slug) return null;

  const directDoc = await db.collection('categories').doc(slug).get();

  if (directDoc.exists) {
    return normalizeCategory(directDoc.data(), directDoc.id);
  }

  const bySlugSnap = await db
    .collection('categories')
    .where('slug', '==', slug)
    .limit(1)
    .get();

  if (!bySlugSnap.empty) {
    const doc = bySlugSnap.docs[0];
    return normalizeCategory(doc.data(), doc.id);
  }

  return null;
}

export async function getBrandsByCategory(categorySlug) {
  const category = await getCategoryBySlug(categorySlug);
  return category?.brands || [];
}

export async function getBrandByCategory(categorySlug, brandKey) {
  if (!categorySlug || !brandKey) return null;

  const brands = await getBrandsByCategory(categorySlug);
  const needle = norm(brandKey);

  if (!needle) return null;

  return (
    brands.find((brand) => {
      const key = norm(brand?.key);
      const slug = norm(brand?.slug);
      const routeSlug = lastPathSegment(brand?.route?.brandPath);

      return key === needle || slug === needle || routeSlug === needle;
    }) || null
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
        order: Number.isFinite(Number(series.order))
          ? Number(series.order)
          : 9999,
      },
    ])
  );
}