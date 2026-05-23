import { redirect } from 'next/navigation';

import PhoneBrandPage, {
  generatePhoneBrandStaticParams,
  getPhoneBrandMetadata,
} from '@site/(catalog)/telefonu-remonts/[brand]/PhoneBrandPage';

export const dynamicParams = false;

const IPHONE_HUB_PATH_RU = '/ru/remont-iphone';

function isAppleBrand(brand) {
  return String(brand || '').toLowerCase() === 'apple';
}

export async function generateStaticParams() {
  const params = await generatePhoneBrandStaticParams();

  return [
    ...params,
    { brand: 'apple' },
  ];
}

export async function generateMetadata({ params }) {
  const { brand } = params;

  if (isAppleBrand(brand)) {
    return {
      title: 'Ремонт iPhone в Риге | iLab',
      alternates: {
        canonical: IPHONE_HUB_PATH_RU,
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return getPhoneBrandMetadata(brand, 'ru');
}

export default function Page({ params }) {
  const { brand } = params;

  if (isAppleBrand(brand)) {
    redirect(IPHONE_HUB_PATH_RU);
  }

  return <PhoneBrandPage brand={brand} locale="ru" />;
}