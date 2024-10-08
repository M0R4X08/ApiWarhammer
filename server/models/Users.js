import Model from "./Model.js";
import db from "../database/db-client.js";
import bcrypt from "bcrypt";

class User extends Model {
  static tablename = "users";
  constructor(data) {
    super(data);
    this.validate();
  }
  static fields = {
    username: "text",
    email: "text",
    password: "text",
  };

  //static async findAllUsers(limit, offset) {
  //  try {
  //   const query = "SELECT * FROM users LIMIT ? OFFSET ?";
  //   const result = await db.execute(query, [limit, offset]);
  //   return result.rows;
  // } catch (e) {
  //   console.error(e);
  // }
  // }
  //static async findUserById(id) {
  // try {
  //  const query = "SELECT * FROM users WHERE id = ?";
  //  const result = await db.execute(query, [id]);
  //  return result.rows[0];
  //} catch (e) {
  //  console.error(e);
  // }
  // }
  static async findUserByUsernameOrEmail(username, email) {
    try {
      const query = "SELECT * FROM users WHERE username = ? OR email = ?";
      const result = await db.execute(query, [username, email]);
      return result.rows[0];
    } catch (e) {
      console.error(e);
    }
  }

  static async createUser(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query =
        "INSERT INTO users (username,email,password) VALUES (?,?,?)";
      return await db.execute(query, [username, email, hashedPassword]);
    } catch (e) {
      console.error(e);
    }
  }
  static async loginUser(username, email, password) {
    try {
      const user = await User.findUserByUsernameOrEmail(username, email);
      if (!user) {
        return null;
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return null;
      }
      return user.username;
    } catch (e) {
      console.error(e);
    }
  }
}

export default User;
