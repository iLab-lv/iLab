import { redirect } from 'next/navigation';

import PhoneBrandPage, {
  generatePhoneBrandStaticParams,
  getPhoneBrandMetadata,
} from './PhoneBrandPage';

export const dynamicParams = false;

const IPHONE_HUB_PATH = '/iphone-remonts';

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
      title: 'iPhone remonts Rīgā | iLab',
      alternates: {
        canonical: IPHONE_HUB_PATH,
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return getPhoneBrandMetadata(brand, 'lv');
}

export default function Page({ params }) {
  const { brand } = params;

  if (isAppleBrand(brand)) {
    redirect(IPHONE_HUB_PATH);
  }

  return <PhoneBrandPage brand={brand} locale="lv" />;
}