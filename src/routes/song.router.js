import { songController } from "../controllers/song.controller.js";

const songRouter = (router) => {
  router.get('/songs', songController.getSongs);
}

export default songRouter;