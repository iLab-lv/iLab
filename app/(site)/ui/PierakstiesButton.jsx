'use client';

import Link from 'next/link';
import s from './PierakstiesButton.module.scss';

export default function PierakstiesButton({ href = '/pieraksties', onClick }) {
  return (
    <Link href={href} className={`${s.cta} ${s.secondary}`} onClick={onClick} aria-label="Pieraksties uz remontu">
      Pieraksties
    </Link>
  );
}
