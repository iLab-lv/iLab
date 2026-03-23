import CenasPage from '@site/(info)/cenas/CenasPage';

const CANONICAL_PATH = '/ru/ceny';

export const metadata = {
  title: 'Цены | iLab',
  description:
    'Цены на ремонт iLab по модели. Выберите бренд и модель устройства, чтобы увидеть все цены на услуги в одном месте.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page({ searchParams }) {
  return <CenasPage locale="ru" searchParams={searchParams} />;
}