import IphoneBoardRepairServicePage from './IphoneBoardRepairServicePage';

import JsonLd from '@components/seo/JsonLd';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

const locale = 'lv';

const seo = getStaticPageSeo('iphoneBoardRepair', locale);

const routePath = seo.lvPath;
const hubPath = '/iphone-remonts';

const strings = {
  title: seo.title,
  description: seo.description,

  heroAlt: seo.imageAlt,
  heroImage: '/images/categories/plates_remonts.webp',
  heroBodyHtml:
    '<p><strong>Mikrolodēšana un iPhone plates remonts Rīgā</strong> iLab servisā - precīza diagnostika pēc kritiena, šķidruma bojājumiem, uzlādes problēmām vai situācijām, kad iPhone vairs neieslēdzas. Remonta iespējas un cenu nosakām pēc plates pārbaudes.</p>',

  firstImage: '/images/services/plates_remonts_1.jpeg',
  firstImageAlt: 'iPhone plates diagnostika mikroskopā',
  secondImage: '/images/services/plates_remonts_2.jpeg',
  secondImageAlt: 'iPhone mikrolodēšanas darbs servisā',

  contentTitle: 'iPhone plates diagnostika un mikrolodēšana',
  contentIntro:
    'iPhone mātesplates remonts ir sarežģīts darbs, kur nepieciešama precīza diagnostika, mikroskops, profesionālas lodēšanas iekārtas un pieredze ar Apple ierīču elektronikām. Šāda veida remontu iesakām, ja parasts detaļas nomaiņas darbs problēmu neatrisina.',

  firstBlockTitle: 'Kad nepieciešams iPhone plates remonts',
  firstBlockParagraphs: [
    'Plates bojājums var parādīties pēc trieciena, mitruma, nekvalitatīva iepriekšēja remonta vai barošanas ķēdes pārslodzes. Dažreiz iPhone ārēji izskatās vesels, bet ierīce neieslēdzas, restartējas vai nelādējas.',
    'Servisā sākam ar diagnostiku: pārbaudām barošanas ķēdes, savienojumus, uzlādes mezglus un bojājuma pazīmes zem mikroskopa. Tikai pēc pārbaudes varam pateikt, vai plates remonts ir tehniski iespējams un ekonomiski pamatots.',
  ],
  symptoms: [
    'iPhone neieslēdzas vai rāda tikai Apple logo',
    'ierīce restartējas, uzkarst vai ātri izlādējas',
    'nav uzlādes, nav tīkla, nedarbojas kamera vai skaņa',
    'pēc ūdens bojājuma parādījusies nestabila darbība',
  ],

  secondBlockTitle: 'Ko ietver mikrolodēšanas darbi',
  secondBlockParagraphs: [
    'Mikrolodēšana ļauj atjaunot bojātus savienojumus, nomainīt mazus komponentus un salabot plates ķēdes, kuras nav iespējams atrisināt ar vienkāršu moduļa maiņu. Šis darbs prasa rūpīgu pārbaudi pirms un pēc remonta.',
    'Mēs vienmēr saskaņojam darbu pirms remonta sākšanas. Ja plates bojājums ir pārāk plašs vai remonts nav izdevīgs, to pasakām uzreiz un piedāvājam praktiskāko risinājumu.',
  ],
  workItems: [
    'barošanas un uzlādes ķēžu diagnostika',
    'bojātu savienojumu un kontaktu atjaunošana',
    'komponentu nomaiņa ar mikrolodēšanu',
    'pārbaude pēc remonta un ieteikumi datu drošībai',
  ],

  faqTitle: 'Jautājumi par iPhone plates remontu',

  breadcrumbServiceName: 'iPhone plates remonts',
  serviceName: 'Mikrolodēšana un iPhone plates remonts Rīgā',
  serviceType: 'iPhone plates remonts',
  serviceDescription:
    'iPhone mātesplates diagnostika, mikrolodēšana un plates remonts Rīgā pēc mitruma, trieciena, uzlādes vai barošanas bojājumiem.',

  homeCrumb: 'Sākums',
  hubCrumb: 'iPhone remonts',

  headerTitle: 'Mikrolodēšana un iPhone plates remonts Rīgā',
  headerLead:
    'Veicam iPhone mātesplates diagnostiku un mikrolodēšanas darbus, ja telefons neieslēdzas, nelādējas, restartējas, pārkarst vai bojājums radies pēc mitruma. Šim servisam cena tiek noteikta individuāli pēc diagnostikas.',
  headerCtaLabel: 'Uzzināt vairāk',

  applyAria: 'Pieteikt iPhone plates remontu',

  processName: 'iPhone plates remonts',
  processDescription:
    'Kā iLab servisā notiek iPhone plates diagnostika un mikrolodēšana: pārbaude, bojājuma noteikšana, saskaņošana, remonts un gala tests.',
  processSteps: [
    {
      name: 'Diagnostika',
      text: 'Pārbaudām simptomus, barošanas ķēdes, savienojumus un bojājuma pazīmes zem mikroskopa.',
    },
    {
      name: 'Remonta iespējas',
      text: 'Pēc pārbaudes izskaidrojam bojājumu, iespējamo risinājumu, termiņu un izmaksas.',
    },
    {
      name: 'Mikrolodēšana',
      text: 'Veicam komponentu nomaiņu, kontaktu atjaunošanu vai plates ķēdes remontu, ja tas ir iespējams.',
    },
    {
      name: 'Pārbaude',
      text: 'Testējam uzlādi, startēšanos, stabilitāti un galvenās iPhone funkcijas.',
    },
    {
      name: 'Rezultāts',
      text: 'Izskaidrojam veikto darbu un dodam ieteikumus tālākai lietošanai vai datu saglabāšanai.',
    },
  ],
};

const faqItems = [
  {
    q: 'Cik maksā iPhone plates remonts?',
    a: 'Cena ir atkarīga no bojājuma, modeļa un nepieciešamajiem mikrolodēšanas darbiem. Precīzu cenu nosakām pēc diagnostikas.',
  },
  {
    q: 'Vai plates remonts palīdz, ja iPhone neieslēdzas?',
    a: 'Bieži jā, bet vispirms jānoskaidro iemesls. Problēma var būt barošanas ķēdē, īssavienojumā, mitruma bojājumā vai citā plates mezglā.',
  },
  {
    q: 'Vai pēc plates remonta dati saglabājas?',
    a: 'Daudzos gadījumos mērķis ir atjaunot ierīci vai piekļuvi datiem, bet garantēt datu saglabāšanu pirms diagnostikas nav iespējams. Ja dati ir īpaši svarīgi, pasaki to pirms remonta.',
  },
  {
    q: 'Cik ilgi notiek mikrolodēšana?',
    a: 'Vienkāršāki darbi var aizņemt dažas stundas, bet sarežģīti plates bojājumi prasa ilgāku diagnostiku un testēšanu.',
  },
];

function buildBreadcrumbs() {
  return [
    {
      label: strings.homeCrumb,
      href: '/',
    },
    {
      label: strings.hubCrumb,
      href: hubPath,
    },
    {
      label: strings.breadcrumbServiceName,
      href: routePath,
    },
  ];
}

function getIphoneBoardRepairData() {
  const breadcrumbs = buildBreadcrumbs();

  const jsonLd = buildRepairPageJsonLd({
    path: routePath,
    locale,

    pageName: strings.title,
    pageDescription: strings.description,

    breadcrumbs,

    serviceName: strings.serviceName,
    serviceDescription: strings.serviceDescription,
    serviceType: strings.serviceType,
    serviceImage: strings.heroImage,

    faqItems,
    includeFaq: true,

    includeHowTo: true,
    howTo: {
      name: strings.processName,
      description: strings.processDescription,
      image: strings.heroImage,
      steps: strings.processSteps,
    },
  });

  return {
    strings,
    breadcrumbs,
    faqItems,
    jsonLd,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata(seo);
}

export default function Page() {
  const data = getIphoneBoardRepairData();

  return (
    <>
      <JsonLd id="iphone-board-repair-jsonld" data={data.jsonLd} />

      <IphoneBoardRepairServicePage locale={locale} {...data} />
    </>
  );
}

