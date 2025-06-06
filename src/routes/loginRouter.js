import { Router } from "express";
import { login, loginUser } from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post('/', loginUser);

export default loginRouter;