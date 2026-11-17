// Shared with the prices page: Apple phones use the dedicated iPhone picker tab.
export function getPickerBrandSlug(device) {
  const slug = String(device?.pickerBrandSlug || device?.originalBrandSlug || device?.brandSlug || device?.brandKey || '').toLowerCase().trim();
  const category = String(device?.category || device?.categoryKey || '').toLowerCase().trim();
  return slug === 'apple' && category === 'telefonu-remonts' ? 'iphone' : slug;
}

export function normalizeBrandName(slug, name) {
  const key = String(slug || '').toLowerCase();
  const label = String(name || '').trim();
  if (key === 'ipad' || label.toLowerCase() === 'ipad') return 'iPad';
  if (key === 'iphone' || label.toLowerCase() === 'iphone') return 'iPhone';
  if (key === 'macbook' || label.toLowerCase() === 'macbook') return 'MacBook';
  return label;
}

export function buildPricesHref(href, { priceBrand, priceModel } = {}) {
  const params = new URLSearchParams();
  if (priceBrand) params.set('brand', priceBrand);
  if (priceModel) params.set('model', priceModel);
  return `${href}${params.size ? `?${params}` : ''}#brand-list`;
}

const HUB_PRICE_DEFAULTS = {
  'telefonu-remonts': 'samsung',
  'plansetdatoru-remonts': 'ipad',
  'datoru-remonts': 'macbook',
};

export function getHubPriceBrand(categoryKey, supportedBrands) {
  const preferred = HUB_PRICE_DEFAULTS[categoryKey];
  return supportedBrands.includes(preferred) ? preferred : supportedBrands.length === 1 ? supportedBrands[0] : '';
}
