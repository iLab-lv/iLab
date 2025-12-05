// app/(site)/(catalog)/telefonu-remonts/[brand]/[device]/page.jsx

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
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

// JSON-LD helpers
import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';

export const revalidate = 0;
const DEFAULT_CURRENCY = 'EUR';

/* ===== Header CTA exposed to layout ===== */
export const pageHeader = {
  scrollCta: { label: 'Skatīt cenas', targetId: 'cenas' },
};
export const headerProps = pageHeader;

/* ===== Helpers ===== */

// Find a phone device by brand + slug in the telefoni category
function getPhoneDeviceBySlug(brandSlug, slug) {
  return (
    devices.find(
      (d) =>
        d.slug === slug &&
        d.brandSlug === brandSlug &&
        d.category === 'telefonu-remonts'
    ) || null
  );
}

// Normalize price strings (copied from iPhone page)
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

// Merge per-model pricing with catalog metadata
function buildPriceListItems(modelSlug) {
  const pricing = devicePricing[modelSlug];
  if (!pricing || !Array.isArray(pricing.items)) {
    return { items: [], currency: DEFAULT_CURRENCY };
  }

  const device = devices.find((d) => d.slug === modelSlug) || null;
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
        // IMPORTANT: adjust these slugs if your telefoni service URLs differ
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

// Popular services grid (telefonu canonical routes)
function buildModelServices(brandSlug) {
  // You can customize wording per brand later if needed.
  return [
    {
      title: 'Displeja (ekrāna) maiņa',
      href: '/telefonu-remonts/ekrana-maina',
      text: 'plaisas, tumši plankumi, nereaģē skāriens.',
      icon: LuSmartphone,
    },
    {
      title: 'Akumulatora maiņa',
      href: '/telefonu-remonts/baterijas-maina',
      text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
      icon: LuBatteryCharging,
    },
    {
      title: 'Uzlādes ligzdas maiņa',
      href: '/telefonu-remonts/uzlades-ligzdas-maina',
      text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
      icon: LuPlugZap,
    },
    {
      title: 'Kameras remonts',
      href: '/telefonu-remonts/kameras-remonts',
      text: 'miglaini attēli, fokusēšanās problēmas.',
      icon: LuCamera,
    },
    {
      title: 'Skaļruņi/mikrofons',
      href: '/telefonu-remonts/skalruni-mikrofona-remonts',
      text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
      icon: LuVolume2,
    },
    {
      title: 'Ūdens bojājumi',
      href: '/telefonu-remonts/udens-bojajumu-remonts',
      text: 'diagnostika un atjaunošana, ja tas iespējams.',
      icon: LuDroplets,
    },
  ];
}

/* ===== Metadata ===== */
export async function generateMetadata({ params }) {
  const { brand, device } = params;
  const slug = decodeURIComponent(device);
  const brandSlug = decodeURIComponent(brand);

  const d = getPhoneDeviceBySlug(brandSlug, slug);

  const brandLabel = d?.brandName || brandSlug.toUpperCase();

  const title =
    d?.metaTitle ||
    (d ? `${d.name} remonts | iLab` : `${brandLabel} telefonu remonts | iLab`);

  const description =
    d?.metaDescription ||
    'Telefonu remonts: displeja maiņa, baterija, uzlāde, kamera un citi bojājumi. Ātra diagnostika un garantija.';

  return {
    title,
    description,
    alternates: { canonical: `/telefonu-remonts/${brandSlug}/${slug}` },
  };
}

/* ===== Page ===== */
export default async function Page({ params }) {
  const { brand, device } = params;
  const slug = decodeURIComponent(device);
  const brandSlug = decodeURIComponent(brand);

  const d = getPhoneDeviceBySlug(brandSlug, slug);
  if (!d) return notFound();

  const { items: priceItems, currency } = buildPriceListItems(slug);
  const modelServices = buildModelServices(brandSlug);

  // FAQ: prefer PHONE context, then generic HOME
  const phoneFaq = getFaqItems(FAQ_CONTEXT.PHONE)?.items ?? [];
  const homeFaq = !phoneFaq.length
    ? getFaqItems(FAQ_CONTEXT.HOME)?.items ?? []
    : [];

  const FINAL_FAQ_ITEMS = phoneFaq.length ? phoneFaq : homeFaq;

  const FAQ_LD = phoneFaq.length
    ? getFaqLd(FAQ_CONTEXT.PHONE)
    : getFaqLd(FAQ_CONTEXT.HOME);

  // ---------- JSON-LD ----------

  const brandLabel = d.brandName || d.brandSlug.toUpperCase();
  const modelPath = `/telefonu-remonts/${brandSlug}/${d.slug}`;
  const provider = buildProvidersFromLocations(); // domina + spice by default

  // Breadcrumbs
  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: 'Sākums', url: abs('/') },
    { name: 'Telefonu remonts', url: abs('/telefonu-remonts') },
    {
      name: `${brandLabel} telefonu remonts`,
      url: abs(`/telefonu-remonts/${brandSlug}`),
    },
    { name: `${d.name} remonts`, url: abs(modelPath) },
  ]);

  // Offers
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
      url: abs(`${modelPath}#cenas`),
      itemOffered: {
        '@type': 'Service',
        name: `${d.name} — ${it.title}`,
        serviceType: it.title,
        provider,
      },
      availability: 'https://schema.org/InStock',
    };
  });

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}${modelPath}#service`,
    serviceType: `${d.name} remonts`,
    name: `${d.name} remonts`,
    url: abs(modelPath),
    areaServed: { '@type': 'City', name: 'Rīga' },
    provider,
    ...(offers.length ? { offers } : {}),
  };

  return (
    <>
      {/* JSON-LD */}
      <Script
        id="breadcrumbs-jsonld-telefonu"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script
        id="service-jsonld-telefonu"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>
      <Script
        id="faq-jsonld-telefonu"
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

      {/* Popular services for this model */}
      <Services
        id="telefonu-services"
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
        id="model-faq"
        title="Biežāk uzdotie jautājumi"
        items={FINAL_FAQ_ITEMS}
      />

      <ConvertBand />
    </>
  );
}
