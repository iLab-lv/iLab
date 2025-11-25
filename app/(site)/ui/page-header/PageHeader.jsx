// components/page-header/PageHeader.jsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import categories from '@/data/categories';
import contentRegistry from '@/data/contentRegistry';
import categoryContent from '@/data/categoryContent'; // 👈 fallback source
import { getBrandContent, BRAND_CATEGORY } from '@/data/brandContent';
import devices from '@/data/devices'; // 👈 use device.name for titles/crumbs

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
  // your brand objects use "brandSlug"
  return cat.brands.find((b) => (b.brandSlug || b.slug) === brandSlug) || null;
}

/**
 * PageHeader
 * - Single source of truth for service pages:
 *   - If route is "/<category>/<service>" AND that key exists in contentRegistry.services,
 *     we use its h1/lead and add a 3rd breadcrumb.
 * - Hubs, brand pages, and device pages keep your existing behavior,
 *   with a key improvement: device pages now use device.name (from devices)
 *   instead of slug-derived labels for titles/breadcrumbs when possible.
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
    resolvedHero, // { h1?, lead?, scrollCta? }
  } = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean); // e.g. ['telefonu-remonts','ekrana-mainja'] or ['telefonu-remonts','samsung','galaxy-s21']
    const [p0, p1, p2] = parts;

    const categorySlug = p0 || null;
    const secondSeg = p1 || null;
    const thirdSeg = p2 || null;

    // --- unified service detection: only treat as service if registry contains it
    const serviceKey =
      categorySlug && secondSeg && parts.length === 2 ? `${categorySlug}/${secondSeg}` : null;
    const serviceEntry = serviceKey ? contentRegistry?.services?.[serviceKey] : null;
    const isServicePage = Boolean(serviceEntry);

    // device-page detection (iPhone 2-seg device pages remain devices unless a service exists)
    const isIphoneDevice = p0 === 'iphone-remonts' && parts.length === 2 && !isServicePage;
    const isGenericDevice = parts.length >= 3;
    const isDevicePage = isIphoneDevice || isGenericDevice;

    // --- try to resolve a concrete device from data for device pages
    let device = null;
    if (isDevicePage) {
      if (isIphoneDevice && secondSeg) {
        // iPhone devices: /iphone-remonts/<device-slug>
        device =
          devices.find(
            (d) =>
              d.slug === secondSeg &&
              d.category === 'telefonu-remonts' &&
              (d.brandSlug === 'apple' || d.brand === 'Apple')
          ) || null;
      } else if (isGenericDevice && thirdSeg && categorySlug) {
        // Generic 3+ segment devices, e.g. /plansetdatoru-remonts/ipad/<device-slug>
        device =
          devices.find(
            (d) =>
              d.slug === thirdSeg &&
              d.category === categorySlug &&
              (!secondSeg || d.brandSlug === secondSeg)
          ) || null;
      }
    }

    // --- base labels via categories (breadcrumbs & fallbacks)
    const cat = getCategory(categorySlug);
    const catLabel = categorySlug ? cat?.name || cat?.label || titleize(categorySlug) : '';

    const brand = getBrand(cat, secondSeg);
    const brandLabel =
      brand?.name || brand?.label || (secondSeg ? titleize(secondSeg) : null);

    // Device label: prefer device.name from data, fallback to slug-based
    const fallbackDeviceLabel = thirdSeg
      ? titleize(thirdSeg)
      : isIphoneDevice
      ? titleize(secondSeg)
      : null;
    const deviceLabel = device?.name || fallbackDeviceLabel;

    // ---------------- Breadcrumbs ----------------
    const c = [{ label: 'Sākums', href: '/' }];

    if (categorySlug) {
      c.push({ label: catLabel, href: `/${categorySlug}` });
    }

    // Brand-only pages like /telefonu-remonts/samsung or /plansetdatoru-remonts/ipad
    // are NOT device pages and NOT service pages, so we add the brand crumb here.
    if (!isDevicePage && !isServicePage && secondSeg && brandLabel) {
      c.push({
        label: brandLabel,
        href: `/${categorySlug}/${secondSeg}`,
      });
    }

    if (isDevicePage && secondSeg) {
      // brand level for generic devices (e.g. /telefonu-remonts/samsung/galaxy-s21)
      if (isGenericDevice && brandLabel) {
        c.push({ label: brandLabel, href: `/${categorySlug}/${secondSeg}` });
      }
      // device itself
      const devicePath = isIphoneDevice
        ? `/${categorySlug}/${secondSeg}`
        : `/${categorySlug}/${secondSeg}/${thirdSeg}`;
      if (deviceLabel) {
        c.push({ label: deviceLabel, href: devicePath });
      }
    } else if (isServicePage) {
      // service breadcrumb
      c.push({
        label: serviceEntry.crumb || serviceEntry.h1 || titleize(secondSeg),
        href: `/${serviceKey}`,
      });
    }

    // ---------------- Title ----------------
    let t = catLabel || '';

    if (isDevicePage && deviceLabel) {
      // Prefer authoritative device.name from data, never guess from slug if we have it
      if (device?.name) {
        t = `${device.name} remonts`;
      } else {
        // Fallback to old behavior: brand + slug-based label
        t = `${brandLabel ? brandLabel + ' ' : ''}${deviceLabel} remonts`.trim();
      }
    } else if (isServicePage && serviceEntry?.h1) {
      t = serviceEntry.h1;
    } else if (!isDevicePage && brandLabel && !isServicePage) {
      t = `${brandLabel} ${catLabel?.toLowerCase?.() || ''}`.trim();
    }

    // ---------------- Hero defaults ----------------
    let heroFromContent = null;

    // Hubs (category root)
    if (!secondSeg && categorySlug) {
      // 1) Try contentRegistry (new system)
      let hub = contentRegistry?.categories?.[categorySlug]?.hero || null;

      // 2) Fallback to categoryContent (legacy/simple config)
      if (!hub) {
        const catCfg = categoryContent?.[categorySlug];
        if (catCfg) {
          hub = {
            h1: catCfg.h1 || catCfg.hero?.h1,
            lead: catCfg.lead || catCfg.hero?.lead,
            scrollCta: catCfg.scrollCta || catCfg.hero?.scrollCta || null,
          };
        }
      }

      heroFromContent = hub;
      if (hub?.h1) t = hub.h1;
    }

    // Brand pages (phones/tablets) — keep existing behavior
    if (!isDevicePage && secondSeg && !isServicePage) {
      if (categorySlug === 'telefonu-remonts') {
        const bc = getBrandContent(secondSeg, BRAND_CATEGORY.PHONES);
        heroFromContent = bc?.hero || heroFromContent;
        if (bc?.hero?.h1) t = bc.hero.h1;
      } else if (categorySlug === 'plansetdatoru-remonts') {
        const bc = getBrandContent(secondSeg, BRAND_CATEGORY.TABLETS);
        heroFromContent = bc?.hero || heroFromContent;
        if (bc?.hero?.h1) t = bc.hero.h1;
      }
    }

    // Services (unified for iPhone + Phones + future categories)
    if (isServicePage && serviceEntry) {
      heroFromContent = {
        h1: serviceEntry.h1 || heroFromContent?.h1,
        lead: serviceEntry.lead ?? heroFromContent?.lead ?? null,
        // keep category scroll CTA to stay consistent with hubs
        scrollCta:
          contentRegistry?.categories?.[categorySlug]?.hero?.scrollCta ??
          heroFromContent?.scrollCta ??
          null,
      };
    }

    // Image (optional) – controlled by page props (DeviceHero handles visuals)
    const src = image?.src || imageSrc || null;
    const alt = image?.alt || imageAlt || t || '';

    return {
      crumbs: c,
      computedTitle: t,
      computedImage: src ? { src, alt } : null,
      resolvedHero: heroFromContent,
    };
  }, [pathname, image, imageAlt, imageSrc]);

  // Final render values (page props win → registry hero → computed)
  const finalTitle = title || resolvedHero?.h1 || computedTitle;
  const finalLead = lead ?? resolvedHero?.lead ?? null;
  const finalScrollCta = scrollCta ?? resolvedHero?.scrollCta ?? null;

  // VISUAL breadcrumbs: drop the last item (current page),
  // because the current location is already expressed by the H1.
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
            <h1 className={s.title}>{finalTitle}</h1>
            {finalLead ? <p className={s.lead}>{finalLead}</p> : null}

            {finalScrollCta?.targetId && finalScrollCta?.label ? (
              <ScrollCta
                label={finalScrollCta.label}
                targetId={finalScrollCta.targetId}
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
