'use client';

import { useEffect, useRef } from 'react';
import s from './FullscreenPanel.module.scss';

/**
 * FullscreenPanel
 * - Accessibility: role="dialog" aria-modal, Esc to close, focus trap, restore focus
 * - UX: glassy backdrop, safe-area padding, sticky header with title + Close
 * - Performance: unmounts when closed by default (mountWhenClosed=false to keep animations/state)
 */
export default function FullscreenPanel({
  open,
  title = '',
  onClose,
  children,
  mountWhenClosed = false,       // set true if you want to keep it in the tree when closed
  closeOnBackdrop = true,        // click outside to close
  labelledById,                  // optional id for the title element (else auto)
}) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);
  const titleId = labelledById || 'panel-title';

  // Prevent body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Manage focus: capture the element that opened the panel, send focus inside, restore on close
  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement;
      // Focus the first focusable element (or the panel itself)
      const t = setTimeout(() => {
        const first = panelRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        (first || panelRef.current)?.focus?.();
      }, 0);
      return () => clearTimeout(t);
    } else {
      // Restore focus to the trigger
      returnFocusRef.current?.focus?.();
    }
  }, [open]);

  // Esc to close + focus trap
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const nodes = Array.from(
          panelRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
        if (nodes.length === 0) return;

        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;

        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Backdrop clicks
  const onBackdropClick = (e) => {
    if (!closeOnBackdrop) return;
    if (e.target === overlayRef.current) onClose?.();
  };

  if (!open && !mountWhenClosed) return null;

  return (
    <div
      ref={overlayRef}
      className={`${s.overlay} ${open ? s.open : s.closed}`}
      role="presentation"
      onMouseDown={onBackdropClick}
      aria-hidden={!open}
    >
      <div
        ref={panelRef}
        className={s.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className={s.topbar}>
          <h2 id={titleId} className={s.title}>{title}</h2>
          <button
            type="button"
            className={s.close}
            aria-label="Aizvērt"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className={s.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
