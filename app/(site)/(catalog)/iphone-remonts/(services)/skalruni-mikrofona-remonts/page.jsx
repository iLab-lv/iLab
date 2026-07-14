import IphoneAudioServicePage from './IphoneAudioServicePage';

import JsonLd from '@components/seo/JsonLd';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

const locale = 'lv';

const seo = getStaticPageSeo('iphoneAudioRepair', locale);

const routePath = seo.lvPath;
const ruPath = seo.ruPath;
const hubPath = '/iphone-remonts';

const strings = {
  title: seo.title,
  description: seo.description,

  heroAlt: seo.imageAlt,
  heroImage: '/images/categories/mikrofona_remonts.webp',

  homeCrumb: 'Sākums',
  hubCrumb: 'iPhone remonts',
  breadcrumbServiceName: 'Skaļruņa un mikrofona remonts',

  headerTitle: 'iPhone skaļruņa un mikrofona remonts Rīgā',
  headerLead:
    'Palīdzam, ja iPhone sarunas laikā slikti dzirdams, nedarbojas mikrofons, skaļrunis čarkst, ir kluss vai pēc mitruma/kritiena skaņa kļuvusi nestabila.',
  headerCtaLabel: 'Pieteikt remontu',

  introTitle: 'Kad nepieciešams skaļruņa vai mikrofona remonts?',
  introP1:
    'Skaņas problēmas var rasties netīrumu, mitruma, bojāta skaļruņa, mikrofona, savienojumu vai programmatūras kļūdu dēļ. iLab servisā vispirms veicam diagnostiku, lai saprastu, vai pietiek ar tīrīšanu, vai nepieciešama detaļas maiņa.',
  introP2:
    'Pēc remonta pārbaudām sarunu skaņu, skaļruni, mikrofonu, video ierakstu un galvenās funkcijas. Darbam un uzstādītajām detaļām sniedzam 90 dienu garantiju.',

  ctaLabel: 'Pieteikties remontam',

  processTitle: 'Kā notiek remonts',
  processSteps: [
    {
      title: 'Diagnostika',
      text: 'Pārbaudām skaļruņus, mikrofonus, sarunu kvalitāti un ierakstu.',
    },
    {
      title: 'Tīrīšana vai maiņa',
      text: 'Atkarībā no bojājuma veicam profesionālu tīrīšanu vai detaļas nomaiņu.',
    },
    {
      title: 'Testi',
      text: 'Pārbaudām zvanus, video, mikrofonu un skaļruņa darbību.',
    },
    {
      title: 'Garantija',
      text: 'Pēc remonta sniedzam 90 dienu garantiju darbam un detaļām.',
    },
  ],

  faqTitle: 'Biežāk uzdotie jautājumi',

  serviceName: 'iPhone skaļruņa un mikrofona remonts Rīgā',
  serviceType: 'iPhone audio remonts',
  serviceDescription:
    'iPhone skaļruņa un mikrofona remonts Rīgā: diagnostika, tīrīšana vai detaļas maiņa, 90 dienu garantija.',

  processName: 'iPhone skaļruņa un mikrofona remonts',
  processDescription:
    'Kā iLab servisā notiek iPhone skaļruņa un mikrofona remonts: diagnostika, tīrīšana vai detaļas maiņa, testi un garantija.',
};

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

async function getIphoneAudioServiceData() {
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

    includeFaq: false,

    includeHowTo: true,
    howTo: {
      name: strings.processName,
      description: strings.processDescription,
      image: strings.heroImage,
      steps: strings.processSteps.map((step) => ({
        name: step.title,
        text: step.text,
      })),
    },
  });

  return {
    strings,
    routePath,
    ruPath,
    hubPath,
    breadcrumbs,
    jsonLd,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata(seo);
}

export default async function Page() {
  const data = await getIphoneAudioServiceData();

  return (
    <>
      <JsonLd id="iphone-audio-service-jsonld" data={data.jsonLd} />

      <IphoneAudioServicePage locale={locale} {...data} />
    </>
  );
}
