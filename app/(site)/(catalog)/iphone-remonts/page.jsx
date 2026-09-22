import IphoneRepairPage from './IphoneRepairPage';

import JsonLd from '@components/seo/JsonLd';

import { getDevices } from '@/lib/content/devices';
import { getSeriesMetaByCategoryBrand } from '@/lib/content/categories';
import { resolveDedicatedBrandHubPage } from '@/lib/content/resolvers/catalogPages';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import {
  absoluteUrl,
  buildItemListLd,
  buildOfferCatalogLd,
  buildRepairPageJsonLd,
} from '@/lib/seo/jsonld';

import { localizedCategoryPath } from '@/lib/routes/localizedPath';
import { buildCategoryHref } from '@/lib/routes/routeI18n';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';
import { getProcessContent } from '@sections/process/process.i18n';
import { buildIphonePopularServices } from '@sections/services/services.i18n';

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const HUB_KEY = 'iphone-remonts';

const locale = 'lv';

const lvPath = localizedCategoryPath(HUB_KEY, 'lv');
const ruPath = localizedCategoryPath(HUB_KEY, 'ru');

const fallbackMetaTitle = 'iPhone remonts Rīgā | iLab';

const fallbackDescription =
  'iPhone remonts Rīgā - displeja, baterijas, kameras un uzlādes ligzdas maiņa, ūdens bojājumu novēršana. Ātra diagnostika, skaidras cenas un garantija līdz 1 gadam iLab servisā Rīgā.';

const fallbackH1 = 'iPhone remonts Rīgā';

const labels = {
  homeCrumb: 'Sākums',
  imageAlt: 'iPhone remonts Rīgā',
  howToName: 'iPhone remonts',
  howToDescription:
    'Kā iLab servisā Rīgā notiek iPhone remonts: diagnostika, cenas saskaņošana, remonts, pārbaude un garantija.',
  howToSteps: [
    {
      name: 'Diagnostika',
      text: 'Pārbaudām iPhone un nosakām bojājuma iemeslu.',
    },
    {
      name: 'Cena un termiņš',
      text: 'Pirms darba sākšanas saskaņojam remonta cenu un izpildes laiku.',
    },
    {
      name: 'Remonts',
      text: 'Veicam nepieciešamo detaļas maiņu vai remontu, izmantojot kvalitatīvas detaļas.',
    },
    {
      name: 'Pārbaude',
      text: 'Pēc remonta pārbaudām galvenās iPhone funkcijas.',
    },
    {
      name: 'Garantija',
      text: 'Izsniedzam garantiju līdz 1 gadam veiktajam darbam un uzstādītajām detaļām.',
    },
  ],
};

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
  return page?.seo?.h1 || page?.seo?.breadcrumbName || fallbackH1;
}

function getHeaderLead(page) {
  return (
    page?.intro?.lead ||
    page?.seo?.metaDescription ||
    page?.seo?.schemaDescription ||
    null
  );
}

function getServiceDescription(page, headerLead) {
  return (
    page?.seo?.schemaDescription ||
    page?.seo?.metaDescription ||
    headerLead ||
    fallbackDescription
  );
}

function getHeroImage(page) {
  return page?.hero?.image || '/images/categories/iphone_remonts.webp';
}

function getBreadcrumbs(page, headerTitle, baseHref) {
  return [
    {
      label: page?.labels?.homeCrumb || labels.homeCrumb,
      href: '/',
    },
    {
      label: page?.seo?.breadcrumbName || headerTitle,
      href: baseHref,
    },
  ];
}

function getIphoneModelItems(devices = [], baseHref) {
  const seen = new Set();

  return devices
    .filter((device) => {
      if (!device?.slug) return false;
      if (device.brandKey !== BRAND_KEY) return false;
      if (device.categoryKey !== CATEGORY_KEY) return false;
      if (seen.has(device.slug)) return false;

      seen.add(device.slug);
      return true;
    })
    .sort((a, b) => {
      const orderA = Number.isFinite(Number(a.order)) ? Number(a.order) : 9999;
      const orderB = Number.isFinite(Number(b.order)) ? Number(b.order) : 9999;

      if (orderA !== orderB) return orderA - orderB;

      return String(a.name || '').localeCompare(String(b.name || ''), undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    })
    .map((device) => ({
      name: device.name,
      url: `${baseHref}/${device.slug}`,
    }));
}

function getIphoneOfferCatalog(baseHref) {
  const offers = buildIphonePopularServices(locale)
    .filter((service) => service?.title && service?.href)
    .map((service) => {
      const name = service.title.startsWith('iPhone')
        ? service.title
        : `iPhone ${service.title.toLowerCase()}`;

      return {
        name,
        description: service.text,
        serviceType: name,
        url: service.href,
      };
    });

  return buildOfferCatalogLd({
    name: 'iPhone remonta pakalpojumi',
    description: 'Biežākie iPhone remonta pakalpojumi iLab servisā Rīgā.',
    url: baseHref,
    offers,
  });
}

async function getIphoneRepairData() {
  const [page, devicesAll, seriesMeta, faq, reviewsSummary] = await Promise.all([
    resolveDedicatedBrandHubPage(CATEGORY_KEY, BRAND_KEY, locale),
    getDevices(),
    getSeriesMetaByCategoryBrand(CATEGORY_KEY, BRAND_KEY, locale),
    getFaqGroups([{ scopeType: 'category', scopeKey: HUB_KEY }], locale),
    getReviewsSummary(),
  ]);

  return {
    page,
    devicesAll,
    seriesMeta,
    faq,
    reviewsSummary,
  };
}

export async function generateMetadata() {
  const page = await resolveDedicatedBrandHubPage(
    CATEGORY_KEY,
    BRAND_KEY,
    locale
  );

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
  const { page, devicesAll, seriesMeta, faq, reviewsSummary } =
    await getIphoneRepairData();

  if (!page) {
    return null;
  }

  const baseHref = buildCategoryHref(locale, HUB_KEY);

  const headerTitle = getHeaderTitle(page);
  const headerLead = getHeaderLead(page);
  const breadcrumbs = getBreadcrumbs(page, headerTitle, baseHref);

  const pageName = getPageTitle(page);
  const pageDescription = getPageDescription(page);

  const serviceDescription = getServiceDescription(page, headerLead);
  const serviceImage = getHeroImage(page);

  const faqRenderItems = toFaqRenderItems(faq.items);
  const hasVisibleFaq = Boolean(page.sections?.hasFaq && faq.items.length > 0);
  const hasVisibleProcess = Boolean(page.sections?.hasProcess);
  const processContent = getProcessContent(locale);
  const processSteps = processContent.steps.map((step) => ({
    name: step.title,
    text: step.text,
  }));
  const modelItemListLd = buildItemListLd(getIphoneModelItems(devicesAll, baseHref), {
    id: `${absoluteUrl(baseHref)}#iphone-models`,
  });
  const serviceOffers = getIphoneOfferCatalog(baseHref);

  const jsonLd = buildRepairPageJsonLd({
    path: baseHref,
    locale,

    pageName,
    pageDescription,

    breadcrumbs,

    serviceName: 'iPhone remonts Rīgā',
    serviceDescription,
    serviceType: 'iPhone remonts',
    serviceImage,
    serviceOffers,

    faqItems: faq.items,
    includeFaq: hasVisibleFaq,

    includeHowTo: hasVisibleProcess,
    howTo: hasVisibleProcess
      ? {
          name: processContent.title,
          description: `${processContent.title}: ${processSteps
            .map((step) => step.name)
            .join(', ')}.`,
          image: serviceImage,
          steps: processSteps,
        }
      : null,

    extra: [modelItemListLd],
  });

  return (
    <>
      <JsonLd id="iphone-remonts-jsonld" data={jsonLd} />

      <IphoneRepairPage
        locale={locale}
        page={page}
        devicesAll={devicesAll}
        seriesMeta={seriesMeta}
        baseHref={baseHref}
        headerTitle={headerTitle}
        headerLead={headerLead}
        breadcrumbs={breadcrumbs}
        faqTitle={faq.title}
        faqItems={faqRenderItems}
        reviewsSummary={reviewsSummary}
      />
    </>
  );
}
