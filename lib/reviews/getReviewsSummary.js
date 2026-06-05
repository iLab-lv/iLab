import { unstable_cache } from 'next/cache';

import { db } from '@/lib/firebaseAdmin';
import { getSiteSettings } from '@/lib/siteSettings';
import { serializeForClient } from '@/lib/utils/serializeForClient';

export async function getPlaceIds() {
  const siteSettings = await getSiteSettings();
  const locations = Array.isArray(siteSettings?.locations)
    ? siteSettings.locations
    : [];

  return locations.reduce((acc, loc) => {
    if (loc?.id && loc?.placeId) {
      acc[loc.id] = loc.placeId;
    }

    return acc;
  }, {});
}

export function normalizeReview(review = {}) {
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

export function normalizeFeaturedReviewsByLocale(value) {
  const source = value && typeof value === 'object' ? value : {};

  return {
    lv: Array.isArray(source.lv) ? source.lv.map(normalizeReview) : [],
    ru: Array.isArray(source.ru) ? source.ru.map(normalizeReview) : [],
  };
}

async function getReviewsSummaryUncached() {
  const out = {};
  const placeIds = await getPlaceIds();

  await Promise.all(
    Object.entries(placeIds).map(async ([key, placeId]) => {
      try {
        const snap = await db.collection('places').doc(placeId).get();
        const raw = snap.data() || {};
        const data = serializeForClient(raw || {});
        const latest = data?.latest || {};

        out[key] = {
          placeId,
          rating: latest?.rating ?? null,
          count: latest?.count ?? null,
          fetchedAt: latest?.fetchedAt ?? null,
          name: data?.name ?? null,
          featuredReviewsByLocale: normalizeFeaturedReviewsByLocale(
            data?.featuredReviewsByLocale
          ),
        };
      } catch (err) {
        console.error('getReviewsSummary: error for place', placeId, err);
        out[key] = null;
      }
    })
  );

  return out;
}

export const getReviewsSummary = unstable_cache(
  getReviewsSummaryUncached,
  ['reviews-summary'],
  { revalidate: 1800 }
);
