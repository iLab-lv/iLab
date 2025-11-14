// app/(site)/sections/reviews/Reviews.jsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import s from './Reviews.module.scss';
import { PLACES } from '@data/places';

// Hardcoded meta for the two locations (labels only)
const PLACE_META = [
  {
    key: 'domina',
    label: 'Domina Shopping',
  },
  {
    key: 'spice',
    label: 'Spice Home',
  },
];

function buildGoogleReviewsUrl(placeKey) {
  const cfg = PLACES[placeKey];
  if (!cfg || !cfg.placeId) return null;

  const placeId = cfg.placeId;
  // Same pattern you used on WP site
  return `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${encodeURIComponent(
    placeId
  )}`;
}

function ReviewItem({ author, text }) {
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 220;
  const safeText = text || '';
  const isLong = safeText.length > LIMIT;
  const visibleText =
    !isLong || expanded
      ? safeText
      : safeText.slice(0, LIMIT).trimEnd() + '…';

  if (!safeText) return null;

  return (
    <li className={s.reviewItem}>
      {author && <div className={s.reviewAuthor}>{author}</div>}
      <p className={s.reviewText}>
        {visibleText}{' '}
        {isLong && (
          <button
            type="button"
            className={s.reviewMore}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? 'Mazāk' : 'Vairāk'}
          </button>
        )}
      </p>
    </li>
  );
}

export default function Reviews({ id = 'reviews' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/reviews');
        if (!res.ok) throw new Error('Failed to load reviews');
        const json = await res.json();
        if (cancelled) return;
        setData(json || {});
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error('Reviews section: failed to load', err);
        setError('Neizdevās ielādēt atsauksmes');
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const places =
    data &&
    PLACE_META.map((meta) => {
      const value = data[meta.key];
      if (!value) return null;

      const href = buildGoogleReviewsUrl(meta.key);

      return {
        ...meta,
        href,
        rating: value.rating ?? null,
        count: value.count ?? null,
        featuredReviews: value.featuredReviews || [],
      };
    }).filter(Boolean);

  return (
    <section
      id={id}
      className={`${s.section} ${s.reviews}`}
      aria-label="Google atsauksmes"
    >
      <div className={s.container}>
        <div className={s.logoRow}>
          <Image
            className={s.logo}
            src="/images/logos/Google-Review-Logo.webp"
            alt="Google Reviews"
            width={260}
            height={80}
            priority
          />
        </div>

        {loading && (
          <div className={s.statusText}>Ielādē atsauksmes…</div>
        )}

        {error && !loading && (
          <div className={s.statusTextError}>{error}</div>
        )}

        {!loading && !error && places && places.length > 0 && (
          <div className={s.placesGrid}>
            {places.map((place) => (
              <article key={place.key} className={s.placeCard}>
                <header className={s.placeHeader}>
                  <h3 className={s.placeName}>{place.label}</h3>

                  <div className={s.ratingRow}>
                    <span className={s.ratingStar} aria-hidden>
                      ★
                    </span>
                    <span className={s.ratingValue}>
                      {place.rating != null
                        ? place.rating.toFixed(1)
                        : '—'}
                    </span>
                  </div>

                  {place.count != null && (
                    <div className={s.ratingMeta}>
                      Balstīts uz {place.count} atsauksmēm
                    </div>
                  )}
                </header>

                {place.featuredReviews?.length ? (
                  <ul className={s.reviewList} role="list">
                    {place.featuredReviews.map((r, idx) => (
                      <ReviewItem
                        key={idx}
                        author={r.author}
                        text={r.text}
                      />
                    ))}
                  </ul>
                ) : (
                  <p className={s.emptyText}>
                    Šobrīd šai filiālei vēl nav izceltu atsauksmju.
                  </p>
                )}

                {place.href && (
                  <div className={s.placeCta}>
                    <a
                      href={place.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.placeLink}
                    >
                      Skatīt visas atsauksmes Google Maps →
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
