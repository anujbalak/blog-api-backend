import { Router } from "express";
import { getAuthorInfo } from "../controllers/authorController.js";

const authorRouter = Router();

authorRouter.get("/:id", getAuthorInfo)

export default authorRouter;