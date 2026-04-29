import TabletBrandPage, {
  generateTabletBrandStaticParams,
  getTabletBrandMetadata,
} from './TabletBrandPage';
import Footer from '@site/ui/footer/Footer';

export const dynamicParams = false;

export async function generateStaticParams() {
  return generateTabletBrandStaticParams();
}

export async function generateMetadata({ params }) {
  return getTabletBrandMetadata(params.brand, 'lv');
}

export default function Page({ params }) {
  return (
  <>
  <TabletBrandPage brand={params.brand} locale="lv" />
  <Footer locale="lv" />
  </>

  );
}