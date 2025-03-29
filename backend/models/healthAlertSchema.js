import mongoose, { trusted } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken"


const healthAlertSchema=new mongoose.Schema({
   AlertID:{
    type:Number,
    required:true
   },
   Name:{
    type:String,
    required:true,
    minLength:[3,"Event Name must contain atleast 3 characters!!"]
   },
   Age:{
    type:Number,
    required:true,
    validate: {
        validator: function (value) {
            return value>=17; 
        },
        message: "Age must be atleast 17!!"
    }
   },
   Gender:{
    type:String,
    required:true,
    enum:["Male","Female"]
   },
   Phno:{
    type:Number,
    required:true
   },
   Department:{
    type:String
   },
   Semester:{
    type:Number,
    required:true,
    validate: {
        validator: function (value) {
            return value<=10; 
        },
        message: "Semester can have value upto 10 only!!"
    }
   },
   Class:{
    type:String,
    required:true
   },
   Accomodation:{
    type:String,
    required:true
   },
   Hostel:{
    type:String
   }

});




export const healthAlert =mongoose.model("HealthAlert",healthAlertSchemaSchema);