import { NextResponse } from 'next/server';
import { db } from 'lib/firebaseAdmin';
import { LOCATIONS } from '@data/site.config';

export const dynamic = 'force-dynamic';

// Build a simple map of { [locationId]: placeId } from LOCATIONS
const PLACE_IDS = LOCATIONS.reduce((acc, loc) => {
  if (loc.id && loc.placeId) {
    acc[loc.id] = loc.placeId;
  }
  return acc;
}, {});

function normalizeReview(review = {}) {
  return {
    author: typeof review.author === 'string' ? review.author.trim() : '',
    text: typeof review.text === 'string' ? review.text.trim() : '',
    ...(typeof review.date === 'string' && review.date.trim()
      ? { date: review.date.trim() }
      : {}),
    ...(typeof review.rating === 'number' && Number.isFinite(review.rating)
      ? { rating: review.rating }
      : {}),
    ...(typeof review.id === 'string' && review.id.trim()
      ? { id: review.id.trim() }
      : {}),
  };
}

function normalizeFeaturedReviewsByLocale(value) {
  const source = value && typeof value === 'object' ? value : {};

  return {
    lv: Array.isArray(source.lv) ? source.lv.map(normalizeReview) : [],
    ru: Array.isArray(source.ru) ? source.ru.map(normalizeReview) : [],
  };
}

export async function GET() {
  const out = {};

  await Promise.all(
    Object.entries(PLACE_IDS).map(async ([key, placeId]) => {
      try {
        const snap = await db.collection('places').doc(placeId).get();
        const data = snap.data() || {};
        const latest = data?.latest;

        const legacyFeaturedReviews = Array.isArray(data?.featuredReviews)
          ? data.featuredReviews.map(normalizeReview)
          : [];

        const featuredReviewsByLocale = data?.featuredReviewsByLocale
          ? normalizeFeaturedReviewsByLocale(data.featuredReviewsByLocale)
          : {
              lv: legacyFeaturedReviews,
              ru: [],
            };

        out[key] = latest
          ? {
              rating: latest.rating,
              count: latest.count,
              fetchedAt: latest.fetchedAt,
              name: data?.name ?? null,
              featuredReviewsByLocale,
              // temporary legacy fallback for old code/admin
              featuredReviews: legacyFeaturedReviews,
            }
          : null;
      } catch (err) {
        console.error('reviews api: error for place', placeId, err);
        out[key] = null;
      }
    })
  );

  const res = NextResponse.json(out);
  res.headers.set(
    'Cache-Control',
    's-maxage=300, stale-while-revalidate=1800'
  );
  return res;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const key = typeof body?.key === 'string' ? body.key : '';
    const locale = body?.locale === 'ru' ? 'ru' : 'lv';

    const featuredReviews = Array.isArray(body?.featuredReviews)
      ? body.featuredReviews.map(normalizeReview)
      : null;

    if (!key) {
      return NextResponse.json(
        { error: 'Missing location key.' },
        { status: 400 }
      );
    }

    if (!featuredReviews) {
      return NextResponse.json(
        { error: 'featuredReviews must be an array.' },
        { status: 400 }
      );
    }

    const placeId = PLACE_IDS[key];

    if (!placeId) {
      return NextResponse.json(
        { error: 'Unknown location key.' },
        { status: 404 }
      );
    }

    const snap = await db.collection('places').doc(placeId).get();
    const data = snap.data() || {};

    const currentByLocale = data?.featuredReviewsByLocale
      ? normalizeFeaturedReviewsByLocale(data.featuredReviewsByLocale)
      : {
          lv: Array.isArray(data?.featuredReviews)
            ? data.featuredReviews.map(normalizeReview)
            : [],
          ru: [],
        };

    const nextByLocale = {
      ...currentByLocale,
      [locale]: featuredReviews,
    };

    const payload = {
      featuredReviewsByLocale: nextByLocale,
      updatedAt: new Date().toISOString(),
    };

    // keep legacy LV field in sync for old consumers during migration
    if (locale === 'lv') {
      payload.featuredReviews = featuredReviews;
    }

    await db.collection('places').doc(placeId).set(payload, { merge: true });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('reviews api POST failed', err);
    return NextResponse.json(
      { error: 'Failed to save reviews.' },
      { status: 500 }
    );
  }
}