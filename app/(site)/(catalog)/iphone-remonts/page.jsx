// app/(site)/(catalog)/iphone-remonts/page.jsx
import Script from 'next/script';
import Link from 'next/link';

import categoryContent from '@/data/categoryContent';
import devicesAll from '@/data/devices';

import Services from '@sections/services/Services';
import CommonIssues from '@sections/common-issues/CommonIssues';
import iphoneIssues from '@/data/commonIssues';

import SeriesGrid from '@components/model-grid/SeriesGrid';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

// USE SHARED CATALOG STYLES
import s from '@styles/Catalog.module.scss';

const ORIGIN = 'https://www.ilab.lv';
const cat = categoryContent['iphone-remonts'];

export const metadata = {
  title: cat?.seo?.title ?? 'iPhone remonts | iLab',
  description: cat?.seo?.metaDescription ?? '',
  alternates: { canonical: '/iphone-remonts' },
};

// Popular services
const POPULAR_REPAIRS = [
  { title: 'Displeja (ekrāna) maiņa', href: '/iphone-remonts/displeja-maina', text: 'plaisas, tumši plankumi, nereaģē skāriens.' },
  { title: 'Akumulatora maiņa', href: '/iphone-remonts/baterijas-maina', text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.' },
  { title: 'Uzlādes ligzdas remonts', text: 'nenoturas kabelis, lēna uzlāde, ātrā uzlāde nestrādā.' },
  { title: 'Kameras remonts', text: 'miglaini attēli, fokusēšanās problēmas.' },
  { title: 'Skaļruņi un mikrofons', text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.' },
  { title: 'Ūdens bojājumi', text: 'diagnostika un atjaunošana, ja tas iespējams.' },
];

// JSON-LD
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Cik ilgi ilgst iPhone displeja maiņa?', acceptedAnswer: { '@type': 'Answer', text: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.' } },
    { '@type': 'Question', name: 'Vai mani dati saglabāsies?', acceptedAnswer: { '@type': 'Answer', text: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.' } },
    { '@type': 'Question', name: 'Vai detaļām ir garantija?', acceptedAnswer: { '@type': 'Answer', text: 'Jā, gan detaļām, gan darbam.' } },
    { '@type': 'Question', name: 'Vai pieejamas oriģinālas detaļas?', acceptedAnswer: { '@type': 'Answer', text: 'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.' } },
    { '@type': 'Question', name: 'Vai varu saņemt aptuveno cenu pirms remonta?', acceptedAnswer: { '@type': 'Answer', text: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.' } },
    { '@type': 'Question', name: 'Vai strādājat visā Latvijā?', acceptedAnswer: { '@type': 'Answer', text: 'Jā; tuvāko servisu atradīsi sadaļā “Servisa centri”.' } },
  ],
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

      {/* INTRO (H2 + paragraph — restored copy) */}
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

      {/* SERIES GRID (Header CTA targets this) */}
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

      {/* GUIDE (from categoryContent) */}
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

      {/* Common issues */}
      <section className={s.section} aria-labelledby="issues-h2">
        <div className={s.container}>
          <CommonIssues
            id="problem-fixed"
            title="Ar kādiem jautājumiem visbiežāk pie mums vēršas"
            items={iphoneIssues}
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

      {/* Why — full width */}
      <section className={s.section}>
        <Why />
      </section>

      {/* FAQ */}
      <section className={s.section} aria-labelledby="iphone-faq-h2">
        <div className={s.container}>
          <Faq
            id="iphone-faq"
            title="Biežāk uzdotie jautājumi"
            items={[
              { q: 'Cik ilgi ilgst iPhone displeja maiņa?', a: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.' },
              { q: 'Vai mani dati saglabāsies?', a: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.' },
              { q: 'Vai detaļām ir garantija?', a: 'Jā, gan detaļām, gan darbam.' },
              { q: 'Vai pieejamas oriģinālas detaļas?', a: 'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.' },
              { q: 'Vai varu saņemt aptuveno cenu pirms remonta?', a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.' },
              { q: 'Vai strādājat visā Latvijā?', a: 'Jā; tuvāko servisu atradīsi sadaļā “Servisa centri”.' },
            ]}
            headingLevel={2}
            variant="accordion"
          />
        </div>
      </section>

      {/* ConvertBand — full width */}
      <section className={s.section}>
        <ConvertBand />
      </section>
    </>
  );
}
