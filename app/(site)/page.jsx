import HomePage from './HomePage';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import Footer from '@site/ui/footer/Footer';

export const metadata = {
  title: 'Telefonu un datoru serviss - iLab',
  description:
    'Telefonu, planšetdatoru un datoru remonts Rīgā. Remonts tajā pašā dienā, 90 dienu garantija un divas filiāles: Domina un Spice Home.',

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
      'Telefonu, planšetdatoru un datoru remonts Rīgā. Remonts tajā pašā dienā, 90 dienu garantija un divas filiāles: Domina un Spice Home.',
    url: '/',
    siteName: 'iLab',
    locale: 'lv_LV',
    type: 'website',
    images: [
      {
        url: '/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'iLab — telefonu un datoru serviss Rīgā',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Telefonu un datoru serviss - iLab',
    description:
      'Telefonu, planšetdatoru un datoru remonts Rīgā. Remonts tajā pašā dienā, 90 dienu garantija un divas filiāles: Domina un Spice Home.',
    images: ['/images/hero.webp'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  const reviewsSummary = await getReviewsSummary();

  return (
  <>
  <HomePage locale="lv" reviewsSummary={reviewsSummary} />
  <Footer locale="lv" />
  </>
);
}