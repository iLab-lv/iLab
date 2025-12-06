// app/(site)/(catalog)/telefonu-remonts/uzlades-ligzdas-maina/page.jsx
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

const SERVICE_PATH = '/telefonu-remonts/uzlades-ligzdas-maina';

export const metadata = {
  title: 'Telefonu uzlādes ligzdas maiņa Rīgā | iLab',
  description:
    'Neuzlādējas, jākustina vads vai ports vaļīgs? Telefonu uzlādes ligzdas tīrīšana un maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  alternates: { canonical: SERVICE_PATH },
};

// ---------- FAQ ----------
const FAQ_ITEMS = [
  {
    q: 'Kādi simptomi norāda uz bojātu uzlādes ligzdu?',
    a: 'Uzlāde pārtrūkst, jākustina vads, kabelis “neiet līdz galam”, ports ir vaļīgs vai nereaģē vispār. Dažkārt telefons lādējas tikai noteiktā pozīcijā.',
  },
  {
    q: 'Vai pietiek ar tīrīšanu?',
    a: 'Bieži jā — uzlādes portā sakrājas putekļi un tekstila šķiedras, kas traucē kontaktam. Ja kontakti ir oksidēti vai mehāniski bojāti, nepieciešama ligzdas maiņa.',
  },
  {
    q: 'Cik ilgi ilgst remonts?',
    a: 'Tīrīšana parasti aizņem 15–30 minūtes, uzlādes ligzdas maiņa — aptuveni 45–90 minūtes atkarībā no modeļa.',
  },
  {
    q: 'Vai problēma var būt arī citur?',
    a: 'Jā, dažkārt bojāta ir nevis ligzda, bet uzlādes ķēde, barošanas mikroshema (charging IC) vai baterija. To noskaidrojam diagnostikas laikā.',
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
  { name: 'Telefonu uzlādes ligzdas maiņa', url: abs(SERVICE_PATH) },
]);

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}${SERVICE_PATH}#service`,
  serviceType: 'Telefonu uzlādes ligzdas maiņa',
  areaServed: { '@type': 'City', name: 'Rīga' },
  provider: buildProvidersFromLocations(),
  url: abs(SERVICE_PATH),
  name: 'Telefonu uzlādes ligzdas maiņa Rīgā',
  description:
    'Telefonu uzlādes ligzdas tīrīšana un nomaiņa Rīgā: ja uzlāde pārtrūkst, jākustina vads vai ports nereaģē. Bezmaksas diagnostika un 90 dienu garantija.',
};

const processHowToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${ORIGIN}${SERVICE_PATH}#howto`,
  name: 'Telefonu uzlādes ligzdas remonta process iLab',
  description:
    'Kā soli pa solim notiek telefonu uzlādes ligzdas tīrīšana, maiņa un uzlādes ķēdes diagnostika iLab servisā Rīgā.',
  step: [
    {
      '@type': 'HowToStep',
      name: '1. Diagnostika',
      text: 'Pārbaudām uzlādes portu, kabeli, barošanas ķēdi un baterijas stāvokli, lai saprastu, vai vaina ir ligzdā, kabelī vai elektronikas mezglos.',
    },
    {
      '@type': 'HowToStep',
      name: '2. Tīrīšana un apstrāde',
      text: 'Noņemam putekļus un tekstila šķiedras no porta, attīrām kontaktus, apstrādājam vieglu oksidāciju, ja tāda ir izveidojusies.',
    },
    {
      '@type': 'HowToStep',
      name: '3. Uzlādes ligzdas maiņa',
      text: 'Ja portam ir mehāniski vai nopietni oksidācijas bojājumi, nomainām uzlādes ligzdu pret kvalitatīvu detaļu, ievērojot ražotāja rekomendācijas.',
    },
    {
      '@type': 'HowToStep',
      name: '4. Testi',
      text: 'Pārbaudām uzlādes ātrumu, stabilitāti, datu pārraidi, kabeļa fiksāciju un atsaucību dažādos leņķos, kā arī veicam papildus testus charging IC un baterijas darbībai.',
    },
    {
      '@type': 'HowToStep',
      name: '5. Garantija un izsniegšana',
      text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, sniedzam ieteikumus kabeļu un lādētāju drošai lietošanai.',
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
export default function TelefonuUzladesLigzdasMainaPage({ searchParams }) {
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
        image="/images/categories/uzlades_ligzda_remonts.webp"
        alt="Telefonu uzlādes ligzdas maiņa Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Neuzlādējas vai jākustina vads?</strong> Veicam uzlādes porta <strong>tīrīšanu</strong> un, ja nepieciešams, <strong>uzlādes ligzdas nomaiņu</strong>. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>
            Telefonu uzlādes ligzdas maiņa Rīgā
          </h1>
          <p className={s.paragraph}>
            Tipiski simptomi: <strong>uzlāde pārtrūkst</strong>, <strong>jākustina vads</strong>,{' '}
            <strong>kabelis neiet līdz galam</strong>, <strong>ports ir vaļīgs</strong> vai{' '}
            <strong>nereaģē vispār</strong>. Bieži pietiek ar <strong>profesionālu tīrīšanu</strong>, taču,
            ja kontakti ir bojāti vai oksidēti, veicam <strong>uzlādes ligzdas nomaiņu</strong>. Ja diagnostikā
            atklājas problēma barošanas ķēdē, nepieciešams <strong>charging IC</strong> remonts.
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
            serviceIds={['charge-port', 'charging-ic']} // pielāgo saviem pricing ID
            title="Uzlādes ligzdas remonta cenas pēc modeļa"
            intro="Izvēlies zīmolu un modeli, lai redzētu uzlādes ligzdas tīrīšanas vai nomaiņas cenu. Dažos gadījumos nepieciešams arī barošanas ķēdes remonts."
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
            title="Kā notiek uzlādes ligzdas remonts"
            steps={[
              {
                title: 'Diagnostika',
                text: 'Pārbaudām uzlādes portu, kabeli, uzlādes ķēdi un baterijas stāvokli, lai noteiktu bojājuma cēloni.',
              },
              {
                title: 'Tīrīšana un apstrāde',
                text: 'Noņemam putekļus un tekstila šķiedras, attīrām kontaktus un apstrādājam vieglu oksidāciju.',
              },
              {
                title: 'Uzlādes ligzdas maiņa',
                text: 'Ja porta kontakti ir nopietni bojāti, nomainām uzlādes ligzdu pret kvalitatīvu detaļu, ievērojot ražotāja rekomendācijas.',
              },
              {
                title: 'Testi',
                text: 'Pārbaudām uzlādes ātrumu, stabilitāti, datu pārraidi, kabeļa fiksāciju un uzvedību dažādos leņķos.',
              },
              {
                title: 'Garantija',
                text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, sniedzam ieteikumus par lādētāju un kabeļu drošu lietošanu.',
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
            groups={[{ label: 'Uzlāde', items: FAQ_ITEMS }]}
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
