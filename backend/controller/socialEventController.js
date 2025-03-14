export const postSocialEvent = async(req,res,next)=>{
    const{eventName,eventImage,eventDate,eventTime,eventVenue,organizer,eventInfo} =req.body;
    if(!eventName||!eventImage||!eventDate||!eventTime||!eventVenue||!organizer||!eventInfo){
        return res.status(400).json({
            success:false,
            message:"Please fill full form properly!!",
        });
    }
};