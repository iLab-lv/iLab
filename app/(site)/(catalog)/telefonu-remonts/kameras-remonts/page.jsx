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
  title: 'Telefonu kameras remonts Rīgā | iLab',
  description:
    'Miglaini attēli, fokusēšanās problēmas vai nedarbojas kamera? Telefonu kameras remonts/maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  alternates: { canonical: '/telefonu-remonts/kameras-remonts' },
};

// ---------- FAQ ----------
const FAQ_ITEMS = [
  { q: 'Kādi simptomi norāda uz kameras bojājumu?', a: 'Miglains attēls, melns ekrāns kamerā, trīcīgs autofokuss, kameras lietotne aizveras vai rāda kļūdu.' },
  { q: 'Vai var salabot tikai stikliņu?', a: 'Jā, ja bojāts ir tikai stikliņš un pašas kameras modulis strādā. Bojāta moduļa gadījumā nepieciešama kameras maiņa.' },
  { q: 'Cik ilgi ilgst remonts?', a: 'Parasti 1–3 stundas atkarībā no modeļa un detaļu pieejamības.' },
  { q: 'Vai dati tiks dzēsti?', a: 'Nē, kameras remonts datus neietekmē. Drošībai vienmēr iesakām izveidot dublējumu.' },
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
    { '@type': 'ListItem', position: 3, name: 'Kameras remonts', item: `${ORIGIN}/telefonu-remonts/kameras-remonts` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Telefonu kameras remonts',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@type': 'LocalBusiness', name: 'iLab', '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/telefonu-remonts/kameras-remonts`,
  name: 'Telefonu kameras remonts Rīgā',
  description:
    'Telefonu kameras remonts un maiņa Rīgā: miglaini attēli, fokusēšanās problēmas, bojāts stikliņš. Bezmaksas diagnostika, 90 dienu garantija.',
};

// Build brand options similar to the battery page
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
export default function TelefonuKamerasRemontsPage({ searchParams }) {
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
        image="/images/categories/kameras_remonts.webp"  // replace with a camera-specific hero when available
        alt="Telefonu kameras remonts Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Telefonu kameras remonts Rīgā</strong> — miglains attēls, bojāts stikliņš vai fokusēšanās problēmas? Veicam diagnostiku un <strong>kamēras moduļa maiņu</strong>, ja nepieciešams. Bezmaksas pārbaude un <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>Telefonu kameras remonts</h1>
          <p className={s.paragraph}>
            Simptomi: <strong>miglains attēls</strong>, <strong>nepareizas krāsas</strong>, <strong>švīkas vai
            putekļi kadrā</strong>, <strong>auto-fokuss “sūc”</strong> vai kameras lietotne <strong>aizveras ar kļūdu</strong>.
            Ja bojāts ir tikai <strong>stikliņš</strong>, pietiek ar stikliņa maiņu; bojāta moduļa gadījumā nepieciešama
            pašas kameras nomaiņa.
          </p>
          <p className={s.paragraph}>
            Pēc remonta pārbaudām fokusēšanos, stabilizāciju, foto/video kvalitāti un kameras lietotnes darbu.
            Populāros modeļus parasti salabojam <strong>1–3 stundu</strong> laikā.
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
            serviceIds={['camera-rear', 'camera-front']}   // adjust to your pricing IDs
            title="Kameras remonta cenas pēc modeļa"
            intro="Izvēlies zīmolu un modeli, lai redzētu kameras remonta vai nomaiņas cenu."
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
            title="Kā notiek kameras remonts"
            steps={[
              { title: 'Diagnostika', text: 'Pārbaudām kameras moduli, stikliņu un savienojumus; testējam lietotni.' },
              { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
              { title: 'Remonts/maiņa', text: 'Mainām kameras moduli vai stikliņu; attīrām putekļus un nosēdumus.' },
              { title: 'Pārbaude', text: 'Testējam fokusu, stabilizāciju, attēla kvalitāti un video režīmus.' },
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
            groups={[{ label: 'Kamera', items: FAQ_ITEMS }]}
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
