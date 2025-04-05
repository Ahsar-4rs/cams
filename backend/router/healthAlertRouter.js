import express from "express";
import { getAllReports, getSomeReport, reporthealthAlert } from "../controller/healthAlertController.js";

const router =express.Router();

router.post("/reportAlert",reporthealthAlert);
router.get("/getAllReport",getAllReports);
router.get("/getSomeReport",getSomeReport);

export default router;