import React from 'react';
import Script from 'next/script';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import Locations from '@sections/locations/Locations';
import s from '@styles/Catalog.module.scss';

const ORIGIN = 'https://www.ilab.lv';

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      canonicalPath: '/ru/kontakty',
      homeCrumb: 'Главная',
      pageCrumb: 'Контакты',

      headerTitle: 'Контакты',
      headerLead:
        'Свяжитесь с iLab или посетите один из наших сервисных центров в Риге - Domina Shopping или Spice Home. Работаем каждый день.',

      sectionTitle: 'Связь и время работы',
      phoneLabel: 'Телефон',
      emailLabel: 'Э-почта',
      hoursLabel: 'Время работы',
      addressesLabel: 'Адреса',

      dominaLabel: 'Domina Shopping',
      dominaAddress: 'Ieriķu iela 3, Рига',
      spiceLabel: 'Spice Home',
      spiceAddress: 'Jaunmoku iela 13, Рига',
      hoursValue: 'Пн.–Вс. 10:00–21:00',
    };
  }

  return {
    canonicalPath: '/kontakti',
    homeCrumb: 'Sākums',
    pageCrumb: 'Kontakti',

    headerTitle: 'Kontakti',
    headerLead:
      'Sazinies ar iLab vai apmeklē kādu no mūsu servisa centriem Rīgā - Domina Shopping vai Spice Home. Strādājam katru dienu.',

    sectionTitle: 'Saziņa un darba laiks',
    phoneLabel: 'Tālrunis',
    emailLabel: 'E-pasts',
    hoursLabel: 'Darba laiks',
    addressesLabel: 'Adreses',

    dominaLabel: 'Domina Shopping',
    dominaAddress: 'Ieriķu iela 3, Rīga',
    spiceLabel: 'Spice Home',
    spiceAddress: 'Jaunmoku iela 13, Rīga',
    hoursValue: 'P.–Sv. 10:00–21:00',
  };
}

function buildBreadcrumbsLd(locale = 'lv') {
  const strings = getPageStrings(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: strings.homeCrumb,
        item: `${ORIGIN}${locale === 'ru' ? '/ru' : '/'}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: strings.pageCrumb,
        item: `${ORIGIN}${strings.canonicalPath}`,
      },
    ],
  };
}

function buildLocalBusinessLd(locale = 'lv') {
  const strings = getPageStrings(locale);

  return {
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
        name: `iLab - ${strings.dominaLabel}`,
        url: `${ORIGIN}${strings.canonicalPath}`,
        telephone: '+37123370088',
        email: 'info@ilab.lv',
        address: {
          '@type': 'PostalAddress',
          streetAddress: strings.dominaAddress,
          addressLocality: locale === 'ru' ? 'Рига' : 'Rīga',
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
        name: `iLab - ${strings.spiceLabel}`,
        url: `${ORIGIN}${strings.canonicalPath}`,
        telephone: '+37123370088',
        email: 'info@ilab.lv',
        address: {
          '@type': 'PostalAddress',
          streetAddress: strings.spiceAddress,
          addressLocality: locale === 'ru' ? 'Рига' : 'Rīga',
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
}

export default function ContactsPage({
  locale = 'lv',
  siteSettings,
}) {
  const strings = getPageStrings(locale);
  const breadcrumbsLd = buildBreadcrumbsLd(locale);
  const localBusinessLd = buildLocalBusinessLd(locale);

  const headerCrumbs = [
    {
      label: strings.homeCrumb,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.pageCrumb,
      href: strings.canonicalPath,
    },
  ];

  return (
    <>
      <Script
        id={`contacts-breadcrumbs-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id={`contacts-localbusiness-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(localBusinessLd)}
      </Script>

      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        crumbs={headerCrumbs}
      />

      <section className={s.section} aria-labelledby="contacts-h2">
        <div className={s.container}>
          <h2 id="contacts-h2" className={s.h2}>
            {strings.sectionTitle}
          </h2>

          <p className={s.paragraph}>
            {strings.phoneLabel}:{' '}
            <a href="tel:+37123370088">23370088</a> ·{' '}
            {strings.emailLabel}:{' '}
            <a href="mailto:info@ilab.lv">info@ilab.lv</a>
            <br />
            {strings.hoursLabel}: <strong>{strings.hoursValue}</strong>
          </p>

          <p className={s.paragraph}>
            {strings.addressesLabel}:
            <br />
            - <strong>{strings.dominaLabel}</strong>, {strings.dominaAddress}
            <br />
            - <strong>{strings.spiceLabel}</strong>, {strings.spiceAddress}
          </p>
        </div>
      </section>

      <section className={s.section}>
        <Locations
          locale={locale}
          locations={siteSettings?.locations || []}
          pinPositions={siteSettings?.pinPositions || {}}
        />
      </section>
    </>
  );
}