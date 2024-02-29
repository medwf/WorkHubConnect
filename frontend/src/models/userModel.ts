import mongoose from "mongoose";
import { string } from "zod";

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    email:{
            type: String,
            required: true,
            unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    region:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    cityId:{
        type: String,
        required: true,
    },
    service:{
        type: String,
        
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    type:{
        type: String,
        required: true,
    },
    forgotPasswordToken:String,
    forgotPasswordExpires:Date,
    verifyToken:String,
    verifyTokenExpires:Date,
    createdAt:Date,
    updatedAt:Date,


    

});


const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;