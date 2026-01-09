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

import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';

import s from '@styles/Catalog.module.scss';

const SERVICE_PATH = '/telefonu-remonts/baterijas-maina';

export const metadata = {
  title: 'Telefonu baterijas maiņa Rīgā | iLab',
  description:
    'Ātra un kvalitatīva telefonu baterijas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM baterijas. Bieži tajā pašā dienā.',
  alternates: { canonical: SERVICE_PATH },
};

const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst baterijas maiņa?',
    a: 'Parasti 45–90 minūtes atkarībā no modeļa un noslodzes. Populāros modeļus bieži pabeidzam tajā pašā dienā.',
  },
  {
    q: 'Vai mani dati paliks neskarti?',
    a: 'Jā — baterijas (akumulatora) maiņa neskars jūsu foto, video un lietotnes. Drošībai vienmēr iesakām izveidot dublējumu.',
  },
  {
    q: 'Oriģināla vai OEM baterija — ar ko atšķiras?',
    a: 'Oriģināla baterija nodrošina maksimālu stabilitāti un kalpošanas laiku. Augstas kvalitātes OEM ir ekonomiska alternatīva ar ļoti labu ikdienas pieredzi.',
  },
  {
    q: 'Vai pēc maiņas būs nepieciešama kalibrācija?',
    a: 'Jā — pēc baterijas maiņas veicam kalibrāciju un testus (uzlādes/izlādes stabilitāte, temperatūra), lai viss darbotos korekti.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienu garantija gan detaļai, gan paveiktajam darbam.',
  },
  {
    q: 'Vai telefons saglabā ūdensizturību pēc atvēršanas?',
    a: 'Montējot izmantojam jaunu blīvējumu, tomēr rūpnīcas ūdensizturības klase pēc remonta netiek garantēta.',
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
  { name: 'Telefonu baterijas maiņa', url: abs(SERVICE_PATH) },
]);

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}${SERVICE_PATH}#service`,
  serviceType: 'Telefonu baterijas maiņa',
  name: 'Telefonu baterijas maiņa Rīgā',
  url: abs(SERVICE_PATH),
  description:
    'Telefonu baterijas maiņa Rīgā: bezmaksas diagnostika, oriģinālas vai OEM baterijas, 90 dienu garantija. Bieži tajā pašā dienā.',
  areaServed: { '@type': 'City', name: 'Rīga' },
  provider: buildProvidersFromLocations(), // Domina + Spice filiāles
};

const processHowToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${ORIGIN}${SERVICE_PATH}#howto`,
  name: 'Telefonu baterijas maiņas process iLab',
  description:
    'Kā soli pa solim notiek telefonu baterijas (akumulatora) maiņa iLab servisā Rīgā.',
  step: [
    {
      '@type': 'HowToStep',
      name: '1. Diagnostika',
      text: 'Pārbaudām baterijas nolietojumu, uzlādes ķēdi, uzlādes portu un citu iespējamo bojājumu ietekmi.',
    },
    {
      '@type': 'HowToStep',
      name: '2. Cena un termiņš',
      text: 'Pirms darba uzsākšanas saskaņojam baterijas veidu (oriģināls vai OEM), cenu un izpildes laiku.',
    },
    {
      '@type': 'HowToStep',
      name: '3. Baterijas nomaiņa',
      text: 'Droši atvienojam veco bateriju un uzstādam oriģinālu vai augstas kvalitātes OEM bateriju, nepieciešamības gadījumā nomainām blīvējumu.',
    },
    {
      '@type': 'HowToStep',
      name: '4. Kalibrācija un testi',
      text: 'Veicam baterijas kalibrāciju un pārbaudām uzlādes/izlādes stabilitāti, temperatūru un programmatūras rādītājus.',
    },
    {
      '@type': 'HowToStep',
      name: '5. Telefona izsniegšana ar garantiju',
      text: 'Izsniedzam salabotu telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus baterijas saudzīgai lietošanai.',
    },
  ],
};

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

// -------------------------------------------------
// PAGE (server component)
// -------------------------------------------------
export default function TelefonuBaterijasMainaPage({ searchParams }) {
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
        image="/images/categories/baterijas_maina.webp"
        alt="Telefonu baterijas maiņa Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Ātra un droša telefonu baterijas maiņa Rīgā</strong> — ja tālrunis ātri izlādējas, izslēdzas pie 20% vai lādējas ļoti lēni, palīdzēsim. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam iLab servisā.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>
            Telefonu baterijas maiņa Rīgā
          </h1>
          <p className={s.paragraph}>
            Ja tālrunis <strong>ātri zaudē uzlādi</strong>,{' '}
            <strong>izslēdzas pie 10–20%</strong>, <strong>uzkarst</strong> vai
            <strong> lādējas ļoti lēni</strong>, visticamāk nepieciešama{' '}
            <strong>telefonu baterijas (akumulatora) maiņa</strong>. iLab meistari veic
            ātru un kvalitatīvu nomaiņu, izmantojot{' '}
            <strong>oriģinālas vai augstas kvalitātes OEM baterijas</strong>. Pirms
            darba uzsākšanas veicam <strong>bezmaksas diagnostiku</strong>, lai
            pārliecinātos, ka problēma tiešām ir baterijā, nevis, piemēram, uzlādes
            ligzdā vai programmatūrā.
          </p>
          <p className={s.paragraph}>
            Pēc nomaiņas veicam <strong>baterijas kalibrāciju</strong> un pārbaudes —
            uzlādes/izlādes stabilitāti, temperatūras kontroli un programmatūras
            rādītājus. Populāros modeļus parasti salabojam{' '}
            <strong>45–90 minūtēs</strong>. Visam darbam un detaļām ir
            <strong> 90 dienu garantija</strong>.
          </p>
          {selectedModel && (
            <p className={s.note}>
              Atlasīts modelis: <strong>{decodeURIComponent(selectedModel)}</strong>.
              Ritiniet uz
              <a href="#brand-list"> cenām</a>.
            </p>
          )}
        </div>
      </section>

      {/* BRAND PICKER + PRICELIST */}
      <section id="brand-list" className={s.section} aria-labelledby="brand-picker-h2">
        <div className={s.container}>
          <h2 id="brand-picker-h2" className={s.h2} style={{ marginBottom: 12 }}>
            Izvēlies zīmolu
          </h2>

          <BrandPickerPricelist
            devices={devices}
            pricingSource="firestore"
            brandOptions={brandOptions}
            defaultBrand={defaultBrand}
            categorySlug="telefonu-remonts"
            serviceIds={['battery']}
            title="Baterijas maiņas cenas pēc modeļa"
            intro="Izvēlies zīmolu un modeli, lai redzētu baterijas maiņas cenu. Lielāko daļu remontu paveicam tajā pašā dienā."
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
            title="Kā notiek baterijas maiņa"
            steps={[
              {
                title: 'Diagnostika',
                text: 'Pārbaudām baterijas nolietojumu, uzlādes ķēdi un portu, kā arī iespējamos fona patēriņus.',
              },
              {
                title: 'Cena un termiņš',
                text: 'Saskaņojam baterijas tipu (oriģināla vai OEM), izmaksas un izpildes laiku pirms darba uzsākšanas.',
              },
              {
                title: 'Baterijas nomaiņa',
                text: 'Droši izņemam veco bateriju un uzstādam jaunu, ievērojot ražotāja rekomendācijas un nepieciešamību nomainīt blīvējumu.',
              },
              {
                title: 'Kalibrācija un testi',
                text: 'Veicam baterijas kalibrāciju, pārbaudām uzlādes/izlādes stabilitāti, temperatūru un ierīces kopējo darbību.',
              },
              {
                title: 'Garantija',
                text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus baterijas saudzīgai lietošanai.',
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
            groups={[{ label: 'Baterija', items: FAQ_ITEMS }]}
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
