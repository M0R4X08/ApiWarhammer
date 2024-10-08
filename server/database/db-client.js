import dotenv from "dotenv";
import { createClient } from "@libsql/client";
dotenv.config();

const db = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export default db;
