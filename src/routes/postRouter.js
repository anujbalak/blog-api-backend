import { Router } from 'express'
import passport from 'passport';

import {body, validationResult} from 'express-validator';

import { deletPostInfo, editPost, getAllPostsForAuthor, getAllPostsInfo, getPostInfo, makeNewPost } from '../controllers/postController.js';
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
postRouter.get('/author', getAllPostsForAuthor)
postRouter.get('/:id', getPostInfo);
postRouter.post('/new',postValidation, passport.authenticate('jwt', {session: false}), makeNewPost);
postRouter.put('/:id',postValidation, passport.authenticate('jwt', {session: false}), editPost);
postRouter.put('/:id/publish', passport.authenticate('jwt', {session: false}), editPost);
postRouter.delete('/:id', passport.authenticate('jwt', {session: false}), deletPostInfo);

postRouter.get('/:id/comments', getAllCommentsInfo)
postRouter.get('/:id/comments/:commentId', getCommentInfo)
postRouter.post('/:id/comments', commentValidationChain(), passport.authenticate('jwt', {session: false}), postNewComment);

export default postRouter