import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/DbConfig/dbconfig";

connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request
    const reqBody = await request.json();
    const { username, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      const res = NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
      return res;
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      const res = NextResponse.json(
        { error: "Password is not valid" },
        { status: 400 }
      );
      return res;
    }

   

    const token = jwt.sign(user, process.env.ACCESS_TOKEN!, {
      expiresIn: "1d",
    });
    console.log(user);
    console.log(token);

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
