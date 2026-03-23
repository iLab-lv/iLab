import CenasPage from './CenasPage';

const CANONICAL_PATH = '/cenas';

export const metadata = {
  title: 'Cenas | iLab',
  description:
    'iLab remonta cenas pēc modeļa. Izvēlies zīmolu un ierīces modeli, lai redzētu visu pakalpojumu cenas vienuviet.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page({ searchParams }) {
  return <CenasPage locale="lv" searchParams={searchParams} />;
}