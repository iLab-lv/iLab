import ContactsPage from './ContactsPage';

const CANONICAL_PATH = '/kontakti';

export const metadata = {
  title: 'Kontakti | iLab',
  description:
    'iLab kontakti: servisa centri Rīgā — Domina Shopping un Spice Home. Tālrunis 23370088, e-pasts info@ilab.lv. Darba laiks katru dienu 10:00–21:00.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page() {
  return <ContactsPage locale="lv" />;
}