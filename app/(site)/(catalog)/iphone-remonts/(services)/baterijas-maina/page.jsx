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

// -------------------------------------------------
// META
// -------------------------------------------------

export const metadata = {
  title: 'iPhone baterijas maiņa Rīgā | iLab',
  description:
    'Ātra un kvalitatīva iPhone baterijas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM detaļas. Bieži tajā pašā dienā.',
  alternates: { canonical: '/iphone-remonts/baterijas-maina' },
};

// -------------------------------------------------
// FAQ
// -------------------------------------------------

const FAQ_ITEMS = [
  { q: 'Cik ilgi ilgst iPhone baterijas maiņa?', a: 'Parasti 45–90 minūtes atkarībā no modeļa.' },
  { q: 'Vai mani dati paliks neskarti?', a: 'Jā — baterijas maiņa datus neietekmē.' },
  { q: 'Vai ir garantija?', a: 'Jā — 90 dienas gan detaļai, gan darbam.' },
];

const faqLd = buildFaqLdFromPairs(FAQ_ITEMS);

const breadcrumbsLd = buildBreadcrumbsLd([
  { name: 'Sākums', url: abs('/') },
  { name: 'iPhone remonts', url: abs('/iphone-remonts') },
  { name: 'Baterijas maiņa', url: abs('/iphone-remonts/baterijas-maina') },
]);

const serviceLd = buildServiceLdForCity({
  path: '/iphone-remonts/baterijas-maina',
  name: 'iPhone baterijas maiņa Rīgā',
  serviceType: 'iPhone baterijas maiņa',
  description:
    'iPhone baterijas maiņa Rīgā: bezmaksas diagnostika, 90 dienu garantija.',
});

// -------------------------------------------------
// Firestore → legacy pricing shape
// -------------------------------------------------

async function buildPricing() {
  const modelSlugs = devices
    .filter((d) => d.brandSlug === 'apple' && d.category === 'telefonu-remonts')
    .map((d) => d.slug);

  const pricing = {};
  modelSlugs.forEach((s) => (pricing[s] = { items: [] }));

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

// -------------------------------------------------
// PAGE
// -------------------------------------------------

export default async function IphoneBaterijasMainaPage({ searchParams }) {
  const selectedModel = searchParams?.model;
  const pricing = await buildPricing();

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json">{JSON.stringify(faqLd)}</Script>
      <Script id="breadcrumbs-jsonld" type="application/ld+json">{JSON.stringify(breadcrumbsLd)}</Script>
      <Script id="service-jsonld" type="application/ld+json">{JSON.stringify(serviceLd)}</Script>

      <DeviceHero
        image="/images/categories/baterijas_maina.webp"
        alt="iPhone baterijas maiņa"
        className="service"
      />

      <section id="brand-list" className={s.section}>
        <ServicePricelist
          devices={devices}
          pricing={pricing}
          brandSlug="apple"
          categorySlug="telefonu-remonts"
          serviceIds={['battery']}
          title="Baterijas maiņas cenas pēc modeļa"
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
