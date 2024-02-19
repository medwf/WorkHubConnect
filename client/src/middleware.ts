import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserDataFromToken } from './helpers/authHelp';

export async function middleware(request: NextRequest) {
  console.log("middleware");
  const path = request.nextUrl.pathname;
  const isLoginPage = path === '/login';
  const hasValidToken = Boolean(request.cookies.get('token')?.value);

  const userData = await getUserDataFromToken(request);
  const userId = userData ? userData.id : null;

  if (isLoginPage && hasValidToken) {
    return NextResponse.redirect(new URL(`/profile/${userId}/myrpofile`, request.nextUrl));
  }


  if (!isLoginPage && !hasValidToken) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }


  return null;
}
export const config = {

  matcher: '/profile',
};
