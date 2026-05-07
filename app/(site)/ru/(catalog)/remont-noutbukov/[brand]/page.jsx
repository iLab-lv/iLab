import ComputerBrandPage, {
  generateComputerBrandStaticParams,
  getComputerBrandMetadata,
} from '@site/(catalog)/datoru-remonts/[brand]/ComputerBrandPage';


export const dynamicParams = false;

export async function generateStaticParams() {
  return generateComputerBrandStaticParams();
}

export async function generateMetadata({ params }) {
  return getComputerBrandMetadata(params.brand, 'ru');
}

export default function Page({ params }) {
  return (
    <>
      <ComputerBrandPage brand={params.brand} locale="ru" />
    </>
  );
}