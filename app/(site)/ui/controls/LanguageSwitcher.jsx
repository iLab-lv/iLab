'use client';

import { usePathname, useRouter } from 'next/navigation';

import s from './LanguageSwitcher.module.scss';
import { ROUTE_TRANSLATIONS } from '@/lib/routes/routeTranslations';
import { getNavLocaleFromPathname } from '../navbar/navigation.helpers';

function stripTrailingSlash(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/$/, '');
}

function flattenRouteTranslations() {
  const lvToRu = {};
  const ruToLv = {};

  Object.values(ROUTE_TRANSLATIONS).forEach((group) => {
    Object.values(group).forEach((entry) => {
      if (!entry?.lv || !entry?.ru) return;

      lvToRu[`/${entry.lv}`] = `/ru/${entry.ru}`;
      ruToLv[`/ru/${entry.ru}`] = `/${entry.lv}`;
    });
  });

  lvToRu['/'] = '/ru';
  ruToLv['/ru'] = '/';

  return { lvToRu, ruToLv };
}

const { lvToRu, ruToLv } = flattenRouteTranslations();

function getLocalizedPath(pathname, nextLocale) {
  const cleanPath = stripTrailingSlash(pathname);
  const currentLocale = getNavLocaleFromPathname(cleanPath);

  if (nextLocale === currentLocale) return cleanPath;

  if (nextLocale === 'ru') {
    if (lvToRu[cleanPath]) return lvToRu[cleanPath];
    return cleanPath === '/' ? '/ru' : `/ru${cleanPath}`;
  }

  if (nextLocale === 'lv') {
    if (ruToLv[cleanPath]) return ruToLv[cleanPath];
    if (cleanPath === '/ru') return '/';

    return cleanPath.startsWith('/ru/')
      ? cleanPath.replace(/^\/ru/, '') || '/'
      : cleanPath;
  }

  return cleanPath;
}

export default function LanguageSwitcher({ onChange }) {
  const pathname = usePathname() || '/';
  const router = useRouter();

  const currentLocale = getNavLocaleFromPathname(pathname);
  const nextLocale = currentLocale === 'ru' ? 'lv' : 'ru';
  const label = nextLocale.toUpperCase();

  const handleClick = () => {
    const href = getLocalizedPath(pathname, nextLocale);

    onChange?.(nextLocale);

    if (href !== pathname) {
      router.push(href);
    }
  };

  return (
    <button
      type="button"
      className={s.lang}
      onClick={handleClick}
      aria-label={
        nextLocale === 'ru'
          ? 'Pārslēgt uz krievu valodu'
          : 'Переключить на латышский язык'
      }
    >
      {label}
    </button>
  );
}