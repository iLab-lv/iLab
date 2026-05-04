import ContactsPage from '@site/(info)/kontakti/ContactsPage';
import Footer from '@site/ui/footer/Footer';

const CANONICAL_PATH = '/ru/kontakty';

export const metadata = {
  title: 'Контакты | iLab',
  description:
    'Контакты iLab: сервисные центры в Риге - Domina Shopping и Spice Home. Телефон 23370088, э-почта info@ilab.lv. Время работы каждый день 10:00–21:00.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page() {
  return (
  <>
  <ContactsPage locale="ru" />
  <Footer locale="ru" />
      </>
      );
}