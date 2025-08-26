// app/(site)/[category]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";

// mock data (adjust if your export names differ)
import categories from "@/data/categories";
import devices from "@/data/devices";

function getCategoryBySlug(slug) {
  return categories.find(c => c.slug === slug);
}

function getDevicesForCategory(catSlug) {
  return devices.filter(d => d.category === catSlug);
}

export function generateStaticParams() {
  // Prebuild all category landings
  return categories.map(c => ({ category: c.slug }));
}

export function generateMetadata({ params }) {
  const cat = getCategoryBySlug(params.category);
  const title = cat ? `${cat.name} — iLab` : "Kategorija — iLab";
  const description = cat
    ? `${cat.name}: populārākie modeļi un remonti Rīgā.`
    : `Remonta kategorija: ${params.category}`;
  const canonical = `/${params.category}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default function CategoryPage({ params }) {
  const cat = getCategoryBySlug(params.category);
  if (!cat) return notFound();

  const list = getDevicesForCategory(cat.slug);

  return (
    <main>
      <header>
        <h1>{cat.name}</h1>
        {cat.heroImage && <img src={cat.heroImage} alt={cat.name} loading="lazy" />}
      </header>

      {list.length === 0 ? (
        <p>Šajā kategorijā vēl nav ierīču.</p>
      ) : (
        <section aria-labelledby="devices-heading">
          <h2 id="devices-heading">Modeļi</h2>
          <ul className="grid">
            {list.map(d => (
              <li key={d.slug} className="card">
                <Link href={`/${cat.slug}/${d.slug}`}>
                  <div className="card__body">
                    {d.image && <img src={d.image} alt={d.name} loading="lazy" />}
                    <h3>{d.name}</h3>
                    {d.year && <p>{d.year}</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
