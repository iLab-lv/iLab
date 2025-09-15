import Link from 'next/link';
import s from './ModelGrid.module.scss';

export default function ModelGrid({ devices = [], baseHref }) {
  // 1) Deduplicate by a composite key to avoid duplicates in the grid
  const seen = new Set();
  const list = [];
  for (const d of devices) {
    const k = `${d.category || '-'}:${d.brandSlug || '-'}:${d.slug}`;
    if (seen.has(k)) continue;
    seen.add(k);
    list.push(d);
  }

  if (list.length === 0) {
    return <p className={s.empty}>Šobrīd modeļi nav pieejami.</p>;
  }

  return (
    <div className={s.grid}>
      {list.map((d) => {
        const key = `${d.category || '-'}:${d.brandSlug || '-'}:${d.slug}`;
        return (
          <Link key={key} href={`${baseHref}/${d.slug}`} className={s.card}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {d.image && <img src={d.image} alt={d.name} loading="lazy" className={s.img} />}
            <div className={s.meta}>
              <h3 className={s.name}>{d.name}</h3>
              {d.year && <div className={s.sub}>{d.year}</div>}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
