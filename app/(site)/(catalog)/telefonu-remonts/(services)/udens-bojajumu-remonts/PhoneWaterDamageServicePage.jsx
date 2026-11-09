import QuickContactsSection from '@/_components/sections/quick-contacts/QuickContactsSection';
import ServiceHero from '@/_components/sections/service-recovery/ServiceHero';
import ServiceRecovery, { ServiceBlock } from '@/_components/sections/service-recovery/ServiceRecovery';

import Process from '@/app/_components/sections/process/Process';
import Faq from '@/_components/sections/faq/ServiceFaq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import BrandPickerPricelist from '@components/service-pricelist/BrandPickerPricelist';

import s from '@styles/Catalog.module.scss';

const CATEGORY_KEY = 'telefonu-remonts';

const SERVICE_IDS = ['water-damage-clean'];

export default function PhoneWaterDamageServicePage({
  locale = 'lv',

  strings,

  devices = [],
  brandOptions = [],
  defaultBrand = 'samsung',
  selectedModel = null,

  breadcrumbs = [],

  faqSections = [],
  hasVisibleFaq = false,
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
      />

      <ServiceBlock kind="intro"><section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h2 id="intro-h2" className={s.h2}>
            {strings.introTitle}
          </h2>

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP1 }}
          />

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP2 }}
          />

          {selectedModel && (
            <p className={s.note}>
              {strings.selectedModelPrefix}{' '}
              <strong>{decodeURIComponent(selectedModel)}</strong>.{' '}
              {strings.selectedModelSuffix}{' '}
              <a href="#cenas">{strings.selectedModelLink}</a>.
            </p>
          )}
        </div>
      </section></ServiceBlock>

      <ServiceBlock kind="priceBrowser"><section id="cenas" className={s.section} aria-labelledby="brand-picker-h2">
        <div className={s.container}>
          <h2 id="brand-picker-h2" className={s.h2} style={{ marginBottom: 12 }}>
            {strings.brandPickerTitle}
          </h2>

          <BrandPickerPricelist
            devices={devices}
            pricingSource="firestore"
            brandOptions={brandOptions}
            defaultBrand={defaultBrand}
            categorySlug={CATEGORY_KEY}
            serviceIds={SERVICE_IDS}
            title={strings.pricelistTitle}
            intro={strings.pricelistIntro}
            allModelsHref={strings.allModelsHref}
            cta={{ label: strings.ctaLabel, href: '#pieteikties' }}
            className={s.section}
            locale={locale}
          />
        </div>
      </section></ServiceBlock>

      <Process
            id="process"
            title={strings.processTitle}
            steps={strings.processSteps}
            headingLevel={2}
            variant="cards"
            locale={locale}
          />

      <ServiceBlock kind="benefits"><section className={s.section}>
        <Why locale={locale} />
      </section></ServiceBlock>

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

      <QuickContactsSection locale={locale} />

      <ServiceBlock kind="genericClosing"><section
        id="pieteikties"
        className={s.section}
        aria-label={strings.applyAria}
      >
        <div className={s.container}>
          <ConvertBand locale={locale} />
        </div>
      </section></ServiceBlock>
    </ServiceRecovery>
  );
}