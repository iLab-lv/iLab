import PopularRepairs from '../popular-repairs/PopularRepairs';
import { getIphonePopularServices } from '../popular-services/popularServices.i18n';
import { getStartingServicePrices } from '@/lib/pricing/getStartingServicePrices';
import { IPHONE_REPAIR_SERVICE_IDS, selectIphoneRepairPrices } from '../popular-repairs/iphoneRepairPrices';

export default async function HubPopularServices({ locale = 'lv' }) {
  const { copy, services } = getIphonePopularServices(locale);
  const startingItems = await getStartingServicePrices('telefonu-remonts', 'apple', locale);
  return <PopularRepairs id="iphone-services" locale={locale} variant="featured"
    title={copy.titleStart + copy.titleAccent} intro={copy.intro + ' ' + copy.priceLine}
    items={services.map(service => {
      const priority = IPHONE_REPAIR_SERVICE_IDS[service.serviceKey] || [];
      const options = selectIphoneRepairPrices(service.serviceKey, startingItems)
        .sort((a, b) => priority.indexOf(a.id) - priority.indexOf(b.id));
      return {
      ...service, noteLabel: copy.noteLabel,
      price: options.length ? { kind: 'options', items: options } : { kind: service.serviceKey === 'iphone-plates-remonts' ? 'diagnostic' : 'model' },
      actions: [{ kind: 'model', href: '#iphone-modeli', label: copy.priceLink }, { kind: 'service', href: service.href, label: copy.serviceLink }],
      };
    })} />;
}
