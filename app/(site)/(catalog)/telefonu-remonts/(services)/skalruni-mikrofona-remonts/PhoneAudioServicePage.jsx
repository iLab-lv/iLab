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
      servicePath: '/ru/remont-telefonov/remont-dinamika-i-mikrofona',
      categoryPath: '/ru/remont-telefonov',
      allModelsHref: '/ru/remont-telefonov#brand-list',

      pageTitle: 'Ремонт динамика и микрофона телефона в Риге',
      pageDescription:
        'Тихий звук, хрипы или во время разговора не слышно? Ремонт и чистка динамика и микрофона телефона в Риге. Бесплатная диагностика и гарантия 90 дней.',

      homeCrumb: 'Главная',
      categoryCrumb: 'Ремонт телефонов',
      pageCrumb: 'Ремонт динамика и микрофона',

      headerTitle: 'Ремонт динамика и микрофона телефона в Риге',
      headerLead:
        'Ремонтируем динамик и микрофон телефона, если звук тихий, искажённый, с хрипами или вас не слышно во время разговора. До ремонта проводим диагностику и после ремонта выдаём гарантию 90 дней.',

      heroAlt: 'Ремонт динамика и микрофона телефона в Риге',
      heroBodyHtml:
        '<p><strong>Ремонт динамика и микрофона в Риге</strong> - если во время разговора не слышно, звук тихий, с хрипами или в записи голоса есть шум, выполним чистку или замену модулей. Бесплатная диагностика и <strong>гарантия 90 дней</strong>.</p>',

      introTitle: 'Ремонт динамика и микрофона телефона',
      introP1:
        'Типичные симптомы: <strong>тихий звук</strong>, <strong>искажённый звук</strong>, <strong>хрипы</strong>, <strong>во время разговора плохо слышно</strong> или слышно с <strong>сильным шумом/фоном</strong>, а также <strong>запись голоса без звука</strong>. Во многих случаях достаточно <strong>чистки сеток динамика и микрофона</strong>, но если модуль повреждён или окислился, выполняем <strong>замену динамика или микрофона</strong>.',
      introP2:
        'После ремонта проверяем разговорный динамик, мультимедийный динамик, все микрофоны и шумоподавление в разных сценариях: разговор, громкая связь и запись голоса. Популярные модели обычно ремонтируем за <strong>45–90 минут</strong>. На работу и детали действует <strong>гарантия 90 дней</strong>.',
      selectedModelPrefix: 'Выбрана модель:',
      selectedModelSuffix: 'Прокрутите к',
      selectedModelLink: 'ценам',

      brandPickerTitle: 'Выберите бренд',
      pricelistTitle: 'Цены на ремонт динамика и микрофона по модели',
      pricelistIntro:
        'Выберите бренд и модель, чтобы увидеть цену чистки или замены динамика и микрофона.',
      ctaLabel: 'Записаться на ремонт',

      processTitle: 'Как проходит ремонт динамика и микрофона',
      processSteps: [
        {
          title: 'Диагностика',
          text: 'Проверяем динамики, микрофоны, сетки, контакты и разъёмы; тестируем звонок, мультимедийный звук и запись голоса.',
        },
        {
          title: 'Цена и срок',
          text: 'Объясняем, достаточно ли чистки или нужна замена модуля, и согласовываем стоимость и срок до начала ремонта.',
        },
        {
          title: 'Ремонт или замена',
          text: 'Выполняем чистку сеток и контактов либо замену повреждённых модулей динамика/микрофона, устраняем следы окисления при необходимости.',
        },
        {
          title: 'Проверка',
          text: 'Тестируем звонки, динамики, запись голоса и шумоподавление в разных режимах и на разной громкости.',
        },
        {
          title: 'Гарантия',
          text: 'Выдаём устройство с гарантией 90 дней на деталь и работу, а также даём рекомендации по защите от пыли и влаги.',
        },
      ],

      faqTitle: 'Часто задаваемые вопросы',
      serviceFaqGroupLabel: 'Ремонт динамика и микрофона',
      basicFaqGroupLabel: 'Общие вопросы',
      serviceFaqDocId: 'service_skalruni-mikrofona-remonts_ru',
      basicFaqDocId: 'basic_ru',

      serviceName: 'Ремонт динамика и микрофона телефона в Риге',
      serviceType: 'Ремонт динамика и микрофона телефона',
      serviceDescription:
        'Ремонт и чистка динамика и микрофона телефона в Риге: тихий звук, хрипы, проблемы во время разговора или шум. Бесплатная диагностика и гарантия 90 дней.',

      processHowToName: 'Процесс ремонта динамика и микрофона телефона в iLab',
      processHowToDescription:
        'Как шаг за шагом проходит ремонт и чистка динамика и микрофона телефона в сервисе iLab в Риге.',

      headerCtaLabel: 'Смотреть цены',
      applyAria: 'Записаться на ремонт',
    };
  }

  return {
    servicePath: '/telefonu-remonts/skalruni-mikrofona-remonts',
    categoryPath: '/telefonu-remonts',
    allModelsHref: '/telefonu-remonts#brand-list',

    pageTitle: 'Telefonu skaļruņu un mikrofona remonts Rīgā',
    pageDescription:
      'Klusa skaņa, krakšķi vai sarunās nedzird? Telefonu skaļruņu un mikrofona remonts un tīrīšana Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',

    homeCrumb: 'Sākums',
    categoryCrumb: 'Telefonu remonts',
    pageCrumb: 'Skaļruņu un mikrofona remonts',

    headerTitle: 'Telefonu skaļruņu un mikrofona remonts Rīgā',
    headerLead:
      'Remontējam telefonu skaļruni un mikrofonu, ja skaņa ir klusa, kropļota, ar krakšķiem vai sarunās nedzird. Pirms remonta veicam diagnostiku un pēc remonta sniedzam 90 dienu garantiju.',

    heroAlt: 'Telefonu skaļruņu un mikrofona remonts Rīgā',
    heroBodyHtml:
      '<p><strong>Skaļruņu un mikrofona remonts Rīgā</strong> - ja sarunās nedzird, skaņa ir klusa, ar krakšķiem vai balss ierakstā ir troksnis, veiksim tīrīšanu vai moduļu nomaiņu. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>',

    introTitle: 'Telefonu skaļruņu un mikrofona remonts',
    introP1:
      'Tipiski simptomi: <strong>klusa skaņa</strong>, <strong>kropļota skaņa</strong>, <strong>krakšķi</strong>, <strong>sarunās nedzird</strong> vai dzird ar <strong>spēcīgu fonu/troksni</strong>, kā arī <strong>balss ieraksts bez skaņas</strong>. Bieži pietiek ar <strong>skaļruņu un mikrofonu restīšu tīrīšanu</strong>, taču, ja modulis ir bojāts vai oksidējies, veicam <strong>skaļruņa vai mikrofona nomaiņu</strong>.',
    introP2:
      'Pēc remonta pārbaudām zvanu skaļruni, mediju skaļruni, visus mikrofonus un trokšņu slāpēšanu dažādos scenārijos: sarunas, skaļrunis un balss ieraksts. Populāros modeļus parasti salabojam <strong>45–90 minūšu</strong> laikā. Visam veicamajam darbam un detaļām ir <strong>90 dienu garantija</strong>.',
    selectedModelPrefix: 'Atlasīts modelis:',
    selectedModelSuffix: 'Ritiniet uz',
    selectedModelLink: 'cenām',

    brandPickerTitle: 'Izvēlies zīmolu',
    pricelistTitle: 'Skaļruņu un mikrofona remonta cenas pēc modeļa',
    pricelistIntro:
      'Izvēlies zīmolu un modeli, lai redzētu skaļruņu un mikrofona tīrīšanas vai nomaiņas cenu.',
    ctaLabel: 'Pieteikties remontam',

    processTitle: 'Kā notiek skaļruņu un mikrofona remonts',
    processSteps: [
      {
        title: 'Diagnostika',
        text: 'Pārbaudām skaļruņus, mikrofonu(-us), restītes, kontaktus un ligzdas; testējam zvanu, mediju skaņu un balss ierakstu.',
      },
      {
        title: 'Cena un termiņš',
        text: 'Paskaidrojam, vai pietiek ar tīrīšanu vai nepieciešama moduļa nomaiņa, vienojamies par izmaksām un izpildes laiku pirms darba uzsākšanas.',
      },
      {
        title: 'Remonts vai nomaiņa',
        text: 'Veicam restīšu un kontaktu tīrīšanu vai bojāto skaļruņu/mikrofonu moduļu nomaiņu, novēršam oksidāciju, ja tā ir izveidojusies.',
      },
      {
        title: 'Pārbaude',
        text: 'Testējam sarunas, skaļruņus, balss ierakstu un trokšņu slāpēšanu dažādos skaļuma līmeņos un režīmos.',
      },
      {
        title: 'Garantija',
        text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus, kā pasargāt ierīci no putekļiem un mitruma.',
      },
    ],

    faqTitle: 'Biežāk uzdotie jautājumi',
    serviceFaqGroupLabel: 'Skaļruņu un mikrofona remonts',
    basicFaqGroupLabel: 'Vispārīgi jautājumi',
    serviceFaqDocId: 'service_skalruni-mikrofona-remonts_lv',
    basicFaqDocId: 'basic_lv',

    serviceName: 'Telefonu skaļruņu un mikrofona remonts Rīgā',
    serviceType: 'Telefonu skaļruņu un mikrofona remonts',
    serviceDescription:
      'Telefonu skaļruņu un mikrofona remonts un tīrīšana Rīgā: klusa skaņa, krakšķi, sarunās nedzird vai ir troksnis. Bezmaksas diagnostika un 90 dienu garantija.',

    processHowToName: 'Telefonu skaļruņu un mikrofona remonta process iLab',
    processHowToDescription:
      'Kā soli pa solim notiek telefonu skaļruņu un mikrofona remonts un tīrīšana iLab servisā Rīgā.',

    headerCtaLabel: 'Skatīt cenas',
    applyAria: 'Pieteikties remontam',
  };
}

export function getPhoneAudioServiceMetadata(locale = 'lv') {
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

export default async function PhoneAudioServicePage({
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
        image="/images/categories/mikrofona_remonts.webp"
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
            serviceIds={['speaker', 'microphone']}
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