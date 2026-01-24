import express from "express";

import userRouter from "./user.router.js";

const router = express.Router();
userRouter(router);

export default router;