// app/(site)/(catalog)/iphone-remonts/kameras-remonts/page.jsx

import Script from 'next/script';
import Link from 'next/link';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';

import devices from '@/data/devices';

import s from '@styles/Catalog.module.scss';

// JSON-LD helpers (new standardized helpers)
import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildFaqLdFromPairs,
} from '@/lib/seo/jsonldHelpers';

// Firestore (Admin SDK, server-side)
import { db } from '@/lib/firebaseAdmin';

// -------------------------------------------------
// META
// -------------------------------------------------

export const metadata = {
  title: 'iPhone kameras remonts Rīgā | iLab',
  description:
    'Miglainas bildes vai fokusēšanās problēmas? iPhone kameras remonts un nomaiņa Rīgā — diagnostika, stikliņa nomaiņa un moduļa nomaiņa pēc vajadzības. 90 dienu garantija.',
  alternates: { canonical: '/iphone-remonts/kameras-remonts' },
};

// -------------------------------------------------
// FAQ
// -------------------------------------------------

const FAQ_ITEMS = [
  {
    q: 'Kādi simptomi norāda uz kameras remontu?',
    a: 'Miglainas bildes, plankumi, autofokusa problēmas, trīcēšana video režīmā vai situācijas, kad kamera neatveras.',
  },
  {
    q: 'Vai vienmēr jāmaina viss kameras modulis?',
    a: 'Nē. Ja bojāts tikai stikliņš, bieži pietiek ar stikliņa (lēcas vāciņa) nomaiņu. Moduli maina tikai tad, ja tas tiešām bojāts.',
  },
  {
    q: 'Cik ilgi ilgst remonts?',
    a: 'Parasti 45–90 minūtes atkarībā no modeļa un bojājuma. Populāros modeļos bieži pabeidzam tajā pašā dienā.',
  },
  {
    q: 'Vai mani dati ir drošībā?',
    a: 'Jā. Kameras remonts neietekmē foto un video — tie paliek neskarti. Drošībai iesakām izveidot dublējumu.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienas gan detaļai, gan veiktajam darbam.',
  },
];

// Build FAQPage JSON-LD from helper
const faqLd = buildFaqLdFromPairs(FAQ_ITEMS);

// Breadcrumbs JSON-LD
const breadcrumbsLd = buildBreadcrumbsLd([
  { name: 'Sākums', url: abs('/') },
  { name: 'iPhone remonts', url: abs('/iphone-remonts') },
  { name: 'Kameras remonts', url: abs('/iphone-remonts/kameras-remonts') },
]);

// Service JSON-LD using new helper
const serviceLd = buildServiceLdForCity({
  path: '/iphone-remonts/kameras-remonts',
  name: 'iPhone kameras remonts Rīgā',
  serviceType: 'iPhone kameras remonts',
  description:
    'iPhone kameras remonts Rīgā: diagnostika, stikliņa maiņa un moduļa nomaiņa pēc vajadzības. 90 dienu garantija.',
});

// -------------------------------------------------
// Firestore -> devicePricing shape for ServicePricelist
// -------------------------------------------------
function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function buildPricingForBrandModels({
  brandSlug,
  categorySlug,
  serviceIds,
}) {
  const brand = String(brandSlug || '').toLowerCase();
  const cat = String(categorySlug || '').toLowerCase();

  const modelSlugs = (devices || [])
    .filter((d) => String(d?.category || '').toLowerCase() === cat)
    .filter((d) => String(d?.brandSlug || '').toLowerCase() === brand)
    .map((d) => String(d.slug))
    .filter(Boolean);

  // pricingObj[modelSlug] = { items: [{id, price}, ...] }
  const pricingObj = {};
  for (const slug of modelSlugs) pricingObj[slug] = { items: [] };

  if (!modelSlugs.length) return pricingObj;

  const CHUNK = 30;
  const chunks = chunkArray(modelSlugs, CHUNK);

  // temp map: modelId -> Map(serviceId -> price)
  const temp = new Map();

  for (const group of chunks) {
    const snap = await db
      .collection('modelServices')
      .where('modelId', 'in', group)
      .get();

    snap.forEach((doc) => {
      const data = doc.data() || {};
      const modelId = data.modelId;
      const serviceId = data.serviceId;
      if (!modelId || !serviceId) return;

      if (Array.isArray(serviceIds) && serviceIds.length) {
        if (!serviceIds.includes(serviceId)) return;
      }

      if (!temp.has(modelId)) temp.set(modelId, new Map());
      temp
        .get(modelId)
        .set(serviceId, Object.prototype.hasOwnProperty.call(data, 'price') ? data.price : '');
    });
  }

  for (const [modelId, byService] of temp.entries()) {
    pricingObj[modelId] = {
      items: (serviceIds || [])
        .filter((sid) => byService.has(sid))
        .map((sid) => ({ id: sid, price: byService.get(sid) })),
    };
  }

  return pricingObj;
}

// -------------------------------------------------
// PAGE COMPONENT
// -------------------------------------------------

export default async function IphoneKamerasRemontsPage({ searchParams }) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;

  // Build pricing for all Apple phone models, only for the services this page needs
  const pricing = await buildPricingForBrandModels({
    brandSlug: 'apple',
    categorySlug: 'telefonu-remonts',
    serviceIds: ['camera-glass', 'camera'],
  });

  return (
    <>
      {/* JSON-LD */}
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      {/* HERO */}
      <DeviceHero
        image="/images/categories/kameras_remonts.webp"
        alt="iPhone kameras remonts Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Miglainas bildes vai fokusēšanās problēmas?</strong> Veicam <strong>iPhone kameras remontu un maiņu</strong> — diagnostika, stikliņa nomaiņa vai moduļa nomaiņa pēc vajadzības. <strong>90 dienu garantija.</strong></p>`}
      />

      {/* INTRO */}
      <section className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h2 id="intro-h2" className={s.h1}>
            iPhone kameras remonts un nomaiņa Rīgā
          </h2>

          <p className={s.paragraph}>
            Ja fotogrāfijas ir miglainas, ar plankumiem vai telefons nevar fokusēt, vispirms pārbaudām
            <strong> kameras stikliņu un moduli</strong>. Ja bojāts tikai stikliņš, bieži pietiek ar tā nomaiņu.
            Ja bojāts pats modulis — ieteiksim moduļa nomaiņu ar pilnu pārbaudi.
          </p>

          <p className={s.paragraph}>
            Pēc remonta testējam <strong>fokusēšanu, stabilizāciju, krāsu atbilstību un zibspuldzi</strong>.
            Populāros modeļus parasti salabojam <strong>45–90 minūtēs</strong>. Visam darbam un detaļām ir
            <strong> 90 dienu garantija</strong>.
          </p>

          {selectedModel && (
            <p className={s.note}>
              Atlasīts modelis: <strong>{decodeURIComponent(selectedModel)}</strong>. Ritiniet uz
              <a href="#brand-list"> cenām</a>.
            </p>
          )}
        </div>
      </section>

      {/* PRICE LIST */}
      <section id="brand-list" className={s.section} aria-labelledby="brand-picker-h2">
        <div className={s.container}>
          <h2 id="brand-picker-h2" className={s.h2} style={{ marginBottom: 12 }}>
            Izvēlies iPhone modeli
          </h2>

          <ServicePricelist
            devices={devices}
            pricing={pricing}
            brandSlug="apple"
            categorySlug="telefonu-remonts"
            serviceIds={['camera-glass', 'camera']}
            title="Kameras stikliņa un moduļa maiņas cenas pēc modeļa"
            intro="Apskati iPhone kameras stikliņa un moduļa maiņas izmaksas pēc modeļa. Sākumā veicam diagnostiku, lai noteiktu, kurš variants nepieciešams."
            initialLimit={8}
            allModelsHref="/iphone-remonts#iphone-modeli"
            cta={{ label: 'Pieteikties remontam', href: '#pieteikties' }}
          />
        </div>
      </section>

      {/* PROCESS */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek remonts"
            headingLevel={2}
            variant="cards"
            steps={[
              { title: 'Diagnostika', text: 'Pārbaudām kameras stikliņu, moduli, savienojumus un programmatūru.' },
              { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un remonta laiku pirms darba sākšanas.' },
              { title: 'Remonts', text: 'Mainām stikliņu vai moduļa komplektu, ja nepieciešams — veicam kalibrāciju.' },
              { title: 'Testi', text: 'Pārbaudām fokusēšanu, stabilizāciju, zibspuldzi un attēla kvalitāti.' },
              { title: 'Garantija', text: '90 dienu garantija gan detaļām, gan darbam.' },
            ]}
          />
        </div>
      </section>

      {/* WHY */}
      <section className={s.section}>
        <Why />
      </section>

      {/* FAQ */}
      <section className={s.section}>
        <Faq
          id="faq"
          title="Biežāk uzdotie jautājumi"
          groups={[{ label: 'Kamera', items: FAQ_ITEMS }]}
          headingLevel={2}
          variant="accordion"
        />
      </section>

      {/* CTA */}
      <section id="pieteikties" className={s.section}>
        <div className={s.container}>
          <ConvertBand />
        </div>
      </section>
    </>
  );
}
