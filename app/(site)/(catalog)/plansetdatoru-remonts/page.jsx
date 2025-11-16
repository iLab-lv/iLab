// app/(site)/(catalog)/plansetdatoru-remonts/page.jsx
import Script from 'next/script';
import Link from 'next/link';

import devicesAll from '@/data/devices';
import BrandPreview from '@components/model-grid/BrandPreview';

import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import DeviceHero from '@sections/device-hero/DeviceHero';

import s from '@styles/Catalog.module.scss';
import { listBrandsForCategory, BRAND_CATEGORY } from '@/data/brandContent';
import contentRegistry from '@/data/contentRegistry';

import {
  LuTabletSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

const ORIGIN = 'https://www.ilab.lv';

export const metadata = {
  title: 'Planšetdatoru remonts Rīgā — cenas, ātri, garantija | iLab',
  description:
    'Planšetdatoru remonts: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
  alternates: { canonical: '/plansetdatoru-remonts' },
};

// Top 4 models per brand (for tablets)
function topModelsForBrand(list, brandSlug) {
  const filtered = list.filter(
    (d) =>
      d.category === 'plansetdatoru-remonts' &&
      (d.brandSlug || '').toLowerCase() === brandSlug
  );

  const seen = new Set();
  const uniq = [];
  for (const d of filtered) {
    const k = `${d.category}:${d.brandSlug}:${d.slug}`;
    if (seen.has(k)) continue;
    seen.add(k);
    uniq.push(d);
  }

  uniq.sort((a, b) => {
    const ao = typeof a.order === 'number' ? a.order : 99999;
    const bo = typeof b.order === 'number' ? b.order : 99999;
    if (ao !== bo) return ao - bo;
    if (a.year && b.year && a.year !== b.year) return b.year - a.year;
    return (a.name || '').localeCompare(b.name || '', 'lv');
  });

  return { items: uniq.slice(0, 4), total: uniq.length };
}

export default function PlansetdatoruRemontsPage() {
  // Brand registry (hub-aware names/hrefs)
  const brands = listBrandsForCategory(BRAND_CATEGORY.TABLETS);

  // Build preview blocks
  const brandBlocks = brands
    .map(({ slug, name, href }) => {
      const { items, total } = topModelsForBrand(devicesAll, slug);
      return { slug, name, href, items, total };
    })
    .filter((b) => b.total > 0);

  // JSON-LD
  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Planšetdatoru remonts',
        item: `${ORIGIN}/plansetdatoru-remonts/`,
      },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}/plansetdatoru-remonts#service`,
    serviceType: 'Planšetdatoru remonts',
    areaServed: { '@type': 'Country', name: 'Latvia' },
    provider: { '@id': `${ORIGIN}#organization` },
    url: `${ORIGIN}/plansetdatoru-remonts/`,
    name: 'Planšetdatoru remonts',
    description:
      'Planšetdatoru remonts: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
  };

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: brandBlocks.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${ORIGIN}${b.href}/`,
      name: `${b.name} remonts`,
    })),
  };

  // Hero text for DeviceHero from contentRegistry
  const tabletsHero =
    contentRegistry.categories['plansetdatoru-remonts']?.hero || {};
  const heroHtml =
    tabletsHero.bodyHtml ||
    (tabletsHero.lead ? `<p>${tabletsHero.lead}</p>` : null);

  return (
    <>
      {/* JSON-LD */}
      <Script
        id="breadcrumbs-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script
        id="service-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>
      <Script
        id="itemlist-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(itemListLd)}
      </Script>

      {/* VISUAL HERO (DeviceHero) */}
      <DeviceHero
        image="/images/categories/plansetdatoru_remonts.webp"
        alt="Planšetdatoru remonts"
        bodyHtml={heroHtml}
      />

      {/* INTRO (SEO copy under H2; Header owns H1/lead/CTA) */}
      <section className={s.section} aria-labelledby="tablets-intro-h2">
        <div className={s.container}>
          <h2 id="tablets-intro-h2" className={s.h2}>
            Planšetdatoru remonts — ko mēs darām
          </h2>

          <p className={s.intro}>
            Ekrāni, baterijas, uzlādes ligzdas, kameras un citi remontdarbi.
            Cenas saskaņojam pirms darba uzsākšanas, biežākos darbus paveicam
            tajā pašā dienā. Izvēlies savu zīmolu un atver konkrēta modeļa lapu.
          </p>

          <p className={s.paragraph}>
            Strādājam ar <strong>iPad</strong>,{' '}
            <strong>Samsung Galaxy Tab</strong> un citiem populāriem
            planšetdatoriem. Biežākie darbi: <strong>ekrāna maiņa</strong>,{' '}
            <strong>baterijas nomaiņa</strong>, <strong>uzlādes ligzda</strong>,{' '}
            <strong>kamera</strong>, <strong>skaļruņi/mikrofons</strong>, kā
            arī <strong>ūdens bojājumi</strong>. Uzzini, kā notiek remonts
            sadaļā <Link href="#process-h2">“Kā notiek remonts”</Link>.
          </p>

          <p className={s.paragraph}>
            Skaties arī: <Link href="/iphone-remonts">iPhone remonts</Link> un{' '}
            <Link href="/telefonu-remonts">telefonu remonts</Link> — ja meklē
            remontu citai ierīcei.
          </p>
        </div>
      </section>

      {/* ===== ANCHOR for Header CTA (must be above the brand previews) ===== */}
      <div id="brand-list" className={s.anchorTarget} />

      {/* Brand previews */}
      {brandBlocks.map((b) => (
        <BrandPreview
          key={b.slug}
          brandSlug={b.slug}
          brandName={b.name}
          items={b.items}
          total={b.total}
          href={b.href}
        />
      ))}

      {/* Popular services – non-clickable, with icons */}
      <section className={s.section} aria-labelledby="popular-services-h2">
        <div className={s.container}>
          <Services
            id="tablet-services"
            title="Populārākie remonti"
            items={[
              {
                title: 'Ekrāna maiņa',
                text: 'plaisas, plankumi, skāriena problēmas.',
                icon: LuTabletSmartphone,
              },
              {
                title: 'Akumulatora maiņa',
                text: 'strauji krīt uzlāde, īss darbības laiks.',
                icon: LuBatteryCharging,
              },
              {
                title: 'Uzlādes ligzda',
                text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
                icon: LuPlugZap,
              },
              {
                title: 'Kamera',
                text: 'miglains attēls, fokusēšanās kļūdas.',
                icon: LuCamera,
              },
              {
                title: 'Skaļruņi/mikrofons',
                text: 'klusa skaņa, krakšķi, sarunās nedzird.',
                icon: LuVolume2,
              },
              {
                title: 'Ūdens bojājumi',
                text: 'diagnostika un atjaunošana, ja tas iespējams.',
                icon: LuDroplets,
              },
            ]}
            headingLevel={2}
            variant="list"
          />
        </div>
      </section>

      {/* Process */}
      <div id="process-h2" className={s.anchorTarget} />
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek remonts"
            steps={[
              {
                title: 'Diagnostika',
                text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.',
              },
              {
                title: 'Cena un termiņš',
                text:
                  'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
              },
              {
                title: 'Remonts',
                text:
                  'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.',
              },
              {
                title: 'Pārbaude',
                text:
                  'Pēc remonta testējam visu funkcionalitāti un drošību.',
              },
              {
                title: 'Garantija',
                text:
                  '90 dienu garantija un ieteikumi turpmākai lietošanai.',
              },
            ]}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      {/* Why — full width */}
      <section className={s.section}>
        <Why />
      </section>

      {/* FAQ */}
      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq
            id="tablets-faq"
            title="Biežāk uzdotie jautājumi"
            items={[
              {
                q: 'Cik ilgi ilgst ekrāna maiņa planšetei?',
                a:
                  'Bieži tajā pašā dienā — atkarīgs no modeļa un noslodzes.',
              },
              {
                q: 'Vai mani dati saglabāsies?',
                a:
                  'Darām visu iespējamo; pirms remonta iesakām dublējumu.',
              },
              {
                q: 'Vai detaļām ir garantija?',
                a: 'Jā, gan detaļām, gan darbam.',
              },
              {
                q: 'Vai pieejamas oriģinālas detaļas?',
                a:
                  'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.',
              },
              {
                q: 'Vai varu saņemt aptuveno cenu pirms remonta?',
                a:
                  'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.',
              },
            ]}
            headingLevel={2}
            variant="accordion"
          />
        </div>
      </section>

      {/* Convert band — full width */}
      <section className={s.section}>
        <ConvertBand />
      </section>
    </>
  );
}
