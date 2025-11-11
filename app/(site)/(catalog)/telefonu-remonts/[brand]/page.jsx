import Script from 'next/script';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import devicesAll from '@/data/devices';
import categories from '@/data/categories'; // ⬅️ used by getPhoneBrandConfig

import DeviceHero from '@sections/device-hero/DeviceHero';
import SeriesGrid from '@components/model-grid/SeriesGrid';
import Services from '@sections/services/Services';
import CommonIssues from '@sections/common-issues/CommonIssues';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import phoneIssues from '@/data/commonIssues';
import c from '@styles/Catalog.module.scss';

import {
  getBrandContent,
  listBrandsForCategory,
  BRAND_CATEGORY,
} from '@/data/brandContent';

import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

const ORIGIN = 'https://www.ilab.lv';

/* ---------------------------------------------
   Lock this dynamic route to ONLY known brands
---------------------------------------------- */
export const dynamicParams = false;

export async function generateStaticParams() {
  const brands = listBrandsForCategory(BRAND_CATEGORY.PHONES) || [];
  return brands.map((b) => ({ brand: String(b.slug).toLowerCase() }));
}

// ---------- Helpers ----------
function getPhoneBrandConfig(brandSlug) {
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
const POPULAR_REPAIRS = [
  {
    title: 'Displeja (ekrāna) maiņa',
    text: 'plaisas, tumši plankumi, nereaģē skāriens.',
    icon: LuSmartphone,
    href: '/telefonu-remonts/ekrana-mainja',
  },
  {
    title: 'Akumulatora maiņa',
    text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
    icon: LuBatteryCharging,
    href: '/telefonu-remonts/akumulatora-mainja',
  },
  {
    title: 'Uzlādes ligzda',
    text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
    icon: LuPlugZap,
    href: '/telefonu-remonts/uzlades-ligzda',
  },
  {
    title: 'Kamera',
    text: 'miglaini attēli, fokusēšanās problēmas.',
    icon: LuCamera,
    href: '/telefonu-remonts/kamera-remonts',
  },
  {
    title: 'Skaļruņi/mikrofons',
    text: 'klusa skaņa, krakšķi, sarunās nedzird.',
    icon: LuVolume2,
    href: '/telefonu-remonts/skalruni-mikrofons',
  },
  {
    title: 'Ūdens bojājumi',
    text: 'diagnostika un atjaunošana, ja tas iespējams.',
    icon: LuDroplets,
    href: '/telefonu-remonts/udens-bojajumi',
  },
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

  // Runtime guard in case someone navigates here with a non-generated slug
  const allowed = (listBrandsForCategory(BRAND_CATEGORY.PHONES) || []).map((b) =>
    String(b.slug).toLowerCase()
  );
  if (!allowed.includes(brandSlug)) return notFound();

  const bc = getBrandContent(brandSlug, BRAND_CATEGORY.PHONES);
  const baseHref = bc.href;

  const hero = getPhoneBrandConfig(brandSlug);

  const brandPhoneList = devicesAll.filter(
    (d) => d.category === 'telefonu-remonts' && (d.brandSlug || '').toLowerCase() === brandSlug
  );

  const heroHtml = bc.hero.bodyHtml ?? `<p>${bc.hero.lead}</p>`;

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

      {/* DEVICE HERO */}
      <DeviceHero
        image={hero.heroImage}
        alt={hero.heroAlt}
        brandLogo={hero.logo}
        brandKey={hero.brandKey}
        tint={hero.tint}
        focal="right"
        bodyHtml={heroHtml}
      />

      {/* INTRO */}
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

      {/* SERIES GRID */}
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
                      items={[
                        {
                          title: 'Displeja (ekrāna) maiņa',
                          text: 'plaisas, tumši plankumi, nereaģē skāriens.',
                          icon: LuSmartphone,
                          href: '/telefonu-remonts/ekrana-maina',
                        },
                        {
                          title: 'Akumulatora maiņa',
                          text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
                          icon: LuBatteryCharging,
                          href: '/telefonu-remonts/baterijas-maina',
                        },
                        {
                          title: 'Uzlādes ligzda',
                          text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
                          icon: LuPlugZap,
                          href: '/telefonu-remonts/uzlades-ligzdas-maina',
                        },
                        {
                          title: 'Kamera',
                          text: 'miglaini attēli, fokusēšanās problēmas.',
                          icon: LuCamera,
                          href: '/telefonu-remonts/kameras-remonts',
                        },
                        {
                          title: 'Skaļruņi/mikrofons',
                          text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
                          icon: LuVolume2,
                          href: '/telefonu-remonts/skalruni-mikrofona-remonts',
                        },
                        {
                          title: 'Ūdens bojājumi',
                          text: 'diagnostika un atjaunošana, ja tas iespējams.',
                          icon: LuDroplets,
                          href: '/telefonu-remonts/udens-bojajumu-remonts',
                        },
                      ]}
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
