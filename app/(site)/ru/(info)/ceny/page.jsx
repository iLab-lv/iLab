import CenasPage, {
  getCenasPageStrings,
} from '@site/(info)/cenas/CenasPage';

import JsonLd from '@components/seo/JsonLd';

import categories from '@/data/categories';
import devices from '@/data/devices';

import { db } from '@/lib/firebaseAdmin';

import { absoluteUrl, buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';

const locale = 'ru';

const labels = getCenasPageStrings(locale);

const lvPath = '/cenas';
const ruPath = '/ru/ceny';

function titleCaseSlug(slug = '') {
  const txt = String(slug || '').replace(/[-_]+/g, ' ').trim();

  if (!txt) return '-';

  return txt
    .split(' ')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

function getPickerBrandSlug(device) {
  const raw =
    device?.originalBrandSlug ||
    device?.brandSlug ||
    device?.brandKey ||
    '';

  const slug = String(raw).toLowerCase().trim();

  if (
    slug === 'apple' &&
    String(device?.category || '').toLowerCase().trim() === 'telefonu-remonts'
  ) {
    return 'iphone';
  }

  return slug;
}

function getAllBrandOptions() {
  const nameBySlug = new Map();

  if (Array.isArray(categories)) {
    for (const category of categories) {
      const list = Array.isArray(category?.brands) ? category.brands : [];

      for (const brand of list) {
        const slug = String(brand?.brandSlug || brand?.slug || '')
          .toLowerCase()
          .trim();

        const name = String(brand?.name || '').trim();

        if (slug && name && !nameBySlug.has(slug)) {
          nameBySlug.set(slug, name);
        }
      }
    }
  }

  nameBySlug.set('iphone', 'iPhone');
  nameBySlug.set('ipad', 'iPad');
  nameBySlug.set('macbook', 'MacBook');

  const slugsWithDevices = new Set(
    (Array.isArray(devices) ? devices : [])
      .map((device) => getPickerBrandSlug(device))
      .filter(Boolean)
  );

  const BRAND_ORDER = ['iphone', 'ipad', 'macbook', 'samsung', 'huawei'];

  const brandOptions = Array.from(slugsWithDevices)
    .sort((a, b) => {
      const ai = BRAND_ORDER.indexOf(a);
      const bi = BRAND_ORDER.indexOf(b);

      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;

      return a.localeCompare(b);
    })
    .map((slug) => {
      const name = nameBySlug.get(slug) || titleCaseSlug(slug);

      return {
        slug,
        name,
        brandSlug: slug,
        label: name,
      };
    });

  const hasIphone = brandOptions.some((brand) => brand.slug === 'iphone');
  const defaultBrand = hasIphone ? 'iphone' : brandOptions[0]?.slug || 'iphone';

  return {
    brandOptions,
    defaultBrand,
  };
}

async function getServiceMetaMap() {
  const snap = await db
    .collection('services')
    .where('isActive', '==', true)
    .get();

  const map = {};

  snap.forEach((doc) => {
    const data = doc.data() || {};

    map[doc.id] = {
      id: doc.id,
      labels: {
        lv: data.labels?.lv || '',
        ru: data.labels?.ru || '',
      },
      order: typeof data.order === 'number' ? data.order : 9999,
      categoryId: data.categoryId || '',
    };
  });

  return map;
}

async function getAllPricing() {
  const pricing = {};

  for (const device of Array.isArray(devices) ? devices : []) {
    const slug = String(device?.slug || '').trim();

    if (slug) {
      pricing[slug] = { items: [] };
    }
  }

  const snap = await db.collection('servicePricing').get();

  snap.forEach((doc) => {
    const data = doc.data() || {};
    const modelId = data.modelId;
    const serviceId = data.serviceId;

    if (!modelId || !serviceId) return;

    if (!pricing[modelId]) {
      pricing[modelId] = { items: [] };
    }

    pricing[modelId].items.push({
      id: serviceId,
      price:
        typeof data.price === 'number' && Number.isFinite(data.price)
          ? data.price
          : null,
      isStartingFrom: data.isStartingFrom === true,
      isHidden: data.isHidden === true,
      categoryId: data.categoryId || '',
    });
  });

  return pricing;
}

async function resolveSearchParams(searchParams) {
  return searchParams && typeof searchParams.then === 'function'
    ? await searchParams
    : searchParams || {};
}

function buildBreadcrumbsLd(breadcrumbs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

function buildWebPageLd(strings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(strings.servicePath)}#webpage`,
    url: absoluteUrl(strings.servicePath),
    name: strings.pageName,
    description: strings.pageDescription,
  };
}

function buildFaqLd(strings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(strings.servicePath)}#faq`,
    mainEntity: strings.faqItems.map(({ q, a }, index) => ({
      '@type': 'Question',
      '@id': `${absoluteUrl(strings.servicePath)}#faq-q${index + 1}`,
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}

async function getCenasData(searchParams) {
  const resolvedSearchParams = await resolveSearchParams(searchParams);

  const { brandOptions, defaultBrand } = getAllBrandOptions();

  const [serviceMeta, pricing] = await Promise.all([
    getServiceMetaMap(),
    getAllPricing(),
  ]);

  const normalizedDevices = (Array.isArray(devices) ? devices : []).map(
    (device) => ({
      ...device,
      pickerBrandSlug: getPickerBrandSlug(device),
    })
  );

  const brandFromUrl =
    typeof resolvedSearchParams?.brand === 'string'
      ? resolvedSearchParams.brand.toLowerCase().trim()
      : '';

  const isValidBrand = brandFromUrl
    ? brandOptions.some(
        (brand) =>
          brand.slug === brandFromUrl || brand.brandSlug === brandFromUrl
      )
    : false;

  const stableDefaultBrand = isValidBrand ? brandFromUrl : defaultBrand;

  const breadcrumbs = [
    {
      label: labels.homeCrumb,
      href: '/ru',
    },
    {
      label: labels.pageCrumb,
      href: labels.servicePath,
    },
  ];

  const jsonLd = [
    buildBreadcrumbsLd(breadcrumbs),
    buildWebPageLd(labels),
    buildFaqLd(labels),
  ];

  return {
    breadcrumbs,
    jsonLd,
    devices: normalizedDevices,
    pricing,
    serviceMeta,
    brandOptions,
    defaultBrand: stableDefaultBrand,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata({
    locale,
    title: labels.metaTitle,
    description: labels.metaDescription,
    lvPath,
    ruPath,
  });
}

export default async function Page({ searchParams }) {
  const data = await getCenasData(searchParams);

  return (
    <>
      <JsonLd id="ceny-jsonld" data={data.jsonLd} />

      <CenasPage
        locale={locale}
        labels={labels}
        breadcrumbs={data.breadcrumbs}
        devices={data.devices}
        pricing={data.pricing}
        serviceMeta={data.serviceMeta}
        brandOptions={data.brandOptions}
        defaultBrand={data.defaultBrand}
      />
    </>
  );
}