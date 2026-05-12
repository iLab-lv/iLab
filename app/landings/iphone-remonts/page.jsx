import IphoneHero from '../_components/hero/IphoneHero';
import LandingReviews from '../_components/reviews/LandingReviews';
import LandingTrust from '../_components/trust/LandingTrust';
import LandingSpeed from '../_components/speed/LandingSpeed';
import LandingProcess from '../_components/process/LandingProcess';
import LandingServices from '../_components/services/LandingServices';
import LandingLocations from '../_components/locations/LandingLocations';
import LandingFaq from '../_components/faq/LandingFaq';
import LandingFinalCta from '../_components/final-cta/LandingFinalCta';
import LandingFooter from '../_components/footer/LandingFooter';

import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';

export const metadata = {
    title: 'iPhone remonts Rīgā',
};

export default async function IphoneRemontsLandingPage() {
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

            

            <LandingFaq locale="lv" />

            <LandingFinalCta locale="lv" />

            <LandingFooter locale="lv" />
        </>
    );
}