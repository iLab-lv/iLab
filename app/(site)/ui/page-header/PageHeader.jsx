// components/page-header/PageHeader.jsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import categories from '@/data/categories';
import categoryContent from '@/data/categoryContent';
import { getBrandContent, BRAND_CATEGORY } from '@/data/brandContent';
import ScrollCta from '@components/button/ScrollCta';
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
 * - Builds breadcrumbs/title from URL; allows overrides via props.
 * - If no lead/scrollCta are provided, tries to resolve from content registries.
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
    resolvedHero,   // { h1?, lead?, scrollCta? }
    autoScrollCta,  // default CTA when on a device page
  } = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean); // e.g. ['iphone-remonts','iphone-14'] OR ['telefonu-remonts','apple','iphone-14']
    const [p0, p1, p2] = parts;

    // treat standard catalog slugs as category/brand[/device] when present
    const categorySlug = p0;
    const brandSlug = p1;
    const deviceSlug = p2;

    // device-page detection:
    // - iPhone device: /iphone-remonts/[device] (2 segments)
    // - generic device: /<category>/<brand>/<device> (3+ segments)
    const isIphoneDevice = p0 === 'iphone-remonts' && parts.length === 2;
    const isGenericDevice = parts.length >= 3;
    const isDevicePage = isIphoneDevice || isGenericDevice;

    // --- base labels via categories (for breadcrumbs & fallback title)
    const cat = getCategory(categorySlug);
    const catLabel = cat?.label || titleize(categorySlug);
    const brand = getBrand(cat, brandSlug);
    const brandLabel = brand?.label || (brandSlug ? titleize(brandSlug) : null);
    const deviceLabel = isIphoneDevice ? titleize(p1) : (deviceSlug ? titleize(deviceSlug) : null);

    // Breadcrumbs
    const c = [{ label: 'Sākums', href: '/' }];
    if (categorySlug) c.push({ label: catLabel, href: `/${categorySlug}` });
    if (isGenericDevice && brandSlug) c.push({ label: brandLabel, href: `/${categorySlug}/${brandSlug}` });
    if (isDevicePage && deviceLabel) {
      const devicePath = isIphoneDevice
        ? `/${p0}/${p1}`
        : `/${categorySlug}/${brandSlug}/${deviceSlug}`;
      c.push({ label: deviceLabel, href: devicePath });
    }

    // Default title from URL
    let t = catLabel || '';
    if (!isDevicePage && brandLabel) t = `${brandLabel} ${catLabel?.toLowerCase?.() || ''}`.trim();
    if (isDevicePage && deviceLabel) {
      t = `${(brandLabel && !isIphoneDevice ? brandLabel + ' ' : '')}${deviceLabel} remonts`.trim();
    }

    // Image (optional)
    const src = image?.src || imageSrc || null;
    const alt = image?.alt || imageAlt || t || '';

    // --- resolve hero defaults from content registries
    let heroFromContent = null;

    // iPhone hub at root
    if (parts.length === 1 && p0 === 'iphone-remonts') {
      const bc = getBrandContent('apple', BRAND_CATEGORY.PHONES);
      heroFromContent = bc?.hero || null;
      if (bc?.hero?.h1) t = bc.hero.h1;
    }

    // Telefonu remonts hub
    if (parts.length === 1 && p0 === 'telefonu-remonts') {
      heroFromContent = categoryContent?.['telefonu-remonts']?.hero || null;
      if (heroFromContent?.h1) t = heroFromContent.h1;
    }

    // Planšetdatoru remonts hub
    if (parts.length === 1 && p0 === 'plansetdatoru-remonts') {
      heroFromContent = categoryContent?.['plansetdatoru-remonts']?.hero || null;
      if (heroFromContent?.h1) t = heroFromContent.h1;
    }

    // Brand pages (phones)
    if (!isDevicePage && categorySlug === 'telefonu-remonts' && brandSlug) {
      const bc = getBrandContent(brandSlug, BRAND_CATEGORY.PHONES);
      heroFromContent = bc?.hero || heroFromContent;
      if (bc?.hero?.h1) t = bc.hero.h1;
    }

    // Brand pages (tablets)
    if (!isDevicePage && categorySlug === 'plansetdatoru-remonts' && brandSlug) {
      const bc = getBrandContent(brandSlug, BRAND_CATEGORY.TABLETS);
      heroFromContent = bc?.hero || heroFromContent;
      if (bc?.hero?.h1) t = bc.hero.h1;
    }

    // NEW: auto CTA for any device page
    const autoCta = isDevicePage ? { label: 'Skatīt cenas', targetId: 'paglelist' } : null;

    return {
      crumbs: c,
      computedTitle: t,
      computedImage: src ? { src, alt } : null,
      resolvedHero: heroFromContent,
      autoScrollCta: autoCta,
    };
  }, [pathname, image, imageAlt, imageSrc]);

  // Final render values:
  const finalTitle = title || resolvedHero?.h1 || computedTitle;
  const finalLead = lead ?? resolvedHero?.lead ?? null;
  const finalScrollCta = scrollCta ?? resolvedHero?.scrollCta ?? autoScrollCta ?? null;

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
              <ScrollCta
                label={finalScrollCta.label}
                targetId={finalScrollCta.targetId}
                className={s.cta}   // spacing only; visuals are in ScrollCta.module.scss
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
