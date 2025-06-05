import { Router } from 'express'
import passport from 'passport';

import {body, validationResult} from 'express-validator';

import { getAllPostsInfo, getPostInfo, makeNewPost } from '../controllers/postController.js';
import { getAllCommentsInfo, getCommentInfo, postNewComment } from '../controllers/commentController.js';

export const commentValidationChain = () =>
    body('comment').trim()
    .isString().withMessage('Comment with string type only')
    .isLength({max: 500, min: 1}).withMessage('Comment length should be between 1 to 500 letters')

const postValidation = [
    body('title').trim()
    .isLength({max: 100, min: 2}).withMessage('Title length should be between 1 to 100 letters'),
    body('text').trim()
    .notEmpty().withMessage('Can not be empty')
]

const postRouter = Router();

postRouter.get('/', getAllPostsInfo);
postRouter.get('/:id', getPostInfo);
postRouter.post('/',postValidation, makeNewPost);
postRouter.get('/:id/comments', getAllCommentsInfo)
postRouter.get('/:id/comments/:commentId', getCommentInfo)
postRouter.post('/:id/comments', commentValidationChain(), passport.authenticate('jwt', {session: false}), postNewComment);

export default postRouter