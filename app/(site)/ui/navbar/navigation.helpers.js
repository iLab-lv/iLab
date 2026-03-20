import { buildCategoryHref } from '@/lib/routes/routeI18n';
import { NAVIGATION_CONFIG } from './navigation.config';

export function getNavLocaleFromPathname(pathname = '/') {
  return pathname === '/ru' || pathname.startsWith('/ru/') ? 'ru' : 'lv';
}

function pickLocalizedLabel(label, locale = 'lv') {
  if (!label) return '';
  return label[locale] || label.lv || '';
}

function resolveNavHref(route, locale = 'lv') {
  if (!route) return '/';

  if (route.type === 'category') {
    return buildCategoryHref(locale, route.categoryKey);
  }

  if (route.type === 'brand') {
    return `${buildCategoryHref(locale, route.categoryKey)}/${route.brandKey}`;
  }

  if (route.type === 'custom' && route.href) {
    return typeof route.href === 'string'
      ? route.href
      : route.href[locale] || route.href.lv || '/';
  }

  return '/';
}

function buildNavItem(item, locale = 'lv') {
  return {
    key: item.key,
    label: pickLocalizedLabel(item.label, locale),
    href: resolveNavHref(item.route, locale),
    children: Array.isArray(item.children)
      ? item.children.map((child) => buildNavItem(child, locale))
      : [],
  };
}

export function buildNavigation(locale = 'lv') {
  return NAVIGATION_CONFIG.map((item) => buildNavItem(item, locale));
}

export function hasChildren(item) {
  return Array.isArray(item.children) && item.children.length > 0;
}

export function isNavItemActive(pathname = '/', href = '/') {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}