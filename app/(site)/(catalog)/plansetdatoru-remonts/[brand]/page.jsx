import { notFound } from 'next/navigation';
import devicesAll from '@/data/devices';
import Services from '@sections/services/Services';
import CommonIssues from '@sections/common-issues/CommonIssues';
import { tabletIssues } from '@/data/commonIssues';
import ModelGrid from '@components/model-grid/ModelGrid';
import s from '@/(site)/iphone-remonts/IphoneRemonts.module.scss';

export const dynamicParams = true;

export default async function BrandPage({ params }) {
  const { brand } = await params;
  const brandSlug = decodeURIComponent(brand).toLowerCase();

  const devices = devicesAll.filter(
    (d) => d.category === 'plansetdatoru-remonts' && d.brandSlug === brandSlug
  );
  if (devices.length === 0) return notFound();

  const TABLET_SERVICES = [
    { title: 'Displeja (ekrāna) maiņa', text: 'plaisas, plankumi, nereaģē skāriens.' },
    { title: 'Baterijas maiņa', text: 'strauji krīt uzlāde, negaidīti izslēdzas.' },
    { title: 'Uzlādes ligzda', text: 'nenoturas kabelis, lēna uzlāde.' },
  ];

  return (
    <>
      <section className={s.section} aria-labelledby="brand-services-title">
        <div className={s.container}>
          <Services id="brand-services" title="Populārākie remonti" items={TABLET_SERVICES} headingLevel={2} variant="list" />
        </div>
      </section>

      <CommonIssues id="brand-issues" title="Biežāk sastopamās problēmas" items={tabletIssues} headingLevel={2} />

      <section id="plansetu-modeli" className={s.anchorTarget} aria-labelledby="brand-models-h2">
        <div className={s.container}>
          <h2 id="brand-models-h2" className={s.h2}>Izvēlies modeli</h2>
          {/* On brand page we want /plansetdatoru-remonts/[brand]/[device] */}
          <ModelGrid devices={devices} baseHref={`/plansetdatoru-remonts/${brandSlug}`} />
        </div>
      </section>
    </>
  );
}
