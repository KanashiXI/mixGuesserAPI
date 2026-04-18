import  { Router } from 'express';
import { characterController } from './controller.js';

const router = Router();

router.get('/characters', characterController.getAllCharacters);

export default router;