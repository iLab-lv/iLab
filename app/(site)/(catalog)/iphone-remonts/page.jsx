// app/(site)/(catalog)/iphone-remonts/page.jsx
import Script from 'next/script';
import Link from 'next/link';
import categoryContent from '@/data/categoryContent';
import devicesAll from '@/data/devices';
import Services from '@sections/services/Services';
import CommonIssues from '@sections/common-issues/CommonIssues';
import iphoneIssues from '@/data/commonIssues';

// sections/components
import ModelGrid from '@components/model-grid/ModelGrid';
import Process from '@sections/process/Process';  // ← NEW
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import s from './IphoneRemonts.module.scss';

const ORIGIN = 'https://www.ilab.lv';
const cat = categoryContent['iphone-remonts'];

export const metadata = {
  title: cat?.seo?.title ?? 'iPhone remonts | iLab',
  description: cat?.seo?.metaDescription ?? '',
  alternates: { canonical: '/iphone-remonts' },
};

// Popular services (with links to canonical long-tail pages)
const POPULAR_REPAIRS = [
  {
    title: 'Displeja (ekrāna) maiņa',
    href: '/iphone-remonts/displeja-maina',
    text: 'plaisas, tumši plankumi, nereaģē skāriens.',
  },
  {
    title: 'Akumulatora maiņa',
    href: '/iphone-remonts/baterijas-maina',
    text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
  },
  { title: 'Uzlādes ligzdas remonts', text: 'nenoturas kabelis, lēna uzlāde, ātrā uzlāde nestrādā.' },
  { title: 'Kameras remonts', text: 'miglaini attēli, fokusēšanās problēmas.' },
  { title: 'Skaļruņi un mikrofons', text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.' },
  { title: 'Ūdens bojājumi', text: 'diagnostika un atjaunošana, ja tas iespējams.' },
];

// Shared FAQ items (LV)
const IPHONE_FAQ_ITEMS = [
  { q: 'Cik ilgi ilgst iPhone displeja maiņa?', a: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.' },
  { q: 'Vai mani dati saglabāsies?', a: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.' },
  { q: 'Vai detaļām ir garantija?', a: 'Jā, gan detaļām, gan darbam.' },
  { q: 'Vai pieejamas oriģinālas detaļas?', a: 'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.' },
  { q: 'Vai varu saņemt aptuveno cenu pirms remonta?', a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.' },
  { q: 'Vai strādājat visā Latvijā?', a: 'Jā; tuvāko servisu atradīsi sadaļā “Servisa centri”.' },
];

// Process steps (LV)
const PROCESS_STEPS = [
  { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
  { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
  { title: 'Remonts', text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.' },
  { title: 'Pārbaude', text: 'Pēc remonta testējam visu funkcionalitāti un drošību.' },
  { title: 'Garantija', text: '90 dienu garantija un ieteikumi turpmākai lietošanai.' },
];

// Filter Apple phones; exclude iPads by category
function getIphoneDevices(list) {
  const filtered = list.filter(
    (d) => d.brandSlug === 'apple' && d.category === 'telefonu-remonts'
  );
  filtered.sort((a, b) => {
    if (a.popular !== b.popular) return Number(b.popular) - Number(a.popular);
    if (a.year && b.year && a.year !== b.year) return b.year - a.year;
    return a.name.localeCompare(b.name, 'lv');
  });
  return filtered;
}

// JSON-LD (page-level)
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: IPHONE_FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: typeof a === 'string' ? a : '' },
  })),
};

const howToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Kā notiek iPhone remonts',
  description: 'Process iLab servisa centros: diagnostika, cena un termiņš, remonts, pārbaude, garantija.',
  step: PROCESS_STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.text,
  })),
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
  const devices = getIphoneDevices(devicesAll);
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

      {/* 1) SEO preface */}
      <section className={s.preface} aria-labelledby="preface-h2">
        <div className={s.container}>
          <h2 id="preface-h2" className={s.h2}>iPhone remonts — ātri un droši</h2>
          <p className={s.paragraph}>
            Ātru un uzticamu iPhone remontu veicam ikdienā — displejs, baterija, uzlādes ligzda, kamera un citi bojājumi.
            Cenas saskaņojam pirms darba uzsākšanas, biežākos darbus paveicam tajā pašā dienā.
            Ja nezini precīzu modeli, izvēlies no saraksta zemāk vai sazinies ar meistaru.
          </p>
        </div>
      </section>

      <Services
        id="iphone-services"
        title="Populārākie iPhone remonti"
        items={POPULAR_REPAIRS}
        headingLevel={2}
        variant="list"      // or 'cards' if you want the card layout
      />

      {/* 3) MODEL GRID — scroll target for header CTA */}
      <section id="iphone-modeli" className={s.anchorTarget} aria-labelledby="iphone-modeli-h2">
        <div className={s.container}>
          <h2 id="iphone-modeli-h2" className={s.h2}>
            {cat?.sections?.modelGrid?.heading ?? 'Izvēlies savu iPhone modeli'}
          </h2>
          <p className={s.intro}>
            {cat?.sections?.modelGrid?.intro ??
              'Atrast modeli ir viegli — izvēlies no saraksta vai izmanto meklēšanu.'}
          </p>
          <ModelGrid devices={devices} baseHref={baseHref} />
        </div>
      </section>

      {/* 4) GUIDE (from categoryContent; optional) */}
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

      <CommonIssues
        id="problem-fixed"
        title="Ar kādiem jautājumiem visbiežāk pie mums vēršas"
        items={iphoneIssues}
        headingLevel={2}
      />




      {/* 5) PROCESS (reusable) */}
      <Process
        id="process"
        title="Kā notiek remonts"
        steps={PROCESS_STEPS}
        headingLevel={2}
        variant="cards"
      />

      {/* 6) WHY (reused from home) */}
      <Why />

      {/* 7) FAQ (shared section) */}
      <Faq
        id="iphone-faq"
        title="Biežāk uzdotie jautājumi"
        items={IPHONE_FAQ_ITEMS}
        headingLevel={2}
        variant="accordion"
      />

      {/* 8) ConvertBand (same as home) */}
      <ConvertBand />
    </>
  );
}
