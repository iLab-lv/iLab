// lib/seo/getStaticPageSeo.js

import { getStaticPageSeoConfig } from '@/lib/seo/staticPageSeo';

export function getStaticPageSeo(pageKey, locale = 'lv') {
  const page = getStaticPageSeoConfig(pageKey);

  const title = page.title?.[locale];
  const description = page.description?.[locale];
  const imageAlt = page.imageAlt?.[locale];

  if (!title) {
    throw new Error(`[getStaticPageSeo] Missing title for ${pageKey}.${locale}`);
  }

  if (!description) {
    throw new Error(`[getStaticPageSeo] Missing description for ${pageKey}.${locale}`);
  }

  return {
    locale,
    title,
    description,

    lvPath: page.route?.lv || '/',
    ruPath: page.route?.ru || '/ru',

    image: page.image,
    imageAlt,

    type: page.type || 'website',
    noIndex: Boolean(page.noIndex),
  };
}