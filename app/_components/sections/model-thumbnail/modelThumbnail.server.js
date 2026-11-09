import { existsSync } from 'node:fs';
import path from 'node:path';
import { modelImageSource } from './modelPresentation';

export function availableModelImage(device) {
  const source = modelImageSource(device);
  if (!source) return '';
  if (!source.startsWith('/images/')) return source;
  const root = path.resolve(process.cwd(), 'public');
  const file = path.resolve(root, `.${source}`);
  return file.startsWith(`${root}${path.sep}`) && existsSync(file) ? source : '';
}

export function withModelThumbnail(device) {
  return { ...device, thumbnailSrc: availableModelImage(device) };
}
