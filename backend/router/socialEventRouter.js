import express from "express";
import { getSocialEvents, postSocialEvent } from "../controller/socialEventController.js";

const router =express.Router();

router.post("/postEvent",postSocialEvent);
router.get("/getEvents", getSocialEvents);

export default router;