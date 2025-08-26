// app/(site)/[category]/[device]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";

// mocks
import categories from "@/data/categories";
import devices from "@/data/devices";
// (optional) when you add services later:
// import services from "../../data/services";
// import deviceServices from "../../data/deviceServices";

function getCategoryBySlug(slug) {
  return categories.find(c => c.slug === slug);
}
function getDeviceBySlug(slug) {
  return devices.find(d => d.slug === slug);
}

export function generateStaticParams() {
  // Prebuild all device pages under their category
  return devices.map(d => ({ category: d.category, device: d.slug }));
}

export function generateMetadata({ params }) {
  const dev = getDeviceBySlug(params.device);
  const title =
    dev?.metaTitle || (dev ? `${dev.name} remonts — iLab` : "Ierīces remonts — iLab");
  const description =
    dev?.metaDescription || (dev ? `Remonta informācija: ${dev.name}` : `Remonts`);
  const canonical = `/${params.category}/${params.device}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default function DevicePage({ params }) {
  const cat = getCategoryBySlug(params.category);
  if (!cat) return notFound();

  const dev = getDeviceBySlug(params.device);
  if (!dev || dev.category !== cat.slug) return notFound();

  return (
    <main>
      {/* breadcrumbs */}
      <nav aria-label="Ceļš" className="breadcrumbs">
        <ol>
          <li><Link href="/">Sākums</Link></li>
          <li><Link href={`/${cat.slug}`}>{cat.name}</Link></li>
          <li aria-current="page">{dev.name}</li>
        </ol>
      </nav>

      <header>
        <h1>{dev.name}</h1>
        {dev.image && <img src={dev.image} alt={dev.name} loading="lazy" />}
        {dev.bodyHtml && (
          <div className="prose" dangerouslySetInnerHTML={{ __html: dev.bodyHtml }} />
        )}
      </header>

      {/* when you’re ready for services, render them here */}
      {/* 
      const offers = (deviceServices[dev.slug] || []).map(o => {
        const def = services.find(s => s.slug === o.serviceSlug) || {};
        return { ...o, name: def.name || o.serviceSlug, icon: def.icon || null };
      });

      {offers.length > 0 && (
        <section aria-labelledby="services-heading">
          <h2 id="services-heading">Pieejamie pakalpojumi</h2>
          <ul className="grid">
            {offers.map(s => (
              <li key={s.serviceSlug} className="card">
                <Link href={`/${cat.slug}/${dev.slug}/${s.serviceSlug}`}>
                  <div className="card__body">
                    {s.icon && <img src={s.icon} alt="" aria-hidden="true" />}
                    <h3>{s.name}</h3>
                    {typeof s.price === "number" && <p>€{s.price}</p>}
                    {s.eta && <p>ETA: {s.eta}</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      */}
    </main>
  );
}
