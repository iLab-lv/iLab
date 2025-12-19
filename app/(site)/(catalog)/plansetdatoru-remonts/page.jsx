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
import Reviews from '@sections/reviews/Reviews';

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

import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';

import s from '@styles/Catalog.module.scss';

const CATEGORY_PATH = '/plansetdatoru-remonts';

export const metadata = {
  title: 'Planšetdatoru remonts Rīgā — cenas, ātri, garantija | iLab',
  description:
    'Planšetdatoru remonts Rīgā: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
  alternates: { canonical: CATEGORY_PATH },
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

// FAQ items (reused in component + JSON-LD)
const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst ekrāna maiņa planšetdatoram?',
    a: 'Bieži tajā pašā dienā — atkarīgs no konkrētā modeļa, detaļu pieejamības un servisa noslodzes.',
  },
  {
    q: 'Vai mani dati saglabāsies?',
    a: 'Mēs darām visu iespējamo, lai dati saglabātos neskarti. Tomēr pirms remonta vienmēr iesakām izveidot dublējumu.',
  },
  {
    q: 'Vai detaļām ir garantija?',
    a: 'Jā — gan uz rezerves detaļām, gan uz paveikto darbu ir 90 dienu garantija, ja nav jaunu mehānisku vai šķidruma bojājumu.',
  },
  {
    q: 'Vai pieejamas oriģinālas detaļas?',
    a: 'Atkarībā no modeļa piedāvājam oriģinālas vai augstas kvalitātes OEM detaļas. Izvēli un cenu vienmēr saskaņojam ar klientu pirms remonta.',
  },
  {
    q: 'Vai varu saņemt aptuveno cenu pirms remonta?',
    a: 'Jā — pēc ātras diagnostikas sniedzam izmaksu diapazonu un termiņu. Dažiem bojājumiem precīza cena atkarīga no bojājuma apjoma.',
  },
];

// JSON-LD objects
const breadcrumbsLd = buildBreadcrumbsLd([
  { name: 'Sākums', url: abs('/') },
  { name: 'Planšetdatoru remonts', url: abs(CATEGORY_PATH) },
]);

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}${CATEGORY_PATH}#service`,
  serviceType: 'Planšetdatoru remonts',
  areaServed: { '@type': 'City', name: 'Rīga' },
  provider: buildProvidersFromLocations(),
  url: abs(CATEGORY_PATH),
  name: 'Planšetdatoru remonts Rīgā',
  description:
    'Planšetdatoru remonts Rīgā: ekrāna maiņa, baterijas nomaiņa, uzlādes ligzda, kamera, skaņa un ūdens bojājumi. Ātra diagnostika, godīgas cenas un 90 dienu garantija.',
};

function buildItemListLd(brandBlocks) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: brandBlocks.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: abs(b.href),
      name: `${b.name} planšetdatoru remonts`,
    })),
  };
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }, index) => ({
    '@type': 'Question',
    '@id': `${ORIGIN}${CATEGORY_PATH}#faq-q${index + 1}`,
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const processHowToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${ORIGIN}${CATEGORY_PATH}#howto`,
  name: 'Planšetdatoru remonta process iLab',
  description:
    'Kā soli pa solim notiek planšetdatoru diagnostika, remonts un testēšana iLab servisā Rīgā.',
  step: [
    {
      '@type': 'HowToStep',
      name: '1. Diagnostika',
      text: 'Ātri pārbaudām planšetdatoru, apstiprinām problēmu (ekrāns, baterija, uzlāde, skaņa, kamera u.c.) un izvērtējam bojājuma apmēru.',
    },
    {
      '@type': 'HowToStep',
      name: '2. Cena un termiņš',
      text: 'Pirms remonta sākšanas saskaņojam izmaksas, rezerves detaļu veidu (oriģināls vai OEM) un izpildes termiņu.',
    },
    {
      '@type': 'HowToStep',
      name: '3. Remonts',
      text: 'Sertificēti meistari veic ekrāna, baterijas, uzlādes ligzdas, kameras vai citu komponentu remontu, izmantojot kvalitatīvas detaļas.',
    },
    {
      '@type': 'HowToStep',
      name: '4. Pārbaude',
      text: 'Pēc remonta testējam skārienu, attēlu, skaņu, uzlādi, tīklu un citas ikdienai svarīgas funkcijas, lai pārliecinātos par stabilu darbību.',
    },
    {
      '@type': 'HowToStep',
      name: '5. Garantija un izsniegšana',
      text: 'Izsniedzam planšetdatoru ar 90 dienu garantiju uz detaļu un darbu, sniedzam ieteikumus turpmākai lietošanai.',
    },
  ],
};

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

  const itemListLd = buildItemListLd(brandBlocks);

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
        id="breadcrumbs-jsonld-tablets"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script
        id="service-jsonld-tablets"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>
      <Script
        id="itemlist-jsonld-tablets"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(itemListLd)}
      </Script>
      <Script
        id="faq-jsonld-tablets"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqLd)}
      </Script>
      <Script
        id="process-jsonld-tablets"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(processHowToLd)}
      </Script>

      {/* VISUAL HERO (DeviceHero) */}
      <DeviceHero
        image="/images/categories/plansetdatoru_remonts.webp"
        alt="Planšetdatoru remonts Rīgā"
        bodyHtml={heroHtml}
      />

      {/* INTRO (SEO copy under H2; Header owns H1/lead/CTA) */}
      <section className={s.section} aria-labelledby="tablets-intro-h2">
        <div className={s.container}>
          <h2 id="tablets-intro-h2" className={s.h2}>
            Planšetdatoru remonts — ko mēs darām
          </h2>

          <p className={s.intro}>
            Ekrāni, baterijas, uzlādes ligzdas, kameras un citi remonta darbi
            planšetdatoriem. Cenas saskaņojam pirms darba uzsākšanas, biežākos
            darbus paveicam tajā pašā dienā. Izvēlies savu zīmolu un atver
            konkrēta modeļa lapu.
          </p>

          <p className={s.paragraph}>
            Strādājam ar <strong>iPad</strong>,{' '}
            <strong>Samsung Galaxy Tab</strong> un citiem populāriem
            planšetdatoriem. Biežākie darbi: <strong>ekrāna maiņa</strong>,{' '}
            <strong>baterijas nomaiņa</strong>, <strong>uzlādes ligzdas remonts</strong>,{' '}
            <strong>kameras remonts</strong>, <strong>skaļruņi/mikrofons</strong>, kā
            arī <strong>ūdens bojājumi</strong>. Uzzini, kā notiek remonts sadaļā{' '}
            <Link href="#process-h2">“Kā notiek remonts”</Link>.
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
            title="Populārākie planšetdatoru remonti"
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

      <Reviews />

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
                text: 'Ātri pārbaudām planšetdatoru un apstiprinām problēmu.',
              },
              {
                title: 'Cena un termiņš',
                text:
                  'Saskaņojam izmaksas un izpildes laiku pirms jebkura remonta.',
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
            items={FAQ_ITEMS}
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
