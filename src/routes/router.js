import express from "express";

import songRouter from "../modules/songs/router.js";
import healthCheckRouter from "../modules/healthCheck/router.js";
import artistRouter from "../modules/artists/route.js";
import characterRouter from "../modules/character/character/router.js";

const router = express.Router();
healthCheckRouter(router);
songRouter(router);
artistRouter(router);
characterRouter(router);

export default router;