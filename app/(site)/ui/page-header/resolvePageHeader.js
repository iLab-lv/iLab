// app/(site)/ui/page-header/resolvePageHeader.js
import categories from '@/data/categories';
import contentRegistry from '@/data/contentRegistry';
import { getBrandContent, BRAND_CATEGORY } from '@/data/brandContent';

import {
  normalizeRouteIdentity,
  buildCategoryHref,
  buildInfoHref,
  buildServiceHref,
  buildBrandHref,
  buildDeviceHref,
} from '@/lib/routes/routeI18n';

import { db } from '@/lib/firebaseAdmin';

const norm = (s = '') => decodeURIComponent(String(s)).trim().toLowerCase();

const titleize = (str) =>
  (str || '')
    .replace(/-/g, ' ')
    .replace(/[_+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\p{L}/gu, (c) => c.toUpperCase());

function pickLocalizedField(value, locale = 'lv', fallback = 'lv') {
  if (!value) return '';

  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'object') {
    if (typeof value[locale] === 'string' && value[locale].trim()) {
      return value[locale].trim();
    }

    if (typeof value[fallback] === 'string' && value[fallback].trim()) {
      return value[fallback].trim();
    }
  }

  return '';
}

function getCategory(slug) {
  if (!slug || !categories) return null;

  if (Array.isArray(categories)) {
    return categories.find((c) => c.slug === slug) || null;
  }

  return categories[slug] || null;
}

function getBrand(category, brandSlug) {
  if (!category || !brandSlug || !Array.isArray(category.brands)) {
    return null;
  }

  return category.brands.find((b) => (b.brandSlug || b.slug) === brandSlug) || null;
}

function getCategoryHero(categorySlug) {
  return contentRegistry?.categories?.[categorySlug]?.hero || null;
}

function getComputerBrandHero(brandSlug) {
  const category = getCategory('datoru-remonts');

  if (!category || !Array.isArray(category.brands)) return null;

  const brand =
    category.brands.find((b) => norm(b.brandSlug || b.slug) === norm(brandSlug)) ||
    null;

  if (!brand) return null;

  const brandName = brand.name || titleize(brandSlug);

  return {
    h1: `${brandName} datoru remonts`,
    lead:
      brand.lead ||
      `Profesionāls ${brandName} datoru remonts Rīgā - portatīvie un galda datori, ekrāns, dzesēšana, diski un programmatūra. Bezmaksas diagnostika un garantija līdz 1 gadam.`,
    scrollCta: {
      label: 'Skatīt modeļus un cenas',
      targetId: 'brand-modeli',
    },
    image: brand.image || null,
  };
}

function getBrandHero(categorySlug, brandSlug) {
  try {
    if (categorySlug === 'telefonu-remonts') {
      const brandContent = getBrandContent(brandSlug, BRAND_CATEGORY.PHONES);
      if (!brandContent) return null;

      const hero = brandContent.hero || {};
      const brandName =
        brandContent.marketingName || brandContent.name || titleize(brandSlug);

      return {
        h1: brandContent.h1 || `${brandName} telefonu remonts`,
        lead: hero.lead || null,
        scrollCta: hero.scrollCta || {
          label: 'Skatīt modeļus un cenas',
          targetId: 'brand-modeli',
        },
        image: hero.image || null,
      };
    }

    if (categorySlug === 'plansetdatoru-remonts') {
      const brandContent = getBrandContent(brandSlug, BRAND_CATEGORY.TABLETS);
      if (!brandContent) return null;

      const hero = brandContent.hero || {};
      const brandName =
        brandContent.marketingName || brandContent.name || titleize(brandSlug);

      return {
        h1: brandContent.h1 || `${brandName} planšetdatoru remonts`,
        lead: hero.lead || null,
        scrollCta: hero.scrollCta || {
          label: 'Skatīt modeļus un cenas',
          targetId: 'brand-modeli',
        },
        image: hero.image || null,
      };
    }

    if (categorySlug === 'datoru-remonts') {
      return getComputerBrandHero(brandSlug);
    }
  } catch {
    return null;
  }

  return null;
}

async function getDeviceByRoute({
  categorySlug,
  secondSeg,
  thirdSeg,
  segmentsLength,
}) {
  // iPhone special route: /iphone-remonts/<device-slug>
  if (categorySlug === 'iphone-remonts' && secondSeg && segmentsLength === 2) {
    const snap = await db
      .collection('devices')
      .where('slug', '==', secondSeg)
      .where('categoryKey', '==', 'telefonu-remonts')
      .where('brandKey', '==', 'apple')
      .limit(1)
      .get();

    if (snap.empty) return null;

    const doc = snap.docs[0];

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  // Generic route: /<category>/<brand>/<device>
  if (categorySlug && secondSeg && thirdSeg && segmentsLength >= 3) {
    const snap = await db
      .collection('devices')
      .where('slug', '==', thirdSeg)
      .where('categoryKey', '==', categorySlug)
      .where('brandKey', '==', secondSeg)
      .limit(1)
      .get();

    if (snap.empty) return null;

    const doc = snap.docs[0];

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  return null;
}

async function hasDevicePrices(deviceSlug) {
  if (!deviceSlug) return false;

  const snap = await db
    .collection('modelServices')
    .where('modelId', '==', deviceSlug)
    .limit(1)
    .get();

  return !snap.empty;
}

async function getDeviceHero(device, locale = 'lv') {
  if (!device) return null;

  const deviceName = pickLocalizedField(device.name, locale) || device.name || '';

  const h1 = pickLocalizedField(device.h1, locale) || `${deviceName} remonts`;

  const lead =
    pickLocalizedField(device.lead, locale) ||
    pickLocalizedField(device.metaDescription, locale) ||
    (locale === 'ru'
      ? `Ремонт ${deviceName}: экран, аккумулятор, зарядка, камера. Быстрая диагностика и гарантия.`
      : `Remontējam ${deviceName}: displejs, baterija, uzlāde, kamera. Ātra diagnostika un garantija.`);

  const hasPrices = await hasDevicePrices(device.slug);

  return {
    h1,
    lead,
    scrollCta: hasPrices
      ? {
          label: 'Skatīt cenas',
          targetId: 'cenas',
        }
      : null,
    image: device.image || null,
  };
}

function makeResult({
  title,
  lead = null,
  scrollCta = null,
  image = null,
  crumbs = [],
  showBreadcrumbs = true,
}) {
  return {
    visible: true,
    title,
    lead,
    scrollCta,
    image,
    crumbs,
    showBreadcrumbs,
  };
}

function getBaseMeta(categorySlug, secondSeg, device = null, locale = 'lv') {
  const category = getCategory(categorySlug);

  const categoryLabel = categorySlug
    ? category?.name || category?.label || titleize(categorySlug)
    : '';

  const brand = getBrand(category, secondSeg);

  const brandLabel =
    brand?.name || brand?.label || (secondSeg ? titleize(secondSeg) : null);

  const deviceLabel = pickLocalizedField(device?.name, locale) || device?.name || null;

  return {
    category,
    categoryLabel,
    brand,
    brandLabel,
    deviceLabel,
  };
}

export async function resolvePageHeader(pathname = '/') {
  const { locale, publicSegments, canonicalSegments, firstInfoCanonical } =
    normalizeRouteIdentity(pathname);

  if (process.env.NODE_ENV !== 'production') {
    console.log('[ROUTE DEBUG]', {
      pathname,
      locale,
      publicSegments,
      canonicalSegments,
      firstInfoCanonical,
    });
  }

  if (publicSegments.length === 0 || canonicalSegments.length === 0) {
    return { visible: false };
  }

  const [categorySlug, secondSeg, thirdSeg] = canonicalSegments;
  const segmentsLength = canonicalSegments.length;

  // Info page
  if (segmentsLength === 1) {
    const infoKey = firstInfoCanonical || '';
    const infoEntry = infoKey ? contentRegistry?.info?.[infoKey] : null;

    if (infoEntry) {
      return makeResult({
        title: infoEntry.h1 || 'iLab',
        lead: infoEntry.lead || null,
        scrollCta: infoEntry.scrollCta || null,
        image: infoEntry.image || null,
        crumbs: [
          {
            label: 'Sākums',
            href: '/',
          },
          {
            label: infoEntry.h1 || titleize(infoKey),
            href: buildInfoHref(locale, infoKey),
          },
        ],
      });
    }
  }

  const { categoryLabel, brandLabel } = getBaseMeta(
    categorySlug,
    secondSeg,
    null,
    locale
  );

  // Category page
  if (segmentsLength === 1) {
    const hero = getCategoryHero(categorySlug);

    if (!hero && !categoryLabel) {
      return { visible: false };
    }

    return makeResult({
      title: hero?.h1 || categoryLabel || titleize(categorySlug),
      lead: hero?.lead || null,
      scrollCta: hero?.scrollCta || null,
      image: hero?.image || null,
      crumbs: [
        {
          label: 'Sākums',
          href: '/',
        },
        {
          label: hero?.h1 || categoryLabel || titleize(categorySlug),
          href: buildCategoryHref(locale, categorySlug),
        },
      ],
    });
  }

  // Service page
  if (segmentsLength === 2) {
    const serviceKey = `${categorySlug}/${secondSeg}`;
    const serviceEntry = contentRegistry?.services?.[serviceKey];

    if (serviceEntry) {
      const categoryHero = getCategoryHero(categorySlug);

      return makeResult({
        title: serviceEntry.h1 || titleize(secondSeg),
        lead: serviceEntry.lead ?? null,
        scrollCta: serviceEntry.scrollCta ?? categoryHero?.scrollCta ?? null,
        image: serviceEntry.image || categoryHero?.image || null,
        crumbs: [
          {
            label: 'Sākums',
            href: '/',
          },
          {
            label: categoryLabel,
            href: buildCategoryHref(locale, categorySlug),
          },
          {
            label: serviceEntry.crumb || serviceEntry.h1 || titleize(secondSeg),
            href: buildServiceHref(locale, categorySlug, secondSeg),
          },
        ],
      });
    }
  }

  // Device page
  const device = await getDeviceByRoute({
    categorySlug,
    secondSeg,
    thirdSeg,
    segmentsLength,
  });

  if (device) {
    const hero = await getDeviceHero(device, locale);
    const deviceName = pickLocalizedField(device.name, locale) || device.name || '';

    const crumbs = [
      {
        label: 'Sākums',
        href: '/',
      },
      {
        label: categoryLabel,
        href: buildCategoryHref(locale, categorySlug),
      },
    ];

    if (categorySlug === 'iphone-remonts' && segmentsLength === 2) {
      crumbs.push({
        label: deviceName,
        href: buildDeviceHref(locale, categorySlug, secondSeg),
      });
    } else {
      if (brandLabel) {
        crumbs.push({
          label: brandLabel,
          href: buildBrandHref(locale, categorySlug, secondSeg),
        });
      }

      crumbs.push({
        label: deviceName,
        href: buildDeviceHref(locale, categorySlug, secondSeg, thirdSeg),
      });
    }

    return makeResult({
      title: hero.h1,
      lead: hero.lead,
      scrollCta: hero.scrollCta,
      image: hero.image,
      crumbs,
    });
  }

  // Brand page
  if (segmentsLength === 2) {
    const hero = getBrandHero(categorySlug, secondSeg);

    if (hero) {
      return makeResult({
        title:
          hero.h1 ||
          `${brandLabel} ${categoryLabel?.toLowerCase?.() || ''}`.trim(),
        lead: hero.lead || null,
        scrollCta: hero.scrollCta || null,
        image: hero.image || null,
        crumbs: [
          {
            label: 'Sākums',
            href: '/',
          },
          {
            label: categoryLabel,
            href: buildCategoryHref(locale, categorySlug),
          },
          {
            label: brandLabel || titleize(secondSeg),
            href: buildBrandHref(locale, categorySlug, secondSeg),
          },
        ],
      });
    }
  }

  return { visible: false };
}