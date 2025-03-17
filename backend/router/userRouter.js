import express from "express";
import { userRegister,login } from "../controller/userController.js";

const router = express.Router();

router.post("/user/register",userRegister)
router.post("/login",login)

export default router;