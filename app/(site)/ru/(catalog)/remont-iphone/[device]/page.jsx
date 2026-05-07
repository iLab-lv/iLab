// app/(site)/ru/remont-iphone/[device]/page.jsx

import {
  getIphoneDeviceMetadata,
} from '@site/(catalog)/iphone-remonts/[device]/IphoneDevicePage';
import IphoneDevicePage from '@site/(catalog)/iphone-remonts/[device]/IphoneDevicePage';


export const revalidate = 0;

export const pageHeader = {
  scrollCta: { label: 'Смотреть цены', targetId: 'cenas' },
};

export const headerProps = pageHeader;

export async function generateMetadata({ params }) {
  const slug = decodeURIComponent(params.device);
  return getIphoneDeviceMetadata(slug, { locale: 'ru' });
}

export default async function Page({ params }) {
  const slug = decodeURIComponent(params.device);
  return (
  <>
  <IphoneDevicePage deviceSlug={slug} locale="ru" />
 
  </>

  );
}