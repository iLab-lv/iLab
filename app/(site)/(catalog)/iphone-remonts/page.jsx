// app/(site)/(catalog)/iphone-remonts/page.jsx
import Script from 'next/script';

import categoryContent from '@/data/categoryContent';
import devicesAll from '@/data/devices';

import SeriesGrid from '@components/model-grid/SeriesGrid';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import CommonIssues from '@sections/common-issues/CommonIssues';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import DeviceHero from '@sections/device-hero/DeviceHero';
import Guide from '@sections/guide/Guide';


import s from '@styles/Catalog.module.scss';

import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

const ORIGIN = 'https://www.ilab.lv';
const cat = categoryContent['iphone-remonts'];

export const metadata = {
  title: cat?.seo?.title ?? 'iPhone remonts Rīgā | iLab',
  description:
    cat?.seo?.metaDescription ??
    'iPhone remonts Rīgā — displeja, baterijas, kameras un uzlādes ligzdas maiņa, ūdens bojājumu novēršana. Ātra diagnostika, skaidras cenas un 90 dienu garantija iLab servisā Rīgā.',
  alternates: { canonical: '/iphone-remonts' },
};

// =============================
// FAQ + CommonIssues content
// =============================

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
    serviceHref: '/iphone-remonts/baterijas-maina',
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

const FAQ_GROUPS = [
  {
    label: 'Par remontu un garantiju',
    items: [
      { q: 'Cik ilgi ilgst iPhone displeja maiņa?', a: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.' },
      { q: 'Vai mani dati saglabāsies?', a: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.' },
      { q: 'Vai detaļām ir garantija?', a: 'Jā, gan detaļām, gan darbam.' },
      { q: 'Vai pieejamas oriģinālas detaļas?', a: 'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.' },
      { q: 'Kur atrodas jūsu serviss?', a: 'iLab servisa centri atrodas Rīgā — T/C Domina Shopping un T/C Spice Home.' },
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
  description: 'Process iLab servisa centros Rīgā: diagnostika, cena un termiņš, remonts, pārbaude, garantija.',
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
    { '@type': 'ListItem', position: 2, name: 'iPhone remonts Rīgā', item: `${ORIGIN}/iphone-remonts/` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}/iphone-remonts#service`,
  serviceType: 'iPhone remonts Rīgā',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/iphone-remonts/`,
  name: 'iPhone remonts Rīgā',
  description:
    'iPhone remonts Rīgā: displeja un baterijas maiņa, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, skaidras cenas un 90 dienu garantija.',
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

      {/* HERO */}
      <DeviceHero
        image="/images/categories/iphone_remonts.png"
        alt="iPhone remonts Rīgā"
        focal="right"
        className="category"
        bodyHtml={`<p><strong>Ātrs un drošs iPhone remonts Rīgā</strong> — displeja, baterijas un kameras maiņa tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam.</p>`}
      />

      {/* INTRO */}
      <section className={s.section} aria-labelledby="iphone-intro-h2">
        <div className={s.container}>
          <h2 id="iphone-intro-h2" className={s.h2}>iPhone remonts Rīgā — ko mēs darām</h2>
          <p className={s.paragraph}>
            Veicam pilna spektra <strong>iPhone remontu Rīgā</strong> — sākot ar <strong>ekrāna maiņu</strong> un <strong>baterijas nomaiņu</strong>, līdz <strong>uzlādes ligzdas</strong> un <strong>kameras remontam</strong>, kā arī <strong>ūdens bojājumu</strong> novēršanai. Pirms darba uzsākšanas nodrošinām <strong>bezmaksas diagnostiku</strong> un saskaņojam precīzu cenu un izpildes laiku. Biežākos remontdarbus paveicam tajā pašā dienā. Izmantojam <strong>oriģinālās vai augstas kvalitātes OEM detaļas</strong> un sniedzam <strong>90 dienu garantiju</strong> katram remontam.
          </p>
        </div>
      </section>


      {/* POPULAR SERVICES */}
      <section className={s.section} aria-labelledby="iphone-services-h2">
        <div className={s.container}>
          <Services
            id="iphone-services"
            title="Populārākie iPhone remonti"
            items={[
              {
                title: 'Displeja (ekrāna) maiņa',
                text: 'plaisas, tumši plankumi, nereaģē skāriens.',
                icon: LuSmartphone,
                href: '/iphone-remonts/displeja-maina',
              },
              {
                title: 'Akumulatora maiņa',
                text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
                icon: LuBatteryCharging,
                href: '/iphone-remonts/baterijas-maina',
              },
              {
                title: 'Uzlādes ligzda',
                text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
                icon: LuPlugZap,
                href: '/iphone-remonts/uzlades-ligzda',
              },
              {
                title: 'Kamera',
                text: 'miglaini attēli, fokusēšanās problēmas.',
                icon: LuCamera,
                href: '/iphone-remonts/kamera',
              },
              {
                title: 'Skaļruņi/mikrofons',
                text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
                icon: LuVolume2,
                href: '/iphone-remonts/skalruni-mikrofons',
              },
              {
                title: 'Ūdens bojājumi',
                text: 'diagnostika un atjaunošana, ja tas iespējams.',
                icon: LuDroplets,
                href: '/iphone-remonts/udens-bojajumi',
              },
            ]}
          />
        </div>
      </section>

      {/* GUIDE */}
      {cat?.show?.guide !== false && cat?.sections?.guide && (
        <Guide
          id="guide"
          title={cat.sections.guide.heading}
          parts={cat.sections.guide.parts}
          headingLevel={2}
        />
      )}

      {/* MODEL GRID */}
      <section id="iphone-modeli" className={`${s.section} ${s.anchorTarget}`} aria-labelledby="iphone-modeli-h2">
        <div className={s.container}>
          <h2 id="iphone-modeli-h2" className={s.h2}>
            {cat?.sections?.modelGrid?.heading ?? 'Izvēlies savu iPhone modeli'}
          </h2>
          <p id="iphone-modeli-intro" className={s.intro}>
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

     

      {/* PROCESS */}
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

      {/* WHY */}
      <section className={s.section}>
        <Why />
      </section>

      {/* FAQ */}
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

      {/* CONVERT BAND */}
      <section className={s.section}>
        <ConvertBand />
      </section>
    </>
  );
}
