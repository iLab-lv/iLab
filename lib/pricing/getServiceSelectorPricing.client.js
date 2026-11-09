import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import { resolveSelectorServiceIds, resolveServicePriceItems } from './resolveServicePricing';

export async function getServiceSelectorPricing(devices, categoryId, serviceIds, locale) {
  const servicesSnap = await getDocs(query(collection(db, 'services'), where('categoryId', '==', categoryId)));
  const services = servicesSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const resolvedIds = resolveSelectorServiceIds(serviceIds, services);
  const selectedServices = services.filter((service) => !resolvedIds.length || resolvedIds.includes(service.id));
  // The model-page reader and pricing administration both key prices by the public model slug.
  const modelIds = devices.map((device) => device.slug).filter(Boolean);
  const rows = [];
  for (let offset = 0; offset < modelIds.length; offset += 30) {
    const snap = await getDocs(query(collection(db, 'servicePricing'), where('modelId', 'in', modelIds.slice(offset, offset + 30))));
    rows.push(...snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  const pricing = {};
  for (const device of devices) {
    pricing[device.slug] = {
      items: resolveServicePriceItems(selectedServices, rows.filter((row) => row.modelId === device.slug), {
        model: { brandKey: device.brandSlug },
        locale,
      }),
    };
  }
  return { pricing, serviceIds: resolvedIds };
}
