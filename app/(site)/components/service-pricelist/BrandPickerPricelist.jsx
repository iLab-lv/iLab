// app/(site)/components/service-pricelist/BrandPickerPricelist.jsx
'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';
import styles from './BrandPickerPricelist.module.scss';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

function normalizeBrandName(slug, name) {
  const s = String(slug || '').toLowerCase();
  const n = String(name || '').trim();

  // Special casing for Apple product lines / common brand stylings
  if (s === 'ipad' || n.toLowerCase() === 'ipad') return 'iPad';
  if (s === 'iphone' || n.toLowerCase() === 'iphone') return 'iPhone';
  if (s === 'macbook' || n.toLowerCase() === 'macbook') return 'MacBook';

  return n || name || '';
}

function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function BrandPickerPricelist({
  devices,
  pricing, // legacy object (devicePricing)
  pricingSource = 'static', // 'static' | 'firestore'
  brandOptions, // [{ slug, name }]
  defaultBrand,
  categorySlug = 'telefonu-remonts',
  serviceIds, // ✅ IMPORTANT: no default [] here (prevents infinite effect loops)
  title,
  intro,
  allModelsHref,
  cta,
  className,
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const initialBrand = (
    sp.get('brand') ||
    defaultBrand ||
    brandOptions?.[0]?.slug ||
    ''
  )
    .toLowerCase()
    .trim();

  const [brand, setBrand] = useState(initialBrand);

  // Firestore-loaded pricing (same shape as devicePricing)
  const [fsPricing, setFsPricing] = useState(null);
  const [fsLoading, setFsLoading] = useState(false);
  const [fsError, setFsError] = useState('');

  // ✅ Normalize/lock serviceIds to a stable array + stable key
  const serviceIdsArr = useMemo(
    () => (Array.isArray(serviceIds) ? serviceIds : []),
    [serviceIds]
  );

  const serviceIdsKey = useMemo(() => {
    // stable string to use in dependencies
    return serviceIdsArr.length ? serviceIdsArr.join('|') : '';
  }, [serviceIdsArr]);

  // ✅ Keep state in sync when URL changes (back/forward, external replace)
  // Depend on the brand string, not the searchParams object identity.
  const urlBrand = (sp.get('brand') || '').toLowerCase().trim();
  useEffect(() => {
    if (urlBrand && urlBrand !== brand) setBrand(urlBrand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlBrand]);

  // ✅ Keep URL in sync when state changes (clicking brand tabs)
  // Guarded to avoid replace loops.
  useEffect(() => {
    const cur = (sp.get('brand') || '').toLowerCase().trim();
    if (!brand || cur === brand) return;

    const params = new URLSearchParams(sp.toString());
    params.set('brand', brand);
    router.replace(`?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  const brandList = useMemo(() => {
    if (!brandOptions?.length) return null;

    return (
      <div className={styles.brandTabs} role="tablist" aria-label="Zīmola izvēle">
        {brandOptions.map((b) => {
          const slug = String(b.slug || '').toLowerCase().trim();
          const active = brand === slug;
          const label = normalizeBrandName(slug, b.name);

          return (
            <button
              key={slug}
              type="button"
              role="tab"
              aria-selected={active}
              className={`${styles.tab} ${active ? styles.active : ''}`}
              onClick={() => setBrand(slug)}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }, [brand, brandOptions]);

  // Build the list of model slugs we need to load pricing for (for selected brand + category)
  const modelSlugsForBrand = useMemo(() => {
    const b = String(brand || '').toLowerCase().trim();
    const cat = String(categorySlug || '').toLowerCase().trim();

    return (devices || [])
      .filter((d) => String(d?.category || '').toLowerCase().trim() === cat)
      .filter((d) => String(d?.brandSlug || '').toLowerCase().trim() === b)
      .map((d) => String(d.slug))
      .filter(Boolean);
  }, [devices, brand, categorySlug]);

  // Load pricing from Firestore when requested
  useEffect(() => {
    let cancelled = false;

    async function loadFromFirestore() {
      if (pricingSource !== 'firestore') {
        setFsPricing(null);
        setFsLoading(false);
        setFsError('');
        return;
      }

      // If no models, nothing to load
      if (!modelSlugsForBrand.length) {
        setFsPricing({});
        setFsLoading(false);
        setFsError('');
        return;
      }

      setFsLoading(true);
      setFsError('');

      try {
        // Firestore "in" supports limited list size; use safe chunk size
        const CHUNK = 30;
        const chunks = chunkArray(modelSlugsForBrand, CHUNK);

        // devicePricing-like object:
        // { [modelSlug]: { items: [ { id: serviceId, price }, ... ] } }
        const pricingObj = {};

        // Initialize models so ServicePricelist sees empty lists instead of undefined
        for (const modelSlug of modelSlugsForBrand) {
          pricingObj[modelSlug] = { items: [] };
        }

        for (const group of chunks) {
          const q = query(collection(db, 'modelServices'), where('modelId', 'in', group));
          const snap = await getDocs(q);

          const temp = new Map(); // modelId -> Map(serviceId -> price)

          snap.forEach((docSnap) => {
            const data = docSnap.data() || {};
            const modelId = data.modelId;
            const serviceId = data.serviceId;
            if (!modelId || !serviceId) return;

            // Filter to serviceIds if provided
            if (serviceIdsArr.length) {
              if (!serviceIdsArr.includes(serviceId)) return;
            }

            if (!temp.has(modelId)) temp.set(modelId, new Map());
            temp
              .get(modelId)
              .set(
                serviceId,
                Object.prototype.hasOwnProperty.call(data, 'price') ? data.price : ''
              );
          });

          // Convert into the expected "items" arrays
          for (const [modelId, byService] of temp.entries()) {
            if (serviceIdsArr.length) {
              // preserve provided serviceIds order
              pricingObj[modelId] = {
                items: serviceIdsArr
                  .filter((sid) => byService.has(sid))
                  .map((sid) => ({ id: sid, price: byService.get(sid) })),
              };
            } else {
              // alphabetical serviceId order
              const items = Array.from(byService.entries())
                .sort(([a], [b]) => String(a).localeCompare(String(b)))
                .map(([sid, price]) => ({ id: sid, price }));
              pricingObj[modelId] = { items };
            }
          }
        }

        if (cancelled) return;
        setFsPricing(pricingObj);
      } catch (e) {
        if (cancelled) return;
        setFsError('Neizdevās ielādēt cenas no Firebase.');
        setFsPricing({});
      } finally {
        if (!cancelled) setFsLoading(false);
      }
    }

    loadFromFirestore();
    return () => {
      cancelled = true;
    };
    // ✅ use serviceIdsKey instead of serviceIds array identity
  }, [pricingSource, modelSlugsForBrand, serviceIdsKey, serviceIdsArr]);

  const effectivePricing = pricingSource === 'firestore' ? fsPricing : pricing;

  return (
    <>
      {brandList}

      {pricingSource === 'firestore' && (
        <div style={{ marginTop: 8, marginBottom: 8 }}>
          {fsLoading && <div style={{ opacity: 0.7 }}>Ielādē cenas…</div>}
          {!fsLoading && fsError && <div style={{ color: 'crimson' }}>{fsError}</div>}
        </div>
      )}

      <ServicePricelist
        devices={devices}
        pricing={effectivePricing}
        brandSlug={brand}
        categorySlug={categorySlug}
        serviceIds={serviceIdsArr}
        title={title}
        intro={intro}
        viewAllHref={allModelsHref}
        cta={cta}
        className={className}
      />
    </>
  );
}
