import PhoneBatteryServicePage from './PhoneBatteryServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getCategoryBySlug } from '@/lib/content/categories';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const CATEGORY_KEY = 'telefonu-remonts';
const SERVICE_KEY = 'baterijas-maina';

const routePath = '/telefonu-remonts/baterijas-maina';
const ruPath = '/ru/remont-telefonov/zamena-batarei';
const categoryPath = '/telefonu-remonts';

const strings = {
  servicePath: routePath,
  categoryPath,
  allModelsHref: '/telefonu-remonts#brand-list',

  title: 'Telefonu baterijas maiņa Rīgā | iLab',
  description:
    'Ātra un kvalitatīva telefonu baterijas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM baterijas. Bieži tajā pašā dienā.',

  pageTitle: 'Telefonu baterijas maiņa Rīgā',
  pageDescription:
    'Ātra un kvalitatīva telefonu baterijas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM baterijas. Bieži tajā pašā dienā.',

  homeCrumb: 'Sākums',
  categoryCrumb: 'Telefonu remonts',
  pageCrumb: 'Baterijas maiņa',

  headerTitle: 'Telefonu baterijas maiņa Rīgā',
  headerLead:
    'Mainām telefonu bateriju, ja ierīce ātri izlādējas, izslēdzas pie 10–20%, uzkarst vai nestabili tur uzlādi. Pirms remonta veicam diagnostiku un pēc nomaiņas sniedzam 90 dienu garantiju.',
  headerCtaLabel: 'Skatīt cenas',

  heroAlt: 'Telefonu baterijas maiņa Rīgā',
  heroImage: '/images/categories/baterijas_maina.webp',
  heroBodyHtml:
    '<p><strong>Ātra un droša telefonu baterijas maiņa Rīgā</strong> - ja tālrunis ātri izlādējas, izslēdzas pie 20% vai lādējas ļoti lēni, palīdzēsim. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam iLab servisā.</p>',

  introTitle: 'Telefonu baterijas maiņa Rīgā',
  introP1:
    'Ja tālrunis <strong>ātri zaudē uzlādi</strong>, <strong>izslēdzas pie 10–20%</strong>, <strong>uzkarst</strong> vai <strong>lādējas ļoti lēni</strong>, visticamāk nepieciešama <strong>telefonu baterijas (akumulatora) maiņa</strong>. iLab meistari veic ātru un kvalitatīvu nomaiņu, izmantojot <strong>oriģinālas vai augstas kvalitātes OEM baterijas</strong>. Pirms darba uzsākšanas veicam <strong>bezmaksas diagnostiku</strong>, lai pārliecinātos, ka problēma tiešām ir baterijā, nevis, piemēram, uzlādes ligzdā vai programmatūrā.',
  introP2:
    'Pēc nomaiņas veicam <strong>baterijas kalibrāciju</strong> un pārbaudes - uzlādes/izlādes stabilitāti, temperatūras kontroli un programmatūras rādītājus. Populāros modeļus parasti salabojam <strong>45–90 minūtēs</strong>. Visam darbam un detaļām ir <strong>90 dienu garantija</strong>.',

  selectedModelPrefix: 'Atlasīts modelis:',
  selectedModelSuffix: 'Ritiniet uz',
  selectedModelLink: 'cenām',

  brandPickerTitle: 'Izvēlies zīmolu',
  pricelistTitle: 'Baterijas maiņas cenas pēc modeļa',
  pricelistIntro:
    'Izvēlies zīmolu un modeli, lai redzētu baterijas maiņas cenu. Lielāko daļu remontu paveicam tajā pašā dienā.',
  ctaLabel: 'Pieteikties remontam',

  processTitle: 'Kā notiek baterijas maiņa',
  processSteps: [
    {
      title: 'Diagnostika',
      text: 'Pārbaudām baterijas nolietojumu, uzlādes ķēdi un portu, kā arī iespējamos fona patēriņus.',
    },
    {
      title: 'Cena un termiņš',
      text: 'Saskaņojam baterijas tipu, izmaksas un izpildes laiku pirms darba uzsākšanas.',
    },
    {
      title: 'Baterijas nomaiņa',
      text: 'Droši izņemam veco bateriju un uzstādam jaunu, ievērojot remonta drošības prasības un nepieciešamības gadījumā nomainot blīvējumu.',
    },
    {
      title: 'Kalibrācija un testi',
      text: 'Veicam baterijas kalibrāciju, pārbaudām uzlādes/izlādes stabilitāti, temperatūru un ierīces kopējo darbību.',
    },
    {
      title: 'Garantija',
      text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus baterijas saudzīgai lietošanai.',
    },
  ],

  faqTitle: 'Biežāk uzdotie jautājumi',

  serviceName: 'Telefonu baterijas maiņa Rīgā',
  serviceType: 'Telefonu baterijas maiņa',
  serviceDescription:
    'Telefonu baterijas maiņa Rīgā: bezmaksas diagnostika, oriģinālas vai OEM baterijas, 90 dienu garantija. Bieži tajā pašā dienā.',

  processHowToName: 'Telefonu baterijas maiņas process iLab',
  processHowToDescription:
    'Kā soli pa solim notiek telefonu baterijas maiņa iLab servisā Rīgā.',

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

async function getPhoneBatteryServiceData({ selectedModel }) {
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

  const data = await getPhoneBatteryServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="phone-battery-service-jsonld" data={data.jsonLd} />

      <PhoneBatteryServicePage locale={locale} {...data} />
    </>
  );
}