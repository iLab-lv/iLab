import ComputerBrandPage, {
  generateComputerBrandStaticParams,
  getComputerBrandMetadata,
} from './ComputerBrandPage';
import Footer from '@site/ui/footer/Footer';


export const dynamicParams = false;

export async function generateStaticParams() {
  return generateComputerBrandStaticParams();
}

export async function generateMetadata({ params }) {
  return getComputerBrandMetadata(params.brand, 'lv');
}

export default function Page({ params }) {
  return (
    <>
      <ComputerBrandPage brand={params.brand} locale="lv" />
      <Footer locale="lv" />
    </>
  );
}