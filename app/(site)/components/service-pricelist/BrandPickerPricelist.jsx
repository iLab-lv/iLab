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
  serviceIds = [],
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
  ).toLowerCase();

  const [brand, setBrand] = useState(initialBrand);

  // Firestore-loaded pricing (same shape as devicePricing)
  const [fsPricing, setFsPricing] = useState(null);
  const [fsLoading, setFsLoading] = useState(false);
  const [fsError, setFsError] = useState('');

  // keep URL in sync (?brand=…)
  useEffect(() => {
    const cur = sp.get('brand');
    if (brand && cur !== brand) {
      const params = new URLSearchParams(sp.toString());
      params.set('brand', brand);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  const brandList = useMemo(() => {
    if (!brandOptions?.length) return null;

    return (
      <div className={styles.brandTabs} role="tablist" aria-label="Zīmola izvēle">
        {brandOptions.map((b) => {
          const slug = String(b.slug || '').toLowerCase();
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
    const b = String(brand || '').toLowerCase();
    const cat = String(categorySlug || '').toLowerCase();

    return (devices || [])
      .filter((d) => String(d?.category || '').toLowerCase() === cat)
      .filter((d) => String(d?.brandSlug || '').toLowerCase() === b)
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

        // We'll build devicePricing-like object:
        // { [modelSlug]: { items: [ { id: serviceId, price }, ... ] } }
        const pricingObj = {};

        // Initialize models so ServicePricelist sees empty lists instead of undefined
        for (const modelSlug of modelSlugsForBrand) {
          pricingObj[modelSlug] = { items: [] };
        }

        for (const group of chunks) {
          const q = query(
            collection(db, 'modelServices'),
            where('modelId', 'in', group)
          );

          const snap = await getDocs(q);

          // Collect per model -> per service
          // We keep prices as-is (number|string|""|null)
          const temp = new Map(); // modelId -> Map(serviceId -> price)

          snap.forEach((doc) => {
            const data = doc.data() || {};
            const modelId = data.modelId;
            const serviceId = data.serviceId;
            if (!modelId || !serviceId) return;

            // Filter to serviceIds if provided
            if (Array.isArray(serviceIds) && serviceIds.length) {
              if (!serviceIds.includes(serviceId)) return;
            }

            if (!temp.has(modelId)) temp.set(modelId, new Map());
            temp.get(modelId).set(serviceId, Object.prototype.hasOwnProperty.call(data, 'price') ? data.price : '');
          });

          // Convert into the expected "items" arrays
          for (const [modelId, byService] of temp.entries()) {
            // Preserve serviceIds order if serviceIds provided
            if (Array.isArray(serviceIds) && serviceIds.length) {
              pricingObj[modelId] = {
                items: serviceIds
                  .filter((sid) => byService.has(sid))
                  .map((sid) => ({ id: sid, price: byService.get(sid) })),
              };
            } else {
              // Otherwise just dump in alphabetical serviceId order
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
    // IMPORTANT: serviceIds affects filtering
  }, [pricingSource, modelSlugsForBrand, serviceIds]);

  const effectivePricing = pricingSource === 'firestore' ? fsPricing : pricing;

  return (
    <>
      {brandList}

      {/* Optional tiny status line; remove if you don't want it */}
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
        serviceIds={serviceIds}
        title={title}
        intro={intro}
        viewAllHref={allModelsHref}
        cta={cta}
        className={className}
      />
    </>
  );
}
