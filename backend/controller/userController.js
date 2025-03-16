import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/errorMiddleware.js';
import { User } from '../models/userSchema.js';

export const userRegister = catchAsyncErrors(async(req,res,next)=>{
    const { Name, userImage,DOB,Gender, Address, MedicalHistory, email, phoneNo,username, password,role, Department} = req.body
    if(!Name || !userImage || !DOB|| !Gender || !Address || !MedicalHistory || !email || !phoneNo || !username || !password || !role || !Department){
        return next( new ErrorHandler("Please fill full form", 400));
    }
    const user= await User.findOne({email});
    if (user){
        return next( new ErrorHandler("User Already Registered!", 400));
    }
    user= await User.create({ Name, userImage,DOB,Gender, Address, MedicalHistory, email, phoneNo,username, password,role, Department});
    res.status(200).json({
        success:true,
        message: "User Registered........"
    })
});