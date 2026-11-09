import { access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import CatalogHero from '../catalog-hub/CatalogHero';

async function getImage(source) {
  if (!source || source.includes('/placeholders/')) return {};
  if (!source.startsWith('/')) return { image: source };
  const root = path.resolve(process.cwd(), 'public');
  const file = path.resolve(root, `.${source}`);
  if (!file.startsWith(`${root}${path.sep}`)) return {};
  try {
    await access(file);
    const { width, height } = await sharp(file).metadata();
    return { image: source, imageWidth: width, imageHeight: height };
  } catch { return {}; }
}

export default async function ModelHero({ image, modelName, locale = 'lv', ...props }) {
  const resolved = await getImage(image);
  return <CatalogHero {...props} {...resolved} locale={locale} variant="model"
    bookingValues={{ device: modelName }}
    placeholderLabel={locale === 'ru' ? 'Изображение недоступно' : 'Attēls nav pieejams'} />;
}
