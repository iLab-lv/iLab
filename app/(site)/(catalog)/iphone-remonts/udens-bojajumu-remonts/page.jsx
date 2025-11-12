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
  title: 'iPhone ūdens bojājumu remonts Rīgā | iLab',
  description:
    'iPhone ūdens bojājumu diagnostika un remonts Rīgā: tīrīšana, oksidācijas novēršana un bojāto detaļu nomaiņa. Bezmaksas diagnostika un 90 dienu garantija.',
  alternates: { canonical: '/iphone-remonts/udens-bojajumu-remonts' },
};

const FAQ_ITEMS = [
  { q: 'Ko darīt uzreiz pēc saskares ar šķidrumu?', a: 'Izslēdziet ierīci, neuzlādējiet un pēc iespējas ātrāk atnesiet uz servisu.' },
  { q: 'Vai “rīsi” palīdz?', a: 'Rīsi neiztīra oksidāciju un var aizkavēt nepieciešamo remontu. Labāk nekavējoties vērsties servisā.' },
  { q: 'Vai visi ūdens bojājumi ir salabojami?', a: 'Ne vienmēr. Pēc diagnostikas sniegsim precīzu novērtējumu un izmaksas.' },
  { q: 'Cik tas ilgst?', a: 'Primārā tīrīšana parasti 1–2 stundas; sarežģītākos gadījumos ilgāk.' },
  { q: 'Vai ir garantija?', a: 'Jā — 90 dienas uz veiktajiem darbiem un nomainītajām detaļām.' },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const breadcrumbsLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'iPhone remonts', item: `${ORIGIN}/iphone-remonts/` },
    { '@type': 'ListItem', position: 3, name: 'Ūdens bojājumu remonts', item: `${ORIGIN}/iphone-remonts/udens-bojajumu-remonts` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'iPhone ūdens bojājumu remonts',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@type': 'LocalBusiness', name: 'iLab', '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/iphone-remonts/udens-bojajumu-remonts`,
  name: 'iPhone ūdens bojājumu remonts Rīgā',
  description: 'iPhone ūdens bojājumu diagnostika un atjaunošana: tīrīšana, oksidācijas novēršana un komponentu maiņa ar garantiju.',
};

export default function IphoneUdensBojajumuRemontsPage({ searchParams }) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(faqLd)}</Script>
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(breadcrumbsLd)}</Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(serviceLd)}</Script>

      <DeviceHero
        image="/images/categories/udens_bojajumi.webp"
        alt="iPhone ūdens bojājumu remonts Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Saskāries ar mitrumu vai ūdens bojājumiem?</strong> Veicam <strong>iPhone tīrīšanu un oksidācijas novēršanu</strong>, kā arī bojāto detaļu nomaiņu. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`}
      />

      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>iPhone ūdens bojājumu remonts Rīgā</h1>

          <p className={s.paragraph}>
            <strong>Samirka iPhone — kafija, jūra, baseins vai vanna?</strong> Mūsu sertificētie meistari ar
            ļoti augstu izdošanās procentu atjauno ūdens bojātus iPhone. Ja ierīci atnes tajā pašā dienā,
            <strong> vairāk nekā 90% gadījumu</strong> to iespējams salabot.
          </p>

          <p className={s.paragraph}>
            Kāpēc šķidrums ir bīstams? Uz sistēmplates veidojas <strong>korozija un oksidācija</strong> —
            pazeminās pretestība, rodas īssavienojumi un bojājas lodējumi. <strong>Sāls un hlors</strong> šo
            procesu strauji paātrina (jūras ūdens, baseins), savukārt saldūdens parasti ir saudzīgāks.
            Jo ātrāk ierīci izslēdz un nogādā servisā, jo <strong>lielāka iespēja saglabāt detaļas</strong>.
          </p>

          <p className={s.paragraph}>
            Ja ierīce samirka, rīkojieties nekavējoties — tas tieši ietekmē remonta izmaksas un gala rezultātu.
          </p>

          <ul>
            <li><strong>Neieslēdziet</strong> un <strong>neuzlādējiet</strong> ierīci.</li>
            <li>Noslaukiet sausu; <em>rīsus neizmantojiet</em> — tie neaptur oksidāciju.</li>
            <li>
              Atnesiet pēc iespējas ātrāk:
              <a href="#cenas"> skatīt cenas</a> vai <a href="/pieraksties">pieteikt remontu</a>.
            </li>
          </ul>

          {selectedModel && (
            <p className={s.note}>
              Atlasīts modelis: <strong>{decodeURIComponent(selectedModel)}</strong>. Ritiniet uz
              <a href="#cenas"> cenām</a>.
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
          intro="Izvēlies savu iPhone modeli, lai redzētu ūdens bojājumu remonta izmaksas. Remonts atkarīgs no bojājuma apmēra un nepieciešamajām detaļām."
          initialLimit={8}
          allModelsHref="/iphone-remonts#iphone-modeli"
          cta={{ label: 'Pieteikties remontam', href: '/pieraksties' }}
          className={s.section}
        />
      </section>

      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek remonts"
            steps={[
              { title: 'Diagnostika', text: 'Atveram ierīci, novērtējam oksidācijas apmēru un bojājumus.' },
              { title: 'Tīrīšana', text: 'Profesionāla tīrīšana un žāvēšana, atjaunojam savienojumus.' },
              { title: 'Komponenti', text: 'Pēc vajadzības mainām bateriju, uzlādes portu, kameras u.c. modulīšus.' },
              { title: 'Testi', text: 'Pārbaudām uzlādi, skaņu, kameras, tīklu savienojumus un sensorus.' },
              { title: 'Garantija', text: '90 dienu garantija veiktajiem darbiem un detaļām.' },
            ]}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      <section className={s.section}><Why /></section>

      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq id="faq" title="Biežāk uzdotie jautājumi" groups={[{ label: 'Ūdens bojājumi', items: FAQ_ITEMS }]} headingLevel={2} variant="accordion" />
        </div>
      </section>

      <section id="pieteikties" className={s.section} aria-label="Pieteikties remontam">
        <div className={s.container}>
          <ConvertBand />
        </div>
      </section>
    </>
  );
}
