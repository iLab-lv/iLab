import 'server-only';
import { getDevices } from '../content/devices';
import { getCategories } from '../content/categories';
import legacyDevices from '@/data/devices';
import { buildPriceDevices } from './priceCatalog';

export async function getPriceDevices(locale = 'lv') {
  const [devices, categories] = await Promise.all([getDevices(), getCategories()]);
  return buildPriceDevices(devices, categories, legacyDevices, locale);
}
