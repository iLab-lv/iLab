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
  title: 'Telefonu skaļruņu un mikrofona remonts Rīgā | iLab',
  description:
    'Klusa skaņa, krakšķi vai sarunās nedzird? Telefonu skaļruņu un mikrofona remonts/tīrīšana Rīgā. Bezmaksas diagnostika, 90 dienu garantija.',
  alternates: { canonical: '/telefonu-remonts/skalruni-mikrofona-remonts' },
};

// ---------- FAQ ----------
const FAQ_ITEMS = [
  { q: 'Kādi simptomi norāda uz skaļruņu/mikrofona problēmām?', a: 'Klusa vai kropļota skaņa, krakšķi, sarunās nedzird, balss ierakstā troksnis vai klusums.' },
  { q: 'Vai pietiek ar tīrīšanu?', a: 'Bieži pietiek ar restīšu un kontakta tīrīšanu. Ja modulis bojāts vai oksidējies, nepieciešama nomaiņa.' },
  { q: 'Cik ilgi ilgst remonts?', a: 'Parasti 45–90 minūtes atkarībā no modeļa un bojājuma pakāpes.' },
  { q: 'Vai dati ietekmēsies?', a: 'Nē, skaļruņu un mikrofona remonts datus neietekmē. Tomēr ieteicams veikt dublējumu.' },
  { q: 'Vai ir garantija?', a: 'Jā — 90 dienu garantija gan detaļai, gan paveiktajam darbam.' },
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
    { '@type': 'ListItem', position: 3, name: 'Skaļruņi un mikrofons', item: `${ORIGIN}/telefonu-remonts/skalruni-mikrofona-remonts` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Telefonu skaļruņu un mikrofona remonts',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@type': 'LocalBusiness', name: 'iLab', '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/telefonu-remonts/skalruni-mikrofona-remonts`,
  name: 'Telefonu skaļruņu un mikrofona remonts Rīgā',
  description:
    'Telefonu skaļruņu un mikrofona remonts/tīrīšana Rīgā: klusa skaņa, krakšķi, sarunās nedzird. Bezmaksas diagnostika, 90 dienu garantija.',
};

// Build brand options like on the other phone-service pages
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
export default function TelefonuSkalruniMikrofonaRemontsPage({ searchParams }) {
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
        image="/images/categories/telefonu_remonts.webp"  // replace when you have a sound-related hero
        alt="Telefonu skaļruņu un mikrofona remonts Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Skaļruņu un mikrofona remonts Rīgā</strong> — ja sarunās nedzird, skaņa ir klusa vai ar krakšķiem,
        veiksim tīrīšanu vai moduļu nomaiņu. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>Telefonu skaļruņu un mikrofona remonts</h1>
          <p className={s.paragraph}>
            Tipiski simptomi: <strong>klusa skaņa</strong>, <strong>krakšķi</strong>, <strong>sarunās nedzird</strong>,
            <strong> balss ieraksts ar troksni</strong> vai <strong>bez skaņas</strong>. Bieži pietiek ar <strong>tīrīšanu</strong>;
            ja modulis bojāts vai oksidēts, veicam <strong>skaļruņa vai mikrofona nomaiņu</strong>.
          </p>
          <p className={s.paragraph}>
            Pēc remonta pārbaudām zvanu skaļruni, mediju skaļruni, mikrofonu(-us) un trokšņu slāpēšanu.
            Populāros modeļus parasti salabojam <strong>45–90 minūšu</strong> laikā.
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
            serviceIds={['speaker', 'microphone']}  // <- adjust to your pricing keys if different
            title="Skaļruņu un mikrofona remonta cenas pēc modeļa"
            intro="Izvēlies zīmolu un modeli, lai redzētu skaļruņu un/vai mikrofona remonta cenu."
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
            title="Kā notiek skaļruņu/mikrofona remonts"
            steps={[
              { title: 'Diagnostika', text: 'Pārbaudām skaļruņus, mikrofonu(-us), tīram restītes/ligzdas, testējam zvanu un mediju skaņu.' },
              { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
              { title: 'Remonts/nomaiņa', text: 'Veicam tīrīšanu vai bojāto moduļu nomaiņu; novēršam oksidāciju, ja nepieciešams.' },
              { title: 'Pārbaude', text: 'Testējam sarunas, skaļruņus, ierakstu un trokšņu slāpēšanu.' },
              { title: 'Garantija', text: '90 dienu garantija un lietošanas ieteikumi.' },
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
            groups={[{ label: 'Skaņa', items: FAQ_ITEMS }]}
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
