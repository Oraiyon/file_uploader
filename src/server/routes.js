import express from "express";
import post_signup, { login, logout, get_user } from "./controllers/userController.js";
import post_upload_file, { get_file, get_folder_files } from "./controllers/fileController.js";
import get_folders from "./controllers/folderController.js";

const router = express.Router();

// userController
router.post("/signup", post_signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/api/:id", get_user);

// fileController
router.post("/api/:id/upload", post_upload_file);
router.get("/api/:folderId/files", get_folder_files);
router.get("/api/:fileId/file", get_file);

// folderController
router.get("/api/:id/folders", get_folders);

export default router;
