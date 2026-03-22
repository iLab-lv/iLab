import Script from 'next/script';
import { notFound } from 'next/navigation';

import devices from '@/data/devices';
import repairServices from '@/data/repairServices';

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

function getLaptopDeviceBySlug(brandSlug, slug) {
  return (
    devices.find(
      (d) =>
        d.slug === slug &&
        d.brandSlug === brandSlug &&
        d.category === 'datoru-remonts'
    ) || null
  );
}

function toPriceRange(priceStr) {
  if (!priceStr) return { priceFrom: null, priceTo: null, priceText: '' };

  const raw = String(priceStr).trim();
  const p = raw.toLowerCase();
  const priceText = raw;

  const fromMatch = p.match(/(?:^|\s)(?:no|from)\s*([0-9]+(?:[.,][0-9]+)?)/i);
  if (fromMatch) {
    const from = Number(fromMatch[1].replace(',', '.'));
    return { priceFrom: Number.isNaN(from) ? null : from, priceTo: null, priceText };
  }

  const rangeMatch = p.match(
    /^\s*([0-9]+(?:[.,][0-9]+)?)\s*[-–]\s*([0-9]+(?:[.,][0-9]+)?)\s*$/
  );
  if (rangeMatch) {
    const a = Number(rangeMatch[1].replace(',', '.'));
    const b = Number(rangeMatch[2].replace(',', '.'));
    return {
      priceFrom: Number.isNaN(a) ? null : a,
      priceTo: Number.isNaN(b) ? null : b,
      priceText,
    };
  }

  const singleMatch = p.match(/^\s*([0-9]+(?:[.,][0-9]+)?)\s*$/);
  if (singleMatch) {
    const v = Number(singleMatch[1].replace(',', '.'));
    return { priceFrom: null, priceTo: Number.isNaN(v) ? null : v, priceText };
  }

  return { priceFrom: null, priceTo: null, priceText };
}

async function buildPriceListItems(modelSlug, locale = 'lv') {
  const device = devices.find((d) => d.slug === modelSlug) || null;

  const perDeviceTimeText =
    locale === 'ru'
      ? device?.serviceTimeTextOverridesRu || device?.serviceTimeTextOverrides || {}
      : device?.serviceTimeTextOverrides || {};

  const catalogById = new Map(repairServices.map((srv) => [srv.id, srv]));

  const snap = await db
    .collection('modelServices')
    .where('modelId', '==', modelSlug)
    .get();

  const fallbackOnRequest = locale === 'ru' ? 'по запросу' : 'pēc pieprasījuma';
  const defaultSameDay = locale === 'ru' ? 'В тот же день' : 'Tajā pašā dienā';

  const toRow = (base, data = null) => {
    const serviceId = base.id;

    const localizedTitle =
      locale === 'ru'
        ? base.titleRu || base.title
        : base.title;

    const timeText =
      (typeof perDeviceTimeText[serviceId] === 'string' &&
        perDeviceTimeText[serviceId].trim()) ||
      (locale === 'ru'
        ? base.defaultTimeTextRu || base.defaultTimeText
        : base.defaultTimeText) ||
      defaultSameDay;

    const raw = data?.price;

    if (raw === null) return null;

    const priceText =
      data == null
        ? ''
        : typeof raw === 'number'
          ? String(raw)
          : String(raw ?? '').trim();

    const { priceFrom, priceTo } = toPriceRange(priceText);

    return {
      id: serviceId,
      title: localizedTitle,
      family: base.family,
      order: base.order ?? 9999,
      timeText,
      warrantyDays: base.defaultWarrantyDays ?? null,
      price: priceText,
      priceFrom,
      priceTo,
      popular: false,
      emptyPriceLabel: fallbackOnRequest,
      href: base.slug
        ? buildServiceHref(locale, 'datoru-remonts', base.slug)
        : base.href,
    };
  };

  if (snap.empty) {
    const fallback = repairServices
      .filter((s) => s.categories?.includes('datoru-remonts'))
      .map((base) => toRow(base, null))
      .filter(Boolean)
      .sort((a, b) => {
        if ((a.order ?? 9999) !== (b.order ?? 9999)) {
          return (a.order ?? 9999) - (b.order ?? 9999);
        }
        return (a.title || '').localeCompare(b.title || '');
      });

    return { items: fallback, currency: DEFAULT_CURRENCY };
  }

  const merged = snap.docs
    .map((doc) => {
      const data = doc.data() || {};
      const serviceId = data.serviceId;
      if (!serviceId) return null;

      const base = catalogById.get(serviceId);
      if (!base) return null;

      return toRow(base, data);
    })
    .filter(Boolean)
    .sort((a, b) => {
      if ((a.order ?? 9999) !== (b.order ?? 9999)) {
        return (a.order ?? 9999) - (b.order ?? 9999);
      }
      return (a.title || '').localeCompare(b.title || '');
    });

  return { items: merged, currency: DEFAULT_CURRENCY };
}

function buildModelServices(locale = 'lv') {
  if (locale === 'ru') {
    return [
      {
        title: 'Замена аккумулятора',
        href: buildServiceHref(locale, 'datoru-remonts', 'akumulatora-nomaina'),
        text: 'если заряд быстро падает, компьютер выключается или не работает без зарядного устройства.',
        icon: LuBatteryCharging,
      },
      {
        title: 'Замена дисплея',
        href: buildServiceHref(locale, 'datoru-remonts', 'displeja-nomaina'),
        text: 'трещины, полосы, тёмные пятна, мерцание или отсутствие изображения.',
        icon: LuMonitor,
      },
      {
        title: 'Восстановление после попадания жидкости',
        href: buildServiceHref(
          locale,
          'datoru-remonts',
          'atjaunosana-pec-skidruma-bojajumiem'
        ),
        text: 'диагностика и восстановление после попадания жидкости, если ремонт возможен.',
        icon: LuDroplets,
      },
      {
        title: 'Профилактика и техническое обслуживание',
        href: buildServiceHref(
          locale,
          'datoru-remonts',
          'profilakse-un-tehniska-apkalposana'
        ),
        text: 'чистка, замена термопасты, проверка и стабильная работа.',
        icon: LuWrench,
      },
      {
        title: 'Замена клавиатуры',
        href: buildServiceHref(locale, 'datoru-remonts', 'tastaturas-nomaina'),
        text: 'не работают клавиши, залипание, следы жидкости или физические повреждения.',
        icon: LuKeyboard,
      },
      {
        title: 'Замена touchpad',
        href: buildServiceHref(locale, 'datoru-remonts', 'touchpad-nomaina'),
        text: 'не реагирует, курсор двигается сам, не работает клик или есть физические повреждения.',
        icon: LuMouse,
      },
    ];
  }

  return [
    {
      title: 'Akumulatora nomaiņa',
      href: buildServiceHref(locale, 'datoru-remonts', 'akumulatora-nomaina'),
      text: 'ja strauji krīt uzlāde, dators izslēdzas vai nedarbojas bez lādētāja.',
      icon: LuBatteryCharging,
    },
    {
      title: 'Displeja nomaiņa',
      href: buildServiceHref(locale, 'datoru-remonts', 'displeja-nomaina'),
      text: 'plaisas, līnijas, tumši plankumi, mirgošana vai nav attēla.',
      icon: LuMonitor,
    },
    {
      title: 'Atjaunošana pēc šķidruma bojājumiem',
      href: buildServiceHref(
        locale,
        'datoru-remonts',
        'atjaunosana-pec-skidruma-bojajumiem'
      ),
      text: 'diagnostika un atjaunošana pēc šķidruma iekļūšanas, ja tas iespējams.',
      icon: LuDroplets,
    },
    {
      title: 'Profilakse un tehniskā apkalpošana',
      href: buildServiceHref(
        locale,
        'datoru-remonts',
        'profilakse-un-tehniska-apkalposana'
      ),
      text: 'tīrīšana, termopastas nomaiņa, pārbaude un stabila darbība.',
      icon: LuWrench,
    },
    {
      title: 'Tastatūras nomaiņa',
      href: buildServiceHref(locale, 'datoru-remonts', 'tastaturas-nomaina'),
      text: 'nedarbojas taustiņi, pielipšana, šķidruma bojājumi vai fiziski defekti.',
      icon: LuKeyboard,
    },
    {
      title: 'Touchpad nomaiņa',
      href: buildServiceHref(locale, 'datoru-remonts', 'touchpad-nomaina'),
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
  };
}

/* ===== Metadata ===== */

export async function getComputerDeviceMetadata(params, locale = 'lv') {
  const brandSlug = decodeURIComponent(params.brand);
  const slug = decodeURIComponent(params.device);

  const d = getLaptopDeviceBySlug(brandSlug, slug);
  const strings = getPageStrings(locale);

  const brandLabel =
    (locale === 'ru' ? d?.brandNameRu : d?.brandName) ||
    d?.brandName ||
    brandSlug.toUpperCase();

  const title =
    (locale === 'ru' ? d?.metaTitleRu : d?.metaTitle) ||
    d?.metaTitle ||
    strings.defaultMetaTitle(d?.name, brandLabel);

  const description =
    (locale === 'ru' ? d?.metaDescriptionRu : d?.metaDescription) ||
    d?.metaDescription ||
    strings.defaultMetaDescription(d?.name);

  const basePath = buildCategoryHref(locale, 'datoru-remonts');

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
  const slug = decodeURIComponent(device);
  const brandSlug = decodeURIComponent(brand);

  const d = getLaptopDeviceBySlug(brandSlug, slug);
  if (!d) return notFound();

  const strings = getPageStrings(locale);
  const basePath = buildCategoryHref(locale, 'datoru-remonts');

  const { items: priceItems, currency } = await buildPriceListItems(slug, locale);
  const modelServices = buildModelServices(locale);
  const { faqItems: finalFaqItems, faqLd } = buildFaqForModel(locale);

  const brandLabel =
    (locale === 'ru' ? d?.brandNameRu : d?.brandName) ||
    d?.brandName ||
    d.brandSlug.toUpperCase();

  const modelPath = `${basePath}/${brandSlug}/${d.slug}`;
  const brandPath = `${basePath}/${brandSlug}`;

  const provider = buildProvidersFromLocations();

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeLabel, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.categoryLabel, url: abs(basePath) },
    {
      name: `${brandLabel} ${strings.brandRepairSuffix}`,
      url: abs(brandPath),
    },
    {
      name: `${d.name} ${strings.deviceRepairSuffix}`,
      url: abs(modelPath),
    },
  ]);

  const offers = priceItems.map((it) => {
    const priceStr = it.price == null ? '' : String(it.price);
    const singleNumeric = /^\s*[0-9]+([.,][0-9]+)?\s*$/.test(priceStr)
      ? Number(priceStr.replace(',', '.'))
      : undefined;

    return {
      '@type': 'Offer',
      name: it.title,
      ...(singleNumeric !== undefined
        ? {
            price: singleNumeric,
            priceCurrency: currency,
          }
        : {}),
      url: abs(`${modelPath}#cenas`),
      itemOffered: {
        '@type': 'Service',
        name: `${d.name} — ${it.title}`,
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
    serviceType: strings.serviceType(d.name),
    name: strings.serviceName(d.name),
    url: abs(modelPath),
    areaServed: { '@type': 'City', name: strings.cityName },
    provider,
    ...(offers.length ? { offers } : {}),
  };

  const processHowToLd = buildProcessHowToLd(modelPath, d.name, locale);

  const heroAlt =
    locale === 'ru'
      ? `${d.name} ${strings.heroAltSuffix}`
      : `${d.name} ${strings.heroAltSuffix}`;

  const heroBodyHtml =
    locale === 'ru'
      ? d.bodyHtmlRu || d.bodyHtml || null
      : d.bodyHtml || d.bodyHtmlRu || null;

  return (
    <>
      <Script
        id={`breadcrumbs-jsonld-datoru-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id={`service-jsonld-datoru-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>

      {faqLd && (
        <Script
          id={`faq-jsonld-datoru-${locale}`}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(faqLd)}
        </Script>
      )}

      <Script
        id={`process-jsonld-datoru-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(processHowToLd)}
      </Script>

      <DeviceHero image={d.image} alt={heroAlt} bodyHtml={heroBodyHtml} />

      <Services
        id="datoru-services"
        title={strings.servicesTitle(d?.name)}
        items={modelServices}
      />

      {priceItems.length > 0 && (
        <PriceList
          id="cenas"
          title={strings.pricesTitle}
          items={priceItems}
          currency={DEFAULT_CURRENCY}
          headingLevel={2}
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