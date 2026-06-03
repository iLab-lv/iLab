import IphoneBoardRepairServicePage from '@site/(catalog)/iphone-remonts/(services)/iphone-plates-remonts/IphoneBoardRepairServicePage';

import JsonLd from '@components/seo/JsonLd';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

const locale = 'ru';

const seo = getStaticPageSeo('iphoneBoardRepair', locale);

const routePath = seo.ruPath;
const hubPath = '/ru/remont-iphone';

const strings = {
  title: seo.title,
  description: seo.description,

  heroAlt: seo.imageAlt,
  heroImage: '/images/categories/plates_remonts.webp',
  heroBodyHtml:
    '<p><strong>Микропайка и ремонт платы iPhone в Риге</strong> в сервисе iLab - точная диагностика после падения, влаги, проблем с зарядкой или ситуаций, когда iPhone не включается. Возможность ремонта и цену определяем после проверки платы.</p>',

  firstImage: '/images/services/plates_remonts_1.jpeg',
  firstImageAlt: 'Диагностика платы iPhone под микроскопом',
  secondImage: '/images/services/plates_remonts_2.jpeg',
  secondImageAlt: 'Микропайка iPhone в сервисе',

  contentTitle: 'Диагностика платы iPhone и микропайка',
  contentIntro:
    'Ремонт материнской платы iPhone - сложная работа, где нужны точная диагностика, микроскоп, профессиональное оборудование для пайки и опыт с электроникой Apple. Такой ремонт нужен, когда обычная замена детали не решает проблему.',

  firstBlockTitle: 'Когда нужен ремонт платы iPhone',
  firstBlockParagraphs: [
    'Повреждение платы может появиться после удара, влаги, некачественного предыдущего ремонта или перегрузки цепи питания. Иногда iPhone внешне выглядит целым, но не включается, перезагружается или не заряжается.',
    'В сервисе мы начинаем с диагностики: проверяем цепи питания, соединения, узлы зарядки и следы повреждений под микроскопом. Только после проверки можно понять, возможен ли ремонт платы и насколько он оправдан.',
  ],
  symptoms: [
    'iPhone не включается или показывает только логотип Apple',
    'устройство перезагружается, греется или быстро разряжается',
    'нет зарядки, сети, не работает камера или звук',
    'после влаги появилась нестабильная работа',
  ],

  secondBlockTitle: 'Что входит в микропайку',
  secondBlockParagraphs: [
    'Микропайка помогает восстановить повреждённые соединения, заменить мелкие компоненты и отремонтировать цепи платы, которые нельзя исправить простой заменой модуля. Такая работа требует тщательной проверки до и после ремонта.',
    'Мы всегда согласовываем работу до начала ремонта. Если повреждение платы слишком серьёзное или ремонт невыгоден, говорим об этом сразу и предлагаем практичное решение.',
  ],
  workItems: [
    'диагностика цепей питания и зарядки',
    'восстановление повреждённых соединений и контактов',
    'замена компонентов с микропайкой',
    'проверка после ремонта и рекомендации по сохранению данных',
  ],

  faqTitle: 'Вопросы о ремонте платы iPhone',

  breadcrumbServiceName: 'Ремонт платы iPhone',
  serviceName: 'Микропайка и ремонт платы iPhone в Риге',
  serviceType: 'Ремонт платы iPhone',
  serviceDescription:
    'Диагностика материнской платы iPhone, микропайка и ремонт платы в Риге после влаги, удара, проблем с зарядкой или питанием.',

  homeCrumb: 'Главная',
  hubCrumb: 'Ремонт iPhone',

  headerTitle: 'Микропайка и ремонт платы iPhone в Риге',
  headerLead:
    'Выполняем диагностику материнской платы iPhone и микропайку, если телефон не включается, не заряжается, перезагружается, перегревается или пострадал от влаги. Цена для этого ремонта определяется индивидуально после диагностики.',
  headerCtaLabel: 'Подробнее',

  applyAria: 'Записаться на ремонт платы iPhone',

  processName: 'Ремонт платы iPhone',
  processDescription:
    'Как проходит диагностика платы iPhone и микропайка в iLab: проверка, определение неисправности, согласование, ремонт и финальный тест.',
  processSteps: [
    {
      name: 'Диагностика',
      text: 'Проверяем симптомы, цепи питания, соединения и признаки повреждений под микроскопом.',
    },
    {
      name: 'Возможность ремонта',
      text: 'После проверки объясняем неисправность, возможное решение, сроки и стоимость.',
    },
    {
      name: 'Микропайка',
      text: 'Выполняем замену компонентов, восстановление контактов или ремонт цепи платы, если это возможно.',
    },
    {
      name: 'Проверка',
      text: 'Тестируем зарядку, запуск, стабильность и основные функции iPhone.',
    },
    {
      name: 'Результат',
      text: 'Объясняем выполненную работу и даём рекомендации по дальнейшему использованию или сохранению данных.',
    },
  ],
};

const faqItems = [
  {
    q: 'Сколько стоит ремонт платы iPhone?',
    a: 'Цена зависит от неисправности, модели и объёма микропайки. Точную стоимость называем после диагностики.',
  },
  {
    q: 'Поможет ли ремонт платы, если iPhone не включается?',
    a: 'Часто да, но сначала нужно найти причину. Это может быть цепь питания, короткое замыкание, повреждение влагой или другой узел платы.',
  },
  {
    q: 'Сохраняются ли данные после ремонта платы?',
    a: 'Во многих случаях цель ремонта - восстановить устройство или доступ к данным, но гарантировать сохранность данных до диагностики невозможно. Если данные особенно важны, скажите об этом заранее.',
  },
  {
    q: 'Сколько времени занимает микропайка?',
    a: 'Простые работы могут занять несколько часов, а сложные повреждения платы требуют более долгой диагностики и тестирования.',
  },
];

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

function getIphoneBoardRepairData() {
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

    faqItems,
    includeFaq: true,

    includeHowTo: true,
    howTo: {
      name: strings.processName,
      description: strings.processDescription,
      image: strings.heroImage,
      steps: strings.processSteps,
    },
  });

  return {
    strings,
    breadcrumbs,
    faqItems,
    jsonLd,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata(seo);
}

export default function Page() {
  const data = getIphoneBoardRepairData();

  return (
    <>
      <JsonLd id="iphone-board-repair-ru-jsonld" data={data.jsonLd} />

      <IphoneBoardRepairServicePage locale={locale} {...data} />
    </>
  );
}

