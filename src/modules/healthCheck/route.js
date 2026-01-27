import { Router } from 'express';
import { healthCheckController } from './controller.js';

const router = Router();

router.get('/health/db', healthCheckController.getCheckDB);

export default router;