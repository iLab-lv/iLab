import Script from 'next/script';
import { notFound } from 'next/navigation';

import { getCategoryBySlug, getSeriesMetaByCategoryBrand } from '@/lib/content/categories';
import { getDevices } from '@/lib/content/devices';
import { resolveBrandPage } from '@/lib/content/resolvers/catalogPages';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceHero from '@sections/device-hero/DeviceHero';
import DeviceSelector from '@sections/device-selector/DeviceSelector';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import Reviews from '@sections/reviews/Reviews';

import c from '@styles/Catalog.module.scss';

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

const CATEGORY_KEY = 'telefonu-remonts';

/* ---------------------------------------------
   Static params
---------------------------------------------- */
export async function generatePhoneBrandStaticParams() {
  const category = await getCategoryBySlug(CATEGORY_KEY);
  if (!category || !Array.isArray(category.brands)) return [];

  return category.brands
    .map((brand) => String(brand?.key || '').toLowerCase())
    .filter((slug) => slug && slug !== 'apple')
    .map((brand) => ({ brand }));
}

/* ---------------------------------------------
   Helpers
---------------------------------------------- */
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
    a: 'Izmantojam oriģinālas vai augstas kvalitātes OEM - izvēli saskaņojam ar klientu.',
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
    a: 'Используем оригинальные или качественные OEM детали - выбор согласовываем с клиентом.',
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
        href: buildServiceHref(locale, CATEGORY_KEY, 'ekrana-maina'),
      },
      {
        title: 'Замена батареи',
        text: 'заряд быстро падает, выключается при 10–20%.',
        icon: LuBatteryCharging,
        href: buildServiceHref(locale, CATEGORY_KEY, 'baterijas-maina'),
      },
      {
        title: 'Разъём зарядки',
        text: 'кабель не держится, зарядка медленная или нестабильная.',
        icon: LuPlugZap,
        href: buildServiceHref(locale, CATEGORY_KEY, 'uzlades-ligzdas-maina'),
      },
      {
        title: 'Камера',
        text: 'мутные фото, проблемы с фокусировкой.',
        icon: LuCamera,
        href: buildServiceHref(locale, CATEGORY_KEY, 'kameras-remonts'),
      },
      {
        title: 'Динамики/микрофон',
        text: 'тихий звук, хрипы, во время разговора плохо слышно.',
        icon: LuVolume2,
        href: buildServiceHref(locale, CATEGORY_KEY, 'skalruni-mikrofona-remonts'),
      },
      {
        title: 'Повреждения от влаги',
        text: 'диагностика и восстановление, если это возможно.',
        icon: LuDroplets,
        href: buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts'),
      },
    ];
  }

  return [
    {
      title: 'Displeja (ekrāna) maiņa',
      text: 'plaisas, tumši plankumi, nereaģē skāriens.',
      icon: LuSmartphone,
      href: buildServiceHref(locale, CATEGORY_KEY, 'ekrana-maina'),
    },
    {
      title: 'Akumulatora maiņa',
      text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
      icon: LuBatteryCharging,
      href: buildServiceHref(locale, CATEGORY_KEY, 'baterijas-maina'),
    },
    {
      title: 'Uzlādes ligzda',
      text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
      icon: LuPlugZap,
      href: buildServiceHref(locale, CATEGORY_KEY, 'uzlades-ligzdas-maina'),
    },
    {
      title: 'Kamera',
      text: 'miglaini attēli, fokusēšanās problēmas.',
      icon: LuCamera,
      href: buildServiceHref(locale, CATEGORY_KEY, 'kameras-remonts'),
    },
    {
      title: 'Skaļruņi/mikrofons',
      text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
      icon: LuVolume2,
      href: buildServiceHref(locale, CATEGORY_KEY, 'skalruni-mikrofona-remonts'),
    },
    {
      title: 'Ūdens bojājumi',
      text: 'diagnostika un atjaunošana, ja tas iespējams.',
      icon: LuDroplets,
      href: buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts'),
    },
  ];
}

function getPageStrings({ brandName, page, locale = 'lv' }) {
  const selectorHeading =
    page?.selector?.heading ||
    (locale === 'ru'
      ? `Выберите модель ${brandName}`
      : `Izvēlies savu ${brandName} modeli`);

  const selectorIntro =
    page?.selector?.intro ||
    (locale === 'ru'
      ? 'Найдите нужную модель по названию или откройте нужную серию и выберите своё устройство.'
      : 'Atrodi vajadzīgo modeli pēc nosaukuma vai atver sēriju un izvēlies savu ierīci.');

  const heroHtml =
    pickLocalized(page?.source?.brand?.page?.bodyHtml, locale, '') ||
    (locale === 'ru'
      ? `<p><strong>${brandName} ремонт телефонов в Риге</strong> - замена экрана, батареи, камеры и разъёма зарядки с быстрой диагностикой и <strong>гарантией 90 дней</strong>.</p>`
      : `<p><strong>${brandName} telefonu remonts Rīgā</strong> - ekrāna, baterijas, kameras un uzlādes ligzdas remonts ar ātru diagnostiku un <strong>90 dienu garantiju</strong>.</p>`);

  if (locale === 'ru') {
    return {
      introTitle: `${brandName} ремонт телефонов - что мы делаем`,
      introLead:
        'Экраны, батареи, разъёмы зарядки, камеры и другие ремонтные работы. Цена зависит от модели - откройте страницу своей модели, чтобы увидеть конкретные цены и сроки.',
      introParagraph:
        'Самые частые работы: <strong>замена экрана</strong> (трещины, тёмные пятна, сенсор не реагирует), <strong>замена батареи</strong> (быстрая разрядка, выключается при 10–20%), <strong>разъём зарядки</strong> (кабель не держится, зарядка медленная или нестабильная), <strong>камера</strong> (мутные фото, ошибки фокусировки), <strong>динамики/микрофон</strong> (тихий звук, хрипы), а также <strong>повреждения от влаги</strong>. Узнайте, как проходит ремонт, в разделе <a href="#process-h2">«Как проходит ремонт»</a>.',
      servicesTitle: 'Популярный ремонт',
      modelGridHeading: selectorHeading,
      modelGridIntro: selectorIntro,
      modelsNote:
        'Цена зависит от модели - откройте страницу своей модели, чтобы увидеть стоимость ремонта.',
      noModels: 'Пока для этого бренда не добавлены модели.',
      processTitle: 'Как проходит ремонт',
      faqTitle: 'Часто задаваемые вопросы',
      heroHtml,
      heroAlt: `${brandName} ремонт телефонов`,
      categoryName: 'Ремонт телефонов',
      brandName,
      serviceName: `${brandName} ремонт телефонов`,
      serviceDescription: `${brandName} ремонт телефонов: дисплей, батарея, разъём зарядки, камера и другие работы. Быстрая диагностика, честные цены, гарантия.`,
      homeCrumb: 'Главная',
      scrollCta: { label: 'Смотреть модели', targetId: 'brand-modeli' },
      fallbackTitle: `${brandName} ремонт телефонов`,
    };
  }

  return {
    introTitle: `${brandName} telefonu remonts - ko mēs darām`,
    introLead:
      'Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas atšķiras pēc modeļa - atver sava modeļa lapu, lai redzētu konkrētas <strong>remonta cenas</strong> un termiņus.',
    introParagraph:
      'Biežākie darbi: <strong>ekrāna maiņa</strong> (plaisas, tumši plankumi, nereaģē skāriens), <strong>baterijas maiņa</strong> (strauja izlāde, izslēdzas pie 10–20%), <strong>uzlādes ligzda</strong> (nenoturas kabelis, lēna/nekonsekventa uzlāde), <strong>kamera</strong> (miglaini attēli, fokusēšanās kļūdas), <strong>skaļruņi/mikrofons</strong> (klusa skaņa, krakšķi), kā arī <strong>mitruma bojājumi</strong>. Uzzini, kā notiek remonts sadaļā <a href="#process-h2">“Kā notiek remonts”</a>.',
    servicesTitle: 'Populārākie remonti',
    modelGridHeading: selectorHeading,
    modelGridIntro: selectorIntro,
    modelsNote:
      'Cenas atšķiras pēc modeļa - atver sava modeļa lapu, lai redzētu remonta cenas.',
    noModels: 'Pagaidām šim zīmolam nav pievienotu modeļu.',
    processTitle: 'Kā notiek remonts',
    faqTitle: 'Biežāk uzdotie jautājumi',
    heroHtml,
    heroAlt: `${brandName} telefonu remonts`,
    categoryName: 'Telefonu remonts',
    brandName,
    serviceName: `${brandName} telefonu remonts`,
    serviceDescription: `${brandName} tālruņu remonts: displejs, baterija, uzlādes ligzda, kamera un citi darbi. Ātra diagnostika, godīgas cenas, garantija.`,
    homeCrumb: 'Sākums',
    scrollCta: { label: 'Skatīt modeļus', targetId: 'brand-modeli' },
    fallbackTitle: `${brandName} telefonu remonts`,
  };
}

export async function getPhoneBrandMetadata(brandSlug, locale = 'lv') {
  const page = await resolveBrandPage(CATEGORY_KEY, brandSlug, locale);

  if (!page) {
    return {
      title:
        locale === 'ru' ? 'Ремонт телефонов | iLab' : 'Telefonu remonts | iLab',
      description:
        locale === 'ru'
          ? 'Ремонт телефонов в Риге - быстрая диагностика, честные цены, гарантия.'
          : 'Telefonu remonts Rīgā - ātra diagnostika, godīgas cenas, garantija.',
    };
  }

  const brandName = pickLocalized(
    page?.source?.brand?.labels,
    locale,
    page?.source?.brand?.name || brandSlug
  );

  const strings = getPageStrings({ brandName, page, locale });

  return {
    title:
      page.seo?.metaTitle ||
      (locale === 'ru'
        ? `${brandName} ремонт телефонов в Риге | iLab`
        : `${brandName} telefonu remonts Rīgā | iLab`),
    description:
      page.seo?.metaDescription || strings.serviceDescription,
    alternates: {
      canonical:
        page.route?.canonicalPath ||
        `${buildCategoryHref(locale, CATEGORY_KEY)}/${brandSlug}`,
    },
  };
}

/* ---------------------------------------------
   Page component
---------------------------------------------- */

export default async function PhoneBrandPage({ brand, locale = 'lv' }) {
  const brandSlug = String(brand || '').toLowerCase();

  if (!brandSlug || brandSlug === 'apple') return notFound();

  const [page, devicesAll, seriesMeta] = await Promise.all([
    resolveBrandPage(CATEGORY_KEY, brandSlug, locale),
    getDevices(),
    getSeriesMetaByCategoryBrand(CATEGORY_KEY, brandSlug, locale),
  ]);

  if (!page) return notFound();

  const brandName = pickLocalized(
    page?.source?.brand?.labels,
    locale,
    page?.source?.brand?.name || brandSlug
  );

  const strings = getPageStrings({ brandName, page, locale });
  const faqItems = locale === 'ru' ? FAQ_ITEMS_RU : FAQ_ITEMS_LV;
  const processSteps = locale === 'ru' ? PROCESS_STEPS_RU : PROCESS_STEPS_LV;
  const popularRepairs = getPopularRepairs(locale);

  const baseCategoryPath = buildCategoryHref(locale, CATEGORY_KEY);
  const baseHref = `${baseCategoryPath}/${brandSlug}`;

  const brandPhoneList = devicesAll.filter(
    (device) =>
      device?.type === 'device' &&
      device.categoryKey === CATEGORY_KEY &&
      device.brandKey === brandSlug &&
      device.isHidden !== true
  );

  const headerTitle =
    page.seo?.h1 ||
    page.seo?.breadcrumbName ||
    strings.fallbackTitle;

  const headerLead =
    page.intro?.lead ||
    page.seo?.metaDescription ||
    page.seo?.schemaDescription ||
    null;

  const breadcrumbs = [
    {
      label: page.labels?.homeCrumb || strings.homeCrumb,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.categoryName,
      href: baseCategoryPath,
    },
    {
      label: page.seo?.breadcrumbName || headerTitle,
      href: baseHref,
    },
  ];

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: breadcrumbs[0].label, url: abs(breadcrumbs[0].href) },
    { name: breadcrumbs[1].label, url: abs(breadcrumbs[1].href) },
    { name: breadcrumbs[2].label, url: abs(breadcrumbs[2].href) },
  ]);

  const serviceLd = buildServiceLdForCity({
    path: baseHref,
    name: page.seo?.schemaName || strings.serviceName,
    description: page.seo?.schemaDescription || strings.serviceDescription,
  });

  const howToLd = buildStandardRepairHowToLd(strings.serviceName);
  const faqLd = buildFaqLdFromPairs(faqItems);

  return (
    <>
      <Script id="service-jsonld" type="application/ld+json">
        {JSON.stringify(serviceLd)}
      </Script>

      <Script id="breadcrumbs-jsonld" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="howto-jsonld" type="application/ld+json">
        {JSON.stringify(howToLd)}
      </Script>

      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>

      <PageHeader
        title={headerTitle}
        lead={headerLead}
        crumbs={breadcrumbs}
        scrollCta={strings.scrollCta}
      />

      <DeviceHero
        image={page.hero?.image || '/images/categories/telefonu_remonts.webp'}
        alt={strings.heroAlt}
        brandLogo={page.source?.brand?.logo || null}
        brandKey={page.source?.brand?.key || brandSlug}
        tint="rgba(0,200,180,0.20)"
        focal="right"
        priority
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
        categoryKey={CATEGORY_KEY}
        seriesMeta={seriesMeta}
        initialLimit={4}
        autoExpandOnSearch
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

      {page.sections?.hasReviews && <Reviews locale={locale} />}

      <div id="process-h2" className={c.anchorTarget} />

      {page.sections?.hasProcess && (
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
      )}

      {page.sections?.hasWhy && (
        <section className={c.section}>
          <Why locale={locale} />
        </section>
      )}

      {page.sections?.hasFaq && (
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
      )}

      {page.sections?.hasConvertBand && (
        <section className={c.section}>
          <ConvertBand locale={locale} />
        </section>
      )}
    </>
  );
}