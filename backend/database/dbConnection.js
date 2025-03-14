import mongoose from "mongoose";


export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"Campus_Alert_Management_System"
    }).then(()=>{
        console.log("Connected Successfully to Database....");
    }).catch((err)=>{
        console.log(`Error Connecting to Database:${err}!!!`);
    });
};