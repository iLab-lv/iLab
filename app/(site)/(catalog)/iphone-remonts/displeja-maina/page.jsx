import Script from 'next/script';
import Link from 'next/link';
import servicesContent from '@/data/servicesContent';
import s from '../Service.module.scss';

const ORIGIN = 'https://www.ilab.lv';
const key = 'iphone-remonts/displeja-maina';
const svc = servicesContent[key];

export const metadata = {
  title: svc?.seo?.title ?? 'iPhone displeja maiņa | iLab',
  description: svc?.seo?.metaDescription ?? '',
  alternates: { canonical: '/iphone-remonts/displeja-maina' },
};

const breadcrumbsLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'iPhone remonts', item: `${ORIGIN}/iphone-remonts/` },
    { '@type': 'ListItem', position: 3, name: 'iPhone displeja maiņa', item: `${ORIGIN}/iphone-remonts/displeja-maina/` },
  ],
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${ORIGIN}/iphone-remonts/displeja-maina#service`,
  serviceType: 'iPhone displeja maiņa',
  areaServed: { '@type': 'Country', name: 'Latvia' },
  provider: { '@id': `${ORIGIN}#organization` },
  url: `${ORIGIN}/iphone-remonts/displeja-maina/`,
  name: 'iPhone displeja maiņa',
  description: svc?.seo?.metaDescription || 'iPhone displeja maiņa ar garantiju.',
};

export default function Page() {
  return (
    <>
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      <section className={s.section}>
        <div className={s.container}>
          <h2 className={s.h2}>Par pakalpojumu</h2>
          <p className={s.p}>
            Nomainām bojātus iPhone displejus (plaisa, mirgošana, “ghost touch”, melni plankumi) tajā pašā dienā, ja detaļas ir uz vietas.
            Pirms darba saskaņojam cenu un termiņu, nodrošinām garantiju.
          </p>

          <div className={s.ctaRow}>
            <Link href="/iphone-remonts#iphone-modeli" className={s.linkBtn}>Izvēlies modeli</Link>
            <Link href="/iphone-remonts" className={s.linkGhost}>← Atpakaļ uz iPhone remontu</Link>
          </div>
        </div>
      </section>
    </>
  );
}
