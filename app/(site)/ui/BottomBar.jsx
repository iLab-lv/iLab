'use client';

import Link from 'next/link';
import s from './BottomBar.module.scss';

/**
 * Mobile-only fixed bottom bar with two CTAs:
 * - Primary slot (#bottombar-primary): SaziniesButton will be portaled here.
 * - Secondary button (Pieraksties): native link, configurable via props.
 *
 * Props:
 * - bookHref?: string      -> URL for "Pieraksties" (default: '#')
 * - onBookClick?: () => void  (optional analytics hook)
 */
export default function BottomBar({ bookHref = '#', onBookClick }) {
  return (
    <div className={s.bar} role="region" aria-label="Mobilās darbības josla">
      <div className={s.inner}>
        {/* Primary slot — SaziniesButton mounts here on mobile via portal */}
        <div id="bottombar-primary" className={s.slotPrimary} />

        {/* Secondary CTA — native link */}
        <Link
          href={bookHref}
          className={`${s.cta} ${s.secondary}`}
          onClick={onBookClick}
          aria-label="Pieraksties uz remontu"
        >
          Pieraksties
        </Link>
      </div>
    </div>
  );
}
