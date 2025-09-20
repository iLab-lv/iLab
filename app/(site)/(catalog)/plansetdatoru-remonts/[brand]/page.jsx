// app/(site)/(catalog)/plansetdatoru-remonts/[brand]/page.jsx
import Script from 'next/script';
import devicesAll from '@/data/devices';
import SeriesGrid from '@components/model-grid/SeriesGrid';
import Services from '@sections/services/Services';
import CommonIssues from '@sections/common-issues/CommonIssues';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import phoneIssues from '@/data/commonIssues'; // generic issue set
import c from '@styles/Catalog.module.scss';

// brand content (hub-aware names/hrefs per category)
import { getBrandContent, BRAND_CATEGORY } from '@/data/brandContent';

const ORIGIN = 'https://www.ilab.lv';

export async function generateMetadata({ params }) {
  const bc = getBrandContent(params.brand, BRAND_CATEGORY.TABLETS);
  return {
    title: bc.seo.title,
    description: bc.seo.metaDescription,
    alternates: { canonical: bc.canonicalPath }, // usually /plansetdatoru-remonts/[brand]
  };
}

// Generic services for tablets
const POPULAR_REPAIRS_TABLETS = [
  { title: 'Ekrāna maiņa', text: 'plaisas, plankumi, skāriena problēmas.' },
  { title: 'Akumulatora maiņa', text: 'strauji krīt uzlāde, īss darbības laiks.' },
  { title: 'Uzlādes ligzda', text: 'nenoturas kabelis, lēna vai nestabila uzlāde.' },
  { title: 'Kamera', text: 'miglains attēls, fokusēšanās kļūdas.' },
  { title: 'Skaļruņi/mikrofons', text: 'klusa skaņa, krakšķi, sarunās nedzird.' },
  { title: 'Ūdens bojājumi', text: 'diagnostika un atjaunošana, ja tas iespējams.' },
];

// Process (shared)
const PROCESS_STEPS = [
  { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
  { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
  { title: 'Remonts', text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.' },
  { title: 'Pārbaude', text: 'Pēc remonta testējam visu funkcionalitāti un drošību.' },
  { title: 'Garantija', text: '90 dienu garantija un ieteikumi turpmākai lietošanai.' },
];

// FAQ (shared)
const FAQ_ITEMS = [
  { q: 'Cik ilgi ilgst ekrāna maiņa planšetei?', a: 'Bieži tajā pašā dienā — atkarīgs no modeļa un noslodzes.' },
  { q: 'Vai mani dati saglabāsies?', a: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.' },
  { q: 'Vai detaļām ir garantija?', a: 'Jā, gan detaļām, gan darbam.' },
  { q: 'Vai pieejamas oriģinālas detaļas?', a: 'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.' },
  { q: 'Vai varu saņemt aptuveno cenu pirms remonta?', a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.' },
];

export default function BrandTabletsPage({ params }) {
  const brandSlug = String(params.brand || '').toLowerCase();
  const bc = getBrandContent(brandSlug, BRAND_CATEGORY.TABLETS);

  const baseHref = bc.href; // e.g., /plansetdatoru-remonts/apple for iPad

  const brandTabletList = devicesAll.filter(
    (d) => d.category === 'plansetdatoru-remonts' && (d.brandSlug || '').toLowerCase() === brandSlug
  );

  // JSON-LD
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}${bc.href}#service`,
    serviceType: `${bc.marketingName} remonts`,
    areaServed: { '@type': 'Country', name: 'Latvia' },
    provider: { '@id': `${ORIGIN}#organization` },
    url: `${ORIGIN}${bc.href}/`,
    name: `${bc.marketingName} remonts`,
    description:
      `${bc.marketingName} remonts: ekrāns, baterija, uzlādes ligzda, kamera un citi darbi. Ātra diagnostika, godīgas cenas, garantija.`,
  };

  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Planšetdatoru remonts', item: `${ORIGIN}/plansetdatoru-remonts/` },
      { '@type': 'ListItem', position: 3, name: bc.marketingName, item: `${ORIGIN}${bc.href}/` },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: typeof a === 'string' ? a : '' },
    })),
  };

  return (
    <>
      {/* JSON-LD */}
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      {/* Preface */}
      <section className={c.preface} aria-labelledby="brand-tablets-h2">
        <div className={c.container}>
          <h2 id="brand-tablets-h2" className={c.h2}>{bc.hero.h1}</h2>
          <p className={c.intro}>{bc.hero.lead}</p>
        </div>
      </section>

      {/* Popular services */}
      <section className={c.section} aria-labelledby="popular-services-h2">
        <div className={c.container}>
          <Services
            id="tablet-services"
            title="Populārākie remonti"
            items={POPULAR_REPAIRS_TABLETS}
            headingLevel={2}
            variant="list"
          />
        </div>
      </section>

      {/* Series grid */}
      <section id="brand-modeli" className={`${c.section} ${c.anchorTarget}`} aria-labelledby="brand-modeli-h2">
        <div className={c.container}>
          <h2 id="brand-modeli-h2" className={c.h2}>{bc.sections.modelGrid.heading}</h2>
          <p className={c.intro}>{bc.sections.modelGrid.intro}</p>
          <p className={c.paragraph} style={{ marginTop: 0 }}>
            Cenas atšķiras pēc modeļa — atver sava modeļa lapu, lai redzētu remonta cenas.
          </p>

          <SeriesGrid
            devices={devicesAll}
            baseHref={baseHref}
            brandSlug={brandSlug}
            categorySlug="plansetdatoru-remonts"
            initialLimit={4}
            autoExpandOnSearch={true}
          />

          {brandTabletList.length === 0 && (
            <p style={{ opacity: 0.8, marginTop: 16 }}>
              Pagaidām šim zīmolam nav pievienotu modeļu.
            </p>
          )}
        </div>
      </section>

      {/* Common issues */}
      <section className={c.section} aria-labelledby="issues-h2">
        <div className={c.container}>
          <CommonIssues
            id="tablet-issues"
            title="Ar kādiem jautājumiem visbiežāk pie mums vēršas"
            items={phoneIssues}
            headingLevel={2}
          />
        </div>
      </section>

      {/* Process */}
      <section className={c.section} aria-labelledby="process-h2">
        <div className={c.container}>
          <Process
            id="process"
            title="Kā notiek remonts"
            steps={PROCESS_STEPS}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      {/* Why — full width */}
      <section className={c.section}>
        <Why />
      </section>

      {/* FAQ */}
      <section className={c.section} aria-labelledby="faq-h2">
        <div className={c.container}>
          <Faq
            id="tablet-faq"
            title="Biežāk uzdotie jautājumi"
            items={FAQ_ITEMS}
            headingLevel={2}
            variant="accordion"
          />
        </div>
      </section>

      {/* Convert band — full width */}
      <section className={c.section}>
        <ConvertBand />
      </section>
    </>
  );
}
