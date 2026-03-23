import Script from 'next/script';
import { notFound } from 'next/navigation';

import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';
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
  LuTabletSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuDroplets,
} from 'react-icons/lu';

import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';
import { buildDeviceHref, buildCategoryHref } from '@/lib/routes/routeI18n';

const DEFAULT_CURRENCY = 'EUR';

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      categoryName: 'Ремонт планшетов',
      modelMetaFallback: 'Ремонт планшетов: экран, батарея, зарядка, камера. Бесплатная диагностика и гарантия 90 дней.',
      heroAltSuffix: 'ремонт',
      servicesTitle: (name) => `Популярные ремонты ${name ?? 'этой модели'}`,
      priceTitle: 'Цены и сроки ремонта',
      faqTitle: 'Часто задаваемые вопросы',
      processTitle: 'Как проходит ремонт',
      processSteps: [
        {
          title: 'Диагностика',
          text: 'Быстро проверяем планшет и подтверждаем проблему: экран, батарея, зарядка, звук и другие неисправности.',
        },
        {
          title: 'Цена и срок',
          text: 'До начала ремонта согласовываем стоимость и срок выполнения.',
        },
        {
          title: 'Ремонт',
          text: 'Сертифицированные мастера выполняют ремонт с использованием качественных деталей.',
        },
        {
          title: 'Проверка',
          text: 'После ремонта тестируем экран, сенсор, зарядку, звук и другие важные функции.',
        },
        {
          title: 'Гарантия',
          text: 'Гарантия 90 дней на детали и работу, плюс рекомендации по дальнейшему использованию.',
        },
      ],
      modelServices: [
        {
          title: 'Замена дисплея',
          text: 'трещины, пятна, сенсор не реагирует.',
          icon: LuTabletSmartphone,
        },
        {
          title: 'Замена аккумулятора',
          text: 'быстро разряжается, выключается на 10–20%.',
          icon: LuBatteryCharging,
        },
        {
          title: 'Ремонт разъёма зарядки',
          text: 'кабель не держится, зарядка медленная или нестабильная.',
          icon: LuPlugZap,
        },
        {
          title: 'Ремонт камеры',
          text: 'размытые фото, проблемы с фокусировкой.',
          icon: LuCamera,
        },
        {
          title: 'Повреждение влагой',
          text: 'диагностика и восстановление, если это возможно.',
          icon: LuDroplets,
        },
      ],
      breadcrumbsHome: 'Главная',
      brandCategoryName: (brandLabel) => `Ремонт планшетов ${brandLabel}`,
      modelRepairName: (deviceName) => `Ремонт ${deviceName}`,
      howToName: (deviceName) => `Процесс ремонта ${deviceName} в iLab`,
      howToDescription:
        'Как шаг за шагом проходит диагностика, ремонт и тестирование планшета в сервисе iLab в Риге.',
      howToStepsLd: [
        {
          '@type': 'HowToStep',
          name: '1. Диагностика',
          text: 'Быстро проверяем планшет, подтверждаем неисправность и оцениваем объём повреждения.',
        },
        {
          '@type': 'HowToStep',
          name: '2. Цена и срок',
          text: 'До начала ремонта согласовываем стоимость, тип детали и срок выполнения.',
        },
        {
          '@type': 'HowToStep',
          name: '3. Ремонт',
          text: 'Сертифицированные мастера выполняют ремонт экрана, батареи, разъёма зарядки, камеры или других компонентов с использованием качественных деталей.',
        },
        {
          '@type': 'HowToStep',
          name: '4. Проверка',
          text: 'После ремонта тестируем экран, сенсор, звук, зарядку, сеть и другие важные для повседневного использования функции.',
        },
        {
          '@type': 'HowToStep',
          name: '5. Гарантия и выдача',
          text: 'Выдаём планшет с гарантией 90 дней на детали и работу, а также даём рекомендации по дальнейшему использованию.',
        },
      ],
    };
  }

  return {
    categoryName: 'Planšetdatoru remonts',
    modelMetaFallback:
      'Planšetdatoru remonts: displejs, baterija, uzlāde, kamera. Bezmaksas diagnostika un 90 dienu garantija.',
    heroAltSuffix: 'remonts',
    servicesTitle: (name) => `Populārākie ${name ?? 'šī modeļa'} remonti`,
    priceTitle: 'Cenas un remonta laiks',
    faqTitle: 'Biežāk uzdotie jautājumi',
    processTitle: 'Kā notiek remonts',
    processSteps: [
      {
        title: 'Diagnostika',
        text: 'Ātri pārbaudām planšetdatoru un apstiprinām problēmu (ekrāns, baterija, uzlāde, skaņa u.c.).',
      },
      {
        title: 'Cena un termiņš',
        text: 'Pirms remonta sākšanas saskaņojam izmaksas un izpildes laiku.',
      },
      {
        title: 'Remonts',
        text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.',
      },
      {
        title: 'Pārbaude',
        text: 'Pēc remonta testējam ekrānu, skārienu, uzlādi, skaņu un citas funkcijas.',
      },
      {
        title: 'Garantija',
        text: '90 dienu garantija uz detaļu un darbu, plus ieteikumi turpmākai lietošanai.',
      },
    ],
    modelServices: [
      {
        title: 'Displeja (ekrāna) maiņa',
        text: 'plaisas, plankumi, nereaģē skāriens.',
        icon: LuTabletSmartphone,
      },
      {
        title: 'Akumulatora maiņa',
        text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
        icon: LuBatteryCharging,
      },
      {
        title: 'Uzlādes ligzdas remonts',
        text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
        icon: LuPlugZap,
      },
      {
        title: 'Kameras remonts',
        text: 'miglaini attēli, fokusēšanās problēmas.',
        icon: LuCamera,
      },
      {
        title: 'Ūdens bojājumi',
        text: 'diagnostika un atjaunošana, ja tas iespējams.',
        icon: LuDroplets,
      },
    ],
    breadcrumbsHome: 'Sākums',
    brandCategoryName: (brandLabel) => `${brandLabel} planšetdatoru remonts`,
    modelRepairName: (deviceName) => `${deviceName} remonts`,
    howToName: (deviceName) => `${deviceName} remonta process iLab`,
    howToDescription:
      'Kā soli pa solim notiek planšetdatora diagnostika, remonts un testēšana iLab servisā Rīgā.',
    howToStepsLd: [
      {
        '@type': 'HowToStep',
        name: '1. Diagnostika',
        text: 'Ātri pārbaudām planšetdatoru, apstiprinām problēmu (displejs, baterija, uzlāde, skaņa u.c.) un izvērtējam bojājuma apmēru.',
      },
      {
        '@type': 'HowToStep',
        name: '2. Cena un termiņš',
        text: 'Pirms remonta sākšanas saskaņojam izmaksas, detaļu veidu (oriģināls vai OEM) un izpildes termiņu.',
      },
      {
        '@type': 'HowToStep',
        name: '3. Remonts',
        text: 'Sertificēti meistari veic ekrāna, baterijas, uzlādes ligzdas, kameras vai citu komponentu remontu, izmantojot kvalitatīvas detaļas.',
      },
      {
        '@type': 'HowToStep',
        name: '4. Pārbaude',
        text: 'Pēc remonta testējam ekrānu, skārienu, skaņu, uzlādi, tīklu un citas ikdienai svarīgas funkcijas, lai pārliecinātos par stabilu darbību.',
      },
      {
        '@type': 'HowToStep',
        name: '5. Garantija un izsniegšana',
        text: 'Izsniedzam planšetdatoru ar 90 dienu garantiju uz detaļu un darbu, sniedzam ieteikumus turpmākai lietošanai.',
      },
    ],
  };
}

function getTabletDeviceBySlug(slug) {
  return (
    devices.find(
      (d) => d.slug === slug && d.category === 'plansetdatoru-remonts'
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
    return { priceFrom: isNaN(from) ? null : from, priceTo: null, priceText };
  }

  const rangeMatch = p.match(
    /^\s*([0-9]+(?:[.,][0-9]+)?)\s*[-–]\s*([0-9]+(?:[.,][0-9]+)?)\s*$/
  );
  if (rangeMatch) {
    const a = Number(rangeMatch[1].replace(',', '.'));
    const b = Number(rangeMatch[2].replace(',', '.'));
    return {
      priceFrom: isNaN(a) ? null : a,
      priceTo: isNaN(b) ? null : b,
      priceText,
    };
  }

  const singleMatch = p.match(/^\s*([0-9]+(?:[.,][0-9]+)?)\s*$/);
  if (singleMatch) {
    const v = Number(singleMatch[1].replace(',', '.'));
    return { priceFrom: null, priceTo: isNaN(v) ? null : v, priceText };
  }

  return { priceFrom: null, priceTo: null, priceText };
}

function buildPriceListItems(modelSlug, locale = 'lv') {
  const pricing = devicePricing[modelSlug];
  if (!pricing || !Array.isArray(pricing.items)) {
    return { items: [], currency: DEFAULT_CURRENCY };
  }

  const device = getTabletDeviceBySlug(modelSlug);
  const perDeviceTimeText = device?.serviceTimeTextOverrides || {};
  const catalogById = new Map(repairServices.map((srv) => [srv.id, srv]));

  const fallbackTimeText =
    locale === 'ru' ? 'В тот же день' : 'Tajā pašā dienā';

  const merged = pricing.items
    .map((it) => {
      const base = catalogById.get(it.id);
      if (!base) return null;

      const timeText =
        (typeof perDeviceTimeText[it.id] === 'string' &&
          perDeviceTimeText[it.id].trim()) ||
        base.defaultTimeText ||
        fallbackTimeText;

      const raw = it?.price;
      if (raw == null) return null;
      const priceText = typeof raw === 'number' ? String(raw) : String(raw).trim();

      const { priceFrom, priceTo } = toPriceRange(priceText);

      return {
        id: it.id,
        title: base.title,
        family: base.family,
        order: base.order ?? 9999,
        timeText,
        warrantyDays: base.defaultWarrantyDays ?? null,
        price: priceText,
        priceFrom,
        priceTo,
        popular: false,
        href: base.slug ? `/${base.slug}` : base.href,
      };
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

function getFaqData(locale = 'lv') {
  const phoneFaq = getFaqItems(FAQ_CONTEXT.PHONE)?.items ?? [];
  const homeFaq = !phoneFaq.length ? getFaqItems(FAQ_CONTEXT.HOME)?.items ?? [] : [];
  const items = phoneFaq.length ? phoneFaq : homeFaq;
  const ld = phoneFaq.length ? getFaqLd(FAQ_CONTEXT.PHONE) : getFaqLd(FAQ_CONTEXT.HOME);

  return { items, ld };
}

async function generateMetadataImpl({ params, locale = 'lv' }) {
  const { brand, device } = await params;
  const slug = decodeURIComponent(device);
  const d = getTabletDeviceBySlug(slug);
  const strings = getPageStrings(locale);

  const title = d ? `${d.name} ${strings.heroAltSuffix} | iLab` : `${strings.categoryName} | iLab`;

  const description = d?.metaDescription || strings.modelMetaFallback;
  const canonicalPath = d
    ? buildDeviceHref(locale, 'plansetdatoru-remonts', decodeURIComponent(brand), slug)
    : buildCategoryHref(locale, 'plansetdatoru-remonts');

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
  };
}

async function TabletDevicePage({ params, locale = 'lv' }) {
  const { brand, device } = await params;
  const slug = decodeURIComponent(device);
  const brandSlug = decodeURIComponent(brand);

  const d = getTabletDeviceBySlug(slug);
  if (!d) return notFound();

  const strings = getPageStrings(locale);
  const { items: priceItems, currency } = buildPriceListItems(slug, locale);
  const { items: faqItems, ld: faqLd } = getFaqData(locale);

  const provider = buildProvidersFromLocations();
  const brandLabel = d.brandName || d.brandSlug?.toUpperCase() || brandSlug;

  const categoryPath = buildCategoryHref(locale, 'plansetdatoru-remonts');
  const brandPath = `${categoryPath}/${brandSlug}`;
  const modelPath = buildDeviceHref(
    locale,
    'plansetdatoru-remonts',
    brandSlug,
    d.slug
  );

  const breadcrumbsLd = buildBreadcrumbsLd([
    {
      name: strings.breadcrumbsHome,
      url: abs(locale === 'ru' ? '/ru' : '/'),
    },
    {
      name: strings.categoryName,
      url: abs(categoryPath),
    },
    {
      name: strings.brandCategoryName(brandLabel),
      url: abs(brandPath),
    },
    {
      name: strings.modelRepairName(d.name),
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
      ...(singleNumeric
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
    serviceType: strings.modelRepairName(d.name),
    name: strings.modelRepairName(d.name),
    url: abs(modelPath),
    areaServed: { '@type': 'City', name: 'Rīga' },
    provider,
    ...(offers.length ? { offers } : {}),
  };

  const processHowToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${ORIGIN}${modelPath}#howto`,
    name: strings.howToName(d.name),
    description: strings.howToDescription,
    step: strings.howToStepsLd,
  };

  return (
    <>
      <Script
        id="breadcrumbs-jsonld-tablet"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script
        id="service-jsonld-tablet"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>
      <Script
        id="faq-jsonld-tablet"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqLd)}
      </Script>
      <Script
        id="process-jsonld-tablet"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(processHowToLd)}
      </Script>

      <DeviceHero
        image={d.image}
        alt={`${d.name} ${strings.heroAltSuffix}`}
        bodyHtml={d.bodyHtml || null}
      />

      <Services
        id="tablet-services"
        title={strings.servicesTitle(d?.name)}
        items={strings.modelServices}
        headingLevel={2}
        variant="list"
      />

      {priceItems.length > 0 && (
        <PriceList
          id="cenas"
          title={strings.priceTitle}
          items={priceItems}
          currency={DEFAULT_CURRENCY}
          headingLevel={2}
        />
      )}

      <Why locale={locale} />

      <Process
        id="process"
        title={strings.processTitle}
        steps={strings.processSteps}
        headingLevel={2}
        variant="cards"
      />

      <Faq
        id="tablet-model-faq"
        title={strings.faqTitle}
        items={faqItems}
      />

      <ConvertBand locale={locale} />
    </>
  );
}

TabletDevicePage.generateMetadata = generateMetadataImpl;

export default TabletDevicePage;