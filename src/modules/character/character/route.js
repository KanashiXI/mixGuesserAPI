import  { Router } from 'express';
import { characterController } from './controller.js';

const router = Router();

router.get('/characters', characterController.getAllCharacters);
router.get('/character/:id', characterController.getCharacterById);

export default router;