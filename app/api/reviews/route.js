import { NextResponse } from 'next/server';
import { getDb } from '@lib/firebaseAdmin';
import { PLACES } from '@data/places';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = getDb();                 // <-- lazy init here
  const out = {};

  await Promise.all(
    Object.entries(PLACES).map(async ([key, { placeId }]) => {
      try {
        const snap = await db.collection('places').doc(placeId).get();
        const data = snap.data();
        out[key] = data?.latest
          ? { rating: data.latest.rating, count: data.latest.count, fetchedAt: data.latest.fetchedAt }
          : null;
      } catch {
        out[key] = null;
      }
    })
  );

  const res = NextResponse.json(out);
  res.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=1800');
  return res;
}
