import DukPage from './BujPage';
import Footer from '@site/ui/footer/Footer';

const CANONICAL_PATH = '/buj';

export const metadata = {
  title: 'Biežāk uzdotie jautājumi | iLab',
  description:
    'iLab - biežāk uzdotie jautājumi par telefonu, iPhone, planšetdatoru, datoru un Dyson remontu, kā arī diagnostiku, termiņiem, garantiju un populārākajiem remonta darbiem.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page() {
  return (
  <>
  <DukPage locale="lv" />
  <Footer locale="lv" />
    </>
    );
}