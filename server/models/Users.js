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

  static async findUserByUsernameOrEmail(username, email) {
    try {
      const query = "SELECT * FROM users WHERE username = ? OR email = ?";
      const result = await db.execute(query, [username, email]);
      return result.rows[0];
    } catch (e) {
      console.error(e);
    }
  }

  static async registerUser(username, email, password) {
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
