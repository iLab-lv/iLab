'use client';

import { useEffect, useMemo, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Button from '@components/button/Button';
import s from './CategoriesScreen.module.scss';

const LOCALES = ['lv', 'ru'];

function makeLocalId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `tmp-${crypto.randomUUID()}`;
  }

  return `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function emptyLocalized() {
  return { lv: '', ru: '' };
}

function emptySeries() {
  return {
    key: '',
    labels: emptyLocalized(),
    order: 999,
    __localId: makeLocalId(),
  };
}

function emptyBrand() {
  return {
    key: '',
    labels: emptyLocalized(),
    logo: '',
    image: '',
    order: 999,
    route: {
      brandPath: '',
      dedicatedHubPath: '',
      preferDedicatedHub: false,
    },
    page: {
      variant: 'brand',
      h1: emptyLocalized(),
      lead: emptyLocalized(),
      bodyHtml: emptyLocalized(),
      metaTitle: emptyLocalized(),
      metaDescription: emptyLocalized(),
      modelGrid: {
        heading: emptyLocalized(),
        intro: emptyLocalized(),
      },
      sections: {
        hasCustomGuide: false,
        hasFaq: false,
        hasProcess: false,
        hasReviews: false,
        hasWhy: false,
      },
    },
    series: [],
    __localId: makeLocalId(),
  };
}

function emptyCategory() {
  return {
    slug: '',
    type: 'category',
    order: 999,
    labels: emptyLocalized(),
    image: '',
    h1: emptyLocalized(),
    lead: emptyLocalized(),
    bodyHtml: emptyLocalized(),
    metaTitle: emptyLocalized(),
    metaDescription: emptyLocalized(),
    brands: [],
    __localId: makeLocalId(),
  };
}

function normalizeLocalized(value) {
  return {
    lv: typeof value?.lv === 'string' ? value.lv : '',
    ru: typeof value?.ru === 'string' ? value.ru : '',
  };
}

function normalizeSeries(series = {}) {
  return {
    key: typeof series.key === 'string' ? series.key : '',
    labels: normalizeLocalized(series.labels),
    order:
      typeof series.order === 'number' && Number.isFinite(series.order)
        ? series.order
        : 999,
    __localId:
      typeof series.__localId === 'string' && series.__localId
        ? series.__localId
        : makeLocalId(),
  };
}

function normalizeBrand(brand = {}) {
  return {
    key: typeof brand.key === 'string' ? brand.key : '',
    labels: normalizeLocalized(brand.labels),
    logo: typeof brand.logo === 'string' ? brand.logo : '',
    image: typeof brand.image === 'string' ? brand.image : '',
    order:
      typeof brand.order === 'number' && Number.isFinite(brand.order)
        ? brand.order
        : 999,
    route: {
      brandPath:
        typeof brand?.route?.brandPath === 'string' ? brand.route.brandPath : '',
      dedicatedHubPath:
        typeof brand?.route?.dedicatedHubPath === 'string'
          ? brand.route.dedicatedHubPath
          : '',
      preferDedicatedHub: Boolean(brand?.route?.preferDedicatedHub),
    },
    page: {
      variant:
        typeof brand?.page?.variant === 'string' ? brand.page.variant : 'brand',
      h1: normalizeLocalized(brand?.page?.h1),
      lead: normalizeLocalized(brand?.page?.lead),
      bodyHtml: normalizeLocalized(brand?.page?.bodyHtml),
      metaTitle: normalizeLocalized(brand?.page?.metaTitle),
      metaDescription: normalizeLocalized(brand?.page?.metaDescription),
      modelGrid: {
        heading: normalizeLocalized(brand?.page?.modelGrid?.heading),
        intro: normalizeLocalized(brand?.page?.modelGrid?.intro),
      },
      sections: {
        hasCustomGuide: Boolean(brand?.page?.sections?.hasCustomGuide),
        hasFaq: Boolean(brand?.page?.sections?.hasFaq),
        hasProcess: Boolean(brand?.page?.sections?.hasProcess),
        hasReviews: Boolean(brand?.page?.sections?.hasReviews),
        hasWhy: Boolean(brand?.page?.sections?.hasWhy),
      },
    },
    series: Array.isArray(brand.series) ? brand.series.map(normalizeSeries) : [],
    __localId:
      typeof brand.__localId === 'string' && brand.__localId
        ? brand.__localId
        : makeLocalId(),
  };
}

function normalizeCategory(category = {}) {
  return {
    slug: typeof category.slug === 'string' ? category.slug : '',
    type: typeof category.type === 'string' ? category.type : 'category',
    order:
      typeof category.order === 'number' && Number.isFinite(category.order)
        ? category.order
        : 999,
    labels: normalizeLocalized(category.labels),
    image: typeof category.image === 'string' ? category.image : '',
    h1: normalizeLocalized(category.h1),
    lead: normalizeLocalized(category.lead),
    bodyHtml: normalizeLocalized(category.bodyHtml),
    metaTitle: normalizeLocalized(category.metaTitle),
    metaDescription: normalizeLocalized(category.metaDescription),
    brands: Array.isArray(category.brands) ? category.brands.map(normalizeBrand) : [],
    __localId:
      typeof category.__localId === 'string' && category.__localId
        ? category.__localId
        : makeLocalId(),
  };
}

function stripLocalIdsFromSeries(series = {}) {
  return {
    key: series.key,
    labels: series.labels,
    order: series.order,
  };
}

function stripLocalIdsFromBrand(brand = {}) {
  return {
    key: brand.key,
    labels: brand.labels,
    logo: brand.logo,
    image: brand.image,
    order: brand.order,
    route: {
      brandPath: brand.route?.brandPath || '',
      dedicatedHubPath: brand.route?.dedicatedHubPath || '',
      preferDedicatedHub: Boolean(brand.route?.preferDedicatedHub),
    },
    page: {
      variant: brand.page?.variant || 'brand',
      h1: brand.page?.h1 || emptyLocalized(),
      lead: brand.page?.lead || emptyLocalized(),
      bodyHtml: brand.page?.bodyHtml || emptyLocalized(),
      metaTitle: brand.page?.metaTitle || emptyLocalized(),
      metaDescription: brand.page?.metaDescription || emptyLocalized(),
      modelGrid: {
        heading: brand.page?.modelGrid?.heading || emptyLocalized(),
        intro: brand.page?.modelGrid?.intro || emptyLocalized(),
      },
      sections: {
        hasCustomGuide: Boolean(brand.page?.sections?.hasCustomGuide),
        hasFaq: Boolean(brand.page?.sections?.hasFaq),
        hasProcess: Boolean(brand.page?.sections?.hasProcess),
        hasReviews: Boolean(brand.page?.sections?.hasReviews),
        hasWhy: Boolean(brand.page?.sections?.hasWhy),
      },
    },
    series: Array.isArray(brand.series)
      ? brand.series.map(stripLocalIdsFromSeries)
      : [],
  };
}

function stripLocalIdsFromCategory(category = {}) {
  return {
    slug: category.slug,
    type: category.type || 'category',
    order: category.order,
    labels: category.labels,
    image: category.image,
    h1: category.h1,
    lead: category.lead,
    bodyHtml: category.bodyHtml,
    metaTitle: category.metaTitle,
    metaDescription: category.metaDescription,
    brands: Array.isArray(category.brands)
      ? category.brands.map(stripLocalIdsFromBrand)
      : [],
  };
}

function Field({ label, children }) {
  return (
    <label className={s.field}>
      <span className={s.fieldLabel}>{label}</span>
      {children}
    </label>
  );
}

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ attributes, listeners })}
    </div>
  );
}

export default function CategoriesScreen() {
  const [items, setItems] = useState([]);
  const [activeLocale, setActiveLocale] = useState('lv');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [openCategory, setOpenCategory] = useState(null);
  const [openBrands, setOpenBrands] = useState({});
  const [openSeries, setOpenSeries] = useState({});
  const [openCategoryContents, setOpenCategoryContents] = useState({});
  const [openBrandContents, setOpenBrandContents] = useState({});

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      setStatus('');

      try {
        const res = await fetch('/api/admin/categories', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load categories');

        const json = await res.json();
        if (cancelled) return;

        setItems(Array.isArray(json?.items) ? json.items.map(normalizeCategory) : []);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError('Failed to load categories.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const sortedItems = useMemo(() => {
    return items
      .map((item, originalIdx) => ({ item, originalIdx }))
      .sort((a, b) => a.item.order - b.item.order);
  }, [items]);

  function updateCategory(idx, patch) {
    setItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], ...patch };
      return next;
    });
  }

  function updateCategoryLocaleField(idx, field, locale, value) {
    setItems((prev) => {
      const next = [...prev];
      next[idx] = {
        ...next[idx],
        [field]: {
          ...next[idx][field],
          [locale]: value,
        },
      };
      return next;
    });
  }

  function addCategory() {
    const nextCategory = {
      ...emptyCategory(),
      order: items.length * 10,
    };

    setItems((prev) => [...prev, nextCategory]);
    setOpenCategory(nextCategory.__localId);
  }

  function addBrand(categoryIdx) {
    setItems((prev) => {
      const next = [...prev];
      const newBrand = {
        ...emptyBrand(),
        order: next[categoryIdx].brands.length * 10,
      };

      next[categoryIdx] = {
        ...next[categoryIdx],
        brands: [...next[categoryIdx].brands, newBrand],
      };

      return next;
    });
  }

  function updateBrand(categoryIdx, brandIdx, patch) {
    setItems((prev) => {
      const next = [...prev];
      const brands = [...next[categoryIdx].brands];
      brands[brandIdx] = { ...brands[brandIdx], ...patch };
      next[categoryIdx] = { ...next[categoryIdx], brands };
      return next;
    });
  }

  function updateBrandLocaleField(categoryIdx, brandIdx, field, locale, value) {
    setItems((prev) => {
      const next = [...prev];
      const brands = [...next[categoryIdx].brands];
      brands[brandIdx] = {
        ...brands[brandIdx],
        [field]: {
          ...brands[brandIdx][field],
          [locale]: value,
        },
      };
      next[categoryIdx] = { ...next[categoryIdx], brands };
      return next;
    });
  }

  function updateBrandPageLocaleField(categoryIdx, brandIdx, field, locale, value) {
    setItems((prev) => {
      const next = [...prev];
      const brands = [...next[categoryIdx].brands];
      brands[brandIdx] = {
        ...brands[brandIdx],
        page: {
          ...brands[brandIdx].page,
          [field]: {
            ...brands[brandIdx].page?.[field],
            [locale]: value,
          },
        },
      };
      next[categoryIdx] = { ...next[categoryIdx], brands };
      return next;
    });
  }

  function deleteBrand(categoryIdx, brandIdx) {
    setItems((prev) => {
      const next = [...prev];
      const remainingBrands = next[categoryIdx].brands.filter((_, i) => i !== brandIdx);

      next[categoryIdx] = {
        ...next[categoryIdx],
        brands: remainingBrands.map((brand, i) => ({
          ...brand,
          order: i * 10,
        })),
      };

      return next;
    });
  }

  function addSeries(categoryIdx, brandIdx) {
    setItems((prev) => {
      const next = [...prev];
      const brands = [...next[categoryIdx].brands];
      const newSeries = {
        ...emptySeries(),
        order: brands[brandIdx].series.length * 10,
      };

      brands[brandIdx] = {
        ...brands[brandIdx],
        series: [...brands[brandIdx].series, newSeries],
      };

      next[categoryIdx] = { ...next[categoryIdx], brands };
      return next;
    });
  }

  function updateSeries(categoryIdx, brandIdx, seriesIdx, patch) {
    setItems((prev) => {
      const next = [...prev];
      const brands = [...next[categoryIdx].brands];
      const series = [...brands[brandIdx].series];
      series[seriesIdx] = { ...series[seriesIdx], ...patch };
      brands[brandIdx] = { ...brands[brandIdx], series };
      next[categoryIdx] = { ...next[categoryIdx], brands };
      return next;
    });
  }

  function updateSeriesLocaleField(categoryIdx, brandIdx, seriesIdx, locale, value) {
    setItems((prev) => {
      const next = [...prev];
      const brands = [...next[categoryIdx].brands];
      const series = [...brands[brandIdx].series];

      series[seriesIdx] = {
        ...series[seriesIdx],
        labels: {
          ...series[seriesIdx].labels,
          [locale]: value,
        },
      };

      brands[brandIdx] = { ...brands[brandIdx], series };
      next[categoryIdx] = { ...next[categoryIdx], brands };
      return next;
    });
  }

  function deleteSeries(categoryIdx, brandIdx, seriesIdx) {
    setItems((prev) => {
      const next = [...prev];
      const brands = [...next[categoryIdx].brands];
      const remainingSeries = brands[brandIdx].series.filter((_, i) => i !== seriesIdx);

      brands[brandIdx] = {
        ...brands[brandIdx],
        series: remainingSeries.map((series, i) => ({
          ...series,
          order: i * 10,
        })),
      };

      next[categoryIdx] = { ...next[categoryIdx], brands };
      return next;
    });
  }

  function getCategoryToggleKey(item) {
    return item.__localId;
  }

  function getBrandToggleKey(categoryItem, brand) {
    return `${getCategoryToggleKey(categoryItem)}::brand::${brand.__localId}`;
  }

  function getSeriesToggleKey(categoryItem, brand, series) {
    return `${getBrandToggleKey(categoryItem, brand)}::series::${series.__localId}`;
  }

  function getCategoryContentsKey(item) {
    return `${getCategoryToggleKey(item)}::contents`;
  }

  function getBrandContentsKey(categoryItem, brand) {
    return `${getBrandToggleKey(categoryItem, brand)}::contents`;
  }

  function getBrandDndId(categoryIdx, brand) {
    return `cat-${categoryIdx}-brand-${brand.__localId}`;
  }

  function getSeriesDndId(categoryIdx, brandIdx, series) {
    return `cat-${categoryIdx}-brand-${brandIdx}-series-${series.__localId}`;
  }

  function toggleBrand(key) {
    setOpenBrands((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function toggleSeries(key) {
    setOpenSeries((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function toggleCategoryContents(key) {
    setOpenCategoryContents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function toggleBrandContents(key) {
    setOpenBrandContents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function handleBrandDragEnd(categoryIdx, event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const next = [...prev];
      const brands = [...next[categoryIdx].brands];

      const oldIndex = brands.findIndex((brand) => {
        return getBrandDndId(categoryIdx, brand) === active.id;
      });

      const newIndex = brands.findIndex((brand) => {
        return getBrandDndId(categoryIdx, brand) === over.id;
      });

      if (oldIndex < 0 || newIndex < 0) return prev;

      const reordered = arrayMove(brands, oldIndex, newIndex).map((brand, index) => ({
        ...brand,
        order: index * 10,
      }));

      next[categoryIdx] = {
        ...next[categoryIdx],
        brands: reordered,
      };

      return next;
    });
  }

  function handleSeriesDragEnd(categoryIdx, brandIdx, event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const next = [...prev];
      const brands = [...next[categoryIdx].brands];
      const series = [...brands[brandIdx].series];

      const oldIndex = series.findIndex((item) => {
        return getSeriesDndId(categoryIdx, brandIdx, item) === active.id;
      });

      const newIndex = series.findIndex((item) => {
        return getSeriesDndId(categoryIdx, brandIdx, item) === over.id;
      });

      if (oldIndex < 0 || newIndex < 0) return prev;

      const reordered = arrayMove(series, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index * 10,
      }));

      brands[brandIdx] = {
        ...brands[brandIdx],
        series: reordered,
      };

      next[categoryIdx] = {
        ...next[categoryIdx],
        brands,
      };

      return next;
    });
  }

  async function saveCategory(item, idx) {
    if (!item.slug) {
      setError('Category slug is required.');
      return;
    }

    setError('');
    setStatus('');
    setSaving((prev) => ({ ...prev, [item.slug || idx]: true }));

    try {
      const payload = stripLocalIdsFromCategory(item);

      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: payload }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.error || 'Failed to save category');
      }

      setStatus(`Saved: ${item.slug}`);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save category.');
    } finally {
      setSaving((prev) => ({ ...prev, [item.slug || idx]: false }));
    }
  }

  return (
    <div className={s.wrap}>
      <div className={s.topbar}>
        <h1 className={s.h1}>Categories · {activeLocale.toUpperCase()}</h1>

        <div className={s.localeSwitch}>
          {LOCALES.map((locale) => (
            <button
              key={locale}
              type="button"
              className={`${s.localeBtn} ${activeLocale === locale ? s.localeBtnActive : ''}`}
              onClick={() => {
                setError('');
                setStatus('');
                setActiveLocale(locale);
              }}
            >
              {locale.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className={s.panelFooter}>
        <Button onClick={addCategory}>Add category</Button>
      </div>

      {error && <div className={s.error}>{error}</div>}
      {status && <div className={s.status}>{status}</div>}

      {loading ? (
        <div className={s.empty}>Loading…</div>
      ) : (
        <div className={s.groups}>
          {sortedItems.map(({ item, originalIdx }) => {
            const categoryToggleKey = getCategoryToggleKey(item);
            const categoryContentsKey = getCategoryContentsKey(item);
            const isOpen = openCategory === categoryToggleKey;
            const isCategoryContentsOpen = Boolean(openCategoryContents[categoryContentsKey]);
            const saveKey = item.slug || originalIdx;
            const brandItems = item.brands.map((brand) =>
              getBrandDndId(originalIdx, brand)
            );

            return (
              <section key={categoryToggleKey} className={s.group}>
                <button
                  type="button"
                  onClick={() => setOpenCategory(isOpen ? null : categoryToggleKey)}
                  className={s.modelToggle}
                >
                  <span className={s.modelName}>
                    {item.slug || 'New category'} ({item.labels[activeLocale] || '—'})
                  </span>
                  <span className={s.modelChevron}>{isOpen ? '▾' : '▸'}</span>
                </button>

                {isOpen && (
                  <div className={s.panel}>
                    <div className={s.reviewCard}>
                      <button
                        type="button"
                        className={s.modelToggle}
                        onClick={() => toggleCategoryContents(categoryContentsKey)}
                      >
                        <span className={s.modelName}>Contents</span>
                        <span className={s.modelChevron}>
                          {isCategoryContentsOpen ? '▾' : '▸'}
                        </span>
                      </button>

                      {isCategoryContentsOpen && (
                        <div className={s.panel}>
                          <div className={s.formGrid}>
                            <Field label="Slug">
                              <input
                                className={s.input}
                                value={item.slug}
                                onChange={(e) =>
                                  updateCategory(originalIdx, { slug: e.target.value })
                                }
                                placeholder="slug"
                              />
                            </Field>

                            <Field label="Image">
                              <input
                                className={s.input}
                                value={item.image}
                                onChange={(e) =>
                                  updateCategory(originalIdx, { image: e.target.value })
                                }
                                placeholder="image"
                              />
                            </Field>
                          </div>

                          <div className={s.formGrid}>
                            <Field label={`Label (${activeLocale.toUpperCase()})`}>
                              <input
                                className={s.input}
                                value={item.labels[activeLocale]}
                                onChange={(e) =>
                                  updateCategoryLocaleField(
                                    originalIdx,
                                    'labels',
                                    activeLocale,
                                    e.target.value
                                  )
                                }
                                placeholder={`label (${activeLocale})`}
                              />
                            </Field>

                            <Field label={`H1 (${activeLocale.toUpperCase()})`}>
                              <input
                                className={s.input}
                                value={item.h1[activeLocale]}
                                onChange={(e) =>
                                  updateCategoryLocaleField(
                                    originalIdx,
                                    'h1',
                                    activeLocale,
                                    e.target.value
                                  )
                                }
                                placeholder={`h1 (${activeLocale})`}
                              />
                            </Field>
                          </div>

                          <Field label={`Lead (${activeLocale.toUpperCase()})`}>
                            <textarea
                              className={s.textarea}
                              rows={3}
                              value={item.lead[activeLocale]}
                              onChange={(e) =>
                                updateCategoryLocaleField(
                                  originalIdx,
                                  'lead',
                                  activeLocale,
                                  e.target.value
                                )
                              }
                              placeholder={`lead (${activeLocale})`}
                            />
                          </Field>

                          <Field label={`Meta title (${activeLocale.toUpperCase()})`}>
                            <textarea
                              className={s.textarea}
                              rows={4}
                              value={item.metaTitle[activeLocale]}
                              onChange={(e) =>
                                updateCategoryLocaleField(
                                  originalIdx,
                                  'metaTitle',
                                  activeLocale,
                                  e.target.value
                                )
                              }
                              placeholder={`metaTitle (${activeLocale})`}
                            />
                          </Field>

                          <Field label={`Meta description (${activeLocale.toUpperCase()})`}>
                            <textarea
                              className={s.textarea}
                              rows={4}
                              value={item.metaDescription[activeLocale]}
                              onChange={(e) =>
                                updateCategoryLocaleField(
                                  originalIdx,
                                  'metaDescription',
                                  activeLocale,
                                  e.target.value
                                )
                              }
                              placeholder={`metaDescription (${activeLocale})`}
                            />
                          </Field>

                          <Field label={`Body HTML (${activeLocale.toUpperCase()})`}>
                            <textarea
                              className={s.textarea}
                              rows={6}
                              value={item.bodyHtml[activeLocale]}
                              onChange={(e) =>
                                updateCategoryLocaleField(
                                  originalIdx,
                                  'bodyHtml',
                                  activeLocale,
                                  e.target.value
                                )
                              }
                              placeholder={`bodyHtml (${activeLocale})`}
                            />
                          </Field>
                        </div>
                      )}
                    </div>

                    <div className={s.subsectionTitle}>Brands</div>

                    <DndContext
                      collisionDetection={closestCenter}
                      onDragEnd={(event) => handleBrandDragEnd(originalIdx, event)}
                    >
                      <SortableContext items={brandItems} strategy={verticalListSortingStrategy}>
                        {item.brands.map((brand, brandIdx) => {
                          const brandToggleKey = getBrandToggleKey(item, brand);
                          const brandContentsKey = getBrandContentsKey(item, brand);
                          const brandDndId = getBrandDndId(originalIdx, brand);
                          const isBrandOpen = Boolean(openBrands[brandToggleKey]);
                          const isBrandContentsOpen = Boolean(openBrandContents[brandContentsKey]);

                          return (
                            <SortableItem key={brandDndId} id={brandDndId}>
                              {({ attributes, listeners }) => (
                                <div className={s.reviewCard}>
                                  <div className={s.inlineToggleRow}>
                                    <button
                                      type="button"
                                      className={s.inlineToggleBtn}
                                      onClick={() => toggleBrand(brandToggleKey)}
                                    >
                                      <span className={s.modelName}>
                                        {brand.key || 'New brand'} ({brand.labels[activeLocale] || '—'})
                                      </span>
                                      <span className={s.modelChevron}>
                                        {isBrandOpen ? '▾' : '▸'}
                                      </span>
                                    </button>

                                    <button
                                      type="button"
                                      className={s.dragHandle}
                                      {...attributes}
                                      {...listeners}
                                      aria-label={`Drag brand ${brand.key || brandIdx + 1}`}
                                      title="Drag to reorder"
                                    >
                                      ⋮⋮
                                    </button>
                                  </div>

                                  {isBrandOpen && (
                                    <div className={s.panel}>
                                      <div className={s.reviewCard}>
                                        <button
                                          type="button"
                                          className={s.modelToggle}
                                          onClick={() => toggleBrandContents(brandContentsKey)}
                                        >
                                          <span className={s.modelName}>Contents</span>
                                          <span className={s.modelChevron}>
                                            {isBrandContentsOpen ? '▾' : '▸'}
                                          </span>
                                        </button>

                                        {isBrandContentsOpen && (
                                          <div className={s.panel}>
                                            <div className={s.rowTop}>
                                              <div className={s.rowTitle}>Brand contents</div>

                                              <div className={s.rowActions}>
                                                <button
                                                  type="button"
                                                  className={s.smallBtnDanger}
                                                  onClick={() => deleteBrand(originalIdx, brandIdx)}
                                                >
                                                  Delete
                                                </button>
                                              </div>
                                            </div>

                                            <div className={s.formGrid}>
                                              <Field label="Brand key">
                                                <input
                                                  className={s.input}
                                                  value={brand.key}
                                                  onChange={(e) =>
                                                    updateBrand(originalIdx, brandIdx, {
                                                      key: e.target.value,
                                                    })
                                                  }
                                                  placeholder="brand key"
                                                />
                                              </Field>

                                              <Field label="Logo">
                                                <input
                                                  className={s.input}
                                                  value={brand.logo}
                                                  onChange={(e) =>
                                                    updateBrand(originalIdx, brandIdx, {
                                                      logo: e.target.value,
                                                    })
                                                  }
                                                  placeholder="logo"
                                                />
                                              </Field>

                                              <Field label="Image">
                                                <input
                                                  className={s.input}
                                                  value={brand.image}
                                                  onChange={(e) =>
                                                    updateBrand(originalIdx, brandIdx, {
                                                      image: e.target.value,
                                                    })
                                                  }
                                                  placeholder="image"
                                                />
                                              </Field>
                                            </div>

                                            <Field label={`Brand label (${activeLocale.toUpperCase()})`}>
                                              <input
                                                className={s.input}
                                                value={brand.labels[activeLocale]}
                                                onChange={(e) =>
                                                  updateBrandLocaleField(
                                                    originalIdx,
                                                    brandIdx,
                                                    'labels',
                                                    activeLocale,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder={`brand label (${activeLocale})`}
                                              />
                                            </Field>

                                            <Field label={`Page H1 (${activeLocale.toUpperCase()})`}>
                                              <input
                                                className={s.input}
                                                value={brand.page.h1[activeLocale]}
                                                onChange={(e) =>
                                                  updateBrandPageLocaleField(
                                                    originalIdx,
                                                    brandIdx,
                                                    'h1',
                                                    activeLocale,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder={`page.h1 (${activeLocale})`}
                                              />
                                            </Field>

                                            <Field label={`Page lead (${activeLocale.toUpperCase()})`}>
                                              <textarea
                                                className={s.textarea}
                                                rows={3}
                                                value={brand.page.lead[activeLocale]}
                                                onChange={(e) =>
                                                  updateBrandPageLocaleField(
                                                    originalIdx,
                                                    brandIdx,
                                                    'lead',
                                                    activeLocale,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder={`page.lead (${activeLocale})`}
                                              />
                                            </Field>

                                            <Field label={`Page meta title (${activeLocale.toUpperCase()})`}>
                                              <textarea
                                                className={s.textarea}
                                                rows={4}
                                                value={brand.page.metaTitle[activeLocale]}
                                                onChange={(e) =>
                                                  updateBrandPageLocaleField(
                                                    originalIdx,
                                                    brandIdx,
                                                    'metaTitle',
                                                    activeLocale,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder={`page.metaTitle (${activeLocale})`}
                                              />
                                            </Field>

                                            <Field label={`Page meta description (${activeLocale.toUpperCase()})`}>
                                              <textarea
                                                className={s.textarea}
                                                rows={4}
                                                value={brand.page.metaDescription[activeLocale]}
                                                onChange={(e) =>
                                                  updateBrandPageLocaleField(
                                                    originalIdx,
                                                    brandIdx,
                                                    'metaDescription',
                                                    activeLocale,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder={`page.metaDescription (${activeLocale})`}
                                              />
                                            </Field>

                                            <Field label={`Page body HTML (${activeLocale.toUpperCase()})`}>
                                              <textarea
                                                className={s.textarea}
                                                rows={6}
                                                value={brand.page.bodyHtml[activeLocale]}
                                                onChange={(e) =>
                                                  updateBrandPageLocaleField(
                                                    originalIdx,
                                                    brandIdx,
                                                    'bodyHtml',
                                                    activeLocale,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder={`page.bodyHtml (${activeLocale})`}
                                              />
                                            </Field>
                                          </div>
                                        )}
                                      </div>

                                      <div className={s.subsectionTitle}>Series</div>

                                      <DndContext
                                        collisionDetection={closestCenter}
                                        onDragEnd={(event) =>
                                          handleSeriesDragEnd(originalIdx, brandIdx, event)
                                        }
                                      >
                                        <SortableContext
                                          items={brand.series.map((series) =>
                                            getSeriesDndId(
                                              originalIdx,
                                              brandIdx,
                                              series
                                            )
                                          )}
                                          strategy={verticalListSortingStrategy}
                                        >
                                          {brand.series.map((series, seriesIdx) => {
                                            const seriesToggleKey = getSeriesToggleKey(
                                              item,
                                              brand,
                                              series
                                            );
                                            const seriesDndId = getSeriesDndId(
                                              originalIdx,
                                              brandIdx,
                                              series
                                            );
                                            const isSeriesOpen = Boolean(openSeries[seriesToggleKey]);

                                            return (
                                              <SortableItem key={seriesDndId} id={seriesDndId}>
                                                {({ attributes, listeners }) => (
                                                  <div className={s.reviewCard}>
                                                    <div className={s.inlineToggleRow}>
                                                      <button
                                                        type="button"
                                                        className={s.inlineToggleBtn}
                                                        onClick={() =>
                                                          toggleSeries(seriesToggleKey)
                                                        }
                                                      >
                                                        <span className={s.modelName}>
                                                          {series.key || 'New series'} (
                                                          {series.labels[activeLocale] || '—'})
                                                        </span>
                                                        <span className={s.modelChevron}>
                                                          {isSeriesOpen ? '▾' : '▸'}
                                                        </span>
                                                      </button>

                                                      <button
                                                        type="button"
                                                        className={s.dragHandle}
                                                        {...attributes}
                                                        {...listeners}
                                                        aria-label={`Drag series ${series.key || seriesIdx + 1}`}
                                                        title="Drag to reorder"
                                                      >
                                                        ⋮⋮
                                                      </button>
                                                    </div>

                                                    {isSeriesOpen && (
                                                      <div className={s.panel}>
                                                        <div className={s.rowTop}>
                                                          <div className={s.rowTitle}>
                                                            Series details
                                                          </div>
                                                          <div className={s.rowActions}>
                                                            <button
                                                              type="button"
                                                              className={s.smallBtnDanger}
                                                              onClick={() =>
                                                                deleteSeries(
                                                                  originalIdx,
                                                                  brandIdx,
                                                                  seriesIdx
                                                                )
                                                              }
                                                            >
                                                              Delete
                                                            </button>
                                                          </div>
                                                        </div>

                                                        <div className={s.formGrid}>
                                                          <Field label="Series key">
                                                            <input
                                                              className={s.input}
                                                              value={series.key}
                                                              onChange={(e) =>
                                                                updateSeries(
                                                                  originalIdx,
                                                                  brandIdx,
                                                                  seriesIdx,
                                                                  { key: e.target.value }
                                                                )
                                                              }
                                                              placeholder="series key"
                                                            />
                                                          </Field>

                                                          <Field
                                                            label={`Series label (${activeLocale.toUpperCase()})`}
                                                          >
                                                            <input
                                                              className={s.input}
                                                              value={series.labels[activeLocale]}
                                                              onChange={(e) =>
                                                                updateSeriesLocaleField(
                                                                  originalIdx,
                                                                  brandIdx,
                                                                  seriesIdx,
                                                                  activeLocale,
                                                                  e.target.value
                                                                )
                                                              }
                                                              placeholder={`series label (${activeLocale})`}
                                                            />
                                                          </Field>
                                                        </div>
                                                      </div>
                                                    )}
                                                  </div>
                                                )}
                                              </SortableItem>
                                            );
                                          })}
                                        </SortableContext>
                                      </DndContext>

                                      <div className={s.panelFooter}>
                                        <Button onClick={() => addSeries(originalIdx, brandIdx)}>
                                          Add series
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </SortableItem>
                          );
                        })}
                      </SortableContext>
                    </DndContext>

                    <div className={s.panelFooter}>
                      <Button onClick={() => addBrand(originalIdx)}>Add brand</Button>
                      <Button onClick={() => saveCategory(item, originalIdx)}>
                        {saving[saveKey] ? 'Saving…' : 'Save category'}
                      </Button>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}