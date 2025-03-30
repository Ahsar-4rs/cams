import express from "express";
import { addDiseaseGroup, getDiseaseGroups, getDiseaseName } from "../controller/diseaseGroupController.js";

const router = express.Router();

router.post("/addgroup", addDiseaseGroup);
router.get("/fetchgroups", getDiseaseGroups);
router.get("/:groupID",getDiseaseName)
export default router;
