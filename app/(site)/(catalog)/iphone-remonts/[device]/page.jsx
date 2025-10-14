import Script from 'next/script';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';

import DeviceHero from '@sections/device-hero/DeviceHero';
import PriceList from '@sections/pricing/PriceList';
import Services from '@sections/services/Services';
import Why from '@sections/why/Why';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import s from './Device.module.scss';

const ORIGIN = 'https://www.ilab.lv';

// helpers
function getIphoneDeviceBySlug(slug) {
  return (
    devices.find(
      (d) =>
        d.slug === slug &&
        d.brandSlug === 'apple' &&
        d.category === 'telefonu-remonts'
    ) || null
  );
}

// shared
const IPHONE_FAQ_ITEMS = [
  { q: 'Cik ilgi ilgst iPhone displeja maiņa?', a: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.' },
  { q: 'Vai mani dati saglabāsies?', a: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.' },
  { q: 'Vai detaļām ir garantija?', a: 'Jā, gan detaļām, gan darbam.' },
  { q: 'Vai pieejamas oriģinālas detaļas?', a: 'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.' },
  { q: 'Vai varu saņemt aptuveno cenu pirms remonta?', a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.' },
];

const MODEL_SERVICES = [
  { title: 'Displeja (ekrāna) maiņa', href: '/iphone-remonts/displeja-maina', text: 'plaisas, tumši plankumi, nereaģē skāriens.' },
  { title: 'Akumulatora maiņa', href: '/iphone-remonts/baterijas-maina', text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.' },
  { title: 'Uzlādes ligzdas remonts', text: 'nenoturas kabelis, lēna uzlāde, ātrā uzlāde nestrādā.' },
  { title: 'Kameras remonts', text: 'miglaini attēli, fokusēšanās problēmas.' },
];

// metadata
export async function generateMetadata({ params }) {
  const { device } = await params;
  const slug = decodeURIComponent(device);
  const d = getIphoneDeviceBySlug(slug);

  const title = d?.metaTitle || (d ? `${d.name} remonts | iLab` : 'iPhone remonts | iLab');
  const description =
    d?.metaDescription ||
    'iPhone remonts: displejs, baterija, uzlāde, kamera. Ātra diagnostika un garantija.';

  return {
    title,
    description,
    alternates: { canonical: `/iphone-remonts/${slug}` },
  };
}

export default async function Page({ params }) {
  const { device } = await params;
  const slug = decodeURIComponent(device);
  const d = getIphoneDeviceBySlug(slug);
  if (!d) return notFound();

  const pricing = devicePricing[slug] || null;

  // JSON-LD breadcrumbs
  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'iPhone remonts', item: `${ORIGIN}/iphone-remonts/` },
      { '@type': 'ListItem', position: 3, name: `${d.name} remonts`, item: `${ORIGIN}/iphone-remonts/${d.slug}/` },
    ],
  };

  // JSON-LD device service + offers
  const offers = (pricing?.items || []).map((it) => ({
    '@type': 'Offer',
    name: it.title,
    price: it.priceFrom ?? it.priceTo ?? undefined,
    priceCurrency: pricing?.currency || 'EUR',
    url: it.href ? `${ORIGIN}${it.href}` : `${ORIGIN}/iphone-remonts/${slug}#cenas`,
    itemOffered: {
      '@type': 'Service',
      name: `${d.name} — ${it.title}`,
      serviceType: it.title,
      provider: { '@id': `${ORIGIN}#organization` },
      ...(it.timeMin ? { timeRequired: `PT${Math.max(1, Math.round(it.timeMin))}M` } : {}),
    },
    availability: 'https://schema.org/InStock',
  }));

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}/iphone-remonts/${slug}#service`,
    serviceType: `${d.name} remonts`,
    name: `${d.name} remonts`,
    url: `${ORIGIN}/iphone-remonts/${slug}/`,
    areaServed: { '@type': 'Country', name: 'Latvia' },
    provider: { '@id': `${ORIGIN}#organization` },
    ...(offers.length ? { offers } : {}),
  };

  return (
    <>
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      {/* === DEVICE HERO (overlaps header; now includes SEO copy) === */}
      <DeviceHero
        image={d.heroImage || d.image}
        alt={d.heroAlt || d.name}
        focal={d.heroFocal || 'right'}
        overlapDesktop={d.heroOverlapDesktop ?? 96}
        overlapMobile={d.heroOverlapMobile ?? 16}
        maxHeight={d.heroMaxH ?? 520}
        bodyHtml={d.bodyHtml || null}   // <— render copy here
      />

      {/* === INTRO (no bodyHtml here anymore) === */}
      <section className={s.intro} aria-labelledby="device-intro-title">
        <div className={s.container}>
          <div className={s.head}>
            <h2 id="device-intro-title" className={s.h2}>{d.name}</h2>
            {d.year && <div className={s.meta}>Izlaists: {d.year}</div>}
          </div>

          <div className={s.leadRow}>
            {/* Removed small device <img>. Keep intro clean, image is in hero */}
            <div className={s.leadCopy}>
              {/* Only show a fallback one-liner if there is no bodyHtml in hero */}
              {!d.bodyHtml && (
                <p>
                  Nodrošinām {d.name} displeja, baterijas, kameras un uzlādes remontu tajā pašā dienā
                  (ja detaļas ir uz vietas). Bezmaksas diagnostika, skaidras cenu norādes un 90 dienu garantija.
                </p>
              )}
              <div className={s.ctaRow}>
                <a href="#cenas" className={s.btnPrimary}>Skatīt cenas</a>
                <Link href="/iphone-remonts" className={s.btnGhost}>← Atpakaļ uz iPhone remontu</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === PRICING === */}
      {pricing && (
        <PriceList
          id="cenas"
          title="Cenas un remonta laiks"
          items={pricing.items}
          currency={pricing.currency}
          headingLevel={2}
        />
      )}

      {/* === SERVICES === */}
      <Services
        id="model-services"
        title="Populārākie remonti šim modelim"
        items={MODEL_SERVICES}
        headingLevel={2}
        variant="list"
      />

      <Why />
      <Faq
        id="model-faq"
        title="Biežāk uzdotie jautājumi"
        items={IPHONE_FAQ_ITEMS}
        headingLevel={2}
        variant="accordion"
      />
      <ConvertBand />
    </>
  );
}
