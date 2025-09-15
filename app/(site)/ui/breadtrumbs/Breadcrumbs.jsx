'use client';

import Link from 'next/link';
import s from './Breadcrumbs.module.scss';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className={s.breadcrumbs} aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href || i} className={s.crumb}>
              {isLast ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
