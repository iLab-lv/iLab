'use client';

import { usePathname } from 'next/navigation';
import { getNavLocaleFromPathname } from '../navbar/navigation.helpers';

export default function FooterClientWrapper({ lv, ru }) {
  const pathname = usePathname() || '/';
  const locale = getNavLocaleFromPathname(pathname);

  return locale === 'ru' ? ru : lv;
}