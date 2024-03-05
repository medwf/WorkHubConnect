import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log("middleware");
  const path = request.nextUrl.pathname;
  const isLoginPage = path === '/login';
  const hasValidToken = Boolean(request.cookies.get('token')?.value);
  const token = request.cookies.get('my-cookie');
  
  console.log("hasValidToken", hasValidToken)
  console.log("token", token)

  if (isLoginPage && hasValidToken) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }

  
  if (!isLoginPage && !hasValidToken) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }

  return null;
}
export const config = {

  matcher: '/profile/:path',
};
