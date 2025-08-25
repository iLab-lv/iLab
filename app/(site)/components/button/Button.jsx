'use client';

import Link from 'next/link';
import s from './Button.module.scss';

/**
 * Reusable Button
 * Variants: 'primary' | 'secondary' | 'ghost'
 * Sizes: 'md' | 'lg'
 * Features:
 *  - iconOnly (forces square + circular, hides label; requires aria-label)
 *  - block (full width)
 *  - href -> renders link (Next Link for internal, <a> for external)
 *  - disabled, target, rel
 *  - leadingIcon / trailingIcon (React component or node)
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  iconOnly = false,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
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

  const classes = [
    s.button,
    s[variant],
    s[size],
    iconOnly && s.iconOnly,
    block && s.block,
    disabled && s.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

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

  // Link (internal vs external)
  if (href && !disabled) {
    const isInternal = href.startsWith('/');
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...rest}>
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target={target || '_blank'}
        rel={rel || 'noopener'}
        className={classes}
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
      {...rest}
    >
      {content}
    </button>
  );
}
