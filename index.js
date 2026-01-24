import express from 'express';
import router from './src/routes/router.js';

const app = express()
const port = process.env.PORT || 4000;

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
