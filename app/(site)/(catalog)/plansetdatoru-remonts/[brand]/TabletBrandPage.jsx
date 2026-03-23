import Script from 'next/script';
import { notFound } from 'next/navigation';

import devicesAll from '@/data/devices';
import categories from '@/data/categories';

import DeviceHero from '@sections/device-hero/DeviceHero';
import DeviceSelector from '@sections/device-selector/DeviceSelector';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import {
  getBrandContent,
  listBrandsForCategory,
  BRAND_CATEGORY,
} from '@/data/brandContent';

import {
  LuTabletSmartphone,
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
import { buildCategoryHref } from '@/lib/routes/routeI18n';

import c from '@styles/Catalog.module.scss';

/* ---------------------------------------------
   Static params
---------------------------------------------- */
export async function generateTabletBrandStaticParams() {
  const brands = listBrandsForCategory(BRAND_CATEGORY.TABLETS) || [];
  return brands.map((b) => ({ brand: String(b.slug).toLowerCase() }));
}

/* ---------------------------------------------
   Helpers
---------------------------------------------- */
function getTabletBrandConfig(brandSlug) {
  const tabletsCat = categories.find((cat) => cat.slug === 'plansetdatoru-remonts');

  if (!tabletsCat) {
    return {
      brandKey: brandSlug,
      logo: null,
      tint: 'rgba(0,200,180,0.20)',
      heroAlt: 'Planšetdatoru remonts',
      name: brandSlug,
    };
  }

  const brand =
    tabletsCat.brands?.find(
      (item) => (item.brandSlug || '').toLowerCase() === brandSlug
    ) || null;

  return {
    brandKey: brand?.brandSlug || brandSlug,
    logo: brand?.logo || null,
    tint: brand?.tint || 'rgba(0,200,180,0.20)',
    heroAlt: brand?.heroAlt || 'Planšetdatoru remonts',
    name: brand?.name || brandSlug,
  };
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

function getTabletBrandStrings(bc, locale = 'lv') {
  if (locale === 'ru') {
    return {
      introTitle: `${bc.marketingName} ремонт планшетов — что мы делаем`,
      introLead:
        'Экраны, батареи, разъёмы зарядки, камеры и другие ремонтные работы. Цена зависит от модели — откройте страницу своей модели, чтобы увидеть конкретные цены и сроки.',
      introParagraph:
        'Самые частые работы: <strong>замена экрана</strong> (трещины, тёмные пятна, сенсор не реагирует), <strong>замена батареи</strong> (быстрая разрядка, выключается при 10–20%), <strong>ремонт разъёма зарядки</strong> (кабель не держится, зарядка медленная или нестабильная), <strong>ремонт камеры</strong> (мутные фото, ошибки фокусировки), а также <strong>повреждения от влаги</strong>. Узнайте, как проходит ремонт, в разделе <a href="#process-h2">«Как проходит ремонт»</a>.',
      modelGridHeading: `Выберите модель ${bc.marketingName}`,
      modelGridIntro:
        'Найдите нужную модель по названию или откройте нужную серию и выберите своё устройство.',
      modelsNote:
        'Цена зависит от модели — откройте страницу своей модели, чтобы увидеть стоимость ремонта.',
      noModels: 'Пока для этого бренда не добавлены модели планшетов.',
      servicesHeading: 'Популярный ремонт',
      processTitle: 'Как проходит ремонт',
      faqTitle: 'Часто задаваемые вопросы',
      heroHtml: bc.hero.bodyHtml ?? `<p>${bc.hero.lead}</p>`,
      heroAlt: `${bc.marketingName} ремонт планшетов`,
      categoryName: 'Ремонт планшетов',
      brandName: `${bc.marketingName} ремонт планшетов`,
      serviceName: `${bc.marketingName} ремонт планшетов в Риге`,
      serviceDescription: `${bc.marketingName} ремонт планшетов: дисплей, батарея, разъём зарядки, камера, звук и другие работы. Быстрая диагностика, честные цены, гарантия 90 дней.`,
      homeCrumb: 'Главная',
    };
  }

  return {
    introTitle: `${bc.marketingName} planšetdatoru remonts — ko mēs darām`,
    introLead:
      'Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas atšķiras pēc modeļa — atver sava modeļa lapu, lai redzētu konkrētas remonta cenas un termiņus.',
    introParagraph:
      'Biežākie darbi: <strong>ekrāna maiņa</strong> (plaisas, tumši plankumi, nereaģē skāriens), <strong>baterijas maiņa</strong> (strauja izlāde, izslēdzas pie 10–20%), <strong>uzlādes ligzdas remonts</strong> (nenoturas kabelis, lēna vai nestabila uzlāde), <strong>kameras remonts</strong> (miglaini attēli, fokusēšanās kļūdas), kā arī <strong>mitruma/ūdens bojājumi</strong>. Uzzini, kā notiek remonts sadaļā <a href="#process-h2">“Kā notiek remonts”</a>.',
    modelGridHeading:
      bc.sections?.modelGrid?.heading ?? `Izvēlies savu ${bc.marketingName} modeli`,
    modelGridIntro:
      bc.sections?.modelGrid?.intro ??
      'Atrodi vajadzīgo modeli pēc nosaukuma vai atver sēriju un izvēlies savu ierīci.',
    modelsNote:
      'Cenas atšķiras pēc modeļa — atver sava modeļa lapu, lai redzētu remonta cenas.',
    noModels: 'Pagaidām šim zīmolam nav pievienotu planšetdatoru modeļu.',
    servicesHeading: 'Populārākie remonti',
    processTitle: 'Kā notiek remonts',
    faqTitle: 'Biežāk uzdotie jautājumi',
    heroHtml: bc.hero.bodyHtml ?? `<p>${bc.hero.lead}</p>`,
    heroAlt: `${bc.marketingName} planšetdatoru remonts`,
    categoryName: 'Planšetdatoru remonts',
    brandName: `${bc.marketingName} planšetdatoru remonts`,
    serviceName: `${bc.marketingName} planšetdatoru remonts Rīgā`,
    serviceDescription: `${bc.marketingName} planšetdatoru remonts: displejs, baterija, uzlādes ligzda, kamera, skaņa un citi darbi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.`,
    homeCrumb: 'Sākums',
  };
}

export function getTabletBrandMetadata(brandSlug, locale = 'lv') {
  const bc = getBrandContent(brandSlug, BRAND_CATEGORY.TABLETS);

  if (!bc) {
    return {
      title:
        locale === 'ru' ? 'Ремонт планшетов | iLab' : 'Planšetdatoru remonts | iLab',
      description:
        locale === 'ru'
          ? 'Ремонт планшетов в Риге — быстрая диагностика, честные цены, гарантия.'
          : 'Planšetdatoru remonts Rīgā — ātra diagnostika, godīgas cenas, garantija.',
    };
  }

  if (locale === 'ru') {
    return {
      title: `${bc.marketingName} ремонт планшетов в Риге | iLab`,
      description: `${bc.marketingName} ремонт планшетов в Риге: дисплей, батарея, разъём зарядки, камера, звук и другие работы. Быстрая диагностика, честные цены, гарантия 90 дней.`,
      alternates: {
        canonical: `${buildCategoryHref(locale, 'plansetdatoru-remonts')}/${bc.slug}`,
      },
    };
  }

  return {
    title: bc.seo.title,
    description: bc.seo.metaDescription,
    alternates: { canonical: bc.canonicalPath },
  };
}

export default function TabletBrandPage({ brand, locale = 'lv' }) {
  const brandSlug = String(brand || '').toLowerCase();

  const allowed = (listBrandsForCategory(BRAND_CATEGORY.TABLETS) || []).map(
    (item) => String(item.slug).toLowerCase()
  );
  if (!allowed.includes(brandSlug)) return notFound();

  const bc = getBrandContent(brandSlug, BRAND_CATEGORY.TABLETS);
  if (!bc) return notFound();

  const heroCfg = getTabletBrandConfig(brandSlug);
  const strings = getTabletBrandStrings(bc, locale);
  const faqItems = locale === 'ru' ? FAQ_ITEMS_RU : FAQ_ITEMS_LV;
  const processSteps = locale === 'ru' ? PROCESS_STEPS_RU : PROCESS_STEPS_LV;
  const popularServices =
    locale === 'ru' ? POPULAR_SERVICES_RU : POPULAR_SERVICES_LV;

  const baseCategoryPath = buildCategoryHref(locale, 'plansetdatoru-remonts');
  const baseHref = `${baseCategoryPath}/${bc.slug}`;

  const brandTabletList = devicesAll.filter(
    (device) =>
      device.category === 'plansetdatoru-remonts' &&
      (device.brandSlug || '').toLowerCase() === brandSlug
  );

  const provider = buildProvidersFromLocations();
  const pageUrl = abs(baseHref);

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}${baseHref}#service`,
    serviceType: strings.brandName,
    areaServed: { '@type': 'City', name: 'Rīga' },
    provider,
    url: pageUrl,
    name: strings.serviceName,
    description: strings.serviceDescription,
  };

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.categoryName, url: abs(baseCategoryPath) },
    { name: strings.brandName, url: pageUrl },
  ]);

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }, index) => ({
      '@type': 'Question',
      '@id': `${ORIGIN}${baseHref}#faq-q${index + 1}`,
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof a === 'string' ? a : '',
      },
    })),
  };

  const processHowToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${ORIGIN}${baseHref}#howto`,
    name:
      locale === 'ru'
        ? `${bc.marketingName} ремонт планшета в iLab`
        : `${bc.marketingName} planšetdatoru remonta process iLab`,
    description:
      locale === 'ru'
        ? 'Как по шагам проходит диагностика, ремонт и тестирование планшета в сервисе iLab в Риге.'
        : 'Kā soli pa solim notiek planšetdatoru diagnostika, remonts un testēšana iLab servisā Rīgā.',
    step:
      locale === 'ru'
        ? [
            {
              '@type': 'HowToStep',
              name: '1. Диагностика',
              text: 'Быстро проверяем планшет, подтверждаем проблему и оцениваем объём повреждения.',
            },
            {
              '@type': 'HowToStep',
              name: '2. Цена и срок',
              text: 'До начала ремонта согласовываем стоимость, тип детали и срок выполнения.',
            },
            {
              '@type': 'HowToStep',
              name: '3. Ремонт',
              text: 'Мастера выполняют ремонт экрана, батареи, разъёма зарядки, камеры или других компонентов.',
            },
            {
              '@type': 'HowToStep',
              name: '4. Проверка',
              text: 'После ремонта тестируем экран, сенсор, звук, зарядку, сеть и другие функции.',
            },
            {
              '@type': 'HowToStep',
              name: '5. Гарантия и выдача',
              text: 'Выдаём планшет с гарантией 90 дней на детали и работу.',
            },
          ]
        : [
            {
              '@type': 'HowToStep',
              name: '1. Diagnostika',
              text: 'Ātri pārbaudām planšetdatoru, apstiprinām problēmu (displejs, baterija, uzlāde, skaņa, kamera u.c.) un izvērtējam bojājuma apmēru.',
            },
            {
              '@type': 'HowToStep',
              name: '2. Cena un termiņš',
              text: 'Pirms remonta sākšanas saskaņojam izmaksas, detaļu veidu (oriģināls vai OEM) un izpildes termiņu.',
            },
            {
              '@type': 'HowToStep',
              name: '3. Remonts',
              text: 'Meistari veic ekrāna, baterijas, uzlādes ligzdas, kameras vai citu komponentu remontu, izmantojot kvalitatīvas detaļas.',
            },
            {
              '@type': 'HowToStep',
              name: '4. Pārbaude',
              text: 'Pēc remonta testējam ekrānu, skārienu, skaņu, uzlādi, tīklu un citas ikdienas funkcijas, lai pārliecinātos par stabilu darbību.',
            },
            {
              '@type': 'HowToStep',
              name: '5. Garantija un izsniegšana',
              text: 'Izsniedzam planšetdatoru ar 90 dienu garantiju uz detaļu un darbu, sniedzam ieteikumus turpmākai lietošanai.',
            },
          ],
  };

  return (
    <>
      <Script
        id="service-jsonld-tablet-brand"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>

      <Script
        id="breadcrumbs-jsonld-tablet-brand"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id="faq-jsonld-tablet-brand"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqLd)}
      </Script>

      <Script
        id="process-jsonld-tablet-brand"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(processHowToLd)}
      </Script>

      <DeviceHero
        image="/images/categories/plansetdatoru_remonts.webp"
        alt={strings.heroAlt}
        brandLogo={heroCfg.logo}
        brandKey={heroCfg.brandKey}
        tint={heroCfg.tint}
        focal="right"
        bodyHtml={strings.heroHtml}
      />

      <section className={c.section} aria-labelledby="tablet-brand-intro-h2">
        <div className={c.container}>
          <h2 id="tablet-brand-intro-h2" className={c.h2}>
            {strings.introTitle}
          </h2>

          <p className={c.intro}>{strings.introLead}</p>

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
        brandSlug={brandSlug}
        categorySlug="plansetdatoru-remonts"
        initialLimit={4}
        autoExpandOnSearch={true}
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
            id="tablet-brand-faq"
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