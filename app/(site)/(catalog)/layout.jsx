// app/(site)/(catalog)/layout.jsx
'use client';

import { usePathname } from 'next/navigation';
import PageHeader from '../ui/page-header/PageHeader';

import contentRegistry from '@/data/contentRegistry';
import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';
import categories from '@/data/categories';

import { getBrandContent, BRAND_CATEGORY } from '@/data/brandContent';

const norm = (s = '') => decodeURIComponent(String(s)).trim().toLowerCase();

/**
 * Resolve brand header for datoru-remonts from categories.js
 */
function getComputerBrandHeader(brandSlug) {
  const cat = categories.find((c) => c.slug === 'datoru-remonts');
  if (!cat || !Array.isArray(cat.brands)) return null;

  const b =
    cat.brands.find(
      (br) => (br.brandSlug || '').toLowerCase() === brandSlug
    ) || null;

  if (!b) return null;

  const name = b.name || brandSlug;

  return {
    title: `${name} datoru remonts`,
    lead:
      b.lead ||
      `Profesionāls ${name} datoru remonts Rīgā — portatīvie un galda datori, ekrāns, dzesēšana, diski un programmatūra. Bezmaksas diagnostika un 90 dienu garantija.`,
    scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'brand-modeli' },
  };
}

/**
 * Resolve brand header for telefonu/plansetdatoru using brandContent
 */
function getBrandHeaderFromRegistry(categorySlug, brandSlug) {
  try {
    if (categorySlug === 'telefonu-remonts') {
      const bc = getBrandContent(brandSlug, BRAND_CATEGORY.PHONES);
      if (!bc) return null;

      const hero = bc.hero || {};
      const marketingName = bc.marketingName || bc.name || brandSlug;

      return {
        title:
          bc.h1 ||
          (marketingName ? `${marketingName} telefonu remonts` : undefined),
        lead: hero.lead,
        scrollCta:
          hero.scrollCta || {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
      };
    }

    if (categorySlug === 'plansetdatoru-remonts') {
      const bc = getBrandContent(brandSlug, BRAND_CATEGORY.TABLETS);
      if (!bc) return null;

      const hero = bc.hero || {};
      const marketingName = bc.marketingName || bc.name || brandSlug;

      return {
        title:
          bc.h1 ||
          (marketingName ? `${marketingName} planšetdatoru remonts` : undefined),
        lead: hero.lead,
        scrollCta:
          hero.scrollCta || {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
      };
    }
  } catch (e) {
    // if brand not found, just fall back
    return null;
  }

  return null;
}

export default function CatalogLayout({ children }) {
  const pathname = usePathname() || '/';
  const parts = pathname.split('/').filter(Boolean).map(norm);

  const categorySlug = parts[0] || '';
  const subSlug = parts[1] || ''; // service slug OR brand slug OR iPhone device slug
  const deviceSlug = parts[2] || ''; // device slug for 3-segment device routes

  let headerProps = {};
  let brandHeaderMatched = false;

  // 1) Base: category header (may include scroll CTA from contentRegistry)
  const cat = contentRegistry.categories?.[categorySlug];
  if (cat) {
    // Support both flat { h1, lead, scrollCta } and nested { hero: { ... } }
    const hero = cat.hero || cat;
    headerProps = {
      title: hero.h1 || headerProps.title,
      lead: hero.lead || headerProps.lead,
      scrollCta: hero.scrollCta || headerProps.scrollCta,
    };
  }

  // 2) Service page override — single source from contentRegistry.services
  const svcKey = subSlug ? `${categorySlug}/${subSlug}` : '';
  const svc = contentRegistry.services?.[svcKey];

  if (svc) {
    headerProps = {
      title: svc.h1 || headerProps.title,
      lead: svc.lead || headerProps.lead,
      scrollCta: svc.scrollCta ?? null, // most services: no CTA
    };
  } else {
    // 2b) BRAND PAGE override (no device slug)
    if (subSlug && !deviceSlug) {
      let brandHeader = null;

      if (categorySlug === 'telefonu-remonts' || categorySlug === 'plansetdatoru-remonts') {
        brandHeader = getBrandHeaderFromRegistry(categorySlug, subSlug);
      } else if (categorySlug === 'datoru-remonts') {
        brandHeader = getComputerBrandHeader(subSlug);
      }

      if (brandHeader) {
        brandHeaderMatched = true;
        headerProps = {
          title: brandHeader.title || headerProps.title,
          lead: brandHeader.lead || headerProps.lead,
          scrollCta:
            brandHeader.scrollCta ||
            headerProps.scrollCta || {
              label: 'Skatīt modeļus un cenas',
              targetId: 'brand-modeli',
            },
        };
      }
    }

    // 3) Device page override → possible CTA to #cenas (only if pricing exists)
    let device = null;

    if (categorySlug === 'iphone-remonts' && subSlug && !deviceSlug) {
      // iPhone device routes: /iphone-remonts/<device-slug>
      device =
        devices.find(
          (x) =>
            x.slug.toLowerCase() === subSlug &&
            x.category === 'telefonu-remonts' &&
            (x.brandSlug === 'apple' || x.brand === 'Apple')
        ) || null;
    } else if (categorySlug && subSlug && deviceSlug) {
      // Generic device routes with brand segment:
      //   /telefonu-remonts/samsung/galaxy-s21
      //   /plansetdatoru-remonts/ipad/air-13-6th-gen-m2-2024
      //   /datoru-remonts/apple/macbook-pro-14-2023
      device =
        devices.find(
          (x) =>
            x.slug.toLowerCase() === deviceSlug &&
            x.category === categorySlug &&
            (x.brandSlug || '').toLowerCase() === subSlug
        ) || null;
    }

    if (device) {
      const pricing = devicePricing[device.slug];
      const hasPrices =
        pricing && Array.isArray(pricing.items) && pricing.items.length > 0;

      const lead =
        device.metaDescription ||
        `Remontējam ${device.name}: displejs, baterija, uzlāde, kamera. Ātra diagnostika un garantija.`;

      headerProps = {
        title: `${device.name} remonts`,
        lead,
        scrollCta: hasPrices
          ? { label: 'Skatīt cenas', targetId: 'cenas' }
          : null,
      };
    } else if (subSlug && !deviceSlug && !brandHeaderMatched) {
      // 4) Any other two-segment route that is NOT a known brand page:
      // hide CTA by default unless something above already set it
      if (headerProps.scrollCta === undefined) {
        headerProps.scrollCta = null;
      }
    }
  }

  // Dev aid to spot slug/key mismatches quickly (won't run in production)
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[CatalogLayout]', {
      pathname,
      categorySlug,
      subSlug,
      deviceSlug,
      svcKey,
      svcFound: !!svc,
      brandHeaderMatched,
      headerProps,
    });
  }

  return (
    <>
      <PageHeader {...headerProps} />
      {children}
    </>
  );
}
