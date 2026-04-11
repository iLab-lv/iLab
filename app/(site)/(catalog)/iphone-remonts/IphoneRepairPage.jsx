import Script from 'next/script';

import categoryContent from '@/data/categoryContent';
import { getDevices } from '@/lib/content/devices';
import { getSeriesMetaByCategoryBrand } from '@/lib/content/categories';
import { resolveDedicatedBrandHubPage } from '@/lib/content/resolvers/catalogPages';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceSelector from '@sections/device-selector/DeviceSelector';
import Services from '@sections/services/Services';
import {
  buildIphonePopularServices,
  getIphonePopularServicesTitle,
} from '@sections/services/services.i18n';
import Process from '@sections/process/Process';
import Reviews from '@sections/reviews/Reviews';
import Faq from '@sections/faq/Faq';
import { getCategoryFaqGroup } from '@sections/faq/faq.data';
import { toFaqLd, toFaqRenderItems } from '@sections/faq/faq.helpers';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import DeviceHero from '@sections/device-hero/DeviceHero';
import Guide from '@sections/guide/Guide';

import s from '@styles/Catalog.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildStandardRepairHowToLd,
} from '@/lib/seo/jsonldHelpers';

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const HUB_KEY = 'iphone-remonts';

const cat = categoryContent[HUB_KEY];

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'ремонт iPhone в Риге',
      heroBodyHtml:
        '<p><strong>Ремонт iPhone в Риге</strong> в сервисе iLab — замена экрана, аккумулятора, камеры и ремонт разъёма зарядки с быстрой диагностикой и <strong>гарантией 90 дней</strong>. Самые частые ремонты iPhone выполняем в тот же день.</p>',
      introTitle: 'Ремонт iPhone в Риге — что мы делаем',
      introBody:
        'Выполняем полный спектр <strong>ремонта iPhone в Риге</strong> — от <strong>замены экрана</strong>, <strong>аккумулятора</strong>, <strong>ремонта камеры</strong> и <strong>разъёма зарядки</strong> до замены <strong>динамика</strong>, <strong>микрофона</strong> и других компонентов. Перед ремонтом проводим <strong>бесплатную диагностику</strong>, согласовываем стоимость и срок выполнения, а после завершения работ выдаём <strong>гарантию 90 дней</strong> на детали и работу. Используем качественные оригинальные или OEM запчасти, чтобы iPhone после ремонта работал стабильно и надёжно каждый день.',
      howToName: 'Ремонт iPhone',
      modelGridHeading: 'Выберите модель iPhone',
      modelGridIntro:
        'Найдите нужный iPhone по названию или выберите серию.',
      scrollCta: { label: 'Смотреть модели', targetId: 'iphone-modeli' },
      fallbackTitle: 'Ремонт iPhone в Риге',
    };
  }

  return {
    heroAlt: 'iPhone remonts Rīgā',
    heroBodyHtml:
      '<p><strong>iPhone remonts Rīgā</strong> iLab servisā — ekrāna, baterijas, kameras un uzlādes ligzdas remonts ar ātru diagnostiku un <strong>90 dienu garantiju</strong>. Biežākos iPhone remontdarbus paveicam tajā pašā dienā.</p>',
    introTitle: 'iPhone remonts Rīgā — ko mēs darām',
    introBody:
      'Veicam pilna spektra <strong>iPhone remontu Rīgā</strong> — sākot ar <strong>ekrāna maiņu</strong>, <strong>baterijas nomaiņu</strong>, <strong>kameras remontu</strong> un <strong>uzlādes ligzdas remontu</strong>, līdz <strong>skaļruņa</strong>, <strong>mikrofona</strong> un citu detaļu nomaiņai. Pirms remonta veicam <strong>bezmaksas diagnostiku</strong>, saskaņojam izmaksas un izpildes termiņu, bet pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong> detaļām un darbam. Izmantojam kvalitatīvas oriģinālās vai OEM detaļas, lai iPhone pēc remonta darbotos stabili un droši ikdienā.',
    howToName: 'iPhone remonts',
    modelGridHeading:
      cat?.sections?.modelGrid?.heading ?? 'Izvēlies savu iPhone modeli',
    modelGridIntro:
      cat?.sections?.modelGrid?.intro ??
      'Atrodi vajadzīgo iPhone vai izvēlies sēriju.',
    scrollCta: { label: 'Skatīt modeļus', targetId: 'iphone-modeli' },
    fallbackTitle: 'iPhone remonts Rīgā',
  };
}

export default async function IphoneRepairPage({ locale = 'lv' }) {
  const strings = getPageStrings(locale);

  const [page, devicesAll, seriesMeta, faq] = await Promise.all([
    resolveDedicatedBrandHubPage(CATEGORY_KEY, BRAND_KEY, locale),
    getDevices(),
    getSeriesMetaByCategoryBrand(CATEGORY_KEY, BRAND_KEY, locale),
    getCategoryFaqGroup(HUB_KEY, locale),
  ]);

  if (!page) return null;

  /* =========================
     HEADER (FIXED)
  ========================== */

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
      label: page.labels?.homeCrumb || 'Sākums',
      href: '/',
    },
    {
      label: page.seo?.breadcrumbName || headerTitle,
      href: page.route?.publicPath || '/iphone-remonts',
    },
  ];

  /* =========================
     OTHER DATA
  ========================== */

  const popularServices = buildIphonePopularServices(locale);
  const popularServicesTitle = getIphonePopularServicesTitle('iPhone', locale);

  const faqItems = toFaqRenderItems(faq.items);
  const faqLd = toFaqLd(faq.items);

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: breadcrumbs[0].label, url: abs(breadcrumbs[0].href) },
    { name: breadcrumbs[1].label, url: abs(breadcrumbs[1].href) },
  ]);

  const serviceLd = buildServiceLdForCity({
    path: page.route?.publicPath,
    name: page.seo?.schemaName,
    description: page.seo?.schemaDescription,
  });

  const howToLd = buildStandardRepairHowToLd(strings.howToName);

  const selectorTitle =
    page.selector?.heading || strings.modelGridHeading;

  const selectorIntro =
    page.selector?.intro || strings.modelGridIntro;

  /* =========================
     RENDER
  ========================== */

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>

      <Script id="howto-jsonld" type="application/ld+json">
        {JSON.stringify(howToLd)}
      </Script>

      <Script id="breadcrumbs-jsonld" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="service-jsonld" type="application/ld+json">
        {JSON.stringify(serviceLd)}
      </Script>

      {/* ✅ HEADER */}
      <PageHeader
        title={headerTitle}
        lead={headerLead}
        scrollCta={strings.scrollCta}
        crumbs={breadcrumbs}
      />

      {/* ✅ HERO */}
      <DeviceHero
        image={page.hero?.image || '/images/categories/iphone_remonts.webp'}
        alt={strings.heroAlt}
        focal="right"
        priority
        bodyHtml={strings.heroBodyHtml}
      />

      {/* INTRO */}
      <section className={s.section}>
        <div className={s.container}>
          <h2 className={s.h2}>{strings.introTitle}</h2>
          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introBody }}
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className={s.section}>
        <div className={s.container}>
          <Services
            id="iphone-services"
            title={popularServicesTitle}
            items={popularServices}
          />
        </div>
      </section>

      {/* DEVICES */}
      <DeviceSelector
        id="iphone-modeli"
        locale={locale}
        title={selectorTitle}
        intro={selectorIntro}
        devices={devicesAll}
        baseHref={page.route?.publicPath}
        brandKey={BRAND_KEY}
        categoryKey={CATEGORY_KEY}
        seriesMeta={seriesMeta}
        initialLimit={4}
        autoExpandOnSearch
      />

      {page.sections?.hasReviews && <Reviews locale={locale} />}

      {page.sections?.hasGuide && cat?.sections?.guide && (
        <Guide
          id="guide"
          title={cat.sections.guide.heading}
          parts={cat.sections.guide.parts}
          headingLevel={2}
        />
      )}

      {page.sections?.hasProcess && <Process locale={locale} />}

      {page.sections?.hasWhy && (
        <section className={s.section}>
          <Why locale={locale} />
        </section>
      )}

      {page.sections?.hasFaq && (
        <section className={s.section}>
          <div className={s.container}>
            <Faq id="iphone-faq" title={faq.title} items={faqItems} />
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