import PhoneChargePortServicePage from '@site/(catalog)/telefonu-remonts/(services)/uzlades-ligzdas-maina/PhoneChargePortServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getCategoryBySlug } from '@/lib/content/categories';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const seo = getStaticPageSeo('phoneChargePortReplacement', locale);

const CATEGORY_KEY = 'telefonu-remonts';
const SERVICE_KEY = 'uzlades-ligzdas-maina';

const lvPath = seo.lvPath;
const routePath = seo.ruPath;
const categoryPath = '/ru/remont-telefonov';

const strings = {
  servicePath: routePath,
  categoryPath,
  allModelsHref: '/ru/remont-telefonov#brand-list',

  title: seo.title,
  description: seo.description,

  pageTitle: 'Замена разъёма зарядки телефона в Риге',
  pageDescription:
    'Не заряжается, нужно шевелить кабель или порт болтается? Чистка и замена разъёма зарядки телефона в Риге. Бесплатная диагностика и гарантия до 1 года.',

  homeCrumb: 'Главная',
  categoryCrumb: 'Ремонт телефонов',
  pageCrumb: 'Замена разъёма зарядки',

  headerTitle: 'Замена разъёма зарядки телефона в Риге',
  headerLead:
    'Ремонтируем и меняем разъём зарядки телефона, если зарядка прерывается, кабель нужно шевелить или порт не реагирует. До ремонта проводим диагностику и после ремонта выдаём гарантию до 1 года.',
  headerCtaLabel: 'Смотреть цены',

  heroAlt: seo.imageAlt,
  heroImage: '/images/categories/uzlades_ligzda_remonts.webp',
  heroBodyHtml:
    '<p><strong>Не заряжается или нужно шевелить кабель?</strong> Выполняем <strong>чистку разъёма зарядки</strong> и при необходимости <strong>замену разъёма</strong>. Бесплатная диагностика и <strong>гарантия до 1 года</strong>.</p>',

  introTitle: 'Замена разъёма зарядки телефона в Риге',
  introP1:
    'Типичные симптомы: <strong>зарядка прерывается</strong>, <strong>нужно шевелить кабель</strong>, <strong>кабель не входит до конца</strong>, <strong>порт болтается</strong> или <strong>совсем не реагирует</strong>. Во многих случаях достаточно <strong>профессиональной чистки</strong>, но если контакты повреждены или окислились, выполняем <strong>замену разъёма зарядки</strong>. Если во время диагностики обнаруживается проблема в цепи питания, может потребоваться ремонт <strong>charging IC</strong>.',
  introP2: '',

  selectedModelPrefix: 'Выбрана модель:',
  selectedModelSuffix: 'Прокрутите к',
  selectedModelLink: 'ценам',

  brandPickerTitle: 'Выберите бренд',
  pricelistTitle: 'Цены на ремонт разъёма зарядки по модели',
  pricelistIntro:
    'Выберите бренд и модель, чтобы увидеть цену чистки или замены разъёма зарядки. В некоторых случаях также требуется ремонт цепи питания.',
  ctaLabel: 'Записаться на ремонт',

  processTitle: 'Как проходит ремонт разъёма зарядки',
  processSteps: [
    {
      title: 'Диагностика',
      text: 'Проверяем разъём зарядки, кабель, цепь питания и состояние батареи, чтобы определить причину неисправности.',
    },
    {
      title: 'Чистка и обработка',
      text: 'Удаляем пыль и ворс, очищаем контакты и обрабатываем лёгкое окисление.',
    },
    {
      title: 'Замена разъёма',
      text: 'Если контакты порта серьёзно повреждены, меняем разъём зарядки на качественную деталь с соблюдением требований ремонта.',
    },
    {
      title: 'Тесты',
      text: 'Проверяем скорость и стабильность зарядки, передачу данных, фиксацию кабеля и поведение устройства под разными углами.',
    },
    {
      title: 'Гарантия',
      text: 'Выдаём устройство с гарантией до 1 года на деталь и работу, а также даём рекомендации по безопасному использованию зарядных устройств и кабелей.',
    },
  ],

  faqTitle: 'Часто задаваемые вопросы',

  serviceName: 'Замена разъёма зарядки телефона в Риге',
  serviceType: 'Замена разъёма зарядки телефона',
  serviceDescription:
    'Чистка и замена разъёма зарядки телефона в Риге: если зарядка прерывается, нужно шевелить кабель или порт не реагирует. Бесплатная диагностика и гарантия до 1 года.',

  processHowToName: 'Процесс ремонта разъёма зарядки телефона в iLab',
  processHowToDescription:
    'Как шаг за шагом проходит чистка, замена разъёма зарядки и диагностика цепи питания телефона в сервисе iLab в Риге.',

  applyAria: 'Записаться на ремонт',
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
      href: '/ru',
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
  return buildSeoMetadata(seo);
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
      <JsonLd id="phone-charge-port-service-ru-jsonld" data={data.jsonLd} />

      <PhoneChargePortServicePage locale={locale} {...data} />
    </>
  );
}