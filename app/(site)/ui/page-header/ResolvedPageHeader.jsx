'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import PageHeader from './PageHeader';

export default function ResolvedPageHeader() {
  const pathname = usePathname() || '/';
  const [headerProps, setHeaderProps] = useState(undefined);

  useEffect(() => {
    let cancelled = false;

    async function loadHeader() {
      try {
        const res = await fetch(
          `/api/page-header?pathname=${encodeURIComponent(pathname)}`,
          {
            method: 'GET',
            cache: 'no-store',
          }
        );

        if (!res.ok) {
          console.error('[ResolvedPageHeader] API error:', res.status, pathname);
          if (!cancelled) {
            setHeaderProps({ visible: false });
          }
          return;
        }

        const data = await res.json();

        if (!cancelled) {
          setHeaderProps(data || { visible: false });
        }
      } catch (error) {
        console.error('[ResolvedPageHeader] fetch failed:', error);
        if (!cancelled) {
          setHeaderProps({ visible: false });
        }
      }
    }

    setHeaderProps(undefined);
    loadHeader();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (headerProps === undefined) return null;
  if (!headerProps?.visible) return null;

  return <PageHeader {...headerProps} />;
}