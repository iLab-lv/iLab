// app/(site)/(catalog)/layout.jsx
'use client';

import { usePathname } from 'next/navigation';
import PageHeader from '../ui/page-header/PageHeader';
import categoryContent from '@/data/categoryContent';
import servicesContent from '@/data/servicesContent';

const normalize = (s = '') =>
  decodeURIComponent(String(s)).trim().toLowerCase();

export default function CatalogLayout({ children }) {
  const pathname = usePathname() || '/';

  // "/iphone-remonts/displeja-maina/" → ["iphone-remonts","displeja-maina"]
  const parts = pathname.split('/').filter(Boolean).map(normalize);
  const categorySlug = parts[0] || '';
  const subSlug = parts[1] || '';
  const serviceKey = subSlug ? `${categorySlug}/${subSlug}` : '';

  // 1) Category header by default
  let headerProps = {};
  const cat = categoryContent[categorySlug];
  if (cat) {
    headerProps = {
      title: cat.h1,
      lead: cat.lead,
      scrollCta: cat.scrollCta, // button only on category pages
    };
  }

  // 2) Service override (no scroll CTA)
  const svc = servicesContent[serviceKey];
  if (svc) {
    headerProps = {
      title: svc.h1 || headerProps.title,
      lead: svc.lead || headerProps.lead,
      scrollCta: null, // hide "Izvēlies modeli" on service pages
    };
  }

  return (
    <>
      <PageHeader {...headerProps} />
      {children}
    </>
  );
}
