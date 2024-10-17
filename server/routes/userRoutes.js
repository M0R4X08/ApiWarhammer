import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/all", userController.findAll);
userRouter.get("/:id", userController.findById);
userRouter.put("/update/:id", userController.update);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);

export default userRouter;
