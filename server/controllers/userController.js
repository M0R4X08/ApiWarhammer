import User from "../models/Users.js";
import Controller from "./Controller.js";
import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config/config.js";

class UserController extends Controller {
  constructor() {
    super(User);
  }

  loginUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user_name = await User.loginUser(username, email, password);
      if (!user_name) {
        return res.status(401).json({
          errors: [
            {
              status: 401,
              message: "Invalid username or password",
            },
          ],
        });
      }
      const token = jwt.sign({ username: user_name }, SECRET_JWT_KEY, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: "User logged in successfully",
        token: token,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        errors: [
          {
            status: 500,
            message: "Internal server error",
          },
        ],
      });
    }
  };

  registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.findUserByUsernameOrEmail(username, email);
      if (user) {
        return res.status(400).json({
          errors: [
            {
              status: 400,
              message: "User already exists",
            },
          ],
        });
      }
      const result = await User.create(username, email, password);
      const token = jwt.sign({ userId: result.username }, SECRET_JWT_KEY, {
        expiresIn: "1h",
      });
      return res.status(201).json({
        message: `User Created successfully`,
        userId: result.lastInsertRowid.toString(),
        token: token,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        errors: [
          {
            status: 500,
            message: "Internal server error",
          },
        ],
      });
    }
  };
}
export default new UserController();
