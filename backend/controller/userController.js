import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/errorMiddleware.js';
import { User } from '../models/userSchema.js';
import {generateToken} from '../utils/jwtToken.js'

export const userRegister = catchAsyncErrors(async(req,res,next)=>{
    const { Name, userImage,DOB,Gender, Address, MedicalHistory, email, phoneNo,username, password,role, Department} = req.body
    if(!Name || !userImage || !DOB|| !Gender || !Address || !MedicalHistory || !email || !phoneNo || !username || !password || !role || !Department){
        return next( new ErrorHandler("Please fill full form", 400));
    }
    var user= await User.findOne({email});
    if (user){
        return next( new ErrorHandler("User Already Registered!", 400));
    }
    user= await User.create({ Name, userImage,DOB,Gender, Address, MedicalHistory, email, phoneNo,username, password,role, Department});
    return generateToken(user, "User Registered........",200, res);
});



export const login =catchAsyncErrors(async(req,res,next)=>{
    const {email, password , role} =req.body;
    if(!email|| !password|| !role){
        return next(new ErrorHandler("Please Provide All Details!!",400));
    }
    const user =await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or Email",400));
    }
    if(role!== user.role){
        return next(new ErrorHandler("User with this Role not Found",400));
    }
    generateToken(user, "User Logged in Successfully....",200,res);
});