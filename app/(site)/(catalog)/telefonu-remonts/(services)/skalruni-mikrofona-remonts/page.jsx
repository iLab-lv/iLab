import PhoneAudioServicePage from './PhoneAudioServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getCategoryBySlug } from '@/lib/content/categories';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const CATEGORY_KEY = 'telefonu-remonts';
const SERVICE_KEY = 'skalruni-mikrofona-remonts';

const routePath = '/telefonu-remonts/skalruni-mikrofona-remonts';
const ruPath = '/ru/remont-telefonov/remont-dinamika-mikrofona';
const categoryPath = '/telefonu-remonts';

const strings = {
  servicePath: routePath,
  categoryPath,
  allModelsHref: '/telefonu-remonts#brand-list',

  title: 'Telefonu skaļruņu un mikrofona remonts Rīgā | iLab',
  description:
    'Klusa skaņa, krakšķi vai sarunās nedzird? Telefonu skaļruņu un mikrofona remonts un tīrīšana Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',

  pageTitle: 'Telefonu skaļruņu un mikrofona remonts Rīgā',
  pageDescription:
    'Klusa skaņa, krakšķi vai sarunās nedzird? Telefonu skaļruņu un mikrofona remonts un tīrīšana Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',

  homeCrumb: 'Sākums',
  categoryCrumb: 'Telefonu remonts',
  pageCrumb: 'Skaļruņu un mikrofona remonts',

  headerTitle: 'Telefonu skaļruņu un mikrofona remonts Rīgā',
  headerLead:
    'Remontējam telefonu skaļruni un mikrofonu, ja skaņa ir klusa, kropļota, ar krakšķiem vai sarunās nedzird. Pirms remonta veicam diagnostiku un pēc remonta sniedzam 90 dienu garantiju.',
  headerCtaLabel: 'Skatīt cenas',

  heroAlt: 'Telefonu skaļruņu un mikrofona remonts Rīgā',
  heroImage: '/images/categories/mikrofona_remonts.webp',
  heroBodyHtml:
    '<p><strong>Skaļruņu un mikrofona remonts Rīgā</strong> - ja sarunās nedzird, skaņa ir klusa, ar krakšķiem vai balss ierakstā ir troksnis, veiksim tīrīšanu vai moduļu nomaiņu. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>',

  introTitle: 'Telefonu skaļruņu un mikrofona remonts',
  introP1:
    'Tipiski simptomi: <strong>klusa skaņa</strong>, <strong>kropļota skaņa</strong>, <strong>krakšķi</strong>, <strong>sarunās nedzird</strong> vai dzird ar <strong>spēcīgu fonu/troksni</strong>, kā arī <strong>balss ieraksts bez skaņas</strong>. Bieži pietiek ar <strong>skaļruņu un mikrofonu restīšu tīrīšanu</strong>, taču, ja modulis ir bojāts vai oksidējies, veicam <strong>skaļruņa vai mikrofona nomaiņu</strong>.',
  introP2:
    'Pēc remonta pārbaudām zvanu skaļruni, mediju skaļruni, visus mikrofonus un trokšņu slāpēšanu dažādos scenārijos: sarunas, skaļrunis un balss ieraksts. Populāros modeļus parasti salabojam <strong>45–90 minūšu</strong> laikā. Visam veicamajam darbam un detaļām ir <strong>90 dienu garantija</strong>.',

  selectedModelPrefix: 'Atlasīts modelis:',
  selectedModelSuffix: 'Ritiniet uz',
  selectedModelLink: 'cenām',

  brandPickerTitle: 'Izvēlies zīmolu',
  pricelistTitle: 'Skaļruņu un mikrofona remonta cenas pēc modeļa',
  pricelistIntro:
    'Izvēlies zīmolu un modeli, lai redzētu skaļruņu un mikrofona tīrīšanas vai nomaiņas cenu.',
  ctaLabel: 'Pieteikties remontam',

  processTitle: 'Kā notiek skaļruņu un mikrofona remonts',
  processSteps: [
    {
      title: 'Diagnostika',
      text: 'Pārbaudām skaļruņus, mikrofonu(-us), restītes, kontaktus un ligzdas; testējam zvanu, mediju skaņu un balss ierakstu.',
    },
    {
      title: 'Cena un termiņš',
      text: 'Paskaidrojam, vai pietiek ar tīrīšanu vai nepieciešama moduļa nomaiņa, vienojamies par izmaksām un izpildes laiku pirms darba uzsākšanas.',
    },
    {
      title: 'Remonts vai nomaiņa',
      text: 'Veicam restīšu un kontaktu tīrīšanu vai bojāto skaļruņu/mikrofonu moduļu nomaiņu, novēršam oksidāciju, ja tā ir izveidojusies.',
    },
    {
      title: 'Pārbaude',
      text: 'Testējam sarunas, skaļruņus, balss ierakstu un trokšņu slāpēšanu dažādos skaļuma līmeņos un režīmos.',
    },
    {
      title: 'Garantija',
      text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus, kā pasargāt ierīci no putekļiem un mitruma.',
    },
  ],

  faqTitle: 'Biežāk uzdotie jautājumi',

  serviceName: 'Telefonu skaļruņu un mikrofona remonts Rīgā',
  serviceType: 'Telefonu skaļruņu un mikrofona remonts',
  serviceDescription:
    'Telefonu skaļruņu un mikrofona remonts un tīrīšana Rīgā: klusa skaņa, krakšķi, sarunās nedzird vai ir troksnis. Bezmaksas diagnostika un 90 dienu garantija.',

  processHowToName: 'Telefonu skaļruņu un mikrofona remonta process iLab',
  processHowToDescription:
    'Kā soli pa solim notiek telefonu skaļruņu un mikrofona remonts un tīrīšana iLab servisā Rīgā.',

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

async function getPhoneAudioServiceData({ selectedModel }) {
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

  const data = await getPhoneAudioServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="phone-audio-service-jsonld" data={data.jsonLd} />

      <PhoneAudioServicePage locale={locale} {...data} />
    </>
  );
}