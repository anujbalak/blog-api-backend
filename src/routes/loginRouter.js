import { Router } from "express";
import { login, loginUser } from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post('/', login);

export default loginRouter;