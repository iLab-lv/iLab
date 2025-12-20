// app/(site)/page.jsx
import HomeScreen from './screens/HomeScreen';

export const metadata = {
  title: 'iLab — Ātrs mobilo ierīču servisa centrs',
  description:
    'Remonts tajā pašā dienā. 90 dienu garantija. Divas filiāles Rīgā: Domina un Spice Home.',
  alternates: {
    canonical: '/',
  },
};

export default function Page() {
  return <HomeScreen />;
}
