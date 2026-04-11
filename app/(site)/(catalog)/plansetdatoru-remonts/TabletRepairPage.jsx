import Script from 'next/script';

import { getDevices } from '@/lib/content/devices';
import { resolveCategoryPage } from '@/lib/content/resolvers/catalogPages';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import BrandPreview from '@components/model-grid/BrandPreview';

import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import DeviceHero from '@sections/device-hero/DeviceHero';
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
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';
import { buildCategoryHref } from '@/lib/routes/routeI18n';

import s from '@styles/Catalog.module.scss';

const CATEGORY_KEY = 'plansetdatoru-remonts';

function pickLocalized(value, locale = 'lv', fallback = '') {
  if (value == null) return fallback;

  if (typeof value === 'string') return value || fallback;

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

function normalizeRoutePath(path = '', locale = 'lv') {
  if (!path) return '';

  const clean = String(path).trim();

  if (locale === 'lv') return clean;

  if (clean === '/') return '/ru';
  if (clean === '/ru' || clean.startsWith('/ru/')) return clean;

  return `/ru${clean.startsWith('/') ? clean : `/${clean}`}`;
}

function sortDevices(list = []) {
  return [...list].sort((a, b) => {
    const ay = typeof a.year === 'number' ? a.year : -Infinity;
    const by = typeof b.year === 'number' ? b.year : -Infinity;
    if (ay !== by) return by - ay;

    const ao = typeof a.order === 'number' ? a.order : 99999;
    const bo = typeof b.order === 'number' ? b.order : 99999;
    if (ao !== bo) return ao - bo;

    return (a.name || '').localeCompare(b.name || '', 'lv');
  });
}

function buildBrandBlocks({ category, devices, locale = 'lv', basePath }) {
  const categoryBrands = Array.isArray(category?.brands) ? category.brands : [];

  const devicesByBrand = new Map();

  for (const d of devices) {
    if (!d) continue;
    if (d.type !== 'device') continue;
    if (d.categoryKey !== CATEGORY_KEY) continue;
    if (!d.brandKey || !d.slug || !d.name) continue;
    if (d.isHidden === true) continue;

    const brandKey = String(d.brandKey).trim().toLowerCase();
    if (!brandKey) continue;

    if (!devicesByBrand.has(brandKey)) {
      devicesByBrand.set(brandKey, []);
    }

    devicesByBrand.get(brandKey).push(d);
  }

  return categoryBrands
    .map((brand) => {
      const brandKey = String(brand?.key || '').trim().toLowerCase();
      if (!brandKey) return null;

      const brandDevices = sortDevices(devicesByBrand.get(brandKey) || []);
      if (!brandDevices.length) return null;

      const href =
        normalizeRoutePath(brand?.route?.brandPath || '', locale) ||
        `${basePath}/${brandKey}`;

      return {
        slug: brandKey,
        name: pickLocalized(brand?.labels, locale, brandKey),
        href,
        items: brandDevices.slice(0, 4),
        total: brandDevices.length,
        order: Number.isFinite(Number(brand?.order)) ? Number(brand.order) : 9999,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}

function getFaqItems(locale = 'lv') {
  if (locale === 'ru') {
    return [
      {
        q: 'Сколько занимает замена экрана планшета?',
        a: 'Часто в тот же день — зависит от конкретной модели, наличия деталей и загрузки сервиса.',
      },
      {
        q: 'Сохранятся ли мои данные?',
        a: 'Мы делаем всё возможное, чтобы сохранить данные. Перед ремонтом всегда рекомендуем сделать резервную копию.',
      },
      {
        q: 'Есть ли гарантия на детали?',
        a: 'Да — на детали и выполненные работы действует гарантия 90 дней, если нет новых механических повреждений или повреждений от жидкости.',
      },
      {
        q: 'Доступны ли оригинальные детали?',
        a: 'В зависимости от модели предлагаем оригинальные или качественные OEM детали. Выбор и цену всегда согласовываем с клиентом до начала ремонта.',
      },
      {
        q: 'Можно ли узнать примерную цену до ремонта?',
        a: 'Да — после быстрой диагностики называем диапазон стоимости и срок. Для некоторых неисправностей точная цена зависит от объёма повреждения.',
      },
    ];
  }

  return [
    {
      q: 'Cik ilgi ilgst ekrāna maiņa planšetdatoram?',
      a: 'Bieži tajā pašā dienā — atkarīgs no konkrētā modeļa, detaļu pieejamības un servisa noslodzes.',
    },
    {
      q: 'Vai mani dati saglabāsies?',
      a: 'Mēs darām visu iespējamo, lai dati saglabātos neskarti. Tomēr pirms remonta vienmēr iesakām izveidot dublējumu.',
    },
    {
      q: 'Vai detaļām ir garantija?',
      a: 'Jā — gan uz rezerves detaļām, gan uz paveikto darbu ir 90 dienu garantija, ja nav jaunu mehānisku vai šķidruma bojājumu.',
    },
    {
      q: 'Vai pieejamas oriģinālas detaļas?',
      a: 'Atkarībā no modeļa piedāvājam oriģinālas vai augstas kvalitātes OEM detaļas. Izvēli un cenu vienmēr saskaņojam ar klientu pirms remonta.',
    },
    {
      q: 'Vai varu saņemt aptuveno cenu pirms remonta?',
      a: 'Jā — pēc ātras diagnostikas sniedzam izmaksu diapazonu un termiņu. Dažiem bojājumiem precīza cena atkarīga no bojājuma apjoma.',
    },
  ];
}

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'ремонт планшетов в Риге',
      introTitle: 'Ремонт планшетов — что мы делаем',
      introLead:
        'Экраны, батареи, разъёмы зарядки, камеры и другие ремонтные работы для планшетов. Стоимость согласовываем до начала работ, самые частые ремонты выполняем в тот же день. Выберите свой бренд и откройте страницу конкретной модели.',
      introP1:
        'Работаем с <strong>iPad</strong>, <strong>Samsung Galaxy Tab</strong> и другими популярными планшетами. Самые частые работы: <strong>замена экрана</strong>, <strong>замена батареи</strong>, <strong>ремонт разъёма зарядки</strong>, <strong>ремонт камеры</strong>, <strong>динамики/микрофон</strong>, а также <strong>повреждения после попадания влаги</strong>. Узнайте, как проходит ремонт, в разделе <a href="#process-h2">«Как проходит ремонт»</a>.',
      introP2:
        'Смотрите также: <a href="/ru/remont-iphone">ремонт iPhone</a> и <a href="/ru/remont-telefonov">ремонт телефонов</a> — если нужен ремонт другого устройства.',
      breadcrumbName: 'Ремонт планшетов',
      serviceName: 'Ремонт планшетов в Риге',
      serviceDescription:
        'Ремонт планшетов в Риге: замена экрана, батареи, разъёма зарядки, камеры, ремонт звука и после попадания влаги. Быстрая диагностика, честные цены и гарантия 90 дней.',
      servicesTitle: 'Популярный ремонт планшетов',
      servicesItems: [
        {
          title: 'Замена экрана',
          text: 'трещины, пятна, проблемы с сенсором.',
          icon: LuTabletSmartphone,
        },
        {
          title: 'Замена батареи',
          text: 'быстро падает заряд, короткое время работы.',
          icon: LuBatteryCharging,
        },
        {
          title: 'Разъём зарядки',
          text: 'кабель не держится, зарядка медленная или нестабильная.',
          icon: LuPlugZap,
        },
        {
          title: 'Камера',
          text: 'мутное изображение, ошибки фокусировки.',
          icon: LuCamera,
        },
        {
          title: 'Динамики/микрофон',
          text: 'тихий звук, хрипы, вас не слышно во время разговора.',
          icon: LuVolume2,
        },
        {
          title: 'Повреждения после влаги',
          text: 'диагностика и восстановление, если это возможно.',
          icon: LuDroplets,
        },
      ],
      faqTitle: 'Часто задаваемые вопросы',
      processTitle: 'Как проходит ремонт',
      processSteps: [
        {
          title: 'Диагностика',
          text: 'Быстро проверяем планшет и подтверждаем проблему.',
        },
        {
          title: 'Цена и срок',
          text: 'Согласовываем стоимость и срок выполнения до начала ремонта.',
        },
        {
          title: 'Ремонт',
          text: 'Сертифицированные мастера выполняют ремонт с использованием качественных деталей.',
        },
        {
          title: 'Проверка',
          text: 'После ремонта тестируем все важные функции и безопасность.',
        },
        {
          title: 'Гарантия',
          text: 'Гарантия 90 дней и рекомендации по дальнейшему использованию.',
        },
      ],
      scrollCta: { label: 'Смотреть бренды', targetId: 'brand-list' },
      fallbackTitle: 'Ремонт планшетов в Риге',
    };
  }

  return {
    heroAlt: 'Planšetdatoru remonts Rīgā',
    introTitle: 'Planšetdatoru remonts — ko mēs darām',
    introLead:
      'Ekrāni, baterijas, uzlādes ligzdas, kameras un citi remonta darbi planšetdatoriem. Cenas saskaņojam pirms darba uzsākšanas, biežākos darbus paveicam tajā pašā dienā. Izvēlies savu zīmolu un atver konkrēta modeļa lapu.',
    introP1:
      'Strādājam ar <strong>iPad</strong>, <strong>Samsung Galaxy Tab</strong> un citiem populāriem planšetdatoriem. Biežākie darbi: <strong>ekrāna maiņa</strong>, <strong>baterijas nomaiņa</strong>, <strong>uzlādes ligzdas remonts</strong>, <strong>kameras remonts</strong>, <strong>skaļruņi/mikrofons</strong>, kā arī <strong>ūdens bojājumi</strong>. Uzzini, kā notiek remonts sadaļā <a href="#process-h2">“Kā notiek remonts”</a>.',
    introP2:
      'Skaties arī: <a href="/iphone-remonts">iPhone remonts</a> un <a href="/telefonu-remonts">telefonu remonts</a> — ja meklē remontu citai ierīcei.',
    breadcrumbName: 'Planšetdatoru remonts',
    serviceName: 'Planšetdatoru remonts Rīgā',
    serviceDescription:
      'Planšetdatoru remonts Rīgā: ekrāna maiņa, baterijas nomaiņa, uzlādes ligzda, kamera, skaņa un ūdens bojājumi. Ātra diagnostika, godīgas cenas un 90 dienu garantija.',
    servicesTitle: 'Populārākie planšetdatoru remonti',
    servicesItems: [
      {
        title: 'Ekrāna maiņa',
        text: 'plaisas, plankumi, skāriena problēmas.',
        icon: LuTabletSmartphone,
      },
      {
        title: 'Akumulatora maiņa',
        text: 'strauji krīt uzlāde, īss darbības laiks.',
        icon: LuBatteryCharging,
      },
      {
        title: 'Uzlādes ligzda',
        text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
        icon: LuPlugZap,
      },
      {
        title: 'Kamera',
        text: 'miglains attēls, fokusēšanās kļūdas.',
        icon: LuCamera,
      },
      {
        title: 'Skaļruņi/mikrofons',
        text: 'klusa skaņa, krakšķi, sarunās nedzird.',
        icon: LuVolume2,
      },
      {
        title: 'Ūdens bojājumi',
        text: 'diagnostika un atjaunošana, ja tas iespējams.',
        icon: LuDroplets,
      },
    ],
    faqTitle: 'Biežāk uzdotie jautājumi',
    processTitle: 'Kā notiek remonts',
    processSteps: [
      {
        title: 'Diagnostika',
        text: 'Ātri pārbaudām planšetdatoru un apstiprinām problēmu.',
      },
      {
        title: 'Cena un termiņš',
        text: 'Saskaņojam izmaksas un izpildes laiku pirms jebkura remonta.',
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
    ],
    scrollCta: { label: 'Skatīt zīmolus', targetId: 'brand-list' },
    fallbackTitle: 'Planšetdatoru remonts Rīgā',
  };
}

export function getTabletRepairMetadata(locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: 'Ремонт планшетов в Риге — цены, быстро, гарантия | iLab',
      description:
        'Ремонт планшетов в Риге: экран, батарея, разъём зарядки, камера, повреждения после попадания влаги. Быстрая диагностика, честные цены, гарантия 90 дней.',
      alternates: { canonical: '/ru/remont-planshetov' },
    };
  }

  return {
    title: 'Planšetdatoru remonts Rīgā — cenas, ātri, garantija | iLab',
    description:
      'Planšetdatoru remonts Rīgā: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
    alternates: { canonical: '/plansetdatoru-remonts' },
  };
}

function buildFaqLd(items, basePath) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }, index) => ({
      '@type': 'Question',
      '@id': `${ORIGIN}${basePath}#faq-q${index + 1}`,
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function buildProcessHowToLd(locale = 'lv', basePath = '/plansetdatoru-remonts') {
  if (locale === 'ru') {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${ORIGIN}${basePath}#howto`,
      name: 'Как проходит ремонт планшета в iLab',
      description:
        'Как по шагам проходит диагностика, ремонт и тестирование планшета в сервисе iLab в Риге.',
      step: [
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
          text: 'Сертифицированные мастера выполняют ремонт экрана, батареи, разъёма зарядки, камеры или других компонентов.',
        },
        {
          '@type': 'HowToStep',
          name: '4. Проверка',
          text: 'После ремонта тестируем сенсор, изображение, звук, зарядку, сеть и другие функции.',
        },
        {
          '@type': 'HowToStep',
          name: '5. Гарантия и выдача',
          text: 'Выдаём планшет с гарантией 90 дней на детали и работу.',
        },
      ],
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${ORIGIN}${basePath}#howto`,
    name: 'Planšetdatoru remonta process iLab',
    description:
      'Kā soli pa solim notiek planšetdatoru diagnostika, remonts un testēšana iLab servisā Rīgā.',
    step: [
      {
        '@type': 'HowToStep',
        name: '1. Diagnostika',
        text: 'Ātri pārbaudām planšetdatoru, apstiprinām problēmu un izvērtējam bojājuma apmēru.',
      },
      {
        '@type': 'HowToStep',
        name: '2. Cena un termiņš',
        text: 'Pirms remonta sākšanas saskaņojam izmaksas, rezerves detaļu veidu un izpildes termiņu.',
      },
      {
        '@type': 'HowToStep',
        name: '3. Remonts',
        text: 'Sertificēti meistari veic ekrāna, baterijas, uzlādes ligzdas, kameras vai citu komponentu remontu.',
      },
      {
        '@type': 'HowToStep',
        name: '4. Pārbaude',
        text: 'Pēc remonta testējam skārienu, attēlu, skaņu, uzlādi, tīklu un citas ikdienai svarīgas funkcijas.',
      },
      {
        '@type': 'HowToStep',
        name: '5. Garantija un izsniegšana',
        text: 'Izsniedzam planšetdatoru ar 90 dienu garantiju uz detaļu un darbu.',
      },
    ],
  };
}

function buildItemListLd(brandBlocks, locale = 'lv') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: brandBlocks.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: abs(b.href),
      name:
        locale === 'ru'
          ? `${b.name} ремонт планшетов`
          : `${b.name} planšetdatoru remonts`,
    })),
  };
}

export default async function TabletRepairPage({ locale = 'lv' }) {
  const strings = getPageStrings(locale);
  const faqItems = getFaqItems(locale);

  const [page, devices] = await Promise.all([
    resolveCategoryPage(CATEGORY_KEY, locale),
    getDevices(),
  ]);

  if (!page) return null;

  const basePath = page.route?.publicPath || buildCategoryHref(locale, CATEGORY_KEY);

  const brandBlocks = buildBrandBlocks({
    category: page.source?.category,
    devices,
    locale,
    basePath,
  });

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
      label: page.labels?.homeCrumb || (locale === 'ru' ? 'Главная' : 'Sākums'),
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: page.seo?.breadcrumbName || headerTitle,
      href: basePath,
    },
  ];

  const heroHtml =
    page.source?.category?.bodyHtml
      ? pickLocalized(page.source.category.bodyHtml, locale, '')
      : null;

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: breadcrumbs[0].label, url: abs(breadcrumbs[0].href) },
    { name: breadcrumbs[1].label, url: abs(basePath) },
  ]);

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}${basePath}#service`,
    serviceType: strings.breadcrumbName,
    areaServed: { '@type': 'City', name: 'Rīga' },
    provider: buildProvidersFromLocations(),
    url: abs(basePath),
    name: strings.serviceName,
    description: strings.serviceDescription,
  };

  const itemListLd = buildItemListLd(brandBlocks, locale);
  const faqLd = buildFaqLd(faqItems, basePath);
  const processHowToLd = buildProcessHowToLd(locale, basePath);

  return (
    <>
      <Script id="breadcrumbs-jsonld-tablets" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="service-jsonld-tablets" type="application/ld+json">
        {JSON.stringify(serviceLd)}
      </Script>
      <Script id="itemlist-jsonld-tablets" type="application/ld+json">
        {JSON.stringify(itemListLd)}
      </Script>
      <Script id="faq-jsonld-tablets" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>
      <Script id="process-jsonld-tablets" type="application/ld+json">
        {JSON.stringify(processHowToLd)}
      </Script>

      <PageHeader
        title={headerTitle}
        lead={headerLead}
        scrollCta={strings.scrollCta}
        crumbs={breadcrumbs}
      />

      <DeviceHero
        image="/images/categories/plansetdatoru_remonts.webp"
        alt={strings.heroAlt}
        bodyHtml={heroHtml}
      />

      <section className={s.section} aria-labelledby="tablets-intro-h2">
        <div className={s.container}>
          <h2 id="tablets-intro-h2" className={s.h2}>
            {strings.introTitle}
          </h2>

          <p className={s.intro}>{strings.introLead}</p>

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP1 }}
          />

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP2 }}
          />
        </div>
      </section>

      <div id="brand-list" className={s.anchorTarget} />

      {brandBlocks.map((b) => (
        <BrandPreview
          key={b.slug}
          brandSlug={b.slug}
          brandName={b.name}
          items={b.items}
          total={b.total}
          href={b.href}
        />
      ))}

      <section className={s.section} aria-labelledby="popular-services-h2">
        <div className={s.container}>
          <Services
            id="tablet-services"
            title={strings.servicesTitle}
            items={strings.servicesItems}
            headingLevel={2}
            variant="list"
          />
        </div>
      </section>

      {page.sections?.hasReviews && <Reviews locale={locale} />}

      <div id="process-h2" className={s.anchorTarget} />
      {page.sections?.hasProcess && (
        <section className={s.section} aria-labelledby="process-h2">
          <div className={s.container}>
            <Process
              id="process"
              title={strings.processTitle}
              steps={strings.processSteps}
              headingLevel={2}
              variant="cards"
              locale={locale}
            />
          </div>
        </section>
      )}

      {page.sections?.hasWhy && (
        <section className={s.section}>
          <Why locale={locale} />
        </section>
      )}

      {page.sections?.hasFaq && (
        <section className={s.section} aria-labelledby="faq-h2">
          <div className={s.container}>
            <Faq
              id="tablets-faq"
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
        <section className={s.section}>
          <ConvertBand locale={locale} />
        </section>
      )}
    </>
  );
}