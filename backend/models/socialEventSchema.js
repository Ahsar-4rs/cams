import mongoose from "mongoose";
import validator from "validator"

const socialEventSchema=new mongoose.Schema({
    eventName:{
        type:String,
        required:true,
        minLength:[3,"Event Name must contain atleast 3 characters!!"]
    },
    eventImage:{
        type:String,
        required:false,
        default:"bgr.jpg",
    },
    eventDate:{
        type:Date,
        required:true,
        validate:[validator.isDate,"Enter in [YYYY-MM-DD] format!!"]
    },
    eventTime:{
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // Ensures HH:MM:SS format
            },
            message: "Enter time in [HH:MM] format!!"
        }
    },
    eventVenue:{
        type: String,
        required: true,
        default:"Auditorium",
    },
    organizer:{
        type: String,
        required: true,
        minLength:[1,"Must contain atleast 1 characters!!"]
    },
    eventInfo:{
        type:String,
        required:true,
    },
    Category:{
        type:String,
        enum:["Workshop", "Seminar","Conference","Social Event"],
        required:true
    }
});

export const SocialEvent =mongoose.model("Social Events",socialEventSchema);