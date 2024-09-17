import express from "express";
import post_signup, { login, logout, get_user } from "./controllers/userController.js";

const router = express.Router();

router.post("/signup", post_signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/api/:id", get_user);

export default router;
