'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function getLocaleFromPathname(pathname = '/') {
  return pathname === '/ru' || pathname.startsWith('/ru/') ? 'ru' : 'lv';
}

export default function HtmlLangSync() {
  const pathname = usePathname() || '/';

  useEffect(() => {
    document.documentElement.lang = getLocaleFromPathname(pathname);
  }, [pathname]);

  return null;
}
