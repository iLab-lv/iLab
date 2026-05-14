import IphoneHero from './_components/hero/IphoneHero';
import LandingReviews from './_components/reviews/LandingReviews';
import LandingTrust from './_components/trust/LandingTrust';
import LandingSpeed from './_components/speed/LandingSpeed';
import LandingProcess from './_components/process/LandingProcess';
import LandingServices from './_components/services/LandingServices';
import LandingLocations from './_components/locations/LandingLocations';
import LandingFaq from './_components/faq/LandingFaq';
import LandingFinalCta from './_components/final-cta/LandingFinalCta';
import LandingFooter from './_components/footer/LandingFooter';
import LandingDelivery from './_components/delivery/LandingDelivery';

import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';

export const metadata = {
  title: 'Displeju, bateriju un uzlādes problēmu novēršana Rīgā',
  description:
    'Ātra palīdzība ar displeja, baterijas, uzlādes un citiem ierīču bojājumiem. Diagnostika, detaļu maiņa un filiāles Domina Shopping un Spice Life.',
  alternates: {
    canonical: 'https://riga.ilab.lv/',
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Displeju, bateriju un uzlādes problēmu novēršana Rīgā',
    description:
      'Ātra palīdzība ar ierīču bojājumiem, diagnostiku un detaļu maiņu Rīgā.',
    url: 'https://riga.ilab.lv/',
    siteName: 'iLab',
    locale: 'lv_LV',
    type: 'website',
  },
};

export default async function AdsLandingPage() {
  const reviewsSummary = await getReviewsSummary();

  return (
    <>
      <IphoneHero
        locale="lv"
        reviewsSummary={reviewsSummary}
      />

      <LandingReviews locale="lv" />

      <LandingSpeed locale="lv" />

      <LandingServices locale="lv" />

      <LandingTrust
        locale="lv"
        reviewsSummary={reviewsSummary}
      />

      <LandingLocations locale="lv" />

      <LandingProcess locale="lv" />

      <LandingDelivery locale="lv" />

      <LandingFaq locale="lv" />

      <LandingFinalCta locale="lv" />

      <LandingFooter locale="lv" />
    </>
  );
}