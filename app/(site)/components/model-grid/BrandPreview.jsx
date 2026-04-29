'use client';

import Link from 'next/link';
import ModelCard from './ModelCard';
import layout from '@styles/Catalog.module.scss';
import g from './BrandPreview.module.scss';

export default function BrandPreview({
  brandSlug,
  brandName,
  items = [],
  total = 0,
  href,
  locale = 'lv',
}) {
  if (!items || items.length === 0) return null;

  const viewAllLabel =
    locale === 'ru'
      ? `Смотреть все модели ${brandName}`
      : `Skatīt visus ${brandName} modeļus`;

  return (
    <section
      id={`brand-${brandSlug}`}
      className={layout.section}
      aria-labelledby={`brand-${brandSlug}-h2`}
    >
      <div className={layout.container}>
        <div className={g.header}>
          <h2 id={`brand-${brandSlug}-h2`} className={layout.h2}>
            {brandName} <span className={g.count}>({total})</span>
          </h2>

          <Link href={href} className={g.viewAll}>
            {viewAllLabel}
          </Link>
        </div>

        <div className={g.grid}>
          {items.map((d) => (
            <div className={g.gridItem} key={`${d.brandSlug}:${d.slug}`}>
              <ModelCard device={d} baseHref={href} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}