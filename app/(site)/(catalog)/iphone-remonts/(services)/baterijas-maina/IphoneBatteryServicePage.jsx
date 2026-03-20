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

// JSON-LD helpers
import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildFaqLdFromPairs,
} from '@/lib/seo/jsonldHelpers';

const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst iPhone baterijas maiņa?',
    a: 'Parasti 45–90 minūtes atkarībā no modeļa.',
  },
  {
    q: 'Vai mani dati paliks neskarti?',
    a: 'Jā — baterijas maiņa datus neietekmē.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienas gan detaļai, gan darbam.',
  },
];

function getRoutePath(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone/zamena-batarei'
    : '/iphone-remonts/baterijas-maina';
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
      heroAlt: 'Замена батареи iPhone',
      priceTitle: 'Цены на замену батареи по моделям',
      ctaLabel: 'Записаться на ремонт',
      faqTitle: 'Вопросы',
      breadcrumbServiceName: 'Замена батареи',
      serviceName: 'Замена батареи iPhone в Риге',
      serviceType: 'Замена батареи iPhone',
      serviceDescription:
        'Замена батареи iPhone в Риге: бесплатная диагностика, гарантия 90 дней.',
    };
  }

  return {
    heroAlt: 'iPhone baterijas maiņa',
    priceTitle: 'Baterijas maiņas cenas pēc modeļa',
    ctaLabel: 'Pieteikties remontam',
    faqTitle: 'Jautājumi',
    breadcrumbServiceName: 'Baterijas maiņa',
    serviceName: 'iPhone baterijas maiņa Rīgā',
    serviceType: 'iPhone baterijas maiņa',
    serviceDescription:
      'iPhone baterijas maiņa Rīgā: bezmaksas diagnostika, 90 dienu garantija.',
  };
}

export function getIphoneBatteryServiceMetadata(locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: 'Замена батареи iPhone в Риге | iLab',
      description:
        'Быстрая и качественная замена батареи iPhone в Риге. Бесплатная диагностика, гарантия 90 дней, оригинальные или OEM детали. Часто в тот же день.',
      alternates: {
        canonical: getRoutePath(locale),
      },
    };
  }

  return {
    title: 'iPhone baterijas maiņa Rīgā | iLab',
    description:
      'Ātra un kvalitatīva iPhone baterijas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM detaļas. Bieži tajā pašā dienā.',
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
  const modelSlugs = devices
    .filter((d) => d.brandSlug === 'apple' && d.category === 'telefonu-remonts')
    .map((d) => d.slug);

  const pricing = {};
  modelSlugs.forEach((slug) => {
    pricing[slug] = { items: [] };
  });

  const snap = await db
    .collection('modelServices')
    .where('serviceId', '==', 'battery')
    .get();

  snap.forEach((doc) => {
    const { modelId, price } = doc.data();
    if (!pricing[modelId]) return;
    pricing[modelId].items.push({ id: 'battery', price });
  });

  return pricing;
}

export default async function IphoneBatteryServicePage({ locale = 'lv', searchParams }) {
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
        image="/images/categories/baterijas_maina.webp"
        alt={strings.heroAlt}
        className="service"
      />

      <section id="brand-list" className={s.section}>
        <ServicePricelist
          devices={devices}
          pricing={pricing}
          brandSlug="apple"
          categorySlug="telefonu-remonts"
          serviceIds={['battery']}
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