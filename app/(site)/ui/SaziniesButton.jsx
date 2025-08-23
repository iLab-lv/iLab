'use client';

import Link from 'next/link';
import styles from './SaziniesButton.module.scss';

/** Primary CTA used in topbar (desktop) and BottomBar (mobile) via portals */
export default function SaziniesButton({ href = '#', onClick }) {
  return (
    <Link
      href={href}
      className={`${styles.cta} ${styles.primary}`}
      onClick={onClick}
      aria-label="Sazināties ar mums"
    >
      Sazināties
    </Link>
  );
}
