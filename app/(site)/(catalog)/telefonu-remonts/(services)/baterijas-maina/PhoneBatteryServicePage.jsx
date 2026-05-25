import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import BrandPickerPricelist from '@components/service-pricelist/BrandPickerPricelist';

import s from '@styles/Catalog.module.scss';

const CATEGORY_KEY = 'telefonu-remonts';
const SERVICE_IDS = ['battery'];

export default function PhoneBatteryServicePage({
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
        focal="right"
        className="service"
        bodyHtml={strings.heroBodyHtml}
      />

      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
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
      </section>

      <section
        id="brand-list"
        className={s.section}
        aria-labelledby="brand-picker-h2"
      >
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
      </section>

      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title={strings.processTitle}
            steps={strings.processSteps}
            headingLevel={2}
            variant="cards"
            locale={locale}
          />
        </div>
      </section>

      <section className={s.section}>
        <Why locale={locale} />
      </section>

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

      <section
        id="pieteikties"
        className={s.section}
        aria-label={strings.applyAria}
      >
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}