import Script from 'next/script';
import Link from 'next/link';

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
      servicePath: '/ru/remont-telefonov/zamena-batarei',
      categoryPath: '/ru/remont-telefonov',
      allModelsHref: '/ru/remont-telefonov#brand-list',

      pageTitle: 'Замена батареи телефона в Риге',
      pageDescription:
        'Быстрая и качественная замена батареи телефона в Риге. Бесплатная диагностика, гарантия 90 дней, оригинальные или OEM батареи. Часто в тот же день.',

      homeCrumb: 'Главная',
      categoryCrumb: 'Ремонт телефонов',
      pageCrumb: 'Замена батареи',

      headerTitle: 'Замена батареи телефона в Риге',
      headerLead:
        'Меняем батарею телефона, если устройство быстро разряжается, выключается при 10–20%, нагревается или нестабильно держит заряд. До ремонта проводим диагностику и после замены выдаём гарантию 90 дней.',

      heroAlt: 'Замена батареи телефона в Риге',
      heroBodyHtml:
        '<p><strong>Быстрая и безопасная замена батареи телефона в Риге</strong> — если устройство быстро разряжается, выключается при 20% или заряжается слишком медленно, поможем. Бесплатная диагностика и <strong>гарантия 90 дней</strong> на каждый ремонт в iLab.</p>',

      introTitle: 'Замена батареи телефона в Риге',
      introP1:
        'Если телефон <strong>быстро теряет заряд</strong>, <strong>выключается при 10–20%</strong>, <strong>нагревается</strong> или <strong>заряжается слишком медленно</strong>, скорее всего требуется <strong>замена батареи телефона</strong>. Мастера iLab выполняют быструю и качественную замену, используя <strong>оригинальные или качественные OEM батареи</strong>. Перед началом работ проводим <strong>бесплатную диагностику</strong>, чтобы убедиться, что проблема действительно в батарее, а не, например, в разъёме зарядки или программной части.',
      introP2:
        'После замены выполняем <strong>калибровку батареи</strong> и тесты — стабильность зарядки/разрядки, температуру и программные показатели. Популярные модели обычно ремонтируем за <strong>45–90 минут</strong>. На детали и работу действует <strong>гарантия 90 дней</strong>.',
      selectedModelPrefix: 'Выбрана модель:',
      selectedModelSuffix: 'Прокрутите к',
      selectedModelLink: 'ценам',

      brandPickerTitle: 'Выберите бренд',
      pricelistTitle: 'Цены на замену батареи по модели',
      pricelistIntro:
        'Выберите бренд и модель, чтобы увидеть цену замены батареи. Большинство ремонтов выполняем в тот же день.',
      ctaLabel: 'Записаться на ремонт',

      processTitle: 'Как проходит замена батареи',
      processSteps: [
        {
          title: 'Диагностика',
          text: 'Проверяем износ батареи, цепь зарядки, разъём и возможные фоновые причины быстрого разряда.',
        },
        {
          title: 'Цена и срок',
          text: 'Согласовываем тип батареи, стоимость и срок выполнения до начала ремонта.',
        },
        {
          title: 'Замена батареи',
          text: 'Безопасно снимаем старую батарею и устанавливаем новую, при необходимости меняем уплотнение.',
        },
        {
          title: 'Калибровка и тесты',
          text: 'Проводим калибровку и проверяем стабильность зарядки, температуру и общее состояние устройства.',
        },
        {
          title: 'Гарантия',
          text: 'Выдаём устройство с гарантией 90 дней на деталь и работу, а также даём рекомендации по бережному использованию батареи.',
        },
      ],

      faqTitle: 'Часто задаваемые вопросы',
      serviceFaqGroupLabel: 'Замена батареи',
      basicFaqGroupLabel: 'Общие вопросы',
      serviceFaqDocId: 'service_baterijas-maina_ru',
      basicFaqDocId: 'basic_ru',

      serviceName: 'Замена батареи телефона в Риге',
      serviceType: 'Замена батареи телефона',
      serviceDescription:
        'Замена батареи телефона в Риге: бесплатная диагностика, оригинальные или OEM батареи, гарантия 90 дней. Часто в тот же день.',

      processHowToName: 'Процесс замены батареи телефона в iLab',
      processHowToDescription:
        'Как шаг за шагом проходит замена батареи телефона в сервисе iLab в Риге.',

      headerCtaLabel: 'Смотреть цены',
      applyAria: 'Записаться на ремонт',
    };
  }

  return {
    servicePath: '/telefonu-remonts/baterijas-maina',
    categoryPath: '/telefonu-remonts',
    allModelsHref: '/telefonu-remonts#brand-list',

    pageTitle: 'Telefonu baterijas maiņa Rīgā',
    pageDescription:
      'Ātra un kvalitatīva telefonu baterijas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM baterijas. Bieži tajā pašā dienā.',

    homeCrumb: 'Sākums',
    categoryCrumb: 'Telefonu remonts',
    pageCrumb: 'Baterijas maiņa',

    headerTitle: 'Telefonu baterijas maiņa Rīgā',
    headerLead:
      'Mainām telefonu bateriju, ja ierīce ātri izlādējas, izslēdzas pie 10–20%, uzkarst vai nestabili tur uzlādi. Pirms remonta veicam diagnostiku un pēc nomaiņas sniedzam 90 dienu garantiju.',

    heroAlt: 'Telefonu baterijas maiņa Rīgā',
    heroBodyHtml:
      '<p><strong>Ātra un droša telefonu baterijas maiņa Rīgā</strong> — ja tālrunis ātri izlādējas, izslēdzas pie 20% vai lādējas ļoti lēni, palīdzēsim. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam iLab servisā.</p>',

    introTitle: 'Telefonu baterijas maiņa Rīgā',
    introP1:
      'Ja tālrunis <strong>ātri zaudē uzlādi</strong>, <strong>izslēdzas pie 10–20%</strong>, <strong>uzkarst</strong> vai <strong>lādējas ļoti lēni</strong>, visticamāk nepieciešama <strong>telefonu baterijas (akumulatora) maiņa</strong>. iLab meistari veic ātru un kvalitatīvu nomaiņu, izmantojot <strong>oriģinālas vai augstas kvalitātes OEM baterijas</strong>. Pirms darba uzsākšanas veicam <strong>bezmaksas diagnostiku</strong>, lai pārliecinātos, ka problēma tiešām ir baterijā, nevis, piemēram, uzlādes ligzdā vai programmatūrā.',
    introP2:
      'Pēc nomaiņas veicam <strong>baterijas kalibrāciju</strong> un pārbaudes — uzlādes/izlādes stabilitāti, temperatūras kontroli un programmatūras rādītājus. Populāros modeļus parasti salabojam <strong>45–90 minūtēs</strong>. Visam darbam un detaļām ir <strong>90 dienu garantija</strong>.',
    selectedModelPrefix: 'Atlasīts modelis:',
    selectedModelSuffix: 'Ritiniet uz',
    selectedModelLink: 'cenām',

    brandPickerTitle: 'Izvēlies zīmolu',
    pricelistTitle: 'Baterijas maiņas cenas pēc modeļa',
    pricelistIntro:
      'Izvēlies zīmolu un modeli, lai redzētu baterijas maiņas cenu. Lielāko daļu remontu paveicam tajā pašā dienā.',
    ctaLabel: 'Pieteikties remontam',

    processTitle: 'Kā notiek baterijas maiņa',
    processSteps: [
      {
        title: 'Diagnostika',
        text: 'Pārbaudām baterijas nolietojumu, uzlādes ķēdi un portu, kā arī iespējamos fona patēriņus.',
      },
      {
        title: 'Cena un termiņš',
        text: 'Saskaņojam baterijas tipu, izmaksas un izpildes laiku pirms darba uzsākšanas.',
      },
      {
        title: 'Baterijas nomaiņa',
        text: 'Droši izņemam veco bateriju un uzstādam jaunu, ievērojot remonta drošības prasības un nepieciešamības gadījumā nomainot blīvējumu.',
      },
      {
        title: 'Kalibrācija un testi',
        text: 'Veicam baterijas kalibrāciju, pārbaudām uzlādes/izlādes stabilitāti, temperatūru un ierīces kopējo darbību.',
      },
      {
        title: 'Garantija',
        text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, kā arī sniedzam ieteikumus baterijas saudzīgai lietošanai.',
      },
    ],

    faqTitle: 'Biežāk uzdotie jautājumi',
    serviceFaqGroupLabel: 'Baterijas maiņa',
    basicFaqGroupLabel: 'Vispārīgi jautājumi',
    serviceFaqDocId: 'service_baterijas-maina_lv',
    basicFaqDocId: 'basic_lv',

    serviceName: 'Telefonu baterijas maiņa Rīgā',
    serviceType: 'Telefonu baterijas maiņa',
    serviceDescription:
      'Telefonu baterijas maiņa Rīgā: bezmaksas diagnostika, oriģinālas vai OEM baterijas, 90 dienu garantija. Bieži tajā pašā dienā.',

    processHowToName: 'Telefonu baterijas maiņas process iLab',
    processHowToDescription:
      'Kā soli pa solim notiek telefonu baterijas maiņa iLab servisā Rīgā.',

    headerCtaLabel: 'Skatīt cenas',
    applyAria: 'Pieteikties remontam',
  };
}

export function getPhoneBatteryServiceMetadata(locale = 'lv') {
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

export default async function PhoneBatteryServicePage({
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
        image="/images/categories/baterijas_maina.webp"
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
            serviceIds={['battery']}
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
     
          <ConvertBand locale={locale} />
       
      </section>
    </>
  );
}