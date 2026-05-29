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

  if (s === 'ipad' || n.toLowerCase() === 'ipad') return 'iPad';
  if (s === 'iphone' || n.toLowerCase() === 'iphone') return 'iPhone';
  if (s === 'macbook' || n.toLowerCase() === 'macbook') return 'MacBook';

  return n || name || '';
}

function chunkArray(arr, size) {
  const out = [];

  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }

  return out;
}

function norm(v) {
  return String(v ?? '').toLowerCase().trim();
}

export default function BrandPickerPricelist({
  devices,
  brandOptions,
  defaultBrand,
  categorySlug = 'telefonu-remonts',
  serviceIds,
  title,
  intro,
  allModelsHref,
  cta,
  className,
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const initialBrand =
    norm(sp.get('brand')) ||
    norm(defaultBrand) ||
    norm(brandOptions?.[0]?.slug) ||
    '';

  const [brand, setBrand] = useState(initialBrand);
  const [pricing, setPricing] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const serviceIdsArr = useMemo(
    () => (Array.isArray(serviceIds) ? serviceIds : []),
    [serviceIds]
  );

  const serviceIdsKey = useMemo(
    () => (serviceIdsArr.length ? serviceIdsArr.join('|') : ''),
    [serviceIdsArr]
  );

  const urlBrand = norm(sp.get('brand'));

  useEffect(() => {
    if (urlBrand && urlBrand !== brand) {
      setBrand(urlBrand);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlBrand]);

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

  const catKey = norm(categorySlug);

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

  useEffect(() => {
    let cancelled = false;

    async function loadPricing() {
      if (!modelSlugsForBrand.length) {
        setPricing({});
        setLoading(false);
        setError('');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const CHUNK = 30;
        const chunks = chunkArray(modelSlugsForBrand, CHUNK);

        const pricingObj = {};

        for (const modelSlug of modelSlugsForBrand) {
          pricingObj[modelSlug] = { items: [] };
        }

        for (const group of chunks) {
          const q = query(
            collection(db, 'modelServices'),
            where('modelId', 'in', group)
          );

          const snap = await getDocs(q);
          const temp = new Map();

          snap.forEach((docSnap) => {
            const data = docSnap.data() || {};
            const modelId = data.modelId;
            const serviceId = data.serviceId;

            if (!modelId || !serviceId) return;

            if (serviceIdsArr.length && !serviceIdsArr.includes(serviceId)) {
              return;
            }

            if (!temp.has(modelId)) {
              temp.set(modelId, new Map());
            }

            temp
              .get(modelId)
              .set(
                serviceId,
                Object.prototype.hasOwnProperty.call(data, 'price')
                  ? data.price
                  : ''
              );
          });

          for (const [modelId, byService] of temp.entries()) {
            if (serviceIdsArr.length) {
              pricingObj[modelId] = {
                items: serviceIdsArr
                  .filter((sid) => byService.has(sid))
                  .map((sid) => ({
                    id: sid,
                    price: byService.get(sid),
                  })),
              };
            } else {
              const items = Array.from(byService.entries())
                .sort(([a], [b]) => String(a).localeCompare(String(b)))
                .map(([sid, price]) => ({
                  id: sid,
                  price,
                }));

              pricingObj[modelId] = { items };
            }
          }
        }

        if (cancelled) return;

        setPricing(pricingObj);
      } catch {
        if (cancelled) return;

        setError('Neizdevās ielādēt cenas no Firebase.');
        setPricing({});
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPricing();

    return () => {
      cancelled = true;
    };
  }, [modelSlugsForBrand, serviceIdsKey, serviceIdsArr]);

  const servicePricelistCategorySlug = catKey === 'all' ? '' : categorySlug;

  return (
    <>
      {brandList}

      <div style={{ marginTop: 8, marginBottom: 8 }}>
        {loading && <div style={{ opacity: 0.7 }}>Ielādē cenas…</div>}
        {!loading && error && <div style={{ color: 'crimson' }}>{error}</div>}
      </div>

      <ServicePricelist
        devices={devices}
        pricing={pricing}
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