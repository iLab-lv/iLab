import Script from 'next/script';
import { notFound } from 'next/navigation';

import { getDevices } from '@/lib/content/devices';
import {
  getBrandByCategory,
  getSeriesMetaByCategoryBrand,
} from '@/lib/content/categories';

import DeviceHero from '@sections/device-hero/DeviceHero';
import DeviceSelector from '@sections/device-selector/DeviceSelector';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import c from '@styles/Catalog.module.scss';

import {
  getBrandContent,
  listBrandsForCategory,
  BRAND_CATEGORY,
} from '@/data/brandContent';

import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildStandardRepairHowToLd,
  buildFaqLdFromPairs,
} from '@/lib/seo/jsonldHelpers';
import { buildCategoryHref, buildServiceHref } from '@/lib/routes/routeI18n';

/* ---------------------------------------------
   Static params
---------------------------------------------- */
export async function generatePhoneBrandStaticParams() {
  const brands = listBrandsForCategory(BRAND_CATEGORY.PHONES) || [];

  return brands
    .filter((b) => String(b.slug).toLowerCase() !== 'apple')
    .map((b) => ({ brand: String(b.slug).toLowerCase() }));
}

/* ---------------------------------------------
   Helpers
---------------------------------------------- */
async function getPhoneBrandConfig(brandSlug) {
  const brand = await getBrandByCategory('telefonu-remonts', brandSlug);

  return {
    brandKey: brand?.key || brandSlug,
    heroImage: brand?.image || '/images/categories/telefonu_remonts.webp',
    logo: brand?.logo || null,
    tint: 'rgba(0,200,180,0.20)',
    heroAlt:
      brand?.labels?.lv ||
      brand?.name ||
      'Telefonu remonts',
  };
}

const PROCESS_STEPS_LV = [
  {
    title: 'Diagnostika',
    text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.',
  },
  {
    title: 'Cena un termiņš',
    text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
  },
  {
    title: 'Remonts',
    text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.',
  },
  {
    title: 'Pārbaude',
    text: 'Pēc remonta testējam visu funkcionalitāti un drošību.',
  },
  {
    title: 'Garantija',
    text: '90 dienu garantija un ieteikumi turpmākai lietošanai.',
  },
];

const PROCESS_STEPS_RU = [
  {
    title: 'Диагностика',
    text: 'Быстро проверяем устройство и подтверждаем проблему.',
  },
  {
    title: 'Цена и срок',
    text: 'Согласовываем стоимость и срок выполнения до начала работ.',
  },
  {
    title: 'Ремонт',
    text: 'Сертифицированные мастера выполняют ремонт с использованием качественных деталей.',
  },
  {
    title: 'Проверка',
    text: 'После ремонта тестируем всю функциональность и безопасность устройства.',
  },
  {
    title: 'Гарантия',
    text: 'Гарантия 90 дней и рекомендации по дальнейшему использованию.',
  },
];

const FAQ_ITEMS_LV = [
  {
    q: 'Cik ilgi ilgst telefona displeja maiņa?',
    a: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.',
  },
  {
    q: 'Vai mani dati saglabāsies?',
    a: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.',
  },
  {
    q: 'Vai detaļām ir garantija?',
    a: 'Jā, gan detaļām, gan darbam.',
  },
  {
    q: 'Vai pieejamas oriģinālas detaļas?',
    a: 'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.',
  },
  {
    q: 'Vai varu saņemt aptuveno cenu pirms remonta?',
    a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.',
  },
];

const FAQ_ITEMS_RU = [
  {
    q: 'Сколько занимает замена экрана телефона?',
    a: 'Часто 1–3 часа, в зависимости от модели и загрузки сервиса.',
  },
  {
    q: 'Сохранятся ли мои данные?',
    a: 'Мы делаем всё возможное; перед ремонтом рекомендуем резервную копию.',
  },
  {
    q: 'Есть ли гарантия на детали?',
    a: 'Да, и на детали, и на работу.',
  },
  {
    q: 'Доступны ли оригинальные детали?',
    a: 'Используем оригинальные или качественные OEM детали — выбор согласовываем с клиентом.',
  },
  {
    q: 'Можно ли узнать примерную цену до ремонта?',
    a: 'Да, после быстрой диагностики назовём диапазон стоимости и срок.',
  },
];

function getPopularRepairs(locale = 'lv') {
  if (locale === 'ru') {
    return [
      {
        title: 'Замена дисплея (экрана)',
        text: 'трещины, тёмные пятна, сенсор не реагирует.',
        icon: LuSmartphone,
        href: buildServiceHref(locale, 'telefonu-remonts', 'ekrana-maina'),
      },
      {
        title: 'Замена батареи',
        text: 'заряд быстро падает, выключается при 10–20%.',
        icon: LuBatteryCharging,
        href: buildServiceHref(locale, 'telefonu-remonts', 'baterijas-maina'),
      },
      {
        title: 'Разъём зарядки',
        text: 'кабель не держится, зарядка медленная или нестабильная.',
        icon: LuPlugZap,
        href: buildServiceHref(locale, 'telefonu-remonts', 'uzlades-ligzdas-maina'),
      },
      {
        title: 'Камера',
        text: 'мутные фото, проблемы с фокусировкой.',
        icon: LuCamera,
        href: buildServiceHref(locale, 'telefonu-remonts', 'kameras-remonts'),
      },
      {
        title: 'Динамики/микрофон',
        text: 'тихий звук, хрипы, во время разговора плохо слышно.',
        icon: LuVolume2,
        href: buildServiceHref(
          locale,
          'telefonu-remonts',
          'skalruni-mikrofona-remonts'
        ),
      },
      {
        title: 'Повреждения от влаги',
        text: 'диагностика и восстановление, если это возможно.',
        icon: LuDroplets,
        href: buildServiceHref(locale, 'telefonu-remonts', 'udens-bojajumu-remonts'),
      },
    ];
  }

  return [
    {
      title: 'Displeja (ekrāna) maiņa',
      text: 'plaisas, tumši plankumi, nereaģē skāriens.',
      icon: LuSmartphone,
      href: buildServiceHref(locale, 'telefonu-remonts', 'ekrana-maina'),
    },
    {
      title: 'Akumulatora maiņa',
      text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
      icon: LuBatteryCharging,
      href: buildServiceHref(locale, 'telefonu-remonts', 'baterijas-maina'),
    },
    {
      title: 'Uzlādes ligzda',
      text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
      icon: LuPlugZap,
      href: buildServiceHref(locale, 'telefonu-remonts', 'uzlades-ligzdas-maina'),
    },
    {
      title: 'Kamera',
      text: 'miglaini attēli, fokusēšanās problēmas.',
      icon: LuCamera,
      href: buildServiceHref(locale, 'telefonu-remonts', 'kameras-remonts'),
    },
    {
      title: 'Skaļruņi/mikrofons',
      text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
      icon: LuVolume2,
      href: buildServiceHref(
        locale,
        'telefonu-remonts',
        'skalruni-mikrofona-remonts'
      ),
    },
    {
      title: 'Ūdens bojājumi',
      text: 'diagnostika un atjaunošana, ja tas iespējams.',
      icon: LuDroplets,
      href: buildServiceHref(locale, 'telefonu-remonts', 'udens-bojajumu-remonts'),
    },
  ];
}

function getPageStrings(bc, locale = 'lv') {
  if (locale === 'ru') {
    return {
      introTitle: `${bc.marketingName} ремонт телефонов — что мы делаем`,
      introLead:
        'Экраны, батареи, разъёмы зарядки, камеры и другие ремонтные работы. Цена зависит от модели — откройте страницу своей модели, чтобы увидеть конкретные цены и сроки.',
      introParagraph:
        'Самые частые работы: <strong>замена экрана</strong> (трещины, тёмные пятна, сенсор не реагирует), <strong>замена батареи</strong> (быстрая разрядка, выключается при 10–20%), <strong>разъём зарядки</strong> (кабель не держится, зарядка медленная или нестабильная), <strong>камера</strong> (мутные фото, ошибки фокусировки), <strong>динамики/микрофон</strong> (тихий звук, хрипы), а также <strong>повреждения от влаги</strong>. Узнайте, как проходит ремонт, в разделе <a href="#process-h2">«Как проходит ремонт»</a>.',
      servicesTitle: 'Популярный ремонт',
      modelGridHeading: `Выберите модель ${bc.marketingName}`,
      modelGridIntro:
        'Найдите нужную модель по названию или откройте нужную серию и выберите своё устройство.',
      modelsNote:
        'Цена зависит от модели — откройте страницу своей модели, чтобы увидеть стоимость ремонта.',
      noModels: 'Пока для этого бренда не добавлены модели.',
      processTitle: 'Как проходит ремонт',
      faqTitle: 'Часто задаваемые вопросы',
      heroHtml: bc.hero.bodyHtml ?? `<p>${bc.hero.lead}</p>`,
      heroAlt: `${bc.marketingName} ремонт телефонов`,
      categoryName: 'Ремонт телефонов',
      brandName: bc.marketingName,
      serviceName: `${bc.marketingName} ремонт телефонов`,
      serviceDescription: `${bc.marketingName} ремонт телефонов: дисплей, батарея, разъём зарядки, камера и другие работы. Быстрая диагностика, честные цены, гарантия.`,
      homeCrumb: 'Главная',
    };
  }

  return {
    introTitle: `${bc.marketingName} telefonu remonts — ko mēs darām`,
    introLead:
      'Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas atšķiras pēc modeļa — atver sava modeļa lapu, lai redzētu konkrētas <strong>remonta cenas</strong> un termiņus.',
    introParagraph:
      'Biežākie darbi: <strong>ekrāna maiņa</strong> (plaisas, tumši plankumi, nereaģē skāriens), <strong>baterijas maiņa</strong> (strauja izlāde, izslēdzas pie 10–20%), <strong>uzlādes ligzda</strong> (nenoturas kabelis, lēna/nekonsekventa uzlāde), <strong>kamera</strong> (miglaini attēli, fokusēšanās kļūdas), <strong>skaļruņi/mikrofons</strong> (klusa skaņa, krakšķi), kā arī <strong>mitruma bojājumi</strong>. Uzzini, kā notiek remonts sadaļā <a href="#process-h2">“Kā notiek remonts”</a>.',
    servicesTitle: 'Populārākie remonti',
    modelGridHeading:
      bc.sections?.modelGrid?.heading ?? `Izvēlies savu ${bc.marketingName} modeli`,
    modelGridIntro:
      bc.sections?.modelGrid?.intro ??
      'Atrodi vajadzīgo modeli pēc nosaukuma vai atver sēriju un izvēlies savu ierīci.',
    modelsNote:
      'Cenas atšķiras pēc modeļa — atver sava modeļa lapu, lai redzētu remonta cenas.',
    noModels: 'Pagaidām šim zīmolam nav pievienotu modeļu.',
    processTitle: 'Kā notiek remonts',
    faqTitle: 'Biežāk uzdotie jautājumi',
    heroHtml: bc.hero.bodyHtml ?? `<p>${bc.hero.lead}</p>`,
    heroAlt: `${bc.marketingName} telefonu remonts`,
    categoryName: 'Telefonu remonts',
    brandName: bc.marketingName,
    serviceName: `${bc.marketingName} telefonu remonts`,
    serviceDescription: `${bc.marketingName} tālruņu remonts: displejs, baterija, uzlādes ligzda, kamera un citi darbi. Ātra diagnostika, godīgas cenas, garantija.`,
    homeCrumb: 'Sākums',
  };
}

export function getPhoneBrandMetadata(brandSlug, locale = 'lv') {
  const bc = getBrandContent(brandSlug, BRAND_CATEGORY.PHONES);

  if (!bc) {
    return {
      title:
        locale === 'ru' ? 'Ремонт телефонов | iLab' : 'Telefonu remonts | iLab',
      description:
        locale === 'ru'
          ? 'Ремонт телефонов в Риге — быстрая диагностика, честные цены, гарантия.'
          : 'Telefonu remonts Rīgā — ātra diagnostika, godīgas cenas, garantija.',
    };
  }

  if (locale === 'ru') {
    return {
      title: `${bc.marketingName} ремонт телефонов в Риге | iLab`,
      description: `${bc.marketingName} ремонт телефонов в Риге: экран, батарея, разъём зарядки, камера и другие работы. Быстрая диагностика, честные цены, гарантия.`,
      alternates: {
        canonical: `${buildCategoryHref(locale, 'telefonu-remonts')}/${bc.slug}`,
      },
    };
  }

  return {
    title: bc.seo.title,
    description: bc.seo.metaDescription,
    alternates: { canonical: bc.canonicalPath },
  };
}

/* ---------------------------------------------
   Page component
---------------------------------------------- */

export default async function PhoneBrandPage({ brand, locale = 'lv' }) {
  const brandSlug = String(brand || '').toLowerCase();

  const allowed = (listBrandsForCategory(BRAND_CATEGORY.PHONES) || [])
    .map((item) => String(item.slug).toLowerCase())
    .filter((slug) => slug !== 'apple');

  if (!allowed.includes(brandSlug)) return notFound();

  const bc = getBrandContent(brandSlug, BRAND_CATEGORY.PHONES);
  if (!bc) return notFound();

  const [devicesAll, hero, seriesMeta] = await Promise.all([
    getDevices(),
    getPhoneBrandConfig(brandSlug),
    getSeriesMetaByCategoryBrand('telefonu-remonts', brandSlug, locale),
  ]);

  const strings = getPageStrings(bc, locale);
  const faqItems = locale === 'ru' ? FAQ_ITEMS_RU : FAQ_ITEMS_LV;
  const processSteps = locale === 'ru' ? PROCESS_STEPS_RU : PROCESS_STEPS_LV;
  const popularRepairs = getPopularRepairs(locale);

  const baseCategoryPath = buildCategoryHref(locale, 'telefonu-remonts');
  const baseHref = `${baseCategoryPath}/${bc.slug}`;

  const brandPhoneList = devicesAll.filter(
    (device) =>
      device.categoryKey === 'telefonu-remonts' &&
      device.brandKey === brandSlug
  );

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.categoryName, url: abs(baseCategoryPath) },
    { name: strings.brandName, url: abs(baseHref) },
  ]);

  const serviceLd = buildServiceLdForCity({
    path: baseHref,
    name: strings.serviceName,
    description: strings.serviceDescription,
  });

  const howToLd = buildStandardRepairHowToLd(strings.serviceName);
  const faqLd = buildFaqLdFromPairs(faqItems);

  console.log('[SAMSUNG SERIES META]', seriesMeta);
console.log('[XCOVER META]', seriesMeta['galaxy-xcover']);

  return (
    <>
      <Script
        id="service-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>

      <Script
        id="breadcrumbs-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id="howto-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(howToLd)}
      </Script>

      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqLd)}
      </Script>

      <DeviceHero
        image={hero.heroImage}
        alt={strings.heroAlt}
        brandLogo={hero.logo}
        brandKey={hero.brandKey}
        tint={hero.tint}
        focal="right"
        bodyHtml={strings.heroHtml}
      />

      <section className={c.section} aria-labelledby="brand-intro-h2">
        <div className={c.container}>
          <h2 id="brand-intro-h2" className={c.h2}>
            {strings.introTitle}
          </h2>

          <p
            className={c.intro}
            dangerouslySetInnerHTML={{ __html: strings.introLead }}
          />

          <p
            className={c.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introParagraph }}
          />
        </div>
      </section>

      <section className={c.section} aria-labelledby="popular-services-h2">
        <div className={c.container}>
          <Services
            id="brand-services"
            title={strings.servicesTitle}
            items={popularRepairs}
          />
        </div>
      </section>

      <DeviceSelector
        id="brand-modeli"
        locale={locale}
        title={strings.modelGridHeading}
        intro={strings.modelGridIntro}
        devices={devicesAll}
        baseHref={baseHref}
        brandKey={brandSlug}
        categoryKey="telefonu-remonts"
        seriesMeta={seriesMeta}
        initialLimit={4}
        autoExpandOnSearch={true}
      />

      <section className={c.section}>
        <div className={c.container}>
          <p className={c.paragraph} style={{ marginTop: 0 }}>
            {strings.modelsNote}
          </p>

          {brandPhoneList.length === 0 && (
            <p style={{ opacity: 0.8, marginTop: 16 }}>{strings.noModels}</p>
          )}
        </div>
      </section>

      <div id="process-h2" className={c.anchorTarget} />

      <section className={c.section} aria-labelledby="process-h2">
        <div className={c.container}>
          <Process
            id="process"
            title={strings.processTitle}
            steps={processSteps}
            headingLevel={2}
            variant="cards"
            locale={locale}
          />
        </div>
      </section>

      <section className={c.section}>
        <Why locale={locale} />
      </section>

      <section className={c.section} aria-labelledby="faq-h2">
        <div className={c.container}>
          <Faq
            id="brand-faq"
            title={strings.faqTitle}
            items={faqItems}
            headingLevel={2}
            variant="accordion"
            locale={locale}
          />
        </div>
      </section>

      <section className={c.section}>
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}