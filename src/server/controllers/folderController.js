import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export default get_folders;
