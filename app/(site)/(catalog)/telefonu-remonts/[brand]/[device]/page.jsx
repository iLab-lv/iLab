const titleize = (s) => decodeURIComponent(s).replace(/-/g, ' ')
  .replace(/\b\w/g, (c) => c.toUpperCase());

export async function generateMetadata({ params }) {
  return { title: `${titleize(params.brand)} ${titleize(params.device)} remonts | iLab` };
}

export default function Page({ params }) {
  const { brand, device } = params;
  return (
    <main id="main">
      <h1>{titleize(brand)} {titleize(device)} — remonts</h1>
      <p>Šī ir konkrētā modeļa lapa. Aizstāj ar cenu/satura blokiem.</p>
    </main>
  );
}
