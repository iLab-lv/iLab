import IphoneRepairPage from '@site/(catalog)/iphone-remonts/IphoneRepairPage';
import { resolveDedicatedBrandHubPage } from '@/lib/content/resolvers/catalogPages';
import { localizedCategoryPath } from '@/lib/routes/localizedPath';

const ORIGIN = 'https://www.ilab.lv';

function abs(path) {
  return `${ORIGIN}${path}`;
}

function getIphoneHubAlternates(locale = 'ru') {
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

export async function generateMetadata() {
  const page = await resolveDedicatedBrandHubPage(
    'telefonu-remonts',
    'apple',
    'ru'
  );

  if (!page) {
    return {
      title: 'Ремонт iPhone в Риге | iLab',
      description:
        'Ремонт iPhone в Риге - замена экрана, батареи, камеры и разъёма зарядки, устранение последствий попадания влаги. Быстрая диагностика, понятные цены и гарантия 90 дней в сервисе iLab.',
      alternates: getIphoneHubAlternates('ru'),
    };
  }

  return {
    title: page.seo.metaTitle,
    description: page.seo.metaDescription,
    alternates: getIphoneHubAlternates('ru'),
  };
}

export default function Page() {
  return <IphoneRepairPage locale="ru" />;
}