import Script from 'next/script';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@sections/service-pricelist/ServicePricelist';

import {
  normalizeText,
  toFaqLd,
  toFaqRenderItems,
} from '@sections/faq/faq.helpers';

import { db } from '@/lib/firebaseAdmin';

import s from '@styles/Catalog.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
} from '@/lib/seo/jsonldHelpers';

const SERVICE_IDS = ['phone-battery'];

function getRoutePath(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone/zamena-batarei'
    : '/iphone-remonts/baterijas-maina';
}

function getHubPath(locale = 'lv') {
  return locale === 'ru' ? '/ru/remont-iphone' : '/iphone-remonts';
}

function getAllModelsHref(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone#iphone-modeli'
    : '/iphone-remonts#iphone-modeli';
}

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'Замена батареи iPhone',
      heroBodyHtml:
        '<p><strong>Замена батареи iPhone в Риге</strong> в сервисе iLab - быстрая диагностика, качественные детали и <strong>гарантия 90 дней</strong>. Часто замену аккумулятора выполняем в тот же день.</p>',
      priceTitle: 'Цены на замену батареи по моделям',
      ctaLabel: 'Записаться на ремонт',
      faqTitle: 'Вопросы',
      serviceFaqGroupLabel: 'Замена батареи',
      basicFaqGroupLabel: 'Общие вопросы',
      breadcrumbServiceName: 'Замена батареи',
      serviceName: 'Замена батареи iPhone в Риге',
      serviceType: 'Замена батареи iPhone',
      serviceDescription:
        'Замена батареи iPhone в Риге: бесплатная диагностика, гарантия 90 дней.',
      homeCrumb: 'Главная',
      hubCrumb: 'Ремонт iPhone',
      otherModels: 'Другие модели',
      headerTitle: 'Замена батареи iPhone в Риге',
      headerLead:
        'Меняем аккумулятор iPhone при быстром разряде, отключениях, перегреве и других признаках износа батареи. До ремонта проводим диагностику, согласовываем стоимость и после замены выдаём гарантию 90 дней.',
      headerCtaLabel: 'Смотреть цены',
      serviceFaqDocId: 'service_baterijas-maina_ru',
      basicFaqDocId: 'basic_ru',
      applyAria: 'Записаться на ремонт',
    };
  }

  return {
    heroAlt: 'iPhone baterijas maiņa',
    heroBodyHtml:
      '<p><strong>iPhone baterijas maiņa Rīgā</strong> iLab servisā - ātra diagnostika, kvalitatīvas detaļas un <strong>90 dienu garantija</strong>. Bieži akumulatora nomaiņu paveicam tajā pašā dienā.</p>',
    priceTitle: 'Baterijas maiņas cenas pēc modeļa',
    ctaLabel: 'Pieteikties remontam',
    faqTitle: 'Jautājumi',
    serviceFaqGroupLabel: 'Baterijas maiņa',
    basicFaqGroupLabel: 'Vispārīgi jautājumi',
    breadcrumbServiceName: 'Baterijas maiņa',
    serviceName: 'iPhone baterijas maiņa Rīgā',
    serviceType: 'iPhone baterijas maiņa',
    serviceDescription:
      'iPhone baterijas maiņa Rīgā: bezmaksas diagnostika, 90 dienu garantija.',
    homeCrumb: 'Sākums',
    hubCrumb: 'iPhone remonts',
    otherModels: 'Citi modeļi',
    headerTitle: 'iPhone baterijas maiņa Rīgā',
    headerLead:
      'Mainām iPhone akumulatoru, ja baterija ātri izlādējas, telefons izslēdzas, sakarst vai neuzrāda stabilu uzlādi. Pirms remonta veicam diagnostiku, saskaņojam izmaksas un pēc nomaiņas sniedzam 90 dienu garantiju.',
    headerCtaLabel: 'Skatīt cenas',
    serviceFaqDocId: 'service_baterijas-maina_lv',
    basicFaqDocId: 'basic_lv',
    applyAria: 'Pieteikties remontam',
  };
}

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

export function getIphoneBatteryServiceMetadata(locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: 'Замена батареи iPhone в Риге | iLab',
      description:
        'Быстрая и качественная замена батареи iPhone в Риге. Бесплатная диагностика, гарантия 90 дней, оригинальные или OEM детали. Часто в тот же день.',
      alternates: {
        canonical: getRoutePath(locale),
      },
    };
  }

  return {
    title: 'iPhone baterijas maiņa Rīgā | iLab',
    description:
      'Ātra un kvalitatīva iPhone baterijas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM detaļas. Bieži tajā pašā dienā.',
    alternates: {
      canonical: getRoutePath(locale),
    },
  };
}

function buildBreadcrumbs(locale = 'lv') {
  const strings = getPageStrings(locale);

  return buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.hubCrumb, url: abs(getHubPath(locale)) },
    { name: strings.breadcrumbServiceName, url: abs(getRoutePath(locale)) },
  ]);
}

function buildServiceLd(locale = 'lv') {
  const strings = getPageStrings(locale);

  return buildServiceLdForCity({
    path: getRoutePath(locale),
    name: strings.serviceName,
    serviceType: strings.serviceType,
    description: strings.serviceDescription,
  });
}

function dedupeFaqItems(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const key = normalizeText(item?.q || '').toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sortFaqItems(items = []) {
  return [...items].sort((a, b) => {
    const ao = typeof a?.order === 'number' ? a.order : 9999;
    const bo = typeof b?.order === 'number' ? b.order : 9999;
    if (ao !== bo) return ao - bo;

    const aq = String(a?.q || '');
    const bq = String(b?.q || '');
    return aq.localeCompare(bq);
  });
}

async function getFaqSections(locale = 'lv') {
  const strings = getPageStrings(locale);

  const [serviceDoc, basicDoc] = await Promise.all([
    db.collection('faqGroups').doc(strings.serviceFaqDocId).get(),
    db.collection('faqGroups').doc(strings.basicFaqDocId).get(),
  ]);

  const sections = [];

  const serviceData = serviceDoc.exists ? serviceDoc.data() || {} : {};
  const basicData = basicDoc.exists ? basicDoc.data() || {} : {};

  const serviceItems = sortFaqItems(
    (Array.isArray(serviceData.items) ? serviceData.items : [])
      .filter((item) => {
        if (!item) return false;
        if (!String(item.q || '').trim()) return false;
        if (!(String(item.aHtml || '').trim() || String(item.a || '').trim())) {
          return false;
        }
        if (item.isHidden === true) return false;
        return true;
      })
      .map((item) => ({
        q: String(item.q || '').trim(),
        aHtml: typeof item.aHtml === 'string' ? item.aHtml.trim() : '',
        a: typeof item.a === 'string' ? item.a.trim() : '',
        order:
          typeof item.order === 'number' && Number.isFinite(item.order)
            ? item.order
            : 9999,
      }))
  );

  if (serviceItems.length) {
    sections.push({
      id: strings.serviceFaqDocId,
      title: strings.serviceFaqGroupLabel,
      items: serviceItems,
    });
  }

  const basicItems = sortFaqItems(
    (Array.isArray(basicData.items) ? basicData.items : [])
      .filter((item) => {
        if (!item) return false;
        if (!String(item.q || '').trim()) return false;
        if (!(String(item.aHtml || '').trim() || String(item.a || '').trim())) {
          return false;
        }
        if (item.isHidden === true) return false;
        return true;
      })
      .map((item) => ({
        q: String(item.q || '').trim(),
        aHtml: typeof item.aHtml === 'string' ? item.aHtml.trim() : '',
        a: typeof item.a === 'string' ? item.a.trim() : '',
        order:
          typeof item.order === 'number' && Number.isFinite(item.order)
            ? item.order
            : 9999,
      }))
  );

  if (basicItems.length) {
    sections.push({
      id: strings.basicFaqDocId,
      title: strings.basicFaqGroupLabel,
      items: basicItems,
    });
  }

  return sections;
}

async function getAppleSeriesLabelMap(locale = 'lv') {
  const doc = await db.collection('categories').doc('telefonu-remonts').get();
  if (!doc.exists) return new Map();

  const data = doc.data() || {};
  const brands = Array.isArray(data.brands) ? data.brands : [];
  const appleBrand = brands.find((brand) => brand?.key === 'apple');

  if (!appleBrand) return new Map();

  const series = Array.isArray(appleBrand.series) ? appleBrand.series : [];
  const map = new Map();

  for (const item of series) {
    if (!item?.key) continue;

    const label =
      pickLocalizedField(item.labels, locale) ||
      pickLocalizedField(item.labels, 'lv') ||
      item.key;

    map.set(item.key, label);
  }

  return map;
}

async function getDevicesForIphone(locale = 'lv') {
  const strings = getPageStrings(locale);
  const [snap, seriesLabelMap] = await Promise.all([
    db
      .collection('devices')
      .where('categoryKey', '==', 'telefonu-remonts')
      .where('brandKey', '==', 'apple')
      .get(),
    getAppleSeriesLabelMap(locale),
  ]);

  return snap.docs.map((doc) => {
    const data = doc.data() || {};
    const seriesKey = data.seriesKey || '';

    return {
      id: doc.id,
      slug: data.slug || '',
      name: data.name || '',
      image: data.image || '',
      year: typeof data.year === 'number' ? data.year : null,
      brandSlug: data.brandKey || '',
      category: data.categoryKey || '',
      series:
        seriesLabelMap.get(seriesKey) ||
        data.seriesLabel ||
        data.originalSeriesLabel ||
        strings.otherModels,
    };
  });
}

async function buildPricing() {
  const pricing = {};

  const deviceSnap = await db
    .collection('devices')
    .where('categoryKey', '==', 'telefonu-remonts')
    .where('brandKey', '==', 'apple')
    .get();

  deviceSnap.forEach((doc) => {
    const data = doc.data() || {};
    if (data.slug) {
      pricing[data.slug] = { items: [] };
    }
  });

  const snap = await db
    .collection('servicePricing')
    .where('categoryId', '==', 'telefonu-remonts')
    .where('serviceId', 'in', SERVICE_IDS)
    .get();

  snap.forEach((doc) => {
    const data = doc.data() || {};
    const modelId = data.modelId;
    const serviceId = data.serviceId;

    if (!modelId || !serviceId || !pricing[modelId]) return;

    pricing[modelId].items.push({
      id: serviceId,
      price:
        typeof data.price === 'number' && Number.isFinite(data.price)
          ? data.price
          : null,
      isStartingFrom: data.isStartingFrom === true,
    });
  });

  return pricing;
}

async function getServiceMetaMap(serviceIds) {
  const snap = await db
    .collection('services')
    .where('categoryId', '==', 'telefonu-remonts')
    .where('isActive', '==', true)
    .get();

  const map = {};

  snap.forEach((doc) => {
    const data = doc.data() || {};
    if (!serviceIds.includes(doc.id)) return;

    map[doc.id] = {
      id: doc.id,
      labels: {
        lv: data.labels?.lv || '',
        ru: data.labels?.ru || '',
      },
      order: typeof data.order === 'number' ? data.order : 9999,
    };
  });

  return map;
}

export default async function IphoneBatteryServicePage({
  locale = 'lv',
  searchParams,
}) {
  const selectedModel = searchParams?.model;
  const [devices, pricing, serviceMeta, sections] = await Promise.all([
    getDevicesForIphone(locale),
    buildPricing(),
    getServiceMetaMap(SERVICE_IDS),
    getFaqSections(locale),
  ]);

  const strings = getPageStrings(locale);

  const mergedFaqItems = dedupeFaqItems(
    sections.flatMap((section) => section.items || [])
  );

  const faqLd = toFaqLd(mergedFaqItems);
  const breadcrumbsLd = buildBreadcrumbs(locale);
  const serviceLd = buildServiceLd(locale);

  const headerCrumbs = [
    {
      label: strings.homeCrumb,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.hubCrumb,
      href: getHubPath(locale),
    },
    {
      label: strings.breadcrumbServiceName,
      href: getRoutePath(locale),
    },
  ];

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>

      <Script id="breadcrumbs-jsonld" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="service-jsonld" type="application/ld+json">
        {JSON.stringify(serviceLd)}
      </Script>

      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        scrollCta={{ label: strings.headerCtaLabel, targetId: 'brand-list' }}
        crumbs={headerCrumbs}
      />

      <DeviceHero
        image="/images/categories/baterijas_maina.webp"
        alt={strings.heroAlt}
        bodyHtml={strings.heroBodyHtml}
      />

      <section id="brand-list" className={s.section}>
        <ServicePricelist
          devices={devices}
          pricing={pricing}
          serviceMeta={serviceMeta}
          brandSlug="apple"
          categorySlug="telefonu-remonts"
          serviceIds={SERVICE_IDS}
          title={strings.priceTitle}
          allModelsHref={getAllModelsHref(locale)}
          cta={{ label: strings.ctaLabel, href: '#pieteikties' }}
          selectedModel={selectedModel}
          locale={locale}
        />
      </section>

      <Process locale={locale} />
      <Why locale={locale} />

      {!!sections.length && (
        <section className={s.section} aria-labelledby="faq-h2">
          <div className={s.container}>
            <h2 id="faq-h2" className={s.h2}>
              {strings.faqTitle}
            </h2>

            {sections.map((section, index) => (
              <div
                key={`faq-group-${index}-${section.id}`}
                className={index > 0 ? s.stackLg : ''}
              >
                <Faq
                  id={`faq-group-${index + 1}`}
                  title={section.title}
                  items={toFaqRenderItems(section.items)}
                  headingLevel={3}
                  variant="accordion"
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="pieteikties" aria-label={strings.applyAria}>
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}