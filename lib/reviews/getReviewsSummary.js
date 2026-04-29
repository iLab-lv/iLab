import { db } from '@/lib/firebaseAdmin';
import { LOCATIONS } from '@/data/site.config';

const PLACE_IDS = LOCATIONS.reduce((acc, loc) => {
  if (loc.id && loc.placeId) {
    acc[loc.id] = loc.placeId;
  }
  return acc;
}, {});

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

export async function getReviewsSummary() {
  const out = {};

  await Promise.all(
    Object.entries(PLACE_IDS).map(async ([key, placeId]) => {
      try {
        const snap = await db.collection('places').doc(placeId).get();
        const data = snap.data() || {};
        const latest = data?.latest;

        out[key] = {
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