const titleize = (s) => decodeURIComponent(s).replace(/-/g, ' ')
  .replace(/\b\w/g, (c) => c.toUpperCase());

export async function generateMetadata({ params }) {
  return { title: `${titleize(params.brand)} planšetdatoru remonts | iLab` };
}

export default function Page({ params }) {
  const { brand } = params;
  return (
    <main id="main">
      <h1>Planšetdatoru remonts — {titleize(brand)}</h1>
      <p>Šī ir {titleize(brand)} planšetdatoru zīmola lapa.</p>
    </main>
  );
}
