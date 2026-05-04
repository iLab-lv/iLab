import Script from 'next/script';
import { notFound } from 'next/navigation';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceHero from '@sections/device-hero/DeviceHero';
import PriceList from '@sections/pricing/PriceList';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Why from '@sections/why/Why';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import { FAQ_CONTEXT, getFaqItems, getFaqLd } from '@/data/faq';

import {
  LuBatteryCharging,
  LuMonitor,
  LuDroplets,
  LuWrench,
  LuKeyboard,
  LuMouse,
} from 'react-icons/lu';

import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';
import { buildCategoryHref, buildServiceHref } from '@/lib/routes/routeI18n';

import { db } from '@/lib/firebaseAdmin';

export const revalidate = 0;

const DEFAULT_CURRENCY = 'EUR';
const COMPUTER_CATEGORY_KEY = 'datoru-remonts';

export function getComputerDevicePageHeader(locale = 'lv') {
  if (locale === 'ru') {
    return {
      scrollCta: { label: 'Смотреть цены', targetId: 'cenas' },
    };
  }

  return {
    scrollCta: { label: 'Skatīt cenas', targetId: 'cenas' },
  };
}

/* ===== Helpers ===== */

function norm(value = '') {
  return decodeURIComponent(String(value)).trim();
}

function pickLocalizedField(value, locale = 'lv', fallback = 'lv') {
  if (!value) return '';

  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'object') {
    if (typeof value[locale] === 'string' && value[locale].trim()) {
      return value[locale].trim();
    }
    if (typeof value[fallback] === 'string' && value[fallback].trim()) {
      return value[fallback].trim();
    }
  }

  return '';
}

function slugifyBrandKey(value = '') {
  return String(value).trim().toLowerCase();
}

async function getLaptopDeviceBySlug(brandSlug, slug) {
  const normalizedBrand = norm(brandSlug);
  const normalizedSlug = norm(slug);

  const directSnap = await db
    .collection('devices')
    .where('slug', '==', normalizedSlug)
    .where('categoryKey', '==', COMPUTER_CATEGORY_KEY)
    .where('brandKey', '==', normalizedBrand)
    .limit(1)
    .get();

  if (!directSnap.empty) {
    const doc = directSnap.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  const fallbackSnap = await db
    .collection('devices')
    .where('slug', '==', normalizedSlug)
    .where('categoryKey', '==', COMPUTER_CATEGORY_KEY)
    .limit(10)
    .get();

  if (fallbackSnap.empty) return null;

  const match =
    fallbackSnap.docs.find((doc) => {
      const data = doc.data() || {};
      const candidates = [
        data.brandKey,
        data.brandSlug,
        data.brandId,
        data.brand,
      ]
        .filter(Boolean)
        .map((v) => slugifyBrandKey(v));

      return candidates.includes(slugifyBrandKey(normalizedBrand));
    }) || null;

  if (!match) return null;

  return {
    id: match.id,
    ...match.data(),
  };
}

async function getServicesByCategory(categoryId) {
  const snap = await db
    .collection('services')
    .where('categoryId', '==', categoryId)
    .get();

  return snap.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((service) => service?.isActive !== false);
}

async function getServicePricingByModel(modelId) {
  const snap = await db
    .collection('servicePricing')
    .where('modelId', '==', modelId)
    .get();

  return snap.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((row) => row?.isActive !== false);
}

async function buildPriceListItems(modelSlug, locale = 'lv') {
  const [services, pricingRows] = await Promise.all([
    getServicesByCategory(COMPUTER_CATEGORY_KEY),
    getServicePricingByModel(modelSlug),
  ]);

  const pricingByServiceId = new Map(
    pricingRows
      .filter((row) => row?.serviceId)
      .map((row) => [row.serviceId, row])
  );

  const fallbackTimeText =
    locale === 'ru' ? 'В тот же день' : 'Tajā pašā dienā';

  const items = services
    .map((service) => {
      const pricing = pricingByServiceId.get(service.id) || null;

      if (!pricing) return null;
      if (pricing.isHidden === true) return null;

      const title =
        pickLocalizedField(service.labels, locale) ||
        (typeof service.title === 'string' ? service.title.trim() : '') ||
        service.id;

      const family =
        pickLocalizedField(service.familyLabels, locale) ||
        (typeof service.family === 'string' ? service.family.trim() : '');

      const defaultTimeText =
        pickLocalizedField(service.defaultTimeText, locale) ||
        fallbackTimeText;

      const overrideTimeText =
        pickLocalizedField(pricing?.timeTextOverride, locale) ||
        pickLocalizedField(pricing?.timeText, locale) ||
        (typeof pricing?.timeTextOverride === 'string'
          ? pricing.timeTextOverride.trim()
          : '') ||
        (typeof pricing?.timeText === 'string' ? pricing.timeText.trim() : '');

      const timeText = overrideTimeText || defaultTimeText;

      const warrantyDays =
        typeof pricing?.warrantyDaysOverride === 'number'
          ? pricing.warrantyDaysOverride
          : typeof service.defaultWarrantyDays === 'number'
            ? service.defaultWarrantyDays
            : null;

      const price =
        typeof pricing?.price === 'number' && Number.isFinite(pricing.price)
          ? pricing.price
          : null;

      const isStartingFrom = pricing?.isStartingFrom === true;

      return {
        id: service.id,
        title,
        family,
        order: typeof service.order === 'number' ? service.order : 9999,
        timeText,
        warrantyDays,
        price,
        isStartingFrom,
        isHidden: pricing?.isHidden === true,
        popular: false,
        href: service.slug
          ? buildServiceHref(locale, COMPUTER_CATEGORY_KEY, service.slug)
          : undefined,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if ((a.order ?? 9999) !== (b.order ?? 9999)) {
        return (a.order ?? 9999) - (b.order ?? 9999);
      }
      return (a.title || '').localeCompare(b.title || '');
    });

  return { items, currency: DEFAULT_CURRENCY };
}

function buildModelServices(locale = 'lv') {
  if (locale === 'ru') {
    return [
      {
        title: 'Замена аккумулятора',
        text: 'если заряд быстро падает, компьютер выключается или не работает без зарядного устройства.',
        icon: LuBatteryCharging,
      },
      {
        title: 'Замена дисплея',
        text: 'трещины, полосы, тёмные пятна, мерцание или отсутствие изображения.',
        icon: LuMonitor,
      },
      {
        title: 'Восстановление после попадания жидкости',
        text: 'диагностика и восстановление после попадания жидкости, если ремонт возможен.',
        icon: LuDroplets,
      },
      {
        title: 'Профилактика и техническое обслуживание',
        text: 'чистка, замена термопасты, проверка и стабильная работа.',
        icon: LuWrench,
      },
      {
        title: 'Замена клавиатуры',
        text: 'не работают клавиши, залипание, следы жидкости или физические повреждения.',
        icon: LuKeyboard,
      },
      {
        title: 'Замена touchpad',
        text: 'не реагирует, курсор двигается сам, не работает клик или есть физические повреждения.',
        icon: LuMouse,
      },
    ];
  }

  return [
    {
      title: 'Akumulatora nomaiņa',
      text: 'ja strauji krīt uzlāde, dators izslēdzas vai nedarbojas bez lādētāja.',
      icon: LuBatteryCharging,
    },
    {
      title: 'Displeja nomaiņa',
      text: 'plaisas, līnijas, tumši plankumi, mirgošana vai nav attēla.',
      icon: LuMonitor,
    },
    {
      title: 'Atjaunošana pēc šķidruma bojājumiem',
      text: 'diagnostika un atjaunošana pēc šķidruma iekļūšanas, ja tas iespējams.',
      icon: LuDroplets,
    },
    {
      title: 'Profilakse un tehniskā apkalpošana',
      text: 'tīrīšana, termopastas nomaiņa, pārbaude un stabila darbība.',
      icon: LuWrench,
    },
    {
      title: 'Tastatūras nomaiņa',
      text: 'nedarbojas taustiņi, pielipšana, šķidruma bojājumi vai fiziski defekti.',
      icon: LuKeyboard,
    },
    {
      title: 'Touchpad nomaiņa',
      text: 'nereaģē, “lec” kursors, klikšķis nestrādā vai ir fiziski bojājumi.',
      icon: LuMouse,
    },
  ];
}

function buildFaqForModel(locale = 'lv') {
  if (locale === 'ru') {
    return {
      faqItems: [
        {
          q: 'Сколько обычно длится ремонт компьютера?',
          a: 'Простые работы часто выполняем в тот же или на следующий день. Для более сложных неисправностей срок уточняем после диагностики.',
        },
        {
          q: 'Можно ли сохранить данные во время ремонта?',
          a: 'Во многих случаях данные удаётся сохранить, но перед ремонтом рекомендуем сделать резервную копию или уточнить у мастера варианты копирования данных.',
        },
        {
          q: 'Что делать, если ноутбук сильно греется или шумит?',
          a: 'Чаще всего требуется чистка системы охлаждения и замена термопасты. После диагностики точно скажем, что нужно сделать.',
        },
        {
          q: 'Даете ли вы гарантию на ремонт?',
          a: 'Да, на выполненные работы и установленные детали предоставляем гарантию.',
        },
        {
          q: 'Можно ли узнать примерную стоимость заранее?',
          a: 'Да, после быстрой диагностики назовём ориентировочную стоимость и срок ремонта. Для сложных случаев цену уточняем после проверки.',
        },
      ],
      faqLd: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Сколько обычно длится ремонт компьютера?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Простые работы часто выполняем в тот же или на следующий день. Для более сложных неисправностей срок уточняем после диагностики.',
            },
          },
          {
            '@type': 'Question',
            name: 'Можно ли сохранить данные во время ремонта?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Во многих случаях данные удаётся сохранить, но перед ремонтом рекомендуем сделать резервную копию или уточнить у мастера варианты копирования данных.',
            },
          },
          {
            '@type': 'Question',
            name: 'Что делать, если ноутбук сильно греется или шумит?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Чаще всего требуется чистка системы охлаждения и замена термопасты. После диагностики точно скажем, что нужно сделать.',
            },
          },
          {
            '@type': 'Question',
            name: 'Даете ли вы гарантию на ремонт?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Да, на выполненные работы и установленные детали предоставляем гарантию.',
            },
          },
          {
            '@type': 'Question',
            name: 'Можно ли узнать примерную стоимость заранее?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Да, после быстрой диагностики назовём ориентировочную стоимость и срок ремонта. Для сложных случаев цену уточняем после проверки.',
            },
          },
        ],
      },
    };
  }

  const ctx =
    FAQ_CONTEXT?.COMPUTER ||
    FAQ_CONTEXT?.LAPTOP ||
    FAQ_CONTEXT?.PC ||
    FAQ_CONTEXT?.HOME;

  const modelFaq = getFaqItems(ctx)?.items ?? [];
  if (modelFaq.length) {
    return {
      faqItems: modelFaq,
      faqLd: getFaqLd(ctx),
    };
  }

  const homeFaq = getFaqItems(FAQ_CONTEXT.HOME)?.items ?? [];
  return {
    faqItems: homeFaq,
    faqLd: getFaqLd(FAQ_CONTEXT.HOME),
  };
}

function buildProcessHowToLd(modelPath, deviceName, locale = 'lv') {
  if (locale === 'ru') {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${ORIGIN}${modelPath}#howto`,
      name: `Процесс ремонта ${deviceName} в iLab`,
      description: 'Как по шагам проходит ремонт компьютера в сервисе iLab в Риге.',
      step: [
        {
          '@type': 'HowToStep',
          name: '1. Принесите компьютер в iLab',
          text: 'Принесите свой компьютер в филиал iLab Domina или Spice без предварительной записи.',
        },
        {
          '@type': 'HowToStep',
          name: '2. Диагностика',
          text: 'Проводим первичную диагностику и определяем причину неисправности и возможности ремонта.',
        },
        {
          '@type': 'HowToStep',
          name: '3. Согласование цены и срока',
          text: 'До начала ремонта согласовываем с вами стоимость, тип детали и срок выполнения.',
        },
        {
          '@type': 'HowToStep',
          name: '4. Ремонт и тестирование',
          text: 'Выполняем ремонт, заменяем повреждённые детали и проверяем работу компьютера.',
        },
        {
          '@type': 'HowToStep',
          name: '5. Получите компьютер с гарантией',
          text: 'Вы получаете отремонтированный компьютер с гарантией iLab, чеком и рекомендациями по дальнейшему использованию.',
        },
      ],
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${ORIGIN}${modelPath}#howto`,
    name: `${deviceName} remonta process iLab`,
    description: 'Kā soli pa solim notiek datora remonta process iLab servisā Rīgā.',
    step: [
      {
        '@type': 'HowToStep',
        name: '1. Atved datoru uz iLab',
        text: 'Atnes savu datoru uz iLab Domina vai Spice filiāli bez iepriekšēja pieraksta.',
      },
      {
        '@type': 'HowToStep',
        name: '2. Diagnostika',
        text: 'Veicam sākotnējo diagnostiku un nosakām bojājumu cēloni un remonta iespējas.',
      },
      {
        '@type': 'HowToStep',
        name: '3. Cenu un termiņa saskaņošana',
        text: 'Pirms remonta sākšanas saskaņojam ar tevi cenu, detaļu tipu un remonta laiku.',
      },
      {
        '@type': 'HowToStep',
        name: '4. Remonts un testēšana',
        text: 'Veicam remonta darbus, nomainām bojātās detaļas un pārbaudām datora darbību.',
      },
      {
        '@type': 'HowToStep',
        name: '5. Saņem datoru ar garantiju',
        text: 'Saņem salabotu datoru ar iLab garantiju un čeku, kā arī ieteikumiem turpmākai lietošanai.',
      },
    ],
  };
}

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      homeLabel: 'Главная',
      categoryLabel: 'Ремонт компьютеров',
      brandRepairSuffix: 'ремонт компьютеров',
      deviceRepairSuffix: 'ремонт',
      heroAltSuffix: 'ремонт',
      servicesTitle: (name) => `Популярный ремонт ${name ?? 'этой модели'}`,
      pricesTitle: 'Цены и срок ремонта',
      faqTitle: 'Часто задаваемые вопросы',
      defaultMetaTitle: (deviceName, brandLabel) =>
        deviceName
          ? `${deviceName} ремонт в Риге | iLab`
          : `${brandLabel} ремонт компьютеров | iLab`,
      defaultMetaDescription: (deviceName) =>
        deviceName
          ? `${deviceName} ремонт в Риге: замена аккумулятора и дисплея, восстановление после попадания жидкости, профилактика, клавиатура, touchpad. Быстрая диагностика, честные цены и гарантия.`
          : 'Ремонт компьютеров: замена аккумулятора, дисплея, восстановление после попадания жидкости, профилактика, клавиатура, touchpad. Быстрая диагностика и гарантия в сервисе iLab в Риге.',
      serviceType: (deviceName) => `${deviceName} ремонт`,
      serviceName: (deviceName) => `${deviceName} ремонт`,
      cityName: 'Рига',
      defaultHeaderTitle: 'Ремонт компьютеров',
      defaultHeaderLead:
        'Ремонт компьютеров в Риге - замена аккумулятора и дисплея, восстановление после попадания жидкости, профилактика, замена клавиатуры и touchpad с быстрой диагностикой, качественными деталями и гарантией.',
    };
  }

  return {
    homeLabel: 'Sākums',
    categoryLabel: 'Datoru remonts',
    brandRepairSuffix: 'datoru remonts',
    deviceRepairSuffix: 'remonts',
    heroAltSuffix: 'remonts',
    servicesTitle: (name) => `Populārākie ${name ?? 'šī modeļa'} remonti`,
    pricesTitle: 'Cenas un remonta laiks',
    faqTitle: 'Biežāk uzdotie jautājumi',
    defaultMetaTitle: (deviceName, brandLabel) =>
      deviceName
        ? `${deviceName} remonts Rīgā | iLab`
        : `${brandLabel} datoru remonts | iLab`,
    defaultMetaDescription: (deviceName) =>
      deviceName
        ? `${deviceName} remonts Rīgā: akumulatora un displeja nomaiņa, atjaunošana pēc šķidruma bojājumiem, profilakse, tastatūra, touchpad. Ātra diagnostika, godīgas cenas un garantija.`
        : 'Datoru remonts: akumulatora maiņa, displejs, šķidruma bojājumi, profilakse, tastatūra, touchpad. Ātra diagnostika un garantija iLab servisā Rīgā.',
    serviceType: (deviceName) => `${deviceName} remonts`,
    serviceName: (deviceName) => `${deviceName} remonts`,
    cityName: 'Rīga',
    defaultHeaderTitle: 'Datoru remonts',
    defaultHeaderLead:
      'Datoru remonts Rīgā - akumulatora un displeja nomaiņa, atjaunošana pēc šķidruma bojājumiem, profilakse, tastatūras un touchpad remonts ar ātru diagnostiku, kvalitatīvām detaļām un garantiju.',
  };
}

/* ===== Metadata ===== */

export async function getComputerDeviceMetadata(params, locale = 'lv') {
  const brandSlug = norm(params.brand);
  const slug = norm(params.device);

  const d = await getLaptopDeviceBySlug(brandSlug, slug);
  const strings = getPageStrings(locale);

  const brandLabel =
    pickLocalizedField(d?.brandName, locale) ||
    pickLocalizedField(d?.brandLabel, locale) ||
    d?.brandKey ||
    brandSlug.toUpperCase();

  const deviceName =
    pickLocalizedField(d?.name, locale) ||
    d?.name ||
    slug;

  const title =
    pickLocalizedField(d?.metaTitle, locale) ||
    strings.defaultMetaTitle(d ? deviceName : '', brandLabel);

  const description =
    pickLocalizedField(d?.metaDescription, locale) ||
    strings.defaultMetaDescription(d ? deviceName : '');

  const basePath = buildCategoryHref(locale, COMPUTER_CATEGORY_KEY);

  return {
    title,
    description,
    alternates: {
      canonical: `${basePath}/${brandSlug}/${slug}`,
    },
  };
}

/* ===== Page ===== */

export default async function ComputerDevicePage({
  brand,
  device,
  locale = 'lv',
}) {
  const slug = norm(device);
  const brandSlug = norm(brand);

  const d = await getLaptopDeviceBySlug(brandSlug, slug);
  if (!d) return notFound();

  const strings = getPageStrings(locale);
  const headerUi = getComputerDevicePageHeader(locale);
  const basePath = buildCategoryHref(locale, COMPUTER_CATEGORY_KEY);

  const deviceName =
    pickLocalizedField(d.name, locale) ||
    d.name ||
    slug;

  const brandLabel =
    pickLocalizedField(d.brandName, locale) ||
    pickLocalizedField(d.brandLabel, locale) ||
    d.brandKey ||
    brandSlug.toUpperCase();

  const headerTitle =
    pickLocalizedField(d.h1, locale) ||
    `${deviceName} ${strings.deviceRepairSuffix}`;

  const headerLead =
    pickLocalizedField(d.lead, locale) ||
    pickLocalizedField(d.metaDescription, locale) ||
    strings.defaultHeaderLead;

  const heroBodyHtml =
    pickLocalizedField(d.bodyHtml, locale) || null;

  const { items: priceItems, currency } = await buildPriceListItems(d.slug, locale);
  const modelServices = buildModelServices(locale);
  const { faqItems: finalFaqItems, faqLd } = buildFaqForModel(locale);

  const modelPath = `${basePath}/${brandSlug}/${d.slug}`;
  const brandPath = `${basePath}/${brandSlug}`;

  const provider = buildProvidersFromLocations();

  const headerCrumbs = [
    {
      label: strings.homeLabel,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.categoryLabel,
      href: basePath,
    },
    {
      label: `${brandLabel} ${strings.brandRepairSuffix}`,
      href: brandPath,
    },
    {
      label: headerTitle,
      href: modelPath,
    },
  ];

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeLabel, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.categoryLabel, url: abs(basePath) },
    {
      name: `${brandLabel} ${strings.brandRepairSuffix}`,
      url: abs(brandPath),
    },
    {
      name: headerTitle,
      url: abs(modelPath),
    },
  ]);

  const offers = priceItems.map((it) => {
    const numericPrice =
      typeof it.price === 'number' && Number.isFinite(it.price)
        ? it.price
        : undefined;

    return {
      '@type': 'Offer',
      name: it.title,
      ...(numericPrice !== undefined
        ? {
            price: numericPrice,
            priceCurrency: currency,
          }
        : {}),
      url: abs(`${modelPath}#cenas`),
      itemOffered: {
        '@type': 'Service',
        name: `${deviceName} - ${it.title}`,
        serviceType: it.title,
        provider,
      },
      availability: 'https://schema.org/InStock',
    };
  });

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}${modelPath}#service`,
    serviceType: strings.serviceType(deviceName),
    name: strings.serviceName(deviceName),
    url: abs(modelPath),
    areaServed: { '@type': 'City', name: strings.cityName },
    provider,
    ...(offers.length ? { offers } : {}),
  };

  const processHowToLd = buildProcessHowToLd(modelPath, deviceName, locale);

  const heroAlt = `${deviceName} ${strings.heroAltSuffix}`;
  const headerScrollCta = priceItems.length ? headerUi.scrollCta : null;

  return (
    <>
      <Script
        id={`breadcrumbs-jsonld-datoru-${d.slug}-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id={`service-jsonld-datoru-${d.slug}-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>

      {faqLd && (
        <Script
          id={`faq-jsonld-datoru-${d.slug}-${locale}`}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(faqLd)}
        </Script>
      )}

      <Script
        id={`process-jsonld-datoru-${d.slug}-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(processHowToLd)}
      </Script>

      <PageHeader
        title={headerTitle}
        lead={headerLead}
        scrollCta={headerScrollCta}
        crumbs={headerCrumbs}
      />

      <DeviceHero image={d.image} alt={heroAlt} bodyHtml={heroBodyHtml} />

      <Services
        id="datoru-services"
        title={strings.servicesTitle(deviceName)}
        items={modelServices}
      />

      {!!priceItems.length && (
        <PriceList
          id="cenas"
          title={strings.pricesTitle}
          items={priceItems}
          currency={currency}
          headingLevel={2}
          locale={locale}
        />
      )}

      <Why locale={locale} />
      <Process locale={locale} />

      {!!finalFaqItems.length && (
        <Faq
          id="model-faq"
          title={strings.faqTitle}
          items={finalFaqItems}
          locale={locale}
        />
      )}

      <ConvertBand locale={locale} />
    </>
  );
}