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

import {
  toFaqLd,
  toFaqRenderItems,
} from '@sections/faq/faq.helpers';

import { db } from '@/lib/firebaseAdmin';

function getHomeStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      faqTitle: 'Часто задаваемые вопросы',
    };
  }

  return {
    faqTitle: 'Biežāk uzdotie jautājumi',
  };
}

function sortFaqItems(items = []) {
  return [...items].sort((a, b) => {
    const ao = typeof a?.order === 'number' ? a.order : 9999;
    const bo = typeof b?.order === 'number' ? b.order : 9999;

    if (ao !== bo) return ao - bo;

    return String(a?.q || '').localeCompare(String(b?.q || ''));
  });
}

async function getBasicFaq(locale = 'lv') {
  const docId = `basic_${locale}`;
  const snap = await db.collection('faqGroups').doc(docId).get();

  if (!snap.exists) {
    return {
      title: getHomeStrings(locale).faqTitle,
      items: [],
    };
  }

  const data = snap.data() || {};
  const rawItems = Array.isArray(data.items) ? data.items : [];

  const items = sortFaqItems(
    rawItems
      .filter((item) => {
        if (!item) return false;
        if (!String(item.q || '').trim()) return false;
        if (!(String(item.aHtml || '').trim() || String(item.a || '').trim())) {
          return false;
        }
        if (item.isHidden === true) return false;
        return true;
      })
      .map((item) => ({
        q: String(item.q || '').trim(),
        aHtml: typeof item.aHtml === 'string' ? item.aHtml.trim() : '',
        a: typeof item.a === 'string' ? item.a.trim() : '',
        order:
          typeof item.order === 'number' && Number.isFinite(item.order)
            ? item.order
            : 9999,
      }))
  );

  return {
    title:
      typeof data.title === 'string' && data.title.trim()
        ? data.title.trim()
        : getHomeStrings(locale).faqTitle,
    items,
  };
}

export default async function HomePage({
  locale = 'lv',
  reviewsSummary,
  siteSettings,
}) {
  const basicFaq = await getBasicFaq(locale);
  const faqRenderItems = toFaqRenderItems(basicFaq.items);
  const faqLd = toFaqLd(basicFaq.items);

  return (
    <>
      {basicFaq.items.length > 0 && (
        <Script
          id="home-faq-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(faqLd)}
        </Script>
      )}

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

      {faqRenderItems.length > 0 && (
        <Faq
          id="home-faq"
          title={basicFaq.title}
          items={faqRenderItems}
        />
      )}

      <ConvertBand locale={locale} />
    </>
  );
}