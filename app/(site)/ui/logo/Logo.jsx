// app/(site)/ui/logo/Logo.jsx
import Link from 'next/link';
import s from './Logo.module.scss';

export default function Logo({ className = '' }) {
  return (
    <Link
      href="/"
      className={`${s.brandLink} ${className}`.trim()}
      aria-label="iLab sākumlapa"
    >
      <img
        src="/brand/logo.svg"
        alt="iLab"
        className={s.logo}
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
