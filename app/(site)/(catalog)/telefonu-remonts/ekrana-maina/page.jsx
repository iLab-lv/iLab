import Script from 'next/script';
import Link from 'next/link';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';

import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';

import s from '@styles/Catalog.module.scss';

// -------------------------------------------------
// META
// -------------------------------------------------
const ORIGIN = 'https://www.ilab.lv';

export const metadata = {
  title: 'Telefonu ekrāna (displeja) maiņa Rīgā | iLab',
  description:
    'Ātra un kvalitatīva telefonu ekrāna (displeja) maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM detaļas. Bieži tajā pašā dienā.',
  alternates: { canonical: '/telefonu-remonts/ekrana-mainja' },
};

// -------------------------------------------------
// FAQ
// -------------------------------------------------
const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst telefona ekrāna maiņa?',
    a: 'Parasti 1–3 stundas atkarībā no modeļa un noslodzes. Populāriem modeļiem bieži tajā pašā dienā.',
  },
  {
    q: 'Vai mani dati paliks neskarti?',
    a: 'Jā — ekrāna maiņa neietekmē jūsu datus. Drošībai tomēr iesakām veikt dublējumu.',
  },
  {
    q: 'Kāda ir atšķirība starp oriģinālu un OEM ekrānu?',
    a: 'Oriģināls nodrošina maksimālu saderību un kvalitāti (krāsas, spilgtumu). Augstas kvalitātes OEM ir ekonomiskāks risinājums ar ļoti labu ikdienas pieredzi.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienas gan detaļai, gan paveiktajam darbam.',
  },
  {
    q: 'Kā saprast, ka nepieciešama ekrāna maiņa?',
    a: 'Plīsumi, tumši plankumi, līnijas bildē, mirgošana vai nereaģējošs skāriens norāda uz bojātu displeju.',
  },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbsLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'Telefonu remonts', item: `${ORIGIN}/telefonu-remonts/` },
    { '@type': 'ListItem', position: 3, name: 'Ekrāna (displeja) maiņa', item: `${ORIGIN}/telefonu-remonts/ekrana-mainja` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Telefonu ekrāna (displeja) maiņa',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@type': 'LocalBusiness', name: 'iLab', '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/telefonu-remonts/ekrana-mainja`,
  name: 'Telefonu ekrāna (displeja) maiņa Rīgā',
  description:
    'Telefonu displeja (ekrāna) maiņa Rīgā: bezmaksas diagnostika, oriģinālas vai OEM detaļas, 90 dienu garantija. Bieži tajā pašā dienā.',
};

// -------------------------------------------------
// PAGE COMPONENT
// -------------------------------------------------
export default function TelefonuEkranaMainaPage({ searchParams }) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;

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

      {/* HERO */}
      <DeviceHero
        image="/images/categories/telefonu_remonts.webp" // swap to a dedicated service image if you have one
        alt="Telefonu ekrāna (displeja) maiņa Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Ātra un kvalitatīva telefonu ekrāna (displeja) maiņa Rīgā</strong> — plaisas, plankumi vai skāriena problēmas novēršam bieži tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam iLab servisā.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>Telefonu ekrāna (displeja) maiņa Rīgā</h1>
          <p className={s.paragraph}>
            Ja ekrāns ir saplīsis, parādās plankumi vai nereaģē skāriens — visticamāk nepieciešama
            <strong> ekrāna (displeja) maiņa</strong>. iLab meistari Rīgā veic ātru un drošu nomaiņu, izmantojot
            <strong> oriģinālas vai OEM detaļas</strong>. Pirms darba uzsākšanas veicam
            <strong> bezmaksas diagnostiku</strong>, lai pārliecinātos, ka vaina ir tieši displejā.
          </p>
          <p className={s.paragraph}>
            Pēc nomaiņas pārbaudām skārienjutību, krāsu atbilstību un kopējo attēla kvalitāti.
            Populāros modeļus parasti salabojam <strong>1–3 stundu laikā</strong>.
            Visam veicamajam darbam un detaļām ir <strong>90 dienu garantija</strong>.
          </p>
          {selectedModel && (
            <p className={s.note}>
              Atlasīts modelis: <strong>{decodeURIComponent(selectedModel)}</strong>. Ritiniet uz
              <a href="#cenas"> cenām</a>.
            </p>
          )}
        </div>
      </section>

      {/* PRICE LIST (ServicePricelist) */}
      <ServicePricelist
        devices={devices}
        pricing={devicePricing}
        // brandSlug intentionally omitted for a generic phones page.
        categorySlug="telefonu-remonts"
        serviceIds={['display-original', 'display-oled', 'display-incell']}
        title="Ekrāna (displeja) maiņas cenas pēc modeļa"
        intro="Izvēlies sava tālruņa modeli, lai redzētu ekrāna maiņas cenu. Lielāko daļu remontu paveicam tajā pašā dienā."
        initialLimit={8}
        allModelsHref="/telefonu-remonts#brand-list"
        cta={{ label: 'Pieteikties remontam', href: '#pieteikties' }}
        className={s.section}
      />

      {/* PROCESS */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek remonts"
            steps={[
              { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
              { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
              { title: 'Remonts', text: 'Nomaiņu veic sertificēti meistari ar kvalitatīvām detaļām.' },
              { title: 'Pārbaude', text: 'Pārbaudām skārienu, krāsas un attēla kvalitāti.' },
              { title: 'Garantija', text: '90 dienu garantija un ieteikumi turpmākai lietošanai.' },
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

      {/* BOOKING / CTA */}
      <section id="pieteikties" className={s.section} aria-label="Pieteikties remontam">
        <div className={s.container}>
          <ConvertBand />
        </div>
      </section>
    </>
  );
}
