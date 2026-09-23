import admin from 'firebase-admin';
import { NextResponse } from 'next/server';

import { db } from '@/lib/firebaseAdmin';
import { requireServiceAdminRequest } from '@/lib/auth/serviceAdminSession';

const CURRENCY = 'EUR';
const CHUNK_SIZE = 300;

function cleanId(value) {
  const id = String(value || '').trim();
  return id && !id.includes('/') ? id : '';
}

export async function POST(request) {
  const unauthorized = await requireServiceAdminRequest();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const modelId = cleanId(body?.modelId);
    const categoryId = cleanId(body?.categoryId);
    const rows = Array.isArray(body?.rows) ? body.rows : null;

    if (!modelId || !categoryId || !rows || rows.length > 2000) {
      return NextResponse.json({ error: 'Invalid pricing payload.' }, { status: 400 });
    }

    const normalized = [];
    for (const row of rows) {
      const serviceId = cleanId(row?.serviceId);
      const previousDocId = row?.docId ? cleanId(row.docId) : '';
      const price = row?.price;
      if (
        !serviceId ||
        (row?.docId && !previousDocId) ||
        (price !== null && (!Number.isFinite(price) || price < 0))
      ) {
        return NextResponse.json({ error: 'Invalid pricing row.' }, { status: 400 });
      }
      normalized.push({
        previousDocId,
        serviceId,
        price,
        isStartingFrom: row?.isStartingFrom === true,
        isHidden: row?.isHidden === true,
      });
    }

    const previousRows = normalized.filter((row) => row.previousDocId);
    const snapshots = await Promise.all(
      previousRows.map((row) => db.collection('servicePricing').doc(row.previousDocId).get())
    );
    for (let index = 0; index < snapshots.length; index += 1) {
      const data = snapshots[index].data();
      const expected = previousRows[index];
      if (!snapshots[index].exists || data?.modelId !== modelId || data?.serviceId !== expected.serviceId) {
        return NextResponse.json({ error: 'Pricing record does not match this model.' }, { status: 409 });
      }
    }

    for (let offset = 0; offset < normalized.length; offset += CHUNK_SIZE) {
      const batch = db.batch();
      for (const row of normalized.slice(offset, offset + CHUNK_SIZE)) {
        const hasOverride = row.price !== null || row.isStartingFrom || row.isHidden;
        if (!hasOverride) {
          if (row.previousDocId) {
            batch.delete(db.collection('servicePricing').doc(row.previousDocId));
          }
          continue;
        }

        const targetDocId = row.previousDocId || `${modelId}__${row.serviceId}`;
        batch.set(
          db.collection('servicePricing').doc(targetDocId),
          {
            modelId,
            serviceId: row.serviceId,
            categoryId,
            price: row.price,
            isHidden: row.isHidden,
            isStartingFrom: row.isStartingFrom,
            currency: CURRENCY,
            isActive: true,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      }
      await batch.commit();
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Pricelist mutation failed:', error);
    return NextResponse.json({ error: 'Failed to save pricing.' }, { status: 500 });
  }
}
