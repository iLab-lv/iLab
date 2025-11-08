// app/(site)/(catalog)/iphone-remonts/[device]/page.jsx

import Script from 'next/script';
import { notFound } from 'next/navigation';

import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';
import repairServices from '@/data/repairServices';

import DeviceHero from '@sections/device-hero/DeviceHero';
import PriceList from '@sections/pricing/PriceList';
import Services from '@sections/services/Services';
import Why from '@sections/why/Why';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import { FAQ_CONTEXT, getFaqItems, getFaqLd } from '@/data/faq';

import s from './Device.module.scss';

import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

export const revalidate = 0;

const ORIGIN = 'https://www.ilab.lv';
const DEFAULT_CURRENCY = 'EUR';

/* ===== Header CTA exposed to layout ===== */
export const pageHeader = {
  scrollCta: { label: 'Skatīt cenas', targetId: 'cenas' },
};
export const headerProps = pageHeader;

/* ===== Helpers ===== */

// Find the iPhone device by slug
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

// Normalize price strings
function toPriceRange(priceStr) {
  if (!priceStr) return { priceFrom: null, priceTo: null, priceText: '' };
  const raw = String(priceStr).trim();
  const p = raw.toLowerCase();

  const priceText = raw;

  const fromMatch = p.match(/(?:^|\s)(?:no|from)\s*([0-9]+(?:[.,][0-9]+)?)/i);
  if (fromMatch) {
    const from = Number(fromMatch[1].replace(',', '.'));
    return { priceFrom: isNaN(from) ? null : from, priceTo: null, priceText };
  }

  const rangeMatch = p.match(/^\s*([0-9]+(?:[.,][0-9]+)?)\s*[-–]\s*([0-9]+(?:[.,][0-9]+)?)\s*$/);
  if (rangeMatch) {
    const a = Number(rangeMatch[1].replace(',', '.'));
    const b = Number(rangeMatch[2].replace(',', '.'));
    return { priceFrom: isNaN(a) ? null : a, priceTo: isNaN(b) ? null : b, priceText };
  }

  const singleMatch = p.match(/^\s*([0-9]+(?:[.,][0-9]+)?)\s*$/);
  if (singleMatch) {
    const v = Number(singleMatch[1].replace(',', '.'));
    return { priceFrom: null, priceTo: isNaN(v) ? null : v, priceText };
  }

  return { priceFrom: null, priceTo: null, priceText };
}

// Merge per-model pricing with catalog metadata
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

      const timeText =
        (typeof perDeviceTimeText[it.id] === 'string' && perDeviceTimeText[it.id].trim()) ||
        base.defaultTimeText ||
        'Tajā pašā dienā';

      const raw = it?.price;
      if (raw == null) return null;
      const priceText = typeof raw === 'number' ? String(raw) : String(raw).trim();

      const { priceFrom, priceTo } = toPriceRange(priceText);

      return {
        id: it.id,
        title: base.title,
        family: base.family,
        order: base.order ?? 9999,
        timeText,
        warrantyDays: base.defaultWarrantyDays ?? null,
        price: priceText,
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

// Popular services grid (canonical routes)
function buildModelServices() {
  return [
    { title: 'Displeja (ekrāna) maiņa', href: '/iphone-remonts/displeja-maina', text: 'plaisas, tumši plankumi, nereaģē skāriens.', icon: LuSmartphone },
    { title: 'Akumulatora maiņa', href: '/iphone-remonts/baterijas-maina', text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.', icon: LuBatteryCharging },
    { title: 'Uzlādes ligzdas maiņa', href: '/iphone-remonts/uzlades-ligzdas-maina', text: 'nenoturas kabelis, lēna vai nestabila uzlāde.', icon: LuPlugZap },
    { title: 'Kameras remonts', href: '/iphone-remonts/kameras-remonts', text: 'miglaini attēli, fokusēšanās problēmas.', icon: LuCamera },
    { title: 'Skaļruņi/mikrofons', href: '/iphone-remonts/skalruni-mikrofona-remonts', text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.', icon: LuVolume2 },
    { title: 'Ūdens bojājumi', href: '/iphone-remonts/udens-bojajumu-remonts', text: 'diagnostika un atjaunošana, ja tas iespējams.', icon: LuDroplets },
  ];
}

/* ===== Metadata ===== */
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

/* ===== Page ===== */
export default async function Page({ params }) {
  const { device } = await params;
  const slug = decodeURIComponent(device);
  const d = getIphoneDeviceBySlug(slug);
  if (!d) return notFound();

  const { items: priceItems, currency } = buildPriceListItems(slug);
  const modelServices = buildModelServices();

  // Pull iPhone FAQ; if empty, fall back to PHONE → HOME to avoid blank blocks
  const iphoneFaq = getFaqItems(FAQ_CONTEXT.IPHONE)?.items ?? [];
  const phoneFaq = !iphoneFaq.length ? (getFaqItems(FAQ_CONTEXT.PHONE)?.items ?? []) : [];
  const homeFaq = !iphoneFaq.length && !phoneFaq.length ? (getFaqItems(FAQ_CONTEXT.HOME)?.items ?? []) : [];

  const FINAL_FAQ_ITEMS = iphoneFaq.length ? iphoneFaq : (phoneFaq.length ? phoneFaq : homeFaq);

  // JSON-LD should match what we show
  const FAQ_LD =
    iphoneFaq.length
      ? getFaqLd(FAQ_CONTEXT.IPHONE)
      : phoneFaq.length
      ? getFaqLd(FAQ_CONTEXT.PHONE)
      : getFaqLd(FAQ_CONTEXT.HOME);

  // JSON-LD: breadcrumbs + offers + service
  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'iPhone remonts', item: `${ORIGIN}/iphone-remonts/` },
      { '@type': 'ListItem', position: 3, name: `${d.name} remonts`, item: `${ORIGIN}/iphone-remonts/${d.slug}/` },
    ],
  };

  const offers = priceItems.map((it) => {
    const priceStr = it.price == null ? '' : String(it.price);
    const singleNumeric = /^\s*[0-9]+([.,][0-9]+)?\s*$/.test(priceStr)
      ? Number(priceStr.replace(',', '.'))
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
      {/* JSON-LD */}
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(FAQ_LD)}
      </Script>

      {/* HERO */}
      <DeviceHero image={d.image} alt={`${d.name} remonts`} bodyHtml={d.bodyHtml || null} />

      {/* Popular services for this model */}
      <Services
        id="iphone-services"
        title={`Populārākie ${d?.name ?? 'šī modeļa'} remonti`}
        items={modelServices}
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

      {/* FAQ (centralized; with safe fallbacks) */}
      <Faq
        id="model-faq"
        title="Biežāk uzdotie jautājumi"
        items={FINAL_FAQ_ITEMS}
      />

      <ConvertBand />
    </>
  );
}
