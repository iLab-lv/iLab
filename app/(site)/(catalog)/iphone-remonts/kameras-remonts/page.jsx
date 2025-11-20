import Script from 'next/script';
import Link from 'next/link';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';

import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';

import s from '@styles/Catalog.module.scss';

// -------------------------------------------------
// META
// -------------------------------------------------
const ORIGIN = 'https://www.ilab.lv';

export const metadata = {
  title: 'iPhone kameras remonts Rīgā | iLab',
  description:
    'Miglainas bildes, plankumi vai fokusēšanās problēmas? iPhone kameras remonts/maiņa Rīgā — diagnostika, kameras stikliņa maiņa un moduļa nomaiņa pēc vajadzības. 90 dienu garantija.',
  alternates: { canonical: '/iphone-remonts/kameras-remonts' },
};

// -------------------------------------------------
// FAQ
// -------------------------------------------------
const FAQ_ITEMS = [
  {
    q: 'Kādi simptomi norāda uz kameras remontu?',
    a: 'Miglainas bildes, melni plankumi, nevar fokusēt, trīcēšana filmējot, kamera neatveras vai darbojas tikai reizēm.',
  },
  {
    q: 'Vai vienmēr jāmaina viss kameras modulis?',
    a: 'Nē. Bieži pietiek ar kameras stikliņa (aizmugures lēcas vāciņa) nomaiņu, ja uz foto redzami skrāpējumi vai plaisas stikliņā.',
  },
  {
    q: 'Cik ilgi ilgst remonts?',
    a: 'Parasti 45–90 minūtes atkarībā no modeļa un bojājuma. Populāros modeļus bieži pabeidzam tajā pašā dienā.',
  },
  {
    q: 'Vai mani dati ir drošībā?',
    a: 'Jā. Kameras remonts neietekmē jūsu foto un video. Drošībai iesakām izveidot dublējumu.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienas gan detaļai, gan veiktajam darbam.',
  },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbsLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'iPhone remonts', item: `${ORIGIN}/iphone-remonts/` },
    { '@type': 'ListItem', position: 3, name: 'Kameras remonts', item: `${ORIGIN}/iphone-remonts/kameras-remonts` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'iPhone kameras remonts',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@type': 'LocalBusiness', name: 'iLab', '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/iphone-remonts/kameras-remonts`,
  name: 'iPhone kameras remonts Rīgā',
  description:
    'iPhone kameras remonts Rīgā: diagnostika, kameras stikliņa maiņa un moduļa nomaiņa pēc vajadzības. 90 dienu garantija.',
};

// -------------------------------------------------
// PAGE COMPONENT
// -------------------------------------------------
export default function IphoneKamerasRemontsPage({ searchParams }) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;

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
        image="/images/categories/kameras_remonts.webp" // adjust if your asset path differs
        alt="iPhone kameras remonts Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Miglainas bildes vai fokusēšanās problēmas?</strong> Veicam <strong>iPhone kameras remontu un maiņu</strong> Rīgā — diagnostika, stikliņa maiņa un moduļa nomaiņa pēc vajadzības. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>iPhone kameras remonts un maiņa Rīgā</h1>
          <p className={s.paragraph}>
            Ja foto ir miglaini, redzami plankumi vai kamera nefokusējas, <strong>vispirms pārbaudām kameras stikliņu un moduli</strong>.
            Daudzos gadījumos pietiek ar <strong>stikliņa nomaiņu</strong> — ja stikliņš ir saskrāpēts vai saplaisājis.
            Ja bojāts pats modulis, ieteiksim <strong>moduļa nomaiņu</strong> ar pārbaudi pēc remonta.
          </p>
          <p className={s.paragraph}>
            Pēc remonta testējam <strong>fokusēšanos, stabilizāciju un zibspuldzi</strong>. Populāros modeļus parasti
            salabojam <strong>45–90 minūšu</strong> laikā. Visam darbam un detaļām ir <strong>90 dienu garantija</strong>.
          </p>
          {selectedModel && (
            <p className={s.note}>
              Atlasīts modelis: <strong>{decodeURIComponent(selectedModel)}</strong>. Ritiniet uz
              <a href="#cenas"> cenām</a>.
            </p>
          )}
        </div>
      </section>

      {/* PRICE LIST — uses your exact pricing id for camera glass */}
      <ServicePricelist
        devices={devices}
        pricing={devicePricing}
        brandSlug="apple"
        categorySlug="telefonu-remonts"
        serviceIds={['camera-glass' , 'camera']}   // ← from your devicePricing
        title="Kameras stikliņa maiņas cenas pēc modeļa"
        intro="Redzami skrāpējumi vai plaisas kameras stikliņā? Skaties stikliņa maiņas izmaksas pēc modeļa. Ja nepieciešama moduļa maiņa — to saskaņosim pēc diagnostikas."
        initialLimit={8}
        allModelsHref="/iphone-remonts#iphone-modeli"
        cta={{ label: 'Pieteikties remontam', href: '#pieteikties' }}
        className={s.section}
      />

      {/* PROCESS */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek remonts"
            steps={[
              { title: 'Diagnostika', text: 'Pārbaudām kameras stikliņu, moduli, savienojumus un programmatūru.' },
              { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
              { title: 'Remonts', text: 'Mainām stikliņu vai kameras moduli, pēc vajadzības veicam kalibrāciju.' },
              { title: 'Testi', text: 'Pārbaudām fokusēšanos, stabilizāciju, zibspuldzi un attēla kvalitāti.' },
              { title: 'Garantija', text: '90 dienu garantija un ieteikumi turpmākai lietošanai.' },
            ]}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      {/* WHY */}
      <section className={s.section}>
        <Why />
      </section>

      {/* FAQ */}
      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq
            id="faq"
            title="Biežāk uzdotie jautājumi"
            groups={[{ label: 'Kamera', items: FAQ_ITEMS }]}
            headingLevel={2}
            variant="accordion"
          />
        </div>
      </section>

      {/* CTA */}
      <section id="pieteikties" className={s.section} aria-label="Pieteikties remontam">
        <div className={s.container}>
          <ConvertBand />
        </div>
      </section>
    </>
  );
}
