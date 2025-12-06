// app/(site)/(catalog)/iphone-remonts/[device]/page.jsx

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

import s from './Device.module.scss';

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

  // "no 50", "from 50"
  const fromMatch = p.match(/(?:^|\s)(?:no|from)\s*([0-9]+(?:[.,][0-9]+)?)/i);
  if (fromMatch) {
    const from = Number(fromMatch[1].replace(',', '.'));
    return { priceFrom: isNaN(from) ? null : from, priceTo: null, priceText };
  }

  // "50-80"
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

  // "50"
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

// Popular services grid (canonical routes)
function buildModelServices() {
  return [
    {
      title: 'Ekrāna maiņa',
      href: '/iphone-remonts/ekrana-maina',
      text: 'plaisas, līnijas, tumši plankumi, nereaģē skārienjūtīgais ekrāns.',
      icon: LuSmartphone,
    },
    {
      title: 'Baterijas maiņa',
      href: '/iphone-remonts/baterijas-maina',
      text: 'strauji krīt uzlādes līmenis, telefons izslēdzas pie 10–20%.',
      icon: LuBatteryCharging,
    },
    {
      title: 'Uzlādes ligzdas maiņa',
      href: '/iphone-remonts/uzlades-ligzdas-maina',
      text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
      icon: LuPlugZap,
    },
    {
      title: 'Kameras remonts',
      href: '/iphone-remonts/kameras-remonts',
      text: 'miglaini attēli, melni plankumi, fokusēšanās problēmas.',
      icon: LuCamera,
    },
    {
      title: 'Skaļruņu un mikrofona remonts',
      href: '/iphone-remonts/skalruni-mikrofona-remonts',
      text: 'klusa skaņa, krakšķi, sarunas laikā nedzird vai neviens nedzird jūs.',
      icon: LuVolume2,
    },
    {
      title: 'Ūdens bojājumu remonts',
      href: '/iphone-remonts/udens-bojajumu-remonts',
      text: 'diagnostika un atjaunošana pēc šķidruma iekļūšanas, ja tas iespējams.',
      icon: LuDroplets,
    },
  ];
}

// Build FAQ items + LD for iPhone models: IPHONE → PHONE → HOME
function buildFaqForIphoneModel() {
  const iphoneFaq = getFaqItems(FAQ_CONTEXT.IPHONE)?.items ?? [];
  if (iphoneFaq.length) {
    return {
      faqItems: iphoneFaq,
      faqLd: getFaqLd(FAQ_CONTEXT.IPHONE),
    };
  }

  const phoneFaq = getFaqItems(FAQ_CONTEXT.PHONE)?.items ?? [];
  if (phoneFaq.length) {
    return {
      faqItems: phoneFaq,
      faqLd: getFaqLd(FAQ_CONTEXT.PHONE),
    };
  }

  const homeFaq = getFaqItems(FAQ_CONTEXT.HOME)?.items ?? [];
  return {
    faqItems: homeFaq,
    faqLd: getFaqLd(FAQ_CONTEXT.HOME),
  };
}

// Build HowTo JSON-LD for the repair process
function buildProcessHowToLd(modelPath, deviceName) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${ORIGIN}${modelPath}#howto`,
    name: `${deviceName} remonta process iLab`,
    description:
      'Kā soli pa solim notiek iPhone remonta process iLab servisā Rīgā.',
    step: [
      {
        '@type': 'HowToStep',
        name: '1. Atved iPhone uz iLab',
        text: 'Atnes savu iPhone uz iLab Domina vai Spice filiāli bez iepriekšēja pieraksta.',
      },
      {
        '@type': 'HowToStep',
        name: '2. Bezmaksas diagnostika',
        text: 'Veicam sākotnējo diagnostiku un nosakām bojājumu cēloni un remonta iespējas.',
      },
      {
        '@type': 'HowToStep',
        name: '3. Cenu un termiņa saskaņošana',
        text: 'Pirms remonta sākšanas saskaņojam ar tevi cenu, detaļu tipu un remonta laiku.',
      },
      {
        '@type': 'HowToStep',
        name: '4. Remonts un testēšana',
        text: 'Veicam remonta darbus, nomainām bojātās detaļas un rūpīgi pārbaudām iPhone darbību.',
      },
      {
        '@type': 'HowToStep',
        name: '5. Saņem iPhone ar garantiju',
        text: 'Saņem salabotu iPhone ar iLab garantiju un čeku, kā arī ieteikumiem turpmākai lietošanai.',
      },
    ],
  };
}

/* ===== Metadata ===== */
export async function generateMetadata({ params }) {
  const { device } = params;
  const slug = decodeURIComponent(device);
  const d = getIphoneDeviceBySlug(slug);

  const title =
    d?.metaTitle ||
    (d ? `${d.name} remonts Rīgā | iLab` : 'iPhone remonts Rīgā | iLab');

  const description =
    d?.metaDescription ||
    (d
      ? `${d.name} remonts Rīgā: ekrāna maiņa, baterijas maiņa, uzlādes ligzdas remonts, kameras un citi bojājumi. Ātra diagnostika, godīgas cenas un garantija.`
      : 'iPhone remonts Rīgā: ekrāna maiņa, baterijas maiņa, uzlādes ligzda, kamera un citi bojājumi. Ātra diagnostika un garantija iLab servisā.');

  return {
    title,
    description,
    alternates: { canonical: `/iphone-remonts/${slug}` },
  };
}

/* ===== Page ===== */
export default async function Page({ params }) {
  const { device } = params;
  const slug = decodeURIComponent(device);
  const d = getIphoneDeviceBySlug(slug);
  if (!d) return notFound();

  const { items: priceItems, currency } = buildPriceListItems(slug);
  const modelServices = buildModelServices();

  const { faqItems: FINAL_FAQ_ITEMS, faqLd: FAQ_LD } = buildFaqForIphoneModel();

  // ---------- JSON-LD ----------

  const modelPath = `/iphone-remonts/${d.slug}`;
  const provider = buildProvidersFromLocations(); // Domina + Spice by default

  // Breadcrumbs
  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: 'Sākums', url: abs('/') },
    { name: 'iPhone remonts', url: abs('/iphone-remonts') },
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
      ...(singleNumeric !== undefined
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

  const processHowToLd = buildProcessHowToLd(modelPath, d.name);

  return (
    <>
      {/* JSON-LD */}
      <Script
        id="breadcrumbs-jsonld-iphone"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script
        id="service-jsonld-iphone"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>
      {FAQ_LD && (
        <Script
          id="faq-jsonld-iphone"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(FAQ_LD)}
        </Script>
      )}
      <Script
        id="process-jsonld-iphone"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(processHowToLd)}
      </Script>

      {/* HERO */}
      <DeviceHero
        image={d.image}
        alt={`${d.name} remonts Rīgā`}
        bodyHtml={d.bodyHtml || null}
      />

      {/* Popular services for this model */}
      <section className={s.section}>
        <Services
          id="iphone-services"
          title={`Populārākie ${d?.name ?? 'šī modeļa'} remonti`}
          items={modelServices}
        />
      </section>

      {/* Pricing */}
      {priceItems.length > 0 && (
        <section className={s.section}>
          <PriceList
            id="cenas"
            title="Cenas un remonta laiks"
            items={priceItems}
            currency={DEFAULT_CURRENCY}
            headingLevel={2}
          />
        </section>
      )}

      <section className={s.section}>
        <Why />
      </section>

      {/* Process (added before FAQ) */}
      <section className={s.section}>
        <Process />
      </section>

      {/* FAQ */}
      {!!FINAL_FAQ_ITEMS.length && (
        <section className={s.section}>
          <Faq
            id="model-faq"
            title="Biežāk uzdotie jautājumi"
            items={FINAL_FAQ_ITEMS}
          />
        </section>
      )}

      <section className={s.section}>
        <ConvertBand />
      </section>
    </>
  );
}
