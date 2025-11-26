// app/(site)/(catalog)/telefonu-remonts/udens-bojajumu-remonts/page.jsx
import Script from 'next/script';
import Link from 'next/link';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import BrandPickerPricelist from '@components/service-pricelist/BrandPickerPricelist';

import categories from '@/data/categories';
import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';

import s from '@styles/Catalog.module.scss';

const ORIGIN = 'https://www.ilab.lv';

export const metadata = {
  title: 'Telefonu ūdens bojājumu remonts Rīgā | iLab',
  description:
    'Diagnostika, tīrīšana un oksidācijas novēršana pēc saskares ar šķidrumu. Bojāto detaļu nomaiņa, 90 dienu garantija.',
  alternates: { canonical: '/telefonu-remonts/udens-bojajumu-remonts' },
};

// ---------- FAQ ----------
const FAQ_ITEMS = [
  { q: 'Ko darīt, ja telefons saskāries ar ūdeni?', a: 'Nekavējoties izslēdziet ierīci, neuzlādējiet to, neizmantojiet fēnu. Pēc iespējas ātrāk nogādājiet servisā diagnostikai.' },
  { q: 'Vai rīsi palīdzēs?', a: 'Rīsi neiztīra oksidāciju un neizžāvē visus iekšējos slāņus. Tie aizkavē servisa apmeklējumu un samazina izredzes uz veiksmīgu atjaunošanu.' },
  { q: 'Cik ilgi ilgst remonts?', a: 'Diagnostika parasti 1–2 stundas. Atkarībā no bojājuma mēroga un detaļu pieejamības remonts var ilgt ilgāk.' },
  { q: 'Vai dati saglabāsies?', a: 'Mēs darām visu iespējamo, bet ūdens bojājumi var ietekmēt atmiņu. Iesakām regulārus dublējumus.' },
  { q: 'Vai ir garantija?', a: 'Jā — 90 dienu garantija detaļām un darbam, tomēr ūdens bojājumu gadījumā riski ir augstāki nekā standarta remontos.' },
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
    { '@type': 'ListItem', position: 2, name: 'Telefonu remonts', item: `${ORIGIN}/telefonu-remonts/` },
    { '@type': 'ListItem', position: 3, name: 'Ūdens bojājumu remonts', item: `${ORIGIN}/telefonu-remonts/udens-bojajumu-remonts` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Telefonu ūdens bojājumu remonts',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@type': 'LocalBusiness', name: 'iLab', '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/telefonu-remonts/udens-bojajumu-remonts`,
  name: 'Telefonu ūdens bojājumu remonts Rīgā',
  description:
    'Diagnostika, tīrīšana un oksidācijas novēršana pēc saskares ar šķidrumu. Bojāto detaļu nomaiņa ar garantiju.',
};

// Build brand options (same pattern as other phone-service pages)
function getPhoneBrandOptions() {
  const phonesCat = Array.isArray(categories)
    ? categories.find((c) => c.slug === 'telefonu-remonts')
    : null;

  const listed = phonesCat?.brands || [];
  const withDevices = listed.filter((b) =>
    devices.some(
      (d) =>
        (d.category || '').toLowerCase() === 'telefonu-remonts' &&
        (d.brandSlug || '').toLowerCase() === String(b.brandSlug || b.slug).toLowerCase()
    )
  );

  const hasSamsung = withDevices.find((b) => (b.brandSlug || b.slug) === 'samsung');
  const defaultBrand = hasSamsung
    ? 'samsung'
    : (withDevices[0]?.brandSlug || withDevices[0]?.slug || 'samsung');

  const brandOptions = withDevices.map((b) => ({
    slug: (b.brandSlug || b.slug),
    name: b.name,
  }));

  return { brandOptions, defaultBrand };
}

// ---------- PAGE (server) ----------
export default function TelefonuUdensBojajumuRemontsPage({ searchParams }) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;
  const { brandOptions, defaultBrand } = getPhoneBrandOptions();

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
        image="/images/categories/udens_bojajumi.webp"  // swap to water-damage hero when available
        alt="Telefonu ūdens bojājumu remonts Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Ūdens vai citu šķidrumu ietekme?</strong> Veicam diagnostiku, dziļo tīrīšanu un <strong>oksidācijas novēršanu</strong>, kā arī bojāto detaļu maiņu. Jo ātrāk ierīce nonāk servisā, jo lielākas izredzes. <strong>Bezmaksas pārbaude</strong> un <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>Telefonu ūdens bojājumu remonts</h1>
          <p className={s.paragraph}>
            Pēc saskares ar šķidrumu bojājumi ne vienmēr ir redzami uzreiz — iekšpusē sākas <strong>oksidācija</strong>.
            Mēs veicam <strong>diagnostiku</strong>, <strong>tīrīšanu</strong>, savienojumu atjaunošanu un, ja nepieciešams,
            <strong> detaļu nomaiņu</strong> (piem., displejs, baterija, uzlādes ķēde).
          </p>
          <p className={s.paragraph}>
            Lūdzu <strong>neuzlādēt</strong> un <strong>neieslēgt</strong> ierīci pēc applūšanas. Nogādājiet to servisā
            pēc iespējas ātrāk — tas būtiski palielina atjaunošanas iespēju.
          </p>
          {selectedModel && (
            <p className={s.note}>
              Atlasīts modelis: <strong>{decodeURIComponent(selectedModel)}</strong>. Ritiniet uz
              <a href="#cenas"> cenām</a>.
            </p>
          )}
        </div>
      </section>

      {/* BRAND PICKER + PRICELIST */}
      <section className={s.section} aria-labelledby="brand-picker-h2">
        <div className={s.container}>
          <h2 id="brand-picker-h2" className={s.h2} style={{ marginBottom: 12 }}>Izvēlies zīmolu</h2>

          <BrandPickerPricelist
            devices={devices}
            pricing={devicePricing}
            brandOptions={brandOptions}
            defaultBrand={defaultBrand}
            categorySlug="telefonu-remonts"
            serviceIds={['water-damage-clean']}  // ← match your pricing IDs
            title="Ūdens bojājumu remonta cenas pēc modeļa"
            intro="Izvēlies zīmolu un modeli, lai redzētu diagnostikas/atjaunošanas cenu. Dažiem bojājumiem cena tiek precizēta pēc diagnostikas."
            allModelsHref="/telefonu-remonts#brand-list"
            cta={{ label: 'Pieteikties remontam', href: '#pieteikties' }}
            className={s.section}
          />
        </div>
      </section>

      {/* PROCESS */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek ūdens bojājumu remonts"
            steps={[
              { title: 'Diagnostika', text: 'Atveram ierīci, izvērtējam oksidāciju, bojātos mezglus un strāvas ķēdes.' },
              { title: 'Tīrīšana', text: 'Veicam ultraskaņas tīrīšanu/ķīmisko apstrādi; atjaunojam savienojumus.' },
              { title: 'Detaļu maiņa', text: 'Pēc vajadzības nomainām bojātās detaļas (displejs, baterija, uzlādes modulis u.c.).' },
              { title: 'Testi', text: 'Pilna funkciju pārbaude: uzlāde, skaņa, kamera, bezvadu modulis u.c.' },
              { title: 'Garantija', text: '90 dienu garantija veiktajiem darbiem un detaļām.' },
            ]}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      {/* WHY US */}
      <section className={s.section}>
        <Why />
      </section>

      {/* FAQ */}
      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq
            id="faq"
            title="Biežāk uzdotie jautājumi"
            groups={[{ label: 'Ūdens bojājumi', items: FAQ_ITEMS }]}
            headingLevel={2}
            variant="accordion"
          />
        </div>
      </section>

      {/* BOOKING / CTA */}
      <section id="pieteikties" className={s.section} aria-label="Pieteikties remontam">
        <div className={s.container}>
          <ConvertBand />
        </div>
      </section>
    </>
  );
}
