// middleware.ts
import { NextRequest } from "next/server";

export const isAuth = (request: NextRequest) => Boolean(request.cookies.get('token')?.value);
