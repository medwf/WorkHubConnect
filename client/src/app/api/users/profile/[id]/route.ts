import User from "@/models/userModel"; 
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DbConfig/dbconfig"; 

connect(); 

export async function GET(request: NextRequest) {
  try {
    const userId = request.url.split("/").pop();
   

    const user = await User.findById(userId);

 
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    // Handle errors
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
