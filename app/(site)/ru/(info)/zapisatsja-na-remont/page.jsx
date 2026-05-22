import PierakstiesPage from '@site/(info)/pieraksties-remontam/PierakstiesPage';

const CANONICAL_PATH = '/ru/zapisatsja-na-remont';

export const metadata = {
  title: 'Записаться на ремонт | iLab',
  description:
    'Заполните форму записи на ремонт iLab. Укажите устройство и проблему, и наш мастер свяжется с вами, чтобы согласовать стоимость и время ремонта.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page() {
  return <PierakstiesPage locale="ru" />;
}