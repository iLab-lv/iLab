'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

import { auth } from '@/lib/firebaseClient';

export default function AccessDenied() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/session', { method: 'DELETE' });
      if (!response.ok) throw new Error('Unable to clear the server session.');
      await signOut(auth);
      router.replace('/admin/login');
      router.refresh();
    } catch {
      setError('Unable to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 520, margin: '40px auto', padding: 16 }}>
      <h1>Access denied</h1>
      <p>This account cannot access the iLab service admin.</p>
      {error && <p role="alert" style={{ color: 'crimson' }}>{error}</p>}
      <button type="button" disabled={loading} onClick={handleLogout}>
        {loading ? 'Signing out…' : 'Logout'}
      </button>
    </main>
  );
}
