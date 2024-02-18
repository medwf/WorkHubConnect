import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getUserDataFromToken(request: NextRequest): any | null {
  try {
    const token = request.cookies.get("token");
    if (!token) {
      return null;
    }

    const decoded: any = jwt.verify(token.toString(), process.env.ACCESS_TOKEN!);
    return decoded.user; 
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
