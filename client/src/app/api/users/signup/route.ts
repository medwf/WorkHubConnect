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

        // Validation checks
        if (!first_name || typeof first_name !== 'string') {
            return NextResponse.json({ error: "Invalid first name" }, { status: 400 });
        }

        if (!last_name || typeof last_name !== 'string') {
            return NextResponse.json({ error: "Invalid last name" }, { status: 400 });
        }

        if (!email || typeof email !== 'string' || !isValidEmail(email)) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        if (!password || typeof password !== 'string') {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        if (!type || typeof type !== 'string') {
            return NextResponse.json({ error: "Invalid user type" }, { status: 400 });
        }
        if (!city || typeof city !== 'string') {
            return NextResponse.json({ error: "Invalid user city" }, { status: 400 });
        }

       

    
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
        const token = jwt.sign(user, process.env.ACCESS_TOKEN!, { expiresIn: "1d" });
        const response = NextResponse.json({
            message: "Login successful",
            status: 201
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        // Return the response
        return response;
        // console.log(user);
        // return NextResponse.json({
        //     message: "User created successfully",
        //     status: 201,
        //     user,
           
        // });
       
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

function isValidEmail(email: string): boolean {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
