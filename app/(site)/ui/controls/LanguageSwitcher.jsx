'use client';

import { usePathname, useRouter } from 'next/navigation';

import s from './LanguageSwitcher.module.scss';
import { ROUTE_TRANSLATIONS } from '@/lib/routes/routeTranslations';
import { getNavLocaleFromPathname } from '../navbar/navigation.helpers';
import { useUiDialogs } from '../providers/UiDialogsProvider';

function stripTrailingSlash(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/$/, '');
}

function buildSegmentMaps() {
  const lvToRu = {};
  const ruToLv = {};

  Object.values(ROUTE_TRANSLATIONS).forEach((group) => {
    Object.values(group).forEach((entry) => {
      if (!entry?.lv || !entry?.ru) return;

      lvToRu[entry.lv] = entry.ru;
      ruToLv[entry.ru] = entry.lv;
    });
  });

  return { lvToRu, ruToLv };
}

const { lvToRu, ruToLv } = buildSegmentMaps();

const CATALOG_HUB_PATHS = new Set([
  '/iphone-remonts', '/telefonu-remonts', '/plansetdatoru-remonts', '/datoru-remonts',
  '/ru/remont-iphone', '/ru/remont-telefonov', '/ru/remont-planshetov', '/ru/remont-noutbukov',
]);

function splitLocaleFromPath(pathname) {
  const cleanPath = stripTrailingSlash(pathname);

  if (cleanPath === '/ru') {
    return {
      locale: 'ru',
      segments: [],
    };
  }

  if (cleanPath.startsWith('/ru/')) {
    return {
      locale: 'ru',
      segments: cleanPath.replace(/^\/ru\//, '').split('/').filter(Boolean),
    };
  }

  if (cleanPath === '/') {
    return {
      locale: 'lv',
      segments: [],
    };
  }

  return {
    locale: 'lv',
    segments: cleanPath.replace(/^\//, '').split('/').filter(Boolean),
  };
}

function translateSegments(segments, nextLocale) {
  const map = nextLocale === 'ru' ? lvToRu : ruToLv;

  return segments.map((segment) => map[segment] || segment);
}

function buildPathFromSegments(segments, locale) {
  if (!segments.length) {
    return locale === 'ru' ? '/ru' : '/';
  }

  const path = `/${segments.join('/')}`;

  return locale === 'ru' ? `/ru${path}` : path;
}

function getLocalizedPath(pathname, nextLocale) {
  const cleanPath = stripTrailingSlash(pathname);
  const currentLocale = getNavLocaleFromPathname(cleanPath);

  if (nextLocale === currentLocale) return cleanPath;

  const { segments } = splitLocaleFromPath(cleanPath);
  const translatedSegments = translateSegments(segments, nextLocale);

  return buildPathFromSegments(translatedSegments, nextLocale);
}

export default function LanguageSwitcher({ onChange }) {
  const { serviceRedesign } = useUiDialogs();
  const pathname = usePathname() || '/';
  const router = useRouter();

  const currentLocale = getNavLocaleFromPathname(pathname);
  const nextLocale = currentLocale === 'ru' ? 'lv' : 'ru';
  const label = nextLocale.toUpperCase();

  const handleClick = () => {
    const href = getLocalizedPath(pathname, nextLocale);

    onChange?.(nextLocale);

    if (href !== pathname) {
      // Service pages share a server-owned localized shell. A full navigation also
      // refreshes its document language, header, footer and dialog copy.
      if (serviceRedesign || CATALOG_HUB_PATHS.has(stripTrailingSlash(pathname)) || document.querySelector('[data-catalog-brand]') || document.querySelector('[data-catalog-model]')) {
        if (serviceRedesign) {
          const request = new CustomEvent('ilab:before-navigate', {
            cancelable: true,
            detail: { href, navigate: destination => window.location.assign(destination) },
          });
          if (!window.dispatchEvent(request)) return;
        }
        window.location.assign(href);
      } else {
        router.push(href);
      }
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
