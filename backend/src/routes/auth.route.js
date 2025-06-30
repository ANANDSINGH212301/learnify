import express from "express";
import { loginC, logoutC, signupC } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signupC);
router.post("/login", loginC);
router.post("/logout", logoutC);

export default router;