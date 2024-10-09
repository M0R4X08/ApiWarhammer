import express from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import characterController from "../controllers/charactersController.js";

const charactersRouter = express.Router();
charactersRouter.get("/all", characterController.findAllCharacters);
charactersRouter.get("/:id", characterController.findByIdCharacter);
charactersRouter.post("/create", validateJWT, characterController.create);
charactersRouter.put("/update/:id", validateJWT, characterController.update);

export default charactersRouter;
