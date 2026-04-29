import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

import { db } from '@/lib/firebaseAdmin';
import {
  PLACE_IDS,
  getReviewsSummary,
  normalizeReview,
  normalizeFeaturedReviewsByLocale,
} from '@/lib/reviews/getReviewsSummary';

export const dynamic = 'force-dynamic';

export async function GET() {
  const out = await getReviewsSummary();

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

    const ref = db.collection('places').doc(placeId);

    await ref.set(
      {
        featuredReviewsByLocale: {
          [locale]: featuredReviews,
        },
        featuredReviews: admin.firestore.FieldValue.delete(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    const savedSnap = await ref.get();
    const savedData = savedSnap.data() || {};

    return NextResponse.json({
      ok: true,
      saved: normalizeFeaturedReviewsByLocale(
        savedData.featuredReviewsByLocale
      ),
    });
  } catch (err) {
    console.error('reviews api POST failed', err);

    return NextResponse.json(
      { error: err?.message || 'Failed to save reviews.' },
      { status: 500 }
    );
  }
}