import express from "express";
import { userRegister,login, getUserProfile } from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register",userRegister)
router.post("/login",login)
//router.get("/fetch",userFetch)
router.get('/me', isAuthenticated, getUserProfile);
export default router;