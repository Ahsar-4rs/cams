import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    groupID: {
        type: Number,
        ref:"DiseaseGroup",
        required: true
    },
    sender: {
        type: String, 
        required: true
    },
    message: {
        type: String,
        required: true
    },
    recoveryRate: {
        type: Number, 
        min: 0,
        max: 100, 
        default: null // Null means it's a normal message, not a recovery update
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export const message = mongoose.model("Message", messageSchema);
