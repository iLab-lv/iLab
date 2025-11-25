// components/breadcrumbs/Breadcrumbs.jsx
'use client';

import Link from 'next/link';
import s from './Breadcrumbs.module.scss';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  // We don't want the current page as a trailing non-clickable crumb,
  // because it's already shown as the page title.
  // If there's only one item, keep it as-is; otherwise drop the last.
  const displayItems = items.length > 1 ? items.slice(0, -1) : items;

  if (displayItems.length === 0) return null;

  return (
    <nav className={s.breadcrumbs} aria-label="Breadcrumb">
      <ol>
        {displayItems.map((item, i) => (
          <li key={item.href || i} className={s.crumb}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
