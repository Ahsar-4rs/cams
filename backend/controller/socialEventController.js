import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import { SocialEvent } from "../models/socialEventSchema.js";
import ErrorHandler from '../middlewares/errorMiddleware.js'
export const postSocialEvent = catchAsyncErrors(async(req,res,next)=>{
    const{eventName,eventImage,eventDate,eventTime,eventVenue,organizer,eventInfo} =req.body;
    if(!eventName||!eventImage||!eventDate||!eventTime||!eventVenue||!organizer||!eventInfo){
        return next(new ErrorHandler("Please fill full Form!",400));
    }
    await SocialEvent.create({eventName,eventImage,eventDate,eventTime,eventVenue,organizer,eventInfo});
    res.status(200).json({
        success:true,
        message:"Social Event Entry created Successfully.....",
    });
});

