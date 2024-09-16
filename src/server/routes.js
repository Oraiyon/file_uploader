import express from "express";
import post_signup, { login, logout } from "./controllers/userController.js";

const router = express.Router();

router.post("/signup", post_signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
