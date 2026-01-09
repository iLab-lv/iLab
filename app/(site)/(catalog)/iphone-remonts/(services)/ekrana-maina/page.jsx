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

// -------------------------------------------------
// META
// -------------------------------------------------

export const metadata = {
  title: 'iPhone ekrāna maiņa Rīgā | iLab',
  description:
    'iPhone ekrāna maiņa Rīgā — oriģināli vai OEM displeji, bezmaksas diagnostika un 90 dienu garantija.',
  alternates: { canonical: '/iphone-remonts/ekrana-maina' },
};

// -------------------------------------------------
// FAQ
// -------------------------------------------------

const FAQ_ITEMS = [
  { q: 'Cik ilgi ilgst ekrāna maiņa?', a: 'Parasti 1–3 stundas.' },
  { q: 'Vai saglabājas Face ID?', a: 'Jā — ja bojāts tikai ekrāns.' },
];

const faqLd = buildFaqLdFromPairs(FAQ_ITEMS);

const breadcrumbsLd = buildBreadcrumbsLd([
  { name: 'Sākums', url: abs('/') },
  { name: 'iPhone remonts', url: abs('/iphone-remonts') },
  { name: 'Ekrāna maiņa', url: abs('/iphone-remonts/ekrana-maina') },
]);

const serviceLd = buildServiceLdForCity({
  path: '/iphone-remonts/ekrana-maina',
  name: 'iPhone ekrāna maiņa Rīgā',
  serviceType: 'iPhone ekrāna maiņa',
  description: 'iPhone displeja maiņa Rīgā.',
});

// -------------------------------------------------
// Firestore → legacy pricing shape
// -------------------------------------------------

async function buildPricing() {
  const serviceIds = ['display-original', 'display-oled', 'display-incell'];

  const pricing = {};
  devices
    .filter((d) => d.brandSlug === 'apple' && d.category === 'telefonu-remonts')
    .forEach((d) => (pricing[d.slug] = { items: [] }));

  const snap = await db
    .collection('modelServices')
    .where('serviceId', 'in', serviceIds)
    .get();

  snap.forEach((doc) => {
    const { modelId, serviceId, price } = doc.data();
    if (!pricing[modelId]) return;
    pricing[modelId].items.push({ id: serviceId, price });
  });

  return pricing;
}

// -------------------------------------------------
// PAGE
// -------------------------------------------------

export default async function IphoneEkranaMainaPage({ searchParams }) {
  const selectedModel = searchParams?.model;
  const pricing = await buildPricing();

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json">{JSON.stringify(faqLd)}</Script>
      <Script id="breadcrumbs-jsonld" type="application/ld+json">{JSON.stringify(breadcrumbsLd)}</Script>
      <Script id="service-jsonld" type="application/ld+json">{JSON.stringify(serviceLd)}</Script>

      <DeviceHero
        image="/images/categories/displeja_maina.webp"
        alt="iPhone ekrāna maiņa"
        className="service"
      />

      <section id="brand-list" className={s.section}>
        <ServicePricelist
          devices={devices}
          pricing={pricing}
          brandSlug="apple"
          categorySlug="telefonu-remonts"
          serviceIds={['display-original', 'display-oled', 'display-incell']}
          title="Ekrāna maiņas cenas pēc modeļa"
          initialLimit={8}
          allModelsHref="/iphone-remonts#iphone-modeli"
          cta={{ label: 'Pieteikties remontam', href: '#pieteikties' }}
        />
      </section>

      <Process />
      <Why />
      <Faq title="Jautājumi" groups={[{ items: FAQ_ITEMS }]} />
      <section id="pieteikties"><ConvertBand /></section>
    </>
  );
}
