import { Router } from "express";
import { getUserInfo, putUserInfo } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/:id", getUserInfo)
userRouter.put('/:id', putUserInfo);

export default userRouter;