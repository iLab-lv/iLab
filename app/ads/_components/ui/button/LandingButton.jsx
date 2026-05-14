'use client';

import Link from 'next/link';
import s from './LandingButton.module.scss';

export default function LandingButton({
  variant = 'primary',
  tone = 'accent',
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
  if (process.env.NODE_ENV !== 'production') {
    if (iconOnly && !rest['aria-label']) {
      // eslint-disable-next-line no-console
      console.warn('LandingButton(iconOnly) requires aria-label.');
    }
  }

  const classes = [
    s.button,
    s[variant],
    s[tone],
    s[size],
    iconOnly && s.iconOnly,
    block && s.block,
    disabled && s.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderIcon = (Icon) => {
    if (!Icon) return null;

    const iconName =
      typeof Icon === 'function' ? Icon.displayName || Icon.name : '';

    const isWhatsappIcon =
      iconName === 'FaWhatsapp' ||
      iconName === 'FaWhatsappSquare' ||
      iconName?.toLowerCase().includes('whatsapp');

    return (
      <span
        className={`${s.icon} ${isWhatsappIcon ? s.iconWhatsapp : ''}`}
        aria-hidden="true"
      >
        {typeof Icon === 'function' ? <Icon /> : Icon}
      </span>
    );
  };

  const content = (
    <>
      {renderIcon(LeadingIcon)}
      {!iconOnly && <span className={s.label}>{children}</span>}
      {renderIcon(TrailingIcon)}
    </>
  );

  if (href && !disabled) {
    const isInternalPath = href.startsWith('/');
    const isHash = href.startsWith('#');

    if (isInternalPath) {
      return (
        <Link href={href} className={classes} {...rest}>
          {content}
        </Link>
      );
    }

    if (isHash) {
      const handleClick = (event) => {
        const el = document.querySelector(href);
        if (!el) return;

        event.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (history?.replaceState) {
          history.replaceState(null, '', href);
        }
      };

      return (
        <a href={href} onClick={handleClick} className={classes} {...rest}>
          {content}
        </a>
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