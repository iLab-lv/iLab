import { existsSync } from 'node:fs';
import path from 'node:path';
import CatalogHero from '../catalog-hub/CatalogHero';

const IMAGE_DIMENSIONS = {
  '/images/categories/telefonu_remonts.webp': [1800, 2000],
  '/images/categories/plansetdatoru_remonts.webp': [995, 1324],
  '/images/categories/datoru_remonts.webp': [1024, 1138],
  '/images/categories/imac_remonts.webp': [1024, 1024],
  '/images/categories/macpro_remonts.webp': [1000, 875],
};

function resolveImage(source) {
  // The category record uses a missing hyphenated filename. This is the actual
  // tablet photograph already used by the completed tablet hub, not a substitute.
  const image = source === '/images/categories/plansetdatoru-remonts.webp'
    ? '/images/categories/plansetdatoru_remonts.webp'
    : source;
  if (!image || !image.startsWith('/')) return image;
  const publicRoot = path.resolve(process.cwd(), 'public');
  const file = path.resolve(publicRoot, `.${image}`);
  return file.startsWith(`${publicRoot}${path.sep}`) && existsSync(file) ? image : null;
}

export default function BrandHero({ image: source, title, locale = 'lv', ...props }) {
  const image = resolveImage(source);
  const [imageWidth, imageHeight] = IMAGE_DIMENSIONS[image] || [];
  const heading = locale === 'lv' && title === 'Samsung telefonu remonts Rīgā'
    ? <><span>Samsung telefonu </span><span>remonts Rīgā</span></>
    : title;

  return <CatalogHero
    {...props}
    locale={locale}
    variant="brand"
    title={heading}
    image={image}
    imageWidth={imageWidth}
    imageHeight={imageHeight}
    placeholderLabel={locale === 'ru' ? 'Изображение недоступно' : 'Attēls nav pieejams'}
  />;
}
