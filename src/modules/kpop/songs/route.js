import { Router } from "express";
import { songsController } from "./controller.js";

const router = Router();

router.get('/songs', songsController.getAllSongs);
router.get('/songs/:id', songsController.getSongById);
router.post('/songs', songsController.addSong);
router.post('/songs/bulk/create', songsController.addBulkSongs);
router.put('/songs/:id', songsController.updateSong);
router.delete('/songs/:id', songsController.deleteSong);

export default router;