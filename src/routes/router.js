import express from "express";

import songRouter from "../modules/songs/router.js";
import healthCheckRouter from "../modules/healthCheck/router.js";
import artistRouter from "../modules/artists/route.js";

const router = express.Router();
healthCheckRouter(router);
songRouter(router);
artistRouter(router);

export default router;