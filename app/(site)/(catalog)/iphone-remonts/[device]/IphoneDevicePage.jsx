// app/(site)/iphone-remonts/[device]/IphoneDevicePage.jsx

import Script from 'next/script';
import { notFound } from 'next/navigation';

import devices from '@/data/devices';
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
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';
import { buildServiceHref } from '@/lib/routes/routeI18n';

import { db } from '@/lib/firebaseAdmin';

import s from '@/app/(site)/(catalog)/iphone-remonts/[device]/Device.module.scss';

import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

const DEFAULT_CURRENCY = 'EUR';

function norm(value = '') {
  return decodeURIComponent(String(value)).trim();
}

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

function toPriceRange(priceStr) {
  if (!priceStr) return { priceFrom: null, priceTo: null, priceText: '' };

  const raw = String(priceStr).trim();
  const lower = raw.toLowerCase();
  const priceText = raw;

  const fromMatch = lower.match(/(?:^|\s)(?:no|from)\s*([0-9]+(?:[.,][0-9]+)?)/i);
  if (fromMatch) {
    const from = Number(fromMatch[1].replace(',', '.'));
    return {
      priceFrom: Number.isNaN(from) ? null : from,
      priceTo: null,
      priceText,
    };
  }

  const rangeMatch = lower.match(
    /^\s*([0-9]+(?:[.,][0-9]+)?)\s*[-–]\s*([0-9]+(?:[.,][0-9]+)?)\s*$/
  );
  if (rangeMatch) {
    const from = Number(rangeMatch[1].replace(',', '.'));
    const to = Number(rangeMatch[2].replace(',', '.'));

    return {
      priceFrom: Number.isNaN(from) ? null : from,
      priceTo: Number.isNaN(to) ? null : to,
      priceText,
    };
  }

  const singleMatch = lower.match(/^\s*([0-9]+(?:[.,][0-9]+)?)\s*$/);
  if (singleMatch) {
    const value = Number(singleMatch[1].replace(',', '.'));
    return {
      priceFrom: null,
      priceTo: Number.isNaN(value) ? null : value,
      priceText,
    };
  }

  return { priceFrom: null, priceTo: null, priceText };
}

async function buildPriceListItems(modelSlug) {
  const device = getIphoneDeviceBySlug(modelSlug);
  const perDeviceTimeText = device?.serviceTimeTextOverrides || {};
  const catalogById = new Map(repairServices.map((service) => [service.id, service]));

  const snap = await db
    .collection('modelServices')
    .where('modelId', '==', modelSlug)
    .get();

  if (snap.empty) {
    return { items: [], currency: DEFAULT_CURRENCY };
  }

  const merged = snap.docs
    .map((doc) => {
      const data = doc.data() || {};
      const serviceId = data.serviceId;
      if (!serviceId) return null;

      const base = catalogById.get(serviceId);
      if (!base) return null;

      const timeText =
        (typeof perDeviceTimeText[serviceId] === 'string' &&
          perDeviceTimeText[serviceId].trim()) ||
        base.defaultTimeText ||
        'Tajā pašā dienā';

      const raw = data.price;
      if (raw === null) return null;

      const priceText =
        typeof raw === 'number' ? String(raw) : String(raw ?? '').trim();

      const { priceFrom, priceTo } = toPriceRange(priceText);

      return {
        id: serviceId,
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

function buildModelServices(locale = 'lv') {
  return [
    {
      title: 'Ekrāna maiņa',
      href: buildServiceHref(locale, 'iphone-remonts', 'ekrana-maina'),
      text: 'plaisas, līnijas, tumši plankumi, nereaģē skārienjūtīgais ekrāns.',
      icon: LuSmartphone,
    },
    {
      title: 'Baterijas maiņa',
      href: buildServiceHref(locale, 'iphone-remonts', 'baterijas-maina'),
      text: 'strauji krīt uzlādes līmenis, telefons izslēdzas pie 10–20%.',
      icon: LuBatteryCharging,
    },
    {
      title: 'Uzlādes ligzdas maiņa',
      href: buildServiceHref(locale, 'iphone-remonts', 'uzlades-ligzdas-maina'),
      text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
      icon: LuPlugZap,
    },
    {
      title: 'Kameras remonts',
      href: buildServiceHref(locale, 'iphone-remonts', 'kameras-remonts'),
      text: 'miglaini attēli, melni plankumi, fokusēšanās problēmas.',
      icon: LuCamera,
    },
    {
      title: 'Skaļruņu un mikrofona remonts',
      href: buildServiceHref(locale, 'iphone-remonts', 'skalruni-mikrofona-remonts'),
      text: 'klusa skaņa, krakšķi, sarunas laikā nedzird vai neviens nedzird jūs.',
      icon: LuVolume2,
    },
    {
      title: 'Ūdens bojājumu remonts',
      href: buildServiceHref(locale, 'iphone-remonts', 'udens-bojajumu-remonts'),
      text: 'diagnostika un atjaunošana pēc šķidruma iekļūšanas, ja tas iespējams.',
      icon: LuDroplets,
    },
  ];
}

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

export function getIphoneDeviceMetadata(slug, { locale = 'lv' } = {}) {
  const deviceSlug = norm(slug);
  const device = getIphoneDeviceBySlug(deviceSlug);

  const title =
    device?.metaTitle ||
    (device ? `${device.name} remonts Rīgā | iLab` : 'iPhone remonts Rīgā | iLab');

  const description =
    device?.metaDescription ||
    (device
      ? `${device.name} remonts Rīgā: ekrāna maiņa, baterijas maiņa, uzlādes ligzdas remonts, kameras un citi bojājumi. Ātra diagnostika, godīgas cenas un garantija.`
      : 'iPhone remonts Rīgā: ekrāna maiņa, baterijas maiņa, uzlādes ligzda, kamera un citi bojājumi. Ātra diagnostika un garantija iLab servisā.');

  const canonicalBase =
    locale === 'ru' ? `/ru/remont-iphone/${deviceSlug}` : `/iphone-remonts/${deviceSlug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalBase },
  };
}

export default async function IphoneDevicePage({
  deviceSlug,
  locale = 'lv',
}) {
  const slug = norm(deviceSlug);
  const device = getIphoneDeviceBySlug(slug);

  if (!device) return notFound();

  const { items: priceItems, currency } = await buildPriceListItems(slug);
  const modelServices = buildModelServices(locale);
  const { faqItems, faqLd } = buildFaqForIphoneModel();

  const modelPath =
    locale === 'ru'
      ? `/ru/remont-iphone/${device.slug}`
      : `/iphone-remonts/${device.slug}`;

  const provider = buildProvidersFromLocations();

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: 'Sākums', url: abs('/') },
    {
      name: 'iPhone remonts',
      url: abs(locale === 'ru' ? '/ru/remont-iphone' : '/iphone-remonts'),
    },
    { name: `${device.name} remonts`, url: abs(modelPath) },
  ]);

  const offers = priceItems.map((item) => {
    const priceStr = item.price == null ? '' : String(item.price);
    const singleNumeric = /^\s*[0-9]+([.,][0-9]+)?\s*$/.test(priceStr)
      ? Number(priceStr.replace(',', '.'))
      : undefined;

    return {
      '@type': 'Offer',
      name: item.title,
      ...(singleNumeric !== undefined
        ? {
            price: singleNumeric,
            priceCurrency: currency,
          }
        : {}),
      url: abs(`${modelPath}#cenas`),
      itemOffered: {
        '@type': 'Service',
        name: `${device.name} — ${item.title}`,
        serviceType: item.title,
        provider,
      },
      availability: 'https://schema.org/InStock',
    };
  });

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}${modelPath}#service`,
    serviceType: `${device.name} remonts`,
    name: `${device.name} remonts`,
    url: abs(modelPath),
    areaServed: { '@type': 'City', name: 'Rīga' },
    provider,
    ...(offers.length ? { offers } : {}),
  };

  const processHowToLd = buildProcessHowToLd(modelPath, device.name);

  return (
    <>
      <Script
        id={`breadcrumbs-jsonld-iphone-${device.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id={`service-jsonld-iphone-${device.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>

      {faqLd && (
        <Script
          id={`faq-jsonld-iphone-${device.slug}`}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(faqLd)}
        </Script>
      )}

      <Script
        id={`process-jsonld-iphone-${device.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(processHowToLd)}
      </Script>

      <DeviceHero
        image={device.image}
        alt={`${device.name} remonts Rīgā`}
        bodyHtml={device.bodyHtml || null}
      />

      <section className={s.section}>
        <Services
          id="iphone-services"
          title={`Populārākie ${device.name} remonti`}
          items={modelServices}
        />
      </section>

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
        <Why locale={locale} />
      </section>

      <section className={s.section}>
        <Process locale={locale} />
      </section>

      {!!faqItems.length && (
        <section className={s.section}>
          <Faq
            id="model-faq"
            title="Biežāk uzdotie jautājumi"
            items={faqItems}
            locale={locale}
          />
        </section>
      )}

      <section className={s.section}>
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}