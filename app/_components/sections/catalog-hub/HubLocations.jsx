import { getSiteSettings } from '@/lib/siteSettings';
import FullLocations from '../full-locations/FullLocations';
export default async function HubLocations({ locale = 'lv', id = 'iphone-locations' }) {
  const settings = await getSiteSettings();
  return <FullLocations id={id} locale={locale} locations={settings.locations} pinPositions={settings.pinPositions} defaultHours={settings.hours} />;
}
