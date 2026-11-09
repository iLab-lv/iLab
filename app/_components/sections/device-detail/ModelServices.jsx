import { getIphoneModelServices } from '../popular-services/popularServices.i18n';
import PopularRepairs from '../popular-repairs/PopularRepairs';
import { selectIphoneRepairPrices } from '../popular-repairs/iphoneRepairPrices';

export default function ModelServices({ id = 'device-services', title, items = [], locale = 'lv', modelName, iphone = false, priceTargetId = 'cenas', priceItems = [], currency = 'EUR' }) {
  const content = iphone ? getIphoneModelServices(modelName, locale) : null;
  return <PopularRepairs id={id} title={content?.copy.title || title} intro={content?.copy.intro}
    locale={locale} currency={currency} variant="compact"
    items={(content?.services || items).map(service => {
      const options = iphone ? selectIphoneRepairPrices(service.serviceKey, priceItems) : [];
      return {
        ...service, description: service.description || service.text,
        price: iphone ? (options.length ? { kind: 'options', items: options } : { kind: 'request' }) : undefined,
        actions: [
          options.length > 0 && { kind: 'prices', href: '#' + priceTargetId, label: content.copy.priceLink },
          service.href && { kind: 'service', href: service.href, label: content?.copy.serviceLink },
        ].filter(Boolean),
      };
    })} />;
}
