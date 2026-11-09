import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { db } from '@/lib/firebaseAdmin';
import { requireServiceAdminRequest } from '@/lib/auth/serviceAdminSession';
import { validateFaqIdentity } from '@/lib/faq/faqIdentity';
import { toFaqAdminGroup, prepareFaqAdminUpdate, getFaqAdminRevision } from '@/lib/faq/faqAdmin';

export async function GET() {
  try {
    const snap = await db.collection('faqGroups').get();

    const groups = snap.docs
      .map((doc) => toFaqAdminGroup(doc.id, doc.data(), getFaqAdminRevision(doc.updateTime)))
      .sort((a, b) => {
        if ((a.locale || '').localeCompare(b.locale || '') !== 0) {
          return (a.locale || '').localeCompare(b.locale || '');
        }

        if ((a.order ?? 10) !== (b.order ?? 10)) {
          return (a.order ?? 10) - (b.order ?? 10);
        }

        if ((a.scopeType || '').localeCompare(b.scopeType || '') !== 0) {
          return (a.scopeType || '').localeCompare(b.scopeType || '');
        }

        return (a.scopeKey || '').localeCompare(b.scopeKey || '');
      });

    return NextResponse.json({ groups });
  } catch (error) {
    console.error('FAQ GET failed:', error);
    return NextResponse.json(
      { error: 'Failed to load FAQ groups' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const unauthorized = await requireServiceAdminRequest();
  if (unauthorized) return unauthorized;

  try {
    const body = await req.json();

    let docId;
    try {
      docId = validateFaqIdentity(body);
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    const ref = db.collection('faqGroups').doc(docId);
    await db.runTransaction(async transaction => {
      const existing = await transaction.get(ref);
      if (!existing.exists) {
        throw Object.assign(new Error('FAQ group does not exist; use the approved migration to create it'), { status: 409 });
      }
      if (body.revision !== getFaqAdminRevision(existing.updateTime)) {
        throw Object.assign(new Error('FAQ group changed. Reload before saving.'), { status: 409 });
      }
      let update;
      try {
        update = prepareFaqAdminUpdate(body, existing.data());
      } catch (error) {
        throw Object.assign(error, { status: 400 });
      }
      transaction.update(ref, { ...update, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    });

    return NextResponse.json({ ok: true, id: docId });
  } catch (error) {
    if (!error.status) console.error('FAQ POST failed:', error);
    return NextResponse.json(
      { error: error.status ? error.message : 'Failed to save FAQ group' },
      { status: error.status || 500 }
    );
  }
}
