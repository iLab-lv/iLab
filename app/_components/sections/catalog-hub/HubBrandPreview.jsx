import { existsSync } from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import ModelCard from '@/app/(site)/components/model-grid/ModelCard';
import ModelThumbnail from '../model-thumbnail/ModelThumbnail';
import { availableModelImage } from '../model-thumbnail/modelThumbnail.server';
import { modelKind, modelLabel } from '../model-thumbnail/modelPresentation';
import editorial from './HubBrandPreview.module.scss';
import s from './CatalogHubSkin.module.scss';

// Some imported device records reference unavailable local images. Keep the real
// device and destination, and show an honest missing-image state in that case.
function hasAvailableImage(device) {
  const source = device.image || (device.imagePath ? `/images/${String(device.imagePath).replace(/^\/+/, '')}` : '');
  if (!source) return false;
  if (!source.startsWith('/images/')) return true;
  const publicRoot = path.resolve(process.cwd(), 'public');
  const file = path.resolve(publicRoot, `.${source}`);
  return file.startsWith(`${publicRoot}${path.sep}`) && existsSync(file);
}

export default function HubBrandPreview({ brandSlug, brandName, items = [], total = 0, href, locale = 'lv', presentation }) {
  if (!items.length) return null;
  const label = locale === 'ru' ? `Смотреть все модели ${brandName}` : `Skatīt visus ${brandName} modeļus`;
  if (presentation === 'editorial') return (
    <section className={editorial.row} id={`brand-${brandSlug}`} aria-labelledby={`brand-${brandSlug}-h2`} data-brand-preview="editorial">
      <header><h2 id={`brand-${brandSlug}-h2`}>{brandName}</h2><span className={editorial.count}>({total})</span></header>
      <ul className={editorial.models}>{items.map((device) => {
        const label = modelLabel(device);
        return <li key={device.slug}><Link href={`${href}/${device.slug}`} aria-label={`${device.name}${locale === 'ru' ? ' ремонт и цены' : ' remonts un cenas'}`}>
          <ModelThumbnail src={availableModelImage(device)} kind={modelKind(device)} className={editorial.thumbnail} />
          <span className={editorial.label}><span>{label.name}<span className={editorial.arrow} aria-hidden="true">↗</span></span>{label.detail && <small>{label.detail}</small>}</span>
        </Link></li>;
      })}</ul>
      <Link className={editorial.all} href={href}>{label}<span aria-hidden="true">↗</span></Link>
    </section>
  );
  return (
    <div className={`${s.block} ${s.preview}`}>
      <section id={`brand-${brandSlug}`} aria-labelledby={`brand-${brandSlug}-h2`}>
        <div>
          <div className={s.previewHeader}>
            <h2 id={`brand-${brandSlug}-h2`}>{brandName}<span>({total})</span></h2>
            <Link href={href}>{label}</Link>
          </div>
          <div>
            {items.map((device) => <div key={device.slug}>
              {hasAvailableImage(device) ? <ModelCard device={device} baseHref={href} locale={locale} /> : (
                <Link href={`${href}/${device.slug}`} aria-label={`${device.name}${locale === 'ru' ? ' ремонт и цены' : ' remonts un cenas'}`}>
                  <span className={s.missingDeviceImage} aria-hidden="true">
                    <svg width="32" height="48" viewBox="0 0 32 48"><rect x="5" y="2" width="22" height="44" rx="2" /><path d="M13 7h6M14 41h4" /></svg>
                    <span>{locale === 'ru' ? 'Изображение недоступно' : 'Attēls nav pieejams'}</span>
                  </span>
                  <div><h3><span>{device.name}<span>{locale === 'ru' ? ' ремонт и цены' : ' remonts un cenas'}</span></span></h3></div>
                </Link>
              )}
            </div>)}
          </div>
        </div>
      </section>
    </div>
  );
}
