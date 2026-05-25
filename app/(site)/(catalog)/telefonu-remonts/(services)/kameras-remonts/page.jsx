import PhoneCameraServicePage from './PhoneCameraServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getCategoryBySlug } from '@/lib/content/categories';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const CATEGORY_KEY = 'telefonu-remonts';
const SERVICE_KEY = 'kameras-remonts';

const routePath = '/telefonu-remonts/kameras-remonts';
const ruPath = '/ru/remont-telefonov/remont-kamery';
const categoryPath = '/telefonu-remonts';

const strings = {
  servicePath: routePath,
  categoryPath,
  allModelsHref: '/telefonu-remonts#brand-list',

  title: 'Telefonu kameras remonts Rīgā | iLab',
  description:
    'Miglaini attēli, fokusēšanās problēmas vai nedarbojas kamera? Telefonu kameras remonts un maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',

  pageTitle: 'Telefonu kameras remonts Rīgā',
  pageDescription:
    'Miglaini attēli, fokusēšanās problēmas vai nedarbojas kamera? Telefonu kameras remonts un maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',

  homeCrumb: 'Sākums',
  categoryCrumb: 'Telefonu remonts',
  pageCrumb: 'Kameras remonts',

  headerTitle: 'Telefonu kameras remonts Rīgā',
  headerLead:
    'Remontējam telefonu kameru, ja attēli ir miglaini, ir fokusēšanās problēmas, bojāts kameras stikliņš vai kamera rāda kļūdu. Pirms remonta veicam diagnostiku un pēc remonta sniedzam 90 dienu garantiju.',
  headerCtaLabel: 'Skatīt cenas',

  heroAlt: 'Telefonu kameras remonts Rīgā',
  heroImage: '/images/categories/kameras_remonts.webp',
  heroBodyHtml:
    '<p><strong>Telefonu kameras remonts Rīgā</strong> - miglains attēls, bojāts stikliņš vai fokusēšanās problēmas? Veicam diagnostiku un nepieciešamības gadījumā <strong>kameras moduļa vai stikliņa maiņu</strong>. Bezmaksas pārbaude un <strong>90 dienu garantija</strong>.</p>',

  introTitle: 'Telefonu kameras remonts Rīgā',
  introP1:
    'Simptomi, kas norāda uz <strong>kameras bojājumu</strong>: <strong>miglains vai graudains attēls</strong>, <strong>nepareizas krāsas</strong>, <strong>švīkas vai putekļi kadrā</strong>, <strong>autofokuss “sūc”</strong>, melns ekrāns kamerā vai kameras lietotne <strong>aizveras ar kļūdu</strong>. Ja bojāts ir tikai <strong>stikliņš</strong>, parasti pietiek ar stikliņa maiņu; ja bojāts ir pats kameras modulis, nepieciešama <strong>kameras nomaiņa</strong>.',
  introP2:
    'Pēc remonta pārbaudām fokusēšanos, stabilizāciju, foto un video kvalitāti, kā arī kameras lietotnes darbību. Populāros modeļus parasti salabojam <strong>1–3 stundu</strong> laikā. Visam veicamajam darbam un detaļām ir <strong>90 dienu garantija</strong>.',

  selectedModelPrefix: 'Atlasīts modelis:',
  selectedModelSuffix: 'Ritiniet uz',
  selectedModelLink: 'cenām',

  brandPickerTitle: 'Izvēlies zīmolu',
  pricelistTitle: 'Kameras remonta cenas pēc modeļa',
  pricelistIntro:
    'Izvēlies zīmolu un modeli, lai redzētu kameras remonta vai nomaiņas cenu.',
  ctaLabel: 'Pieteikties remontam',

  processTitle: 'Kā notiek kameras remonts',
  processSteps: [
    {
      title: 'Diagnostika',
      text: 'Pārbaudām kameras moduli, stikliņu, savienojumus un kameras lietotni, lai precīzi noteiktu bojājumu.',
    },
    {
      title: 'Cena un termiņš',
      text: 'Saskaņojam, vai mainīt stikliņu vai visu moduli, kā arī izmaksas un izpildes laiku pirms darba uzsākšanas.',
    },
    {
      title: 'Remonts vai maiņa',
      text: 'Veicam kameras moduļa vai stikliņa maiņu, attīrām putekļus un nosēdumus, nepieciešamības gadījumā atjaunojam blīvējumu.',
    },
    {
      title: 'Pārbaude',
      text: 'Testējam fokusu, attēla asumu, stabilizāciju, krāsas un video režīmus, lai pārliecinātos, ka kamera atkal strādā korekti.',
    },
    {
      title: 'Garantija',
      text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus kameras saudzīgai lietošanai.',
    },
  ],

  faqTitle: 'Biežāk uzdotie jautājumi',

  serviceName: 'Telefonu kameras remonts Rīgā',
  serviceType: 'Telefonu kameras remonts',
  serviceDescription:
    'Telefonu kameras remonts un maiņa Rīgā: miglaini attēli, fokusēšanās problēmas, bojāts stikliņš. Bezmaksas diagnostika un 90 dienu garantija.',

  processHowToName: 'Telefonu kameras remonta process iLab',
  processHowToDescription:
    'Kā soli pa solim notiek telefonu kameras remonts un maiņa iLab servisā Rīgā.',

  applyAria: 'Pieteikties remontam',
};

function pickLocalized(value, locale = 'lv', fallback = '') {
  if (value == null) return fallback;

  if (typeof value === 'string') {
    return value || fallback;
  }

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

function dedupeFaqItems(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const key = String(item?.q || item?.question || '')
      .trim()
      .toLowerCase();

    if (!key || seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

async function getPhoneDevices() {
  const snap = await db
    .collection('devices')
    .where('categoryKey', '==', CATEGORY_KEY)
    .get();

  return snap.docs
    .map((doc) => {
      const data = doc.data() || {};

      return {
        id: doc.id,
        slug: data.slug || doc.id,
        name: data.name || '',
        image: data.image || '',
        year: typeof data.year === 'number' ? data.year : null,
        brandSlug: data.brandKey || data.brandSlug || '',
        category: data.categoryKey || CATEGORY_KEY,
        series: data.seriesLabel || data.originalSeriesLabel || '',
        isHidden: data.isHidden === true,
      };
    })
    .filter((device) => device.slug && device.brandSlug && !device.isHidden);
}

async function getPhoneBrandOptions(devices = []) {
  const category = await getCategoryBySlug(CATEGORY_KEY);
  const categoryBrands = Array.isArray(category?.brands) ? category.brands : [];

  const devicesByBrand = new Set(
    devices
      .map((device) => String(device.brandSlug || '').trim().toLowerCase())
      .filter(Boolean)
  );

  const brandOptions = categoryBrands
    .map((brand) => {
      const slug = String(brand?.key || brand?.slug || '').trim().toLowerCase();

      if (!slug || !devicesByBrand.has(slug)) {
        return null;
      }

      return {
        slug,
        name: pickLocalized(brand.labels, locale, brand.name || slug),
        order: Number.isFinite(Number(brand.order)) ? Number(brand.order) : 9999,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order)
    .map(({ slug, name }) => ({ slug, name }));

  const hasSamsung = brandOptions.some((brand) => brand.slug === 'samsung');

  return {
    brandOptions,
    defaultBrand: hasSamsung ? 'samsung' : brandOptions[0]?.slug || 'samsung',
  };
}

function buildBreadcrumbs() {
  return [
    {
      label: strings.homeCrumb,
      href: '/',
    },
    {
      label: strings.categoryCrumb,
      href: strings.categoryPath,
    },
    {
      label: strings.pageCrumb,
      href: strings.servicePath,
    },
  ];
}

function buildFaqSections(faqGroups = []) {
  return faqGroups
    .filter((group) => Array.isArray(group.items) && group.items.length > 0)
    .map((group, index) => ({
      id: group.id || group.docId || `faq-group-${index + 1}`,
      title: group.title,
      items: toFaqRenderItems(group.items),
      rawItems: group.items,
    }));
}

async function getPhoneCameraServiceData({ selectedModel }) {
  const [devices, faq] = await Promise.all([
    getPhoneDevices(),
    getFaqGroups(
      [
        { scopeType: 'service', scopeKey: SERVICE_KEY },
        { scopeType: 'basic' },
      ],
      locale
    ),
  ]);

  const { brandOptions, defaultBrand } = await getPhoneBrandOptions(devices);

  const faqSections = buildFaqSections(faq.groups);

  const mergedFaqItems = dedupeFaqItems(
    faqSections.flatMap((section) => section.rawItems || [])
  );

  const breadcrumbs = buildBreadcrumbs();

  const hasVisibleFaq = mergedFaqItems.length > 0;

  const jsonLd = buildRepairPageJsonLd({
    path: strings.servicePath,
    locale,

    pageName: strings.title,
    pageDescription: strings.description,

    breadcrumbs,

    serviceName: strings.serviceName,
    serviceDescription: strings.serviceDescription,
    serviceType: strings.serviceType,
    serviceImage: strings.heroImage,

    faqItems: mergedFaqItems,
    includeFaq: hasVisibleFaq,

    includeHowTo: true,
    howTo: {
      name: strings.processHowToName,
      description: strings.processHowToDescription,
      image: strings.heroImage,
      steps: strings.processSteps.map((step) => ({
        name: step.title,
        text: step.text,
      })),
    },
  });

  return {
    strings,

    devices,
    brandOptions,
    defaultBrand,
    selectedModel,

    breadcrumbs,

    faqSections,
    hasVisibleFaq,

    jsonLd,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata({
    locale,
    title: strings.title,
    description: strings.description,
    lvPath: routePath,
    ruPath,
    image: '/images/og/home.jpg',
    imageAlt: strings.heroAlt,
  });
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const selectedModel = resolvedSearchParams?.model
    ? String(resolvedSearchParams.model)
    : null;

  const data = await getPhoneCameraServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="phone-camera-service-jsonld" data={data.jsonLd} />

      <PhoneCameraServicePage locale={locale} {...data} />
    </>
  );
}