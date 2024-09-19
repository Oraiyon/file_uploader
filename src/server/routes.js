import express from "express";
import post_signup, {
  login,
  logout,
  get_user,
  post_upload_file,
  get_folders
} from "./controllers/userController.js";

const router = express.Router();

router.post("/signup", post_signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/api/:id", get_user);

router.post("/api/:id/upload", post_upload_file);

router.get("/api/get/folders", get_folders);

export default router;
