import s from './QuickTrustFacts.module.scss';

// Presentation only: callers resolve locale and category content once.
export default function QuickTrustFacts({ facts = [], ariaLabel, id }) {
  const visible = facts.filter(fact => typeof fact === 'string' ? fact.trim() : fact?.text?.trim());
  if (!visible.length) return null;
  const columns = Math.min(visible.length, 6);
  return (
    <section id={id} data-quick-trust className={s.section} aria-label={ariaLabel}>
      <div className={s.container}>
        <div className={s.band} role="list" style={{
          '--fact-columns': columns,
          '--fact-columns-tablet': columns === 4 ? 2 : Math.min(columns, 3),
          '--fact-columns-mobile': Math.min(columns, 2),
        }}>
          {visible.map((fact, index) => {
            const { text, label, value } = typeof fact === 'string' ? { text: fact } : fact;
            return <div className={s.item} role="listitem" key={text + index}>
              {(label || value) && <strong className={s.label}>{label || value}</strong>}
              <span className={s.text}>{text}</span>
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}
