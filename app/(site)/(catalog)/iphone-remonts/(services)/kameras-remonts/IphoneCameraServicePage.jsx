import Script from 'next/script';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';

import {
  normalizeText,
  toFaqLd,
  toFaqRenderItems,
} from '@sections/faq/faq.helpers';

import devices from '@/data/devices';

import s from '@styles/Catalog.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
} from '@/lib/seo/jsonldHelpers';

import { db } from '@/lib/firebaseAdmin';

const SERVICE_IDS = ['camera-glass', 'camera'];

function getRoutePath(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone/remont-kamery'
    : '/iphone-remonts/kameras-remonts';
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
      heroAlt: 'Ремонт камеры iPhone в Риге',
      heroBodyHtml:
        '<p><strong>Мутные фото или проблемы с фокусировкой?</strong> Выполняем <strong>ремонт и замену камеры iPhone</strong> - диагностика, замена стекла камеры или модуля по необходимости. <strong>Гарантия 90 дней.</strong></p>',
      introTitle: 'Ремонт и замена камеры iPhone в Риге',
      introP1:
        'Если фотографии получаются мутными, с пятнами или телефон не может сфокусироваться, сначала проверяем <strong>стекло камеры и модуль</strong>. Если повреждено только стекло, часто достаточно его замены. Если поврежден сам модуль - предложим замену модуля с полной проверкой.',
      introP2:
        'После ремонта проверяем <strong>фокусировку, стабилизацию, цветопередачу и вспышку</strong>. Популярные модели обычно ремонтируем за <strong>45–90 минут</strong>. На все работы и детали действует <strong>гарантия 90 дней</strong>.',
      selectedModelPrefix: 'Выбрана модель:',
      selectedModelSuffix: 'Прокрутите к',
      selectedModelLink: 'ценам',
      modelPickerTitle: 'Выберите модель iPhone',
      priceTitle: 'Цены на замену стекла камеры и модуля по моделям',
      priceIntro:
        'Посмотрите стоимость замены стекла камеры и модуля iPhone по моделям. Сначала проводим диагностику, чтобы определить, какой вариант нужен.',
      ctaLabel: 'Записаться на ремонт',
      processTitle: 'Как проходит ремонт',
      processSteps: [
        { title: 'Диагностика', text: 'Проверяем стекло камеры, модуль, соединения и программную часть.' },
        { title: 'Цена и срок', text: 'Согласовываем стоимость и время ремонта до начала работ.' },
        { title: 'Ремонт', text: 'Меняем стекло или модуль камеры, при необходимости выполняем калибровку.' },
        { title: 'Тесты', text: 'Проверяем фокусировку, стабилизацию, вспышку и качество изображения.' },
        { title: 'Гарантия', text: 'Гарантия 90 дней на детали и выполненные работы.' },
      ],
      faqTitle: 'Часто задаваемые вопросы',
      serviceFaqGroupLabel: 'Ремонт камеры',
      basicFaqGroupLabel: 'Общие вопросы',
      breadcrumbServiceName: 'Ремонт камеры',
      serviceName: 'Ремонт камеры iPhone в Риге',
      serviceType: 'Ремонт камеры iPhone',
      serviceDescription:
        'Ремонт камеры iPhone в Риге: диагностика, замена стекла камеры и замена модуля по необходимости. Гарантия 90 дней.',
      homeCrumb: 'Главная',
      hubCrumb: 'Ремонт iPhone',
      headerTitle: 'Ремонт камеры iPhone в Риге',
      headerLead:
        'Ремонтируем камеру iPhone при мутных фото, пятнах, проблемах с фокусировкой и повреждённом стекле камеры. До ремонта проводим диагностику, согласовываем стоимость и после ремонта выдаём гарантию 90 дней.',
      headerCtaLabel: 'Смотреть цены',
      serviceFaqDocId: 'service_kameras-remonts_ru',
      basicFaqDocId: 'basic_ru',
      applyAria: 'Записаться на ремонт',
    };
  }

  return {
    heroAlt: 'iPhone kameras remonts Rīgā',
    heroBodyHtml:
      '<p><strong>Miglainas bildes vai fokusēšanās problēmas?</strong> Veicam <strong>iPhone kameras remontu un maiņu</strong> - diagnostika, stikliņa nomaiņa vai moduļa nomaiņa pēc vajadzības. <strong>90 dienu garantija.</strong></p>',
    introTitle: 'iPhone kameras remonts un nomaiņa Rīgā',
    introP1:
      'Ja fotogrāfijas ir miglainas, ar plankumiem vai telefons nevar fokusēt, vispirms pārbaudām <strong>kameras stikliņu un moduli</strong>. Ja bojāts tikai stikliņš, bieži pietiek ar tā nomaiņu. Ja bojāts pats modulis - ieteiksim moduļa nomaiņu ar pilnu pārbaudi.',
    introP2:
      'Pēc remonta testējam <strong>fokusēšanu, stabilizāciju, krāsu atbilstību un zibspuldzi</strong>. Populāros modeļus parasti salabojam <strong>45–90 minūtēs</strong>. Visam darbam un detaļām ir <strong>90 dienu garantija</strong>.',
    selectedModelPrefix: 'Atlasīts modelis:',
    selectedModelSuffix: 'Ritiniet uz',
    selectedModelLink: 'cenām',
    modelPickerTitle: 'Izvēlies iPhone modeli',
    priceTitle: 'Kameras stikliņa un moduļa maiņas cenas pēc modeļa',
    priceIntro:
      'Apskati iPhone kameras stikliņa un moduļa maiņas izmaksas pēc modeļa. Sākumā veicam diagnostiku, lai noteiktu, kurš variants nepieciešams.',
    ctaLabel: 'Pieteikties remontam',
    processTitle: 'Kā notiek remonts',
    processSteps: [
      { title: 'Diagnostika', text: 'Pārbaudām kameras stikliņu, moduli, savienojumus un programmatūru.' },
      { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un remonta laiku pirms darba sākšanas.' },
      { title: 'Remonts', text: 'Mainām stikliņu vai moduļa komplektu, ja nepieciešams - veicam kalibrāciju.' },
      { title: 'Testi', text: 'Pārbaudām fokusēšanu, stabilizāciju, zibspuldzi un attēla kvalitāti.' },
      { title: 'Garantija', text: '90 dienu garantija gan detaļām, gan darbam.' },
    ],
    faqTitle: 'Biežāk uzdotie jautājumi',
    serviceFaqGroupLabel: 'Kameras remonts',
    basicFaqGroupLabel: 'Vispārīgi jautājumi',
    breadcrumbServiceName: 'Kameras remonts',
    serviceName: 'iPhone kameras remonts Rīgā',
    serviceType: 'iPhone kameras remonts',
    serviceDescription:
      'iPhone kameras remonts Rīgā: diagnostika, stikliņa maiņa un moduļa nomaiņa pēc vajadzības. 90 dienu garantija.',
    homeCrumb: 'Sākums',
    hubCrumb: 'iPhone remonts',
    headerTitle: 'iPhone kameras remonts Rīgā',
    headerLead:
      'Remontējam iPhone kameru, ja attēli ir miglaini, ir plankumi, fokusēšanās problēmas vai bojāts kameras stikliņš. Pirms remonta veicam diagnostiku, saskaņojam izmaksas un pēc remonta sniedzam 90 dienu garantiju.',
    headerCtaLabel: 'Skatīt cenas',
    serviceFaqDocId: 'service_kameras-remonts_lv',
    basicFaqDocId: 'basic_lv',
    applyAria: 'Pieteikties remontam',
  };
}

export function getIphoneCameraServiceMetadata(locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: 'Ремонт камеры iPhone в Риге | iLab',
      description:
        'Мутные фото или проблемы с фокусировкой? Ремонт и замена камеры iPhone в Риге - диагностика, замена стекла камеры и модуля по необходимости. Гарантия 90 дней.',
      alternates: { canonical: getRoutePath(locale) },
    };
  }

  return {
    title: 'iPhone kameras remonts Rīgā | iLab',
    description:
      'Miglainas bildes vai fokusēšanās problēmas? iPhone kameras remonts un nomaiņa Rīgā - diagnostika, stikliņa nomaiņa un moduļa nomaiņa pēc vajadzības. 90 dienu garantija.',
    alternates: { canonical: getRoutePath(locale) },
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

function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function buildPricingForBrandModels({
  brandSlug,
  categorySlug,
  serviceIds,
}) {
  const brand = String(brandSlug || '').toLowerCase();
  const cat = String(categorySlug || '').toLowerCase();

  const modelSlugs = (devices || [])
    .filter((d) => String(d?.category || '').toLowerCase() === cat)
    .filter((d) => String(d?.brandSlug || '').toLowerCase() === brand)
    .map((d) => String(d.slug))
    .filter(Boolean);

  const pricingObj = {};
  for (const slug of modelSlugs) pricingObj[slug] = { items: [] };

  if (!modelSlugs.length) return pricingObj;

  const chunks = chunkArray(modelSlugs, 30);
  const temp = new Map();

  for (const group of chunks) {
    const snap = await db
      .collection('modelServices')
      .where('modelId', 'in', group)
      .get();

    snap.forEach((doc) => {
      const data = doc.data() || {};
      const modelId = data.modelId;
      const serviceId = data.serviceId;
      if (!modelId || !serviceId) return;

      if (Array.isArray(serviceIds) && serviceIds.length && !serviceIds.includes(serviceId)) {
        return;
      }

      if (!temp.has(modelId)) temp.set(modelId, new Map());
      temp
        .get(modelId)
        .set(
          serviceId,
          Object.prototype.hasOwnProperty.call(data, 'price') ? data.price : ''
        );
    });
  }

  for (const [modelId, byService] of temp.entries()) {
    pricingObj[modelId] = {
      items: (serviceIds || [])
        .filter((sid) => byService.has(sid))
        .map((sid) => ({ id: sid, price: byService.get(sid) })),
    };
  }

  return pricingObj;
}

export default async function IphoneCameraServicePage({
  locale = 'lv',
  searchParams,
}) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;

  const pricing = await buildPricingForBrandModels({
    brandSlug: 'apple',
    categorySlug: 'telefonu-remonts',
    serviceIds: SERVICE_IDS,
  });

  const strings = getPageStrings(locale);
  const sections = await getFaqSections(locale);

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
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        scrollCta={{ label: strings.headerCtaLabel, targetId: 'brand-list' }}
        crumbs={headerCrumbs}
      />

      <DeviceHero
        image="/images/categories/kameras_remonts.webp"
        alt={strings.heroAlt}
        focal="right"
        className="service"
        bodyHtml={strings.heroBodyHtml}
      />

      <section className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h2 id="intro-h2" className={s.h2}>
            {strings.introTitle}
          </h2>

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP1 }}
          />

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP2 }}
          />

          {selectedModel && (
            <p className={s.note}>
              {strings.selectedModelPrefix} <strong>{decodeURIComponent(selectedModel)}</strong>.{' '}
              {strings.selectedModelSuffix}{' '}
              <a href="#brand-list">{strings.selectedModelLink}</a>.
            </p>
          )}
        </div>
      </section>

      <section id="brand-list" className={s.section} aria-labelledby="brand-picker-h2">
        <div className={s.container}>
          <h2 id="brand-picker-h2" className={s.h2} style={{ marginBottom: 12 }}>
            {strings.modelPickerTitle}
          </h2>

          <ServicePricelist
            devices={devices}
            pricing={pricing}
            brandSlug="apple"
            categorySlug="telefonu-remonts"
            serviceIds={SERVICE_IDS}
            title={strings.priceTitle}
            intro={strings.priceIntro}
            initialLimit={8}
            allModelsHref={getAllModelsHref(locale)}
            cta={{ label: strings.ctaLabel, href: '#pieteikties' }}
            locale={locale}
          />
        </div>
      </section>

      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title={strings.processTitle}
            headingLevel={2}
            variant="cards"
            steps={strings.processSteps}
            locale={locale}
          />
        </div>
      </section>

      <section className={s.section}>
        <Why locale={locale} />
      </section>

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

      <section id="pieteikties" className={s.section} aria-label={strings.applyAria}>
        <div className={s.container}>
          <ConvertBand locale={locale} />
        </div>
      </section>
    </>
  );
}