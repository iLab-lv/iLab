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
      servicePath: '/ru/remont-telefonov/zamena-razema-zaryadki',
      categoryPath: '/ru/remont-telefonov',
      allModelsHref: '/ru/remont-telefonov#brand-list',

      pageTitle: 'Замена разъёма зарядки телефона в Риге',
      pageDescription:
        'Не заряжается, нужно шевелить кабель или порт болтается? Чистка и замена разъёма зарядки телефона в Риге. Бесплатная диагностика и гарантия 90 дней.',

      homeCrumb: 'Главная',
      categoryCrumb: 'Ремонт телефонов',
      pageCrumb: 'Замена разъёма зарядки',

      headerTitle: 'Замена разъёма зарядки телефона в Риге',
      headerLead:
        'Ремонтируем и меняем разъём зарядки телефона, если зарядка прерывается, кабель нужно шевелить или порт не реагирует. До ремонта проводим диагностику и после ремонта выдаём гарантию 90 дней.',

      heroAlt: 'Замена разъёма зарядки телефона в Риге',
      heroBodyHtml:
        '<p><strong>Не заряжается или нужно шевелить кабель?</strong> Выполняем <strong>чистку разъёма зарядки</strong> и при необходимости <strong>замену разъёма</strong>. Бесплатная диагностика и <strong>гарантия 90 дней</strong>.</p>',

      introTitle: 'Замена разъёма зарядки телефона в Риге',
      introP1:
        'Типичные симптомы: <strong>зарядка прерывается</strong>, <strong>нужно шевелить кабель</strong>, <strong>кабель не входит до конца</strong>, <strong>порт болтается</strong> или <strong>совсем не реагирует</strong>. Во многих случаях достаточно <strong>профессиональной чистки</strong>, но если контакты повреждены или окислились, выполняем <strong>замену разъёма зарядки</strong>. Если во время диагностики обнаруживается проблема в цепи питания, может потребоваться ремонт <strong>charging IC</strong>.',
      introP2: '',
      selectedModelPrefix: 'Выбрана модель:',
      selectedModelSuffix: 'Прокрутите к',
      selectedModelLink: 'ценам',

      brandPickerTitle: 'Выберите бренд',
      pricelistTitle: 'Цены на ремонт разъёма зарядки по модели',
      pricelistIntro:
        'Выберите бренд и модель, чтобы увидеть цену чистки или замены разъёма зарядки. В некоторых случаях также требуется ремонт цепи питания.',
      ctaLabel: 'Записаться на ремонт',

      processTitle: 'Как проходит ремонт разъёма зарядки',
      processSteps: [
        {
          title: 'Диагностика',
          text: 'Проверяем разъём зарядки, кабель, цепь питания и состояние батареи, чтобы определить причину неисправности.',
        },
        {
          title: 'Чистка и обработка',
          text: 'Удаляем пыль и ворс, очищаем контакты и обрабатываем лёгкое окисление.',
        },
        {
          title: 'Замена разъёма',
          text: 'Если контакты порта серьёзно повреждены, меняем разъём зарядки на качественную деталь с соблюдением требований ремонта.',
        },
        {
          title: 'Тесты',
          text: 'Проверяем скорость и стабильность зарядки, передачу данных, фиксацию кабеля и поведение устройства под разными углами.',
        },
        {
          title: 'Гарантия',
          text: 'Выдаём устройство с гарантией 90 дней на деталь и работу, а также даём рекомендации по безопасному использованию зарядных устройств и кабелей.',
        },
      ],

      faqTitle: 'Часто задаваемые вопросы',
      serviceFaqGroupLabel: 'Зарядка',
      basicFaqGroupLabel: 'Общие вопросы',
      serviceFaqDocId: 'service_uzlades-ligzdas-maina_ru',
      basicFaqDocId: 'basic_ru',

      serviceName: 'Замена разъёма зарядки телефона в Риге',
      serviceType: 'Замена разъёма зарядки телефона',
      serviceDescription:
        'Чистка и замена разъёма зарядки телефона в Риге: если зарядка прерывается, нужно шевелить кабель или порт не реагирует. Бесплатная диагностика и гарантия 90 дней.',

      processHowToName: 'Процесс ремонта разъёма зарядки телефона в iLab',
      processHowToDescription:
        'Как шаг за шагом проходит чистка, замена разъёма зарядки и диагностика цепи питания телефона в сервисе iLab в Риге.',

      headerCtaLabel: 'Смотреть цены',
      applyAria: 'Записаться на ремонт',
    };
  }

  return {
    servicePath: '/telefonu-remonts/uzlades-ligzdas-maina',
    categoryPath: '/telefonu-remonts',
    allModelsHref: '/telefonu-remonts#brand-list',

    pageTitle: 'Telefonu uzlādes ligzdas maiņa Rīgā',
    pageDescription:
      'Neuzlādējas, jākustina vads vai ports vaļīgs? Telefonu uzlādes ligzdas tīrīšana un maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',

    homeCrumb: 'Sākums',
    categoryCrumb: 'Telefonu remonts',
    pageCrumb: 'Uzlādes ligzdas maiņa',

    headerTitle: 'Telefonu uzlādes ligzdas maiņa Rīgā',
    headerLead:
      'Remontējam un mainām telefonu uzlādes ligzdu, ja uzlāde pārtrūkst, jākustina vads vai ports nereaģē. Pirms remonta veicam diagnostiku un pēc remonta sniedzam 90 dienu garantiju.',

    heroAlt: 'Telefonu uzlādes ligzdas maiņa Rīgā',
    heroBodyHtml:
      '<p><strong>Neuzlādējas vai jākustina vads?</strong> Veicam uzlādes porta <strong>tīrīšanu</strong> un, ja nepieciešams, <strong>uzlādes ligzdas nomaiņu</strong>. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>',

    introTitle: 'Telefonu uzlādes ligzdas maiņa Rīgā',
    introP1:
      'Tipiski simptomi: <strong>uzlāde pārtrūkst</strong>, <strong>jākustina vads</strong>, <strong>kabelis neiet līdz galam</strong>, <strong>ports ir vaļīgs</strong> vai <strong>nereaģē vispār</strong>. Bieži pietiek ar <strong>profesionālu tīrīšanu</strong>, taču, ja kontakti ir bojāti vai oksidēti, veicam <strong>uzlādes ligzdas nomaiņu</strong>. Ja diagnostikā atklājas problēma barošanas ķēdē, nepieciešams <strong>charging IC</strong> remonts.',
    introP2: '',
    selectedModelPrefix: 'Atlasīts modelis:',
    selectedModelSuffix: 'Ritiniet uz',
    selectedModelLink: 'cenām',

    brandPickerTitle: 'Izvēlies zīmolu',
    pricelistTitle: 'Uzlādes ligzdas remonta cenas pēc modeļa',
    pricelistIntro:
      'Izvēlies zīmolu un modeli, lai redzētu uzlādes ligzdas tīrīšanas vai nomaiņas cenu. Dažos gadījumos nepieciešams arī barošanas ķēdes remonts.',
    ctaLabel: 'Pieteikties remontam',

    processTitle: 'Kā notiek uzlādes ligzdas remonts',
    processSteps: [
      {
        title: 'Diagnostika',
        text: 'Pārbaudām uzlādes portu, kabeli, uzlādes ķēdi un baterijas stāvokli, lai noteiktu bojājuma cēloni.',
      },
      {
        title: 'Tīrīšana un apstrāde',
        text: 'Noņemam putekļus un tekstila šķiedras, attīrām kontaktus un apstrādājam vieglu oksidāciju.',
      },
      {
        title: 'Uzlādes ligzdas maiņa',
        text: 'Ja porta kontakti ir nopietni bojāti, nomainām uzlādes ligzdu pret kvalitatīvu detaļu, ievērojot ražotāja rekomendācijas.',
      },
      {
        title: 'Testi',
        text: 'Pārbaudām uzlādes ātrumu, stabilitāti, datu pārraidi, kabeļa fiksāciju un uzvedību dažādos leņķos.',
      },
      {
        title: 'Garantija',
        text: 'Izsniedzam telefonu ar 90 dienu garantiju uz detaļu un darbu, sniedzam ieteikumus par lādētāju un kabeļu drošu lietošanu.',
      },
    ],

    faqTitle: 'Biežāk uzdotie jautājumi',
    serviceFaqGroupLabel: 'Uzlāde',
    basicFaqGroupLabel: 'Vispārīgi jautājumi',
    serviceFaqDocId: 'service_uzlades-ligzdas-maina_lv',
    basicFaqDocId: 'basic_lv',

    serviceName: 'Telefonu uzlādes ligzdas maiņa Rīgā',
    serviceType: 'Telefonu uzlādes ligzdas maiņa',
    serviceDescription:
      'Telefonu uzlādes ligzdas tīrīšana un nomaiņa Rīgā: ja uzlāde pārtrūkst, jākustina vads vai ports nereaģē. Bezmaksas diagnostika un 90 dienu garantija.',

    processHowToName: 'Telefonu uzlādes ligzdas remonta process iLab',
    processHowToDescription:
      'Kā soli pa solim notiek telefonu uzlādes ligzdas tīrīšana, maiņa un uzlādes ķēdes diagnostika iLab servisā Rīgā.',

    headerCtaLabel: 'Skatīt cenas',
    applyAria: 'Pieteikties remontam',
  };
}

export function getPhoneChargePortServiceMetadata(locale = 'lv') {
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

export default async function PhoneChargePortServicePage({
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
        image="/images/categories/uzlades_ligzda_remonts.webp"
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
            serviceIds={['charge-port', 'charging-ic']}
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