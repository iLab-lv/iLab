import Link from 'next/link';

import sCatalog from '@styles/Catalog.module.scss';
import s from './IphonePriceTeaser.module.scss';

import { db } from '@/lib/firebaseAdmin';
import IphonePriceTeaserContactButton from './IphonePriceTeaserContactButton';

const IPHONE_CATEGORY_KEY = 'telefonu-remonts';
const IPHONE_BRAND_KEY = 'apple';

const DEFAULT_FEATURED_MODELS = [
  {
    slug: 'iphone-16-pro',
    fallbackName: 'iPhone 16 Pro',
    fallbackImage: '/images/devices/iphone/iphone-16-pro.webp',
  },
  {
    slug: 'iphone-16-plus',
    fallbackName: 'iPhone 16 Plus',
    fallbackImage: '/images/devices/iphone/iphone-16-plus.webp',
  },
  {
    slug: 'iphone-16',
    fallbackName: 'iPhone 16',
    fallbackImage: '/images/devices/iphone/iphone-16.webp',
  },
  {
    slug: 'iphone-15-pro-max',
    fallbackName: 'iPhone 15 Pro Max',
    fallbackImage: '/images/devices/iphone/iPhone-15-Pro-Max.webp',
  },
  {
    slug: 'iphone-15-pro',
    fallbackName: 'iPhone 15 Pro',
    fallbackImage: '/images/devices/iphone/iPhone-15-Pro.webp',
  },
  {
    slug: 'iphone-14-pro',
    fallbackName: 'iPhone 14 Pro',
    fallbackImage: '/images/devices/iphone/iPhone-14-Pro.webp',
  },
  {
    slug: 'iphone-13-pro',
    fallbackName: 'iPhone 13 Pro',
    fallbackImage: '/images/devices/iphone/iPhone-13-Pro.webp',
  },
  {
    slug: 'iphone-11',
    fallbackName: 'iPhone 11',
    fallbackImage: '/images/devices/iphone/iphone-11.webp',
  },
];

const DEFAULT_PRICE_ITEMS = [
  {
    label: 'Ekrāna maiņa',
    serviceIds: ['phone-display-incell', 'phone-display-oled', 'phone-display-original'],
    mode: 'min',
    from: true,
  },
  {
    label: 'Baterijas maiņa',
    serviceIds: ['phone-battery'],
    mode: 'first',
    from: false,
  },
];

function pickLocalizedField(value, locale = 'lv', fallback = 'lv') {
  if (!value) return '';

  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'object') {
    if (typeof value[locale] === 'string' && value[locale].trim()) {
      return value[locale].trim();
    }
    if (typeof value[fallback] === 'string' && value[fallback].trim()) {
      return value[fallback].trim();
    }
  }

  return '';
}

function formatPrice(value, { from = false } = {}) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return from ? `no ${value} €` : `${value} €`;
  return value;
}

function minNumber(values) {
  const nums = values.filter((v) => typeof v === 'number' && Number.isFinite(v));
  if (!nums.length) return null;
  return Math.min(...nums);
}

async function getFeaturedDevicesBySlugs(slugs) {
  const snap = await db
    .collection('devices')
    .where('categoryKey', '==', IPHONE_CATEGORY_KEY)
    .where('brandKey', '==', IPHONE_BRAND_KEY)
    .get();

  const bySlug = new Map(
    snap.docs.map((doc) => {
      const data = doc.data();
      return [
        data.slug,
        {
          id: doc.id,
          ...data,
        },
      ];
    })
  );

  return slugs.map((slug) => bySlug.get(slug)).filter(Boolean);
}

async function getServicesMap() {
  const snap = await db
    .collection('services')
    .where('categoryId', '==', IPHONE_CATEGORY_KEY)
    .get();

  const services = snap.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((service) => service?.isActive !== false);

  return new Map(services.map((service) => [service.id, service]));
}

async function getPricingRowsForModels(modelIds) {
  const results = await Promise.all(
    modelIds.map((modelId) =>
      db.collection('servicePricing').where('modelId', '==', modelId).get()
    )
  );

  return results
    .flatMap((snap) =>
      snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    )
    .filter((row) => row?.isActive !== false);
}

function buildRowsForModel({
  modelSlug,
  priceItems,
  pricingByServiceId,
  servicesMap,
  locale = 'lv',
}) {
  const rows = [];

  for (const item of priceItems || []) {
    if (Array.isArray(item.lines) && item.lines.length) {
      for (const line of item.lines) {
        const pricing = pricingByServiceId.get(line.serviceId);
        const price =
          typeof pricing?.price === 'number' && Number.isFinite(pricing.price)
            ? pricing.price
            : null;

        if (price === null) continue;

        const service = servicesMap.get(line.serviceId);

        rows.push({
          key: `${modelSlug}:${item.label}:${line.serviceId}`,
          label:
            line.label ||
            pickLocalizedField(service?.labels, locale) ||
            service?.id ||
            item.label,
          value: price,
          from: line.from ?? pricing?.isStartingFrom === true,
        });
      }

      continue;
    }

    const serviceIds = Array.isArray(item.serviceIds) ? item.serviceIds : [];
    if (!serviceIds.length) continue;

    const values = serviceIds.map((serviceId) => {
      const pricing = pricingByServiceId.get(serviceId);
      return typeof pricing?.price === 'number' && Number.isFinite(pricing.price)
        ? pricing.price
        : null;
    });

    let chosen = null;

    if (item.mode === 'min') {
      chosen = minNumber(values);
    } else {
      chosen = values.find((v) => v !== null) ?? null;
    }

    if (chosen === null) continue;

    rows.push({
      key: `${modelSlug}:${item.label}:${serviceIds.join(',')}`,
      label: item.label,
      value: chosen,
      from: !!item.from,
    });
  }

  return rows;
}

export default async function IphonePriceTeaser({
  title = 'Precīzas cenas populārākajiem iPhone',
  intro = (
    <>
      Ekrāna maiņas cenas populārākajiem iPhone modeļiem. Pārējiem modeļiem - droši jautā,
      atbildēsim ar konkrētu piedāvājumu.
    </>
  ),

  featuredModels = DEFAULT_FEATURED_MODELS,
  priceItems = DEFAULT_PRICE_ITEMS,

  allModelsHref = '/iphone-remonts#iphone-modeli',
  allModelsLabel = 'Skatīt visus iPhone modeļus un cenas',
  contactLabel = 'Sazināties par savu modeli',

  locale = 'lv',
}) {
  const featuredSlugs = featuredModels.map((item) => item.slug);

  const [devices, servicesMap] = await Promise.all([
    getFeaturedDevicesBySlugs(featuredSlugs),
    getServicesMap(),
  ]);

  const pricingRows = await getPricingRowsForModels(devices.map((device) => device.slug));

  const pricingByModelId = new Map();

  for (const row of pricingRows) {
    if (!row?.modelId || !row?.serviceId) continue;

    if (!pricingByModelId.has(row.modelId)) {
      pricingByModelId.set(row.modelId, new Map());
    }

    pricingByModelId.get(row.modelId).set(row.serviceId, row);
  }

  const featuredFallbackMap = new Map(featuredModels.map((item) => [item.slug, item]));

  const cards = featuredSlugs.map((slug) => {
    const device = devices.find((item) => item.slug === slug);
    const fallback = featuredFallbackMap.get(slug);
    const pricingByServiceId = pricingByModelId.get(slug) || new Map();

    return {
      slug,
      name: device?.name || fallback?.fallbackName || slug,
      image: device?.image || fallback?.fallbackImage || '',
      rows: buildRowsForModel({
        modelSlug: slug,
        priceItems,
        pricingByServiceId,
        servicesMap,
        locale,
      }),
    };
  });

  return (
    <section className={`${sCatalog.section} ${s.section}`} aria-labelledby="iphone-price-teaser-h2">
      <div className={sCatalog.container}>
        <header className={s.header}>
          <h2 id="iphone-price-teaser-h2" className={sCatalog.h2}>
            {title}
          </h2>
          <p className={sCatalog.intro}>{intro}</p>
        </header>

        <div className={s.grid}>
          {cards.map((model) => (
            <article key={model.slug} className={s.card}>
              <div className={s.thumbWrap}>
                <img
                  src={model.image}
                  alt={model.name}
                  className={s.thumb}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3 className={s.model}>{model.name}</h3>

              <div className={s.priceTable}>
                {Array.isArray(model.rows) && model.rows.length > 0 ? (
                  model.rows.map((row) => (
                    <div key={row.key} className={s.priceRow}>
                      <span className={s.priceLabel}>{row.label}</span>
                      <span className={s.priceValue}>
                        {formatPrice(row.value, { from: !!row.from })}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className={s.priceRowMuted}>Cena pēc pieprasījuma</div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className={s.actionsRow}>
          <Link href={allModelsHref} className={s.allLink}>
            {allModelsLabel}
          </Link>

          <IphonePriceTeaserContactButton label={contactLabel} />
        </div>
      </div>
    </section>
  );
}