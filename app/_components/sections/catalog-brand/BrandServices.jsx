import PopularRepairs from '../popular-repairs/PopularRepairs';

export default function BrandServices({ id = 'brand-services', title, items = [], locale = 'lv', modelAction, intro }) {
  return <PopularRepairs id={id} title={title} intro={intro} locale={locale} variant="featured"
    items={items.map(item => ({
      ...item, description: item.text,
      actions: [modelAction && { kind: 'model', ...modelAction }, item.href && { kind: 'service', href: item.href }].filter(Boolean),
    }))} />;
}
