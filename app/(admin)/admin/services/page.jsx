import RepairServicesScreen from './RepairServicesScreen';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Repair Services · Admin · iLab',
  robots: { index: false, follow: false },
};

export default function Page({ searchParams }) {
  const category =
    typeof searchParams?.category === 'string'
      ? searchParams.category
      : 'telefonu-remonts';

  return <RepairServicesScreen initialCategory={category} />;
}