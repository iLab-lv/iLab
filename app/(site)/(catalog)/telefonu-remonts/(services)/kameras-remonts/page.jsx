import Script from 'next/script';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import BrandPickerPricelist from '@components/service-pricelist/BrandPickerPricelist';

import categories from '@/data/categories';
import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';

import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';

import s from '@styles/Catalog.module.scss';

const SERVICE_PATH = '/telefonu-remonts/kameras-remonts';

export const metadata = {
  title: 'Telefonu kameras remonts Rīgā | iLab',
  description:
    'Miglaini attēli, fokusēšanās problēmas vai nedarbojas kamera? Telefonu kameras remonts un maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  alternates: { canonical: SERVICE_PATH },
};

// ---------- FAQ ----------
const FAQ_ITEMS = [
  {
    q: 'Kādi simptomi norāda uz kameras bojājumu?',
    a: 'Miglains attēls, melns ekrāns kamerā, trīcīgs autofokuss, švīkas vai plankumi kadrā, kā arī situācijas, kad kameras lietotne aizveras vai rāda kļūdu.',
  },
  {
    q: 'Vai var salabot tikai stikliņu?',
    a: 'Jā, ja bojāts ir tikai stikliņš un pats kameras modulis strādā korekti. Ja bojāts ir modulis (piemēram, autofokuss vai sensors), nepieciešama kameras maiņa.',
  },
  {
    q: 'Cik ilgi ilgst remonts?',
    a: 'Parasti 1–3 stundas atkarībā no modeļa un detaļu pieejamības. Populāros modeļus bieži salabojam tajā pašā dienā.',
  },
  {
    q: 'Vai dati tiks dzēsti?',
    a: 'Nē, kameras remonts datus neietekmē. Drošībai tomēr vienmēr iesakām izveidot dublējumu.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienu garantija gan detaļai, gan paveiktajam darbam.',
  },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }, index) => ({
    '@type': 'Question',
    '@id': `${ORIGIN}${SERVICE_PATH}#faq-q${index + 1}`,
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbsLd = buildBreadcrumbsLd([
  { name: 'Sākums', url: abs('/') },
  { name: 'Telefonu remonts', url: abs('/telefonu-remonts') },
  { name: 'Telefonu kameras remonts', url: abs(SERVICE_PATH) },
]);

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}${SERVICE_PATH}#service`,
  serviceType: 'Telefonu kameras remonts',
  areaServed: { '@type': 'City', name: 'Rīga' },
  provider: buildProvidersFromLocations(),
  url: abs(SERVICE_PATH),
  name: 'Telefonu kameras remonts Rīgā',
  description:
    'Telefonu kameras remonts un maiņa Rīgā: miglaini attēli, fokusēšanās problēmas, bojāts stikliņš. Bezmaksas diagnostika un 90 dienu garantija.',
};

const processHowToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${ORIGIN}${SERVICE_PATH}#howto`,
  name: 'Telefonu kameras remonta process iLab',
  description:
    'Kā soli pa solim notiek telefonu kameras remonts un maiņa iLab servisā Rīgā.',
  step: [
    {
      '@type': 'HowToStep',
      name: '1. Diagnostika',
      text: 'Pārbaudām kameras moduli, stikliņu, savienojumus un kameras lietotni, lai saprastu, vai bojāts ir tikai stikliņš vai arī pats kameras modulis.',
    },
    {
      '@type': 'HowToStep',
      name: '2. Cena un termiņš',
      text: 'Pirms remonta sākšanas saskaņojam, vai mainām tikai stikliņu vai visu moduli, kā arī izmaksas un izpildes laiku.',
    },
    {
      '@type': 'HowToStep',
      name: '3. Remonts vai nomaiņa',
      text: 'Veicam kameras moduļa vai stikliņa maiņu, attīrām putekļus un nosēdumus, nepieciešamības gadījumā atjaunojam blīvējumu.',
    },
    {
      '@type': 'HowToStep',
      name: '4. Pārbaude',
      text: 'Testējam autofokusu, attēla asumu, stabilizāciju, krāsas un video režīmus, lai pārliecinātos, ka kamera darbojas kā nākas.',
    },
    {
      '@type': 'HowToStep',
      name: '5. Garantija un izsniegšana',
      text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus kameras saudzīgai lietošanai.',
    },
  ],
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
        (d.brandSlug || '').toLowerCase() ===
          String(b.brandSlug || b.slug).toLowerCase()
    )
  );

  const hasSamsung = withDevices.find((b) => (b.brandSlug || b.slug) === 'samsung');
  const defaultBrand = hasSamsung
    ? 'samsung'
    : withDevices[0]?.brandSlug || withDevices[0]?.slug || 'samsung';

  const brandOptions = withDevices.map((b) => ({
    slug: b.brandSlug || b.slug,
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
      <Script
        id="breadcrumbs-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script
        id="service-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>
      <Script
        id="process-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(processHowToLd)}
      </Script>

      {/* HERO */}
      <DeviceHero
        image="/images/categories/kameras_remonts.webp"
        alt="Telefonu kameras remonts Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Telefonu kameras remonts Rīgā</strong> — miglains attēls, bojāts stikliņš vai fokusēšanās problēmas? Veicam diagnostiku un nepieciešamības gadījumā <strong>kameras moduļa vai stikliņa maiņu</strong>. Bezmaksas pārbaude un <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>
            Telefonu kameras remonts Rīgā
          </h1>
          <p className={s.paragraph}>
            Simptomi, kas norāda uz <strong>kameras bojājumu</strong>:{' '}
            <strong>miglains vai graudains attēls</strong>,{' '}
            <strong>nepareizas krāsas</strong>, <strong>švīkas vai putekļi kadrā</strong>,{' '}
            <strong>autofokuss “sūc”</strong>, melns ekrāns kamerā vai kameras lietotne{' '}
            <strong>aizveras ar kļūdu</strong>. Ja bojāts ir tikai{' '}
            <strong>stikliņš</strong>, parasti pietiek ar stikliņa maiņu; ja bojāts ir pats
            kameras modulis, nepieciešama <strong>kameras nomaiņa</strong>.
          </p>
          <p className={s.paragraph}>
            Pēc remonta pārbaudām fokusēšanos, stabilizāciju, foto un video kvalitāti, kā arī
            kameras lietotnes darbību. Populāros modeļus parasti salabojam{' '}
            <strong>1–3 stundu</strong> laikā. Visam veicamajam darbam un detaļām ir{' '}
            <strong>90 dienu garantija</strong>.
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
      <section id="cenas" className={s.section} aria-labelledby="brand-picker-h2">
        <div className={s.container}>
          <h2 id="brand-picker-h2" className={s.h2} style={{ marginBottom: 12 }}>
            Izvēlies zīmolu
          </h2>

          <BrandPickerPricelist
            devices={devices}
            pricing={devicePricing}
            brandOptions={brandOptions}
            defaultBrand={defaultBrand}
            categorySlug="telefonu-remonts"
            serviceIds={['camera', 'camera-glass']} // pielāgo atbilstoši cenrādim
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
              {
                title: 'Diagnostika',
                text: 'Pārbaudām kameras moduli, stikliņu, savienojumus un kameras lietotni, lai precīzi noteiktu bojājumu.',
              },
              {
                title: 'Cena un termiņš',
                text: 'Saskaņojam, vai mainīt stikliņu vai visu moduli, kā arī izmaksas un izpildes laiku pirms darba uzsākšanas.',
              },
              {
                title: 'Remonts vai maiņa',
                text: 'Veicam kameras moduļa vai stikliņa maiņu, attīrām putekļus un nosēdumus, nepieciešamības gadījumā atjaunojam blīvējumu.',
              },
              {
                title: 'Pārbaude',
                text: 'Testējam fokusu, attēla asumu, stabilizāciju, krāsas un video režīmus, lai pārliecinātos, ka kamera atkal strādā ideāli.',
              },
              {
                title: 'Garantija',
                text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus kameras saudzīgai lietošanai.',
              },
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
      <section
        id="pieteikties"
        className={s.section}
        aria-label="Pieteikties remontam"
      >
        <div className={s.container}>
          <ConvertBand />
        </div>
      </section>
    </>
  );
}
