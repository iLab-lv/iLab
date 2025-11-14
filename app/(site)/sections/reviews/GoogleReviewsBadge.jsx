'use client';

import { useEffect, useState } from 'react';
import s from './GoogleReviewsBadge.module.scss';

function formatRatingRange(min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;

  // If ratings are effectively the same (e.g. 4.9 & 4.9), show single value
  if (Math.abs(min - max) < 0.01) {
    return min.toFixed(1); // e.g. "4.9"
  }

  // Always from smaller to larger
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  return `${lo.toFixed(1)}–${hi.toFixed(1)}`; // e.g. "4.8–5.0"
}

export default function GoogleReviewsBadge({ className, href = '#reviews' }) {
  const [state, setState] = useState({
    loading: true,
    ratingText: null,
    totalCount: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/reviews');
        if (!res.ok) throw new Error('Failed to load reviews');

        const json = await res.json();
        if (cancelled) return;

        const values = Object.values(json || {}).filter(Boolean);
        if (!values.length) {
          setState({ loading: false, ratingText: null, totalCount: null });
          return;
        }

        const ratings = values
          .map((v) => Number(v.rating))
          .filter((n) => Number.isFinite(n));

        const counts = values
          .map((v) => Number(v.count))
          .filter((n) => Number.isFinite(n));

        if (!ratings.length || !counts.length) {
          setState({ loading: false, ratingText: null, totalCount: null });
          return;
        }

        const min = Math.min(...ratings);
        const max = Math.max(...ratings);
        const totalCount = counts.reduce((sum, n) => sum + n, 0);
        const ratingText = formatRatingRange(min, max);

        if (!ratingText) {
          setState({ loading: false, ratingText: null, totalCount: null });
          return;
        }

        setState({
          loading: false,
          ratingText,
          totalCount,
        });
      } catch (err) {
        if (!cancelled) {
          console.error('GoogleReviewsBadge: failed to load', err);
          setState({ loading: false, ratingText: null, totalCount: null });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const { loading, ratingText, totalCount } = state;

  // If we don’t have usable data yet, don’t show the badge at all
  if (loading || !ratingText || totalCount == null) return null;

  const ariaLabel = ratingText.includes('–')
    ? `Google rating between ${ratingText} out of 5, based on ${totalCount} reviews`
    : `Google rating ${ratingText} out of 5, based on ${totalCount} reviews`;

  const cls = [s.badge, className].filter(Boolean).join(' ');

  // Link now scrolls to reviews section (no new tab)
  return (
    <a href={href} className={cls} aria-label={ariaLabel}>
      <span className={s.star} aria-hidden>
        ★
      </span>
      <span className={s.text}>
        {ratingText} · {totalCount} atsauksmes · Google
      </span>
    </a>
  );
}
