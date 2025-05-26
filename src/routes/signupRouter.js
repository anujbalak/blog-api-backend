import { Router } from "express";
import { signupUser } from "../controllers/sigupController.js";

const signupRouter = Router()

signupRouter.post('/', signupUser)

export default signupRouter