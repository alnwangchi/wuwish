import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const proto = req.headers.get('x-forwarded-proto');
  const host = req.headers.get('host');

  if (proto === 'http' && host) {
    const redirectUrl = `https://${host}${req.nextUrl.pathname}${req.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'] // 讓 middleware 套用到所有頁面
};
