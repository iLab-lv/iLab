import PhoneBatteryServicePage from '@site/(catalog)/telefonu-remonts/(services)/baterijas-maina/PhoneBatteryServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getCategoryBySlug } from '@/lib/content/categories';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const CATEGORY_KEY = 'telefonu-remonts';
const SERVICE_KEY = 'baterijas-maina';

const lvPath = '/telefonu-remonts/baterijas-maina';
const routePath = '/ru/remont-telefonov/zamena-batarei';
const categoryPath = '/ru/remont-telefonov';

const strings = {
  servicePath: routePath,
  categoryPath,
  allModelsHref: '/ru/remont-telefonov#brand-list',

  title: 'Замена батареи телефона в Риге | iLab',
  description:
    'Быстрая и качественная замена батареи телефона в Риге. Бесплатная диагностика, гарантия 90 дней, оригинальные или OEM батареи. Часто в тот же день.',

  pageTitle: 'Замена батареи телефона в Риге',
  pageDescription:
    'Быстрая и качественная замена батареи телефона в Риге. Бесплатная диагностика, гарантия 90 дней, оригинальные или OEM батареи. Часто в тот же день.',

  homeCrumb: 'Главная',
  categoryCrumb: 'Ремонт телефонов',
  pageCrumb: 'Замена батареи',

  headerTitle: 'Замена батареи телефона в Риге',
  headerLead:
    'Меняем батарею телефона, если устройство быстро разряжается, выключается при 10–20%, нагревается или нестабильно держит заряд. До ремонта проводим диагностику и после замены выдаём гарантию 90 дней.',
  headerCtaLabel: 'Смотреть цены',

  heroAlt: 'Замена батареи телефона в Риге',
  heroImage: '/images/categories/baterijas_maina.webp',
  heroBodyHtml:
    '<p><strong>Быстрая и безопасная замена батареи телефона в Риге</strong> - если устройство быстро разряжается, выключается при 20% или заряжается слишком медленно, поможем. Бесплатная диагностика и <strong>гарантия 90 дней</strong> на каждый ремонт в iLab.</p>',

  introTitle: 'Замена батареи телефона в Риге',
  introP1:
    'Если телефон <strong>быстро теряет заряд</strong>, <strong>выключается при 10–20%</strong>, <strong>нагревается</strong> или <strong>заряжается слишком медленно</strong>, скорее всего требуется <strong>замена батареи телефона</strong>. Мастера iLab выполняют быструю и качественную замену, используя <strong>оригинальные или качественные OEM батареи</strong>. Перед началом работ проводим <strong>бесплатную диагностику</strong>, чтобы убедиться, что проблема действительно в батарее, а не, например, в разъёме зарядки или программной части.',
  introP2:
    'После замены выполняем <strong>калибровку батареи</strong> и тесты - стабильность зарядки/разрядки, температуру и программные показатели. Популярные модели обычно ремонтируем за <strong>45–90 минут</strong>. На детали и работу действует <strong>гарантия 90 дней</strong>.',

  selectedModelPrefix: 'Выбрана модель:',
  selectedModelSuffix: 'Прокрутите к',
  selectedModelLink: 'ценам',

  brandPickerTitle: 'Выберите бренд',
  pricelistTitle: 'Цены на замену батареи по модели',
  pricelistIntro:
    'Выберите бренд и модель, чтобы увидеть цену замены батареи. Большинство ремонтов выполняем в тот же день.',
  ctaLabel: 'Записаться на ремонт',

  processTitle: 'Как проходит замена батареи',
  processSteps: [
    {
      title: 'Диагностика',
      text: 'Проверяем износ батареи, цепь зарядки, разъём и возможные фоновые причины быстрого разряда.',
    },
    {
      title: 'Цена и срок',
      text: 'Согласовываем тип батареи, стоимость и срок выполнения до начала ремонта.',
    },
    {
      title: 'Замена батареи',
      text: 'Безопасно снимаем старую батарею и устанавливаем новую, при необходимости меняем уплотнение.',
    },
    {
      title: 'Калибровка и тесты',
      text: 'Проводим калибровку и проверяем стабильность зарядки, температуру и общее состояние устройства.',
    },
    {
      title: 'Гарантия',
      text: 'Выдаём устройство с гарантией 90 дней на деталь и работу, а также даём рекомендации по бережному использованию батареи.',
    },
  ],

  faqTitle: 'Часто задаваемые вопросы',

  serviceName: 'Замена батареи телефона в Риге',
  serviceType: 'Замена батареи телефона',
  serviceDescription:
    'Замена батареи телефона в Риге: бесплатная диагностика, оригинальные или OEM батареи, гарантия 90 дней. Часто в тот же день.',

  processHowToName: 'Процесс замены батареи телефона в iLab',
  processHowToDescription:
    'Как шаг за шагом проходит замена батареи телефона в сервисе iLab в Риге.',

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
    lvPath,
    ruPath: routePath,
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
      <JsonLd id="phone-battery-service-ru-jsonld" data={data.jsonLd} />

      <PhoneBatteryServicePage locale={locale} {...data} />
    </>
  );
}