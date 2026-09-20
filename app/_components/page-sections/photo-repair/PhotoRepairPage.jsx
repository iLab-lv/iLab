import {
  FaHandshake,
  FaLocationDot,
  FaMagnifyingGlass,
  FaShieldHalved,
} from 'react-icons/fa6';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceHero from '@sections/device-hero/DeviceHero';
import Faq from '@sections/faq/Faq';
import QuickFacts from '@/_components/sections/quick-facts/QuickFacts';
import Reviews from '@/_components/sections/reviews/Reviews';
import EditorialCards from '@/_components/sections/editorial-cards/EditorialCards';
import LandingLocations from '@/app/landings/_components/locations/LandingLocations';
import LandingCtaProvider from '@/app/landings/_components/ui/providers/LandingCtaProvider';

import { getPhotoRepairContent } from './photoRepairContent';

const FACT_ICONS = {
  warranty: FaShieldHalved,
  diagnostics: FaMagnifyingGlass,
  price: FaHandshake,
  locations: FaLocationDot,
};

export default function PhotoRepairPage({
  locale = 'lv',
  baseHref,
  siteSettings,
  reviewsSummary,
}) {
  const copy = getPhotoRepairContent(locale);
  const breadcrumbs = [
    { label: copy.home, href: locale === 'ru' ? '/ru' : '/' },
    { label: copy.breadcrumb, href: baseHref },
  ];
  const facts = copy.facts.map(([key, title, description]) => ({
    Icon: FACT_ICONS[key],
    title,
    description,
  }));
  const problemItems = copy.problems.items.map(([title, cause, action]) => ({
    title,
    details: [
      { label: copy.problems.cause, text: cause },
      { label: copy.problems.action, text: action },
    ],
  }));
  const processItems = copy.process.items.map((item, index) => ({
    ...item,
    number: String(index + 1).padStart(2, '0'),
  }));
  const faqItems = copy.faq.map(([q, a]) => ({ q, a }));

  return (
    <>
      <PageHeader
        title={copy.h1}
        lead={copy.hero[0]}
        scrollCta={{ label: copy.scroll, targetId: 'photo-services' }}
        crumbs={breadcrumbs}
      />
      <DeviceHero
        image="/images/categories/landing_hero.webp"
        alt={copy.meta.imageAlt}
        focal="center"
        priority
        bodyHtml={`<p>${copy.hero[1]}</p>`}
      />
      <QuickFacts facts={facts} ariaLabel={copy.factsLabel} locale={locale} />
      <EditorialCards id="photo-intro" {...copy.intro} />
      <EditorialCards id="photo-services" {...copy.services} />
      <EditorialCards id="photo-lenses" tone="accent" {...copy.lenses} />
      <EditorialCards id="photo-brands" columns={3} {...copy.brands} />
      <EditorialCards id="photo-problems" {...copy.problems} items={problemItems} />
      <EditorialCards id="photo-why" {...copy.why} />
      <EditorialCards id="photo-decision" columns={3} {...copy.decision} />
      <EditorialCards id="photo-quality" columns={3} tone="accent" {...copy.quality} />
      <EditorialCards id="photo-equipment" columns={3} {...copy.equipment} />
      <EditorialCards id="photo-reviews-heading" title={copy.reviewsTitle} />
      <Reviews locale={locale} reviewsSummary={reviewsSummary} />
      <LandingCtaProvider siteSettings={siteSettings}>
        <LandingLocations id="photo-locations" locale={locale} heading={copy.locations} />
      </LandingCtaProvider>
      <EditorialCards id="photo-process" {...copy.process} items={processItems} />
      <EditorialCards id="photo-guide" {...copy.guide} />
      <Faq id="photo-faq" title={copy.faqTitle} items={faqItems} />
    </>
  );
}
