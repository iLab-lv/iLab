// app/(site)/components/service-pricelist/BrandPickerPricelist.jsx
'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';
import styles from './BrandPickerPricelist.module.scss';

import { getServiceSelectorPricing } from '@/lib/pricing/getServiceSelectorPricing.client';

function normalizeBrandName(slug, name) {
  const s = String(slug || '').toLowerCase();
  const n = String(name || '').trim();

  if (s === 'ipad' || n.toLowerCase() === 'ipad') return 'iPad';
  if (s === 'iphone' || n.toLowerCase() === 'iphone') return 'iPhone';
  if (s === 'macbook' || n.toLowerCase() === 'macbook') return 'MacBook';

  return n || name || '';
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
  locale = 'lv',
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
  const [resolvedServiceIds, setResolvedServiceIds] = useState([]);
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
      <div className={styles.brandTabs} role="tablist" aria-label={locale === 'ru' ? 'Выбор бренда' : 'Zīmola izvēle'}>
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
  }, [brand, brandOptions, locale]);

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
        const selectedDevices = (devices || []).filter((device) => modelSlugsForBrand.includes(device.slug));
        const result = await getServiceSelectorPricing(selectedDevices, categorySlug, serviceIdsArr, locale);

        if (cancelled) return;

        setPricing(result.pricing);
        setResolvedServiceIds(result.serviceIds);
      } catch {
        if (cancelled) return;

        setError(locale === 'ru' ? 'Не удалось загрузить цены из Firebase.' : 'Neizdevās ielādēt cenas no Firebase.');
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
  }, [modelSlugsForBrand, serviceIdsKey, serviceIdsArr, devices, categorySlug, locale]);

  const servicePricelistCategorySlug = catKey === 'all' ? '' : categorySlug;

  return (
    <>
      {brandList}

      <div style={{ marginTop: 8, marginBottom: 8 }}>
        {loading && <div style={{ opacity: 0.7 }}>{locale === 'ru' ? 'Загрузка цен…' : 'Ielādē cenas…'}</div>}
        {!loading && error && <div style={{ color: 'crimson' }}>{error}</div>}
      </div>

      <ServicePricelist
        devices={devices}
        pricing={pricing}
        brandSlug={brand}
        categorySlug={servicePricelistCategorySlug}
        serviceIds={resolvedServiceIds.length ? resolvedServiceIds : serviceIdsArr}
        locale={locale}
        title={title}
        intro={intro}
        viewAllHref={allModelsHref}
        cta={cta}
        className={className}
      />
    </>
  );
}