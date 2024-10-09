import express from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import alignmentController from "../controllers/alignmentController.js";

const alignmentRouter = express.Router();
alignmentRouter.get("/all", alignmentController.findAll);
alignmentRouter.get("/:id", alignmentController.findById);
alignmentRouter.post("/create", validateJWT, alignmentController.create);
alignmentRouter.put("/update/:id", validateJWT, alignmentController.update);

export default alignmentRouter;
