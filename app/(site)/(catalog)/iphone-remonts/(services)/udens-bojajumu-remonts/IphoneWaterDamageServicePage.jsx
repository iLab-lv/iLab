import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';

import s from '@styles/Catalog.module.scss';

const SERVICE_IDS = ['water-damage-clean'];

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';

export default function IphoneWaterDamageServicePage({
  locale = 'lv',

  strings = {},

  devices = [],
  pricing = {},
  serviceMeta = {},
  selectedModel = null,

  allModelsHref,
  breadcrumbs = [],

  faqSections = [],
  hasVisibleFaq = false,
}) {
  const introList = Array.isArray(strings.introList) ? strings.introList : [];

  return (
    <>
      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        scrollCta={{ label: strings.headerCtaLabel, targetId: 'cenas' }}
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

          <p className={s.paragraph}>{strings.introP2}</p>

          {introList.length > 0 && (
            <ul className={s.list}>
              {introList.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          )}

          {strings.introP3 && (
            <p
              className={s.paragraph}
              dangerouslySetInnerHTML={{ __html: strings.introP3 }}
            />
          )}

          {selectedModel && (
            <p className={s.note}>
              {strings.selectedModelPrefix}{' '}
              <strong>{decodeURIComponent(selectedModel)}</strong>.{' '}
              {strings.selectedModelSuffix}{' '}
              <a href="#cenas">{strings.selectedModelLink}</a>.
            </p>
          )}
        </div>
      </section>

      <section id="cenas" className={s.section} aria-labelledby="prices-h2">
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
