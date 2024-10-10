import express from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import subfactionController from "../controllers/subfactionController.js";

const subfactionRouter = express.Router();
subfactionRouter.get("/all", subfactionController.findAll);
subfactionRouter.get("/:id", subfactionController.findById);
subfactionRouter.post("/create", validateJWT, subfactionController.create);
subfactionRouter.put("/update/:id", validateJWT, subfactionController.update);

export default subfactionRouter;
