import db from "../database/db-client.js";

class Model {
  static tablename = "";

  constructor(data) {
    this.data = data;
  }

  static fields = {};

  static async findAll(limit, offset) {
    try {
      const query = `SELECT * FROM ${this.tablename} LIMIT ? OFFSET ?`;
      const result = await db.execute(query, [limit, offset]);
      return result.rows;
    } catch (e) {
      console.error(e);
    }
  }

  static async findById(id) {
    try {
      const query = `SELECT * FROM ${this.tablename} WHERE id = ?`;
      const result = await db.execute(query, [id]);
      return result.rows[0];
    } catch (e) {
      console.error(e);
    }
  }

  static async create(data) {
    const keys = Object.keys(this.fields).join(",");
    const values = Object.keys(data)
      .map((v) => `'${data[v]}'`)
      .join(",");
    const sql = `INSERT INTO ${this.tablename} (${keys}) VALUES (${values})`;
    return await db.execute(sql);
  }

  static async update(id, data) {
    try {
      const keys = Object.keys(data).join(",");
      const values = Object.keys(data)
        .map((v) => `'${data[v]}'`)
        .join(",");
      const query = `UPDATE ${this.tablename} SET ${keys} = ${values} WHERE id = ?`;
      return await db.execute(query, [id]);
    } catch (e) {
      console.error(e);
    }
  }

  static async count() {
    try {
      const query = `SELECT COUNT(*) AS total FROM ${this.tablename}`;
      const result = await db.execute(query);
      return parseInt(result.rows[0].total, 10);
    } catch (e) {
      console.error(e);
    }
  }

  validate() {
    for (const field in this.constructor.fields) {
      if (this.data[field === undefined]) {
        throw new Error(`El campo ${field} es obligatorio.`);
      }
    }
  }
}

export default Model;
