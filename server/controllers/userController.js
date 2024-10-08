import User from "../models/Users.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Paginator from "../utils/Paginator.js";

dotenv.config();
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY.toString();

export const getAllUsers = async (req, res) => {
  const paginator = new Paginator(User);

  const { page, limit, offset, totalData, totalPages } =
    await paginator.paginateData(req.query.page, req.query.limit);

  try {
    const users = await User.findAll(limit, offset);
    res.status(200).json({
      totalUsers: totalData,
      totalPages: totalPages,
      currentPage: page,
      data: users,
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

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        errors: [
          {
            status: 404,
            message: "User not found",
          },
        ],
      });
    }
    return res.status(200).json(user);
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
export const createUser = async (req, res) => {
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
    const result = await User.createUser(username, email, password);
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
export const loginUser = async (req, res) => {
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
