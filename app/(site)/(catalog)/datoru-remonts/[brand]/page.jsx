// app/(site)/(catalog)/datoru-remonts/[brand]/page.jsx

import Script from 'next/script';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import devicesAll from '@/data/devices';
import categories from '@/data/categories';

import DeviceHero from '@sections/device-hero/DeviceHero';
import SeriesGrid from '@components/model-grid/SeriesGrid';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import {
  LuMonitor,
  LuKeyboard,
  LuBatteryCharging,
  LuCpu,
  LuHardDrive,
  LuBug,
  LuPlugZap,
} from 'react-icons/lu';

import c from '@styles/Catalog.module.scss';

// JSON-LD helpers
import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildStandardRepairHowToLd,
  buildFaqLdFromPairs,
} from '@/lib/seo/jsonldHelpers';

/* ---------------------------------------------
   Helpers
---------------------------------------------- */
function getComputersCategory() {
  return categories.find((cat) => cat.slug === 'datoru-remonts') || null;
}

function getComputerBrandConfig(brandSlug) {
  const cat = getComputersCategory();
  if (!cat) return null;

  const brand =
    cat.brands?.find((b) => (b.brandSlug || '').toLowerCase() === brandSlug) || null;

  if (!brand) return null;

  const name = brand.name || brandSlug;
  const deviceType = brand.deviceType || 'laptop';
  const hasModels = Boolean(brand.hasModels);

  return {
    name,
    brandSlug: brand.brandSlug || brandSlug,
    deviceType,
    hasModels,
    heroImage: brand.heroImage || cat.heroImage || '/images/categories/datoru_remonts.webp',
    logo: brand.logo || null,
    tint: brand.tint || 'rgba(0,200,180,0.20)',
    heroAlt: brand.heroAlt || `${name} datoru remonts`,
  };
}

/* ---------------------------------------------
   Static params / SSG
---------------------------------------------- */
export const dynamicParams = false;

export async function generateStaticParams() {
  const cat = getComputersCategory();
  if (!cat || !Array.isArray(cat.brands)) return [];

  return cat.brands.map((b) => ({
    brand: String(b.brandSlug || '').toLowerCase(),
  }));
}

/* ---------------------------------------------
   Metadata
---------------------------------------------- */
export async function generateMetadata({ params }) {
  const brandSlug = String(params.brand || '').toLowerCase();
  const cfg = getComputerBrandConfig(brandSlug);

  if (!cfg) {
    return {
      title: 'Datoru remonts | iLab',
      description:
        'Datoru remonts Rīgā — portatīvie un galda datori. Ātra diagnostika, godīgas cenas, garantija.',
    };
  }

  const title = `${cfg.name} datoru remonts Rīgā | iLab`;
  const description = `Profesionāls ${cfg.name} datoru remonts Rīgā: ekrāns, tastatūra, dzesēšana, diski un programmatūra. Ātra diagnostika, godīgas cenas, 90 dienu garantija.`;

  return {
    title,
    description,
    alternates: { canonical: `/datoru-remonts/${cfg.brandSlug}` },
  };
}

/* ---------------------------------------------
   Shared content
---------------------------------------------- */

const PROCESS_STEPS = [
  { title: 'Diagnostika', text: 'Pārbaudām datoru, nosakām bojājumu un iespējamos risinājumus.' },
  {
    title: 'Cena un termiņš',
    text: 'Pirms darba saskaņojam izmaksas un izpildes termiņu, bez slēptām izmaksām.',
  },
  {
    title: 'Remonts',
    text: 'Veicam remontu, izmantojot kvalitatīvas detaļas un piemērotas remonta metodes.',
  },
  {
    title: 'Testēšana',
    text: 'Pārbaudām dzesēšanu, veiktspēju un galvenās funkcijas pēc remonta.',
  },
  {
    title: 'Garantija',
    text: '90 dienu garantija darbam un detaļām, kā arī ieteikumi turpmākai lietošanai.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst datoru remonts?',
    a: 'Vienkāršāki darbi bieži ir gatavi tajā pašā vai nākamajā dienā. Sarežģītākiem remontiem termiņu nosakām pēc diagnostikas.',
  },
  {
    q: 'Vai mani dati būs drošībā?',
    a: 'Iespēju robežās saglabājam datus, bet pirms remonta iesakām izveidot rezerves kopiju vai pārrunāt dublēšanas iespējas ar meistaru.',
  },
  {
    q: 'Vai detaļām ir garantija?',
    a: 'Jā, gan detaļām, gan veiktajam darbam piešķiram garantiju (parasti 90 dienas).',
  },
  {
    q: 'Ko darīt, ja dators pārkarst vai ir ļoti skaļš?',
    a: 'Visbiežāk nepieciešama dzesēšanas sistēmas tīrīšana un termopastas maiņa. Pēc diagnostikas pateiksim precīzi, kas jādara.',
  },
  {
    q: 'Vai varu saņemt aptuvenu cenu pirms remonta?',
    a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu. Sarežģītākiem bojājumiem cenas precizējam pēc testiem.',
  },
];

// Popular services by device type
const POPULAR_LAPTOP_REPAIRS = [
  {
    title: 'Ekrāna maiņa',
    text: 'plaisas, mirušās zonas, tumši plankumi.',
    icon: LuMonitor,
  },
  {
    title: 'Tastatūras maiņa',
    text: 'nereaģē taustiņi, izlijis šķidrums, ielipuši taustiņi.',
    icon: LuKeyboard,
  },
  {
    title: 'Akumulatora maiņa',
    text: 'strauji krīt uzlāde, dators izslēdzas pie zemāka procenta.',
    icon: LuBatteryCharging,
  },
  {
    title: 'Dzesēšanas sistēma',
    text: 'troksnis, pārkaršana, termopastas maiņa, putekļu tīrīšana.',
    icon: LuCpu,
  },
  {
    title: 'Cietais disks / SSD',
    text: 'lēns darbs, neielādējas sistēma, datu pārvietošana.',
    icon: LuHardDrive,
  },
  {
    title: 'Programmatūra un vīrusi',
    text: 'OS pārinstalēšana, vīrusu tīrīšana, draiveru problēmas.',
    icon: LuBug,
  },
];

const POPULAR_AIO_REPAIRS = [
  {
    title: 'Ekrāna maiņa',
    text: 'plaisas, mirušās zonas, krāsu defekti.',
    icon: LuMonitor,
  },
  {
    title: 'Dzesēšanas sistēma',
    text: 'troksnis, pārkaršana, ventilatoru un radiatoru tīrīšana.',
    icon: LuCpu,
  },
  {
    title: 'Cietais disks / SSD',
    text: 'lēna darbība, sistēma neielādējas, datu migrācija.',
    icon: LuHardDrive,
  },
  {
    title: 'Programmatūra un vīrusi',
    text: 'OS pārinstalēšana, vīrusu un reklāmprogrammu noņemšana.',
    icon: LuBug,
  },
  {
    title: 'Barošana',
    text: 'ieslēgšanās problēmas, barošanas bloka diagnostika.',
    icon: LuPlugZap,
  },
];

const POPULAR_DESKTOP_REPAIRS = [
  {
    title: 'Barošanas bloks',
    text: 'dators neieslēdzas, izslēdzas zem slodzes.',
    icon: LuPlugZap,
  },
  {
    title: 'Dzesēšanas sistēma',
    text: 'skaļi ventilatori, pārkaršana, termopastas maiņa.',
    icon: LuCpu,
  },
  {
    title: 'Cietais disks / SSD',
    text: 'lēna darbība, klikšķi no diska, datu atgūšana un migrācija.',
    icon: LuHardDrive,
  },
  {
    title: 'Programmatūra un vīrusi',
    text: 'OS pārinstalēšana, vīrusu un ļaunatūras noņemšana.',
    icon: LuBug,
  },
  {
    title: 'Komponentu maiņa',
    text: 'atmiņa, videokarte, paplašināšana un uzlabojumi.',
    icon: LuCpu,
  },
];

function getPopularRepairsForType(deviceType) {
  switch (deviceType) {
    case 'aio':
      return POPULAR_AIO_REPAIRS;
    case 'desktop':
      return POPULAR_DESKTOP_REPAIRS;
    case 'laptop':
    default:
      return POPULAR_LAPTOP_REPAIRS;
  }
}

/* ---------------------------------------------
   Page component
---------------------------------------------- */

export default function BrandComputersPage({ params }) {
  const brandSlug = String(params.brand || '').toLowerCase();

  const cat = getComputersCategory();
  const allowed =
    (cat?.brands || []).map((b) => String(b.brandSlug || '').toLowerCase());

  if (!allowed.includes(brandSlug)) return notFound();

  const cfg = getComputerBrandConfig(brandSlug);
  if (!cfg) return notFound();

  const popularRepairs = getPopularRepairsForType(cfg.deviceType);

  const brandDevices = devicesAll.filter(
    (d) =>
      d.category === 'datoru-remonts' &&
      (d.brandSlug || '').toLowerCase() === brandSlug
  );

  const heroHtml = `<p><strong>${cfg.name} datoru remonts Rīgā</strong> — portatīvie un galda datori, ekrāns, tastatūra, dzesēšana, diski un programmatūra. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`;

  // ---------- JSON-LD via helpers ----------

  const path = `/datoru-remonts/${cfg.brandSlug}`;

  const serviceLd = buildServiceLdForCity({
    path,
    name: `${cfg.name} datoru remonts`,
    description: `${cfg.name} datoru remonts: ekrāns, dzesēšana, diski, programmatūra un citi darbi. Ātra diagnostika, godīgas cenas, garantija.`,
    // city + provider locations use defaults (Rīga + all LOCATIONS)
  });

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: 'Sākums', url: abs('/') },
    { name: 'Datoru remonts', url: abs('/datoru-remonts') },
    { name: `${cfg.name} datoru remonts`, url: abs(path) },
  ]);

  const howToLd = buildStandardRepairHowToLd(`${cfg.name} datoru remonts`);

  const faqLd = buildFaqLdFromPairs(FAQ_ITEMS);

  return (
    <>
      {/* JSON-LD */}
      <Script
        id="service-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>
      <Script
        id="breadcrumbs-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script
        id="howto-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(howToLd)}
      </Script>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqLd)}
      </Script>

      {/* HERO */}
      <DeviceHero
        image={cfg.heroImage}
        alt={cfg.heroAlt}
        brandLogo={cfg.logo}
        brandKey={cfg.brandSlug}
        tint={cfg.tint}
        focal="right"
        bodyHtml={heroHtml}
      />

      {/* INTRO */}
      <section className={c.section} aria-labelledby="brand-intro-h2">
        <div className={c.container}>
          <h2 id="brand-intro-h2" className={c.h2}>
            {cfg.name} datoru remonts — ko mēs darām
          </h2>
          <p className={c.intro}>
            Remontējam {cfg.name} portatīvos un galda datorus — ekrāns, dzesēšana, diski un
            programmatūra. Cenas atšķiras pēc modeļa un bojājuma sarežģītības, tāpēc precīzu
            piedāvājumu sagatavojam pēc diagnostikas.
          </p>
          <p className={c.paragraph}>
            Biežākie darbi: <strong>ekrāna maiņa</strong>,{' '}
            <strong>dzesēšanas sistēmas tīrīšana un termopastas maiņa</strong>,{' '}
            <strong>cietā diska/SSD nomaiņa</strong>, <strong>operētājsistēmas pārinstalēšana</strong>{' '}
            un <strong>vīrusu noņemšana</strong>. Uzzini, kā notiek remonts sadaļā{' '}
            <Link href="#process-h2">“Kā notiek remonts”</Link>.
          </p>
        </div>
      </section>

      {/* MODEL GRID (only if hasModels, e.g., MacBook) */}
      <section
        id="brand-modeli"
        className={`${c.section} ${c.anchorTarget}`}
        aria-labelledby="brand-modeli-h2"
      >
        <div className={c.container}>
          <h2 id="brand-modeli-h2" className={c.h2}>
            {cfg.name} modeļi, ko remontējam
          </h2>

          {cfg.hasModels ? (
            <>
              <p className={c.intro}>
                Zemāk redzami populārākie {cfg.name} modeļi. Izvēlies savu modeli, lai apskatītu
                biežākos remontus un cenas (ja pieejamas).
              </p>
              <p className={c.paragraph} style={{ marginTop: 0 }}>
                Cenas atšķiras pēc modeļa — atver sava modeļa lapu, lai redzētu remonta cenas.
              </p>

              <SeriesGrid
                devices={devicesAll}
                baseHref={`/datoru-remonts/${cfg.brandSlug}`}
                brandSlug={cfg.brandSlug}
                categorySlug="datoru-remonts"
                initialLimit={4}
                autoExpandOnSearch={true}
              />

              {brandDevices.length === 0 && (
                <p style={{ opacity: 0.8, marginTop: 16 }}>
                  Pagaidām šim zīmolam nav pievienotu modeļu. Sazinies ar mums, lai precizētu remontu.
                </p>
              )}
            </>
          ) : (
            <p className={c.intro}>
              Strādājam ar dažādiem {cfg.name} datoru modeļiem. Cenu un termiņu nosakām pēc ātras
              diagnostikas uz vietas servisā — atstāj pieteikumu vai zvani, un meistars paskaidros
              nākamos soļus.
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
            items={popularRepairs}
          />
        </div>
      </section>

      {/* Process */}
      <Process steps={PROCESS_STEPS} headingLevel={2} variant="cards" />

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
