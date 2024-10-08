import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY.toString();

export const validateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      errors: [
        {
          status: 401,
          message: "Access denied, not token provided",
        },
      ],
    });
  }
  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      errors: [
        {
          status: 400,
          message: "Invalid token",
        },
      ],
    });
  }
};
