import { songController } from "../controllers/song.controller.js";

const songRouter = (router) => {
  router.get('/songs', songController.getSongs);
  router.post('/songs', songController.addSong);
}

export default songRouter;