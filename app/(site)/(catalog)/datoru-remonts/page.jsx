// app/(site)/(catalog)/datoru-remonts/page.jsx
import Script from 'next/script';
import Link from 'next/link';

import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import DeviceHero from '@sections/device-hero/DeviceHero';
import BrandList from '@sections/brand-list/BrandList';

import categories from '@/data/categories';

import {
  LuBug,
  LuKeyboard,
  LuMonitor,
  LuCpu,
  LuPlugZap,
  LuHardDrive,
  LuDroplets,
} from 'react-icons/lu';

import s from './DatoruCategory.module.scss';

const ORIGIN = 'https://www.ilab.lv';

const computerCategory = categories.find((c) => c.slug === 'datoru-remonts');

export const metadata = {
  title: 'Datoru remonts Rīgā — portatīvie un galda datori | iLab',
  description:
    'Datoru remonts Rīgā: portatīvie un galda datori. Ekrāna, tastatūras, dzesēšanas, disku un programmatūras problēmu risināšana. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
  alternates: { canonical: '/datoru-remonts' },
};

export default function DatoruRemontsPage() {
  // JSON-LD
  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Datoru remonts',
        item: `${ORIGIN}/datoru-remonts/`,
      },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}/datoru-remonts#service`,
    serviceType: 'Datoru remonts',
    areaServed: { '@type': 'Country', name: 'Latvia' },
    provider: { '@id': `${ORIGIN}#organization` },
    url: `${ORIGIN}/datoru-remonts/`,
    name: 'Datoru remonts',
    description:
      'Datoru remonts — portatīvo un galda datoru diagnostika un remonts: ekrāns, tastatūra, dzesēšana, diski, operētājsistēma un citi bojājumi. Ātra diagnostika, godīgas cenas, garantija.',
  };

  const itemListLd =
    computerCategory && computerCategory.brands
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: computerCategory.brands.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${ORIGIN}/datoru-remonts/${b.brandSlug}/`,
            name: `${b.name} datoru remonts`,
          })),
        }
      : null;

  return (
    <>
      {/* JSON-LD */}
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>
      {itemListLd && (
        <Script id="itemlist-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(itemListLd)}
        </Script>
      )}

      <main className={s.main}>
        {/* HERO */}
        <DeviceHero
          image="/images/categories/datoru_remonts.webp"
          alt="datoru remonts Rīgā"
          focal="right"
          className="category"
          bodyHtml={`<p><strong>Ātrs un drošs datoru remonts Rīgā</strong> — portatīvie un galda datori, ekrāns, tastatūra, dzesēšana, diski un programmatūra. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`}
        />

        {/* INTRO (SEO copy under H2; Header owns the H1/lead/CTA) */}
        <section className={s.section} aria-labelledby="computers-intro-h2">
          <div className={s.container}>
            <h2 id="computers-intro-h2" className={s.h2}>
              Datoru remonts — ko mēs darām
            </h2>

            <p className={s.leadText}>
              Remontējam portatīvos un galda datorus — ekrāns, tastatūra, dzesēšanas sistēma, cietie diski/SSD un
              programmatūra. Cenu un termiņu saskaņojam pirms darba uzsākšanas, biežākos remontus paveicam tajā pašā
              dienā.
            </p>

            <p>
              Ikdienā veicam <strong>datoru remontu</strong>: <strong>ekrāna maiņu</strong>,{' '}
              <strong>tastatūras nomaiņu</strong>, <strong>putekļu tīrīšanu un termopastas maiņu</strong>,{' '}
              <strong>cieto disku/SSD nomaiņu</strong>, <strong>operētājsistēmas pārinstalēšanu</strong> un vīrusu
              noņemšanu. Pirms darba saskaņojam <strong>cenu un termiņu</strong>. Uzzini, kā notiek remonts sadaļā{' '}
              <Link href="#process-h2">“Kā notiek remonts”</Link>.
            </p>

            <p>
              Strādājam ar <strong>populārākajiem zīmoliem</strong>: MacBook, iMac, Lenovo, HP, Dell, Asus, Acer, MSI
              u.c. Izvēlies zīmolu zemāk un atver konkrēta modeļa lapu vai sazinies ar mums, ja neesi pārliecināts par
              sava datora modeli.
            </p>
          </div>
        </section>

        {/* Popular services — icon cards with explicit hrefs */}
        <section className={s.section} aria-labelledby="popular-services-h2">
          <div className={s.container}>
            <Services
              id="computer-services"
              title="Populārākie datoru remonti"
              items={[
                {
                  title: 'Ekrāna maiņa',
                  text: 'plaisas, mirušās zonas, tumši plankumi.',
                  icon: LuMonitor,
                  href: '/datoru-remonts/ekrana-maina',
                },
                {
                  title: 'Tastatūras maiņa',
                  text: 'nereaģē taustiņi, izlijis šķidrums, ielipuši taustiņi.',
                  icon: LuKeyboard,
                  href: '/datoru-remonts/tastaturas-maina',
                },
                {
                  title: 'Dzesēšanas sistēma',
                  text: 'troksnis, pārkaršana, termopastas maiņa, putekļu tīrīšana.',
                  icon: LuCpu,
                  href: '/datoru-remonts/dzesesanas-sistema',
                },
                {
                  title: 'Cietais disks / SSD',
                  text: 'lēns darbs, neielādējas sistēma, datu pārvietošana.',
                  icon: LuHardDrive,
                  href: '/datoru-remonts/cietais-disks-ssd',
                },
                {
                  title: 'Programmatūra un vīrusi',
                  text: 'OS pārinstalēšana, vīrusu tīrīšana, draiveru problēmas.',
                  icon: LuBug,
                  href: '/datoru-remonts/programmaturas-remonts',
                },
                {
                  title: 'Uzlāde un strāvas pieslēgums',
                  text: 'lādētāja pieslēgums, barošanas ligzda, strāvas problēmas.',
                  icon: LuPlugZap,
                  href: '/datoru-remonts/barosanas-ligzda',
                },
              ]}
            />
          </div>
        </section>

        {/* Brand selection — refactored to BrandList */}
        {computerCategory && computerCategory.brands && (
          <BrandList
            id="brand-list"
            basePath="/datoru-remonts"
            appleTitle="Apple datoru remonts"
            appleIntro="Remontējam visus Apple datorus — no MacBook portatīvajiem un iMac līdz Mac Pro darba stacijām. Diagnoze, detaļu maiņa, veiktspējas uzlabošana un pilns serviss vienuviet."
            otherTitle="Citi zīmoli, ko remontējam"
            otherIntro="Remontējam arī populārākos Windows un citu ražotāju datorus: Lenovo, HP, Dell, Asus, Acer, MSI u.c. Izvēlies zīmolu, lai apskatītu pakalpojumus un atstātu pieteikumu remontam."
            brands={computerCategory.brands}
          />
        )}

        {/* Process */}
        <Process />

        {/* Why — full width */}
        <section className={s.section}>
          <Why />
        </section>

        {/* FAQ */}
        <section className={s.section} aria-labelledby="faq-h2">
          <div className={s.container}>
            <Faq
              id="computers-faq"
              title="Biežāk uzdotie jautājumi"
              items={[
                {
                  q: 'Cik ilgi ilgst datoru remonts?',
                  a: 'Vienkāršāki darbi (piemēram, putekļu tīrīšana, OS pārinstalēšana) bieži ir gatavi tajā pašā vai nākamajā dienā. Sarežģītākiem remontiem termiņu nosakām pēc diagnostikas.',
                },
                {
                  q: 'Vai mani dati būs drošībā?',
                  a: 'Iespēju robežās saglabājam datus. Pirms remonta iesakām izveidot rezerves kopiju vai jautāt meistaram par datu dublēšanas iespējām.',
                },
                {
                  q: 'Vai detaļām ir garantija?',
                  a: 'Jā, gan detaļām, gan veiktajam darbam piešķiram garantiju, parasti 90 dienas. Detalizētu info izskaidro meistars.',
                },
                {
                  q: 'Ko darīt, ja dators pārkarst vai ir ļoti skaļš?',
                  a: 'Visbiežāk nepieciešama dzesēšanas sistēmas tīrīšana un termopastas maiņa. Pēc diagnostikas pateiksim precīzi, kas jādara.',
                },
                {
                  q: 'Vai varu saņemt aptuvenu cenu pirms remonta?',
                  a: 'Jā, pēc ātras diagnostikas nosauksim izmaksu diapazonu un termiņu. Sarežģītākiem bojājumiem cenas precizējam pēc testiem.',
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
      </main>
    </>
  );
}
