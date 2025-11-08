// app/(site)/(info)/duk/page.jsx
import React from 'react';
import Script from 'next/script';

import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import { FAQ_CONTEXT, getFaqItemsMulti, getFaqLd } from '@/data/faq';
import s from '@styles/Catalog.module.scss';

export const metadata = {
  title: 'Biežāk uzdotie jautājumi | iLab',
  description:
    'iLab — biežāk uzdotie jautājumi par telefonu, iPhone, planšetdatoru, portatīvo datoru un Dyson remontu, kā arī ekrāna, baterijas, uzlādes un ūdens bojājumiem.',
  alternates: { canonical: '/duk' },
};

// Build merged FAQPage JSON-LD (deduped)
function buildMergedFaqLd(contexts) {
  const seen = new Set();
  const mainEntity = [];

  for (const ctx of contexts) {
    const ld = getFaqLd(ctx);
    if (!ld?.mainEntity) continue;
    for (const q of ld.mainEntity) {
      const key = (q?.name || '').trim().toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      mainEntity.push(q);
    }
  }
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity };
}

export default function DukPage() {
  const CONTEXTS = [
    FAQ_CONTEXT.HOME,
    FAQ_CONTEXT.PHONE,
    FAQ_CONTEXT.IPHONE,
    FAQ_CONTEXT.TABLET,
    FAQ_CONTEXT.LAPTOP,
    FAQ_CONTEXT.DYSON,
    FAQ_CONTEXT.SERVICE_DISPLAY,
    FAQ_CONTEXT.SERVICE_BATTERY,
    FAQ_CONTEXT.SERVICE_CAMERA,
    FAQ_CONTEXT.SERVICE_AUDIO,
    FAQ_CONTEXT.SERVICE_CHARGING,
    FAQ_CONTEXT.SERVICE_WATER,
  ];

  // IMPORTANT: getFaqItemsMulti returns an ARRAY (not { items })
  const items = getFaqItemsMulti(CONTEXTS);

  const FAQ_LD = buildMergedFaqLd(CONTEXTS);

  return (
    <>
      <Script id="duk-faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(FAQ_LD)}
      </Script>

      {/* Header comes from (info)/layout via PageHeader */}

      <section className={s.section} aria-labelledby="duk-faq-h2">
        <div className={s.container}>
          <h2 id="duk-faq-h2" className={s.h2}>Biežāk uzdotie jautājumi</h2>
          <p className={s.intro}>
            Apkopojām atbildes par populārākajiem remonta jautājumiem — telefoniem, iPhone,
            planšetdatoriem, portatīvajiem datoriem un Dyson, kā arī ekrāna un baterijas maiņu,
            uzlādes ligzdām, kamerām, audio un ūdens bojājumiem.
          </p>

          <Faq id="duk-faq" title="Visi jautājumi" items={items} />
        </div>
      </section>

      <section className={s.section}>
        <ConvertBand />
      </section>
    </>
  );
}
