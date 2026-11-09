import QuickContactsSection from '@/_components/sections/quick-contacts/QuickContactsSection';
import QuickTrustFacts from '@/_components/sections/quick-facts/QuickTrustFacts';
import { getQuickTrustFacts } from '@/_components/sections/quick-facts/quickTrustFacts.content';
import { dedupeAndSort } from '@/app/(site)/components/device-grid/deviceGrid.groups';
import BrandHero from '@/_components/sections/catalog-brand/BrandHero';
import BrandServices from '@/_components/sections/catalog-brand/BrandServices';
import brand from '@/_components/sections/catalog-brand/CatalogBrand.module.scss';
import skin from '@/_components/sections/catalog-hub/CatalogHubSkin.module.scss';
import DeviceSelector from '@sections/device-selector/DeviceSelector';
import Process from '@/app/_components/sections/process/Process';
import Faq from '@/_components/sections/faq/ServiceFaq';
import ConvertBand from '@sections/convert-band/ConvertBand';
import Reviews from '@/app/_components/sections/reviews/ServiceReviews';


const CATEGORY_KEY = 'telefonu-remonts';

export default function PhoneBrandPage({
  locale = 'lv',

  page,
  brandSlug,
  devicesAll = [],
  seriesMeta,
  brandPhoneList = [],
  baseHref,

  headerTitle,
  headerLead,
  breadcrumbs = [],

  strings,
  processSteps = [],
  popularRepairs = [],

  hasVisibleFaq = false,
  faqTitle,
  faqItems = [],
}) {
  if (!page) {
    return null;
  }

  return (
    <div data-catalog-brand>
      <BrandHero
        title={headerTitle}
        lead={headerLead}
        crumbs={breadcrumbs}
        locale={locale}
        image={page.hero?.image || '/images/categories/telefonu_remonts.webp'}
        imageAlt={strings.heroAlt}
        targetId="brand-modeli"
        targetLabel={strings.scrollCta?.label}
        bodyHtml={strings.heroHtml}
      >
        <QuickTrustFacts id="why" {...getQuickTrustFacts("phone", locale)} />
      </BrandHero>

      <section className={`${skin.section} ${brand.intro}`} aria-labelledby="brand-intro-h2">
        <header>
          <h2 id="brand-intro-h2">
            {strings.introTitle}
          </h2>

        </header>
        <div className={brand.prose}>
          <p
            dangerouslySetInnerHTML={{ __html: strings.introLead }}
          />

          <p
            dangerouslySetInnerHTML={{ __html: strings.introParagraph }}
          />
        </div>
      </section>

      <BrandServices
        title={strings.servicesTitle}
        items={popularRepairs}
        locale={locale}
        modelAction={dedupeAndSort(devicesAll, brandSlug, CATEGORY_KEY).length > 0 ? { href: '#brand-modeli', label: strings.scrollCta?.label } : undefined}
      />

      <DeviceSelector
        variant="brand"
        id="brand-modeli"
        locale={locale}
        title={strings.modelGridHeading}
        intro={strings.modelGridIntro}
        devices={devicesAll}
        baseHref={baseHref}
        brandKey={brandSlug}
        categoryKey={CATEGORY_KEY}
        seriesMeta={seriesMeta}
        initialLimit={4}
        autoExpandOnSearch
      />

      <section className={`${skin.section} ${brand.note}`}>
        <div>
          <p style={{ marginTop: 0 }}>
            {strings.modelsNote}
          </p>

          {brandPhoneList.length === 0 && (
            <p style={{ opacity: 0.8, marginTop: 16 }}>{strings.noModels}</p>
          )}
        </div>
      </section>

      {page.sections?.hasReviews && (
        <Reviews locale={locale} />
      )}

      <div id="process-h2" className={brand.anchor} />

      {(page.sections?.hasProcess || processSteps.length > 0) && (
        <Process
              id="process"
              title={strings.processTitle}
              steps={processSteps}
              headingLevel={2}
              variant="cards"
              locale={locale}
            />
      )}

      {hasVisibleFaq && (
        <div data-service-section="faq" className={skin.block}>

            <Faq
              id="brand-faq"
              title={faqTitle}
              items={faqItems}
              headingLevel={2}
              variant="accordion"
              locale={locale}
            />
        </div>
      )}

      <QuickContactsSection locale={locale} />

      {page.sections?.hasConvertBand && (
        <div className={`${skin.block} ${skin.closing} ${skin.genericClosing}`}><section>
          <ConvertBand locale={locale} />
        </section></div>
      )}
    </div>
  );
}
