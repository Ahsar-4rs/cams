import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import socialEventRouter from "./router/socialEventRouter.js"
import {errorMiddleware} from './middlewares/errorMiddleware.js'
import userRouter from './router/userRouter.js'
import healthAlertRouter from './router/healthAlertRouter.js'
import diseaseGroupRouter from './router/diseaseGroupRouter.js'
import messageRouter from './router/messageRouter.js'
import areaRouter from "./router/areaRouter.js"
import smsRouter from './router/smsRouter.js'

const app= express();
config({path:"./config/config.env"});

app.use(
    cors({
        //origin:[process.env.FRONTEND_URL],
        origin : "http://localhost:5173",
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
);

app.use("/api/v1/area",areaRouter);
app.use("/api/v1/socialEvent",socialEventRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/report",healthAlertRouter)
app.use("/api/v1/group",diseaseGroupRouter)
app.use("/api/v1/message",messageRouter);
app.use("/api/v1/sms",smsRouter);

dbConnection()
app.use(errorMiddleware)
export default app;