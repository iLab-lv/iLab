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

import {
  LuTabletSmartphone,
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
import { buildCategoryHref } from '@/lib/routes/routeI18n';

import c from '@styles/Catalog.module.scss';

const CATEGORY_KEY = 'plansetdatoru-remonts';

/* ---------------------------------------------
   Static params
---------------------------------------------- */
export async function generateTabletBrandStaticParams() {
  const category = await getCategoryBySlug(CATEGORY_KEY);
  if (!category || !Array.isArray(category.brands)) return [];

  return category.brands
    .map((brand) => String(brand?.key || '').toLowerCase())
    .filter(Boolean)
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
    text: 'Ātri pārbaudām planšetdatoru un apstiprinām problēmu.',
  },
  {
    title: 'Cena un termiņš',
    text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
  },
  {
    title: 'Remonts',
    text: 'Meistari veic remontu, izmantojot kvalitatīvas detaļas.',
  },
  {
    title: 'Pārbaude',
    text: 'Pēc remonta testējam ekrānu, bateriju, uzlādi un citas funkcijas.',
  },
  {
    title: 'Garantija',
    text: '90 dienu garantija un ieteikumi turpmākai lietošanai.',
  },
];

const PROCESS_STEPS_RU = [
  {
    title: 'Диагностика',
    text: 'Быстро проверяем планшет и подтверждаем проблему.',
  },
  {
    title: 'Цена и срок',
    text: 'Согласовываем стоимость и срок выполнения до начала работ.',
  },
  {
    title: 'Ремонт',
    text: 'Мастера выполняют ремонт с использованием качественных деталей.',
  },
  {
    title: 'Проверка',
    text: 'После ремонта тестируем экран, батарею, зарядку и другие функции.',
  },
  {
    title: 'Гарантия',
    text: 'Гарантия 90 дней и рекомендации по дальнейшему использованию.',
  },
];

const FAQ_ITEMS_LV = [
  {
    q: 'Cik ilgi ilgst planšetdatora displeja maiņa?',
    a: 'Bieži 1–3 stundas atkarībā no modeļa, detaļu pieejamības un meistaru noslodzes.',
  },
  {
    q: 'Vai mani dati saglabāsies?',
    a: 'Darām visu iespējamo, lai saglabātu datus, taču pirms remonta vienmēr iesakām izveidot dublējumu.',
  },
  {
    q: 'Vai detaļām ir garantija?',
    a: 'Jā — gan detaļām, gan meistaru darbam ir 90 dienu garantija, ja nav jaunu mehānisku vai šķidruma bojājumu.',
  },
  {
    q: 'Vai pieejamas oriģinālas detaļas?',
    a: 'Atkarībā no modeļa piedāvājam oriģinālas vai augstas kvalitātes OEM detaļas — izvēli un cenu saskaņojam ar klientu pirms remonta.',
  },
  {
    q: 'Vai varu saņemt aptuveno cenu pirms remonta?',
    a: 'Jā, pēc īsas diagnostikas sniegsim izmaksu diapazonu un termiņu konkrētajam planšetdatora modelim.',
  },
];

const FAQ_ITEMS_RU = [
  {
    q: 'Сколько занимает замена экрана планшета?',
    a: 'Часто 1–3 часа, в зависимости от модели, наличия деталей и загрузки мастеров.',
  },
  {
    q: 'Сохранятся ли мои данные?',
    a: 'Мы делаем всё возможное, чтобы сохранить данные, но перед ремонтом всегда рекомендуем сделать резервную копию.',
  },
  {
    q: 'Есть ли гарантия на детали?',
    a: 'Да — и на детали, и на работу действует гарантия 90 дней, если нет новых механических или жидкостных повреждений.',
  },
  {
    q: 'Доступны ли оригинальные детали?',
    a: 'В зависимости от модели предлагаем оригинальные или качественные OEM детали — выбор и цену согласовываем с клиентом до начала ремонта.',
  },
  {
    q: 'Можно ли узнать примерную цену до ремонта?',
    a: 'Да, после короткой диагностики назовём диапазон стоимости и срок для конкретной модели планшета.',
  },
];

const POPULAR_SERVICES_LV = [
  {
    title: 'Displeja (ekrāna) maiņa',
    text: 'plaisas, tumši plankumi, nereaģē skāriens.',
    icon: LuTabletSmartphone,
  },
  {
    title: 'Akumulatora maiņa',
    text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
    icon: LuBatteryCharging,
  },
  {
    title: 'Uzlādes ligzda',
    text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
    icon: LuPlugZap,
  },
  {
    title: 'Kamera',
    text: 'miglaini attēli, fokusēšanās problēmas.',
    icon: LuCamera,
  },
  {
    title: 'Skaļruņi/mikrofons',
    text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
    icon: LuVolume2,
  },
  {
    title: 'Ūdens bojājumi',
    text: 'diagnostika un atjaunošana, ja tas iespējams.',
    icon: LuDroplets,
  },
];

const POPULAR_SERVICES_RU = [
  {
    title: 'Замена дисплея (экрана)',
    text: 'трещины, тёмные пятна, сенсор не реагирует.',
    icon: LuTabletSmartphone,
  },
  {
    title: 'Замена батареи',
    text: 'заряд быстро падает, выключается при 10–20%.',
    icon: LuBatteryCharging,
  },
  {
    title: 'Разъём зарядки',
    text: 'кабель не держится, зарядка медленная или нестабильная.',
    icon: LuPlugZap,
  },
  {
    title: 'Камера',
    text: 'мутные фото, проблемы с фокусировкой.',
    icon: LuCamera,
  },
  {
    title: 'Динамики/микрофон',
    text: 'тихий звук, хрипы, во время разговора не слышно.',
    icon: LuVolume2,
  },
  {
    title: 'Повреждения от влаги',
    text: 'диагностика и восстановление, если это возможно.',
    icon: LuDroplets,
  },
];

function getTabletBrandStrings({ brandName, page, locale = 'lv' }) {
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
      ? `<p><strong>${brandName} ремонт планшетов в Риге</strong> — замена экрана, батареи, камеры и разъёма зарядки с быстрой диагностикой и <strong>гарантией 90 дней</strong>.</p>`
      : `<p><strong>${brandName} planšetdatoru remonts Rīgā</strong> — ekrāna, baterijas, kameras un uzlādes ligzdas remonts ar ātru diagnostiku un <strong>90 dienu garantiju</strong>.</p>`);

  if (locale === 'ru') {
    return {
      introTitle: `${brandName} ремонт планшетов — что мы делаем`,
      introLead:
        'Экраны, батареи, разъёмы зарядки, камеры и другие ремонтные работы. Цена зависит от модели — откройте страницу своей модели, чтобы увидеть конкретные цены и сроки.',
      introParagraph:
        'Самые частые работы: <strong>замена экрана</strong> (трещины, тёмные пятна, сенсор не реагирует), <strong>замена батареи</strong> (быстрая разрядка, выключается при 10–20%), <strong>ремонт разъёма зарядки</strong> (кабель не держится, зарядка медленная или нестабильная), <strong>ремонт камеры</strong> (мутные фото, ошибки фокусировки), а также <strong>повреждения от влаги</strong>. Узнайте, как проходит ремонт, в разделе <a href="#process-h2">«Как проходит ремонт»</a>.',
      modelGridHeading: selectorHeading,
      modelGridIntro: selectorIntro,
      modelsNote:
        'Цена зависит от модели — откройте страницу своей модели, чтобы увидеть стоимость ремонта.',
      noModels: 'Пока для этого бренда не добавлены модели планшетов.',
      servicesHeading: 'Популярный ремонт',
      processTitle: 'Как проходит ремонт',
      faqTitle: 'Часто задаваемые вопросы',
      heroHtml,
      heroAlt: `${brandName} ремонт планшетов`,
      categoryName: 'Ремонт планшетов',
      brandName,
      serviceName: `${brandName} ремонт планшетов в Риге`,
      serviceDescription: `${brandName} ремонт планшетов: дисплей, батарея, разъём зарядки, камера, звук и другие работы. Быстрая диагностика, честные цены, гарантия 90 дней.`,
      homeCrumb: 'Главная',
      scrollCta: { label: 'Смотреть модели', targetId: 'brand-modeli' },
      fallbackTitle: `${brandName} ремонт планшетов`,
    };
  }

  return {
    introTitle: `${brandName} planšetdatoru remonts — ko mēs darām`,
    introLead:
      'Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas atšķiras pēc modeļa — atver sava modeļa lapu, lai redzētu konkrētas remonta cenas un termiņus.',
    introParagraph:
      'Biežākie darbi: <strong>ekrāna maiņa</strong> (plaisas, tumši plankumi, nereaģē skāriens), <strong>baterijas maiņa</strong> (strauja izlāde, izslēdzas pie 10–20%), <strong>uzlādes ligzdas remonts</strong> (nenoturas kabelis, lēna vai nestabila uzlāde), <strong>kameras remonts</strong> (miglaini attēli, fokusēšanās kļūdas), kā arī <strong>mitruma/ūdens bojājumi</strong>. Uzzini, kā notiek remonts sadaļā <a href="#process-h2">“Kā notiek remonts”</a>.',
    modelGridHeading: selectorHeading,
    modelGridIntro: selectorIntro,
    modelsNote:
      'Cenas atšķiras pēc modeļa — atver sava modeļa lapu, lai redzētu remonta cenas.',
    noModels: 'Pagaidām šim zīmolam nav pievienotu planšetdatoru modeļu.',
    servicesHeading: 'Populārākie remonti',
    processTitle: 'Kā notiek remonts',
    faqTitle: 'Biežāk uzdotie jautājumi',
    heroHtml,
    heroAlt: `${brandName} planšetdatoru remonts`,
    categoryName: 'Planšetdatoru remonts',
    brandName,
    serviceName: `${brandName} planšetdatoru remonts Rīgā`,
    serviceDescription: `${brandName} planšetdatoru remonts: displejs, baterija, uzlādes ligzda, kamera, skaņa un citi darbi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.`,
    homeCrumb: 'Sākums',
    scrollCta: { label: 'Skatīt modeļus', targetId: 'brand-modeli' },
    fallbackTitle: `${brandName} planšetdatoru remonts`,
  };
}

export async function getTabletBrandMetadata(brandSlug, locale = 'lv') {
  const page = await resolveBrandPage(CATEGORY_KEY, brandSlug, locale);

  if (!page) {
    return {
      title:
        locale === 'ru' ? 'Ремонт планшетов | iLab' : 'Planšetdatoru remonts | iLab',
      description:
        locale === 'ru'
          ? 'Ремонт планшетов в Риге — быстрая диагностика, честные цены, гарантия.'
          : 'Planšetdatoru remonts Rīgā — ātra diagnostika, godīgas cenas, garantija.',
    };
  }

  const brandName = pickLocalized(
    page?.source?.brand?.labels,
    locale,
    page?.source?.brand?.name || brandSlug
  );

  const strings = getTabletBrandStrings({ brandName, page, locale });

  return {
    title:
      page.seo?.metaTitle ||
      (locale === 'ru'
        ? `${brandName} ремонт планшетов в Риге | iLab`
        : `${brandName} planšetdatoru remonts Rīgā | iLab`),
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
   Page
---------------------------------------------- */
export default async function TabletBrandPage({ brand, locale = 'lv' }) {
  const brandSlug = String(brand || '').toLowerCase();
  if (!brandSlug) return notFound();

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

  const strings = getTabletBrandStrings({ brandName, page, locale });
  const faqItems = locale === 'ru' ? FAQ_ITEMS_RU : FAQ_ITEMS_LV;
  const processSteps = locale === 'ru' ? PROCESS_STEPS_RU : PROCESS_STEPS_LV;
  const popularServices =
    locale === 'ru' ? POPULAR_SERVICES_RU : POPULAR_SERVICES_LV;

  const baseCategoryPath = buildCategoryHref(locale, CATEGORY_KEY);
  const baseHref = `${baseCategoryPath}/${brandSlug}`;

  const brandTabletList = devicesAll.filter(
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

  const faqLd = buildFaqLdFromPairs(faqItems);
  const howToLd = buildStandardRepairHowToLd(strings.serviceName);

  return (
    <>
      <Script id="service-jsonld-tablet-brand" type="application/ld+json">
        {JSON.stringify(serviceLd)}
      </Script>

      <Script id="breadcrumbs-jsonld-tablet-brand" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="faq-jsonld-tablet-brand" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>

      <Script id="process-jsonld-tablet-brand" type="application/ld+json">
        {JSON.stringify(howToLd)}
      </Script>

      <PageHeader
        title={headerTitle}
        lead={headerLead}
        crumbs={breadcrumbs}
        scrollCta={strings.scrollCta}
      />

      <DeviceHero
        image='/images/categories/plansetdatoru_remonts.webp'
        alt={strings.heroAlt}
        brandLogo={page.source?.brand?.logo || null}
        brandKey={page.source?.brand?.key || brandSlug}
        tint="rgba(0,200,180,0.20)"
        focal="right"
        priority
        bodyHtml={strings.heroHtml}
      />

      <section className={c.section} aria-labelledby="tablet-brand-intro-h2">
        <div className={c.container}>
          <h2 id="tablet-brand-intro-h2" className={c.h2}>
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

      <DeviceSelector
        id="brand-modeli"
        locale={locale}
        title={strings.modelGridHeading}
        intro={strings.modelGridIntro}
        note={strings.modelsNote}
        devices={devicesAll}
        baseHref={baseHref}
        brandKey={brandSlug}
        categoryKey={CATEGORY_KEY}
        seriesMeta={seriesMeta}
        initialLimit={4}
        autoExpandOnSearch
      />

      {brandTabletList.length === 0 && (
        <section className={c.section}>
          <div className={c.container}>
            <p style={{ opacity: 0.8, marginTop: 0 }}>{strings.noModels}</p>
          </div>
        </section>
      )}

      <section className={c.section} aria-labelledby="tablet-popular-services-h2">
        <div className={c.container}>
          <h2 id="tablet-popular-services-h2" className={c.h2}>
            {strings.servicesHeading}
          </h2>

          <Services
            id="tablet-brand-services"
            title=""
            items={popularServices}
          />
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
              id="tablet-brand-faq"
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