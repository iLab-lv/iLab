// app/(site)/ui/page-header/PageHeader.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

import ScrollCta from '@components/button/ScrollCta';
import s from './PageHeader.module.scss';

export default function PageHeader({
  title,
  lead,
  scrollCta,
  image,
  imageSrc,
  imageAlt,
  crumbs = [],
  showBreadcrumbs = true,
}) {
  const [imgVisible, setImgVisible] = useState(true);

  const computedImage = image?.src || imageSrc
    ? {
        src: image?.src || imageSrc,
        alt: image?.alt || imageAlt || title || '',
      }
    : null;

  // Current page crumb is already represented by H1
  const displayCrumbs =
    crumbs && crumbs.length > 1 ? crumbs.slice(0, -1) : crumbs || [];

  return (
    <header className={s.header} role="region" aria-label="Lapas virsraksts">
      <div className={s.container}>
        {showBreadcrumbs && displayCrumbs.length > 0 && (
          <nav className={s.breadcrumbs} aria-label="Breadcrumb">
            <ol>
              {displayCrumbs.map((item, i) => (
                <li key={item.href || i} className={s.crumb}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={s.headerRow}>
          <div className={s.textCol}>
            <h1 className={s.title}>{title}</h1>
            {lead ? <p className={s.lead}>{lead}</p> : null}

            {scrollCta?.targetId && scrollCta?.label ? (
              <ScrollCta
                label={scrollCta.label}
                targetId={scrollCta.targetId}
                className={s.cta}
              />
            ) : null}
          </div>

          {computedImage && imgVisible ? (
            <div className={s.media}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={computedImage.src}
                alt={computedImage.alt}
                loading="lazy"
                decoding="async"
                onError={() => setImgVisible(false)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}