import 'server-only';

import { cookies } from 'next/headers';
import { db, firebaseAuth } from '@/lib/firebaseAdmin';
import { canAccessServiceAdmin } from './serviceAdminPolicy.mjs';

export const SERVICE_ADMIN_COOKIE = 'ilab_service_admin_session';
export const SERVICE_ADMIN_SESSION_MS = 5 * 24 * 60 * 60 * 1000;

export class ServiceAdminAuthenticationError extends Error {}
export class ServiceAdminAuthorizationError extends Error {}

export async function getUserProfile(uid) {
  const snapshot = await db.collection('users').doc(uid).get();
  return snapshot.exists ? snapshot.data() : null;
}

export async function verifyServiceAdminIdToken(request) {
  const authorization = request.headers.get('authorization') ?? '';
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new ServiceAdminAuthenticationError('Authentication is required.');

  let token;
  try {
    token = await firebaseAuth.verifyIdToken(match[1], true);
  } catch {
    throw new ServiceAdminAuthenticationError('Authentication is invalid or expired.');
  }

  const profile = await getUserProfile(token.uid);
  if (!canAccessServiceAdmin(profile)) {
    throw new ServiceAdminAuthorizationError('Service admin access is denied.');
  }

  return { idToken: match[1], token, profile };
}

export async function getServiceAdminSession() {
  const sessionCookie = (await cookies()).get(SERVICE_ADMIN_COOKIE)?.value;
  if (!sessionCookie) return null;

  try {
    const token = await firebaseAuth.verifySessionCookie(sessionCookie, true);
    const profile = await getUserProfile(token.uid);
    return {
      token,
      profile,
      canAccessServiceAdmin: canAccessServiceAdmin(profile),
    };
  } catch {
    return null;
  }
}

export async function requireServiceAdminRequest() {
  const currentUser = await getServiceAdminSession();
  if (!currentUser) {
    return Response.json({ error: 'Authentication is required.' }, { status: 401 });
  }
  if (!currentUser.canAccessServiceAdmin) {
    return Response.json({ error: 'Service admin access is denied.' }, { status: 403 });
  }
  return null;
}
