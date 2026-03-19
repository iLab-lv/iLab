// app/(site)/ui/page-header/resolvePageHeader.js
import categories from '@/data/categories';
import contentRegistry from '@/data/contentRegistry';
import categoryContent from '@/data/categoryContent';
import { getBrandContent, BRAND_CATEGORY } from '@/data/brandContent';
import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';

import {
  normalizeRouteIdentity,
  buildCategoryHref,
  buildInfoHref,
  buildServiceHref,
  buildBrandHref,
  buildDeviceHref,
} from '@/lib/routes/routeI18n';

const norm = (s = '') => decodeURIComponent(String(s)).trim().toLowerCase();

const titleize = (str) =>
  (str || '')
    .replace(/-/g, ' ')
    .replace(/[_+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\p{L}/gu, (c) => c.toUpperCase());

function getCategory(slug) {
  if (!slug || !categories) return null;
  if (Array.isArray(categories)) return categories.find((c) => c.slug === slug) || null;
  return categories[slug] || null;
}

function getBrand(category, brandSlug) {
  if (!category || !brandSlug || !Array.isArray(category.brands)) return null;
  return category.brands.find((b) => (b.brandSlug || b.slug) === brandSlug) || null;
}

function getCategoryHero(categorySlug) {
  const registryHero = contentRegistry?.categories?.[categorySlug]?.hero || null;
  if (registryHero) return registryHero;

  const legacy = categoryContent?.[categorySlug];
  if (!legacy) return null;

  return {
    h1: legacy.h1 || legacy.hero?.h1 || null,
    lead: legacy.lead || legacy.hero?.lead || null,
    scrollCta: legacy.scrollCta || legacy.hero?.scrollCta || null,
    image: legacy.image || legacy.hero?.image || null,
  };
}

function getComputerBrandHero(brandSlug) {
  const category = Array.isArray(categories)
    ? categories.find((c) => c.slug === 'datoru-remonts')
    : categories?.['datoru-remonts'];

  if (!category || !Array.isArray(category.brands)) return null;

  const brand =
    category.brands.find((b) => norm(b.brandSlug || '') === norm(brandSlug)) || null;

  if (!brand) return null;

  const brandName = brand.name || titleize(brandSlug);

  return {
    h1: `${brandName} datoru remonts`,
    lead:
      brand.lead ||
      `Profesionāls ${brandName} datoru remonts Rīgā — portatīvie un galda datori, ekrāns, dzesēšana, diski un programmatūra. Bezmaksas diagnostika un 90 dienu garantija.`,
    scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'brand-modeli' },
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

function resolveDevice(categorySlug, secondSeg, thirdSeg, segmentsLength) {
  // iPhone special route: /iphone-remonts/<device-slug>
  if (categorySlug === 'iphone-remonts' && secondSeg && segmentsLength === 2) {
    return (
      devices.find(
        (device) =>
          norm(device.slug) === secondSeg &&
          device.category === 'telefonu-remonts' &&
          (device.brandSlug === 'apple' || device.brand === 'Apple')
      ) || null
    );
  }

  // generic route: /<category>/<brand>/<device>
  if (categorySlug && secondSeg && thirdSeg && segmentsLength >= 3) {
    return (
      devices.find(
        (device) =>
          norm(device.slug) === thirdSeg &&
          device.category === categorySlug &&
          norm(device.brandSlug || '') === secondSeg
      ) || null
    );
  }

  return null;
}

function getDeviceHero(device) {
  if (!device) return null;

  const pricing = devicePricing?.[device.slug];
  const hasPrices = pricing && Array.isArray(pricing.items) && pricing.items.length > 0;

  return {
    h1: `${device.name} remonts`,
    lead:
      device.metaDescription ||
      `Remontējam ${device.name}: displejs, baterija, uzlāde, kamera. Ātra diagnostika un garantija.`,
    scrollCta: hasPrices ? { label: 'Skatīt cenas', targetId: 'cenas' } : null,
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

function getBaseMeta(categorySlug, secondSeg, device = null) {
  const category = getCategory(categorySlug);
  const categoryLabel = categorySlug
    ? category?.name || category?.label || titleize(categorySlug)
    : '';

  const brand = getBrand(category, secondSeg);
  const brandLabel =
    brand?.name || brand?.label || (secondSeg ? titleize(secondSeg) : null);

  const deviceLabel = device?.name || null;

  return {
    category,
    categoryLabel,
    brand,
    brandLabel,
    deviceLabel,
  };
}

export function resolvePageHeader(pathname = '/') {
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

  // info page
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
          { label: 'Sākums', href: '/' },
          {
            label: infoEntry.h1 || titleize(infoKey),
            href: buildInfoHref(locale, infoKey),
          },
        ],
      });
    }
  }

  const { categoryLabel, brandLabel } = getBaseMeta(categorySlug, secondSeg);

  // category page
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
        { label: 'Sākums', href: '/' },
        {
          label: hero?.h1 || categoryLabel || titleize(categorySlug),
          href: buildCategoryHref(locale, categorySlug),
        },
      ],
    });
  }

  // service page
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
          { label: 'Sākums', href: '/' },
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

  // device page
  const device = resolveDevice(categorySlug, secondSeg, thirdSeg, segmentsLength);

  if (device) {
    const hero = getDeviceHero(device);
    const crumbs = [
      { label: 'Sākums', href: '/' },
      {
        label: categoryLabel,
        href: buildCategoryHref(locale, categorySlug),
      },
    ];

    if (categorySlug === 'iphone-remonts' && segmentsLength === 2) {
      crumbs.push({
        label: device.name,
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
        label: device.name,
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

  // brand page
  if (segmentsLength === 2) {
    const hero = getBrandHero(categorySlug, secondSeg);

    if (hero) {
      return makeResult({
        title: hero.h1 || `${brandLabel} ${categoryLabel?.toLowerCase?.() || ''}`.trim(),
        lead: hero.lead || null,
        scrollCta: hero.scrollCta || null,
        image: hero.image || null,
        crumbs: [
          { label: 'Sākums', href: '/' },
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