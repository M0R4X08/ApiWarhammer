import express from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import raceController from "../controllers/raceController.js";

const raceRouter = express.Router();
raceRouter.get("/all", raceController.findAll);
raceRouter.get("/:id", raceController.findById);
raceRouter.post("/create", validateJWT, raceController.create);
raceRouter.put("/update/:id", validateJWT, raceController.update);

export default raceRouter;
