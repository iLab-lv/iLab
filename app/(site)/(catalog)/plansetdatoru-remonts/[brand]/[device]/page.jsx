import { notFound } from 'next/navigation';
import devices from '@/data/devices';
import devicePricing from '@/data/devicePricing';

import PriceList from '../../../../sections/pricing/PriceList';
import Services from '../../../../sections/services/Services';
import Why from '../../../../sections/home/Why';
import Faq from '../../../../sections/faq/Faq';
import ConvertBand from '../../../../sections/home/ConvertBand';

import s from '../../../iphone-remonts/[device]/Device.module.scss';

const MODEL_SERVICES = [
  { title: 'Displeja (ekrāna) maiņa', text: 'plaisas, plankumi, nereaģē skāriens.' },
  { title: 'Baterijas maiņa', text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.' },
  { title: 'Uzlādes ligzdas remonts', text: 'nenoturas kabelis, lēna uzlāde.' },
];

export async function generateMetadata({ params }) {
  const { device } = await params;
  const slug = decodeURIComponent(device);
  const d = devices.find(
    (x) => x.slug === slug && x.category === 'plansetdatoru-remonts'
  );
  const title = d ? `${d.name} remonts | iLab` : 'Planšetdatoru remonts | iLab';
  const description =
    d?.metaDescription ||
    'Planšetdatoru remonts: displejs, baterija, uzlāde, kamera. Bezmaksas diagnostika un garantija.';
  return { title, description, alternates: { canonical: `/plansetdatoru-remonts/${slug}` } };
}

export default async function Page({ params }) {
  const { device } = await params;
  const slug = decodeURIComponent(device);
  const d = devices.find(
    (x) => x.slug === slug && x.category === 'plansetdatoru-remonts'
  );
  if (!d) return notFound();

  const pricing = devicePricing[slug] || null;

  return (
    <>
      {/* Short intro with CTA to prices */}
      <section className={s.intro}>
        <div className={s.container}>
          <div className={s.head}>
            <h2 className={s.h2}>{d.name}</h2>
            {d.year && <div className={s.meta}>Izlaists: {d.year}</div>}
          </div>
          <div className={s.leadRow}>
            {d.image && (<img src={d.image} alt={d.name} className={s.img} loading="lazy" />)}
            <div className={s.leadCopy}>
              <p>
                Remontējam {d.name} — displejs, baterija, uzlāde, kamera. Bezmaksas diagnostika un 90 dienu garantija.
              </p>
              <div className={s.ctaRow}>
                <a href="#cenas" className={s.btnPrimary}>Skatīt cenas</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {pricing && (
        <PriceList id="cenas" title="Cenas un remonta laiks" items={pricing.items} currency={pricing.currency} />
      )}

      <Services id="model-services" title="Populārākie remonti šim modelim" items={MODEL_SERVICES} headingLevel={2} variant="list" />
      <Why />
      <Faq id="tablet-model-faq" title="Biežāk uzdotie jautājumi" items={[
        { q: 'Vai diagnostika ir bez maksas?', a: 'Jā, sākotnējā diagnostika ir bez maksas.' },
        { q: 'Cik ilgi parasti aizņem remonts?', a: 'Bieži tajā pašā dienā; atkarīgs no bojājuma.' },
      ]} headingLevel={2} variant="accordion" />
      <ConvertBand />
    </>
  );
}
