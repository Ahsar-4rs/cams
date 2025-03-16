import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const userSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        minLength:[3,"Event Name must contain atleast 3 characters!!"]
    },
    userImage:{
        type:String,
        required:true,
        default:"bgr.jpg",
    },
    DOB:{
        type:Date,
        required:[true,"DOB is required"],
        validate:[validator.isDate,"Enter in [YYYY-MM-DD] format!!"]
    },
    Gender:{
        type: String,
        required:true,
        enum:["Male","Female"],
    },
    Address:{
        type: String,
        required: true,
        default:"TKM Hostel",
    },
    MedicalHistory:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please, Enter valid email-ID:"]
    },
    phoneNo:{
        type:String,
        required:true,
        minLength:[10,"Phone Number has always 10 digits...."],
        maxLength:[10,"Phone Number has always 10 digits...."],
    },
    username:{
        type:String,
        required:true,
        minLength:[8,"Username must contain atleast 8 characters!!"]
    },
    password:{
        type:String,
        required:true,
        minLength:[8, "Password must contain atleast 8 characters"],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:["General User","Faculty","Club Representative","Admin"]
    },
    Department:{
        type:String,
    }
});

userSchema.pre("save",async function (next) {
    if (!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword= async function(enteredPasssword) {
    return await bcrypt.compare(enteredPasssword,this.password);
};

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    })
}

export const User =mongoose.model("User",userSchema);