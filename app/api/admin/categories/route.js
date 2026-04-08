import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { db } from '@/lib/firebaseAdmin';

function emptyLocalized() {
  return { lv: '', ru: '' };
}

function normalizeLocalized(value = {}) {
  return {
    lv: typeof value?.lv === 'string' ? value.lv : '',
    ru: typeof value?.ru === 'string' ? value.ru : '',
  };
}

function pickLocalized(...sources) {
  for (const source of sources) {
    if (
      source &&
      typeof source === 'object' &&
      !Array.isArray(source) &&
      (typeof source.lv === 'string' || typeof source.ru === 'string')
    ) {
      return normalizeLocalized(source);
    }
  }

  return emptyLocalized();
}

function normalizeSeries(item = {}) {
  return {
    key: typeof item.key === 'string' ? item.key.trim() : '',
    labels: normalizeLocalized(item.labels),
    order:
      typeof item.order === 'number' && Number.isFinite(item.order)
        ? item.order
        : 999,
  };
}

function normalizeBrand(item = {}) {
  const pageSource =
    item?.page && typeof item.page === 'object' && !Array.isArray(item.page)
      ? item.page
      : {};

  const routeSource =
    item?.route && typeof item.route === 'object' && !Array.isArray(item.route)
      ? item.route
      : pageSource?.route && typeof pageSource.route === 'object' && !Array.isArray(pageSource.route)
        ? pageSource.route
        : {};

  const modelGridSource =
    pageSource?.modelGrid &&
    typeof pageSource.modelGrid === 'object' &&
    !Array.isArray(pageSource.modelGrid)
      ? pageSource.modelGrid
      : {};

  const sectionsSource =
    pageSource?.sections &&
    typeof pageSource.sections === 'object' &&
    !Array.isArray(pageSource.sections)
      ? pageSource.sections
      : {};

  return {
    key: typeof item.key === 'string' ? item.key.trim() : '',
    labels: normalizeLocalized(item.labels),
    logo: typeof item.logo === 'string' ? item.logo : '',
    image: typeof item.image === 'string' ? item.image : '',
    order:
      typeof item.order === 'number' && Number.isFinite(item.order)
        ? item.order
        : 999,
    route: {
      brandPath:
        typeof routeSource?.brandPath === 'string' ? routeSource.brandPath : '',
      dedicatedHubPath:
        typeof routeSource?.dedicatedHubPath === 'string'
          ? routeSource.dedicatedHubPath
          : '',
      preferDedicatedHub: routeSource?.preferDedicatedHub === true,
    },
    page: {
      variant:
        typeof pageSource?.variant === 'string' ? pageSource.variant : 'brand',
      h1: pickLocalized(pageSource?.h1, item?.h1),
      lead: pickLocalized(pageSource?.lead, item?.lead),
      bodyHtml: pickLocalized(pageSource?.bodyHtml, item?.bodyHtml),
      metaTitle: pickLocalized(pageSource?.metaTitle, item?.metaTitle),
      metaDescription: pickLocalized(
        pageSource?.metaDescription,
        item?.metaDescription
      ),
      modelGrid: {
        heading: pickLocalized(modelGridSource?.heading),
        intro: pickLocalized(modelGridSource?.intro),
      },
      sections: {
        hasCustomGuide: sectionsSource?.hasCustomGuide === true,
        hasFaq: sectionsSource?.hasFaq === true,
        hasProcess: sectionsSource?.hasProcess === true,
        hasReviews: sectionsSource?.hasReviews === true,
        hasWhy: sectionsSource?.hasWhy === true,
      },
    },
    series: Array.isArray(item.series)
      ? item.series.map(normalizeSeries).filter((series) => series.key)
      : [],
  };
}

function normalizeCategory(id, data = {}) {
  return {
    slug: typeof data.slug === 'string' && data.slug.trim() ? data.slug.trim() : id,
    type: typeof data.type === 'string' ? data.type : 'category',
    order:
      typeof data.order === 'number' && Number.isFinite(data.order)
        ? data.order
        : 999,
    labels: normalizeLocalized(data.labels),
    image: typeof data.image === 'string' ? data.image : '',
    h1: normalizeLocalized(data.h1),
    lead: normalizeLocalized(data.lead),
    bodyHtml: normalizeLocalized(data.bodyHtml),
    metaTitle: normalizeLocalized(data.metaTitle),
    metaDescription: normalizeLocalized(data.metaDescription),
    brands: Array.isArray(data.brands)
      ? data.brands.map(normalizeBrand).filter((brand) => brand.key)
      : [],
  };
}

export async function GET() {
  try {
    const snap = await db.collection('categories').get();

    const items = snap.docs
      .map((doc) => normalizeCategory(doc.id, doc.data()))
      .sort((a, b) => {
        if ((a.order ?? 999) !== (b.order ?? 999)) {
          return (a.order ?? 999) - (b.order ?? 999);
        }

        return (a.slug || '').localeCompare(b.slug || '');
      });

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Categories GET failed:', error);
    return NextResponse.json(
      { error: 'Failed to load categories' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const raw = body?.item || {};

    const slug = String(raw?.slug || '').trim();
    if (!slug) {
      return NextResponse.json(
        { error: 'Category slug is required' },
        { status: 400 }
      );
    }

    const item = normalizeCategory(slug, raw);

    const ref = db.collection('categories').doc(slug);
    const existing = await ref.get();

    await ref.set(
      {
        ...item,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        ...(existing.exists
          ? {}
          : { createdAt: admin.firestore.FieldValue.serverTimestamp() }),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true, id: slug });
  } catch (error) {
    console.error('Categories POST failed:', error);
    return NextResponse.json(
      { error: 'Failed to save category' },
      { status: 500 }
    );
  }
}