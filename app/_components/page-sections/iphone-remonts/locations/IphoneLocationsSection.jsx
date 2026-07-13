import LandingLocations from '@/app/landings/_components/locations/LandingLocations';
import LandingCtaProvider from '@/app/landings/_components/ui/providers/LandingCtaProvider';

import { getSiteSettings } from '@/lib/siteSettings';

const SCREEN_HEADING = {
  lv: {
    titleMain: 'Kur veikt iPhone ekrāna maiņu ',
    titleAccent: 'Rīgā?',
    subtitle: 'iPhone ekrāna maiņu vari pieteikt iLab filiālēs T/C Domina Shopping un T/C Spice Home. Pirms apmeklējuma vari sazināties ar sev ērtāko filiāli, lai precizētu detaļas pieejamību, cenu un aptuveno remonta laiku.',
  },
  ru: {
    titleMain: 'Где заменить экран iPhone ',
    titleAccent: 'в Риге?',
    subtitle: 'Замену экрана iPhone можно оформить в филиалах iLab в Т/Ц Domina Shopping и Т/Ц Spice Home. Перед посещением свяжитесь с удобным филиалом, чтобы уточнить наличие детали, цену и примерное время ремонта.',
  },
};

export default async function IphoneLocationsSection({ locale = 'lv', variant = 'iphone' }) {
  const siteSettings = await getSiteSettings();
  const heading = variant === 'iphone-screen'
    ? SCREEN_HEADING[locale] || SCREEN_HEADING.lv
    : undefined;

  return (
    <LandingCtaProvider siteSettings={siteSettings}>
      <LandingLocations id="iphone-locations" locale={locale} heading={heading} />
    </LandingCtaProvider>
  );
}
