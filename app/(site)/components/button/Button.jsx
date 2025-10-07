'use client';

import Link from 'next/link';
import s from './Button.module.scss';

/**
 * Reusable Button
 * Variants: 'primary' | 'secondary' | 'ghost' | 'ctaChip'
 * Sizes: 'md' | 'lg'
 * Features:
 *  - iconOnly (forces square + circular, hides label; requires aria-label)
 *  - block (full width)
 *  - href -> renders link (Next Link for internal paths, <a> for in-page hashes/external)
 *  - disabled, target, rel
 *  - leadingIcon / trailingIcon (React component or node)
 *  - chipDir: 'right' | 'down' (for ctaChip arrow direction)
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  iconOnly = false,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  chipDir = 'right',
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  // Dev guard: iconOnly must have an accessible name
  if (process.env.NODE_ENV !== 'production') {
    if (iconOnly && !rest['aria-label']) {
      // eslint-disable-next-line no-console
      console.warn('Button(iconOnly) requires aria-label for accessibility.');
    }
  }

  const hasLeadingIcon = Boolean(LeadingIcon);

  const classes = [
    s.button,
    s[variant],
    s[size],
    iconOnly && s.iconOnly,
    block && s.block,
    disabled && s.disabled,
    variant === 'ctaChip' && hasLeadingIcon && s.hasIcon,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Data attrs (used by CSS to pick arrow direction)
  const dataAttrs =
    variant === 'ctaChip'
      ? { 'data-chip-dir': chipDir === 'down' ? 'down' : 'right' }
      : {};

  const IconEl = (Icon) =>
    Icon ? (
      <span className={s.icon} aria-hidden="true">
        {typeof Icon === 'function' ? <Icon /> : Icon}
      </span>
    ) : null;

  const content = (
    <>
      {IconEl(LeadingIcon)}
      {!iconOnly && <span className={s.label}>{children}</span>}
      {IconEl(TrailingIcon)}
    </>
  );

  // Link handling
  if (href && !disabled) {
    const isInternalPath = href.startsWith('/'); // Next.js route
    const isHash = href.startsWith('#');         // in-page anchor

    if (isInternalPath) {
      return (
        <Link href={href} className={classes} {...dataAttrs} {...rest}>
          {content}
        </Link>
      );
    }

    if (isHash) {
      const handleClick = (e) => {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // update the hash in URL without reloading
          if (history && history.replaceState) {
            history.replaceState(null, '', href);
          }
        }
      };

      return (
        <a href={href} onClick={handleClick} className={classes} {...dataAttrs} {...rest}>
          {content}
        </a>
      );
    }

    // External link (default to new tab unless target provided)
    return (
      <a
        href={href}
        target={target || '_blank'}
        rel={rel || 'noopener'}
        className={classes}
        {...dataAttrs}
        {...rest}
      >
        {content}
      </a>
    );
  }

  // Button element
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...dataAttrs}
      {...rest}
    >
      {content}
    </button>
  );
}
