import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/all", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);

export default userRouter;
