import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

export async function getModelPricing(modelId) {
  const q = query(collection(db, 'modelServices'), where('modelId', '==', modelId));
  const snap = await getDocs(q);

  const map = new Map(); // serviceId -> price
  snap.forEach((doc) => {
    const d = doc.data();
    map.set(d.serviceId, d.price);
  });

  return map;
}
