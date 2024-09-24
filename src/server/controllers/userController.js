import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { unlink } from "node:fs/promises";

const prisma = new PrismaClient();
// dest starts from root directory
const upload = multer({ dest: "./src/server/public/uploads" });

dotenv.config();

cloudinary.config({
  // Put in Railway
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const post_signup = [
  body("username", "Username is invalid").trim().isLength({ min: 3 }).toLowerCase().escape(),
  body("password", "Password is invalid").trim().isLength({ min: 6 }).escape(),
  body("confirmPassword", "Confirm Password must match Password")
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    }),
  expressAsyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        const errors = validationResult(req);
        const usernameTaken = await prisma.user.findUnique({
          where: {
            username: req.body.username
          }
        });
        if (!errors.isEmpty() || usernameTaken) {
          res.status(200).json(false);
          return;
        }
        await prisma.user.create({
          data: {
            username: req.body.username,
            password: hashedPassword
          }
        });
        res.status(200).redirect("/login");
      }
    });
  })
];

export const login = [
  expressAsyncHandler(async (req, res, next) => {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username
      }
    });
    if (!user) {
      res.status(200).json(user);
      return;
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      res.status(200).json(user);
      return;
    }
    next();
  }),
  passport.authenticate("local"),
  (req, res, next) => {
    res.status(200).json(req.user);
  }
];

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export const get_user = expressAsyncHandler(async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json(user);
});

export const post_upload_file = [
  upload.single("file"),
  expressAsyncHandler(async (req, res, next) => {
    const imageURL = await cloudinary.uploader.upload(req.file.path, {
      folder: "file_uploader",
      public_id: req.body.name
    });
    await unlink(req.file.path);
    const file = await prisma.file.create({
      data: {
        name: req.body.name,
        url: imageURL.secure_url,
        Folder: {
          connectOrCreate: {
            where: {
              name: req.body.folder,
              userId: req.params.id
            },
            create: {
              name: req.body.folder,
              userId: req.params.id
            }
          }
        },
        User: {
          connect: {
            id: req.params.id
          }
        }
      }
    });
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(user);
  })
];

export const get_folders = expressAsyncHandler(async (req, res, next) => {
  const folders = await prisma.folder.findMany();
  res.status(200).json(folders);
});

export default post_signup;
