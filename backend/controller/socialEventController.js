import { SocialEvent } from "../models/socialEventSchema.js";

export const postSocialEvent = async(req,res,next)=>{
    const{eventName,eventImage,eventDate,eventTime,eventVenue,organizer,eventInfo} =req.body;
    if(!eventName||!eventImage||!eventDate||!eventTime||!eventVenue||!organizer||!eventInfo){
        return res.status(400).json({
            success:false,
            message:"Please fill full form properly!!",
        });
    }
    await SocialEvent.create({eventName,eventImage,eventDate,eventTime,eventVenue,organizer,eventInfo});
    res.status(200).json({
        success:true,
        message:"Social Event Entry created Successfully.....",
    });
};