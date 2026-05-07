import HomePage from '@site/HomePage';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import { getSiteSettings } from '@/lib/siteSettings';


export const metadata = {
  title: 'Сервис телефонов и компьютеров - iLab',
  description:
    'Ремонт телефонов, планшетов и компьютеров в Риге. Ремонт в тот же день, гарантия 90 дней и два филиала: Domina и Spice Home.',

  alternates: {
    canonical: '/ru',
    languages: {
      lv: '/',
      ru: '/ru',
      'x-default': '/',
    },
  },

  openGraph: {
    title: 'Сервис телефонов и компьютеров - iLab',
    description:
      'Ремонт телефонов, планшетов и компьютеров в Риге. Ремонт в тот же день, гарантия 90 дней и два филиала: Domina и Spice Home.',
    url: '/ru',
    siteName: 'iLab',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'iLab - сервис телефонов и компьютеров в Риге',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Сервис телефонов и компьютеров - iLab',
    description:
      'Ремонт телефонов, планшетов и компьютеров в Риге. Ремонт в тот же день, гарантия 90 дней и два филиала: Domina и Spice Home.',
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
        locale="ru"
        reviewsSummary={reviewsSummary}
        siteSettings={siteSettings}
      />

    </>
  );
}