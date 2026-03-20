// app/(site)/ui/page-header/ResolvedPageHeader.jsx
'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import PageHeader from './PageHeader';
import { resolvePageHeader } from './resolvePageHeader';

export default function ResolvedPageHeader() {
  const pathname = usePathname() || '/';

  const headerProps = useMemo(() => resolvePageHeader(pathname), [pathname]);

  if (!headerProps?.visible) return null;

  return <PageHeader {...headerProps} />;
}