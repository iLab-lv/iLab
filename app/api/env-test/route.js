export async function GET() {
  return Response.json({
    cwd: process.cwd(),
    nodeEnv: process.env.NODE_ENV || null,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || null,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || null,
    HAS_FIREBASE_PRIVATE_KEY: !!process.env.FIREBASE_PRIVATE_KEY,
  });
}
