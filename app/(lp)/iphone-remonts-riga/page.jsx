import Services from '@sections/services/Services';
import Reviews from '@sections/reviews/Reviews';
import Process from '@sections/process/Process';
import Why from '@sections/why/Why';
import Locations from '@sections/locations/Locations';
import Faq from '@sections/faq/Faq';
import AdsContactStrip from '../_components/AdsContactStrip';

import { FAQ_CONTEXT, getFaqItems } from '@/data/faq';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import { getSiteSettings } from '@/lib/siteSettings';
import s from '@styles/Catalog.module.scss';

import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

import IphonePriceTeaser from '../_components/IphonePriceTeaser';
import IphoneAdsHero from '../_components/IphoneAdsHero';

const { items: IPHONE_ADS_FAQ_ITEMS } = getFaqItems(FAQ_CONTEXT.IPHONE_ADS);

export default async function IphoneAdsLandingPage() {
  const [reviewsSummary, siteSettings] = await Promise.all([
    getReviewsSummary(),
    getSiteSettings(),
  ]);

  return (
    <>
      <IphoneAdsHero
        locale="lv"
        reviewsSummary={reviewsSummary}
        primaryCta={{
          label: 'Pakalpojumu cenas',
          href: '#price-teaser',
          variant: 'primary',
          ariaLabel: 'Skatīt pakalpojumu cenas',
        }}
      />

      <AdsContactStrip />

      <section id="services" className={s.section} aria-labelledby="iphone-services-h2">
        <div className={s.container}>
          <Services
            id="iphone-services"
            title="Populārākie bojājumi"
            items={[
              {
                title: 'Ekrāna (displeja) maiņa',
                text: 'plaisas, tumši plankumi, nereaģē skārienekrāns.',
                icon: LuSmartphone,
              },
              {
                title: 'Akumulatora maiņa',
                text: 'strauji krīt uzlādes līmenis, telefons izslēdzas pie 10-20%.',
                icon: LuBatteryCharging,
              },
              {
                title: 'Uzlādes ligzda',
                text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
                icon: LuPlugZap,
              },
              {
                title: 'Kamera',
                text: 'miglaini attēli, problēmas ar fokusēšanos.',
                icon: LuCamera,
              },
              {
                title: 'Skaļruņi/mikrofons',
                text: 'klusa vai kropļota skaņa, sarunas laikā slikti dzird.',
                icon: LuVolume2,
              },
              {
                title: 'Ūdens bojājumi',
                text: 'diagnostika un remonts pēc saskares ar šķidrumu (ja ierīci iespējams atjaunot).',
                icon: LuDroplets,
              },
            ]}
          />
        </div>
      </section>

      <div id="reviews" />
      <Reviews locale="lv" />

      <div id="price-teaser">
        <IphonePriceTeaser />
      </div>

      <Locations
        locale="lv"
        locations={siteSettings?.locations || []}
        pinPositions={siteSettings?.pinPositions || {}}
        openPanelOnPin
      />

      <Process locale="lv" />
      <Why locale="lv" />

      <section className={s.section} aria-labelledby="iphone-ads-faq-h2">
        <div className={s.container}>
          <Faq
            id="iphone-ads-faq"
            title="Biežāk uzdotie jautājumi par iPhone remontiem"
            items={IPHONE_ADS_FAQ_ITEMS}
          />
        </div>
      </section>
    </>
  );
}