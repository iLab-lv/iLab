import QuickContactsSection from '@/_components/sections/quick-contacts/QuickContactsSection';
import Image from 'next/image';

import ServiceHero from '@/_components/sections/service-recovery/ServiceHero';
import ServiceRecovery, { ServiceBlock } from '@/_components/sections/service-recovery/ServiceRecovery';

import Process from '@/app/_components/sections/process/Process';
import Faq from '@/_components/sections/faq/ServiceFaq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import sCatalog from '@styles/Catalog.module.scss';
import s from './IphoneBoardRepairServicePage.module.scss';

export default function IphoneBoardRepairServicePage({
  locale = 'lv',
  strings,
  breadcrumbs = [],
  faqItems = [],
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
        targetId="plates-diagnostika"
        targetLabel={strings.headerCtaLabel}
        placeholderLabel={strings.heroAlt}
      />

      <ServiceBlock kind="board"><section
        id="plates-diagnostika"
        className={s.section}
        aria-labelledby="plates-diagnostika-h2"
      >
        <div className={s.container}>
          <h2 id="plates-diagnostika-h2" className={s.h2}>
            {strings.contentTitle}
          </h2>
          <p className={s.intro}>{strings.contentIntro}</p>

          <div className={s.contentGrid}>
            <article className={s.contentRow}>
              <div className={s.media}>
                <Image
                  src={strings.firstImage}
                  alt={strings.firstImageAlt}
                  fill
                  sizes="(max-width: 959px) 100vw, 520px"
                />
              </div>

              <div className={s.copy}>
                <h3 className={s.h2}>{strings.firstBlockTitle}</h3>
                {strings.firstBlockParagraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
                <ul className={s.list}>
                  {strings.symptoms.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>

            <article className={`${s.contentRow} ${s.contentRowReverse}`}>
              <div className={s.media}>
                <Image
                  src={strings.secondImage}
                  alt={strings.secondImageAlt}
                  fill
                  sizes="(max-width: 959px) 100vw, 520px"
                />
              </div>

              <div className={s.copy}>
                <h3 className={s.h2}>{strings.secondBlockTitle}</h3>
                {strings.secondBlockParagraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
                <ul className={s.list}>
                  {strings.workItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section></ServiceBlock>

      <Process locale={locale} />

      <ServiceBlock kind="benefits"><Why locale={locale} /></ServiceBlock>

      <ServiceBlock kind="faq"><section className={sCatalog.section} aria-labelledby="faq-h2">
        <div className={sCatalog.container}>
          <Faq
            id="iphone-board-repair-faq"
            title={strings.faqTitle}
            items={faqItems}
            variant="accordion"
            locale={locale}
          />
        </div>
      </section></ServiceBlock>

      <QuickContactsSection locale={locale} id="iphone-locations" />

      <ServiceBlock kind="genericClosing"><section id="pieteikties" aria-label={strings.applyAria}>
        <ConvertBand locale={locale} />
      </section></ServiceBlock>
    </ServiceRecovery>
  );
}

