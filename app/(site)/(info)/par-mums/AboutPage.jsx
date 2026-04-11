import Script from 'next/script';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import Why from '@sections/why/Why';
import Locations from '@sections/locations/Locations';
import Reviews from '@sections/reviews/Reviews';
import ConvertBand from '@sections/convert-band/ConvertBand';

import s from '@styles/Catalog.module.scss';

const ORIGIN = 'https://www.ilab.lv';

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      canonicalPath: '/ru/o-nas',
      breadcrumbHome: 'Главная',
      breadcrumbPage: 'О iLab',

      headerTitle: 'О iLab',
      headerLead:
        'iLab — сервисный центр в Риге с более чем 10-летним опытом ремонта телефонов, планшетов, компьютеров и другой техники. Работаем быстро, понятно и с гарантией как для частных клиентов, так и для бизнеса.',

      aboutTitle: 'О нас',

      intro:
        ' <strong>SIA iLab</strong> — профессиональный сервис по ремонту телефонов и компьютеров в Риге с более чем <strong>10-летним опытом</strong> в сфере обслуживания и ремонта техники. Мы обеспечиваем быстрый и качественный ремонт техники как для частных клиентов, так и для компаний (B2B), предоставляя полный спектр сервисных услуг.',

      locationsTitle: 'iLab вы найдёте в T/C Domina Shopping и TC Spice Home',
      locationsText:
        'Наши сервисные центры находятся в <strong>TC Domina Shopping</strong> и <strong>TC Spice Home</strong>, чтобы клиентам было удобно сдавать и получать устройства в любой день. В обоих филиалах доступны ремонт смартфонов, планшетов, компьютеров и умных часов, обслуживание пылесосов, установка программного обеспечения и другие технические услуги.',

      missionTitle: 'Наша миссия',
      missionText:
        'Ваши устройства, наш опыт — надёжный сервис каждый день как для частных клиентов, так и для бизнеса. Наша задача — сделать так, чтобы телефон, компьютер, планшет или другое устройство снова работало как новое. Технологии должны облегчать жизнь, а не создавать проблемы — и именно это мы обеспечиваем каждый день.',

      teamTitle: 'Команда iLab',
      teamText:
        'Техники iLab — обученные специалисты, которые постоянно совершенствуют знания, следя за новейшими технологическими тенденциями. Это позволяет нам обеспечивать высокое качество ремонта устройств <strong>Apple, Samsung, Huawei, Xiaomi, Lenovo, Dyson</strong> и других брендов. Мы обслуживаем клиентов по всей Латвии — как частных лиц, так и B2B.',

      whyChooseTitle: 'Почему выбирают iLab',
      whyChooseItems: [
        '10+ лет опыта в ремонте устройств;',
        'Ремонт телефонов и компьютеров в Риге — в двух удобных локациях: TC Domina Shopping и TC Spice Home;',
        'Работаем каждый день, включая выходные;',
        'Обслуживаем частных клиентов и B2B по всей Латвии;',
        'Качественные запчасти и профессиональная диагностика;',
        'Подготовка акта дефектации для страховой компании клиента;',
        'Честная ценовая политика и понятная коммуникация;',
        '90 дней гарантии на выполненный ремонт.',
      ],

      valuesTitle: 'Ценности iLab',
      valuesItems: [
        '<strong>Точность и скорость</strong> — устройство ремонтируется в максимально короткие сроки;',
        '<strong>Развитие и качество</strong> — наши техники постоянно совершенствуют знания;',
        '<strong>Ответственность и честность</strong> — никаких скрытых расходов или расплывчатых обещаний;',
        '<strong>Надёжность</strong> — мы отвечаем за каждый выполненный ремонт.',
      ],

      orgName: 'iLab',
      orgLegalName: 'SIA “iLab”',
      orgVatId: 'Reģ. nr. 40203288307',
      orgDescription:
        'Профессиональный сервис по ремонту телефонов, планшетов, компьютеров и Dyson в Риге.',
      dominaName: 'iLab — Domina Shopping',
      spiceName: 'iLab — Spice Home',
      contactsPath: '/ru/kontakty',
    };
  }

  return {
    canonicalPath: '/par-mums',
    breadcrumbHome: 'Sākums',
    breadcrumbPage: 'Par iLab',

    headerTitle: 'Par iLab',
    headerLead:
      'iLab ir servisa centrs Rīgā ar vairāk nekā 10 gadu pieredzi telefonu, planšetdatoru, datoru un citas tehnikas remontā. Strādājam ātri, skaidri un ar garantiju gan privātpersonām, gan uzņēmumiem.',

    aboutTitle: 'Par mums',

    intro:
      '<strong>SIA iLab</strong> — profesionāls telefona un datoru serviss Rīgā ar vairāk nekā <strong>10 gadu pieredzi</strong> tehnoloģiju apkalpošanas un remonta jomā. Mēs sniedzam ātru un kvalitatīvu tehnikas remontu gan privātpersonām, gan uzņēmumiem (B2B), nodrošinot pilnu servisa pakalpojumu klāstu.',

    locationsTitle: 'iLab atradīsi: T/C Domina Shopping un TC Spice Home',
    locationsText:
      'Mūsu servisa centri atrodas <strong>TC Domina Shopping</strong> un <strong>TC Spice Home</strong>, lai klientiem būtu ērti nogādāt un saņemt ierīces jebkurā dienas laikā. Abās filiālēs pieejami viedtālruņu, planšetdatoru, datoru un viedpulksteņu remonts, putekļusūcēju apkope, programmatūras uzstādīšana un citi tehniskie pakalpojumi.',

    missionTitle: 'Mūsu misija',
    missionText:
      'Jūsu ierīces, mūsu pieredze — uzticams serviss katru dienu, gan privātpersonām, gan uzņēmumiem. Mūsu uzdevums ir nodrošināt, lai telefons, dators, planšetdators vai citas ierīces atkal strādātu kā jaunas. Tehnoloģijām ir jāatvieglo dzīve, nevis jārada problēmas — un tieši to mēs nodrošinām katru dienu.',

    teamTitle: 'iLab komanda',
    teamText:
      'iLab tehniķi ir apmācīti speciālisti, kas nepārtraukti pilnveido zināšanas, sekojot līdzi jaunākajām tehnoloģiju tendencēm. Tas ļauj mums nodrošināt augstāko kvalitāti <strong>Apple, Samsung, Huawei, Xiaomi, Lenovo, Dyson</strong> un citu zīmolu ierīču remontā. Sniedzam pakalpojumu visā Latvijā privātpersonām un B2B.',

    whyChooseTitle: 'Kāpēc izvēlēties iLab',
    whyChooseItems: [
      '10+ gadu pieredze ierīču remontā;',
      'Telefona un datoru remonts Rīgā — divās ērtās lokācijās: TC Domina Shopping un TC Spice Home;',
      'Darbojamies katru dienu, arī brīvdienās;',
      'Apkalpojam privātpersonas un B2B klientus visā Latvijā;',
      'Kvalitatīvas rezerves daļas un profesionāla diagnostika;',
      'Defektācijas aktu sagatavošana klienta apdrošināšanas uzņēmumam;',
      'Godīga cenu politika un skaidra saziņa ar klientu;',
      '90 dienu garantija veiktajam remontam.',
    ],

    valuesTitle: 'iLab vērtības',
    valuesItems: [
      '<strong>Precizitāte un ātrums</strong> — ierīce tiek salabota pēc iespējas īsākā laikā;',
      '<strong>Attīstība un kvalitāte</strong> — mūsu tehniķi nepārtraukti pilnveido zināšanas;',
      '<strong>Atbildība un godīgums</strong> — nekādu slēptu izmaksu vai neskaidru solījumu;',
      '<strong>Uzticamība</strong> — mēs atbildam par katru paveikto remontu.',
    ],

    orgName: 'iLab',
    orgLegalName: 'SIA “iLab”',
    orgVatId: 'Reģ. nr. 40203288307',
    orgDescription:
      'Profesionāls telefonu, planšetdatoru, datoru un Dyson serviss Rīgā.',
    dominaName: 'iLab — Domina Shopping',
    spiceName: 'iLab — Spice Home',
    contactsPath: '/kontakti',
  };
}

function buildBreadcrumbsLd(locale = 'lv') {
  const strings = getPageStrings(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: strings.breadcrumbHome,
        item: `${ORIGIN}${locale === 'ru' ? '/ru' : '/'}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: strings.breadcrumbPage,
        item: `${ORIGIN}${strings.canonicalPath}/`,
      },
    ],
  };
}

function buildOrgLd(locale = 'lv') {
  const strings = getPageStrings(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${ORIGIN}#organization`,
    name: strings.orgName,
    legalName: strings.orgLegalName,
    vatID: strings.orgVatId,
    url: ORIGIN,
    description: strings.orgDescription,
    sameAs: [],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rīga',
      addressCountry: 'LV',
    },
    department: [
      {
        '@type': 'LocalBusiness',
        name: strings.dominaName,
        url: `${ORIGIN}${strings.contactsPath}`,
        areaServed: { '@type': 'City', name: 'Rīga' },
      },
      {
        '@type': 'LocalBusiness',
        name: strings.spiceName,
        url: `${ORIGIN}${strings.contactsPath}`,
        areaServed: { '@type': 'City', name: 'Rīga' },
      },
    ],
  };
}

export default function AboutPage({ locale = 'lv' }) {
  const strings = getPageStrings(locale);
  const breadcrumbsLd = buildBreadcrumbsLd(locale);
  const orgLd = buildOrgLd(locale);

  const headerCrumbs = [
    {
      label: strings.breadcrumbHome,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.breadcrumbPage,
      href: strings.canonicalPath,
    },
  ];

  return (
    <>
      <Script
        id="about-breadcrumbs"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id="about-organization"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(orgLd)}
      </Script>

      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        crumbs={headerCrumbs}
      />

      <section className={s.section} aria-labelledby="about-content-h2">
        <div className={s.container}>
          <h2 id="about-content-h2" className={s.h2}>
            {strings.aboutTitle}
          </h2>

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.intro }}
          />

          <h3 className={s.h3}>{strings.locationsTitle}</h3>
          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.locationsText }}
          />

          <h3 className={s.h3}>{strings.missionTitle}</h3>
          <p className={s.paragraph}>{strings.missionText}</p>

          <h3 className={s.h3}>{strings.teamTitle}</h3>
          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.teamText }}
          />

          <h3 className={s.h3}>{strings.whyChooseTitle}</h3>
          <ul className={s.list}>
            {strings.whyChooseItems.map((item, index) => (
              <li key={`why-choose-${index}`}>{item}</li>
            ))}
          </ul>

          <h3 className={s.h3}>{strings.valuesTitle}</h3>
          <ul className={s.list}>
            {strings.valuesItems.map((item, index) => (
              <li
                key={`values-${index}`}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>
        </div>
      </section>

      <section className={s.section}>
        <Why locale={locale} />
      </section>

      <section className={s.section}>
        <Locations locale={locale} />
      </section>

      <section className={s.section}>
        <Reviews locale={locale} />
      </section>

      <section className={s.section}>
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}