import Script from 'next/script';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';

import devices from '@/data/devices';
import { db } from '@/lib/firebaseAdmin';

import s from '@styles/Catalog.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildFaqLdFromPairs,
} from '@/lib/seo/jsonldHelpers';

const SERVICE_IDS = ['display-original', 'display-oled', 'display-incell'];

const FAQ_ITEMS = [
  { q: 'Cik ilgi ilgst ekrāna maiņa?', a: 'Parasti 1–3 stundas.' },
  { q: 'Vai saglabājas Face ID?', a: 'Jā — ja bojāts tikai ekrāns.' },
];

function getRoutePath(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone/zamena-ekrana'
    : '/iphone-remonts/ekrana-maina';
}

function getHubPath(locale = 'lv') {
  return locale === 'ru' ? '/ru/remont-iphone' : '/iphone-remonts';
}

function getAllModelsHref(locale = 'lv') {
  return locale === 'ru' ? '/ru/remont-iphone#iphone-modeli' : '/iphone-remonts#iphone-modeli';
}

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'Замена экрана iPhone',
      priceTitle: 'Цены на замену экрана по моделям',
      ctaLabel: 'Записаться на ремонт',
      faqTitle: 'Вопросы',
      breadcrumbServiceName: 'Замена экрана',
      serviceName: 'Замена экрана iPhone в Риге',
      serviceType: 'Замена экрана iPhone',
      serviceDescription:
        'Замена дисплея iPhone в Риге. Бесплатная диагностика и гарантия 90 дней.',
    };
  }

  return {
    heroAlt: 'iPhone ekrāna maiņa',
    priceTitle: 'Ekrāna maiņas cenas pēc modeļa',
    ctaLabel: 'Pieteikties remontam',
    faqTitle: 'Jautājumi',
    breadcrumbServiceName: 'Ekrāna maiņa',
    serviceName: 'iPhone ekrāna maiņa Rīgā',
    serviceType: 'iPhone ekrāna maiņa',
    serviceDescription: 'iPhone displeja maiņa Rīgā.',
  };
}

export function getIphoneScreenServiceMetadata(locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: 'Замена экрана iPhone в Риге | iLab',
      description:
        'Замена экрана iPhone в Риге — оригинальные или OEM дисплеи, бесплатная диагностика и гарантия 90 дней.',
      alternates: {
        canonical: getRoutePath(locale),
      },
    };
  }

  return {
    title: 'iPhone ekrāna maiņa Rīgā | iLab',
    description:
      'iPhone ekrāna maiņa Rīgā — oriģināli vai OEM displeji, bezmaksas diagnostika un 90 dienu garantija.',
    alternates: {
      canonical: getRoutePath(locale),
    },
  };
}

function buildFaqLd() {
  return buildFaqLdFromPairs(FAQ_ITEMS);
}

function buildBreadcrumbs(locale = 'lv') {
  const strings = getPageStrings(locale);

  return buildBreadcrumbsLd([
    { name: 'Sākums', url: abs('/') },
    { name: 'iPhone remonts', url: abs(getHubPath(locale)) },
    { name: strings.breadcrumbServiceName, url: abs(getRoutePath(locale)) },
  ]);
}

function buildServiceLd(locale = 'lv') {
  const strings = getPageStrings(locale);

  return buildServiceLdForCity({
    path: getRoutePath(locale),
    name: strings.serviceName,
    serviceType: strings.serviceType,
    description: strings.serviceDescription,
  });
}

async function buildPricing() {
  const pricing = {};

  devices
    .filter((d) => d.brandSlug === 'apple' && d.category === 'telefonu-remonts')
    .forEach((d) => {
      pricing[d.slug] = { items: [] };
    });

  const snap = await db
    .collection('modelServices')
    .where('serviceId', 'in', SERVICE_IDS)
    .get();

  snap.forEach((doc) => {
    const { modelId, serviceId, price } = doc.data();
    if (!pricing[modelId]) return;
    pricing[modelId].items.push({ id: serviceId, price });
  });

  return pricing;
}

export default async function IphoneScreenServicePage({ locale = 'lv', searchParams }) {
  const selectedModel = searchParams?.model;
  const pricing = await buildPricing();

  const strings = getPageStrings(locale);
  const faqLd = buildFaqLd();
  const breadcrumbsLd = buildBreadcrumbs(locale);
  const serviceLd = buildServiceLd(locale);

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>

      <Script id="breadcrumbs-jsonld" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="service-jsonld" type="application/ld+json">
        {JSON.stringify(serviceLd)}
      </Script>

      <DeviceHero
        image="/images/categories/displeja_maina.webp"
        alt={strings.heroAlt}
        className="service"
      />

      <section id="brand-list" className={s.section}>
        <ServicePricelist
          devices={devices}
          pricing={pricing}
          brandSlug="apple"
          categorySlug="telefonu-remonts"
          serviceIds={SERVICE_IDS}
          title={strings.priceTitle}
          initialLimit={8}
          allModelsHref={getAllModelsHref(locale)}
          cta={{ label: strings.ctaLabel, href: '#pieteikties' }}
          selectedModel={selectedModel}
          locale={locale}
        />
      </section>

      <Process locale={locale} />
      <Why locale={locale} />
      <Faq title={strings.faqTitle} groups={[{ items: FAQ_ITEMS }]} locale={locale} />
      <section id="pieteikties">
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}