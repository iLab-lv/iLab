import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Faq from '@sections/faq/Faq';
import QuickAnswer from '@/_components/sections/quick-answer/QuickAnswer';
import QuickFacts from '@/_components/sections/quick-facts/QuickFacts';
import RepairProcess from '@/_components/sections/repair-process/RepairProcess';
import PopularServices from '@/_components/sections/popular-services/PopularServices';
import ReviewsCompact from '@/_components/sections/reviews/ReviewsCompact';
import IphoneLocationsSection from '@/_components/page-sections/iphone-remonts/locations/IphoneLocationsSection';
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
    <>
      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        scrollCta={{ label: strings.headerCtaLabel, targetId: 'cenas' }}
        crumbs={breadcrumbs}
      />
      <DeviceHero image={strings.heroImage} alt={strings.heroAlt} focal="right" className="service" bodyHtml={strings.heroBodyHtml} />

      <QuickAnswer locale={locale} variant="iphone-water-damage" />
      <QuickFacts locale={locale} variant="iphone-water-damage" />
      <WaterProtection locale={locale} />
      <WaterEmergency locale={locale} />
      <WaterEffects locale={locale} />
      <WaterDiagnosticPrice locale={locale} />
      <RepairProcess id="iphone-water-damage-steps" locale={locale} variant="iphone-water-damage" backgroundImage="/images/hands-closeup.png" />
      <WaterTechnical locale={locale} />
      <WaterModelLinks locale={locale} />
      <ReviewsCompact locale={locale} reviewsSummary={reviewsSummary} />
      <IphoneLocationsSection locale={locale} variant="iphone-water-damage" />
      <PopularServices locale={locale} variant="other-services" excludeServiceKey="udens-bojajumu-remonts" />

      {hasVisibleFaq && (
        <section className={s.section} aria-labelledby="faq-h2">
          <div className={s.container}>
            <h2 id="faq-h2" className={s.h2}>{strings.faqTitle}</h2>
            {faqSections.map((section, index) => (
              <div key={`faq-group-${index}-${section.id}`} className={index > 0 ? s.stackLg : ''}>
                <Faq id={`faq-group-${index + 1}`} title={section.title} items={section.items} headingLevel={3} variant="accordion" locale={locale} />
              </div>
            ))}
          </div>
        </section>
      )}

      <FinalCta id="pieteikties" locale={locale} variant="iphone" />
    </>
  );
}
