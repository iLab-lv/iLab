import QuickContactsSection from '@/_components/sections/quick-contacts/QuickContactsSection';
import ServiceHero from '@/_components/sections/service-recovery/ServiceHero';
import ServiceRecovery, { ServiceBlock } from '@/_components/sections/service-recovery/ServiceRecovery';

import Process from '@/app/_components/sections/process/Process';
import Faq from '@/_components/sections/faq/ServiceFaq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';

import s from '@styles/Catalog.module.scss';

const SERVICE_IDS = ['camera-glass', 'camera'];

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';

export default function IphoneCameraServicePage({
  locale = 'lv',

  strings,

  devices = [],
  pricing = {},
  serviceMeta = {},
  selectedModel = null,

  allModelsHref,
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
        targetId="brand-list"
        targetLabel={strings.headerCtaLabel}
        placeholderLabel={strings.heroAlt}
      />

      <ServiceBlock kind="intro"><section className={s.section} aria-labelledby="intro-h2">
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
              <a href="#brand-list">{strings.selectedModelLink}</a>.
            </p>
          )}
        </div>
      </section></ServiceBlock>

      <ServiceBlock kind="priceBrowser"><section
        id="brand-list"
        className={s.section}
        aria-labelledby="brand-picker-h2"
      >
        <div className={s.container}>
          <h2 id="brand-picker-h2" className={s.h2} style={{ marginBottom: 12 }}>
            {strings.modelPickerTitle}
          </h2>

          <ServicePricelist
            devices={devices}
            pricing={pricing}
            serviceMeta={serviceMeta}
            brandSlug={BRAND_KEY}
            categorySlug={CATEGORY_KEY}
            serviceIds={SERVICE_IDS}
            title={strings.priceTitle}
            intro={strings.priceIntro}
            initialLimit={8}
            allModelsHref={allModelsHref}
            cta={{ label: strings.ctaLabel, href: '#pieteikties' }}
            selectedModel={selectedModel}
            locale={locale}
          />
        </div>
      </section></ServiceBlock>

      <Process
            id="process"
            title={strings.processTitle}
            headingLevel={2}
            variant="cards"
            steps={strings.processSteps}
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

      <QuickContactsSection locale={locale} id="iphone-locations" />

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