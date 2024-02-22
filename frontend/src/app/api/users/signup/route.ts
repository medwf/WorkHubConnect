import { connect } from "@/DbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { first_name, last_name, email, password, service, city, cityId, region, type } = reqBody;
        console.log(reqBody)
        const exist_user = await User.findOne({ email });
        if (exist_user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create user object
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            city,
            cityId,
            service,
            type,
            region
        });

        // Save user
        const user = await newUser.save();
        console.log(user)

        const token = jwt.sign({ userId: user._id }, 'WorkerHubALXStudent', { expiresIn: "1d" });
        console.log("here")
        console.log(token);
       
        // Set cookie
        const response = NextResponse.json({
            message: "User created successfully",
            status: 201,
            user,
            token
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

function isValidEmail(email: string): boolean {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
