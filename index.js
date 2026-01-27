// import express from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

// import router from './src/routes/router.js';

// const app = express()
// const port = process.env.PORT || 4000;

// // Middleware to parse JSON bodies
// app.use(express.json());

// app.use('/api/v1', router);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
import http from 'http';
import app from './app.js';

const port = normalizePort(process.env.PORT || '4000');
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
console.log(`✅ Server is running on port: ${port}`);

function normalizePort(val) {
  const PORT = parseInt(val, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(PORT)) {
    // named pipe
    return val;
  }

  if (PORT >= 0) {
    // PORT number
    return PORT;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
