'use client';

import { useMemo, useState } from 'react';
import devices from '@/data/devices';
import repairServices from '@/data/repairServices';

import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

// ✅ custom button (adjust import path if needed)
import Button from '@components/button/Button';

import s from './PricelistScreen.module.scss';

const DEFAULT_CURRENCY = 'EUR';

// ✅ Manual brand list + order
const BRAND_MENU = [
  { brandSlug: 'apple', label: 'iPhone' },
  { brandSlug: 'ipad', label: 'iPad' },
  { brandSlug: 'macbook', label: 'MacBook' },
  { brandSlug: 'samsung', label: 'Samsung' },
  { brandSlug: 'xiaomi', label: 'Xiaomi' },
];

/**
 * Keep raw input value while user is typing.
 * This prevents issues like spaces being removed from strings such as "no 50".
 */
function normalizePriceInput(v) {
  return String(v ?? '');
}

/**
 * Convert UI value to Firestore value on save:
 * - "" or whitespace only => ""
 * - numeric string => number
 * - anything else => trimmed string
 * - null stays null
 */
function serializePriceForSave(v) {
  if (v === null) return null;

  const raw = String(v ?? '');
  const trimmed = raw.trim();

  if (trimmed === '') return '';

  if (/^[0-9]+([.,][0-9]+)?$/.test(trimmed)) {
    const n = Number(trimmed.replace(',', '.'));
    return Number.isFinite(n) ? n : trimmed;
  }

  return trimmed;
}

async function fetchModelServiceRows(modelId) {
  const q = query(
    collection(db, 'modelServices'),
    where('modelId', '==', modelId)
  );
  const snap = await getDocs(q);

  return snap.docs
    .map((d) => {
      const data = d.data() || {};
      const rawPrice = Object.prototype.hasOwnProperty.call(data, 'price')
        ? data.price
        : '';

      return {
        docId: d.id,
        serviceId: data.serviceId || '',
        price: rawPrice === null ? null : String(rawPrice ?? ''),
      };
    })
    .sort((a, b) => a.serviceId.localeCompare(b.serviceId));
}

// ✅ Build default pricing rows from repairServices catalog (by device.category)
function buildDefaultRowsForModel(modelSlug) {
  const model = (devices || []).find((d) => d?.slug === modelSlug) || null;
  const category = model?.category || null;
  if (!category) return [];

  return (repairServices || [])
    .filter(
      (s) => Array.isArray(s.categories) && s.categories.includes(category)
    )
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
    .map((s) => ({
      docId: '', // not yet saved
      serviceId: s.id, // IMPORTANT: catalog service id (e.g. laptop-battery)
      price: '', // empty => "pēc pieprasījuma"
    }));
}

export default function PricelistScreen({
  initialBrand = BRAND_MENU[0]?.brandSlug || 'apple',
}) {
  const [brandSlug, setBrandSlug] = useState(initialBrand);

  // ✅ only one open at a time
  const [openSlug, setOpenSlug] = useState(null); // string | null

  const [loading, setLoading] = useState({}); // slug -> bool
  const [rowsByModel, setRowsByModel] = useState({}); // slug -> rows[]
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const filteredDevices = useMemo(() => {
    const list = (devices || [])
      .filter((d) => d?.brandSlug === brandSlug)
      .map((d) => ({
        slug: d.slug,
        name: d.name || d.slug,
        series: d.series || 'Other',
        seriesSlug: d.seriesSlug || 'other',
        year: d.year ?? null,
        order: d.order ?? 9999,
      }));

    // inside brand: newest year first, then order, then name
    list.sort((a, b) => {
      const ay = a.year ?? -1;
      const by = b.year ?? -1;
      if (by !== ay) return by - ay;
      if ((a.order ?? 9999) !== (b.order ?? 9999))
        return (a.order ?? 9999) - (b.order ?? 9999);
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [brandSlug]);

  const grouped = useMemo(() => {
    const map = new Map(); // seriesSlug -> { series, seriesSlug, items[] }
    for (const d of filteredDevices) {
      const key = d.seriesSlug || d.series || 'other';
      if (!map.has(key)) {
        map.set(key, {
          series: d.series || 'Other',
          seriesSlug: key,
          items: [],
        });
      }
      map.get(key).items.push(d);
    }

    // Sort groups: numeric series first (desc), else alpha
    const groups = Array.from(map.values());
    groups.sort((a, b) => {
      const an = Number(String(a.series).match(/\d+/)?.[0] ?? NaN);
      const bn = Number(String(b.series).match(/\d+/)?.[0] ?? NaN);
      const aIsNum = Number.isFinite(an);
      const bIsNum = Number.isFinite(bn);
      if (aIsNum && bIsNum) return bn - an;
      if (aIsNum) return -1;
      if (bIsNum) return 1;
      return String(a.series).localeCompare(String(b.series));
    });

    return groups;
  }, [filteredDevices]);

  async function toggleDevice(modelSlug) {
    setError('');
    setStatus('');

    const willOpen = openSlug !== modelSlug;

    // collapse current
    if (!willOpen) {
      setOpenSlug(null);
      return;
    }

    // open new (auto-collapses any previous)
    setOpenSlug(modelSlug);

    // lazy load if needed
    if (!rowsByModel[modelSlug]) {
      setLoading((p) => ({ ...p, [modelSlug]: true }));
      try {
        const rows = await fetchModelServiceRows(modelSlug);

        // ✅ If no rows in Firestore -> seed defaults from repairServices
        const seeded = rows.length ? rows : buildDefaultRowsForModel(modelSlug);

        setRowsByModel((p) => ({ ...p, [modelSlug]: seeded }));
      } catch {
        setError('Failed to load model pricing from Firestore.');
      } finally {
        setLoading((p) => ({ ...p, [modelSlug]: false }));
      }
    }
  }

  function updateRow(modelSlug, idx, patch) {
    setRowsByModel((prev) => {
      const list = prev[modelSlug] ? [...prev[modelSlug]] : [];
      list[idx] = { ...list[idx], ...patch };
      return { ...prev, [modelSlug]: list };
    });
  }

  async function saveModel(modelSlug) {
    setError('');
    setStatus('');
    const rows = rowsByModel[modelSlug] || [];

    for (const r of rows) {
      if (!r.serviceId || !r.serviceId.trim()) {
        setError(`"${modelSlug}": every row must have serviceId.`);
        return;
      }
    }

    setLoading((p) => ({ ...p, [modelSlug]: true }));
    try {
      const CHUNK = 450;

      for (let i = 0; i < rows.length; i += CHUNK) {
        const chunk = rows.slice(i, i + CHUNK);
        const batch = writeBatch(db);

        for (const r of chunk) {
          const serviceId = r.serviceId.trim();
          const docId = `${modelSlug}__${serviceId}`;

          batch.set(
            doc(db, 'modelServices', docId),
            {
              modelId: modelSlug,
              serviceId,
              price: serializePriceForSave(r.price), // number | string | "" | null
              currency: DEFAULT_CURRENCY,
              updatedAt: new Date(),
            },
            { merge: true }
          );
        }

        await batch.commit();
      }

      const fresh = await fetchModelServiceRows(modelSlug);

      // If still empty (e.g. rules blocked) keep current rows
      setRowsByModel((p) => ({
        ...p,
        [modelSlug]: fresh.length ? fresh : p[modelSlug] || [],
      }));

      setStatus(`Saved: ${modelSlug}`);
    } catch {
      setError('Failed to save pricing (permissions?).');
    } finally {
      setLoading((p) => ({ ...p, [modelSlug]: false }));
    }
  }

  const brandLabel =
    BRAND_MENU.find((b) => b.brandSlug === brandSlug)?.label || brandSlug;

  return (
    <div className={s.wrap}>
      <h1 className={s.h1}>Pricelist · {brandLabel}</h1>

      <div className={s.toolbar}>
        <label className={s.brandField}>
          <span className={s.brandLabel}>Brand</span>
          <select
            className={s.select}
            value={brandSlug}
            onChange={(e) => {
              setBrandSlug(e.target.value);
              setOpenSlug(null);
              setRowsByModel({});
              setError('');
              setStatus('');
            }}
          >
            {BRAND_MENU.map((b) => (
              <option key={b.brandSlug} value={b.brandSlug}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <div className={s.error}>{error}</div>}
      {status && <div className={s.status}>{status}</div>}

      <div className={s.groups}>
        {grouped.map((g) => (
          <section key={g.seriesSlug} className={s.group}>
            <div className={s.groupHead}>
              <span className={s.groupTitle}>{g.series}</span>
            </div>

            {g.items.map((d) => {
              const isOpen = openSlug === d.slug;
              const isLoading = !!loading[d.slug];
              const rows = rowsByModel[d.slug] || [];

              return (
                <div key={d.slug} className={s.model}>
                  <button
                    type="button"
                    onClick={() => toggleDevice(d.slug)}
                    className={s.modelToggle}
                  >
                    <span className={s.modelName}>
                      {d.name}
                      {d.year ? (
                        <span className={s.modelYear}> · {d.year}</span>
                      ) : null}
                    </span>

                    <span className={s.modelChevron}>
                      {isOpen ? '▾' : '▸'} {isLoading ? 'Loading…' : ''}
                    </span>
                  </button>

                  {isOpen && (
                    <div className={s.panel}>
                      {rows.length === 0 ? (
                        <div className={s.empty}>
                          No services found for this category.
                        </div>
                      ) : (
                        <div className={s.rows}>
                          {rows.map((r, idx) => {
                            const notApplicable = r.price === null;

                            return (
                              <div
                                key={`${r.docId || r.serviceId || 'row'}-${idx}`}
                                className={s.row}
                              >
                                <input
                                  className={s.input}
                                  value={r.serviceId}
                                  onChange={(e) =>
                                    updateRow(d.slug, idx, {
                                      serviceId: e.target.value,
                                    })
                                  }
                                  placeholder="serviceId"
                                />

                                <input
                                  className={s.input}
                                  value={notApplicable ? '' : String(r.price ?? '')}
                                  disabled={notApplicable}
                                  onChange={(e) =>
                                    updateRow(d.slug, idx, {
                                      price: normalizePriceInput(e.target.value),
                                    })
                                  }
                                  placeholder="pēc pieprasījuma"
                                />

                                <label className={s.hideToggle}>
                                  <input
                                    type="checkbox"
                                    checked={notApplicable}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        updateRow(d.slug, idx, { price: null });
                                      } else {
                                        updateRow(d.slug, idx, { price: '' });
                                      }
                                    }}
                                  />
                                  hide
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className={s.panelFooter}>
                        <Button
                          onClick={() => saveModel(d.slug)}
                          disabled={isLoading}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        ))}
      </div>
    </div>
  );
}