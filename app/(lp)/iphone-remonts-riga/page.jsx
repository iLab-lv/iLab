// app/ads/iphone-remonts/page.jsx

import Services from '@sections/services/Services';
import Reviews from '@sections/reviews/Reviews';
import Process from '@sections/process/Process';
import Why from '@sections/why/Why';
import Locations from '@sections/locations/Locations';
import Faq from '@sections/faq/Faq';
import AdsContactStrip from '../_components/AdsContactStrip';

import { FAQ_CONTEXT, getFaqItems } from '@/data/faq';
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
import IphoneAdsHero from './IphoneAdsHero';

const { items: IPHONE_ADS_FAQ_ITEMS } = getFaqItems(FAQ_CONTEXT.IPHONE_ADS);

export default function IphoneAdsLandingPage() {
  return (
    <>
      {/* New split-layout hero */}
      <IphoneAdsHero />
      <AdsContactStrip />

      {/* Services */}
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
                text: 'strauji krīt uzlādes līmenis, telefons izslēdzas pie 10–20%.',
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

      {/* Reviews */}
      <div id="reviews" />
      <Reviews />

      {/* Price teaser (anchor for secondary CTA) */}
      {/* <div id="price-teaser">
        <IphonePriceTeaser />
      </div> */}



      {/* Locations with map pins opening the panel */}
      <Locations openPanelOnPin />

      {/* Process & Why sections reused from main site */}
      <Process />
      <Why />

      {/* FAQ */}
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
