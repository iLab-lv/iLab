'use client';

// app/(admin)/AdminShell.jsx
// Adds mobile topbar (expandable) + desktop sidebar shell around admin pages.
// Server authorization is enforced by the surrounding admin layout.

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

import styles from './AdminShell.module.scss';
import { auth } from '@lib/firebaseClient';

export default function AdminShell({ children }) {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);

  const router = useRouter();

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

  async function handleLogout() {
    setOpen(false);
    try {
      const response = await fetch('/api/admin/session', { method: 'DELETE' });
      if (!response.ok) throw new Error('Unable to clear the server session.');
      await signOut(auth);
      router.replace('/admin/login');
      router.refresh();
    } catch {
      // Keep the protected page visible if the server session could not be
      // cleared instead of presenting a false successful logout.
    }
  }

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
          <a
            ref={firstLinkRef}
            href="/admin"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </a>
          <a href="/admin/categories" onClick={() => setOpen(false)}>
            Catalog
          </a>
          <a href="/admin/devices" onClick={() => setOpen(false)}>
            Devices
          </a>
          <a href="/admin/services" onClick={() => setOpen(false)}>
            Services
          </a>
          <a href="/admin/pricelist" onClick={() => setOpen(false)}>
            Pricelist
          </a>
          <a href="/admin/reviews" onClick={() => setOpen(false)}>
            Reviews
          </a>
          <a href="/admin/faq" onClick={() => setOpen(false)}>
            faq
          </a>
          <a href="/admin/settings" onClick={() => setOpen(false)}>
            Settings
          </a>
        </nav>

        {/* ✅ Bottom logout */}
        <div className={styles.sidebarFooter}>
          <button
            type="button"
            className={styles.logoutBtn}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className={styles.main}>
        {/* Mobile topbar */}
        <div className={styles.topbar}>
          <button
            type="button"
            className={styles.menuBtn}
            aria-label="Toggle menu"
            aria-controls="admin-sidebar"
            aria-expanded={open ? 'true' : 'false'}
            onClick={() => setOpen((v) => !v)}
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
