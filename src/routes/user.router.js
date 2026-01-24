import { userController } from "../controllers/user.controller.js";

const userRouter = (router) => {
  router.get('/users', userController.getUsers);
}

export default userRouter;