import Script from 'next/script';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';

import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';

import s from '@styles/Catalog.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildFaqLdFromPairs,
} from '@/lib/seo/jsonldHelpers';

const FAQ_ITEMS = [
  {
    q: 'Ko darīt, ja iPhone iekrita ūdenī?',
    a: 'Nekavējoties izslēdziet telefonu, neuzlādējiet un atnesiet uz diagnostiku. Jo ātrāk ierīce nonāk servisā, jo lielākas iespējas to atjaunot.',
  },
  {
    q: 'Vai palīdz ielikt telefonu rīsos?',
    a: 'Nē. Rīsi neaptur oksidāciju un var radīt vēl lielāku bojājumu. Labākais risinājums ir profesionāla tīrīšana un žāvēšana.',
  },
  {
    q: 'Kādi simptomi norāda uz ūdens bojājumiem?',
    a: 'Neslēdzas, neuzlādējas, pārkarst, darbojas tikai daļēji, kamera vai skaņa nestrādā, ekrānā ir plankumi, parādās “No Service”.',
  },
  {
    q: 'Vai ūdens bojājumi vienmēr ir salabojami?',
    a: 'Atkarīgs no oksidācijas apmēra. Vairāk nekā 90% gadījumu, ja ierīce atvesta tajā pašā dienā, to izdodas atjaunot.',
  },
  {
    q: 'Cik ilgi ilgst ūdens bojājumu remonts?',
    a: 'Sākotnējā tīrīšana 1–2 stundas. Sarežģītos gadījumos nepieciešams ilgāks process vai komponentu maiņa.',
  },
];

function getRoutePath(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone/remont-posle-popadaniya-vlagi'
    : '/iphone-remonts/udens-bojajumu-remonts';
}

function getHubPath(locale = 'lv') {
  return locale === 'ru' ? '/ru/remont-iphone' : '/iphone-remonts';
}

function getAllModelsHref(locale = 'lv') {
  return locale === 'ru' ? '/ru/remont-iphone#iphone-modeli' : '/iphone-remonts#iphone-modeli';
}

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'Повреждение iPhone после попадания влаги',
      heroBodyHtml:
        '<p><strong>iPhone упал в воду или перестал включаться после влаги?</strong> Выполняем <strong>диагностику и ремонт после попадания влаги</strong> в Риге — чистка, устранение окисления и замена поврежденных деталей. Чем быстрее принесёте, тем выше шанс восстановления. <strong>Гарантия 90 дней</strong>.</p>',
      introTitle: 'Повреждение iPhone водой — что делать?',
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
        'Хорошая новость — если принести устройство в тот же день, <strong>более чем в 90% случаев</strong> его удаётся полностью восстановить.',
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
      faqGroupLabel: 'Повреждение влагой',
      breadcrumbServiceName: 'Ремонт после попадания влаги',
      serviceName: 'Ремонт iPhone после попадания влаги в Риге',
      serviceType: 'Ремонт iPhone после попадания влаги',
      serviceDescription:
        'Диагностика, чистка после попадания влаги, устранение окисления и замена поврежденных деталей iPhone с гарантией.',
      applyHref: '#pieteikties',
    };
  }

  return {
    heroAlt: 'iPhone ūdens bojājumi',
    heroBodyHtml:
      '<p><strong>IPhone iekrita ūdenī vai pēc mitruma vairs neieslēdzas?</strong> Veicam <strong>ūdens bojājumu diagnostiku un remontu</strong> Rīgā — tīrīšana, oksidācijas novēršana un bojāto detaļu nomaiņa. Jo ātrāk atnesīsi, jo labākas izredzes. <strong>90 dienu garantija</strong>.</p>',
    introTitle: 'iPhone ūdens bojājumi — ko darīt?',
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
      'Labā ziņa — ja ierīci atnes tajā pašā dienā, <strong>vairāk nekā 90% gadījumu</strong> izdodas to pilnībā atjaunot.',
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
    faqGroupLabel: 'Ūdens bojājumi',
    breadcrumbServiceName: 'Ūdens bojājumi',
    serviceName: 'iPhone ūdens bojājumi — diagnostika un remonts Rīgā',
    serviceType: 'iPhone ūdens bojājumi — diagnostika un remonts',
    serviceDescription:
      'iPhone ūdens bojājumu diagnostika, tīrīšana, oksidācijas novēršana un bojāto detaļu nomaiņa ar garantiju.',
    applyHref: '/pieraksties',
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
    title: 'iPhone ūdens bojājumi — diagnostika un remonts Rīgā | iLab',
    description:
      'iPhone iekrita ūdenī vai pēc mitruma vairs neieslēdzas? Veicam ūdens bojājumu diagnostiku, tīrīšanu un oksidācijas novēršanu. Ātra palīdzība un 90 dienu garantija.',
    alternates: { canonical: getRoutePath(locale) },
  };
}

function buildFaqLd() {
  return buildFaqLdFromPairs(FAQ_ITEMS);
}

function buildBreadcrumbs(locale = 'lv') {
  const strings = getPageStrings(locale);

  return buildBreadcrumbsLd([
    { name: 'Sākums', url: abs('/') },
    { name: 'iPhone remonts', url: abs(getHubPath(locale)) },
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

export default function IphoneWaterDamageServicePage({ locale = 'lv', searchParams }) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;

  const strings = getPageStrings(locale);
  const faqLd = buildFaqLd();
  const breadcrumbsLd = buildBreadcrumbs(locale);
  const serviceLd = buildServiceLd(locale);

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

      <DeviceHero
        image="/images/categories/udens_bojajumi.webp"
        alt={strings.heroAlt}
        focal="right"
        className="service"
        bodyHtml={strings.heroBodyHtml}
      />

      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h2 id="intro-h2" className={s.h1}>
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

      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq
            id="faq"
            title={strings.faqTitle}
            groups={[{ label: strings.faqGroupLabel, items: FAQ_ITEMS }]}
            headingLevel={2}
            variant="accordion"
            locale={locale}
          />
        </div>
      </section>

      <section id="pieteikties" className={s.section} aria-label="Pieteikties remontam">
        <div className={s.container}>
          <ConvertBand locale={locale} />
        </div>
      </section>
    </>
  );
}