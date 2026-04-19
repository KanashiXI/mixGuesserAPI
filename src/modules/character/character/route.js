import  { Router } from 'express';
import { characterController } from './controller.js';

const router = Router();

router.get('/characters', characterController.getAllCharacters);
router.get('/character/:id', characterController.getCharacterById);
router.post('/characters', characterController.addBulkCharacter);

export default router;