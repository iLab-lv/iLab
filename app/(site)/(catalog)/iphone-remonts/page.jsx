// app/(site)/(catalog)/iphone-remonts/page.jsx
import Script from 'next/script';
import Link from 'next/link';

import categoryContent from '@/data/categoryContent';
import devicesAll from '@/data/devices';

import SeriesGrid from '@components/model-grid/SeriesGrid';
import Process from '@sections/process/Process';
import CommonIssues from '@sections/common-issues/CommonIssues';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import s from '@styles/Catalog.module.scss';

const ORIGIN = 'https://www.ilab.lv';
const cat = categoryContent['iphone-remonts'];

export const metadata = {
  title: cat?.seo?.title ?? 'iPhone remonts | iLab',
  description: cat?.seo?.metaDescription ?? '',
  alternates: { canonical: '/iphone-remonts' },
};

// =============================
// FAQ + CommonIssues content
// =============================

// Mini-cards preview (icon passed as a STRING key for client-side mapping)
const ISSUES_PREVIEW = [
  {
    q: 'Saplīsis ekrāns / displeja problēmas',
    text: 'iPhone ekrāns saplīsa, plaisas, nereaģē uz pieskārienu',
    icon: 'screen',
    serviceHref: '/iphone-remonts/displeja-maina',
    id: 'displeja-problemas',
  },
  {
    q: 'Barošanas un uzlādes problēmas',
    text: 'Ātri izlādējas, neslēdzas, neuzlādējas',
    icon: 'battery',
    serviceHref: '/iphone-remonts/baterijas-maina', // or /iphone-remonts/uzlades-ligzda
    id: 'barosanas-problemas',
  },
  {
    q: 'Kameras problēmas',
    text: 'Kamera nestrādā, miglains attēls',
    icon: 'camera',
    serviceHref: '/iphone-remonts/kamera',
    id: 'kamera-problemas',
  },
  {
    q: 'Mitruma / ūdens bojājumi',
    text: 'Telefons iekritis ūdenī, pēc tam neieslēdzas',
    icon: 'water',
    serviceHref: '/iphone-remonts/udens-bojajumi',
    id: 'udens-bojajumi',
  },
];

// FAQ grouped
const FAQ_GROUPS = [
  {
    label: 'Par remontu un garantiju',
    items: [
      { q: 'Cik ilgi ilgst iPhone displeja maiņa?', a: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.' },
      { q: 'Vai mani dati saglabāsies?', a: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.' },
      { q: 'Vai detaļām ir garantija?', a: 'Jā, gan detaļām, gan darbam.' },
      { q: 'Vai pieejamas oriģinālas detaļas?', a: 'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.' },
      { q: 'Vai varu saņemt aptuveno cenu pirms remonta?', a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.' },
      { q: 'Vai strādājat visā Latvijā?', a: 'Jā; tuvāko servisu atradīsi sadaļā “Servisa centri”.' },
    ],
  },
  {
    label: 'Par biežākajām problēmām',
    items: [
      { q: 'Saplīsis ekrāns / displeja problēmas', a: 'Iespējamie cēloņi: plaisas, “ghost touch”, nereaģē skāriens. Ko darām iLab: displeja vai stikla maiņa atkarībā no modeļa. Aptuvenais remonta laiks: Tajā pašā dienā. Bezmaksas diagnostika.', id: 'displeja-problemas' },
      { q: 'Barošanas un uzlādes problēmas', a: 'Iespējamie cēloņi: akumulatora nolietojums, bojāta uzlādes ligzda vai kabelis. Ko darām iLab: diagnostika, akumulatora vai ligzdas maiņa. Aptuvenais remonta laiks: līdz 120 min. Bezmaksas diagnostika.', id: 'barosanas-problemas' },
      { q: 'Kameras problēmas', a: 'Iespējamie cēloņi: netīrumi, mitruma bojājumi, moduļa kļūme. Ko darām iLab: moduļa tīrīšana vai maiņa, hermetizācijas pārbaude. Aptuvenais remonta laiks: līdz 120 min. Bezmaksas diagnostika.', id: 'kamera-problemas' },
      { q: 'Mitruma / ūdens bojājumi', a: 'Iespējamie cēloņi: oksidācija uz kontaktiem vai īssavienojumi moduļos. Ko darām iLab: pilna diagnostika un tīrīšana, bojāto moduļu maiņa, ja iespējams. Aptuvenais remonta laiks: Tajā pašā dienā. Bezmaksas diagnostika.', id: 'udens-bojajumi' },
    ],
  },
];

const FLAT_FAQ = FAQ_GROUPS.flatMap((g) => g.items);

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FLAT_FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const howToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Kā notiek iPhone remonts',
  description: 'Process iLab servisa centros: diagnostika, cena un termiņš, remonts, pārbaude, garantija.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
    { '@type': 'HowToStep', position: 2, name: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
    { '@type': 'HowToStep', position: 3, name: 'Remonts', text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.' },
    { '@type': 'HowToStep', position: 4, name: 'Pārbaude', text: 'Pēc remonta testējam visu funkcionalitāti un drošību.' },
    { '@type': 'HowToStep', position: 5, name: 'Garantija', text: '90 dienu garantija un ieteikumi turpmākai lietošanai.' },
  ],
};

const breadcrumbsLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'iPhone remonts', item: `${ORIGIN}/iphone-remonts/` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}/iphone-remonts#service`,
  serviceType: 'iPhone remonts',
  areaServed: { '@type': 'Country', name: 'Latvia' },
  provider: { '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/iphone-remonts/`,
  name: 'iPhone remonts',
  description:
    'iPhone displeja un baterijas maiņa, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, garantija.',
};

export default function IphoneRemontsPage() {
  const baseHref = '/iphone-remonts';

  return (
    <>
      {/* JSON-LD */}
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>
      <Script id="howto-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(howToLd)}
      </Script>
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      {/* INTRO */}
      <section className={s.section} aria-labelledby="iphone-intro-h2">
        <div className={s.container}>
          <h2 id="iphone-intro-h2" className={s.h2}>iPhone remonts — ātri un droši</h2>
          <p className={s.paragraph}>
            Ātru un uzticamu iPhone remontu veicam ikdienā — displejs, baterija, uzlādes ligzda, kamera un citi bojājumi.
            Cenas saskaņojam pirms darba uzsākšanas, biežākos darbus paveicam tajā pašā dienā.
            Ja nezini precīzu modeli, izvēlies no saraksta zemāk vai sazinies ar meistaru.
          </p>
        </div>
      </section>

      {/* SERIES GRID */}
      <section id="iphone-modeli" className={`${s.section} ${s.anchorTarget}`} aria-labelledby="iphone-modeli-h2">
        <div className={s.container}>
          <h2 id="iphone-modeli-h2" className={s.h2}>
            {cat?.sections?.modelGrid?.heading ?? 'Izvēlies savu iPhone modeli'}
          </h2>
          <p className={s.intro}>
            {cat?.sections?.modelGrid?.intro ?? 'Atrast modeli ir viegli — meklē pēc nosaukuma vai pārlūko sērijas.'}
          </p>

          <SeriesGrid
            devices={devicesAll}
            baseHref={baseHref}
            brandSlug="apple"
            categorySlug="telefonu-remonts"
            initialLimit={4}
            autoExpandOnSearch={true}
          />
        </div>
      </section>

      {/* GUIDE */}
      {cat?.show?.guide !== false && cat?.sections?.guide && (
        <section className={s.section} aria-labelledby="guide-h2">
          <div className={s.container}>
            <h2 id="guide-h2" className={s.h2}>{cat.sections.guide.heading}</h2>
            <div className={s.guide}>
              {cat.sections.guide.parts.map((p) => (
                <article key={p.title} className={s.guidePart}>
                  <h3 className={s.h3}>{p.title}</h3>
                  <p className={s.paragraph}>{p.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CommonIssues — mini cards */}
      <section className={s.section} aria-labelledby="issues-preview-h2">
        <div className={s.container}>
          <CommonIssues
            id="issues-preview"
            title="Biežāk sastopamās problēmas"
            items={ISSUES_PREVIEW}
            faqId="iphone-faq"
            maxItems={4}
            headingLevel={2}
          />
        </div>
      </section>

      {/* Process */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek remonts"
            steps={[
              { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
              { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
              { title: 'Remonts', text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.' },
              { title: 'Pārbaude', text: 'Pēc remonta testējam visu funkcionalitāti un drošību.' },
              { title: 'Garantija', text: '90 dienu garantija un ieteikumi turpmākai lietošanai.' },
            ]}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      {/* Why */}
      <section className={s.section}>
        <Why />
      </section>

      {/* FAQ (grouped) */}
      <section className={s.section} aria-labelledby="iphone-faq-h2">
        <div className={s.container}>
          <Faq
            id="iphone-faq"
            title="Biežāk uzdotie jautājumi"
            groups={FAQ_GROUPS}
            headingLevel={2}
            variant="accordion"
          />
        </div>
      </section>

      {/* ConvertBand */}
      <section className={s.section}>
        <ConvertBand />
      </section>
    </>
  );
}
