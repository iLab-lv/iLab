import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { db } from '@/lib/firebaseAdmin';

function normalizeFaqItem(item = {}) {
  return {
    q: typeof item.q === 'string' ? item.q : '',
    aHtml: typeof item.aHtml === 'string' ? item.aHtml : '',
    order:
      typeof item.order === 'number' && Number.isFinite(item.order)
        ? item.order
        : 10,
  };
}

function normalizeFaqGroup(id, data = {}) {
  return {
    id,
    scopeType:
      typeof data.scopeType === 'string' ? data.scopeType : 'basic',
    scopeKey:
      typeof data.scopeKey === 'string' ? data.scopeKey : '',
    locale: data.locale === 'ru' ? 'ru' : 'lv',
    title: typeof data.title === 'string' ? data.title : '',
    isPublished: data.isPublished !== false,
    order:
      typeof data.order === 'number' && Number.isFinite(data.order)
        ? data.order
        : 10,
    items: Array.isArray(data.items)
      ? data.items.map(normalizeFaqItem)
      : [],
  };
}

function buildDocId(scopeType, scopeKey, locale) {
  if (scopeType === 'basic') return `basic_${locale}`;
  return `${scopeType}_${scopeKey}_${locale}`;
}

export async function GET() {
  try {
    const snap = await db.collection('faqGroups').get();

    const groups = snap.docs
      .map((doc) => normalizeFaqGroup(doc.id, doc.data()))
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
  try {
    const body = await req.json();

    const scopeType =
      body?.scopeType === 'category' || body?.scopeType === 'service'
        ? body.scopeType
        : 'basic';

    const locale = body?.locale === 'ru' ? 'ru' : 'lv';
    const scopeKey =
      scopeType === 'basic' ? null : String(body?.scopeKey || '').trim();

    if (scopeType !== 'basic' && !scopeKey) {
      return NextResponse.json(
        { error: 'scopeKey is required for category and service FAQ groups' },
        { status: 400 }
      );
    }

    const title = String(body?.title || '').trim();
    const isPublished = body?.isPublished !== false;
    const order =
      typeof body?.order === 'number' && Number.isFinite(body.order)
        ? body.order
        : 10;

    const items = Array.isArray(body?.items)
      ? body.items
          .map((item, idx) => ({
            q: String(item?.q || '').trim(),
            aHtml: String(item?.aHtml || '').trim(),
            order:
              typeof item?.order === 'number' && Number.isFinite(item.order)
                ? item.order
                : (idx + 1) * 10,
          }))
          .filter((item) => item.q && item.aHtml)
      : [];

    const docId = buildDocId(scopeType, scopeKey, locale);
    const ref = db.collection('faqGroups').doc(docId);
    const existing = await ref.get();

    await ref.set(
      {
        scopeType,
        scopeKey,
        locale,
        title,
        isPublished,
        order,
        items,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        ...(existing.exists
          ? {}
          : { createdAt: admin.firestore.FieldValue.serverTimestamp() }),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true, id: docId });
  } catch (error) {
    console.error('FAQ POST failed:', error);
    return NextResponse.json(
      { error: 'Failed to save FAQ group' },
      { status: 500 }
    );
  }
}