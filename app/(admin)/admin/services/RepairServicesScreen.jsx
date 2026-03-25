'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

import Button from '@components/button/Button';
import s from './RepairServicesScreen.module.scss';

const CATEGORY_MENU = [
  { id: 'telefonu-remonts', label: 'Phones' },
  { id: 'plansetdatoru-remonts', label: 'Tablets' },
  { id: 'datoru-remonts', label: 'Computers' },
];

function emptyRow(categoryId = 'telefonu-remonts') {
  return {
    docId: '',
    id: '',
    type: 'service',
    isActive: true,
    order: 9999,
    categoryId,
    family: '',
    slug: '',
    labels: {
      lv: '',
      ru: '',
    },
    defaultTimeText: {
      lv: '',
      ru: '',
    },
    defaultWarrantyDays: 90,
    isNew: true,
  };
}

function normalizeText(v) {
  return String(v ?? '');
}

function normalizeSlug(v) {
  return String(v ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseIntOr(defaultValue, v) {
  const n = Number(String(v ?? '').trim());
  return Number.isFinite(n) ? Math.round(n) : defaultValue;
}

async function fetchServices(categoryId) {
  const q = query(
    collection(db, 'services'),
    where('categoryId', '==', categoryId)
  );
  const snap = await getDocs(q);

  return snap.docs
    .map((d) => {
      const data = d.data() || {};
      return {
        docId: d.id,
        id: data.id || d.id,
        type: data.type || 'service',
        isActive: data.isActive !== false,
        order: typeof data.order === 'number' ? data.order : 9999,
        categoryId: data.categoryId || categoryId,
        family: data.family || '',
        slug: data.slug || '',
        labels: {
          lv: data.labels?.lv || '',
          ru: data.labels?.ru || '',
        },
        defaultTimeText: {
          lv: data.defaultTimeText?.lv || '',
          ru: data.defaultTimeText?.ru || '',
        },
        defaultWarrantyDays:
          typeof data.defaultWarrantyDays === 'number'
            ? data.defaultWarrantyDays
            : 90,
        isNew: false,
      };
    })
    .sort((a, b) => {
      const famCmp = String(a.family || '').localeCompare(String(b.family || ''));
      if (famCmp !== 0) return famCmp;
      if ((a.order ?? 9999) !== (b.order ?? 9999)) {
        return (a.order ?? 9999) - (b.order ?? 9999);
      }
      return String(a.labels?.lv || a.id).localeCompare(String(b.labels?.lv || b.id));
    });
}

export default function RepairServicesScreen({
  initialCategory = 'telefonu-remonts',
}) {
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      setStatus('');

      try {
        const next = await fetchServices(categoryId);
        if (!cancelled) setRows(next);
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError(err?.message || 'Failed to load services.');
          setRows([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  const grouped = useMemo(() => {
    const map = new Map();

    for (const row of rows) {
      const key = row.family || 'Ungrouped';
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(row);
    }

    return Array.from(map.entries())
      .map(([family, items]) => ({
        family,
        items,
      }))
      .sort((a, b) => String(a.family).localeCompare(String(b.family)));
  }, [rows]);

  function updateRow(idx, patch) {
    setRows((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], ...patch };
      return next;
    });
  }

  function updateNested(idx, key, patch) {
    setRows((prev) => {
      const next = [...prev];
      next[idx] = {
        ...next[idx],
        [key]: {
          ...(next[idx]?.[key] || {}),
          ...patch,
        },
      };
      return next;
    });
  }

  function addRow() {
    setRows((prev) => [...prev, emptyRow(categoryId)]);
    setStatus('');
    setError('');
  }

  function removeUnsavedRow(idx) {
    setRows((prev) => prev.filter((_, i) => i !== idx));
  }

  async function saveAll() {
    setError('');
    setStatus('');

    if (!rows.length) {
      setStatus('Nothing to save.');
      return;
    }

    for (const row of rows) {
      const nextId = normalizeText(row.id).trim();
      if (!nextId) {
        setError('Every service must have an id.');
        return;
      }
      if (!row.categoryId) {
        setError(`"${nextId}" is missing categoryId.`);
        return;
      }
    }

    const dupIds = rows.map((r) => normalizeText(r.id).trim()).filter(Boolean);
    const dupSet = new Set();
    for (const id of dupIds) {
      if (dupSet.has(id)) {
        setError(`Duplicate service id: ${id}`);
        return;
      }
      dupSet.add(id);
    }

    setSaving(true);

    try {
      const CHUNK = 250;

      for (let i = 0; i < rows.length; i += CHUNK) {
        const chunk = rows.slice(i, i + CHUNK);
        const batch = writeBatch(db);

        for (const row of chunk) {
          const nextId = normalizeText(row.id).trim();
          const prevId = normalizeText(row.docId).trim();

          if (prevId && prevId !== nextId) {
            batch.delete(doc(db, 'services', prevId));
          }

          batch.set(
            doc(db, 'services', nextId),
            {
              id: nextId,
              type: 'service',
              isActive: row.isActive !== false,
              order: parseIntOr(9999, row.order),
              categoryId: row.categoryId,
              family: normalizeText(row.family).trim(),
              slug: normalizeSlug(row.slug),
              labels: {
                lv: normalizeText(row.labels?.lv).trim(),
                ru: normalizeText(row.labels?.ru).trim(),
              },
              defaultTimeText: {
                lv: normalizeText(row.defaultTimeText?.lv).trim(),
                ru: normalizeText(row.defaultTimeText?.ru).trim(),
              },
              defaultWarrantyDays: parseIntOr(90, row.defaultWarrantyDays),
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );
        }

        await batch.commit();
      }

      const fresh = await fetchServices(categoryId);
      setRows(fresh);
      setStatus(`Saved ${fresh.length} services.`);
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Failed to save services.');
    } finally {
      setSaving(false);
    }
  }

  const categoryLabel =
    CATEGORY_MENU.find((c) => c.id === categoryId)?.label || categoryId;

  return (
    <div className={s.wrap}>
      <h1 className={s.h1}>Repair Services · {categoryLabel}</h1>

      <div className={s.toolbar}>
        <label className={s.categoryField}>
          <span className={s.categoryLabel}>Category</span>
          <select
            className={s.select}
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setRows([]);
              setError('');
              setStatus('');
            }}
          >
            {CATEGORY_MENU.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <Button onClick={addRow}>Add service</Button>
        <Button onClick={saveAll} disabled={saving || loading}>
          {saving ? 'Saving…' : 'Save all'}
        </Button>
      </div>

      {error && <div className={s.error}>{error}</div>}
      {status && <div className={s.status}>{status}</div>}

      {loading ? (
        <div className={s.loading}>Loading…</div>
      ) : rows.length === 0 ? (
        <div className={s.empty}>No services found for this category.</div>
      ) : (
        <div className={s.groups}>
          {grouped.map((group) => (
            <section key={group.family} className={s.group}>
              <div className={s.groupHead}>
                <span className={s.groupTitle}>{group.family}</span>
              </div>

              <div className={s.rows}>
                {group.items.map((row) => {
                  const idx = rows.findIndex(
                    (r) => (r.docId || r.id) === (row.docId || row.id)
                  );

                  return (
                    <div
                      key={`${row.docId || row.id || 'new'}-${idx}`}
                      className={s.card}
                    >
                      <div className={s.cardTop}>
                        <div className={s.cardTitle}>
                          {row.labels?.lv || row.id || 'New service'}
                        </div>

                        <label className={s.toggle}>
                          <input
                            type="checkbox"
                            checked={row.isActive !== false}
                            onChange={(e) =>
                              updateRow(idx, { isActive: e.target.checked })
                            }
                          />
                          active
                        </label>

                        {row.isNew && (
                          <Button onClick={() => removeUnsavedRow(idx)}>
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className={s.grid}>
                        <label className={s.field}>
                          <span className={s.label}>ID</span>
                          <input
                            className={s.input}
                            value={row.id}
                            onChange={(e) =>
                              updateRow(idx, { id: normalizeText(e.target.value) })
                            }
                            placeholder="phone-battery"
                          />
                        </label>

                        <label className={s.field}>
                          <span className={s.label}>Slug</span>
                          <input
                            className={s.input}
                            value={row.slug}
                            onChange={(e) =>
                              updateRow(idx, { slug: normalizeText(e.target.value) })
                            }
                            placeholder="baterijas-maina"
                          />
                        </label>

                        <label className={s.field}>
                          <span className={s.label}>Family</span>
                          <input
                            className={s.input}
                            value={row.family}
                            onChange={(e) =>
                              updateRow(idx, { family: normalizeText(e.target.value) })
                            }
                            placeholder="Barošana un uzlāde"
                          />
                        </label>

                        <label className={s.field}>
                          <span className={s.label}>Order</span>
                          <input
                            className={s.input}
                            value={String(row.order ?? '')}
                            onChange={(e) =>
                              updateRow(idx, { order: normalizeText(e.target.value) })
                            }
                            placeholder="20"
                          />
                        </label>

                        <label className={s.field}>
                          <span className={s.label}>Warranty days</span>
                          <input
                            className={s.input}
                            value={String(row.defaultWarrantyDays ?? '')}
                            onChange={(e) =>
                              updateRow(idx, {
                                defaultWarrantyDays: normalizeText(e.target.value),
                              })
                            }
                            placeholder="90"
                          />
                        </label>

                        <label className={s.field}>
                          <span className={s.label}>Category</span>
                          <select
                            className={s.select}
                            value={row.categoryId}
                            onChange={(e) =>
                              updateRow(idx, { categoryId: e.target.value })
                            }
                          >
                            {CATEGORY_MENU.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.label}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className={s.field}>
                          <span className={s.label}>LV label</span>
                          <input
                            className={s.input}
                            value={row.labels?.lv || ''}
                            onChange={(e) =>
                              updateNested(idx, 'labels', {
                                lv: normalizeText(e.target.value),
                              })
                            }
                            placeholder="Baterijas maiņa"
                          />
                        </label>

                        <label className={s.field}>
                          <span className={s.label}>RU label</span>
                          <input
                            className={s.input}
                            value={row.labels?.ru || ''}
                            onChange={(e) =>
                              updateNested(idx, 'labels', {
                                ru: normalizeText(e.target.value),
                              })
                            }
                            placeholder="Замена батареи"
                          />
                        </label>

                        <label className={s.field}>
                          <span className={s.label}>LV time</span>
                          <input
                            className={s.input}
                            value={row.defaultTimeText?.lv || ''}
                            onChange={(e) =>
                              updateNested(idx, 'defaultTimeText', {
                                lv: normalizeText(e.target.value),
                              })
                            }
                            placeholder="30–120 min"
                          />
                        </label>

                        <label className={s.field}>
                          <span className={s.label}>RU time</span>
                          <input
                            className={s.input}
                            value={row.defaultTimeText?.ru || ''}
                            onChange={(e) =>
                              updateNested(idx, 'defaultTimeText', {
                                ru: normalizeText(e.target.value),
                              })
                            }
                            placeholder="30–120 мин"
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}