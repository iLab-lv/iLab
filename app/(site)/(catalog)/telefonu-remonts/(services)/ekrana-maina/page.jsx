import PhoneScreenServicePage from './PhoneScreenServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getCategoryBySlug } from '@/lib/content/categories';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const CATEGORY_KEY = 'telefonu-remonts';
const SERVICE_KEY = 'ekrana-maina';

const routePath = '/telefonu-remonts/ekrana-maina';
const ruPath = '/ru/remont-telefonov/zamena-ekrana';
const categoryPath = '/telefonu-remonts';

const strings = {
  servicePath: routePath,
  categoryPath,
  allModelsHref: '/telefonu-remonts#brand-list',

  title: 'Telefonu ekrāna maiņa Rīgā | iLab',
  description:
    'Ātra un kvalitatīva telefonu ekrāna maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģināli vai OEM displeji. Bieži tajā pašā dienā.',

  pageTitle: 'Telefonu ekrāna maiņa Rīgā',
  pageDescription:
    'Ātra un kvalitatīva telefonu ekrāna maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģināli vai OEM displeji. Bieži tajā pašā dienā.',

  homeCrumb: 'Sākums',
  categoryCrumb: 'Telefonu remonts',
  pageCrumb: 'Ekrāna maiņa',

  headerTitle: 'Telefonu ekrāna maiņa Rīgā',
  headerLead:
    'Mainām telefonu ekrānu, ja tas ir saplaisājis, rāda plankumus, līnijas vai nereaģē uz pieskārienu. Pirms remonta veicam diagnostiku un pēc nomaiņas sniedzam 90 dienu garantiju.',
  headerCtaLabel: 'Skatīt cenas',

  heroAlt: 'Telefonu ekrāna maiņa Rīgā',
  heroImage: '/images/categories/displeja_maina.webp',
  heroBodyHtml:
    '<p><strong>Ātra un kvalitatīva telefonu ekrāna maiņa Rīgā</strong> - plaisas, plankumi vai skāriena problēmas novēršam bieži tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam iLab servisā.</p>',

  introTitle: 'Telefonu ekrāna maiņa Rīgā',
  introP1:
    'Ja ekrāns ir saplīsis, parādās plankumi, līnijas vai nereaģē skāriens, visticamāk nepieciešama <strong>telefonu ekrāna (displeja) maiņa</strong>. iLab meistari Rīgā veic ātru un drošu nomaiņu, izmantojot <strong>oriģinālus vai augstas kvalitātes OEM displejus</strong>. Pirms darba uzsākšanas veicam <strong>bezmaksas diagnostiku</strong>, lai pārliecinātos, ka bojājums ir tieši displejā, nevis, piemēram, programmatūrā vai citās komponentēs.',
  introP2:
    'Pēc nomaiņas rūpīgi pārbaudām skārienjutību, krāsu atbilstību, spilgtumu un kopējo attēla kvalitāti. Populāros modeļus parasti salabojam <strong>1–3 stundu laikā</strong>. Visam veicamajam darbam un detaļām ir <strong>90 dienu garantija</strong>.',

  selectedModelPrefix: 'Atlasīts modelis:',
  selectedModelSuffix: 'Ritiniet uz',
  selectedModelLink: 'cenām',

  brandPickerTitle: 'Izvēlies zīmolu',
  pricelistTitle: 'Ekrāna maiņas cenas pēc modeļa',
  pricelistIntro:
    'Izvēlies zīmolu un modeli, lai redzētu ekrāna maiņas cenu. Lielāko daļu remontu paveicam tajā pašā dienā.',
  ctaLabel: 'Pieteikties remontam',

  processTitle: 'Kā notiek ekrāna maiņa',
  processSteps: [
    {
      title: 'Diagnostika',
      text: 'Ātri pārbaudām ierīci un apstiprinām ekrāna bojājumu: plaisas, plankumus, līnijas un skāriena problēmas.',
    },
    {
      title: 'Cena un termiņš',
      text: 'Saskaņojam displeja veidu, izmaksas un izpildes laiku pirms darba uzsākšanas.',
    },
    {
      title: 'Ekrāna nomaiņa',
      text: 'Sertificēti meistari droši noņem bojāto ekrānu un uzstāda jaunu, ievērojot remonta prasības un vajadzības gadījumā atjaunojot blīvējumu.',
    },
    {
      title: 'Pārbaude',
      text: 'Pārbaudām skārienjutību, krāsas, spilgtumu un kopējo attēla kvalitāti, lai pārliecinātos, ka viss darbojas korekti.',
    },
    {
      title: 'Garantija',
      text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus ekrāna saudzīgai lietošanai.',
    },
  ],

  faqTitle: 'Biežāk uzdotie jautājumi',

  serviceName: 'Telefonu ekrāna maiņa Rīgā',
  serviceType: 'Telefonu ekrāna maiņa',
  serviceDescription:
    'Telefonu ekrāna maiņa Rīgā: bezmaksas diagnostika, oriģināli vai OEM displeji, 90 dienu garantija. Bieži tajā pašā dienā.',

  processHowToName: 'Telefonu ekrāna maiņas process iLab',
  processHowToDescription:
    'Kā soli pa solim notiek telefonu ekrāna maiņa iLab servisā Rīgā.',

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

async function getPhoneScreenServiceData({ selectedModel }) {
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

  const data = await getPhoneScreenServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="phone-screen-service-jsonld" data={data.jsonLd} />

      <PhoneScreenServicePage locale={locale} {...data} />
    </>
  );
}