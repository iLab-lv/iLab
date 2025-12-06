// app/(site)/(catalog)/telefonu-remonts/udens-bojajumu-remonts/page.jsx
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

const SERVICE_PATH = '/telefonu-remonts/udens-bojajumu-remonts';

export const metadata = {
  title: 'Telefonu ūdens bojājumu remonts Rīgā | iLab',
  description:
    'Telefonu ūdens bojājumu remonts Rīgā: diagnostika, tīrīšana un oksidācijas novēršana pēc saskares ar šķidrumu. Bojāto detaļu nomaiņa un 90 dienu garantija.',
  alternates: { canonical: SERVICE_PATH },
};

// ---------- FAQ ----------
const FAQ_ITEMS = [
  {
    q: 'Ko darīt, ja telefons saskāries ar ūdeni?',
    a: 'Nekavējoties izslēdziet ierīci, neuzlādējiet to un neizmantojiet fēnu. Pēc iespējas ātrāk nogādājiet telefonu servisā diagnostikai, lai mazinātu oksidācijas risku.',
  },
  {
    q: 'Vai rīsi palīdzēs?',
    a: 'Rīsi neiztīra oksidāciju un neizžāvē visus iekšējos slāņus. Tie tikai aizkavē servisa apmeklējumu un samazina izredzes uz veiksmīgu atjaunošanu.',
  },
  {
    q: 'Cik ilgi ilgst remonts?',
    a: 'Diagnostika parasti aizņem 1–2 stundas. Atkarībā no bojājuma mēroga un detaļu pieejamības remonts var ilgt vairākas stundas vai pat dienas.',
  },
  {
    q: 'Vai dati saglabāsies?',
    a: 'Mēs darām visu iespējamo, lai saglabātu datus, tomēr ūdens bojājumi var ietekmēt atmiņu un plates darbību. Iesakām regulārus dublējumus, lai mazinātu riskus.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienu garantija detaļām un darbam. Tomēr ūdens bojājumu gadījumā riski ir augstāki nekā standarta remontos, tāpēc garantija neattiecas uz atkārtotiem ūdens bojājumiem.',
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
  { name: 'Telefonu ūdens bojājumu remonts', url: abs(SERVICE_PATH) },
]);

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}${SERVICE_PATH}#service`,
  serviceType: 'Telefonu ūdens bojājumu remonts',
  areaServed: { '@type': 'City', name: 'Rīga' },
  provider: buildProvidersFromLocations(),
  url: abs(SERVICE_PATH),
  name: 'Telefonu ūdens bojājumu remonts Rīgā',
  description:
    'Diagnostika, tīrīšana un oksidācijas novēršana pēc saskares ar ūdeni vai citiem šķidrumiem. Bojāto detaļu nomaiņa ar 90 dienu garantiju.',
};

const processHowToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${ORIGIN}${SERVICE_PATH}#howto`,
  name: 'Telefonu ūdens bojājumu remonta process iLab',
  description:
    'Kā soli pa solim notiek telefonu ūdens bojājumu diagnostika, tīrīšana un atjaunošana iLab servisā Rīgā.',
  step: [
    {
      '@type': 'HowToStep',
      name: '1. Diagnostika',
      text: 'Atveram ierīci, izvērtējam oksidāciju, koroziju, bojātos mezglus un strāvas ķēdes, nosakām bojājuma apmēru.',
    },
    {
      '@type': 'HowToStep',
      name: '2. Tīrīšana un apstrāde',
      text: 'Veicam ultraskaņas tīrīšanu un/vai ķīmisko apstrādi, attīrām plates un savienojumus, atjaunojam lodējumus, ja tas ir iespējams.',
    },
    {
      '@type': 'HowToStep',
      name: '3. Detaļu nomaiņa',
      text: 'Pēc vajadzības nomainām bojātās detaļas, piemēram, displeju, bateriju, uzlādes moduli, skaļruņus vai citus komponentus.',
    },
    {
      '@type': 'HowToStep',
      name: '4. Testi',
      text: 'Veicam pilnu funkciju pārbaudi: uzlāde, skaņa, kamera, tīkls, Wi-Fi, sensori un citas ikdienas funkcijas, lai pārliecinātos par stabilu darbību.',
    },
    {
      '@type': 'HowToStep',
      name: '5. Garantija un izsniegšana',
      text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, izskaidrojam atlikušos riskus un sniedzam ieteikumus turpmākai lietošanai.',
    },
  ],
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
export default function TelefonuUdensBojajumuRemontsPage({ searchParams }) {
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
        image="/images/categories/udens_bojajumi.webp"
        alt="Telefonu ūdens bojājumu remonts Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Ūdens vai citu šķidrumu ietekme?</strong> Veicam diagnostiku, dziļo tīrīšanu un <strong>oksidācijas novēršanu</strong>, kā arī bojāto detaļu maiņu. Jo ātrāk ierīce nonāk servisā, jo lielākas izredzes atjaunot tās darbību. <strong>Bezmaksas pārbaude</strong> un <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>
            Telefonu ūdens bojājumu remonts Rīgā
          </h1>
          <p className={s.paragraph}>
            Pēc saskares ar ūdeni vai citiem šķidrumiem bojājumi ne vienmēr ir redzami uzreiz — iekšpusē
            sākas <strong>oksidācija un korozija</strong>. iLab veicam <strong>diagnostiku</strong>,{' '}
            <strong>dziļo tīrīšanu</strong>, savienojumu atjaunošanu un, ja nepieciešams,{' '}
            <strong>bojāto detaļu nomaiņu</strong> (piemēram, displejs, baterija, uzlādes ķēde, skaļruņi).
          </p>
          <p className={s.paragraph}>
            Svarīgi: pēc applūšanas <strong>neuzlādējiet</strong> un <strong>neieslēdziet</strong> ierīci, neizmantojiet
            fēnu un nelieciet telefonu rīsos. Nogādājiet to servisā pēc iespējas ātrāk — tas būtiski
            palielina <strong>telefonu ūdens bojājumu remonta</strong> izdošanās iespēju.
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
            serviceIds={['water-damage-clean']} // pielāgo saviem pricing ID
            title="Ūdens bojājumu remonta cenas pēc modeļa"
            intro="Izvēlies zīmolu un modeli, lai redzētu diagnostikas un atjaunošanas sākotnējo cenu. Dažiem bojājumiem galīgā cena tiek precizēta pēc diagnostikas."
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
              {
                title: 'Diagnostika',
                text: 'Atveram ierīci, izvērtējam oksidāciju, bojātos mezglus un strāvas ķēdes, nosakām bojājuma apmēru.',
              },
              {
                title: 'Tīrīšana un apstrāde',
                text: 'Veicam ultraskaņas tīrīšanu un/vai ķīmisko apstrādi, attīrām plates un savienojumus, atjaunojam lodējumus, ja tas ir iespējams.',
              },
              {
                title: 'Detaļu nomaiņa',
                text: 'Pēc vajadzības nomainām bojātās detaļas — displeju, bateriju, uzlādes moduli, skaļruņus vai citus komponentus.',
              },
              {
                title: 'Testi',
                text: 'Pārbaudām uzlādi, skaņu, kameru, tīklu, Wi-Fi, sensorus un citas ikdienas funkcijas, lai pārliecinātos par stabilu darbību.',
              },
              {
                title: 'Garantija',
                text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, izskaidrojam atlikušos riskus un sniedzam ieteikumus turpmākai lietošanai.',
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
            groups={[{ label: 'Ūdens bojājumi', items: FAQ_ITEMS }]}
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
