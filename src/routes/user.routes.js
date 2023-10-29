import { Router } from "express";
import {
    getUsers,
  createUser,
  updateUser,
  getUser,
  deleteUsers,
} from "../controllers/user.controller.js";
const router = Router();

router.get("/usuarios", getUsers);

router.get("/usuarios/:id", getUser);

router.post("/usuarios", createUser);

router.patch("/usuarios/:id", updateUser);

router.delete("/usuarios/:id", deleteUsers);

export default router;
