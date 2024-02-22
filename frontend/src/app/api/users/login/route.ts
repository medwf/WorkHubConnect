import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/DbConfig/dbconfig";

connect();

export async function POST(request: NextRequest) {
  try {

    const reqBody = await request.json();
    const { email, password } = reqBody;


    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
// console.log(`User ${user}`);

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Password is not valid" }, { status: 400 });
    }
// console.log(`User ${isMatch}`);

    const token = jwt.sign({ userId: user._id }, "WorkerHubALXStudent", { expiresIn: "1m" });
    if (!token) {
      return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
    }
// console.log(token);

    const response = NextResponse.json({ message: "Login successful", success: true,user,token });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
