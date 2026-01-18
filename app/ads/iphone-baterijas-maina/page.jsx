// app/ads/iphone-baterijas-maina/page.jsx

import Services from '@sections/services/Services';
import Reviews from '@sections/reviews/Reviews';
import Process from '@sections/process/Process';
import Why from '@sections/why/Why';
import Locations from '@sections/locations/Locations';
import Faq from '@sections/faq/Faq';

import { FAQ_CONTEXT, getFaqItems } from '@/data/faq';
import s from '@styles/Catalog.module.scss';

import {
  LuBatteryCharging,
  LuBatteryLow,
  LuPowerOff,
  LuClock,
  LuHeartPulse,
  LuThermometer,
} from 'react-icons/lu';

import IphoneAdsHero from '../iericu-serviss/IphoneAdsHero';
import IphonePriceTeaser from '../iericu-serviss/IphonePriceTeaser';

// If you don’t have a dedicated FAQ yet, reuse ads FAQ for now
const { items: IPHONE_BATTERY_ADS_FAQ_ITEMS } = getFaqItems(
  FAQ_CONTEXT.IPHONE_ADS,
);

export default function IphoneBatteryReplacementAdsLandingPage() {
  return (
    <>
      {/* Hero */}
      <IphoneAdsHero
        title="iPhone baterijas maiņa Rīgā"
        subtitle={
          <>
            Telefons ātri izlādējas vai pēkšņi izslēdzas? Nomainām bateriju tajā pašā dienā.
            90&nbsp;dienu garantija, divi servisa centri&nbsp;Rīgā – Domina un Spice Home.
          </>
        }
        imageSrc="/images/categories/baterijas_maina.webp"
        imageAlt="iPhone baterijas maiņa iLab servisa centros Rīgā"
        secondaryCta={{
          label: 'Baterijas problēmas',
          href: '#services',
          variant: 'secondary',
          ariaLabel: 'Skatīt biežākās iPhone baterijas problēmas',
        }}
        primaryCta={{
          label: 'Uzzināt cenu',
          href: '#price-teaser',
          variant: 'primary',
          ariaLabel: 'Uzzināt iPhone baterijas maiņas cenu',
        }}
        headingId="iphone-battery-hero-title"
      />

      {/* Common battery problems */}
      <section
        id="services"
        className={s.section}
        aria-labelledby="iphone-battery-services-h2"
      >
        <div className={s.container}>
          <Services
            id="iphone-battery-services"
            title="Biežākās iPhone baterijas problēmas"
            items={[
              {
                title: 'Ātri izlādējas',
                text: 'baterija neiztur pat pusi dienas.',
                icon: LuBatteryLow,
              },
              {
                title: 'Izslēdzas pie 10–20%',
                text: 'telefons pēkšņi izslēdzas, lai gan uzlāde vēl ir.',
                icon: LuPowerOff,
              },
              {
                title: 'Lēna uzlāde',
                text: 'uzlāde notiek ievērojami ilgāk nekā agrāk.',
                icon: LuClock,
              },
              {
                title: 'Pārkarst lietošanas laikā',
                text: 'telefons kļūst karsts pat pie nelielas slodzes.',
                icon: LuThermometer,
              },
              {
                title: 'Neprecīzs uzlādes procents',
                text: 'uzlādes līmenis strauji lec uz augšu vai leju.',
                icon: LuHeartPulse,
              },
              {
                title: 'Zems baterijas veselības līmenis',
                text: 'Battery Health iestatījumos rāda kritisku stāvokli.',
                icon: LuBatteryCharging,
              },
            ]}
          />
        </div>
      </section>

      {/* Price teaser — battery only */}
      <div id="price-teaser">
        <IphonePriceTeaser
          title="iPhone baterijas maiņas cena"
          intro={
            <>
              Cena atkarīga no iPhone modeļa. Zemāk redzamas baterijas maiņas cenas
              populārākajiem modeļiem.
            </>
          }
          priceItems={[
            {
              label: 'Baterijas maiņa',
              ids: ['battery'],
              mode: 'first',
              from: false,
            },
          ]}
        />
      </div>

      {/* Reviews */}
      <div id="reviews" />
      <Reviews />

      {/* Locations */}
      <Locations openPanelOnPin />

      {/* Process & Why */}
      <Process />
      <Why />

      {/* FAQ */}
      <section
        className={s.section}
        aria-labelledby="iphone-battery-ads-faq-h2"
      >
        <div className={s.container}>
          <Faq
            id="iphone-battery-ads-faq"
            title="Biežāk uzdotie jautājumi par iPhone baterijas maiņu"
            items={IPHONE_BATTERY_ADS_FAQ_ITEMS}
          />
        </div>
      </section>
    </>
  );
}
