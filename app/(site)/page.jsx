// app/(site)/page.jsx
import HomePage from './ui/HomePage';

export const metadata = {
  title: 'iLab — Ātrs mobilo ierīču servisa centrs',
  description:
    'Remonts tajā pašā dienā. 90 dienu garantija. Divas filiāles Rīgā: Domina un Spice Home.',
};

export default function Page() {
  return <HomePage />;
}
