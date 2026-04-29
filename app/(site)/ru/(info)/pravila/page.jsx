import TermsPage from '@site/(info)/noteikumi/TermsPage';
import Footer from '@site/ui/footer/Footer';

const CANONICAL_PATH = '/ru/pravila';

export const metadata = {
  title: 'Условия использования и политика конфиденциальности | iLab',
  description:
    'Условия использования iLab, гарантия, защита данных и политика cookies. Узнайте, как обрабатываются данные клиентов и как предоставляются услуги.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page() {
  return (
  <>
  <TermsPage locale="ru" />
  <Footer locale="ru" />
      </>
      );
}