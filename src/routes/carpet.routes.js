import { Router } from "express";
import {
  getFolders,
  getFolder,
  createFolder,
  updateFolder,
  deleteFolder,
} from "../controllers/folder.controller.js";

const router = Router();

router.get("/carpetas", getFolders);

router.get("/carpetas/:id", getFolder);

router.post("/carpetas", createFolder);

router.patch("/carpetas/:id", updateFolder);

router.delete("/carpetas/:id", deleteFolder);

export default router;
