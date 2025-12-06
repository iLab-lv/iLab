// app/(site)/(catalog)/iphone-remonts/ekrana-maina/page.jsx

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
  title: 'iPhone ekrāna maiņa Rīgā — displeja maiņa tajā pašā dienā | iLab',
  description:
    'iPhone ekrāna maiņa (displeja maiņa) Rīgā — saplīsis ekrāns, plankumi vai nereaģē skāriens. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM detaļas. Bieži tajā pašā dienā.',
  alternates: { canonical: '/iphone-remonts/ekrana-maina' },
};

// -------------------------------------------------
// FAQ
// -------------------------------------------------
const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst iPhone ekrāna (displeja) maiņa?',
    a: 'Atkarībā no modeļa 1–3 stundas. Noslodzes laikā var prasīt ilgāk, bet populāros modeļus bieži pabeidzam tajā pašā dienā.',
  },
  {
    q: 'Vai dati paliks neskarti pēc ekrāna maiņas?',
    a: 'Jā, ekrāna jeb displeja maiņa neietekmē jūsu foto, video un lietotnes. Tomēr drošībai vienmēr iesakām veikt dublējumu pirms remonta.',
  },
  {
    q: 'Kāda ir atšķirība starp oriģinālu un OEM ekrānu?',
    a: 'Oriģināls ekrāns nodrošina maksimālu kvalitāti — krāsas, spilgtumu, True Tone, skāriena precizitāti. Augstas kvalitātes OEM displejs ir budžeta alternatīva ar ļoti labu ikdienas lietošanas pieredzi.',
  },
  {
    q: 'Vai saglabājas True Tone un Face ID pēc nomaiņas?',
    a: 'Pēc ekrāna nomaiņas veicam kalibrāciju un pārbaudi. True Tone tiek atjaunots, Face ID pati par sevi netiek skarta, ja bojājums ir tikai displejā.',
  },
  {
    q: 'Vai ir garantija ekrāna maiņai?',
    a: 'Jā — 90 dienu garantija gan detaļai (ekrānam / displejam), gan paveiktajam darbam.',
  },
];

// JSON-LD via helpers
const faqLd = buildFaqLdFromPairs(FAQ_ITEMS);

const breadcrumbsLd = buildBreadcrumbsLd([
  { name: 'Sākums', url: abs('/') },
  { name: 'iPhone remonts', url: abs('/iphone-remonts') },
  { name: 'Ekrāna maiņa (displeja maiņa)', url: abs('/iphone-remonts/ekrana-maina') },
]);

const serviceLd = buildServiceLdForCity({
  path: '/iphone-remonts/ekrana-maina',
  name: 'iPhone ekrāna maiņa Rīgā',
  serviceType: 'iPhone ekrāna maiņa',
  description:
    'iPhone ekrāna (displeja) maiņa Rīgā: saplīsis ekrāns, plankumi vai skāriena problēmas. Bezmaksas diagnostika, oriģinālas vai OEM detaļas, 90 dienu garantija. Bieži tajā pašā dienā.',
  // city + provider locations use defaults (Rīga + all LOCATIONS)
});

// -------------------------------------------------
// PAGE COMPONENT
// -------------------------------------------------
export default function IphoneEkranaMainaPage({ searchParams }) {
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
        alt="iPhone ekrāna maiņa Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Ātra un kvalitatīva iPhone ekrāna maiņa Rīgā</strong> — saplīsušs ekrāns, tumši plankumi vai nereaģē skāriens. Ja nepieciešama <strong>displeja maiņa</strong>, veicam remontu tajā pašā dienā, ar bezmaksas diagnostiku un <strong>90 dienu garantiju</strong> katram remontam iLab servisā.</p>`}
      />

      {/* PRICE LIST (ServicePricelist) */}
      <section id="cenas" className={s.section} aria-label="Ekrāna maiņas cenas">
        <ServicePricelist
          devices={devices}
          pricing={devicePricing}
          brandSlug="apple"
          categorySlug="telefonu-remonts"
          serviceIds={['display-original', 'display-oled', 'display-incell']}
          title="Ekrāna (displeja) maiņas cenas pēc modeļa"
          intro="Izvēlies savu iPhone modeli, lai redzētu ekrāna / displeja maiņas cenu. Lielāko daļu remontu paveicam tajā pašā dienā."
          initialLimit={8}
          allModelsHref="/iphone-remonts#iphone-modeli"
          cta={{ label: 'Pieteikties remontam', href: '#pieteikties' }}
          className={s.section}
        />
      </section>


      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h2 id="intro-h2" className={s.h1}>
            iPhone ekrāna maiņa Rīgā (displeja maiņa)
          </h2>
          <p className={s.paragraph}>
            Ja iPhone ekrāns ir saplīsis, parādās krāsaini plankumi, līnijas vai nereaģē skāriens, visbiežāk nepieciešama
            <strong> ekrāna (displeja) maiņa</strong>. iLab meistari Rīgā veic ātru un drošu nomaiņu, izmantojot
            <strong> oriģinālas vai augstas kvalitātes OEM detaļas</strong>. Pirms darba uzsākšanas veicam
            <strong> bezmaksas diagnostiku</strong>, lai pārliecinātos, ka vaina ir tieši displejā, nevis, piemēram, plates bojājumā.
          </p>
          <p className={s.paragraph}>
            Pēc ekrāna nomaiņas pārbaudām <strong>skārienjutību, attēla kvalitāti, spilgtumu, True Tone un Face ID</strong>.
            Populāros modeļus parasti salabojam <strong>1–3 stundu laikā</strong>,
            un visam veicamajam darbam un detaļām ir <strong>90 dienu garantija</strong>.
          </p>

          {/* Displeja-segment H2 for secondary keyword */}
          <h2 className={s.h2} style={{ marginTop: '2rem' }}>
            Kad nepieciešama iPhone displeja maiņa?
          </h2>
          <p className={s.paragraph}>
            Displeja maiņa parasti ir nepieciešama, ja:
          </p>
          <ul className={s.list}>
            <li>ekrāns ir saplaisājis vai stikls nobiris,</li>
            <li>parādās melni vai krāsaini plankumi, līnijas, “izdegumi”,</li>
            <li>skāriena zona nereaģē vai darbojas tikai daļēji,</li>
            <li>ekrāns ir ļoti tumšs pat pie maksimāla spilgtuma,</li>
            <li>pēc kritiena ekrāns ik pa laikam “mirgo” vai izslēdzas.</li>
          </ul>
          <p className={s.paragraph}>
            Šādos gadījumos <strong>ekrāna (displeja) remonts parasti nozīmē pilnu moduļa nomaiņu</strong>,
            jo tas ir drošākais un ilgtermiņā izdevīgākais risinājums.
          </p>

          {selectedModel && (
            <p className={s.note}>
              Atlasīts modelis: <strong>{decodeURIComponent(selectedModel)}</strong>. Ritiniet uz
              <a href="#cenas"> cenām</a>.
            </p>
          )}
        </div>
      </section>




      {/* PROCESS */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek ekrāna remonts"
            steps={[
              { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām, ka bojāts ir tieši ekrāns/displejs.' },
              { title: 'Cena un termiņš', text: 'Saskaņojam ekrāna maiņas izmaksas un izpildes laiku pirms darba uzsākšanas.' },
              { title: 'Remonts', text: 'Nomaiņu veic sertificēti meistari, izmantojot kvalitatīvas detaļas un pareizu montāžu.' },
              { title: 'Pārbaude', text: 'Pārbaudām skārienu, krāsas, spilgtumu, True Tone un Face ID funkcijas.' },
              { title: 'Garantija', text: '90 dienu garantija ekrānam un darbam, kā arī ieteikumi turpmākai lietošanai.' },
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
            title="Biežāk uzdotie jautājumi par ekrāna / displeja maiņu"
            groups={[{ label: 'Ekrāns un displejs', items: FAQ_ITEMS }]}
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
