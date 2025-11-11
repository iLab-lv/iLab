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
  title: 'iPhone uzlādes ligzdas maiņa Rīgā | iLab',
  description:
    'Ātra un profesionāla iPhone uzlādes ligzdas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija. Risinām “nelādējas”, “jākustina vads”, “nereaģē uzlāde” u.c. problēmas, bieži tajā pašā dienā.',
  alternates: { canonical: '/iphone-remonts/uzlades-ligzdas-maina' },
};

// -------------------------------------------------
// FAQ
// -------------------------------------------------
const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst uzlādes ligzdas maiņa?',
    a: 'Parasti 60–120 minūtes atkarībā no modeļa un noslodzes. Dažos gadījumos pietiek ar tīrīšanu, kas ir ātrāka.',
  },
  {
    q: 'Kā zināt, vai vajag maiņu vai pietiks ar tīrīšanu?',
    a: 'Bezmaksas diagnostikas laikā pārbaudām pieslēgumu, kontaktus un uzlādes ķēdi. Bieži lienos savācās putekļi vai oksidācija — ja pietiek ar tīrīšanu, par maiņu nemaksāsiet.',
  },
  {
    q: 'Vai mani dati paliks neskarti?',
    a: 'Jā — uzlādes ligzdas maiņa neskars datus. Drošībai iesakām izveidot dublējumu pirms remonta.',
  },
  {
    q: 'Ko darīt, ja telefons nelādējas arī pēc ligzdas nomaiņas?',
    a: 'Diagnostikas laikā pārbaudām arī bateriju, uzlādes portu, kabeļus un barošanas ķēdi uz plates. Ja problēma ir citur, informēsim par risinājumu un izmaksām.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienas gan detaļai, gan veiktajam darbam.',
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
    { '@type': 'ListItem', position: 3, name: 'Uzlādes ligzdas maiņa', item: `${ORIGIN}/iphone-remonts/uzlades-ligzdas-maina` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'iPhone uzlādes ligzdas maiņa',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@type': 'LocalBusiness', name: 'iLab', '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/iphone-remonts/uzlades-ligzdas-maina`,
  name: 'iPhone uzlādes ligzdas maiņa Rīgā',
  description:
    'iPhone uzlādes ligzdas maiņa Rīgā: bezmaksas diagnostika, 90 dienu garantija, risinām nelādējas/oksidācijas/problēmas ar kabeli. Bieži tajā pašā dienā.',
};

// -------------------------------------------------
// PAGE COMPONENT
// -------------------------------------------------
export default function IphoneUzladesLigzdasMainaPage({ searchParams }) {
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
        image="/images/categories/uzlades_ligzda_remonts.webp" // pielāgo, ja ceļš atšķiras
        alt="iPhone uzlādes ligzdas maiņa Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>iPhone nelādējas, jākustina vads vai ports ir vaļīgs?</strong> Veicam ātru un drošu <strong>uzlādes ligzdas maiņu Rīgā</strong>, nepieciešamības gadījumā — profesionālu tīrīšanu un oksidācijas novēršanu. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>iPhone uzlādes ligzdas maiņa Rīgā</h1>
          <p className={s.paragraph}>
            Ja iPhone nelādējas, pazūd savienojums, jāpieliec kabelis noteiktā leņķī vai ports izskatās netīrs,
            <strong> visticamāk nepieciešama uzlādes ligzdas tīrīšana vai maiņa</strong>. iLab meistari veic
            <strong> diagnostiku</strong>, novērš oksidāciju un mehāniskus bojājumus vai uzstāda jaunu ligzdu — atkarībā
            no stāvokļa un modeļa.
          </p>
          <p className={s.paragraph}>
            Pārbaudām arī <strong>kabeli, adapteri, uzlādes ķēdi un bateriju</strong>, lai izslēgtu citus cēloņus.
            Populāros modeļus parasti salabojam <strong>60–120 minūtēs</strong>. Visam darbam un detaļām ir
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
        brandSlug="apple"
        categorySlug="telefonu-remonts"
        serviceIds={['charge-port']} // ← tikai uzlādes ligzda
        title="Uzlādes ligzdas maiņas cenas pēc modeļa"
        intro="Izvēlies savu iPhone modeli, lai redzētu uzlādes ligzdas remonta cenu. Daudzas ierīces salabojam tajā pašā dienā."
        initialLimit={8}
        allModelsHref="/iphone-remonts#iphone-modeli"
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
              { title: 'Diagnostika', text: 'Pārbaudām portu, kontaktus, kabeli, adapteri un uzlādes ķēdi.' },
              { title: 'Tīrīšana vai maiņa', text: 'Noņemam netīrumus/oksidāciju vai uzstādam jaunu ligzdu.' },
              { title: 'Testi', text: 'Pārbaudām uzlādi, datu pārsūtīšanu un mehānisku noturību.' },
              { title: 'Drošība', text: 'Ja nepieciešams, atjaunojam blīvējumu un veicam galīgo pārbaudi.' },
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
            groups={[{ label: 'Uzlāde', items: FAQ_ITEMS }]}
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
