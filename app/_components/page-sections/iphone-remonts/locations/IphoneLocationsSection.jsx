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

const BATTERY_HEADING = {
  lv: {
    titleMain: 'Kur veikt iPhone baterijas maiņu ', titleAccent: 'Rīgā?',
    subtitle: 'iPhone baterijas maiņu vari pieteikt iLab filiālēs T/C Domina Shopping un T/C Spice Home. Pirms apmeklējuma vari sazināties ar sev ērtāko filiāli, lai precizētu baterijas pieejamību, cenu un aptuveno remonta laiku.',
  },
  ru: {
    titleMain: 'Где заменить батарею iPhone ', titleAccent: 'в Риге?',
    subtitle: 'Замену батареи iPhone можно оформить в филиалах iLab в Т/Ц Domina Shopping и Т/Ц Spice Home. Перед посещением свяжитесь с удобным филиалом, чтобы уточнить наличие батареи, цену и примерное время ремонта.',
  },
};

const BACK_COVER_HEADING = {
  lv: { titleMain: 'Kur veikt iPhone aizmugures vāciņa maiņu ', titleAccent: 'Rīgā?', subtitle: 'iPhone aizmugures vāciņa maiņu vari pieteikt iLab filiālēs T/C Domina Shopping un T/C Spice Home. Pirms apmeklējuma sazinies ar ērtāko filiāli, lai precizētu detaļas pieejamību, cenu un aptuveno remonta laiku.' },
  ru: { titleMain: 'Где заменить заднюю крышку iPhone ', titleAccent: 'в Риге?', subtitle: 'Замену задней крышки iPhone можно оформить в филиалах iLab в Т/Ц Domina Shopping и Т/Ц Spice Home. Перед посещением свяжитесь с удобным филиалом, чтобы уточнить наличие детали, цену и примерное время ремонта.' },
};

const WATER_DAMAGE_HEADING = {
  lv: { titleMain:'Kur veikt iPhone ūdens bojājumu diagnostiku ', titleAccent:'Rīgā?', subtitle:'iPhone ūdens bojājumu diagnostiku vari pieteikt iLab filiālēs T/C Domina Shopping un T/C Spice Home. Jo ātrāk ierīce pēc šķidruma bojājuma nonāk servisā, jo lielāka iespēja samazināt papildu oksidācijas un savienojumu bojājumu risku.' },
  ru: { titleMain:'Где провести диагностику iPhone после воды ', titleAccent:'в Риге?', subtitle:'Диагностику iPhone после попадания жидкости можно оформить в филиалах iLab в Т/Ц Domina Shopping и Т/Ц Spice Home. Чем быстрее устройство попадёт в сервис, тем выше возможность снизить риск дальнейшего окисления и повреждения соединений.' },
};

export default async function IphoneLocationsSection({ locale = 'lv', variant = 'iphone' }) {
  const siteSettings = await getSiteSettings();
  const heading = variant === 'iphone-screen'
    ? SCREEN_HEADING[locale] || SCREEN_HEADING.lv
    : variant === 'iphone-battery'
      ? BATTERY_HEADING[locale] || BATTERY_HEADING.lv
      : variant === 'iphone-back-cover'
        ? BACK_COVER_HEADING[locale] || BACK_COVER_HEADING.lv
        : variant === 'iphone-water-damage'
          ? WATER_DAMAGE_HEADING[locale] || WATER_DAMAGE_HEADING.lv
          : undefined;

  return (
    <LandingCtaProvider siteSettings={siteSettings}>
      <LandingLocations id="iphone-locations" locale={locale} heading={heading} />
    </LandingCtaProvider>
  );
}
