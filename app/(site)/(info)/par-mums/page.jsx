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
    'SIA iLab — profesionāls telefona un datoru serviss Rīgā ar 10+ gadu pieredzi. Remonts privātpersonām un B2B: viedtālruņi, planšetes, datori, Dyson. Bezmaksas diagnostika un 90 dienu garantija.',
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

      {/* Content */}
      <section className={s.section} aria-labelledby="about-content-h2">
        <div className={s.container}>
          <h2 id="about-content-h2" className={s.h2}>Par mums</h2>

          <p className={s.paragraph}>
            <strong>SIA iLab</strong> — profesionāls telefona un datoru serviss Rīgā ar vairāk nekā
            <strong> 10 gadu pieredzi</strong> tehnoloģiju apkalpošanas un remonta jomā. Mēs sniedzam ātru un
            kvalitatīvu tehnikas remontu gan privātpersonām, gan uzņēmumiem (B2B), nodrošinot pilnu servisa
            pakalpojumu klāstu.
          </p>

          <h3 className={s.h3}>iLab atradīsi: T/C Domina Shopping un TC Spice Home</h3>
          <p className={s.paragraph}>
            Mūsu servisa centri atrodas <strong>TC Domina Shopping</strong> un <strong>TC Spice Home</strong>,
            lai klientiem būtu ērti nogādāt un saņemt ierīces jebkurā dienas laikā. Abās filiālēs pieejami
            viedtālruņu, planšetdatoru, datoru un viedpulksteņu remonts, putekļusūcēju apkope, programmatūras
            uzstādīšana un citi tehniskie pakalpojumi.
          </p>

          <h3 className={s.h3}>Mūsu misija</h3>
          <p className={s.paragraph}>
            Jūsu ierīces, mūsu pieredze — uzticams serviss katru dienu, gan privātpersonām, gan uzņēmumiem.
            Mūsu uzdevums ir nodrošināt, lai telefons, dators, planšetdators vai citas ierīces atkal
            strādātu kā jaunas. Tehnoloģijām ir jāatvieglo dzīve, nevis jārada problēmas — un tieši to mēs
            nodrošinām katru dienu.
          </p>

          <h3 className={s.h3}>iLab komanda</h3>
          <p className={s.paragraph}>
            iLab tehniķi ir apmācīti speciālisti, kas nepārtraukti pilnveido zināšanas, sekojot līdzi
            jaunākajām tehnoloģiju tendencēm. Tas ļauj mums nodrošināt augstāko kvalitāti
            <strong> Apple, Samsung, Huawei, Xiaomi, Lenovo, Dyson</strong> un citu zīmolu ierīču remontā.
            Sniedzam pakalpojumu visā Latvijā privātpersonām un B2B.
          </p>

          <h3 className={s.h3}>Kāpēc izvēlēties iLab</h3>
          <ul className={s.list}>
            <li>10+ gadu pieredze ierīču remontā;</li>
            <li>Telefona un datoru remonts Rīgā — divās ērtās lokācijās: TC Domina Shopping un TC Spice Home;</li>
            <li>Darbojamies katru dienu, arī brīvdienās;</li>
            <li>Apkalpojam privātpersonas un B2B klientus visā Latvijā;</li>
            <li>Kvalitatīvas rezerves daļas un profesionāla diagnostika;</li>
            <li>Defektācijas aktu sagatavošana klienta apdrošināšanas uzņēmumam;</li>
            <li>Godīga cenu politika un skaidra saziņa ar klientu;</li>
            <li>90 dienu garantija veiktajam remontam.</li>
          </ul>

          <h3 className={s.h3}>iLab vērtības</h3>
          <ul className={s.list}>
            <li><strong>Precizitāte un ātrums</strong> — ierīce tiek salabota pēc iespējas īsākā laikā;</li>
            <li><strong>Attīstība un kvalitāte</strong> — mūsu tehniķi nepārtraukti pilnveido zināšanas;</li>
            <li><strong>Atbildība un godīgums</strong> — nekādu slēptu izmaksu vai neskaidru solījumu;</li>
            <li><strong>Uzticamība</strong> — mēs atbildam par katru paveikto remontu.</li>
          </ul>
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
