import PhoneBrandPage, {
  generatePhoneBrandStaticParams,
  getPhoneBrandMetadata,
} from './PhoneBrandPage';

export const dynamicParams = false;

export async function generateStaticParams() {
  return generatePhoneBrandStaticParams();
}

export async function generateMetadata({ params }) {
  return getPhoneBrandMetadata(params.brand, 'lv');
}

export default function Page({ params }) {
  return <PhoneBrandPage brand={params.brand} locale="lv" />;
}