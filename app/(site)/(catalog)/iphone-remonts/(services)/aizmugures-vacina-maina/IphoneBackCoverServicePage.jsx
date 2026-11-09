import QuickContactsSection from '@/_components/sections/quick-contacts/QuickContactsSection';
import ServiceHero from '@/_components/sections/service-recovery/ServiceHero';
import ServiceRecovery, { ServiceBlock } from '@/_components/sections/service-recovery/ServiceRecovery';

import Faq from '@/_components/sections/faq/ServiceFaq';
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
    <ServiceRecovery>
      <ServiceHero
        locale={locale}
        title={strings.headerTitle}
        lead={strings.headerLead}
        crumbs={breadcrumbs}
        image={strings.heroImage}
        imageAlt={strings.heroAlt}
        bodyHtml={strings.heroBodyHtml}
        targetId="brand-list"
        targetLabel={strings.headerCtaLabel}
        placeholderLabel={strings.heroAlt}
      ><QuickFacts locale={locale} variant="iphone-back-cover" /></ServiceHero>

      <ServiceBlock kind="answer"><QuickAnswer locale={locale} variant="iphone-back-cover" /></ServiceBlock>

      <ServiceBlock kind="symptoms"><IphoneScreenSymptoms locale={locale} variant="iphone-back-cover" /></ServiceBlock>
      <ServiceBlock kind="rows"><IphoneScreenDamageGuide locale={locale} variant="iphone-back-cover" /></ServiceBlock>
      <ServiceBlock kind="rows"><IphoneBackCoverTerminology locale={locale} /></ServiceBlock>

      <ServiceBlock kind="priceBrowser"><section id="brand-list" className={s.section}>
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
      </section></ServiceBlock>

      <ServiceBlock kind="cameraLink"><IphoneBackCoverCameraLink locale={locale} /></ServiceBlock>
      <ServiceBlock kind="rows"><IphoneScreenPriceFactors locale={locale} variant="iphone-back-cover" /></ServiceBlock>
      <RepairProcess id="iphone-back-cover-replacement-steps" locale={locale} variant="iphone-back-cover" backgroundImage="/images/hands-closeup.png" />
      <ServiceBlock kind="checks"><IphoneScreenPostRepairChecks locale={locale} variant="iphone-back-cover" /></ServiceBlock>
      <ServiceBlock kind="quality"><IphoneQualitySection locale={locale} variant="iphone-back-cover" /></ServiceBlock>
      <PopularServices locale={locale} variant="other-services" excludeServiceKey="aizmugures-vacina-maina" />
      <ReviewsCompact locale={locale} reviewsSummary={reviewsSummary} variant="model" />

      {hasVisibleFaq && (
        <ServiceBlock kind="faq"><section className={s.section}>
          <div className={s.container}>


            {faqSections.map((section, index) => (
              <div
                key={`faq-group-${index}-${section.id}`}
                className={index > 0 ? s.stackLg : ''}
              >
                <Faq
                  id={`faq-group-${index + 1}`}
                  title={section.title || strings.faqTitle}
                  items={section.items}
                  headingLevel={2}
                  variant="accordion"
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </section></ServiceBlock>
      )}

      <QuickContactsSection locale={locale} id="iphone-locations" />

      <ServiceBlock kind="closing"><FinalCta id="pieteikties" locale={locale} variant="iphone" /></ServiceBlock>
    </ServiceRecovery>
  );
}
