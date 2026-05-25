import PhoneChargePortServicePage from './PhoneChargePortServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getCategoryBySlug } from '@/lib/content/categories';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const CATEGORY_KEY = 'telefonu-remonts';
const SERVICE_KEY = 'uzlades-ligzdas-maina';

const routePath = '/telefonu-remonts/uzlades-ligzdas-maina';
const ruPath = '/ru/remont-telefonov/zamena-razema-zaryadki';
const categoryPath = '/telefonu-remonts';

const strings = {
  servicePath: routePath,
  categoryPath,
  allModelsHref: '/telefonu-remonts#brand-list',

  title: 'Telefonu uzlādes ligzdas maiņa Rīgā | iLab',
  description:
    'Neuzlādējas, jākustina vads vai ports vaļīgs? Telefonu uzlādes ligzdas tīrīšana un maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',

  pageTitle: 'Telefonu uzlādes ligzdas maiņa Rīgā',
  pageDescription:
    'Neuzlādējas, jākustina vads vai ports vaļīgs? Telefonu uzlādes ligzdas tīrīšana un maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',

  homeCrumb: 'Sākums',
  categoryCrumb: 'Telefonu remonts',
  pageCrumb: 'Uzlādes ligzdas maiņa',

  headerTitle: 'Telefonu uzlādes ligzdas maiņa Rīgā',
  headerLead:
    'Remontējam un mainām telefonu uzlādes ligzdu, ja uzlāde pārtrūkst, jākustina vads vai ports nereaģē. Pirms remonta veicam diagnostiku un pēc remonta sniedzam 90 dienu garantiju.',
  headerCtaLabel: 'Skatīt cenas',

  heroAlt: 'Telefonu uzlādes ligzdas maiņa Rīgā',
  heroImage: '/images/categories/uzlades_ligzda_remonts.webp',
  heroBodyHtml:
    '<p><strong>Neuzlādējas vai jākustina vads?</strong> Veicam uzlādes porta <strong>tīrīšanu</strong> un, ja nepieciešams, <strong>uzlādes ligzdas nomaiņu</strong>. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>',

  introTitle: 'Telefonu uzlādes ligzdas maiņa Rīgā',
  introP1:
    'Tipiski simptomi: <strong>uzlāde pārtrūkst</strong>, <strong>jākustina vads</strong>, <strong>kabelis neiet līdz galam</strong>, <strong>ports ir vaļīgs</strong> vai <strong>nereaģē vispār</strong>. Bieži pietiek ar <strong>profesionālu tīrīšanu</strong>, taču, ja kontakti ir bojāti vai oksidēti, veicam <strong>uzlādes ligzdas nomaiņu</strong>. Ja diagnostikā atklājas problēma barošanas ķēdē, nepieciešams <strong>charging IC</strong> remonts.',
  introP2: '',

  selectedModelPrefix: 'Atlasīts modelis:',
  selectedModelSuffix: 'Ritiniet uz',
  selectedModelLink: 'cenām',

  brandPickerTitle: 'Izvēlies zīmolu',
  pricelistTitle: 'Uzlādes ligzdas remonta cenas pēc modeļa',
  pricelistIntro:
    'Izvēlies zīmolu un modeli, lai redzētu uzlādes ligzdas tīrīšanas vai nomaiņas cenu. Dažos gadījumos nepieciešams arī barošanas ķēdes remonts.',
  ctaLabel: 'Pieteikties remontam',

  processTitle: 'Kā notiek uzlādes ligzdas remonts',
  processSteps: [
    {
      title: 'Diagnostika',
      text: 'Pārbaudām uzlādes portu, kabeli, uzlādes ķēdi un baterijas stāvokli, lai noteiktu bojājuma cēloni.',
    },
    {
      title: 'Tīrīšana un apstrāde',
      text: 'Noņemam putekļus un tekstila šķiedras, attīrām kontaktus un apstrādājam vieglu oksidāciju.',
    },
    {
      title: 'Uzlādes ligzdas maiņa',
      text: 'Ja porta kontakti ir nopietni bojāti, nomainām uzlādes ligzdu pret kvalitatīvu detaļu, ievērojot ražotāja rekomendācijas.',
    },
    {
      title: 'Testi',
      text: 'Pārbaudām uzlādes ātrumu, stabilitāti, datu pārraidi, kabeļa fiksāciju un uzvedību dažādos leņķos.',
    },
    {
      title: 'Garantija',
      text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, sniedzam ieteikumus par lādētāju un kabeļu drošu lietošanu.',
    },
  ],

  faqTitle: 'Biežāk uzdotie jautājumi',

  serviceName: 'Telefonu uzlādes ligzdas maiņa Rīgā',
  serviceType: 'Telefonu uzlādes ligzdas maiņa',
  serviceDescription:
    'Telefonu uzlādes ligzdas tīrīšana un nomaiņa Rīgā: ja uzlāde pārtrūkst, jākustina vads vai ports nereaģē. Bezmaksas diagnostika un 90 dienu garantija.',

  processHowToName: 'Telefonu uzlādes ligzdas remonta process iLab',
  processHowToDescription:
    'Kā soli pa solim notiek telefonu uzlādes ligzdas tīrīšana, maiņa un uzlādes ķēdes diagnostika iLab servisā Rīgā.',

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

async function getPhoneChargePortServiceData({ selectedModel }) {
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

  const data = await getPhoneChargePortServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="phone-charge-port-service-jsonld" data={data.jsonLd} />

      <PhoneChargePortServicePage locale={locale} {...data} />
    </>
  );
}