// app/(site)/(info)/layout.jsx
'use client';

import { usePathname } from 'next/navigation';
import PageHeader from '../ui/page-header/PageHeader';
import contentRegistry from '@/data/contentRegistry';

const norm = (s = '') => decodeURIComponent(String(s)).trim().toLowerCase();

export default function InfoLayout({ children }) {
  const pathname = usePathname() || '/';
  // Example: /duk, /kontakti, /noteikumi — group folders like (site)/(info) are not part of the URL
  const parts = pathname.split('/').filter(Boolean).map(norm);
  const infoSlug = parts[0] || ''; // first real segment is the info page key

  // Default header props from contentRegistry.info
  let headerProps = {};
  const infoEntry = contentRegistry.info?.[infoSlug];

  if (infoEntry) {
    headerProps = {
      title: infoEntry.h1,
      lead: infoEntry.lead,
      scrollCta: infoEntry.scrollCta || null, // usually not used on info pages, but supported
    };
  } else {
    // Sensible fallback so the header still renders even if registry is missing the key
    headerProps = {
      title: 'iLab',
      lead: '',
      scrollCta: null,
    };
  }

  // Dev aid (won't run in production)
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[InfoLayout]', { pathname, infoSlug, hasRegistry: !!infoEntry });
  }

  return (
    <>
      <PageHeader {...headerProps} />
      {children}
    </>
  );
}
