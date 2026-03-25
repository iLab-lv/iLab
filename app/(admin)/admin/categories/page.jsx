import CategoriesScreen from './CategoriesScreen';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Categories · Admin · iLab',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CategoriesScreen />;
}