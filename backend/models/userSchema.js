import mongoose from "mongoose";
import validator from "validator"

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
        required:true,
        validate:[validator.isDate,"Enter in [YYYY-MM-DD] format!!"]
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
    }
});

export const User =mongoose.model("User",userSchema);