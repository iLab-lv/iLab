// app/(site)/(catalog)/plansetdatoru-remonts/[brand]/[device]/page.jsx
import Script from 'next/script';
import { notFound } from 'next/navigation';

import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';
import repairServices from '@/data/repairServices';

import DeviceHero from '@sections/device-hero/DeviceHero';
import PriceList from '@sections/pricing/PriceList';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
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

// Popular services grid for this model (non-clickable)
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

// Shared process steps for tablets
const PROCESS_STEPS = [
  {
    title: 'Diagnostika',
    text: 'Ātri pārbaudām planšetdatoru un apstiprinām problēmu (ekrāns, baterija, uzlāde, skaņa u.c.).',
  },
  {
    title: 'Cena un termiņš',
    text: 'Pirms remonta sākšanas saskaņojam izmaksas un izpildes laiku.',
  },
  {
    title: 'Remonts',
    text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.',
  },
  {
    title: 'Pārbaude',
    text: 'Pēc remonta testējam ekrānu, skārienu, uzlādi, skaņu un citas funkcijas.',
  },
  {
    title: 'Garantija',
    text: '90 dienu garantija uz detaļu un darbu, plus ieteikumi turpmākai lietošanai.',
  },
];

/* ===== Metadata ===== */
export async function generateMetadata({ params }) {
  const { brand, device } = params;
  const slug = decodeURIComponent(device);
  const brandSlug = decodeURIComponent(brand);
  const d = getTabletDeviceBySlug(slug);

  const title = d
    ? `${d.name} remonts | iLab`
    : 'Planšetdatoru remonts | iLab';

  const description =
    d?.metaDescription ||
    'Planšetdatoru remonts: displejs, baterija, uzlāde, kamera. Bezmaksas diagnostika un 90 dienu garantija.';

  const canonicalPath = `/plansetdatoru-remonts/${brandSlug}/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
  };
}

/* ===== Page ===== */
export default async function Page({ params }) {
  const { brand, device } = params;
  const slug = decodeURIComponent(device);
  const brandSlug = decodeURIComponent(brand);
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

  const provider = buildProvidersFromLocations();
  const brandLabel = d.brandName || d.brandSlug?.toUpperCase() || brandSlug;
  const modelPath = `/plansetdatoru-remonts/${brandSlug}/${d.slug}`;

  // JSON-LD: breadcrumbs
  const breadcrumbsLd = buildBreadcrumbsLd([
    {
      name: 'Sākums',
      url: abs('/'),
    },
    {
      name: 'Planšetdatoru remonts',
      url: abs('/plansetdatoru-remonts'),
    },
    {
      name: `${brandLabel} planšetdatoru remonts`,
      url: abs(`/plansetdatoru-remonts/${brandSlug}`),
    },
    {
      name: `${d.name} remonts`,
      url: abs(modelPath),
    },
  ]);

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

  const processHowToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${ORIGIN}${modelPath}#howto`,
    name: `${d.name} remonta process iLab`,
    description:
      'Kā soli pa solim notiek planšetdatora diagnostika, remonts un testēšana iLab servisā Rīgā.',
    step: [
      {
        '@type': 'HowToStep',
        name: '1. Diagnostika',
        text: 'Ātri pārbaudām planšetdatoru, apstiprinām problēmu (displejs, baterija, uzlāde, skaņa u.c.) un izvērtējam bojājuma apmēru.',
      },
      {
        '@type': 'HowToStep',
        name: '2. Cena un termiņš',
        text: 'Pirms remonta sākšanas saskaņojam izmaksas, detaļu veidu (oriģināls vai OEM) un izpildes termiņu.',
      },
      {
        '@type': 'HowToStep',
        name: '3. Remonts',
        text: 'Sertificēti meistari veic ekrāna, baterijas, uzlādes ligzdas, kameras vai citu komponentu remontu, izmantojot kvalitatīvas detaļas.',
      },
      {
        '@type': 'HowToStep',
        name: '4. Pārbaude',
        text: 'Pēc remonta testējam ekrānu, skārienu, skaņu, uzlādi, tīklu un citas ikdienai svarīgas funkcijas, lai pārliecinātos par stabilu darbību.',
      },
      {
        '@type': 'HowToStep',
        name: '5. Garantija un izsniegšana',
        text: 'Izsniedzam planšetdatoru ar 90 dienu garantiju uz detaļu un darbu, sniedzam ieteikumus turpmākai lietošanai.',
      },
    ],
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
      <Script
        id="process-jsonld-tablet"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(processHowToLd)}
      </Script>

      {/* HERO */}
      <DeviceHero
        image={d.image}
        alt={`${d.name} remonts`}
        bodyHtml={d.bodyHtml || null}
      />

      {/* Popular services for this model – non-clickable */}
      <Services
        id="tablet-services"
        title={`Populārākie ${d?.name ?? 'šī modeļa'} remonti`}
        items={modelServices}
        headingLevel={2}
        variant="list"
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

      {/* Process */}
      <Process
        id="process"
        title="Kā notiek remonts"
        steps={PROCESS_STEPS}
        headingLevel={2}
        variant="cards"
      />

      {/* FAQ */}
      <Faq
        id="tablet-model-faq"
        title="Biežāk uzdotie jautājumi"
        items={FINAL_FAQ_ITEMS}
        headingLevel={2}
        variant="accordion"
      />

      <ConvertBand />
    </>
  );
}
