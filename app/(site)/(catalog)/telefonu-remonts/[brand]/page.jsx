// app/(site)/(catalog)/telefonu-remonts/[brand]/page.jsx
import Script from 'next/script';
import Link from 'next/link';

import devicesAll from '@/data/devices';
import categories from '@/data/categories'; // ⬅️ use existing categories data

import DeviceHero from '@sections/device-hero/DeviceHero'; // ⬅️ add hero
import SeriesGrid from '@components/model-grid/SeriesGrid';
import Services from '@sections/services/Services';
import CommonIssues from '@sections/common-issues/CommonIssues';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import phoneIssues from '@/data/commonIssues';
import c from '@styles/Catalog.module.scss';

import { getBrandContent, BRAND_CATEGORY } from '@/data/brandContent';

const ORIGIN = 'https://www.ilab.lv';

// ---------- Helpers ----------
function getPhoneBrandConfig(brandSlug) {
  // Find the phones category in your categories list
  const phonesCat = categories.find((c) => c.slug === 'telefonu-remonts');
  if (!phonesCat) {
    return {
      brandKey: brandSlug,
      heroImage: '/brand/images/categories/telefonu_remonts.webp',
      logo: null,
      tint: 'rgba(0,200,180,0.20)',
      heroAlt: 'Telefonu remonts',
      name: brandSlug,
    };
  }

  const brand =
    phonesCat.brands?.find((b) => (b.brandSlug || '').toLowerCase() === brandSlug) || null;

  // Fallbacks if brand entry is missing (still shows generic Android tint)
  return {
    brandKey: brand?.brandSlug || brandSlug,
    heroImage: brand?.heroImage || '/brand/images/categories/telefonu_remonts.webp',
    logo: brand?.logo || null,
    tint: brand?.tint || 'rgba(0,200,180,0.20)',
    heroAlt: brand?.heroAlt || 'Telefonu remonts',
    name: brand?.name || brandSlug,
  };
}

export async function generateMetadata({ params }) {
  const bc = getBrandContent(params.brand, BRAND_CATEGORY.PHONES);
  return {
    title: bc.seo.title,
    description: bc.seo.metaDescription,
    alternates: { canonical: bc.canonicalPath },
  };
}

// ---------- Generic services/faq/process (shared) ----------
const POPULAR_REPAIRS_GENERIC = [
  { title: 'Displeja (ekrāna) maiņa', text: 'plaisas, tumši plankumi, nereaģē skāriens.' },
  { title: 'Akumulatora maiņa', text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.' },
  { title: 'Uzlādes ligzda', text: 'nenoturas kabelis, lēna vai nestabila uzlāde.' },
  { title: 'Kamera', text: 'miglaini attēli, fokusēšanās problēmas.' },
  { title: 'Skaļruņi/mikrofons', text: 'klusa skaņa, krakšķi, sarunās nedzird.' },
  { title: 'Ūdens bojājumi', text: 'diagnostika un atjaunošana, ja tas iespējams.' },
];

const PROCESS_STEPS = [
  { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
  { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
  { title: 'Remonts', text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.' },
  { title: 'Pārbaude', text: 'Pēc remonta testējam visu funkcionalitāti un drošību.' },
  { title: 'Garantija', text: '90 dienu garantija un ieteikumi turpmākai lietošanai.' },
];

const FAQ_ITEMS = [
  { q: 'Cik ilgi ilgst telefona displeja maiņa?', a: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.' },
  { q: 'Vai mani dati saglabāsies?', a: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.' },
  { q: 'Vai detaļām ir garantija?', a: 'Jā, gan detaļām, gan darbam.' },
  { q: 'Vai pieejamas oriģinālas detaļas?', a: 'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.' },
  { q: 'Vai varu saņemt aptuveno cenu pirms remonta?', a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.' },
];

export default function BrandPhonesPage({ params }) {
  const brandSlug = String(params.brand || '').toLowerCase();

  const bc = getBrandContent(brandSlug, BRAND_CATEGORY.PHONES);
  const baseHref = bc.href;

  const hero = getPhoneBrandConfig(brandSlug);

  const brandPhoneList = devicesAll.filter(
    (d) => d.category === 'telefonu-remonts' && (d.brandSlug || '').toLowerCase() === brandSlug
  );

  // ---------- JSON-LD ----------
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}${bc.href}#service`,
    serviceType: `${bc.marketingName} telefonu remonts`,
    areaServed: { '@type': 'Country', name: 'Latvia' },
    provider: { '@id': `${ORIGIN}#organization` },
    url: `${ORIGIN}${bc.href}/`,
    name: `${bc.marketingName} telefonu remonts`,
    description:
      `${bc.marketingName} tālruņu remonts: displejs, baterija, uzlādes ligzda, kamera un citi darbi. Ātra diagnostika, godīgas cenas, garantija.`,
  };

  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Telefonu remonts', item: `${ORIGIN}/telefonu-remonts/` },
      { '@type': 'ListItem', position: 3, name: bc.marketingName, item: `${ORIGIN}${bc.href}/` },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: typeof a === 'string' ? a : '' },
    })),
  };

  return (
    <>
      {/* JSON-LD */}
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      {/* DEVICE HERO (image + optional logo tint) */}
      <DeviceHero
        image={hero.heroImage}               // e.g. /brand/images/categories/telefonu_remonts.webp
        alt={hero.heroAlt}                   // e.g. "Samsung telefonu remonts"
        brandLogo={hero.logo}                // e.g. /brand/logos/samsung-logo.svg (or null)
        brandKey={hero.brandKey}             // sets data-brand for CSS tints
        tint={hero.tint}                     // can override brand preset if needed
        focal="right"
      />

      {/* INTRO (SEO copy under H2; Header owns H1/lead/CTA) */}
      <section className={c.section} aria-labelledby="brand-intro-h2">
        <div className={c.container}>
          <h2 id="brand-intro-h2" className={c.h2}>
            {bc.marketingName} telefonu remonts — ko mēs darām
          </h2>
          <p className={c.intro}>
            Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas atšķiras pēc modeļa — atver sava
            modeļa lapu, lai redzētu konkrētas <strong>remonta cenas</strong> un termiņus.
          </p>
          <p className={c.paragraph}>
            Biežākie darbi: <strong>ekrāna maiņa</strong> (plaisas, tumši plankumi, nereaģē skāriens),{' '}
            <strong>baterijas maiņa</strong> (strauja izlāde, izslēdzas pie 10–20%), <strong>uzlādes ligzda</strong>{' '}
            (nenoturas kabelis, lēna/nekonsekventa uzlāde), <strong>kamera</strong> (miglaini attēli, fokusēšanās
            kļūdas), <strong>skaļruņi/mikrofons</strong> (klusa skaņa, krakšķi), kā arī <strong>mitruma bojājumi</strong>.
            Uzzini, kā notiek remonts sadaļā <Link href="#process-h2">“Kā notiek remonts”</Link>.
          </p>
        </div>
      </section>

      {/* SERIES GRID (Header CTA targets this) */}
      <section id="brand-modeli" className={`${c.section} ${c.anchorTarget}`} aria-labelledby="brand-modeli-h2">
        <div className={c.container}>
          <h2 id="brand-modeli-h2" className={c.h2}>{bc.sections.modelGrid.heading}</h2>
          <p className={c.intro}>{bc.sections.modelGrid.intro}</p>
          <p className={c.paragraph} style={{ marginTop: 0 }}>
            Cenas atšķiras pēc modeļa — atver sava modeļa lapu, lai redzētu remonta cenas.
          </p>

          <SeriesGrid
            devices={devicesAll}
            baseHref={baseHref}
            brandSlug={brandSlug}
            categorySlug="telefonu-remonts"
            initialLimit={4}
            autoExpandOnSearch={true}
          />

          {brandPhoneList.length === 0 && (
            <p style={{ opacity: 0.8, marginTop: 16 }}>
              Pagaidām šim zīmolam nav pievienotu modeļu.
            </p>
          )}
        </div>
      </section>

      {/* Popular services */}
      <section className={c.section} aria-labelledby="popular-services-h2">
        <div className={c.container}>
          <Services
            id="brand-services"
            title="Populārākie remonti"
            items={POPULAR_REPAIRS_GENERIC}
            headingLevel={2}
            variant="list"
          />
        </div>
      </section>

      {/* Common issues */}
      <section className={c.section} aria-labelledby="issues-h2">
        <div className={c.container}>
          <CommonIssues
            id="brand-issues"
            title="Ar kādiem jautājumiem visbiežāk pie mums vēršas"
            items={phoneIssues}
            headingLevel={2}
          />
        </div>
      </section>

      {/* Process */}
      <div id="process-h2" className={c.anchorTarget} />
      <section className={c.section} aria-labelledby="process-h2">
        <div className={c.container}>
          <Process
            id="process"
            title="Kā notiek remonts"
            steps={PROCESS_STEPS}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      {/* Why — full width */}
      <section className={c.section}>
        <Why />
      </section>

      {/* FAQ */}
      <section className={c.section} aria-labelledby="faq-h2">
        <div className={c.container}>
          <Faq
            id="brand-faq"
            title="Biežāk uzdotie jautājumi"
            items={FAQ_ITEMS}
            headingLevel={2}
            variant="accordion"
          />
        </div>
      </section>

      {/* Convert band — full width */}
      <section className={c.section}>
        <ConvertBand />
      </section>
    </>
  );
}
