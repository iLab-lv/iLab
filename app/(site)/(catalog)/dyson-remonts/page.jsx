// app/(site)/(catalog)/dyson-remonts/page.jsx
import Script from 'next/script';

import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import CommonIssues from '@sections/common-issues/CommonIssues';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import DeviceHero from '@sections/device-hero/DeviceHero';

import s from '@styles/Catalog.module.scss';

import {
  LuCog,
  LuFilter,
  LuSparkles,
  LuWrench,
} from 'react-icons/lu';

const ORIGIN = 'https://www.ilab.lv';

// =============================
// Metadata
// =============================
export const metadata = {
  title: 'Dyson remonts Rīgā | iLab',
  description:
    'Dyson putekļsūcēju remonts Rīgā — motora un baterijas maiņa, filtru un blīvējumu nomaiņa, tīrīšana un diagnostika, mehānisku bojājumu labošana. Ātra diagnostika un 90 dienu garantija.',
  alternates: { canonical: '/dyson-remonts' },
};

// =============================
// FAQ + CommonIssues content
// =============================

const ISSUES_PREVIEW = [
  {
    q: 'Vāja sūkšana',
    text: 'Samazināta jauda, aizsērējuši filtri vai gaisa noplūdes.',
    icon: 'filter',
    serviceHref: '#dyson-services',
    id: 'vaja-suksana',
  },
  {
    q: 'Pārkaršana / izslēdzas',
    text: 'Aizsardzība pārkaršanas dēļ, motora/kanālu piesārņojums.',
    icon: 'sparkles',
    serviceHref: '#dyson-services',
    id: 'parkarsana',
  },
  {
    q: 'Īss baterijas darbalaiks',
    text: 'Nolietota baterija, lādēšanas vai kontrolleru problēmas.',
    icon: 'cog',
    serviceHref: '#dyson-services',
    id: 'baterijas-laiks',
  },
  {
    q: 'Skaļas/neritīgas skaņas',
    text: 'Mehāniski bojājumi, gultņu vai turbīnas nolietojums.',
    icon: 'wrench',
    serviceHref: '#dyson-services',
    id: 'skanas',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst Dyson diagnostika un remonts?',
    a: 'Ātrā diagnostika parasti tajā pašā dienā. Remonta ilgums atkarīgs no bojājuma un detaļu pieejamības — populāros darbus bieži paveicam 1–3 dienās.',
  },
  {
    q: 'Vai izmantojat oriģinālās vai OEM detaļas?',
    a: 'Izmantojam oriģinālās vai augstas kvalitātes OEM detaļas. Par izvēli vienojamies pirms remonta.',
  },
  {
    q: 'Vai pēc tīrīšanas var uzlabot sūkšanas jaudu?',
    a: 'Jā. Dziļā tīrīšana, filtru nomaiņa un blīvējumu atjaunošana bieži būtiski uzlabo jaudu un samazina pārkaršanu.',
  },
  {
    q: 'Vai darbam ir garantija?',
    a: 'Jā, sniedzam 90 dienu garantiju gan darbam, gan mainītajām detaļām.',
  },
  {
    q: 'Vai pieņemat dažādus Dyson modeļus (V7, V8, V10, V11, V15 u.c.)?',
    a: 'Jā, strādājam ar populārajām Dyson bezvadu līnijām un citiem modeļiem. Ja rodas jautājumi, sazinieties — pārbaudīsim pēc sērijas numura.',
  },
];

const FLAT_FAQ = FAQ_ITEMS;

// JSON-LD
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
  name: 'Kā notiek Dyson remonts',
  description:
    'Process iLab servisa centros Rīgā: diagnostika, cena un termiņš, remonts, pārbaude, garantija.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
    { '@type': 'HowToStep', position: 2, name: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
    { '@type': 'HowToStep', position: 3, name: 'Remonts', text: 'Veicam tīrīšanu, detaļu nomaiņu un testus atbilstoši ražotāja prasībām.' },
    { '@type': 'HowToStep', position: 4, name: 'Pārbaude', text: 'Pēc remonta testējam sūkšanas jaudu, temperatūru un darbības stabilitāti.' },
    { '@type': 'HowToStep', position: 5, name: 'Garantija', text: '90 dienu garantija un uzturēšanas ieteikumi.' },
  ],
};

const breadcrumbsLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'Dyson remonts', item: `${ORIGIN}/dyson-remonts/` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}/dyson-remonts#service`,
  serviceType: 'Dyson remonts Rīgā',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/dyson-remonts/`,
  name: 'Dyson remonts Rīgā',
  description:
    'Dyson remonts Rīgā: motora un baterijas maiņa, filtri un blīvējumi, dziļā tīrīšana un diagnostika, mehānisku bojājumu labošana.',
};

export default function DysonRemontsPage() {
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
        image="/images/categories/dyson_remonts.webp"
        alt="Dyson remonts Rīgā"
        focal="right"
        className="category"
        bodyHtml={`<p><strong>Ātrs un drošs Dyson remonts Rīgā</strong> — tīrīšana, motora un baterijas maiņa, filtru un blīvējumu nomaiņa. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam.</p>`}
      />

      {/* INTRO */}
      <section className={s.section} aria-labelledby="dyson-intro-h2">
        <div className={s.container}>
          <h2 id="dyson-intro-h2" className={s.h2}>Dyson remonts Rīgā — ko mēs darām</h2>
          <p className={s.paragraph}>
            Veicam pilna spektra <strong>Dyson remontu</strong> — no <strong>dziļās tīrīšanas un diagnostikas</strong> līdz
            <strong> motora un baterijas maiņai</strong>, kā arī <strong>filtru un blīvējumu nomaiņai</strong> un
            <strong> mehānisku bojājumu labojumiem</strong>. Pirms darba uzsākšanas nodrošinām <strong>bezmaksas diagnostiku</strong> un
            precīzu izmaksu/termiņa saskaņošanu. Izmantojam <strong>oriģinālās vai augstas kvalitātes OEM detaļas</strong> un sniedzam
            <strong> 90 dienu garantiju</strong>.
          </p>
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section className={s.section} aria-labelledby="dyson-services-h2">
        <div className={s.container}>
          <Services
            id="dyson-services"
            title="Populārākie Dyson remonti"
            items={[
              {
                title: 'Motora un baterijas maiņa',
                text: 'jaudas kritums, pārkaršana, īss darbalaiks.',
                icon: LuCog,
                href: '#dyson-services',
              },
              {
                title: 'Filtru un blīvējumu nomaiņa',
                text: 'vāja sūkšana, gaisa noplūdes, aizsērējumi.',
                icon: LuFilter,
                href: '#dyson-services',
              },
              {
                title: 'Tīrīšana un diagnostika',
                text: 'dziļā tīrīšana, kanālu atbrīvošana, pārbaudes.',
                icon: LuSparkles,
                href: '#dyson-services',
              },
              {
                title: 'Mehānisku bojājumu labošana',
                text: 'korpusa, savienojumu un kustīgo daļu remonts.',
                icon: LuWrench,
                href: '#dyson-services',
              },
            ]}
          />
        </div>
      </section>

      {/* ISSUES */}
      <section className={s.section} aria-labelledby="dyson-issues-h2">
        <div className={s.container}>
          <CommonIssues
            id="dyson-issues"
            title="Biežāk sastopamās problēmas"
            items={ISSUES_PREVIEW}
            faqId="dyson-faq"
            maxItems={4}
            headingLevel={2}
          />
        </div>
      </section>

      {/* PROCESS */}
      <section className={s.section} aria-labelledby="dyson-process-h2">
        <div className={s.container}>
          <Process
            id="dyson-process"
            title="Kā notiek remonts"
            steps={[
              { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
              { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
              { title: 'Remonts', text: 'Veicam tīrīšanu, detaļu nomaiņu un testus atbilstoši prasībām.' },
              { title: 'Pārbaude', text: 'Pārbaudām sūkšanas jaudu, temperatūru un darbības stabilitāti.' },
              { title: 'Garantija', text: '90 dienu garantija un uzturēšanas ieteikumi.' },
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
      <section className={s.section} aria-labelledby="dyson-faq-h2">
        <div className={s.container}>
          <Faq
            id="dyson-faq"
            title="Biežāk uzdotie jautājumi"
            items={FAQ_ITEMS}
            variant="accordion"
            headingLevel={2}
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
