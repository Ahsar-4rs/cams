import express from "express";
import { getAllReports, getSomeReport, reporthealthAlert, getOutbreakStatus, vouchReport, rejectReport, deleteReport, deleteAllProcessedReports } from "../controller/healthAlertController.js";

const router = express.Router();

router.post("/reportAlert", reporthealthAlert);
router.get("/getAllReport", getAllReports);
router.get("/getSomeReport", getSomeReport);
router.get("/outbreak-status", getOutbreakStatus);
router.post("/vouchReport", vouchReport);
router.post("/rejectReport", rejectReport);
router.post("/deleteReport", deleteReport);
router.post("/deleteAllProcessedReports", deleteAllProcessedReports);

export default router;