import QuickContactsSection from '@/_components/sections/quick-contacts/QuickContactsSection';
import ServiceHero from '@/_components/sections/service-recovery/ServiceHero';
import ServiceRecovery, { ServiceBlock } from '@/_components/sections/service-recovery/ServiceRecovery';

import Faq from '@/_components/sections/faq/ServiceFaq';
import QuickAnswer from '@/_components/sections/quick-answer/QuickAnswer';
import QuickFacts from '@/_components/sections/quick-facts/QuickFacts';
import RepairProcess from '@/_components/sections/repair-process/RepairProcess';
import PopularServices from '@/_components/sections/popular-services/PopularServices';
import ReviewsCompact from '@/_components/sections/reviews/ReviewsCompact';
import FinalCta from '@/_components/sections/final-cta/FinalCta';
import {
  WaterDiagnosticPrice,
  WaterEffects,
  WaterEmergency,
  WaterModelLinks,
  WaterProtection,
  WaterTechnical,
} from '@/_components/page-sections/iphone-water-damage/WaterDamageSections';

import s from '@styles/Catalog.module.scss';

export default function IphoneWaterDamageServicePage({
  locale = 'lv', strings = {}, breadcrumbs = [], faqSections = [],
  hasVisibleFaq = false, reviewsSummary = null,
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
        targetId="cenas"
        targetLabel={strings.headerCtaLabel}
        placeholderLabel={strings.heroAlt}
      ><QuickFacts locale={locale} variant="iphone-water-damage" /></ServiceHero>

      <ServiceBlock kind="answer"><QuickAnswer locale={locale} variant="iphone-water-damage" /></ServiceBlock>

      <ServiceBlock kind="editorial"><WaterProtection locale={locale} /></ServiceBlock>
      <ServiceBlock kind="waterEmergency"><WaterEmergency locale={locale} /></ServiceBlock>
      <ServiceBlock kind="rows"><WaterEffects locale={locale} /></ServiceBlock>
      <ServiceBlock kind="price"><WaterDiagnosticPrice locale={locale} /></ServiceBlock>
      <RepairProcess id="iphone-water-damage-steps" locale={locale} variant="iphone-water-damage" backgroundImage="/images/hands-closeup.png" />
      <ServiceBlock kind="waterTechnical"><WaterTechnical locale={locale} /></ServiceBlock>
      <ServiceBlock kind="links"><WaterModelLinks locale={locale} /></ServiceBlock>
      <ReviewsCompact locale={locale} reviewsSummary={reviewsSummary} variant="model" />
      <PopularServices locale={locale} variant="other-services" excludeServiceKey="udens-bojajumu-remonts" />

      {hasVisibleFaq && (
        <ServiceBlock kind="faq"><section className={s.section}>
          <div className={s.container}>

            {faqSections.map((section, index) => (
              <div key={`faq-group-${index}-${section.id}`} className={index > 0 ? s.stackLg : ''}>
                <Faq id={`faq-group-${index + 1}`} title={section.title || strings.faqTitle} items={section.items} headingLevel={2} variant="accordion" locale={locale} />
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
