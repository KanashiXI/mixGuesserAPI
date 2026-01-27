import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import dayjs from 'dayjs';
import 'dayjs/locale/th.js'
import relativeTime from 'dayjs/plugin/relativeTime.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import isTomorrow from 'dayjs/plugin/isTomorrow.js';
import isToday from 'dayjs/plugin/isToday.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
// import utc from 'dayjs/plugin/utc.js';
// import timezone from 'dayjs/plugin/timezone.js';

import helmet from 'helmet';

import healthCheckRoute from './src/modules/healthCheck/route.js';

const app = express();
dotenv.config();
dayjs.locale('th');
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(isTomorrow);
dayjs.extend(isToday);
dayjs.extend(isSameOrBefore);
// dayjs.extend(utc);
// dayjs.extend(timezone);

app.set('trust proxy', 1)

const corsOpts = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Apikey'],
};

app.use(cors(corsOpts));
app.use(helmet());
app.use(express.static('public'));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

const routes = [
    [healthCheckRoute]
];

app.use('/api/v1', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    code: 500,
    result: 'fail',
    message: 'Internal Server Error',
    data: null
  });
});

export default app;