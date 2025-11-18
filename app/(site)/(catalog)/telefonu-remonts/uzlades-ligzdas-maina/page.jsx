import Script from 'next/script';
import Link from 'next/link';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import BrandPickerPricelist from '@components/service-pricelist/BrandPickerPricelist';

import categories from '@/data/categories';
import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';

import s from '@styles/Catalog.module.scss';

const ORIGIN = 'https://www.ilab.lv';

export const metadata = {
  title: 'Telefonu uzlādes ligzdas maiņa Rīgā | iLab',
  description:
    'Neuzlādējas, jākustina vads vai ports vaļīgs? Telefonu uzlādes ligzdas tīrīšana un maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  alternates: { canonical: '/telefonu-remonts/uzlades-ligzdas-maina' },
};

// ---------- FAQ ----------
const FAQ_ITEMS = [
  { q: 'Kādi simptomi norāda uz bojātu uzlādes ligzdu?', a: 'Uzlāde pārtrūkst, jākustina vads, kabelis “neiet līdz galam”, ports vaļīgs vai nereaģē vispār.' },
  { q: 'Vai pietiek ar tīrīšanu?', a: 'Bieži jā — portā sakrājas putekļi un tekstila šķiedras. Ja kontakti oksidēti vai mehāniski bojāti, nepieciešama maiņa.' },
  { q: 'Cik ilgi ilgst remonts?', a: 'Tīrīšana ~15–30 min, ligzdas maiņa parasti 45–90 min atkarībā no modeļa.' },
  { q: 'Vai problēma var būt arī citur?', a: 'Jā, dažkārt bojāta ir uzlādes ķēde vai barošanas mikroshema (charging IC). To noskaidro diagnostikā.' },
  { q: 'Vai ir garantija?', a: 'Jā — 90 dienu garantija gan detaļai, gan paveiktajam darbam.' },
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
    { '@type': 'ListItem', position: 3, name: 'Uzlādes ligzdas maiņa', item: `${ORIGIN}/telefonu-remonts/uzlades-ligzdas-maina` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Telefonu uzlādes ligzdas maiņa',
  areaServed: { '@type': 'City', name: 'Riga' },
  provider: { '@type': 'LocalBusiness', name: 'iLab', '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/telefonu-remonts/uzlades-ligzdas-maina`,
  name: 'Telefonu uzlādes ligzdas maiņa Rīgā',
  description:
    'Telefonu uzlādes ligzdas tīrīšana un nomaiņa Rīgā: ja uzlāde pārtrūkst, jākustina vads vai ports nereaģē. Bezmaksas diagnostika, 90 dienu garantija.',
};

// Build brand options like on the other phone-service pages
function getPhoneBrandOptions() {
  const phonesCat = Array.isArray(categories)
    ? categories.find((c) => c.slug === 'telefonu-remonts')
    : null;

  const listed = phonesCat?.brands || [];
  const withDevices = listed.filter((b) =>
    devices.some(
      (d) =>
        (d.category || '').toLowerCase() === 'telefonu-remonts' &&
        (d.brandSlug || '').toLowerCase() === String(b.brandSlug || b.slug).toLowerCase()
    )
  );

  const hasSamsung = withDevices.find((b) => (b.brandSlug || b.slug) === 'samsung');
  const defaultBrand = hasSamsung
    ? 'samsung'
    : (withDevices[0]?.brandSlug || withDevices[0]?.slug || 'samsung');

  const brandOptions = withDevices.map((b) => ({
    slug: (b.brandSlug || b.slug),
    name: b.name,
  }));

  return { brandOptions, defaultBrand };
}

// ---------- PAGE (server) ----------
export default function TelefonuUzladesLigzdasMainaPage({ searchParams }) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;
  const { brandOptions, defaultBrand } = getPhoneBrandOptions();

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
        image="/images/categories/uzlades_ligzda_remonts.webp"  // swap to a charge-port specific hero when available
        alt="Telefonu uzlādes ligzdas maiņa Rīgā"
        focal="right"
        className="service"
        bodyHtml={`<p><strong>Neuzlādējas vai jākustina vads?</strong> Veicam uzlādes porta <strong>tīrīšanu</strong> un, ja nepieciešams, <strong>ligzdas nomaiņu</strong>. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>Telefonu uzlādes ligzdas maiņa</h1>
          <p className={s.paragraph}>
            Tipiski simptomi: <strong>uzlāde pārtrūkst</strong>, <strong>jākustina vads</strong>, <strong>kabelis neiet līdz galam</strong>,
            <strong> ports vaļīgs</strong> vai <strong>nereaģē</strong>. Bieži palīdz <strong>tīrīšana</strong>; ja kontakti bojāti vai oksidēti —
            veicam <strong>ligzdas nomaiņu</strong>. Ja problēma ir barošanas ķēdē, nepieciešams <strong>charging IC</strong> remonts.
          </p>
          {selectedModel && (
            <p className={s.note}>
              Atlasīts modelis: <strong>{decodeURIComponent(selectedModel)}</strong>. Ritiniet uz
              <a href="#cenas"> cenām</a>.
            </p>
          )}
        </div>
      </section>

      {/* BRAND PICKER + PRICELIST */}
      <section className={s.section} aria-labelledby="brand-picker-h2">
        <div className={s.container}>
          <h2 id="brand-picker-h2" className={s.h2} style={{ marginBottom: 12 }}>Izvēlies zīmolu</h2>

          <BrandPickerPricelist
            devices={devices}
            pricing={devicePricing}
            brandOptions={brandOptions}
            defaultBrand={defaultBrand}
            categorySlug="telefonu-remonts"
            serviceIds={['charge-port', 'charging-ic']}  // <- match your pricing IDs
            title="Uzlādes ligzdas remonta cenas pēc modeļa"
            intro="Izvēlies zīmolu un modeli, lai redzētu uzlādes ligzdas tīrīšanas vai nomaiņas cenu. Dažos gadījumos nepieciešams arī barošanas ķēdes remonts."
            allModelsHref="/telefonu-remonts#brand-list"
            cta={{ label: 'Pieteikties remontam', href: '#pieteikties' }}
            className={s.section}
          />
        </div>
      </section>

      {/* PROCESS */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek uzlādes ligzdas remonts"
            steps={[
              { title: 'Diagnostika', text: 'Pārbaudām portu, kabeli, uzlādes ķēdi un baterijas stāvokli.' },
              { title: 'Tīrīšana', text: 'Noņemam putekļus/šķiedras, apstrādājam oksidāciju.' },
              { title: 'Ligzdas maiņa', text: 'Ja nepieciešams, nomainām uzlādes portu ar kvalitatīvu detaļu.' },
              { title: 'Testi', text: 'Pārbaudām uzlādes ātrumu/stabilitāti, datu pārraidi un kabeļa fiksāciju.' },
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
