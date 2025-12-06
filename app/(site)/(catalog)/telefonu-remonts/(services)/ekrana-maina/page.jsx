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

import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';

import s from '@styles/Catalog.module.scss';

// -------------------------------------------------
// META
// -------------------------------------------------
const SERVICE_PATH = '/telefonu-remonts/ekrana-maina';

export const metadata = {
  title: 'Telefonu ekrāna maiņa Rīgā | iLab',
  description:
    'Ātra un kvalitatīva telefonu ekrāna maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģināli vai OEM displeji. Bieži tajā pašā dienā.',
  alternates: { canonical: SERVICE_PATH },
};

// -------------------------------------------------
// FAQ
// -------------------------------------------------
const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst telefona ekrāna maiņa?',
    a: 'Parasti 1–3 stundas atkarībā no modeļa un noslodzes. Populāriem modeļiem bieži pabeidzam remontu tajā pašā dienā.',
  },
  {
    q: 'Vai mani dati paliks neskarti?',
    a: 'Jā — ekrāna (displeja) maiņa neietekmē jūsu foto, video un lietotnes. Drošībai tomēr iesakām veikt dublējumu.',
  },
  {
    q: 'Kāda ir atšķirība starp oriģinālu un OEM ekrānu?',
    a: 'Oriģināls ekrāns nodrošina maksimālu saderību un kvalitāti (krāsas, spilgtumu, skāriena jutību). Augstas kvalitātes OEM ir ekonomiskāks risinājums ar ļoti labu ikdienas pieredzi.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienas gan detaļai, gan paveiktajam darbam.',
  },
  {
    q: 'Kā saprast, ka nepieciešama ekrāna maiņa?',
    a: 'Plīsumi, tumši plankumi, līnijas bildē, mirgošana, “izdegšanas” pleķi vai nereaģējošs skāriens norāda uz bojātu displeju, kam vajadzīga maiņa.',
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
  { name: 'Telefonu ekrāna maiņa', url: abs(SERVICE_PATH) },
]);

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}${SERVICE_PATH}#service`,
  serviceType: 'Telefonu ekrāna maiņa',
  areaServed: { '@type': 'City', name: 'Rīga' },
  provider: buildProvidersFromLocations(),
  url: abs(SERVICE_PATH),
  name: 'Telefonu ekrāna maiņa Rīgā',
  description:
    'Telefonu ekrāna (displeja) maiņa Rīgā: bezmaksas diagnostika, oriģināli vai OEM displeji, 90 dienu garantija. Bieži tajā pašā dienā.',
};

// HowTo JSON-LD matching the visible Process steps
const processHowToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${ORIGIN}${SERVICE_PATH}#howto`,
  name: 'Telefonu ekrāna maiņas process iLab',
  description:
    'Kā soli pa solim notiek telefonu ekrāna (displeja) maiņa iLab servisā Rīgā.',
  step: [
    {
      '@type': 'HowToStep',
      name: '1. Diagnostika',
      text: 'Ātri pārbaudām ierīci — ekrāna bojājumus, skārienjutību un citus iespējamos defektus, lai pārliecinātos, ka nepieciešama tieši ekrāna maiņa.',
    },
    {
      '@type': 'HowToStep',
      name: '2. Cena un termiņš',
      text: 'Pirms remonta sākšanas saskaņojam ekrāna veidu (oriģināls vai OEM), izmaksas un izpildes laiku.',
    },
    {
      '@type': 'HowToStep',
      name: '3. Ekrāna nomaiņa',
      text: 'Sertificēti meistari droši noņem bojāto ekrānu un uzstāda jaunu displeju, ievērojot ražotāja rekomendācijas un blīvējumu atjaunošanu, ja nepieciešams.',
    },
    {
      '@type': 'HowToStep',
      name: '4. Pārbaude',
      text: 'Pārbaudām skārienu, krāsu atbilstību, spilgtumu un kopējo attēla kvalitāti, lai pārliecinātos, ka viss darbojas korekti.',
    },
    {
      '@type': 'HowToStep',
      name: '5. Garantija un izsniegšana',
      text: 'Izsniedzam salabotu telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus ekrāna saudzīgai lietošanai.',
    },
  ],
};

// -------------------------------------------------
// BRAND OPTIONS (same reusable logic as battery page)
// -------------------------------------------------
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
// PAGE COMPONENT
// -------------------------------------------------
export default function TelefonuEkranaMainaPage({ searchParams }) {
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
        image="/images/categories/displeja_maina.webp"
        alt="Telefonu ekrāna maiņa Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Ātra un kvalitatīva telefonu ekrāna maiņa Rīgā</strong> — plaisas, plankumi vai skāriena problēmas novēršam bieži tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam iLab servisā.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>
            Telefonu ekrāna maiņa Rīgā
          </h1>
          <p className={s.paragraph}>
            Ja ekrāns ir saplīsis, parādās plankumi, līnijas vai nereaģē skāriens, visticamāk
            nepieciešama <strong>telefonu ekrāna (displeja) maiņa</strong>. iLab meistari Rīgā veic
            ātru un drošu nomaiņu, izmantojot{' '}
            <strong>oriģinālus vai augstas kvalitātes OEM displejus</strong>. Pirms darba uzsākšanas
            veicam <strong>bezmaksas diagnostiku</strong>, lai pārliecinātos, ka bojājums ir tieši
            displejā, nevis, piemēram, programmatūrā vai citās komponentēs.
          </p>
          <p className={s.paragraph}>
            Pēc nomaiņas rūpīgi pārbaudām skārienjutību, krāsu atbilstību, spilgtumu un kopējo attēla
            kvalitāti. Populāros modeļus parasti salabojam <strong>1–3 stundu laikā</strong>. Visam
            veicamajam darbam un detaļām ir <strong>90 dienu garantija</strong>.
          </p>
          {selectedModel && (
            <p className={s.note}>
              Atlasīts modelis: <strong>{decodeURIComponent(selectedModel)}</strong>. Ritiniet uz
              <a href="#cenas"> cenām</a>.
            </p>
          )}
        </div>
      </section>

      {/* BRAND PICKER + PRICELIST (multi-brand) */}
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
            serviceIds={['display-original', 'display-oled', 'display-incell']}
            title="Ekrāna maiņas cenas pēc modeļa"
            intro="Izvēlies zīmolu un modeli, lai redzētu ekrāna maiņas cenu. Lielāko daļu remontu paveicam tajā pašā dienā."
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
            title="Kā notiek ekrāna maiņa"
            steps={[
              {
                title: 'Diagnostika',
                text: 'Ātri pārbaudām ierīci un apstiprinām ekrāna bojājumu: plaisas, plankumus, līnijas, skāriena problēmas.',
              },
              {
                title: 'Cena un termiņš',
                text: 'Saskaņojam displeja veidu (oriģināls vai OEM), izmaksas un izpildes laiku pirms darba uzsākšanas.',
              },
              {
                title: 'Ekrāna nomaiņa',
                text: 'Sertificēti meistari droši noņem bojāto ekrānu un uzstāda jaunu, ievērojot ražotāja rekomendācijas un blīvējumu atjaunošanu.',
              },
              {
                title: 'Pārbaude',
                text: 'Pārbaudām skārienjutību, krāsas, spilgtumu un kopējo attēla kvalitāti, lai pārliecinātos, ka viss darbojas nevainojami.',
              },
              {
                title: 'Garantija',
                text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus ekrāna saudzīgai lietošanai.',
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
            groups={[{ label: 'Ekrāns', items: FAQ_ITEMS }]}
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
