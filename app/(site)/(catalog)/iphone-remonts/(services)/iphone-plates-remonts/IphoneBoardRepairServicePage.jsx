import Image from 'next/image';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
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
    <>
      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        scrollCta={{
          label: strings.headerCtaLabel,
          targetId: 'plates-diagnostika',
        }}
        crumbs={breadcrumbs}
      />

      <DeviceHero
        image={strings.heroImage}
        alt={strings.heroAlt}
        bodyHtml={strings.heroBodyHtml}
        focal="right"
        priority
      />

      <section
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
      </section>

      <Process locale={locale} />

      <Why locale={locale} />

      <section className={sCatalog.section} aria-labelledby="faq-h2">
        <div className={sCatalog.container}>
          <Faq
            id="iphone-board-repair-faq"
            title={strings.faqTitle}
            items={faqItems}
            variant="accordion"
            locale={locale}
          />
        </div>
      </section>

      <section id="pieteikties" aria-label={strings.applyAria}>
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}

