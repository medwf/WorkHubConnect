import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";
import { RemoveTokenFromStore } from './helpers/HandleExpiredToken';
import { removeToken } from './state';


export function middleware(request: NextRequest) {
  console.log("middleware");
  console.log(` data now ${Date.now().toString()}`)
  // const dispatch = useDispatch();
  const path = request.nextUrl.pathname;
  const isLoginPage = path === '/auth/login';
  const hasValidToken = Boolean(request.cookies.get('token')?.value);
  const token = request.cookies.get('token')?.value;
  // const token = useSelector((state : RootState) => state.token) // this just if the token doesn't exist in cookies


  if (token && !isTokenExpired(token)) {
    if (isLoginPage) {
      return NextResponse.redirect(new URL('/profile', request.nextUrl));
    } else {
      return null;
    }
  } else {
    if (token) {
      removeToken();
      console.log("the token is removed from store now go to login")
    }
    if (!isLoginPage) {
      return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
    } else {
      return null;
    }
  }
  // if (isLoginPage && hasValidToken) {
  //   return NextResponse.redirect(new URL('/profile', request.nextUrl));
  // }
  // if (!isLoginPage && !hasValidToken) {
  //   return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  // }

  // return null;
}
function isTokenExpired(token: string): boolean {
  const decodedToken: { exp: number } = jwtDecode(token);
  console.log(decodedToken);
  const expirationTime = decodedToken.exp * 1000;
  console.log(expirationTime);
  const currentTime = Date.now();
  console.log(currentTime);
  return expirationTime < currentTime;
}
export const config = {

  matcher: '/profile',
};
