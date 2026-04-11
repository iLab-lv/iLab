import Script from 'next/script';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import BrandPickerPricelist from '@components/service-pricelist/BrandPickerPricelist';

import {
  normalizeText,
  toFaqLd,
  toFaqRenderItems,
} from '@sections/faq/faq.helpers';

import categories from '@/data/categories';
import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';

import { db } from '@/lib/firebaseAdmin';
import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';

import s from '@styles/Catalog.module.scss';

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      servicePath: '/ru/remont-telefonov/remont-posle-popadaniya-vlagi',
      categoryPath: '/ru/remont-telefonov',
      allModelsHref: '/ru/remont-telefonov#brand-list',

      pageTitle: 'Ремонт телефона после попадания влаги в Риге',
      pageDescription:
        'Ремонт телефона после попадания влаги в Риге: диагностика, чистка и устранение окисления после контакта с жидкостью. Замена повреждённых деталей и гарантия 90 дней.',

      homeCrumb: 'Главная',
      categoryCrumb: 'Ремонт телефонов',
      pageCrumb: 'Ремонт после попадания влаги',

      headerTitle: 'Ремонт телефона после попадания влаги в Риге',
      headerLead:
        'Ремонтируем телефоны после контакта с водой и другими жидкостями: диагностика, глубокая чистка, устранение окисления и замена повреждённых деталей. После ремонта выдаём гарантию 90 дней.',

      heroAlt: 'Ремонт телефона после попадания влаги в Риге',
      heroBodyHtml:
        '<p><strong>Контакт с водой или другой жидкостью?</strong> Выполняем диагностику, глубокую чистку и <strong>устранение окисления</strong>, а также замену повреждённых деталей. Чем быстрее устройство попадёт в сервис, тем выше шанс восстановить его работу. <strong>Бесплатная проверка</strong> и <strong>гарантия 90 дней</strong>.</p>',

      introTitle: 'Ремонт телефона после попадания влаги в Риге',
      introP1:
        'После контакта с водой или другой жидкостью повреждения не всегда видны сразу — внутри начинается <strong>окисление и коррозия</strong>. В iLab выполняем <strong>диагностику</strong>, <strong>глубокую чистку</strong>, восстановление соединений и, при необходимости, <strong>замену повреждённых деталей</strong>, например дисплея, батареи, цепи зарядки или динамиков.',
      introP2:
        'Важно: после попадания жидкости <strong>не заряжайте</strong> и <strong>не включайте</strong> устройство, не используйте фен и не кладите телефон в рис. Как можно быстрее доставьте его в сервис — это существенно повышает шанс успешного <strong>ремонта телефона после попадания влаги</strong>.',
      selectedModelPrefix: 'Выбрана модель:',
      selectedModelSuffix: 'Прокрутите к',
      selectedModelLink: 'ценам',

      brandPickerTitle: 'Выберите бренд',
      pricelistTitle: 'Цены на ремонт после попадания влаги по модели',
      pricelistIntro:
        'Выберите бренд и модель, чтобы увидеть стартовую цену диагностики и восстановления. Для части повреждений точная цена подтверждается после диагностики.',
      ctaLabel: 'Записаться на ремонт',

      processTitle: 'Как проходит ремонт после попадания влаги',
      processSteps: [
        {
          title: 'Диагностика',
          text: 'Открываем устройство, оцениваем окисление, повреждённые узлы и цепи питания, определяем объём повреждений.',
        },
        {
          title: 'Чистка и обработка',
          text: 'Проводим ультразвуковую чистку и/или химическую обработку, очищаем платы и соединения, при возможности восстанавливаем пайку.',
        },
        {
          title: 'Замена деталей',
          text: 'При необходимости меняем повреждённые детали: дисплей, батарею, модуль зарядки, динамики и другие компоненты.',
        },
        {
          title: 'Тесты',
          text: 'Проверяем зарядку, звук, камеру, сеть, Wi-Fi, датчики и другие важные функции, чтобы убедиться в стабильной работе.',
        },
        {
          title: 'Гарантия',
          text: 'Выдаём устройство с гарантией 90 дней на деталь и работу, объясняем оставшиеся риски и даём рекомендации по дальнейшему использованию.',
        },
      ],

      faqTitle: 'Часто задаваемые вопросы',
      serviceFaqGroupLabel: 'Повреждение влагой',
      basicFaqGroupLabel: 'Общие вопросы',
      serviceFaqDocId: 'service_udens-bojajumu-remonts_ru',
      basicFaqDocId: 'basic_ru',

      serviceName: 'Ремонт телефона после попадания влаги в Риге',
      serviceType: 'Ремонт телефона после попадания влаги',
      serviceDescription:
        'Диагностика, чистка и устранение окисления после контакта телефона с водой или другими жидкостями. Замена повреждённых деталей с гарантией 90 дней.',

      processHowToName: 'Процесс ремонта телефона после попадания влаги в iLab',
      processHowToDescription:
        'Как шаг за шагом проходит диагностика, чистка и восстановление телефона после попадания влаги в сервисе iLab в Риге.',

      headerCtaLabel: 'Смотреть цены',
      applyAria: 'Записаться на ремонт',
    };
  }

  return {
    servicePath: '/telefonu-remonts/udens-bojajumu-remonts',
    categoryPath: '/telefonu-remonts',
    allModelsHref: '/telefonu-remonts#brand-list',

    pageTitle: 'Telefonu ūdens bojājumu remonts Rīgā',
    pageDescription:
      'Telefonu ūdens bojājumu remonts Rīgā: diagnostika, tīrīšana un oksidācijas novēršana pēc saskares ar šķidrumu. Bojāto detaļu nomaiņa un 90 dienu garantija.',

    homeCrumb: 'Sākums',
    categoryCrumb: 'Telefonu remonts',
    pageCrumb: 'Ūdens bojājumu remonts',

    headerTitle: 'Telefonu ūdens bojājumu remonts Rīgā',
    headerLead:
      'Remontējam telefonus pēc saskares ar ūdeni un citiem šķidrumiem: diagnostika, dziļā tīrīšana, oksidācijas novēršana un bojāto detaļu nomaiņa. Pēc remonta sniedzam 90 dienu garantiju.',

    heroAlt: 'Telefonu ūdens bojājumu remonts Rīgā',
    heroBodyHtml:
      '<p><strong>Ūdens vai citu šķidrumu ietekme?</strong> Veicam diagnostiku, dziļo tīrīšanu un <strong>oksidācijas novēršanu</strong>, kā arī bojāto detaļu maiņu. Jo ātrāk ierīce nonāk servisā, jo lielākas izredzes atjaunot tās darbību. <strong>Bezmaksas pārbaude</strong> un <strong>90 dienu garantija</strong>.</p>',

    introTitle: 'Telefonu ūdens bojājumu remonts Rīgā',
    introP1:
      'Pēc saskares ar ūdeni vai citiem šķidrumiem bojājumi ne vienmēr ir redzami uzreiz — iekšpusē sākas <strong>oksidācija un korozija</strong>. iLab veicam <strong>diagnostiku</strong>, <strong>dziļo tīrīšanu</strong>, savienojumu atjaunošanu un, ja nepieciešams, <strong>bojāto detaļu nomaiņu</strong>, piemēram, displeju, bateriju, uzlādes ķēdi vai skaļruņus.',
    introP2:
      'Svarīgi: pēc applūšanas <strong>neuzlādējiet</strong> un <strong>neieslēdziet</strong> ierīci, neizmantojiet fēnu un nelieciet telefonu rīsos. Nogādājiet to servisā pēc iespējas ātrāk — tas būtiski palielina <strong>telefonu ūdens bojājumu remonta</strong> izdošanās iespēju.',
    selectedModelPrefix: 'Atlasīts modelis:',
    selectedModelSuffix: 'Ritiniet uz',
    selectedModelLink: 'cenām',

    brandPickerTitle: 'Izvēlies zīmolu',
    pricelistTitle: 'Ūdens bojājumu remonta cenas pēc modeļa',
    pricelistIntro:
      'Izvēlies zīmolu un modeli, lai redzētu diagnostikas un atjaunošanas sākotnējo cenu. Dažiem bojājumiem galīgā cena tiek precizēta pēc diagnostikas.',
    ctaLabel: 'Pieteikties remontam',

    processTitle: 'Kā notiek ūdens bojājumu remonts',
    processSteps: [
      {
        title: 'Diagnostika',
        text: 'Atveram ierīci, izvērtējam oksidāciju, bojātos mezglus un strāvas ķēdes, nosakām bojājuma apmēru.',
      },
      {
        title: 'Tīrīšana un apstrāde',
        text: 'Veicam ultraskaņas tīrīšanu un/vai ķīmisko apstrādi, attīrām plates un savienojumus, atjaunojam lodējumus, ja tas ir iespējams.',
      },
      {
        title: 'Detaļu nomaiņa',
        text: 'Pēc vajadzības nomainām bojātās detaļas — displeju, bateriju, uzlādes moduli, skaļruņus vai citus komponentus.',
      },
      {
        title: 'Testi',
        text: 'Pārbaudām uzlādi, skaņu, kameru, tīklu, Wi-Fi, sensorus un citas ikdienas funkcijas, lai pārliecinātos par stabilu darbību.',
      },
      {
        title: 'Garantija',
        text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, izskaidrojam atlikušos riskus un sniedzam ieteikumus turpmākai lietošanai.',
      },
    ],

    faqTitle: 'Biežāk uzdotie jautājumi',
    serviceFaqGroupLabel: 'Ūdens bojājumi',
    basicFaqGroupLabel: 'Vispārīgi jautājumi',
    serviceFaqDocId: 'service_udens-bojajumu-remonts_lv',
    basicFaqDocId: 'basic_lv',

    serviceName: 'Telefonu ūdens bojājumu remonts Rīgā',
    serviceType: 'Telefonu ūdens bojājumu remonts',
    serviceDescription:
      'Diagnostika, tīrīšana un oksidācijas novēršana pēc saskares ar ūdeni vai citiem šķidrumiem. Bojāto detaļu nomaiņa ar 90 dienu garantiju.',

    processHowToName: 'Telefonu ūdens bojājumu remonta process iLab',
    processHowToDescription:
      'Kā soli pa solim notiek telefonu ūdens bojājumu diagnostika, tīrīšana un atjaunošana iLab servisā Rīgā.',

    headerCtaLabel: 'Skatīt cenas',
    applyAria: 'Pieteikties remontam',
  };
}

export function getPhoneWaterDamageServiceMetadata(locale = 'lv') {
  const strings = getPageStrings(locale);

  return {
    title: `${strings.pageTitle} | iLab`,
    description: strings.pageDescription,
    alternates: { canonical: strings.servicePath },
  };
}

function getPhoneBrandOptions() {
  const phonesCat = Array.isArray(categories)
    ? categories.find((c) => c.slug === 'telefonu-remonts')
    : null;

  const listed = phonesCat?.brands || [];
  const withDevices = listed.filter((b) =>
    devices.some(
      (d) =>
        (d.category || '').toLowerCase() === 'telefonu-remonts' &&
        (d.brandSlug || '').toLowerCase() ===
          String(b.brandSlug || b.slug).toLowerCase()
    )
  );

  const hasSamsung = withDevices.find(
    (b) => (b.brandSlug || b.slug) === 'samsung'
  );

  const defaultBrand = hasSamsung
    ? 'samsung'
    : withDevices[0]?.brandSlug || withDevices[0]?.slug || 'samsung';

  const brandOptions = withDevices.map((b) => ({
    slug: b.brandSlug || b.slug,
    name: b.name,
  }));

  return { brandOptions, defaultBrand };
}

function dedupeFaqItems(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const key = normalizeText(item?.q || '').toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sortFaqItems(items = []) {
  return [...items].sort((a, b) => {
    const ao = typeof a?.order === 'number' ? a.order : 9999;
    const bo = typeof b?.order === 'number' ? b.order : 9999;
    if (ao !== bo) return ao - bo;

    const aq = String(a?.q || '');
    const bq = String(b?.q || '');
    return aq.localeCompare(bq);
  });
}

async function getFaqSections(locale = 'lv') {
  const strings = getPageStrings(locale);

  const [serviceDoc, basicDoc] = await Promise.all([
    db.collection('faqGroups').doc(strings.serviceFaqDocId).get(),
    db.collection('faqGroups').doc(strings.basicFaqDocId).get(),
  ]);

  const sections = [];

  const serviceData = serviceDoc.exists ? serviceDoc.data() || {} : {};
  const basicData = basicDoc.exists ? basicDoc.data() || {} : {};

  const serviceItems = sortFaqItems(
    (Array.isArray(serviceData.items) ? serviceData.items : [])
      .filter((item) => {
        if (!item) return false;
        if (!String(item.q || '').trim()) return false;
        if (!(String(item.aHtml || '').trim() || String(item.a || '').trim())) {
          return false;
        }
        if (item.isHidden === true) return false;
        return true;
      })
      .map((item) => ({
        q: String(item.q || '').trim(),
        aHtml: typeof item.aHtml === 'string' ? item.aHtml.trim() : '',
        a: typeof item.a === 'string' ? item.a.trim() : '',
        order:
          typeof item.order === 'number' && Number.isFinite(item.order)
            ? item.order
            : 9999,
      }))
  );

  if (serviceItems.length) {
    sections.push({
      id: strings.serviceFaqDocId,
      title: strings.serviceFaqGroupLabel,
      items: serviceItems,
    });
  }

  const basicItems = sortFaqItems(
    (Array.isArray(basicData.items) ? basicData.items : [])
      .filter((item) => {
        if (!item) return false;
        if (!String(item.q || '').trim()) return false;
        if (!(String(item.aHtml || '').trim() || String(item.a || '').trim())) {
          return false;
        }
        if (item.isHidden === true) return false;
        return true;
      })
      .map((item) => ({
        q: String(item.q || '').trim(),
        aHtml: typeof item.aHtml === 'string' ? item.aHtml.trim() : '',
        a: typeof item.a === 'string' ? item.a.trim() : '',
        order:
          typeof item.order === 'number' && Number.isFinite(item.order)
            ? item.order
            : 9999,
      }))
  );

  if (basicItems.length) {
    sections.push({
      id: strings.basicFaqDocId,
      title: strings.basicFaqGroupLabel,
      items: basicItems,
    });
  }

  return sections;
}

function buildServiceLd(strings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}${strings.servicePath}#service`,
    serviceType: strings.serviceType,
    name: strings.serviceName,
    url: abs(strings.servicePath),
    description: strings.serviceDescription,
    areaServed: { '@type': 'City', name: 'Rīga' },
    provider: buildProvidersFromLocations(),
  };
}

function buildProcessHowToLd(strings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${ORIGIN}${strings.servicePath}#howto`,
    name: strings.processHowToName,
    description: strings.processHowToDescription,
    step: strings.processSteps.map((step, index) => ({
      '@type': 'HowToStep',
      name: `${index + 1}. ${step.title}`,
      text: step.text,
    })),
  };
}

export default async function PhoneWaterDamageServicePage({
  locale = 'lv',
  searchParams,
}) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;
  const strings = getPageStrings(locale);
  const { brandOptions, defaultBrand } = getPhoneBrandOptions();
  const sections = await getFaqSections(locale);

  const mergedFaqItems = dedupeFaqItems(
    sections.flatMap((section) => section.items || [])
  );

  const faqLd = toFaqLd(mergedFaqItems);

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.categoryCrumb, url: abs(strings.categoryPath) },
    { name: strings.pageCrumb, url: abs(strings.servicePath) },
  ]);

  const serviceLd = buildServiceLd(strings);
  const processHowToLd = buildProcessHowToLd(strings);

  const headerCrumbs = [
    {
      label: strings.homeCrumb,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.categoryCrumb,
      href: strings.categoryPath,
    },
    {
      label: strings.pageCrumb,
      href: strings.servicePath,
    },
  ];

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      <Script id="process-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(processHowToLd)}
      </Script>

      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        scrollCta={{ label: strings.headerCtaLabel, targetId: 'cenas' }}
        crumbs={headerCrumbs}
      />

      <DeviceHero
        image="/images/categories/udens_bojajumi.webp"
        alt={strings.heroAlt}
        focal="right"
        className="service"
        bodyHtml={strings.heroBodyHtml}
      />

      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h2 id="intro-h2" className={s.h2}>
            {strings.introTitle}
          </h2>

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP1 }}
          />

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP2 }}
          />

          {selectedModel && (
            <p className={s.note}>
              {strings.selectedModelPrefix}{' '}
              <strong>{decodeURIComponent(selectedModel)}</strong>.{' '}
              {strings.selectedModelSuffix}{' '}
              <a href="#cenas">{strings.selectedModelLink}</a>.
            </p>
          )}
        </div>
      </section>

      <section id="cenas" className={s.section} aria-labelledby="brand-picker-h2">
        <div className={s.container}>
          <h2 id="brand-picker-h2" className={s.h2} style={{ marginBottom: 12 }}>
            {strings.brandPickerTitle}
          </h2>

          <BrandPickerPricelist
            devices={devices}
            pricing={devicePricing}
            brandOptions={brandOptions}
            defaultBrand={defaultBrand}
            categorySlug="telefonu-remonts"
            serviceIds={['water-damage-clean']}
            title={strings.pricelistTitle}
            intro={strings.pricelistIntro}
            allModelsHref={strings.allModelsHref}
            cta={{ label: strings.ctaLabel, href: '#pieteikties' }}
            className={s.section}
            locale={locale}
          />
        </div>
      </section>

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

      <section className={s.section}>
        <Why locale={locale} />
      </section>

      {!!sections.length && (
        <section className={s.section} aria-labelledby="faq-h2">
          <div className={s.container}>
            <h2 id="faq-h2" className={s.h2}>
              {strings.faqTitle}
            </h2>

            {sections.map((section, index) => (
              <div
                key={`faq-group-${index}-${section.id}`}
                className={index > 0 ? s.stackLg : ''}
              >
                <Faq
                  id={`faq-group-${index + 1}`}
                  title={section.title}
                  items={toFaqRenderItems(section.items)}
                  headingLevel={3}
                  variant="accordion"
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section
        id="pieteikties"
        className={s.section}
        aria-label={strings.applyAria}
      >
        <div className={s.container}>
          <ConvertBand locale={locale} />
        </div>
      </section>
    </>
  );
}