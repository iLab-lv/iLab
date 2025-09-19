// app/(site)/(catalog)/telefonu-remonts/[brand]/page.jsx
import Script from 'next/script';
import devicesAll from '@/data/devices';
import SeriesGrid from '@components/model-grid/SeriesGrid';
import Services from '@sections/services/Services';
import CommonIssues from '@sections/common-issues/CommonIssues';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import phoneIssues from '@/data/commonIssues';

const ORIGIN = 'https://www.ilab.lv';

const titleize = (s) =>
  decodeURIComponent(s)
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export async function generateMetadata({ params }) {
  const brandName = titleize(params.brand || '');
  return {
    title: `${brandName} telefonu remonts | iLab`,
    description: `${brandName} telefonu remonts — displeji, baterijas, uzlādes ligzdas, kameras un citi remonti. Ātra diagnostika, godīgas cenas, garantija.`,
    alternates: { canonical: `/telefonu-remonts/${params.brand}` },
  };
}

// Generic “popular services” list used for all brands
const POPULAR_REPAIRS_GENERIC = [
  { title: 'Displeja (ekrāna) maiņa', text: 'plaisas, tumši plankumi, nereaģē skāriens.' },
  { title: 'Akumulatora maiņa', text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.' },
  { title: 'Uzlādes ligzdas remonts', text: 'nenoturas kabelis, lēna vai nestabila uzlāde.' },
  { title: 'Kameras remonts', text: 'miglaini attēli, fokusēšanās problēmas.' },
  { title: 'Skaļruņi un mikrofons', text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.' },
  { title: 'Ūdens bojājumi', text: 'diagnostika un atjaunošana, ja tas iespējams.' },
];

// Generic process steps (shared for all brands)
const PROCESS_STEPS = [
  { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
  { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
  { title: 'Remonts', text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.' },
  { title: 'Pārbaude', text: 'Pēc remonta testējam visu funkcionalitāti un drošību.' },
  { title: 'Garantija', text: '90 dienu garantija un ieteikumi turpmākai lietošanai.' },
];

// Generic FAQ (shared for all brands)
const FAQ_ITEMS = [
  { q: 'Cik ilgi ilgst telefona displeja maiņa?', a: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.' },
  { q: 'Vai mani dati saglabāsies?', a: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.' },
  { q: 'Vai detaļām ir garantija?', a: 'Jā, gan detaļām, gan darbam.' },
  { q: 'Vai pieejamas oriģinālas detaļas?', a: 'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.' },
  { q: 'Vai varu saņemt aptuveno cenu pirms remonta?', a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.' },
];

export default function BrandPhonesPage({ params }) {
  const brandSlug = String(params.brand || '').toLowerCase();
  const brandName = titleize(brandSlug);
  const baseHref = `/telefonu-remonts/${brandSlug}`;

  // Pre-filter only to know if the brand has any phone models (for fallback copy)
  const brandPhoneList = devicesAll.filter(
    (d) => d.category === 'telefonu-remonts' && (d.brandSlug || '').toLowerCase() === brandSlug
  );

  // JSON-LD (Service + Breadcrumbs)
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}/telefonu-remonts/${brandSlug}#service`,
    serviceType: `${brandName} telefonu remonts`,
    areaServed: { '@type': 'Country', name: 'Latvia' },
    provider: { '@id': `${ORIGIN}#organization` },
    url: `${ORIGIN}/telefonu-remonts/${brandSlug}/`,
    name: `${brandName} telefonu remonts`,
    description:
      `${brandName} tālruņu remonts: displejs, baterija, uzlādes ligzda, kamera un citi darbi. Ātra diagnostika, godīgas cenas, garantija.`,
  };

  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Telefonu remonts', item: `${ORIGIN}/telefonu-remonts/` },
      { '@type': 'ListItem', position: 3, name: `${brandName}`, item: `${ORIGIN}/telefonu-remonts/${brandSlug}/` },
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

      {/* Preface (simple, no module CSS to keep this route generic) */}
      <section style={{ padding: '24px 0' }} aria-labelledby="brand-phones-h2">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <h2 id="brand-phones-h2" style={{ margin: 0 }}>
            {brandName} telefonu remonts
          </h2>
          <p style={{ opacity: 0.9, marginTop: 8 }}>
            Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas saskaņojam pirms darba uzsākšanas, biežākos darbus paveicam tajā pašā dienā.
          </p>
        </div>
      </section>

      {/* Popular services (generic copy) */}
      <section aria-labelledby="popular-services-h2" style={{ padding: '8px 0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <Services
            id="brand-services"
            title="Populārākie remonti"
            items={POPULAR_REPAIRS_GENERIC}
            headingLevel={2}
            variant="list"
          />
        </div>
      </section>

      {/* Series grid */}
      <section id="brand-modeli" aria-labelledby="brand-modeli-h2" style={{ padding: '8px 0 8px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <h2 id="brand-modeli-h2" style={{ marginBottom: 8 }}>
            Izvēlies modeli
          </h2>
          <p style={{ opacity: 0.8, marginTop: 0, marginBottom: 16 }}>
            Meklē pēc nosaukuma vai pārlūko sērijas. Noklikšķini uz modeļa, lai skatītu konkrētus remonta pakalpojumus.
          </p>

          <SeriesGrid
            devices={devicesAll}
            baseHref={baseHref}
            brandSlug={brandSlug}
            categorySlug="telefonu-remonts"
            initialLimit={4}
            autoExpandOnSearch={true}
          />

          {brandPhoneList.length === 0 && (
            <p style={{ opacity: 0.8, marginTop: 16 }}>
              Pagaidām šim zīmolam nav pievienotu modeļu.
            </p>
          )}
        </div>
      </section>

      {/* Common issues (shared list) */}
      <section aria-labelledby="issues-h2" style={{ padding: '8px 0 8px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <CommonIssues
            id="brand-issues"
            title="Ar kādiem jautājumiem visbiežāk pie mums vēršas"
            items={phoneIssues}
            headingLevel={2}
          />
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-h2" style={{ padding: '8px 0 8px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <Process
            id="process"
            title="Kā notiek remonts"
            steps={PROCESS_STEPS}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      {/* Why + FAQ + Convert band */}
      <section style={{ padding: '8px 0 8px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <Why />
        </div>
      </section>

      <section aria-labelledby="faq-h2" style={{ padding: '8px 0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <Faq
            id="brand-faq"
            title="Biežāk uzdotie jautājumi"
            items={FAQ_ITEMS}
            headingLevel={2}
            variant="accordion"
          />
        </div>
      </section>

      <section style={{ padding: '8px 0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <ConvertBand />
        </div>
      </section>
    </>
  );
}
