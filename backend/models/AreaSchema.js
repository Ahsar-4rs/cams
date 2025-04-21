import mongoose from "mongoose";

const AreaSchema=new mongoose.Schema({
    place:{
        type:String,
        required:true
    },
    lat:{
        type:Number,
        required:true
    },
    long:{
        type:Number,
        required:true
    },
    type:{
        type:String,
<<<<<<< HEAD
        enum:["SocialVenue","Infected","Repair","Emergency",null],
        required:true,
        default:null
=======
        enum:["SocialVenue","Infected","Repair","Emergency", ""],
        required:false
>>>>>>> 327892b462318a58ad614dfea8c63406f1bc9e47
    }
});

export const Area =mongoose.model("Area",AreaSchema);