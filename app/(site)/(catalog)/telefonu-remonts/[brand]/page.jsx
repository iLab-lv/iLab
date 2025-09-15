import devicesAll from '@/data/devices';
import ModelGrid from '@components/model-grid/ModelGrid';

const titleize = (s) =>
  decodeURIComponent(s)
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export async function generateMetadata({ params }) {
  return { title: `${titleize(params.brand)} telefonu remonts | iLab` };
}

export default function Page({ params }) {
  const { brand } = params;

  // Filter devices for this category + brand
  const list = devicesAll.filter(
    (d) => d.category === 'telefonu-remonts' && d.brandSlug === brand
  );

  return (
    <>
      {/* PageHeader provides the H1; we just render the grid */}
      <ModelGrid devices={list} baseHref={`/telefonu-remonts/${brand}`} />

      {/* Fallback text if no models yet */}
      {list.length === 0 && (
        <p style={{ opacity: 0.8, marginTop: 16 }}>
          Pagaidām šim zīmolam nav pievienotu modeļu.
        </p>
      )}
    </>
  );
}
