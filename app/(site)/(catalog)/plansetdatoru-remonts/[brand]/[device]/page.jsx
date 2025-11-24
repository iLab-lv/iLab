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

import {
  LuTabletSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuDroplets,
} from 'react-icons/lu';

// If you still want to reuse the iPhone device styles, keep this import:
// import s from '../../../iphone-remonts/[device]/Device.module.scss';

export const revalidate = 0;

const ORIGIN = 'https://www.ilab.lv';
const DEFAULT_CURRENCY = 'EUR';

/* ===== Header CTA exposed to layout ===== */
export const pageHeader = {
  scrollCta: { label: 'Skatīt cenas', targetId: 'cenas' },
};
export const headerProps = pageHeader;

/* ===== Helpers ===== */

// Find tablet device by slug within the tablets category
function getTabletDeviceBySlug(slug) {
  return (
    devices.find(
      (d) =>
        d.slug === slug &&
        d.category === 'plansetdatoru-remonts'
    ) || null
  );
}

// Normalize price strings (same as iPhone/telefonu)
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

  const rangeMatch = p.match(
    /^\s*([0-9]+(?:[.,][0-9]+)?)\s*[-–]\s*([0-9]+(?:[.,][0-9]+)?)\s*$/
  );
  if (rangeMatch) {
    const a = Number(rangeMatch[1].replace(',', '.'));
    const b = Number(rangeMatch[2].replace(',', '.'));
    return {
      priceFrom: isNaN(a) ? null : a,
      priceTo: isNaN(b) ? null : b,
      priceText,
    };
  }

  const singleMatch = p.match(/^\s*([0-9]+(?:[.,][0-9]+)?)\s*$/);
  if (singleMatch) {
    const v = Number(singleMatch[1].replace(',', '.'));
    return { priceFrom: null, priceTo: isNaN(v) ? null : v, priceText };
  }

  return { priceFrom: null, priceTo: null, priceText };
}

// Merge per-model pricing with catalog metadata (same pattern as iPhone/telefonu)
function buildPriceListItems(modelSlug) {
  const pricing = devicePricing[modelSlug];
  if (!pricing || !Array.isArray(pricing.items)) {
    return { items: [], currency: DEFAULT_CURRENCY };
  }

  const device = getTabletDeviceBySlug(modelSlug);
  const perDeviceTimeText = device?.serviceTimeTextOverrides || {};
  const catalogById = new Map(repairServices.map((srv) => [srv.id, srv]));

  const merged = pricing.items
    .map((it) => {
      const base = catalogById.get(it.id);
      if (!base) return null;

      const timeText =
        (typeof perDeviceTimeText[it.id] === 'string' &&
          perDeviceTimeText[it.id].trim()) ||
        base.defaultTimeText ||
        'Tajā pašā dienā';

      const raw = it?.price;
      if (raw == null) return null;
      const priceText =
        typeof raw === 'number' ? String(raw) : String(raw).trim();

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
        // If base.slug already includes full path, this stays fine.
        // Price list rows are usually non-clickable; if PriceList uses href,
        // this is still here, but Services section below is non-clickable.
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

// Popular services grid for this model
// NOTE: to match the brand page behavior, these cards are intentionally
// NON-CLICKABLE, so we do NOT include `href` here.
function buildModelServices() {
  return [
    {
      title: 'Displeja (ekrāna) maiņa',
      text: 'plaisas, plankumi, nereaģē skāriens.',
      icon: LuTabletSmartphone,
    },
    {
      title: 'Akumulatora maiņa',
      text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
      icon: LuBatteryCharging,
    },
    {
      title: 'Uzlādes ligzdas remonts',
      text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
      icon: LuPlugZap,
    },
    {
      title: 'Kameras remonts',
      text: 'miglaini attēli, fokusēšanās problēmas.',
      icon: LuCamera,
    },
    {
      title: 'Ūdens bojājumi',
      text: 'diagnostika un atjaunošana, ja tas iespējams.',
      icon: LuDroplets,
    },
  ];
}

/* ===== Metadata ===== */
export async function generateMetadata({ params }) {
  const { device } = params; // no await
  const slug = decodeURIComponent(device);
  const d = getTabletDeviceBySlug(slug);

  const title = d
    ? `${d.name} remonts | iLab`
    : 'Planšetdatoru remonts | iLab';

  const description =
    d?.metaDescription ||
    'Planšetdatoru remonts: displejs, baterija, uzlāde, kamera. Bezmaksas diagnostika un 90 dienu garantija.';

  return {
    title,
    description,
    alternates: {
      canonical: `/plansetdatoru-remonts/${slug}`,
    },
  };
}

/* ===== Page ===== */
export default async function Page({ params }) {
  const { device } = params; // no await
  const slug = decodeURIComponent(device);
  const d = getTabletDeviceBySlug(slug);
  if (!d) return notFound();

  const { items: priceItems, currency } = buildPriceListItems(slug);
  const modelServices = buildModelServices();

  // FAQ: reuse PHONE context as generic for handheld devices, fallback to HOME
  const phoneFaq = getFaqItems(FAQ_CONTEXT.PHONE)?.items ?? [];
  const homeFaq = !phoneFaq.length
    ? getFaqItems(FAQ_CONTEXT.HOME)?.items ?? []
    : [];

  const FINAL_FAQ_ITEMS = phoneFaq.length ? phoneFaq : homeFaq;
  const FAQ_LD = phoneFaq.length
    ? getFaqLd(FAQ_CONTEXT.PHONE)
    : getFaqLd(FAQ_CONTEXT.HOME);

  // JSON-LD: breadcrumbs
  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Sākums',
        item: `${ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Planšetdatoru remonts',
        item: `${ORIGIN}/plansetdatoru-remonts/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${d.name} remonts`,
        item: `${ORIGIN}/plansetdatoru-remonts/${d.slug}/`,
      },
    ],
  };

  // JSON-LD: offers & service
  const offers = priceItems.map((it) => {
    const priceStr = it.price == null ? '' : String(it.price);
    const singleNumeric = /^\s*[0-9]+([.,][0-9]+)?\s*$/.test(priceStr)
      ? Number(priceStr.replace(',', '.'))
      : undefined;

    return {
      '@type': 'Offer',
      name: it.title,
      ...(singleNumeric
        ? {
            price: singleNumeric,
            priceCurrency: currency,
          }
        : {}),
      url: `${ORIGIN}/plansetdatoru-remonts/${slug}#cenas`,
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
    '@id': `${ORIGIN}/plansetdatoru-remonts/${slug}#service`,
    serviceType: `${d.name} remonts`,
    name: `${d.name} remonts`,
    url: `${ORIGIN}/plansetdatoru-remonts/${d.slug}/`,
    areaServed: { '@type': 'Country', name: 'Latvia' },
    provider: { '@id': `${ORIGIN}#organization` },
    ...(offers.length ? { offers } : {}),
  };

  return (
    <>
      {/* JSON-LD */}
      <Script
        id="breadcrumbs-jsonld-tablet"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script
        id="service-jsonld-tablet"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>
      <Script
        id="faq-jsonld-tablet"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(FAQ_LD)}
      </Script>

      {/* HERO */}
      <DeviceHero
        image={d.image}
        alt={`${d.name} remonts`}
        bodyHtml={d.bodyHtml || null}
      />

      {/* Popular services for this model – non-clickable, same behavior as brand page */}
      <Services
        id="tablet-services"
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

      {/* FAQ */}
      <Faq
        id="tablet-model-faq"
        title="Biežāk uzdotie jautājumi"
        items={FINAL_FAQ_ITEMS}
      />

      <ConvertBand />
    </>
  );
}
