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
import devicePricing from '@/data/devicePricing';

import s from '@styles/Catalog.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
} from '@/lib/seo/jsonldHelpers';
import { db } from '@/lib/firebaseAdmin';

function getRoutePath(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone/remont-posle-popadaniya-vlagi'
    : '/iphone-remonts/udens-bojajumu-remonts';
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
      heroAlt: 'Повреждение iPhone после попадания влаги',
      heroBodyHtml:
        '<p><strong>iPhone упал в воду или перестал включаться после влаги?</strong> Выполняем <strong>диагностику и ремонт после попадания влаги</strong> в Риге - чистка, устранение окисления и замена поврежденных деталей. Чем быстрее принесёте, тем выше шанс восстановления. <strong>Гарантия 90 дней</strong>.</p>',
      introTitle: 'Повреждение iPhone водой - что делать?',
      introP1:
        'Если <strong>iPhone упал в воду</strong>, в море, бассейн или на него попала жидкость, важно действовать сразу. Вода вызывает <strong>окисление и коррозию</strong>, повреждает соединения и может привести к короткому замыканию. Правильные действия в первые минуты заметно повышают шанс полного восстановления устройства.',
      introP2: 'Наши специалисты чаще всего сталкиваются с ситуациями, когда телефон:',
      introList: [
        'после воды <strong>не включается</strong>;',
        '<strong>не заряжается</strong> или зарядка прерывается;',
        'становится <strong>горячим</strong> или быстро разряжается;',
        'пропадает звук, камера или сеть;',
        'на экране появляются <strong>пятна</strong> или полосы.',
      ],
      introP3:
        'Хорошая новость - если принести устройство в тот же день, <strong>более чем в 90% случаев</strong> его удаётся полностью восстановить.',
      selectedModelPrefix: 'Выбрана модель:',
      selectedModelSuffix: 'Прокрутите к',
      selectedModelLink: 'ценам',
      priceTitle: 'Цены на ремонт после попадания влаги по моделям',
      priceIntro:
        'Выберите модель iPhone, чтобы посмотреть стоимость ремонта после попадания влаги. Цена зависит от степени повреждения и необходимых деталей.',
      ctaLabel: 'Записаться на ремонт',
      processTitle: 'Как проходит ремонт после попадания влаги',
      processSteps: [
        { title: 'Диагностика', text: 'Открываем устройство и оцениваем степень окисления и коррозии.' },
        { title: 'Чистка и сушка', text: 'Ультразвуковая чистка, обработка контактов и восстановление соединений.' },
        { title: 'Замена поврежденных компонентов', text: 'При необходимости меняем батарею, разъём зарядки, камеры и другие детали.' },
        { title: 'Полная проверка', text: 'Тестируем звук, камеру, сеть, датчики и зарядку.' },
        { title: 'Гарантия', text: '90 дней гарантии на детали и выполненные работы.' },
      ],
      faqTitle: 'Часто задаваемые вопросы',
      serviceFaqGroupLabel: 'Ремонт после попадания влаги',
      basicFaqGroupLabel: 'Общие вопросы',
      breadcrumbServiceName: 'Ремонт после попадания влаги',
      serviceName: 'Ремонт iPhone после попадания влаги в Риге',
      serviceType: 'Ремонт iPhone после попадания влаги',
      serviceDescription:
        'Диагностика, чистка после попадания влаги, устранение окисления и замена поврежденных деталей iPhone с гарантией.',
      applyHref: '#pieteikties',
      homeCrumb: 'Главная',
      hubCrumb: 'Ремонт iPhone',
      headerTitle: 'Ремонт iPhone после попадания влаги в Риге',
      headerLead:
        'Если iPhone упал в воду или перестал нормально работать после влаги, принесите его на диагностику как можно быстрее. Выполняем чистку, устранение окисления и восстановление устройства с гарантией 90 дней.',
      headerCtaLabel: 'Смотреть цены',
      serviceFaqDocId: 'service_udens-bojajumu-remonts_ru',
      basicFaqDocId: 'basic_ru',
      applyAria: 'Записаться на ремонт',
    };
  }

  return {
    heroAlt: 'iPhone ūdens bojājumi',
    heroBodyHtml:
      '<p><strong>IPhone iekrita ūdenī vai pēc mitruma vairs neieslēdzas?</strong> Veicam <strong>ūdens bojājumu diagnostiku un remontu</strong> Rīgā - tīrīšana, oksidācijas novēršana un bojāto detaļu nomaiņa. Jo ātrāk atnesīsi, jo labākas izredzes. <strong>90 dienu garantija</strong>.</p>',
    introTitle: 'iPhone ūdens bojājumi - ko darīt?',
    introP1:
      'Ja <strong>iPhone iekrita ūdenī</strong>, jūrā, baseinā vai uz tā izlija šķidrums, svarīgi rīkoties nekavējoties. Ūdens izraisa <strong>oksidāciju un koroziju</strong>, bojā savienojumus un var radīt īssavienojumu. Pareiza rīcība pirmajās minūtēs ievērojami palielina iespēju ierīci pilnībā atjaunot.',
    introP2: 'Mūsu speciālisti visbiežāk saskaras ar situācijām, kad telefons:',
    introList: [
      'vairs <strong>neieslēdzas</strong> pēc ūdens;',
      '<strong>neuzlādējas</strong> vai uzlāde pārtrūkst;',
      'kļūst <strong>karsts</strong> vai strauji izlādējas;',
      'pazūd skaņa, kamera vai tīkls;',
      'ekrānā parādās <strong>plankumi</strong> vai līnijas.',
    ],
    introP3:
      'Labā ziņa - ja ierīci atnes tajā pašā dienā, <strong>vairāk nekā 90% gadījumu</strong> izdodas to pilnībā atjaunot.',
    selectedModelPrefix: 'Atlasīts modelis:',
    selectedModelSuffix: 'Ritiniet uz',
    selectedModelLink: 'cenām',
    priceTitle: 'Ūdens bojājumu remonta cenas pēc modeļa',
    priceIntro:
      'Izvēlies savu iPhone modeli, lai redzētu ūdens bojājumu remonta izmaksas. Izmaksas atkarīgas no bojājuma apmēra un nepieciešamajām detaļām.',
    ctaLabel: 'Pieteikties remontam',
    processTitle: 'Kā notiek ūdens bojājumu remonts',
    processSteps: [
      { title: 'Diagnostika', text: 'Atveram ierīci un novērtējam oksidācijas un korozijas apmēru.' },
      { title: 'Tīrīšana un žāvēšana', text: 'Ultraskaņas tīrīšana, kontakti, savienojumu atjaunošana.' },
      { title: 'Bojāto komponentu maiņa', text: 'Pēc vajadzības mainām bateriju, uzlādes portu, kameras u.c.' },
      { title: 'Pilna pārbaude', text: 'Testējam skaņu, kameru, tīklu, sensorus un uzlādi.' },
      { title: 'Garantija', text: '90 dienas gan detaļām, gan darbam.' },
    ],
    faqTitle: 'Biežāk uzdotie jautājumi',
    serviceFaqGroupLabel: 'Ūdens bojājumu remonts',
    basicFaqGroupLabel: 'Vispārīgi jautājumi',
    breadcrumbServiceName: 'Ūdens bojājumi',
    serviceName: 'iPhone ūdens bojājumi - diagnostika un remonts Rīgā',
    serviceType: 'iPhone ūdens bojājumi - diagnostika un remonts',
    serviceDescription:
      'iPhone ūdens bojājumu diagnostika, tīrīšana, oksidācijas novēršana un bojāto detaļu nomaiņa ar garantiju.',
    applyHref: '/pieraksties',
    homeCrumb: 'Sākums',
    hubCrumb: 'iPhone remonts',
    headerTitle: 'iPhone ūdens bojājumu diagnostika un remonts Rīgā',
    headerLead:
      'Ja iPhone iekritis ūdenī vai pēc mitruma vairs nedarbojas pareizi, atnes to uz diagnostiku pēc iespējas ātrāk. Veicam tīrīšanu, oksidācijas novēršanu un bojāto komponentu atjaunošanu ar 90 dienu garantiju.',
    headerCtaLabel: 'Skatīt cenas',
    serviceFaqDocId: 'service_udens-bojajumu-remonts_lv',
    basicFaqDocId: 'basic_lv',
    applyAria: 'Pieteikties remontam',
  };
}

export function getIphoneWaterDamageServiceMetadata(locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: 'Ремонт iPhone после попадания влаги в Риге | iLab',
      description:
        'iPhone упал в воду или не включается после влаги? Выполняем диагностику, чистку и устранение последствий попадания влаги. Быстрая помощь и гарантия 90 дней.',
      alternates: { canonical: getRoutePath(locale) },
    };
  }

  return {
    title: 'iPhone ūdens bojājumi - diagnostika un remonts Rīgā | iLab',
    description:
      'iPhone iekrita ūdenī vai pēc mitruma vairs neieslēdzas? Veicam ūdens bojājumu diagnostiku, tīrīšanu un oksidācijas novēršanu. Ātra palīdzība un 90 dienu garantija.',
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

export default async function IphoneWaterDamageServicePage({
  locale = 'lv',
  searchParams,
}) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;

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
        scrollCta={{ label: strings.headerCtaLabel, targetId: 'cenas' }}
        crumbs={headerCrumbs}
      />

      <DeviceHero
        image="/images/categories/udens_bojajumi.webp"
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

          <p className={s.paragraph}>{strings.introP2}</p>

          <ul className={s.list}>
            {strings.introList.map((item, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP3 }}
          />

          {selectedModel && (
            <p className={s.note}>
              {strings.selectedModelPrefix} <strong>{decodeURIComponent(selectedModel)}</strong>.{' '}
              {strings.selectedModelSuffix} <a href="#cenas">{strings.selectedModelLink}</a>.
            </p>
          )}
        </div>
      </section>

      <section id="cenas" className={s.section} aria-labelledby="prices-h2">
        <ServicePricelist
          devices={devices}
          pricing={devicePricing}
          brandSlug="apple"
          categorySlug="telefonu-remonts"
          serviceIds={['water-damage-clean']}
          title={strings.priceTitle}
          intro={strings.priceIntro}
          initialLimit={8}
          allModelsHref={getAllModelsHref(locale)}
          cta={{ label: strings.ctaLabel, href: strings.applyHref }}
          className={s.section}
          locale={locale}
        />
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