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

const SERVICE_PATH = '/telefonu-remonts/skalruni-mikrofona-remonts';

export const metadata = {
  title: 'Telefonu skaļruņu un mikrofona remonts Rīgā | iLab',
  description:
    'Klusa skaņa, krakšķi vai sarunās nedzird? Telefonu skaļruņu un mikrofona remonts un tīrīšana Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  alternates: { canonical: SERVICE_PATH },
};

// ---------- FAQ ----------
const FAQ_ITEMS = [
  {
    q: 'Kādi simptomi norāda uz skaļruņu vai mikrofona problēmām?',
    a: 'Klusa vai kropļota skaņa, krakšķi, sarunās nedzird vai dzird ar troksni, balss ierakstā ir fons/troksnis vai pilnīgs klusums.',
  },
  {
    q: 'Vai pietiek ar tīrīšanu?',
    a: 'Bieži pietiek ar restīšu, kontaktu un iekšējo dobumu tīrīšanu. Ja modulis ir bojāts vai oksidējies, nepieciešama skaļruņa vai mikrofona nomaiņa.',
  },
  {
    q: 'Cik ilgi ilgst remonts?',
    a: 'Parasti 45–90 minūtes atkarībā no modeļa un bojājuma pakāpes. Populāros modeļus bieži salabojam tajā pašā dienā.',
  },
  {
    q: 'Vai dati ietekmēsies?',
    a: 'Nē, skaļruņu un mikrofona remonts datus neietekmē. Tomēr drošībai vienmēr iesakām veikt dublējumu.',
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
  { name: 'Telefonu skaļruņu un mikrofona remonts', url: abs(SERVICE_PATH) },
]);

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}${SERVICE_PATH}#service`,
  serviceType: 'Telefonu skaļruņu un mikrofona remonts',
  areaServed: { '@type': 'City', name: 'Rīga' },
  provider: buildProvidersFromLocations(),
  url: abs(SERVICE_PATH),
  name: 'Telefonu skaļruņu un mikrofona remonts Rīgā',
  description:
    'Telefonu skaļruņu un mikrofona remonts un tīrīšana Rīgā: klusa skaņa, krakšķi, sarunās nedzird vai ir troksnis. Bezmaksas diagnostika un 90 dienu garantija.',
};

const processHowToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${ORIGIN}${SERVICE_PATH}#howto`,
  name: 'Telefonu skaļruņu un mikrofona remonta process iLab',
  description:
    'Kā soli pa solim notiek telefonu skaļruņu un mikrofona remonts un tīrīšana iLab servisā Rīgā.',
  step: [
    {
      '@type': 'HowToStep',
      name: '1. Diagnostika',
      text: 'Pārbaudām skaļruņus, mikrofonu(-us), restītes, kontaktus un ligzdas; testējam zvanu, mediju skaņu un balss ierakstu, lai noteiktu bojājuma cēloni.',
    },
    {
      '@type': 'HowToStep',
      name: '2. Cena un termiņš',
      text: 'Skaidrojam, vai pietiek ar tīrīšanu vai nepieciešama moduļa nomaiņa, vienojamies par izmaksām un izpildes laiku pirms darba uzsākšanas.',
    },
    {
      '@type': 'HowToStep',
      name: '3. Remonts vai nomaiņa',
      text: 'Veicam restīšu un kontaktu tīrīšanu vai bojāto skaļruņu/mikrofonu moduļu nomaiņu, novēršam oksidāciju, ja tā ir izveidojusies.',
    },
    {
      '@type': 'HowToStep',
      name: '4. Pārbaude',
      text: 'Testējam sarunas, skaļruņus, balss ierakstu, trokšņu slāpēšanu un mediju skaņu dažādos skaļuma līmeņos.',
    },
    {
      '@type': 'HowToStep',
      name: '5. Garantija un izsniegšana',
      text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus, kā izvairīties no putekļiem un mitruma turpmāk.',
    },
  ],
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
export default function TelefonuSkalruniMikrofonaRemontsPage({ searchParams }) {
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
        image="/images/categories/mikrofona_remonts.webp"
        alt="Telefonu skaļruņu un mikrofona remonts Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Skaļruņu un mikrofona remonts Rīgā</strong> — ja sarunās nedzird, skaņa ir klusa, ar krakšķiem vai balss ierakstā ir troksnis, veiksim tīrīšanu vai moduļu nomaiņu. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>
            Telefonu skaļruņu un mikrofona remonts
          </h1>
          <p className={s.paragraph}>
            Tipiski simptomi: <strong>klusa skaņa</strong>, <strong>kropļota skaņa</strong>,{' '}
            <strong>krakšķi</strong>, <strong>sarunās nedzird</strong> vai dzird ar{' '}
            <strong>spēcīgu fonu/troksni</strong>, kā arī <strong>balss ieraksts bez skaņas</strong>.
            Bieži pietiek ar <strong>skaļruņu un mikrofonu restīšu tīrīšanu</strong>, taču, ja modulis
            ir bojāts vai oksidējies, veicam <strong>skaļruņa vai mikrofona nomaiņu</strong>.
          </p>
          <p className={s.paragraph}>
            Pēc remonta pārbaudām zvanu skaļruni, mediju skaļruni, visus mikrofonus un trokšņu
            slāpēšanu dažādos scenārijos (sarunas, skaļrunis, balss ieraksts). Populāros modeļus
            parasti salabojam <strong>45–90 minūšu</strong> laikā. Visam veicamajam darbam un
            detaļām ir <strong>90 dienu garantija</strong>.
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
            serviceIds={['speaker', 'microphone']} // pielāgo atbilstoši saviem service ID
            title="Skaļruņu un mikrofona remonta cenas pēc modeļa"
            intro="Izvēlies zīmolu un modeli, lai redzētu skaļruņu un mikrofona tīrīšanas vai nomaiņas cenu."
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
            title="Kā notiek skaļruņu un mikrofona remonts"
            steps={[
              {
                title: 'Diagnostika',
                text: 'Pārbaudām skaļruņus, mikrofonu(-us), restītes, kontaktus un ligzdas; testējam zvanu, mediju skaņu un balss ierakstu.',
              },
              {
                title: 'Cena un termiņš',
                text: 'Paskaidrojam, vai pietiek ar tīrīšanu vai nepieciešama moduļa nomaiņa, vienojamies par izmaksām un izpildes laiku pirms darba uzsākšanas.',
              },
              {
                title: 'Remonts vai nomaiņa',
                text: 'Veicam restīšu un kontaktu tīrīšanu vai bojāto skaļruņu/mikrofonu moduļu nomaiņu, novēršam oksidāciju, ja tā ir izveidojusies.',
              },
              {
                title: 'Pārbaude',
                text: 'Testējam sarunas, skaļruņus, balss ierakstu un trokšņu slāpēšanu dažādos skaļuma līmeņos un režīmos.',
              },
              {
                title: 'Garantija',
                text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus, kā pasargāt ierīci no putekļiem un mitruma.',
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
            groups={[{ label: 'Skaņa', items: FAQ_ITEMS }]}
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
