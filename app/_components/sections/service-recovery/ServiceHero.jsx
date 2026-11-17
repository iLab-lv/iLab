import { access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import CatalogHero from '../catalog-hub/CatalogHero';
import { getSiteSettings } from '@/lib/siteSettings';
import { SignatureAccent } from '../headings/SignatureText';

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

export default async function ServiceHero({ image, locale = 'lv', template, ...props }) {
  const resolved = await getImage(image);
  const settings = template === 'dyson' ? await getSiteSettings() : null;
  const phone = settings?.locations?.find(location => location.telLink || location.tel);
  const href = phone?.telLink || (phone?.tel ? `tel:${phone.tel.replaceAll(' ', '')}` : settings?.company?.phoneMain ? `tel:${settings.company.phoneMain.replaceAll(' ', '')}` : null);
  const title = props.title === 'iPhone ekrāna maiņa Rīgā'
    ? <><span>iPhone </span><span><SignatureAccent level="hero">ekrāna maiņa</SignatureAccent> </span><span>Rīgā</span></>
    : props.title === 'Dyson remonts Rīgā'
      ? <><span><SignatureAccent level="hero">Dyson</SignatureAccent> </span><span>remonts Rīgā</span></>
      : undefined;
  return <CatalogHero {...props} {...resolved} displayTitle={title} locale={locale} variant="service"
    imageRatio={template === 'dyson' ? '4 / 5' : '1 / 1'}
    bodyAfterActions={template === 'dyson'}
    secondaryAction={href ? { href, label: locale === 'ru' ? 'Позвонить' : 'Zvanīt' } : undefined}
    placeholderLabel={locale === 'ru' ? 'Изображение недоступно' : 'Attēls nav pieejams'} />;
}
