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
import {
  createDeviceContentTemplate,
  fillEmptyDeviceContent,
} from './templates';
import s from './DevicesScreen.module.scss';

const LOCALES = ['lv', 'ru'];
const NO_SERIES_KEY = '__no_series__';

function makeLocalId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `tmp-${crypto.randomUUID()}`;
  }

  return `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function emptyLocalized() {
  return { lv: '', ru: '' };
}

function emptyDevice(preset = {}) {
  return {
    slug: '',
    type: 'device',
    categoryKey: preset.categoryKey || '',
    brandKey: preset.brandKey || '',
    seriesKey: preset.seriesKey || '',
    name: '',
    year: '',
    image: '',
    order:
      typeof preset.order === 'number' && Number.isFinite(preset.order)
        ? preset.order
        : 999,
    h1: emptyLocalized(),
    metaTitle: emptyLocalized(),
    metaDescription: emptyLocalized(),
    bodyHtml: emptyLocalized(),
    __originalSlug: '',
    __localId: makeLocalId(),
  };
}

function normalizeLocalized(value) {
  if (typeof value === 'string') {
    return { lv: value, ru: '' };
  }

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
  };
}

function normalizeBrand(brand = {}) {
  return {
    key: typeof brand.key === 'string' ? brand.key : '',
    labels: normalizeLocalized(brand.labels),
    order:
      typeof brand.order === 'number' && Number.isFinite(brand.order)
        ? brand.order
        : 999,
    series: Array.isArray(brand.series) ? brand.series.map(normalizeSeries) : [],
  };
}

function normalizeCategory(category = {}) {
  return {
    slug: typeof category.slug === 'string' ? category.slug : '',
    labels: normalizeLocalized(category.labels),
    order:
      typeof category.order === 'number' && Number.isFinite(category.order)
        ? category.order
        : 999,
    brands: Array.isArray(category.brands) ? category.brands.map(normalizeBrand) : [],
  };
}

function normalizeDevice(item = {}) {
  const slug = typeof item.slug === 'string' ? item.slug : '';

  return {
    slug,
    type: typeof item.type === 'string' ? item.type : 'device',
    categoryKey: typeof item.categoryKey === 'string' ? item.categoryKey : '',
    brandKey: typeof item.brandKey === 'string' ? item.brandKey : '',
    seriesKey: typeof item.seriesKey === 'string' ? item.seriesKey : '',
    name: typeof item.name === 'string' ? item.name : '',
    year:
      typeof item.year === 'number' && Number.isFinite(item.year)
        ? item.year
        : '',
    image: typeof item.image === 'string' ? item.image : '',
    order:
      typeof item.order === 'number' && Number.isFinite(item.order)
        ? item.order
        : 999,
    h1: normalizeLocalized(item.h1),
    metaTitle: normalizeLocalized(item.metaTitle),
    metaDescription: normalizeLocalized(item.metaDescription),
    bodyHtml: normalizeLocalized(item.bodyHtml),
    __originalSlug: slug,
    __localId: makeLocalId(),
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

  return <div ref={setNodeRef} style={style}>{children({ attributes, listeners })}</div>;
}

function sortByLabel(a, b) {
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

function deviceMatchesQuery(item, q) {
  if (!q) return true;

  return [
    item.slug,
    item.name,
    item.categoryKey,
    item.brandKey,
    item.seriesKey,
    item.h1?.lv,
    item.h1?.ru,
    item.metaTitle?.lv,
    item.metaTitle?.ru,
    item.metaDescription?.lv,
    item.metaDescription?.ru,
  ]
    .join(' ')
    .toLowerCase()
    .includes(q);
}

function getSeriesDisplayName(series, activeLocale) {
  if (series.isFallbackNoSeries) return 'No series';
  return series.labels?.[activeLocale] || series.key || 'Series';
}

export default function DevicesScreen() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeLocale, setActiveLocale] = useState('lv');
  const [openDeviceKey, setOpenDeviceKey] = useState(null);
  const [openContents, setOpenContents] = useState({});
  const [openCategories, setOpenCategories] = useState({});
  const [openBrands, setOpenBrands] = useState({});
  const [openSeries, setOpenSeries] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [deleting, setDeleting] = useState({});
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      setStatus('');

      try {
        const [categoriesRes, devicesRes] = await Promise.all([
          fetch('/api/admin/categories', { cache: 'no-store' }),
          fetch('/api/admin/devices', { cache: 'no-store' }),
        ]);

        if (!categoriesRes.ok) throw new Error('Failed to load categories');
        if (!devicesRes.ok) throw new Error('Failed to load devices');

        const [categoriesJson, devicesJson] = await Promise.all([
          categoriesRes.json(),
          devicesRes.json(),
        ]);

        if (cancelled) return;

        setCategories(
          Array.isArray(categoriesJson?.items)
            ? categoriesJson.items.map(normalizeCategory)
            : []
        );

        setItems(
          Array.isArray(devicesJson?.items)
            ? devicesJson.items.map(normalizeDevice)
            : []
        );
      } catch (err) {
        console.error(err);
        if (!cancelled) setError('Failed to load admin data.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function getStableDeviceKey(item) {
    return item.__originalSlug || item.__localId;
  }

  function getDeviceViewKey(item) {
    return getStableDeviceKey(item);
  }

  function getContentsKey(item) {
    return `${getStableDeviceKey(item)}::contents`;
  }

  function updateItem(idx, patch) {
    setItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], ...patch };
      return next;
    });
  }

  function updateLocalizedField(idx, field, locale, value) {
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

  function prefillDeviceContents(idx) {
    setItems((prev) => {
      const item = prev[idx];

      if (!item || item.__originalSlug || !String(item.name || '').trim()) {
        return prev;
      }

      const category = categories.find(
        (entry) => entry.slug === item.categoryKey
      );
      const brand = category?.brands?.find(
        (entry) => entry.key === item.brandKey
      );
      const template = createDeviceContentTemplate({
        deviceName: item.name,
        category,
        brand,
      });

      if (!template) return prev;

      const filledItem = fillEmptyDeviceContent(item, template.content);
      const next = [...prev];
      next[idx] = filledItem;
      return next;
    });
  }

  function toggleContents(key) {
    setOpenContents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function toggleMapState(setter, key) {
    setter((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function getNextOrderForBranch(categoryKey, brandKey, seriesKey) {
    const sameBranch = items.filter((item) => {
      const itemSeriesKey = item.seriesKey || '';
      return (
        item.categoryKey === categoryKey &&
        item.brandKey === brandKey &&
        itemSeriesKey === (seriesKey || '')
      );
    });

    if (sameBranch.length === 0) return 0;

    const maxOrder = sameBranch.reduce((max, item) => {
      const current = typeof item.order === 'number' ? item.order : 0;
      return current > max ? current : max;
    }, 0);

    return maxOrder + 10;
  }

  function addDevice(preset = {}) {
    const next = emptyDevice({
      ...preset,
      type: 'device',
      order: getNextOrderForBranch(
        preset.categoryKey || '',
        preset.brandKey || '',
        preset.seriesKey || ''
      ),
    });

    setItems((prev) => [next, ...prev]);
    setOpenDeviceKey(next.__localId);
  }

  function getDeviceDndId(item) {
    return `device-${getStableDeviceKey(item)}`;
  }

  function handleDeviceDragEnd(devices, event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = devices.findIndex(({ item }) => getDeviceDndId(item) === active.id);
    const newIndex = devices.findIndex(({ item }) => getDeviceDndId(item) === over.id);

    if (oldIndex < 0 || newIndex < 0) return;

    const reordered = arrayMove(devices, oldIndex, newIndex);

    setItems((prev) => {
      const next = [...prev];

      reordered.forEach((entry, index) => {
        next[entry.originalIdx] = {
          ...next[entry.originalIdx],
          order: index * 10,
        };
      });

      return next;
    });
  }

  async function saveDevice(item, idx) {
    const slug = String(item.slug || '').trim();
    if (!slug) {
      setError('Device slug is required.');
      return;
    }

    setError('');
    setStatus('');

    const saveKey = getStableDeviceKey(item);
    setSaving((prev) => ({ ...prev, [saveKey]: true }));

    try {
      const payload = {
        item: {
          slug,
          type: 'device',
          categoryKey: item.categoryKey,
          brandKey: item.brandKey,
          seriesKey: item.seriesKey,
          name: item.name,
          year: item.year === '' ? null : item.year,
          image: item.image,
          order: typeof item.order === 'number' ? item.order : 999,
          h1: item.h1,
          metaTitle: item.metaTitle,
          metaDescription: item.metaDescription,
          bodyHtml: item.bodyHtml,
        },
        originalSlug: item.__originalSlug || '',
      };

      const res = await fetch('/api/admin/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.error || 'Failed to save device');
      }

      const savedSlug = json?.id || slug;

      setItems((prev) => {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          slug: savedSlug,
          type: 'device',
          __originalSlug: savedSlug,
        };
        return next;
      });

      setOpenDeviceKey(savedSlug);
      setStatus(`Saved: ${savedSlug}`);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save device.');
    } finally {
      setSaving((prev) => ({ ...prev, [saveKey]: false }));
    }
  }

  async function deleteDevice(item, idx) {
    const label = item.name || item.slug || 'this device';
    const confirmed =
      typeof window === 'undefined'
        ? true
        : window.confirm(`Delete ${label}?`);

    if (!confirmed) return;

    setError('');
    setStatus('');

    const deleteKey = getStableDeviceKey(item);
    setDeleting((prev) => ({ ...prev, [deleteKey]: true }));

    try {
      const persistedSlug = String(item.__originalSlug || item.slug || '').trim();

      if (persistedSlug) {
        const res = await fetch(
          `/api/admin/devices?slug=${encodeURIComponent(persistedSlug)}`,
          { method: 'DELETE' }
        );

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(json?.error || 'Failed to delete device');
        }
      }

      setItems((prev) => prev.filter((_, i) => i !== idx));

      if (openDeviceKey === getStableDeviceKey(item)) {
        setOpenDeviceKey(null);
      }

      setStatus(`Deleted: ${label}`);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to delete device.');
    } finally {
      setDeleting((prev) => ({ ...prev, [deleteKey]: false }));
    }
  }

  const indexedItems = useMemo(() => {
    return items.map((item, originalIdx) => ({ item, originalIdx }));
  }, [items]);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const categoryMap = new Map();

    for (const category of categories) {
      const categoryKey = category.slug || 'uncategorized';
      const brandMap = new Map();

      for (const brand of category.brands || []) {
        const brandKey = brand.key || 'unbranded';
        const seriesMap = new Map();

        if (Array.isArray(brand.series) && brand.series.length > 0) {
          for (const series of brand.series) {
            seriesMap.set(series.key || NO_SERIES_KEY, {
              key: series.key || NO_SERIES_KEY,
              labels: series.labels || emptyLocalized(),
              order:
                typeof series.order === 'number' && Number.isFinite(series.order)
                  ? series.order
                  : 999,
              devices: [],
              isFallbackNoSeries: false,
            });
          }
        } else {
          seriesMap.set(NO_SERIES_KEY, {
            key: NO_SERIES_KEY,
            labels: emptyLocalized(),
            order: 999,
            devices: [],
            isFallbackNoSeries: true,
          });
        }

        brandMap.set(brandKey, {
          key: brandKey,
          labels: brand.labels || emptyLocalized(),
          order:
            typeof brand.order === 'number' && Number.isFinite(brand.order)
              ? brand.order
              : 999,
          series: seriesMap,
        });
      }

      categoryMap.set(categoryKey, {
        key: categoryKey,
        labels: category.labels || emptyLocalized(),
        order:
          typeof category.order === 'number' && Number.isFinite(category.order)
            ? category.order
            : 999,
        brands: brandMap,
      });
    }

    for (const entry of indexedItems) {
      const { item } = entry;
      if (!deviceMatchesQuery(item, q)) continue;

      const categoryKey = item.categoryKey || 'uncategorized';
      const brandKey = item.brandKey || 'unbranded';
      const rawSeriesKey = item.seriesKey || NO_SERIES_KEY;

      if (!categoryMap.has(categoryKey)) {
        categoryMap.set(categoryKey, {
          key: categoryKey,
          labels: emptyLocalized(),
          order: 999,
          brands: new Map(),
        });
      }

      const categoryGroup = categoryMap.get(categoryKey);

      if (!categoryGroup.brands.has(brandKey)) {
        categoryGroup.brands.set(brandKey, {
          key: brandKey,
          labels: emptyLocalized(),
          order: 999,
          series: new Map([
            [
              NO_SERIES_KEY,
              {
                key: NO_SERIES_KEY,
                labels: emptyLocalized(),
                order: 999,
                devices: [],
                isFallbackNoSeries: true,
              },
            ],
          ]),
        });
      }

      const brandGroup = categoryGroup.brands.get(brandKey);
      const seriesKey =
        brandGroup.series.has(rawSeriesKey) ? rawSeriesKey : rawSeriesKey || NO_SERIES_KEY;

      if (!brandGroup.series.has(seriesKey)) {
        brandGroup.series.set(seriesKey, {
          key: seriesKey,
          labels: emptyLocalized(),
          order: 999,
          devices: [],
          isFallbackNoSeries: false,
        });
      }

      brandGroup.series.get(seriesKey).devices.push(entry);
    }

    return Array.from(categoryMap.values())
      .sort((a, b) => {
        if ((a.order ?? 999) !== (b.order ?? 999)) return (a.order ?? 999) - (b.order ?? 999);
        return sortByLabel(a.key, b.key);
      })
      .map((categoryGroup) => ({
        ...categoryGroup,
        brands: Array.from(categoryGroup.brands.values())
          .sort((a, b) => {
            if ((a.order ?? 999) !== (b.order ?? 999)) return (a.order ?? 999) - (b.order ?? 999);
            return sortByLabel(a.key, b.key);
          })
          .map((brandGroup) => ({
            ...brandGroup,
            series: Array.from(brandGroup.series.values())
              .sort((a, b) => {
                if ((a.order ?? 999) !== (b.order ?? 999)) return (a.order ?? 999) - (b.order ?? 999);
                return sortByLabel(a.key, b.key);
              })
              .map((seriesGroup) => ({
                ...seriesGroup,
                devices: [...seriesGroup.devices].sort((a, b) => {
                  const ao = a.item.order ?? 999;
                  const bo = b.item.order ?? 999;
                  if (ao !== bo) return ao - bo;
                  return sortByLabel(a.item.name || a.item.slug, b.item.name || b.item.slug);
                }),
              })),
          })),
      }))
      .filter((categoryGroup) => {
        if (!q) return true;
        return categoryGroup.brands.some((brand) =>
          brand.series.some((series) => series.devices.length > 0)
        );
      });
  }, [categories, indexedItems, query]);

  const forceOpenFromSearch = query.trim().length > 0;

  return (
    <div className={s.wrap}>
      <div className={s.topbar}>
        <h1 className={s.h1}>Devices · {activeLocale.toUpperCase()}</h1>

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

      <div className={s.toolbar}>
        <input
          className={s.search}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search slug, model, brand, series…"
        />
      </div>

      {error && <div className={s.error}>{error}</div>}
      {status && <div className={s.status}>{status}</div>}

      {loading ? (
        <div className={s.empty}>Loading…</div>
      ) : grouped.length === 0 ? (
        <div className={s.empty}>No devices found.</div>
      ) : (
        <div className={s.groups}>
          {grouped.map((categoryGroup) => {
            const categoryToggleKey = `category::${categoryGroup.key}`;
            const categoryOpen = forceOpenFromSearch
              ? true
              : Boolean(openCategories[categoryToggleKey]);

            return (
              <section key={categoryToggleKey} className={s.group}>
                <button
                  type="button"
                  className={s.modelToggle}
                  onClick={() => toggleMapState(setOpenCategories, categoryToggleKey)}
                >
                  <span className={s.modelName}>
                    {categoryGroup.labels?.[activeLocale] || categoryGroup.key}
                  </span>
                  <span className={s.modelChevron}>{categoryOpen ? '▾' : '▸'}</span>
                </button>

                {categoryOpen && (
                  <div className={s.panel}>
                    <div className={s.groupsNested}>
                      {categoryGroup.brands.map((brandGroup) => {
                        const brandToggleKey = `${categoryToggleKey}::brand::${brandGroup.key}`;
                        const brandOpen = forceOpenFromSearch
                          ? true
                          : Boolean(openBrands[brandToggleKey]);

                        return (
                          <section key={brandToggleKey} className={s.group}>
                            <button
                              type="button"
                              className={s.modelToggle}
                              onClick={() => toggleMapState(setOpenBrands, brandToggleKey)}
                            >
                              <span className={s.modelName}>
                                {brandGroup.labels?.[activeLocale] || brandGroup.key}
                              </span>
                              <span className={s.modelChevron}>{brandOpen ? '▾' : '▸'}</span>
                            </button>

                            {brandOpen && (
                              <div className={s.panel}>
                                <div className={s.groupsNested}>
                                  {brandGroup.series.map((seriesGroup) => {
                                    const seriesToggleKey = `${brandToggleKey}::series::${seriesGroup.key}`;
                                    const seriesOpen = forceOpenFromSearch
                                      ? true
                                      : Boolean(openSeries[seriesToggleKey]);

                                    const seriesKeyForDevice =
                                      seriesGroup.key === NO_SERIES_KEY ? '' : seriesGroup.key;

                                    const addPreset = {
                                      categoryKey: categoryGroup.key,
                                      brandKey: brandGroup.key,
                                      seriesKey: seriesKeyForDevice,
                                      type: 'device',
                                    };

                                    const deviceItems = seriesGroup.devices.map(({ item }) =>
                                      getDeviceDndId(item)
                                    );

                                    return (
                                      <section key={seriesToggleKey} className={s.group}>
                                        <button
                                          type="button"
                                          className={s.modelToggle}
                                          onClick={() =>
                                            toggleMapState(setOpenSeries, seriesToggleKey)
                                          }
                                        >
                                          <span className={s.modelName}>
                                            {getSeriesDisplayName(seriesGroup, activeLocale)}
                                          </span>
                                          <span className={s.modelChevron}>
                                            {seriesOpen ? '▾' : '▸'}
                                          </span>
                                        </button>

                                        {seriesOpen && (
                                          <div className={s.panel}>
                                            {seriesGroup.devices.length === 0 ? (
                                              <div className={s.reviewCard}>
                                                <div className={s.empty}>No devices yet.</div>
                                                <div className={s.panelFooter}>
                                                  <Button onClick={() => addDevice(addPreset)}>
                                                    Add device here
                                                  </Button>
                                                </div>
                                              </div>
                                            ) : (
                                              <>
                                                <DndContext
                                                  collisionDetection={closestCenter}
                                                  onDragEnd={(event) =>
                                                    handleDeviceDragEnd(seriesGroup.devices, event)
                                                  }
                                                >
                                                  <SortableContext
                                                    items={deviceItems}
                                                    strategy={verticalListSortingStrategy}
                                                  >
                                                    <div className={s.groupsNested}>
                                                      {seriesGroup.devices.map(
                                                        ({ item, originalIdx }) => {
                                                          const deviceKey = getDeviceViewKey(item);
                                                          const contentsKey = getContentsKey(item);
                                                          const isOpen = openDeviceKey === deviceKey;
                                                          const isContentsOpen = Boolean(
                                                            openContents[contentsKey]
                                                          );
                                                          const saveKey =
                                                            getStableDeviceKey(item);
                                                          const isBusy =
                                                            Boolean(saving[saveKey]) ||
                                                            Boolean(deleting[saveKey]);
                                                          const deviceDndId =
                                                            getDeviceDndId(item);

                                                          return (
                                                            <SortableItem
                                                              key={deviceDndId}
                                                              id={deviceDndId}
                                                            >
                                                              {({ attributes, listeners }) => (
                                                                <section
                                                                  className={s.reviewCard}
                                                                >
                                                                  <div className={s.inlineToggleRow}>
                                                                    <button
                                                                      type="button"
                                                                      onClick={() =>
                                                                        setOpenDeviceKey(
                                                                          isOpen
                                                                            ? null
                                                                            : deviceKey
                                                                        )
                                                                      }
                                                                      className={s.inlineToggleBtn}
                                                                    >
                                                                      <span className={s.modelName}>
                                                                        {item.name ||
                                                                          item.slug ||
                                                                          'New device'}{' '}
                                                                      
                                                                      </span>
                                                                      <span
                                                                        className={s.modelChevron}
                                                                      >
                                                                        {isOpen ? '▾' : '▸'}
                                                                      </span>
                                                                    </button>

                                                                    <button
                                                                      type="button"
                                                                      className={s.dragHandle}
                                                                      {...attributes}
                                                                      {...listeners}
                                                                      aria-label={`Drag device ${item.name || item.slug || originalIdx + 1}`}
                                                                      title="Drag to reorder"
                                                                    >
                                                                      ⋮⋮
                                                                    </button>
                                                                  </div>

                                                                  {isOpen && (
                                                                    <div className={s.panel}>
                                                                      <div className={s.formGrid}>
                                                                        <Field label="Slug">
                                                                          <input
                                                                            className={s.input}
                                                                            value={item.slug}
                                                                            onChange={(e) =>
                                                                              updateItem(
                                                                                originalIdx,
                                                                                {
                                                                                  slug: e.target.value,
                                                                                }
                                                                              )
                                                                            }
                                                                            placeholder="slug"
                                                                          />
                                                                        </Field>

                                                                        <Field label="Name">
                                                                          <input
                                                                            className={s.input}
                                                                            value={item.name}
                                                                            onChange={(e) =>
                                                                              updateItem(
                                                                                originalIdx,
                                                                                {
                                                                                  name: e.target.value,
                                                                                }
                                                                              )
                                                                            }
                                                                            onBlur={() =>
                                                                              prefillDeviceContents(
                                                                                originalIdx
                                                                              )
                                                                            }
                                                                            placeholder="name"
                                                                          />
                                                                        </Field>

                                                                        <Field label="Year">
                                                                          <input
                                                                            className={s.input}
                                                                            type="number"
                                                                            value={item.year}
                                                                            onChange={(e) =>
                                                                              updateItem(
                                                                                originalIdx,
                                                                                {
                                                                                  year:
                                                                                    e.target
                                                                                      .value ===
                                                                                    ''
                                                                                      ? ''
                                                                                      : Number(
                                                                                          e
                                                                                            .target
                                                                                            .value
                                                                                        ),
                                                                                }
                                                                              )
                                                                            }
                                                                            placeholder="year"
                                                                          />
                                                                        </Field>
                                                                      </div>

                                                                      <div className={s.formGrid}>
                                                                        <Field label="Image">
                                                                          <input
                                                                            className={s.input}
                                                                            value={item.image}
                                                                            onChange={(e) =>
                                                                              updateItem(
                                                                                originalIdx,
                                                                                {
                                                                                  image: e.target.value,
                                                                                }
                                                                              )
                                                                            }
                                                                            placeholder="image"
                                                                          />
                                                                        </Field>
                                                                      </div>

                                                                      <div className={s.reviewCard}>
                                                                        <button
                                                                          type="button"
                                                                          className={s.modelToggle}
                                                                          onClick={() =>
                                                                            toggleContents(
                                                                              contentsKey
                                                                            )
                                                                          }
                                                                        >
                                                                          <span
                                                                            className={s.modelName}
                                                                          >
                                                                            Contents
                                                                          </span>
                                                                          <span
                                                                            className={s.modelChevron}
                                                                          >
                                                                            {isContentsOpen
                                                                              ? '▾'
                                                                              : '▸'}
                                                                          </span>
                                                                        </button>

                                                                        {isContentsOpen && (
                                                                          <div className={s.panel}>
                                                                            <div
                                                                              className={s.formGrid}
                                                                            >
                                                                              <Field
                                                                                label={`H1 (${activeLocale.toUpperCase()})`}
                                                                              >
                                                                                <input
                                                                                  className={s.input}
                                                                                  value={
                                                                                    item.h1[
                                                                                      activeLocale
                                                                                    ]
                                                                                  }
                                                                                  onChange={(e) =>
                                                                                    updateLocalizedField(
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

                                                                            <Field
                                                                              label={`Meta title (${activeLocale.toUpperCase()})`}
                                                                            >
                                                                              <textarea
                                                                                className={s.textarea}
                                                                                rows={4}
                                                                                value={
                                                                                  item.metaTitle[
                                                                                    activeLocale
                                                                                  ]
                                                                                }
                                                                                onChange={(e) =>
                                                                                  updateLocalizedField(
                                                                                    originalIdx,
                                                                                    'metaTitle',
                                                                                    activeLocale,
                                                                                    e.target.value
                                                                                  )
                                                                                }
                                                                                placeholder={`metaTitle (${activeLocale})`}
                                                                              />
                                                                            </Field>

                                                                            <Field
                                                                              label={`Meta description (${activeLocale.toUpperCase()})`}
                                                                            >
                                                                              <textarea
                                                                                className={s.textarea}
                                                                                rows={4}
                                                                                value={
                                                                                  item.metaDescription[
                                                                                    activeLocale
                                                                                  ]
                                                                                }
                                                                                onChange={(e) =>
                                                                                  updateLocalizedField(
                                                                                    originalIdx,
                                                                                    'metaDescription',
                                                                                    activeLocale,
                                                                                    e.target.value
                                                                                  )
                                                                                }
                                                                                placeholder={`metaDescription (${activeLocale})`}
                                                                              />
                                                                            </Field>

                                                                            <Field
                                                                              label={`Body HTML (${activeLocale.toUpperCase()})`}
                                                                            >
                                                                              <textarea
                                                                                className={s.textarea}
                                                                                rows={6}
                                                                                value={
                                                                                  item.bodyHtml[
                                                                                    activeLocale
                                                                                  ]
                                                                                }
                                                                                onChange={(e) =>
                                                                                  updateLocalizedField(
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

                                                                      <div className={s.panelFooter}>
                                                                        <Button
                                                                          onClick={() =>
                                                                            saveDevice(
                                                                              item,
                                                                              originalIdx
                                                                            )
                                                                          }
                                                                          disabled={isBusy}
                                                                        >
                                                                          {saving[saveKey]
                                                                            ? 'Saving…'
                                                                            : 'Save device'}
                                                                        </Button>

                                                                        <button
                                                                          type="button"
                                                                          className={
                                                                            s.smallBtnDanger
                                                                          }
                                                                          onClick={() =>
                                                                            deleteDevice(
                                                                              item,
                                                                              originalIdx
                                                                            )
                                                                          }
                                                                          disabled={isBusy}
                                                                        >
                                                                          {deleting[saveKey]
                                                                            ? 'Deleting…'
                                                                            : 'Delete device'}
                                                                        </button>
                                                                      </div>
                                                                    </div>
                                                                  )}
                                                                </section>
                                                              )}
                                                            </SortableItem>
                                                          );
                                                        }
                                                      )}
                                                    </div>
                                                  </SortableContext>
                                                </DndContext>

                                                <div className={s.panelFooter}>
                                                  <Button onClick={() => addDevice(addPreset)}>
                                                    Add device here
                                                  </Button>
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        )}
                                      </section>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </section>
                        );
                      })}
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