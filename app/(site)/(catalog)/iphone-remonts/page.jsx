// app/(site)/(catalog)/iphone-remonts/page.jsx
import Script from 'next/script';

import categoryContent from '@/data/categoryContent';
import devicesAll from '@/data/devices';

import SeriesGrid from '@components/model-grid/SeriesGrid';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import CommonIssues from '@sections/common-issues/CommonIssues';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import DeviceHero from '@sections/device-hero/DeviceHero';
import Guide from '@sections/guide/Guide';

import { FAQ_CONTEXT, getFaqItems, getFaqLd } from '@/data/faq';

import s from '@styles/Catalog.module.scss';

import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

// JSON-LD helpers
import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildStandardRepairHowToLd,
} from '@/lib/seo/jsonldHelpers';

const cat = categoryContent['iphone-remonts'];

export const metadata = {
  title: cat?.seo?.title ?? 'iPhone remonts Rīgā | iLab',
  description:
    cat?.seo?.metaDescription ??
    'iPhone remonts Rīgā — displeja, baterijas, kameras un uzlādes ligzdas maiņa, ūdens bojājumu novēršana. Ātra diagnostika, skaidras cenas un 90 dienu garantija iLab servisā Rīgā.',
  alternates: { canonical: '/iphone-remonts' },
};

// =============================
// FAQ + CommonIssues content
// =============================

const ISSUES_PREVIEW = [
  {
    q: 'Saplīsis ekrāns / displeja problēmas',
    text: 'iPhone ekrāns saplīsa, plaisas, nereaģē uz pieskārienu',
    icon: 'screen',
    serviceHref: '/iphone-remonts/ekrana-maina',
    id: 'displeja-problemas',
  },
  {
    q: 'Barošanas un uzlādes problēmas',
    text: 'Ātri izlādējas, neslēdzas, neuzlādējas',
    icon: 'battery',
    serviceHref: '/iphone-remonts/baterijas-maina',
    id: 'barosanas-problemas',
  },
  {
    q: 'Kameras problēmas',
    text: 'Kamera nestrādā, miglains attēls',
    icon: 'camera',
    serviceHref: '/iphone-remonts/kamera',
    id: 'kamera-problemas',
  },
  {
    q: 'Mitruma / ūdens bojājumi',
    text: 'Telefons iekritis ūdenī, pēc tam neieslēdzas',
    icon: 'water',
    serviceHref: '/iphone-remonts/udens-bojajumu-remonts',
    id: 'udens-bojajumi',
  },
];

export default function IphoneRemontsPage() {
  const baseHref = '/iphone-remonts';

  // Centralized FAQ data (UI items + JSON-LD)
  const { items: IPHONE_FAQ_ITEMS } = getFaqItems(FAQ_CONTEXT.IPHONE);
  const IPHONE_FAQ_LD = getFaqLd(FAQ_CONTEXT.IPHONE);

  // JSON-LD blocks via helpers
  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: 'Sākums', url: abs('/') },
    { name: 'iPhone remonts Rīgā', url: abs('/iphone-remonts') },
  ]);

  const serviceLd = buildServiceLdForCity({
    path: '/iphone-remonts',
    name: 'iPhone remonts Rīgā',
    description:
      'iPhone remonts Rīgā: displeja un baterijas maiņa, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, skaidras cenas un 90 dienu garantija.',
    // serviceType, city, locationIds use defaults (Rīga + all locations)
  });

  const howToLd = buildStandardRepairHowToLd('iPhone remonts');

  return (
    <>
      {/* JSON-LD */}
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(IPHONE_FAQ_LD)}
      </Script>
      <Script id="howto-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(howToLd)}
      </Script>
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      {/* HERO */}
      <DeviceHero
        image="/images/categories/iphone_remonts.webp"
        alt="iPhone remonts Rīgā"
        focal="right"
        className="category"
        bodyHtml={`<p><strong>Ātrs un drošs iPhone remonts Rīgā</strong> — displeja, baterijas un kameras maiņa tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam.</p>`}
      />

      {/* INTRO */}
      <section className={s.section} aria-labelledby="iphone-intro-h2">
        <div className={s.container}>
          <h2 id="iphone-intro-h2" className={s.h2}>
            iPhone remonts Rīgā — ko mēs darām
          </h2>
          <p className={s.paragraph}>
            Veicam pilna spektra <strong>iPhone remontu Rīgā</strong> — sākot ar{' '}
            <strong>ekrāna maiņu</strong> un <strong>baterijas nomaiņu</strong>, līdz{' '}
            <strong>uzlādes ligzdas</strong> un <strong>kameras remontam</strong>, kā arī{' '}
            <strong>ūdens bojājumu</strong> novēršanai. Pirms darba uzsākšanas nodrošinām{' '}
            <strong>bezmaksas diagnostiku</strong> un saskaņojam precīzu cenu un izpildes laiku. Biežākos
            remontdarbus paveicam tajā pašā dienā. Izmantojam{' '}
            <strong>oriģinālās vai augstas kvalitātes OEM detaļas</strong> un sniedzam{' '}
            <strong>90 dienu garantiju</strong> katram remontam.
          </p>
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section className={s.section} aria-labelledby="iphone-services-h2">
        <div className={s.container}>
          <Services
            id="iphone-services"
            title="Populārākie iPhone remonti"
            items={[
              {
                title: 'Ekrāna (displeja) maiņa',
                text: 'plaisas, tumši plankumi, nereaģē skāriens.',
                icon: LuSmartphone,
                href: '/iphone-remonts/ekrana-maina',
              },
              {
                title: 'Akumulatora maiņa',
                text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
                icon: LuBatteryCharging,
                href: '/iphone-remonts/baterijas-maina',
              },
              {
                title: 'Uzlādes ligzda',
                text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
                icon: LuPlugZap,
                href: '/iphone-remonts/uzlades-ligzdas-maina',
              },
              {
                title: 'Kamera',
                text: 'miglaini attēli, fokusēšanās problēmas.',
                icon: LuCamera,
                href: '/iphone-remonts/kamera',
              },
              {
                title: 'Skaļruņi/mikrofons',
                text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
                icon: LuVolume2,
                href: '/iphone-remonts/skalruni-mikrofons',
              },
              {
                title: 'Ūdens bojājumi',
                text: 'diagnostika un atjaunošana, ja tas iespējams.',
                icon: LuDroplets,
                href: '/iphone-remonts/udens-bojajumu-remonts',
              },
            ]}
          />
        </div>
      </section>

      {/* MODEL GRID */}
      <section
        id="iphone-modeli"
        className={`${s.section} ${s.anchorTarget}`}
        aria-labelledby="iphone-modeli-h2"
      >
        <div className={s.container}>
          <h2 id="iphone-modeli-h2" className={s.h2}>
            {cat?.sections?.modelGrid?.heading ?? 'Izvēlies savu iPhone modeli'}
          </h2>
          <p id="iphone-modeli-intro" className={s.intro}>
            {cat?.sections?.modelGrid?.intro ??
              'Atrast modeli ir viegli — meklē pēc nosaukuma vai pārlūko sērijas.'}
          </p>

          <SeriesGrid
            devices={devicesAll}
            baseHref={baseHref}
            brandSlug="apple"
            categorySlug="telefonu-remonts"
            initialLimit={4}
            autoExpandOnSearch={true}
          />
        </div>
      </section>

      {/* GUIDE */}
      {cat?.show?.guide !== false && cat?.sections?.guide && (
        <Guide
          id="guide"
          title={cat.sections.guide.heading}
          parts={cat.sections.guide.parts}
          headingLevel={2}
        />
      )}

      {/* PROCESS */}
      <Process />

      {/* WHY */}
      <section className={s.section}>
        <Why />
      </section>

      {/* FAQ */}
      <section className={s.section} aria-labelledby="iphone-faq-h2">
        <div className={s.container}>
          <Faq id="iphone-faq" title="Biežāk uzdotie jautājumi" items={IPHONE_FAQ_ITEMS} />
        </div>
      </section>

      {/* CONVERT BAND */}
      <section className={s.section}>
        <ConvertBand />
      </section>
    </>
  );
}
