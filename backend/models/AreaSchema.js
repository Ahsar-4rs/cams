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
        enum:["SocialVenue","Infected","Repair","Emergency", "","Fire Extinguisher"],
        required:false
    },
    floor:{
        type:Number,
        required:true
    }
});

export const Area =mongoose.model("Area",AreaSchema);