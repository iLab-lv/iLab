import Script from 'next/script';
import Link from 'next/link';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
// import ServicePricelist from '@components/service-pricelist/ServicePricelist'; // ← enable later

// import devices from '@/data/devices';
// import devicePricing from '@/data/devicePricing';

import s from '@styles/Catalog.module.scss';

const ORIGIN = 'https://www.ilab.lv';

export const metadata = {
  title: 'iPhone skaļruņu un mikrofona remonts Rīgā | iLab',
  description:
    'Klusa skaņa, krakšķi vai sarunās nedzird? iPhone skaļruņu un mikrofona remonts Rīgā ar bezmaksas diagnostiku un 90 dienu garantiju.',
  alternates: { canonical: '/iphone-remonts/skalruni-mikrofona-remonts' },
};

const FAQ_ITEMS = [
  { q: 'Kādi simptomi norāda uz skaļruņu vai mikrofona problēmām?',
    a: 'Klusa vai izkropļota skaņa, krakšķi, nav skaņas zvana laikā, sarunās nedzird vai jūsu balsi nedzird pretējā galā.' },
  { q: 'Vai pietiek tikai ar tīrīšanu?',
    a: 'Bieži skaņas problēmas izraisa putekļi vai netīrumi skaļruņu režģos. Ja pietiek ar tīrīšanu, maiņa nav nepieciešama — to noskaidrosim diagnostikā.' },
  { q: 'Cik ilgi ilgst remonts?',
    a: 'Parasti 45–90 minūtes atkarībā no modeļa un bojājuma rakstura.' },
  { q: 'Vai mani dati ir drošībā?',
    a: 'Jā. Skaņas komponentu remonts neietekmē jūsu datus. Iesakām izveidot dublējumu drošībai.' },
  { q: 'Vai ir garantija?',
    a: 'Jā — 90 dienas gan detaļai, gan veiktajam darbam.' },
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
    { '@type': 'ListItem', position: 3, name: 'Skaļruņi un mikrofons', item: `${ORIGIN}/iphone-remonts/skalruni-mikrofona-remonts` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'iPhone skaļruņu un mikrofona remonts',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@type': 'LocalBusiness', name: 'iLab', '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/iphone-remonts/skalruni-mikrofona-remonts`,
  name: 'iPhone skaļruņu un mikrofona remonts Rīgā',
  description: 'iPhone skaļruņu un mikrofona remonts Rīgā: tīrīšana vai moduļu nomaiņa, pārbaude un 90 dienu garantija.',
};

export default function IphoneAudioRemontsPage({ searchParams }) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(faqLd)}</Script>
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(breadcrumbsLd)}</Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(serviceLd)}</Script>

      <DeviceHero
        image="/images/services/iphone_skalruni_mikrofona_remonts.webp"
        alt="iPhone skaļruņu un mikrofona remonts Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Klusa skaņa, krakšķi vai sarunās nedzird?</strong> Veicam <strong>iPhone skaļruņu un mikrofona remontu</strong> Rīgā — profesionāla tīrīšana vai moduļu nomaiņa, pilna pārbaude un <strong>90 dienu garantija</strong>.</p>`}
      />

      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>iPhone skaļruņu un mikrofona remonts Rīgā</h1>
          <p className={s.paragraph}>
            Skaņas problēmas var izraisīt <strong>putekļi, mitrums vai nolietoti moduļi</strong>.
            Veicam <strong>diagnostiku</strong>, nepieciešamības gadījumā — <strong>tīrīšanu</strong> vai
            <strong> skaļruņu/mikrofona nomaiņu</strong>.
          </p>
          <p className={s.paragraph}>
            Populāros modeļus parasti salabojam <strong>45–90 minūtēs</strong>. Visam ir <strong>90 dienu garantija</strong>.
          </p>
          {selectedModel && (
            <p className={s.note}>
              Atlasīts modelis: <strong>{decodeURIComponent(selectedModel)}</strong>. Ja nepieciešama cena konkrētam modelim, iesniedz pieteikumu zemāk.
            </p>
          )}
        </div>
      </section>

      {/* No ServicePricelist for now — pricing IDs for audio aren’t in devicePricing */ }

      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek remonts"
            steps={[
              { title: 'Diagnostika', text: 'Pārbaudām skaļruņus, mikrofonu, režģus un savienojumus.' },
              { title: 'Tīrīšana vai nomaiņa', text: 'Noņemam netīrumus/oksidāciju vai mainām bojāto moduli.' },
              { title: 'Testi', text: 'Pārbaudām zvana, multimediju, sarunu skaņu un mikrofonu ierakstu.' },
              { title: 'Nobeigums', text: 'Kvalitātes pārbaude un ieteikumi turpmākai lietošanai.' },
              { title: 'Garantija', text: '90 dienu garantija gan darbam, gan detaļām.' },
            ]}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      <section className={s.section}><Why /></section>

      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq id="faq" title="Biežāk uzdotie jautājumi" groups={[{ label: 'Skaņa', items: FAQ_ITEMS }]} headingLevel={2} variant="accordion" />
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
