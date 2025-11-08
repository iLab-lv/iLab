// app/(site)/(info)/par-ilab/page.jsx
import React from 'react';
import Script from 'next/script';

import Why from '@sections/why/Why';
import Locations from '@sections/locations/Locations';
import Reviews from '@sections/reviews/Reviews';
import ConvertBand from '@sections/convert-band/ConvertBand';

import s from '@styles/Catalog.module.scss';

const ORIGIN = 'https://www.ilab.lv';

export const metadata = {
  title: 'Par iLab | iLab',
  description:
    'iLab — mūsdienīgs remonta serviss Rīgā: telefonu, planšetdatoru, portatīvo datoru un Dyson remonts. Sertificēti meistari, bezmaksas diagnostika un 90 dienu garantija.',
  alternates: { canonical: '/par-ilab' },
};

export default function AboutPage() {
  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Par iLab', item: `${ORIGIN}/par-ilab/` },
    ],
  };

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${ORIGIN}#organization`,
    name: 'iLab',
    legalName: 'SIA “iLab”',
    vatID: 'Reģ. nr. 40203288307',
    url: ORIGIN,
    sameAs: [],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rīga',
      addressCountry: 'LV',
    },
    department: [
      {
        '@type': 'LocalBusiness',
        name: 'iLab — Domina Shopping',
        url: `${ORIGIN}/kontakti`,
        areaServed: { '@type': 'City', name: 'Rīga' },
      },
      {
        '@type': 'LocalBusiness',
        name: 'iLab — Spice Home',
        url: `${ORIGIN}/kontakti`,
        areaServed: { '@type': 'City', name: 'Rīga' },
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <Script id="about-breadcrumbs" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="about-organization" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(orgLd)}
      </Script>

      {/* Single, multi-paragraph section (header/lead provided by (info)/layout) */}
      <section className={s.section} aria-labelledby="about-content-h2">
        <div className={s.container}>
          <h2 id="about-content-h2" className={s.h2}>Par iLab</h2>

          <p className={s.paragraph}>
            iLab ir mūsdienīgs ierīču remonta serviss Rīgā, kas specializējas
            <strong> tālruņu</strong>, <strong>planšetdatoru</strong>, <strong>portatīvo datoru</strong> un
            <strong> Dyson</strong> ierīču remontā. Mūsu sertificētie meistari strādā ātri un precīzi —
            veic diagnostiku, detaļu nomaiņu un pilnu atjaunošanu tajā pašā dienā, kad tas ir iespējams.
          </p>

          <p className={s.paragraph}>
            iLab dibināts ar vienkāršu mērķi — padarīt profesionālu remontu pieejamu un saprotamu ikvienam.
            Mēs apvienojam tehniskās zināšanas ar atklātu komunikāciju, lai klienti vienmēr zinātu,
            kas tiek darīts un kāpēc.
          </p>

          <p className={s.paragraph}>
            Katram remontam mēs nodrošinām <strong>bezmaksas diagnostiku</strong> un
            <strong> 90 dienu garantiju</strong> detaļām un darbam. Tiek izmantotas tikai pārbaudītas
            rezerves daļas un kvalitatīvi instrumenti, lai rezultāts būtu uzticams un ilglaicīgs.
          </p>

          <p className={s.paragraph}>
            Mums ir divas ērtas filiāles — <strong>Domina Shopping</strong> un <strong>Spice Home</strong> —
            kur pieņemam klientus katru dienu. Neatkarīgi no tā, vai nepieciešama ekrāna nomaiņa,
            baterijas maiņa vai sarežģītāks remonts, iLab komanda palīdzēs ātri un droši.
          </p>

          <p className={s.paragraph}>
            Mūsu redzējums ir kļūt par vadošo remonta servisu Latvijā, kas piedāvā ātru, caurspīdīgu
            un ilgtspējīgu pieeju tehnikas remontam. Pagarinot ierīču kalpošanas laiku, mēs palīdzam
            samazināt elektronisko atkritumu daudzumu un veicinām atbildīgu tehnoloģiju lietošanu.
          </p>
        </div>
      </section>

      {/* Supporting blocks */}
      <section className={s.section}>
        <div className={s.container}>
          <Why />
        </div>
      </section>

      <section className={s.section}>
        <Locations />
      </section>

      <section className={s.section}>
        <Reviews />
      </section>

      <section className={s.section}>
        <ConvertBand />
      </section>
    </>
  );
}
