import FullLocations from '@/_components/sections/full-locations/FullLocations';
import QuickTrustFacts from '@/_components/sections/quick-facts/QuickTrustFacts';
import { getQuickTrustFacts } from '@/_components/sections/quick-facts/quickTrustFacts.content';
import Faq from '@/_components/sections/faq/ServiceFaq';
import Reviews from '@/_components/sections/reviews/Reviews';
import PopularServices from '@/_components/sections/popular-services/PopularServices';
import EditorialWhy from '@/_components/sections/why/EditorialWhy';
import RepairProcess from '@/_components/sections/repair-process/RepairProcess';
import Guide from '@/_components/sections/guide/Guide';
import ProblemAnswers from '@/_components/sections/problem-answers/ProblemAnswers';
import QualitySection from '@/_components/sections/quality/QualitySection';
import RepairDecisionSection from '@/_components/sections/repair-decision/RepairDecisionSection';
import ServiceHero from '@/_components/sections/service-recovery/ServiceHero';
import ServiceRecovery, { ServiceBlock } from '@/_components/sections/service-recovery/ServiceRecovery';
import FinalCta from '@/_components/sections/final-cta/FinalCta';

import { getPhotoRepairContent } from './photoRepairContent';
import LensRepairSection from './LensRepairSection';
import CameraBrandRepairSection from './CameraBrandRepairSection';
import s from '@styles/Catalog.module.scss';
import photoStyles from './PhotoRepairSections.module.scss';

export default function PhotoRepairPage({
  locale = 'lv',
  faqItems = [],
  faqTitle,
  baseHref,
  siteSettings,
  reviewsSummary,
  heroImage,
  lensImage,
}) {
  const copy = getPhotoRepairContent(locale);
  const headings = locale === 'ru' ? {
    intro: { titleStart: 'Ремонт фотоаппаратов и ', titleAccent: 'фототехники', titleEnd: ' - что мы ремонтируем' },
    services: { titleStart: 'Популярные виды ', titleAccent: 'ремонта фотоаппаратов' },
    lenses: { titleStart: 'Ремонт объективов ', titleAccent: 'в Риге' },
    brands: { titleStart: 'Ремонт фотоаппаратов ', titleAccent: 'Canon, Nikon и Sony' },
    problems: { titleStart: 'Что случилось с ', titleAccent: 'фотоаппаратом?' },
    why: { titleStart: 'Почему клиенты выбирают ', titleAccent: 'iLab?' },
    quality: { titleStart: 'Ремонт фотоаппаратов с ', titleAccent: 'проверкой после работы' },
    decision: { titleStart: 'Ремонт, замена детали или ', titleAccent: 'углублённая диагностика?' },
    process: { titleStart: 'Как проходит ', titleAccent: 'ремонт фотоаппаратов' },
    guide: { titleStart: 'Что важно знать перед ', titleAccent: 'ремонтом фотоаппарата' },
  } : {
    intro: { titleStart: 'Fotoaparātu un ', titleAccent: 'fototehnikas remonts', titleEnd: ' - ko mēs remontējam' },
    services: { titleStart: 'Populārākie ', titleAccent: 'fotoaparātu remonti' },
    lenses: { titleStart: 'Objektīvu ', titleAccent: 'remonts Rīgā' },
    brands: { titleStart: 'Canon, Nikon un Sony ', titleAccent: 'fotoaparātu remonts' },
    problems: { titleStart: 'Kas noticis ar ', titleAccent: 'fotoaparātu?' },
    why: { titleStart: 'Kāpēc klienti izvēlas ', titleAccent: 'iLab?' },
    quality: { titleStart: 'Fotoaparātu remonts ar ', titleAccent: 'pārbaudi pēc darba' },
    decision: { titleStart: 'Remonts, detaļas maiņa vai ', titleAccent: 'dziļāka diagnostika?' },
    process: { titleStart: 'Kā notiek ', titleAccent: 'fotoaparātu remonts' },
    guide: { titleStart: 'Fotoaparātu remonta ', titleAccent: 'ceļvedis' },
  };
  const breadcrumbs = [
    { label: copy.home, href: locale === 'ru' ? '/ru' : '/' },
    { label: copy.breadcrumb, href: baseHref },
  ];
  const popularServicesContent = {
    copy: {
      ...headings.services,
      intro: copy.services.intro,
      noteLabel: locale === 'ru' ? 'Примечание мастера:' : 'Meistara piezīme:',
    },
    services: copy.services.items.map((item) => ({
      title: item.title,
      description: item.text,
      note: item.note,
      price: item.meta,
    })),
  };
  const whyContent = {
    eyebrow: copy.why.eyebrow,
    title: copy.why.title,
    subtitle: copy.why.intro,
    entries: copy.why.items.map(({ title, text }) => ({ title, description: text })),
  };
  const qualityContent = {
    ...copy.quality,
    ...headings.quality,
    facts: locale === 'ru'
      ? ['Гарантия до 1 года', 'Цена до ремонта', 'Проверка после ремонта', 'Ремонт после диагностики']
      : ['Garantija līdz 1 gadam', 'Cena pirms remonta', 'Pārbaude pēc remonta', 'Remonts pēc diagnostikas'],
  };
  const problemAnswersContent = {
    eyebrow: copy.problems.eyebrow,
    ...headings.problems,
    labels: [copy.problems.cause, copy.problems.action],
    problems: copy.problems.items,
  };
  const processContent = {
    eyebrow: copy.process.eyebrow,
    ...headings.process,
    intro: copy.process.intro,
    steps: copy.process.items.map((item) => [item.title, item.text]),
  };
  const guideContent = {
    eyebrow: locale === 'ru' ? 'Полезная информация' : 'Noderīga informācija',
    ...headings.guide,
    intro: copy.guide.intro,
    cards: copy.guide.items,
  };

  return (
    <ServiceRecovery>
      <ServiceHero
        locale={locale}
        title={copy.h1 === 'Ремонт фотоаппаратов в Риге'
          ? <><span>Ремонт</span>{' '}<span>фото<span className={photoStyles.mobileTitleBreak}>{'\u00ad'}</span>аппаратов</span>{' '}<span>в Риге</span></>
          : copy.h1}
        lead={copy.hero[0]}
        crumbs={breadcrumbs}
        image={heroImage}
        imageAlt={copy.meta.imageAlt}
        bodyHtml={`<p>${copy.hero[1]}</p>`}
        targetId="photo-services"
        targetLabel={copy.scroll}
        placeholderLabel={copy.meta.imageAlt}
      ><QuickTrustFacts {...getQuickTrustFacts("photo", locale)} /></ServiceHero>

      <ServiceBlock kind="intro"><section className={`${s.section} ${s.introSection}`}>
        <div className={s.container}>
          <h2 className={s.h2}>{headings.intro.titleStart}<span>{headings.intro.titleAccent}</span>{headings.intro.titleEnd}</h2>
          {copy.intro.intro.map((paragraph) => <p className={s.paragraph} key={paragraph}>{paragraph}</p>)}
        </div>
      </section></ServiceBlock>
      <PopularServices locale={locale} variant="photo" content={popularServicesContent} />
      <LensRepairSection content={{ ...copy.lenses, ...headings.lenses }} image={lensImage} />
      <CameraBrandRepairSection content={{ ...copy.brands, ...headings.brands }} />
      <ServiceBlock kind="problems"><ProblemAnswers id="photo-problems" content={problemAnswersContent} variant="photo" /></ServiceBlock>
      <ServiceBlock kind="photoWhy"><EditorialWhy {...whyContent} /></ServiceBlock>
      <ServiceBlock kind="quality"><QualitySection id="photo-quality" content={qualityContent} /></ServiceBlock>
      <ServiceBlock kind="photoDecision"><RepairDecisionSection id="photo-decision" content={{ ...copy.decision, ...headings.decision }} /></ServiceBlock>
      <Reviews locale={locale} reviewsSummary={reviewsSummary} />
      <FullLocations id="photo-locations" locale={locale} title={copy.locations.titleMain + copy.locations.titleAccent} subtitle={copy.locations.subtitle} locations={siteSettings?.locations || []} pinPositions={siteSettings?.pinPositions || {}} defaultHours={siteSettings?.hours || []} />
      <RepairProcess id="photo-repair-steps" locale={locale} variant="photo" content={processContent} backgroundImage="/images/hands-closeup.png" />
      <ServiceBlock kind="guide"><Guide id="photo-guide" locale={locale} variant="photo" content={guideContent} /></ServiceBlock>
      <ServiceBlock kind="faq"><Faq id="photo-faq" title={faqTitle || copy.faqTitle} items={faqItems} /></ServiceBlock>
      <ServiceBlock kind="closing"><FinalCta id="photo-final-cta" locale={locale} /></ServiceBlock>
    </ServiceRecovery>
  );
}
