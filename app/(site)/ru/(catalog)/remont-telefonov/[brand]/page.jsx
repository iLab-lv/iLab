import PhoneBrandPage, {
  generatePhoneBrandStaticParams,
  getPhoneBrandMetadata,
} from '@site/(catalog)/telefonu-remonts/[brand]/PhoneBrandPage';


export const dynamicParams = false;

export async function generateStaticParams() {
  return generatePhoneBrandStaticParams();
}

export async function generateMetadata({ params }) {
  return getPhoneBrandMetadata(params.brand, 'ru');
}

export default function Page({ params }) {
  return (
  <>
  <PhoneBrandPage brand={params.brand} locale="ru" />
 
  </>
  );
}