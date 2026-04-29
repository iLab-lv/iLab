import React from 'react';
import Script from 'next/script';

import Hero from '@sections/hero/Hero';
import Services from '@sections/home-devices/Services';
import Process from '@sections/process/Process';
import Why from '@sections/why/Why';
import Locations from '@sections/locations/Locations';
import Reviews from '@sections/reviews/Reviews';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import { FAQ_CONTEXT, getFaqItems, getFaqLd } from '@/data/faq';

export default function HomeScreen({ locale = 'lv', reviewsSummary }) {
  const { items: HOME_FAQ_ITEMS } = getFaqItems(FAQ_CONTEXT.HOME);
  const HOME_FAQ_LD = getFaqLd(FAQ_CONTEXT.HOME);

  return (
    <>
      <Script id="home-faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(HOME_FAQ_LD)}
      </Script>

      <Hero
        locale={locale}
        reviewsSummary={reviewsSummary}
        align="center"
        background="gradient"
        imageSrc="/images/hero.webp"
        posDesktop="50% 20%"
        offsetDesktop={-8}
        imageInlineMobile
        offsetMobile={12}
        imageLiftMobile={124}
      />

      <div id="reviews" />
      <Reviews locale={locale} />

      <div id="services" />

      <Services locale={locale} />

      

      <Process locale={locale} />

      <Why locale={locale} />

      <Locations openPanelOnPin />

      <Faq
        id="home-faq"
        title={locale === 'ru' ? 'Часто задаваемые вопросы' : 'Biežāk uzdotie jautājumi'}
        items={HOME_FAQ_ITEMS}
      />

      <ConvertBand locale={locale} />
    </>
  );
}