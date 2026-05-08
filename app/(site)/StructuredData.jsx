import { getSiteSettings } from '@/lib/siteSettings';
import { buildSiteSchemaGraph } from '@/lib/seo/siteSchema';

export default async function StructuredData() {
  const siteSettings = await getSiteSettings();
  const schemaGraph = buildSiteSchemaGraph(siteSettings);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaGraph).replace(/</g, '\\u003c'),
      }}
    />
  );
}