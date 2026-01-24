import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import router from './src/routes/router.js';

const app = express()
const port = process.env.PORT || 4000;

app.use('/api/v1', router);

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
