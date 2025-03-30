import mongoose from "mongoose";
import { diseaseGroup } from "./diseaseGroupSchema";
import validator from "validator"

const peerGroupMemberSchema =new mongoose.Schema({
    studentEmail:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Enter a valid EmailID!!!"]
    },
    groupID:{
        type:Number,
        ref:"DiseaseGroup",
        required:true
    }
});

async function updateTotalMembers(groupID) {
    const count = await PeerGroupMember.countDocuments({ groupID });
    await DiseaseGroup.findOneAndUpdate({ groupID }, { totalMembers: count });
}

// Post-save middleware to update totalMembers when a new member is added
peerGroupMemberSchema.post("save", async function (doc, next) {
    await updateTotalMembers(doc.groupID);
    next();
});

// Post-remove middleware to update totalMembers when a member is removed
peerGroupMemberSchema.post("remove", async function (doc, next) {
    await updateTotalMembers(doc.groupID);
    next();
});

export const peerGroupMember = mongoose.model("PeerGroupMember",peerGroupMemberSchema);