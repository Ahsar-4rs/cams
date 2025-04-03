import mongoose from "mongoose";

const diseaseGroupSchema=new mongoose.Schema({
   groupID:{
    type:Number,
    unique:true,
   },
   disease:{
    type:String,
    required:true,
   },
   symptoms:{
      type:String,
      required:true
   },
   prescriptions:{
      type:String
   },
   totalMembers:{
      type:Number,
      default:0
   }
});
diseaseGroupSchema.pre("save", async function (next) {
    if (!this.groupID) {
      const lastEntry = await diseaseGroup.findOne().sort({ groupID: -1 });
      this.groupID = lastEntry ? lastEntry.groupID + 1 : 0;
    }
    next();
 });



export const diseaseGroup =mongoose.model("DiseaseGroup",diseaseGroupSchema);