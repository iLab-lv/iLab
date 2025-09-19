// screens/HomeScreen.jsx
import React from 'react';
import Link from 'next/link';
import Hero from '@sections/hero/Hero';

import Devices from '@sections/home-devices/Devices';
import Why from '@sections/why/Why';
import Locations from '@sections/home/Locations';
import Reviews from '@sections/home/Reviews';
import Faq from '@sections/faq/Faq';           // ← use shared FAQ
import ConvertBand from '@sections/convert-band/ConvertBand';

const HOME_FAQ_ITEMS = [
  {
    q: 'Cik maksā iPhone ekrāna maiņa?',
    a: <>Cena atkarīga no modeļa. Skati <Link href="/iphone-remonts">iPhone remonts</Link> sadaļu.</>,
  },
  {
    q: 'Cik ilgi aizņem baterijas maiņa?',
    a: 'Parasti 30–120 min tajā pašā dienā, atkarībā no modeļa un detaļu pieejamības.',
  },
  {
    q: 'Vai dodiet garantiju uz remontu?',
    a: 'Jā, 90 dienu garantija visiem remontdarbiem (izņemot ūdens bojājumu diagnostiku).',
  },
];

export default function HomeScreen() {
  return (
    <main>
      <Hero
        title="Ātrs mobilo ierīču servisa centrs"
        subtitle={
          <>
            Remonts tajā pašā dienā. 90&nbsp;dienu garantija. Divas filiāles&nbsp;Rīgā: Domina un Spice Home.
          </>
        }
        rating={{
          value: 4.9,
          count: 230,
          sourceLabel: 'Google',
          href: '#reviews',
          ariaLabel: 'Google vērtējums 4.9 no 5, 230 atsauksmes',
        }}
        cta={{ label: 'Izvēlies ierīci', href: '#services' }}
        align="center"
        background="gradient"
      />

      <div id="services" />
      <Devices />

      <Why />

      <Locations />

      <div id="reviews" />
      <Reviews />

      {/* Shared FAQ section */}
      <Faq
        id="home-faq"
        title="Biežāk uzdotie jautājumi"
        items={HOME_FAQ_ITEMS}
        headingLevel={2}
        variant="accordion"
      />

      <ConvertBand />
    </main>
  );
}
