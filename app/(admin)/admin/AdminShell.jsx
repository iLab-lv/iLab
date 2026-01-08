'use client';

// app/(admin)/AdminShell.jsx
// Adds mobile topbar (expandable) + desktop sidebar shell around admin pages.
// Includes Firebase Auth guard:
// - Unauthed users are redirected to /admin/login
// - Authed users visiting /admin/login are redirected to /admin

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';

import styles from './AdminShell.module.scss';
import { auth } from '@lib/firebaseClient';

export default function AdminShell({ children }) {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState(null);

  // Auth state subscription
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  // Route guard logic
  useEffect(() => {
    if (!authReady) return;

    const isLogin = pathname === '/admin/login';

    if (!user && !isLogin) {
      router.replace('/admin/login');
      return;
    }

    if (user && isLogin) {
      router.replace('/admin');
    }
  }, [authReady, user, pathname, router]);

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

  // While checking auth, avoid flashing UI
  if (!authReady) return null;

  const isLogin = pathname === '/admin/login';

  // If not authed and not on login page, we already redirected
  if (!user && !isLogin) return null;

  // For login page, do not wrap with the admin sidebar shell
  if (isLogin) return children;

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
          <a ref={firstLinkRef} href="/admin">
            Dashboard
          </a>
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
