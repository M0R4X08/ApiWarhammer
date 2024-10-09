import express from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import rankController from "../controllers/rankController.js";

const rankRouter = express.Router();

rankRouter.get("/all", rankController.findAll);
rankRouter.get("/:id", rankController.findById);
rankRouter.post("/create", validateJWT, rankController.create);
rankRouter.put("/update/:id", validateJWT, rankController.update);

export default rankRouter;
