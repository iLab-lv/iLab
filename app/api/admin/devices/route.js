import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { db } from '@/lib/firebaseAdmin';

function normalizeLocalized(value) {
  if (typeof value === 'string') {
    return {
      lv: value,
      ru: '',
    };
  }

  return {
    lv: typeof value?.lv === 'string' ? value.lv : '',
    ru: typeof value?.ru === 'string' ? value.ru : '',
  };
}

function normalizeDevice(id, data = {}) {
  return {
    slug:
      typeof data.slug === 'string' && data.slug.trim()
        ? data.slug.trim()
        : id,
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
    h1: normalizeLocalized(data.h1),
    metaTitle: normalizeLocalized(data.metaTitle),
    metaDescription: normalizeLocalized(data.metaDescription),
    bodyHtml: normalizeLocalized(data.bodyHtml),
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
    const originalSlug = String(body?.originalSlug || '').trim();

    const slug = String(raw?.slug || '').trim();
    if (!slug) {
      return NextResponse.json(
        { error: 'Device slug is required' },
        { status: 400 }
      );
    }

    const item = normalizeDevice(slug, raw);
    const targetRef = db.collection('devices').doc(slug);

    if (originalSlug && originalSlug !== slug) {
      const oldRef = db.collection('devices').doc(originalSlug);
      const oldSnap = await oldRef.get();

      if (!oldSnap.exists) {
        return NextResponse.json(
          { error: `Original device not found: ${originalSlug}` },
          { status: 404 }
        );
      }

      const newSnap = await targetRef.get();

      if (newSnap.exists) {
        return NextResponse.json(
          { error: `Target slug already exists: ${slug}` },
          { status: 409 }
        );
      }

      const oldData = oldSnap.data() || {};
      const createdAt =
        oldData.createdAt || admin.firestore.FieldValue.serverTimestamp();

      const batch = db.batch();

      batch.set(
        targetRef,
        {
          ...oldData,
          ...item,
          createdAt,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      batch.delete(oldRef);

      await batch.commit();

      return NextResponse.json({
        ok: true,
        id: slug,
        renamedFrom: originalSlug,
      });
    }

    const existing = await targetRef.get();

    await targetRef.set(
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

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = String(searchParams.get('slug') || '').trim();

    if (!slug) {
      return NextResponse.json(
        { error: 'Device slug is required' },
        { status: 400 }
      );
    }

    const ref = db.collection('devices').doc(slug);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json(
        { error: `Device not found: ${slug}` },
        { status: 404 }
      );
    }

    await ref.delete();

    return NextResponse.json({ ok: true, id: slug });
  } catch (error) {
    console.error('Devices DELETE failed:', error);
    return NextResponse.json(
      { error: 'Failed to delete device' },
      { status: 500 }
    );
  }
}