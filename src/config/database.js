import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load config from .env file
dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  logging: false,
  timezone: '+07:00',
  pool: {
    max: 100,
    min: 10,
    acquire: 30000,
    idle: 10000
  }
});

export const checkDatabaseHealth = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    return { status: 'UP', message: 'Database is reachable' };
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return { status: 'DOWN', message: error.message };
  }
};
