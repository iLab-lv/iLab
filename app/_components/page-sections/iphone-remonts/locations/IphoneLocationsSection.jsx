import LandingLocations from '@/app/landings/_components/locations/LandingLocations';
import LandingCtaProvider from '@/app/landings/_components/ui/providers/LandingCtaProvider';

import { getSiteSettings } from '@/lib/siteSettings';

export default async function IphoneLocationsSection({ locale = 'lv' }) {
  const siteSettings = await getSiteSettings();

  return (
    <LandingCtaProvider siteSettings={siteSettings}>
      <LandingLocations id="iphone-locations" locale={locale} />
    </LandingCtaProvider>
  );
}
