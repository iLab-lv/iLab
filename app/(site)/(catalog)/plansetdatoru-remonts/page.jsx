import Script from 'next/script';
import Link from 'next/link';

import categoryContent from '@/data/categoryContent';
import devicesAll from '@/data/devices';
import { tabletIssues } from '@/data/commonIssues';

import Services      from '@sections/services/Services';
import CommonIssues  from '@sections/common-issues/CommonIssues';
import ModelGrid     from '@components/model-grid/ModelGrid';
import Why           from '@sections/why/Why';
import Faq           from '@sections/faq/Faq';
import ConvertBand   from '@sections/home/ConvertBand';


// Reuse same look as iPhone category:
import s from './PlansetRemonts.module.scss';

const ORIGIN = 'https://www.ilab.lv';
const cat = categoryContent['plansetdatoru-remonts'];

export const metadata = {
  title: cat?.seo?.title ?? 'Planšetdatoru remonts | iLab',
  description: cat?.seo?.metaDescription ?? '',
  alternates: { canonical: '/plansetdatoru-remonts' },
};

const TABLET_SERVICES = [
  { title: 'Displeja (ekrāna) maiņa', text: 'plaisas, plankumi, nereaģē skāriens.' },
  { title: 'Baterijas maiņa', text: 'strauji krīt uzlāde, negaidīti izslēdzas.' },
  { title: 'Uzlādes ligzda', text: 'nenoturas kabelis, lēna uzlāde.' },
  { title: 'Kameras remonts', text: 'miglaini attēli, autofokuss nestrādā.' },
  { title: 'Ūdens bojājumi', text: 'diagnostika un atjaunošana, ja iespējams.' },
];

function getTabletDevices(list) {
  const f = list.filter((d) => d.category === 'plansetdatoru-remonts');
  f.sort((a, b) => {
    if (a.popular !== b.popular) return Number(b.popular) - Number(a.popular);
    if (a.year && b.year && a.year !== b.year) return b.year - a.year;
    return a.name.localeCompare(b.name, 'lv');
  });
  return f;
}

const faqItems = [
  { q: 'Cik ilgi ilgst planšetdatora remonts?', a: 'Bieži tajā pašā dienā; atkarīgs no bojājuma un detaļu pieejamības.' },
  { q: 'Vai nodrošināt garantiju?', a: 'Jā, 90 dienas uz remontu un detaļām.' },
  { q: 'Vai diagnostika ir bez maksas?', a: 'Jā, sākotnējā diagnostika ir bez maksas.' },
];

const breadcrumbsLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'Planšetdatoru remonts', item: `${ORIGIN}/plansetdatoru-remonts/` },
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
  description: 'iPad un citu planšetdatoru remonts: displejs, baterija, uzlāde, kamera, ūdens bojājumi.',
};

export default function TabletsPage() {
  const devices = getTabletDevices(devicesAll);

  return (
    <>
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      {/* Preface (short SEO copy) */}
      <section className={s.preface} aria-labelledby="preface-h2">
        <div className={s.container}>
          <h2 id="preface-h2" className={s.h2}>Planšetdatoru remonts — ātri un droši</h2>
          <p className={s.paragraph}>
            Remontējam iPad un citas planšetes — displejs, baterija, uzlādes ligzda, kamera un mitruma bojājumi.
            Bezmaksas diagnostika, skaidras cenas un 90 dienu garantija.
          </p>
        </div>
      </section>

      {/* Services (popular repairs) */}
      <Services
        id="tablet-services"
        title="Populārākie remonti"
        items={TABLET_SERVICES}
        headingLevel={2}
        variant="list"
      />

      {/* Symptoms → fixes */}
      <CommonIssues
        id="tablet-issues"
        title="Ar kādiem jautājumiem visbiežāk pie mums vēršas"
        items={tabletIssues}
        headingLevel={2}
      />

      {/* Model grid */}
      <section id="plansetu-modeli" className={s.anchorTarget} aria-labelledby="tablet-models-h2">
        <div className={s.container}>
          <h2 id="tablet-models-h2" className={s.h2}>
            {cat?.sections?.modelGrid?.heading ?? 'Izvēlies savu planšetdatoru'}
          </h2>
          <p className={s.intro}>
            {cat?.sections?.modelGrid?.intro ?? 'Ja neredzi savu modeli — uzraksti mums, palīdzēsim.'}
          </p>
          {/* For category page we’ll use /plansetdatoru-remonts/<device> */}
          <ModelGrid devices={devices} baseHref="/plansetdatoru-remonts" />
        </div>
      </section>

      <Why />
      <Faq id="tablet-faq" title="Biežāk uzdotie jautājumi" items={faqItems} headingLevel={2} variant="accordion" />
      <ConvertBand />
    </>
  );
}
