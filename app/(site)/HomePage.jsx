import React from 'react';

import Hero from '@sections/hero/Hero';
import Services from '@sections/home-devices/Services';
import Process from '@sections/process/Process';
import Why from '@sections/why/Why';
import Locations from '@sections/locations/Locations';
import Reviews from '@sections/reviews/Reviews';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

export default function HomePage({
  locale = 'lv',
  reviewsSummary,
  siteSettings,
  faqTitle,
  faqItems = [],
}) {
  return (
    <>
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

      <Locations
        locale={locale}
        locations={siteSettings?.locations || []}
        pinPositions={siteSettings?.pinPositions || {}}
      />

      {faqItems.length > 0 && (
        <Faq
          id="home-faq"
          title={faqTitle}
          items={faqItems}
        />
      )}

      <ConvertBand locale={locale} />
    </>
  );
}