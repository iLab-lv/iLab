import IphoneAudioServicePage from '@site/(catalog)/iphone-remonts/(services)/skalruni-mikrofona-remonts/IphoneAudioServicePage';

import JsonLd from '@components/seo/JsonLd';

import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const SERVICE_KEY = 'skalruni-mikrofona-remonts';

const lvPath = '/iphone-remonts/skalruni-mikrofona-remonts';
const routePath = '/ru/remont-iphone/remont-dinamika-mikrofona';
const hubPath = '/ru/remont-iphone';

const strings = {
  title: 'Ремонт динамика и микрофона iPhone в Риге | iLab',
  description:
    'Тихий звук, хрипы или вас не слышно во время разговора? Профессиональный ремонт динамика и микрофона iPhone в Риге - чистка, замена модулей, диагностика и гарантия 90 дней.',

  heroAlt: 'Ремонт динамика и микрофона iPhone в Риге',
  heroImage: '/images/categories/mikrofona_remonts.webp',
  heroBodyHtml:
    '<p><strong>Тихий звук, хрипы или вас не слышно во время разговора?</strong> Выполняем <strong>ремонт динамика и микрофона iPhone</strong> - профессиональная чистка, замена модулей, полная проверка и <strong>гарантия 90 дней</strong>.</p>',

  introTitle: 'Ремонт динамика и микрофона iPhone в Риге',
  introP1:
    'Проблемы со звуком могут вызывать <strong>пыль, влага, окисление или изношенные модули</strong>. Выполняем <strong>диагностику</strong>, после которой определяем - достаточно ли <strong>чистки</strong> или нужна <strong>замена динамика/микрофона</strong>.',
  introP2:
    'Популярные модели обычно ремонтируем за <strong>45–90 минут</strong>. На все работы и детали действует <strong>гарантия 90 дней</strong>.',

  selectedModelPrefix: 'Выбрана модель:',
  selectedModelSuffix: 'Если нужна точная цена, оставьте заявку ниже.',

  processTitle: 'Как проходит ремонт',
  processSteps: [
    {
      title: 'Диагностика',
      text: 'Проверяем динамики, микрофон, сетки и соединения.',
    },
    {
      title: 'Чистка или замена',
      text: 'Удаляем загрязнения, следы окисления или меняем поврежденный модуль.',
    },
    {
      title: 'Тесты',
      text: 'Проверяем звук звонка, мультимедиа, качество разговора и работу микрофона.',
    },
    {
      title: 'Завершение',
      text: 'Контроль качества и рекомендации по дальнейшему использованию.',
    },
    {
      title: 'Гарантия',
      text: 'Гарантия 90 дней на детали и выполненные работы.',
    },
  ],

  faqTitle: 'Часто задаваемые вопросы',

  breadcrumbServiceName: 'Ремонт динамика и микрофона',
  serviceName: 'Ремонт динамика и микрофона iPhone в Риге',
  serviceType: 'Ремонт динамика и микрофона iPhone',
  serviceDescription:
    'Ремонт динамика и микрофона iPhone в Риге: диагностика, чистка или замена модуля, тесты и гарантия 90 дней.',

  homeCrumb: 'Главная',
  hubCrumb: 'Ремонт iPhone',

  headerTitle: 'Ремонт динамика и микрофона iPhone в Риге',
  headerLead:
    'Ремонтируем динамик и микрофон iPhone при тихом звуке, хрипах и проблемах во время разговора. До ремонта проводим диагностику, согласовываем решение и после ремонта выдаём гарантию 90 дней.',
  headerCtaLabel: 'Оставить заявку',

  applyAria: 'Записаться на ремонт',

  processName: 'Ремонт динамика и микрофона iPhone',
  processDescription:
    'Как проходит ремонт динамика и микрофона iPhone в iLab: диагностика, чистка или замена модуля, тесты и гарантия.',
};

function dedupeFaqItems(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const key = String(item?.q || item?.question || '')
      .trim()
      .toLowerCase();

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function buildBreadcrumbs() {
  return [
    {
      label: strings.homeCrumb,
      href: '/ru',
    },
    {
      label: strings.hubCrumb,
      href: hubPath,
    },
    {
      label: strings.breadcrumbServiceName,
      href: routePath,
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

async function getIphoneAudioServiceData({ selectedModel }) {
  const faq = await getFaqGroups(
    [
      { scopeType: 'service', scopeKey: SERVICE_KEY },
      { scopeType: 'basic' },
    ],
    locale
  );

  const faqSections = buildFaqSections(faq.groups);

  const mergedFaqItems = dedupeFaqItems(
    faqSections.flatMap((section) => section.rawItems || [])
  );

  const breadcrumbs = buildBreadcrumbs();

  const hasVisibleFaq = mergedFaqItems.length > 0;

  const jsonLd = buildRepairPageJsonLd({
    path: routePath,
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
      name: strings.processName,
      description: strings.processDescription,
      image: strings.heroImage,
      steps: strings.processSteps.map((step) => ({
        name: step.title,
        text: step.text,
      })),
    },
  });

  return {
    strings,

    selectedModel,

    routePath,
    hubPath,

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

  const data = await getIphoneAudioServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="iphone-audio-service-ru-jsonld" data={data.jsonLd} />

      <IphoneAudioServicePage locale={locale} {...data} />
    </>
  );
}