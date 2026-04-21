'use client';

import { useEffect, useMemo, useState } from 'react';
import Button from '@components/button/Button';
import s from './ReviewsScreen.module.scss';

const PLACE_KEYS = ['domina', 'spice'];
const LOCALES = ['lv', 'ru'];

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function normalizeReview(review = {}) {
  return {
    id: typeof review.id === 'string' ? review.id : '',
    author: typeof review.author === 'string' ? review.author : '',
    text: typeof review.text === 'string' ? review.text : '',
    date: typeof review.date === 'string' ? review.date : '',
    rating:
      typeof review.rating === 'number' && Number.isFinite(review.rating)
        ? review.rating
        : '',
  };
}

function normalizeFeaturedReviewsByLocale(place = {}) {
  const byLocale =
    place?.featuredReviewsByLocale &&
    typeof place.featuredReviewsByLocale === 'object'
      ? place.featuredReviewsByLocale
      : null;

  return {
    lv: Array.isArray(byLocale?.lv) ? byLocale.lv.map(normalizeReview) : [],
    ru: Array.isArray(byLocale?.ru) ? byLocale.ru.map(normalizeReview) : [],
  };
}

function formatFetchedAt(value) {
  if (!value) return '—';

  try {
    if (typeof value?.toDate === 'function') {
      return value.toDate().toLocaleString('lv-LV');
    }

    if (value instanceof Date) {
      return value.toLocaleString('lv-LV');
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const d = new Date(value);
      if (!Number.isNaN(d.getTime())) return d.toLocaleString('lv-LV');
    }
  } catch {}

  return '—';
}

function getEmptyPlace(key) {
  return {
    rating: null,
    count: null,
    fetchedAt: null,
    name: key,
    featuredReviewsByLocale: {
      lv: [],
      ru: [],
    },
  };
}

function getReviewList(place, locale) {
  const safeLocale = normalizeLocale(locale);
  return place?.featuredReviewsByLocale?.[safeLocale] || [];
}

export default function ReviewsScreen() {
  const [data, setData] = useState({});
  const [openKey, setOpenKey] = useState(null);
  const [activeLocale, setActiveLocale] = useState('lv');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      setStatus('');

      try {
        const res = await fetch('/api/reviews', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load reviews');

        const json = await res.json();
        if (cancelled) return;

        const nextData = {};

        for (const key of PLACE_KEYS) {
          const place = json?.[key];

          nextData[key] = place
            ? {
                ...getEmptyPlace(key),
                ...place,
                featuredReviewsByLocale: normalizeFeaturedReviewsByLocale(place),
              }
            : getEmptyPlace(key);
        }

        setData(nextData);
      } catch (err) {
        console.error('Failed to load reviews:', err);
        if (!cancelled) setError('Failed to load reviews.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const places = useMemo(() => {
    return PLACE_KEYS.map((key) => ({
      key,
      ...getEmptyPlace(key),
      ...data?.[key],
      label: data?.[key]?.name || key,
    }));
  }, [data]);

  function togglePlace(key) {
    setError('');
    setStatus('');
    setOpenKey((prev) => (prev === key ? null : key));
  }

  function updateReview(key, locale, idx, patch) {
    const safeLocale = normalizeLocale(locale);

    setData((prev) => {
      const place = prev[key] || getEmptyPlace(key);
      const byLocale = place.featuredReviewsByLocale || { lv: [], ru: [] };
      const list = [...(byLocale[safeLocale] || [])];

      list[idx] = { ...list[idx], ...patch };

      return {
        ...prev,
        [key]: {
          ...place,
          featuredReviewsByLocale: {
            ...byLocale,
            [safeLocale]: list,
          },
        },
      };
    });
  }

  function addReview(key, locale) {
    const safeLocale = normalizeLocale(locale);

    setData((prev) => {
      const place = prev[key] || getEmptyPlace(key);
      const byLocale = place.featuredReviewsByLocale || { lv: [], ru: [] };

      return {
        ...prev,
        [key]: {
          ...place,
          featuredReviewsByLocale: {
            ...byLocale,
            [safeLocale]: [
              ...(byLocale[safeLocale] || []),
              {
                id: '',
                author: '',
                text: '',
                date: '',
                rating: '',
              },
            ],
          },
        },
      };
    });
  }

  function deleteReview(key, locale, idx) {
    const safeLocale = normalizeLocale(locale);

    setData((prev) => {
      const place = prev[key] || getEmptyPlace(key);
      const byLocale = place.featuredReviewsByLocale || { lv: [], ru: [] };
      const list = [...(byLocale[safeLocale] || [])];

      list.splice(idx, 1);

      return {
        ...prev,
        [key]: {
          ...place,
          featuredReviewsByLocale: {
            ...byLocale,
            [safeLocale]: list,
          },
        },
      };
    });
  }

  function moveReview(key, locale, idx, dir) {
    const safeLocale = normalizeLocale(locale);

    setData((prev) => {
      const place = prev[key] || getEmptyPlace(key);
      const byLocale = place.featuredReviewsByLocale || { lv: [], ru: [] };
      const list = [...(byLocale[safeLocale] || [])];
      const nextIdx = idx + dir;

      if (nextIdx < 0 || nextIdx >= list.length) return prev;

      const temp = list[idx];
      list[idx] = list[nextIdx];
      list[nextIdx] = temp;

      return {
        ...prev,
        [key]: {
          ...place,
          featuredReviewsByLocale: {
            ...byLocale,
            [safeLocale]: list,
          },
        },
      };
    });
  }

  async function savePlace(key, locale) {
    const safeLocale = normalizeLocale(locale);

    setError('');
    setStatus('');
    setSaving((prev) => ({ ...prev, [`${key}:${safeLocale}`]: true }));

    try {
      const rawReviews = getReviewList(data?.[key], safeLocale);

      const featuredReviews = rawReviews.map((review) => {
        const normalized = normalizeReview(review);

        return {
          ...(normalized.id ? { id: normalized.id.trim() } : {}),
          author: normalized.author.trim(),
          text: normalized.text.trim(),
          ...(normalized.date ? { date: normalized.date.trim() } : {}),
          ...(normalized.rating !== '' ? { rating: Number(normalized.rating) } : {}),
        };
      });

      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key,
          locale: safeLocale,
          featuredReviews,
        }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.error || 'Failed to save reviews');
      }

      if (json?.saved) {
        setData((prev) => {
          const place = prev[key] || getEmptyPlace(key);

          return {
            ...prev,
            [key]: {
              ...place,
              featuredReviewsByLocale: normalizeFeaturedReviewsByLocale({
                featuredReviewsByLocale: json.saved,
              }),
            },
          };
        });
      }

      setStatus(`Saved: ${key} (${safeLocale.toUpperCase()})`);
    } catch (err) {
      console.error('Failed to save reviews:', err);
      setError(err.message || 'Failed to save reviews.');
    } finally {
      setSaving((prev) => ({ ...prev, [`${key}:${safeLocale}`]: false }));
    }
  }

  return (
    <div className={s.wrap}>
      <div className={s.topbar}>
        <h1 className={s.h1}>Reviews · {activeLocale.toUpperCase()}</h1>

        <div className={s.localeSwitch}>
          {LOCALES.map((locale) => (
            <button
              key={locale}
              type="button"
              className={`${s.localeBtn} ${
                activeLocale === locale ? s.localeBtnActive : ''
              }`}
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

      {error && <div className={s.error}>{error}</div>}
      {status && <div className={s.status}>{status}</div>}

      {loading ? (
        <div className={s.empty}>Loading…</div>
      ) : (
        <div className={s.groups}>
          {places.map((place) => {
            const isOpen = openKey === place.key;
            const isSaving = !!saving[`${place.key}:${activeLocale}`];
            const reviews = getReviewList(place, activeLocale);

            return (
              <section key={place.key} className={s.group}>
                <button
                  type="button"
                  onClick={() => togglePlace(place.key)}
                  className={s.modelToggle}
                >
                  <span className={s.modelName}>{place.label}</span>
                  <span className={s.modelChevron}>{isOpen ? '▾' : '▸'}</span>
                </button>

                {isOpen && (
                  <div className={s.panel}>
                    <div className={s.meta}>
                      <div className={s.metaItem}>
                        <span className={s.metaLabel}>Rating</span>
                        <span className={s.metaValue}>
                          {place.rating != null ? place.rating : '—'}
                        </span>
                      </div>

                      <div className={s.metaItem}>
                        <span className={s.metaLabel}>Count</span>
                        <span className={s.metaValue}>
                          {place.count != null ? place.count : '—'}
                        </span>
                      </div>

                      <div className={s.metaItem}>
                        <span className={s.metaLabel}>Fetched</span>
                        <span className={s.metaValue}>
                          {formatFetchedAt(place.fetchedAt)}
                        </span>
                      </div>
                    </div>

                    {reviews.length === 0 ? (
                      <div className={s.empty}>
                        No featured reviews yet for this place and language.
                      </div>
                    ) : (
                      <div className={s.rows}>
                        {reviews.map((review, idx) => (
                          <div
                            key={review.id || `${place.key}-${activeLocale}-${idx}`}
                            className={s.reviewCard}
                          >
                            <div className={s.rowTop}>
                              <div className={s.rowTitle}>Review #{idx + 1}</div>

                              <div className={s.rowActions}>
                                <button
                                  type="button"
                                  className={s.smallBtn}
                                  onClick={() =>
                                    moveReview(place.key, activeLocale, idx, -1)
                                  }
                                  disabled={idx === 0 || isSaving}
                                >
                                  ↑
                                </button>

                                <button
                                  type="button"
                                  className={s.smallBtn}
                                  onClick={() =>
                                    moveReview(place.key, activeLocale, idx, 1)
                                  }
                                  disabled={idx === reviews.length - 1 || isSaving}
                                >
                                  ↓
                                </button>

                                <button
                                  type="button"
                                  className={s.smallBtnDanger}
                                  onClick={() =>
                                    deleteReview(place.key, activeLocale, idx)
                                  }
                                  disabled={isSaving}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            <div className={s.formGrid}>
                              <input
                                className={s.input}
                                value={review.author}
                                onChange={(e) =>
                                  updateReview(place.key, activeLocale, idx, {
                                    author: e.target.value,
                                  })
                                }
                                placeholder="Author"
                                disabled={isSaving}
                              />

                              <input
                                className={s.input}
                                type="date"
                                value={review.date || ''}
                                onChange={(e) =>
                                  updateReview(place.key, activeLocale, idx, {
                                    date: e.target.value,
                                  })
                                }
                                disabled={isSaving}
                              />

                              <select
                                className={s.input}
                                value={review.rating === '' ? '' : String(review.rating)}
                                onChange={(e) =>
                                  updateReview(place.key, activeLocale, idx, {
                                    rating:
                                      e.target.value === ''
                                        ? ''
                                        : Number(e.target.value),
                                  })
                                }
                                disabled={isSaving}
                              >
                                <option value="">Rating</option>
                                <option value="1">1 star</option>
                                <option value="2">2 stars</option>
                                <option value="3">3 stars</option>
                                <option value="4">4 stars</option>
                                <option value="5">5 stars</option>
                              </select>
                            </div>

                            <textarea
                              className={s.textarea}
                              value={review.text}
                              onChange={(e) =>
                                updateReview(place.key, activeLocale, idx, {
                                  text: e.target.value,
                                })
                              }
                              placeholder="Review text"
                              rows={5}
                              disabled={isSaving}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={s.panelFooter}>
                      <Button
                        onClick={() => addReview(place.key, activeLocale)}
                        disabled={isSaving}
                      >
                        Add review
                      </Button>

                      <Button
                        onClick={() => savePlace(place.key, activeLocale)}
                        disabled={isSaving}
                      >
                        {isSaving ? 'Saving…' : `Save ${activeLocale.toUpperCase()}`}
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