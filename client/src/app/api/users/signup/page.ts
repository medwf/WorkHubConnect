import { connect } from "@/DbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try{

        const reqBody = await request.json();
        const {first_name, last_name,email,password,city,cityId,region} = reqBody

        console.log(reqBody);

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already exists"},{status: 400})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            first_name,
            last_name,
            email,
            password:hashedPassword,
            city,
            cityId,
            region
        })
        const savedUser = await newUser.save()
        console.log(savedUser);
        const token = jwt.sign({id:savedUser._id},process.env.JWT_SECRET!)
        
        return NextResponse.json({
            message:"User created successfully",
            success:true,
            savedUser
        })

    }catch(err:any){
        return NextResponse.json({error:err.message}, {status:500});

    }



}


