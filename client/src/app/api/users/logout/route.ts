import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response = NextResponse.json(
            {
                message: "Logout successfully",
                success: true,
            }
        );
        // response.cookies.remove('token');
        response.cookies.set("token","",
        {httpOnly: true,expires: new Date(0)});
        
        return response;
    }catch(err:any) {
        return NextResponse.json({error:err.message},{status:500});
    }
}