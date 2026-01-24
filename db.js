const mariadb = require('mariadb');

// Create a connection pool
const pool = mariadb.createPool({
     host: 'localhost',      // Replace with your host
     user: 'your_user',      // Replace with your username
     password: 'your_password', 
     database: 'your_db',
     connectionLimit: 5      // Max number of connections in the pool
});

// Helper to use throughout the app
module.exports = {
  query: (sql, params) => pool.query(sql, params),
  getConnection: () => pool.getConnection()
};