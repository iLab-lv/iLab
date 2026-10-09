import { cookies } from 'next/headers';
import { firebaseAuth } from '@/lib/firebaseAdmin';
import {
  SERVICE_ADMIN_COOKIE,
  SERVICE_ADMIN_SESSION_MS,
  ServiceAdminAuthenticationError,
  ServiceAdminAuthorizationError,
  verifyServiceAdminIdToken,
} from '@/lib/auth/serviceAdminSession';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { idToken } = await verifyServiceAdminIdToken(request);
    const sessionCookie = await firebaseAuth.createSessionCookie(idToken, {
      expiresIn: SERVICE_ADMIN_SESSION_MS,
    });
    (await cookies()).set(SERVICE_ADMIN_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SERVICE_ADMIN_SESSION_MS / 1000,
    });
    return Response.json({ authenticated: true });
  } catch (error) {
    if (error instanceof ServiceAdminAuthenticationError) {
      return Response.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof ServiceAdminAuthorizationError) {
      return Response.json({ error: error.message }, { status: 403 });
    }
    console.error('Unable to create service admin session.', error);
    return Response.json({ error: 'Unable to create the session.' }, { status: 500 });
  }
}

export async function DELETE() {
  (await cookies()).set(SERVICE_ADMIN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return Response.json({ authenticated: false });
}
