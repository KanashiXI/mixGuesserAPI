import { pool } from "../config/db.js";
import express from "express";

const app = express();
app.use(express.json());

const songModel = {
  async getAllSongs(req, res) {
    let conn;
    try {
      conn = await pool.getConnection();
      const query = "SELECT * FROM songs";
      const rows = await conn.query(query);
      return rows;
    } finally {
      if (conn) conn.release();
    }
  },
};

export { songModel };
