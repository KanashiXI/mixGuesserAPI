import { pool } from '../../config/db.js';
import express from 'express';

const app = express()
app.use(express.json());

const healthCheckModel = {
  async dbCheck (req, res) {
    let conn;
    try {
        // Establish a connection
        conn = await pool.getConnection();
        
        // simple query to check if DB is working (returns current time)
        const rows = await conn.query("SELECT NOW() as now");
        
        // Don't forget to release the connection back to the pool!
        res.json({ 
            status: 'success', 
            message: 'Connected to MariaDB!', 
            time: rows[0].now 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    } finally {
        if (conn) conn.release(); // ALWAYS release connection
    }
  }
}

export { healthCheckModel };