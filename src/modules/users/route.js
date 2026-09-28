import { Router } from 'express';
import { usersController } from './controller.js';

const router = Router();

router.post('/players', usersController.getAllPlayers);
router.get('/player/:id', usersController.getPlayerById);
router.post('/players/top', usersController.getPlayerTopScores);
router.get('/player/search/:displayName', usersController.getPlayerByDisplayName);
// router.put('/player/:id', usersController.editPlayer);
// router.delete('/player/:id', usersController.deletePlayer);

export default router;