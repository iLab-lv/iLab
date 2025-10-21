// app/(site)/(catalog)/iphone-remonts/[device]/page.jsx

import Script from 'next/script';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';
import repairServices from '@/data/repairServices';

import DeviceHero from '@sections/device-hero/DeviceHero';
import PriceList from '@sections/pricing/PriceList';
import Services from '@sections/services/Services';
import Why from '@sections/why/Why';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import s from './Device.module.scss';

// Icon components (page-level; Services is presentational only)
import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

export const revalidate = 0; // keep dynamic during integration

const ORIGIN = 'https://www.ilab.lv';
const DEFAULT_CURRENCY = 'EUR';

/* ===========================
   Header CTA for this page
   =========================== */
// Expose CTA to the layout so PageHeader can render it.
// If your layout expects a different export name, adjust here.
export const pageHeader = {
  scrollCta: { label: 'Skatīt cenas', targetId: 'cenas' },
};
// Common alias some setups use:
export const headerProps = pageHeader;

/* ===========================
   Adapter helpers (page-level)
   =========================== */

// Find the iPhone device by slug (page-level source of truth)
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

// Normalize price string into from/to numbers for UI (no defaults in renderer)
function toPriceRange(priceStr) {
  if (!priceStr) return { priceFrom: null, priceTo: null, priceText: '' };
  const raw = String(priceStr).trim();
  const p = raw.toLowerCase();

  const priceText = raw;

  // "no 50" / "from 50"
  const fromMatch = p.match(/(?:^|\s)(?:no|from)\s*([0-9]+(?:[.,][0-9]+)?)/i);
  if (fromMatch) {
    const from = Number(fromMatch[1].replace(',', '.'));
    return { priceFrom: isNaN(from) ? null : from, priceTo: null, priceText };
  }

  // "100-150" or "100–150"
  const rangeMatch = p.match(/^\s*([0-9]+(?:[.,][0-9]+)?)\s*[-–]\s*([0-9]+(?:[.,][0-9]+)?)\s*$/);
  if (rangeMatch) {
    const a = Number(rangeMatch[1].replace(',', '.'));
    const b = Number(rangeMatch[2].replace(',', '.'));
    return {
      priceFrom: isNaN(a) ? null : a,
      priceTo: isNaN(b) ? null : b,
      priceText,
    };
  }

  // SINGLE exact number → set priceTo ONLY (avoid "no" prefix)
  const singleMatch = p.match(/^\s*([0-9]+(?:[.,][0-9]+)?)\s*$/);
  if (singleMatch) {
    const v = Number(singleMatch[1].replace(',', '.'));
    const val = isNaN(v) ? null : v;
    return { priceFrom: null, priceTo: val, priceText };
  }

  // Any other free text → leave both null
  return { priceFrom: null, priceTo: null, priceText };
}

// Merge per-model pricing with service catalog metadata (adapter for PriceList)
function buildPriceListItems(modelSlug) {
  const pricing = devicePricing[modelSlug];
  if (!pricing || !Array.isArray(pricing.items)) {
    return { items: [], currency: DEFAULT_CURRENCY };
  }

  const device = getIphoneDeviceBySlug(modelSlug);
  const perDeviceTimeText = device?.serviceTimeTextOverrides || {};
  const catalogById = new Map(repairServices.map((srv) => [srv.id, srv]));

  const merged = pricing.items
    .map((it) => {
      const base = catalogById.get(it.id);
      if (!base) return null;

      // TEXT comes from device override → catalog default → fallback text
      const timeText =
        (typeof perDeviceTimeText[it.id] === 'string' && perDeviceTimeText[it.id].trim()) ||
        base.defaultTimeText ||
        'Tajā pašā dienā';

      const { priceFrom, priceTo } = toPriceRange(it.price);

      return {
        id: it.id,
        title: base.title,
        family: base.family,
        order: base.order ?? 9999,
        timeText,
        warrantyDays: base.defaultWarrantyDays ?? null,
        price: (it.price ?? '').trim(),
        priceFrom,
        priceTo,
        popular: false,
        href: base.slug ? `/${base.slug}` : base.href,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if ((a.order ?? 9999) !== (b.order ?? 9999)) {
        return (a.order ?? 9999) - (b.order ?? 9999);
      }
      return (a.title || '').localeCompare(b.title || '');
    });

  return { items: merged, currency: DEFAULT_CURRENCY };
}

// Build the mini “popular services for this model” cards (adapter for Services)
function buildModelServices() {
  return [
    {
      title: 'Displeja (ekrāna) maiņa',
      href: '/iphone-remonts/displeja-maina',
      text: 'plaisas, tumši plankumi, nereaģē skāriens.',
      icon: LuSmartphone,
    },
    {
      title: 'Akumulatora maiņa',
      href: '/iphone-remonts/baterijas-maina',
      text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
      icon: LuBatteryCharging,
    },
    {
      title: 'Uzlādes ligzdas remonts',
      href: '/iphone-remonts/uzlades-ligzda',
      text: 'nenoturas kabelis, lēna uzlāde, ātrā uzlāde nestrādā.',
      icon: LuPlugZap,
    },
    {
      title: 'Kameras remonts',
      href: '/iphone-remonts/kamera',
      text: 'miglaini attēli, fokusēšanās problēmas.',
      icon: LuCamera,
    },
  ];
}

/* ===========================
   Static/shared content
   =========================== */

const IPHONE_FAQ_ITEMS = [
  { q: 'Cik ilgi ilgst iPhone displeja maiņa?', a: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.' },
  { q: 'Vai mani dati saglabāsies?', a: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.' },
  { q: 'Vai detaļām ir garantija?', a: 'Jā, gan detaļām, gan darbam.' },
  { q: 'Vai pieejamas oriģinālas detaļas?', a: 'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.' },
  { q: 'Vai varu saņemt aptuveno cenu pirms remonta?', a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.' },
];

/* ===========================
   Metadata
   =========================== */

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

/* ===========================
   Page
   =========================== */

export default async function Page({ params }) {
  const { device } = await params;
  const slug = decodeURIComponent(device);
  const d = getIphoneDeviceBySlug(slug);
  if (!d) return notFound();

  const { items: priceItems, currency } = buildPriceListItems(slug);
  const modelServices = buildModelServices();

  // JSON-LD
  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'iPhone remonts', item: `${ORIGIN}/iphone-remonts/` },
      { '@type': 'ListItem', position: 3, name: `${d.name} remonts`, item: `${ORIGIN}/iphone-remonts/${d.slug}/` },
    ],
  };

  // Offers with single numeric price only
  const offers = priceItems.map((it) => {
    const singleNumeric = /^\s*[0-9]+([.,][0-9]+)?\s*$/.test(it.price || '')
      ? Number((it.price || '').replace(',', '.'))
      : undefined;

    return {
      '@type': 'Offer',
      name: it.title,
      ...(singleNumeric ? { price: singleNumeric, priceCurrency: currency } : {}),
      url: `${ORIGIN}/iphone-remonts/${slug}#cenas`,
      itemOffered: {
        '@type': 'Service',
        name: `${d.name} — ${it.title}`,
        serviceType: it.title,
        provider: { '@id': `${ORIGIN}#organization` },
      },
      availability: 'https://schema.org/InStock',
    };
  });

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}/iphone-remonts/${slug}#service`,
    serviceType: `${d.name} remonts`,
    name: `${d.name} remonts`,
    url: `${ORIGIN}/iphone-remonts/${d.slug}/`,
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

      <DeviceHero image={d.image} alt={`${d.name} remonts`} bodyHtml={d.bodyHtml || null} />

      <section className={s.intro} aria-labelledby="device-intro-title">
        <div className={s.container}>
          <div className={s.head}>
            <h2 id="device-intro-title" className={s.h2}>{d.name}</h2>
            {d.year && <div className={s.meta}>Izlaists: {d.year}</div>}
          </div>

          <div className={s.leadRow}>
            <div className={s.leadCopy}>
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

      {/* Popular services for this model */}
      <Services
        id="iphone-services"
        title={`Populārākie ${d?.name ?? 'šī modeļa'} remonti`}
        items={[
          {
            title: 'Displeja (ekrāna) maiņa',
            text: 'plaisas, tumši plankumi, nereaģē skāriens.',
            icon: LuSmartphone,
            href: '/iphone-remonts/displeja-maina',
          },
          {
            title: 'Akumulatora maiņa',
            text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
            icon: LuBatteryCharging,
            href: '/iphone-remonts/baterijas-maina',
          },
          {
            title: 'Uzlādes ligzda',
            text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
            icon: LuPlugZap,
            href: '/iphone-remonts/uzlades-ligzda',
          },
          {
            title: 'Kamera',
            text: 'miglaini attēli, fokusēšanās problēmas.',
            icon: LuCamera,
            href: '/iphone-remonts/kamera',
          },
          {
            title: 'Skaļruņi/mikrofons',
            text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
            icon: LuVolume2,
            href: '/iphone-remonts/skalruni-mikrofons',
          },
          {
            title: 'Ūdens bojājumi',
            text: 'diagnostika un atjaunošana, ja tas iespējams.',
            icon: LuDroplets,
            href: '/iphone-remonts/udens-bojajumi',
          },
        ]}
      />

      {/* Pricing */}
      {priceItems.length > 0 && (
        <PriceList
          id="cenas"
          title="Cenas un remonta laiks"
          items={priceItems}
          currency={DEFAULT_CURRENCY}
          headingLevel={2}
        />
      )}

      <Why />

      <Faq
        id="model-faq"
        title="Biežāk uzdotie jautājumi"
        items={IPHONE_FAQ_ITEMS}
        variant="accordion"
        headingLevel={2}
      />

      <ConvertBand />
    </>
  );
}
