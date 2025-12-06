import Script from 'next/script';
import Link from 'next/link';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import s from '@styles/Catalog.module.scss';

// JSON-LD helper utilities
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
  title: 'iPhone skaļruņu un mikrofona remonts Rīgā | iLab',
  description:
    'Klusa skaņa, krakšķi vai sarunās nedzird? Profesionāls iPhone skaļruņu un mikrofona remonts Rīgā — tīrīšana, moduļu nomaiņa, diagnostika un 90 dienu garantija.',
  alternates: { canonical: '/iphone-remonts/skalruni-mikrofona-remonts' },
};

// -------------------------------------------------
// FAQ
// -------------------------------------------------
const FAQ_ITEMS = [
  {
    q: 'Kādi simptomi norāda uz skaļruņu vai mikrofona problēmām?',
    a: 'Klusa vai izkropļota skaņa, krakšķi, nav skaņas zvana laikā, sarunās nedzird vai jūsu balsi nedzird pretējā galā.',
  },
  {
    q: 'Vai pietiek tikai ar tīrīšanu?',
    a: 'Bieži skaņas problēmas izraisa putekļi vai netīrumi režģos. Ja pietiek ar tīrīšanu, maiņa nav nepieciešama — to noteiks diagnostikā.',
  },
  {
    q: 'Cik ilgi ilgst remonts?',
    a: 'Parasti 45–90 minūtes atkarībā no modeļa un bojājuma.',
  },
  {
    q: 'Vai mani dati ir drošībā?',
    a: 'Jā. Skaņas komponentu remonts neietekmē jūsu datus, tomēr drošībai iesakām izveidot dublējumu.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienas gan detaļām, gan veiktajam darbam.',
  },
];

// JSON-LD via helpers
const faqLd = buildFaqLdFromPairs(FAQ_ITEMS);

const breadcrumbsLd = buildBreadcrumbsLd([
  { name: 'Sākums', url: abs('/') },
  { name: 'iPhone remonts', url: abs('/iphone-remonts') },
  { name: 'Skaļruņu un mikrofona remonts', url: abs('/iphone-remonts/skalruni-mikrofona-remonts') },
]);

const serviceLd = buildServiceLdForCity({
  path: '/iphone-remonts/skalruni-mikrofona-remonts',
  name: 'iPhone skaļruņu un mikrofona remonts Rīgā',
  serviceType: 'iPhone skaļruņu un mikrofona remonts',
  description:
    'iPhone skaļruņu un mikrofona remonts Rīgā: diagnostika, tīrīšana vai moduļa nomaiņa, testi un 90 dienu garantija.',
});

// -------------------------------------------------
// PAGE
// -------------------------------------------------
export default function IphoneAudioRemontsPage({ searchParams }) {
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
        image="/images/categories/mikrofona_remonts.webp"
        alt="iPhone skaļruņu un mikrofona remonts Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Klusa skaņa, krakšķi vai sarunās nedzird?</strong> Veicam <strong>iPhone skaļruņu un mikrofona remontu</strong> — profesionāla tīrīšana, moduļu nomaiņa, pilna pārbaude un <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h2 id="intro-h2" className={s.h1}>
            iPhone skaļruņu un mikrofona remonts Rīgā
          </h2>

          <p className={s.paragraph}>
            Skaņas problēmas var izraisīt <strong>putekļi, mitrums, oksidācija vai nolietoti moduļi</strong>.
            Veicam <strong>diagnostiku</strong>, pēc kuras noskaidrojam — pietiek ar <strong>tīrīšanu</strong> vai
            nepieciešama <strong>skaļruņa/mikrofona nomaiņa</strong>.
          </p>

          <p className={s.paragraph}>
            Populāros modeļus parasti salabojam <strong>45–90 minūtēs</strong>.
            Visam darbam un detaļām ir <strong>90 dienu garantija</strong>.
          </p>

          {selectedModel && (
            <p className={s.note}>
              Atlasīts modelis: <strong>{decodeURIComponent(selectedModel)}</strong>.
              Ja nepieciešama precīza cena, iesniedz pieteikumu zemāk.
            </p>
          )}
        </div>
      </section>

      {/* PROCESS */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek remonts"
            steps={[
              { title: 'Diagnostika', text: 'Pārbaudām skaļruņus, mikrofonu, režģus un savienojumus.' },
              { title: 'Tīrīšana vai nomaiņa', text: 'Noņemam netīrumus, oksidāciju vai mainām bojāto moduli.' },
              { title: 'Testi', text: 'Pārbaudām zvana, multimediju skaņu, sarunu kvalitāti un mikrofonu.' },
              { title: 'Nobeigums', text: 'Kvalitātes pārbaude un ieteikumi turpmākai lietošanai.' },
              { title: 'Garantija', text: '90 dienu garantija gan detaļām, gan darbam.' },
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
      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq
            id="faq"
            title="Biežāk uzdotie jautājumi"
            groups={[{ label: 'Skaņa', items: FAQ_ITEMS }]}
            headingLevel={2}
            variant="accordion"
          />
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
