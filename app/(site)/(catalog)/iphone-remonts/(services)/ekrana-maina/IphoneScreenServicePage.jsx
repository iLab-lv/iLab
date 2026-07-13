import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Faq from '@sections/faq/Faq';
import QuickAnswer from '@/app/_components/sections/quick-answer/QuickAnswer';
import QuickFacts from '@/app/_components/sections/quick-facts/QuickFacts';
import IphoneScreenSymptoms from '@/app/_components/page-sections/iphone-screen-repair/symptoms/IphoneScreenSymptoms';
import IphoneScreenDamageGuide from '@/app/_components/page-sections/iphone-screen-repair/damage-guide/IphoneScreenDamageGuide';
import IphoneScreenPriceList from '@/app/_components/page-sections/iphone-screen-repair/price-list/IphoneScreenPriceList';
import IphoneScreenPriceFactors from '@/app/_components/page-sections/iphone-screen-repair/price-factors/IphoneScreenPriceFactors';
import RepairProcess from '@/_components/sections/repair-process/RepairProcess';
import IphoneScreenPostRepairChecks from '@/app/_components/page-sections/iphone-screen-repair/post-repair-checks/IphoneScreenPostRepairChecks';
import IphoneHydrogelSection from '@/app/_components/page-sections/iphone-screen-repair/hydrogel/IphoneHydrogelSection';
import IphoneQualitySection from '@/app/_components/page-sections/iphone-remonts/quality/IphoneQualitySection';
import PopularServices from '@/app/_components/sections/popular-services/PopularServices';
import ReviewsCompact from '@/_components/sections/reviews/ReviewsCompact';
import IphoneLocationsSection from '@/app/_components/page-sections/iphone-remonts/locations/IphoneLocationsSection';
import FinalCta from '@/_components/sections/final-cta/FinalCta';

import s from '@styles/Catalog.module.scss';

const SERVICE_IDS = [
  'phone-display-original',
  'phone-display-oled',
  'phone-display-incell',
];

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';

export default function IphoneScreenServicePage({
  locale = 'lv',

  strings,

  devices = [],
  pricing = {},
  serviceMeta = {},
  selectedModel,

  allModelsHref,
  breadcrumbs = [],

  faqSections = [],
  hasVisibleFaq = false,
  reviewsSummary = null,
}) {
  return (
    <>
      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        scrollCta={{ label: strings.headerCtaLabel, targetId: 'brand-list' }}
        crumbs={breadcrumbs}
      />

      <DeviceHero
        image={strings.heroImage}
        alt={strings.heroAlt}
        bodyHtml={strings.heroBodyHtml}
      />

      <QuickFacts variant="iphone-screen" locale={locale} />

      <QuickAnswer locale={locale} />

      <IphoneScreenSymptoms locale={locale} />

      <IphoneScreenDamageGuide locale={locale} />

      <section id="brand-list" className={s.section}>
        <IphoneScreenPriceList
          devices={devices}
          pricing={pricing}
          serviceMeta={serviceMeta}
          brandSlug={BRAND_KEY}
          categorySlug={CATEGORY_KEY}
          serviceIds={SERVICE_IDS}
          title={strings.priceTitle}
          allModelsHref={allModelsHref}
          cta={{ label: strings.ctaLabel, href: '#pieteikties' }}
          selectedModel={selectedModel}
          locale={locale}
        />
      </section>

      <IphoneScreenPriceFactors locale={locale} />

      <RepairProcess
        id="iphone-screen-replacement-steps"
        locale={locale}
        variant="iphone-screen"
        backgroundImage="/images/hands-closeup.png"
      />

      <IphoneScreenPostRepairChecks locale={locale} />

      <IphoneHydrogelSection locale={locale} />

      <IphoneQualitySection locale={locale} variant="iphone-screen" />

      <PopularServices locale={locale} variant="other-services" />

      <ReviewsCompact locale={locale} reviewsSummary={reviewsSummary} />

      <IphoneLocationsSection locale={locale} variant="iphone-screen" />

      {hasVisibleFaq && (
        <section className={s.section} aria-labelledby="faq-h2">
          <div className={s.container}>
            <h2 id="faq-h2" className={s.h2}>
              {strings.faqTitle}
            </h2>

            {faqSections.map((section, index) => (
              <div
                key={`faq-group-${index}-${section.id}`}
                className={index > 0 ? s.stackLg : ''}
              >
                <Faq
                  id={`faq-group-${index + 1}`}
                  title={section.title}
                  items={section.items}
                  headingLevel={3}
                  variant="accordion"
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <FinalCta id="pieteikties" locale={locale} variant="iphone" />
    </>
  );
}
