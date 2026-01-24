import express from "express";

import songRouter from "./song.router.js";
import healthCheckRouter from "./healthCheck.router.js";

const router = express.Router();
songRouter(router);
healthCheckRouter(router);

export default router;