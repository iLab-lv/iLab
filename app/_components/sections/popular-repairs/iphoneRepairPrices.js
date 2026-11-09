import { resolveSelectorServiceIds } from '@/lib/pricing/resolveServicePricing';

// Same service associations as the existing dedicated-page selectors. All matching
// variants from the already resolved model list remain visible, in configured order.
export const IPHONE_REPAIR_SERVICE_IDS = {
  'ekrana-maina': ['phone-display-original', 'phone-display-oled', 'phone-display-incell', 'phone-display-apple service pack'],
  'baterijas-maina': ['phone-battery', 'phone-battery-service-pack'],
  'uzlades-ligzdas-maina': ['charge-port'],
  'kameras-remonts': ['phone-camera', 'phone-camera-glass'],
  'udens-bojajumu-remonts': ['phone-water-damage-clean'],
  'aizmugures-vacina-maina': ['phone-back-cover', 'phone-back-cover-apple service pack'],
};

export function selectIphoneRepairPrices(serviceKey, priceItems = []) {
  const ids = resolveSelectorServiceIds(IPHONE_REPAIR_SERVICE_IDS[serviceKey] || [], priceItems);
  return priceItems.filter(item => ids.includes(item.id) || item.serviceSlug === serviceKey);
}
