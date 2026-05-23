// app/(site)/(catalog)/iphone-remonts/page.jsx

import IphoneRepairPage from './IphoneRepairPage';

import { localizedCategoryPath } from '@/lib/routes/localizedPath';

const ORIGIN = 'https://www.ilab.lv';

function abs(path) {
  return `${ORIGIN}${path}`;
}

function getIphoneHubAlternates(locale = 'lv') {
  const lvPath = localizedCategoryPath('iphone-remonts', 'lv');
  const ruPath = localizedCategoryPath('iphone-remonts', 'ru');

  return {
    canonical: abs(locale === 'ru' ? ruPath : lvPath),
    languages: {
      lv: abs(lvPath),
      ru: abs(ruPath),
      'x-default': abs(lvPath),
    },
  };
}

export const metadata = {
  title: 'iPhone remonts Rīgā | iLab',
  description:
    'iPhone remonts Rīgā - displeja, baterijas, kameras un uzlādes ligzdas maiņa, ūdens bojājumu novēršana. Ātra diagnostika, skaidras cenas un 90 dienu garantija iLab servisā Rīgā.',
  alternates: getIphoneHubAlternates('lv'),
};

export default function Page() {
  return <IphoneRepairPage locale="lv" />;
}