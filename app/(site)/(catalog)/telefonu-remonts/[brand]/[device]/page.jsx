import { notFound } from 'next/navigation';
import devices from '@/data/devices';

export async function generateMetadata({ params }) {
  const { brand, device } = await params;              // ← await here
  const slug = decodeURIComponent(device);
  const d = devices.find(x => x.slug === slug && x.brandSlug === brand);
  return {
    title: d?.metaTitle ?? `${brand} ${slug} remonts | iLab`,
    description: d?.metaDescription ?? 'Remonts un diagnostika iLab.',
  };
}

export default async function Page({ params }) {
  const { brand, device } = await params;              // ← and here
  const slug = decodeURIComponent(device);
  const d = devices.find(x => x.slug === slug && x.brandSlug === brand);

  if (!d) return notFound();

  // render your device page using `d`
  return (
    <main>
      {/* …device header, pricing, etc… */}
    </main>
  );
}
