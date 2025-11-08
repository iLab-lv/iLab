// screens/HomeScreen.jsx
import React from 'react';
import Script from 'next/script';

import Hero from '@sections/hero/Hero';
import Services from '@sections/home-devices/Services';
import Process from '@sections/process/Process';
import Devices from '@sections/home-devices/Devices';
import Why from '@sections/why/Why';
import Locations from '@sections/locations/Locations';
import Reviews from '@sections/reviews/Reviews';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import { FAQ_CONTEXT, getFaqItems, getFaqLd } from '@/data/faq';

export default function HomeScreen() {
  const { items: HOME_FAQ_ITEMS } = getFaqItems(FAQ_CONTEXT.HOME);
  const HOME_FAQ_LD = getFaqLd(FAQ_CONTEXT.HOME);

  return (
    <main>
      {/* Homepage FAQ JSON-LD (from centralized data) */}
      <Script id="home-faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(HOME_FAQ_LD)}
      </Script>

      <Hero
        title="Ātrs mobilo ierīču servisa centrs"
        imageAlt="iLab serviss — mobilo ierīču remonts Rīgā (Domina un Spice Home)"
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
        imageSrc="/images/hero.webp"
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

      <Services />

      {/* <Devices /> */}

      <Process
        id="process"
        title="Kā notiek remonts"
        steps={[
          { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
          { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
          { title: 'Remonts', text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.' },
          { title: 'Pārbaude', text: 'Pēc remonta testējam visu funkcionalitāti un drošību.' },
          { title: 'Garantija', text: '90 dienu garantija un ieteikumi turpmākai lietošanai.' },
        ]}
        headingLevel={2}
        variant="cards"
      />

      <Why />

      <Locations />

      <div id="reviews" />
      <Reviews />

      <Faq
        id="home-faq"
        title="Biežāk uzdotie jautājumi"
        items={HOME_FAQ_ITEMS}
      />

      <ConvertBand />
    </main>
  );
}
