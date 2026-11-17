import 'server-only';
import { getCategories } from '../content/categories';
import { getDevices } from '../content/devices';
import legacyPriceDevices from '@/data/devices';
import { buildPriceDevices } from '../pricing/priceCatalog';
import { staticPageSeo } from '../seo/staticPageSeo';
import { getIphonePopularServices } from '@/app/_components/sections/popular-services/popularServices.i18n';
import { buildPageCtaCatalog } from './pageCtaContext';

export async function getPageCtaCatalog() {
  const [categories, devices] = await Promise.all([
    getCategories().catch(() => []),
    getDevices().catch(() => []),
  ]);
  const serviceLabels = {};
  for (const locale of ['lv', 'ru']) {
    for (const service of getIphonePopularServices(locale).services) {
      serviceLabels[service.serviceKey] = { ...serviceLabels[service.serviceKey], [locale]: service.title };
    }
  }
  const priceDevices = buildPriceDevices(devices, categories, legacyPriceDevices);
  return buildPageCtaCatalog({ categories, devices, priceDevices, serviceLabels,
    servicePages: Object.values(staticPageSeo).map(page => page.route?.lv).filter(Boolean),
  });
}
