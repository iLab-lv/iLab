import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceHero from '@sections/device-hero/DeviceHero';
import Faq from '@sections/faq/Faq';
import QuickFacts from '@/_components/sections/quick-facts/QuickFacts';
import Reviews from '@/_components/sections/reviews/Reviews';
import PopularServices from '@/_components/sections/popular-services/PopularServices';
import WhyUs from '@/_components/sections/why-us/WhyUs';
import RepairProcess from '@/_components/sections/repair-process/RepairProcess';
import Guide from '@/_components/sections/guide/Guide';
import ProblemAnswers from '@/_components/sections/problem-answers/ProblemAnswers';
import QualitySection from '@/_components/sections/quality/QualitySection';
import RepairDecisionSection from '@/_components/sections/repair-decision/RepairDecisionSection';
import LandingLocations from '@/app/landings/_components/locations/LandingLocations';
import LandingCtaProvider from '@/app/landings/_components/ui/providers/LandingCtaProvider';

import { getPhotoRepairContent } from './photoRepairContent';
import LensRepairSection from './LensRepairSection';
import CameraBrandRepairSection from './CameraBrandRepairSection';
import s from '@styles/Catalog.module.scss';

export default function PhotoRepairPage({
  locale = 'lv',
  baseHref,
  siteSettings,
  reviewsSummary,
  heroImage,
  lensImage,
}) {
  const copy = getPhotoRepairContent(locale);
  const headings = locale === 'ru' ? {
    intro: { titleStart: 'Ремонт фотоаппаратов и ', titleAccent: 'фототехники', titleEnd: ' — что мы ремонтируем' },
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
    intro: { titleStart: 'Fotoaparātu un ', titleAccent: 'fototehnikas remonts', titleEnd: ' — ko mēs remontējam' },
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
  const faqItems = copy.faq.map(([q, a]) => ({ q, a }));
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
  const whyUsContent = {
    eyebrow: copy.why.eyebrow,
    ...headings.why,
    intro: copy.why.intro,
    points: copy.why.items.map((item) => [item.title, item.text]),
  };
  const qualityContent = {
    ...copy.quality,
    ...headings.quality,
    facts: locale === 'ru'
      ? ['Гарантия 90 дней', 'Цена до ремонта', 'Проверка после ремонта', 'Ремонт после диагностики']
      : ['90 dienu garantija', 'Cena pirms remonta', 'Pārbaude pēc remonta', 'Remonts pēc diagnostikas'],
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
    <>
      <PageHeader
        title={copy.h1}
        lead={copy.hero[0]}
        scrollCta={{ label: copy.scroll, targetId: 'photo-services' }}
        crumbs={breadcrumbs}
      />
      <DeviceHero
        image={heroImage}
        alt={copy.meta.imageAlt}
        focal="center"
        priority
        bodyHtml={`<p>${copy.hero[1]}</p>`}
      />
      <QuickFacts variant="photo" locale={locale} />
      <section className={`${s.section} ${s.introSection}`}>
        <div className={s.container}>
          <h2 className={s.h2}>{headings.intro.titleStart}<span>{headings.intro.titleAccent}</span>{headings.intro.titleEnd}</h2>
          {copy.intro.intro.map((paragraph) => <p className={s.paragraph} key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <PopularServices locale={locale} variant="photo" content={popularServicesContent} />
      <LensRepairSection content={{ ...copy.lenses, ...headings.lenses }} image={lensImage} />
      <CameraBrandRepairSection content={{ ...copy.brands, ...headings.brands }} />
      <ProblemAnswers id="photo-problems" content={problemAnswersContent} variant="photo" />
      <WhyUs locale={locale} variant="photo" content={whyUsContent} />
      <QualitySection id="photo-quality" content={qualityContent} />
      <RepairDecisionSection id="photo-decision" content={{ ...copy.decision, ...headings.decision }} />
      <Reviews locale={locale} reviewsSummary={reviewsSummary} />
      <LandingCtaProvider siteSettings={siteSettings}>
        <LandingLocations id="photo-locations" locale={locale} heading={copy.locations} />
      </LandingCtaProvider>
      <RepairProcess id="photo-repair-steps" locale={locale} variant="photo" content={processContent} backgroundImage="/images/hands-closeup.png" />
      <Guide id="photo-guide" locale={locale} variant="photo" content={guideContent} />
      <Faq id="photo-faq" title={copy.faqTitle} items={faqItems} />
    </>
  );
}
