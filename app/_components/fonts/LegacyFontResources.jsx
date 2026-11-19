'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { usesServiceTypography } from '@/lib/presentation/serviceTypographyRoutes.mjs';
import LegacyFontLinks from './LegacyFontLinks';

// Re-evaluate on client navigation too: the root layout persists between shells.
export default function LegacyFontResources({ advertisingHost = false }) {
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const advertising = advertisingHost || searchParams?.get('ads') === '1';
  return usesServiceTypography(pathname, { advertising }) ? null : <LegacyFontLinks />;
}
