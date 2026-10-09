'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

const AUTH_ERROR_MESSAGES = {
  'auth/invalid-credential': 'Login failed. Check email/password.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/too-many-requests': 'Too many login attempts. Try again later.',
  'auth/user-disabled': 'This account has been disabled.',
};

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accessDenied, setAccessDenied] = useState(false);

  async function logoutDeniedUser() {
    setLoading(true);
    try {
      await fetch('/api/admin/session', { method: 'DELETE' });
      await signOut(auth);
      setAccessDenied(false);
      setPassword('');
      setError('');
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setAccessDenied(false);
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const idToken = await credential.user.getIdToken();
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        if (response.status === 403) {
          setAccessDenied(true);
          setError('');
          return;
        }
        await signOut(auth);
        throw new Error(result.error || 'Service admin access is denied.');
      }

      router.replace('/admin');
      router.refresh();
    } catch (loginError) {
      setError(
        AUTH_ERROR_MESSAGES[loginError?.code] ||
          loginError?.message ||
          'Unable to log in.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 16 }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>Admin login</h1>

      {accessDenied ? (
        <div role="alert" style={{ display: 'grid', gap: 12 }}>
          <p>Access denied. This account cannot access the service admin.</p>
          <button type="button" disabled={loading} onClick={logoutDeniedUser}>
            {loading ? 'Signing out…' : 'Logout'}
          </button>
        </div>
      ) : (

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Email</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #ccc' }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #ccc' }}
          />
        </label>

        {error && <div style={{ color: 'crimson', fontSize: 14 }}>{error}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{ padding: 10, borderRadius: 10, border: 0 }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      )}
    </div>
  );
}
