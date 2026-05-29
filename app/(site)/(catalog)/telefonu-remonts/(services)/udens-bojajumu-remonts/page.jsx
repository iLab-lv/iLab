import PhoneWaterDamageServicePage from './PhoneWaterDamageServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getCategoryBySlug } from '@/lib/content/categories';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const seo = getStaticPageSeo('phoneWaterDamageRepair', locale);

const CATEGORY_KEY = 'telefonu-remonts';
const SERVICE_KEY = 'udens-bojajumu-remonts';

const routePath = seo.lvPath;
const ruPath = seo.ruPath;
const categoryPath = '/telefonu-remonts';

const strings = {
  servicePath: routePath,
  categoryPath,
  allModelsHref: '/telefonu-remonts#brand-list',

  title: seo.title,
  description: seo.description,

  pageTitle: 'Telefonu ūdens bojājumu remonts Rīgā',
  pageDescription:
    'Telefonu ūdens bojājumu remonts Rīgā: diagnostika, tīrīšana un oksidācijas novēršana pēc saskares ar šķidrumu. Bojāto detaļu nomaiņa un 90 dienu garantija.',

  homeCrumb: 'Sākums',
  categoryCrumb: 'Telefonu remonts',
  pageCrumb: 'Ūdens bojājumu remonts',

  headerTitle: 'Telefonu ūdens bojājumu remonts Rīgā',
  headerLead:
    'Remontējam telefonus pēc saskares ar ūdeni un citiem šķidrumiem: diagnostika, dziļā tīrīšana, oksidācijas novēršana un bojāto detaļu nomaiņa. Pēc remonta sniedzam 90 dienu garantiju.',
  headerCtaLabel: 'Skatīt cenas',

  heroAlt: seo.imageAlt,
  heroImage: '/images/categories/udens_bojajumi.webp',
  heroBodyHtml:
    '<p><strong>Ūdens vai citu šķidrumu ietekme?</strong> Veicam diagnostiku, dziļo tīrīšanu un <strong>oksidācijas novēršanu</strong>, kā arī bojāto detaļu maiņu. Jo ātrāk ierīce nonāk servisā, jo lielākas izredzes atjaunot tās darbību. <strong>Bezmaksas pārbaude</strong> un <strong>90 dienu garantija</strong>.</p>',

  introTitle: 'Telefonu ūdens bojājumu remonts Rīgā',
  introP1:
    'Pēc saskares ar ūdeni vai citiem šķidrumiem bojājumi ne vienmēr ir redzami uzreiz - iekšpusē sākas <strong>oksidācija un korozija</strong>. iLab veicam <strong>diagnostiku</strong>, <strong>dziļo tīrīšanu</strong>, savienojumu atjaunošanu un, ja nepieciešams, <strong>bojāto detaļu nomaiņu</strong>, piemēram, displeju, bateriju, uzlādes ķēdi vai skaļruņus.',
  introP2:
    'Svarīgi: pēc applūšanas <strong>neuzlādējiet</strong> un <strong>neieslēdziet</strong> ierīci, neizmantojiet fēnu un nelieciet telefonu rīsos. Nogādājiet to servisā pēc iespējas ātrāk - tas būtiski palielina <strong>telefonu ūdens bojājumu remonta</strong> izdošanās iespēju.',

  selectedModelPrefix: 'Atlasīts modelis:',
  selectedModelSuffix: 'Ritiniet uz',
  selectedModelLink: 'cenām',

  brandPickerTitle: 'Izvēlies zīmolu',
  pricelistTitle: 'Ūdens bojājumu remonta cenas pēc modeļa',
  pricelistIntro:
    'Izvēlies zīmolu un modeli, lai redzētu diagnostikas un atjaunošanas sākotnējo cenu. Dažiem bojājumiem galīgā cena tiek precizēta pēc diagnostikas.',
  ctaLabel: 'Pieteikties remontam',

  processTitle: 'Kā notiek ūdens bojājumu remonts',
  processSteps: [
    {
      title: 'Diagnostika',
      text: 'Atveram ierīci, izvērtējam oksidāciju, bojātos mezglus un strāvas ķēdes, nosakām bojājuma apmēru.',
    },
    {
      title: 'Tīrīšana un apstrāde',
      text: 'Veicam ultraskaņas tīrīšanu un/vai ķīmisko apstrādi, attīrām plates un savienojumus, atjaunojam lodējumus, ja tas ir iespējams.',
    },
    {
      title: 'Detaļu nomaiņa',
      text: 'Pēc vajadzības nomainām bojātās detaļas - displeju, bateriju, uzlādes moduli, skaļruņus vai citus komponentus.',
    },
    {
      title: 'Testi',
      text: 'Pārbaudām uzlādi, skaņu, kameru, tīklu, Wi-Fi, sensorus un citas ikdienas funkcijas, lai pārliecinātos par stabilu darbību.',
    },
    {
      title: 'Garantija',
      text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, izskaidrojam atlikušos riskus un sniedzam ieteikumus turpmākai lietošanai.',
    },
  ],

  faqTitle: 'Biežāk uzdotie jautājumi',

  serviceName: 'Telefonu ūdens bojājumu remonts Rīgā',
  serviceType: 'Telefonu ūdens bojājumu remonts',
  serviceDescription:
    'Diagnostika, tīrīšana un oksidācijas novēršana pēc saskares ar ūdeni vai citiem šķidrumiem. Bojāto detaļu nomaiņa ar 90 dienu garantiju.',

  processHowToName: 'Telefonu ūdens bojājumu remonta process iLab',
  processHowToDescription:
    'Kā soli pa solim notiek telefonu ūdens bojājumu diagnostika, tīrīšana un atjaunošana iLab servisā Rīgā.',

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

async function getPhoneWaterDamageServiceData({ selectedModel }) {
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
  return buildSeoMetadata(seo);
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const selectedModel = resolvedSearchParams?.model
    ? String(resolvedSearchParams.model)
    : null;

  const data = await getPhoneWaterDamageServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="phone-water-damage-service-jsonld" data={data.jsonLd} />

      <PhoneWaterDamageServicePage locale={locale} {...data} />
    </>
  );
}