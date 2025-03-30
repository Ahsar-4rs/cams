import express from "express";
import { getMessagesByGroup, sendMessage } from "../controller/messageController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/:groupID", getMessagesByGroup);
export default router;
