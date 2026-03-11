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

export default function HomeScreen({ locale = 'lv' }) {
  const { items: HOME_FAQ_ITEMS } = getFaqItems(FAQ_CONTEXT.HOME);
  const HOME_FAQ_LD = getFaqLd(FAQ_CONTEXT.HOME);

  return (
    <>
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
        secondaryCta={{ label: 'Pakalpojumu cenas', href: '/cenas' }}
        align="center"
        background="gradient"
        imageSrc="/images/hero.webp"
        posDesktop="50% 20%"
        offsetDesktop={-8}
        imageInlineMobile
        offsetMobile={12}
        imageLiftMobile={124}
      />

      <div id="services" />

      <Services />

      {/* <Devices /> */}

      <div id="reviews" />
      <Reviews locale={locale} />

      <Process />

      <Why />

      <Locations openPanelOnPin />

      <Faq
        id="home-faq"
        title="Biežāk uzdotie jautājumi"
        items={HOME_FAQ_ITEMS}
      />

      <ConvertBand />
    </>
  );
}