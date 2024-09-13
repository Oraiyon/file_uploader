import express from "express";
import post_signup from "./controllers/userController.js";

const router = express.Router();

router.post("/api/signup", post_signup);

export default router;
