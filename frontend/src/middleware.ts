import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLoginPage = path === '/login';
  const hasValidToken = Boolean(request.cookies.get('token')?.value);

  if (isLoginPage && hasValidToken) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }

  
  if (!isLoginPage && !hasValidToken) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }


  return null;
}
export const config = {

  matcher: '/profile/:path*',
};
