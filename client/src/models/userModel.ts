import mongoose from "mongoose";

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
        type: Array<string>,
        required: true,
    },
    profession:{
        type: String,
        required: true,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isWorker:{
        type: Boolean,
        default: false,
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