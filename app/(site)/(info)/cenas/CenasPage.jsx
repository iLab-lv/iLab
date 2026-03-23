import Script from 'next/script';

import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import BrandPickerPricelist from '@components/service-pricelist/BrandPickerPricelist';

import categories from '@/data/categories';
import devices from '@/data/devices';

import { ORIGIN, abs, buildBreadcrumbsLd } from '@/lib/seo/jsonldHelpers';

import s from '@styles/Catalog.module.scss';

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      servicePath: '/ru/ceny',
      pageName: 'Цены | iLab',
      pageDescription:
        'Цены на ремонт iLab по модели. Выберите бренд и модель устройства, чтобы увидеть все цены на услуги в одном месте.',
      homeCrumb: 'Главная',
      pageCrumb: 'Цены',
      brandPickerTitle: 'Выберите бренд',
      pricelistTitle: 'Цены по модели',
      ctaLabel: 'Записаться на ремонт',
      processTitle: 'Как узнать точную цену',
      processSteps: [
        {
          title: 'Выберите модель',
          text: 'Найдите свой бренд и модель в прайс-листе — вы увидите опубликованные цены и типовые услуги.',
        },
        {
          title: 'Если цены нет — свяжитесь с нами',
          text: 'Для некоторых более редких моделей или работ цена определяется после диагностики и проверки наличия деталей.',
        },
        {
          title: 'Согласуем смету и срок',
          text: 'Перед ремонтом мы подтверждаем цену и срок выполнения. Никаких неожиданных доплат постфактум.',
        },
        {
          title: 'Ремонт и тестирование',
          text: 'Выполняем ремонт, тестируем устройство и выдаём его с гарантией в зависимости от работы и типа детали.',
        },
      ],
      faqTitle: 'Часто задаваемые вопросы',
      faqItems: [
        {
          q: 'Почему для некоторых моделей не отображается цена?',
          a: 'Не для всех моделей и услуг цены опубликованы. В таких случаях свяжитесь с нами — мы уточним стоимость и срок после диагностики.',
        },
        {
          q: 'Может ли цена измениться после диагностики?',
          a: 'Иногда да — если дополнительно обнаруживаются другие повреждения, например проблемы с цепью зарядки или последствия попадания влаги, перед ремонтом мы согласуем обновлённую смету.',
        },
        {
          q: 'Есть ли гарантия?',
          a: 'Да — на ремонт обычно предоставляется гарантия. Конкретный срок может отличаться в зависимости от услуги и типа детали.',
        },
      ],
      bookingAria: 'Записаться на ремонт',
    };
  }

  return {
    servicePath: '/cenas',
    pageName: 'Cenas | iLab',
    pageDescription:
      'iLab remonta cenas pēc modeļa. Izvēlies zīmolu un ierīces modeli, lai redzētu visu pakalpojumu cenas vienuviet.',
    homeCrumb: 'Sākums',
    pageCrumb: 'Cenas',
    brandPickerTitle: 'Izvēlies zīmolu',
    pricelistTitle: 'Cenas pēc modeļa',
    ctaLabel: 'Pieteikties remontam',
    processTitle: 'Kā uzzināt precīzu cenu',
    processSteps: [
      {
        title: 'Izvēlies modeli',
        text: 'Atrodi savu zīmolu un modeli cenrādī — redzēsi publicētās cenas un tipiskos pakalpojumus.',
      },
      {
        title: 'Ja cena nav redzama — sazinies',
        text: 'Dažiem retākiem modeļiem vai darbiem cenu nosakām pēc diagnostikas un detaļu pieejamības.',
      },
      {
        title: 'Saskaņojam tāmi un termiņu',
        text: 'Pirms remonta apstiprinām cenu un izpildes laiku. Nekādu pārsteigumu pēc fakta.',
      },
      {
        title: 'Remonts + tests',
        text: 'Veicam remontu, testējam un izsniedzam ierīci ar garantiju atkarībā no darba un detaļas.',
      },
    ],
    faqTitle: 'Biežāk uzdotie jautājumi',
    faqItems: [
      {
        q: 'Kāpēc dažiem modeļiem cena nav redzama?',
        a: 'Ne visiem modeļiem un pakalpojumiem cenas ir publicētas. Šādos gadījumos sazinieties ar mums — precizēsim cenu un termiņu pēc diagnostikas.',
      },
      {
        q: 'Vai cena var atšķirties pēc diagnostikas?',
        a: 'Dažreiz jā — ja papildus konstatējam citus bojājumus, piemēram, uzlādes ķēdes vai mitruma sekas, pirms remonta saskaņojam atjauninātu tāmi.',
      },
      {
        q: 'Vai ir garantija?',
        a: 'Jā — remontiem parasti ir garantija. Konkrētais termiņš var atšķirties atkarībā no pakalpojuma un detaļas veida.',
      },
    ],
    bookingAria: 'Pieteikties remontam',
  };
}

function titleCaseSlug(slug = '') {
  const txt = String(slug || '').replace(/[-_]+/g, ' ').trim();
  if (!txt) return '—';

  return txt
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

function getAllBrandOptions() {
  const nameBySlug = new Map();

  if (Array.isArray(categories)) {
    for (const c of categories) {
      const list = Array.isArray(c?.brands) ? c.brands : [];
      for (const b of list) {
        const slug = String(b?.brandSlug || b?.slug || '')
          .toLowerCase()
          .trim();
        const name = String(b?.name || '').trim();

        if (slug && name && !nameBySlug.has(slug)) {
          nameBySlug.set(slug, name);
        }
      }
    }
  }

  const slugsWithDevices = new Set(
    (Array.isArray(devices) ? devices : [])
      .map((d) => String(d?.brandSlug || '').toLowerCase().trim())
      .filter(Boolean)
  );

  const BRAND_ORDER = ['apple', 'ipad', 'macbook', 'samsung', 'huawei'];

  const brandOptions = Array.from(slugsWithDevices)
    .sort((a, b) => {
      const ai = BRAND_ORDER.indexOf(a);
      const bi = BRAND_ORDER.indexOf(b);

      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;

      return a.localeCompare(b);
    })
    .map((slug) => {
      const name = nameBySlug.get(slug) || titleCaseSlug(slug);

      return {
        slug,
        name,
        brandSlug: slug,
        label: name,
      };
    });

  const hasApple = brandOptions.some((b) => b.slug === 'apple');
  const defaultBrand = hasApple ? 'apple' : brandOptions[0]?.slug || 'apple';

  return { brandOptions, defaultBrand };
}

function buildWebPageLd(strings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${ORIGIN}${strings.servicePath}#webpage`,
    url: abs(strings.servicePath),
    name: strings.pageName,
    description: strings.pageDescription,
  };
}

function buildFaqLd(strings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: strings.faqItems.map(({ q, a }, index) => ({
      '@type': 'Question',
      '@id': `${ORIGIN}${strings.servicePath}#faq-q${index + 1}`,
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}

export default function CenasPage({ locale = 'lv', searchParams }) {
  const strings = getPageStrings(locale);
  const { brandOptions, defaultBrand } = getAllBrandOptions();

  const brandFromUrl =
    typeof searchParams?.brand === 'string'
      ? searchParams.brand.toLowerCase().trim()
      : '';

  const isValidBrand = brandFromUrl
    ? brandOptions.some(
        (b) => b.slug === brandFromUrl || b.brandSlug === brandFromUrl
      )
    : false;

  const stableDefaultBrand = isValidBrand ? brandFromUrl : defaultBrand;

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.pageCrumb, url: abs(strings.servicePath) },
  ]);

  const webPageLd = buildWebPageLd(strings);
  const faqLd = buildFaqLd(strings);

  return (
    <>
      <Script
        id="breadcrumbs-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id="webpage-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(webPageLd)}
      </Script>

      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      <section
        id="brand-list"
        className={s.section}
        aria-labelledby="brand-picker-h2"
      >
        <div className={s.container}>
          <h2
            id="brand-picker-h2"
            className={s.h2}
            style={{ marginBottom: 12 }}
          >
            {strings.brandPickerTitle}
          </h2>

          <BrandPickerPricelist
            devices={devices}
            pricingSource="firestore"
            brandOptions={brandOptions}
            defaultBrand={stableDefaultBrand}
            categorySlug="all"
            title={strings.pricelistTitle}
            allModelsHref={locale === 'ru' ? '/ru' : '/'}
            cta={{ label: strings.ctaLabel, href: '#pieteikties' }}
            className={s.section}
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
          />
        </div>
      </section>

      <section className={s.section}>
        <Why locale={locale} />
      </section>

      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq id="faq" title={strings.faqTitle} items={strings.faqItems} />
        </div>
      </section>

      <section
        id="pieteikties"
        className={s.section}
        aria-label={strings.bookingAria}
      >
        <div className={s.container}>
          <ConvertBand locale={locale} />
        </div>
      </section>
    </>
  );
}