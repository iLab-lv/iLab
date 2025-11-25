// app/(site)/(catalog)/layout.jsx
'use client';

import { usePathname } from 'next/navigation';
import PageHeader from '../ui/page-header/PageHeader';
import contentRegistry from '@/data/contentRegistry';
import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';

const norm = (s = '') => decodeURIComponent(String(s)).trim().toLowerCase();

export default function CatalogLayout({ children }) {
  const pathname = usePathname() || '/';
  const parts = pathname.split('/').filter(Boolean).map(norm);

  const categorySlug = parts[0] || '';
  const subSlug = parts[1] || '';    // service slug OR brand slug OR iPhone device slug
  const deviceSlug = parts[2] || ''; // device slug for 3-segment device routes

  // 1) Default: category header (may include scroll CTA from registry)
  let headerProps = {};
  const cat = contentRegistry.categories?.[categorySlug];
  if (cat) {
    headerProps = {
      title: cat.h1,
      lead: cat.lead,
      scrollCta: cat.scrollCta,
    };
  }

  // 2) Service page override (no CTA) — single source from contentRegistry
  const svcKey = subSlug ? `${categorySlug}/${subSlug}` : '';
  const svc = contentRegistry.services?.[svcKey];

  if (svc) {
    headerProps = {
      title: svc.h1 || headerProps.title,
      lead: svc.lead || headerProps.lead,
      scrollCta: null,
    };
  } else {
    // 3) Device page override → possible CTA to #cenas (only if pricing exists)
    let device = null;

    if (categorySlug === 'iphone-remonts' && subSlug) {
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
      // e.g. /telefonu-remonts/samsung/galaxy-s21
      //      /plansetdatoru-remonts/ipad/air-13-6th-gen-m2-2024
      device =
        devices.find(
          (x) =>
            x.slug.toLowerCase() === deviceSlug &&
            x.category === categorySlug &&
            (x.brandSlug || '').toLowerCase() === subSlug
        ) || null;
    }

    if (device) {
      // Decide if this device actually has a pricelist
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
    } else if (subSlug) {
      // 4) Any other sub-route (brand pages, unknown stuff): hide CTA by default
      headerProps.scrollCta = null;
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
