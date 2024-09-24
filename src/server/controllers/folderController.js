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

export default get_folders;
