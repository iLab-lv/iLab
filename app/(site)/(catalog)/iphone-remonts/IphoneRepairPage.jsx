// app/(site)/(catalog)/iphone-remonts/IphoneRepairPage.jsx
import Script from 'next/script';

import categoryContent from '@/data/categoryContent';
import devicesAll from '@/data/devices';

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
import { buildCategoryHref } from '@/lib/routes/routeI18n';

const cat = categoryContent['iphone-remonts'];

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'ремонт iPhone в Риге',
      heroBodyHtml:
        '<p><strong>Быстрый и безопасный ремонт iPhone в Риге</strong> — замена дисплея, батареи и камеры в тот же день. Бесплатная диагностика и <strong>гарантия 90 дней</strong> на каждый ремонт.</p>',
      introTitle: 'Ремонт iPhone в Риге — что мы делаем',
      introBody:
        'Выполняем полный спектр <strong>ремонта iPhone в Риге</strong> — от <strong>замены экрана</strong> и <strong>батареи</strong> до <strong>ремонта разъёма зарядки</strong>, <strong>камеры</strong> и устранения <strong>повреждений после попадания влаги</strong>. Перед началом работ проводим <strong>бесплатную диагностику</strong> и согласовываем точную цену и срок выполнения. Самые частые ремонты выполняем в тот же день. Используем <strong>оригинальные или качественные OEM детали</strong> и даём <strong>гарантию 90 дней</strong> на каждый ремонт.',
      serviceName: 'Ремонт iPhone в Риге',
      serviceDescription:
        'Ремонт iPhone в Риге: замена дисплея и батареи, разъёма зарядки, камеры, ремонт после попадания влаги. Быстрая диагностика, прозрачные цены и гарантия 90 дней.',
      breadcrumbName: 'Ремонт iPhone в Риге',
      homeCrumb: 'Главная',
      howToName: 'Ремонт iPhone',
      modelGridHeading: 'Выберите модель iPhone',
      modelGridIntro:
        'Быстро найдите нужный iPhone по названию или откройте нужную серию и выберите свою модель.',
    };
  }

  return {
    heroAlt: 'iPhone remonts Rīgā',
    heroBodyHtml:
      '<p><strong>Ātrs un drošs iPhone remonts Rīgā</strong> — displeja, baterijas un kameras maiņa tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantiju</strong> katram remontam.</p>',
    introTitle: 'iPhone remonts Rīgā — ko mēs darām',
    introBody:
      'Veicam pilna spektra <strong>iPhone remontu Rīgā</strong> — sākot ar <strong>ekrāna maiņu</strong> un <strong>baterijas nomaiņu</strong>, līdz <strong>uzlādes ligzdas</strong> un <strong>kameras remontam</strong>, kā arī <strong>ūdens bojājumu</strong> novēršanai. Pirms darba uzsākšanas nodrošinām <strong>bezmaksas diagnostiku</strong> un saskaņojam precīzu cenu un izpildes laiku. Biežākos remontdarbus paveicam tajā pašā dienā. Izmantojam <strong>oriģinālās vai augstas kvalitātes OEM detaļas</strong> un sniedzam <strong>90 dienu garantiju</strong> katram remontam.',
    serviceName: 'iPhone remonts Rīgā',
    serviceDescription:
      'iPhone remonts Rīgā: displeja un baterijas maiņa, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, skaidras cenas un 90 dienu garantija.',
    breadcrumbName: 'iPhone remonts Rīgā',
    homeCrumb: 'Sākums',
    howToName: 'iPhone remonts',
    modelGridHeading:
      cat?.sections?.modelGrid?.heading ?? 'Izvēlies savu iPhone modeli',
    modelGridIntro:
      cat?.sections?.modelGrid?.intro ??
      'Atrodi vajadzīgo iPhone pēc nosaukuma vai atver sēriju un izvēlies savu modeli.',
  };
}

export default async function IphoneRepairPage({ locale = 'lv' }) {
  const strings = getPageStrings(locale);
  const baseHref = buildCategoryHref(locale, 'iphone-remonts');
  const popularServices = buildIphonePopularServices(locale);
  const popularServicesTitle = getIphonePopularServicesTitle('iPhone', locale);

  const faq = await getCategoryFaqGroup('iphone-remonts', locale);
  const faqItems = toFaqRenderItems(faq.items);
  const faqLd = toFaqLd(faq.items);

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.breadcrumbName, url: abs(baseHref) },
  ]);

  const serviceLd = buildServiceLdForCity({
    path: baseHref,
    name: strings.serviceName,
    description: strings.serviceDescription,
  });

  const howToLd = buildStandardRepairHowToLd(strings.howToName);

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>
      <Script id="howto-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(howToLd)}
      </Script>
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      <DeviceHero
        image="/images/categories/iphone_remonts.webp"
        alt={strings.heroAlt}
        focal="right"
        className="category"
        priority
        bodyHtml={strings.heroBodyHtml}
      />

      <section className={s.section} aria-labelledby="iphone-intro-h2">
        <div className={s.container}>
          <h2 id="iphone-intro-h2" className={s.h2}>
            {strings.introTitle}
          </h2>
          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introBody }}
          />
        </div>
      </section>

      <section className={s.section} aria-labelledby="iphone-services-h2">
        <div className={s.container}>
          <Services
            id="iphone-services"
            title={popularServicesTitle}
            items={popularServices}
          />
        </div>
      </section>

      <DeviceSelector
        id="iphone-modeli"
        locale={locale}
        title={strings.modelGridHeading}
        intro={strings.modelGridIntro}
        devices={devicesAll}
        baseHref={baseHref}
        brandSlug="apple"
        categorySlug="telefonu-remonts"
        initialLimit={4}
        autoExpandOnSearch={true}
      />

      <Reviews locale={locale} />

      {cat?.show?.guide !== false && cat?.sections?.guide && (
        <Guide
          id="guide"
          title={cat.sections.guide.heading}
          parts={cat.sections.guide.parts}
          headingLevel={2}
        />
      )}

      <Process locale={locale} />

      <section className={s.section}>
        <Why locale={locale} />
      </section>

      <section className={s.section} aria-labelledby="iphone-faq-title">
        <div className={s.container}>
          <Faq id="iphone-faq" title={faq.title} items={faqItems} />
        </div>
      </section>

      <section className={s.section}>
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}