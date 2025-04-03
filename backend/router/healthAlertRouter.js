import express from "express";
import { reporthealthAlert } from "../controller/healthAlertController.js";

const router =express.Router();

router.post("/reportAlert",reporthealthAlert);

export default router;