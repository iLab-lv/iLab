import { NextResponse } from 'next/server';
import { db } from '@lib/firebaseAdmin';
import { PLACES } from '@data/places';
import { getPlaceBasics } from '@lib/googlePlaces';

function isAuthorized(headers) {
  const header = headers.get('x-cron-secret');
  const expected = process.env.CRON_SECRET;
  return Boolean(expected && header && header === expected);
}

export async function GET(req) {
  if (!isAuthorized(req.headers)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const nowIso = new Date().toISOString();
  const ops = [];

  for (const key of Object.keys(PLACES)) {
    const { name, placeId } = PLACES[key];
    try {
      const { rating, count } = await getPlaceBasics(placeId);

      const ref = db.collection('places').doc(placeId);
      ops.push(
        ref.set(
          {
            name,
            latest: { rating, count, fetchedAt: nowIso },
          },
          { merge: true }
        )
      );
    } catch (err) {
      console.error(`[reviews/cron] Failed for ${name}:`, err?.message || err);
    }
  }

  await Promise.all(ops);
  return NextResponse.json({ ok: true, at: nowIso });
}
