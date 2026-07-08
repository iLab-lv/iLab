import LandingCtaProvider from '@/app/landings/_components/ui/providers/LandingCtaProvider';
import LandingLocations from '@/app/landings/_components/locations/LandingLocations';

import { getSiteSettings } from '@/lib/siteSettings';

export default async function IphoneLocationsSection() {
  const siteSettings = await getSiteSettings();

  return (
    <LandingCtaProvider siteSettings={siteSettings}>
      <LandingLocations id="iphone-locations" locale="lv" />
    </LandingCtaProvider>
  );
}
