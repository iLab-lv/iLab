// app/(site)/(catalog)/iphone-remonts/page.jsx
import Script from 'next/script';
import Link from 'next/link';
import categoryContent from '@/data/categoryContent';
import devicesAll from '@/data/devices';

// sections/components
import ModelGrid from '../../components/model-grid/ModelGrid';
import Faq from '../../sections/faq/Faq';
import Why from '../../sections/why/Why';
import ConvertBand from '../../sections/home/ConvertBand';

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

      {/* 2) POPULAR REPAIRS / SERVICES — BEFORE grid */}
      <section className={s.section} aria-labelledby="popular-repairs-h2">
        <div className={s.container}>
          <h2 id="popular-repairs-h2" className={s.h2}>Populārākie iPhone remonti</h2>
          <ul className={s.list}>
            {POPULAR_REPAIRS.map((it) => (
              <li key={it.title}>
                {it.href ? (
                  <>
                    <strong><Link href={it.href}>{it.title}</Link></strong> — {it.text}
                  </>
                ) : (
                  <>
                    <strong>{it.title}</strong> — {it.text}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

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

      {/* 5) WHY (reused from home) */}
      <Why />

      {/* 6) FAQ (shared section) */}
      <Faq
        id="iphone-faq"
        title="Biežāk uzdotie jautājumi"
        items={IPHONE_FAQ_ITEMS}
        headingLevel={2}
        variant="accordion"
      />

      {/* 7) ConvertBand (same as home) */}
      <ConvertBand />
    </>
  );
}
