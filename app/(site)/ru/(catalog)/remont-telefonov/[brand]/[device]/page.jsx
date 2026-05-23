import { redirect } from 'next/navigation';

import PhoneDevicePage from '@site/(catalog)/telefonu-remonts/[brand]/[device]/PhoneDevicePage';

export const revalidate = 0;

/* ===== Header CTA exposed to layout ===== */
export const pageHeader = {
  scrollCta: { label: 'Смотреть цены', targetId: 'cenas' },
};

export const headerProps = pageHeader;

const IPHONE_HUB_PATH_RU = '/ru/remont-iphone';

function isAppleBrand(brand) {
  return String(brand || '').toLowerCase() === 'apple';
}

function getIphoneDevicePath(device) {
  return `${IPHONE_HUB_PATH_RU}/${device}`;
}

export async function generateMetadata({ params }) {
  const { brand, device } = params;

  if (isAppleBrand(brand)) {
    return {
      title: 'Ремонт iPhone в Риге | iLab',
      alternates: {
        canonical: getIphoneDevicePath(device),
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return PhoneDevicePage.generateMetadata({ params, locale: 'ru' });
}

export default async function Page({ params }) {
  const { brand, device } = params;

  if (isAppleBrand(brand)) {
    redirect(getIphoneDevicePath(device));
  }

  return <PhoneDevicePage params={params} locale="ru" />;
}