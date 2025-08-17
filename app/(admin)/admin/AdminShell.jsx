'use client';

// app/(admin)/AdminShell.jsx
// Adds mobile topbar (expandable) + desktop sidebar shell around admin pages.

import { useEffect, useRef, useState } from 'react';
import styles from './AdminShell.module.scss';

export default function AdminShell({ children }) {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Move focus to first sidebar link when opening (a11y)
  useEffect(() => {
    if (open && firstLinkRef.current) firstLinkRef.current.focus();
  }, [open]);

  return (
    <div className={styles.layout}>
      {/* Sidebar (desktop fixed, mobile slide-in) */}
      <aside
        className={`${styles.sidebar} ${open ? styles.open : ''}`}
        aria-hidden={!open}
        aria-label="Admin navigation"
        id="admin-sidebar"
      >
        <div className={styles.brand}>iLab Admin</div>

        <nav className={styles.menu}>
          <a ref={firstLinkRef} href="/admin">Dashboard</a>
          <a href="/admin/devices">Devices</a>
          <a href="/admin/models">Models</a>
          <a href="/admin/services">Services</a>
          <a href="/admin/model-services">Model Services</a>
          <a href="/admin/media">Media</a>
          <a href="/admin/settings">Settings</a>
        </nav>
      </aside>

      {/* Main column */}
      <div className={styles.main}>
        {/* Mobile topbar */}
        <div className={styles.topbar}>
          <button
            type="button"
            className={styles.menuBtn}
            aria-label="Open menu"
            aria-controls="admin-sidebar"
            aria-expanded={open ? 'true' : 'false'}
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
          <div className={styles.title}>Admin</div>
        </div>

        {/* Scrollable content */}
        <main className={styles.content}>{children}</main>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
