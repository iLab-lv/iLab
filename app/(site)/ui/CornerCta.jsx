'use client';

import Link from 'next/link';
import s from './CornerCta.module.scss';

/** Desktop-only fixed bottom-right "Pieraksties" CTA */
export default function CornerCta({ bookHref = '/pieraksties', onClick }) {
  return (
    <div className={s.wrap} role="complementary" aria-label="Ātra darbība: Pieraksties">
      <Link
        href={bookHref}
        className={`${s.cta} ${s.secondary}`}
        onClick={onClick}
        aria-label="Pieraksties uz remontu"
      >
        Pieraksties
      </Link>
    </div>
  );
}
