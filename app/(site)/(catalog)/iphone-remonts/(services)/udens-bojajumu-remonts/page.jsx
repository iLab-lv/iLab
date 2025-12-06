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

const ORIGIN = 'https://www.ilab.lv';

export const metadata = {
  title: 'iPhone ūdens bojājumi — diagnostika un remonts Rīgā | iLab',
  description:
    'iPhone iekrita ūdenī vai pēc mitruma vairs neieslēdzas? Veicam ūdens bojājumu diagnostiku, tīrīšanu un oksidācijas novēršanu. Ātra palīdzība un 90 dienu garantija.',
  alternates: { canonical: '/iphone-remonts/udens-bojajumu-remonts' },
};

// ------------------------------
// FAQ
// ------------------------------

const FAQ_ITEMS = [
  {
    q: 'Ko darīt, ja iPhone iekrita ūdenī?',
    a: 'Nekavējoties izslēdziet telefonu, neuzlādējiet un atnesiet uz diagnostiku. Jo ātrāk ierīce nonāk servisā, jo lielākas iespējas to atjaunot.',
  },
  {
    q: 'Vai palīdz ielikt telefonu rīsos?',
    a: 'Nē. Rīsi neaptur oksidāciju un var radīt vēl lielāku bojājumu. Labākais risinājums ir profesionāla tīrīšana un žāvēšana.',
  },
  {
    q: 'Kādi simptomi norāda uz ūdens bojājumiem?',
    a: 'Neslēdzas, neuzlādējas, pārkarst, darbojas tikai daļēji, kamera vai skaņa nestrādā, ekrānā ir plankumi, parādās “No Service”.',
  },
  {
    q: 'Vai ūdens bojājumi vienmēr ir salabojami?',
    a: 'Atkarīgs no oksidācijas apmēra. Vairāk nekā 90% gadījumu, ja ierīce atvesta tajā pašā dienā, to izdodas atjaunot.',
  },
  {
    q: 'Cik ilgi ilgst ūdens bojājumu remonts?',
    a: 'Sākotnējā tīrīšana 1–2 stundas. Sarežģītos gadījumos nepieciešams ilgāks process vai komponentu maiņa.',
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
    { '@type': 'ListItem', position: 2, name: 'iPhone remonts', item: `${ORIGIN}/iphone-remonts/` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Ūdens bojājumi',
      item: `${ORIGIN}/iphone-remonts/udens-bojajumu-remonts`,
    },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'iPhone ūdens bojājumi — diagnostika un remonts',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@type': 'LocalBusiness', name: 'iLab', '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/iphone-remonts/udens-bojajumu-remonts`,
  name: 'iPhone ūdens bojājumi',
  description:
    'iPhone ūdens bojājumu diagnostika, tīrīšana, oksidācijas novēršana un bojāto detaļu nomaiņa ar garantiju.',
};

export default function IphoneUdensBojajumuRemontsPage({ searchParams }) {
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
        image="/images/categories/udens_bojajumi.webp"
        alt="iPhone ūdens bojājumi"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>IPhone iekrita ūdenī vai pēc mitruma vairs neieslēdzas?</strong> Veicam <strong>ūdens bojājumu diagnostiku un remontu</strong> Rīgā — tīrīšana, oksidācijas novēršana un bojāto detaļu nomaiņa. Jo ātrāk atnesīsi, jo labākas izredzes. <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h2 id="intro-h2" className={s.h1}>iPhone ūdens bojājumi — ko darīt?</h2>

          <p className={s.paragraph}>
            Ja <strong>iPhone iekrita ūdenī</strong>, jūrā, baseinā vai uz tā izlija šķidrums, svarīgi rīkoties
            nekavējoties. Ūdens izraisa <strong>oksidāciju un koroziju</strong>, bojā savienojumus un var radīt
            īssavienojumu. Pareiza rīcība pirmajās minūtēs ievērojami palielina iespēju ierīci pilnībā atjaunot.
          </p>

          <p className={s.paragraph}>
            Mūsu speciālisti visbiežāk saskaras ar situācijām, kad telefons:
          </p>

          <ul className={s.list}>
            <li>vairs <strong>neieslēdzas</strong> pēc ūdens;</li>
            <li><strong>neuzlādējas</strong> vai uzlāde pārtrūkst;</li>
            <li>kļūst <strong>karsts</strong> vai strauji izlādējas;</li>
            <li>pazūd skaņa, kamera vai tīkls;</li>
            <li>ekrānā parādās <strong>plankumi</strong> vai līnijas.</li>
          </ul>

          <p className={s.paragraph}>
            Labā ziņa — ja ierīci atnes tajā pašā dienā, <strong>vairāk nekā 90% gadījumu</strong> izdodas to pilnībā
            atjaunot.
          </p>

          {selectedModel && (
            <p className={s.note}>
              Atlasīts modelis: <strong>{decodeURIComponent(selectedModel)}</strong>.
              Ritiniet uz <a href="#cenas">cenām</a>.
            </p>
          )}
        </div>
      </section>

      {/* PRICE LIST */}
      <section id="cenas" className={s.section} aria-labelledby="prices-h2">
        <ServicePricelist
          devices={devices}
          pricing={devicePricing}
          brandSlug="apple"
          categorySlug="telefonu-remonts"
          serviceIds={['water-damage-clean']}
          title="Ūdens bojājumu remonta cenas pēc modeļa"
          intro="Izvēlies savu iPhone modeli, lai redzētu ūdens bojājumu remonta izmaksas. Izmaksas atkarīgas no bojājuma apmēra un nepieciešamajām detaļām."
          initialLimit={8}
          allModelsHref="/iphone-remonts#iphone-modeli"
          cta={{ label: 'Pieteikties remontam', href: '/pieraksties' }}
          className={s.section}
        />
      </section>

      {/* PROCESS */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek ūdens bojājumu remonts"
            steps={[
              { title: 'Diagnostika', text: 'Atveram ierīci un novērtējam oksidācijas un korozijas apmēru.' },
              { title: 'Tīrīšana un žāvēšana', text: 'Ultraskaņas tīrīšana, kontakti, savienojumu atjaunošana.' },
              { title: 'Bojāto komponentu maiņa', text: 'Pēc vajadzības mainām bateriju, uzlādes portu, kameras u.c.' },
              { title: 'Pilna pārbaude', text: 'Testējam skaņu, kameru, tīklu, sensorus un uzlādi.' },
              { title: 'Garantija', text: '90 dienas gan detaļām, gan darbam.' },
            ]}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      <section className={s.section}><Why /></section>

      {/* FAQ */}
      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq id="faq" title="Biežāk uzdotie jautājumi" groups={[{ label: 'Ūdens bojājumi', items: FAQ_ITEMS }]} headingLevel={2} variant="accordion" />
        </div>
      </section>

      {/* CTA */}
      <section id="pieteikties" className={s.section} aria-label="Pieteikties remontam">
        <div className={s.container}>
          <ConvertBand />
        </div>
      </section>
    </>
  );
}
