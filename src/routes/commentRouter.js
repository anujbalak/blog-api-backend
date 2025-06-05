import { Router } from 'express'
import { deleteComment, editComment } from '../controllers/commentController.js';
import { commentValidationChain } from './postRouter.js';

const commentRouter = Router();

commentRouter.delete('/:id', deleteComment)
commentRouter.put('/:id',commentValidationChain(), editComment);

export default commentRouter;