// import { pool } from '../../config/db.js';
import express from 'express';
import { v4 as uuidv4 } from "uuid";

const app = express()
app.use(express.json());

const songsService = {
  async getAllSongs() {
    let conn;
    // try {
    //   conn = await pool.getConnection();
    //   const query = "SELECT * FROM songs";
    //   const rows = await conn.query(query);
    //   return rows;
    // } catch (err) {
    //   console.error(err);
    //   throw err;
    // } finally {
    //   if (conn) conn.release();
    // }
  },
  async addSong(req, res) {
    let conn;
    // try {
    //   // console.log("Adding new song with data:", req.body);
    //   const { song_name, song_album, song_release_year, song_length } = req.body;
    //   const song_id = uuidv4(); // Generate a new UUID v4
    //   const create_at = new Date();
    //   conn = await pool.getConnection();

    //   // Update query to include the ID column
    //   const query =
    //     "INSERT INTO songs (song_id, song_name, song_album, song_release_year, song_length, create_at) VALUES (?, ?, ?, ?, ?, ?)";
    //   await conn.query(query, [song_id, song_name, song_album, song_release_year, song_length, create_at]);

    //   // Return the generated ID along with the data
    //   return { song_id, song_name, song_album, song_release_year, song_length, create_at };
    // } catch (error) {
    //   // It's good practice to catch errors so your app doesn't crash
    //   console.error("Error adding song:", error);
    //   throw error;
    // } finally {
    //   if (conn) conn.release();
    // }
  },
}

export { songsService };