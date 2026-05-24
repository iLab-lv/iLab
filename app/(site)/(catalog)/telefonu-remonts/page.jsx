import PhoneRepairPage from './PhoneRepairPage';

import JsonLd from '@components/seo/JsonLd';

import { getDevices } from '@/lib/content/devices';
import { resolveCategoryPage } from '@/lib/content/resolvers/catalogPages';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import {
  buildItemListLd,
  buildRepairPageJsonLd,
} from '@/lib/seo/jsonld';

import { buildCategoryHref, buildServiceHref } from '@/lib/routes/routeI18n';
import { localizedCategoryPath } from '@/lib/routes/localizedPath';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

const CATEGORY_KEY = 'telefonu-remonts';

const locale = 'lv';

const lvPath = localizedCategoryPath(CATEGORY_KEY, 'lv');
const ruPath = localizedCategoryPath(CATEGORY_KEY, 'ru');

const fallbackMetaTitle =
  'Telefonu remonts Rīgā - cenas, ātri, garantija | iLab';

const fallbackDescription =
  'Telefonu remonts visiem zīmoliem: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.';

const labels = {
  heroAlt: 'telefonu remonts Rīgā',
  heroBodyHtml:
    '<p><strong>Ātrs un drošs telefonu remonts Rīgā</strong> - ekrāna, baterijas un kameras maiņa tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>',
  introTitle: 'Telefonu remonts - ko mēs darām',
  introLead:
    'Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas saskaņojam pirms darba uzsākšanas, biežākos darbus paveicam tajā pašā dienā. Izvēlies savu zīmolu un atver konkrēta modeļa lapu.',
  introP1:
    'Ikdienā veicam <strong>telefonu remontu</strong> - sākot ar <strong>ekrāna maiņu</strong> un <strong>baterijas nomaiņu</strong>, līdz <strong>uzlādes ligzdas remontam</strong>, <strong>kameras problēmām</strong> un <strong>ūdens bojājumu</strong> novēršanai. Pirms darba saskaņojam <strong>cenu un termiņu</strong>, biežākos darbus paveicam tajā pašā dienā. Uzzini, kā notiek remonts sadaļā <a href="#process-h2">“Kā notiek remonts”</a>.',
  introP2:
    'Strādājam ar <strong>visiem populārajiem zīmoliem</strong>: <a href="/iphone-remonts">iPhone remonts</a>, <a href="/telefonu-remonts/samsung">Samsung telefonu remonts</a>, <a href="/telefonu-remonts/huawei">Huawei remonts</a>, <a href="/telefonu-remonts/oneplus">OnePlus remonts</a> u.c. Katram zīmolam ir pieejamas atsevišķas <strong>modeļu lapas</strong> ar biežākajiem bojājumiem un risinājumiem.',
  introP3:
    'Biežākie darbi: <strong>displeja remonts</strong> (plaisas, tumši plankumi, nereaģē skāriens), <strong>baterijas maiņa</strong> (strauji krīt uzlāde, izslēdzas pie 10–20%), <strong>uzlādes ligzda</strong> (nenoturas kabelis, lēna/nekonsekventa uzlāde), <strong>kamera</strong> (miglaini attēli, fokusēšanās kļūdas), <strong>skaļruņi/mikrofons</strong> (klusa skaņa, krakšķi, sarunās nedzird), kā arī <strong>mitruma bojājumi</strong>. Ja neesi pārliecināts par modeļa nosaukumu, izvēlies zīmolu zemāk un atrodi modeli sarakstā.',
  fallbackTitle: 'Telefonu remonts Rīgā',
  homeCrumb: 'Sākums',
  serviceName: 'Telefonu remonts',
  serviceDescription:
    'Telefonu remonts - displeji, baterijas, uzlādes ligzdas, kameras un citi darbi. Ātra diagnostika, godīgas cenas, garantija.',
  serviceType: 'Telefonu remonts',
  servicesTitle: 'Populārākie remonti',
  faqTitle: 'Biežāk uzdotie jautājumi',
  processTitle: 'Kā notiek remonts',
  processSteps: [
    {
      title: 'Diagnostika',
      text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.',
    },
    {
      title: 'Cena un termiņš',
      text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
    },
    {
      title: 'Remonts',
      text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.',
    },
    {
      title: 'Pārbaude',
      text: 'Pēc remonta testējam visu funkcionalitāti un drošību.',
    },
    {
      title: 'Garantija',
      text: '90 dienu garantija un ieteikumi turpmākai lietošanai.',
    },
  ],
  scrollCta: {
    label: 'Skatīt zīmolus',
    targetId: 'brand-list',
  },
  imageAlt: 'Telefonu remonts Rīgā',
};

const servicesItems = [
  {
    title: 'Displeja (ekrāna) maiņa',
    text: 'plaisas, tumši plankumi, nereaģē skāriens.',
    icon: LuSmartphone,
    href: buildServiceHref(locale, CATEGORY_KEY, 'ekrana-maina'),
  },
  {
    title: 'Akumulatora maiņa',
    text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
    icon: LuBatteryCharging,
    href: buildServiceHref(locale, CATEGORY_KEY, 'baterijas-maina'),
  },
  {
    title: 'Uzlādes ligzda',
    text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
    icon: LuPlugZap,
    href: buildServiceHref(locale, CATEGORY_KEY, 'uzlades-ligzdas-maina'),
  },
  {
    title: 'Kamera',
    text: 'miglaini attēli, fokusēšanās problēmas.',
    icon: LuCamera,
    href: buildServiceHref(locale, CATEGORY_KEY, 'kameras-remonts'),
  },
  {
    title: 'Skaļruņi/mikrofons',
    text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
    icon: LuVolume2,
    href: buildServiceHref(locale, CATEGORY_KEY, 'skalruni-mikrofona-remonts'),
  },
  {
    title: 'Ūdens bojājumi',
    text: 'diagnostika un atjaunošana, ja tas iespējams.',
    icon: LuDroplets,
    href: buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts'),
  },
];

function pickLocalized(value, locale = 'lv', fallback = '') {
  if (value == null) return fallback;

  if (typeof value === 'string') return value || fallback;

  if (typeof value === 'object') {
    return (
      value?.[locale] ??
      value?.lv ??
      Object.values(value).find(Boolean) ??
      fallback
    );
  }

  return fallback;
}

function sortDevices(list = []) {
  return [...list].sort((a, b) => {
    const ao = typeof a.order === 'number' ? a.order : 99999;
    const bo = typeof b.order === 'number' ? b.order : 99999;

    if (ao !== bo) return ao - bo;

    if (a.year && b.year && a.year !== b.year) {
      return b.year - a.year;
    }

    return String(a.name || '').localeCompare(String(b.name || ''), 'lv');
  });
}

function getPhoneBrandHref({ brandKey, locale = 'lv', basePath }) {
  if (brandKey === 'apple') {
    return locale === 'ru' ? '/ru/remont-iphone' : '/iphone-remonts';
  }

  return `${basePath}/${brandKey}`;
}

function buildBrandBlocks({ category, devices, locale = 'lv', basePath }) {
  const categoryBrands = Array.isArray(category?.brands) ? category.brands : [];

  const phoneDevices = devices.filter((device) => {
    if (!device) return false;
    if (device.type !== 'device') return false;
    if (device.categoryKey !== CATEGORY_KEY) return false;
    if (!device.brandKey || !device.slug || !device.name) return false;
    if (device.isHidden === true) return false;
    return true;
  });

  const devicesByBrand = new Map();

  for (const device of phoneDevices) {
    const brandKey = String(device.brandKey).trim().toLowerCase();

    if (!brandKey) continue;

    if (!devicesByBrand.has(brandKey)) {
      devicesByBrand.set(brandKey, []);
    }

    devicesByBrand.get(brandKey).push(device);
  }

  return categoryBrands
    .map((brand) => {
      const brandKey = String(brand?.key || '').trim().toLowerCase();

      if (!brandKey) return null;

      const brandDevices = sortDevices(devicesByBrand.get(brandKey) || []);

      if (!brandDevices.length) return null;

      const href = getPhoneBrandHref({
        brandKey,
        locale,
        basePath,
      });

      return {
        slug: brandKey,
        name: pickLocalized(brand?.labels, locale, brandKey),
        href,
        items: brandDevices.slice(0, 4),
        total: brandDevices.length,
        order: Number.isFinite(Number(brand?.order))
          ? Number(brand.order)
          : 9999,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}

function getPageTitle(page) {
  return (
    page?.seo?.metaTitle ||
    page?.seo?.title ||
    page?.seo?.h1 ||
    page?.seo?.breadcrumbName ||
    fallbackMetaTitle
  );
}

function getPageDescription(page) {
  return (
    page?.seo?.metaDescription ||
    page?.seo?.description ||
    page?.seo?.schemaDescription ||
    fallbackDescription
  );
}

function getHeaderTitle(page) {
  return page?.seo?.h1 || page?.seo?.breadcrumbName || labels.fallbackTitle;
}

function getHeaderLead(page) {
  return (
    page?.intro?.lead ||
    page?.seo?.metaDescription ||
    page?.seo?.schemaDescription ||
    null
  );
}

function getServiceName(page) {
  return (
    page?.seo?.schemaName ||
    page?.seo?.h1 ||
    page?.seo?.breadcrumbName ||
    labels.serviceName
  );
}

function getServiceDescription(page) {
  return (
    page?.seo?.schemaDescription ||
    page?.seo?.metaDescription ||
    labels.serviceDescription
  );
}

function getServiceType(page) {
  return page?.seo?.serviceType || getServiceName(page) || labels.serviceType;
}

function getHeroImage(page) {
  return page?.hero?.image || '/images/categories/telefonu_remonts.webp';
}

function getBreadcrumbs(page, headerTitle, basePath) {
  return [
    {
      label: page?.labels?.homeCrumb || labels.homeCrumb,
      href: '/',
    },
    {
      label: page?.seo?.breadcrumbName || headerTitle,
      href: basePath,
    },
  ];
}

async function getPhoneRepairData() {
  const [page, devices, faq] = await Promise.all([
    resolveCategoryPage(CATEGORY_KEY, locale),
    getDevices(),
    getFaqGroups([{ scopeType: 'category', scopeKey: CATEGORY_KEY }], locale),
  ]);

  return {
    page,
    devices,
    faq,
  };
}

export async function generateMetadata() {
  const page = await resolveCategoryPage(CATEGORY_KEY, locale);

  const title = getPageTitle(page);
  const description = getPageDescription(page);

  const image = page?.seo?.ogImage || '/images/og/home.jpg';

  const imageAlt =
    page?.seo?.ogImageAlt ||
    page?.seo?.imageAlt ||
    page?.seo?.breadcrumbName ||
    labels.imageAlt;

  return buildSeoMetadata({
    locale,
    title,
    description,
    lvPath,
    ruPath,
    image,
    imageAlt,
  });
}

export default async function Page() {
  const { page, devices, faq } = await getPhoneRepairData();

  if (!page) {
    return null;
  }

  const basePath = buildCategoryHref(locale, CATEGORY_KEY);

  const brandBlocks = buildBrandBlocks({
    category: page.source?.category,
    devices,
    locale,
    basePath,
  });

  const headerTitle = getHeaderTitle(page);
  const headerLead = getHeaderLead(page);
  const breadcrumbs = getBreadcrumbs(page, headerTitle, basePath);

  const faqRenderItems = toFaqRenderItems(faq.items);
  const hasVisibleFaq = Boolean(page.sections?.hasFaq && faq.items.length > 0);
  const hasVisibleProcess = Boolean(page.sections?.hasProcess);

  const itemListLd = buildItemListLd(
    brandBlocks.map((brand) => ({
      name: `${brand.name} telefonu remonts`,
      url: brand.href,
    })),
    {
      id: `${basePath}#brand-list`,
    }
  );

  const jsonLd = buildRepairPageJsonLd({
    path: basePath,
    locale,

    pageName: getPageTitle(page),
    pageDescription: getPageDescription(page),

    breadcrumbs,

    serviceName: getServiceName(page),
    serviceDescription: getServiceDescription(page),
    serviceType: getServiceType(page),
    serviceImage: getHeroImage(page),

    faqItems: faq.items,
    includeFaq: hasVisibleFaq,

    includeHowTo: hasVisibleProcess,
    howTo: hasVisibleProcess
      ? {
          name: labels.serviceName,
          description: labels.serviceDescription,
          image: getHeroImage(page),
          steps: labels.processSteps.map((step) => ({
            name: step.title,
            text: step.text,
          })),
        }
      : null,

    extra: [itemListLd],
  });

  return (
    <>
      <JsonLd id="telefonu-remonts-jsonld" data={jsonLd} />

      <PhoneRepairPage
        locale={locale}
        page={page}
        headerTitle={headerTitle}
        headerLead={headerLead}
        breadcrumbs={breadcrumbs}
        brandBlocks={brandBlocks}
        faqTitle={faq.title}
        faqItems={faqRenderItems}
        labels={labels}
        servicesItems={servicesItems}
      />
    </>
  );
}