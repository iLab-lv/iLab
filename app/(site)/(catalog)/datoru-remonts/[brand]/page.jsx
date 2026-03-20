import ComputerBrandPage, {
  generateComputerBrandStaticParams,
  getComputerBrandMetadata,
} from './ComputerBrandPage';

export const dynamicParams = false;

export async function generateStaticParams() {
  return generateComputerBrandStaticParams();
}

export async function generateMetadata({ params }) {
  return getComputerBrandMetadata(params.brand, 'lv');
}

export default function Page({ params }) {
  return <ComputerBrandPage brand={params.brand} locale="lv" />;
}