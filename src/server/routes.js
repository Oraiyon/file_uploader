import express from "express";
import post_signup, { login, logout, getUser } from "./controllers/userController.js";

const router = express.Router();

router.post("/signup", post_signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/api/get-user", getUser);

export default router;
