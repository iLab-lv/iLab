import PierakstiesPage from './PierakstiesPage';

const CANONICAL_PATH = '/pieraksties-remontam';

export const metadata = {
  title: 'Pieraksties remontam | iLab',
  description:
    'Aizpildi iLab remonta pieteikuma formu. Norādi ierīci un problēmu, un mūsu meistars sazināsies, lai saskaņotu izmaksas un remonta laiku.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page() {
  return <PierakstiesPage locale="lv" />;
}

