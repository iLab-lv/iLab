// app/(site)/(catalog)/iphone-remonts/baterijas-maina/page.jsx

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

// JSON-LD helpers
import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildFaqLdFromPairs,
} from '@/lib/seo/jsonldHelpers';

// -------------------------------------------------
// META
// -------------------------------------------------

export const metadata = {
  title: 'iPhone baterijas maiņa Rīgā | iLab',
  description:
    'Ātra un kvalitatīva iPhone baterijas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM detaļas. Bieži tajā pašā dienā.',
  alternates: { canonical: '/iphone-remonts/baterijas-maina' },
};

// -------------------------------------------------
// FAQ
// -------------------------------------------------
const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst iPhone baterijas maiņa?',
    a: 'Parasti 45–90 minūtes atkarībā no modeļa un noslodzes. Populāros modeļus bieži pabeidzam tajā pašā dienā.',
  },
  {
    q: 'Vai mani dati paliks neskarti?',
    a: 'Jā — baterijas maiņa neskars jūsu foto, video un lietotnes. Drošībai vienmēr iesakām izveidot dublējumu.',
  },
  {
    q: 'Oriģināla vai OEM baterija — ar ko atšķiras?',
    a: 'Oriģināla nodrošina maksimālu kalpošanas laiku un stabilitāti. Augstas kvalitātes OEM ir izdevīga alternatīva ikdienai, saglabājot labu autonomiju.',
  },
  {
    q: 'Vai saglabāsies “Battery Health” rādītāji?',
    a: 'Pēc maiņas veicam kalibrāciju. Dažiem modeļiem iOS var rādīt servisa paziņojumu par baterijas nomaiņu, taču tas neietekmē darbību.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienu garantija gan detaļai, gan paveiktajam darbam.',
  },
  {
    q: 'Vai telefons saglabā ūdensizturību pēc atvēršanas?',
    a: 'Montējot izmantojam jaunu blīvējumu, taču rūpnīcas ūdensizturības klase pēc remonta netiek garantēta.',
  },
];

// JSON-LD objects via helpers
const faqLd = buildFaqLdFromPairs(FAQ_ITEMS);

const breadcrumbsLd = buildBreadcrumbsLd([
  { name: 'Sākums', url: abs('/') },
  { name: 'iPhone remonts', url: abs('/iphone-remonts') },
  { name: 'Baterijas maiņa', url: abs('/iphone-remonts/baterijas-maina') },
]);

const serviceLd = buildServiceLdForCity({
  path: '/iphone-remonts/baterijas-maina',
  name: 'iPhone baterijas maiņa Rīgā',
  serviceType: 'iPhone baterijas maiņa',
  description:
    'iPhone baterijas maiņa Rīgā: bezmaksas diagnostika, oriģinālas vai OEM baterijas, 90 dienu garantija. Bieži tajā pašā dienā.',
  // city + provider locations use defaults (Rīga + all LOCATIONS)
});

// -------------------------------------------------
// PAGE COMPONENT
// -------------------------------------------------
export default function IphoneBaterijasMainaPage({ searchParams }) {
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
        image="/images/categories/baterijas_maina.webp"
        alt="iPhone baterijas maiņa Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Ātra un droša iPhone baterijas maiņa Rīgā</strong> — ja telefons ātri izlādējas, izslēdzas pie 20% vai neuzlādējas, palīdzēsim. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam iLab servisā.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>
            iPhone baterijas maiņa Rīgā
          </h1>
          <p className={s.paragraph}>
            Ja jūsu iPhone ātri zaudē uzlādi, izslēdzas pie augsta procenta, lādējas ļoti lēni vai uzrāda zemu
            <strong> Battery Health</strong> rādītāju, <strong>visticamāk nepieciešama baterijas maiņa</strong>.
            iLab meistari veic ātru un kvalitatīvu nomaiņu, izmantojot
            <strong> oriģinālas vai augstas kvalitātes OEM baterijas</strong>. Pirms darba uzsākšanas veicam
            <strong> bezmaksas diagnostiku</strong>, lai pārliecinātos, ka problēma tiešām ir baterijā.
          </p>
          <p className={s.paragraph}>
            Pēc nomaiņas veicam <strong>kalibrāciju</strong> un pārbaudi — uzlādes ātrums, izlādes stabilitāte,
            temperatūras kontrole. Populāros modeļus parasti salabojam <strong>45–90 minūtēs</strong>.
            Visam darbam un detaļām ir <strong>90 dienu garantija</strong>.
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
        // if component supports it, you can also add id="cenas" here
        devices={devices}
        pricing={devicePricing}
        brandSlug="apple"
        categorySlug="telefonu-remonts"
        serviceIds={['battery']}
        title="Baterijas maiņas cenas pēc modeļa"
        intro="Izvēlies savu iPhone modeli, lai redzētu baterijas maiņas cenu. Lielāko daļu remontu paveicam tajā pašā dienā."
        initialLimit={8}
        allModelsHref="/iphone-remonts#iphone-modeli"
        cta={{ label: 'Pieteikties remontam', href: '#pieteikties' }}
        className={s.section}
      />

      {/* PROCESS */}
      <Process />

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
            groups={[{ label: 'Baterija', items: FAQ_ITEMS }]}
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
