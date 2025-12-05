// app/(site)/(catalog)/iphone-remonts/displeja-maina/page.jsx

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
  title: 'iPhone displeja maiņa Rīgā | iLab',
  description:
    'Ātra un kvalitatīva iPhone displeja (ekrāna) maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM detaļas. Bieži tajā pašā dienā.',
  alternates: { canonical: '/iphone-remonts/displeja-maina' },
};

// -------------------------------------------------
// FAQ
// -------------------------------------------------
const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst iPhone displeja maiņa?',
    a: 'Atkarībā no modeļa 1–3 stundas. Noslodzes laikā var prasīt ilgāk, bet bieži pabeidzam tajā pašā dienā.',
  },
  {
    q: 'Vai dati paliks neskarti?',
    a: 'Jā, displeja maiņa neietekmē datus. Tomēr drošībai iesakām veikt dublējumu pirms remonta.',
  },
  {
    q: 'Kāda ir atšķirība starp oriģinālu un OEM ekrānu?',
    a: 'Oriģināls nodrošina maksimālu kvalitāti (krāsas, spilgtumu, True Tone). Augstas kvalitātes OEM ir budžeta alternatīva ar ļoti labu ikdienas pieredzi.',
  },
  {
    q: 'Vai saglabājas True Tone un Face ID?',
    a: 'Pēc nomaiņas veicam kalibrāciju un pārbaudi. True Tone tiek atjaunots, bet Face ID netiek skarts.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienas gan detaļai, gan paveiktajam darbam.',
  },
];

// JSON-LD via helpers
const faqLd = buildFaqLdFromPairs(FAQ_ITEMS);

const breadcrumbsLd = buildBreadcrumbsLd([
  { name: 'Sākums', url: abs('/') },
  { name: 'iPhone remonts', url: abs('/iphone-remonts') },
  { name: 'Displeja maiņa', url: abs('/iphone-remonts/displeja-maina') },
]);

const serviceLd = buildServiceLdForCity({
  path: '/iphone-remonts/displeja-maina',
  name: 'iPhone displeja maiņa Rīgā',
  serviceType: 'iPhone displeja maiņa',
  description:
    'iPhone displeja (ekrāna) maiņa Rīgā: bezmaksas diagnostika, oriģinālas vai OEM detaļas, 90 dienu garantija. Bieži tajā pašā dienā.',
  // city + provider locations use defaults (Rīga + all LOCATIONS)
});

// -------------------------------------------------
// PAGE COMPONENT
// -------------------------------------------------
export default function IphoneDisplejaMainaPage({ searchParams }) {
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
        image="/images/categories/displeja_maina.webp"
        alt="iPhone displeja maiņa Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Ātra un kvalitatīva iPhone displeja maiņa Rīgā</strong> — saplīsuša ekrāna, plankumu vai skāriena problēmu novēršana tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam iLab servisā.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>
            iPhone displeja maiņa Rīgā
          </h1>
          <p className={s.paragraph}>
            Ja iPhone ekrāns ir saplīsis, parādās plankumi vai nereaģē skāriens — visticamāk nepieciešama
            <strong> displeja (ekrāna) maiņa</strong>. iLab meistari Rīgā veic ātru un drošu nomaiņu, izmantojot
            <strong> oriģinālas vai OEM detaļas</strong>. Pirms darba uzsākšanas veicam
            <strong> bezmaksas diagnostiku</strong>, lai pārliecinātos, ka vaina ir tieši displejā.
          </p>
          <p className={s.paragraph}>
            Pēc nomaiņas pārbaudām skārienjutību, krāsu atbilstību, True Tone un Face ID darbību.
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
        brandSlug="apple"
        categorySlug="telefonu-remonts"
        serviceIds={['display-original', 'display-oled', 'display-incell']}
        title="Displeja maiņas cenas pēc modeļa"
        intro="Izvēlies savu iPhone modeli, lai redzētu displeja maiņas cenu. Lielāko daļu remontu paveicam tajā pašā dienā."
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
              { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
              { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
              { title: 'Remonts', text: 'Nomaiņu veic sertificēti meistari ar kvalitatīvām detaļām.' },
              { title: 'Pārbaude', text: 'Pārbaudām skārienu, krāsas, True Tone un Face ID funkcijas.' },
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
            groups={[{ label: 'Displejs', items: FAQ_ITEMS }]}
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
