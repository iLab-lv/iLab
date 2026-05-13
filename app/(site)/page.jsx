import HomePage from './HomePage';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import { getSiteSettings } from '@/lib/siteSettings';


export const metadata = {
  title: 'Telefonu un datoru serviss - iLab',
  description:
    'Telefonu, planšetdatoru un datoru remonts Rīgā. Remonts tajā pašā dienā, 90 dienu garantija un divas filiāles: Domina un Spice Life.',

  alternates: {
    canonical: '/',
    languages: {
      lv: '/',
      ru: '/ru',
      'x-default': '/',
    },
  },

  openGraph: {
    title: 'Telefonu un datoru serviss - iLab',
    description:
      'Telefonu, planšetdatoru un datoru remonts Rīgā. Remonts tajā pašā dienā, 90 dienu garantija un divas filiāles: Domina un Spice Life.',
    url: '/',
    siteName: 'iLab',
    locale: 'lv_LV',
    type: 'website',
    images: [
      {
        url: '/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'iLab - telefonu un datoru serviss Rīgā',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Telefonu un datoru serviss - iLab',
    description:
      'Telefonu, planšetdatoru un datoru remonts Rīgā. Remonts tajā pašā dienā, 90 dienu garantija un divas filiāles: Domina un Spice Life.',
    images: ['/images/hero.webp'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  const [reviewsSummary, siteSettings] = await Promise.all([
    getReviewsSummary(),
    getSiteSettings(),
  ]);

  return (
    <>
      <HomePage
        locale="lv"
        reviewsSummary={reviewsSummary}
        siteSettings={siteSettings}
      />


    </>
  );
}