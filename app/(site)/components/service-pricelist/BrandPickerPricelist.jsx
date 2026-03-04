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

function norm(v) {
  return String(v ?? '').toLowerCase().trim();
}

export default function BrandPickerPricelist({
  devices,
  pricing, // legacy object (devicePricing)
  pricingSource = 'static', // 'static' | 'firestore'
  brandOptions, // [{ slug, name }]
  defaultBrand,
  // default remains telefonu-remonts for existing category pages
  // /cenas should pass categorySlug="all"
  categorySlug = 'telefonu-remonts',
  serviceIds, // IMPORTANT: no default [] here
  title,
  intro,
  allModelsHref,
  cta,
  className,
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const initialBrand = norm(sp.get('brand')) || norm(defaultBrand) || norm(brandOptions?.[0]?.slug) || '';
  const [brand, setBrand] = useState(initialBrand);

  // Firestore-loaded pricing (same shape as devicePricing)
  const [fsPricing, setFsPricing] = useState(null);
  const [fsLoading, setFsLoading] = useState(false);
  const [fsError, setFsError] = useState('');

  // Normalize/lock serviceIds to a stable array + stable key
  const serviceIdsArr = useMemo(
    () => (Array.isArray(serviceIds) ? serviceIds : []),
    [serviceIds]
  );

  const serviceIdsKey = useMemo(
    () => (serviceIdsArr.length ? serviceIdsArr.join('|') : ''),
    [serviceIdsArr]
  );

  // Keep state in sync when URL changes (back/forward, external replace)
  const urlBrand = norm(sp.get('brand'));
  useEffect(() => {
    if (urlBrand && urlBrand !== brand) setBrand(urlBrand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlBrand]);

  // Keep URL in sync when state changes (clicking brand tabs)
  useEffect(() => {
    const cur = norm(sp.get('brand'));
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
          const slug = norm(b.slug);
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

  // ✅ Internal category normalization:
  // - For loading pricing we want "all" to mean "no category filter"
  const catKey = norm(categorySlug);

  // Build the list of model slugs we need to load pricing for (selected brand + optional category)
  const modelSlugsForBrand = useMemo(() => {
    const b = norm(brand);

    return (devices || [])
      .filter((d) => {
        if (!catKey || catKey === 'all') return true;
        return norm(d?.category) === catKey;
      })
      .filter((d) => norm(d?.brandSlug) === b)
      .map((d) => String(d?.slug || '').trim())
      .filter(Boolean);
  }, [devices, brand, catKey]);

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
          const q = query(
            collection(db, 'modelServices'),
            where('modelId', 'in', group)
          );
          const snap = await getDocs(q);

          const temp = new Map(); // modelId -> Map(serviceId -> price)

          snap.forEach((docSnap) => {
            const data = docSnap.data() || {};
            const modelId = data.modelId;
            const serviceId = data.serviceId;
            if (!modelId || !serviceId) return;

            // Filter to serviceIds if provided
            if (serviceIdsArr.length && !serviceIdsArr.includes(serviceId)) return;

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
              pricingObj[modelId] = {
                items: serviceIdsArr
                  .filter((sid) => byService.has(sid))
                  .map((sid) => ({ id: sid, price: byService.get(sid) })),
              };
            } else {
              const items = Array.from(byService.entries())
                .sort(([a], [b]) => String(a).localeCompare(String(b)))
                .map(([sid, price]) => ({ id: sid, price }));
              pricingObj[modelId] = { items };
            }
          }
        }

        if (cancelled) return;
        setFsPricing(pricingObj);
      } catch {
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
  }, [pricingSource, modelSlugsForBrand, serviceIdsKey, serviceIdsArr]);

  const effectivePricing = pricingSource === 'firestore' ? fsPricing : pricing;

  // ✅ IMPORTANT:
  // ServicePricelist may not understand categorySlug="all".
  // Pass '' to indicate "no category filter" for /cenas,
  // while preserving the original behavior for category pages.
  const servicePricelistCategorySlug = catKey === 'all' ? '' : categorySlug;

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
        categorySlug={servicePricelistCategorySlug}
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