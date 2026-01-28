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

import IphonePriceTeaser from './IphonePriceTeaser';
import AdsHero from '../_components/AdsHero';

const { items: IPHONE_ADS_FAQ_ITEMS } = getFaqItems(FAQ_CONTEXT.IPHONE_ADS);

export default function IphoneAdsLandingPage() {
  return (
    <>
      {/* New split-layout hero */}
      <AdsHero />
      <AdsContactStrip />

      {/* Reviews */}
      <div id="reviews" />
      <Reviews />

      <Process />

      {/* Services */}
            {/* Issues / symptoms (policy-safe wording) */}
      <section id="issues" className={s.section} aria-labelledby="ads-issues-h2">
        <div className={s.container}>
          <Services
            id="ads-issues"
            title="Ar ko varam palīdzēt"
            items={[
              {
                title: 'Attēla vai skāriena traucējumi',
                text: 'pazūd attēls, mirgo, nereaģē skāriens vai parādās plankumi.',
                icon: LuSmartphone,
              },
              {
                title: 'Uzlādes un enerģijas traucējumi',
                text: 'ātri izlādējas, uzlāde ir nestabila vai ierīce izslēdzas pie maza %.',
                icon: LuBatteryCharging,
              },
              {
                title: 'Uzlādes darbības traucējumi',
                text: 'ierīce neuzlādējas, uzlāde ir lēna vai tiek pārtraukta.',
                icon: LuPlugZap,
              },
              {
                title: 'Kameras darbības traucējumi',
                text: 'miglains attēls, problēmas ar fokusēšanos vai kamera neatveras.',
                icon: LuCamera,
              },
              {
                title: 'Skaņas traucējumi',
                text: 'klusa, kropļota skaņa vai sarunas laikā slikti dzird.',
                icon: LuVolume2,
              },
              {
                title: 'Pēc mitruma iedarbības',
                text: 'veicam diagnostiku un izvērtējam iespējamos risinājumus uz vietas.',
                icon: LuDroplets,
              },
            ]}
          />
        </div>
      </section>


      

      {/* Price teaser (anchor for secondary CTA) */}
      {/* <div id="price-teaser">
        <IphonePriceTeaser />
      </div> */}



      {/* Locations with map pins opening the panel */}
      <Locations openPanelOnPin />

      {/* Process & Why sections reused from main site */}
      
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
