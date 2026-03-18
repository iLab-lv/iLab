'use client';

import Link from 'next/link';
import {
  RiSmartphoneLine,
  RiTabletLine,
  RiMacbookLine,
  RiComputerLine,
  RiArrowRightLine,
} from 'react-icons/ri';
import { MdOutlineDns } from 'react-icons/md';
import s from './DeviceButton.module.scss';

const ICONS = {
  phone: RiSmartphoneLine,
  tablet: RiTabletLine,
  laptop: RiMacbookLine,
  imac: RiComputerLine,
  station: MdOutlineDns,
};

export default function DeviceButton({
  href,
  label,
  device = 'phone',
  size = 'lg',        // ← default size
  className = '',
  disabled = false,
  ...rest
}) {
  const Icon = ICONS[device] || RiSmartphoneLine;

  const classes = [
    s.button,
    s[size],           // ← applies .lg automatically
    disabled && s.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className={s.iconWrap} aria-hidden="true">
        <Icon className={s.icon} />
      </span>

      <span className={s.label}>{label}</span>

      <span className={s.arrowWrap} aria-hidden="true">
        <RiArrowRightLine className={s.arrow} />
      </span>
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
      const handleClick = (e) => {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.history?.replaceState) {
            window.history.replaceState(null, '', href);
          }
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
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {content}
    </button>
  );
}