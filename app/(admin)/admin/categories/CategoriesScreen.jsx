'use client';

import { useEffect, useMemo, useState } from 'react';
import Button from '@components/button/Button';
import s from './CategoriesScreen.module.scss';

const LOCALES = ['lv', 'ru'];

function emptySeries() {
  return {
    key: '',
    labels: { lv: '', ru: '' },
    order: 999,
  };
}

function emptyBrand() {
  return {
    key: '',
    labels: { lv: '', ru: '' },
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
    },
    series: [],
  };
}

function emptyCategory() {
  return {
    slug: '',
    type: 'category',
    order: 999,
    labels: { lv: '', ru: '' },
    image: '',
    h1: { lv: '', ru: '' },
    lead: { lv: '', ru: '' },
    bodyHtml: { lv: '', ru: '' },
    metaTitle: { lv: '', ru: '' },
    metaDescription: { lv: '', ru: '' },
    brands: [],
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
      brandPath: typeof brand?.route?.brandPath === 'string' ? brand.route.brandPath : '',
      dedicatedHubPath:
        typeof brand?.route?.dedicatedHubPath === 'string'
          ? brand.route.dedicatedHubPath
          : '',
      preferDedicatedHub: Boolean(brand?.route?.preferDedicatedHub),
    },
    page: {
      variant:
        typeof brand?.page?.variant === 'string' ? brand.page.variant : 'brand',
    },
    series: Array.isArray(brand.series) ? brand.series.map(normalizeSeries) : [],
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
  };
}

export default function CategoriesScreen() {
  const [items, setItems] = useState([]);
  const [activeLocale, setActiveLocale] = useState('lv');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [openCategory, setOpenCategory] = useState(null);

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
    return [...items].sort((a, b) => a.order - b.order);
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
    setItems((prev) => [...prev, emptyCategory()]);
  }

  function deleteCategory(idx) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  function moveCategory(idx, dir) {
    setItems((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  }

  function addBrand(categoryIdx) {
    setItems((prev) => {
      const next = [...prev];
      next[categoryIdx] = {
        ...next[categoryIdx],
        brands: [...next[categoryIdx].brands, emptyBrand()],
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

  function deleteBrand(categoryIdx, brandIdx) {
    setItems((prev) => {
      const next = [...prev];
      next[categoryIdx] = {
        ...next[categoryIdx],
        brands: next[categoryIdx].brands.filter((_, i) => i !== brandIdx),
      };
      return next;
    });
  }

  function addSeries(categoryIdx, brandIdx) {
    setItems((prev) => {
      const next = [...prev];
      const brands = [...next[categoryIdx].brands];
      brands[brandIdx] = {
        ...brands[brandIdx],
        series: [...brands[brandIdx].series, emptySeries()],
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
      brands[brandIdx] = {
        ...brands[brandIdx],
        series: brands[brandIdx].series.filter((_, i) => i !== seriesIdx),
      };
      next[categoryIdx] = { ...next[categoryIdx], brands };
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
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item }),
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
          {sortedItems.map((item, idx) => {
            const isOpen = openCategory === item.slug || openCategory === idx;
            const saveKey = item.slug || idx;

            return (
              <section key={item.slug || idx} className={s.group}>
                <button
                  type="button"
                  onClick={() => setOpenCategory(isOpen ? null : item.slug || idx)}
                  className={s.modelToggle}
                >
                  <span className={s.modelName}>
                    {item.slug || 'New category'} ({item.labels[activeLocale] || '—'})
                  </span>
                  <span className={s.modelChevron}>{isOpen ? '▾' : '▸'}</span>
                </button>

                {isOpen && (
                  <div className={s.panel}>
                    <div className={s.formGrid}>
                      <input
                        className={s.input}
                        value={item.slug}
                        onChange={(e) => updateCategory(idx, { slug: e.target.value })}
                        placeholder="slug"
                      />
                      <input
                        className={s.input}
                        type="number"
                        value={item.order}
                        onChange={(e) =>
                          updateCategory(idx, { order: Number(e.target.value || 999) })
                        }
                        placeholder="order"
                      />
                      <input
                        className={s.input}
                        value={item.image}
                        onChange={(e) => updateCategory(idx, { image: e.target.value })}
                        placeholder="image"
                      />
                    </div>

                    <div className={s.formGrid}>
                      <input
                        className={s.input}
                        value={item.labels[activeLocale]}
                        onChange={(e) =>
                          updateCategoryLocaleField(idx, 'labels', activeLocale, e.target.value)
                        }
                        placeholder={`label (${activeLocale})`}
                      />
                      <input
                        className={s.input}
                        value={item.h1[activeLocale]}
                        onChange={(e) =>
                          updateCategoryLocaleField(idx, 'h1', activeLocale, e.target.value)
                        }
                        placeholder={`h1 (${activeLocale})`}
                      />
                      <input
                        className={s.input}
                        value={item.lead[activeLocale]}
                        onChange={(e) =>
                          updateCategoryLocaleField(idx, 'lead', activeLocale, e.target.value)
                        }
                        placeholder={`lead (${activeLocale})`}
                      />
                    </div>

                    <textarea
                      className={s.textarea}
                      rows={4}
                      value={item.metaTitle[activeLocale]}
                      onChange={(e) =>
                        updateCategoryLocaleField(idx, 'metaTitle', activeLocale, e.target.value)
                      }
                      placeholder={`metaTitle (${activeLocale})`}
                    />

                    <textarea
                      className={s.textarea}
                      rows={4}
                      value={item.metaDescription[activeLocale]}
                      onChange={(e) =>
                        updateCategoryLocaleField(
                          idx,
                          'metaDescription',
                          activeLocale,
                          e.target.value
                        )
                      }
                      placeholder={`metaDescription (${activeLocale})`}
                    />

                    <textarea
                      className={s.textarea}
                      rows={6}
                      value={item.bodyHtml[activeLocale]}
                      onChange={(e) =>
                        updateCategoryLocaleField(idx, 'bodyHtml', activeLocale, e.target.value)
                      }
                      placeholder={`bodyHtml (${activeLocale})`}
                    />

                    <div className={s.subsectionTitle}>Brands</div>

                    {item.brands.map((brand, brandIdx) => (
                      <div key={`${brand.key || brandIdx}`} className={s.reviewCard}>
                        <div className={s.rowTop}>
                          <div className={s.rowTitle}>
                            {brand.key || 'New brand'}
                          </div>

                          <div className={s.rowActions}>
                            <button
                              type="button"
                              className={s.smallBtnDanger}
                              onClick={() => deleteBrand(idx, brandIdx)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        <div className={s.formGrid}>
                          <input
                            className={s.input}
                            value={brand.key}
                            onChange={(e) =>
                              updateBrand(idx, brandIdx, { key: e.target.value })
                            }
                            placeholder="brand key"
                          />
                          <input
                            className={s.input}
                            type="number"
                            value={brand.order}
                            onChange={(e) =>
                              updateBrand(idx, brandIdx, {
                                order: Number(e.target.value || 999),
                              })
                            }
                            placeholder="brand order"
                          />
                          <input
                            className={s.input}
                            value={brand.logo}
                            onChange={(e) =>
                              updateBrand(idx, brandIdx, { logo: e.target.value })
                            }
                            placeholder="logo"
                          />
                        </div>

                        <div className={s.formGrid}>
                          <input
                            className={s.input}
                            value={brand.image}
                            onChange={(e) =>
                              updateBrand(idx, brandIdx, { image: e.target.value })
                            }
                            placeholder="image"
                          />
                          <input
                            className={s.input}
                            value={brand.route.brandPath}
                            onChange={(e) =>
                              updateBrand(idx, brandIdx, {
                                route: { ...brand.route, brandPath: e.target.value },
                              })
                            }
                            placeholder="brandPath"
                          />
                          <input
                            className={s.input}
                            value={brand.route.dedicatedHubPath}
                            onChange={(e) =>
                              updateBrand(idx, brandIdx, {
                                route: {
                                  ...brand.route,
                                  dedicatedHubPath: e.target.value,
                                },
                              })
                            }
                            placeholder="dedicatedHubPath"
                          />
                        </div>

                        <div className={s.formGrid}>
                          <input
                            className={s.input}
                            value={brand.labels[activeLocale]}
                            onChange={(e) =>
                              updateBrandLocaleField(
                                idx,
                                brandIdx,
                                'labels',
                                activeLocale,
                                e.target.value
                              )
                            }
                            placeholder={`brand label (${activeLocale})`}
                          />
                          <input
                            className={s.input}
                            value={brand.page.variant}
                            onChange={(e) =>
                              updateBrand(idx, brandIdx, {
                                page: { ...brand.page, variant: e.target.value },
                              })
                            }
                            placeholder="page.variant"
                          />
                          <label className={s.check}>
                            <input
                              type="checkbox"
                              checked={brand.route.preferDedicatedHub}
                              onChange={(e) =>
                                updateBrand(idx, brandIdx, {
                                  route: {
                                    ...brand.route,
                                    preferDedicatedHub: e.target.checked,
                                  },
                                })
                              }
                            />
                            preferDedicatedHub
                          </label>
                        </div>

                        <div className={s.subsectionTitle}>Series</div>

                        {brand.series.map((series, seriesIdx) => (
                          <div key={`${series.key || seriesIdx}`} className={s.reviewCard}>
                            <div className={s.rowTop}>
                              <div className={s.rowTitle}>
                                {series.key || 'New series'}
                              </div>
                              <div className={s.rowActions}>
                                <button
                                  type="button"
                                  className={s.smallBtnDanger}
                                  onClick={() => deleteSeries(idx, brandIdx, seriesIdx)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            <div className={s.formGrid}>
                              <input
                                className={s.input}
                                value={series.key}
                                onChange={(e) =>
                                  updateSeries(idx, brandIdx, seriesIdx, {
                                    key: e.target.value,
                                  })
                                }
                                placeholder="series key"
                              />
                              <input
                                className={s.input}
                                type="number"
                                value={series.order}
                                onChange={(e) =>
                                  updateSeries(idx, brandIdx, seriesIdx, {
                                    order: Number(e.target.value || 999),
                                  })
                                }
                                placeholder="series order"
                              />
                              <input
                                className={s.input}
                                value={series.labels[activeLocale]}
                                onChange={(e) =>
                                  updateSeriesLocaleField(
                                    idx,
                                    brandIdx,
                                    seriesIdx,
                                    activeLocale,
                                    e.target.value
                                  )
                                }
                                placeholder={`series label (${activeLocale})`}
                              />
                            </div>
                          </div>
                        ))}

                        <div className={s.panelFooter}>
                          <Button onClick={() => addSeries(idx, brandIdx)}>
                            Add series
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className={s.panelFooter}>
                      <Button onClick={() => addBrand(idx)}>Add brand</Button>
                      <Button
                        onClick={() => moveCategory(idx, -1)}
                        disabled={idx === 0}
                      >
                        Up
                      </Button>
                      <Button
                        onClick={() => moveCategory(idx, 1)}
                        disabled={idx === items.length - 1}
                      >
                        Down
                      </Button>
                      <Button onClick={() => saveCategory(item, idx)}>
                        {saving[saveKey] ? 'Saving…' : 'Save category'}
                      </Button>
                      <Button onClick={() => deleteCategory(idx)}>Delete category</Button>
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