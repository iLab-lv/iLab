// components/button/ScrollCta.jsx
import s from './ScrollCta.module.scss';

export default function ScrollCta({
  label = 'Skatīt',
  targetId,
  className = '',
  iconClassName = '',
  ariaLabel,
  id,
}) {
  if (!targetId || !label) return null;
  const href = `#${targetId}`;
  const a11y = ariaLabel || `${label} – ritināt uz sadaļu`;

  return (
    <a id={id} href={href} className={`${s.btn} ${className}`} aria-label={a11y}>
      {label}
      <span className={`${s.icon} ${iconClassName}`} aria-hidden="true">
        {/* chevron-down (18x18) */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" focusable="false">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
