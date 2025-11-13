// app/api/reviews/cron/route.js
import { NextResponse } from 'next/server';
import { db } from 'lib/firebaseAdmin';
import { PLACES } from '@data/places';
import { getPlaceBasics } from 'lib/googlePlaces';

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

    await Promise.all(
      Object.values(PLACES).map(async ({ name, placeId }) => {
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
