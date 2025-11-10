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
  title: 'Telefonu akumulatora maiņa Rīgā | iLab',
  description:
    'Ātra un kvalitatīva telefonu akumulatora maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM detaļas. Bieži tajā pašā dienā.',
  alternates: { canonical: '/telefonu-remonts/akumulatora-mainja' },
};

// -------------------------------------------------
// FAQ
// -------------------------------------------------
const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst akumulatora maiņa?',
    a: 'Parasti 45–90 minūtes atkarībā no modeļa un noslodzes. Populāros modeļus bieži pabeidzam tajā pašā dienā.',
  },
  {
    q: 'Vai mani dati paliks neskarti?',
    a: 'Jā — akumulatora maiņa neskars jūsu foto, video un lietotnes. Drošībai vienmēr iesakām izveidot dublējumu.',
  },
  {
    q: 'Oriģināls vai OEM akumulators — ar ko atšķiras?',
    a: 'Oriģināls nodrošina maksimālu stabilitāti un kalpošanas laiku. Augstas kvalitātes OEM ir ekonomiska alternatīva ar ļoti labu ikdienas pieredzi.',
  },
  {
    q: 'Vai pēc maiņas būs nepieciešama kalibrācija?',
    a: 'Jā — pēc maiņas veicam kalibrāciju un testus (uzlādes/izlādes stabilitāte, temperatūra), lai viss darbotos korekti.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienu garantija gan detaļai, gan paveiktajam darbam.',
  },
  {
    q: 'Vai telefons saglabā ūdensizturību pēc atvēršanas?',
    a: 'Montējot izmantojam jaunu blīvējumu, tomēr rūpnīcas ūdensizturības klase pēc remonta netiek garantēta.',
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
    { '@type': 'ListItem', position: 3, name: 'Akumulatora maiņa', item: `${ORIGIN}/telefonu-remonts/akumulatora-mainja` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Telefonu akumulatora maiņa',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@type': 'LocalBusiness', name: 'iLab', '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/telefonu-remonts/akumulatora-mainja`,
  name: 'Telefonu akumulatora maiņa Rīgā',
  description:
    'Telefonu akumulatora maiņa Rīgā: bezmaksas diagnostika, oriģinālas vai OEM baterijas, 90 dienu garantija. Bieži tajā pašā dienā.',
};

// -------------------------------------------------
// PAGE COMPONENT
// -------------------------------------------------
export default function TelefonuAkumulatoraMainaPage({ searchParams }) {
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
        image="/images/categories/telefonu_remonts.webp" // swap to a dedicated battery service image if you have one
        alt="Telefonu akumulatora maiņa Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Ātra un droša telefonu akumulatora maiņa Rīgā</strong> — ja tālrunis ātri izlādējas, izslēdzas pie 20% vai lādējas ļoti lēni, palīdzēsim. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam iLab servisā.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>Telefonu akumulatora maiņa Rīgā</h1>
          <p className={s.paragraph}>
            Ja tālrunis <strong>ātri zaudē uzlādi</strong>, <strong>izslēdzas pie 10–20%</strong>, <strong>uzkarst</strong> vai
            <strong> lādējas ļoti lēni</strong>, <strong>visticamāk nepieciešama akumulatora maiņa</strong>. iLab meistari veic
            ātru un kvalitatīvu nomaiņu, izmantojot <strong>oriģinālas vai augstas kvalitātes OEM baterijas</strong>.
            Pirms darba uzsākšanas veicam <strong>bezmaksas diagnostiku</strong>, lai pārliecinātos, ka problēma tiešām ir baterijā.
          </p>
          <p className={s.paragraph}>
            Pēc nomaiņas veicam <strong>kalibrāciju</strong> un pārbaudes — uzlādes/izlādes stabilitāti, temperatūras kontroli un
            programmatūras rādītājus. Populāros modeļus parasti salabojam <strong>45–90 minūtēs</strong>. Visam darbam un detaļām ir
            <strong> 90 dienu garantija</strong>.
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
        // brandSlug intentionally omitted for generic phones
        categorySlug="telefonu-remonts"
        serviceIds={['battery']} // adjust if your pricing keys differ
        title="Akumulatora maiņas cenas pēc modeļa"
        intro="Izvēlies sava tālruņa modeli, lai redzētu akumulatora maiņas cenu. Lielāko daļu remontu paveicam tajā pašā dienā."
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
            title="Kā notiek akumulatora nomaiņa"
            steps={[
              { title: 'Diagnostika', text: 'Pārbaudām baterijas nolietojumu, uzlādes ķēdi un portu.' },
              { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
              { title: 'Nomaiņa', text: 'Uzstādam oriģinālu vai OEM bateriju ar jaunu blīvējumu.' },
              { title: 'Kalibrācija', text: 'Veicam kalibrāciju un testējam autonomiju/uzlādi.' },
              { title: 'Garantija', text: '90 dienu garantija un lietošanas ieteikumi.' },
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
            groups={[{ label: 'Akumulators', items: FAQ_ITEMS }]}
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
