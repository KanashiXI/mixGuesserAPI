import mariadb from 'mariadb';
import dotenv from 'dotenv';

// Load config from .env file
dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT)
});

// Helper function to get a connection from the pool
async function getConnection() {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (err) {
        console.error("Error connecting to MariaDB:", err);
        throw err;
    }
}

export { pool, getConnection };