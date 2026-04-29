import AboutPage from './AboutPage';
import Footer from '@site/ui/footer/Footer';

const CANONICAL_PATH = '/par-mums';

export const metadata = {
  title: 'Par iLab | iLab',
  description:
    'SIA iLab — profesionāls telefona un datoru serviss Rīgā ar 10+ gadu pieredzi. Remonts privātpersonām un B2B: viedtālruņi, planšetes, datori, Dyson. Bezmaksas diagnostika un 90 dienu garantija.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page() {
  return (
  <>
  <AboutPage locale="lv" />
  <Footer locale="lv" />
    </>
    );
}