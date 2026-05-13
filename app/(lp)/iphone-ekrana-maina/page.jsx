// app/ads/iphone-ekrana-maina/page.jsx

import Services from '@sections/services/Services';
import Reviews from '@sections/reviews/Reviews';
import Process from '@sections/process/Process';
import Why from '@sections/why/Why';
import Locations from '@sections/locations/Locations';
import Faq from '@sections/faq/Faq';

import { FAQ_CONTEXT, getFaqItems } from '@/data/faq';
import s from '@styles/Catalog.module.scss';

import {
  LuSmartphone,
  LuHand,
  LuMonitorOff,
  LuAlignCenter,
  LuDroplet,
  LuTriangleAlert,
} from 'react-icons/lu';

import IphonePriceTeaser from '../_components/IphonePriceTeaser';
import IphoneAdsHero from '../_components/IphoneAdsHero';

// NOTE: Best practice is to have a dedicated FAQ context for screen replacement,
// but for now we reuse the existing ads FAQ items and only adjust the title.
const { items: IPHONE_ADS_FAQ_ITEMS } = getFaqItems(FAQ_CONTEXT.IPHONE_ADS);

export default function IphoneScreenReplacementAdsLandingPage() {
  return (
    <>
      {/* Split-layout hero (screen replacement variant) */}
      <IphoneAdsHero
        title="iPhone ekrāna maiņa Rīgā"
        subtitle={
          <>
            Saplaisājis vai nereaģējošs ekrāns? Nomainām tajā pašā dienā.
            90&nbsp;dienu garantija, divi servisa centri&nbsp;Rīgā – Domina un Spice Life.
          </>
        }
        imageSrc="/images/categories/screen-replacement.webp"
        imageAlt="iPhone ar saplaisājušu ekrānu"
        secondaryCta={{
          label: 'Ekrāna problēmas',
          href: '#services',
          variant: 'secondary',
          ariaLabel: 'Skatīt biežākās ekrāna problēmas',
        }}
        primaryCta={{
          label: 'Uzzināt cenu',
          href: '#price-teaser',
          variant: 'primary',
          ariaLabel: 'Uzzināt ekrāna maiņas cenu',
        }}
        headingId="iphone-screen-hero-title"
      />


      {/* Symptoms / intent confirmation */}
      {/* Common screen problems (intent confirmation) */}
      <section
        id="services"
        className={s.section}
        aria-labelledby="iphone-screen-services-h2"
      >
        <div className={s.container}>
          <Services
            id="iphone-screen-services"
            title="Biežākās iPhone ekrāna problēmas"
            items={[
              {
                title: 'Saplaisājis ekrāns',
                text: 'plaisas stiklā, sadragāts ekrāns pēc kritiena.',
                icon: LuSmartphone,
              },
              {
                title: 'Nereaģē skārienekrāns',
                text: 'pieskāriens nestrādā vai reaģē ar aizturi.',
                icon: LuHand,
              },
              {
                title: 'Ekrāns mirgo vai paliek melns',
                text: 'displejs iedegas/izdziest, mirgo vai nerāda attēlu.',
                icon: LuMonitorOff,
              },
              {
                title: 'Līnijas ekrānā',
                text: 'vertikālas/horizontālas līnijas, bojāti pikseļi.',
                icon: LuAlignCenter,
              },
              {
                title: 'Plankumi vai tumši stūri',
                text: '“traipi”, tumši laukumi, izplūdis melns (ink bleed).',
                icon: LuDroplet,
              },
              {
                title: 'Daļa ekrāna nestrādā / “spiežas pats”',
                text: 'nedarbojas augša/apakša vai notiek “ghost touch”.',
                icon: LuTriangleAlert,
              },
            ]}
          />
        </div>
      </section>


      {/* Price teaser (anchor for secondary CTA) */}
      <div id="price-teaser">
        <IphonePriceTeaser
  title="Ekrāna maiņas cenas populārākajiem iPhone"
  intro={
    <>
      Pieejamās ekrāna maiņas opcijas (In-Cell / OLED / Oriģināls). Ja konkrētam modelim kāda opcija nav
      pieejama, tā netiks rādīta.
    </>
  }
  priceItems={[
    {
      label: 'Ekrāna maiņa',
      lines: [
        { id: 'display-incell', label: 'In-Cell' },
        { id: 'display-oled', label: 'OLED' },
        { id: 'display-original', label: 'Oriģināls' },
      ],
    },
  ]}
  contactLabel="Sazināties par savu modeli"
/>

      </div>

      {/* Reviews */}
      <div id="reviews" />
      <Reviews />

      {/* Locations with map pins opening the panel */}
      <Locations openPanelOnPin />

      {/* Process & Why sections reused from main site */}
      <Process />
      <Why />

      {/* FAQ */}
      <section className={s.section} aria-labelledby="iphone-screen-ads-faq-h2">
        <div className={s.container}>
          <Faq
            id="iphone-screen-ads-faq"
            title="Biežāk uzdotie jautājumi par iPhone ekrāna maiņu"
            items={IPHONE_ADS_FAQ_ITEMS}
          />
        </div>
      </section>
    </>
  );
}
