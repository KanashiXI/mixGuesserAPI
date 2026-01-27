import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import router from './src/routes/router.js';

const app = express()
const port = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
