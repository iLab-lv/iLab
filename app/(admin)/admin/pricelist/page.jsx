import PricelistScreen from './PricelistScreen';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Pricelist · Admin · iLab',
  robots: { index: false, follow: false },
};

export default function Page({ searchParams }) {
  const brand = typeof searchParams?.brand === 'string' ? searchParams.brand : 'apple';
  const category = typeof searchParams?.category === 'string' ? searchParams.category : ''; // optional
  return <PricelistScreen initialBrand={brand} initialCategory={category} />;
}
