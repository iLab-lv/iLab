import React from 'react';
import Script from 'next/script';
import Link from 'next/link';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import Process from '@sections/process/Process';
import Why from '@sections/why/Why';
import Locations from '@sections/locations/Locations';
import Reviews from '@sections/reviews/Reviews';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import {
  toFaqLd,
  toFaqRenderItems,
} from '@sections/faq/faq.helpers';

import { db } from '@/lib/firebaseAdmin';
import { abs, buildBreadcrumbsLd } from '@/lib/seo/jsonldHelpers';

import s from './AboutPage.module.scss';

function withLocalePath(path, locale = 'lv') {
  if (locale !== 'ru') return path;
  if (path === '/') return '/ru';

  return `/ru${path}`;
}

function getAboutStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      pagePath: '/ru/o-nas',
      homeCrumb: 'Главная',
      pageCrumb: 'О нас',

      headerTitle: 'О iLab',
      headerLead:
        'iLab - местный сервис устройств в Риге, который с 2013 года помогает клиентам с диагностикой, ремонтом и заменой деталей для телефонов, iPhone, планшетов, компьютеров и Dyson.',

      introEyebrow: 'О iLab',
      introTitle: 'Местный сервис устройств в Риге с 2013 года',
      introText:
        'iLab - сервисный бренд с двумя пунктами приёма клиентов в Риге: T/C Domina Shopping и T/C Spice Home. Каждый день мы помогаем клиентам с диагностикой, ремонтом и заменой деталей для телефонов, iPhone, планшетов, компьютеров и Dyson.',
      introTextSecond:
        'Наша задача - не просто выполнить ремонт, а понятно объяснить возможное решение, уточнить стоимость до начала работы и помочь выбрать удобный способ обращения в сервис.',

      servicesTitle: 'С какими устройствами мы работаем',
      servicesLead:
        'Чаще всего к нам обращаются по вопросам диагностики, ремонта и замены деталей для популярных устройств.',
      popularServicesPrefix: 'Основные направления:',
      popularWorksPrefix: 'Популярные работы:',
      and: 'и',

      links: {
        iphone: 'ремонт iPhone',
        phones: 'ремонт телефонов',
        tablets: 'ремонт планшетов',
        computers: 'ремонт компьютеров',
        dyson: 'ремонт Dyson',
        screen: 'замена экрана',
        battery: 'замена батареи',
        charging: 'ремонт разъёма зарядки',
      },

      factsTitle: 'Коротко об iLab',
      factsLead:
        'Эта информация помогает быстро понять, кто мы, где находимся и с какими задачами работаем.',
      facts: {
        brand: 'Бренд',
        since: 'Работаем с',
        city: 'Город',
        locations: 'Филиалы',
        services: 'Услуги',
        languages: 'Языки общения',
        payments: 'Оплата',
        warranty: 'Гарантия',
        legal: 'Юридическая информация',
        registration: 'Рег. №',
        vat: 'PVN / VAT №',
        legalAddress: 'Юридический адрес',
      },
      factsValues: {
        brand: 'iLab',
        since: '2013 года',
        city: 'Рига',
        locations: 'T/C Domina Shopping и T/C Spice Home',
        services: 'диагностика, ремонт, замена деталей',
        languages: 'латышский, русский',
        payments: 'наличные, карта, Apple Pay, Google Pay',
        warranty: '90 дней на выполненные работы и использованные детали',
      },

      locationsAnchorTitle: 'Где нас найти',
      locationsAnchorText:
        'Клиентские пункты iLab находятся в T/C Domina Shopping и T/C Spice Home. В разделе контактов можно посмотреть время работы, телефоны, WhatsApp и маршруты.',
      contactsCta: 'Открыть контакты',

      faqTitle: 'Часто задаваемые вопросы',
    };
  }

  return {
    pagePath: '/par-mums',
    homeCrumb: 'Sākums',
    pageCrumb: 'Par mums',

    headerTitle: 'Par iLab',
    headerLead:
      'iLab ir vietējais ierīču serviss Rīgā, kas kopš 2013. gada palīdz klientiem ar telefonu, iPhone, planšetdatoru, datoru un Dyson ierīču diagnostiku, remontu un detaļu maiņu.',

    introEyebrow: 'Par iLab',
    introTitle: 'Vietējais ierīču serviss Rīgā kopš 2013. gada',
    introText:
      'iLab ir servisa zīmols ar diviem klientu pieņemšanas punktiem Rīgā - T/C Domina Shopping un T/C Spice Home. Ikdienā palīdzam klientiem ar telefonu, iPhone, planšetdatoru, datoru un Dyson ierīču diagnostiku, remontu un detaļu maiņu.',
    introTextSecond:
      'Mūsu mērķis nav tikai veikt remontu, bet arī saprotami izskaidrot iespējamo risinājumu, precizēt cenu pirms darba sākšanas un palīdzēt izvēlēties ērtāko veidu, kā nodot ierīci servisā.',

    servicesTitle: 'Ar kādām ierīcēm strādājam',
    servicesLead:
      'Visbiežāk pie mums vēršas par populārāko ierīču diagnostiku, remontu un detaļu maiņu.',
    popularServicesPrefix: 'Galvenie virzieni:',
    popularWorksPrefix: 'Populārākie darbi:',
    and: 'un',

    links: {
      iphone: 'iPhone remonts',
      phones: 'telefonu remonts',
      tablets: 'planšetdatoru remonts',
      computers: 'datoru remonts',
      dyson: 'Dyson remonts',
      screen: 'ekrāna maiņa',
      battery: 'baterijas maiņa',
      charging: 'uzlādes ligzdas remonts',
    },

    factsTitle: 'Īsumā par iLab',
    factsLead:
      'Šī informācija palīdz ātri saprast, kas mēs esam, kur atrodamies un ar kādiem darbiem ikdienā strādājam.',
    facts: {
      brand: 'Zīmols',
      since: 'Strādājam kopš',
      city: 'Pilsēta',
      locations: 'Filiāles',
      services: 'Pakalpojumi',
      languages: 'Saziņas valodas',
      payments: 'Apmaksa',
      warranty: 'Garantija',
      legal: 'Juridiskā informācija',
      registration: 'Reģ. Nr.',
      vat: 'PVN / VAT Nr.',
      legalAddress: 'Juridiskā adrese',
    },
    factsValues: {
      brand: 'iLab',
      since: '2013. gada',
      city: 'Rīga',
      locations: 'T/C Domina Shopping un T/C Spice Home',
      services: 'diagnostika, remonts, detaļu maiņa',
      languages: 'latviešu, krievu',
      payments: 'skaidra nauda, karte, Apple Pay, Google Pay',
      warranty: '90 dienas veiktajiem darbiem un izmantotajām detaļām',
    },

    locationsAnchorTitle: 'Kur mūs atrast',
    locationsAnchorText:
      'iLab klientu pieņemšanas punkti atrodas T/C Domina Shopping un T/C Spice Home. Kontaktlapā vari apskatīt darba laiku, tālruņus, WhatsApp saziņu un maršrutus.',
    contactsCta: 'Skatīt kontaktus',

    faqTitle: 'Biežāk uzdotie jautājumi',
  };
}

function sortFaqItems(items = []) {
  return [...items].sort((a, b) => {
    const ao = typeof a?.order === 'number' ? a.order : 9999;
    const bo = typeof b?.order === 'number' ? b.order : 9999;

    if (ao !== bo) return ao - bo;

    return String(a?.q || '').localeCompare(String(b?.q || ''));
  });
}

async function getBasicFaq(locale = 'lv') {
  const strings = getAboutStrings(locale);
  const docId = `basic_${locale}`;
  const snap = await db.collection('faqGroups').doc(docId).get();

  if (!snap.exists) {
    return {
      title: strings.faqTitle,
      items: [],
    };
  }

  const data = snap.data() || {};
  const rawItems = Array.isArray(data.items) ? data.items : [];

  const items = sortFaqItems(
    rawItems
      .filter((item) => {
        if (!item) return false;
        if (item.isHidden === true) return false;

        const q = String(item.q || '').trim();
        const answer = String(item.aHtml || item.a || '').trim();

        return q && answer;
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

  return {
    title:
      typeof data.title === 'string' && data.title.trim()
        ? data.title.trim()
        : strings.faqTitle,
    items,
  };
}

function buildAboutPageLd(strings, locale = 'lv') {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${abs(strings.pagePath)}#about-page`,
    url: abs(strings.pagePath),
    name: strings.pageCrumb,
    description: strings.headerLead,
    inLanguage: locale,
    isPartOf: {
      '@id': `${abs('/')}#website`,
    },
    about: {
      '@id': `${abs('/')}#organization`,
    },
  };
}

function getLegalFacts(company = {}, strings) {
  const legalName =
    company.legalName ||
    company.legalEntity ||
    company.companyName ||
    '';

  const registrationNumber =
    company.registrationNumber ||
    company.regNumber ||
    company.regNr ||
    '';

  const vatNumber =
    company.vatNumber ||
    company.vat ||
    company.pvn ||
    '';

  const legalAddress =
    company.legalAddress ||
    company.registeredAddress ||
    '';

  return [
    legalName
      ? {
          label: strings.facts.legal,
          value: legalName,
        }
      : null,
    registrationNumber
      ? {
          label: strings.facts.registration,
          value: registrationNumber,
        }
      : null,
    vatNumber
      ? {
          label: strings.facts.vat,
          value: vatNumber,
        }
      : null,
    legalAddress
      ? {
          label: strings.facts.legalAddress,
          value: legalAddress,
        }
      : null,
  ].filter(Boolean);
}

function getBusinessFacts(siteSettings = {}, strings) {
  const company = siteSettings?.company || {};
  const legalFacts = getLegalFacts(company, strings);

  return [
    {
      label: strings.facts.brand,
      value: company.name || strings.factsValues.brand,
    },
    {
      label: strings.facts.since,
      value: company.foundingDate || strings.factsValues.since,
    },
    {
      label: strings.facts.city,
      value: strings.factsValues.city,
    },
    {
      label: strings.facts.locations,
      value: strings.factsValues.locations,
    },
    {
      label: strings.facts.services,
      value: strings.factsValues.services,
    },
    {
      label: strings.facts.languages,
      value: strings.factsValues.languages,
    },
    {
      label: strings.facts.payments,
      value: company.paymentAccepted || strings.factsValues.payments,
    },
    {
      label: strings.facts.warranty,
      value: company.warranty || strings.factsValues.warranty,
    },
    ...legalFacts,
  ].filter((item) => item.value);
}

function ServiceLinks({ locale, strings }) {
  return (
    <div className={s.linkCopy}>
      <p>
        <strong>{strings.popularServicesPrefix}</strong>{' '}
        <Link href={withLocalePath('/iphone-remonts', locale)}>
          {strings.links.iphone}
        </Link>
        ,{' '}
        <Link href={withLocalePath('/telefonu-remonts', locale)}>
          {strings.links.phones}
        </Link>
        ,{' '}
        <Link href={withLocalePath('/plansetdatoru-remonts', locale)}>
          {strings.links.tablets}
        </Link>
        ,{' '}
        <Link href={withLocalePath('/datoru-remonts', locale)}>
          {strings.links.computers}
        </Link>
        {' '}
        {strings.and}{' '}
        <Link href={withLocalePath('/dyson-remonts', locale)}>
          {strings.links.dyson}
        </Link>
        .
      </p>

      <p>
        <strong>{strings.popularWorksPrefix}</strong>{' '}
        <Link href={withLocalePath('/iphone-remonts/ekrana-maina', locale)}>
          {strings.links.screen}
        </Link>
        ,{' '}
        <Link href={withLocalePath('/iphone-remonts/baterijas-maina', locale)}>
          {strings.links.battery}
        </Link>
        {' '}
        {strings.and}{' '}
        <Link href={withLocalePath('/iphone-remonts/uzlades-ligzdas-maina', locale)}>
          {strings.links.charging}
        </Link>
        .
      </p>
    </div>
  );
}

function BusinessFacts({ facts }) {
  if (!facts.length) return null;

  return (
    <dl className={s.factsGrid}>
      {facts.map((fact) => (
        <div key={fact.label} className={s.factCard}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function AboutPage({
  locale = 'lv',
  siteSettings,
}) {
  const strings = getAboutStrings(locale);
  const basicFaq = await getBasicFaq(locale);
  const businessFacts = getBusinessFacts(siteSettings, strings);

  const faqRenderItems = toFaqRenderItems(basicFaq.items);
  const faqLd = toFaqLd(basicFaq.items);

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.pageCrumb, url: abs(strings.pagePath) },
  ]);

  const aboutPageLd = buildAboutPageLd(strings, locale);

  const headerCrumbs = [
    {
      label: strings.homeCrumb,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.pageCrumb,
      href: strings.pagePath,
    },
  ];

  return (
    <>
      <Script
        id={`about-breadcrumbs-jsonld-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id={`about-page-jsonld-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(aboutPageLd)}
      </Script>

      {basicFaq.items.length > 0 ? (
        <Script
          id={`about-faq-jsonld-${locale}`}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(faqLd)}
        </Script>
      ) : null}

      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        crumbs={headerCrumbs}
      />

      <section className={s.section} aria-labelledby="about-intro-h2">
        <div className={s.container}>
          <div className={s.introGrid}>
            <div className={s.introCard}>
              <p className={s.eyebrow}>{strings.introEyebrow}</p>

              <h2 id="about-intro-h2" className={s.h2}>
                {strings.introTitle}
              </h2>

              <div className={s.copy}>
                <p>{strings.introText}</p>
                <p>{strings.introTextSecond}</p>
              </div>
            </div>

            <aside className={s.factsPanel} aria-labelledby="about-facts-h3">
              <p className={s.eyebrow}>iLab</p>

              <h3 id="about-facts-h3">
                {strings.factsTitle}
              </h3>

              <p className={s.factsLead}>
                {strings.factsLead}
              </p>

              <BusinessFacts facts={businessFacts} />
            </aside>
          </div>
        </div>
      </section>

      <section className={s.section} aria-labelledby="about-services-h2">
        <div className={s.container}>
          <div className={s.servicesCard}>
            <div className={s.sectionHeader}>
              <p className={s.eyebrow}>Services</p>

              <h2 id="about-services-h2" className={s.h2}>
                {strings.servicesTitle}
              </h2>

              <p className={s.lead}>
                {strings.servicesLead}
              </p>
            </div>

            <ServiceLinks locale={locale} strings={strings} />
          </div>
        </div>
      </section>

      <Why locale={locale} />

      <Process locale={locale} />

      <section className={s.locationsTeaser} aria-labelledby="about-locations-h2">
        <div className={s.container}>
          <div className={s.locationsTeaserInner}>
            <div>
              <p className={s.eyebrow}>Locations</p>

              <h2 id="about-locations-h2" className={s.h2}>
                {strings.locationsAnchorTitle}
              </h2>

              <p className={s.lead}>
                {strings.locationsAnchorText}
              </p>
            </div>

            <Link
              className={s.ctaLink}
              href={withLocalePath('/kontakti', locale)}
            >
              {strings.contactsCta}
            </Link>
          </div>
        </div>
      </section>

      <Locations
        locale={locale}
        locations={siteSettings?.locations || []}
        pinPositions={siteSettings?.pinPositions || {}}
      />

      <Reviews locale={locale} />

      {faqRenderItems.length > 0 ? (
        <Faq
          id="about-faq"
          title={basicFaq.title}
          items={faqRenderItems}
        />
      ) : null}

      <ConvertBand locale={locale} />
    </>
  );
}