import { getSiteSettings } from '@/lib/siteSettings';
import QuickContacts from './QuickContacts';
export default async function QuickContactsSection({ locale = 'lv', id }) {
  const settings = await getSiteSettings();
  return <QuickContacts id={id} locale={locale} locations={settings.locations} defaultHours={settings.hours} />;
}
