import { Router } from "express";
import { songsController } from "./controller.js";

const router = Router();

router.get('/songs', songsController.getAllSongs);
router.post('/songs', songsController.addSong);

export default router;