import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string): boolean => {
  if(!token) return true;
  const decodedToken: { exp: number } = jwtDecode(token);
  const expirationTime = decodedToken.exp * 1000;
  const currentTime = Date.now();
  return expirationTime < currentTime;
}

