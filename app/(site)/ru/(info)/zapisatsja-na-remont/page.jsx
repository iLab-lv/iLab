import PierakstiesPage from '@site/(info)/pieraksties-remontam/PierakstiesPage';
import Footer from '@site/ui/footer/Footer';

const CANONICAL_PATH = '/ru/zapisatsya-na-remont';

export const metadata = {
  title: 'Записаться на ремонт | iLab',
  description:
    'Заполните форму записи на ремонт iLab. Укажите устройство и проблему, и наш мастер свяжется с вами, чтобы согласовать стоимость и время ремонта.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page() {
  return (
  <>
  <PierakstiesPage locale="ru" />
  <Footer locale="ru" />
      </>
      );
}