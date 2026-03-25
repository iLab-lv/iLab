import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { db } from '@/lib/firebaseAdmin';

function normalizeDevice(id, data = {}) {
  return {
    slug: typeof data.slug === 'string' && data.slug.trim() ? data.slug.trim() : id,
    type: typeof data.type === 'string' ? data.type : 'device',
    categoryKey:
      typeof data.categoryKey === 'string' ? data.categoryKey.trim() : '',
    brandKey:
      typeof data.brandKey === 'string' ? data.brandKey.trim() : '',
    seriesKey:
      typeof data.seriesKey === 'string' ? data.seriesKey.trim() : '',
    name: typeof data.name === 'string' ? data.name : '',
    year:
      typeof data.year === 'number' && Number.isFinite(data.year)
        ? data.year
        : null,
    image: typeof data.image === 'string' ? data.image : '',
    order:
      typeof data.order === 'number' && Number.isFinite(data.order)
        ? data.order
        : 999,
    h1: typeof data.h1 === 'string' ? data.h1 : '',
    metaTitle: typeof data.metaTitle === 'string' ? data.metaTitle : '',
    metaDescription:
      typeof data.metaDescription === 'string' ? data.metaDescription : '',
    bodyHtml: typeof data.bodyHtml === 'string' ? data.bodyHtml : '',
  };
}

export async function GET() {
  try {
    const snap = await db.collection('devices').get();

    const items = snap.docs
      .map((doc) => normalizeDevice(doc.id, doc.data()))
      .sort((a, b) => {
        if ((a.order ?? 999) !== (b.order ?? 999)) {
          return (a.order ?? 999) - (b.order ?? 999);
        }

        return (a.name || '').localeCompare(b.name || '', undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      });

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Devices GET failed:', error);
    return NextResponse.json(
      { error: 'Failed to load devices' },
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
        { error: 'Device slug is required' },
        { status: 400 }
      );
    }

    const item = normalizeDevice(slug, raw);

    const ref = db.collection('devices').doc(slug);
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
    console.error('Devices POST failed:', error);
    return NextResponse.json(
      { error: 'Failed to save device' },
      { status: 500 }
    );
  }
}