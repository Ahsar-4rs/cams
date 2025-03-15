import express from "express";
import { postSocialEvent } from "../controller/socialEventController.js";

const router =express.Router();

router.post("/postEvent",postSocialEvent);

export default router;