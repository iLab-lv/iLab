import TabletBrandPage, {
  generateTabletBrandStaticParams,
  getTabletBrandMetadata,
} from '@site/(catalog)/plansetdatoru-remonts/[brand]/TabletBrandPage';
import Footer from '@site/ui/footer/Footer';

export const dynamicParams = false;

export async function generateStaticParams() {
  return generateTabletBrandStaticParams();
}

export async function generateMetadata({ params }) {
  return getTabletBrandMetadata(params.brand, 'ru');
}

export default function Page({ params }) {
  return (
  <>
  <TabletBrandPage brand={params.brand} locale="ru" />
  <Footer locale="ru" />
  </>

  );
}