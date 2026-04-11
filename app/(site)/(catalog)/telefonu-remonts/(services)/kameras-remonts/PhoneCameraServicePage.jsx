import Script from 'next/script';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import BrandPickerPricelist from '@components/service-pricelist/BrandPickerPricelist';

import {
  normalizeText,
  toFaqLd,
  toFaqRenderItems,
} from '@sections/faq/faq.helpers';

import categories from '@/data/categories';
import devices from '@/data/devices';

import { db } from '@/lib/firebaseAdmin';
import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';

import s from '@styles/Catalog.module.scss';

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      servicePath: '/ru/remont-telefonov/remont-kamery',
      categoryPath: '/ru/remont-telefonov',
      allModelsHref: '/ru/remont-telefonov#brand-list',

      pageTitle: 'Ремонт камеры телефона в Риге',
      pageDescription:
        'Размытые фото, проблемы с фокусировкой или не работает камера? Ремонт и замена камеры телефона в Риге. Бесплатная диагностика и гарантия 90 дней.',

      homeCrumb: 'Главная',
      categoryCrumb: 'Ремонт телефонов',
      pageCrumb: 'Ремонт камеры',

      headerTitle: 'Ремонт камеры телефона в Риге',
      headerLead:
        'Ремонтируем камеру телефона при размытых фото, проблемах с фокусировкой, повреждённом стекле камеры или ошибках камеры. До ремонта проводим диагностику и после ремонта выдаём гарантию 90 дней.',

      heroAlt: 'Ремонт камеры телефона в Риге',
      heroBodyHtml:
        '<p><strong>Ремонт камеры телефона в Риге</strong> — размытое изображение, повреждённое стекло или проблемы с фокусировкой? Выполняем диагностику и при необходимости <strong>замену модуля камеры или стекла</strong>. Бесплатная проверка и <strong>гарантия 90 дней</strong>.</p>',

      introTitle: 'Ремонт камеры телефона в Риге',
      introP1:
        'Симптомы, указывающие на <strong>повреждение камеры</strong>: <strong>размытое или зернистое изображение</strong>, <strong>неправильные цвета</strong>, <strong>полосы или пыль в кадре</strong>, <strong>нестабильный автофокус</strong>, чёрный экран в камере или ошибка приложения камеры. Если повреждено только <strong>стекло</strong>, часто достаточно замены стекла; если повреждён сам модуль, необходима <strong>замена камеры</strong>.',
      introP2:
        'После ремонта проверяем фокусировку, стабилизацию, качество фото и видео, а также работу приложения камеры. Популярные модели обычно ремонтируем за <strong>1–3 часа</strong>. На все работы и детали действует <strong>гарантия 90 дней</strong>.',
      selectedModelPrefix: 'Выбрана модель:',
      selectedModelSuffix: 'Прокрутите к',
      selectedModelLink: 'ценам',

      brandPickerTitle: 'Выберите бренд',
      pricelistTitle: 'Цены на ремонт камеры по модели',
      pricelistIntro:
        'Выберите бренд и модель, чтобы увидеть цену ремонта или замены камеры.',
      ctaLabel: 'Записаться на ремонт',

      processTitle: 'Как проходит ремонт камеры',
      processSteps: [
        {
          title: 'Диагностика',
          text: 'Проверяем модуль камеры, стекло, соединения и приложение камеры, чтобы точно определить неисправность.',
        },
        {
          title: 'Цена и срок',
          text: 'Согласовываем, менять ли стекло или весь модуль, а также стоимость и срок до начала ремонта.',
        },
        {
          title: 'Ремонт или замена',
          text: 'Выполняем замену модуля камеры или стекла, очищаем пыль и загрязнения, при необходимости восстанавливаем уплотнение.',
        },
        {
          title: 'Проверка',
          text: 'Тестируем фокус, резкость, стабилизацию, цвета и видеорежимы, чтобы камера снова работала корректно.',
        },
        {
          title: 'Гарантия',
          text: 'Выдаём устройство с гарантией 90 дней на деталь и работу, а также даём рекомендации по бережному использованию камеры.',
        },
      ],

      faqTitle: 'Часто задаваемые вопросы',
      serviceFaqGroupLabel: 'Ремонт камеры',
      basicFaqGroupLabel: 'Общие вопросы',
      serviceFaqDocId: 'service_kameras-remonts_ru',
      basicFaqDocId: 'basic_ru',

      serviceName: 'Ремонт камеры телефона в Риге',
      serviceType: 'Ремонт камеры телефона',
      serviceDescription:
        'Ремонт и замена камеры телефона в Риге: размытые фото, проблемы с фокусировкой, повреждённое стекло. Бесплатная диагностика и гарантия 90 дней.',

      processHowToName: 'Процесс ремонта камеры телефона в iLab',
      processHowToDescription:
        'Как шаг за шагом проходит ремонт и замена камеры телефона в сервисе iLab в Риге.',

      headerCtaLabel: 'Смотреть цены',
      applyAria: 'Записаться на ремонт',
    };
  }

  return {
    servicePath: '/telefonu-remonts/kameras-remonts',
    categoryPath: '/telefonu-remonts',
    allModelsHref: '/telefonu-remonts#brand-list',

    pageTitle: 'Telefonu kameras remonts Rīgā',
    pageDescription:
      'Miglaini attēli, fokusēšanās problēmas vai nedarbojas kamera? Telefonu kameras remonts un maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',

    homeCrumb: 'Sākums',
    categoryCrumb: 'Telefonu remonts',
    pageCrumb: 'Kameras remonts',

    headerTitle: 'Telefonu kameras remonts Rīgā',
    headerLead:
      'Remontējam telefonu kameru, ja attēli ir miglaini, ir fokusēšanās problēmas, bojāts kameras stikliņš vai kamera rāda kļūdu. Pirms remonta veicam diagnostiku un pēc remonta sniedzam 90 dienu garantiju.',

    heroAlt: 'Telefonu kameras remonts Rīgā',
    heroBodyHtml:
      '<p><strong>Telefonu kameras remonts Rīgā</strong> — miglains attēls, bojāts stikliņš vai fokusēšanās problēmas? Veicam diagnostiku un nepieciešamības gadījumā <strong>kameras moduļa vai stikliņa maiņu</strong>. Bezmaksas pārbaude un <strong>90 dienu garantija</strong>.</p>',

    introTitle: 'Telefonu kameras remonts Rīgā',
    introP1:
      'Simptomi, kas norāda uz <strong>kameras bojājumu</strong>: <strong>miglains vai graudains attēls</strong>, <strong>nepareizas krāsas</strong>, <strong>švīkas vai putekļi kadrā</strong>, <strong>autofokuss “sūc”</strong>, melns ekrāns kamerā vai kameras lietotne <strong>aizveras ar kļūdu</strong>. Ja bojāts ir tikai <strong>stikliņš</strong>, parasti pietiek ar stikliņa maiņu; ja bojāts ir pats kameras modulis, nepieciešama <strong>kameras nomaiņa</strong>.',
    introP2:
      'Pēc remonta pārbaudām fokusēšanos, stabilizāciju, foto un video kvalitāti, kā arī kameras lietotnes darbību. Populāros modeļus parasti salabojam <strong>1–3 stundu</strong> laikā. Visam veicamajam darbam un detaļām ir <strong>90 dienu garantija</strong>.',
    selectedModelPrefix: 'Atlasīts modelis:',
    selectedModelSuffix: 'Ritiniet uz',
    selectedModelLink: 'cenām',

    brandPickerTitle: 'Izvēlies zīmolu',
    pricelistTitle: 'Kameras remonta cenas pēc modeļa',
    pricelistIntro:
      'Izvēlies zīmolu un modeli, lai redzētu kameras remonta vai nomaiņas cenu.',
    ctaLabel: 'Pieteikties remontam',

    processTitle: 'Kā notiek kameras remonts',
    processSteps: [
      {
        title: 'Diagnostika',
        text: 'Pārbaudām kameras moduli, stikliņu, savienojumus un kameras lietotni, lai precīzi noteiktu bojājumu.',
      },
      {
        title: 'Cena un termiņš',
        text: 'Saskaņojam, vai mainīt stikliņu vai visu moduli, kā arī izmaksas un izpildes laiku pirms darba uzsākšanas.',
      },
      {
        title: 'Remonts vai maiņa',
        text: 'Veicam kameras moduļa vai stikliņa maiņu, attīrām putekļus un nosēdumus, nepieciešamības gadījumā atjaunojam blīvējumu.',
      },
      {
        title: 'Pārbaude',
        text: 'Testējam fokusu, attēla asumu, stabilizāciju, krāsas un video režīmus, lai pārliecinātos, ka kamera atkal strādā korekti.',
      },
      {
        title: 'Garantija',
        text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus kameras saudzīgai lietošanai.',
      },
    ],

    faqTitle: 'Biežāk uzdotie jautājumi',
    serviceFaqGroupLabel: 'Kameras remonts',
    basicFaqGroupLabel: 'Vispārīgi jautājumi',
    serviceFaqDocId: 'service_kameras-remonts_lv',
    basicFaqDocId: 'basic_lv',

    serviceName: 'Telefonu kameras remonts Rīgā',
    serviceType: 'Telefonu kameras remonts',
    serviceDescription:
      'Telefonu kameras remonts un maiņa Rīgā: miglaini attēli, fokusēšanās problēmas, bojāts stikliņš. Bezmaksas diagnostika un 90 dienu garantija.',

    processHowToName: 'Telefonu kameras remonta process iLab',
    processHowToDescription:
      'Kā soli pa solim notiek telefonu kameras remonts un maiņa iLab servisā Rīgā.',

    headerCtaLabel: 'Skatīt cenas',
    applyAria: 'Pieteikties remontam',
  };
}

export function getPhoneCameraServiceMetadata(locale = 'lv') {
  const strings = getPageStrings(locale);

  return {
    title: `${strings.pageTitle} | iLab`,
    description: strings.pageDescription,
    alternates: { canonical: strings.servicePath },
  };
}

function getPhoneBrandOptions() {
  const phonesCat = Array.isArray(categories)
    ? categories.find((c) => c.slug === 'telefonu-remonts')
    : null;

  const listed = phonesCat?.brands || [];
  const withDevices = listed.filter((b) =>
    devices.some(
      (d) =>
        (d.category || '').toLowerCase() === 'telefonu-remonts' &&
        (d.brandSlug || '').toLowerCase() ===
          String(b.brandSlug || b.slug).toLowerCase()
    )
  );

  const hasSamsung = withDevices.find(
    (b) => (b.brandSlug || b.slug) === 'samsung'
  );

  const defaultBrand = hasSamsung
    ? 'samsung'
    : withDevices[0]?.brandSlug || withDevices[0]?.slug || 'samsung';

  const brandOptions = withDevices.map((b) => ({
    slug: b.brandSlug || b.slug,
    name: b.name,
  }));

  return { brandOptions, defaultBrand };
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

function buildServiceLd(strings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}${strings.servicePath}#service`,
    serviceType: strings.serviceType,
    name: strings.serviceName,
    url: abs(strings.servicePath),
    description: strings.serviceDescription,
    areaServed: { '@type': 'City', name: 'Rīga' },
    provider: buildProvidersFromLocations(),
  };
}

function buildProcessHowToLd(strings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${ORIGIN}${strings.servicePath}#howto`,
    name: strings.processHowToName,
    description: strings.processHowToDescription,
    step: strings.processSteps.map((step, index) => ({
      '@type': 'HowToStep',
      name: `${index + 1}. ${step.title}`,
      text: step.text,
    })),
  };
}

export default async function PhoneCameraServicePage({
  locale = 'lv',
  searchParams,
}) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;
  const strings = getPageStrings(locale);
  const { brandOptions, defaultBrand } = getPhoneBrandOptions();
  const sections = await getFaqSections(locale);

  const mergedFaqItems = dedupeFaqItems(
    sections.flatMap((section) => section.items || [])
  );

  const faqLd = toFaqLd(mergedFaqItems);

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.categoryCrumb, url: abs(strings.categoryPath) },
    { name: strings.pageCrumb, url: abs(strings.servicePath) },
  ]);

  const serviceLd = buildServiceLd(strings);
  const processHowToLd = buildProcessHowToLd(strings);

  const headerCrumbs = [
    {
      label: strings.homeCrumb,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.categoryCrumb,
      href: strings.categoryPath,
    },
    {
      label: strings.pageCrumb,
      href: strings.servicePath,
    },
  ];

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqLd)}
      </Script>

      <Script
        id="breadcrumbs-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id="service-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>

      <Script
        id="process-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(processHowToLd)}
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

      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
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
              {strings.selectedModelPrefix}{' '}
              <strong>{decodeURIComponent(selectedModel)}</strong>. Ritiniet uz
              <a href="#brand-list"> {strings.selectedModelLink}</a>.
            </p>
          )}
        </div>
      </section>

      <section
        id="brand-list"
        className={s.section}
        aria-labelledby="brand-picker-h2"
      >
        <div className={s.container}>
          <h2
            id="brand-picker-h2"
            className={s.h2}
            style={{ marginBottom: 12 }}
          >
            {strings.brandPickerTitle}
          </h2>

          <BrandPickerPricelist
            devices={devices}
            pricingSource="firestore"
            brandOptions={brandOptions}
            defaultBrand={defaultBrand}
            categorySlug="telefonu-remonts"
            serviceIds={['camera', 'camera-glass']}
            title={strings.pricelistTitle}
            intro={strings.pricelistIntro}
            allModelsHref={strings.allModelsHref}
            cta={{ label: strings.ctaLabel, href: '#pieteikties' }}
            className={s.section}
            locale={locale}
          />
        </div>
      </section>

      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title={strings.processTitle}
            steps={strings.processSteps}
            headingLevel={2}
            variant="cards"
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

      <section
        id="pieteikties"
        className={s.section}
        aria-label={strings.applyAria}
      >
        <div className={s.container}>
          <ConvertBand locale={locale} />
        </div>
      </section>
    </>
  );
}