import { Router } from "express";
import { getUserInfo } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/:id", getUserInfo)

export default userRouter;