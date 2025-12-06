// app/(site)/(info)/kontakti/page.jsx
import React from 'react';
import Script from 'next/script';

import Locations from '@sections/locations/Locations';
import s from '@styles/Catalog.module.scss';

const ORIGIN = 'https://www.ilab.lv';

export const metadata = {
  title: 'Kontakti | iLab',
  description:
    'iLab kontakti: servisa centri Rīgā — Domina Shopping un Spice Home. Tālrunis 23370088, e-pasts info@ilab.lv. Darba laiks katru dienu 10:00–21:00.',
  alternates: { canonical: '/kontakti' },
};

// ── JSON-LD: Breadcrumbs (static) -----------------------------------

const BREADCRUMBS_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'Kontakti', item: `${ORIGIN}/kontakti/` },
  ],
};

// ── JSON-LD: Organization + two LocalBusiness departments -----------

const LOCALBUSINESS_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${ORIGIN}#organization`,
  name: 'iLab',
  url: ORIGIN,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+37123370088',
      email: 'info@ilab.lv',
      areaServed: 'LV',
      availableLanguage: ['lv', 'ru', 'en'],
    },
  ],
  department: [
    {
      '@type': 'LocalBusiness',
      name: 'iLab — Domina Shopping',
      url: `${ORIGIN}/kontakti`,
      telephone: '+37123370088',
      email: 'info@ilab.lv',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ieriķu iela 3 (Domina Shopping)',
        addressLocality: 'Rīga',
        addressCountry: 'LV',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '10:00',
          closes: '21:00',
        },
      ],
    },
    {
      '@type': 'LocalBusiness',
      name: 'iLab — Spice Home',
      url: `${ORIGIN}/kontakti`,
      telephone: '+37123370088',
      email: 'info@ilab.lv',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jaunmoku iela 13 (Spice Home)',
        addressLocality: 'Rīga',
        addressCountry: 'LV',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '10:00',
          closes: '21:00',
        },
      ],
    },
  ],
};

export default function ContactsPage() {
  return (
    <>
      {/* JSON-LD */}
      <Script
        id="contacts-breadcrumbs"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(BREADCRUMBS_LD)}
      </Script>

      <Script
        id="contacts-localbusiness"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(LOCALBUSINESS_LD)}
      </Script>

      {/* Header/lead come from (info)/layout via contentRegistry.info.kontakti */}

      {/* Contact summary (plain text, quick actions) */}
      <section className={s.section} aria-labelledby="contacts-h2">
        <div className={s.container}>
          <h2 id="contacts-h2" className={s.h2}>
            Saziņa un darba laiks
          </h2>
          <p className={s.paragraph}>
            Tālrunis: <a href="tel:+37123370088">23370088</a> ·{' '}
            E-pasts: <a href="mailto:info@ilab.lv">info@ilab.lv</a>
            <br />
            Darba laiks: <strong>P.–Sv. 10:00–21:00</strong>
          </p>
          <p className={s.paragraph}>
            Adreses:
            <br />
            — <strong>Domina Shopping</strong>, Ieriķu iela 3, Rīga
            <br />
            — <strong>Spice Home</strong>, Jaunmoku iela 13, Rīga
          </p>
        </div>
      </section>

      {/* Map / store blocks */}
      <section className={s.section}>
        <Locations />
      </section>
    </>
  );
}
