import dotenv from "dotenv";
dotenv.config();

export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY.toString();
