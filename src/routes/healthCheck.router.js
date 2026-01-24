import { healthChceckController } from "../controllers/healthCheck.controller.js";

const healthCheckRouter = (router) => {
  router.get('/health/db', healthChceckController.getCheckDB);
}

export default healthCheckRouter;