import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

const prisma = new PrismaClient();

cloudinary.config({
  // Put in Railway
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

dotenv.config();

const get_folders = expressAsyncHandler(async (req, res, next) => {
  const folders = await prisma.folder.findMany({
    where: {
      userId: req.params.id
    }
  });
  res.status(200).json(folders);
});

export const delete_folder = expressAsyncHandler(async (req, res, next) => {
  const files = await prisma.file.findMany({
    where: {
      folderId: req.params.folderId
    }
  });
  if (files.length) {
    res.status(200).json({ filesLength: files.length });
  } else {
    const deletedFolder = await prisma.folder.delete({
      where: {
        id: req.params.folderId
      }
    });
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.params.id
      }
    });
    res.status(200).json(folders);
  }
});

export const delete_folder_files = expressAsyncHandler(async (req, res, next) => {
  const files = await prisma.file.findMany({
    where: {
      folderId: req.params.folderId
    }
  });
  for (let i = 0; i < files.length; i++) {
    await cloudinary.uploader.destroy(`file_uploader/${files[i].publicId}`);
  }
  const deletedFiles = await prisma.file.deleteMany({
    where: {
      folderId: req.params.folderId
    }
  });
  const deletedFolder = await prisma.folder.delete({
    where: {
      id: req.params.folderId
    }
  });
  const folders = await prisma.folder.findMany({
    where: {
      userId: req.params.id
    }
  });
  res.status(200).json(folders);
});

export default get_folders;
