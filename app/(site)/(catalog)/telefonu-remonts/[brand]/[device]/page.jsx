import { redirect } from 'next/navigation';

import PhoneDevicePage from './PhoneDevicePage';

export const revalidate = 0;

/* ===== Header CTA exposed to layout ===== */
export const pageHeader = {
  scrollCta: { label: 'Skatīt cenas', targetId: 'cenas' },
};

export const headerProps = pageHeader;

function isAppleBrand(brand) {
  return String(brand || '').toLowerCase() === 'apple';
}

function getIphoneDevicePath(device) {
  return `/iphone-remonts/${device}`;
}

export async function generateMetadata({ params }) {
  const { brand, device } = params;

  if (isAppleBrand(brand)) {
    return {
      title: 'iPhone remonts Rīgā | iLab',
      alternates: {
        canonical: getIphoneDevicePath(device),
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return PhoneDevicePage.generateMetadata({ params, locale: 'lv' });
}

export default async function Page({ params }) {
  const { brand, device } = params;

  if (isAppleBrand(brand)) {
    redirect(getIphoneDevicePath(device));
  }

  return <PhoneDevicePage params={params} locale="lv" />;
}