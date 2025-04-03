import express from "express";
import { userRegister,login } from "../controller/userController.js";

const router = express.Router();

router.post("/register",userRegister)
router.post("/login",login)
//router.get("/fetch",userFetch)
export default router;