import { Router } from 'express'
import { deleteComment } from '../controllers/commentController.js';

const commentRouter = Router();

commentRouter.delete('/:id', deleteComment)

export default commentRouter;