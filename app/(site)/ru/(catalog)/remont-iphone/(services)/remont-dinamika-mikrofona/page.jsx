import IphoneAudioServicePage from '@site/(catalog)/iphone-remonts/(services)/skalruni-mikrofona-remonts/IphoneAudioServicePage';

import JsonLd from '@components/seo/JsonLd';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

const locale = 'ru';

const seo = getStaticPageSeo('iphoneAudioRepair', locale);

const lvPath = seo.lvPath;
const routePath = seo.ruPath;
const hubPath = '/ru/remont-iphone';

const strings = {
  title: seo.title,
  description: seo.description,

  heroAlt: seo.imageAlt,
  heroImage: '/images/categories/mikrofona_remonts.webp',

  homeCrumb: 'Главная',
  hubCrumb: 'Ремонт iPhone',
  breadcrumbServiceName: 'Ремонт динамика и микрофона',

  headerTitle: 'Ремонт динамика и микрофона iPhone в Риге',
  headerLead:
    'Помогаем, если во время разговора плохо слышно собеседника, не работает микрофон, динамик хрипит, стал тихим или после влаги/падения звук работает нестабильно.',
  headerCtaLabel: 'Записаться на ремонт',

  introTitle: 'Когда нужен ремонт динамика или микрофона?',
  introP1:
    'Проблемы со звуком могут появиться из-за загрязнения, влаги, повреждённого динамика, микрофона, соединений или программной ошибки. В сервисе iLab сначала проводим диагностику, чтобы понять, достаточно ли чистки или нужна замена детали.',
  introP2:
    'После ремонта проверяем звук во время звонка, динамик, микрофон, запись видео и основные функции. На работу и установленные детали предоставляем гарантию 90 дней.',

  ctaLabel: 'Записаться на ремонт',

  processTitle: 'Как проходит ремонт',
  processSteps: [
    {
      title: 'Диагностика',
      text: 'Проверяем динамики, микрофоны, качество разговора и запись.',
    },
    {
      title: 'Чистка или замена',
      text: 'В зависимости от поломки выполняем профессиональную чистку или замену детали.',
    },
    {
      title: 'Тесты',
      text: 'Проверяем звонки, видео, микрофон и работу динамика.',
    },
    {
      title: 'Гарантия',
      text: 'После ремонта предоставляем гарантию 90 дней на работу и детали.',
    },
  ],

  faqTitle: 'Часто задаваемые вопросы',

  serviceName: 'Ремонт динамика и микрофона iPhone в Риге',
  serviceType: 'Ремонт аудио iPhone',
  serviceDescription:
    'Ремонт динамика и микрофона iPhone в Риге: диагностика, чистка или замена детали, гарантия 90 дней.',

  processName: 'Ремонт динамика и микрофона iPhone',
  processDescription:
    'Как проходит ремонт динамика и микрофона iPhone в iLab: диагностика, чистка или замена детали, тесты и гарантия.',
};

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

async function getIphoneAudioServiceData() {
  const breadcrumbs = buildBreadcrumbs();

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

    includeFaq: false,

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
    routePath,
    lvPath,
    hubPath,
    breadcrumbs,
    jsonLd,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata(seo);
}

export default async function Page() {
  const data = await getIphoneAudioServiceData();

  return (
    <>
      <JsonLd id="iphone-audio-service-ru-jsonld" data={data.jsonLd} />

      <IphoneAudioServicePage locale={locale} {...data} />
    </>
  );
}
