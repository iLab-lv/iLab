// app/api/reviews/cron/route.js
import { NextResponse } from 'next/server';
import { db } from 'lib/firebaseAdmin';
import { getPlaceBasics } from 'lib/googlePlaces';
import { LOCATIONS } from '@data/site.config';

function getCronSecretFromRequest(req) {
  // 1) Custom header we used for manual curl calls
  const xHeader = req.headers.get('x-cron-secret');

  // 2) Vercel Cron header: Authorization: Bearer <secret>
  const auth = req.headers.get('authorization');
  let bearer = null;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    bearer = auth.slice(7).trim();
  }

  return xHeader || bearer || null;
}

export async function GET(req) {
  const provided = getCronSecretFromRequest(req);

  if (!process.env.CRON_SECRET || provided !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const nowIso = new Date().toISOString();

    // Take all locations that have a placeId configured
    const places = LOCATIONS.filter((loc) => Boolean(loc.placeId));

    await Promise.all(
      places.map(async (loc) => {
        const placeId = loc.placeId;
        const name = loc.label; // or add a dedicated "placeName" in LOCATIONS if you prefer

        const { rating, count } = await getPlaceBasics(placeId);

        await db
          .collection('places')
          .doc(placeId)
          .set(
            {
              name,
              latest: {
                rating,
                count,
                fetchedAt: nowIso,
              },
            },
            { merge: true }
          );
      })
    );

    return NextResponse.json({ ok: true, at: nowIso });
  } catch (err) {
    console.error('reviews cron error', err);
    return NextResponse.json(
      { error: 'Internal error', message: String(err) },
      { status: 500 }
    );
  }
}
