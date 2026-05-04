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
      servicePath: '/ru/remont-telefonov/zamena-ekrana',
      categoryPath: '/ru/remont-telefonov',
      allModelsHref: '/ru/remont-telefonov#brand-list',

      pageTitle: 'Замена экрана телефона в Риге',
      pageDescription:
        'Быстрая и качественная замена экрана телефона в Риге. Бесплатная диагностика, гарантия 90 дней, оригинальные или OEM дисплеи. Часто в тот же день.',

      homeCrumb: 'Главная',
      categoryCrumb: 'Ремонт телефонов',
      pageCrumb: 'Замена экрана',

      headerTitle: 'Замена экрана телефона в Риге',
      headerLead:
        'Меняем экран телефона при трещинах, пятнах, полосах и проблемах с сенсором. До ремонта проводим диагностику и после замены выдаём гарантию 90 дней.',

      heroAlt: 'Замена экрана телефона в Риге',
      heroBodyHtml:
        '<p><strong>Быстрая и качественная замена экрана телефона в Риге</strong> - трещины, пятна и проблемы с сенсором устраняем часто в тот же день. Бесплатная диагностика и <strong>гарантия 90 дней</strong> на каждый ремонт в iLab.</p>',

      introTitle: 'Замена экрана телефона в Риге',
      introP1:
        'Если экран разбит, появились пятна, линии или не работает сенсор, скорее всего требуется <strong>замена экрана телефона</strong>. Мастера iLab в Риге выполняют быструю и безопасную замену, используя <strong>оригинальные или качественные OEM дисплеи</strong>. Перед началом работ проводим <strong>бесплатную диагностику</strong>, чтобы убедиться, что проблема действительно в дисплее, а не в программной части или других компонентах.',
      introP2:
        'После замены тщательно проверяем чувствительность сенсора, цветопередачу, яркость и общее качество изображения. Популярные модели обычно ремонтируем за <strong>1–3 часа</strong>. На работу и детали действует <strong>гарантия 90 дней</strong>.',
      selectedModelPrefix: 'Выбрана модель:',
      selectedModelSuffix: 'Прокрутите к',
      selectedModelLink: 'ценам',

      brandPickerTitle: 'Выберите бренд',
      pricelistTitle: 'Цены на замену экрана по модели',
      pricelistIntro:
        'Выберите бренд и модель, чтобы увидеть цену замены экрана. Большинство ремонтов выполняем в тот же день.',
      ctaLabel: 'Записаться на ремонт',

      processTitle: 'Как проходит замена экрана',
      processSteps: [
        {
          title: 'Диагностика',
          text: 'Быстро проверяем устройство и подтверждаем повреждение экрана: трещины, пятна, линии и проблемы с сенсором.',
        },
        {
          title: 'Цена и срок',
          text: 'Согласовываем тип дисплея, стоимость и срок выполнения до начала ремонта.',
        },
        {
          title: 'Замена экрана',
          text: 'Сертифицированные мастера безопасно снимают повреждённый экран и устанавливают новый, при необходимости восстанавливают уплотнение.',
        },
        {
          title: 'Проверка',
          text: 'Проверяем сенсор, цвета, яркость и общее качество изображения, чтобы убедиться, что всё работает корректно.',
        },
        {
          title: 'Гарантия',
          text: 'Выдаём устройство с гарантией 90 дней на деталь и работу, а также даём рекомендации по бережному использованию экрана.',
        },
      ],

      faqTitle: 'Часто задаваемые вопросы',
      serviceFaqGroupLabel: 'Замена экрана',
      basicFaqGroupLabel: 'Общие вопросы',
      serviceFaqDocId: 'service_ekrana-maina_ru',
      basicFaqDocId: 'basic_ru',

      serviceName: 'Замена экрана телефона в Риге',
      serviceType: 'Замена экрана телефона',
      serviceDescription:
        'Замена экрана телефона в Риге: бесплатная диагностика, оригинальные или OEM дисплеи, гарантия 90 дней. Часто в тот же день.',

      processHowToName: 'Процесс замены экрана телефона в iLab',
      processHowToDescription:
        'Как шаг за шагом проходит замена экрана телефона в сервисе iLab в Риге.',

      headerCtaLabel: 'Смотреть цены',
      applyAria: 'Записаться на ремонт',
    };
  }

  return {
    servicePath: '/telefonu-remonts/ekrana-maina',
    categoryPath: '/telefonu-remonts',
    allModelsHref: '/telefonu-remonts#brand-list',

    pageTitle: 'Telefonu ekrāna maiņa Rīgā',
    pageDescription:
      'Ātra un kvalitatīva telefonu ekrāna maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģināli vai OEM displeji. Bieži tajā pašā dienā.',

    homeCrumb: 'Sākums',
    categoryCrumb: 'Telefonu remonts',
    pageCrumb: 'Ekrāna maiņa',

    headerTitle: 'Telefonu ekrāna maiņa Rīgā',
    headerLead:
      'Mainām telefonu ekrānu, ja tas ir saplaisājis, rāda plankumus, līnijas vai nereaģē uz pieskārienu. Pirms remonta veicam diagnostiku un pēc nomaiņas sniedzam 90 dienu garantiju.',

    heroAlt: 'Telefonu ekrāna maiņa Rīgā',
    heroBodyHtml:
      '<p><strong>Ātra un kvalitatīva telefonu ekrāna maiņa Rīgā</strong> - plaisas, plankumi vai skāriena problēmas novēršam bieži tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam iLab servisā.</p>',

    introTitle: 'Telefonu ekrāna maiņa Rīgā',
    introP1:
      'Ja ekrāns ir saplīsis, parādās plankumi, līnijas vai nereaģē skāriens, visticamāk nepieciešama <strong>telefonu ekrāna (displeja) maiņa</strong>. iLab meistari Rīgā veic ātru un drošu nomaiņu, izmantojot <strong>oriģinālus vai augstas kvalitātes OEM displejus</strong>. Pirms darba uzsākšanas veicam <strong>bezmaksas diagnostiku</strong>, lai pārliecinātos, ka bojājums ir tieši displejā, nevis, piemēram, programmatūrā vai citās komponentēs.',
    introP2:
      'Pēc nomaiņas rūpīgi pārbaudām skārienjutību, krāsu atbilstību, spilgtumu un kopējo attēla kvalitāti. Populāros modeļus parasti salabojam <strong>1–3 stundu laikā</strong>. Visam veicamajam darbam un detaļām ir <strong>90 dienu garantija</strong>.',
    selectedModelPrefix: 'Atlasīts modelis:',
    selectedModelSuffix: 'Ritiniet uz',
    selectedModelLink: 'cenām',

    brandPickerTitle: 'Izvēlies zīmolu',
    pricelistTitle: 'Ekrāna maiņas cenas pēc modeļa',
    pricelistIntro:
      'Izvēlies zīmolu un modeli, lai redzētu ekrāna maiņas cenu. Lielāko daļu remontu paveicam tajā pašā dienā.',
    ctaLabel: 'Pieteikties remontam',

    processTitle: 'Kā notiek ekrāna maiņa',
    processSteps: [
      {
        title: 'Diagnostika',
        text: 'Ātri pārbaudām ierīci un apstiprinām ekrāna bojājumu: plaisas, plankumus, līnijas un skāriena problēmas.',
      },
      {
        title: 'Cena un termiņš',
        text: 'Saskaņojam displeja veidu, izmaksas un izpildes laiku pirms darba uzsākšanas.',
      },
      {
        title: 'Ekrāna nomaiņa',
        text: 'Sertificēti meistari droši noņem bojāto ekrānu un uzstāda jaunu, ievērojot remonta prasības un vajadzības gadījumā atjaunojot blīvējumu.',
      },
      {
        title: 'Pārbaude',
        text: 'Pārbaudām skārienjutību, krāsas, spilgtumu un kopējo attēla kvalitāti, lai pārliecinātos, ka viss darbojas korekti.',
      },
      {
        title: 'Garantija',
        text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus ekrāna saudzīgai lietošanai.',
      },
    ],

    faqTitle: 'Biežāk uzdotie jautājumi',
    serviceFaqGroupLabel: 'Ekrāna maiņa',
    basicFaqGroupLabel: 'Vispārīgi jautājumi',
    serviceFaqDocId: 'service_ekrana-maina_lv',
    basicFaqDocId: 'basic_lv',

    serviceName: 'Telefonu ekrāna maiņa Rīgā',
    serviceType: 'Telefonu ekrāna maiņa',
    serviceDescription:
      'Telefonu ekrāna maiņa Rīgā: bezmaksas diagnostika, oriģināli vai OEM displeji, 90 dienu garantija. Bieži tajā pašā dienā.',

    processHowToName: 'Telefonu ekrāna maiņas process iLab',
    processHowToDescription:
      'Kā soli pa solim notiek telefonu ekrāna maiņa iLab servisā Rīgā.',

    headerCtaLabel: 'Skatīt cenas',
    applyAria: 'Pieteikties remontam',
  };
}

export function getPhoneScreenServiceMetadata(locale = 'lv') {
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

export default async function PhoneScreenServicePage({
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
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      <Script id="process-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(processHowToLd)}
      </Script>

      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        scrollCta={{ label: strings.headerCtaLabel, targetId: 'brand-list' }}
        crumbs={headerCrumbs}
      />

      <DeviceHero
        image="/images/categories/displeja_maina.webp"
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
              <strong>{decodeURIComponent(selectedModel)}</strong>.{' '}
              {strings.selectedModelSuffix}{' '}
              <a href="#brand-list">{strings.selectedModelLink}</a>.
            </p>
          )}
        </div>
      </section>

      <section id="brand-list" className={s.section} aria-labelledby="brand-picker-h2">
        <div className={s.container}>
          <h2 id="brand-picker-h2" className={s.h2} style={{ marginBottom: 12 }}>
            {strings.brandPickerTitle}
          </h2>

          <BrandPickerPricelist
            devices={devices}
            pricingSource="firestore"
            brandOptions={brandOptions}
            defaultBrand={defaultBrand}
            categorySlug="telefonu-remonts"
            serviceIds={['display-original', 'display-oled', 'display-incell']}
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