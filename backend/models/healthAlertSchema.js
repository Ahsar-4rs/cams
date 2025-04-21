import mongoose from "mongoose";

const healthAlertSchema=new mongoose.Schema({
   AlertID:{
    type:Number,
    unique:true
   },
   name:{
    type:String,
    required:true,
    minLength:[3,"Name must contain atleast 3 characters!!"]
   },
   age:{
    type:Number,
    required:true,
    validate: {
        validator: function (value) {
            return value>=17; 
        },
        message: "Age must be atleast 17!!"
    }
   },
   gender:{
    type:String,
    required:true,
    enum:["male","female"]
   },
   phone:{
    type:String,
    required:true
   },
   department:{
    type:String,
    required:false
   },
   semester:{
    type:String,
    required:true,
    enum:["","1","2","3","4","5","6","7","8","9","10"]
   },
   class:{
    type:String,
    required:true
   },
   accommodation:{
    type:String,
    required:true
   },
   hostel:{
    type:String,
    required:false
   },
   roomNumber:{
    type:String,
    required:false
   },
   diagnosis:{
    type:String,
    required:true
   },
   onset:{
    type:String,
    required:false
   },
   medicineIntake:{
    type:String,
    required:false
   },
   socialGatherings:{
    type:String,
    required:false
   },
   foodIntake:{
    type:String,
    required:false
   },
   allergies:{
    type:String,
    required:false
   },
   level:{
    type:Number,
    required:true,
    enum:[1,2,3]
   },
   status:{
    type:Number,
    required:true,
    enum:[0,1,2]
   },
   vouchedBy:{
    type:String,
    required:false,
    default:null
   }
});

healthAlertSchema.pre("save", async function (next) {
    if (!this.AlertID) {
       const lastEntry = await healthAlert.findOne().sort("-AlertID");
       this.AlertID = lastEntry ? lastEntry.AlertID + 1 : 0;
    }
    next();
 });


export const healthAlert =mongoose.model("HealthAlert",healthAlertSchema);