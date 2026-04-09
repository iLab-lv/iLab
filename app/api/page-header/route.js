import { NextResponse } from 'next/server';
import { resolvePageHeader } from '@/app/(site)/ui/page-header/resolvePageHeader';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get('pathname') || '/';

  try {
    const data = await resolvePageHeader(pathname);

    return NextResponse.json(data || { visible: false });
  } catch (error) {
    console.error('[page-header route] resolve failed:', error);
    return NextResponse.json({ visible: false }, { status: 200 });
  }
}