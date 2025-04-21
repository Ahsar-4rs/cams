import express from "express";
import { 
    getSocialEvents, 
    postSocialEvent, 
    getSocialEvent, 
    updateSocialEvent, 
    deleteSocialEvent 
} from "../controller/socialEventController.js";

const router = express.Router();

router.post("/postEvent", postSocialEvent);
router.get("/getEvents", getSocialEvents);
router.get("/getEvent/:id", getSocialEvent);
router.put("/updateEvent/:id", updateSocialEvent);
router.delete("/deleteEvent/:id", deleteSocialEvent);

export default router;