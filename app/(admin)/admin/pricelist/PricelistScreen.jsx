'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from 'firebase/firestore';

import { db } from '@/lib/firebaseClient';
import Button from '@components/button/Button';

import s from './PricelistScreen.module.scss';

const DEFAULT_CURRENCY = 'EUR';
const DEFAULT_CATEGORY_SLUG = 'telefonu-remonts';
const DEFAULT_BRAND_KEY = 'apple';
const ADMIN_LOCALE = 'lv';
const MODEL_COLLECTION_CANDIDATES = ['devices', 'models'];

function normalizePriceInput(v) {
  return String(v ?? '');
}

function parseNumericPrice(v) {
  const raw = String(v ?? '').trim();
  if (!raw) return null;
  if (!/^[0-9]+([.,][0-9]+)?$/.test(raw)) return null;

  const n = Number(raw.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

function getLocalizedValue(value, locale = ADMIN_LOCALE) {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  return value[locale] || value.lv || value.ru || '';
}

function byOrderThenLabelAsc(a, b) {
  const ao = typeof a.order === 'number' ? a.order : 9999;
  const bo = typeof b.order === 'number' ? b.order : 9999;
  if (ao !== bo) return ao - bo;
  return String(a.label || a.key || '').localeCompare(
    String(b.label || b.key || '')
  );
}

function normalizeCategoryDoc(docSnap) {
  const data = docSnap.data() || {};
  const slug = String(data.slug || docSnap.id);
  const key = String(data.key || slug);
  const label = getLocalizedValue(data.labels) || slug;

  const brands = Array.isArray(data.brands)
    ? data.brands
        .map((brand) => {
          const brandKey = String(brand?.key || '').trim();
          if (!brandKey) return null;

          const series = Array.isArray(brand?.series)
            ? brand.series
                .map((seriesItem) => {
                  const seriesKey = String(seriesItem?.key || '').trim();
                  if (!seriesKey) return null;

                  return {
                    key: seriesKey,
                    label: getLocalizedValue(seriesItem?.labels) || seriesKey,
                    order:
                      typeof seriesItem?.order === 'number'
                        ? seriesItem.order
                        : 9999,
                  };
                })
                .filter(Boolean)
                .sort(byOrderThenLabelAsc)
            : [];

          return {
            key: brandKey,
            label: getLocalizedValue(brand?.labels) || brandKey,
            order: typeof brand?.order === 'number' ? brand.order : 9999,
            image: typeof brand?.image === 'string' ? brand.image : '',
            logo: typeof brand?.logo === 'string' ? brand.logo : '',
            series,
          };
        })
        .filter(Boolean)
        .sort(byOrderThenLabelAsc)
    : [];

  return {
    id: docSnap.id,
    slug,
    key,
    label,
    order: typeof data.order === 'number' ? data.order : 9999,
    type: typeof data.type === 'string' ? data.type : '',
    brands,
  };
}

function normalizeModelDoc(docSnap) {
  const data = docSnap.data() || {};

  const slug = String(data.slug || docSnap.id);
  const name =
    typeof data.name === 'string' && data.name.trim() ? data.name.trim() : slug;

  const year = Number.isFinite(Number(data.year)) ? Number(data.year) : null;
  const order = typeof data.order === 'number' ? data.order : 9999;

  const categoryKey = String(
    data.categoryKey ||
      data.categorySlug ||
      data.category ||
      data.deviceKey ||
      data.deviceSlug ||
      data.device ||
      ''
  ).trim();

  const brandKey = String(
    data.brandKey || data.brandSlug || data.brand || ''
  ).trim();

  const seriesKey = String(
    data.seriesKey || data.seriesSlug || data.series || ''
  ).trim();

  const seriesLabel =
    getLocalizedValue(data.seriesLabels) ||
    getLocalizedValue(data.seriesLabel) ||
    (typeof data.series === 'string' ? data.series : '') ||
    seriesKey ||
    'Other';

  return {
    id: docSnap.id,
    slug,
    name,
    year,
    order,
    categoryKey,
    brandKey,
    seriesKey,
    seriesLabel,
  };
}

async function fetchCategories() {
  const snap = await getDocs(collection(db, 'categories'));

  return snap.docs
    .map(normalizeCategoryDoc)
    .filter((item) => item.type === 'category')
    .sort(byOrderThenLabelAsc);
}

async function fetchModelsFromCollection(collectionName) {
  const snap = await getDocs(collection(db, collectionName));
  return snap.docs.map(normalizeModelDoc);
}

async function fetchModels() {
  for (const collectionName of MODEL_COLLECTION_CANDIDATES) {
    try {
      const rows = await fetchModelsFromCollection(collectionName);
      return rows;
    } catch {}
  }

  throw new Error(
    `Failed to load model data from collections: ${MODEL_COLLECTION_CANDIDATES.join(
      ', '
    )}`
  );
}

async function fetchServicePricingRows(modelId) {
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
      hidden: data.isHidden === true,
    };
  });
}

async function fetchServicesForCategory(categoryId) {
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
}

function getModelMeta(models, modelSlug) {
  return models.find((d) => d.slug === modelSlug) || null;
}

function resolveCategoryIdForModel(model, categories) {
  const raw = String(model?.categoryKey || '').trim();
  if (!raw) return '';

  const exact = categories.find(
    (c) => c.id === raw || c.slug === raw || c.key === raw
  );

  return exact?.id || raw;
}

async function buildRowsForModel(modelSlug, models, categories) {
  const model = getModelMeta(models, modelSlug);
  const categoryId = resolveCategoryIdForModel(model, categories);

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
      hidden: existing?.hidden === true,
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
  initialCategory = DEFAULT_CATEGORY_SLUG,
  initialBrand = DEFAULT_BRAND_KEY,
}) {
  const [categories, setCategories] = useState([]);
  const [models, setModels] = useState([]);

  const [categorySlug, setCategorySlug] = useState(initialCategory);
  const [brandKey, setBrandKey] = useState(initialBrand);

  const [openSlug, setOpenSlug] = useState(null);
  const [loading, setLoading] = useState({});
  const [rowsByModel, setRowsByModel] = useState({});
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [bootLoading, setBootLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialData() {
      setBootLoading(true);
      setError('');
      setStatus('');

      try {
        const categoryDocs = await fetchCategories();
        if (cancelled) return;

        const modelRows = await fetchModels();
        if (cancelled) return;

        setCategories(categoryDocs);
        setModels(modelRows);
      } catch (err) {
        if (cancelled) return;
        setError(
          `${err?.code || 'error'}: ${err?.message || 'Failed to load Firebase data.'}`
        );
      } finally {
        if (!cancelled) {
          setBootLoading(false);
        }
      }
    }

    loadInitialData();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedCategory = useMemo(() => {
    if (!categories.length) return null;

    return (
      categories.find((c) => c.slug === categorySlug) ||
      categories.find((c) => c.slug === DEFAULT_CATEGORY_SLUG) ||
      categories[0] ||
      null
    );
  }, [categories, categorySlug]);

  const brandOptions = useMemo(() => {
    return selectedCategory?.brands || [];
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedCategory) return;

    if (selectedCategory.slug !== categorySlug) {
      setCategorySlug(selectedCategory.slug);
      return;
    }

    const hasSelectedBrand = brandOptions.some((b) => b.key === brandKey);
    if (hasSelectedBrand) return;

    const nextBrand =
      brandOptions.find((b) => b.key === DEFAULT_BRAND_KEY) ||
      brandOptions[0] ||
      null;

    setBrandKey(nextBrand?.key || '');
  }, [selectedCategory, brandOptions, categorySlug, brandKey]);

  const selectedBrand = useMemo(() => {
    return brandOptions.find((b) => b.key === brandKey) || null;
  }, [brandOptions, brandKey]);

  const filteredModels = useMemo(() => {
    if (!selectedCategory || !brandKey) return [];

    const categoryCandidates = new Set(
      [selectedCategory.id, selectedCategory.slug, selectedCategory.key].filter(Boolean)
    );

    return [...models]
      .filter((d) => categoryCandidates.has(d.categoryKey))
      .filter((d) => d.brandKey === brandKey)
      .sort((a, b) => {
        const ay = a.year ?? -1;
        const by = b.year ?? -1;
        if (by !== ay) return by - ay;
        if ((a.order ?? 9999) !== (b.order ?? 9999)) {
          return (a.order ?? 9999) - (b.order ?? 9999);
        }
        return String(a.name).localeCompare(String(b.name));
      });
  }, [models, selectedCategory, brandKey]);

  const grouped = useMemo(() => {
    const map = new Map();

    const seriesDefs = new Map(
      (selectedBrand?.series || []).map((item) => [item.key, item])
    );

    for (const d of filteredModels) {
      const fallbackKey = d.seriesKey || 'other';
      const seriesDef = seriesDefs.get(d.seriesKey);

      const key = seriesDef?.key || fallbackKey;
      const label = seriesDef?.label || d.seriesLabel || 'Other';
      const order = typeof seriesDef?.order === 'number' ? seriesDef.order : 9999;

      if (!map.has(key)) {
        map.set(key, {
          series: label,
          seriesSlug: key,
          order,
          items: [],
        });
      }

      map.get(key).items.push(d);
    }

    return Array.from(map.values()).sort((a, b) => {
      if ((a.order ?? 9999) !== (b.order ?? 9999)) {
        return (a.order ?? 9999) - (b.order ?? 9999);
      }
      return String(a.series || '').localeCompare(String(b.series || ''));
    });
  }, [filteredModels, selectedBrand]);

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
        const rows = await buildRowsForModel(modelSlug, models, categories);
        setRowsByModel((p) => ({ ...p, [modelSlug]: rows }));
      } catch (err) {
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
    const model = getModelMeta(models, modelSlug);
    const categoryId = resolveCategoryIdForModel(model, categories);

    if (!categoryId) {
      setError(`"${modelSlug}": missing category.`);
      return;
    }

    for (const r of rows) {
      if (!r.serviceId || !r.serviceId.trim()) {
        setError(`"${modelSlug}": every row must have serviceId.`);
        return;
      }

      if (r.hidden !== true) {
        const raw = String(r.priceInput ?? '').trim();
        if (raw && parseNumericPrice(raw) === null) {
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
          const numericPrice = parseNumericPrice(r.priceInput);

          if (prevDocId && prevDocId !== nextDocId) {
            batch.delete(doc(db, 'servicePricing', prevDocId));
          }

          batch.set(
            doc(db, 'servicePricing', nextDocId),
            {
              modelId: modelSlug,
              serviceId,
              categoryId,
              price: numericPrice,
              isHidden: r.hidden === true,
              isStartingFrom:
                r.hidden === true
                  ? false
                  : numericPrice !== null && r.isStartingFrom === true,
              currency: DEFAULT_CURRENCY,
              isActive: true,
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );
        }

        await batch.commit();
      }

      const fresh = await buildRowsForModel(modelSlug, models, categories);

      setRowsByModel((p) => ({
        ...p,
        [modelSlug]: fresh.length ? fresh : p[modelSlug] || [],
      }));

      setStatus(`Saved: ${modelSlug}`);
    } catch (err) {
      setError(err?.message || 'Failed to save pricing.');
    } finally {
      setLoading((p) => ({ ...p, [modelSlug]: false }));
    }
  }

  function handleCategoryChange(nextCategorySlug) {
    setCategorySlug(nextCategorySlug);
    setOpenSlug(null);
    setRowsByModel({});
    setError('');
    setStatus('');

    const nextCategory =
      categories.find((c) => c.slug === nextCategorySlug) || null;

    const nextBrands = nextCategory?.brands || [];
    const nextBrand =
      nextBrands.find((b) => b.key === DEFAULT_BRAND_KEY) ||
      nextBrands[0] ||
      null;

    setBrandKey(nextBrand?.key || '');
  }

  function handleBrandChange(nextBrandKey) {
    setBrandKey(nextBrandKey);
    setOpenSlug(null);
    setRowsByModel({});
    setError('');
    setStatus('');
  }

  const headingLeft = selectedCategory?.label || 'Pricelist';
  const headingRight = selectedBrand?.label || brandKey || '';

  return (
    <div className={s.wrap}>
      <h1 className={s.h1}>
        Pricelist · {headingLeft}
        {headingRight ? ` · ${headingRight}` : ''}
      </h1>

      <div className={s.toolbar}>
        <select
          className={s.select}
          value={selectedCategory?.slug || ''}
          onChange={(e) => handleCategoryChange(e.target.value)}
          aria-label="Device type"
          disabled={bootLoading || categories.length === 0}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.label}
            </option>
          ))}
        </select>

        <select
          className={s.select}
          value={brandKey}
          onChange={(e) => handleBrandChange(e.target.value)}
          aria-label="Brand"
          disabled={bootLoading || brandOptions.length === 0}
        >
          {brandOptions.map((brand) => (
            <option key={brand.key} value={brand.key}>
              {brand.label}
            </option>
          ))}
        </select>
      </div>

      {error && <div className={s.error}>{error}</div>}
      {status && <div className={s.status}>{status}</div>}
      {bootLoading && <div className={s.status}>Loading Firebase data…</div>}

      {!bootLoading && grouped.length === 0 ? (
        <div className={s.empty}>No models found for this filter.</div>
      ) : (
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
                                  value={String(r.priceInput ?? '')}
                                  disabled={r.hidden === true}
                                  onChange={(e) =>
                                    updateRow(d.slug, idx, {
                                      priceInput: normalizePriceInput(
                                        e.target.value
                                      ),
                                    })
                                  }
                                  placeholder={r.label || 'price'}
                                  title={r.label || r.serviceId}
                                />

                                <label className={s.hideToggle}>
                                  <input
                                    type="checkbox"
                                    checked={r.hidden ? false : r.isStartingFrom === true}
                                    disabled={r.hidden === true}
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
                                    onChange={(e) =>
                                      updateRow(d.slug, idx, {
                                        hidden: e.target.checked,
                                        ...(e.target.checked
                                          ? { isStartingFrom: false }
                                          : {}),
                                      })
                                    }
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
      )}
    </div>
  );
}