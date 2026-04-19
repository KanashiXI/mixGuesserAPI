import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import dayjs from 'dayjs';
import 'dayjs/locale/th.js'
import relativeTime from 'dayjs/plugin/relativeTime.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import isTomorrow from 'dayjs/plugin/isTomorrow.js';
import isToday from 'dayjs/plugin/isToday.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
// import utc from 'dayjs/plugin/utc.js';
// import timezone from 'dayjs/plugin/timezone.js';

// import routes
import healthCheckRoute from './src/modules/generals/healthCheck/route.js';

// K-pop
import songRoute from './src/modules/kpop/songs/route.js';
import artistRoute from './src/modules/kpop/artists/route.js';

// Character
import characterRoute from './src/modules/character/character/route.js';
import charTeamRoute from './src/modules/character/team/route.js';
import charWeaponsRoute from './src/modules/character/weapon/route.js';

import responseFormatter from './src/middleware/responseFormatter.js';

const app = express();
dotenv.config();

// configure dayjs
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// attach response helpers
app.use(responseFormatter);

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(morgan('dev'));
app.use(cookieParser());

app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: '25mb' }));

// routes
const routes = [
  // general
  [healthCheckRoute],
  
  // k-pop
  [songRoute],
  [artistRoute],
  
  // Character
  [characterRoute],
  [charTeamRoute],
  [charWeaponsRoute]
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