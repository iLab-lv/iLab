import { getPickerBrandSlug } from './priceNavigation';

const localized = (value, locale) => typeof value === 'string' ? value : value?.[locale] || value?.lv || '';

// Adapt the public catalog to the existing price picker. Legacy entries retain
// coverage where no public record exists; matching live records are authoritative.
export function buildPriceDevices(devices = [], categories = [], legacyDevices = [], locale = 'lv') {
  const models = new Map(legacyDevices.filter(device => device?.slug).map(device => [device.slug, { ...device }]));
  for (const device of devices) {
    if (!device?.slug || !device.categoryKey || !device.brandKey) continue;
    const previous = models.get(device.slug) || {};
    const category = categories.find(item => (item.key || item.slug) === device.categoryKey);
    const brand = category?.brands?.find(item => (item.key || item.slug) === device.brandKey);
    if (!category || !brand) continue;
    const series = brand?.series?.find(item => (item.key || item.slug) === device.seriesKey);
    models.set(device.slug, {
      ...previous,
      ...device,
      name: localized(device.name, locale) || previous.name || device.slug,
      category: device.categoryKey,
      brandSlug: device.brandKey,
      pickerBrandSlug: getPickerBrandSlug({ categoryKey: device.categoryKey, brandKey: device.brandKey }),
      year: device.year ?? previous.year ?? null,
      image: device.image || previous.image || '',
      series: localized(series?.labels, locale) || series?.label || series?.name
        || (device.seriesKey ? device.seriesKey : previous.series) || '',
      seriesSlug: device.seriesKey || previous.seriesSlug || '',
      seriesOrder: Number.isFinite(series?.order) ? series.order : null,
    });
  }
  return [...models.values()];
}
