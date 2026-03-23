import TermsPage from './TermsPage';

const CANONICAL_PATH = '/noteikumi';

export const metadata = {
  title: 'Lietošanas noteikumi un privātuma politika | iLab',
  description:
    'iLab lietošanas noteikumi, garantija, datu aizsardzība un sīkdatņu politika. Uzzini, kā tiek apstrādāti klientu dati un sniegti pakalpojumi.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page() {
  return <TermsPage locale="lv" />;
}