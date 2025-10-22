// app/(site)/(catalog)/layout.jsx
'use client';

import { usePathname } from 'next/navigation';
import PageHeader from '../ui/page-header/PageHeader';
import categoryContent from '@/data/categoryContent';
import servicesContent from '@/data/servicesContent';
import devices from '@/data/devices';

const norm = (s = '') => decodeURIComponent(String(s)).trim().toLowerCase();

export default function CatalogLayout({ children }) {
  const pathname = usePathname() || '/';
  const parts = pathname.split('/').filter(Boolean).map(norm);
  const categorySlug = parts[0] || '';
  const subSlug = parts[1] || ''; // "iphone-14-pro" or "displeja-maina"

  // 1) Default: category header (may include scroll CTA from registry)
  let headerProps = {};
  const cat = categoryContent[categorySlug];
  if (cat) {
    headerProps = { title: cat.h1, lead: cat.lead, scrollCta: cat.scrollCta };
  }

  // 2) Service page override (no CTA)
  const svcKey = subSlug ? `${categorySlug}/${subSlug}` : '';
  const svc = servicesContent[svcKey];
  if (svc) {
    headerProps = {
      title: svc.h1 || headerProps.title,
      lead: svc.lead || headerProps.lead,
      scrollCta: null,
    };
  }
  // 3) Device page override for /iphone-remonts/[device] → SHOW CTA to #cenas
  else if (subSlug && categorySlug === 'iphone-remonts') {
    const d = devices.find(
      (x) =>
        x.slug.toLowerCase() === subSlug &&
        x.brandSlug === 'apple' &&
        x.category === 'telefonu-remonts'
    );
    if (d) {
      const lead =
        d.metaDescription ||
        `Remontējam ${d.name}: displejs, baterija, uzlāde, kamera. Ātra diagnostika un garantija.`;
      headerProps = {
        title: `${d.name} remonts`,
        lead,
        // ✅ pass CTA to match the device page's PriceList id
        scrollCta: { label: 'Skatīt cenas', targetId: 'cenas' },
      };
    } else {
      // unknown sub-route: still hide CTA
      headerProps.scrollCta = null;
    }
  }
  // 4) Any other sub-route: hide CTA by default
  else if (subSlug) {
    headerProps.scrollCta = null;
  }

  return (
    <>
      <PageHeader {...headerProps} />
      {children}
    </>
  );
}
