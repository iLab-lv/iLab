// screens/HomeScreen.jsx
import React from 'react';
import Link from 'next/link';
import Hero from '@sections/hero/Hero';

import Devices from '@sections/home-devices/Devices';
import Why from '@sections/why/Why';
import Locations from '@sections/locations/Locations';
import Reviews from '@sections/reviews/Reviews';
import Faq from '@sections/faq/Faq';
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
        cta={{ label: 'Apskatīt pakalpojumus', href: '#services' }}
        align="center"
        background="gradient"
        imageSrc="/images/hero.png"

        /* === Desktop framing & text lift === */
        posDesktop="50% 20%"  // keep desktop focal point
        offsetDesktop={-8}    // lift text on desktop (-8vh)

        /* === Mobile layout controls (inline image mode) === */
        imageInlineMobile     // use inline image on mobile (BG off on mobile)
        offsetMobile={12}     // move text DOWN on mobile (+12vh)
        imageLiftMobile={124}  // visually lift image UP from bottom (px or 'vh'); doesn't change hero height
        // imageMaxWidthMobile={1100} // optional: cap inline image width on mobile
      />

      <div id="services" />
      <Devices />

      <Why />

      <Locations />

      <div id="reviews" />
      <Reviews />

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
