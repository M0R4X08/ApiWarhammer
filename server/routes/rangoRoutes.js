import express from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import {
  createRango,
  getAllRangos,
  getRangoById,
} from "../controllers/rangoController.js";

const rangoRouter = express.Router();
rangoRouter.get("/all", getAllRangos);
rangoRouter.get("/:id", getRangoById);
rangoRouter.post("/create", validateJWT, createRango);

export default rangoRouter;
