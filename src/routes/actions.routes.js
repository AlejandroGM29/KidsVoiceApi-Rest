import { Router } from "express";
import {validationSchema} from "../valitadors/user.validator.js"
import {
  getActions,
  createAction,
  updateActions,
  getAction,
  deleteActions,
} from "../controllers/action.controller.js";
import { check } from "express-validator";
const router = Router();

router.get("/acciones",getActions);

router.get("/acciones/:id", getAction);

router.post("/acciones",validationSchema, createAction);

router.patch("/acciones/:id", updateActions);

router.delete("/acciones/:id", deleteActions);

export default router;
