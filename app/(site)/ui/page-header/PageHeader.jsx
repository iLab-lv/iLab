// components/page-header/PageHeader.jsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import categories from '@/data/categories';
import categoryContent from '@/data/categoryContent';
import { getBrandContent, BRAND_CATEGORY } from '@/data/brandContent';
import s from './PageHeader.module.scss';

// --- helpers -------------------------------------------------------------
const titleize = (str) =>
  (str || '')
    .replace(/-/g, ' ')
    .replace(/[_+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\p{L}/gu, (c) => c.toUpperCase());

function getCategory(slug) {
  if (!slug || !categories) return null;
  if (Array.isArray(categories)) return categories.find((c) => c.slug === slug) || null;
  return categories[slug] || null;
}
function getBrand(cat, brandSlug) {
  if (!cat || !brandSlug || !Array.isArray(cat.brands)) return null;
  return cat.brands.find((b) => b.slug === brandSlug) || null;
}

/**
 * PageHeader
 * - Auto-builds breadcrumbs/title from URL but allows overrides via props.
 * - NEW: If lead/scrollCta are not provided, auto-resolve from brandContent/categoryContent based on the route.
 *
 * Props (all optional):
 * - title?: string               // overrides computed title (e.g., "iPhone remonts")
 * - lead?: string | ReactNode    // short description under H1
 * - scrollCta?: { label: string; targetId: string } // scroll-to section button
 * - image?: { src: string; alt?: string }           // optional image (device pages)
 * - imageSrc?, imageAlt?         // legacy compatibility
 * - showBreadcrumbs?: boolean    // default true
 */
export default function PageHeader({
  title,
  lead,
  scrollCta,
  image,
  imageSrc,
  imageAlt,
  showBreadcrumbs = true,
}) {
  const pathname = usePathname() || '/';
  const [imgVisible, setImgVisible] = useState(true);

  const {
    crumbs,
    computedTitle,
    computedImage,
    resolvedHero,     // ← NEW: { h1?, lead?, scrollCta? }
  } = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean); // e.g. ['telefonu-remonts','samsung']
    const [categorySlug, brandSlug, deviceSlug] = parts;

    // --- base labels via categories (for breadcrumbs & fallback title)
    const cat = getCategory(categorySlug);
    const catLabel = cat?.label || titleize(categorySlug);
    const brand = getBrand(cat, brandSlug);
    const brandLabel = brand?.label || (brandSlug ? titleize(brandSlug) : null);
    const deviceLabel = deviceSlug ? titleize(deviceSlug) : null;

    // Breadcrumbs
    const c = [{ label: 'Sākums', href: '/' }];
    if (categorySlug) c.push({ label: catLabel, href: `/${categorySlug}` });
    if (brandSlug) c.push({ label: brandLabel, href: `/${categorySlug}/${brandSlug}` });
    if (deviceSlug) c.push({ label: deviceLabel, href: `/${categorySlug}/${brandSlug}/${deviceSlug}` });

    // Default title from URL
    let t = catLabel || '';
    if (brandLabel && !deviceLabel) t = `${brandLabel} ${catLabel?.toLowerCase?.() || ''}`.trim();
    if (brandLabel && deviceLabel) t = `${brandLabel} ${deviceLabel} remonts`;

    // Image (optional, rendered only if provided)
    const src = image?.src || imageSrc || null;
    const alt = image?.alt || imageAlt || t || '';

    // --- NEW: resolve hero defaults (lead, CTA, and sometimes H1) from content registries
    let heroFromContent = null;

    // iPhone hub at root
    if (parts.length === 1 && parts[0] === 'iphone-remonts') {
      const bc = getBrandContent('apple', BRAND_CATEGORY.PHONES);
      heroFromContent = bc?.hero || null;
      // prefer exact H1 from brand content (e.g., "iPhone remonts")
      if (bc?.hero?.h1) t = bc.hero.h1;
    }

    // Telefonu remonts hub
    if (parts.length === 1 && parts[0] === 'telefonu-remonts') {
      heroFromContent = categoryContent?.['telefonu-remonts']?.hero || null;
      if (heroFromContent?.h1) t = heroFromContent.h1;
    }

    // Planšetdatoru remonts hub
    if (parts.length === 1 && parts[0] === 'plansetdatoru-remonts') {
      heroFromContent = categoryContent?.['plansetdatoru-remonts']?.hero || null;
      if (heroFromContent?.h1) t = heroFromContent.h1;
    }

    // Brand pages (phones)
    if (categorySlug === 'telefonu-remonts' && brandSlug && !deviceSlug) {
      const bc = getBrandContent(brandSlug, BRAND_CATEGORY.PHONES);
      heroFromContent = bc?.hero || heroFromContent;
      if (bc?.hero?.h1) t = bc.hero.h1;
    }

    // Brand pages (tablets)
    if (categorySlug === 'plansetdatoru-remonts' && brandSlug && !deviceSlug) {
      const bc = getBrandContent(brandSlug, BRAND_CATEGORY.TABLETS);
      heroFromContent = bc?.hero || heroFromContent;
      if (bc?.hero?.h1) t = bc.hero.h1;
    }

    return {
      crumbs: c,
      computedTitle: t,
      computedImage: src ? { src, alt } : null,
      resolvedHero: heroFromContent,
    };
  }, [pathname, image, imageAlt, imageSrc]);

  // Final render values:
  const finalTitle = title || resolvedHero?.h1 || computedTitle;
  const finalLead = lead ?? resolvedHero?.lead ?? null;
  const finalScrollCta = scrollCta ?? resolvedHero?.scrollCta ?? null;

  return (
    <header className={s.header} role="region" aria-label="Lapas virsraksts">
      <div className={s.container}>
        {showBreadcrumbs && (
          <nav className={s.breadcrumbs} aria-label="Breadcrumb">
            <ol>
              {crumbs.map((item, i) => {
                const isLast = i === crumbs.length - 1;
                return (
                  <li key={item.href || i} className={s.crumb}>
                    {isLast ? <span aria-current="page">{item.label}</span> : <Link href={item.href}>{item.label}</Link>}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <div className={s.headerRow}>
          <div className={s.textCol}>
            <h1 className={s.title}>{finalTitle}</h1>
            {finalLead ? <p className={s.lead}>{finalLead}</p> : null}

            {finalScrollCta?.targetId && finalScrollCta?.label ? (
              <a
                href={`#${finalScrollCta.targetId}`}
                className={s.scrollBtn}
                aria-label={`${finalScrollCta.label} – ritināt uz sadaļu`}
              >
                {finalScrollCta.label}
                <span className={s.scrollIcon} aria-hidden="true">
                  {/* inline chevron-down (18x18) */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
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
