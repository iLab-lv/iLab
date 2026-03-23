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
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';

// Firestore (Admin SDK, server-side)
import { db } from '@/lib/firebaseAdmin';

export const revalidate = 0;
const DEFAULT_CURRENCY = 'EUR';

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      categoryKey: 'telefonu-remonts',
      canonicalCategoryPath: '/ru/remont-telefonov',
      homeCrumb: 'Главная',
      categoryCrumb: 'Ремонт телефонов',
      faqTitle: 'Часто задаваемые вопросы',
      priceTitle: 'Цены и сроки ремонта',
      heroAltSuffix: 'ремонт',
      servicesTitle: (name) => `Популярные ремонты ${name ?? 'этой модели'}`,
      serviceLdName: (name) => `Ремонт ${name}`,
      brandCrumb: (brandLabel) => `Ремонт телефонов ${brandLabel}`,
      modelCrumb: (name) => `Ремонт ${name}`,
      metaFallbackTitle: (brandLabel) => `Ремонт телефонов ${brandLabel} | iLab`,
      metaFallbackDescriptionModel: (name) =>
        `Ремонт ${name} в Риге: замена экрана, батареи, ремонт разъёма зарядки, камеры и другие неисправности. Быстрая диагностика, понятные цены и гарантия.`,
      metaFallbackDescriptionCategory:
        'Ремонт телефонов: замена экрана, батареи, разъёма зарядки, камеры и устранение других неисправностей. Быстрая диагностика и гарантия в сервисе iLab в Риге.',
      processTitle: 'Как проходит ремонт',
      processProps: {
        id: 'process',
        title: 'Как проходит ремонт',
        steps: [
          {
            title: 'Приносите телефон в iLab',
            text: 'Принесите телефон в филиал iLab в Domina или Spice без предварительной записи.',
          },
          {
            title: 'Бесплатная диагностика',
            text: 'Проводим первичную диагностику, определяем причину неисправности и варианты ремонта.',
          },
          {
            title: 'Согласование цены и срока',
            text: 'До начала ремонта согласовываем с вами цену, тип детали и срок выполнения.',
          },
          {
            title: 'Ремонт и тестирование',
            text: 'Выполняем ремонт, заменяем повреждённые детали и проверяем работу телефона.',
          },
          {
            title: 'Получаете телефон с гарантией',
            text: 'Вы получаете отремонтированный телефон с гарантией iLab, чеком и рекомендациями по дальнейшему использованию.',
          },
        ],
        headingLevel: 2,
        variant: 'cards',
      },
      howToName: (deviceName) => `Процесс ремонта ${deviceName} в iLab`,
      howToDescription:
        'Как шаг за шагом проходит процесс ремонта телефона в сервисе iLab в Риге.',
      howToStepsLd: [
        {
          '@type': 'HowToStep',
          name: '1. Приносите телефон в iLab',
          text: 'Принесите телефон в филиал iLab в Domina или Spice без предварительной записи.',
        },
        {
          '@type': 'HowToStep',
          name: '2. Бесплатная диагностика',
          text: 'Проводим первичную диагностику, определяем причину неисправности и варианты ремонта.',
        },
        {
          '@type': 'HowToStep',
          name: '3. Согласование цены и срока',
          text: 'До начала ремонта согласовываем с вами цену, тип детали и срок выполнения.',
        },
        {
          '@type': 'HowToStep',
          name: '4. Ремонт и тестирование',
          text: 'Выполняем ремонт, заменяем повреждённые детали и проверяем работу телефона.',
        },
        {
          '@type': 'HowToStep',
          name: '5. Получаете телефон с гарантией',
          text: 'Вы получаете отремонтированный телефон с гарантией iLab, чеком и рекомендациями по дальнейшему использованию.',
        },
      ],
      services: (categoryPath) => [
        {
          title: 'Замена экрана',
          href: `${categoryPath}/zamena-ekrana`,
          text: 'трещины, полосы, тёмные пятна, не работает сенсор.',
          icon: LuSmartphone,
        },
        {
          title: 'Замена аккумулятора',
          href: `${categoryPath}/zamena-batarei`,
          text: 'быстро падает заряд, телефон выключается на 10–20%.',
          icon: LuBatteryCharging,
        },
        {
          title: 'Замена разъёма зарядки',
          href: `${categoryPath}/remont-razema-zaryadki`,
          text: 'кабель не держится, зарядка медленная или нестабильная.',
          icon: LuPlugZap,
        },
        {
          title: 'Ремонт камеры',
          href: `${categoryPath}/remont-kamery`,
          text: 'размытые фото, чёрные пятна, проблемы с фокусировкой.',
          icon: LuCamera,
        },
        {
          title: 'Ремонт динамика и микрофона',
          href: `${categoryPath}/remont-dinamika-i-mikrofona`,
          text: 'тихий звук, хрипы, во время звонка не слышно вас или собеседника.',
          icon: LuVolume2,
        },
        {
          title: 'Ремонт после попадания влаги',
          href: `${categoryPath}/remont-posle-popadaniya-vlagi`,
          text: 'диагностика и восстановление после попадания жидкости, если это возможно.',
          icon: LuDroplets,
        },
      ],
      sameDayText: 'В тот же день',
    };
  }

  return {
    categoryKey: 'telefonu-remonts',
    canonicalCategoryPath: '/telefonu-remonts',
    homeCrumb: 'Sākums',
    categoryCrumb: 'Telefonu remonts',
    faqTitle: 'Biežāk uzdotie jautājumi',
    priceTitle: 'Cenas un remonta laiks',
    heroAltSuffix: 'remonts',
    servicesTitle: (name) => `Populārākie ${name ?? 'šī modeļa'} remonti`,
    serviceLdName: (name) => `${name} remonts`,
    brandCrumb: (brandLabel) => `${brandLabel} telefonu remonts`,
    modelCrumb: (name) => `${name} remonts`,
    metaFallbackTitle: (brandLabel) => `${brandLabel} telefonu remonts | iLab`,
    metaFallbackDescriptionModel: (name) =>
      `${name} remonts Rīgā: ekrāna maiņa, baterijas maiņa, uzlādes ligzdas remonts, kameras un citi bojājumi. Ātra diagnostika, godīgas cenas un garantija.`,
    metaFallbackDescriptionCategory:
      'Telefonu remonts: ekrāna maiņa, baterijas maiņa, uzlādes ligzda, kamera un citi bojājumi. Ātra diagnostika un garantija iLab servisā Rīgā.',
    processTitle: 'Kā notiek remonts',
    processProps: {
      id: 'process',
      title: 'Kā notiek remonts',
      steps: [
        {
          title: 'Atved telefonu uz iLab',
          text: 'Atnes savu telefonu uz iLab Domina vai Spice filiāli bez iepriekšēja pieraksta.',
        },
        {
          title: 'Bezmaksas diagnostika',
          text: 'Veicam sākotnējo diagnostiku un nosakām bojājumu cēloni un remonta iespējas.',
        },
        {
          title: 'Cenu un termiņa saskaņošana',
          text: 'Pirms remonta sākšanas saskaņojam ar tevi cenu, detaļu tipu un remonta laiku.',
        },
        {
          title: 'Remonts un testēšana',
          text: 'Veicam remonta darbus, nomainām bojātās detaļas un pārbaudām tālruņa darbību.',
        },
        {
          title: 'Saņem telefonu ar garantiju',
          text: 'Saņem salabotu telefonu ar iLab garantiju un čeku, kā arī ieteikumiem turpmākai lietošanai.',
        },
      ],
      headingLevel: 2,
      variant: 'cards',
    },
    howToName: (deviceName) => `${deviceName} remonta process iLab`,
    howToDescription:
      'Kā soli pa solim notiek telefona remonta process iLab servisā Rīgā.',
    howToStepsLd: [
      {
        '@type': 'HowToStep',
        name: '1. Atved telefonu uz iLab',
        text: 'Atnes savu telefonu uz iLab Domina vai Spice filiāli bez iepriekšēja pieraksta.',
      },
      {
        '@type': 'HowToStep',
        name: '2. Bezmaksas diagnostika',
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
        text: 'Veicam remonta darbus, nomainām bojātās detaļas un pārbaudām tālruņa darbību.',
      },
      {
        '@type': 'HowToStep',
        name: '5. Saņem telefonu ar garantiju',
        text: 'Saņem salabotu telefonu ar iLab garantiju un čeku, kā arī ieteikumiem turpmākai lietošanai.',
      },
    ],
    services: (categoryPath) => [
      {
        title: 'Ekrāna maiņa',
        href: `${categoryPath}/ekrana-maina`,
        text: 'plaisas, līnijas, tumši plankumi, nereaģē skārienjūtīgais ekrāns.',
        icon: LuSmartphone,
      },
      {
        title: 'Baterijas maiņa',
        href: `${categoryPath}/baterijas-maina`,
        text: 'strauji krīt uzlādes līmenis, telefons izslēdzas pie 10–20%.',
        icon: LuBatteryCharging,
      },
      {
        title: 'Uzlādes ligzdas maiņa',
        href: `${categoryPath}/uzlades-ligzdas-maina`,
        text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
        icon: LuPlugZap,
      },
      {
        title: 'Kameras remonts',
        href: `${categoryPath}/kameras-remonts`,
        text: 'miglaini attēli, melni plankumi, fokusēšanās problēmas.',
        icon: LuCamera,
      },
      {
        title: 'Skaļruņu un mikrofona remonts',
        href: `${categoryPath}/skalruni-mikrofona-remonts`,
        text: 'klusa skaņa, krakšķi, sarunas laikā nedzird vai neviens nedzird jūs.',
        icon: LuVolume2,
      },
      {
        title: 'Ūdens bojājumu remonts',
        href: `${categoryPath}/udens-bojajumu-remonts`,
        text: 'diagnostika un atjaunošana pēc šķidruma iekļūšanas, ja tas iespējams.',
        icon: LuDroplets,
      },
    ],
    sameDayText: 'Tajā pašā dienā',
  };
}

function getPhoneDeviceBySlug(brandSlug, slug) {
  return (
    devices.find(
      (d) =>
        d.slug === slug &&
        d.brandSlug === brandSlug &&
        d.category === 'telefonu-remonts'
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

async function buildPriceListItems(modelSlug, locale = 'lv') {
  const device = devices.find((d) => d.slug === modelSlug) || null;
  const perDeviceTimeText = device?.serviceTimeTextOverrides || {};
  const catalogById = new Map(repairServices.map((srv) => [srv.id, srv]));
  const strings = getPageStrings(locale);

  const snap = await db
    .collection('modelServices')
    .where('modelId', '==', modelSlug)
    .get();

  if (snap.empty) {
    return { items: [], currency: DEFAULT_CURRENCY };
  }

  const merged = snap.docs
    .map((doc) => {
      const data = doc.data() || {};
      const serviceId = data.serviceId;
      if (!serviceId) return null;

      const base = catalogById.get(serviceId);
      if (!base) return null;

      const timeText =
        (typeof perDeviceTimeText[serviceId] === 'string' &&
          perDeviceTimeText[serviceId].trim()) ||
        base.defaultTimeText ||
        strings.sameDayText;

      const raw = data.price;
      if (raw === null) return null;

      const priceText =
        typeof raw === 'number' ? String(raw) : String(raw ?? '').trim();

      const { priceFrom, priceTo } = toPriceRange(priceText);

      return {
        id: serviceId,
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

function buildFaqForModel() {
  const phoneFaq = getFaqItems(FAQ_CONTEXT.PHONE)?.items ?? [];
  if (phoneFaq.length) {
    return {
      faqItems: phoneFaq,
      faqLd: getFaqLd(FAQ_CONTEXT.PHONE),
    };
  }

  const homeFaq = getFaqItems(FAQ_CONTEXT.HOME)?.items ?? [];
  return {
    faqItems: homeFaq,
    faqLd: getFaqLd(FAQ_CONTEXT.HOME),
  };
}

function buildProcessHowToLd(modelPath, deviceName, locale = 'lv') {
  const strings = getPageStrings(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${ORIGIN}${modelPath}#howto`,
    name: strings.howToName(deviceName),
    description: strings.howToDescription,
    step: strings.howToStepsLd,
  };
}

async function generateMetadataImpl({ params, locale = 'lv' }) {
  const { brand, device } = await params;
  const slug = decodeURIComponent(device);
  const brandSlug = decodeURIComponent(brand);
  const d = getPhoneDeviceBySlug(brandSlug, slug);
  const strings = getPageStrings(locale);

  const brandLabel = d?.brandName || brandSlug.toUpperCase();

  const title =
    d?.metaTitle ||
    (d
      ? locale === 'ru'
        ? `Ремонт ${d.name} в Риге | iLab`
        : `${d.name} remonts Rīgā | iLab`
      : strings.metaFallbackTitle(brandLabel));

  const description =
    d?.metaDescription ||
    (d
      ? strings.metaFallbackDescriptionModel(d.name)
      : strings.metaFallbackDescriptionCategory);

  const canonicalBase =
    locale === 'ru' ? '/ru/remont-telefonov' : '/telefonu-remonts';

  return {
    title,
    description,
    alternates: { canonical: `${canonicalBase}/${brandSlug}/${slug}` },
  };
}

async function PhoneDevicePage({ params, locale = 'lv' }) {
  const { brand, device } = await params;
  const slug = decodeURIComponent(device);
  const brandSlug = decodeURIComponent(brand);

  const d = getPhoneDeviceBySlug(brandSlug, slug);
  if (!d) return notFound();

  const strings = getPageStrings(locale);
  const { items: priceItems, currency } = await buildPriceListItems(slug, locale);
  const modelServices = strings.services(strings.canonicalCategoryPath);
  const { faqItems: finalFaqItems, faqLd } = buildFaqForModel();

  const brandLabel = d.brandName || d.brandSlug.toUpperCase();
  const modelPath = `${strings.canonicalCategoryPath}/${brandSlug}/${d.slug}`;
  const provider = buildProvidersFromLocations();

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.categoryCrumb, url: abs(strings.canonicalCategoryPath) },
    {
      name: strings.brandCrumb(brandLabel),
      url: abs(`${strings.canonicalCategoryPath}/${brandSlug}`),
    },
    {
      name: strings.modelCrumb(d.name),
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
    serviceType: strings.serviceLdName(d.name),
    name: strings.serviceLdName(d.name),
    url: abs(modelPath),
    areaServed: { '@type': 'City', name: 'Rīga' },
    provider,
    ...(offers.length ? { offers } : {}),
  };

  const processHowToLd = buildProcessHowToLd(modelPath, d.name, locale);

  return (
    <>
      <Script
        id="breadcrumbs-jsonld-telefonu"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id="service-jsonld-telefonu"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>

      {faqLd && (
        <Script
          id="faq-jsonld-telefonu"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(faqLd)}
        </Script>
      )}

      <Script
        id="process-jsonld-telefonu"
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
        id="telefonu-services"
        title={strings.servicesTitle(d?.name)}
        items={modelServices}
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

      <Process {...strings.processProps} />

      {!!finalFaqItems.length && (
        <Faq
          id="model-faq"
          title={strings.faqTitle}
          items={finalFaqItems}
        />
      )}

      <ConvertBand locale={locale} />
    </>
  );
}

PhoneDevicePage.generateMetadata = generateMetadataImpl;

export default PhoneDevicePage;