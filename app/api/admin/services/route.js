import admin from 'firebase-admin';
import { NextResponse } from 'next/server';

import { db } from '@/lib/firebaseAdmin';
import { requireServiceAdminRequest } from '@/lib/auth/serviceAdminSession';

function cleanId(value) {
  const id = String(value || '').trim();
  return id && !id.includes('/') ? id : '';
}

function cleanOrder(value) {
  return Number.isFinite(value) ? Math.round(value) : null;
}

function cleanLocalized(value) {
  return {
    lv: typeof value?.lv === 'string' ? value.lv.trim() : '',
    ru: typeof value?.ru === 'string' ? value.ru.trim() : '',
  };
}

function cleanService(value = {}, isNew = false) {
  const item = {
    isActive: value.isActive !== false,
    family: typeof value.family === 'string' ? value.family.trim() : '',
    iphoneOnly: value.iphoneOnly === true,
    slug: typeof value.slug === 'string' ? value.slug.trim() : '',
    labels: cleanLocalized(value.labels),
    defaultTimeText: cleanLocalized(value.defaultTimeText),
    defaultWarrantyDays: Number.isFinite(value.defaultWarrantyDays)
      ? Math.round(value.defaultWarrantyDays)
      : 365,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  if (isNew) {
    item.id = cleanId(value.id);
    item.type = typeof value.type === 'string' ? value.type : 'service';
    item.order = cleanOrder(value.order);
    item.categoryId = cleanId(value.categoryId);
  }

  return item;
}

export async function POST(request) {
  const unauthorized = await requireServiceAdminRequest();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();

    if (body?.action === 'reorder') {
      const items = Array.isArray(body.items) ? body.items : [];
      if (items.length > 500) {
        return NextResponse.json({ error: 'Too many services to reorder.' }, { status: 400 });
      }

      const batch = db.batch();
      for (const item of items) {
        const docId = cleanId(item?.docId);
        const order = cleanOrder(item?.order);
        if (!docId || order === null) {
          return NextResponse.json({ error: 'Invalid service order payload.' }, { status: 400 });
        }
        batch.set(db.collection('services').doc(docId), { order }, { merge: true });
      }
      await batch.commit();
      return NextResponse.json({ ok: true });
    }

    if (body?.action !== 'save') {
      return NextResponse.json({ error: 'Unknown service action.' }, { status: 400 });
    }

    const docId = cleanId(body.docId);
    const isNew = body.isNew === true;
    const item = cleanService(body.item, isNew);
    if (!docId || (isNew && (!item.id || !item.categoryId || item.order === null))) {
      return NextResponse.json({ error: 'Invalid service payload.' }, { status: 400 });
    }

    const ref = db.collection('services').doc(docId);
    const existing = await ref.get();
    if (isNew && existing.exists) {
      return NextResponse.json({ error: `Service ID already exists: ${docId}` }, { status: 409 });
    }
    if (!isNew && !existing.exists) {
      return NextResponse.json({ error: `Service not found: ${docId}` }, { status: 404 });
    }

    await ref.set(item, { merge: true });
    return NextResponse.json({ ok: true, id: docId });
  } catch (error) {
    console.error('Services mutation failed:', error);
    return NextResponse.json({ error: 'Failed to update services.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const unauthorized = await requireServiceAdminRequest();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const docId = cleanId(body?.docId);
    const remainingItems = Array.isArray(body?.remainingItems) ? body.remainingItems : [];
    if (!docId || remainingItems.length > 499) {
      return NextResponse.json({ error: 'Invalid service deletion payload.' }, { status: 400 });
    }

    const ref = db.collection('services').doc(docId);
    if (!(await ref.get()).exists) {
      return NextResponse.json({ error: `Service not found: ${docId}` }, { status: 404 });
    }

    const batch = db.batch();
    batch.delete(ref);
    for (const item of remainingItems) {
      const remainingId = cleanId(item?.docId);
      const order = cleanOrder(item?.order);
      if (!remainingId || order === null || remainingId === docId) {
        return NextResponse.json({ error: 'Invalid service order payload.' }, { status: 400 });
      }
      batch.set(db.collection('services').doc(remainingId), { order }, { merge: true });
    }
    await batch.commit();
    return NextResponse.json({ ok: true, id: docId });
  } catch (error) {
    console.error('Service deletion failed:', error);
    return NextResponse.json({ error: 'Failed to remove service.' }, { status: 500 });
  }
}
