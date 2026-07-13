import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Faq from '@sections/faq/Faq';
import ServicePricelist from '@sections/service-pricelist/ServicePricelist';
import QuickAnswer from '@/_components/sections/quick-answer/QuickAnswer';
import QuickFacts from '@/_components/sections/quick-facts/QuickFacts';
import IphoneScreenSymptoms from '@/_components/page-sections/iphone-screen-repair/symptoms/IphoneScreenSymptoms';
import IphoneScreenDamageGuide from '@/_components/page-sections/iphone-screen-repair/damage-guide/IphoneScreenDamageGuide';
import IphoneScreenPriceFactors from '@/_components/page-sections/iphone-screen-repair/price-factors/IphoneScreenPriceFactors';
import RepairProcess from '@/_components/sections/repair-process/RepairProcess';
import IphoneScreenPostRepairChecks from '@/_components/page-sections/iphone-screen-repair/post-repair-checks/IphoneScreenPostRepairChecks';
import IphoneQualitySection from '@/_components/page-sections/iphone-remonts/quality/IphoneQualitySection';
import PopularServices from '@/_components/sections/popular-services/PopularServices';
import ReviewsCompact from '@/_components/sections/reviews/ReviewsCompact';
import IphoneLocationsSection from '@/_components/page-sections/iphone-remonts/locations/IphoneLocationsSection';
import FinalCta from '@/_components/sections/final-cta/FinalCta';
import IphoneBackCoverTerminology from '@/_components/page-sections/iphone-back-cover-repair/terminology/IphoneBackCoverTerminology';
import IphoneBackCoverCameraLink from '@/_components/page-sections/iphone-back-cover-repair/related-camera/IphoneBackCoverCameraLink';

import s from '@styles/Catalog.module.scss';

const SERVICE_IDS = ['phone-back-cover'];
const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';

export default function IphoneBackCoverServicePage({
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

      <QuickAnswer locale={locale} variant="iphone-back-cover" />
      <QuickFacts locale={locale} variant="iphone-back-cover" />
      <IphoneScreenSymptoms locale={locale} variant="iphone-back-cover" />
      <IphoneScreenDamageGuide locale={locale} variant="iphone-back-cover" />
      <IphoneBackCoverTerminology locale={locale} />

      <section id="brand-list" className={s.section}>
        <ServicePricelist
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
          variant="iphone-back-cover"
        />
      </section>

      <IphoneBackCoverCameraLink locale={locale} />
      <IphoneScreenPriceFactors locale={locale} variant="iphone-back-cover" />
      <RepairProcess id="iphone-back-cover-replacement-steps" locale={locale} variant="iphone-back-cover" backgroundImage="/images/hands-closeup.png" />
      <IphoneScreenPostRepairChecks locale={locale} variant="iphone-back-cover" />
      <IphoneQualitySection locale={locale} variant="iphone-back-cover" />
      <PopularServices locale={locale} variant="other-services" excludeServiceKey="aizmugures-vacina-maina" />
      <ReviewsCompact locale={locale} reviewsSummary={reviewsSummary} />
      <IphoneLocationsSection locale={locale} variant="iphone-back-cover" />

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
