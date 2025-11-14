import { NextResponse } from 'next/server';
import { db } from 'lib/firebaseAdmin';   // ⬅ same as your cron route
import { PLACES } from '@data/places';

export const dynamic = 'force-dynamic';

export async function GET() {
  const out = {};

  await Promise.all(
    Object.entries(PLACES).map(async ([key, { placeId }]) => {
      try {
        const snap = await db.collection('places').doc(placeId).get();
        const data = snap.data();
        const latest = data?.latest;

        out[key] = latest
          ? {
              // original fields – unchanged
              rating: latest.rating,
              count: latest.count,
              fetchedAt: latest.fetchedAt,

              // new fields for the Google reviews section
              name: data?.name ?? null,
              featuredReviews: Array.isArray(data?.featuredReviews)
                ? data.featuredReviews
                : [],
            }
          : null;
      } catch (err) {
        console.error('reviews api: error for place', placeId, err);
        out[key] = null;
      }
    })
  );

  const res = NextResponse.json(out);
  res.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=1800');
  return res;
}
