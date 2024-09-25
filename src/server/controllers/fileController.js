import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import multer from "multer";
import { unlink } from "node:fs/promises";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

const prisma = new PrismaClient();

// dest starts from root directory
const upload = multer({ dest: "./src/server/public/uploads" });

cloudinary.config({
  // Put in Railway
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

dotenv.config();

const post_upload_file = [
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
    const user = await prisma.user.findFirst({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(user);
  })
];

export const get_folder_files = expressAsyncHandler(async (req, res, next) => {
  const files = await prisma.file.findMany({
    where: {
      folderId: req.params.folderId
    }
  });
  res.status(200).json(files);
});

export const get_file = expressAsyncHandler(async (req, res, next) => {
  const file = await prisma.file.findFirst({
    where: {
      id: req.params.fileId
    }
  });
  res.status(200).json(file);
});

export default post_upload_file;
