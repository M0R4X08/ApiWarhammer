import express from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import factionController from "../controllers/factionController.js";

const factionRouter = express.Router();
factionRouter.get("/all", factionController.findAll);
factionRouter.get("/:id", factionController.findById);
factionRouter.post("/create", validateJWT, factionController.create);
factionRouter.put("/update/:id", validateJWT, factionController.update);

export default factionRouter;
