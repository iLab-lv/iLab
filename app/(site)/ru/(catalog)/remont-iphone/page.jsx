import IphoneRepairPage from '@site/(catalog)/iphone-remonts/IphoneRepairPage';
import { resolveDedicatedBrandHubPage } from '@/lib/content/resolvers/catalogPages';
import Footer from '@site/ui/footer/Footer';


export async function generateMetadata() {
  const page = await resolveDedicatedBrandHubPage('telefonu-remonts', 'apple', 'ru');

  if (!page) {
    return {
      title: 'Ремонт iPhone в Риге | iLab',
      description:
        'Ремонт iPhone в Риге — замена экрана, батареи, камеры и разъёма зарядки, устранение последствий попадания влаги. Быстрая диагностика, понятные цены и гарантия 90 дней в сервисе iLab.',
      alternates: { canonical: '/ru/remont-iphone' },
    };
  }

  return {
    title: page.seo.metaTitle,
    description: page.seo.metaDescription,
    alternates: {
      canonical: page.route.canonicalPath,
    },
  };
}

export default function Page() {
  return ( 
    <>
  <IphoneRepairPage locale="ru" />
  <Footer locale="ru" />
  </>
);
}