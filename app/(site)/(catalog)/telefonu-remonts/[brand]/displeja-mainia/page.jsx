// app/(site)/(catalog)/telefonu-remonts/[brand]/displeja-maina/page.jsx
import Script from 'next/script';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';

import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';

import s from '@styles/Catalog.module.scss';

const ORIGIN = 'https://www.ilab.lv';

// same set as the iPhone page
const SERVICE_IDS = ['display-original', 'display-oled', 'display-incell'];

function titleCase(slug = '') {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }) {
  const brand = params.brand || '';
  const brandName = titleCase(brand);

  return {
    title: `${brandName} displeja maiņa Rīgā | iLab`,
    description: `${brandName} displeja maiņa Rīgā — ekrāna nomaiņa (oriģināls/OLED/InCell), plaisu un skārienu problēmu risinājums. Bezmaksas diagnostika un 90 dienu garantija.`,
    alternates: { canonical: `/telefonu-remonts/${brand}/displeja-maina` },
    openGraph: {
      title: `${brandName} displeja maiņa Rīgā | iLab`,
      description: `${brandName} displeja maiņa tajā pašā dienā. Bezmaksas diagnostika, 90 dienu garantija.`,
      url: `${ORIGIN}/telefonu-remonts/${brand}/displeja-maina`,
      type: 'article',
    },
  };
}

export default function BrandDisplejaMainaPage({ params }) {
  const brand = params.brand || '';
  const brandName = titleCase(brand);

  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Telefonu remonts', item: `${ORIGIN}/telefonu-remonts/` },
      { '@type': 'ListItem', position: 3, name: brandName, item: `${ORIGIN}/telefonu-remonts/${brand}/` },
      { '@type': 'ListItem', position: 4, name: 'Displeja maiņa', item: `${ORIGIN}/telefonu-remonts/${brand}/displeja-maina` },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `${brandName} displeja maiņa`,
    areaServed: { '@type': 'City', name: 'Riga' },
    provider: { '@type': 'LocalBusiness', name: 'iLab', '@id': `${ORIGIN}#organization` },
    url: `${ORIGIN}/telefonu-remonts/${brand}/displeja-maina`,
    name: `${brandName} displeja maiņa Rīgā`,
    description:
      `${brandName} ekrāna nomaiņa (oriģināls/OLED/InCell), plaisu un skārienu problēmu risinājums. ` +
      `Bezmaksas diagnostika un 90 dienu garantija.`,
  };

  return (
    <>
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      {/* HERO */}
      <DeviceHero
        image={`/images/brands/${brand}-hero.webp`}
        alt={`${brandName} displeja maiņa Rīgā`}
        focal="right"
        className="service"
        bodyHtml={`<p><strong>${brandName} displeja maiņa Rīgā</strong> — saplīsuša vai nereaģējoša ekrāna nomaiņa tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`}
      />

      {/* INTRO */}
      <section className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>{brandName} displeja maiņa Rīgā</h1>
          <p className={s.paragraph}>
            Veicam <strong>{brandName} ekrāna nomaiņu</strong> visiem populārākajiem modeļiem — plaisas, tumši plankumi,
            mirgošana, nereaģējošs skāriens. Pirms darba uzsākšanas nodrošinām<strong> bezmaksas diagnostiku</strong> un
            saskaņojam izmaksas. Izmantojam <strong>oriģinālās</strong> vai <strong>augstas kvalitātes OEM</strong> detaļas
            un sniedzam <strong>90 dienu garantiju</strong>.
          </p>
        </div>
      </section>

      {/* PRICE LIST — pass full devices and let component filter by brand/category */}
      <ServicePricelist
        devices={devices}
        pricing={devicePricing}
        brandSlug={brand}
        categorySlug="telefonu-remonts"
        serviceIds={SERVICE_IDS}
        title="Displeja maiņas cenas pēc modeļa"
        className={s.section}
      />

      {/* PROCESS */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek remonts"
            steps={[
              { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
              { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba.' },
              { title: 'Remonts', text: 'Sertificēti meistari veic remontu ar kvalitatīvām detaļām.' },
              { title: 'Pārbaude', text: 'Pēc remonta testējam visu funkcionalitāti un drošību.' },
              { title: 'Garantija', text: '90 dienu garantija un ieteikumi turpmākai lietošanai.' },
            ]}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      {/* WHY / FAQ / CTA */}
      <section className={s.section}><Why /></section>

      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq
            id="brand-faq"
            title="Biežāk uzdotie jautājumi"
            groups={[
              {
                label: 'Par remontu un garantiju',
                items: [
                  { q: `Cik ilgi ilgst ${brandName} displeja maiņa?`, a: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.' },
                  { q: 'Vai mani dati saglabāsies?', a: 'Parasti jā; drošībai iesakām dublējumu pirms remonta.' },
                  { q: 'Vai detaļām ir garantija?', a: 'Jā — 90 dienas gan detaļai, gan darbam.' },
                  { q: 'Vai pieejamas oriģinālās detaļas?', a: 'Jā, kā arī augstas kvalitātes OEM alternatīvas.' },
                ],
              },
            ]}
            headingLevel={2}
            variant="accordion"
          />
        </div>
      </section>

      <section className={s.section}>
        <ConvertBand />
      </section>
    </>
  );
}
