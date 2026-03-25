'use client';

import { useMemo, useState } from 'react';
import devices from '@/data/devices';

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

import s from './PricelistScreen.module.scss';

const DEFAULT_CURRENCY = 'EUR';

const BRAND_MENU = [
  { brandSlug: 'apple', label: 'iPhone' },
  { brandSlug: 'ipad', label: 'iPad' },
  { brandSlug: 'macbook', label: 'MacBook' },
  { brandSlug: 'samsung', label: 'Samsung' },
  { brandSlug: 'xiaomi', label: 'Xiaomi' },
];

function normalizePriceInput(v) {
  return String(v ?? '');
}

function parseNumericPrice(v) {
  const raw = String(v ?? '').trim();
  if (!raw) return null;

  if (!/^[0-9]+([.,][0-9]+)?$/.test(raw)) {
    return null;
  }

  const n = Number(raw.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

function getModelMeta(modelSlug) {
  return (devices || []).find((d) => d?.slug === modelSlug) || null;
}

async function fetchServicePricingRows(modelId) {
  try {
    const q = query(
      collection(db, 'servicePricing'),
      where('modelId', '==', modelId)
    );
    const snap = await getDocs(q);

    return snap.docs.map((d) => {
      const data = d.data() || {};
      const hasNumericPrice =
        typeof data.price === 'number' && Number.isFinite(data.price);

      return {
        docId: d.id,
        serviceId: data.serviceId || '',
        label: '',
        order: 9999,
        priceInput: hasNumericPrice ? String(data.price) : '',
        isStartingFrom: hasNumericPrice && data.isStartingFrom === true,
        hidden: !hasNumericPrice,
      };
    });
  } catch (err) {
    console.error('fetchServicePricingRows failed:', err);
    throw err;
  }
}

async function fetchServicesForCategory(categoryId) {
  try {
    console.log('fetchServicesForCategory categoryId =', categoryId);

    const q = query(
      collection(db, 'services'),
      where('categoryId', '==', categoryId),
      where('isActive', '==', true)
    );

    const snap = await getDocs(q);

    return snap.docs
      .map((d) => {
        const data = d.data() || {};
        return {
          id: d.id,
          label: data.labels?.lv || data.labels?.ru || data.title || d.id,
          order: typeof data.order === 'number' ? data.order : 9999,
        };
      })
      .sort((a, b) => {
        if ((a.order ?? 9999) !== (b.order ?? 9999)) {
          return (a.order ?? 9999) - (b.order ?? 9999);
        }
        return String(a.label || a.id).localeCompare(String(b.label || b.id));
      });
  } catch (err) {
    console.error('fetchServicesForCategory failed:', err);
    throw err;
  }
}

async function buildRowsForModel(modelSlug) {
  const model = getModelMeta(modelSlug);
  const categoryId = model?.category || model?.categoryKey || null;

  console.log('buildRowsForModel', {
    modelSlug,
    model,
    categoryId,
  });

  if (!categoryId) return [];

  const [serviceDefs, existingRows] = await Promise.all([
    fetchServicesForCategory(categoryId),
    fetchServicePricingRows(modelSlug),
  ]);

  const existingById = new Map(existingRows.map((r) => [r.serviceId, r]));
  const knownServiceIds = new Set(serviceDefs.map((s) => s.id));

  const merged = serviceDefs.map((svc) => {
    const existing = existingById.get(svc.id);

    return {
      docId: existing?.docId || '',
      serviceId: svc.id,
      label: svc.label,
      order: svc.order,
      priceInput: existing?.priceInput ?? '',
      isStartingFrom: existing?.isStartingFrom === true,
      hidden: existing ? existing.hidden === true : true,
    };
  });

  const extras = existingRows
    .filter((r) => r.serviceId && !knownServiceIds.has(r.serviceId))
    .map((r) => ({
      ...r,
      label: r.serviceId,
      order: 9999,
    }))
    .sort((a, b) => String(a.serviceId).localeCompare(String(b.serviceId)));

  return [...merged, ...extras];
}

export default function PricelistScreen({
  initialBrand = BRAND_MENU[0]?.brandSlug || 'apple',
}) {
  const [brandSlug, setBrandSlug] = useState(initialBrand);
  const [openSlug, setOpenSlug] = useState(null);
  const [loading, setLoading] = useState({});
  const [rowsByModel, setRowsByModel] = useState({});
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

    list.sort((a, b) => {
      const ay = a.year ?? -1;
      const by = b.year ?? -1;
      if (by !== ay) return by - ay;
      if ((a.order ?? 9999) !== (b.order ?? 9999)) {
        return (a.order ?? 9999) - (b.order ?? 9999);
      }
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [brandSlug]);

  const grouped = useMemo(() => {
    const map = new Map();

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

    if (!willOpen) {
      setOpenSlug(null);
      return;
    }

    setOpenSlug(modelSlug);

    if (!rowsByModel[modelSlug]) {
      setLoading((p) => ({ ...p, [modelSlug]: true }));
      try {
        const rows = await buildRowsForModel(modelSlug);
        setRowsByModel((p) => ({ ...p, [modelSlug]: rows }));
      } catch (err) {
        console.error(err);
        setError(err?.message || 'Failed to load model pricing from Firestore.');
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
    const model = getModelMeta(modelSlug);
    const categoryId = model?.category || model?.categoryKey || '';

    if (!categoryId) {
      setError(`"${modelSlug}": missing category.`);
      return;
    }

    for (const r of rows) {
      if (!r.serviceId || !r.serviceId.trim()) {
        setError(`"${modelSlug}": every row must have serviceId.`);
        return;
      }

      if (!r.hidden) {
        const parsed = parseNumericPrice(r.priceInput);
        if (parsed === null) {
          setError(
            `"${modelSlug}" / "${r.serviceId}": price must be numeric, for example 89 or 89.99`
          );
          return;
        }
      }
    }

    setLoading((p) => ({ ...p, [modelSlug]: true }));

    try {
      const CHUNK = 300;

      for (let i = 0; i < rows.length; i += CHUNK) {
        const chunk = rows.slice(i, i + CHUNK);
        const batch = writeBatch(db);

        for (const r of chunk) {
          const serviceId = r.serviceId.trim();
          const nextDocId = `${modelSlug}__${serviceId}`;
          const prevDocId = r.docId?.trim() || '';

          if (prevDocId && prevDocId !== nextDocId) {
            batch.delete(doc(db, 'servicePricing', prevDocId));
          }

          const numericPrice = r.hidden ? null : parseNumericPrice(r.priceInput);

          batch.set(
            doc(db, 'servicePricing', nextDocId),
            {
              modelId: modelSlug,
              serviceId,
              categoryId,
              price: numericPrice,
              isStartingFrom: numericPrice !== null && r.isStartingFrom === true,
              currency: DEFAULT_CURRENCY,
              isActive: true,
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );
        }

        await batch.commit();
      }

      const fresh = await buildRowsForModel(modelSlug);

      setRowsByModel((p) => ({
        ...p,
        [modelSlug]: fresh.length ? fresh : p[modelSlug] || [],
      }));

      setStatus(`Saved: ${modelSlug}`);
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Failed to save pricing.');
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
                      {d.year ? <span className={s.modelYear}> · {d.year}</span> : null}
                    </span>

                    <span className={s.modelChevron}>
                      {isOpen ? '▾' : '▸'} {isLoading ? 'Loading…' : ''}
                    </span>
                  </button>

                  {isOpen && (
                    <div className={s.panel}>
                      {rows.length === 0 ? (
                        <div className={s.empty}>No services found for this category.</div>
                      ) : (
                        <div className={s.rows}>
                          {rows.map((r, idx) => (
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
                                value={r.hidden ? '' : String(r.priceInput ?? '')}
                                disabled={r.hidden}
                                onChange={(e) =>
                                  updateRow(d.slug, idx, {
                                    priceInput: normalizePriceInput(e.target.value),
                                  })
                                }
                                placeholder={r.label || 'price'}
                                title={r.label || r.serviceId}
                              />

                              <label className={s.hideToggle}>
                                <input
                                  type="checkbox"
                                  checked={r.hidden ? false : r.isStartingFrom === true}
                                  disabled={r.hidden}
                                  onChange={(e) =>
                                    updateRow(d.slug, idx, {
                                      isStartingFrom: e.target.checked,
                                    })
                                  }
                                />
                                use from
                              </label>

                              <label className={s.hideToggle}>
                                <input
                                  type="checkbox"
                                  checked={r.hidden === true}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      updateRow(d.slug, idx, {
                                        hidden: true,
                                        priceInput: '',
                                        isStartingFrom: false,
                                      });
                                    } else {
                                      updateRow(d.slug, idx, {
                                        hidden: false,
                                        priceInput: '',
                                      });
                                    }
                                  }}
                                />
                                hide
                              </label>

                              
                            </div>
                          ))}
                        </div>
                      )}

                      <div className={s.panelFooter}>
                        <Button onClick={() => saveModel(d.slug)} disabled={isLoading}>
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