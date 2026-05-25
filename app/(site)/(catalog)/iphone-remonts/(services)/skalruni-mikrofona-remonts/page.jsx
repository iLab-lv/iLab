import IphoneAudioServicePage from './IphoneAudioServicePage';

import JsonLd from '@components/seo/JsonLd';

import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const SERVICE_KEY = 'skalruni-mikrofona-remonts';

const routePath = '/iphone-remonts/skalruni-mikrofona-remonts';
const ruPath = '/ru/remont-iphone/remont-dinamika-mikrofona';
const hubPath = '/iphone-remonts';

const strings = {
  title: 'iPhone skaļruņu un mikrofona remonts Rīgā | iLab',
  description:
    'Klusa skaņa, krakšķi vai sarunās nedzird? Profesionāls iPhone skaļruņu un mikrofona remonts Rīgā - tīrīšana, moduļu nomaiņa, diagnostika un 90 dienu garantija.',

  heroAlt: 'iPhone skaļruņu un mikrofona remonts Rīgā',
  heroImage: '/images/categories/mikrofona_remonts.webp',
  heroBodyHtml:
    '<p><strong>Klusa skaņa, krakšķi vai sarunās nedzird?</strong> Veicam <strong>iPhone skaļruņu un mikrofona remontu</strong> - profesionāla tīrīšana, moduļu nomaiņa, pilna pārbaude un <strong>90 dienu garantija</strong>.</p>',

  introTitle: 'iPhone skaļruņu un mikrofona remonts Rīgā',
  introP1:
    'Skaņas problēmas var izraisīt <strong>putekļi, mitrums, oksidācija vai nolietoti moduļi</strong>. Veicam <strong>diagnostiku</strong>, pēc kuras noskaidrojam - pietiek ar <strong>tīrīšanu</strong> vai nepieciešama <strong>skaļruņa/mikrofona nomaiņa</strong>.',
  introP2:
    'Populāros modeļus parasti salabojam <strong>45–90 minūtēs</strong>. Visam darbam un detaļām ir <strong>90 dienu garantija</strong>.',

  selectedModelPrefix: 'Atlasīts modelis:',
  selectedModelSuffix:
    'Ja nepieciešama precīza cena, iesniedz pieteikumu zemāk.',

  processTitle: 'Kā notiek remonts',
  processSteps: [
    {
      title: 'Diagnostika',
      text: 'Pārbaudām skaļruņus, mikrofonu, režģus un savienojumus.',
    },
    {
      title: 'Tīrīšana vai nomaiņa',
      text: 'Noņemam netīrumus, oksidāciju vai mainām bojāto moduli.',
    },
    {
      title: 'Testi',
      text: 'Pārbaudām zvana, multimediju skaņu, sarunu kvalitāti un mikrofonu.',
    },
    {
      title: 'Nobeigums',
      text: 'Kvalitātes pārbaude un ieteikumi turpmākai lietošanai.',
    },
    {
      title: 'Garantija',
      text: '90 dienu garantija gan detaļām, gan darbam.',
    },
  ],

  faqTitle: 'Biežāk uzdotie jautājumi',

  breadcrumbServiceName: 'Skaļruņu un mikrofona remonts',
  serviceName: 'iPhone skaļruņu un mikrofona remonts Rīgā',
  serviceType: 'iPhone skaļruņu un mikrofona remonts',
  serviceDescription:
    'iPhone skaļruņu un mikrofona remonts Rīgā: diagnostika, tīrīšana vai moduļa nomaiņa, testi un 90 dienu garantija.',

  homeCrumb: 'Sākums',
  hubCrumb: 'iPhone remonts',

  headerTitle: 'iPhone skaļruņu un mikrofona remonts Rīgā',
  headerLead:
    'Remontējam iPhone skaļruni un mikrofonu, ja skaņa ir klusa, krakšķ vai sarunās nedzird. Pirms remonta veicam diagnostiku, izvērtējam, vai pietiek ar tīrīšanu vai nepieciešama nomaiņa, un pēc remonta sniedzam 90 dienu garantiju.',
  headerCtaLabel: 'Pieteikties',

  applyAria: 'Pieteikties remontam',

  processName: 'iPhone skaļruņu un mikrofona remonts',
  processDescription:
    'Kā iLab servisā notiek iPhone skaļruņu un mikrofona remonts: diagnostika, tīrīšana vai moduļa maiņa, testi un garantija.',
};

function dedupeFaqItems(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const key = String(item?.q || item?.question || '')
      .trim()
      .toLowerCase();

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

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

function buildFaqSections(faqGroups = []) {
  return faqGroups
    .filter((group) => Array.isArray(group.items) && group.items.length > 0)
    .map((group, index) => ({
      id: group.id || group.docId || `faq-group-${index + 1}`,
      title: group.title,
      items: toFaqRenderItems(group.items),
      rawItems: group.items,
    }));
}

async function getIphoneAudioServiceData({ selectedModel }) {
  const faq = await getFaqGroups(
    [
      { scopeType: 'service', scopeKey: SERVICE_KEY },
      { scopeType: 'basic' },
    ],
    locale
  );

  const faqSections = buildFaqSections(faq.groups);

  const mergedFaqItems = dedupeFaqItems(
    faqSections.flatMap((section) => section.rawItems || [])
  );

  const breadcrumbs = buildBreadcrumbs();

  const hasVisibleFaq = mergedFaqItems.length > 0;

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

    faqItems: mergedFaqItems,
    includeFaq: hasVisibleFaq,

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

    selectedModel,

    routePath,
    hubPath,

    breadcrumbs,

    faqSections,
    hasVisibleFaq,

    jsonLd,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata({
    locale,
    title: strings.title,
    description: strings.description,
    lvPath: routePath,
    ruPath,
    image: '/images/og/home.jpg',
    imageAlt: strings.heroAlt,
  });
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const selectedModel = resolvedSearchParams?.model
    ? String(resolvedSearchParams.model)
    : null;

  const data = await getIphoneAudioServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="iphone-audio-service-jsonld" data={data.jsonLd} />

      <IphoneAudioServicePage locale={locale} {...data} />
    </>
  );
}