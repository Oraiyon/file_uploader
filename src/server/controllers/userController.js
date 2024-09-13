import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// dest starts from root directory
const upload = multer({ dest: "./src/server/public/uploads" });

dotenv.config();

cloudinary.config({
  // Put in Railway
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const helloWorld = expressAsyncHandler((req, res, next) => {
  console.log("HELLO WORLD");
  res.json(true);
});

export default helloWorld;
