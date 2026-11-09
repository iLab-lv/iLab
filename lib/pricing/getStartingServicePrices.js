import 'server-only';
import { unstable_cache } from 'next/cache';
import { db } from '@/lib/firebaseAdmin';
import { getDevicesByCategoryAndBrand } from '@/lib/content/devices';
import { getServicesByCategory } from '@/lib/content/catalogDevices';
import { resolveStartingServicePriceItems } from './resolveServicePricing';

async function readStartingServicePrices(categoryKey, brandKey, locale = 'lv') {
  const [models, services] = await Promise.all([
    getDevicesByCategoryAndBrand(categoryKey, brandKey), getServicesByCategory(categoryKey),
  ]);
  const slugs = [...new Set(models.map(model => model.slug).filter(Boolean))];
  const batches = [];
  for (let offset = 0; offset < slugs.length; offset += 30) {
    batches.push(db.collection('servicePricing').where('modelId', 'in', slugs.slice(offset, offset + 30)).get());
  }
  const snapshots = await Promise.all(batches);
  const rows = snapshots.flatMap(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  return resolveStartingServicePriceItems(services, rows, models, { locale });
}

export const getStartingServicePrices = unstable_cache(readStartingServicePrices, ['service-pricing:starting-by-exact-variant'], { revalidate: 3600 });
